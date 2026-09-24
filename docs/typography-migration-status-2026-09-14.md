# Typography Migration Status

2026-09-14, site `6a38f39fe95d43bbdbe5c71c`. 부분 적용 상태이며 전체 완료가 아니다. Publish하지 않았다.

## 저장 및 재조회 완료

- normal-title, micro-title, micro-body의 `-1-2`, `-1-2-3` 선택자 6개를 정식 Typography 크기/행간/자간 변수에 연결했다.
- 위 선택자의 medium/small/tiny font-size override 18개를 제거하고 빈 속성을 재조회했다. 클래스 이름과 요소 연결은 유지했다.
- micro-body 호환 CSS의 반복 고정값을 정식 반응형 변수 참조로 교체했다.
- eyebrow 내부 strong/b만 부모 굵기를 상속하도록 site head에 제한된 규칙을 추가했다. 본문 강조와 텍스트는 변경하지 않았다. 최종 head 전체가 저장본과 같은지 재조회했다.
- banner 기본 크기 변수를 64px에서 48px로 변경하고 재조회했다.
- intro-title, banner 설명을 갱신했다. sub-visual-media 12개 설명에서 오래된 제목 크기를 제거하고 부모 토큰 소유 원칙으로 통일했다. 14개 설명을 재조회했다.
- 저장소의 초기 타이포 이름 및 모호한 전역 클래스 예시를 현행 역할 문서로 정리했다.

## 후속 진행

- Designer Typography 변수 화면에서 banner 48/40/32/28px 저장을 직접 확인했다. 앞선 모드 저장 미확인 상태는 해소되었다.
- `type/section/stat/value/font-size` 변수를 생성했다. ID는 `variable-73f9ee91-557b-5b77-0df6-c50f4e0da117`이다. 120/96/72/56px 네 모드를 Designer에서 확인했다.
- `section-stat-value`의 기본 font-size를 해당 변수에 바인딩하고 medium/small/tiny의 고정 font-size를 제거했다. 기본 바인딩과 3개 breakpoint의 빈 override를 native 재조회했다. 기존 크기, 행간, 굵기, 숫자 정렬은 유지한다.
- 메인 제목 클래스 교체는 재시도에서도 기존 스타일을 찾지 못한다는 오류로 거절됐다. 요소 연결은 변경되지 않았다.
- Designer MCP는 앱이 실행되지 않았다는 연결 오류를 반환했다. Data MCP의 저장/조회와 브라우저 변수 UI 확인은 가능하지만 Designer MCP를 통한 캔버스 전환은 불가능했다.
- 이후 사용자 재연결로 Designer MCP가 복구됐다. INDA 미게시 캔버스에서 1274/820/667/393px에 해당하는 48/40/32/28px 배너 제목을 직접 측정했고 가로 넘침이 없었다.
- `banner-inner`의 잘못된 `var(--space-xl)` shorthand를 제거하고 기존 `Space/xl`, `Space/lg`, `Space/2xl` 변수로 상하/좌우/gap을 연결했다. tablet의 고정 좌우 padding override를 제거했다. native 재조회 및 미게시 캔버스에서 padding 32px 24px, gap 48/40/36/32px와 가로/세로 넘침 없음을 확인했다.
- draft 카탈로그의 실제 banner 인스턴스 4개도 1274px 및 393px에서 같은 gap과 padding을 상속하고 넘침이 없었다. draft 상태는 유지했다.
- 카드 9종의 정의를 조회했다. num-card/icon-card/icon-num-card/review-card/icon-card-cms/story-card/case-card는 micro 역할을 사용하고, lpo-service-card는 content 역할을 사용한다. 기본 card도 content 역할의 정식 변수에 연결되어 있다. 이 9개 정의에 레거시 combo 연결은 없었으며, 정상 역할을 일괄 재작성하지 않았다. 전 variant의 모든 속성 검증과 전체 페이지 사용처 삭제 검증을 대신하는 결과는 아니다.
- 메인 제목의 set_style 오류는 Designer 재연결 후에도 동일했다. 브라우저에서 클래스 이름 편집은 취소했고, 임시 geometry 속성을 원복한 뒤 원래 4개 클래스 체인을 재조회했다.
- 사이트 `rules/design-system.md`의 banner 목표값을 48/40/32/28로 갱신했다.

