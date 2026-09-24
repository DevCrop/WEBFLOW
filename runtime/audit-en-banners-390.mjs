import fs from 'node:fs/promises';
import path from 'node:path';

const base = 'https://intellectualdata.webflow.io';
const pages = [
  ['INDA FullDiscovery', '/en/page/INDA_FullDiscovery'],
  ['Data Analytics', '/en/page/Data_Analytics'],
  ['What is eDiscovery', '/en/page/eDiscovery'],
  ['K-Discovery', '/en/page/K_Discovery'],
  ['LPO', '/en/LPO'],
  ['Data Security', '/en/page/Data_Security'],
  ['NCT', '/en/page/NCT'],
  ['Corporate AI', '/en/page/AI'],
  ['Docusign', '/en/page/Docusign'],
  ['Legal System', '/en/page/Legal_System'],
  ['Luminance', '/en/page/Luminance'],
  ['Litera', '/en/page/Litera'],
  ['Kiteworks', '/en/page/Kiteworks'],
  ['ESG Management', '/en/page/ESG_Management'],
  ['Nymi Band', '/en/page/Nymi_Band'],
  ['Endpoint Protector', '/en/page/Endpoint_Protector'],
  ['SessionGuardian', '/en/page/SessionGuardian'],
  ['TypingDNA', '/en/page/TypingDNA'],
  ['Relativity', '/en/page/Relativity'],
  ['Reveal', '/en/page/Reveal'],
  ['About Us', '/en/page/About_Us'],
  ['Careers', '/en/board/Careers'],
  ['Locations', '/en/page/Locations'],
];

const desktopViewport = process.argv.includes('--desktop');
const designerClean = process.argv.includes('--designer');
const viewportWidth = desktopViewport ? 1440 : 390;
const viewportHeight = desktopViewport ? 900 : 844;
const outDir = path.resolve(desktopViewport ? 'artifacts/en-banner-1440' : 'artifacts/en-banner-390');
await fs.mkdir(outDir, {recursive: true});

const proposedMobileTitles = {
  'INDA FullDiscovery': ['If you have questions', 'about eDiscovery,', 'consult with an expert today.'],
  'Data Analytics': ['If you have questions', 'about eDiscovery,', 'consult with an expert today.'],
  'What is eDiscovery': ['If you have questions', 'about eDiscovery,', 'consult with an expert today.'],
  'Careers': ['If you have questions', 'about eDiscovery,', 'consult with an expert today.'],
  'Locations': ['If you have questions', 'about eDiscovery,', 'consult with an expert today.'],
  'Luminance': ['Drive business efficiency', 'with Luminance.', 'Implement it with Intellectual Data,', "Luminance's official partner in Korea."],
  'Litera': ['Trusted by 15,000+ Legal Teams', 'Implement Litera', 'with Intellectual Data,', 'Official Partner in Korea'],
  'ESG Management': ['Need a corporate compliance and', 'regulatory management solution?', 'Speak with an expert today.'],
};

const proposedDesktopTitles = {
  'What is eDiscovery': [[
    'If you have questions about eDiscovery,',
    'consult with an expert today.',
  ]],
  'Careers': [[
    'If you have questions about eDiscovery,',
    'consult with an expert today.',
  ]],
  'Locations': [[
    'If you have questions about eDiscovery,',
    'consult with an expert today.',
  ]],
  'Docusign': [
    ['For inquiries about Docusign IAM solutions,', 'consult with Intellectual Data,', 'an IAM Sell Specialized Partner.'],
    ['For Docusign adoption and eSignature solutions,', 'contact Intellectual Data,', "Korea’s single-tier Docusign partner."],
    ['For inquiries about Docusign CLM solutions,', 'consult with Intellectual Data,', 'a Docusign CLM Sell Specialized Partner.'],
  ],
  'Luminance': [[
    'Drive business efficiency with Luminance.',
    'Implement it with Intellectual Data,',
    "Luminance's official partner in Korea.",
  ]],
  'ESG Management': [[
    'Need a corporate compliance and',
    'regulatory management solution?',
    'Speak with an expert today.',
  ]],
  'Nymi Band': [[
    'Interested in implementing',
    'the Nymi® Band security solution?',
    'Speak with Intellectual Data today.',
  ]],
};

