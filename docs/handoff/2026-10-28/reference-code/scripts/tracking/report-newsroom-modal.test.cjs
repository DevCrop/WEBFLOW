const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(__dirname + '/report-newsroom-modal.js', 'utf8');
function run(options = {}) {
  let listener, opened = 0, prevented = false;
  const location = { origin: 'https://www.intellectualdata.com', hostname: 'www.intellectualdata.com', pathname: '/newsroom/2026-korean-companies-ediscovery-survey-report', href: 'https://www.intellectualdata.com/newsroom/2026-korean-companies-ediscovery-survey-report', ...options.location };
  const dialog = { open: false, showModal() { if (options.fail) throw Error('Unavailable'); opened++; this.open = true; } };
  const link = { href: location.origin + (options.link || '/ediscovery-survey-2026'), target: options.target || '', closest: () => options.outside ? null : {}, hasAttribute: () => false };
  const document = { addEventListener: (_, fn, capture) => { assert.equal(capture, true); listener = fn; }, querySelector: selector => selector.startsWith('dialog') ? (options.noDialog ? null : dialog) : { textContent: options.title || '' } };
  vm.runInNewContext(source, { document, location, URL });
  listener({ button: 0, target: { closest: () => link }, preventDefault() { prevented = true; }, stopImmediatePropagation() {}, ...options.event });
  return { opened, prevented };
}
assert.deepEqual(run(), { opened: 1, prevented: true });
assert.deepEqual(run({ location: { pathname: '/en/newsroom/2026-korean-companies-ediscovery-survey-report' }, link: '/en/ediscovery-survey-2026' }), { opened: 1, prevented: true });
for (const options of [{ location: { pathname: '/newsroom/other' } }, { event: { ctrlKey: true } }, { event: { button: 1 } }, { target: '_blank' }, { outside: true }, { link: '/page/Contact_Us' }, { link: '/ediscovery-survey-2026?x=1' }, { noDialog: true }, { fail: true }]) {
  assert.deepEqual(run(options), { opened: 0, prevented: false });
}
assert.deepEqual(run({ location: { hostname: 'intellectualdata.canvas.webflow.com', pathname: '/' }, title: '인텔렉추얼데이터, ‘2026 한국 기업의 해외 소송 eDiscovery 실태조사 리포트’ 발간' }), { opened: 1, prevented: true });
assert.deepEqual(run({ location: { hostname: 'intellectualdata.canvas.webflow.com', pathname: '/' }, title: '다른 뉴스룸 기사' }), { opened: 0, prevented: false });
console.log('PASS: KR/EN report-only modal, modifier/new-tab preservation, native fallback, preview article guard.');
