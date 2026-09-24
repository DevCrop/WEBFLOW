const fs = require('node:fs');
const data = JSON.parse(fs.readFileSync('artifacts/copy-spacing-audit.json', 'utf8'));
const rules = JSON.parse(fs.readFileSync('artifacts/copy-spacing-rules.json', 'utf8'));
const findings = [];
const escape = s => String(s).replace(/\|/g, '&#124;').replace(/[\r\n\u2028]+/g, ' ↵ ').replace(/\u200d/g, '[ZWJ]');
for (const page of data.pages) {
  const seen = new Set();
  const blocks = (page.blocks || []).filter(b => b.visible).sort((a, b) => a.text.length - b.text.length);
  const add = (category, original, replacement, b) => {
    const key = category + original;
    if (seen.has(key)) return;
    seen.add(key);
    const index = b.text.indexOf(original);
    findings.push({ page: page.path, title: page.title, category, original, replacement,
      location: [b.section, b.tag.toLowerCase(), b.classes].filter(Boolean).join(' / '),
      context: b.text.slice(Math.max(0, index - 28), index + original.length + 45),
      explicitBreaks: b.breaks });
  };
  for (const b of blocks) {
    for (const [category, original, replacement] of rules) {
      if (b.text.includes(original)) add(category, original, replacement, b);
    }
    for (const m of b.text.matchAll(/(?:습니다|입니다|했습니다|되었습니다|됩니다|있습니다)\.[가-힣]/g)) {
      const before = b.text.slice(0, m.index).match(/[가-힣]*$/)[0];
      const after = b.text.slice(m.index + m[0].length).match(/^[가-힣]*/)[0];
      const original = before + m[0] + after;
      add('문장 사이 공백 누락', original, original.replace('.', '. '), b);
    }
  }
}
const groups = ['본문 손상: 원문 복원 필요', '공백 누락', '문장 사이 공백 누락', '과다 공백', '표기 통일 권장', '별도 오탈자', '원문 확인 필요'];
const counts = Object.fromEntries(groups.map(g => [g, findings.filter(f => f.category === g).length]));
const ok = data.pages.filter(p => p.status === 200);
const ko = ok.filter(p => !p.path.startsWith('/en'));
const en = ok.filter(p => p.path.startsWith('/en'));
const lines = [
  '# 국문·영문 문구 띄어쓰기 점검', '',
  '점검일: 2026-09-15. Webflow 내용 수정 및 publish 없음.', '',
  '## 점검 범위', '',
  `- 공개 사이트 ${data.pages.length}개 경로 요청: HTTP 200 ${ok.length}개(국문 경로 ${ko.length}, 영문 경로 ${en.length}).`,
  `- 미처리 경로: ${data.remaining.length}개. 접근 실패 내역은 마지막 표에 기재.`,
  '- 기존 페이지 목록과 공개 내부 링크를 따라 CMS 상세까지 순회했다. 영문 주소라는 이유만으로 본문이 영문이라고 가정하지 않았다.',
  '- 공개 DOM 텍스트를 수집하고 공백 누락·문장 접합·보이지 않는 문자 패턴을 전수 검색한 뒤, 확인한 표현을 표로 정리했다. 모든 문장의 맞춤법·문법을 전문 교열한 결과는 아니다.',
  '- 명시적인 줄바꿈(br/개행)은 유지한다. 아래 표에서 ↵는 기존 줄바꿈, [ZWJ]는 눈에 보이지 않는 U+200D 문자이다. ZWJ는 일반 공백이 아니다.',
  '- 제품명·API명·고유 명칭은 임의 분리하지 않았다. 전문 복합 명사의 띄어쓰기는 확정 오류와 분리하여 표기 통일 권장으로 표시했다.',
  '- 미게시 Designer 변경, draft/보호 페이지 본문, 이미지 내부 글자, 모든 숨김 탭·모달·모바일 전용 문구 및 검색어/페이지네이션의 모든 상태는 이 공개 DOM 감사만으로 검증되지 않는다. sitemap.xml은 404였다.',
  '- 같은 문구가 메인/목록/관련 글에도 나오면 해당 경로를 각각 적었다. 원본 CMS 본문과 요약 필드를 구분해 수정해야 하며 문장 전체를 자동 치환하라는 뜻은 아니다.', '',
  '## 요약', '',
  '| 분류 | 페이지별 중복 제거 항목 수 |', '|---|---:|',
  ...Object.entries(counts).map(([g, n]) => `| ${g} | ${n} |`), '',
];
for (const group of groups) {
  lines.push(`## ${group}`, '', '| 페이지 | 위치 | 현재 문구 | 수정 제안 | 주변 문맥 |', '|---|---|---|---|---|');
  for (const f of findings.filter(f => f.category === group)) {
    lines.push(`| [${escape(f.page)}](https://intellectualdata.webflow.io${f.page}) | ${escape(f.location)} | ${escape(f.original)} | ${escape(f.replacement)} | ${escape(f.context)} |`);
  }
  lines.push('');
}
lines.push('## 영문 경로의 국문 잔여 확인 후보', '', '띄어쓰기 오류와는 별개다. 원래 국문을 병기하려는 영역이면 유지한다. 전체 번역 교정은 수행하지 않았다.', '', '| 페이지 | 현재 문구 예시 | 확인 방향 |', '|---|---|---|');
for (const p of en) {
  const samples = [...new Set((p.blocks || []).filter(b => b.visible && /[가-힣]{3,}/.test(b.text) && !/header|footer|cookie|nav|announcement/i.test(b.section + b.classes)).map(b => b.text))];
  if (samples.length) lines.push(`| [${escape(p.path)}](https://intellectualdata.webflow.io${p.path}) | ${escape(samples.slice(0, 3).map(s => s.slice(0, 90)).join(' / '))} | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |`);
}
lines.push('## 페이지별 점검 목록', '', '발견 없음은 위 검사에서 확정한 항목이 없다는 뜻이며 완전 무오류 보장은 아니다.', '', '| 경로 | HTTP | 발견 항목 |', '|---|---:|---:|');
for (const p of data.pages) lines.push(`| ${escape(p.path)} | ${p.status || p.error || '실패'} | ${findings.filter(f => f.page === p.path).length} |`);
lines.push('', '## 접근 실패', '', '| 경로 | 결과 |', '|---|---|');
for (const p of data.pages.filter(p => p.status !== 200)) lines.push(`| ${escape(p.path)} | ${p.status || p.error} |`);
fs.writeFileSync('artifacts/copy-spacing-findings.json', JSON.stringify({ counts, findings }, null, 2), 'utf8');
fs.writeFileSync('docs/copy-spacing-audit-2026-09-15.md', lines.join('\n') + '\n', 'utf8');
console.log(JSON.stringify({ checked: data.pages.length, ok: ok.length, ko: ko.length, en: en.length, remaining: data.remaining.length, counts, affectedPages: new Set(findings.map(f => f.page)).size }));
