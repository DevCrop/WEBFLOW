!function(){"use strict";if(!window.__ID_UI_CONTROLLER__){window.__ID_UI_CONTROLLER__={version:"1.1.69"};var e,t,r,a="/search-results",i=(e=[],t="",{lock:function(r){e.indexOf(r)>=0||(e.length||(t=document.body.style.overflow||""),e.push(r),document.body.style.overflow="hidden",document.body.classList.add("is-modal-open"))},unlock:function(r){(e=e.filter(function(e){return e!==r})).length||(t?document.body.style.overflow=t:document.body.style.removeProperty("overflow"),document.body.classList.remove("is-modal-open"))}});r=function(){S(m),S(c),S(u),S(d),S(L),S(f),S(b),S(v),S(p),S(g),S(h),S(w),S(A),S(_),S(k)},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",r):r()}function n(e){return String(e||"").toLowerCase().replace(/[®™]/g,"").replace(/\s+/g," ").trim()}function o(e){return Array.prototype.slice.call(e.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(function(e){return"true"!==e.getAttribute("aria-hidden")&&!e.hidden&&e.getClientRects().length&&!e.closest("[inert]")})}function s(e,t){if("Tab"===e.key){var r=o(t);if(r.length){var a=r[0],i=r[r.length-1];e.shiftKey&&document.activeElement===a?(e.preventDefault(),i.focus()):e.shiftKey||document.activeElement!==i||(e.preventDefault(),a.focus())}}}function l(e){var t=String(e||"").trim();t&&window.location.assign(a+"?q="+encodeURIComponent(t))}function c() {
  document.querySelectorAll('.header__search').forEach(function(root) {
    if (root.dataset.idSearchReady === 'true') return;
    var panel=root.querySelector('.header__search-panel'), inner=root.querySelector('.header__search-inner'), toggle=root.querySelector('.header__search-toggle'), input=root.querySelector('.header__search-input'), submit=root.querySelector('.header__search-submit'), close=root.querySelector('.header__search-close');
    if(!panel||!inner||!toggle||!input||!submit||!close)return;
    root.dataset.idSearchReady='true';
    panel.classList.add('ui-modal-backdrop');
    panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');
    var title=root.querySelector('.header__search-title');
    if(title){title.id=title.id||'site-search-title';panel.setAttribute('aria-labelledby',title.id);}
    input.setAttribute('enterkeyhint','search');
    var opened=false,anim=null,token=0;
    function dismiss(){if(panel.classList.contains('w--open')){if(window.jQuery)window.jQuery(root).triggerHandler('w-close.w-dropdown');else toggle.click();}}
    function send(event){event.preventDefault();if(!input.value.trim()){input.focus();return;}l(input.value);}
    submit.setAttribute('href',a);submit.setAttribute('role','button');
    submit.addEventListener('click',send);
    submit.addEventListener('keydown',function(e){if(e.key===' ')send(e);});
    input.addEventListener('keydown',function(e){if(e.key==='Enter')send(e);});
    close.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();dismiss();});
    close.addEventListener('keydown',function(e){if(e.key===' '){e.preventDefault();dismiss();}});
    panel.addEventListener('click',function(e){if(e.target===panel)dismiss();});
    panel.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();dismiss();}else s(e,panel);});
    function sync(initial){
      var next=panel.classList.contains('w--open');if(!initial&&next===opened)return;
      opened=next;var id=++token;
      if(anim){anim.cancel();anim=null;}
      toggle.setAttribute('aria-expanded',String(next));panel.setAttribute('aria-hidden',String(!next));panel.inert=!next;
      panel.classList.toggle('is-visible',next);inner.classList.toggle('is-search-visible',next);
      if(next){i.lock(root);document.querySelectorAll('.header__mobile-panel.w--open').forEach(function(p){var t=p.closest('.header__mobile').querySelector('.header__mobile-toggle');if(t&&window.jQuery)window.jQuery(p.closest('.header__mobile')).triggerHandler('w-close.w-dropdown');});}else{i.unlock(root);if(panel.contains(document.activeElement))toggle.focus({preventScroll:true});}
      panel.style.display=next?'flex':'none';
      if(initial||matchMedia('(prefers-reduced-motion: reduce)').matches||!inner.animate){if(next)input.focus({preventScroll:true});return;}
      panel.style.display='flex';
      anim=inner.animate(next?[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}]:[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(8px)'}],{duration:next?260:180,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
      if(next)input.focus({preventScroll:true});
      anim.finished.then(function(){if(id!==token)return;panel.style.display=next?'flex':'none';anim.cancel();anim=null;},function(){});
    }
    new MutationObserver(function(){sync(false);}).observe(panel,{attributes:true,attributeFilter:['class']});sync(true);
  });
}