const proposedMobileTitleSets = {
  'Docusign': [
    null,
    null,
    ['For inquiries about', 'Docusign CLM solutions,', 'consult with Intellectual Data,', 'a Docusign CLM Sell', 'Specialized Partner.'],
  ],
};

async function createTab(url) {
  const response = await fetch('http://127.0.0.1:9333/json/new?' + encodeURIComponent(url), {method: 'PUT'});
  if (!response.ok) throw new Error('Unable to create CDP tab: ' + response.status);
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
      const {resolve, reject} = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
      return;
    }
    const handlers = events.get(message.method) || [];
    handlers.forEach((handler) => handler(message.params));
  };
  const opened = new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  return {
    opened,
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

const auditExpression = String.raw`
(async () => {
  await document.fonts.ready;
  const visible = (el) => {
    if (!el) return false;
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
  };
  const visualLines = (root) => {
    const tokens = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const value = node.nodeValue || '';
      const regex = /\S+/g;
      let match;
      while ((match = regex.exec(value))) {
        const range = document.createRange();
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        const rect = range.getBoundingClientRect();
        if (rect.width && rect.height) tokens.push({text: match[0], top: rect.top, left: rect.left});
      }
    }
    tokens.sort((a, b) => Math.abs(a.top - b.top) > 2 ? a.top - b.top : a.left - b.left);
    const lines = [];
    for (const token of tokens) {
      let line = lines.find((item) => Math.abs(item.top - token.top) <= 2);
      if (!line) { line = {top: token.top, words: []}; lines.push(line); }
      line.words.push(token.text);
    }
    return lines.sort((a, b) => a.top - b.top).map((line) => line.words.join(' '));
  };
  return [...document.querySelectorAll('.banner')].map((banner, index) => {
    const candidates = [...banner.querySelectorAll('.banner-title')];
    const title = candidates.find(visible) || null;
    const brs = title ? [...title.querySelectorAll('br')].map((br) => getComputedStyle(br).display) : [];
    const rect = title?.getBoundingClientRect();
    return {
      index,
      activeText: title?.innerText || '',
      lines: title ? visualLines(title) : [],
      brDisplays: brs,
      fontSize: title ? getComputedStyle(title).fontSize : null,
      rect: rect ? {x: rect.x, y: rect.y, width: rect.width, height: rect.height} : null,
      allTitles: candidates.map((item) => ({
        text: item.innerText,
        display: getComputedStyle(item).display,
        parentDisplay: getComputedStyle(item.parentElement).display,
        visible: visible(item),
      })),
    };
  });
})()
`;

const preview = process.argv.includes('--preview');
const requestedPage = process.argv.slice(2).find((arg) => !['--preview', '--desktop', '--designer'].includes(arg))?.toLowerCase();
const selectedPages = requestedPage ? pages.filter(([name]) => name.toLowerCase().includes(requestedPage)) : pages;
const results = [];
for (const [name, pathname] of selectedPages) {
  const url = base + pathname;
  const tab = await createTab(url);
  const cdp = connect(tab.webSocketDebuggerUrl);
  await cdp.opened;
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 1,
    mobile: true,
    screenWidth: viewportWidth,
    screenHeight: viewportHeight,
  });
  const loaded = cdp.once('Page.loadEventFired');
  await cdp.send('Page.navigate', {url});
  await Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, 12000))]);
  await new Promise((resolve) => setTimeout(resolve, 1800));
  if (designerClean) {
    await cdp.send('Runtime.evaluate', {
      expression: `(() => { document.querySelectorAll('[data-br-en-banner]').forEach((node)=>node.removeAttribute('data-br-en-banner')); const clean=(owner)=>{ const rules=owner.cssRules; for(let i=rules.length-1;i>=0;i--){ const rule=rules[i]; if(rule.cssRules) clean(rule); if(rule.selectorText?.includes('html:lang(en)')&&rule.selectorText.includes('data-wf-page')&&rule.selectorText.includes('.banner-title')) owner.deleteRule(i); } }; for(const sheet of document.styleSheets){ try{ clean(sheet); }catch(_){} } })()`,
    });
  }
  if (preview && !desktopViewport && proposedMobileTitles[name]) {
    const html = proposedMobileTitles[name].map((line) => line.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')).join('<br>');
    await cdp.send('Runtime.evaluate', {
      expression: `document.querySelector('.banner .is-br-only-mobile .banner-title').innerHTML=${JSON.stringify(html)}`,
    });
  }
  if (preview && !desktopViewport && proposedMobileTitleSets[name]) {
    const titleSets = proposedMobileTitleSets[name].map((lines) => lines ? lines
      .map((line) => line.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'))
      .join('<br>') : null);
    await cdp.send('Runtime.evaluate', {
      expression: `(() => { const values=${JSON.stringify(titleSets)}; const banners=[...document.querySelectorAll('.banner')]; values.forEach((html,index)=>{ if(!html) return; const title=banners[index]?.querySelector('.is-br-only-mobile .banner-title'); if(title) title.innerHTML=html; }); })()`,
    });
  }
  if (preview && desktopViewport && proposedDesktopTitles[name]) {
    const titleSets = proposedDesktopTitles[name].map((lines) => lines
      .map((line) => line.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'))
      .join('<br>'));
    await cdp.send('Runtime.evaluate', {
      expression: `(() => { const values=${JSON.stringify(titleSets)}; const banners=[...document.querySelectorAll('.banner')]; values.forEach((html,index)=>{ const titles=[...(banners[index]?.querySelectorAll('.banner-title')||[])]; const title=titles.find((item)=>getComputedStyle(item.parentElement).display!=='none'&&getComputedStyle(item).display!=='none')||titles[0]; if(title) title.innerHTML=html; }); })()`,
    });
  }
  const evaluated = await cdp.send('Runtime.evaluate', {
    expression: auditExpression,
    awaitPromise: true,
    returnByValue: true,
  });
  const banners = evaluated.result?.value || [];
  for (let bannerIndex = 0; bannerIndex < banners.length; bannerIndex++) {
    let banner = banners[bannerIndex];
    if (!banner.rect) {
      await cdp.send('Runtime.evaluate', {
        expression: `(() => { const banner=document.querySelectorAll('.banner')[${bannerIndex}]; const pane=banner?.closest('.w-tab-pane'); const key=pane?.getAttribute('data-w-tab'); const tabs=pane?.closest('.w-tabs'); const links=[...(tabs?.querySelectorAll('.w-tab-menu .w-tab-link')||[])]; const link=links.find((item)=>item.getAttribute('data-w-tab')===key); link?.click(); let node=banner; while(node&&node!==document.body){ if(getComputedStyle(node).display==='none') node.style.setProperty('display','block','important'); node=node.parentElement; } })()`,
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      const refreshed = await cdp.send('Runtime.evaluate', {expression: auditExpression, awaitPromise: true, returnByValue: true});
      banner = (refreshed.result?.value || [])[bannerIndex] || banner;
      banners[bannerIndex] = banner;
    }
    if (!banner.rect) continue;
    const clipY = Math.max(0, banner.rect.y - 180);
    const shot = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: true,
      clip: {x: 0, y: clipY, width: viewportWidth, height: 430, scale: 1},
    });
    const safe = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const file = path.join(outDir, `${safe}-banner-${banner.index + 1}.png`);
    await fs.writeFile(file, Buffer.from(shot.data, 'base64'));
    banner.screenshot = file;
  }
  results.push({name, url, banners});
  await cdp.send('Page.close');
  cdp.close();
}
await fs.writeFile(path.join(outDir, 'audit.json'), JSON.stringify(results, null, 2), 'utf8');
console.log(JSON.stringify(results));
