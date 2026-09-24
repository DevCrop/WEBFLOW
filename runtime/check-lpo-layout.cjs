const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const css = fs.readFileSync('artifacts/lpo-layout/staged.css', 'utf8') + '@media(max-width:767px){.card-heading-group.is-lpo-service,.card-heading-group.is-lpo-proof{padding-left:var(--space--md);padding-right:var(--space--md)}}';
(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 991, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto('https://intellectualdata.webflow.io/LPO', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({ content: css });
      await page.evaluate(() => {
        document.querySelectorAll('.lpo-service-card .card-heading-group').forEach(e => e.classList.add('is-lpo-service'));
        document.querySelectorAll('.sub-lpo-proof .card-heading-group').forEach(e => e.classList.add('is-lpo-proof'));
      });
      const reject = page.locator('[data-cookie-banner] [data-cookie-action="reject"]');
      if (await reject.isVisible()) await reject.click();
      const result = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('.lpo-service-card')];
        const details = [...document.querySelectorAll('.is-lpo-service,.is-lpo-proof')].filter(e => e.getBoundingClientRect().height);
        return {
          cards: cards.length, details: details.length,
          vertical: cards.every(e => getComputedStyle(e).flexDirection === 'column' && getComputedStyle(e.querySelector('.lpo-service-card__meta')).flexDirection === 'column'),
          proofVertical: [...document.querySelectorAll('.sub-lpo-proof__content')].every(e => getComputedStyle(e).flexDirection === 'column'),
          overflow: [...document.querySelectorAll('.sub-lpo-services *, .sub-lpo-proof *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1); }).map(e => e.className),
          surfaces: [...new Set(details.map(e => getComputedStyle(e).backgroundColor))]
        };
      });
      console.log(JSON.stringify({ width, ...result }));
      if (!result.vertical || !result.proofVertical || result.overflow.length || result.details !== 11) throw Error('LPO layout check failed');
      for (const [name, selector] of [['service', '.lpo-service-card'], ['proof', '.sub-lpo-sequence']]) {
        await page.locator(selector).first().scrollIntoViewIfNeeded();
        await page.waitForTimeout(1800);
        // Keep fixed chrome outside these isolated section captures.
        await page.addStyleTag({ content: '.header,.site-announcement,[data-cookie-banner]{visibility:hidden!important}' });
        await page.locator(selector).first().screenshot({ path: `artifacts/lpo-layout/${name}-${width}-staged-preview.png` });
      }
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
