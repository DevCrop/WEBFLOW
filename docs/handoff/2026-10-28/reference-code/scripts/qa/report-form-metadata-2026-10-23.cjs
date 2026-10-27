const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('docs/webflow/report-form-metadata-2026-10-23.js', 'utf8');
const cases = [];
function setup({ lang = 'ko', pathname = '/newsroom/report', modal = true, name = '2026 eDiscovery Survey Report Request', readyState = 'complete', preexisting = false } = {}) {
  const handlers = {}, forms = [], calls = { create: 0 };
  const form = {
    tagName: 'FORM', inputs: [], qualifies: modal ? 'modal' : 'page',
    matches: () => true,
    getAttribute: key => key === 'data-name' ? name : null,
    querySelector: query => form.inputs.find(input => query === 'input[name="' + input.name + '"]') || null,
    appendChild: input => form.inputs.push(input)
  };
  const document = {
    documentElement: { lang }, readyState,
    createElement(tag) {
      assert.equal(tag, 'input'); calls.create++;
      return { attributes: {}, setAttribute(key, value) { this.attributes[key] = value; } };
    },
    querySelectorAll: () => forms,
    addEventListener(type, handler, options) {
      (handlers[type] ||= []).push({ handler, options });
    }
  };
  const window = { addEventListener: document.addEventListener };
  if (preexisting) form.inputs.push({name:'Language',type:'hidden',setAttribute(key,value){this[key]=value;}});
  forms.push(form);
  const context = vm.createContext({ document, window, location: { origin: 'https://www.intellectualdata.com', pathname, search: '?email=private', hash: '#fragment' } });
  vm.runInContext(source, context);
  return { form, forms, handlers, calls, context, document, window };
}
function collect(form) {
  // Same name precedence used by Webflow's input collector; no real submission.
  return Object.fromEntries(form.inputs.map(input => [input.attributes?.['data-name'] || input['data-name'] || input.name, input.value]));
}
for (const entry of [
  {lang:'ko',pathname:'/newsroom/report',modal:true,expected:'KO'},
  {lang:'en',pathname:'/en/newsroom/report',modal:true,expected:'EN'},
  {lang:'ko',pathname:'/ediscovery-survey-2026',modal:false,expected:'KO'},
  {lang:'en',pathname:'/en/ediscovery-survey-2026',modal:false,expected:'EN'},
  {lang:'en',pathname:'/',modal:true,expected:'EN'},
  {lang:'ko',pathname:'/en/newsroom/report',modal:true,expected:'EN'}
]) {
  const env = setup(entry);
  assert.equal(collect(env.form)['접수 언어'], entry.expected);
  assert.equal(collect(env.form)['접수 페이지 URL'], 'https://www.intellectualdata.com' + entry.pathname);
  assert.equal(env.form.inputs.length, 2);
  assert(env.form.inputs.every(input => input.type === 'hidden'));
  assert.equal(env.handlers.submit[0].options, true);
  cases.push('locale and route: ' + entry.pathname + ' / ' + entry.lang);
}
{
  const env = setup();
  env.form.inputs.forEach(input => { input.value = ''; });
  env.handlers.submit[0].handler({target:env.form});
  assert.equal(collect(env.form)['접수 언어'], 'KO');
  assert.equal(env.form.inputs.length, 2);
  vm.runInContext(source, env.context);
  assert.equal(env.handlers.submit.length, 1);
  cases.push('reset refresh, duplicate fields and duplicate listeners prevented');
}
{
  const env = setup({preexisting:true});
  assert.equal(env.form.inputs.length, 2);
  assert.equal(collect(env.form)['접수 언어'], 'KO');
  cases.push('existing language field reused');
}
{
  const env = setup({name:'Contact Form'});
  assert.equal(env.form.inputs.length, 0);
  cases.push('unrelated form unchanged');
}
{
  const env = setup({readyState:'loading'});
  assert.equal(env.form.inputs.length, 0);
  env.handlers.DOMContentLoaded[0].handler();
  assert.equal(env.form.inputs.length, 2);
  cases.push('DOMContentLoaded initialization');
}
{
  const env = setup();
  const lateForm = {...env.form, inputs:[]};
  lateForm.querySelector = query => lateForm.inputs.find(input => query === 'input[name="' + input.name + '"]') || null;
  lateForm.appendChild = input => lateForm.inputs.push(input);
  env.handlers.submit[0].handler({target:lateForm});
  assert.equal(collect(lateForm)['접수 언어'], 'KO');
  assert.equal(lateForm.inputs.length, 2);
  cases.push('late-mounted form enriched before serialization');
}
assert(!source.includes('fetch('));
assert(!source.includes('dataLayer'));
console.log(JSON.stringify({passed:true,count:cases.length,cases,limitations:'Local DOM harness only; no Webflow submission or email delivery tested.'},null,2));

