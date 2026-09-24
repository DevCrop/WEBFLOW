const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const origin = 'https://intellectualdata.webflow.io';
const metadata = JSON.parse(fs.readFileSync('artifacts/link-audit-pages.json', 'utf8'));
const queue = metadata.filter(p => !p.collectionId && !p.draft && !p.archived).flatMap(p => [p.publishedPath, '/en' + p.publishedPath]);
const prior = fs.existsSync('artifacts/site-link-audit.json') ? JSON.parse(fs.readFileSync('artifacts/site-link-audit.json', 'utf8')) : { pages: [], externalLinks: [] };
const seen = new Set(prior.pages.map(p => p.path));
const results = prior.pages;
const externals = new Map(prior.externalLinks.map(x => [x.url, x]));
for (const p of results) for (const link of p.links || []) {
  try {
    const url = new URL(link.href, origin + p.path);
    if (link.href && url.origin === origin && !/\.(?:pdf|png|jpe?g|svg|webp|gif|zip|mp4|xlsx?|docx?)$/i.test(url.pathname) && !seen.has(url.pathname)) queue.push(url.pathname);
  } catch (_) {}
}
const internalTargets = new Set(queue);
function save() {
  const json = JSON.stringify({ pages: results, externalLinks: [...externals.values()] }, null, 2);
  for (let attempt = 0; attempt < 6; attempt++) {
    try { fs.writeFileSync('artifacts/site-link-audit.json', json); return; }
    catch (e) { if (attempt === 5) throw e; Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 200); }
  }
}
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    while (queue.length && seen.size < 500) {
      const path = queue.shift();
      if (seen.has(path)) continue;
      seen.add(path);
      const row = { path };
      try {
        const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 20000 });
        row.status = response.status(); row.finalUrl = page.url();
        if ((response.headers()['content-type'] || '').includes('text/html') && row.status === 200) {
          row.links = await page.locator('a, button, [role="button"]').evaluateAll(elements => elements.map(e => {
            const href = e.getAttribute('href');
            const rect = e.getBoundingClientRect();
            let targetExists = null;
            if (href && href.startsWith('#') && href.length > 1) {
              try { targetExists = !!document.getElementById(decodeURIComponent(href.slice(1))); } catch (_) { targetExists = false; }
            }
            return { tag: e.tagName, text: (e.innerText || e.textContent || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0,160), href, classes: String(e.className), visible: rect.width > 0 && rect.height > 0 && getComputedStyle(e).visibility !== 'hidden', targetExists, attributes: Object.fromEntries([...e.attributes].filter(a => /^(data-|aria-|type|role|target)/.test(a.name)).map(a => [a.name,a.value])), parent: e.parentElement?.className, section: e.closest('section')?.className };
          }));
          for (const link of row.links) {
            if (!link.href || !/^https?:|^\/|^[^:#?]+(?:\/|$)/i.test(link.href)) continue;
            let url; try { url = new URL(link.href, page.url()); } catch (_) { continue; }
            if (!/^https?:$/.test(url.protocol)) continue;
            if (url.origin !== origin) {
              if (!externals.has(url.href)) externals.set(url.href, { url: url.href, from: path, text: link.text });
            } else if (!/\.(?:pdf|png|jpe?g|svg|webp|gif|zip|mp4|xlsx?|docx?)$/i.test(url.pathname)) {
              internalTargets.add(url.pathname);
              if (!seen.has(url.pathname) && !queue.includes(url.pathname)) queue.push(url.pathname);
            }
          }
        }
      } catch (e) { row.error = e.message; }
      results.push(row); save();
      console.log(JSON.stringify({ path, status: row.status, links: row.links?.length, error: row.error }));
    }
    for (const entry of externals.values()) {
      if (entry.status || entry.error) continue;
      try {
        const response = await page.request.get(entry.url, { timeout: 12000, failOnStatusCode: false });
        entry.status = response.status(); entry.finalUrl = response.url();
        await response.dispose();
      } catch (e) { entry.error = e.message.split('\n')[0]; }
      save();
      console.log(JSON.stringify({ external: entry.url, status: entry.status, error: entry.error }));
    }
    console.log(JSON.stringify({ pages: results.length, uniqueInternalTargets: internalTargets.size, remaining: queue.length, externals: externals.size }));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
