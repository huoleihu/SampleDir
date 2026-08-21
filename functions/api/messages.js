/*!
 * SampleDir website — Cloudflare Pages Function
 * 留言板（公开留言 + 人工审核 + 邮件通知）
 *
 *   GET  /api/messages                 → 返回已审核(status=approved)的留言
 *   POST /api/messages                 → 提交留言（status=pending，发邮件通知站长）
 *   GET  /api/messages/admin?action=approve|delete&id=..&token=..
 *                                      → 站长点邮件里的链接审核（HMAC 验签，无需登录）
 *
 * 存储：Cloudflare D1 (binding: DB)
 * 通知：Resend (env.RESEND_API_KEY / env.RESEND_FROM / env.ADMIN_EMAIL)
 * 安全：honeypot 蜜罐 + 同 IP 频率限制 + 审核 HMAC token + 所有输出转义
 */

var MAX_CONTENT = 2000;
var MAX_NAME = 60;
var MAX_EMAIL = 200;
var RATE_LIMIT_MS = 60 * 1000; // 同一 IP 60 秒内只能提交一次

function corsHeaders(request) {
  var origin = (request && request.headers && request.headers.get('Origin')) || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function json(data, status, request) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, corsHeaders(request)),
  });
}

function html(body) {
  return new Response(body, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function clientIp(request) {
  return (request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || '')
    .split(',')[0].trim();
}

async function sha256Hex(text) {
  var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(function (b) {
    return b.toString(16).padStart(2, '0');
  }).join('');
}

// 审核 token：HMAC-SHA256(ADMIN_SECRET, id)，base64url 编码
async function hmacToken(secret, id) {
  var key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  var sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(String(id)));
  return btoa(String.fromCharCode.apply(null, new Uint8Array(sig)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function sendEmail(env, origin, msg, id, token) {
  if (!env.RESEND_API_KEY) return;
  var approve = origin + '/api/messages/admin?action=approve&id=' + id + '&token=' + token;
  var del = origin + '/api/messages/admin?action=delete&id=' + id + '&token=' + token;
  var body = [
    '<div style="font-family:sans-serif;line-height:1.7;color:#1a1a1a;max-width:560px">',
    '<h2 style="margin:0 0 12px;font-size:18px">SampleDir 官网新留言</h2>',
    '<p style="margin:4px 0"><strong>昵称：</strong>' + escapeHtml(msg.name || '匿名') + '</p>',
    '<p style="margin:4px 0"><strong>邮箱：</strong>' + escapeHtml(msg.email || '未留') + '</p>',
    '<p style="margin:4px 0"><strong>语言：</strong>' + escapeHtml(msg.lang || 'zh') + '</p>',
    '<div style="background:#f4f4f5;padding:14px;border-radius:8px;margin:10px 0;white-space:pre-wrap">' + escapeHtml(msg.content) + '</div>',
    '<p style="margin:16px 0 8px">',
    '<a href="' + approve + '" style="background:#0d9488;color:#fff;text-decoration:none;padding:9px 18px;border-radius:7px;margin-right:10px">通过并展示</a>',
    '<a href="' + del + '" style="background:#e5e5e5;color:#333;text-decoration:none;padding:9px 18px;border-radius:7px">删除</a>',
    '</p></div>'
  ].join('');
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.RESEND_FROM || 'SampleDir <onboarding@resend.dev>',
        to: [env.ADMIN_EMAIL || 'hhztiger@gmail.com'],
        subject: 'SampleDir 官网新留言：' + (msg.name || '匿名'),
        html: body,
      }),
    });
  } catch (_) { /* 邮件失败不影响留言入库 */ }
}

/* ============ GET：已审核留言 / 审核操作 ============ */
export async function onRequestGet(context) {
  var request = context.request, env = context.env;
  var url = new URL(request.url);

  if (url.pathname.endsWith('/admin')) return handleAdmin(env, url);

  if (!env.DB) return json({ ok: false, error: 'db' }, 500, request);
  var res = await env.DB.prepare(
    'SELECT id, name, content, lang, created_at FROM messages WHERE status = ? ORDER BY created_at DESC, id DESC LIMIT 50'
  ).bind('approved').all();
  return json({ ok: true, messages: res.results || [] }, 200, request);
}

/* ============ POST：提交留言 ============ */
export async function onRequestPost(context) {
  var request = context.request, env = context.env;
  if (!env.DB) return json({ ok: false, error: 'db' }, 500, request);

  var body = {};
  try { body = await request.json(); } catch (_) { body = {}; }

  // honeypot：隐藏字段被填 → 机器人，假装成功但不入库
  if (body.website) return json({ ok: true, pending: true }, 200, request);

  var name = String(body.name || '').trim().slice(0, MAX_NAME);
  var email = String(body.email || '').trim().slice(0, MAX_EMAIL);
  var content = String(body.content || '').trim().slice(0, MAX_CONTENT);
  var lang = String(body.lang || 'zh').slice(0, 8);

  if (!content) return json({ ok: false, error: 'empty' }, 400, request);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'email' }, 400, request);
  }

  // 同 IP 频率限制（60 秒一次）
  var ipHash = await sha256Hex(clientIp(request) + ':sampledir');
  var last = await env.DB.prepare(
    'SELECT created_at FROM messages WHERE ip_hash = ? ORDER BY id DESC LIMIT 1'
  ).bind(ipHash).all();
  if (last.results && last.results.length && (Date.now() - last.results[0].created_at) < RATE_LIMIT_MS) {
    return json({ ok: false, error: 'rate' }, 429, request);
  }

  var created_at = Date.now();
  var info = await env.DB.prepare(
    'INSERT INTO messages (name, email, content, lang, status, ip_hash, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(name, email, content, lang, 'pending', ipHash, created_at).run();

  var id = (info.meta && info.meta.last_row_id) ? info.meta.last_row_id : null;

  // 邮件通知（带审核链接）
  if (id != null && env.ADMIN_SECRET) {
    var token = await hmacToken(env.ADMIN_SECRET, id);
    await sendEmail(env, url_origin(request), { name: name, email: email, content: content, lang: lang }, id, token);
  }

  return json({ ok: true, pending: true }, 200, request);
}

function url_origin(request) {
  try { return new URL(request.url).origin; } catch (_) { return ''; }
}

/* ============ 审核操作 ============ */
async function handleAdmin(env, url) {
  var action = url.searchParams.get('action');
  var id = parseInt(url.searchParams.get('id'), 10);
  var token = url.searchParams.get('token') || '';

  if (!env.DB) return html('数据库未绑定');
  if (!env.ADMIN_SECRET || !token || !id) return html('链接无效或已过期');

  var expected = await hmacToken(env.ADMIN_SECRET, id);
  if (token !== expected) return html('链接无效或已过期');

  if (action === 'approve') {
    await env.DB.prepare('UPDATE messages SET status = ? WHERE id = ?').bind('approved', id).run();
    return html('留言已通过并展示 ✅ <a href="/#guestbook">返回留言板</a>');
  }
  if (action === 'delete') {
    await env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(id).run();
    return html('留言已删除 🗑 <a href="/#guestbook">返回留言板</a>');
  }
  return html('未知操作');
}

/* ============ OPTIONS（CORS 预检）============ */
export async function onRequestOptions(context) {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
}
