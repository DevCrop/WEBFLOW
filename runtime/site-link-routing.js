(function () {
  'use strict';
  if (window.__ID_SITE_LINK_ROUTING__) return;
  window.__ID_SITE_LINK_ROUTING__ = { version: '1.0.0' };
  var queued = false;
  function english() { return /^\/en(?:\/|$)/.test(location.pathname); }
  function localeLink(lang) {
    var alternate = document.querySelector('link[rel="alternate"][hreflang="' + lang + '"]');
    if (alternate) {
      try {
        var url = new URL(alternate.href, location.href);
        if (url.origin === location.origin) return url.pathname + location.search + location.hash;
      } catch (_) {}
    }
    var path = location.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    return (lang === 'en' ? '/en' : '') + path + location.search + location.hash;
  }
  function update() {
    queued = false;
    document.querySelectorAll('a[data-gallery-collection][data-gallery-slug]').forEach(function (a) {
      var collection = a.dataset.galleryCollection, slug = a.dataset.gallerySlug.trim();
      if (!/^(insights|newsroom)$/.test(collection) || !slug || /^(undefined|null|#)$/.test(slug)) return;
      // The CMS owns the item slug, so new or reordered cards need no code changes.
      a.href = (english() ? '/en' : '') + '/' + collection + '/' + encodeURIComponent(slug);
    });
    document.querySelectorAll('a[data-site-locale]').forEach(function (a) {
      var lang = a.dataset.siteLocale;
      if (lang !== 'en' && lang !== 'ko') return;
      a.href = localeLink(lang);
      a.hreflang = lang;
      if ((lang === 'en') === english()) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    document.querySelectorAll('.header__lang-label').forEach(function (label) {
      var text = english() ? 'EN' : 'KO';
      if (label.textContent !== text) label.textContent = text;
    });
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  function init() {
    update();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-gallery-slug', 'data-site-locale'] });
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
