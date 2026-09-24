(function () {
  'use strict';
  function fileURL(link) {
    var raw = link && link.getAttribute('href');
    if (!raw || !raw.trim() || raw.trim().charAt(0) === '#') return null;
    try {
      var url = new URL(raw, location.href);
      return /^https?:$/.test(url.protocol) && url.href !== location.href ? url : null;
    } catch (_) { return null; }
  }
  function sync() {
    document.querySelectorAll('.sub-release-board__item').forEach(function (item) {
      var icon = item.querySelector('[data-release-attachment]');
      if (!icon) return;
      var hasFile = !!fileURL(item.querySelector('[data-release-file-source]'));
      icon.hidden = !hasFile;
      icon.setAttribute('data-has-attachment', String(hasFile));
      icon.setAttribute('aria-label', '첨부파일 있음');
      icon.setAttribute('role', 'img');
    });
    document.querySelectorAll('.sub-release-detail__attachment').forEach(function (wrap) {
      var link = wrap.querySelector('[data-cms-download]');
      wrap.hidden = !fileURL(link);
      if (link && !wrap.hidden) link.setAttribute('download', '');
    });
  }
  function init() {
    sync();
    var board = document.querySelector('.sub-release-board__list');
    if (board) new MutationObserver(sync).observe(board, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
    document.querySelectorAll('.sub-release-detail__attachment [data-cms-download]').forEach(function (link) {
      var status = document.createElement('p');
      status.setAttribute('role', 'status');
      status.hidden = true;
      link.parentElement.appendChild(status);
      link.addEventListener('click', async function (event) {
        var url = fileURL(link);
        if (!url) { event.preventDefault(); return; }
        event.preventDefault();
        if (link.getAttribute('aria-busy') === 'true') return;
        link.setAttribute('aria-busy', 'true');
        status.hidden = true;
        var controller = new AbortController();
        var timer = setTimeout(function () { controller.abort(); }, 60000);
        try {
          var response = await fetch(url.href, { credentials: 'omit', signal: controller.signal });
          if (!response.ok) throw new Error('File unavailable');
          var blob = await response.blob();
          if (!blob.size) throw new Error('Empty file');
          var name = decodeURIComponent(url.pathname.split('/').pop() || 'attachment').replace(/^[a-f0-9]{24}_/i, '');
          var objectURL = URL.createObjectURL(blob);
          var anchor = document.createElement('a');
          anchor.href = objectURL;
          anchor.download = name.replace(/[\\/:*?"<>|]/g, '_');
          anchor.hidden = true;
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          setTimeout(function () { URL.revokeObjectURL(objectURL); }, 60000);
        } catch (_) {
          status.textContent = '다운로드하지 못했습니다. 잠시 후 다시 시도해 주세요.';
          status.hidden = false;
        } finally {
          clearTimeout(timer);
          link.removeAttribute('aria-busy');
        }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
