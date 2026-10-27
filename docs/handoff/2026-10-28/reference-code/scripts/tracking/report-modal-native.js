/* Draft report dialog only. Native dialog owns modality; this owns scroll locking. */
(function () {
  'use strict';
  function initialize() {
  var dialog = document.querySelector('dialog[data-report-modal]');
  if (!dialog) return false;
  if (dialog.dataset.scrollLockBound) return true;
  dialog.dataset.scrollLockBound = 'true';
  var body = document.body, root = document.documentElement;
  var saved = null;
  var bodyKeys = ['position', 'top', 'left', 'right', 'width', 'overflow'];
  function snapshot(element, keys) {
    return keys.map(function (key) {
      return [key, element.style.getPropertyValue(key), element.style.getPropertyPriority(key)];
    });
  }
  function restore(element, values) {
    values.forEach(function (entry) {
      if (entry[1]) element.style.setProperty(entry[0], entry[1], entry[2]);
      else element.style.removeProperty(entry[0]);
    });
  }
  function lock() {
    if (saved) return;
    saved = { x: window.scrollX, y: window.scrollY,
      body: snapshot(body, bodyKeys), root: snapshot(root, ['overflow', 'scroll-behavior']) };
    root.style.setProperty('overflow', 'hidden');
    body.style.setProperty('position', 'fixed');
    body.style.setProperty('top', -saved.y + 'px');
    body.style.setProperty('left', -saved.x + 'px');
    body.style.setProperty('right', '0');
    body.style.setProperty('width', '100%');
    body.style.setProperty('overflow', 'hidden');
  }
  function unlock() {
    if (!saved) return;
    var previous = saved;
    saved = null;
    restore(body, previous.body);
    restore(root, previous.root);
    root.style.setProperty('scroll-behavior', 'auto');
    window.scrollTo(previous.x, previous.y);
    restore(root, previous.root.filter(function (entry) { return entry[0] === 'scroll-behavior'; }));
  }
  dialog.addEventListener('beforetoggle', function (event) {
    if (event.newState === 'open') lock();
  });
  dialog.addEventListener('close', unlock);
  new MutationObserver(function () {
    if (dialog.open) lock(); else unlock();
  }).observe(dialog, { attributes: true, attributeFilter: ['open'] });
  document.addEventListener('click', function (event) {
    var button = event.target.closest('button[commandfor]');
    if (!button || button.getAttribute('commandfor') !== dialog.id || button.disabled) return;
    var command = button.getAttribute('command');
    if (command === 'show-modal' && !dialog.open) lock();
    // Older browsers still use their native dialog API, not a custom overlay.
    if (!('commandForElement' in button)) {
      event.preventDefault();
      if (command === 'show-modal' && !dialog.open) {
        try { dialog.showModal(); } catch (error) { unlock(); throw error; }
      } else if (command === 'close') dialog.close();
    }
  }, true);
  // Backdrop wheel is blocked; native overscroll containment keeps inner controls usable.
  document.addEventListener('wheel', function (event) {
    if (!dialog.open) return;
    var inside = dialog.contains(event.target);
    if (!inside) event.preventDefault();
  }, { passive: false, capture: true });
  if (dialog.open) lock();
  return true;
  }
  // Designer/custom-code previews may mount their page after the footer script runs.
  if (!initialize()) {
    var mountObserver = new MutationObserver(function () {
      if (initialize()) mountObserver.disconnect();
    });
    mountObserver.observe(document.documentElement, { childList: true, subtree: true });
  }
}());
