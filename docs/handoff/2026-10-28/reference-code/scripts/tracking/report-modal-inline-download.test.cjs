const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'report-modal-inline-download.js'),'utf8');
const flush=async()=>{for(let i=0;i<10;i++)await Promise.resolve();};
function fixture({lang='ko',valid=true,ok=true,mime='application/pdf',href='https://cdn.prod.website-files.com/6a38f39fe95d43bbdbe5c71c/report.pdf',held=false}={}) {
  const observers=[],timers=[],handlers={},buttonHandlers={},linkHandlers={};
  let requests=0,downloads=0,revokes=0,downloadName,release;
  function node(extra={}) {return Object.assign({style:{display:''},hidden:false,attrs:{},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];}},extra);}
  const actions=node({appendChild(el){this.status=el;}});
  const button=node({value:lang==='en'?'Download Report':'리포트 다운로드',type:'submit',disabled:false,parentElement:actions,addEventListener(n,f){buttonHandlers[n]=f;}});
  const link=node({href,addEventListener(n,f){linkHandlers[n]=f;}});
  const done=node({style:{display:'none'},querySelector(){return link;}}),fail=node({style:{display:'none'}});
  const wrapper={querySelector(s){return s==='.w-form-done'?done:fail;}};
  const form=node({closest(){return wrapper;},querySelector(){return button;},checkValidity(){return valid;},addEventListener(n,f){handlers[n]=f;}});
  const modal=node({dataset:{},querySelector(){return form;},addEventListener(){}});
  const document={documentElement:{lang},body:{appendChild(){}},querySelector(){return modal;},createElement(tag){return node({tag,click(){downloads++;downloadName=this.download;},remove(){}});}};
  class URLMock extends URL {static createObjectURL(){return 'blob:local';}static revokeObjectURL(){revokes++;}}
  const response={ok,blob:async()=>({size:12,type:mime})};
  vm.runInNewContext(source,{document,URL:URLMock,location:{href:'https://example.test/newsroom/report'},queueMicrotask,
    fetch(){requests++;return held?new Promise(r=>release=()=>r(response)):Promise.resolve(response);},
    setTimeout(f){timers.push(f);},MutationObserver:class {constructor(f){this.f=f;observers.push(this);}observe(){}disconnect(){}}});
  function event(){return {defaultPrevented:false,stopped:false,preventDefault(){this.defaultPrevented=true;},stopImmediatePropagation(){this.stopped=true;}};}
  return {button,form,done,fail,actions,modal,link,timers,
    submit(){const e=event();handlers.submit(e);return e;},
    success(){form.style.display='none';done.style.display='block';fail.style.display='none';observers[0].f();},
    reject(){done.style.display='none';fail.style.display='block';observers[0].f();},
    click(){const e=event();buttonHandlers.click(e);return e;},release(){release();},
    stats(){return {requests,downloads,revokes,downloadName};}};
}
(async()=>{
  const ko=fixture({held:true});assert.equal(ko.stats().requests,0);
  ko.click();assert.equal(ko.stats().requests,0,'No download before accepted submission');
  const first=ko.submit();assert.equal(first.defaultPrevented,false,'Webflow owns initial submit');
  assert.equal(ko.button.disabled,false,'Do not pre-disable before Webflow delegation');
  await flush();assert.equal(ko.button.value,'접수 중…');assert.equal(ko.button.disabled,true);
  const duplicate=ko.submit();assert.equal(duplicate.defaultPrevented,true);assert.equal(duplicate.stopped,true);
  ko.success();assert.equal(ko.button.value,'다운로드 중…');assert.equal(ko.button.type,'button');
  assert.equal(ko.form.style.display,'');assert.equal(ko.done.style.display,'block','Keep real native success signal');
  assert.equal(ko.stats().requests,1);ko.click();assert.equal(ko.stats().requests,1,'No duplicate fetch');
  ko.release();await flush();assert.equal(ko.stats().downloads,1);assert.match(ko.stats().downloadName,/_KR.pdf$/);
  assert.equal(ko.button.value,'다시 다운로드');assert.equal(ko.button.disabled,false);assert.equal(ko.button.attrs['aria-busy'],undefined);
  ko.timers.forEach(f=>f());assert.equal(ko.stats().revokes,1);
  ko.click();assert.equal(ko.stats().requests,2,'Retry downloads without form submission');ko.release();await flush();
  assert.equal(ko.submit().defaultPrevented,true,'Never resubmit an accepted form');
  const en=fixture({lang:'en'});en.submit();await flush();assert.equal(en.button.value,'Submitting...');en.success();await flush();
  assert.equal(en.button.value,'Download again');assert.match(en.stats().downloadName,/_EN.pdf$/);
  const lateLocale=fixture();lateLocale.link.href='https://cdn.prod.website-files.com/6a38f39fe95d43bbdbe5c71c/report_EN.pdf';lateLocale.submit();await flush();assert.equal(lateLocale.button.value,'Submitting...');lateLocale.success();await flush();assert.match(lateLocale.stats().downloadName,/_EN.pdf$/,'Resolve current localized PDF, not parser-time locale');
  const invalid=fixture({valid:false});invalid.submit();invalid.success();await flush();assert.equal(invalid.stats().requests,0);
  const rejected=fixture();rejected.submit();await flush();rejected.reject();await flush();assert.equal(rejected.stats().requests,0);assert.equal(rejected.button.value,'리포트 다운로드');assert.equal(rejected.button.type,'submit');
  const fail=fixture({ok:false});fail.submit();fail.success();await flush();assert.equal(fail.stats().downloads,0);assert.equal(fail.button.value,'다운로드 다시 시도');assert.match(fail.actions.status.textContent,/신청은 접수/);
  const mime=fixture({mime:'text/html'});mime.submit();mime.success();await flush();assert.equal(mime.stats().downloads,0);
  const host=fixture({href:'https://example.net/report.pdf'});host.submit();host.success();await flush();assert.equal(host.stats().requests,0);
  console.log('PASS: accepted-only automatic download, KO/EN loading labels, native submit preserved, no double submit/fetch, in-place form, retry without resubmission, failures, URL/MIME guards, Blob cleanup');
})().catch(e=>{console.error(e);process.exitCode=1;});
