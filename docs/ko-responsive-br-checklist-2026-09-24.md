# 국문 반응형 BR 점검표 — 2026-09-24

## 범위와 판정 기준

- 사이트: `6a38f39fe95d43bbdbe5c71c` (기본 locale `ko`, 보조 locale `en`).
- 기준: 767px 이하를 모바일 BR, 768px 이상을 데스크톱 BR로 취급한다. 숨긴 BR의 양쪽 단어는 일반 공백으로 이어져야 한다.
- Webflow MCP 2.1 저장값을 재조회했다. 공개 사이트의 기존 상태는 Chromium 390px에서 확인했고, **이번 미게시 변경의 화면 결과는 저장된 CSS와 HTML 구조를 공개 페이지에 임시 적용해 검증**했다. Webflow Designer 스냅샷은 연결 오류로 실패했다. 따라서 게시 후 실화면 검증은 아래 항목에 별도로 남긴다.
- 퍼블리시하지 않았다.

## 요청 대상별 체크리스트

| 페이지 · 부분 | Webflow 요소 ID | 768px 이상 목표 | 767px 이하 목표 | MCP 저장 확인 | 390px 모의 화면 | EN 영향 |
|---|---|---|---|---|---|---|
| INDA · 대형 소송 실적 설명 | 래퍼 `258126f8-1c7e-8461-7a1b-2d086c09afee` | 기존 BR 2개 표시 | 설명 BR 2개 숨김 | ✅ `is-br-desc-desktop` | ✅ BR `none, none` | KO 페이지 규칙으로 한정 |
| INDA · FullDiscovery 소개 설명 | 래퍼 `19aa75ad-665d-b6c9-f1db-7d72dde0f02b`, 인스턴스 `5e723396-72ec-e449-49d9-f179cc48823f` | 기존 설명 BR 표시 | 설명 BR 숨김, 제목 BR 유지 | ✅ 설명 값의 ‘절차를’ 뒤 공백도 보정 | ✅ 설명 BR `none` | KO 페이지 규칙으로 한정 |
| Data Analytics · 소개 제목 | 인스턴스 `55c72db9-6030-893d-79b7-d5c312457205` | 기존 ‘절약해 주는’ 뒤 BR | ‘비용을’·‘AI 기반의’ 뒤 BR | ✅ 단일 제목 값, BR 3개 | ✅ ‘고객의 시간과 비용을 / 절약해 주는 AI 기반의 / 문서 검토 지원 기술’ | EN 제목 값 유지 |
| Data Analytics · TAR 제목 | 제목 `8fc8402e-9e25-6607-5308-eb0ae4bd96f4` | 한 문장, 공백 유지 | ‘실현시키는’ 뒤 BR | ✅ 실제 `span > br` 구조 | ✅ 2줄 | EN 리치 텍스트 원문 재저장·재조회 |
| Data Analytics · AL 제목 | 제목 `8fc8402e-9e25-6607-5308-eb0ae4bd9706` | 한 문장, 공백 유지 | ‘AL =’ 뒤 BR | ✅ 실제 `span > br` 구조 | ✅ ‘AL = / SVM(Support Vector Machine) / 방식의 학습’ | EN 원문 재조회 |
| LPO · 자격 요건 소제목 | `832d7876-e690-a3b2-dc8d-62dbf7ad8120` | 한 문장, 공백 유지 | ‘전문가의’ 뒤 BR | ✅ 실제 `span > br` 구조 | ✅ 2줄 | EN 리치 텍스트 원문 재저장·재조회 |
| Legal System · 소개 제목 | 인스턴스 `36c3aab7-4d71-4942-077c-77f4915e4bad` | 기존 ‘만으로도’ 뒤 BR | ‘만으로도’·‘달라지는’ 뒤 BR | ✅ 단일 제목 값, BR 2개 | ✅ 3줄 | EN 제목 값 유지 |
| Litera · 공식 파트너 제목 | 인스턴스 `8dfe1e78-5f19-38b6-d6a4-b52288ac1fe9` | 기존 BR 표시 | 같은 BR 표시 | ✅ KO 페이지 CSS | ✅ 2줄 | KO 페이지 규칙으로 한정 |
| Nymi Band · 소개 제목 | 인스턴스 `7b80b9c2-d2dd-63d6-d36f-475434c70ad2` | 기존 BR 표시 | 같은 BR 표시 | ✅ KO 페이지 CSS | ✅ 2줄 | KO 페이지 규칙으로 한정 |
| SessionGuardian · 주요 특징 제목 | 인스턴스 `5498ebae-92c1-781f-2ccb-781a06b98864` | 기존 BR 표시 | 같은 BR 표시 | ✅ KO 페이지 CSS | ✅ 2줄 | KO 페이지 규칙으로 한정 |
| About Us · 기업 소개 문단 | `a950095c-7469-fdb3-0ee2-0b7e146f280b` | 기존 BR 표시 | BR 숨김 | ✅ 실제 `span > br` 구조 | ✅ BR `none` | EN 원문 재조회 |
| Insights · 목록 sub-visual | 인스턴스 `ba5a9c2e-60e9-3bd7-4b70-c39101ada8d8` | 기존 상태 유지 | 기존 BR 유지 | ✅ 변경 없음 | ✅ 공개 목록 390px 확인 | 변경 없음 |
| Insights · 상세 sub-visual | 인스턴스 `dd8f9b4c-da8c-125f-a072-c1f4bda75d12` | 설명 BR 숨김 | 목록과 같은 위치에서 BR | ✅ 설명 prop 하나에 개행 | ✅ 같은 컴포넌트 구조·CSS 모의 검증 | 상세 EN 노드 조회 결과 없음 |
| Newsroom · 목록 sub-visual | 인스턴스 `47c7b8bd-37f8-bca3-2ce6-5de07f3b1a6e` | 설명 BR 숨김 | ‘인텔렉추얼데이터의’ 뒤 BR | ✅ 설명 prop 하나에 개행 | ✅ 2줄 | EN 설명 값 유지 |
| Newsroom · 상세 sub-visual | 인스턴스 `ea647be6-d7ac-93f2-1814-6787acc446e0` | 설명 BR 숨김 | 목록과 같은 위치에서 BR | ✅ 설명 prop 하나에 개행 | ✅ 같은 컴포넌트 구조·CSS 모의 검증 | EN 설명 값 유지 |
| Contact Us · 상담 설명 | 인스턴스 `66980ee5-f8a8-1160-e582-4c0f5050a796` | 기존 BR 표시 | 같은 BR 표시 | ✅ KO 페이지 CSS | ✅ 2줄 | KO 페이지 규칙으로 한정 |
| NCT · 보안 컨설팅 제목 | 인스턴스 `545a1671-d977-6b3f-a362-190a44f28a78` | 기존 상태 유지 | 이미 승인된 ‘데이터 보안’ 뒤 BR 유지 | ✅ 변경 없음 | ✅ 기존 390px 상태 확인 | 변경 없음 |
| Nymi Hardware · Monitors 문구 | 문단 `e8ac435f-7ce3-756b-d973-6e4ab72c7864` | 기존 상태 유지 | ‘Monitors,’ 뒤 기존 BR 유지 | ✅ 변경 없음 | ✅ 기존 390px 상태 확인 | 변경 없음 |

### 추가로 발견해 수정한 공백 경계

34개 국문 정적 페이지의 공개 화면을 390px와 1440px에서 교차 검사했다. 숨겨진 BR 앞뒤의 공백이 없어 단어가 붙는 경계 9곳을 발견해 다음 컴포넌트 값 또는 텍스트 앞에 일반 공백을 추가했다. 각 수정은 국문 값의 띄어쓰기만 바꾼다.

| 페이지 | 위치 · 요소 ID | 수정 |
|---|---|---|
| Docusign | Legality Guide 제목 인스턴스 `02a4e307-ea6f-9222-e82c-f5639fbaece4` | ‘필요하다면’ 뒤 공백 |
| LPO | sub-visual 설명 `1b240a87-19d4-a107-9ce3-7e5278c7a42d` | ‘지원하는’ 뒤 공백 |
| LPO | intro 제목 `629f1f96-7c35-79e6-9afe-34f835fd39b2` | ‘아우르는’ 뒤 공백 |
| LPO | 서비스 제목 `69bf885e-9554-ef69-4413-1e224e5c3bc5` | ‘제공하는’ 뒤 공백 |
| NCT | sub-visual 제목·설명 `8d4aacb0-3ea9-6b1e-0db1-dfe7466e4e79` | ‘국가핵심기술’·‘위한’ 뒤 공백 |
| What is eDiscovery | Forensic Collection `6efd0350-c51b-c8d0-1c9f-123ed82798dc` | 영문 뒤 공백 |
| What is eDiscovery | Search, Find and Review `6efd0350-c51b-c8d0-1c9f-123ed82798fa` | 영문 뒤 공백 |
| What is eDiscovery | 법원 제재 제목 `8ea79208-5b76-3f7d-8ae7-c809251a6762` | ‘위반 시’ 뒤 공백 |

INDA 소개 문단의 ‘절차를’ 뒤 공백 보정은 위 요청 대상 행에 포함했다. 영문 locale의 해당 리치 텍스트는 재조회해 기존 번역이 유지됨을 확인했다.

## 구현 및 검증 기록

- 공유 BR 유틸리티의 기존 정의는 바꾸지 않았다. 페이지별 KO 규칙은 header 컴포넌트 `ce592e07-2e11-1f60-55a0-dab536e25ba9`의 HTML Embed `38b744cb-2a2a-fe23-e49d-6305cd0b76c7`, 주석 `id-ko-responsive-br-20260924`에 한정했다.
- 정적 제목의 새 BR은 DOM div가 아닌 실제 `span > br` 요소로 저장되는지 KO locale HTML을 재조회했다. EN TAR·LPO의 기존 번역 HTML을 재저장했고, AL·About Us도 EN 원문이 유지됨을 확인했다.
- 공개 페이지에 저장 CSS와 변경된 텍스트/BR 구조를 임시 적용해 390·767·768·1440px의 BR 표시 상태를 확인했다. 390px 국문 정적 페이지 34개 중 접근 제한 1개(`/private-resources`, HTTP 401)를 제외한 33개에서 가로 넘침이 없었다. CMS 템플릿 8개는 MCP 저장 콘텐츠를 확인했다.
- 768px에서 Litera(문서 폭 924px), Nymi Band(957px), SessionGuardian(1014px)의 **기존 공개 페이지**에 가로 넘침이 있었다. 주요 원인은 화면 밖의 `edge-gradient__right-*` 요소로 확인했으며, 이번 BR 변경 전 상태에서도 같았다. 이 문서는 해당 기존 레이아웃을 수정하지 않는다.

## 게시 후 실화면 확인

- [ ] Webflow에서 사용자가 퍼블리시한 뒤 KO/EN 실제 페이지를 390·767·768·1440px에서 재확인한다.
- [ ] Insights·Newsroom 상세의 실제 CMS 항목에서 sub-visual BR과 EN 설명을 확인한다.
- [ ] TAR·AL·LPO의 390px 실제 줄 배열과 데스크톱 공백을 확인한다.
- [ ] 768px의 기존 edge-gradient 가로 넘침은 별도 레이아웃 작업으로 판단한다.

---

# EN 반응형 BR 체크리스트

## EN 적용 원칙

- EN locale ID는 `6a49317bcd19670961564130`이다. 모든 영문 문구 변경은 Webflow Localization API로 이 secondary locale에만 저장했다.
- 컴포넌트에 `title`과 `titleMobile`이 모두 있으면 각 값을 사용했다. 하나의 제목 값만 있는 경우 기존 데스크톱 BR을 유지하고 `html:lang(en)`과 해당 페이지 ID로 모바일 표시만 제어했다.
- 정적 텍스트의 모바일 전용 BR은 실제 `span.is-br-only-mobile > br` 구조로 저장했다. 숨긴 BR 경계에는 일반 공백을 남겼다.
- 공통 `is-br-only-mobile`·`is-br-only-desktop` 정의와 KO 규칙은 변경하지 않았다.

## EN 요청·최적화 대상

| 페이지 · 부분 | 요소/인스턴스 ID | 768px 이상 목표 | 767px 이하 목표 | MCP 저장 확인 | 390px 모의 화면 | KO 영향 |
|---|---|---|---|---|---|---|
| INDA · Steps and Procedures | `abff1eeb-33b5-e280-4d25-3f5e9f564cc2` | 한 줄 | `Steps` 뒤 BR | ✅ 제목 값과 EN 페이지 CSS 재조회 | ✅ 2줄 | KO 원문 재조회, 변경 없음 |
| INDA · 국내 진행 안내 제목 | `6936b79e-3863-c4df-c38d-a090dc2b5015` | 기존 BR 표시 | 기존 BR 숨김 | ✅ EN 페이지 CSS 재조회 | ✅ 자연스러운 3줄 | KO 변경 없음 |
| INDA · We Know eDiscovery | `707aff6c-a890-8794-8efc-5208e4ca35bd` | 한 줄 | `Better` 뒤 BR | ✅ 제목 값과 EN 페이지 CSS 재조회 | ✅ 2줄 | KO 원문 재조회, 변경 없음 |
| INDA · In-House Expertise | `c36f8376-cdab-fac7-3fbd-5d44d5435310` | 한 줄, 공백 유지 | `for` 뒤 BR | ✅ 실제 `span > br` 확인 | ✅ 모바일 전용 BR | KO 원문 재조회, 변경 없음 |
| INDA · Unified Project Management | `c36f8376-cdab-fac7-3fbd-5d44d5435312` | 한 줄, 공백 유지 | `Management` 뒤 BR | ✅ 실제 `span > br` 확인 | ✅ 모바일 전용 BR | KO 변경 없음 |
| INDA · expertise by numbers | stats-band `70dd3497-f30a-4522-1474-238af9149ac3`, 제목 `70dd3497-f30a-4522-1474-238af9149ac7` | 한 줄 | `expertise` 뒤 BR | ✅ EN 컴포넌트 콘텐츠 재조회 | ✅ 2줄 | EN 컴포넌트 locale만 변경 |
| INDA · 하단 배너 | `32ae536c-de24-b091-bbef-0bfaf230f658` | 기존 영문 2줄 | 같은 문법 위치에서 2줄 | ✅ EN `titleMobile` 재조회 | ✅ 영문 유지 | KO 변경 없음 |
| Data Analytics · Learning with AL = SVM | `8fc8402e-9e25-6607-5308-eb0ae4bd9706` | 한 줄, `SVM (Support` 사이 공백 유지 | `SVM` 뒤 BR | ✅ 실제 `span.is-br-only-mobile > br` 재조회 | ✅ 390·767 표시 / 768·1440 숨김 규칙 확인 | KO 대응 노드 재조회, 변경 없음 |
| What is eDiscovery · U.S. Litigation 체크포인트 | `0be29763-fff9-0e31-188a-0cebb2c7e3c9` | 한 줄 | `Preparing` 뒤 BR | ✅ 실제 `span > br` 확인 | ✅ 2줄 | KO 원문 재조회, 변경 없음 |
| K-Discovery · 본문 제목 전체 | 페이지 `6a531cf5199ab832e2a92655` | 기존 자연 줄바꿈 | 구문 단위 자연 줄바꿈 유지 | ✅ EN 저장값 전체 재조회 | ✅ 390px 실측, 문법 단위 이상 없음 | 변경 없음 |
| LPO · 본문 제목 전체 | 페이지 `6a90e69e85b0d836c3e1cd94` | 기존 BR·자연 줄바꿈 유지 | 법률 용어 묶음과 절 경계 유지 | ✅ EN 저장값 전체 재조회 | ✅ 390·1440px 실측, 본문 추가 BR 불필요 | 변경 없음 |
| Litera · 소개 제목 | `116f67ae-b07b-7a28-1dcd-47a5fc44f764` | 기존 BR 유지 | 기존 BR 숨김 | ✅ EN 페이지 CSS 재조회 | ✅ 고립된 `That` 제거, 자연스러운 3줄 | KO 변경 없음 |

