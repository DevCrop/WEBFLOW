/* Only the 2026 report article: keep the original download-page href as fallback. */
(function () {
  'use strict';
  var slug = '/newsroom/2026-korean-companies-ediscovery-survey-report';
  function reportPath(path) { return path.replace(/\/$/, '') === slug || path.replace(/\/$/, '') === '/en' + slug; }
  function eligibleArticle() {
    if (reportPath(location.pathname)) return true;
    // Native Designer preview renders the selected CMS article's heading in its DOM.
    if (!/\.design\.webflow\.com$|\.canvas\.webflow\.com$/.test(location.hostname)) return false;
    var heading = document.querySelector('[data-cms-view="newsroom"] h1, .sub-visual h1');
    var title = heading && heading.textContent.replace(/\s+/g, ' ').trim();
    return !!title && (/2026 한국 기업의 해외 소송 eDiscovery 실태조사 리포트/.test(title) || /Intellectual Data Publishes.*2026 Survey Report on Korean Companies/.test(title));
  }
  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !eligibleArticle()) return;
    var link = event.target.closest('a[href]');
    if (!link || !link.closest('[data-cms-view="newsroom"]') || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    var url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !/^\/(?:en\/)?ediscovery-survey-2026\/?$/.test(url.pathname) || url.search || url.hash) return;
    var dialog = document.querySelector('dialog[data-report-modal]');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    try {
      if (!dialog.open) dialog.showModal();
      event.preventDefault();
      // Designer preview has its own SPA link router; do not let it navigate afterwards.
      event.stopImmediatePropagation();
    } catch (_) { /* Keep the existing page link usable if native dialog cannot open. */ }
  }, true);
}());
