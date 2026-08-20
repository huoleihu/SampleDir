/*!
 * SampleDir website — 点击埋点
 * 仅上报「动作 + 页面 + 浏览器语言」，不存 IP / UA / Cookie / PII
 * 失败静默：不打扰用户、不报错
 */
(function () {
  'use strict';

  // 仅一次性：日志里能看到埋点模块加载
  if (window.console && console.debug) console.debug('[track] loaded');

  function send(action, extra) {
    var data = {
      action: String(action || 'unknown').slice(0, 64),
      page: String(location.pathname || '').slice(0, 128),
      ref: String(document.referrer || '').slice(0, 256),
      lang: String((document.documentElement.lang || '').slice(0, 16)),
      ts: Date.now(),
    };
    if (extra && typeof extra === 'object') {
      for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) {
        data[k] = String(extra[k]).slice(0, 128);
      }
    }

    // sendBeacon：浏览器关闭也能送达，不阻塞返回
    try {
      var payload = new Blob([JSON.stringify(data)], { type: 'application/json' });
      if (!navigator.sendBeacon('/api/track', payload)) {
        // 兜底：fetch keepalive
        fetch('/api/track', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
        }).catch(function () {});
      }
    } catch (_) { /* 失败静默 */ }
  }

  // ① 点击埋点：监听带 data-track 的元素
  document.addEventListener('click', function (e) {
    var el = (e.target && e.target.closest) ? e.target.closest('[data-track]') : null;
    if (!el) return;
    // 跳过置灰/禁用按钮（不计入"点击"）
    if (el.classList && el.classList.contains('btn--disabled')) return;
    if (el.getAttribute && el.getAttribute('aria-disabled') === 'true') return;
    send(el.dataset.track);
  }, { passive: true });

  // ② PV：页面加载 + history.pushState 切换时各打一次
  function pv() { send('__pv'); }
  window.addEventListener('load', pv, { once: true });
  // 单页 hash 跳转（本站是 hash 锚点，不触发 pushState，但保留通用支持）
  var _push = history.pushState;
  history.pushState = function () { var r = _push.apply(this, arguments); pv(); return r; };
  window.addEventListener('popstate', pv);
})();
