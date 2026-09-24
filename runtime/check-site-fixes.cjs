const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const routes = fs.readFileSync('runtime/site-link-routing.js', 'utf8');
const lpoCSS = fs.readFileSync('runtime/lpo-service-surface.css', 'utf8');
const cms = JSON.parse(fs.readFileSync('artifacts/gallery-route-test-data.json', 'utf8'));
const origin = 'https://intellectualdata.webflow.io';
const result = { staged: true, galleries: [], languages: [], lpo: [], release: [] };
let ctaMarkup = '';
async function stage(page, path) {
  await page.goto(origin + path, { waitUntil: 'domcontentloaded' });
  if (path === '/page/K_Discovery') ctaMarkup = await page.locator('.sub-visual__actions').evaluate(e => e.outerHTML);
  await page.evaluate(({ cms, ctaMarkup }) => {
    // Simulate the saved native CMS slug binding before publication.
    const collection = location.pathname.includes('About_Us') ? 'newsroom' : 'insights';
    document.querySelectorAll('a.sub-gallery__slide').forEach(a => {
      const title = a.querySelector('.sub-gallery__headline')?.textContent.trim();
      const matches = cms[collection].filter(x => x.name.trim() === title);
      if (matches.length !== 1) throw Error('Ambiguous CMS title: ' + title);
      a.dataset.galleryCollection = collection;
      a.dataset.gallerySlug = matches[0].slug;
    });
    document.querySelectorAll('.header__lang-link').forEach(a => { a.dataset.siteLocale = a.textContent.trim() === 'English' ? 'en' : 'ko'; });
    if (location.pathname === '/release-notes') {
      // Webflow omits false-visibility props entirely from published HTML.
      // Reuse the same public component markup to preview the now-enabled prop.
      let actions = document.querySelector('.sub-visual__actions');
      if (!actions) {
        if (!ctaMarkup) throw Error('CTA reference missing');
        const template = document.createElement('template'); template.innerHTML = ctaMarkup;
        actions = template.content.firstElementChild;
        document.querySelector('.sub-visual__title-box').insertAdjacentElement('afterend', actions);
      }
      actions.classList.remove('w-condition-invisible'); actions.hidden = false;
      actions.querySelectorAll('.w-condition-invisible').forEach(e => e.classList.remove('w-condition-invisible'));
      const a = actions.querySelector('a'); a.href = '/page/Contact_Us';
      a.querySelector('.cta-button__label,.button-label').textContent = '전문가 자문 받기';
    }
  }, { cms, ctaMarkup });
  await page.addScriptTag({ content: routes });
  const reject = page.locator('[data-cookie-banner] [data-cookie-action="reject"]');
  if (await reject.isVisible()) await reject.click();
}
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    for (const path of ['/page/K_Discovery', '/page/Data_Analytics', '/page/About_Us']) {
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await stage(page, path);
        const links = await page.locator('a.sub-gallery__slide').evaluateAll(es => es.map(a => a.href));
        assert.equal(links.length, 6); assert.equal(new Set(links).size, 6);
        const statuses = [];
        for (const url of links) { const r = await page.request.get(url); statuses.push(r.status()); assert.equal(r.status(), 200, url); }
        const expected = links[0];
        await page.locator('a.sub-gallery__slide').first().click();
        await page.waitForURL(expected);
        result.galleries.push({ path, width, links, statuses, actualClick: page.url() });
      }
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      for (const [path, lang, expected] of [['/page/About_Us','en','/en/page/About_Us'], ['/en/page/About_Us','ko','/page/About_Us']]) {
        await stage(page, path);
        await page.locator('.header__lang-toggle').click();
        const link = page.locator('[data-site-locale="' + lang + '"]');
        assert.equal(new URL(await link.getAttribute('href'), origin).pathname, expected);
        await link.click(); await page.waitForURL(origin + expected);
        result.languages.push({ width, path, target: page.url(), passed: true });
      }
      await stage(page, '/release-notes');
      const button = page.locator('.sub-visual__actions a').first();
      assert.equal((await button.textContent()).trim(), '전문가 자문 받기');
      await button.click(); await page.waitForURL(origin + '/page/Contact_Us');
      result.release.push({ width, target: page.url(), passed: true });
    }
    for (const width of [1440, 991, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await stage(page, '/LPO'); await page.addStyleTag({ content: lpoCSS });
      await page.evaluate(() => document.fonts.ready);
      const cards = await page.locator('.lpo-service-card').evaluateAll(es => es.map(e => {
        const s = getComputedStyle(e), r = e.getBoundingClientRect();
        const reference = document.createElement('div'); reference.className = 'icon-card'; e.parentElement.append(reference);
        const rs = getComputedStyle(reference), samePadding = s.paddingLeft === rs.paddingLeft && s.paddingTop === rs.paddingTop; reference.remove();
        return { background: s.backgroundColor, padding: [s.paddingTop,s.paddingRight,s.paddingBottom,s.paddingLeft], samePadding, vertical: s.flexDirection === 'column', overflow: r.right > innerWidth + 1 || e.scrollWidth > e.clientWidth + 1 };
      }));
      assert(cards.length); assert(cards.every(c => c.samePadding && c.vertical && !c.overflow && c.background !== 'rgba(0, 0, 0, 0)'));
      result.lpo.push({ width, cards });
      await page.locator('.lpo-service-card').first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(2000);
      await page.addStyleTag({ content: '.header,.floating-button,[data-cookie-banner]{visibility:hidden!important}' });
      await page.locator('.lpo-service-card').first().screenshot({ path: 'artifacts/lpo-surface-' + width + '.png' });
    }
  } finally {
    fs.writeFileSync('artifacts/site-fixes-validation.json', JSON.stringify(result, null, 2));
    await browser.close();
  }
  console.log(JSON.stringify({ galleries: result.galleries.length, languages: result.languages.length, release: result.release.length, lpo: result.lpo.length, passed: true }));
})().catch(e => { console.error(e); process.exitCode = 1; });
