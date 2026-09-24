const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const manifest = JSON.parse(fs.readFileSync('artifacts/button-font-final-actions.json', 'utf8'));
const rules = manifest.actions.map(a => a.set_variant_styles);
const media = { small: 767, tiny: 478, medium: 991 };
const css = rules.filter(r => r.properties).map(r => {
  const selector = '.' + r.style_name + (r.variant_id === 'base' ? '' : '.w-variant-' + r.variant_id);
  const declarations = r.properties.map(p => p.property_name + ':' + (p.variable_as_value ? 'var(' + manifest.cssMap[p.variable_as_value] + ')' : p.property_value)).join(';');
  const rule = selector + '{' + declarations + '}';
  return r.breakpoint_id ? '@media(max-width:' + media[r.breakpoint_id] + 'px){' + rule + '}' : rule;
}).join('\n');
const selectors = '.button-label,.cta-button__label,.sub-contact__submit,.header__search-submit,.footer__stibee-submit,.password-access__button,.search-results__button';
(async () => {
  const browser = await chromium.launch();
  const results = [];
  try {
    const page = await browser.newPage();
    for (const path of ['/page/Kiteworks', '/page/Contact_Us', '/page/Docusign', '/page/INDA_FullDiscovery', '/release-notes']) {
      await page.goto('https://intellectualdata.webflow.io' + path, { waitUntil: 'domcontentloaded' });
      // Apply the exact unpublished native typography changes only to this test browser.
      await page.addStyleTag({ content: css });
      const cookie = page.locator('[data-cookie-banner] [data-cookie-action="reject"]');
      if (await cookie.isVisible()) await cookie.click();
      for (const width of [1440, 768, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => document.fonts.ready);
        const buttons = await page.locator(selectors).evaluateAll(elements => elements.filter(e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden').map(e => {
          const s = getComputedStyle(e), r = e.getBoundingClientRect();
          const p = e.closest('a,button,input') || e;
          const pr = p.getBoundingClientRect();
          return { text: e.textContent.trim() || e.value, className: e.className, fontSize: s.fontSize, family: s.fontFamily, weight: s.fontWeight, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, href: p.getAttribute('href'), clipped: e.scrollWidth > e.clientWidth + 2 || r.left < pr.left - 2 || r.right > pr.right + 2, width: r.width };
        }));
        results.push({ path, width, staged: true, buttons });
        for (const b of buttons) { assert.ok(parseFloat(b.fontSize) >= 16, JSON.stringify(b)); assert.ok(!b.clipped, JSON.stringify(b)); }
        if (path === '/page/Kiteworks') {
          const sample = page.locator('a.button').filter({ hasText: '보러가기' }).first();
          if (await sample.count()) await sample.screenshot({ path: 'artifacts/button-ui-' + width + '.png' });
        }
      }
    }
  } finally {
    fs.writeFileSync('artifacts/button-font-validation.json', JSON.stringify(results, null, 2));
    await browser.close();
  }
  console.log(JSON.stringify({ viewports: results.length, labels: results.reduce((n, r) => n + r.buttons.length, 0), passed: true }));
})().catch(e => { console.error(e); process.exitCode = 1; });
