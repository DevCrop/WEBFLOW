const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, 'report-modal-native.js'), 'utf8');
function style(initial = {}) {
  const values = new Map(Object.entries(initial).map(([k,v]) => [k,[v,'']]));
  return { getPropertyValue:k=>values.get(k)?.[0] || '', getPropertyPriority:k=>values.get(k)?.[1] || '',
    setProperty:(k,v,p='')=>values.set(k,[v,p]), removeProperty:k=>values.delete(k) };
}
function fixture(native = true) {
  const events = {}, documentEvents = {};
  let observer;
  const body = { style:style({'overflow':'auto','position':'relative'}) };
  const root = { style:style({'scroll-behavior':'smooth'}) };
  const dialog = { id:'report-request-modal', open:false, dataset:{},
    addEventListener:(n,fn)=>events[n]=fn, contains:t=>t===dialog,
    showModal(){ this.open=true; }, close(){this.open=false;events.close();} };
  const document = { body, documentElement:root, querySelector:()=>dialog,
    addEventListener:(n,fn)=>documentEvents[n]=fn };
  const window = { scrollX:0, scrollY:365, scrollTo(x,y){this.scrollX=x;this.scrollY=y;} };
  const button = { disabled:false, getAttribute:n=>n==='commandfor'?dialog.id:'show-modal' };
  if(native) button.commandForElement=dialog;
  const target = { closest:()=>button };
  vm.runInNewContext(source, {document,window,MutationObserver:class {constructor(fn){observer=fn;}observe(){}}});
  return {body,root,dialog,window,events,documentEvents,target,button,observer};
}
const f=fixture();
f.documentEvents.click({target:f.target,preventDefault(){throw Error('native click should not be overridden');}});
assert.equal(f.body.style.getPropertyValue('position'),'fixed');
assert.equal(f.body.style.getPropertyValue('top'),'-365px');
assert.equal(f.root.style.getPropertyValue('overflow'),'hidden');
f.events.beforetoggle({newState:'open'}); // double-lock must not overwrite original styles
f.dialog.open=true;
let stopped=false;
f.documentEvents.wheel({target:{},preventDefault(){stopped=true;}});
assert.equal(stopped,true);
f.dialog.close();
assert.equal(f.body.style.getPropertyValue('position'),'relative');
assert.equal(f.body.style.getPropertyValue('overflow'),'auto');
assert.equal(f.body.style.getPropertyValue('top'),'');
assert.equal(f.root.style.getPropertyValue('overflow'),'');
assert.equal(f.root.style.getPropertyValue('scroll-behavior'),'smooth');
assert.equal(f.window.scrollY,365);
f.observer(); // repeated close is harmless
const old=fixture(false);
let fallbackPrevented=false;
old.documentEvents.click({target:old.target,preventDefault(){fallbackPrevented=true;}});
assert.equal(fallbackPrevented,true);
assert.equal(old.dialog.open,true);
old.dialog.close();
assert.equal(old.body.style.getPropertyValue('position'),'relative');
const delayed=fixture();
let mounted=false, disconnected=false, mountCallback;
const delayedDoc={body:delayed.body,documentElement:delayed.root,
  querySelector:()=>mounted?delayed.dialog:null,addEventListener(){}};
vm.runInNewContext(source,{document:delayedDoc,window:delayed.window,
  MutationObserver:class {constructor(fn){mountCallback=fn;}observe(){}disconnect(){disconnected=true;}}});
mounted=true;
mountCallback();
assert.equal(disconnected,true);
console.log('PASS: native commands preserved, fixed-body lock, style/position restoration, backdrop wheel, fallback, idempotence');
