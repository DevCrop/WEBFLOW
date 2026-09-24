const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const data = JSON.parse(fs.readFileSync('artifacts/release-download-cms-test.json', 'utf8'));

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ acceptDownloads: true });
    await page.goto('https://intellectualdata.webflow.io/release-notes', { waitUntil: 'domcontentloaded' });
    // Unpublished CMS items are tested with their saved URLs and the saved controller.
    for (const [index, item] of data.items.entries()) {
      const width = index ? 390 : 1440;
      await page.setViewportSize({ width, height: 900 });
      await page.setContent(`<aside class="sub-release-detail__attachment"><a data-cms-download href="${item.fieldData.attachment.url}">Download</a></aside>${data.controller}`);
      const event = page.waitForEvent('download', { timeout: 30000 });
      await page.locator('[data-cms-download]').click();
      const download = await event;
      assert.equal(await download.failure(), null);
      const bytes = fs.readFileSync(await download.path());
      assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
      console.log(JSON.stringify({ item: item.id, width, filename: download.suggestedFilename(), bytes: bytes.length, result: 'passed' }));
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