## EN Consulting

기존 사이트의 `?cc=en` 영어 모드와 현재 Webflow EN을 함께 확인했다. 서비스명·제도명·법률 및 보안 용어를 하나의 의미 단위로 유지하고, 자연 줄바꿈이 이미 문법적으로 적절한 제목은 변경하지 않았다.

| 페이지 · 부분 | 요소/인스턴스 ID | 768px 이상 목표 | 767px 이하 목표 | 구현 | 확인 |
|---|---|---|---|---|---|
| Data Security · 하단 배너 | `be1391f9-1df0-d2a3-865a-694ba956935f` | 기존 2줄 유지 | `If you have questions about` / `Data Security,` / `consult with an expert today.` | 실제 DOM에 연결된 `title`에 BR 2개 저장, 첫 BR만 모바일 표시 | ✅ MCP 재조회·390·1440px 모의 검증 |
| NCT · 소개 제목 | `108e6cb9-caf2-de1f-4166-de8965d102d0` | `National Core Technology (NCT)` / `Data Security Consulting` | `National Core` / `Technology (NCT)` / `Data Security Consulting` | 제목 값 하나와 EN NCT 범위의 첫 BR 표시 규칙 | ✅ 390·767·768·1440px, 가로 넘침 없음 |
| NCT · All-in-One 제목 | `545a1671-d977-6b3f-a362-190a44f28a78` | 기존 3개 의미 단위 유지 | `to` 고립을 없애고 `to Security Environment Setup`을 같은 의미 단위로 유지 | 기존 세 번째 모바일 BR 위치를 `Assessment` 뒤로 이동 | ✅ MCP 재조회·390px 모의 검증 |
| NCT · 하단 배너 | `327a1805-463a-0f73-3487-4652b94d4bbe` | 기존 2줄 유지 | `If you have questions about` / `National Core Technology,` / `consult with an expert today.` | 실제 DOM에 연결된 `title`에 BR 2개 저장, 첫 BR만 모바일 표시 | ✅ MCP 재조회·390·1440px 모의 검증 |
| Corporate AI Implementation · 하단 배너 | `f4c85ce6-29f6-bccb-9dac-07f05704b4f8` | 서비스명을 분리하지 않는 2줄 | `If you have questions about` / `Corporate AI Implementation,` / `consult with an expert today.` | 기존 `title`·`titleMobile` 사용 | ✅ MCP 재조회·390·1440px 모의 검증 |

- Data Security의 소개 제목과 주요 섹션 제목, NCT의 `Why Build...` 제목, Corporate AI Implementation의 소개·Legal Data 제목은 390px 자연 줄바꿈이 구문 단위를 보존해 유지했다.
- 기존 사이트의 영어 모바일 배너도 `질문 도입부 / 서비스명 / 상담 문장` 구조를 사용한다. 현재 문장에서는 `consult with`와 각 서비스명을 분리하지 않도록 줄 위치를 다듬었다.
- Consulting 작업으로 새 클래스나 새 컴포넌트를 만들지 않았다. EN NCT 소개 제목과 Data Security·NCT 배너의 첫 BR 표시 규칙만 기존 `id-en-responsive-br-20260924` 블록에 페이지·locale 범위로 추가했다.

## EN 공통 컴포넌트 교차 점검

INDA부터 Corporate AI Implementation까지 sub-visual의 제목·설명과 banner의 desktop·mobile 값을 한 세트로 재조회했다. 공개 DOM도 390·1440px에서 비교했다.

| 페이지 · 부분 | 발견 사항 | 처리 |
|---|---|---|
| What is eDiscovery · 배너 | EN `titleMobile` override가 빠져 모바일에서도 데스크톱 2줄 값 사용 | 기존 native `titleMobile` prop에 `If you have questions about` / `eDiscovery,` / `consult with an expert today.` 3줄 복구. 인스턴스 `53ec59d5-9da0-aea1-a26e-1854b7dbb734` |
| Data Analytics · 배너 | 모바일 값에 BR이 없어 `today.`가 단독 줄로 떨어짐 | `If you have questions about` / `eDiscovery,` / `consult with an expert today.`로 `titleMobile` 수정 |
| K-Discovery · sub-visual 설명 | 390px에서 `Framework`가 단독 줄로 떨어짐 | 모바일은 `eDiscovery Solutions for` / `Korea's Discovery Framework`, 데스크톱은 한 줄 |
| LPO · sub-visual 설명 | 값 끝에 불필요한 개행과 BR이 저장됨 | 후행 개행 제거, 모바일 자연 2줄·데스크톱 한 줄 유지 |
| Data Security · 배너 | 해당 variant의 실제 DOM은 `titleMobile` 대신 `title`을 표시해 `Security,`가 단독 줄로 남음 | 실제 `title`과 페이지 범위 BR 규칙으로 수정 |
| NCT · 배너 | 해당 variant의 실제 DOM은 `titleMobile` 대신 `title`을 표시해 `Core Technology,` 앞에서 갈림 | 실제 `title`과 페이지 범위 BR 규칙으로 수정 |

- INDA·What is eDiscovery·Data Analytics의 eDiscovery 배너는 desktop 2줄과 mobile 3줄 값을 각각 저장했으며 MCP 재조회로 같은 구문 경계를 확인했다.
- K-Discovery와 LPO 배너는 실제 390px DOM에서 각각 의도한 3줄 값이 사용되는 것을 확인했다.
- 모든 수정은 EN locale과 해당 페이지 ID로 제한했다. 공통 컴포넌트 정의와 KO 값은 변경하지 않았다.

## EN 모바일 배너

EN `titleMobile`에 한국어가 들어 있던 값을 같은 인스턴스의 기존 EN `title`을 기준으로 수정했다. 문장 자체를 새로 번역하지 않고 기존 영문 표현을 유지했다.

| 페이지 · 배너 | 인스턴스 ID | 390px 결과 |
|---|---|---|
| Reveal | `40d7bd03-1c98-28bb-0ce8-f4c9c2eec11f` | 4줄, 고립 단어 없음 |
| Relativity | `472f16ae-0f3e-3a5d-107e-34c706dc016a` | 3줄 |
| Nymi Band | `4d2cefd0-67e4-7f9a-b2e2-aca86c34909f` | `Nymi® Band`를 같은 줄에 유지한 3줄 |
| Legal System | `c2fb436c-b837-9a99-15c8-e68ff7299ddf` | 3줄 |
| Docusign IAM | `0c4ccce2-becb-46ae-84e8-41122dab173f` | `For inquiries about`부터 의미 단위로 나눈 4줄 |
| Docusign eSignature | `f05a945b-27c7-df61-3a67-9a05dda486e9` | 영문 구문 기준 5줄 |
| Docusign CLM | `88cf449a-c5fb-d48b-69cd-3ad79b3b12df` | `For inquiries about`부터 의미 단위로 나눈 4줄 |
| K-Discovery | `fc8dc063-0e69-9e59-dc5e-9c9ccf84d9f8` | `Preparing for Korea’s` / `discovery requirements?` / `Consult with an expert today` 3줄 |
| LPO | `9d24966e-fc4c-344d-748d-b76b3a855ed7` | `For professional support in` / `cross-border litigation,` / `consult with our experts.` 3줄 |

## EN Solutions

Solutions의 12개 페이지를 sub-visual 제목·설명, 본문 제목, 하단 banner의 desktop·mobile 값까지 한 세트로 점검했다. Docusign은 IAM·eSignature·CLM 세 탭을 각각 검사했다. 기존 사이트의 영어 모드와 현재 문법을 참고하되, 현재 컴포넌트 폭에서 단어가 고립되는 경우에는 의미 단위가 유지되도록 줄 위치를 조정했다.

| 페이지 · 부분 | 요소/인스턴스 ID | 처리 | 저장 확인 | 390/1440 검증 |
|---|---|---|---|---|
| Docusign · IAM 배너 | `0c4ccce2-becb-46ae-84e8-41122dab173f` | desktop 3줄, mobile 4줄의 별도 native prop 사용 | ✅ `title`·`titleMobile` 재조회 | ✅ 고립 단어·가로 넘침 없음 |
| Docusign · eSignature 파트너 제목 | `7bae793e-a9a1-3259-f6f1-03a35f3ba1e3` | 모바일에서 `Docusign® in South Korea.`를 한 구문으로 유지 | ✅ 제목 재조회 | ✅ 390px 3줄, 1440px 기존 흐름 유지 |
| Docusign · eSignature Part 11 제목 | `b97376e3-195c-8cc8-093f-a1764a4cd51f` | `Solutions`를 고립시키던 강제 개행 제거 | ✅ 제목 재조회 | ✅ 자연 줄바꿈 |
| Docusign · eSignature 시장 리더 제목 | `c5ffacc0-7a2d-57d8-55ef-6f926eb08d27` | `Docusign®`을 고립시키던 강제 개행 제거 | ✅ 제목 재조회 | ✅ 자연 줄바꿈 |
| Docusign · eSignature 배너 | `f05a945b-27c7-df61-3a67-9a05dda486e9` | desktop 4줄, mobile 5줄로 구문 분리 | ✅ `title`·`titleMobile` 재조회 | ✅ `solutions,` 단독 줄 제거·가로 넘침 없음 |
| Docusign · CLM 배너 | `88cf449a-c5fb-d48b-69cd-3ad79b3b12df` | desktop 3줄, mobile 4줄의 별도 native prop 사용 | ✅ `title`·`titleMobile` 재조회 | ✅ 고립 단어·가로 넘침 없음 |
| Legal System · 소개 제목 | `36c3aab7-4d71-4942-077c-77f4915e4bad` | `that transforming`을 `that improves`로 문법 수정. desktop은 기존 문장 경계, mobile은 세 문법 단위 | ✅ 제목·BR 3개·페이지 범위 규칙 재조회 | ✅ 390px 3줄·1440px 2줄, 넘침 없음 |
| Legal System · 배너 | `c2fb436c-b837-9a99-15c8-e68ff7299ddf` | 세 의미 단위로 통일 | ✅ `title`·`titleMobile` 재조회 | ✅ 문장 단위 3줄 |
| Luminance · 소개 설명 | `99d26f8a-7ba8-dfe3-1c56-7f12666d4a34` | 남아 있던 국문을 자연스러운 영문 한 문장으로 교체 | ✅ subtitle 재조회 | ✅ EN 한글 잔존 검사 통과 |
| Luminance · 파트너 제목 | `5c76b8c0-9c8e-2d87-cf68-d6e36e01f773` | 임시 표기 `[SB3]`와 후행 공백 제거 | ✅ 제목 재조회 | ✅ 자연 줄바꿈 |
| Luminance · 배너 | `eb32677a-58f0-fef0-c7e7-0a9d68e04062` | 문장·파트너 표현 기준 3개 구문 | ✅ 제목 재조회 | ✅ 390px 4줄·1440px 3줄, 넘침 없음 |
| Litera · 신뢰도 제목 | `d44b9fa7-210e-ab66-f72b-48b70a6c8249` | `Litera,` 고립 BR 제거, 완전한 문장으로 정리 | ✅ 제목 재조회 | ✅ 자연 줄바꿈 |
| Litera · 배너 | `3e0d5abc-f0fd-7feb-2ec2-d4a4016d12ca` | `Korea`가 단독 줄이 되지 않도록 3개 구문으로 정리 | ✅ 제목 재조회 | ✅ 고립 단어 없음 |
| Kiteworks · 소개·규정 제목 | `70a54c7b-c622-ed22-40f7-225bd15de9da`, `1161ae25-c824-acbe-83ff-ba1f2a338f4a` | 기존 BR이 390/1440 모두 자연스러워 유지 | ✅ 저장값 확인 | ✅ 별도 CSS 불필요 확인 |
| ESG Management · 배너 | `24ff9e6b-9a12-1613-e22a-f4bdba0fac34` | 질문과 CTA를 세 의미 단위로 분리 | ✅ 제목 재조회 | ✅ 390/1440 가로 넘침 없음 |
| Nymi Band · 소개 제목 | `7b80b9c2-d2dd-63d6-d36f-475434c70ad2` | 모바일은 `Nymi Band`를 한 줄로, desktop은 기존 2줄로 유지 | ✅ 제목·페이지 범위 규칙 재조회 | ✅ 390px 3줄·1440px 2줄 |
| Nymi Band · 배너 | `4d2cefd0-67e4-7f9a-b2e2-aca86c34909f` | 제품명을 분리하지 않는 3줄로 통일 | ✅ `title`·`titleMobile` 재조회 | ✅ 구문 단위 확인 |
| Endpoint Protector | 페이지 `6a531d274cd6203ae8487109` | sub-visual·본문·배너의 자연 줄바꿈이 적절해 유지 | ✅ EN 전체 저장값 검사 | ✅ 추가 BR 불필요 |
| SessionGuardian · 배너 | `ffdca5a6-5343-4250-87b5-379b60c1ffbf` | 한국어였던 mobile 값을 EN 3줄로 수정 | ✅ `titleMobile` 재조회 | ✅ 제품명 분리 없음 |
| TypingDNA · 중복 제목 | `489b3c78-646a-8bd9-81c4-805eedd266f6` | 중복 `Authentication` 제거 | ✅ 제목 재조회 | ✅ 2줄 |
| TypingDNA · 배너 | `8691701c-e2d7-5de2-d779-9adc53b06331` | 한국어였던 mobile 값을 EN 3줄로 수정 | ✅ `titleMobile` 재조회 | ✅ 제품명 분리 없음 |
| Relativity | 페이지 `6a531d2986942d09a5322247` | sub-visual·본문·배너의 기존 의미 단위 유지 | ✅ EN 전체 저장값 검사 | ✅ 추가 BR 불필요 |
| Reveal · 소개 제목 | `dd46b26b-0c85-fd37-e73f-dfd507e139e8` | mobile은 `official Reveal® partner` 뒤 BR, desktop은 기존 2줄 | ✅ 제목·페이지 범위 규칙 재조회 | ✅ 390px 3줄·1440px 2줄 |

### EN Solutions 본문 제목

sub-visual과 banner뿐 아니라 Solutions 12개 페이지 및 Docusign 세 탭의 `h2`~`h5` 본문 제목을 390px에서 다시 검사했다. 자연 줄바꿈으로 마지막 단어가 고립되는 본문 제목에는 새 BR을 개별 저장하지 않고, 모바일에서만 브라우저 native 속성 `text-wrap: balance`를 적용했다. 적용 대상은 각 Solutions page ID 아래의 `.section-title__title-text`, `.section-content-title`, `.section-micro-title`로 한정했다.

