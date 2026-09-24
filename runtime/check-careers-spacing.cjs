const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto('https://intellectualdata.webflow.io/careers-jobs/career-data-engineer', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.cms-detail__body').count(), 1);
    await page.addStyleTag({ content: fs.readFileSync('runtime/cms-rich-text.css', 'utf8') });
    // Stage the saved native changes, which are not published yet.
    await page.addStyleTag({ content: '.sub-careers-detail__inner{row-gap:var(--space--xl)!important}.sub-careers-detail__head{padding-bottom:var(--space--lg)!important;row-gap:var(--space--sm)!important}' });
    const rows = [];
    for (const width of [1440, 991, 767, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      const result = await page.evaluate(() => {
        const head = document.querySelector('.sub-careers-detail__head');
        const body = document.querySelector('.cms-detail__body');
        const content = document.querySelector('.cms-detail__content');
        const h2 = body.querySelector('h2');
        return {
          width: innerWidth,
          gap: content.getBoundingClientRect().top - head.getBoundingClientRect().bottom,
          headPadding: getComputedStyle(head).paddingBottom,
          contentPadding: getComputedStyle(content).paddingTop,
          headingSize: getComputedStyle(h2).fontSize,
          bodySize: getComputedStyle(body).fontSize,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      assert.ok(Math.abs(result.gap - 32) < 1, JSON.stringify(result));
      assert.equal(result.contentPadding, '0px');
      assert.equal(result.headPadding, '24px');
      assert.equal(result.overflow, false);
      assert.ok(parseFloat(result.headingSize) > parseFloat(result.bodySize));
      rows.push(result);
      await page.locator('.sub-careers-detail__head').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `artifacts/careers-spacing-${width}.png` });
    }
    fs.writeFileSync('artifacts/careers-spacing-check.json', JSON.stringify({ mode: 'local staged preview; not published or Designer verification', rows }, null, 2));
    console.log(JSON.stringify(rows));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
