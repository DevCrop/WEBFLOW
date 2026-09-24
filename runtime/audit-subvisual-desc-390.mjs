import {mkdir, writeFile} from 'node:fs/promises';

const lang = process.argv.includes('--lang=en') ? 'en' : 'ko';
const simulateFinal = process.argv.includes('--simulate-final');
const desktop = process.argv.includes('--desktop');
const viewport = desktop ? {width: 1440, height: 900} : {width: 390, height: 844};
const finalDescriptions = {
  ko: {
    '/page/INDA_FullDiscovery': '인텔렉추얼데이터만의 \neDiscovery 전 과정 통합 서비스',
    '/page/K_Discovery': '한국형 증거개시 환경에 최적화된 \neDiscovery Solution',
    '/board/Careers': '인텔렉추얼데이터와 함께 상상을 뛰어넘는 \n경험과 커리어를 만들어보세요.',
  },
  en: {
    '/page/K_Discovery': "eDiscovery Solutions for \nKorea's Discovery Framework",
    '/page/Docusign': 'Global E-Signature and \nContract Management Solution',
    '/page/Kiteworks': 'Robust Secure File Transfer Protocol \nfor Enterprises',
    '/page/Endpoint_Protector': 'Endpoint Security Solution \nto Prevent Data Breaches',
  },
};
const scopedMobilePaths = new Set(['/page/K_Discovery', '/page/Docusign', '/page/Kiteworks', '/page/Endpoint_Protector']);
const paths = [
  '/',
  '/page/INDA_FullDiscovery',
  '/page/Data_Analytics',
  '/page/eDiscovery',
  '/page/K_Discovery',
  '/LPO',
  '/page/Data_Security',
  '/page/NCT',
  '/page/AI',
  '/page/Docusign',
  '/page/Legal_System',
  '/page/Luminance',
  '/page/Litera',
  '/page/Kiteworks',
  '/page/ESG_Management',
  '/page/Nymi_Band',
  '/page/Endpoint_Protector',
  '/page/SessionGuardian',
  '/page/TypingDNA',
  '/page/Relativity',
  '/page/Reveal',
  '/page/About_Us',
  '/board/Insights',
  '/board/Newsroom',
  '/board/Careers',
  '/page/Locations',
  '/page/Contact_Us',
  '/release-notes',
  '/private-resources',
  '/terms-of-use',
  '/privacy-policy-cookie-policy',
  '/search-results',
];

function urlFor(path) {
  if (lang === 'ko') return 'https://intellectualdata.webflow.io' + path;
  return 'https://intellectualdata.webflow.io/en' + (path === '/' ? '' : path);
}
async function createTab(target) {
  const response = await fetch('http://127.0.0.1:9333/json/new?' + encodeURIComponent(target), {method: 'PUT'});
  return response.json();
}
function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const events = new Map();
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const job = pending.get(message.id);
      pending.delete(message.id);
      message.error ? job.reject(new Error(message.error.message)) : job.resolve(message.result);
      return;
    }
    for (const handler of events.get(message.method) || []) handler(message.params);
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
          events.set(method, (events.get(method) || []).filter((item) => item !== handler));
          resolve(params);
        };
        events.set(method, [...(events.get(method) || []), handler]);
      });
    },
    close() { ws.close(); },
  };
}

const tab = await createTab(urlFor('/'));
const cdp = connect(tab.webSocketDebuggerUrl);
await cdp.opened;
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Emulation.setDeviceMetricsOverride', {
  width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: !desktop,
  screenWidth: viewport.width, screenHeight: viewport.height,
});
const outDir = `artifacts/subvisual-desc-${viewport.width}-${lang}${simulateFinal ? '-final' : ''}`;
await mkdir(outDir, {recursive: true});

