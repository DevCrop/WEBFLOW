const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const output = path.resolve('artifacts/policy-cookie-audit');
fs.mkdirSync(output, { recursive: true });
const base = 'https://intellectualdata.webflow.io';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const report = { pages: [], cookies: [] };
  const state = page => page.evaluate(() => ({
    storage: Object.fromEntries(Object.keys(localStorage).filter(k => /consent|cookie/i.test(k)).map(k => [k, localStorage.getItem(k)])),
    bannerVisible: !!document.querySelector('[data-cookie-banner]')?.getClientRects().length && getComputedStyle(document.querySelector('[data-cookie-banner]')).visibility !== 'hidden',
    modalVisible: !document.querySelector('[data-cookie-modal]')?.hidden,
    toggles: Array.from(document.querySelectorAll('[data-cookie-toggle]')).map(e => ({ name: e.dataset.cookieToggle, checked: e.getAttribute('aria-checked') }))
  }));
  try {
    for (const width of [1440, 390]) {
      for (const [slug, name] of [['privacy-policy-cookie-policy', 'privacy'], ['terms-of-use', 'terms']]) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        await page.goto(`${base}/${slug}`, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.locator('[data-cookie-banner] [data-cookie-action="reject"]').click();
        await page.screenshot({ path: path.join(output, `${name}-${width}-full.png`), fullPage: true });
        const content = await page.locator('h1').evaluate(h => {
          const section = h.closest('section');
          const metrics = e => { const s = getComputedStyle(e); return { tag: e.tagName, text: e.textContent.trim(), fontSize: s.fontSize, fontWeight: s.fontWeight, borderTop: s.borderTopWidth, borderBottom: s.borderBottomWidth }; };
          return { text: section.innerText, headings: Array.from(section.querySelectorAll('h2')).map(metrics), paragraphs: Array.from(section.querySelectorAll('p')).map(metrics), dividers: Array.from(section.querySelectorAll('*')).filter(e => { const s = getComputedStyle(e); return e.tagName === 'HR' || parseFloat(s.borderTopWidth) > 0 || parseFloat(s.borderBottomWidth) > 0; }).map(e => ({ class: e.className, ...metrics(e) })), historyLinks: Array.from(section.querySelectorAll('a')).map(e => ({ text: e.textContent, href: e.getAttribute('href') })) };
        });
        report.pages.push({ name, width, ...content });
        await page.close();
      }
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(`${base}/privacy-policy-cookie-policy`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(output, `cookie-banner-${width}.png`) });
      const closePosition = await page.locator('[data-cookie-banner]').evaluate(e => { const b = e.getBoundingClientRect(), c = e.querySelector('button').getBoundingClientRect(); return { topInset: c.top - b.top, rightInset: b.right - c.right }; });
      await page.locator('[data-cookie-banner] [data-cookie-action="settings"]').click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(output, `cookie-settings-${width}.png`) });
      const open = await state(page);
      const buttons = await page.locator('[data-cookie-modal] .cookie-modal__actions a').evaluateAll(es => es.map(e => { const r = e.getBoundingClientRect(); const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { text: e.textContent, visibleInViewport: r.top >= 0 && r.bottom <= innerHeight, unobstructed: !!hit && e.contains(hit) }; }));
      await page.locator('[data-cookie-toggle="analytics"]').click();
      await page.locator('[data-cookie-modal] [data-cookie-action="save"]').click();
      const saved = await state(page);
      await page.reload({ waitUntil: 'networkidle' });
      const afterReload = await state(page);
      await page.locator('[data-cookie-action="settings"]').first().click();
      await page.locator('[data-cookie-modal] [data-cookie-action="reject"]').click();
      const rejected = await state(page);
      report.cookies.push({ width, closePosition, open, buttons, saved, afterReload, rejected });
      await page.close();
      for (const action of ['accept-all', 'reject']) {
        const p = await browser.newPage({ viewport: { width, height: 900 } });
        await p.goto(base, { waitUntil: 'networkidle' });
        await p.locator(`[data-cookie-banner] [data-cookie-action="${action}"]`).click();
        report.cookies.push({ width, bannerAction: action, result: await state(p) });
        await p.close();
      }
    }
  } finally {
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2), 'utf8');
    console.log(JSON.stringify({ pages: report.pages.map(p => ({ name: p.name, width: p.width, headings: p.headings, bodySize: p.paragraphs[0]?.fontSize, dividers: p.dividers.map(d => ({ class: d.class, top: d.borderTop, bottom: d.borderBottom })), historyLinks: p.historyLinks })), cookies: report.cookies }));
    await browser.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
