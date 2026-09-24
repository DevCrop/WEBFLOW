const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const change = JSON.parse(fs.readFileSync('artifacts/inda-manual-slider-change.json', 'utf8'));
const oldConfig = 'i.autoplay={delay:5000,disableOnInteraction:!1,pauseOnMouseEnter:!0}';
const newConfig = 'i.autoplay=!1,i.initialSlide=0';
assert.equal(change.after, change.before.replace(oldConfig, newConfig));
(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 768, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      let staged = false;
      await page.route('**/page/INDA_FullDiscovery', async route => {
        const response = await route.fetch();
        const html = await response.text();
        assert.ok(html.includes(oldConfig) || html.includes(newConfig), 'Controller config must be present');
        staged = html.includes(oldConfig);
        await route.fulfill({ response, body: html.replace(oldConfig, newConfig) });
      });
      await page.goto('https://intellectualdata.webflow.io/page/INDA_FullDiscovery', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => !!document.querySelector('.sub-inda-process__swiper')?.swiper);
      const state = () => page.locator('.sub-inda-process__swiper').evaluate(e => ({ index: e.swiper.activeIndex, autoplay: e.swiper.params.autoplay.enabled, running: e.swiper.autoplay.running, count: e.swiper.slides.length }));
      assert.equal((await state()).index, 0);
      assert.equal((await state()).autoplay, false);
      await page.waitForTimeout(10000);
      assert.equal((await state()).index, 0, 'Must remain on card 01 before arriving at section');
      const reject = page.locator('[data-cookie-banner] [data-cookie-action="reject"]');
      if (await reject.isVisible()) await reject.click();
      const next = page.locator('.sub-inda-process__nav-next');
      await next.click();
      await page.waitForTimeout(800);
      const moved = (await state()).index;
      assert.ok(moved > 0, 'Next arrow moves cards');
      await page.mouse.move(0, 0);
      await page.waitForTimeout(10000);
      assert.equal((await state()).index, moved, 'Must not restart autoplay after interaction');
      await page.locator('.sub-inda-process__nav-prev').click();
      await page.waitForTimeout(800);
      assert.equal((await state()).index, 0);
      const bullets = page.locator('.sub-inda-process__bullet');
      assert.ok(await bullets.count() > 1);
      await bullets.last().click();
      await page.waitForTimeout(800);
      assert.ok((await state()).index > 0, 'Pagination moves cards');
      await bullets.first().click();
      await page.waitForTimeout(800);
      assert.equal((await state()).index, 0);
      assert.equal((await state()).running, false);
      await page.locator('.sub-inda-process').screenshot({ path: `artifacts/inda-manual-${width}.png` });
      console.log(JSON.stringify({ width, staged, ...await state(), arrows: 'passed', pagination: 'passed', idleBeforeAndAfterInteraction: 'passed' }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
