const fs = require('node:fs');
const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main() {
  const native = JSON.parse(fs.readFileSync('artifacts/typography-audit-native.json', 'utf8'));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto('https://intellectualdata.webflow.io/', { waitUntil: 'domcontentloaded' });
    const cssUrl = await page.locator('link[rel="stylesheet"]').evaluateAll(es => es.map(e => e.href).find(h => h.includes('webflow.shared')));
    const css = await (await page.request.get(cssUrl)).text();
    const rules = await page.evaluate(css => {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      const result = [];
      function visit(items, media = '') {
        for (const rule of items) {
          if (rule.style) {
            const props = Object.fromEntries([...rule.style].map(k => [k, rule.style.getPropertyValue(k)]));
            if (Object.keys(props).some(k => /font|line-height|letter-spacing|^--/.test(k))) result.push({ selector: rule.selectorText, media, props });
          }
          if (rule.cssRules) visit(rule.cssRules, [media, rule.conditionText].filter(Boolean).join(' && '));
        }
      }
      visit(sheet.cssRules);
      return result;
    }, css);
    const candidates = native.styles.filter(s => /section-|visual|banner|hero|intro|card|button|heading-|body-|display-|fm-/.test(s.name) && Object.keys(s.properties?.base?.properties || {}).some(k => /font|line-height|letter-spacing/.test(k)));
    const samples = candidates.map(s => ({ id: s.id, selector: s.selector, classes: (s.selector.match(/\.[\w-]+/g) || []).map(v => v.slice(1)).join(' ') }));
    const probes = {};
    for (const width of [1440, 1274, 992, 991, 767, 479, 390]) {
      await page.setViewportSize({ width, height: 900 });
      probes[width] = await page.evaluate(samples => samples.map(sample => {
        const e = document.createElement('div');
        e.className = sample.classes;
        e.textContent = 'Typography sample';
        document.body.appendChild(e);
        const s = getComputedStyle(e);
        const result = { id: sample.id, selector: sample.selector, size: s.fontSize, lineHeight: s.lineHeight, weight: s.fontWeight, family: s.fontFamily, spacing: s.letterSpacing };
        e.remove();
        return result;
      }), samples);
    }
    const paths = ['/', '/page/INDA_FullDiscovery', '/page/Data_Analytics', '/page/Kiteworks', '/page/SessionGuardian', '/LPO', '/page/About_Us', '/page/Docusign'];
    const actual = [];
    for (const path of paths) {
      const response = await page.goto('https://intellectualdata.webflow.io' + path, { waitUntil: 'domcontentloaded' });
      for (const width of [1274, 390]) {
        await page.setViewportSize({ width, height: 900 });
        const elements = await page.locator('h1,h2,h3,h4,h5,h6,.banner-title,[class*="section-"]').evaluateAll(es => es.filter(e => /title|eyebrow|subtitle|body|display|stat|heading/i.test(e.className)).map(e => {
          const s = getComputedStyle(e);
          return { tag: e.tagName, classes: e.className, text: e.textContent.trim().slice(0,100), size: s.fontSize, weight: s.fontWeight, lineHeight: s.lineHeight, visible: e.getClientRects().length > 0 && s.display !== 'none', scrollWidth: e.scrollWidth, clientWidth: e.clientWidth, strong: [...e.querySelectorAll('strong,b')].map(n => ({ text: n.textContent.slice(0,70), weight: getComputedStyle(n).fontWeight, size: getComputedStyle(n).fontSize })) };
        }));
        actual.push({ path, width, status: response.status(), horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), elements });
      }
    }
    const result = { cssUrl, rules, probes, actual, note: 'Synthetic probes test published selector CSS, not native unpublished changes or contextual ancestor/variant rules. Actual DOM samples cover eight pages at two widths. No remote writes.' };
    fs.writeFileSync('artifacts/typography-audit-browser.json', JSON.stringify(result, null, 2), 'utf8');
    console.log(JSON.stringify({ rules: rules.length, probes: samples.length, pages: actual.map(p => ({ path:p.path, width:p.width, status:p.status, textElements:p.elements.length, horizontalOverflow:p.horizontalOverflow })) }, null, 2));
  } finally {
    await browser.close();
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
