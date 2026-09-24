import {mkdir, writeFile} from 'node:fs/promises';

const mobile = process.argv.includes('--mobile');
const simulateFinal = process.argv.includes('--simulate-final');
const viewport = mobile ? {width: 390, height: 844} : {width: 1440, height: 1000};
const pages = [
  {lang: 'ko', url: 'https://intellectualdata.webflow.io/page/About_Us'},
  {lang: 'en', url: 'https://intellectualdata.webflow.io/en/page/About_Us'},
];

async function createTab(url) {
  const response = await fetch('http://127.0.0.1:9333/json/new?' + encodeURIComponent(url), {method: 'PUT'});
  return response.json();
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const handlers = new Map();
  ws.onmessage = ({data}) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const job = pending.get(message.id);
      pending.delete(message.id);
      message.error ? job.reject(new Error(message.error.message)) : job.resolve(message.result);
      return;
    }
    for (const handler of handlers.get(message.method) || []) handler(message.params);
  };
  return {
    opened: new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; }),
    send(method, params = {}) {
      const messageId = ++id;
      ws.send(JSON.stringify({id: messageId, method, params}));
      return new Promise((resolve, reject) => pending.set(messageId, {resolve, reject}));
    },
    once(method) {
      return new Promise((resolve) => {
        const handler = (params) => {
          handlers.set(method, (handlers.get(method) || []).filter((entry) => entry !== handler));
          resolve(params);
        };
        handlers.set(method, [...(handlers.get(method) || []), handler]);
      });
    },
    close() { ws.close(); },
  };
}

const tab = await createTab(pages[0].url);
const cdp = connect(tab.webSocketDebuggerUrl);
await cdp.opened;
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Emulation.setDeviceMetricsOverride', {width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile, screenWidth: viewport.width, screenHeight: viewport.height});
await mkdir('artifacts/about-en-type', {recursive: true});

const results = [];
for (const page of pages) {
  const loaded = cdp.once('Page.domContentEventFired');
  await cdp.send('Page.navigate', {url: page.url});
  await Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, 7000))]);
  await new Promise((resolve) => setTimeout(resolve, 800));
  const result = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      if (${JSON.stringify(simulateFinal)}) {
        const style = document.createElement('style');
        style.textContent = '@media screen and (min-width:992px){:root{--_typography---type--component--sub-visual--title--garamond--font-size:88px;--_typography---type--component--intro-title--title--garamond--font-size:72px;--_typography---type--component--banner--title--garamond--font-size:80px;--_typography---type--component--section-title--title--garamond--font-size:46px}}';
        document.head.append(style);
      }
      const visible = (selector, root = document) => [...root.querySelectorAll(selector)].find((el) => el.offsetParent !== null);
      const surface = visible('.sub-visual');
      const title = surface && visible('h1,h2,.section-head-title', surface);
      const banner = visible('.banner');
      const bannerTitle = banner && visible('.banner-title', banner);
      function details(el) {
        if (!el) return null;
        const cs = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const variables = {};
        for (const name of cs) {
          if (name.startsWith('--') && /(typography|font|title|banner|visual)/i.test(name)) {
            const value = cs.getPropertyValue(name).trim();
            if (value) variables[name] = value;
          }
        }
        const range = document.createRange();
        const chars = [];
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          for (let i = 0; i < node.length; i++) {
            range.setStart(node, i); range.setEnd(node, i + 1);
            const r = range.getBoundingClientRect();
            if ((r.width || r.height) && node.data[i] !== '\\n') chars.push({ch: node.data[i], top: Math.round(r.top)});
          }
        }
        const lines = [];
        for (const item of chars) {
          let line = lines.find((entry) => Math.abs(entry.top - item.top) <= 1);
          if (!line) { line = {top: item.top, text: ''}; lines.push(line); }
          line.text += item.ch;
        }
        return {
          tag: el.tagName,
          className: el.className,
          text: el.textContent.replace(/\\s+/g, ' ').trim(),
          html: el.innerHTML,
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
          fontWeight: cs.fontWeight,
          letterSpacing: cs.letterSpacing,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          lines: lines.sort((a,b) => a.top-b.top).map((line) => line.text.trim()).filter(Boolean),
          variables,
        };
      }
      const bannerAction = banner && visible('.banner-actions, .cta-button', banner);
      return {htmlLang: document.documentElement.lang, title: details(title), bannerTitle: details(bannerTitle), bannerAction: details(bannerAction)};
    })()`,
  });
  results.push({lang: page.lang, url: page.url, ...result.result.value});
  const screenshot = await cdp.send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: false});
  await writeFile(`artifacts/about-en-type/about-${page.lang}-${viewport.width}-${simulateFinal ? 'final' : 'before'}.png`, Buffer.from(screenshot.data, 'base64'));
}

await writeFile(`artifacts/about-en-type/inspection-${viewport.width}-${simulateFinal ? 'final' : 'before'}.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
cdp.close();