| 페이지 · 부분 | 요소/인스턴스 ID | 390px 결과 | 1440px 영향 |
|---|---|---|---|
| Legal System · Difficulties in Reviewing International Contracts | `5f290d5d-2a64-e800-8971-a803f47d29a2` | `Difficulties in Reviewing` / `International Contracts` | 한 줄 유지 |
| Legal System · Key Features of a Legal Management Solution | `15088fbd-37a6-e936-f3e1-7cd36d2c9629` | `Key Features of a Legal` / `Management Solution` | 한 줄 유지 |
| Docusign · A More Efficient Way to Manage Agreements | `a2a87927-b4bc-0cff-227a-34818883a7b6` | `A More Efficient Way to` / `Manage Agreements` | 기존 흐름 유지 |
| Docusign CLM · Reducing Manual Work in Contract Management | `125afca4-5d58-3bfa-559a-eb184da899a4` | `Reducing Manual Work in` / `Contract Management` | 기존 2줄 유지 |
| Luminance · Business-Wide Contract Orchestration | `20c191e8-8c9a-48fb-d4c5-79ee8d4a154a` | `Business-Wide` / `Contract Orchestration` | 한 줄 유지 |
| ESG · Core features of the compliance solution | `d5444aef-1b1f-431c-7251-b9241b5f4fcf` | `Core features of the` / `compliance solution` | 한 줄 유지 |
| SessionGuardian · Companies using Microsoft Solutions | `9453f992-18d6-3357-44c7-cdb5aa91d540` | `Companies using` / `Microsoft Solutions` | 한 줄 유지 |
| TypingDNA · Basic Principles of TypingDNA Authentication | `c943a14f-b956-8093-645e-e7cb78ed1e85` | `Basic Principles of` / `TypingDNA® Authentication` | 한 줄 유지 |
| Relativity · Core Features | `d2412bad-53f3-174c-db45-691cb6f2ed9f` | `Core Features of the` / `Relativity® Solution` | 한 줄 유지 |
| Reveal · global AI solution | `00e64b11-5989-8ebd-804e-2918c31366e5` | `The most powerful global AI` / `solution, Reveal®` | 한 줄 유지 |

#### Kiteworks·ESG 정확한 문법 경계

`text-wrap: balance`만으로 핵심 명사구가 보장되지 않는 제목은 EN locale 값 하나에 필요한 BR 후보를 저장하고, page·section·직계 BR 순번으로 desktop/mobile 표시를 분리했다.

| 페이지 · 부분 | 요소/인스턴스 ID | 390px | 1440px |
|---|---|---|---|
| Kiteworks · sub-visual 설명 | `1629455d-6a66-b9c2-9b9c-c8701c2fbce3` | `Robust Secure File Transfer Protocol` / `for Enterprises` | 한 줄 |
| Kiteworks · intro 질문 | `70a54c7b-c622-ed22-40f7-225bd15de9da` | `Is your company's` / `critical data` / `being transmitted securely?` | 기존 2줄 |
| Kiteworks · Integrate 제목 | `b0cc82a3-7d33-40d9-5682-558a32fbf44e` | `Integrate, track, control,` / `and protect your company’s` / `file sharing internally and externally.` | 기존 2줄 |
| ESG · sub-visual 설명 | `4a0e958f-e11d-ba69-cc0a-42731d2a329b` | `Corporate Compliance and` / `Regulatory Management Solution` | 한 줄 |
| ESG · intro 제목 | `172e1188-93ce-08e2-1011-2dd624fdda99` | `Regulatory compliance` / `solutions tailored` / `for your company` | 기존 2줄 |
| ESG · overview 제목 | `effc3e55-8ec1-004c-853d-c201b5d86bce` | `Speak with Intellectual Data` / `to develop a system for` / `managing regulatory compliance` | 기존 2줄 |
| ESG · Core features 제목 | `d5444aef-1b1f-431c-7251-b9241b5f4fcf` | `Core features of the` / `compliance solution` | 한 줄 |

7곳 모두 390·1440px 모의 화면에서 가로 넘침이 없음을 확인했고, MCP로 EN 저장값과 `id-en-responsive-br-20260924` 규칙을 다시 조회했다.

#### Nymi Band부터 TypingDNA까지

Nymi Band, Endpoint Protector, SessionGuardian, TypingDNA의 sub-visual·intro·본문·카드 제목·banner를 390·1440px에서 다시 검사했다. 자연 줄바꿈은 기존 `text-wrap: balance`를 사용하고, 제품명이나 문법 단위가 고립되는 최소 범위만 기존 텍스트 값과 BR로 정리했다.

| 페이지 · 부분 | 요소/인스턴스 ID | 390px | 1440px |
|---|---|---|---|
| Nymi Band · sub-visual 설명 | `9ee8c418-acf0-fba5-21ec-7e24550cae2a` | `Wearable Digital Security Solutions` / `for Regulated Environments` | 같은 2줄 |
| Nymi Band · Hardware | 기존 `Cleanroom Grade Monitors,` 텍스트 | `Cleanroom Grade Monitors,` / `Tablets and Terminals` | 기존 2줄 |
| Endpoint Protector · sub-visual 설명 | `9dfda1f3-6c4a-5520-484c-87f3681ad57f` | `Endpoint Security Solution` / `to Prevent Data Breaches` | 같은 2줄 |
| Endpoint Protector · intro 제목 | `d3c3d4b4-e975-a438-ca2c-c3fc696bcc9c` | 기존 BR 2개 숨김, 모바일 폭에 따른 자연 줄바꿈 | 기존 문법 단위 3줄 유지 |
| SessionGuardian · sub-visual 설명 | `ca6ba27d-e83d-c322-1cbd-af2aad627fd0` | `Security Solution for Real-Time User` / `Verification and Authentication` | 같은 2줄 |
| SessionGuardian · intro 제목 | `b18b37c0-af5c-ddcb-4f6a-bd3da2797eef` | `Real-time monitoring security` / `solution designed for optimal` / `remote work protection` / `with SessionGuardian®` | 기존 2줄 |
| SessionGuardian · industries 제목 | `c076654f-bd37-4905-1b6f-de5271ab4647` | `SessionGuardian® is essential` / `for information security` / `across industries` | 기존 2줄 |
| TypingDNA · sub-visual 설명 | `0c7a6fd4-6e15-c10f-4069-63c35b4129c7` | `Typing pattern-based continuous` / `authentication solution` | 같은 2줄 |
| TypingDNA · ActiveLock 제목 | `31789669-4240-a159-2400-22e574d16c4a` | `ActiveLock Continuous` / `Authentication Through` / `Typing Patterns` | 한 줄 |

- Nymi Hardware는 새 BR을 만들지 않고 기존 `Monitors,` 뒤 BR을 유지했다. 모바일에서 해당 제목에만 `white-space: nowrap`을 적용했으며 228px 실제 폭에서 가로 넘침이 없음을 확인했다.
- Endpoint intro는 전용 예외 규칙을 제거해 공통 intro 규칙대로 기존 BR 2개를 모바일에서 숨긴다. 데스크톱은 원래 3줄을 유지한다. SessionGuardian intro는 새 BR 없이 모바일 `text-wrap: balance`만 사용한다.
- `Content Aware Protection`, `Privileged Access Management`, `SessionGuardian® VDI` 같은 좁은 카드의 짧은 제품·기능명은 강제 줄바꿈을 추가하지 않았다.
- 네 페이지의 하단 banner는 기존 `title`·`titleMobile` 값을 재조회했다. Nymi Band·SessionGuardian·TypingDNA의 모바일 영문 값과 Endpoint Protector의 기존 영문 배너가 유지됐다.
- 변경값 12개와 `id-en-responsive-br-20260924`의 단일 규칙 블록을 MCP로 재조회했다. 390·1440px 모의 화면에서 대상 9곳 모두 가로 넘침이 없었다.
- EN 규칙 전체 재검사에서 일부 추가 블록의 개행이 실제 줄바꿈이 아닌 문자 `n`으로 저장된 것을 발견했다. EN 블록 안의 48개 토큰을 실제 개행으로 정규화했으며 규칙 내용과 선택자 범위는 변경하지 않았다.
- 정규화 후 브라우저 CSSOM에서 EN 블록의 27개 규칙이 모두 파싱되는 것을 확인했다. EN marker 1개, `<style>` 1개이며 `display: contents`는 없다. 모든 반응형 보정은 `html:lang(en)`과 page ID 아래로 제한돼 있다.

#### Nymi Band·TypingDNA 추가 모바일 BR 정리

| 페이지 · 부분 | 요소/인스턴스 ID | 390px 목표와 확인 | 1440px 목표와 확인 | MCP 저장 확인 |
|---|---|---|---|---|
| Nymi Band · intro 제목 | `7b80b9c2-d2dd-63d6-d36f-475434c70ad2` | `with` 뒤 BR 1개 표시 · `inline` | 같은 BR 숨김 · `none` | [x] |
| Nymi Band · wearable 제목 | `17036d55-ea7b-b9a1-8056-2be9f8c062f1` | `security and` 뒤 기존 BR 숨김 · `none` | 기존 BR 유지 · `inline` | [x] |
| TypingDNA · intro 본문 | `6cb85ab1-363f-9f73-763a-1405dcb8650e` | `TypingDNA®` 뒤 기존 BR 숨김 · `none` | 기존 BR 유지 · `inline` | [x] |
| TypingDNA · Verify 2FA 제목 | `31789669-4240-a159-2400-22e574d16c57` | 불필요한 BR 자체 제거 | 같은 한 문장 | [x] |
| TypingDNA · ActiveLock 제목 | `31789669-4240-a159-2400-22e574d16c4a` | `Through` 뒤 BR 표시 · `inline` | 같은 BR 숨김 · `none` | [x] |

- [x] 숨긴 BR 양쪽의 공백을 저장값에서 확인했다. `TypingDNA® effectively`와 `Through Typing`은 BR이 숨겨져도 붙지 않는다.
- [x] Nymi intro 값은 `with` 뒤 BR 하나만 남겼다. 해당 BR은 Nymi EN 페이지 범위에서 데스크톱 `none`, 모바일 `inline`로 분리했다.
- [x] 저장된 EN 규칙은 marker 1쌍이고 문자 `n`과 `display: contents`가 없다.
- [x] EN 반응형 BR 블록은 페이지·locale 선택자의 우선순위와 선언 순서만 사용한다. 불필요한 `!important` 17개를 제거했으며 현재 블록 내 `!important`는 0개다.
- [x] 390·1440px 브라우저 모의 검증에서 5곳 모두 목표한 BR 표시 상태와 공백을 확인했으며 가로 넘침이 없었다.
- [ ] 퍼블리시 후 실제 EN Nymi Band·TypingDNA 페이지를 390·767·768·1440px에서 재확인한다.

#### Relativity®·Reveal® EN 점검

기존 사이트의 영어 모드와 현재 공개 페이지를 390·1440px에서 대조하고 sub-visual, intro, 본문 제목·설명, 카드와 하단 banner를 확인했다.

| 페이지 · 부분 | 요소/인스턴스 ID | 390px | 1440px | 처리 |
|---|---|---|---|---|
| Relativity · sub-visual 설명 | `3fc7c092-8d2d-a618-34d9-1d84529b20f5` | 폭에 따른 자연 2줄 | 한 줄 | 기존 값 유지 |
| Relativity · intro 제목 | `d5b23cb6-1fc5-da72-d9ae-ac8c9662b92b` | 기존 BR을 숨기고 자연 줄바꿈 | 기존 2줄 | 기존 공통 intro 규칙 유지 |
| Relativity · Core Features 제목 | `d2412bad-53f3-174c-db45-691cb6f2ed9f` | `Core Features of the` / `Relativity® Solution` | 한 줄 | `the` 뒤 BR 1개, 페이지 범위 `none → inline` |
| Relativity · Expert 제목 | `50ea62c9-459c-8114-7994-c8a0d6404f06` | 한 줄 | 한 줄 | 제목 끝의 빈 BR 제거 |
| Relativity · corporate environment 제목 | `4621426f-4620-f8a3-58c3-5f43957bdeb1` | 문법 단위 2줄 | 한 줄 | 기존 모바일 BR 유지 |
| Relativity · 하단 banner | `472f16ae-0f3e-3a5d-107e-34c706dc016a` | 모바일 값의 3줄 | 데스크톱 값의 2줄 | 기존 컴포넌트 prop 유지 |
| Reveal · intro 제목 | `dd46b26b-0c85-fd37-e73f-dfd507e139e8` | `Intellectual Data is the` / `official Reveal® partner` / `in Korea` | 기존 2줄 | 기존 페이지 범위 BR 규칙 유지 |
| Reveal · AI solution 제목 | `00e64b11-5989-8ebd-804e-2918c31366e5` | 자연스러운 2줄 | 한 줄 | 강제 BR 없음 |
| Reveal · 하단 banner | `40d7bd03-1c98-28bb-0ce8-f4c9c2eec11f` | 모바일 값의 3줄 | 데스크톱 값의 2줄 | 기존 컴포넌트 prop 유지 |

- [x] Relativity의 새 규칙은 EN locale·Relativity page ID·`sub-rela-features__aside`로 한정했다.
- [x] 390px에서 새 BR은 `inline`, 1440px에서는 `none`이며 두 폭 모두 가로 넘침이 없다.
- [x] Reveal은 현재 문법 단위와 기존 사이트 의도가 이미 맞아 새 BR과 CSS를 추가하지 않았다.
- [x] EN 반응형 BR 블록의 `!important`는 0개이며 `display: contents`와 문자 `n`이 없다.
- [ ] 퍼블리시 후 Relativity®·Reveal® EN 페이지를 390·767·768·1440px에서 재확인한다.

- `Implementation Support`, `Reveal Expert`, `Content Aware Protection`처럼 폭이 좁은 카드의 짧은 2단어 라벨은 문법 오류가 아니므로 강제 BR을 추가하지 않았다.
- Docusign Part 11의 `Module Functionality`, Luminance의 `Customer Segregation`, Kiteworks의 `FedRAMP Certified`, Nymi의 `Pharma Manufacturers`처럼 정적 rich text 안의 고정 명사구는 HTML 내부의 줄바꿈 금지 공백으로 묶었다.
- Legal System 소개 제목은 자동 균형만으로는 `that`이 고립되어, desktop `A legal management solution that / improves operational efficiency`, mobile `A legal management solution / that improves / operational efficiency`로 BR 표시를 분리했다.

- Solutions 작업에서 새 클래스나 컴포넌트는 만들지 않았다. 대부분 기존 컴포넌트의 EN `title`·`titleMobile`·`subtitle` 값을 사용했다.
- 반응형별 같은 속성값에서 서로 다른 BR이 필요한 Nymi Band와 Reveal만 기존 `id-en-responsive-br-20260924` 블록에 `html:lang(en)`·page ID·직계 BR 위치로 한정한 규칙을 추가했다.
- Kiteworks는 기본 BR 자체가 390px과 1440px에서 자연스러워 별도 모바일 규칙을 최종 제거했다.
- 12개 Solutions 페이지의 EN 저장 콘텐츠에서 한글, `[SB…]` 임시 표기, `Authentication` 연속 중복을 다시 검사해 잔존 항목이 없음을 확인했다.
- 변경한 EN 요소의 KO locale 대응값을 재조회했다. 모든 조회 가능한 대응 노드는 기존 국문 값을 유지했다. Nymi 배너는 KO에 별도 locale override가 없어 기본값을 상속한다.
- [ ] 퍼블리시 후 Docusign 세 탭과 Solutions 12개 페이지를 390·767·768·1440px 실제 화면에서 재확인한다.

## EN 숨김 BR 공백 보정

390px 또는 1440px에서 BR이 숨겨질 때 단어가 붙는 사례를 공개 화면에서 찾아 EN locale 값의 개행 앞에 일반 공백을 추가했다. BR 위치와 문구는 유지했다.

