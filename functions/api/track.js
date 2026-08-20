/*!
 * SampleDir website — Cloudflare Pages Function
 * 端点:  POST /api/track
 * 接收埋点 JSON，写入 CF Analytics Engine (binding: ANALYTICS)
 * - 不存 IP / UA / Cookie / PII
 * - 默认 dataset: sampledir_clicks（由 wrangler.toml 绑定）
 */
function write(env, blobs, doubles, indexes) {
  if (!env || !env.ANALYTICS) return;
  try {
    env.ANALYTICS.writeDataPoint({
      blobs: blobs,
      doubles: doubles,
      indexes: indexes,
    });
  } catch (_) { /* 不让分析写入阻塞业务 */ }
}

function corsHeaders(request) {
  var origin = (request && request.headers && request.headers.get('Origin')) || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export async function onRequestPost({ request, env }) {
  let body = {};
  try {
    const raw = await request.text();
    body = raw ? JSON.parse(raw) : {};
  } catch (_) {
    body = {};
  }

  const action = String(body.action || 'unknown').slice(0, 64);
  const page   = String(body.page   || '').slice(0, 128);
  const ref    = String(body.ref    || '').slice(0, 256);
  const lang   = String(body.lang   || '').slice(0, 16);

  write(env, [action, page, lang, ref], [Date.now()], [action]);

  return new Response('', {
    status: 204,
    headers: corsHeaders(request),
  });
}

export async function onRequestOptions({ request }) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}