## 추가 검증 필요

- INDA 배너 4구간 및 카탈로그 배너 4개 2구간은 검증했다. 모든 페이지의 전체 variant/언어 조합 검증은 남았다.
- 카탈로그 intro-title의 전 variant 검증과 통계 숫자의 실제 사용 인스턴스 렌더 검증은 남았다. 새 컴포넌트 인스턴스나 props는 추가하지 않았다.

## 검증

`node runtime/check-typography-migration.cjs` 통과. 이는 공개 페이지에 예정 CSS를 로컬로 적용한 staged simulation이며 Webflow 미게시 렌더 검증이 아니다.

- 홈, INDA, Data Analytics, Kiteworks, SessionGuardian, LPO, About Us, Docusign의 1274/991/767/390px, 총 32개 조합을 검사했다.
- 배너 크기, 제목 가로 넘침, eyebrow의 부모/strong 굵기를 검사했다.
- 6개 대체 선택자를 4개 폭에서 검사했다. normal-title 38/34/28/26, micro-title 26/24/22/20, micro-body 17/17/16/16px이다.
- SessionGuardian 991px의 페이지 scrollWidth는 변경 전후 모두 1014px이었다. 기존 가로 넘침이며 이번 변경으로 새로 생기지 않았다. 수정하지 않았다.
- 배너 1274px 및 390px 캡처를 육안 확인했다. 결과 JSON: `artifacts/typography-migration-test.json`.

## 보류 항목과 이유

1. 메인 제목 중첩 클래스: 5개 화면 폭에서 간소화 전후 글꼴/굵기/크기/행간/색/크기가 동일했으나 native set_style이 기존 스타일을 찾지 못한다며 거절했다. 임시 geometry 속성을 되돌리고 재조회했다. 원래 클래스 연결은 유지했다.
2. section-title/intro-title 내부 크기 소유권 단일화, 카드 내부 역할 이관: component variant와 props 보존 검증이 남았다.
3. section-ui-label 위계, 역할 없는 14px 본문: 사용 목적 대조가 필요하다. 일괄 축소/확대하지 않았다.
4. section-stat-value와 banner-inner 토큰화는 후속 진행에서 반영했다. section-padding/u-section-padding 이관은 미적용. 기존 Section/Padding-Y 모드는 120/88/64/48인데 u-section-padding은 120/96/48/56으로 서로 달라 단순 치환하면 크기가 바뀐다.
5. 고정 heading-64/heading-32/display-188, 이전 section 토큰 및 Copy 계열: 사용처 검증과 대체가 남았다.
6. legacy 39개, Copy 63개, 같은 selector 18그룹: 삭제하지 않았다. 전체 요소 조회가 반복적으로 assets API 429에 걸렸고, component 정의 전체 참조도 확정하지 못했다. 실패한 조회는 미사용 증거가 아니다.
7. button/cta-button 및 카드 기반 통합: 동작/props/variant 회귀 검증 전에는 병합하지 않았다.
8. 사이트 banner 규칙 및 카탈로그 배너 검증은 완료했다. 전체 카탈로그 검증은 남았다.

## 근거와 운영 경계

- 원본 전체 대상 목록: `typography-migration-audit-2026-09-14.md`. 감사 당시 값과 현재 부분 적용 상태를 구분한다.
- 롤백 자료: `artifacts/typography-migration-before.json`, `artifacts/typography-migration-scripts-before.json`.
- API 응답 timeout은 실패 확정도 성공 확정도 아니다. 이번 작업에서 실제 저장 후 timeout 사례가 있어 재조회로 판정했다. 이는 관찰된 현상이지 벤더 보장 동작이 아니다.
- 공식 도구 참고: https://developers.webflow.com/mcp/tools/data-tools
- 공식 마이그레이션 참고: https://developers.webflow.com/mcp/skills/skill-migration
- 삭제/CMS 대량 변경/Publish는 별도 안전 절차를 따른다. 이 작업은 Publish나 GitHub push를 실행하지 않았다.