| 페이지 | 요소/인스턴스 ID | 보정 경계 |
|---|---|---|
| Careers | `ed20b853-4863-9403-2ebe-3100e73b647b` | `spanning / eDiscovery` |
| SessionGuardian | `5498ebae-92c1-781f-2ccb-781a06b98864` | `Features / for` |
| ESG Management | `effc3e55-8ec1-004c-853d-c201b5d86bce` | 제목 `system / for`, 설명 `CEOs / and` |
| Kiteworks | `3233b869-0ece-476e-9a72-6cc122335543` | `founding / member` |
| NCT | `d84b8675-4a53-f5c4-4cc8-e3fb20a9554c` | `Systems / for`, `NCT / with` |
| NCT | `545a1671-d977-6b3f-a362-190a44f28a78` | `for / National`, `Security, / from`, `to / Security` |
| Relativity | `4621426f-4620-f8a3-58c3-5f43957bdeb1` | `solutions / to` |
| TypingDNA | `31789669-4240-a159-2400-22e574d16c57` | `Authentication / Without` |
| TypingDNA | `57268873-f7e9-e149-e74e-43f5c3ce47c9` | `Solution / Preferred` |

## EN 검증 기록과 남은 확인

### Company EN · 390px 점검

| 페이지 · 부분 | 요소/인스턴스 ID | 처리 | 저장 확인 | 390px 확인 |
|---|---|---|---|---|
| About Us · Legal Tech Services 제목 | `9c17f1bf-3f56-6947-a1aa-eede2ce8c645` | Home과 동일한 `h2 section-head-title bold text-title` 적용 | [x] | [x] 공개 DOM 모의 적용 시 `Legal Tech Services for Global` / `Success of Korean Enterprises` |
| About Us · 서비스 섹션 컨테이너 | `605ac8e0-8ede-b658-1563-569a3c9c0c14` | 레거시 `no-container`를 Home과 같은 `u-no-container`로 교체 | [x] | [x] 제목 폭 350px |
| About Us · Values 본문 3곳 | `7b656a66-45a7-9b86-2e92-59b7600e81dc` 외 2곳 | `all else`, `are committed`, `innovation and` 공백 복구 | [x] | [ ] 게시 후 화면 확인 |
| About Us · Our Standard 설명 | `7e123e50-dd6f-e5c0-a13f-3be76e046fac` | 혼입된 한국어와 잘못된 중첩 요소 제거, 완전한 영문 문장으로 교체 | [x] | [ ] 게시 후 화면 확인 |
| Insights · 목록 sub-visual | `ba5a9c2e-60e9-3bd7-4b70-c39101ada8d8` | 영문 설명과 `Contact Us` 적용, 강제 BR 없음 | [x] | [ ] 게시 후 화면 확인 |
| Insights · 상세 sub-visual | `dd8f9b4c-da8c-125f-a072-c1f4bda75d12` | 목록과 동일한 영문 설명 적용 | [x] | [ ] 게시 후 화면 확인 |
| Insights · 목록 소개 본문 | `647dc184-c2cb-c80a-f0ce-81599b00b652` | 상속된 국문을 영문으로 교체 | [x] | [ ] 게시 후 화면 확인 |
| Newsroom · 상세 sub-visual | `ea647be6-d7ac-93f2-1814-6787acc446e0` | 목록과 동일한 영문 설명·BR 구조 적용 | [x] | [ ] 게시 후 화면 확인 |
| Careers · intro 제목 | `ed20b853-4863-9403-2ebe-3100e73b647b` | `with` 뒤 BR 추가, EN Careers 범위에서 모바일만 표시 | [x] | [x] 390·767·768·1440px 모의 검증 |
| Careers · PM 소개와 benefits 카드 제목 | `962a5f14-3d64-0639-89ad-93b2e27c31e4` 및 benefits 카드 6개 | `top-tier` 교정. 카드마다 분류명/설명 1개 BR 유지. `Time Off & Renewal`, `Wellness`, `Employee Support` 문구 정리 | [x] | [x] 390px에서 각 카드 2줄·가로 넘침 없음 |
| Careers·Locations · eDiscovery 하단 배너 | `0d998df8-26bb-fad6-2d84-eceb2b04589f`, `23fbc704-afad-ae11-ff5b-d6ced9efa54e` | 데스크톱 기존 2줄 유지. 모바일은 `questions` / `eDiscovery,` 뒤 BR로 3개 문법 단위 구성 | [x] | [x] 390·767·768·1440px 모의 검증 |
| Locations · 섹션 제목 | `ce3d1bee-98e9-6e88-c945-572fd18e8513` | 영문 locale에 남은 국문을 `Supporting Clients Around the World`로 교체 | [x] | [ ] 게시 후 화면 확인 |

- [x] Company 목록 5개와 Insights·Newsroom 상세 템플릿의 EN 저장 콘텐츠에서 보이는 한국어를 재검사해 잔존 항목이 없음을 확인했다.
- [x] Newsroom 목록·상세 설명과 Insights 목록·상세 설명이 각각 완전히 같은 값임을 MCP 재조회로 확인했다.
- [x] 전역 BR CSS, 공통 `sub-visual` 컴포넌트 정의와 KO locale 값은 변경하지 않았다.
- [ ] 퍼블리시 후 Company EN 페이지와 CMS 상세 페이지를 390·767·768·1440px에서 재확인한다.

- EN 공개 정적 페이지 34개를 390px에서 순회해 제목의 실제 줄 배열, 활성 BR, 가로 넘침, 보이는 한국어를 검사했다. 보호 페이지는 인증 화면까지만 확인했다.
- 저장 후 MCP에서 EN 모바일 배너 7개, INDA 대상 7개, What is eDiscovery 1개, stats-band 컴포넌트 내용을 재조회했다.
- 저장 CSS를 현재 공개 DOM에 임시 적용해 390·767·768·1440px에서 INDA와 Litera의 BR 표시 상태를 확인했다. 390px에서 대상 요소의 가로 넘침은 없었다.
- KO locale의 대응 노드를 재조회해 국문 원문과 기존 BR 값이 유지됨을 확인했다.
- K-Discovery와 LPO는 공개 페이지를 Chromium으로 390·1440px에서 직접 렌더링해 모든 `h1`~`h5`의 실제 줄 배열과 BR 표시 상태를 비교했다. 본문 제목은 법률 용어와 문장 구문이 보존되어 추가 BR을 넣지 않았다.
- Data Analytics의 `SVM` 뒤 모바일 BR은 공통 유틸리티를 그대로 사용한다. 공개 CSS 계산값은 390·767px에서 `span: contents`, `br: inline`, 768·1440px에서 `br: none`이었다.
- K-Discovery와 LPO 하단 배너는 별도 CSS 없이 기존 `titleMobile` 값에 390px용 문법 경계를 저장했다. 데스크톱과 같은 한 번의 BR만 쓰면 각각 `requirements?`가 고립되고 `cross-border`가 갈라져, 의미 단위 3줄로 조정했다. 세 변경 모두 MCP 재조회로 확인했으며 KO 대응 값은 유지됐다.
- Consulting 3개 페이지는 기존 사이트 영어 모드와 현재 공개 페이지를 대조했다. EN 저장값 5곳과 NCT 페이지 범위 규칙을 재조회했으며, KO 대응 노드의 값과 기존 BR은 변경되지 않았다.
- 공통 컴포넌트 교차 점검에서 `titleMobile` 저장 여부만으로 판단하지 않고 실제 공개 DOM의 연결값을 확인했다. Data Security·NCT는 실제 `title`을 보정했고, Data Analytics·K-Discovery·LPO의 모바일 값과 sub-visual 값을 추가 정리했다.
- [ ] 퍼블리시 후 EN 실제 페이지를 390·767·768·1440px에서 재확인한다.
- [ ] EN 배너 7개의 실제 모바일 variant 전환과 문장 배열을 확인한다.
- [ ] INDA stats-band 컴포넌트의 모바일 BR과 데스크톱 한 줄 상태를 확인한다.
- [ ] 퍼블리시 후 Data Analytics의 `SVM` 뒤 BR과 K-Discovery·LPO 모바일 배너 경계를 실제 페이지에서 재확인한다.
- [ ] 퍼블리시 후 Data Analytics 배너, K-Discovery·LPO sub-visual, Data Security·NCT 배너를 390·1440px에서 재확인한다.

## EN 최종 전체 감사 · Legal / Resources / CMS View

2026-09-24 기준 Webflow MCP 저장값과 현재 공개 사이트를 함께 검사했다. 공개 사이트는 아직 이번 Designer 변경이 게시되지 않은 상태이므로 **MCP 저장 확인**과 **공개 화면 확인**을 분리했다.

### Legal·Resources·View 확인

| 페이지 · 부분 | page/element ID | 확인 및 처리 | MCP 저장 | 공개 390px |
|---|---|---|---|---|
| Terms of Use | `6a48bf39f4a8532139b6c0f3` | 제목·Article 1~6·Supplementary Provision 전체 영문 확인. 강제 BR 없이 자연 줄바꿈 유지 | [x] | [x] 가로 넘침 0 |
| Privacy Policy and Cookie Policy | `6a48bf3823d56c4e12728cf2` | 제목·수집 항목·Cookie·U.S. 사용자 권리·담당자 정보 전체 영문 확인. 문장 중간의 기존 정보 구분 BR만 유지 | [x] | [x] 가로 넘침 0 |
| Private Resources 목록 | `6a587d49ad6bb9a4a35cea16` | `Download`, `No resources are currently available.` 영문 확인 | [x] | [x] 401 보호 화면, 한국어 노출 0 |
| Private Resources View | `6a587ccd5538ad94bffb2767` | `Back to Resources`, `Download PDF` 영문 확인 | [x] | [ ] 인증 후 실제 CMS item 화면 확인 |
| Careers View | `6a51d9909532a35d28ba4d80` | `Back to List` 저장 확인. 공개 EN 상세 샘플의 제목·본문·버튼 한국어 노출 0 | [x] | [x] |
| Insights View | `6a508428578978d6ae556d00` | 목록과 같은 sub-visual 설명 유지. 공개 EN 상세 샘플의 제목·본문 한국어 노출 0 | [x] | [x] |
| Newsroom View | `6a50840a1b7df41d1cf52e7e` | 목록과 같은 sub-visual 설명·`Contact Us` 유지. 공개 EN 상세 샘플 한국어 노출 0 | [x] | [x] |
| Release Notes 목록 | `6a48b6c27b53afca3f2c8f38` / `e3d2f3c3-e063-fb21-1fba-552eb9aeb444` | 상속된 국문 설명과 CTA를 영문화. 빈 결과 문구를 `No release notes match your filters.`로 변경 | [x] | [ ] 게시 후 확인 |
| Release Notes View | `6a51b6b07ac4cedebadca69b` / `8980455e-20dd-79b6-04ca-0337f3b6e2ee`, `c97d513d-4db1-05c9-3cf1-e59edd0168ab` | `Download Attachment`, `Back to Release Notes`로 영문화 | [x] | [ ] 게시 후 확인 |

### 전체 EN 저장값 정리

| 페이지 · 부분 | 처리 | KO 영향 확인 |
|---|---|---|
| Home · expertise 카드 4개 | 상속된 국문 설명을 자연스러운 영문으로 교체. 불필요한 강제 BR 없음 | [x] KO 원문 4개 유지 |
| Home · 서비스 설명 2개 | 끝에 남아 있던 빈 BR과 zero-width 문자 제거 | [x] EN locale만 변경 |
| Home · 데이터센터 수량 단위 | 보이는 `개`를 `locations`로 영문화 | [x] KO `개` 유지 |
| INDA · 숨김 상태 단계 설명 8개 | locale 전환이나 상태 변경 때 국문이 노출되지 않도록 영문화 | [x] KO 원문 유지 |
| INDA · 기업 소송 실적 eyebrow | `Experience Supporting Major Litigation for Leading Korean Companies`로 영문화 | [x] KO eyebrow·title·description 유지 |
| INDA · eDiscovery 배너 모바일 | `questions about` / `eDiscovery,` / `consult…` 3개 문법 단위로 native `titleMobile` 수정 | [x] KO `titleMobile` 유지 |
| What is eDiscovery · 프로세스 제목 2개 | `Upload, Process and Extract`, `Redact, Convert and Produce`의 zero-width 문자 제거 | [x] EN locale만 변경 |
| Kiteworks · 기능 라벨 6개 | zero-width 문자를 제거하고 필요한 기존 BR만 정상 `<br>`로 유지 | [x] EN locale만 변경 |
| Reveal · solution 카드 | `Cloud & On-Premise Solution` 뒤 zero-width 문자 제거 | [x] EN locale만 변경 |

### 코드·반응형 검증

- [x] EN 정적 페이지 33개와 공개 CMS 상세 경로를 합쳐 36개 경로를 390px·1440px에서 렌더링했다. Contact Us·Release Notes·Search는 `domcontentloaded` 방식으로 재검사해 최초 `networkidle` 타임아웃을 해소했다.
- [x] Terms·Privacy·Contact·Search·Careers View·Insights View·Newsroom View에서 보이는 한국어와 가로 넘침이 없음을 확인했다. Private Resources는 401 보호 화면까지 확인했다.
- [x] EN locale 저장 콘텐츠 39개 page/template을 검사하고, 변경 후 Home·INDA·What is eDiscovery·Kiteworks·Reveal·Release Notes 목록/View를 다시 조회했다. 한국어 잔존, zero-width 문자, 문자형 `n`은 0건이다.
- [x] `id-en-responsive-br-20260924` 블록은 `html:lang(en)`과 page ID로 범위가 제한돼 있으며 `!important` 0개, `display: contents` 0개, 문자형 `n` 0개다.
- [x] 현재 공개 HTML의 같은 EN 블록도 `!important` 0개와 `display: contents` 0개다. 공개 HTML 전체의 `!important`는 Webflow 런타임 기본값과 header 패널의 열림·닫힘·접근성 상태 강제에 사용된다. EN BR 처리와 무관하며 제거 시 메뉴 상태가 깨질 수 있어 유지했다.
- [x] 새 클래스, 새 컴포넌트, 새 전역 선택자, 새 `!important`를 추가하지 않았다. 콘텐츠 변경은 EN locale override만 사용했다.
- [x] 변경한 Home·INDA·Release Notes 목록/View의 KO 기본값을 element tree에서 재조회해 원문이 유지됨을 확인했다.
- [ ] 이번 Designer 저장값은 퍼블리시하지 않았다. 게시 후 390·767·768·1440px에서 Release Notes 목록/View, Private Resources 인증 후 View, 새 EN 문구의 실제 글줄을 최종 확인한다.

## Search 최종 확인 · KO / EN

2026-09-24 기준 Webflow MCP 2.1 저장값과 현재 공개 사이트의 실제 검색 동작을 확인했다. `/search`는 locale을 유지한 채 커스텀 검색 페이지 `/search-results`로 이동한다.

| 대상 | 확인 및 처리 | MCP 저장 | 공개 화면 |
|---|---|---|---|
| KO `/search` → `/search-results` | 한국어 경로 유지, 검색 전·결과 있음·결과 없음 상태 정상 | [x] 기존값 유지 | [x] 390·767·768·1440px |
| EN `/en/search` → `/en/search-results` | 영문 경로 유지, 검색 전·결과 있음·결과 없음 상태 정상 | [x] | [x] 390·767·768·1440px |
| EN 검색 UI | 제목, 입력 placeholder/aria-label, 버튼, 필터, 정렬, 결과 그룹, 빈 결과 문구 모두 영문 | [x] | [x] 보이는 한국어 0건 |
| EN 검색 소개 문장 | 누락된 `insights`를 추가해 `Search Intellectual Data’s services, solutions, insights, and company information.`으로 정리 | [x] node `3a0b4bd6-8800-5955-bc13-60bf0efdad63` | [ ] 게시 후 확인 |
| EN 커스텀 검색 SEO | `Search Results | Intellectual Data`와 영문 description 적용 | [x] page `6a5712fdce899e8aeda21466` | [ ] 게시 후 확인 |
| EN 유틸리티 검색 SEO | 리다이렉트 전 원본 `/en/search`에도 같은 영문 SEO 적용 | [x] page `6a61af015f4ff90620be3089` | [ ] 게시 후 확인 |

