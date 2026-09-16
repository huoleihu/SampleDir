/*!
 * track.js —— SampleDir 官网访客访问/点击统计（非阻塞、零污染）
 *
 * 复用 macdh 官网同一套后端接口： POST /api/track（免登录）。
 * 由 Cloudflare Pages Function（functions/api/[[path]].js）反代到内网 mydaox 后端，
 * 写入 site_visit_log；管理后台「访问统计」按 site=sampledir 即可看到浏览记录与按钮记录。
 *
 * 设计原则（重要）：
 *  1. 全程不修改任何 DOM、不依赖任何第三方库，单独加载不影响页面渲染。
 *  2. 通过 <script data-site="sampledir"> 上的 data-site 区分站点；
 *     后端也会按 page 路径前缀兜底，所以即使 data-site 缺失也不会串站。
 *  3. 上报用 navigator.sendBeacon（页面卸载也能送达），失败回退 fetch(keepalive)。
 *  4. 任何异常（接口不可达 / 跨域被拦 / 离线 / 后端不存在）一律静默吞掉，
 *     因此即便后端不可用，静态页面也照常显示、不受影响。
 */
(function () {
  'use strict';

  var SITE = (document.currentScript && document.currentScript.getAttribute('data-site')) || 'sampledir';
  var API_BASE = (window.__STAT_API__ && String(window.__STAT_API__).replace(/\/+$/, '')) || '/api';
  var TRACK_URL = API_BASE + '/track';

  function send(payload) {
    try {
      var body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        var blob = new Blob([body], { type: 'application/json' });
        if (navigator.sendBeacon(TRACK_URL, blob)) return;
      }
      if (window.fetch) {
        fetch(TRACK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          keepalive: true
        }).catch(function () { /* 静默 */ });
      }
    } catch (e) { /* 静默：统计失败绝不影响页面 */ }
  }

  function track(event, target) {
    send({
      site: SITE,
      page: location.pathname,
      event: event,
      target: target || null
    });
  }

  // 页面访问：DOM 就绪即上报一次（脚本 async，可能已在 DOMContentLoaded 之后）
  function reportView() { track('page_view'); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reportView, { once: true });
  } else {
    reportView();
  }

  // 通用点击：事件委托捕获交互元素，统一上报。
  // 优先取带 data-track 的元素（语义化按钮标识）；无 data-track 时回退到最近的可交互元素
  // （a / button / [role=button] / .btn），用结构化标识记录，确保「点了哪个按钮」可被分辨。
  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;
    var el = e.target.closest('[data-track]');
    var viaTrack = !!el;
    if (!el) {
      el = e.target.closest('a,button,[role="button"],.btn');
    }
    if (!el) return;
    var t = viaTrack ? (el.getAttribute('data-track') || 'unknown') : describeEl(el);
    // dl-* 视为下载点击，便于后台「下载渠道点击分布」复用；其余一律记为通用点击
    if (t.indexOf('dl-') === 0) {
      track('download_click', t.slice(3));
    } else {
      track('click', t);
    }
  }, true);

  // 无显式 data-track 时，用元素结构生成稳定可读标识（不含文本，避免语言切换把同一按钮拆成多个分组）。
  // 形如 auto:a#float-msg / auto:button.btn-get.main ；裸元素无 id/class 时才退回文本。
  function describeEl(el) {
    var tag = (el.tagName || 'el').toLowerCase();
    var id = el.id ? '#' + el.id : '';
    var cls = (typeof el.className === 'string' && el.className.trim())
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    if (id || cls) return 'auto:' + tag + id + cls;
    var txt = (el.textContent || '').replace(/\s+/g, ' ').trim().substring(0, 12);
    return 'auto:' + (txt ? txt : tag);
  }
})();
