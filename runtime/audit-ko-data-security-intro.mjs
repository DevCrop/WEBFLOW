const url = 'https://intellectualdata.webflow.io/page/Data_Security';
const desktop = process.argv.includes('--desktop');
const viewport = desktop ? {width: 1440, height: 900} : {width: 390, height: 844};

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

const tab = await createTab(url);
const cdp = connect(tab.webSocketDebuggerUrl);
await cdp.opened;
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Emulation.setDeviceMetricsOverride', {
  width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: true,
  screenWidth: viewport.width, screenHeight: viewport.height,
});
const loaded = cdp.once('Page.loadEventFired');
await cdp.send('Page.navigate', {url});
await Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, 12000))]);
await new Promise((resolve) => setTimeout(resolve, 1800));

const result = await cdp.send('Runtime.evaluate', {
  awaitPromise: true,
  returnByValue: true,
  expression: String.raw`(async () => {
    await document.fonts.ready;
    const title = [...document.querySelectorAll('.intro-title__title-text')]
      .find((node) => node.textContent.includes('전자계약부터'));
    if (!title) return {error: 'title not found'};
    title.innerHTML = '전자계약부터 <br>기업 중요 데이터까지 <br>데이터 전송 보안 전문 컨설팅';
    const scope = title.closest('[class]')?.parentElement?.parentElement || title.parentElement;
    scope.setAttribute('data-br-ko', 'first-mobile');
    const style = document.createElement('style');
    style.textContent = 'html:lang(ko) [data-br-ko="first-mobile"] .intro-title__title-text br:first-of-type{display:none}@media screen and (max-width:767px){html:lang(ko) [data-br-ko="first-mobile"] .intro-title__title-text br:first-of-type,html:lang(ko) [data-br-ko="first-mobile"] .intro-title__title-text br:nth-of-type(2){display:inline}}';
    document.head.append(style);
    const tokens = [];
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      for (const match of node.nodeValue.matchAll(/\S+/g)) {
        const range = document.createRange();
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        const rect = range.getBoundingClientRect();
        tokens.push({text: match[0], top: rect.top, left: rect.left});
      }
    }
    tokens.sort((a,b) => Math.abs(a.top-b.top)>2 ? a.top-b.top : a.left-b.left);
    const lines = [];
    for (const token of tokens) {
      let line = lines.find((item) => Math.abs(item.top-token.top)<=2);
      if (!line) { line={top:token.top,words:[]}; lines.push(line); }
      line.words.push(token.text);
    }
    return {
      lines: lines.sort((a,b)=>a.top-b.top).map((line)=>line.words.join(' ')),
      brDisplays: [...title.querySelectorAll('br')].map((br)=>getComputedStyle(br).display),
      width: title.getBoundingClientRect().width,
      scrollWidth: title.scrollWidth,
    };
  })()`,
});
console.log(JSON.stringify(result.result.value));
await cdp.send('Page.close');
cdp.close();