- [x] `eDiscovery`, `Docusign`, 무결과 검색어를 KO/EN에서 실행했다. EN 결과 제목·설명·링크는 영문 locale을 사용했고 KO 결과는 기존 한국어를 유지했다.
- [x] 네 breakpoint에서 검색 페이지 가로 넘침과 JavaScript page error는 0건이었다.
- [x] 이번 변경은 EN locale의 소개 문장과 두 EN 페이지의 SEO metadata에만 한정했다. 공통 검색 스크립트·스타일·컴포넌트·KO 콘텐츠는 변경하지 않았다.
- [ ] 퍼블리시 후 EN 문서 제목과 meta description, 수정된 소개 문장을 재확인한다.

## EN 데스크톱 BR 회귀 점검

2026-09-24 기준 EN 정적 페이지 34개의 저장된 heading·banner 값을 다시 조회하고, 기존 사이트 영어 모드와 현재 공개 DOM을 1440px 기준으로 비교했다. 모바일용 개행이 데스크톱 `title`에 저장된 항목만 수정했다.

> **정정:** 아래 최초 점검표에서 “강제 BR 제거”로 기록한 항목 중 작업 전 데스크톱에 의도적 BR이 있던 제목은 후속 「KO·EN 데스크톱 BR 기준 정정 및 원상 복구」 결과가 최종 기준이다. 자연 줄바꿈 여부가 아니라 작업 전 저장된 BR 위치를 우선한다.

| 페이지 · 부분 | 데스크톱 처리 | 모바일 처리 | 저장 확인 |
|---|---|---|---|
| Careers · eDiscovery 배너 | 강제 BR 제거, 1440px 자연 2줄 | `questions about` / `eDiscovery,` / `consult…` 3줄 유지 | [x] |
| Locations · eDiscovery 배너 | 강제 BR 제거, 1440px 자연 2줄 | 3줄 `titleMobile` 추가·유지 | [x] |
| Nymi Band · 배너 | 강제 BR 제거, 1440px 자연 2줄 | 기존 3줄 유지 | [x] |
| ESG Management · 배너 | 강제 BR 제거, 1440px 자연 2줄 | 3줄 `titleMobile` 추가 | [x] |
| Litera · 배너 | 강제 BR 제거, 1440px 자연 2줄 | 기존 문법 단위 3줄 유지 | [x] |
| Luminance · 배너 | 강제 BR 제거, 1440px 자연 2줄 | 기존 문법 단위 3줄 유지 | [x] |
| Legal System · 배너 | 강제 BR 제거, 1440px 자연 2줄 | 기존 3줄 유지 | [x] |
| Docusign IAM · 배너 | 데스크톱 강제 BR 제거, 1440px 2줄 | 기존 모바일 값 유지 | [x] |
| Docusign eSignature · 배너 | 간결한 영문으로 정리하고 강제 BR 제거, 1440·1920px 2줄 | 기존 모바일 값 유지 | [x] |
| Docusign CLM · 배너 | 데스크톱 강제 BR 제거, 1440px 2줄 | 기존 모바일 값 유지 | [x] |
| NCT · 배너 | 데스크톱 강제 BR 제거, 1440px 자연 2줄 | 기존 3줄 유지 | [x] |
| Data Security · 배너 | 데스크톱 강제 BR 제거, 1440px 자연 2줄 | 기존 3줄 유지 | [x] |
| Docusign · Why Your Business Needs | 강제 BR 제거. 1440·1920px 모두 한 줄 | 자연 줄바꿈 | [x] |
| Docusign · Part 11 | `Solutions` 뒤의 문법 경계로 2줄 정렬 | 동일 의미 경계 유지 | [x] |
| ESG · intro / system / core features | 모바일용 4줄 분절 제거. 기존 사이트의 desktop 구문과 자연 배치 적용 | 자연 줄바꿈 | [x] |
| Legal System · intro | 모바일용 4줄 분절 제거 | 자연 줄바꿈 | [x] |
| Kiteworks · intro / integrate 제목 | intro 강제 BR 제거, integrate는 기존 사이트와 같은 desktop 2줄 | 자연 줄바꿈 | [x] |
| Reveal · partner 제목 | 모바일식 3줄 분절 제거 | 자연 줄바꿈 | [x] |
| SessionGuardian · industries 제목 | 모바일식 3줄 분절 제거 | 자연 줄바꿈 | [x] |
| NCT · 긴 섹션 제목 2개 | 기존 사이트에서도 각각 3줄·4줄임을 확인해 원래 구문 경계 유지 | 기존 구조 유지 | [x] |

- [x] 전체 EN banner 저장값을 재조회했다. 데스크톱 `title`에 2개 이상의 강제 개행이 남은 배너는 0건이다.
- [x] Docusign eSignature 탭을 1440·1920px에서 모의 적용해 `Why Your Business Needs Docusign® Now` 1줄, Part 11 제목 2줄, 하단 배너 2줄을 확인했다.
- [x] Docusign의 짧은 카드 제목은 기존 사이트에서도 의도적으로 2~3줄이므로 유지했다.
- [x] NCT의 긴 제목은 기존 사이트 영어 모드의 desktop BR과 같게 유지했다.
- [x] 변경은 EN locale property override에 한정했다. KO 콘텐츠, 공통 컴포넌트, 전역 CSS, `!important`는 변경하지 않았다.
- [ ] 퍼블리시 후 1440·1920px 실제 화면과 390·767px 모바일 `titleMobile` 전환을 다시 확인한다.

## KO·EN 데스크톱 BR 기준 정정 및 원상 복구

2026-09-24 최종 기준은 **데스크톱을 한 문장으로 통일하는 것이 아니라, 작업 전 데스크톱에 저장되어 있던 의도적 BR 위치를 그대로 보존하는 것**이다. 모바일용 개행이 공용 `title`/`description` 값에 섞여 데스크톱 위치까지 바뀐 경우에만 변경 전 저장 스냅샷과 사용자 지정 원문으로 복구한다. Docusign은 사용자가 직접 수정한 현재 Designer 저장값을 기준으로 유지한다.

| locale · 페이지 · 부분 | 복구한 데스크톱 기준 | 저장 재조회 |
|---|---|---|
| KO · INDA · `누구보다 더 eDiscovery를 잘 알고 있습니다.` | BR 없음 | [x] |
| KO · NCT · All-in-One 제목 | BR 없음 | [x] |
| KO · Data Analytics · intro | `절약해 주는` 뒤의 기존 BR 1개 유지 | [x] |
| KO · Legal System · intro | `것만으로도` 뒤의 기존 BR 1개 유지 | [x] |
| EN · INDA · Steps / We Know | 기존 데스크톱 BR 없음 | [x] |
| EN · NCT · intro | `National Core Technology (NCT)` 뒤의 기존 BR 1개 유지 | [x] |
| EN · NCT · All-in-One | 변경 전 4줄의 세 BR 위치 그대로 복구 | [x] |
| EN · K-Discovery · sub-visual description | 기존 데스크톱 BR 없음 | [x] |
| EN · Kiteworks / ESG / Nymi / Endpoint / SessionGuardian / TypingDNA · sub-visual description | 기존 데스크톱 BR 없음 | [x] |
| EN · Endpoint · intro | 변경 전 3줄의 두 BR 위치 그대로 복구 | [x] |
| EN · TypingDNA · ActiveLock | `Authentication` 뒤의 기존 BR 1개 유지 | [x] |
| EN · Relativity · Core Features | 기존 데스크톱 BR 없음 | [x] |
| EN · Careers · intro | 기존 데스크톱 BR 없음 | [x] |
| EN · Corporate AI · banner | `Corporate AI` 뒤의 기존 BR 1개 유지. 모바일 `titleMobile`은 별도 유지 | [x] |
| EN · Docusign 전체 | 사용자의 현재 수동 수정값 보존, 이번 복구에서 미변경 | [x] |
| EN · Data Security / NCT · banner | 문장 경계의 기존 데스크톱 BR 1개 복구 | [x] |
| EN · Legal System · intro / banner | 현재 영문 문구를 유지하면서 기존 데스크톱 2줄 구조 복구 | [x] |
| EN · Luminance · banner | 두 문장 사이의 기존 데스크톱 BR 복구 | [x] |
| EN · Litera · 주요 제목 / banner | 변경 전 의미 단위의 기존 데스크톱 BR 복구 | [x] |
| EN · Kiteworks / ESG · intro | 변경 전 데스크톱 BR 복구 | [x] |
| EN · ESG / Nymi · banner | 문장 경계의 기존 데스크톱 BR 복구 | [x] |
| EN · SessionGuardian · industries | `for` 앞의 기존 데스크톱 BR 복구 | [x] |
| EN · TypingDNA · Verify 2FA | `Authentication` 뒤의 기존 데스크톱 BR 복구 | [x] |
| EN · Reveal · partner 제목 | `the` 뒤의 기존 데스크톱 BR 복구 | [x] |
| EN · Locations / Careers · eDiscovery banner | 문장 경계의 기존 데스크톱 BR 복구 | [x] |

- [x] 위 EN 16개 property를 수정 후 MCP 2.1로 다시 읽어 기대값과 문자 단위로 일치함을 확인했다.
- [x] 추가로 발견한 EN 16개 property도 복구 후 MCP 2.1 재조회 결과 16/16 일치했다.
- [x] 위 KO 4개 component instance를 수정 후 다시 조회해 저장값을 확인했다.
- [x] 공통 컴포넌트 정의, 공통 BR 유틸리티, 전역 CSS, `!important`는 변경하지 않았다.
- [x] 이번 복구는 저장된 데스크톱 콘텐츠 값만 바로잡았으며 publish하지 않았다.
- [ ] 모바일 전용 개행은 데스크톱 값에 추가하지 않고, 기존 `titleMobile` 또는 BR 자체에 적용되는 모바일 전용 구조로만 후속 확인한다.
- [ ] 게시 후 390·767·768·1440px에서 실제 표시를 다시 확인한다.

## K-Discovery spacing 보완

- [x] page `6a531cf5199ab832e2a92655`, section `7e217134-0243-f360-9227-24e18a21c49f`의 클래스 체인을 `sub-kdisc-expert u-section-padding`에서 `sub-kdisc-expert u-section-padding-top`으로 교체했다.
- [x] 기존 전역 `u-section-padding-top`을 재사용하고 Webflow 네이티브 콤보 `.sub-kdisc-expert.u-section-padding-top`만 생성했다. 별도 CSS와 `!important`는 추가하지 않았다.
- [x] MCP 2.1 재조회로 변경된 클래스 체인과 콤보 저장을 확인했다.
- [ ] 퍼블리시 후 실제 상단 패딩과 하단 패딩 제거 상태를 확인한다.

## Data Analytics·NCT BR 재수정

- [x] 공통 `is-br-only-mobile`을 Webflow native breakpoint로 정상화: desktop `display: none`, 767px 이하 `display: contents`.
- [x] 공통 `is-br-only-desktop`을 Webflow native breakpoint로 정상화: desktop `display: contents`, 767px 이하 `display: none`.
- [x] `!important`와 페이지별 CSS selector를 추가하지 않았다.
- [x] Data Analytics intro 제목을 `고객의 시간과 비용을 절약해 주는` / `AI 기반의 문서 검토 지원 기술`의 기존 desktop 2줄로 재저장했다. BR이 비활성화되더라도 `주는AI`로 붙지 않도록 경계 공백도 보존했다.
- [x] NCT All-in-One 제목을 desktop/mobile 두 native component instance로 분리했다. Desktop은 BR 없는 기존 문장, mobile은 `데이터 보안` 뒤 BR 1개만 가진다.
- [x] NCT의 새 모바일 instance에도 EN locale 제목과 설명을 별도로 저장해 국문 상속을 차단했다.
- [x] 두 NCT wrapper의 클래스, KO/EN 제목 property와 Data Analytics 제목 property를 MCP 2.1로 재조회했다.
- [ ] 퍼블리시 후 390·767·768·1440px 화면에서 표시 전환과 실제 BR을 확인한다.

## Docusign CLM intro 반응형 BR

- [x] Desktop instance `822be065-0ee3-e2f8-eccf-bf17d6e76fc1`: `Docusign CLM,` 뒤 BR 1개만 유지하고 `관리의` 뒤 BR은 제거했다.
- [x] Mobile instance `401652ad-94c5-8111-7f82-84a467d08171`: `Docusign CLM,`과 `계약 생애주기 관리의` 뒤 BR을 유지해 3줄로 설정했다.
- [x] Desktop wrapper `aa5ac9b8-b958-9148-b721-370d59c61ac4`에 `is-br-only-desktop`, mobile wrapper `1f601832-5fbc-cf1c-3bbc-cb024815bc17`에 `is-br-only-mobile`을 적용했다.
- [x] 모바일 instance의 EN locale에 기존 CLM 영문 제목·본문을 복사해 KO 상속을 차단했다.
- [x] MCP 2.1 재조회로 두 wrapper, 두 KO 제목값과 새 모바일 EN override를 확인했다.
- [ ] 퍼블리시 후 390·767·768·1440px에서 desktop/mobile 전환을 확인한다.

## KO BR 구조 재감사 · desktop 보존

2026-09-24 MCP 2.1 저장 구조를 다시 조회했다. 기준은 desktop의 기존 저장 BR을 보존하고, 767px 이하에서 다른 BR이 필요할 때 공용 prop을 덮어쓰지 않는 것이다.

| 페이지 · 부분 | 발견 원인 | 최종 구조 | 저장 재조회 |
|---|---|---|---|
| Data Analytics · intro | desktop의 `주는` 뒤 BR과 mobile의 `비용을`·`AI 기반의` 뒤 BR을 단일 `title` prop으로 관리해 마지막 저장값이 양쪽 breakpoint에 번갈아 노출됨 | desktop wrapper `62b45219-fa96-5709-cdd7-51ca7a04ee68` → 기존 instance `55c72db9-6030-893d-79b7-d5c312457205`; mobile wrapper `ecd6a28c-200e-c881-2102-f6426cfad1cf` → 새 instance `a7ea151c-46d3-af71-4603-627afa0ff90d`. Mobile은 `고객의 시간과 비용을` / `절약해 주는 AI 기반의` / `문서 검토 지원 기술` 3줄 | [x] KO props·EN override·wrapper tree |
| Legal System · intro | desktop 1개 BR과 mobile 2개 BR을 단일 `title` prop으로 관리 | desktop wrapper `ec113deb-9798-71fc-cff6-f3c939e171aa` → 기존 instance `36c3aab7-4d71-4942-077c-77f4915e4bad`; mobile wrapper `6fec98a2-03a8-e9c5-bb0c-1c502e886068` → 새 instance `173bd01b-6447-5d21-729b-548853b22081` | [x] KO props·EN override·wrapper tree |
| NCT · All-in-One | 이미 desktop/mobile instance가 분리돼 있었음 | desktop은 BR 없음, mobile instance `7c04faf5-8853-77fc-6974-5b03daeaa922`만 `데이터 보안` 뒤 BR | [x] 두 wrapper·KO title·EN override |
| Data Analytics · 능동적 학습 소제목 | `is-br-only-mobile`이 BR이 아니라 `strong` 전체에 붙어 desktop에서 문장 전체가 숨겨지는 구조 | `strong`은 `semibold`만 유지. mobile span `2bb5479b-7f9d-1813-cf5a-f3e7456e70ef` 안에 BR `7dc7ba84-0715-c5fb-e7d5-606860b1daca`만 배치 | [x] parent/children tree |
| Nymi Hardware · `Monitors,` | mobile span 안에 BR과 `Tablets and Terminals`가 함께 있어 desktop에서 뒤 텍스트도 사라지는 구조 | mobile span `9d0f6fb9-0f45-4570-b85d-450f4ba1423f`에는 BR만 유지하고 text `ac89e46e-41d2-4cbb-41a0-38fc5920ca04`는 sibling으로 이동 | [x] paragraph children tree |
| Docusign CLM · intro | 앞선 desktop/mobile 분리가 유지됨 | desktop은 `CLM,` 뒤 BR 1개, mobile은 `CLM,`·`관리의` 뒤 BR | [x] 두 instance prop |
| Litera·Nymi intro·SessionGuardian | desktop/mobile에서 같은 BR을 쓰는 요청 | 인스턴스 하나의 기존 BR을 유지. 추가 wrapper 생성 없음 | [x] 현재 title prop |
| INDA 설명 2곳·About 본문 | 모바일에서 기존 BR을 숨기는 요청 | 숨김 경계의 기존 일반 공백 유지 | [x] 현재 prop/DOM tree |

