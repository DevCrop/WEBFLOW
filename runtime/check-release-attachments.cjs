const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const file = 'https://cdn.prod.website-files.com/6a48b49d97c21429fe3b1a91/6a58758d400db5417ba628b2_6a5130c23d7a057c11883805_Lito_DT_RGB.pdf';
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ acceptDownloads: true });
    await page.goto('https://intellectualdata.webflow.io/release-notes', { waitUntil: 'domcontentloaded' });
    await page.addStyleTag({ content: '[data-release-file-source],[data-release-attachment]:not([data-has-attachment="true"]),.sub-release-detail__attachment[hidden]{display:none!important}' });
    await page.addScriptTag({ path: 'runtime/release-attachments.js' });
    assert.equal(await page.locator('[data-release-attachment]:visible').count(), 0);
    await page.evaluate(file => {
      const source = document.createElement('a');
      source.dataset.releaseFileSource = '';
      source.href = file;
      source.hidden = true;
      document.querySelector('.sub-release-board__item').appendChild(source);
    }, file);
    await page.waitForTimeout(100);
    assert.equal(await page.locator('[data-release-attachment]:visible').count(), 1);
    await page.evaluate(() => document.querySelector('[data-release-file-source]').setAttribute('href', '#'));
    await page.waitForTimeout(100);
    assert.equal(await page.locator('[data-release-attachment]:visible').count(), 0);
    console.log('List: absent/attached/removed URL conditions passed on real list DOM');
    // Isolated template fixture: no published release currently has an attachment.
    await page.setContent(`<aside class="sub-release-detail__attachment"><a data-cms-download href="${file}">Download</a></aside><aside class="sub-release-detail__attachment"><a data-cms-download href="#">Empty</a></aside>`);
    await page.addScriptTag({ path: 'runtime/release-attachments.js' });
    assert.equal(await page.locator('.sub-release-detail__attachment:visible').count(), 1);
    const downloadEvent = page.waitForEvent('download', { timeout: 30000 });
    await page.locator('[data-cms-download]').first().click();
    const download = await downloadEvent;
    assert.equal(await download.failure(), null);
    const bytes = fs.readFileSync(await download.path());
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
    console.log(`Real CDN download passed: ${download.suggestedFilename()}, ${bytes.length} bytes`);
    await page.route('**/attachment-test-missing.pdf', route => route.fulfill({ status: 404, body: 'Missing' }));
    await page.locator('[data-cms-download]').first().evaluate(e => e.href = '/attachment-test-missing.pdf');
    await page.locator('[data-cms-download]').first().click();
    await page.waitForFunction(() => !document.querySelector('[role="status"]').hidden);
    assert.equal(await page.locator('[data-cms-download]').first().getAttribute('aria-busy'), null);
    console.log('404: visible failure message and retry state passed');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
