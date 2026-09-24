# Intellectual Data Webflow 현재 상태 — 2026-09-25

## 요약

- Site: `6a38f39fe95d43bbdbe5c71c`
- 기본 locale KO: `6a48b49d97c21429fe3b1a9d`
- 보조 locale EN: `6a49317bcd19670961564130`
- 사용 도구: Webflow MCP `2.1.0`
- 상태: 아래 변경은 Webflow 저장 상태에 반영됐으며 **publish하지 않았다**.
- 공개 기준 URL: `https://intellectualdata.webflow.io`
- 기존 사이트 비교 기준: `https://www.intellectualdata.com/`

공개 URL은 마지막 게시본이다. 미게시 변경은 MCP 저장값 재조회와 공개 DOM에 최종 CSS/구조를 임시 적용한 Chromium 검증으로 확인했다. 게시 후에는 390, 767, 768, 1440px 실화면 확인이 필요하다.

## 반응형 BR 구조

- 767px 이하를 모바일, 768px 이상을 데스크톱으로 관리한다.
- 데스크톱의 기존 BR을 기준으로 유지한다. 모바일 요청 때문에 공용 desktop prop을 덮어쓰지 않는다.
- BR 하나의 표시만 다르면 BR 자체를 `span.is-br-only-mobile` 또는 `span.is-br-only-desktop`으로 감싼다.
- breakpoint별 문장이 다르고 컴포넌트가 `titleMobile`을 제공하면 해당 prop을 사용한다.
- Plain Text prop의 생성 BR을 직접 제어할 수 없을 때만 desktop/mobile visibility wrapper를 사용한다.
- visibility 클래스는 제목·문단·layout wrapper 전체에 붙이지 않는다. 숨긴 BR 양쪽에는 일반 공백을 남긴다.
- KO와 EN 문구·개행은 각 언어 문법에 맞게 따로 관리한다.

구체적인 요소 ID, 저장값, 390/1440 결과는 [반응형 BR 체크리스트](ko-responsive-br-checklist-2026-09-24.md)에 있다.

## 2026-09-25 최종 타이포 상태

### EB Garamond prop 전용 desktop 변수

아래 값은 URL locale이 아니라 컴포넌트에서 EN font/EB Garamond variant를 선택한 경우에만 적용된다. KO/base 폰트 변수는 그대로다.

| 변수 | ID | Desktop | 390px 확인값 |
|---|---|---:|---:|
| `type/component/sub-visual/title/garamond/font-size` | `variable-62c96e9f-99cf-e7cd-b289-986552918780` | 88px | 32px |
| `type/component/banner/title/garamond/font-size` | `variable-c0cb5054-87ce-c1c4-1a79-631a4f64be90` | 80px | 25px |
| `type/component/intro-title/title/garamond/font-size` | `variable-5aef92ad-6260-7023-46a1-69c79ccbe7fd` | 72px | 26px |
| `type/component/section-title/title/garamond/font-size` | `variable-64239af8-b145-d48b-88ca-009468b505c9` | 46px | 22px |

- About Us의 EB Garamond sub-visual과 banner를 1440/390px로 확인했다.
- MCP variant style 재조회로 sub-visual EN(`e676d2de-dc88-ac1e-48a1-86b5f9422ca2`), banner EN(`eaa38fbe-596c-f4f1-a7ac-4f522952d01e`), intro English(`397e4847-b8d2-a781-33ef-cc5cd93c231e`), section English(`c4eaa471-ce8b-14fb-2d81-b4ece8114019`)가 위 Garamond 변수에 직접 바인딩된 것을 확인했다.
- EN 정적 경로 32개를 1440px로 교차 검사했으며 관련 제목의 가로 넘침과 5줄 이상 과다 개행은 없었다.
- 별도 CSS, `!important`, JavaScript, page-ID selector는 추가하지 않았다.

### stats-band 제목

- Component: `stats-band` (`70dd3497-f30a-4522-1474-238af9149ac3`)
- 제목 element: `70dd3497-f30a-4522-1474-238af9149ac7`
- 스타일: `section-head-title bold section-title__title-text`
- 결과: 1440px KO 42px / EN 46px, 390px KO·EN 20px
- INDA FullDiscovery, Data Analytics, What is eDiscovery의 KO·EN에서 넘침 없이 확인했다.

## 최근 전수 확인

- KO 32개 + EN 32개 경로의 sub-visual description을 390px로 검사했다.
- EN banner는 desktop과 390px에서 문법, 강제 BR, 단독 단어, 가로 넘침을 검사했다.
- KO·EN 조건부 visibility wrapper를 재감사해 제목·문단 전체가 숨겨지는 구조를 제거했다.
- Search, 약관, 개인정보·쿠키, Resources와 CMS 상세 template도 EN 최종 감사 범위에 포함했다.
- 저장 확인과 화면 확인을 구분해 기록했다. 상세 결과는 BR 체크리스트 후반부를 본다.

## 게시 전 확인

1. Webflow Designer에서 site와 main branch, KO/EN locale을 확인한다.
2. MCP로 Garamond 변수 4개와 `stats-band` 제목 styleNames를 재조회한다.
3. 390, 767, 768, 1440px에서 KO·EN sub-visual, intro, section title, banner를 확인한다.
4. 특히 INDA, Data Analytics, NCT, Docusign, LPO, About Us, Newsroom/Insights 상세를 확인한다.
5. 공개 전에 Webflow preview에서 헤더·배너 높이, 가로 넘침, 숨김 wrapper를 확인한다.
6. production publish는 `safe-publish` 절차 또는 사용자의 명시 확인 후 수행한다.

## 로컬 증거와 Git 범위

- `runtime/`의 스크립트는 재현 가능한 검사 도구다.
- `artifacts/`, `outputs/`, Edge 프로필, 캡처 이미지는 로컬 증거이며 Git에 포함하지 않는다.
- 대용량 생성 CSS `runtime/current-webflow.css`도 로컬 비교용이라 Git에서 제외한다.
- 공개 화면의 최종 게시 후 캡처는 publish 후 새 증거로 생성한다.