### 공통 유틸리티 재조회

- [x] `is-br-only-mobile` (`765275ab-67c2-188e-7ea8-fb9b91690bca`): main `display:none`, small `display:contents`.
- [x] `is-br-only-desktop` (`5a444c61-990a-08b4-493a-c4d75d9847ec`): main `display:contents`, small `display:none`.
- [x] 조건부 유틸리티가 텍스트 전체를 감싼 2건(Data Analytics strong, Nymi 뒤 텍스트)을 수정했다.
- [x] 새 `!important`, page ID selector, `nth-child`, custom CSS를 추가하지 않았다.
- [x] 새 mobile component instance의 EN locale override를 저장해 KO 상속을 막았다.
- [ ] 퍼블리시하지 않았다. 게시 후 390·767·768·1440px에서 실제 표시와 가로 넘침을 확인한다.

## KO·EN 조건부 표시 유틸리티 전수 재감사

2026-09-24 MCP 2.1로 전체 43개 페이지의 KO 기본 콘텐츠와 EN locale override를 다시 조회했다. `is-br-only-mobile`·`is-br-only-desktop`은 BR 자체 또는 검증된 desktop/mobile 쌍에만 쓸 수 있으며, 단독 sub-visual·section-title·본문 wrapper 전체에 붙이면 한 breakpoint에서 콘텐츠 전체가 사라진다.

| 페이지 · 부분 | 발견 상태 | 조치 | 저장 재조회 |
|---|---|---|---|
| LPO · sub-visual / intro / services 제목 | 단독 wrapper 3개에 `is-br-only-mobile`이 붙어 768px 이상에서 전체 콘텐츠가 숨겨짐 | wrapper의 조건부 표시 클래스 제거 | [x] 3/3 |
| Insights · sub-visual | 단독 wrapper 전체가 조건부 표시 대상 | 조건부 표시 클래스 제거 | [x] |
| INDA · DataCenter 설명 / VDR bullet / LPO 제목 / Insights 제목 | BR이 아닌 콘텐츠 wrapper 전체가 조건부 표시 대상 | 조건부 표시 클래스 제거 | [x] 4/4 |
| Careers · intro 제목 | 단독 wrapper 전체가 조건부 표시 대상 | 조건부 표시 클래스 제거 | [x] |
| About Us · 본문 wrapper 3개 | 단독 desktop/mobile 표시 클래스가 콘텐츠 전체를 숨김 | 조건부 표시 클래스 제거 | [x] 3/3 |
| Reveal · intro | 단독 wrapper 전체가 조건부 표시 대상 | 조건부 표시 클래스 제거 | [x] |
| Relativity · solution 제목 | 단독 wrapper 전체가 조건부 표시 대상 | 조건부 표시 클래스 제거 | [x] |
| TypingDNA · 제목 wrapper 2개 | 단독 wrapper 전체가 조건부 표시 대상 | 조건부 표시 클래스 제거 | [x] 2/2 |
| SessionGuardian · sub-visual / features 제목 | 단독 wrapper 전체가 조건부 표시 대상 | 조건부 표시 클래스 제거 | [x] 2/2 |
| LPO · 모바일 전용 BR span | span 안에 BR만 존재하는 정상 구조 | 유지 | [x] |
| Data Analytics / Legal System / NCT / Docusign CLM | desktop/mobile instance와 wrapper가 실제 쌍으로 존재하는 정상 구조 | 유지 | [x] |

### INDA 전문성 제목

- [x] KO 제목을 `누구보다 더` / `eDiscovery를 잘 알고 있습니다.`의 모바일 2줄로 저장했다.
- [x] EN 제목을 `We Know eDiscovery Better` / `Than Anyone Else`의 모바일 2줄로 저장했다.
- [x] desktop에서는 해당 BR을 숨기고 767px 이하에서만 표시하도록 `.is-br-desc-mobile .section-title__title-text br` 규칙을 사이트 head에 한 번만 추가했다.
- [x] 새 규칙에는 `!important`, page ID, locale selector, `nth-child`를 사용하지 않았다.
- [x] 컴포넌트 Plain Text prop 내부 BR에는 Webflow native class를 직접 지정할 수 없어, 기존 scope class에 한정한 최소 호환 규칙을 사용했다.

### EN 배너 문법과 빈 BR 정리

- [x] eDiscovery 공통 배너 5개(INDA, Data Analytics, What is eDiscovery, Careers, Locations)의 모바일 제목을 `If you have questions` / `about eDiscovery,` / `consult with an expert today.`로 통일했다. desktop의 기존 2줄 값은 유지했다.
- [x] LPO, Nymi, ESG, Docusign IAM, Docusign CLM, Corporate AI, NCT, Data Security의 모바일 배너를 전치사·목적어가 분리되지 않는 의미 단위로 조정했다. desktop 값은 변경하지 않았다.
- [x] EN 43개 페이지의 component string prop을 전수 검사해 문자열 끝의 불필요한 개행 63개를 제거했다. 문장 내부의 기존 desktop BR은 유지했다.
- [x] KO LPO 제목은 `검증된 전문성과 체계로 완성하는` / `해외소송 Legal Process Outsourcing`의 기존 2줄만 남기고 제목·설명 끝의 빈 BR을 제거했다.

### 최종 판정 규칙

- [x] `is-br-only-*`는 BR만 든 span 또는 실제로 쌍을 이루는 desktop/mobile wrapper에만 사용한다.
- [x] 단독 sub-visual, section-title, 본문, 카드 wrapper 전체에는 조건부 표시 클래스를 붙이지 않는다.
- [x] 모바일 수정 시 desktop prop을 기준값으로 잠그고 `titleMobile` 또는 별도 mobile instance만 변경한다.
- [x] EN 모바일 줄바꿈은 화면 폭뿐 아니라 전치사·관사·수식어와 목적어가 분리되지 않는지 확인한다.
- [x] 저장 후 element ID와 locale property를 다시 읽어 저장 확인과 화면 확인을 분리한다.
- [ ] 퍼블리시하지 않았다. 게시 후 390·767·768·1440px에서 실제 sub-visual·section-title·banner 표시와 가로 넘침을 최종 확인한다.

## KO·EN 조건부 wrapper 2차 전수 교정

사용자가 발견한 Docusign Part 11 제목을 기준으로 43개 페이지를 다시 조회했다. 앞선 점검은 스타일 이름 검색 결과만으로 판정해, 검색 인덱스가 누락한 wrapper를 놓쳤다. 이번 점검은 알려진 ID 재조회와 페이지별 조건부 클래스 조회를 함께 사용하고 내부 자식 트리까지 확인했다.

| 범위 | 발견 및 조치 | 저장 재조회 |
|---|---|---|
| Docusign · Part 11 제목 | 제목 전체 wrapper의 `is-br-only-mobile` 제거. 기존 BR을 `span.is-br-only-mobile > br`로 교체 | [x] 제목은 전 breakpoint 표시, BR span만 조건부 |
| Docusign · IAM 파트너 / testimonial / Legality Guide / eSignature 파트너 제목 | 대응 인스턴스가 없는 단독 wrapper의 조건부 표시 클래스 제거 | [x] 4/4 |
| Luminance | 단독 intro·section-title wrapper 6개의 조건부 표시 클래스 제거 | [x] 6/6 |
| Legal System · sub-visual | sub-visual 전체를 감싼 모바일 표시 클래스 제거 | [x] |
| Nymi intro / ESG / Kiteworks / Litera | 단독 콘텐츠 wrapper의 조건부 표시 클래스 제거 | [x] 4/4 |
| NCT · sub-visual / 필수 보안 제목 | 단독 콘텐츠 wrapper 2개의 조건부 표시 클래스 제거 | [x] 2/2 |
| Data Security / K-Discovery | 단독 section-title wrapper 4개의 조건부 표시 클래스 제거 | [x] 4/4 |
| eDiscovery · 4단계 제목 / Sanction 제목 | 제목 전체 wrapper 5개의 모바일 표시 클래스 제거. 각 기존 BR을 `span.is-br-only-mobile > br`로 교체 | [x] 5/5 heading tree |
| eDiscovery · Insights / Data Analytics · Insights | 단독 desktop wrapper의 조건부 표시 클래스 제거 | [x] 2/2 |
| INDA · 빈 wrapper | 불필요한 모바일 표시 클래스 제거 | [x] |

### 유지한 전체 wrapper

- [x] Data Analytics intro: desktop/mobile 컴포넌트가 실제 쌍이며 제목 개행값이 다르다.
- [x] Legal System intro: desktop/mobile 컴포넌트가 실제 쌍이며 제목 개행값이 다르다.
- [x] NCT All-in-One: desktop/mobile 컴포넌트가 실제 쌍이며 모바일만 `데이터 보안` 뒤 BR을 가진다.
- [x] Docusign CLM intro: desktop/mobile 컴포넌트가 실제 쌍이며 모바일에 BR이 하나 더 있다.
- [x] Docusign CLM 파트너 section-title: 동일 설명을 가진 desktop/mobile 대응 인스턴스가 존재한다.

### 검증 결론

- [x] 이번 2차 교정에서 단독 콘텐츠 wrapper 30개의 조건부 표시 클래스를 제거했다.
- [x] Docusign 1곳과 eDiscovery 5곳은 제목 wrapper 방식에서 BR span 방식으로 전환했다.
- [x] 변경된 wrapper와 새 BR span을 element ID로 다시 읽어 저장 구조를 확인했다.
- [x] 구조 클래스는 locale 공통이므로 KO와 EN에서 동일하게 콘텐츠 전체 숨김 문제가 해소된다. EN property override는 삭제하거나 덮어쓰지 않았다.
- [x] 공통 `is-br-only-mobile`·`is-br-only-desktop` 정의, 정상 desktop/mobile 쌍, `!important`, page ID CSS는 변경하지 않았다.
- [ ] 퍼블리시하지 않았다. 게시 후 390·767·768·1440px에서 KO·EN 실제 표시를 확인한다.

## NCT All-in-One 데스크톱 개행 조정 — 2026-09-25

- [x] 데스크톱 인스턴스 `545a1671-d977-6b3f-a362-190a44f28a78`의 제목을 `기술 현황 확인부터 보안 환경 구축까지` / `국가핵심기술(NCT) 데이터 보안 All-in-One 컨설팅`의 2줄로 변경했다.
- [x] 모바일 인스턴스 `7c04faf5-8853-77fc-6974-5b03daeaa922`는 기존 `데이터 보안` 뒤 모바일 BR을 유지했다.
- [x] 두 인스턴스의 title prop을 MCP 2.1로 재조회했다. EN locale override와 공통 표시 유틸리티는 변경하지 않았다.
- [ ] 퍼블리시하지 않았다. 게시 후 768·1440px 데스크톱과 390·767px 모바일 표시를 확인한다.

## EN 배너 및 네이티브 데스크톱 개행 정리 — 2026-09-25

### EN 배너

| 페이지 · 부분 | 데스크톱 목표 | 모바일 목표 | MCP 저장 재조회 |
|---|---|---|---|
| Docusign · IAM 배너 | `For inquiries about Docusign IAM solutions,` 뒤 BR | 문의 대상·솔루션명·파트너 문구를 4개 의미 단위로 분리 | [x] |
| Docusign · eSignature 배너 | `solutions,` 뒤 BR | `Docusign adoption and` / `eSignature solutions,` / 연락 문구 / 파트너 문구 | [x] |
| Docusign · CLM 배너 | `For inquiries about Docusign CLM solutions,` 뒤 BR | 문의 대상·솔루션명·파트너 문구를 4개 의미 단위로 분리 | [x] |
| Corporate AI · 배너 | `Corporate AI Implementation,` 뒤 BR로 복구 | 기존 모바일 3개 의미 단위 유지 | [x] |
| K-Discovery · 배너 | 질문 뒤 BR, 두 문장 모두 마침표 적용 | `Korea’s` / `discovery requirements?` / 상담 문장 | [x] |
| Data Analytics / INDA · 배너 | `If you have questions about eDiscovery,` / `consult with an expert today.` | `If you have questions` / `about eDiscovery,` / `consult with an expert today.` | [x] 2/2 |
| What is eDiscovery / Careers / Locations · 배너 | `If you have questions about eDiscovery,` / `consult with an expert today.` | 동일 문구를 3개 의미 단위로 분리 | [x] 3/3 |

### 데스크톱 원본 정리

| 페이지 · 부분 | 조치 | KO 저장 재조회 | EN 영향 확인 |
|---|---|---|---|
| Docusign · CLM 파트너 제목 | 불필요한 3줄을 문법 단위 2줄로 정리 | [x] | [x] EN override 유지 |
| Docusign · Why Your Business Needs | U+2028 특수 줄바꿈을 일반 개행 1개로 교체 | [x] | [x] EN 한 줄 유지 |
| Docusign · Part 11 | U+2028 특수 줄바꿈을 일반 개행 1개로 교체 | [x] | [x] EN 2줄 유지 |
| Docusign · IAM 파트너 / CLM 핵심 기능 | 문자열 끝의 빈 개행 제거 | [x] 2/2 | [x] EN override 유지 |
| Luminance · intro | 내부의 기존 데스크톱 BR은 유지하고 문자열 끝의 빈 개행만 제거 | [x] | [x] EN override 유지 |

- [x] 공통 banner/section-title/intro-title 컴포넌트 정의와 표시 클래스는 변경하지 않았다.
- [x] `!important`, locale/page ID CSS, JavaScript, 새 커스텀 클래스는 추가하지 않았다.
- [x] 개행은 기존 Webflow Plain Text component prop의 실제 줄바꿈으로만 저장했다.
- [x] KO 원본을 정리한 6개 인스턴스의 EN locale override를 다시 조회해 문구와 기존 EN 개행이 유지됨을 확인했다.
- [ ] 퍼블리시하지 않았다. 게시 후 390·767·768·1440px에서 실제 배너 줄 수와 자동 줄바꿈을 최종 확인한다.

## Data Analytics KO · Data Security EN 재교정 — 2026-09-25

