const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const js = fs.readFileSync('runtime/youtube-lifecycle.js', 'utf8');
const css = fs.readFileSync('runtime/youtube-lifecycle.css', 'utf8');
const slugs = ['Reveal', 'Relativity', 'Nymi_Band', 'Kiteworks', 'Luminance', 'Docusign'];
async function preview(page, slug) {
  await page.route(`https://intellectualdata.webflow.io/page/${slug}`, async route => {
    const response = await route.fetch();
    let html = await response.text();
    let count = 0;
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, block => {
      if (!block.includes('var playerByFrame = new WeakMap()') && !block.includes('window.__ID_YOUTUBE_LIFECYCLE__')) return block;
      count++;
      return '<script>' + js + '</script>';
    });
    assert.equal(count, 1, 'Existing video controller must be replaced once');
    html = html.replace('</head>', '<style>' + css + '</style></head>');
    await route.fulfill({ response, body: html });
  });
  await page.goto(`https://intellectualdata.webflow.io/page/${slug}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-youtube-surface]');
}
(async () => {
  const browser = await chromium.launch();
  fs.mkdirSync('artifacts/youtube-lifecycle', { recursive: true });
  try {
    for (const width of [1440, 390]) {
      for (const slug of slugs) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        await preview(page, slug);
        const result = await page.locator('[data-youtube-surface]').evaluateAll(els => els.map(e => ({
          view: e.dataset.youtubeView, width: e.clientWidth, height: e.clientHeight,
          posters: e.querySelectorAll('.youtube-poster').length,
          external: e.nextElementSibling.matches('.youtube-external'),
          controls: e.querySelector('iframe').getAttribute('allowfullscreen') !== null
        })));
        assert.equal(result.length, slug === 'Docusign' ? 3 : 1);
        assert(result.every(e => e.posters === 1 && e.external && e.controls && e.view === 'poster'));
        assert(result.filter(e => e.width).every(e => Math.abs(e.height - e.width * 9 / 16) < 2 && e.width <= width));
        const surface = page.locator('[data-youtube-surface]').first();
        await surface.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await page.waitForTimeout(600);
        await surface.locator('img').evaluate(img => img.decode());
        const centered = await surface.evaluate(e => {
          const r = e.getBoundingClientRect(), p = e.querySelector('.youtube-poster-play').getBoundingClientRect();
          return Math.abs(r.left + r.width / 2 - p.left - p.width / 2) < 2 && Math.abs(r.top + r.height / 2 - p.top - p.height / 2) < 2 && p.width >= 40;
        });
        assert(centered, 'Play button must be visible and centered');
        if (slug === 'Docusign' || slug === 'Reveal') {
          await page.addStyleTag({ content: '.header,[data-cookie-banner]{visibility:hidden!important}' });
          await surface.screenshot({ path: `artifacts/youtube-lifecycle/${slug}-${width}-preview.png` });
        }
        console.log(JSON.stringify({ width, slug, surfaces: result.length, dimensions: result.map(e => [e.width, e.height]) }));
        await page.close();
      }
    }
    const real = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await preview(real, 'Docusign');
    const reject = real.locator('[data-cookie-banner] [data-cookie-action="reject"]');
    if (await reject.isVisible()) await reject.click();
    await real.locator('[data-youtube-surface]').first().evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
    try {
      await real.waitForSelector('[data-youtube-api="ready"]', { timeout: 15000 });
      await real.locator('.youtube-poster').first().click({ force: true });
      await real.waitForSelector('[data-youtube-state="1"]', { timeout: 15000 });
      await real.evaluate(() => window.dispatchEvent(new Event('pagehide')));
      await real.waitForSelector('[data-youtube-state="2"]', { timeout: 10000 });
      console.log('Actual YouTube: API ready, playback, pagehide pause passed');
    } catch (error) {
      console.log('Actual YouTube playback not verified: ' + error.message.split('\n')[0]);
      console.log(await real.locator('[data-youtube-surface]').evaluateAll(es => es.map(e => ({ api: e.dataset.youtubeApi, state: e.dataset.youtubeState }))));
    }
    await real.close();
    // Deterministic API contract tests, distinct from actual YouTube playback.
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.route('https://www.youtube.com/**', r => r.fulfill({ body: '', contentType: 'text/html' }));
    await page.addInitScript(() => {
      window.testPlayers = [];
      window.YT = { Player: function (frame, options) {
        const player = { pauses: 0, plays: 0, options, frame,
          pauseVideo() { this.pauses++; }, playVideo() { this.plays++; }, destroy() {} };
        window.testPlayers.push(player);
        setTimeout(() => options.events.onReady({ target: player }), 0);
        return player;
      } };
    });
    await preview(page, 'Docusign');
    await page.waitForFunction(() => window.testPlayers.length >= 1);
    const contract = await page.evaluate(async () => {
      const p = window.testPlayers[0];
      const wrap = p.frame.parentElement;
      wrap.querySelector('button').click();
      await new Promise(r => setTimeout(r, 20));
      const started = p.plays > 0 && wrap.dataset.youtubeView === 'player';
      p.options.events.onStateChange({ target: p, data: 0 });
      const ended = wrap.dataset.youtubeView === 'poster' && !wrap.querySelector('button').hidden;
      let hidden = true;
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden });
      const before = p.pauses;
      document.dispatchEvent(new Event('visibilitychange'));
      const paused = p.pauses > before;
      const plays = p.plays;
      hidden = false;
      document.dispatchEvent(new Event('visibilitychange'));
      const noResume = p.plays === plays;
      const externalBefore = p.pauses;
      const link = wrap.nextElementSibling;
      link.addEventListener('click', e => e.preventDefault(), { once: true });
      link.click();
      return { started, ended, paused, noResume, externalPauses: p.pauses > externalBefore };
    });
    assert(Object.values(contract).every(Boolean));
    console.log(JSON.stringify({ apiContract: contract }));
    const multiple = await page.evaluate(async () => {
      const p = window.testPlayers[0];
      const frame = document.createElement('iframe');
      frame.src = 'https://www.youtube.com/embed/ROOKpNDYSUY';
      const wrap = document.createElement('div');
      wrap.className = 'youtube-native-player';
      wrap.appendChild(frame);
      document.body.appendChild(wrap);
      await new Promise(r => setTimeout(r, 150));
      const second = window.testPlayers.find(x => x.frame === frame);
      if (!second) return { dynamic: false };
      const before = p.pauses;
      second.options.events.onStateChange({ target: second, data: 1 });
      const exclusive = p.pauses > before;
      const secondBefore = second.pauses;
      wrap.hidden = true;
      await new Promise(r => setTimeout(r, 100));
      const hiddenPauses = second.pauses > secondBefore;
      wrap.hidden = false;
      await new Promise(r => setTimeout(r, 100));
      const count = wrap.querySelectorAll('.youtube-poster').length;
      return { dynamic: true, exclusive, hiddenPauses, noDuplicate: count === 1 };
    });
    assert(Object.values(multiple).every(Boolean));
    console.log(JSON.stringify({ multiPlayer: multiple }));
    await page.close();
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