function u(){if(window.location.pathname.replace(/\/+$/,"")===a)return document.querySelector(".search-results")}function d(){var e=document.querySelector("[data-release-board]");if(e&&"true"!==e.getAttribute("data-id-release-ready")){var t=e.querySelector(".sub-release-board__list"),r=Array.prototype.slice.call(e.querySelectorAll(".sub-release-board__row"));if(t){e.setAttribute("data-id-release-ready","true"),t.id=t.id||"release-results",e.setAttribute("aria-busy","false");var a=r.map(function(e){var t=e.closest(".sub-release-board__item"),r=String((e.querySelector(".sub-release-board__row-solution")||{}).textContent||"").trim(),a=String((e.querySelector(".sub-release-board__row-category")||{}).textContent||"").trim(),i=String((e.querySelector(".sub-release-board__row-date")||{}).textContent||"").trim(),o=String((e.querySelector(".sub-release-board__row-title")||{}).textContent||"").trim(),s=String((e.querySelector(".sub-release-board__row-preview")||{}).textContent||"").trim();return{row:e,item:t,solution:r,category:a,date:Date.parse(i)||0,search:n(o+" "+s+" "+r+" "+a)}}).filter(function(e){return e.item}),o={solution:"all",categories:[],query:"",sort:"newest"},s=e.querySelector("[data-release-search]"),l=e.querySelector("[data-release-sort]"),c=e.querySelector("[data-release-sort-dropdown]"),u=e.querySelector("[data-release-sort-toggle]"),d=e.querySelector("[data-release-sort-label]"),f=Array.prototype.slice.call(e.querySelectorAll("[data-release-sort-value]")),m=e.querySelector("[data-release-count]"),y=e.querySelector("[data-release-empty]"),b=Array.prototype.slice.call(e.querySelectorAll("[data-release-category]"));Array.prototype.forEach.call(e.querySelectorAll("[data-release-solution-cms]"),function(e){var t=String(e.textContent||"").trim();t&&e.setAttribute("data-release-solution",t)});var v=Array.prototype.slice.call(e.querySelectorAll("[data-release-solution]")),p=0,g=0,h="",w=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;s&&(s.setAttribute("aria-controls",t.id),s.setAttribute("autocomplete","off")),l&&(l.hidden=!0,l.setAttribute("aria-hidden","true"),l.setAttribute("tabindex","-1"),l.innerHTML="",[["newest","Newest"],["oldest","Oldest"]].forEach(function(e){var t=document.createElement("option");t.value=e[0],t.textContent=e[1],l.appendChild(t)}),l.value="newest",l.setAttribute("aria-label","Release Notes sort order"),l.setAttribute("aria-controls",t.id)),u&&u.setAttribute("aria-controls",t.id),m&&m.setAttribute("aria-live","polite"),v.forEach(function(e){e.addEventListener("click",function(t){t.preventDefault(),o.solution=e.getAttribute("data-release-solution")||"all",O(!1,!1)})}),b.forEach(function(e){e.addEventListener("click",function(t){t.preventDefault();var r=e.getAttribute("data-release-category")||"",a=o.categories.indexOf(r);a>=0?o.categories.splice(a,1):r&&o.categories.push(r),O(!1,!1)})}),s&&s.addEventListener("input",function(){o.query=n(s.value),window.clearTimeout(p),p=window.setTimeout(function(){O(!1,!1)},180)}),l&&l.addEventListener("change",function(){o.sort="oldest"===l.value?"oldest":"newest",C(),O(!1,!1)}),f.forEach(function(e){function t(t){t.preventDefault(),l&&(l.value="oldest"===e.getAttribute("data-release-sort-value")?"oldest":"newest",l.dispatchEvent(new Event("change",{bubbles:!0})),c&&c.classList.contains("w--open")&&u&&u.click())}e.addEventListener("click",t),e.addEventListener("keydown",function(e){"Enter"!==e.key&&" "!==e.key||t(e)})});var A=e.querySelector("[data-release-reset]");A&&A.addEventListener("click",function(e){e.preventDefault(),window.clearTimeout(p),o={solution:"all",categories:[],query:"",sort:"newest"},s&&(s.value=""),l&&(l.value="newest"),C(),O(!1,!0)}),C(),Array.prototype.forEach.call(e.querySelectorAll("form"),function(e){e.addEventListener("submit",function(e){e.preventDefault(),window.clearTimeout(p),o.query=s?n(s.value):o.query,O(!1,!0)})}),Array.prototype.forEach.call(e.querySelectorAll("[data-release-disclosure]"),function(e){var t=e.parentElement&&e.parentElement.querySelector(".sub-release-board__filter-options");t&&(t.hidden=!1,r(!(window.matchMedia&&window.matchMedia("(max-width: 767px)").matches)&&"false"!==e.getAttribute("aria-expanded")),e.addEventListener("click",function(t){t.preventDefault(),r("false"===e.getAttribute("aria-expanded"))}));function r(r){e.setAttribute("aria-expanded",r?"true":"false"),t.classList.toggle("is-collapsed",!r),t.setAttribute("aria-hidden",r?"false":"true"),t.style.display=r?"flex":"none","inert"in t&&(t.inert=!r)}});var _=e.querySelector("[data-release-filter-toggle]"),k=e.querySelector(".sub-release-board__filters"),L=e.querySelector(".sub-release-board__filter-form"),S=e.querySelector("[data-release-filter-close]"),E=window.matchMedia?window.matchMedia("(max-width: 767px)"):null;_&&_.setAttribute("aria-label","필터 열기");var q=0;if(_&&k&&(P(!1,!0),_.addEventListener("click",function(e){e.preventDefault(),P(!0)}),S&&S.addEventListener("click",function(e){e.preventDefault(),P(!1),_.focus()}),k.addEventListener("click",function(e){e.target===k&&(P(!1),_.focus())}),document.addEventListener("keydown",function(e){"Escape"===e.key&&k.classList.contains("is-mobile-filter-open")&&(P(!1),_.focus())}),E)){var x=function(){P(!1,!0)};E.addEventListener?E.addEventListener("change",x):E.addListener&&E.addListener(x)}O(!0,!0)}}function C(){var e=l&&"oldest"===l.value?"oldest":"newest";d&&(d.textContent="oldest"===e?"Oldest":"Newest"),f.forEach(function(t){var r=t.getAttribute("data-release-sort-value")===e;t.classList.toggle("is-active",r),t.setAttribute("aria-selected",r?"true":"false")})}function D(){var e=a.slice().sort(function(e,t){return"oldest"===o.sort?e.date-t.date:t.date-e.date}),r=0;e.forEach(function(e){var a="all"===o.solution||e.solution===o.solution,i=!o.categories.length||o.categories.indexOf(e.category)>=0,n=!o.query||e.search.indexOf(o.query)>=0,s=a&&i&&n;e.item.hidden=!s,e.item.style.display=s?"":"none",s&&(r+=1),t.appendChild(e.item)}),m&&(m.textContent=r+(1===r?" item":" items")),y&&(y.hidden=0!==r)}function T(){t.classList.remove("is-release-filtering"),e.classList.remove("is-release-updating"),e.setAttribute("aria-busy","false")}function O(r,a){var i=[o.solution,o.categories.slice().sort().join("|"),o.query,o.sort].join("::");if(v.forEach(function(e){var t=e.getAttribute("data-release-solution")===o.solution;e.classList.toggle("is-filter-active",t),e.setAttribute("aria-pressed",t?"true":"false")}),b.forEach(function(e){var t=o.categories.indexOf(e.getAttribute("data-release-category"))>=0;e.classList.toggle("is-filter-active",t),e.setAttribute("aria-pressed",t?"true":"false")}),a||i!==h){if(h=i,window.clearTimeout(g),r||w)return D(),void T();e.classList.add("is-release-updating"),t.classList.add("is-release-filtering"),e.setAttribute("aria-busy","true"),g=window.setTimeout(function(){D(),window.requestAnimationFrame(function(){window.requestAnimationFrame(T)})},140)}}function M(){return!(!E||!E.matches)}function I(e){e===q&&k&&(k.classList.remove("is-mobile-filter-open"),k.style.display=M()?"none":"block",i.unlock(k))}function P(e,t){if(_&&k){var r=M();r||(e=!1);var a=++q;if([k,L].forEach(function(e){e&&e.getAnimations&&e.getAnimations().forEach(function(e){e.cancel()})}),_.style.display=r?"inline-flex":"none",_.setAttribute("aria-expanded",e?"true":"false"),k.setAttribute("aria-hidden",r&&!e?"true":"false"),L&&(L.hidden=!1,L.style.display="block"),e)k.classList.add("is-mobile-filter-open"),k.style.display="flex",i.lock(k),t||w||!k.animate||(k.animate([{opacity:0},{opacity:1}],{duration:300,easing:"cubic-bezier(.22,1,.36,1)",fill:"both"}),L&&L.animate([{transform:"scale(.97)",opacity:0},{transform:"scale(1)",opacity:1}],{duration:320,easing:"cubic-bezier(.16,1,.3,1)",fill:"both"})),window.requestAnimationFrame(function(){a===q&&S&&S.focus()});else{if(!r||t||w||!k.animate||"none"===k.style.display)return void I(a);var n=k.animate([{opacity:1},{opacity:0}],{duration:320,easing:"cubic-bezier(.4,0,1,1)",fill:"both"}),o=L&&L.animate?L.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:240,easing:"cubic-bezier(.4,0,1,1)",fill:"both"}):null;Promise.all([n.finished,o?o.finished:Promise.resolve()]).then(function(){I(a)}).catch(function(){})}}}}function f() {
  var banner = document.querySelector('[data-cookie-banner]');
  var modal = document.querySelector('[data-cookie-modal]');
  if (!banner || !modal || modal.dataset.idCookieReady === 'true') return;
  var panel = modal.querySelector('.cookie-modal__panel');
  if (!panel) return;
  modal.dataset.idCookieReady = 'true';
  // Consent layers must not inherit a transformed footer's containing block.
  document.body.appendChild(banner);
  document.body.appendChild(modal);
  modal.classList.add('ui-modal-backdrop');
  panel.classList.add('ui-modal-surface');
  modal.id = 'cookie-settings';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'cookie-settings-title');
  modal.setAttribute('aria-hidden', 'true');
  modal.hidden = true;
  modal.inert = true;
  var closeIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  if (!panel.querySelector('.cookie-modal__head')) {
    var head = document.createElement('div');
    head.className = 'cookie-modal__head';
    head.innerHTML = '<div><h2 class="section-ui-title bold" id="cookie-settings-title">쿠키 설정</h2><p class="section-ui-body regular" data-cookie-description></p></div><button class="cookie-modal__close ui-modal-close" type="button" aria-label="쿠키 설정 닫기">' + closeIcon + '</button>';
    panel.prepend(head);
  }
  var description = panel.querySelector('[data-cookie-description],.cookie-modal__desc');
  if (description) description.textContent = '본 서비스는 이용자에게 최적화된 웹 경험을 제공하고, 뉴스레터 발송 및 웹사이트 트래픽 분석을 위해 쿠키를 사용합니다. 귀하는 쿠키 설정을 거부할 권리가 있습니다. "모두 수락"을 누르시면 당사의 쿠키 사용 및 개인정보처리방침에 동의하게 됩니다. 미국 거주자의 경우, 설정 관리를 통해 개인정보의 판매 및 공유를 거부할 수 있습니다.';
  var dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.className = 'cookie-banner__close';
  dismiss.setAttribute('aria-label', '쿠키 안내 닫기');
  dismiss.innerHTML = closeIcon;
  banner.querySelector('.cookie-banner__inner').appendChild(dismiss);
  dismiss.addEventListener('click', function () { banner.hidden = true; });
  var key = 'id_cookie_consent_v1', committed = read(), draft = copy(committed), opener = null, timer = 0, revision = 0;
  function copy(value) { return { necessary: true, analytics: !!(value && value.analytics), marketing: !!(value && value.marketing) }; }
  function read() {
    try { var saved = JSON.parse(localStorage.getItem(key)); if (saved && saved.version === 1) return copy(saved); } catch (_) {}
    var match = document.cookie.match(/(?:^|;\s*)id_cookie_consent=a([01])m([01])(?:;|$)/);
    return match ? { necessary: true, analytics: match[1] === '1', marketing: match[2] === '1' } : null;
  }
  function emit(value) { window.dispatchEvent(new CustomEvent('id:cookie-consent', { detail: copy(value) })); }
  function save(value) {
    committed = copy(value); draft = copy(value);
    try { localStorage.setItem(key, JSON.stringify(Object.assign({ version: 1, updatedAt: new Date().toISOString() }, committed))); } catch (_) {}
    try { document.cookie = 'id_cookie_consent=a' + (+committed.analytics) + 'm' + (+committed.marketing) + '; Max-Age=31536000; Path=/; SameSite=Lax; Secure'; } catch (_) {}
    emit(committed); banner.hidden = true; render(); close();
  }
  function render() {
    modal.querySelectorAll('[data-cookie-toggle]').forEach(function (control) {
      var category = control.dataset.cookieToggle, on = category === 'necessary' || !!draft[category];
      control.classList.toggle('cookie-switch--on', on);
      var knob = control.querySelector('.cookie-switch__knob');
      if (knob) knob.classList.toggle('cookie-switch__knob--on', on);
      control.setAttribute('role', 'switch'); control.setAttribute('aria-checked', String(on));
      control.setAttribute('aria-label', category === 'analytics' ? '성능 및 분석 쿠키' : category === 'marketing' ? '타겟팅 및 광고 쿠키' : '필수 쿠키');
      control.tabIndex = category === 'necessary' ? -1 : 0;
      if (category === 'necessary') control.setAttribute('aria-disabled', 'true');
    });
  }
  function open(trigger) {
    committed = read() || committed; draft = copy(committed); render();
    opener = trigger || document.activeElement;
    clearTimeout(timer); var token = ++revision;
    banner.hidden = true; modal.hidden = false; modal.inert = false;
    modal.style.display = 'flex'; modal.setAttribute('aria-hidden', 'false'); i.lock(modal);
    requestAnimationFrame(function () {
      if (token !== revision) return;
      modal.classList.add('is-visible'); panel.classList.add('is-visible');
      panel.querySelector('.cookie-modal__close').focus();
    });
  }
  function close() {
    var token = ++revision; clearTimeout(timer); draft = copy(committed);
    modal.classList.remove('is-visible'); panel.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true'); modal.inert = true; i.unlock(modal);
    timer = setTimeout(function () {
      if (token !== revision) return;
      modal.hidden = true; modal.style.removeProperty('display'); banner.hidden = !!committed;
      if (opener && opener.isConnected && !opener.closest('[hidden]')) opener.focus();
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220);
  }
  document.addEventListener('click', function (event) {
    if (!(event.target instanceof Element)) return;
    var action = event.target.closest('[data-cookie-action],a[href="#cookie-settings"],a[href="/cookie-settings"]');
    if (!action) return;
    event.preventDefault();
    var name = action.dataset.cookieAction || 'settings';
    if (name === 'settings') open(action);
    else if (name === 'accept-all') save({ analytics: true, marketing: true });
    else if (name === 'reject') save(null);
    else if (name === 'save') save(draft);
  });
  modal.querySelectorAll('[data-cookie-toggle]').forEach(function (control) {
    var category = control.dataset.cookieToggle;
    if (category !== 'analytics' && category !== 'marketing') return;
    function toggle() { draft[category] = !draft[category]; render(); }
    control.addEventListener('click', toggle);
    control.addEventListener('keydown', function (event) { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); } });
  });
  panel.querySelector('.cookie-modal__close').addEventListener('click', close);
  modal.addEventListener('click', function (event) { if (event.target === modal) close(); });
  modal.addEventListener('keydown', function (event) { if (event.key === 'Escape') { event.preventDefault(); close(); } else s(event, modal); });
  banner.hidden = !!committed; render(); emit(committed);
}


