const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto('https://intellectualdata.webflow.io/page/Docusign', { waitUntil: 'domcontentloaded' });
    const read = () => page.evaluate(() => {
      const names = ['#top.header','.header__surface','.header__container','.header__menu-list.w--open'];
      return names.map(s => { const e = document.querySelector(s); if (!e) return { selector:s, missing:true }; const c=getComputedStyle(e),r=e.getBoundingClientRect(); return { selector:s, class:e.className, style:e.getAttribute('style'), top:r.top, bottom:r.bottom, height:r.height, display:c.display, position:c.position, background:c.backgroundColor, contentHeight:c.getPropertyValue('--header-content-height'), announcement:c.getPropertyValue('--announcement-height') }; });
    });
    console.log('closed',JSON.stringify(await read()));
    console.log('toggles',await page.locator('.header .w-dropdown-toggle').allTextContents());
    await page.locator('.header .w-dropdown-toggle').filter({ hasText:'Solutions' }).first().hover();
    await page.waitForTimeout(1000);
    console.log('opened',JSON.stringify(await read()));
    await page.screenshot({ path:'artifacts/header-solutions-before.png' });
    const scripts = await page.locator('script').evaluateAll(es => es.map(e => ({src:e.src,code:e.textContent})).filter(e=> /header-content-height|has-open-menu|header__surface/.test(e.code)||e.src));
    fs.writeFileSync('artifacts/header-runtime-inspection.json',JSON.stringify(scripts,null,2));
    console.log('scripts',JSON.stringify(scripts.map(x=>({src:x.src,size:x.code.length,matches:x.code.match(/.{0,120}(?:header-content-height|has-open-menu|header__surface).{0,160}/g)}))));
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
