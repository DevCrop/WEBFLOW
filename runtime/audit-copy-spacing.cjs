const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = 'https://intellectualdata.webflow.io';
const prior = JSON.parse(fs.readFileSync('artifacts/site-link-audit.json', 'utf8'));
const metadata = JSON.parse(fs.readFileSync('artifacts/link-audit-pages.json', 'utf8'));
const queue = [...new Set([...prior.pages.map(p => p.path), ...metadata.filter(p => !p.collectionId && !p.draft && !p.archived).flatMap(p => [p.publishedPath, '/en' + p.publishedPath])])];
const out = 'artifacts/copy-spacing-audit.json';
const rows = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')).pages : [];
const seen = new Set(rows.map(p => p.path));
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.route(/\.(?:mp4|webm|woff2?|png|jpe?g|webp)(?:\?|$)/i, route => route.abort());
    while (queue.length && seen.size < 600) {
      const path = queue.shift();
      if (!path || seen.has(path)) continue;
      seen.add(path);
      const row = { path };
      try {
        const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 18000 });
        row.status = response.status();
        row.finalUrl = page.url();
        if (row.status === 200) {
          await page.waitForTimeout(150);
          Object.assign(row, await page.evaluate(() => {
            const nodes = new Set();
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
              const n = walker.currentNode, p = n.parentElement;
              if (!n.textContent.trim() || !p || p.closest('script,style,noscript,svg')) continue;
              const e = p.closest('h1,h2,h3,h4,h5,h6,p,li,button,a,label,figcaption') || p;
              nodes.add(e);
            }
            const blocks = [...nodes].map(e => ({
              text: e.innerText?.trim(),
              tag: e.tagName,
              classes: typeof e.className === 'string' ? e.className : '',
              section: e.closest('section')?.className || e.closest('header,footer')?.tagName || '',
              breaks: e.querySelectorAll('br').length,
              visible: !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length),
            })).filter(x => x.text && x.text.length > 1);
            return { title: document.title, blocks, links: [...document.querySelectorAll('a[href]')].map(e => e.href) };
          }));
          for (const href of row.links) {
            try {
              const u = new URL(href);
              if (u.origin === origin && !/\.[a-z0-9]{2,5}$/i.test(u.pathname) && !seen.has(u.pathname) && !queue.includes(u.pathname)) queue.push(u.pathname);
            } catch {}
          }
          delete row.links;
        }
      } catch (e) { row.error = e.message.split('\n')[0]; }
      rows.push(row);
      const json = JSON.stringify({ scope: 'published Korean and English paths, discovered links; no content edits', pages: rows, remaining: queue.filter(p => !seen.has(p)) }, null, 2);
      for (let attempt = 0; ; attempt++) {
        try { fs.writeFileSync(out, json); break; }
        catch (e) { if (attempt >= 5) throw e; await new Promise(resolve => setTimeout(resolve, 300)); }
      }
      if (rows.length % 10 === 0) console.log(JSON.stringify({ checked: rows.length, remaining: queue.length, path }));
    }
    console.log(JSON.stringify({ checked: rows.length, remaining: queue.length }));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