function m(){var e=new WeakMap,t=new WeakMap;function r(e,t){e&&e.classList.toggle("is-visible",t)}function a(a){if(a&&"false"===a.getAttribute("aria-hidden")){var n=a.querySelector("[data-modal-panel]")||a.firstElementChild;a.classList.remove("is-visible"),r(n,!1),a.setAttribute("aria-hidden","true"),i.unlock(a),e.set(a,window.setTimeout(function(){a.hidden=!0,a.style.removeProperty("display")},220));var o=t.get(a);o&&"function"==typeof o.focus&&o.focus()}}Array.prototype.forEach.call(document.querySelectorAll("[data-modal]"),function(e){if("true"!==e.getAttribute("data-id-generic-modal-ready")){var t=e.querySelector("[data-modal-panel]")||e.firstElementChild;e.setAttribute("data-id-generic-modal-ready","true"),e.classList.add("ui-modal-backdrop"),t&&t.classList.add("ui-modal-surface"),Array.prototype.forEach.call(e.querySelectorAll("[data-modal-close]"),function(e){e.classList.add("ui-modal-close")}),e.getAttribute("role")||e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true");var a="false"===e.getAttribute("aria-hidden")||e.classList.contains("is-open");e.setAttribute("aria-hidden",a?"false":"true"),e.hidden=!a,e.classList.toggle("is-visible",a),r(t,a)}}),document.addEventListener("click",function(n){if(n.target instanceof Element){var s=n.target.closest("[data-modal-open]");if(s){var l=function(e){var t=e.getAttribute("data-modal-open")||"";if(!t)return null;try{return/^[#.\[]/.test(t)?document.querySelector(t):document.getElementById(t)||document.querySelector('[data-modal="'+t.replace(/(["\\])/g,"\\$1")+'"]')}catch(e){return null}}(s);l&&(n.preventDefault(),n.stopImmediatePropagation(),function(a,n){if(a&&"false"!==a.getAttribute("aria-hidden")){var s=a.querySelector("[data-modal-panel]")||a.firstElementChild;window.clearTimeout(e.get(a)),t.set(a,n||document.activeElement),a.hidden=!1,a.style.display="flex",a.setAttribute("aria-hidden","false"),a.classList.add("ui-modal-backdrop"),s&&s.classList.add("ui-modal-surface"),i.lock(a),window.requestAnimationFrame(function(){a.classList.add("is-visible"),r(s,!0)}),window.setTimeout(function(){var e=o(a);e.length&&e[0].focus()},20)}}(l,s))}else{var c=n.target.closest("[data-modal-close]");if(c){var u=c.closest("[data-modal]");u&&(n.preventDefault(),n.stopImmediatePropagation(),a(u))}else{var d=n.target.closest("[data-modal]");d&&n.target===d&&a(d)}}}},!0),document.addEventListener("keydown",function(e){if(("Enter"===e.key||" "===e.key)&&e.target instanceof Element){var t=e.target.closest("[data-modal-open],[data-modal-close]");if(t)return e.preventDefault(),e.stopImmediatePropagation(),void t.click()}var r=document.querySelector('[data-modal][aria-hidden="false"]');if(r)return"Escape"===e.key?(e.preventDefault(),e.stopImmediatePropagation(),void a(r)):void s(e,r)},!0)}function y(e){var t=String(e||"/").split("?")[0].split("#")[0].replace(/\/+$/,"")||"/";try{t=decodeURIComponent(t)}catch(e){}return t.toLowerCase()}function b(){var e=y(window.location.pathname),t=/^\/insights\/[^/]+$/.test(e)||Boolean(document.querySelector('[data-cms-view="insights"]')),r=/^\/newsroom\/[^/]+$/.test(e)||Boolean(document.querySelector('[data-cms-view="newsroom"]')),a=t?"/board/insights":r?"/board/newsroom":/^\/release-notes\/[^/]+$/.test(e)?"/release-notes":e;Array.prototype.forEach.call(document.querySelectorAll(".header a[href],.footer a[href],.breadcrumb a[href],.sub-nav a[href],[data-sitemap] a[href]"),function(t){var r=t.getAttribute("href")||"";if(r&&"#"!==r.charAt(0)&&!/^(mailto:|tel:)/i.test(r)){var i;try{i=new URL(r,window.location.href)}catch(e){return}if(i.origin===window.location.origin){var n=y(i.pathname),o=n===e,s=o||n===a;t.classList.toggle("w--current",s),s?t.setAttribute("aria-current",o?"page":"location"):t.removeAttribute("aria-current")}}}),Array.prototype.forEach.call(document.querySelectorAll(".header__menu"),function(e){var t=!!e.querySelector(".header__menu-link.w--current");e.classList.toggle("is-active",t),e.classList.toggle("is-current-group",t);var r=e.querySelector(".header__menu-toggle");r&&(r.classList.toggle("is-active",t),r.classList.toggle("is-current-group",t))})}function v(){var e=document.querySelector(".header");if(e){var t=!1;window.addEventListener("scroll",function(){t||(t=!0,window.requestAnimationFrame(r))},{passive:!0}),r()}function r(){t=!1,e.classList.toggle("is-scrolled",window.scrollY>8)}}function p() {
  document.querySelectorAll('.header__mobile').forEach(function(root){
    if(root.dataset.idDrawerReady==='true')return;
    var panel=root.querySelector('.header__mobile-panel'),toggle=root.querySelector('.header__mobile-toggle');if(!panel||!toggle)return;
    root.dataset.idDrawerReady='true';
    panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','전체 메뉴');
    var head=panel.querySelector('.header__mobile-head');
    var close=document.createElement('button');close.type='button';close.className='header__search-close header__drawer-close';close.setAttribute('aria-label','메뉴 닫기');
    close.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    if(head)head.appendChild(close);
    function dismiss(){if(panel.classList.contains('w--open')){if(window.jQuery)window.jQuery(root).triggerHandler('w-close.w-dropdown');else toggle.click();}}
    close.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();dismiss();});
    panel.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();dismiss();}else s(e,panel);});
    var groups=Array.from(panel.querySelectorAll('.header__mobile-group'));
    var activeGroup=groups.find(function(g){return !!g.querySelector('a[aria-current]');})||groups[0];
    groups.forEach(function(group,index){
      var heading=group.querySelector('.header__mobile-group-title');if(!heading)return;
      var button=document.createElement('button');button.type='button';button.className='header__mobile-group-toggle';
      var label=document.createElement('span');label.className='section-ui-title bold';label.textContent=heading.textContent;button.appendChild(label);
      button.insertAdjacentHTML('beforeend','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>');
      heading.textContent='';heading.appendChild(button);
      var items=document.createElement('div');items.className='header__mobile-group-items';items.id='header-drawer-group-'+index;
      Array.from(group.children).forEach(function(n){if(n!==heading)items.appendChild(n);});group.appendChild(items);
      button.setAttribute('aria-controls',items.id);
      var expanded=group===activeGroup,animation=null;
      function set(value,animate){
        var from=items.hidden?0:items.getBoundingClientRect().height;if(animation){animation.cancel();animation=null;}
        expanded=value;button.setAttribute('aria-expanded',String(value));items.inert=!value;items.hidden=false;
        if(!animate||matchMedia('(prefers-reduced-motion: reduce)').matches||!items.animate){items.hidden=!value;return;}
        animation=items.animate([{height:from+'px',opacity:value?0:1},{height:(value?items.scrollHeight:0)+'px',opacity:value?1:0}],{duration:240,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
        var current=animation;animation.finished.then(function(){if(animation!==current)return;items.hidden=!value;animation.cancel();animation=null;},function(){});
      }
      set(expanded,false);button.addEventListener('click',function(){set(!expanded,true);});
      group.classList.toggle('is-active',!!group.querySelector('a[aria-current]'));
      items.querySelectorAll('a').forEach(function(link){Array.from(link.childNodes).forEach(function(node){if(node.nodeType===3&&node.textContent.trim()){var span=document.createElement('span');span.className='section-ui-body regular';span.textContent=node.textContent;link.replaceChild(span,node);}});});
    });
    var opened=false,animation=null,revision=0;
    function sync(initial){
      var next=panel.classList.contains('w--open');if(!initial&&next===opened)return;
      opened=next;var token=++revision;
      var from={opacity:getComputedStyle(panel).opacity,transform:getComputedStyle(panel).transform};
      if(animation){animation.cancel();animation=null;}
      panel.inert=!next;panel.setAttribute('aria-hidden',String(!next));toggle.setAttribute('aria-expanded',String(next));
      if(next){i.lock(root);var search=document.querySelector('.header__search-panel.w--open');if(search&&window.jQuery)window.jQuery(search.closest('.header__search')).triggerHandler('w-close.w-dropdown');}else{i.unlock(root);if(panel.contains(document.activeElement))toggle.focus({preventScroll:true});}
      panel.style.removeProperty('display');
      if(initial||matchMedia('(prefers-reduced-motion: reduce)').matches||!panel.animate){if(next)close.focus({preventScroll:true});return;}
      panel.style.display='block';
      animation=panel.animate(next?[{opacity:0,transform:'translateX(24px)'},{opacity:1,transform:'translateX(0)'}]:[from,{opacity:0,transform:'translateX(16px)'}],{duration:next?300:200,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
      if(next)close.focus({preventScroll:true});
      animation.finished.then(function(){if(token!==revision)return;panel.style.removeProperty('display');animation.cancel();animation=null;},function(){});
    }
    new MutationObserver(function(){sync(false);}).observe(panel,{attributes:true,attributeFilter:['class']});sync(true);
    window.addEventListener('resize',function(){if(innerWidth>=992)dismiss();},{passive:true});
  });
}
function g(){Array.prototype.forEach.call(document.querySelectorAll("[data-dropdown-exit-motion]"),function(e){if("true"!==e.getAttribute("data-id-exit-motion-ready")){var t=e.querySelector(".w-dropdown-list");if(t){e.setAttribute("data-id-exit-motion-ready","true");var r=t.classList.contains("w--open"),a=0;new MutationObserver(function(){var e=t.classList.contains("w--open");e!==r&&(r=e,window.clearTimeout(a),e?(t.classList.remove("is-closing"),t.style.removeProperty("display")):(t.classList.add("is-closing"),t.style.display="block",a=window.setTimeout(function(){t.classList.remove("is-closing"),t.style.removeProperty("display")},220)))}).observe(t,{attributes:!0,attributeFilter:["class"]})}}})}/* Scoped enhancement used by the existing ID UI Controller. */
function initStickyBackground(root, sticky, header) {
  if (!sticky || sticky.dataset.stickyObserved === 'true') return;
  sticky.dataset.stickyObserved = 'true';
  var queued = false;
  function update() {
    queued = false;
    var top = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
    var rect = sticky.getBoundingClientRect();
    var stuck = rect.top <= top + 1 && root.getBoundingClientRect().bottom > top + rect.height;
    if (sticky.getAttribute('data-stuck') !== String(stuck)) sticky.setAttribute('data-stuck', String(stuck));
  }
  function schedule() {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  if (window.ResizeObserver) {
    const observer = new ResizeObserver(schedule);
    observer.observe(sticky);
    if (header) observer.observe(header);
    const announcement = document.querySelector('#top [data-site-announcement]');
    if (announcement) observer.observe(announcement);
  }
  update();
}
function initDocusignTabs(root) {
  if (root.dataset.idTabsReady === 'true') return;
  const tabs = Array.from(root.querySelectorAll('[data-product-tab-trigger]'));
  const panels = Array.from(root.querySelectorAll('[data-product-tab-panel]'));
  const key = tab => tab.dataset.productTabTrigger.replace(/^docusign-/, '');
  if (!tabs.length || tabs.length !== panels.length) return;
  root.dataset.idTabsReady = 'true';
  const menu = root.querySelector('.product-tabs__menu');
  const sticky = root.querySelector('[data-product-tabs-sticky]');
  const header = document.querySelector('#top .header__container');
  initStickyBackground(root, sticky, header);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = '', revision = 0, animations = [];
  const offset = () => root.style.setProperty('--product-tabs-header-height', (header ? Math.max(0, header.getBoundingClientRect().bottom) : 0) + 'px');
  offset();
  if (window.ResizeObserver && header) {
    const observer = new ResizeObserver(offset);
    observer.observe(header);
    const announcement = document.querySelector('#top [data-site-announcement]');
    if (announcement) observer.observe(announcement);
  }
  window.addEventListener('resize', offset, { passive: true });
  window.addEventListener('pageshow', offset);
  menu.setAttribute('role', 'tablist');
  root.querySelectorAll('[role="tablist"]').forEach(el => { if (el !== menu) el.removeAttribute('role'); });
  const fromURL = () => {
    const value = new URL(window.location.href).searchParams.get('tab');
    return tabs.some(tab => key(tab) === value) ? value : key(tabs[0]);
  };
  function select(value, history, animate) {
    if (value === active) return;
    const next = panels[tabs.findIndex(tab => key(tab) === value)];
    if (!next) return;
    const previous = panels.find(panel => !panel.hidden);
    active = value;
    const token = ++revision;
    animations.forEach(animation => animation.cancel());
    animations = [];
    if (history) {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', value);
      window.history.pushState(window.history.state, '', url);
    }
    tabs.forEach(tab => {
      const selected = key(tab) === value;
      tab.classList.toggle('product-tab-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    const reveal = () => {
      if (token !== revision) return;
      panels.forEach(panel => {
        const selected = panel === next;
        panel.hidden = !selected;
        panel.inert = !selected;
        panel.style.display = selected ? 'block' : 'none';
        panel.classList.toggle('product-tabs__panel--active', selected);
        panel.setAttribute('aria-hidden', String(!selected));
      });
      if (animate && sticky && root.getBoundingClientRect().top < -1) {
        const boundary = sticky.getBoundingClientRect().bottom + 16;
        if (next.getBoundingClientRect().top < boundary) window.scrollBy({ top: next.getBoundingClientRect().top - boundary, behavior: 'instant' });
      }
      if (animate && !motion.matches && next.animate) {
        const enter = next.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'cubic-bezier(.2,.7,.2,1)' });
        enter.finished.catch(() => {});
        animations.push(enter);
      }
    };
    if (animate && !motion.matches && previous && previous.animate) {
      previous.inert = true;
      const exit = previous.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, fill: 'forwards' });
      animations.push(exit);
      exit.finished.then(() => { reveal(); exit.cancel(); }, () => {});
    } else reveal();
  }
  tabs.forEach((tab, index) => {
    const value = key(tab), panel = panels[index];
    tab.id = 'docusign-tab-' + value;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    const url = new URL(window.location.href);
    url.searchParams.set('tab', value);
    tab.href = url.pathname + url.search + url.hash;
    tab.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
      event.preventDefault();
      select(value, true, true);
    });
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target !== undefined) { event.preventDefault(); tabs[target].focus(); }
      if (event.key === ' ') { event.preventDefault(); tab.click(); }
    });
  });
  window.addEventListener('popstate', () => select(fromURL(), false, false));
  select(fromURL(), false, false);
}
function h(){document.querySelectorAll("[data-product-tabs-url]").forEach(initDocusignTabs);hLegacy()}
function hLegacy(){Array.prototype.forEach.call(document.querySelectorAll(".product-tabs:not([data-product-tabs-url])"),function(e){if("true"!==e.getAttribute("data-id-tabs-ready")){var t=Array.prototype.slice.call(e.querySelectorAll("[data-product-tab-trigger]")),r=Array.prototype.slice.call(e.querySelectorAll("[data-product-tab-panel]"));if(t.length&&r.length)e.setAttribute("data-id-tabs-ready","true"),r.forEach(function(e){var t=e.getAttribute("data-product-tab-panel")||"";t&&(e.id="docusign-panel-"+t.replace(/^docusign-/,""),e.setAttribute("role","tabpanel"))}),t.forEach(function(e,r){e.addEventListener("click",function(t){t.preventDefault(),a(e.getAttribute("data-product-tab-trigger"),!1)}),e.addEventListener("keydown",function(e){var i=r;if("ArrowRight"===e.key)i=(r+1)%t.length;else if("ArrowLeft"===e.key)i=(r-1+t.length)%t.length;else if("Home"===e.key)i=0;else{if("End"!==e.key)return;i=t.length-1}e.preventDefault(),a(t[i].getAttribute("data-product-tab-trigger"),!0)})}),a((t.filter(function(e){return e.classList.contains("product-tab-active")})[0]||t[0]).getAttribute("data-product-tab-trigger"),!1)}function a(e,a){t.forEach(function(t){var r=t.getAttribute("data-product-tab-trigger")===e;t.classList.toggle("product-tab-active",r),t.setAttribute("aria-selected",r?"true":"false"),t.setAttribute("tabindex",r?"0":"-1");var i="docusign-panel-"+String(t.getAttribute("data-product-tab-trigger")||"").replace(/^docusign-/,"");t.setAttribute("aria-controls",i),r&&a&&t.focus()}),r.forEach(function(t){var r=t.getAttribute("data-product-tab-panel")===e;t.classList.toggle("product-tabs__panel--active",r),t.removeAttribute("hidden"),t.style.display=r?"block":"none",t.setAttribute("aria-hidden",r?"false":"true")})}})}function w(){var e=Array.prototype.slice.call(document.querySelectorAll("[data-count-up]"));if(e.length){var t=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if("IntersectionObserver"in window){var r=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(i(e.target),r.unobserve(e.target))})},{threshold:.35});e.forEach(function(e){r.observe(e)})}else e.forEach(i)}function a(e,t,r){e.textContent=t.prefix+Number(r).toLocaleString(void 0,{minimumFractionDigits:t.decimals,maximumFractionDigits:t.decimals})+t.suffix}function i(e){if("true"!==e.getAttribute("data-counted")){e.setAttribute("data-counted","true");var r=function(e){var t=e.getAttribute("data-count-up")||e.textContent||"0",r=t.replace(/,/g,"").match(/-?\d+(?:\.\d+)?/);return{value:r?Number(r[0]):0,decimals:r&&r[0].indexOf(".")>=0?r[0].split(".")[1].length:0,prefix:e.getAttribute("data-count-prefix")||"",suffix:e.getAttribute("data-count-suffix")||t.replace(/[-\d.,\s]+/g,"")}}(e);if(t)a(e,r,r.value);else{var i=performance.now(),n=Math.max(500,Number(e.getAttribute("data-count-duration"))||1400);window.requestAnimationFrame(function t(o){var s=Math.min(1,(o-i)/n),l=1-Math.pow(1-s,3);a(e,r,r.value*l),s<1&&window.requestAnimationFrame(t)})}}}}function A(){var e=document.getElementById("contact-form");if(e&&e.closest(".w-form")){!function(e){var t=e.querySelector("#category"),r=e.querySelector(".sub-contact__category-dropdown");if(!t||!r||"true"===r.dataset.categoryReady)return;var a=r.querySelector(".sub-contact__category-toggle"),i=r.querySelector(".sub-contact__category-list"),n=i&&i.querySelector(".sub-contact__category-options");if(!a||!i||!n)return;r.dataset.categoryReady="true",n.id="contact-category-options",a.setAttribute("role","combobox"),a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-controls",n.id);var o=a.querySelector("div:not(.w-icon-dropdown-toggle)"),s=[];function l(){var e=t.options[t.selectedIndex];o&&(o.textContent=e&&e.value?e.textContent:"문의 종류를 선택해 주세요."),s.forEach(function(e){var r=e.getAttribute("data-value")===t.value;e.setAttribute("aria-selected",r?"true":"false")})}function c(){return i.classList.contains("w--open")}function u(){c()&&a.click(),window.setTimeout(function(){a.focus()},0)}function d(e){s.length&&s[(e+s.length)%s.length].focus()}Array.prototype.forEach.call(t.options,function(e){if(e.value){var t=document.createElement("li");t.setAttribute("role","presentation");var r=document.createElement("button");r.type="button",r.className="sub-contact__category-option",r.setAttribute("role","option"),r.setAttribute("data-value",e.value),r.textContent=e.textContent,t.appendChild(r),n.appendChild(t),s.push(r)}}),s.forEach(function(e,r){e.addEventListener("click",function(){t.value=e.getAttribute("data-value")||"",t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),l(),u()}),e.addEventListener("keydown",function(e){"ArrowDown"===e.key?(e.preventDefault(),d(r+1)):"ArrowUp"===e.key?(e.preventDefault(),d(r-1)):"Home"===e.key?(e.preventDefault(),d(0)):"End"===e.key?(e.preventDefault(),d(s.length-1)):"Escape"===e.key&&(e.preventDefault(),u())})}),a.addEventListener("keydown",function(e){if("ArrowDown"===e.key||"ArrowUp"===e.key){e.preventDefault(),c()||a.click();var r=s.findIndex(function(e){return e.getAttribute("data-value")===t.value});window.setTimeout(function(){d(r>=0?r:"ArrowUp"===e.key?s.length-1:0)},0)}}),t.addEventListener("change",l),t.addEventListener("invalid",function(){window.setTimeout(function(){a.focus()},0)}),e.addEventListener("reset",function(){window.setTimeout(l,0)}),new MutationObserver(function(){a.setAttribute("aria-expanded",c()?"true":"false")}).observe(i,{attributes:!0,attributeFilter:["class"]}),a.setAttribute("aria-expanded",c()?"true":"false"),l()}(e);var t={name:"성함을 입력해주세요.",company:"회사명을 입력해주세요.",department:"부서명을 입력해주세요.","job-title":"직책을 입력해주세요.",email:"업무용 이메일을 입력해주세요.",phone:"연락 가능한 번호를 입력해주세요.",message:"문의하실 내용을 구체적으로 입력해주세요."};Object.keys(t).forEach(function(r){var a=e.querySelector("#"+r);a&&a.setAttribute("placeholder",t[r])});var r=e.closest(".w-form").querySelector(".w-form-done");if(r){var a=!1;r.style.display="none",r.hidden=!0,r.setAttribute("aria-hidden","true"),new MutationObserver(function(){"none"===r.style.display||a||(a=!0,r.style.display="none",r.hidden=!0,r.setAttribute("aria-hidden","true"),window.alert("문의가 정상적으로 접수되었습니다."),window.location.reload())}).observe(r,{attributes:!0,attributeFilter:["class","style"]})}}}function _(){var e=document.querySelectorAll(".footer__stibee-form.w-form");Array.prototype.forEach.call(e,function(e){if("true"!==e.getAttribute("data-id-newsletter-alert-ready")){var t=e.querySelector("form"),r=e.querySelector(".w-form-done");if(t&&r){e.setAttribute("data-id-newsletter-alert-ready","true");var a=!1;new MutationObserver(function(){"none"===window.getComputedStyle(r).display||a||(a=!0,window.alert("신청되었습니다."),t.reset(),r.style.display="none",t.style.removeProperty("display"),window.setTimeout(function(){a=!1},0))}).observe(r,{attributes:!0,attributeFilter:["class","style"]})}}})}function k() {
  var nav = document.querySelector('.cms-detail__nav[data-binding-status]');
  if (!nav || nav.dataset.cmsAdjacentReady === 'true') return;
  var newsroom = !!nav.querySelector('[data-newsroom-prev]');
  var prev = nav.querySelector(newsroom ? '[data-newsroom-prev]' : '[data-insights-prev]');
  var next = nav.querySelector(newsroom ? '[data-newsroom-next]' : '[data-insights-next]');
  if (!prev || !next) return;
  nav.dataset.cmsAdjacentReady = 'true';
  var locale = location.pathname.indexOf('/en/') === 0 ? '/en' : '';
  var archive = new URL(locale + (newsroom ? '/board/Newsroom' : '/board/Insights'), location.origin).href;
  var selector = newsroom ? 'a.sub-news-list__fcard[href],a.sub-news-list__row[href]' : '.sub-news-list a.sub-news-list__row[href]';
  var key = 'id-cms-adjacent-v2:' + archive;
  var pending = window.__ID_CMS_ADJACENT_REQUESTS__ || (window.__ID_CMS_ADJACENT_REQUESTS__ = new Map());
  function pathname(value) { try { return decodeURIComponent(new URL(value, location.origin).pathname).replace(/\/+$/, '').toLowerCase(); } catch (_) { return ''; } }
  // Preserve explicitly bound references while automatic metadata is loading.
  var boundReferences = 0;
  if (!newsroom) [prev, next].forEach(function(card) {
    var slug = (card.id || '').trim();
    if (!slug || /^(?:undefined|null|#)$/.test(slug)) return;
    card.href = locale + '/insights/' + encodeURIComponent(slug);
    card.hidden = false; nav.hidden = false; card.removeAttribute('id'); boundReferences++;
  });
  if (boundReferences === 2) { nav.dataset.bindingStatus = 'references'; return; }
  function readCache() {
    try { var cached = JSON.parse(sessionStorage.getItem(key));
      if (cached && Date.now() - cached.time < 60000 && Array.isArray(cached.items)) return cached.items;
    } catch (_) {}
    return null;
  }
  async function collect() {
    var url = archive, seen = new Set(), items = [], links = new Set();
    for (var depth = 0; url && depth < 100; depth++) {
      if (seen.has(url)) throw new Error('CMS archive cycle');
      seen.add(url);
      var controller = new AbortController(), timer = setTimeout(function(){controller.abort();},10000);
      var html;
      try { var response = await fetch(url,{credentials:'same-origin',signal:controller.signal});
        if (!response.ok) throw new Error('CMS archive unavailable');
        html = await response.text();
      } finally { clearTimeout(timer); }
      var doc = new DOMParser().parseFromString(html,'text/html');
      doc.querySelectorAll(selector).forEach(function(card){
        var href = new URL(card.getAttribute('href'),url);
        if (href.origin !== location.origin || !href.pathname.startsWith(locale+(newsroom?'/newsroom/':'/insights/'))) return;
        var id = pathname(href.href), title = card.querySelector('h3');
        if (links.has(id) || !title || !title.textContent.trim()) return;
        links.add(id);
        var image = card.querySelector('.sub-news-list__img'), meta = card.querySelector('.sub-news-list__meta:last-child');
        items.push({href:href.pathname+href.search,title:title.textContent.trim(),date:meta&&meta.lastElementChild?meta.lastElementChild.textContent.trim():'',image:image?image.getAttribute('src')||'':'',alt:image?image.getAttribute('alt')||'':''});
      });
      var following = doc.querySelector('a.w-pagination-next[href]');
      if (!following) { try {sessionStorage.setItem(key,JSON.stringify({time:Date.now(),items:items}));}catch(_){} return items; }
      var resolved = new URL(following.getAttribute('href'),url);
      if (resolved.origin !== location.origin || resolved.pathname !== new URL(archive).pathname) throw new Error('Unexpected archive route');
      url = resolved.href;
    }
    throw new Error('CMS archive limit');
  }
  function render(card,item){
    card.hidden = !item;
    if (!item) return false;
    card.href = item.href;
    var image = card.querySelector('.cms-detail__nav-media'), title = card.querySelector('.cms-detail__nav-name,.cms-detail__nav-body h2'), date = card.querySelector('.cms-detail__nav-date,.cms-detail__nav-body > p:last-child');
    if(image && item.image){image.src=item.image;image.removeAttribute('srcset');image.alt=item.alt||item.title;}
    if(title)title.textContent=item.title;
    if(date)date.textContent=item.date;
    return true;
  }
  var cached = readCache();
  if (!cached && !pending.has(key)) {
    var request = collect(); pending.set(key,request);
    request.then(function(){pending.delete(key);},function(){pending.delete(key);});
  }
  (cached?Promise.resolve(cached):pending.get(key)).then(function(items){
    var index = items.findIndex(function(item){return pathname(item.href)===pathname(location.href);});
    if(index<0){nav.dataset.bindingStatus='unavailable';return;}
    var hasPrev=render(prev,items[index+1]),hasNext=render(next,items[index-1]);
    nav.hidden=!(hasPrev||hasNext);nav.dataset.bindingStatus='automatic';
  }).catch(function(){nav.dataset.bindingStatus='unavailable';});
}
function L(){var media=document.querySelector(".sub-release-detail__media"),image=media&&media.querySelector(".sub-release-detail__image");if(media)media.hidden=!(image&&String(image.currentSrc||image.getAttribute("src")||"").trim());}function S(e){try{e()}catch(e){window.setTimeout(function(){throw e},0)}}}();
