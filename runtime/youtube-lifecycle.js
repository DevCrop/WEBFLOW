(function () {
  'use strict';
  if (window.__ID_YOUTUBE_LIFECYCLE__) return;
  window.__ID_YOUTUBE_LIFECYCLE__ = { version: '2.1.0' };
  var records = new Map(), pending = false, apiRequested = false;
  var selector = 'iframe[src*="youtube.com/embed/"],iframe[src*="youtube-nocookie.com/embed/"]';
  function source(frame) {
    try {
      var url = new URL(frame.getAttribute('src'), location.href);
      if (!/^(www\.)?(youtube\.com|youtube-nocookie\.com)$/.test(url.hostname)) return null;
      var id = url.pathname.match(/^\/embed\/([A-Za-z0-9_-]{11})$/);
      return id ? { url: url, id: id[1] } : null;
    } catch (_) { return null; }
  }
  function visible(record) {
    return record.frame.isConnected && !record.wrap.closest('[hidden],[aria-hidden="true"]') && record.wrap.getBoundingClientRect().width > 0 && record.wrap.getBoundingClientRect().height > 0;
  }
  function pause(record) {
    record.requested = false;
    if (record.player && record.ready) {
      try { record.player.pauseVideo(); } catch (_) {}
    }
  }
  function pauseAll(except) { records.forEach(function (record) { if (record !== except) pause(record); }); }
  function showPoster(record, ended) {
    clearTimeout(record.timer);
    record.requested = false;
    record.wrap.dataset.youtubeView = 'poster';
    record.poster.hidden = false;
    record.poster.setAttribute('aria-label', (ended ? '다시 재생: ' : '영상 재생: ') + record.title);
    record.frame.tabIndex = -1;
    record.frame.setAttribute('aria-hidden', 'true');
  }
  function showPlayer(record) {
    record.wrap.dataset.youtubeView = 'player';
    record.poster.hidden = true;
    if (record.tabindex === null) record.frame.removeAttribute('tabindex');
    else record.frame.setAttribute('tabindex', record.tabindex);
    record.frame.removeAttribute('aria-hidden');
  }
  function loadAPI() {
    if (window.YT && window.YT.Player) return;
    if (apiRequested) return;
    apiRequested = true;
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      var script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  }
  function connect(record) {
    if (record.player || !window.YT || !window.YT.Player || !visible(record)) return;
    var url = new URL(record.frame.src);
    url.searchParams.set('enablejsapi', '1');
    url.searchParams.set('origin', location.origin);
    url.searchParams.set('playsinline', '1');
    url.searchParams.set('autoplay', '0');
    if (url.href !== record.frame.src) record.frame.src = url.href;
    try {
      record.player = new window.YT.Player(record.frame, { events: {
        onReady: function (event) {
          record.ready = true;
          record.wrap.dataset.youtubeApi = 'ready';
          clearTimeout(record.timer);
          if (record.requested && !document.hidden && visible(record)) {
            showPlayer(record);
            event.target.playVideo();
          } else if (document.hidden || !visible(record)) pause(record);
        },
        onStateChange: function (event) {
          record.wrap.dataset.youtubeState = String(event.data);
          if (event.data === 1) {
            if (document.hidden || !visible(record)) { pause(record); return; }
            showPlayer(record);
            pauseAll(record);
          } else if (event.data === 0) {
            showPoster(record, true);
          }
        },
        onError: function () {
          record.wrap.dataset.youtubeApi = 'error';
          clearTimeout(record.timer);
          var requested = record.requested;
          record.requested = false;
          if (requested) showPlayer(record);
          else showPoster(record, false);
        }
      } });
    } catch (_) { showPlayer(record); }
  }
  function register(frame) {
    if (records.has(frame)) return;
    var data = source(frame);
    if (!data || frame.closest('[data-cookie-blocked]') || frame.hasAttribute('data-cookie-src')) return;
    var wrap = frame.parentElement;
    if (!wrap || !wrap.matches('.w-embed-youtubevideo,.youtube-native-player')) return;
    var record = { frame: frame, wrap: wrap, title: frame.title || 'YouTube', ready: false, requested: false, tabindex: frame.getAttribute('tabindex') };
    var poster = document.createElement('button');
    poster.type = 'button';
    poster.className = 'youtube-poster';
    var img = document.createElement('img');
    // Use widescreen thumbnails; hqdefault includes baked-in 4:3 letterboxing.
    var thumbnails = ['maxresdefault.jpg', 'hq720.jpg', 'mqdefault.jpg'], thumbnailIndex = 0;
    function nextThumbnail() {
      if (thumbnailIndex < thumbnails.length - 1) {
        thumbnailIndex++;
        img.src = 'https://i.ytimg.com/vi/' + data.id + '/' + thumbnails[thumbnailIndex];
      }
    }
    img.addEventListener('error', nextThumbnail);
    img.addEventListener('load', function () { if (img.naturalWidth < 200) nextThumbnail(); });
    img.src = 'https://i.ytimg.com/vi/' + data.id + '/' + thumbnails[thumbnailIndex];
    img.alt = '';
    img.loading = 'lazy';
    var play = document.createElement('span');
    play.className = 'youtube-poster-play';
    play.setAttribute('aria-hidden', 'true');
    play.textContent = '\u25b6';
    poster.append(img, play);
    record.poster = poster;
    records.set(frame, record);
    wrap.dataset.youtubeSurface = '';
    wrap.appendChild(poster);
    showPoster(record, false);
    var external = document.createElement('a');
    external.className = 'youtube-external';
    external.href = 'https://www.youtube.com/watch?v=' + data.id;
    external.target = '_blank';
    external.rel = 'noopener noreferrer';
    external.textContent = 'YouTube에서 보기';
    external.setAttribute('aria-label', record.title + ' - YouTube에서 보기 (새 탭)');
    wrap.insertAdjacentElement('afterend', external);
    record.external = external;
    external.addEventListener('click', function () { pauseAll(); });
    external.addEventListener('auxclick', function () { pauseAll(); });
    poster.addEventListener('click', function () {
      pauseAll(record);
      record.requested = true;
      showPlayer(record);
      loadAPI();
      connect(record);
      if (record.ready) record.player.playVideo();
      // Keep the native controls usable even when the API is unavailable.
      clearTimeout(record.timer);
      if (!record.ready) record.timer = setTimeout(function () {
        if (record.requested) { record.requested = false; showPlayer(record); }
      }, 8000);
    });
    loadAPI();
    connect(record);
  }
  function scan() {
    pending = false;
    document.querySelectorAll(selector).forEach(register);
    records.forEach(function (record, frame) {
      if (!frame.isConnected) {
        clearTimeout(record.timer);
        try { if (record.player) record.player.destroy(); } catch (_) {}
        record.poster.remove(); record.external.remove(); records.delete(frame);
      } else {
        connect(record);
        if (!visible(record)) pause(record);
      }
    });
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(scan); } }
  var previousReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () {
    try { if (typeof previousReady === 'function') previousReady(); } finally { schedule(); }
  };
  function init() {
    scan();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'hidden', 'aria-hidden', 'class'] });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', function () { if (document.hidden) pauseAll(); });
    window.addEventListener('pagehide', function () { pauseAll(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
