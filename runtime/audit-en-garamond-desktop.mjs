import {writeFile} from 'node:fs/promises';

const paths = [
  '/', '/page/INDA_FullDiscovery', '/page/Data_Analytics', '/page/eDiscovery', '/page/K_Discovery', '/LPO',
  '/page/Data_Security', '/page/NCT', '/page/AI', '/page/Docusign', '/page/Legal_System', '/page/Luminance',
  '/page/Litera', '/page/Kiteworks', '/page/ESG_Management', '/page/Nymi_Band', '/page/Endpoint_Protector',
  '/page/SessionGuardian', '/page/TypingDNA', '/page/Relativity', '/page/Reveal', '/page/About_Us',
  '/board/Insights', '/board/Newsroom', '/board/Careers', '/page/Locations', '/page/Contact_Us',
  '/release-notes', '/private-resources', '/terms-of-use', '/privacy-policy-cookie-policy', '/search-results',
];

async function createTab(url) {
  const response = await fetch('http://127.0.0.1:9333/json/new?' + encodeURIComponent(url), {method: 'PUT'});
  return response.json();
}
function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const events = new Map();
  ws.onmessage = ({data}) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const job = pending.get(message.id); pending.delete(message.id);
      message.error ? job.reject(new Error(message.error.message)) : job.resolve(message.result); return;
    }
    for (const handler of events.get(message.method) || []) handler(message.params);
  };
  return {
    opened: new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; }),
    send(method, params = {}) { const messageId = ++id; ws.send(JSON.stringify({id: messageId, method, params})); return new Promise((resolve, reject) => pending.set(messageId, {resolve, reject})); },
    once(method) { return new Promise((resolve) => { const handler = (params) => { events.set(method, (events.get(method) || []).filter((x) => x !== handler)); resolve(params); }; events.set(method, [...(events.get(method) || []), handler]); }); },
    close() { ws.close(); },
  };
}

const tab = await createTab('https://intellectualdata.webflow.io/en');
const cdp = connect(tab.webSocketDebuggerUrl);
await cdp.opened;
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Emulation.setDeviceMetricsOverride', {width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 1000});

const rows = [];
for (const path of paths) {
  const url = 'https://intellectualdata.webflow.io/en' + (path === '/' ? '' : path);
  const loaded = cdp.once('Page.domContentEventFired');
  await cdp.send('Page.navigate', {url});
  await Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, 7000))]);
  await new Promise((resolve) => setTimeout(resolve, 350));
  const evaluated = await cdp.send('Runtime.evaluate', {returnByValue: true, expression: `(() => {
    const style = document.createElement('style');
    style.textContent = '@media screen and (min-width:992px){:root{--_typography---type--component--sub-visual--title--garamond--font-size:88px;--_typography---type--component--intro-title--title--garamond--font-size:72px;--_typography---type--component--banner--title--garamond--font-size:80px;--_typography---type--component--section-title--title--garamond--font-size:46px}}';
    document.head.append(style);
    const relevant = [...document.querySelectorAll('h1,h2,h3')].filter((el) => {
      if (el.offsetParent === null) return false;
      const family = getComputedStyle(el).fontFamily;
      return /EB Garamond/i.test(family) && (el.matches('.sub-visual-title,.banner-title,.intro-title__title-text,.section-title__title-text') || el.closest('.sub-visual,.banner,.sub-intro,.section-title'));
    });
    return relevant.map((el) => {
      const cs = getComputedStyle(el); const rect = el.getBoundingClientRect();
      const range = document.createRange(); const tops = new Set(); const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) { const n = walker.currentNode; for (let i=0;i<n.length;i++){ range.setStart(n,i);range.setEnd(n,i+1);const r=range.getBoundingClientRect();if(r.width||r.height)tops.add(Math.round(r.top)); } }
      return {text:el.textContent.replace(/\\s+/g,' ').trim(), className:el.className, fontSize:cs.fontSize, width:Math.round(rect.width), scrollWidth:el.scrollWidth, overflowX:el.scrollWidth>el.clientWidth+1, lineCount:tops.size};
    });
  })()`});
  rows.push({path, url, elements: evaluated.result.value});
}
await writeFile('artifacts/about-en-type/en-garamond-desktop-audit.json', JSON.stringify(rows, null, 2));
const flat = rows.flatMap((row) => row.elements.map((element) => ({path: row.path, ...element})));
console.log(JSON.stringify({pages: rows.length, elements: flat.length, overflow: flat.filter((x) => x.overflowX), maxLines: flat.filter((x) => x.lineCount > 4)}, null, 2));
cdp.close();