| 페이지 · 부분 | 데스크톱 저장값 | 모바일 저장값 | MCP 재조회 |
|---|---|---|---|
| Data Analytics · intro 제목 | `고객의 시간과 비용을 절약해 주는` 뒤 개행 1개 유지 | 강제 개행을 모두 제거해 자연 줄바꿈으로 복구 | [x] |
| Data Security · banner | `If you have questions about Data Security,` 뒤 개행 1개 유지 | `If you have questions` / `about Data Security,` / `consult with an expert today.` | [x] |

- [x] Data Analytics는 기존 desktop/mobile intro-title 인스턴스 쌍을 그대로 사용했다. 데스크톱 wrapper는 main `display: contents`, mobile `display: none`; 모바일 wrapper는 main `display: none`, small `display: contents`임을 Webflow native style에서 재확인했다.
- [x] Data Security 배너의 기존 `titleMobile` 값을 실제 사용하도록 `showTitleMobile=true`로 설정했다. KO 기본값과 EN locale override를 각각 재조회했다.
- [x] 공통 banner 컴포넌트의 반응형 보조 규칙에서 중복된 데스크톱 규칙과 `!important` 2개를 제거했다. 모바일 대체 제목이 존재할 때 기본 제목만 숨기는 기존 조건은 유지했다.
- [x] page ID·locale selector·JavaScript·새 클래스는 추가하지 않았다.
- [ ] 퍼블리시하지 않았다. 공개 화면의 390·767·768·1440px 확인은 게시 후 수행한다.

## EN 배너 전수 재검증 — 2026-09-25

- [x] 공개 정적 페이지의 banner 컴포넌트 25개(23페이지)를 EN locale override와 기본 component prop으로 대조했다. draft `/components`의 카탈로그 인스턴스 4개는 공개 페이지 집계에서 제외했다.
- [x] EN `titleMobile`은 저장되어 있으나 기본 `showTitleMobile=false`라 실제로 사용되지 않던 8개를 활성화했다: Careers, Locations, ESG Management, Litera, Luminance, Corporate AI, NCT, What is eDiscovery.
- [x] 각 8개 배너의 KO `titleMobile`에는 기존 KO 데스크톱 문구를 그대로 복제해 KO 문구와 데스크톱 BR을 변경하지 않았다. EN에서는 기존 locale별 `titleMobile`이 우선 적용된다.
- [x] Data Security는 직전 수정의 `showTitleMobile=true`, EN desktop/mobile 문구와 공통 banner 규칙의 `!important` 제거 상태를 재확인했다.
- [x] 별도 모바일 제목이 없는 About Us, Endpoint Protector, Kiteworks는 390px 공개 화면을 실측했다. 각각 1줄, 문법 단위 3줄, 문법 단위 2줄로 표시되어 별도 모바일 prop을 만들지 않았다.
- [x] 나머지 배너는 기존 `showTitleMobile=true`와 EN `titleMobile` 저장값을 유지했다. Docusign의 탭별 배너 3개도 각각 확인했다.
- [ ] 퍼블리시하지 않았다. 이번 Designer 저장 변경 8개와 Data Security 변경은 게시 후 공개 화면에 반영된다.

## EN 데스크톱 개행 및 숨김 래퍼 교정 — 2026-09-25

| 페이지 · 부분 | 데스크톱 저장 결과 | 모바일 보호 방식 | MCP 저장 재조회 |
|---|---|---|---|
| LPO · Strategic Legal Support | `Strategic Legal Support` / `Throughout Cross-Border Litigation` | intro-title 공통 모바일 BR 숨김 유지 | [x] |
| LPO · Dedicated Infrastructure | `Dedicated Infrastructure Supporting` / `Cross-Border Litigation Operations` | 기존 `u-no-container` 유지 + `data-br-en=only-desktop` | [x] |
| INDA · FullDiscovery 소개 본문 | `Intellectual Data,` 뒤 BR, `U.S. litigation` 문법 보정 | `data-br-en-body=only-desktop`로 본문 BR만 숨김 | [x] |
| Data Analytics · intro 제목 | `AI-based document review technology` 뒤 BR | 기존 desktop/mobile 인스턴스 쌍 유지, mobile 값 불변 | [x] |
| Data Security · banner | `Data Security,` 뒤 BR | 기존 `titleMobile` 3줄 값 불변 | [x] |
| NCT · intro 제목 | `National Core Technology (NCT)` 뒤 BR | 기존 `is-br-keep`에 `data-br-en=only-desktop` 적용 | [x] |
| NCT · All-in-One 제목 | `Consulting for` / `Data Security,` 뒤 BR의 3줄 | 기존 mobile 전용 인스턴스 4줄 값 불변 | [x] |
| NCT · banner | `National Core Technology,` 뒤 BR | 기존 `titleMobile` 3줄 값 불변 | [x] |
| Docusign · 한국 최초 파트너 제목 | `official partner` 뒤 BR | 빈 래퍼의 `data-br-en=only-desktop` 속성으로 한정 | [x] |
| Legal System · intro 제목 | `solution` 뒤 BR | 기존 desktop/mobile 인스턴스 쌍 유지, mobile 3줄 값 불변 | [x] |
| Luminance · intro 제목 | `Legal-Grade™ AI` 뒤 BR | intro-title 공통 모바일 BR 숨김 유지 | [x] |
| Luminance · banner | 요청한 3개 문장 단위 3줄 | 기존 `titleMobile` 3줄 값 불변 | [x] |

### 전체 제목 숨김 오류 교정

- [x] `stats-band`의 `sub-inda-stats__head`에서 전체 wrapper의 `is-br-only-mobile`을 제거했다. 실제 BR 요소에만 `is-br-only-mobile`을 적용해 제목은 데스크톱에도 표시되고 BR은 모바일에서만 표시된다.
- [x] Docusign CLM의 `Proven Efficiency Gains with Docusign CLM` 전체 wrapper에서 `is-br-only-mobile`을 제거했다. 텍스트가 모든 breakpoint에서 표시됨을 element ID로 재조회했다.

### 공통 규칙 및 부작용 확인

- [x] site head에 `data-br-en=only-desktop`과 `data-br-en-body=only-desktop` opt-in 규칙을 1개 블록으로 저장했다. 페이지 ID, JavaScript, `!important`는 사용하지 않았다.
- [x] LPO `u-no-container`와 Docusign 빈 래퍼에는 `is-br-keep`을 추가하지 않았다. `display: contents`로 컨테이너 패딩이 사라지는 부작용을 피하고 opt-in 속성만 사용했다. 점검 중 만든 빈 combo style도 제거했다.
- [x] EN locale의 수정 대상 12개와 대응 mobile 값 6개를 다시 읽어 desktop/mobile 값이 섞이지 않았음을 확인했다.
- [x] KO component prop과 KO 문구는 변경하지 않았다. 구조 변경은 전체 wrapper 숨김 오류 2곳과 opt-in 속성 3곳에 한정했다.
- [ ] 퍼블리시하지 않았다. 게시 후 390·767·768·1440px에서 강제 BR, 자연 줄바꿈, 가로 넘침을 최종 확인한다.

## EN 데스크톱 BR 역전 교정 — 2026-09-25

| 페이지 · 부분 | 데스크톱 저장 결과 | 모바일 동작 | MCP 저장 재조회 |
|---|---|---|---|
| Kiteworks · intro | `critical data` 뒤 BR | BR 숨김, 공백을 보존해 자연 줄바꿈 | [x] |
| Kiteworks · 통합·추적·보호 제목 | `company’s` 뒤 BR | BR 숨김, `company’s file` 공백 유지 | [x] |
| ESG Management · intro | `solutions` 뒤 BR | BR 숨김, 자연 줄바꿈 | [x] |
| Nymi Band · intro | `with` 뒤 BR | 기존 요청대로 같은 BR 유지 | [x] |
| SessionGuardian · intro | `designed` 뒤 BR | BR 숨김, 자연 줄바꿈 | [x] |
| Home / About Us · Legal Tech Services 제목 | `Legal Tech Services` 뒤 BR | BR 숨김, 자연 줄바꿈 | [x] 2/2 |
| Careers · intro | `with` 뒤 BR | 기존 요청대로 같은 BR 유지 | [x] |
| Careers / Locations · eDiscovery 배너 | `If you have questions about eDiscovery,` 뒤 BR | 동일 원문을 `If you have questions` / `about eDiscovery,` / 상담 문장으로 분리 | [x] 2/2 |

- [x] 원인은 기존 EN 페이지별 규칙이 일부 BR을 데스크톱에서 숨기고 모바일에서 표시한 역전 상태였음을 확인했다.
- [x] 대상 wrapper 또는 제목에 `data-br-en` 속성만 추가했다. 전체 텍스트 wrapper에 `is-br-only-mobile`을 붙이지 않았다.
- [x] 사이트 head의 opt-in 규칙을 `1.1.3`으로 정리했다. `html:lang(en)`으로 한정하고 페이지 ID, JavaScript, `display: contents`, `!important`를 사용하지 않았다. 배너는 별도 desktop/mobile component prop만 사용하므로 opt-in 배너 selector도 제거했다.
- [x] 숨겨지는 BR 양쪽의 공백을 저장값에 남겨 `company’sfile`, `Security,consult` 같은 단어 결합을 방지했다.
- [x] Careers·Locations 배너의 기존 EN `titleMobile` 값을 재조회해 변경되지 않았음을 확인했다.
- [x] KO 문구와 component prop은 수정하지 않았다. 신규 표시 규칙도 `html:lang(en)`에서만 적용된다.
- [ ] 퍼블리시하지 않았다. 공개 화면의 390·767·768·1440px 실측은 게시 후 수행한다.

## EN 배너 390px 전수 실측 및 모바일 교정 — 2026-09-25

- [x] 공개 EN 정적 페이지 23개에서 banner 25개를 Chromium 390×844로 직접 렌더링했다. Docusign IAM·eSignature·CLM은 숨겨진 탭을 각각 활성화해 별도 측정했다.
- [x] 각 배너의 활성 제목, 실제 시각 줄 배열, `<br>` 표시 상태, 제목 영역 크기와 스크린샷을 `artifacts/en-banner-390`에 기록했다.
- [x] 수정안은 공개 화면과 같은 390px CSS 환경에 주입해 실제 줄 배열을 다시 측정한 뒤 Designer EN `titleMobile`에 저장했다.

| 페이지 · 배너 | 수정 전 390px | 최종 390px 목표 | Desktop 값 |
|---|---|---|---|
| INDA FullDiscovery | `Have questions about` / `eDiscovery? Consult with` / `an expert today.` | `If you have questions` / `about eDiscovery,` / `consult with an expert today.` | desktop과 동일 문구, 개행만 분리 |
| Data Analytics | 위와 동일한 혼합 3줄 | `If you have questions` / `about eDiscovery,` / `consult with an expert today.` | desktop과 동일 문구, 개행만 분리 |
| What is eDiscovery | `If you have questions` / `about eDiscovery,` / 상담 문장 | 문장 단위 2줄 | 변경 없음 |
| Careers | 위와 동일한 3줄 | 문장 단위 2줄 | 변경 없음 |
| Locations | 위와 동일한 3줄 | 문장 단위 2줄 | 변경 없음 |
| Luminance | `Luminance.` 단독 줄 | `Drive business efficiency` / `with Luminance.` / 도입 문장 / 파트너 문장 | 변경 없음 |
| Litera | `Intellectual` / `Data,` 분리 | 신뢰 문장 / `Implement Litera` / `with Intellectual Data,` / 파트너 문장 | 변경 없음 |
| ESG Management | 질문 구가 3줄로 분리 | `Need a corporate compliance and` / `regulatory management solution?` / 상담 문장 | 변경 없음 |

- [x] K-Discovery, LPO, Data Security, NCT, Corporate AI, Docusign 3개 탭, Legal System, Kiteworks, Nymi Band, Endpoint Protector, SessionGuardian, TypingDNA, Relativity, Reveal, About Us는 390px에서 문법 단위와 시각 균형이 허용 범위라 저장값을 유지했다.
- [x] 수정한 8개 배너의 EN desktop/mobile prop을 재조회했다. `titleMobile`만 변경됐고 desktop 제목은 유지됐다.
- [x] KO locale, 공통 banner 컴포넌트, 표시 클래스와 CSS는 변경하지 않았다.
- [ ] 퍼블리시하지 않았다. 실제 공개 화면은 게시 후 새 `titleMobile` 값으로 갱신된다.

## EN 배너 desktop·390px 최종 실측 및 native 정리 — 2026-09-25

- [x] 공개 EN 정적 페이지 23개, banner 25개를 Chromium `1440×900`과 `390×844`에서 다시 렌더링했다. Docusign의 숨겨진 IAM·eSignature·CLM 탭도 각각 활성화해 측정했다.
- [x] 아직 게시되지 않은 Designer 상태는 저장된 component prop과 정리된 header embed 규칙을 공개 DOM에 동일하게 모의 적용했다. 실제 시각 줄 배열, 활성 desktop/mobile 제목, BR의 `display` 상태를 각각 기록했다.
- [x] header embed의 `id-en-responsive-br-20260924`에서 banner를 page ID로 뒤집던 selector 8개를 제거했다. banner의 기본 제목과 모바일 제목은 기존 component의 native breakpoint 표시만 사용한다.
- [x] Careers·Locations에 임시로 붙였던 `data-br-en-banner`를 제거했고 site head `1.1.3`에서도 배너 selector를 제거했다.

| 페이지 · 배너 | 1440px 최종 줄 배열 | 390px 최종 줄 배열 | 저장 확인 |
|---|---|---|---|
| Data Security | 질문 / 상담 문장 | `If you have questions` / `about Data Security,` / 상담 문장 | [x] desktop·mobile prop |
| NCT | 질문 / 상담 문장 | `If you have questions` / `about National Core Technology,` / 상담 문장 | [x] desktop·mobile prop |
| Careers / Locations | `If you have questions about eDiscovery,` / 상담 문장 | `If you have questions` / `about eDiscovery,` / 상담 문장 | [x] 2/2 desktop·mobile prop |
| Docusign IAM | 문의 대상 / 연락 문장 / 파트너 자격 | 4개 의미 단위 | [x] |
| Docusign eSignature | 문의 대상 / 연락 문장 / 파트너 자격 | 4개 의미 단위 | [x] |
| Docusign CLM | 문의 대상 / 연락 문장 / 파트너 자격 | 4개 의미 단위 | [x] |
| ESG Management | 질문을 두 의미 단위로 분리 / 상담 문장 | 동일한 3개 의미 단위 | [x] |
| Nymi Band | 도입 구문 / 제품 질문 / 상담 문장 | 동일한 3개 의미 단위 | [x] |

- [x] 나머지 17개 배너는 기존 저장값을 유지했다. 1440px와 390px에서 전치사·제품명·파트너 자격이 단독으로 고립되지 않고 가로 넘침도 없었다.
- [x] EN desktop용 Enter는 `Content/title`, 모바일 전용 Enter는 `Content/titleMobile`에만 저장했다. 공통 class, KO locale, JavaScript, `!important`는 추가하거나 변경하지 않았다.
- [x] 저장 후 Docusign 3개, ESG, Nymi의 desktop prop을 MCP로 재조회해 정확한 개행을 확인했다.
- [x] 실측 자료는 `artifacts/en-banner-1440/audit.json`, `artifacts/en-banner-390/audit.json`과 각 페이지 PNG에 기록했다.
- [ ] 퍼블리시하지 않았다. 게시 후 실제 공개 URL에서 같은 두 viewport를 다시 확인한다.

### 최종 종료 확인

