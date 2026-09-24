const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto('https://intellectualdata.webflow.io/release-notes');
    const href = await page.locator('a[href*="/release-notes/"]').first().getAttribute('href');
    await page.goto(new URL(href, page.url()).href);
    const source = await page.locator('.sub-release-detail__actions .button').evaluate(e => e.outerHTML);
    await page.goto('https://intellectualdata.webflow.io/careers-jobs/career-data-engineer');
    // Preview the existing shared release button with the saved careers destination.
    await page.locator('.sub-careers-detail__actions').evaluate((e, html) => {
      e.innerHTML = html;
      e.querySelector('a').setAttribute('href', '/board/Careers');
    }, source);
    await page.addStyleTag({ content: fs.readFileSync('runtime/cms-rich-text.css', 'utf8') + '\n.sub-careers-detail__actions{display:flex;width:100%;justify-content:center;align-items:center;margin-top:var(--space--2xl);padding-top:0}' });
    const rows = [];
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      const button = page.locator('.sub-careers-detail__actions .button');
      await button.scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      await page.waitForTimeout(400);
      const read = () => button.evaluate(e => {
        const s = getComputedStyle(e), r = e.getBoundingClientRect(), p = e.parentElement.getBoundingClientRect();
        return { color: s.color, border: s.borderTopColor, background: s.backgroundColor, href: e.getAttribute('href'), centered: Math.abs(r.x + r.width / 2 - p.x - p.width / 2) < 1, width: r.width, icon: !!e.querySelector('.button-icon') };
      });
      const normal = await read();
      assert.equal(normal.color, 'rgb(0, 0, 0)');
      assert.equal(normal.border, 'rgb(0, 0, 0)');
      assert.equal(normal.centered, true);
      assert.equal(normal.icon, true);
      assert.ok(normal.width <= width);
      await button.hover({ force: true });
      await page.waitForTimeout(400);
      const hover = await read();
      assert.equal(hover.color, 'rgb(255, 255, 255)');
      assert.equal(hover.background, 'rgb(0, 0, 0)');
      rows.push({ width, normal, hover });
    }
    const response = await page.request.get('https://intellectualdata.webflow.io/board/Careers');
    assert.equal(response.status(), 200);
    console.log(JSON.stringify({ mode: 'staged preview, not published', rows, destinationStatus: response.status() }));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
