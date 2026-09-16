// Cloudflare Pages Function：把同源的 /api/* 反向代理到内网后端（经 Cloudflare Tunnel api.sampledir.com）
// 运行在 sampledir.pages.dev 同源，浏览器无 CORS 问题。
//
// 作用：SampleDir 官网（静态）通过 stats.js 上报浏览/点击到同源 /api/track，
// 由本函数转发到 mydaox 后端 POST /api/track，写入 site_visit_log，
// 管理后台「访问统计」按 site=sampledir 即可看到浏览记录与按钮记录。
//
// 与 macdh 官网完全一致的机制；后端地址固定为 api.sampledir.com（命名 Tunnel，永久不变）。
// 若后端不可达，本函数返回 502，但 stats.js 已对非阻塞上报失败静默处理，
// 因此无论后端是否存在，静态页面都照常显示、不受影响。
export async function onRequest(context) {
  const { request, env } = context;

  // 优先用环境变量覆盖（可选）；否则回退到命名 Tunnel 固定地址。
  const backend = (env.BACKEND_URL || "").replace(/\/+$/, "");
  const fallback = "https://api.sampledir.com";
  const target_origin = backend || fallback;

  const url = new URL(request.url);
  // 重组目标 URL：保留 /api 之后的 path + query，仅替换协议与主机
  const target = target_origin.replace(/\/+$/, "") + url.pathname + url.search;

  // 复制请求头，去掉会被后端误用的 host / cloudflare 内部头
  const headers = new Headers(request.headers);
  headers.delete("host");
  // 透传真实访客 IP：后端 site_visit_log 取 X-Forwarded-For / X-Real-IP 的首个真实地址，
  // 否则会全部记成 Cloudflare 边缘出口 IP。
  const realIp = (request.headers.get("cf-connecting-ip")
                  || request.headers.get("x-forwarded-for")
                  || "").split(",")[0].trim();
  if (realIp) {
    headers.set("X-Forwarded-For", realIp);
    headers.set("X-Real-IP", realIp);
  }
  headers.delete("cf-request-id");
  headers.delete("cf-visitor");
  headers.delete("cf-ray");

  const init = {
    method: request.method,
    headers,
    redirect: "manual",
  };
  // GET/HEAD 不能有 body
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }

  try {
    const resp = await fetch(target, init);
    return resp;
  } catch (e) {
    return new Response("代理内网后端失败: " + (e && e.message ? e.message : e), {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
}