- [x] MCP에서 Docusign 3개 탭, ESG Management, Nymi Band의 최신 EN desktop prop을 재조회해 저장값과 계획한 개행이 일치했다.
- [x] 1440px: 23페이지·25개 배너 모두 활성 제목 1개, 한 단어 고립 줄 0건.
- [x] 390px: 23페이지·25개 배너 모두 활성 제목 1개, 한 단어 고립 줄 0건.
- [x] desktop 기본 제목과 mobile 전용 제목이 동시에 노출되는 인스턴스 0건.
- [x] KO locale 변경 0건, 공통 banner 구조 변경 0건, 신규 `!important`·JavaScript·page-ID BR 규칙 0건.
- [x] INDA·Data Analytics에서 모바일 문구가 `Questions about eDiscovery?`로 축약돼 있던 불일치를 발견해 desktop과 동일한 원문으로 복구했다. 모바일은 개행 위치만 3줄로 분리했다.
- [x] Docusign CLM 모바일 파트너 명칭에서 빠져 있던 `Docusign`을 복구해 desktop과 동일한 `Docusign CLM Sell Specialized Partner` 문구로 맞췄다. 390px에서는 문구를 바꾸지 않고 5개 의미 단위로 개행했다.
- [x] 최종 정규화 대조에서 desktop/mobile 문구 차이 0건을 확인했다. 두 prop의 차이는 BR 위치뿐이다.

## Data Analytics KO desktop intro BR 복구 — 2026-09-25

- [x] desktop instance `55c72db9-6030-893d-79b7-d5c312457205`의 제목 값에 `주는` 뒤 개행 1개가 저장돼 있음을 재확인했다.
- [x] 별도 desktop/mobile instance 구조와 `is-br-only-desktop` / `is-br-only-mobile` wrapper가 이미 있으므로, 과거 단일-title 구조용 Data Analytics page-ID BR selector만 제거했다.
- [x] desktop에서는 공통 `is-br-only-desktop` 규칙으로 BR이 표시되고, mobile instance의 제목과 EN locale의 두 제목 값은 변경하지 않았다.

## KO stats BR 구조 및 EN eDiscovery 배너 원문 복구 — 2026-09-25

| 대상 | 최종 저장값 · 구조 | 검증 |
|---|---|---|
| INDA stats 제목 | `숫자로 증명하는 ` + `<span class="is-br-only-mobile"><br></span>` + `eDiscovery의 전문성` | [x] MCP component tree 재조회 |
| What is eDiscovery · 배너 | Desktop 원문 2줄 / Mobile 동일 원문 3줄 | [x] MCP prop · 1440px · 390px |
| Careers · 배너 | Desktop 원문 2줄 / Mobile 동일 원문 3줄 | [x] MCP prop · 1440px · 390px |
| Locations · 배너 | Desktop 원문 2줄 / Mobile 동일 원문 3줄 | [x] MCP prop · 1440px · 390px |

- [x] BR 자체에 `is-br-only-mobile`이 붙어 `display: contents`가 적용되던 잘못된 노드를 제거했다. 기존 Data Analytics와 같은 span-wrapper 구조를 사용했다.
- [x] EN 정적 페이지 23개의 localized component props를 다시 검색했다. `Questions about eDiscovery?` 축약 문구 잔존 0건이다.
- [x] eDiscovery 배너 5곳(INDA, Data Analytics, What is eDiscovery, Careers, Locations)의 문구를 `If you have questions about eDiscovery, consult with an expert today.`로 통일했다. Desktop/mobile 차이는 BR 위치뿐이다.
- [x] 390px 실측: `If you have questions` / `about eDiscovery,` / `consult with an expert today.`의 3줄이며, 가로 넘침과 한 단어 고립이 없다.
- [x] 1440px 실측: `If you have questions about eDiscovery,` / `consult with an expert today.`의 2줄이다.
- [x] 공통 banner 컴포넌트, KO 배너 문구, `!important`, JavaScript, page-ID CSS는 변경하지 않았다.
- [ ] 퍼블리시하지 않았다.

## LPO KO intro BR 모바일 유지 — 2026-09-25

- [x] 페이지 `6a90e69e85b0d836c3e1cd94`의 intro-title wrapper `d646d9b8-e3ba-5b89-d64c-79df7ac424f7`에 기존 유틸리티 `is-br-keep`을 적용했다.
- [x] KO 제목은 `해외소송 전반을 아우르는` / `전략적 법률 지원`의 기존 BR을 데스크톱과 모바일에서 모두 유지한다.
- [x] 같은 wrapper에 기존 opt-in 속성 `data-br-en="only-desktop"`을 적용해 EN 모바일 동작은 변경하지 않았다.
- [x] 새 CSS, `!important`, JavaScript, page-ID selector를 추가하지 않았다.
- [ ] 퍼블리시하지 않았다.

## Data Security KO intro 모바일 3줄 — 2026-09-25

- [x] intro-title prop을 `전자계약부터` / `기업 중요 데이터까지` / `데이터 전송 보안 전문 컨설팅`의 두 BR로 저장했다.
- [x] wrapper `35098f02-26ee-3627-b399-1cb73e0a3e4f`에 `data-br-ko="first-mobile"`을 적용했다.
- [x] 1440px에서는 첫 BR만 숨겨 기존 2줄을 유지한다: `전자계약부터 기업 중요 데이터까지` / `데이터 전송 보안 전문 컨설팅`.
- [x] 390px에서는 두 BR을 모두 표시해 요청한 3줄을 유지한다. 측정 폭과 `scrollWidth`가 모두 `342px`로 가로 넘침이 없다.
- [x] EN locale에는 기존 별도 title override가 있어 영문 문구가 유지된다. 신규 표시 규칙도 `html:lang(ko)`로 한정했다.
- [x] 신규 `!important`, JavaScript, page-ID selector는 추가하지 않았다.
- [ ] 퍼블리시하지 않았다.

## NCT KO All-in-One 제목 모바일 3줄 — 2026-09-25

- [x] 대상은 NCT 페이지 `6a531cf6624189f3842b9870`의 모바일 전용 section-title 인스턴스 `7c04faf5-8853-77fc-6974-5b03daeaa922`로 한정했다.
- [x] KO 모바일 제목을 `기술 현황 확인부터 보안 환경 구축까지` / `국가핵심기술(NCT) 데이터 보안` / `All-in-One 컨설팅`의 3줄로 저장했다.
- [x] 데스크톱 전용 인스턴스 `545a1671-d977-6b3f-a362-190a44f28a78`는 기존 2줄 값인 `기술 현황 확인부터 보안 환경 구축까지` / `국가핵심기술(NCT) 데이터 보안 All-in-One 컨설팅`을 유지한다.
- [x] EN 모바일 인스턴스에는 별도 localized override가 유지되어 영문 제목과 개행에 영향이 없다.
- [x] 기존 native desktop/mobile 인스턴스 구조만 사용했다. 신규 CSS, `!important`, JavaScript, page-ID selector는 추가하지 않았다.
- [x] MCP 저장값을 재조회해 KO desktop 1개 BR, KO mobile 2개 BR, EN mobile override 보존을 확인했다.
- [ ] 퍼블리시하지 않았다. 공개 URL 화면 확인은 게시 후 수행한다.

## KO 본문·제목 BR 모바일 숨김 일괄 정리 — 2026-09-25

| 페이지 | 대상 | 1440px | 390px | MCP 저장 |
|---|---|---|---|---|
| Docusign IAM | 전자서명을 넘어, 제목 | 기존 BR 표시 | 기존 BR 표시 | [x] data-br-ko=keep |
| Docusign IAM | Docusign IAM, Intelligent Agreement Management 제목 | 기존 BR 표시 | BR 숨김 | [x] |
| Docusign IAM | 고객 인용문 | 기존 BR 2개 표시 | BR 2개 숨김 | [x] |
| Docusign eSignature | 국내 기업 도입 안내 설명 | 기존 BR 2개 표시 | BR 2개 숨김 | [x] |
| Docusign eSignature | Legality Guide 제목 | 기존 BR 표시 | BR 숨김 | [x] |
| Luminance | 검증 문서·공식 파트너·Trial 설명 3곳 | 기존 BR 표시 | BR 숨김 | [x] |
| Litera | 한국 공식 리셀러 설명 | 기존 BR 표시 | BR 숨김 | [x] |
| ESG Management | 최고 경영책임자 법적 리스크 설명 | 기존 BR 표시 | BR 숨김 | [x] |
| Nymi Band | 국내 체험 안내 설명 | 기존 BR 표시 | BR 숨김 | [x] |
| About Us | 대형 소송 eDiscovery 실적 문장 | 기존 BR 표시 | BR 숨김 | [x] |
| Careers | 채용 소개 본문·실무자 인터뷰 설명 | 기존 BR 표시 | BR 숨김 | [x] |

- [x] 공통 opt-in 속성은 data-br-ko=only-desktop / data-br-ko=keep 두 값만 사용했다. 문단이나 제목 전체를 display:none으로 만드는 is-br-only-* wrapper는 추가하지 않았다.
- [x] 표시 규칙은 KO와 max-width:767px에만 한정했다. 신규 !important, JavaScript, page-ID selector가 없다.
- [x] BR을 숨겼을 때 문장이 붙지 않도록 Docusign eSignature 도입 안내와 Careers 인터뷰 설명의 BR 경계에 일반 공백을 보존했다. 나머지 대상도 저장값 또는 인접 text node의 공백을 확인했다.
- [x] EN localized override를 재조회했다. Docusign과 Careers에서 KO prop 공백 정리가 EN 문구를 덮어쓰지 않는다. 기존 data-br-en 속성도 함께 보존됐다.
- [x] MCP의 모든 대상 속성을 재조회했다. Docusign 5곳, Luminance 3곳, Litera·ESG·Nymi·About 각 1곳, Careers 2곳이 의도한 값으로 저장됐다.
- [x] 390×844 모의 렌더링에서 모든 only-desktop BR의 computed display가 none, 전자서명을 넘어, 제목 BR은 inline이었다. 대상의 가로 넘침은 없었다.
- [x] 1440×900 모의 렌더링에서 기존 BR은 모두 inline으로 유지됐다.
- [ ] 퍼블리시하지 않았다. 공개 URL에서 최신 공백과 실제 저장 속성을 포함한 최종 화면 확인은 게시 후 수행한다.

## Sub-visual description KO·EN 390px 전수 점검 — 2026-09-25

- [x] KO 32개 경로와 EN 32개 경로를 Chromium 390×844로 실제 렌더링했다. 각 언어에서 sub-visual description이 있는 27개 경로, 총 54개 설명을 검사했다.
- [x] 강제 BR의 computed display, 실제 시각 줄 배열, 언어 혼입, 단독 단어, clientWidth/scrollWidth를 확인했다. KO·EN 모두 가로 넘침 0건이다.
- [x] sub-visual이 없는 홈, Private Resources, 약관, 개인정보·쿠키 정책, 검색 결과는 수정 대상에서 제외했다.

| 페이지 · locale | 수정 전 390px | 최종 390px | 1440px | 저장 확인 |
|---|---|---|---|---|
| K-Discovery · KO | 마지막 줄에 Solution만 고립 | 한국형 증거개시 환경에 최적화된 / eDiscovery Solution | BR 숨김, 한 줄 | [x] |
| K-Discovery · EN | 마지막 줄에 Framework만 고립 | eDiscovery Solutions for / Korea's Discovery Framework | BR 숨김, 한 줄 | [x] |
| Docusign · EN | 마지막 줄에 Solution만 고립 | Global E-Signature and / Contract Management Solution | BR 숨김, 한 줄 | [x] |
| Kiteworks · EN | 마지막 줄에 Enterprises만 고립 | Robust Secure File Transfer Protocol / for Enterprises | BR 숨김, 한 줄 | [x] |
| Endpoint Protector · EN | 마지막 줄에 Breaches만 고립 | Endpoint Security Solution / to Prevent Data Breaches | BR 숨김, 한 줄 | [x] |
| INDA · KO | BR 경계에서 텍스트 추출 시 단어 결합 | 기존 2줄 유지, 인텔렉추얼데이터만의 / eDiscovery 전 과정 통합 서비스 | 기존 상태 유지 | [x] 공백 보정 |
| Careers · KO | BR 경계에서 텍스트 추출 시 단어 결합 | 기존 2줄 유지, 상상을 뛰어넘는 / 경험과 커리어를 만들어보세요 | 기존 상태 유지 | [x] 공백 보정 |

- [x] 네 페이지 Body에 data-subvisual-br=mobile을 적용하고, 해당 범위의 sub-visual description BR만 767px 이하에서 표시한다.
- [x] 공통 sub-visual 컴포넌트 구조와 다른 페이지는 변경하지 않았다. 페이지 ID selector, !important, JavaScript를 추가하지 않았다.
- [x] 390px 최종 모의 렌더링에서 위 7개 대상의 줄 배열과 공백을 재확인했다. 캡처와 audit.json은 artifacts/subvisual-desc-390-ko-final 및 artifacts/subvisual-desc-390-en-final에 저장했다.
- [x] 1440×900 최종 모의 렌더링에서 새 BR 5곳이 모두 none이며 기존 한 줄 설명과 가로 폭을 유지함을 확인했다.
- [x] MCP 재조회에서 KO 3개 값, EN 4개 locale override, 네 Body scope 속성, 공통 CSS 블록 저장을 확인했다.
- [ ] 퍼블리시하지 않았다. 게시 후 동일한 390px 실제 URL에서 최종 저장 상태를 다시 확인한다.

## EB Garamond 컴포넌트 제목 데스크톱 크기 보정 — 2026-09-25

| Typography 변수 | 변경 전 | 변경 후 | 390px 유지 |
|---|---:|---:|---:|
| `type/component/sub-visual/title/garamond/font-size` | 70px | 88px | 32px |
| `type/component/intro-title/title/garamond/font-size` | 57px | 72px | 26px |
| `type/component/banner/title/garamond/font-size` | 57px | 80px | 25px |
| `type/component/section-title/title/garamond/font-size` | 46px | 46px | 22px |

- [x] Webflow Typography 컬렉션의 Garamond 전용 size 변수만 수정했다. 일반 Pretendard/Noto Serif 제목 변수와 클래스 구조는 변경하지 않았다.
- [x] About Us EN/KO를 1440px로 모의 렌더링해 sub-visual 88px, banner 80px 적용과 한 줄 유지, 가로 넘침 없음(0건)을 확인했다.
- [x] 390px 모의 렌더링에서 About Us EN/KO의 sub-visual 32px, banner 25px가 기존과 동일함을 확인했다.
- [x] EN 공개 정적 경로 32개를 1440px로 교차 검사했다. EB Garamond 컴포넌트 제목에서 가로 넘침과 5줄 이상 과다 개행은 0건이다.
- [x] 신규 CSS, `!important`, JavaScript, page-ID selector를 추가하지 않았다.
- [ ] 퍼블리시하지 않았다. 실제 공개 URL은 게시 후 최종 확인한다.

## stats-band 공통 제목 크기 정리 — 2026-09-25

- [x] `stats-band` 컴포넌트 제목 요소 `70dd3497-f30a-4522-1474-238af9149ac7`을 기존 표준 조합 `section-head-title bold section-title__title-text`로 변경했다.
- [x] 별도 CSS와 고정 숫자를 만들지 않고 기존 section-title 반응형 토큰을 재사용했다.
- [x] 1440px: KO 60→42px, EN 60→46px. 390px: KO/EN 25→20px.
- [x] INDA FullDiscovery, Data Analytics, What is eDiscovery의 KO/EN 6개 화면에서 가로 넘침 0건을 확인했다.
- [x] BR 구조, 문구, 컴포넌트 variant, 다른 stats 섹션은 변경하지 않았다.
- [ ] 퍼블리시하지 않았다.
