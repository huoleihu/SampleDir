/**
 * SampleDir 官网访客统计上报（非阻塞、静默失败）。
 *
 * 设计原则：
 *  - 无论后端是否可达、是否报错，都绝不影响页面正常展示与交互。
 *  - 优先用 navigator.sendBeacon（页面切换也不丢），回退到 fetch(keepalive)，
 *    二者均异步、不阻塞渲染；任何异常全部 try/catch 吞掉。
 *
 * 上报内容：
 *  - 页面加载：event=page_view
 *  - 点击 #dl123 / #dlQuark：event=download_click，target=123 / quark
 *
 * IP / 浏览器 / 操作系统由后端从请求头提取，前端只传 page / event / target。
 */
(function () {
  'use strict';

  // 上报接口地址。
  // 若官网与后端（mydaox_plus）同源或经反向代理同一域名，使用相对路径即可；
  // 若官网是独立域名 / GitHub Pages / CDN，请改成后端完整地址，例如：
  //   window.SAMPLE_DIR_TRACK_ENDPOINT = 'https://api.yourdomain.com/api/track';
  var TRACK_ENDPOINT =
    (window.SAMPLE_DIR_TRACK_ENDPOINT) || '/api/track';

  function buildPayload(extra) {
    extra = extra || {};
    return {
      page: location.pathname || '/',
      event: extra.event || 'page_view',
      target: extra.target || null
    };
  }

  function send(payload) {
    try {
      var body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        var blob = new Blob([body], { type: 'application/json' });
        var ok = navigator.sendBeacon(TRACK_ENDPOINT, blob);
        if (ok) {
          return;
        }
        // sendBeacon 队列满时返回 false，降级到 fetch
      }
      if (typeof fetch === 'function') {
        fetch(TRACK_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          keepalive: true
        }).catch(function () {
          // 静默失败：不影响页面
        });
      }
    } catch (e) {
      // 任何异常都吞掉，绝不影响页面
    }
  }

  function trackPageView() {
    send(buildPayload({ event: 'page_view' }));
  }

  function bindDownload(id, target) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.addEventListener('click', function () {
      send(buildPayload({ event: 'download_click', target: target }));
    });
  }

  function init() {
    trackPageView();
    bindDownload('dl123', '123');
    bindDownload('dlQuark', 'quark');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
