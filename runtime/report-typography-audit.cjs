const fs = require('node:fs');
const native = JSON.parse(fs.readFileSync('artifacts/typography-audit-native.json', 'utf8'));
const base = JSON.parse(fs.readFileSync('artifacts/typography-audit-base-variables.json', 'utf8'));
const browser = JSON.parse(fs.readFileSync('artifacts/typography-audit-browser.json', 'utf8'));
const styles = native.styles;
const vars = new Map([...base, ...native.typography].map(v => [v.id, v]));
const props = s => s.properties?.base?.properties || {};
const typo = s => Object.keys(props(s)).some(k => /font|line-height|letter-spacing/.test(k));
const legacy = styles.filter(s => /legacy|deprecat|delete-/i.test(s.name));
const copies = styles.filter(s => /copy/i.test(s.name));
const groups = new Map();
for (const s of styles) groups.set(s.selector, [...(groups.get(s.selector) || []), s]);
const duplicates = [...groups].filter(([, list]) => list.length > 1);
const format = v => typeof v === 'object' && v !== null ? (v.id ? (vars.get(v.id)?.name || 'unresolved:' + v.id) : JSON.stringify(v)) : String(v);
const sizes = s => [1274, 991, 767, 390].map(w => browser.probes[w].find(p => p.id === s.id)?.size || 'not probed');
const fixed = styles.filter(s => {
  const p = browser.probes[1274].find(p => p.id === s.id);
  return p && parseFloat(p.size) >= 26 && sizes(s).every(v => v === p.size);
});
const raw = styles.filter(s => typeof props(s)['font-size'] === 'string' && !/^(inherit|unset|initial)$/.test(props(s)['font-size']));
const lines = [
  '# Typography Migration Audit',
  '',
  '점검일: 2026-09-14. 사이트: intellectualdata / 6a38f39fe95d43bbdbe5c71c.',
  '',
  '## 결론 및 앞선 답변 정정',
  '',
  'banner-title 반응형이 누락되었다는 앞선 판단은 잘못이었다. MCP get_variables의 modeValues: []만으로 누락을 판단할 수 없다. 공개 CSS 및 브라우저 계산값은 64/46/38/34px이다. 이번 점검에서는 사이트를 수정하거나 publish하지 않았다.',
  '',
  '실제 문제는 일부 대체 변수명, 중복 선택자, 레거시 combo, 중첩 strong, 문서와 현재 구현의 불일치다. 크기를 줄이는 디자인 판단과 구현 오류를 구분한다.',
  '',
  '## 범위 및 제한',
  '',
  `- Webflow 저장 상태의 스타일 레코드 ${styles.length}개 전체, 기본 타이포 속성이 있는 레코드 ${styles.filter(typo).length}개를 조사했다. 레코드 수는 고유 클래스명 수가 아니다.`,
  `- 변수 ${base.length + native.typography.length}개, 컴포넌트 ${native.components.length}개 메타데이터를 조사했다.`,
  `- 공개 공통 CSS에서 타이포/변수 관련 규칙 ${browser.rules.length}개를 추출했다.`,
  `- 관련 선택자 ${browser.probes[1274].length}개를 1440/1274/992/991/767/479/390px에서 임시 DOM으로 측정했다. 임시 DOM은 브라우저 로컬에서만 생성하고 제거했다.`,
  '- 실제 DOM은 홈, INDA, Data Analytics, Kiteworks, SessionGuardian, LPO, About Us, Docusign 8페이지를 1274/390px에서 측정했다. 모두 HTTP 200이고 페이지 가로 넘침은 없었다. 측정한 표시 텍스트에서도 수평 넘침은 없었다.',
  '- 전체 페이지의 모든 CMS 항목, 숨겨진 탭/모달, 모든 언어 및 component variant 조합을 시각 검증한 것은 아니다. CSS 단독 probe는 조상, variant, custom code에 의한 실제 인스턴스 결과를 대신하지 않는다.',
  '- native 목록은 기본 속성 inventory다. 전 breakpoint/variant native 재조회는 수행하지 않았다. 반응형 표는 공개 CSS 계산값이며 미게시 변경의 최종 결과를 보증하지 않는다.',
  '- get_variables의 빈 modeValues를 누락 근거로 사용하지 않는다. 조회한 변수 목록에서 찾지 못한 ID도 실제 삭제된 변수로 단정하지 않는다.',
  '',
  '## 우선순위별 마이그레이션 대상',
  '',
  '### P1: 실제 불일치',
  '',
  '1. section-normal-title-1-2 / section-normal-title-1-2-3: 현재 normal은 38/34/28/26px인데 이 두 선택자는 54/44/36/30px이다. --type--section--normal--title--font-size는 검사 문맥에서 정의되지 않았고 정상 변수는 --_typography---type--section--normal--title--font-size다. 대체값 경로를 정식 변수 바인딩으로 교체할 대상이다. 같은 패턴의 micro-title/body -1-2 및 -1-2-3도 크기가 우연히 일치할 뿐 변수 연결 정리가 필요하다.',
  '2. 중첩 strong: INDA intro eyebrow의 INDA FullDiscovery®와 Kiteworks intro eyebrow의 Secure File Transfer Protocol (SFTP)는 부모 medium 500인데 strong이 700이다. uniform eyebrow의 중복 strong만 정리할 대상이다. 본문에서 의미상 강조된 strong은 일괄 제거하지 않는다.',
  '3. intro-title 컴포넌트 설명은 60/50/40/34 및 EN 66/55/44/37을 기록하지만 현재 기본 title은 56/46/38/32, native Garamond 기본 변수는 62다. 설명/검증 기준을 실제 승인값과 일치시켜야 한다.',
  '4. sub-visual-media-* 설명은 부모 제목 72/64/54/44를 언급하지만 현재 sub-visual 기본은 64/50/40/34다. media가 제목을 소유하지 않는다는 원칙은 유지하고 오래된 숫자만 정리할 대상이다.',
  '',
  '### P2: 위계 및 유지보수',
  '',
  '5. banner-title: 1274px에서 64px, line-height 141% = 90.24px. 섹션 컴포넌트 제목 42px보다 커서 CTA가 시각적으로 과해질 수 있다. 48/40/32/28px은 제안값이며 아직 승인/적용되지 않았다. 배너 높이, 패딩, 문장 길이를 함께 검증해야 한다.',
  '6. 메인 히어로: 실제 홈 제목에 sub-visual-title + section-display + is-display-en + main-hero-title-scale이 함께 붙는다. 164/124/88/42px로 작동하지만 세 크기 역할이 겹친다. 최종 크기 소유자를 하나로 정리하고 언어와 굵기는 별도 축으로 유지한다.',
  '7. section-head-title + section-title__title-text는 56 계층을 42 계층으로 덮어쓰는 의도적 컴포넌트 예외다. 오류로 제거하지 말고 section-title의 역할 토큰이 단독 소유하도록 정리한다. intro-title의 lang-variant + regular + 내부 weight600도 같은 소유권 정리 대상이다.',
  '8. section-ui-label은 전 구간 22px이다. 누락이라 단정하지 않지만 UI/title 18→16px, subtitle 17→15px, body 16→15px와 위계가 역전되어 용도 확인이 필요하다. 버튼의 전역 최소 16px 기준과 일반 보조 UI 14/15px은 별도로 관리한다.',
  '9. section-stat-value는 120/96/72/56px로 반응형이 정상이나 숫자 리터럴로 관리된다. 전용 통계 토큰에 옮길 대상이다. 모든 0, inherit, 단위없는 행간을 무조건 변수화할 필요는 없다.',
  '10. card-title/content-title, card-desc/content-body, num-card의 legacy combo, review의 rc-* 및 본문 역할을 비교해 카드 종류별로 크기를 소유하는 클래스 하나만 남긴다. content→micro는 모든 카드에 일괄 적용하지 않는다.',
  '11. section-title__title / __body / __eyebrow, section-title-body, section-content-sub-title, * Copy 등 이전 토큰 계열을 사용하는 선택자는 사용처를 확인한 뒤 현재 section 역할로 흡수한다.',
  '12. section-padding, u-section-padding 및 중첩 combo는 120px/96px 리터럴과 변수 방식이 혼재한다. section-contents의 padding/gap 및 banner-inner의 var(--space-xl)와 개별 좌우 padding도 함께 정리한다. 레이아웃만의 반응형 필요까지 이번 폰트 점검으로 확정하지 않는다.',
  '13. fm-en/fm-ko 단독 및 section-head-title fm-en, section-micro-title fm-en 조합은 정상이다. 다만 역할 없이 fm-base만 적용하면 현재 body 기본을 상속해 14px이 된다. family 클래스는 크기 클래스가 아니므로 본문 기본 역할을 별도로 지정해야 한다.',
  '',
  '### P3: 정리 후보',
  '',
  `14. legacy 포함 레코드 ${legacy.length}개, Copy 포함 레코드 ${copies.length}개, 동일 selector 중복 그룹 ${duplicates.length}개. 존재만으로 현재 화면 오류나 미사용을 뜻하지 않는다. 삭제 전 참조/바인딩/variant를 확인한다. 전체 목록은 아래에 기록했다.`,
  '15. button과 cta-button이 각각 존재한다. 바로 병합하지 말고 콘텐츠 props와 CTA 동작, size/icon variant 조합을 먼저 맞춘 뒤 하나의 공통 기반으로 통합할 후보이다.',
  '16. 기본 card 컴포넌트 instanceCount는 0이고 실제 카드는 icon-card, num-card 등 여러 레이아웃 컴포넌트에 분산되어 있다. 단순 이름 수를 줄이기 위한 병합보다 공통 내부 타이포 역할 공유가 우선이다.',
  '17. 저장소 규칙은 display-1/heading-*/body-*를 기준으로 하지만 현재 사이트는 section-head/lead/normal/content/micro/ui 계층을 사용한다. official-workflow.md에는 금지된 모호 클래스 예시도 남아 있다. 먼저 현행 위계의 기준 문서를 확정하고 구 문서를 정리해야 재발을 막을 수 있다.',
  '',
  '## 핵심 크기표',
  '',
  '단위 px. 기본/태블릿/모바일 가로/모바일 세로는 실제 1274/991/767/390px probe 결과다.',
  '',
  '| Selector | 1274 | 991 | 767 | 390 |',
  '|---|---:|---:|---:|---:|',
];
const key = /^(banner-title|sub-visual-title|main-hero-title-scale|section-display|section-stat-value|section-(head|lead|normal|content|micro|ui)-(title|subtitle|body|eyebrow|label))$/;
for (const s of styles.filter(s => key.test(s.name) && s.selector === '.' + s.name && typo(s))) lines.push(`| ${s.selector} | ${sizes(s).join(' | ')} |`);
lines.push('', '## 반응형 크기 고정 후보', '', '관련 선택자 probe에서 26px 이상이면서 4구간 같은 크기인 항목. 실제 사용 여부 및 의도는 별도 확인해야 한다.', '');
for (const s of fixed) lines.push(`- ${s.selector}: ${sizes(s).join(' / ')} (ID ${s.id})`);
lines.push('', '## 레거시 전체 목록', '', '이름에 legacy/deprecat/delete가 포함된 레코드. 즉시 삭제 목록이 아니라 마이그레이션 후보다.', '');
for (const s of legacy) lines.push(`- ${s.selector} (ID ${s.id})`);
lines.push('', '## 같은 Selector 중복 전체 목록', '', '같은 말단 이름의 서로 다른 combo는 정상일 수 있다. 아래는 전체 selector 문자열이 같은 별도 레코드들이다.', '');
for (const [selector, list] of duplicates) lines.push(`- ${selector}: ${list.length}개. IDs: ${list.map(s => s.id).join(', ')}`);
lines.push('', '## Copy 전체 목록', '');
for (const s of copies) lines.push(`- ${s.selector} (ID ${s.id})`);
lines.push('', '## 직접 지정 Font Size 전체 목록', '', '값이 문자열인 font-size. px 고정값, CSS 함수 및 CSS var 직접 참조가 포함된다. 모두 오류라는 뜻은 아니다.', '', '| Selector | Native value | Published sizes 1274/991/767/390 |', '|---|---|---|');
for (const s of raw) lines.push(`| ${s.selector} | ${format(props(s)['font-size'])} | ${sizes(s).join(' / ')} |`);
lines.push('', '## 전체 타이포 선택자 Inventory', '', '조회한 기본 스타일에서 폰트/행간/자간 속성이 있는 모든 레코드. unresolved는 이번 조회 변수 목록에서 확인되지 않은 ID이며 삭제된 변수라는 뜻이 아니다.', '', '| Selector | Font size source | Line height source | Weight | Family |', '|---|---|---|---|---|');
for (const s of styles.filter(typo)) {
  const p = props(s);
  lines.push(`| ${s.selector} | ${p['font-size'] === undefined ? 'inherit' : format(p['font-size'])} | ${p['line-height'] === undefined ? 'inherit' : format(p['line-height'])} | ${p['font-weight'] === undefined ? 'inherit' : format(p['font-weight'])} | ${p['font-family'] === undefined ? 'inherit' : format(p['font-family'])} |`);
}
lines.push('', '## 컴포넌트 영향 범위', '', 'Webflow instanceCount 값이며 고유 페이지 수가 아니다.', '', '| Component | Instances |', '|---|---:|');
for (const c of native.components) lines.push(`| ${c.name} | ${c.instanceCount ?? 'unknown'} |`);
lines.push('', '## 권장 실행 순서', '', '1. 기준 문서와 역할별 크기표를 확정한다. 현재 정상 반응형을 보존한다.', '2. 잘못된 변수명과 eyebrow 중첩 strong을 먼저 고친다.', '3. banner와 좁은 desktop의 위계를 조정한다. 변경은 기존 토큰의 모드별 값으로 제한한다.', '4. 메인/intro/section-title의 크기 소유권을 하나로 정리한다.', '5. 카드/본문/UI의 임시 클래스와 직접 지정값을 역할 변수로 흡수한다.', '6. 실제 사용처와 variant/CMS 바인딩을 보존하며 중복/legacy를 제거한다.', '7. components 카탈로그, 문서, 회귀 테스트를 갱신한다. 국영문 및 경계 너비를 포함해 검증한 뒤 별도 승인으로 publish한다.', '', '## 증거 파일', '', '- artifacts/typography-audit-native.json', '- artifacts/typography-audit-base-variables.json', '- artifacts/typography-audit-browser.json', '- runtime/audit-typography.cjs', '- runtime/report-typography-audit.cjs', '');
fs.writeFileSync('docs/typography-migration-audit-2026-09-14.md', lines.join('\n'), 'utf8');
console.log(JSON.stringify({ styles:styles.length, typographyStyles:styles.filter(typo).length, variables:vars.size, components:native.components.length, legacy:legacy.length, copies:copies.length, duplicateGroups:duplicates.length, directFontSize:raw.length, fixedCandidates:fixed.length, reportLines:lines.length }));
