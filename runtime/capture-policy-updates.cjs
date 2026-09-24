const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const changes = require('../artifacts/policy-cookie-audit/staged-changes.json');

(async () => {
  const browser = await chromium.launch();
  try {
    for (const [name, slug] of [['privacy', 'privacy-policy-cookie-policy'], ['terms', 'terms-of-use']]) {
      for (const width of [1440, 390]) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        await page.goto(`https://intellectualdata.webflow.io/${slug}`, { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => document.fonts.ready);
        // Preview the read-back-verified staged edits without publishing.
        const result = await page.evaluate(ops => {
          const root = document.querySelector('h1').closest('section');
          root.querySelectorAll('h2').forEach(e => { e.className = 'section-content-body bold text-body-invert'; });
          let count = 0;
          for (const op of ops.filter(o => o.text)) {
            const original = op.text.replace(/^(?:- |\d+\. )/, '');
            const node = Array.from(root.querySelectorAll('p')).find(e => e.textContent.trim() === original || e.textContent.trim() === op.text);
            if (!node) throw Error(`Missing paragraph: ${original}`);
            node.textContent = op.text;
            count++;
          }
          const body = root.querySelector('p.section-content-body');
          const headings = Array.from(root.querySelectorAll('h2'));
          return { changedParagraphs: count, headings: headings.length, typographyMatches: headings.every(e => getComputedStyle(e).fontSize === getComputedStyle(body).fontSize && getComputedStyle(e).fontWeight === '700'), overflow: document.documentElement.scrollWidth > innerWidth };
        }, changes[name]);
        await page.locator('[data-cookie-banner] [data-cookie-action="reject"]').click();
        await page.waitForTimeout(200);
        await page.screenshot({ path: `artifacts/policy-cookie-audit/${name}-${width}-updated-preview.png`, fullPage: true });
        if (!result.typographyMatches || result.overflow) throw Error(JSON.stringify(result));
        console.log(JSON.stringify({ name, width, ...result }));
        await page.close();
      }
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
