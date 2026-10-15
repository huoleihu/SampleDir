// Cloudflare Pages Function 全局中间件（functions/_middleware.js 对每次请求生效）。
//
// 目的：把「历史遗留 / 非规范」的旧 URL 在服务端直接 301 到规范地址，
//       让 Google 立即判定这些旧地址为「已迁移」并从索引里清理，
//       不再依赖客户端 JS 重定向慢慢收敛（那个只处理真人访问，爬虫收敛慢）。
//
// 处理两类旧地址：
//   1) 裸域 sampledir.com  →  www.sampledir.com（规范域名统一）
//   2) 遗留 ?lang=xx        → 路径式规范地址（zh→/、en→/en/、ko→/ko/、ja→/ja/）
//
// 约束（务必守住，否则会误伤正常入口）：
//   - ?lang= 仅作用于语言页（/ 或 /index.html），绝不 301 资源文件（/assets/* 等）；
//   - 不动 ?autodl=1#download（App「检查更新」下载链路使用，无 lang 参数本来就不会命中）；
//   - 无 lang 且已是 www 的请求直接 next()，不干扰 /api/* 统计上报与静态资源。
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // ① 裸域 → www（保留路径与查询，便于和下面 ?lang= 合并处理）
  if (url.hostname === 'sampledir.com') {
    const loc = 'https://www.sampledir.com' + url.pathname + url.search + url.hash;
    return new Response(null, { status: 301, headers: { Location: loc } });
  }

  // ② 遗留 ?lang=xx → 路径式规范地址（只针对语言页）
  if (url.pathname === '/' || url.pathname === '/index.html') {
    const lang = url.searchParams.get('lang');
    const map = { zh: '/', en: '/en/', ko: '/ko/', ja: '/ja/' };
    if (lang && map[lang]) {
      return new Response(null, { status: 301, headers: { Location: map[lang] } });
    }
  }

  // 其余请求（含 /api/* 统计、静态资源、规范路径）原样放行
  return next();
}
