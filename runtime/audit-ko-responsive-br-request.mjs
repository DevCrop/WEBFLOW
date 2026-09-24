const desktop = process.argv.includes('--desktop');
const viewport = desktop ? {width: 1440, height: 900} : {width: 390, height: 844};
const pages = [
  {
    url: 'https://intellectualdata.webflow.io/page/Docusign',
    targets: [
      ['keep', '전자서명을 넘어,'],
      ['only-desktop', 'Docusign IAM, Intelligent Agreement Management'],
      ['only-desktop', 'Docusign의 가장 큰 장점은'],
    ],
  },
  {
    url: 'https://intellectualdata.webflow.io/page/Docusign?tab=esignature',
    targets: [
      ['only-desktop', '국내 기업의 경영 환경에 최적화된 글로벌 전자계약 솔루션 도입이 필요하다면?'],
      ['only-desktop', '해외 거래에 Docusign® 도입이 필요하다면'],
    ],
  },
  {
    url: 'https://intellectualdata.webflow.io/page/Luminance',
    targets: [
      ['only-desktop', 'Luminance는 2억 2천만 건 이상의'],
      ['only-desktop', '인텔렉추얼데이터는 Luminance의 한국 공식 전략 파트너입니다.'],
      ['only-desktop', 'Luminance의 강력한 AI 기능을 직접 경험해 보세요.'],
    ],
  },
  {url: 'https://intellectualdata.webflow.io/page/Litera', targets: [['only-desktop', '인텔렉추얼데이터는 Litera의 한국 공식 리셀러 파트너로,']]},
  {url: 'https://intellectualdata.webflow.io/page/ESG_Management', targets: [['only-desktop', '최고 경영책임자에게 발생 가능한 법적 리스크를']]},
  {url: 'https://intellectualdata.webflow.io/page/Nymi_Band', targets: [['only-desktop', '인텔렉추얼데이터와 함께 Nymi Band를 국내에서 직접 경험해 보세요.']]},
  {url: 'https://intellectualdata.webflow.io/page/About_Us', targets: [['only-desktop', '오랜 기간 국내 대표 기업들의 대형 소송 eDiscovery를']]},
  {
    url: 'https://intellectualdata.webflow.io/board/Careers',
    targets: [
      ['only-desktop', '인텔렉추얼데이터는 eDiscovery부터 기업 전문 솔루션에 이르기까지'],
      ['only-desktop', '업무 환경부터 지원 자격, Intellectual Data만의 장점까지'],
    ],
  },
];

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

const tab = await createTab(pages[0].url);
const cdp = connect(tab.webSocketDebuggerUrl);
await cdp.opened;
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Emulation.setDeviceMetricsOverride', {
  width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: !desktop,
  screenWidth: viewport.width, screenHeight: viewport.height,
});

const results = [];
for (const page of pages) {
  const loaded = cdp.once('Page.loadEventFired');
  await cdp.send('Page.navigate', {url: page.url});
  await Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, 12000))]);
  await new Promise((resolve) => setTimeout(resolve, 900));
  const evaluated = await cdp.send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `(() => {
      document.documentElement.lang = 'ko';
      const style = document.createElement('style');
      style.textContent = '@media screen and (max-width:767px){html:lang(ko) [data-br-ko="only-desktop"] br{display:none}html:lang(ko) [data-br-ko="keep"] br{display:inline}}';
      document.head.append(style);
      const defs = ${JSON.stringify(page.targets)};
      return defs.map(([mode, needle]) => {
        const candidates = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')].filter((el) => (el.textContent || '').includes(needle));
        const el = candidates.find((item) => item.offsetParent !== null) || candidates[0] || null;
        if (!el) return {needle, mode, found: false};
        el.setAttribute('data-br-ko', mode);
        const brs = [...el.querySelectorAll('br')];
        const range = document.createRange();
        const points = [];
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          for (let i = 0; i < node.length; i++) {
            range.setStart(node, i); range.setEnd(node, i + 1);
            const rect = range.getBoundingClientRect();
            if (rect.width || rect.height) points.push(Math.round(rect.top));
          }
        }
        return {
          needle, mode, found: true,
          brCount: brs.length,
          brDisplays: brs.map((br) => getComputedStyle(br).display),
          visualLines: [...new Set(points)].length,
          text: (el.innerText || '').replace(/\\s+/g, ' ').trim(),
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
        };
      });
    })()`,
  });
  results.push({url: page.url, results: evaluated.result.value});
}
console.log(JSON.stringify({viewport, pages: results}, null, 2));
cdp.close();
