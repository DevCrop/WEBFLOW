/* Modal only. Webflow owns validation, submission, notifications and acceptance. */
(function () {
  'use strict';
  function initialize() {
    var modal = document.querySelector('dialog[data-report-modal]');
    if (!modal) return false;
    var form = modal.querySelector('form');
    var wrapper = form && form.closest('.w-form');
    var done = wrapper && wrapper.querySelector('.w-form-done');
    var fail = wrapper && wrapper.querySelector('.w-form-fail');
    var link = done && done.querySelector('a[data-report-pdf="ready"]');
    var button = form && form.querySelector('[type="submit"]');
    if (!link || !button) return false;
    if (modal.dataset.inlineDownloadBound) return true;
    modal.dataset.inlineDownloadBound = 'true';
    modal.setAttribute('data-report-inline-download', 'true');
    // Keep Webflow's real success signal intact; visually suppress its legacy card.
    done.setAttribute('aria-hidden', 'true');
    var en, filename, labels;
    var originalLabel = button.value;
    var originalFormDisplay = form.style.display;
    function refreshLocale() {
      // Localization/runtime code can run after this embed. Read the current PDF
      // variant again when opening/submitting, rather than caching parser-time lang.
      en = /_EN\.pdf(?:[?#]|$)/i.test(link.href) ||
        (!/_KR\.pdf(?:[?#]|$)/i.test(link.href) && /^en(?:-|$)/i.test(document.documentElement.lang));
      filename = 'Intellectual_Data_2026_eDiscovery_Survey_Report_Korean_Companies_' + (en ? 'EN' : 'KR') + '.pdf';
      labels = en ? {
      submitting: 'Submitting...', downloading: 'Downloading...', retry: 'Retry download', again: 'Download again',
      started: 'Download requested. If the file does not appear, click Download again.',
      failed: 'The form was received, but the download could not start. Please retry.',
      rejected: 'The form could not be submitted. Please try again.'
    } : {
      submitting: '접수 중…', downloading: '다운로드 중…', retry: '다운로드 다시 시도', again: '다시 다운로드',
      started: '다운로드를 요청했습니다. 파일이 보이지 않으면 다시 다운로드해 주세요.',
      failed: '신청은 접수되었으나 다운로드를 시작하지 못했습니다. 다시 시도해 주세요.',
      rejected: '접수하지 못했습니다. 다시 시도해 주세요.'
    };
      button.setAttribute('data-wait', labels.submitting);
    }
    refreshLocale();
    var status = document.createElement('p');
    status.className = 'section-ui-body regular';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('data-report-download-status', 'true');
    status.hidden = true;
    button.parentElement.appendChild(status);
    var phase = 'idle', accepted = false;
    modal.addEventListener('toggle', function () {
      if (modal.open && phase === 'idle') refreshLocale();
    });
    function busy(label) {
      button.value = label;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
    }
    function available(label) {
      button.value = label;
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
    function visibleSignal(element) {
      return element && element.style.display && element.style.display !== 'none' && !element.hidden;
    }
    async function download() {
      if (!accepted || phase === 'downloading') return;
      refreshLocale();
      phase = 'downloading';
      busy(labels.downloading);
      status.hidden = false;
      status.textContent = labels.downloading;
      try {
        var url = new URL(link.href, location.href);
        if (url.protocol !== 'https:' || url.hostname !== 'cdn.prod.website-files.com' ||
            !url.pathname.startsWith('/6a38f39fe95d43bbdbe5c71c/')) throw new Error('Unexpected PDF URL');
        var response = await fetch(url.href, { mode: 'cors', credentials: 'omit' });
        if (!response.ok) throw new Error('PDF request failed');
        var blob = await response.blob();
        if (!blob.size || !/^application\/pdf(?:;|$)/i.test(blob.type)) throw new Error('Invalid PDF response');
        var objectURL = URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        anchor.href = objectURL;
        anchor.download = filename;
        anchor.hidden = true;
        document.body.appendChild(anchor);
        try { anchor.click(); }
        finally {
          anchor.remove();
          setTimeout(function () { URL.revokeObjectURL(objectURL); }, 60000);
        }
        phase = 'downloaded';
        status.textContent = labels.started;
        available(labels.again);
      } catch (_) {
        phase = 'retry';
        status.textContent = labels.failed;
        available(labels.retry);
      }
    }
    form.addEventListener('submit', function (event) {
      if (accepted || phase === 'submitting') {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      if (event.defaultPrevented || !form.checkValidity()) return;
      refreshLocale();
      originalLabel = button.value;
      phase = 'submitting';
      status.hidden = true;
      // Leave the submit input enabled until Webflow's delegated handler runs.
      queueMicrotask(function () { if (phase === 'submitting') busy(labels.submitting); });
    }, true);
    button.addEventListener('click', function (event) {
      if (!accepted) return;
      event.preventDefault();
      download();
    });
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (accepted) download();
    });
    new MutationObserver(function () {
      if (phase !== 'submitting') return;
      if (visibleSignal(done)) {
        accepted = true;
        phase = 'accepted';
        // No redirect or synthetic success: retain the form at the same location.
        form.style.display = originalFormDisplay;
        button.type = 'button';
        download();
      } else if (visibleSignal(fail)) {
        phase = 'idle';
        status.hidden = false;
        status.textContent = labels.rejected;
        available(originalLabel);
      }
    }).observe(wrapper, { attributes: true, attributeFilter: ['style', 'class'], subtree: true });
    return true;
  }
  if (!initialize()) {
    var observer = new MutationObserver(function () { if (initialize()) observer.disconnect(); });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
}());
