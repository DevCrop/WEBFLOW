const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [1440, 991, 767, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      await page.route('**/*id-ui-controller-1.1.68.js', route => route.fulfill({ contentType: 'application/javascript', body: fs.readFileSync(path.join(__dirname, 'id-ui-controller-1.1.69.js'), 'utf8') }));
      // Remove the original asset's SRI only in this local verification response.
      await page.route('https://intellectualdata.webflow.io/page/Docusign', async route => {
        const response = await route.fetch();
        const html = (await response.text()).replace(/(<script\b[^>]*id-ui-controller-1\.1\.68\.js[^>]*?)\s+integrity="[^"]*"/g, '$1');
        await route.fulfill({ response, body: html });
      });
      await page.goto('https://intellectualdata.webflow.io/page/Docusign', { waitUntil: 'networkidle' });
      await page.locator('[data-product-tabs-sticky]').waitFor();
      await page.evaluate(async () => { await document.fonts.ready; window.scrollTo(0, document.querySelector('[data-product-tabs-url]').offsetTop + 200); });
      await page.waitForTimeout(400);
      const inspect = () => page.evaluate(() => {
        const header = document.querySelector('#top .header__container').getBoundingClientRect();
        const sticky = document.querySelector('[data-product-tabs-sticky]');
        const banner = document.querySelector('[data-site-announcement]');
        return { version: window.__ID_UI_CONTROLLER__?.version, headerBottom: header.bottom, stickyTop: sticky.getBoundingClientRect().top, announcementHeight: banner.getBoundingClientRect().height, stuck: sticky.dataset.stuck };
      });
      const shown = await inspect();
      if (shown.version !== '1.1.69' || Math.abs(shown.stickyTop - shown.headerBottom) > 2 || shown.stuck !== 'true') throw Error(JSON.stringify({ width, shown }));
      await page.screenshot({ path: path.join(__dirname, `docusign-sticky-${width}.png`) });
      await page.evaluate(() => {
        const banner = document.querySelector('[data-site-announcement]');
        banner.style.minHeight = '112px';
      });
      await page.waitForTimeout(200);
      const expanded = await inspect();
      if (expanded.announcementHeight < 112 || Math.abs(expanded.stickyTop - expanded.headerBottom) > 2 || expanded.stuck !== 'true') throw Error(JSON.stringify({ width, expanded }));
      await page.locator('[data-announcement-close]').click();
      await page.waitForTimeout(400);
      const closed = await inspect();
      if (closed.announcementHeight !== 0 || Math.abs(closed.stickyTop - closed.headerBottom) > 2 || closed.stuck !== 'true') throw Error(JSON.stringify({ width, closed }));
      console.log(JSON.stringify({ width, shown, expanded, closed }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
