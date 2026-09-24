const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/edn_y/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const before = JSON.parse(fs.readFileSync('artifacts/typography-audit-native.json', 'utf8'));
const changes = JSON.parse(fs.readFileSync('artifacts/typography-migration-verified.json', 'utf8'));
const eyebrow = fs.readFileSync('runtime/typography-eyebrow.css', 'utf8');
const compat = fs.readFileSync('runtime/typography-micro-compat.css', 'utf8');
const variableNames = new Map(before.typography.map(v => [v.id, v.cssName]));
const aliasCss = changes.fallbackPlans.map(p => {
  const properties = p.properties.map(v => `${v.property_name}:var(${variableNames.get(v.variable_as_value)})`).join(';');
  return `.${p.name}{${properties}}`;
}).join('\n');
const result = { mode: 'local staged simulation, not published validation', bannerModesNativeReadback: false, bannerModesDesignerVerified: true, pages: [], aliases: [], homeChain: [] };

async function stage(page) {
  // Simulate the requested native mode values without modifying Webflow or publishing.
  const cssHref = await page.locator('link[rel="stylesheet"]').evaluateAll(es => es.map(e => e.href).find(h => h.includes('webflow.shared')));
  const cssText = await (await page.request.get(cssHref)).text();
  const revised = await page.evaluate(cssText => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    const token = '--_typography---type--component--banner--title--font-size';
    const walk = (rules, width = Infinity) => {
      for (const rule of rules) {
        let nextWidth = width;
        const max = rule.conditionText?.match(/max-width:\s*(\d+)px/);
        if (max) nextWidth = Math.min(width, Number(max[1]));
        if (rule.style?.getPropertyValue(token)) rule.style.setProperty(token, (nextWidth <= 479 ? 28 : nextWidth <= 767 ? 32 : nextWidth <= 991 ? 40 : 48) + 'px');
        if (rule.cssRules) walk(rule.cssRules, nextWidth);
      }
    };
    walk(sheet.cssRules);
    return [...sheet.cssRules].map(r => r.cssText).join('\n');
  }, cssText);
  await page.locator('link[rel="stylesheet"]').evaluateAll((es, data) => es.filter(e => e.href === data.href).forEach(e => {
    const style = document.createElement('style');
    style.textContent = data.css;
    e.before(style);
    e.remove();
  }), { href: cssHref, css: revised });
  await page.addStyleTag({ content: aliasCss + '\n' + compat + '\n' + eyebrow + '\n.banner-inner{padding:var(--space--xl) var(--space--lg);gap:var(--space--2xl)}' });
}

async function main() {
  const b = await chromium.launch();
  try {
    const p = await b.newPage();
    for (const path of ['/', '/page/INDA_FullDiscovery', '/page/Data_Analytics', '/page/Kiteworks', '/page/SessionGuardian', '/LPO', '/page/About_Us', '/page/Docusign']) {
      await p.goto('https://intellectualdata.webflow.io' + path, { waitUntil:'domcontentloaded' });
      const baseline = {};
      for (const width of [1274, 991, 767, 390]) {
        await p.setViewportSize({ width, height:900 });
        baseline[width] = await p.evaluate(() => document.documentElement.scrollWidth);
      }
      await stage(p);
      for (const width of [1274, 991, 767, 390]) {
        await p.setViewportSize({ width, height:900 });
        const banners = await p.locator('.banner-title').evaluateAll(es => es.map(e => ({ text:e.textContent, size:parseFloat(getComputedStyle(e).fontSize), weight:getComputedStyle(e).fontWeight, overflow:e.scrollWidth>e.clientWidth+2 })));
        for (const v of banners) { assert.equal(v.size,width<=479?28:width<=767?32:width<=991?40:48); assert.equal(v.overflow,false); }
        const bannerSpacing = await p.locator('.banner-inner').evaluateAll(es => es.map(e => ({gap:parseFloat(getComputedStyle(e).rowGap),overflow:e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2})));
        for (const v of bannerSpacing) { assert.equal(v.gap,width<=479?32:width<=767?36:width<=991?40:48); assert.equal(v.overflow,false); }
        const strong = await p.locator('[class*="eyebrow"] strong,[class*="eyebrow"] b').evaluateAll(es => es.map(e => ({ own:getComputedStyle(e).fontWeight, parent:getComputedStyle(e.parentElement).fontWeight })));
        for (const v of strong) assert.equal(v.own,v.parent);
        const overflow = await p.evaluate(() => document.documentElement.scrollWidth>innerWidth+2);
        const scrollWidth = await p.evaluate(() => document.documentElement.scrollWidth);
        assert.ok(scrollWidth <= Math.max(width, baseline[width]) + 2, path+' '+width+' new overflow');
        result.pages.push({path,width,banners,bannerSpacing,strong,overflow,scrollWidth,baselineScrollWidth:baseline[width]});
        if (path==='/page/INDA_FullDiscovery' && [1274,390].includes(width)) {
          await p.locator('.banner-title').first().scrollIntoViewIfNeeded();
          await p.waitForTimeout(700);
          await p.locator('.banner').first().screenshot({path:`artifacts/typography-banner-${width}.png`});
        }
      }
    }
    await p.goto('https://intellectualdata.webflow.io/');
    await stage(p);
    for (const width of [1274,991,767,390]) {
      await p.setViewportSize({width,height:900});
      const rows=await p.evaluate(names=>names.map(c=>{const e=document.createElement('div');e.className=c;e.textContent='Sample';document.body.append(e);const r={name:c,size:parseFloat(getComputedStyle(e).fontSize)};e.remove();return r;}),changes.fallbackNames);
      const index=[1274,991,767,390].indexOf(width);
      for(const row of rows) assert.equal(row.size,row.name.includes('normal')?[38,34,28,26][index]:row.name.includes('title')?[26,24,22,20][index]:[17,17,16,16][index]);
      result.aliases.push({width,rows});
    }
    // Preflight a single-owner home title without writing its class chain yet.
    await p.addStyleTag({content:'.main-hero-title-scale{max-width:100%;white-space:normal;word-break:keep-all;overflow-wrap:break-word}'});
    for(const width of [1440,1274,991,767,390]) {
      await p.setViewportSize({width,height:900});
      const row=await p.locator('h1.main-hero-title-scale').evaluate(e=>{const read=()=>{const s=getComputedStyle(e);return {size:s.fontSize,family:s.fontFamily,weight:s.fontWeight,lineHeight:s.lineHeight,color:s.color,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}};const old=e.className;const before=read();e.className='main-hero-title-scale fm-en regular';const after=read();e.className=old;return {before,after};});
      result.homeChain.push({width,...row});
    }
    fs.writeFileSync('artifacts/typography-migration-test.json',JSON.stringify(result,null,2),'utf8');
    console.log(JSON.stringify({pages:result.pages.length,aliasWidths:result.aliases.length,homeChain:result.homeChain},null,2));
  } finally {await b.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
