const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const pages = JSON.parse(fs.readFileSync('artifacts/subvisual-pages.json', 'utf8'));
const navigate = process.argv.includes('--click');
const locale = process.argv.includes('--en') ? '/en' : '';
(async () => {
  const browser = await chromium.launch();
  const results = [];
  try {
    const page = await browser.newPage();
    for (const entry of pages.filter(p => !p.collectionId && !p.draft && !p.archived)) {
      for (const width of [1440, 390]) {
        const row = { path: locale + entry.publishedPath, width };
        try {
          await page.setViewportSize({ width, height: 900 });
          const response = await page.goto('https://intellectualdata.webflow.io' + row.path, { waitUntil: 'domcontentloaded', timeout: 30000 });
          row.status = response.status();
          row.buttons = await page.locator('.sub-visual__actions a, .sub-visual .cta-button').evaluateAll(elements => elements.map(e => ({ text: e.textContent.trim(), href: e.getAttribute('href'), tag: e.tagName, visible: !!(e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden') })));
          row.clicks = [];
          for (const [index, button] of row.buttons.entries()) {
            if (!button.visible) continue;
            const locator = page.locator('.sub-visual__actions a, .sub-visual .cta-button').nth(index);
            const cookie = page.locator('[data-cookie-banner] [data-cookie-action="reject"]');
            if (await cookie.isVisible()) await cookie.click();
            try {
              await locator.click({ trial: true, timeout: 7000 });
              const click = { index, reachable: true };
              if (navigate) {
                await locator.click({ timeout: 7000 });
                await page.waitForURL('**/page/Contact_Us', { timeout: 12000 });
                click.destination = page.url();
              }
              row.clicks.push(click);
            } catch (e) { row.clicks.push({ index, reachable: false, error: e.message.slice(0,1800) }); }
          }
        } catch (e) { row.error = e.message; }
        results.push(row);
        fs.writeFileSync(`artifacts/subvisual-live-${navigate ? 'clicks' : 'audit'}${locale ? '-en' : ''}.json`, JSON.stringify(results, null, 2));
        console.log(JSON.stringify(row));
      }
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