const rows = [];
for (const path of paths) {
  const url = urlFor(path);
  const loaded = cdp.once('Page.domContentEventFired');
  await cdp.send('Page.navigate', {url});
  await Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, 7000))]);
  await new Promise((resolve) => setTimeout(resolve, 450));
  const evaluated = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const surface = [...document.querySelectorAll('.sub-visual')].find((el) => el.offsetParent !== null) || document.querySelector('.sub-visual');
      const desc = surface ? [...surface.querySelectorAll('.section-head-body, p')].find((el) => {
        const text = (el.textContent || '').trim();
        return text && !el.closest('.breadcrumb') && !el.matches('.cta-button__label');
      }) : null;
      if (!surface) return {status: 'no-subvisual', title: document.title, href: location.href};
      if (!desc) return {status: 'no-desc', title: document.title, href: location.href, surfaceVisible: surface.offsetParent !== null};
      const simulateFinal = ${JSON.stringify(simulateFinal)};
      const finalDescription = ${JSON.stringify(finalDescriptions[lang])}[${JSON.stringify(path)}];
      const mobileScoped = ${JSON.stringify([...scopedMobilePaths])}.includes(${JSON.stringify(path)});
      if (simulateFinal && finalDescription) {
        desc.replaceChildren();
        finalDescription.split('\\n').forEach((part, index) => {
          if (index) desc.append(document.createElement('br'));
          desc.append(document.createTextNode(part));
        });
      }
      if (simulateFinal && mobileScoped) {
        document.body.setAttribute('data-subvisual-br', 'mobile');
        const style = document.createElement('style');
        style.textContent = '[data-subvisual-br="mobile"] .sub-visual .section-head-body br{display:none}@media screen and (max-width:767px){[data-subvisual-br="mobile"] .sub-visual .section-head-body br{display:inline}}';
        document.head.append(style);
      }
      const range = document.createRange();
      const chars = [];
      const walker = document.createTreeWalker(desc, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        for (let i = 0; i < node.length; i++) {
          const ch = node.data[i];
          range.setStart(node, i); range.setEnd(node, i + 1);
          const rect = range.getBoundingClientRect();
          if ((rect.width || rect.height) && ch !== '\\n') chars.push({ch, top: Math.round(rect.top)});
        }
      }
      const lines = [];
      for (const item of chars) {
        let line = lines.find((entry) => Math.abs(entry.top - item.top) <= 1);
        if (!line) { line = {top: item.top, text: ''}; lines.push(line); }
        line.text += item.ch;
      }
      const brs = [...desc.querySelectorAll('br')];
      const rect = desc.getBoundingClientRect();
      const text = (desc.textContent || '').replace(/\\s+/g, ' ').trim();
      return {
        status: 'ok',
        title: document.title,
        href: location.href,
        htmlLang: document.documentElement.lang,
        visible: desc.offsetParent !== null,
        text,
        html: desc.innerHTML,
        lines: lines.sort((a,b) => a.top - b.top).map((line) => line.text.trim()).filter(Boolean),
        brCount: brs.length,
        brDisplays: brs.map((br) => getComputedStyle(br).display),
        clientWidth: desc.clientWidth,
        scrollWidth: desc.scrollWidth,
        rectWidth: Math.round(rect.width * 100) / 100,
        overflowX: desc.scrollWidth > desc.clientWidth + 1,
        fontSize: getComputedStyle(desc).fontSize,
        lineHeight: getComputedStyle(desc).lineHeight,
      };
    })()`,
  });
  rows.push({path, ...evaluated.result.value});
  if (simulateFinal && finalDescriptions[lang][path]) {
    const shot = await cdp.send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: false});
    const name = path.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-') || 'home';
    await writeFile(`${outDir}/${name}.png`, Buffer.from(shot.data, 'base64'));
  }
}
cdp.close();

await writeFile(`${outDir}/audit.json`, JSON.stringify({lang, viewport, rows}, null, 2), 'utf8');
console.log(JSON.stringify({
  lang,
  viewport,
  checked: rows.length,
  ok: rows.filter((row) => row.status === 'ok').length,
  missing: rows.filter((row) => row.status !== 'ok').map((row) => ({path: row.path, status: row.status})),
  overflow: rows.filter((row) => row.overflowX).map((row) => row.path),
  rows: rows.filter((row) => row.status === 'ok').map((row) => ({path: row.path, text: row.text, lines: row.lines, brDisplays: row.brDisplays})),
}, null, 2));
