// Cloudflare Pages Function 全局中间件（functions/_middleware.js 对每次请求生效）。
//
// 目的：规范域名统一 —— 把裸域 sampledir.com 在服务端 301 到 www.sampledir.com，
//       避免 Google 把裸域与 www 当成两个站点并行收录、产生重复变体。
//
// 约束（务必守住，否则会误伤正常入口）：
//   - 只处理「裸域 → www」这一件事；
//   - 不动 ?autodl=1#download（App「检查更新」下载链路使用）；
//   - 其余请求（含 /api/* 统计、静态资源、路径式语言页 /en/ /ko/ /ja/）一律原样放行，
//     旧 ?lang=xx 参数不再兼容，交由前端按路径规则渲染默认中文。
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 裸域 sampledir.com → www.sampledir.com（保留路径与查询）
  if (url.hostname === 'sampledir.com') {
    const loc = 'https://www.sampledir.com' + url.pathname + url.search + url.hash;
    return new Response(null, { status: 301, headers: { Location: loc } });
  }

  // 其余请求原样放行
  return next();
}
