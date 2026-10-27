(function () {
  'use strict';
  if (window.__ID_REPORT_FORM_METADATA__) return;
  window.__ID_REPORT_FORM_METADATA__ = { version: '1.0.0' };
  var selector = 'dialog[data-report-modal] form, .resource-request form';
  function isReport(form) {
    return form && form.tagName === 'FORM' && form.matches(selector) &&
      (form.getAttribute('data-name') === '2026 eDiscovery Survey Report Request' ||
       form.getAttribute('name') === '2026 eDiscovery Survey Report Request');
  }
  function sync(form) {
    if (!isReport(form)) return;
    var english = /^en(?:-|$)/i.test(document.documentElement.lang) ||
      /^\/en(?:\/|$)/i.test(location.pathname);
    [
      ['Language', '접수 언어', english ? 'EN' : 'KO'],
      ['Page URL', '접수 페이지 URL', location.origin + location.pathname]
    ].forEach(function (entry) {
      var input = form.querySelector('input[name="' + entry[0] + '"]');
      if (!input) {
        input = document.createElement('input');
        input.type = 'hidden';
        input.name = entry[0];
        form.appendChild(input);
      }
      input.setAttribute('data-name', entry[1]);
      input.value = entry[2];
    });
  }
  function scan() {
    document.querySelectorAll(selector).forEach(sync);
  }
  // Capture precedes Webflow's delegated serialization; do not submit or cancel.
  document.addEventListener('submit', function (event) { sync(event.target); }, true);
  window.addEventListener('pageshow', scan);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan, { once: true });
  } else scan();
}());

