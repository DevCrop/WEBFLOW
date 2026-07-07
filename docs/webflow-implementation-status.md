# Webflow Implementation Status — intellectualdata

> **문서 목적**: 라이브 Webflow 사이트 `intellectualdata`의 **현재 실제 상태**를 MCP로 실측해 기록한
> 단일 진실 소스(single source of truth). `webflow-design-system.md`가 "지향 규칙"이면 이 문서는 "구현된 사실"이다.
> Claude / Codex 등 AI 에이전트가 이 사이트를 이어서 작업할 때 **가장 먼저 읽어야 하는 문서**다.
>
> **갱신 규칙**: 클래스/변수/컴포넌트/섹션 구조를 바꿀 때마다 같은 작업 안에서 이 문서를 갱신한다.

---

## 0. 빠른 참조 (AI 에이전트용)

| 항목 | 값 |
| --- | --- |
| siteId | `6a38f39fe95d43bbdbe5c71c` |
| 홈 pageId (`/`) | `6a38f3a0e95d43bbdbe5c758` |
| Body element | `6a38f3a0e95d43bbdbe5c75d` |
| 변수 컬렉션 | `Base collection` (단일 모드 `Base mode`), 66개 |
| 주 폰트 | Pretendard (`--font--base`) |
| 컨테이너 max-width | `no-container-xl` = **1664px** (gutter 24px) |
| 로케일 | primary Korean(ko, disabled) / secondary English(en, disabled). 로컬라이제이션 add-on 미구매 |

**작업 원칙 (반드시 지킬 것):**
1. 사용자가 이미 만든 섹션 골격이 있으면 **새로 만들지 말고** 그 안만 채운다.
   섹션 추가/수정 전 `get_all_elements`(depth 1~2) + `get_display_name`으로 기존 섹션을 먼저 확인한다.
   (이 프로젝트에서 중복 섹션을 새로 만들어 여러 번 되돌린 전례가 있음 — Global/Insights.)
2. 텍스트/뱃지/보더는 전용 클래스를 만들지 않고 **범용 클래스 + 컴포넌트**로 처리한다.
   - 타이틀 → `heading-*` / 본문 → `body-*` / 색 → `text-*`
   - 뱃지 → `badge` 컴포넌트 / 버튼 → `button` 컴포넌트
   - 보더 → `border` + `border-strong` / `border-weak` / `border-inverse`
3. 커스텀은 **레이아웃/포지셔닝에 한해서만** 전용 클래스(`service-*`,`global-*`,`insights-*`,`circle-*`)로 신설한다.
4. 카드/슬라이드 배경은 `<img>`가 아니라 `service-bg` 배경 레이어로 처리한다(비워두고 Designer에서 채움).
5. 카드/오피스/슬라이드는 `<a>`(LinkBlock)로 만들어 서브페이지 이동을 지원한다.
6. 리팩터 후 사용처 0 클래스는 삭제해 최적화한다.
7. `hero-arrow`는 **Hero 섹션 전용**이다. 다른 섹션에서 쓰지 않는다. 인너 세로 정렬이 필요하면
   `inner` + `flex-center` + `flex-col` + `gap-*` 조합을 쓴다.
8. `data_element_builder`/`whtml_builder`가 `hero-arrow` 같은 잔여 클래스를 붙이는 경우가 있으니
   빌드 직후 `set_style`로 클린업한다.
9. 슬라이더/메뉴/탭/폼/반복 콘텐츠/재사용 UI는 Webflow native 기능을 먼저 쓴다.
   Slider/Dropdown/Navbar/Tabs/Form/CMS List/Component로 가능한 작업은 임의 div, custom JS, HtmlEmbed로 새로 만들지 않는다.
   fallback을 쓰면 이유와 page/element ID를 이 문서에 기록한다.

---

## 1. 변수 실측 (CSS custom property 이름)

실제 CSS 변수명은 슬래시가 **이중 하이픈**으로 변환된다. 커스텀 코드/임베드 참조 시 아래 실제 이름 사용.

### Color
| 변수 | 값 |
| --- | --- |
| `--color--base--black` | `#000000` |
| `--color--base--white` | `#ffffff` |
| `--color--brand--primary` | `#011926` |
| `--color--brand--secondary` | `#FF6B2B` |
| `--color--bg--primary` | `#011926` |
| `--color--bg--secondary` | `#EEF1F2` |
| `--color--border--default` | `#24495c` |
| `--color--border--dark-strong` | `#123244` |
| `--color--border--dark-weak` | `#24495C` |
| `--color--border--light-strong` | `#FFFFFFE0` |
| `--color--border--light-weak` | `#FFFFFF3D` |
| `--color--gray--primary` | `#FAFAFA` |
| `--color--gray--secondary` | `#F8FAFC` |
| `--color--text--title` | `#FFFFFF` |
| `--color--text--primary` | `#ffffff` |
| `--color--text--desc` | `#EEEEEE` |
| `--color--text--inverse` | `#011926` |

### Typography scale
Display 01/02/03 = 108 / 96 / 88px · Heading 01~06 = 64 / 52 / 48 / 40 / 32 / 28px ·
Body 01~04 = 24 / 20 / 18 / 16px. letter-spacing -0.02em. 클래스: `display-1..3`, `heading-1..6`, `body-1..4`.

### Font / Weight / Layout
- `--font--base` Pretendard · `--font--en` EB Garamond · `--font--ko` Noto Serif KR
- `--weight--regular/medium/semibold/bold` = 400 / 500 / 600 / 700
- `--layout--container` 1440px · `--layout--gutter` 24px
- 실제 섹션 컨테이너 래퍼 `no-container-xl` = **max-width 1664px**, margin auto

---

## 2. 컴포넌트 카탈로그 실측

대부분 Design System 컴포넌트는 **빈 foundation**이고, 아래만 실제 구조/프롭이 채워져 사용 중.

| 컴포넌트 | id | props | 상태 |
| --- | --- | --- | --- |
| `button` | `665c98a3-189c-44a3-bc1d-420ae20e224c` | `Variant` | 구조 완성 |
| `card` | `d9532fc9-ab77-51a0-98c2-e0a952d0aa63` | `Variant` | 구조 완성 |
| `banner` | `dd757598-1c8a-df83-fe4e-f8deec6f96f6` | `Variant` | 구조 완성 |
| `badge` | `6620c6f6-ff10-459f-2fb3-f5e6a74e6bba` | `Label`(textContent) | 구조 채움 |
| `section-title` | `9b4fc63d-3bda-d34d-302e-3b45259e7312` | eyebrow/title/desc/align/theme | 프롭만 |
| header/footer/sub-visual | — | 각 props | 프롭만 |
| `breadcrumb` | `84385bf9-d4a6-fc2b-fa2a-df2d53263570` | — | foundation. About Us는 현재 page-level native Dropdown 구조로 렌더 |
| content-split/media-block/card-grid, accordion/tab/pagination/tag/icon-box, form 계열 | — | 없음 | 빈 foundation |

### 2.1 `button` 컴포넌트
- 구조: `Link.button.is-brand.is-fill > Span.button-inner > Span.button-label("Button") + Span.button-icon("→")`
- variant 프롭 id: `961a0b18-c77e-f7b9-cb5e-a6d7364508a2` (**값은 variant ID로 지정**, name 아님)
- 주요 variant ID: base / fill-brand `430f7aef...` / outline-brand `799595b8...` /
  fill-white `d6a45f9c...` / **outline-white `c044aa43-e337-169b-1498-76fa88b838f0`** /
  **fill-black `4c810eb2-6dd7-68b5-a262-eb419f5e4215`** / outline-black `1ab0f118...` /
  size-xs/sm/md/lg / icon-none/front/end
- **⚠️ 알려진 제약**: label(`button-label`)은 `Span`이라 세팅 키가 `domId`/`visibility`뿐 →
  **textContent 바인딩 불가**. 인스턴스별 라벨 텍스트를 API로 못 바꾼다.
  variant는 API로 가능하나 라벨(예: "View More","Start a discovery")은 **Designer에서 인스턴스 텍스트 직접 수정**.

### 2.2 `badge` 컴포넌트
- 구조: `div > text.badge` / `Label`(textContent, id `0c40342e-c5f6-4dbe-482a-939d5d851d52`) → 내부 텍스트에 **바인딩됨**(인스턴스별 라벨 정상).
- 라벨을 인스턴스별로 바꿔야 하는 컴포넌트는 badge 방식(내부 TextBlock + textContent 프롭 바인딩)을 따를 것. button은 Span이라 실패한 전례 있음.

---

## 3. 홈(`/`) 섹션 구조 실측 (총 10개)

```text
Body
  Section .h-full                       Hero (0d1f3ef2)
  Section .padding-y-xl                 (b1de77aa)
  Section .padding-y-xl                 (4c237091)
  Section .padding-y-xl                 (0af7d1e2)
  Section .padding-y-xl "Core Services" (b303c173)  벤토 3카드
  Section .padding-y-xl "Global"        (fee26521)  사용자 골격 + 채움
  Section .padding-y-xl "Services"      (7a2eb61f)  사용자 골격 + 3카드
  Section .padding-y-xl "Insight"       (baa13aed)  사용자 골격 + Swiper 슬라이더
  Section .padding-y-xl "Consulting"    (fc4eadbf)  사용자 골격 + 원형 4개 리스트
  Section .h-full        "Main CTA"      (d7d4a723)  사용자 골격 + CTA 버튼
```
> `padding-y-xl` = **120px / 120px**.

### 3.1 Core Services (벤토) — 레이아웃만 `service-*`, 텍스트는 범용
```text
.no-container-xl
  .service-head (flex-between margin-bottom-xl) : h2.display-3 + p.body-3.text-secondary
  .service-grid                          2열 벤토
    .service-col
      a.service-card[.service-tall|.h-full].border.border-strong.text-primary
        .service-bg / .service-arrow>↗ / .service-text
          badge(컴포넌트) / .service-text-title (h3.heading-3 + p.body-3.text-secondary)
```

### 3.2 Global — 사용자 골격(fee26521)
```text
.inner.grid-6-6
  (left) .section-title>.service-text-title(display-3 + body-3) / .global-button-wrap>a.global-office ×2
  .right .global-canvas > HtmlEmbed(three.js 글로브)
```

### 3.3 Services (3카드) — 사용자 골격(7a2eb61f)
```text
.section-title>h2.text-center.heading-1(2줄)
.contents>.grid-3
  .service-card.border.border-strong.text-primary ×3
    .service-text-title(h4.heading-4 + p.body-4.text-secondary)
    .main-services-icon-box.flex-center>HtmlEmbed(아이콘 SVG)
    div > button 컴포넌트(outline-white)   ← 라벨 "View More"는 Designer에서 수정
```

### 3.4 Insight (Swiper) — 사용자 골격(baa13aed), CMS 연동 예정
```text
.section-title>h2.heading-2.text-center "Insights"
.contents
  [사용자 지정 div] .insights-swiper.swiper
    .swiper-wrapper > a.insights-slide.swiper-slide.border.border-strong.text-primary ×3
        .service-bg / .insights-slide-overlay(다크 그라데이션) / .insights-slide-body(z2)
          badge("Data Security") / h3.heading-6.insights-slide-title
  .insights-nav
    .insights-arrow.insights-prev>HtmlEmbed(←) / .insights-pagination.swiper-pagination / .insights-arrow.insights-next>HtmlEmbed(→)
  HtmlEmbed → Swiper CDN(v11) + init
```
- Swiper: desktop 3 (992+) / tablet 2 (640+) / mobile 1.1. navigation→`.insights-prev/.insights-next`, pagination→`.swiper-pagination`.
- **pagination은 `insights-pagination`으로 분리, `position:static` + `margin-top`** (absolute 금지). nav 행에 prev/pagination/next 가로 하단 배치.

### 3.5 Consulting (원형 4개, 겹침) — 사용자 골격(fc4eadbf)
```text
.section-title.text-center>h2.heading-1 "eDiscovery Consulting" + p.body-1.regular(서브카피)
.contents
  ul.circle-list                         display:flex, justify-content:center, gap 0, nowrap
    li.circle-item ×4                     452×452 고정, radius-full, overflow hidden, flex 0 0 auto
                                          margin-left: -96px  (겹침), first-child margin-left: 0
      .circle-bg                          blur 글래스 (backdrop-filter blur 8px, rgba(3,14,22,0.55), 보더)
      .circle-body (z1, max-width 220px)  .heading-6.text-primary [제목] / .circle-arrow ↓ / p.body-4.text-secondary
```
**겹침 설계 (중요):** 원 4개 × 452px = 1808px 은 컨테이너(1664px)를 넘음.
`transform`은 레이아웃 폭을 안 바꿔 넘침을 못 고치므로 사용하지 않음.
대신 **음수 `margin-left: -96px`**로 실제 폭을 줄이면서(4×452 − 3×96 = **1520px** < 1664px) 동시에 겹침을 만든다.
`first-child`만 margin 0으로 리셋해 전체를 중앙 정렬. 겹침 정도는 이 margin 값으로 조절.
겹침 부분에서 텍스트는 `circle-body`(중앙 220px)에 모여 있어 서로 안 가림.
- ⚠️ `-webkit-line-clamp`, `nth-child(n)` 특정 숫자 pseudo는 이 MCP가 거부 → 2줄 말줄임/개별 z-index는 Designer에서 처리.

### 3.6 Main CTA — 사용자 골격(d7d4a723)
```text
Section .h-full "Main CTA"
  .no-container-xl (BlockContainer)
    .inner.flex-center.flex-col.gap-lg     (hero-arrow 사용 안 함)
      h1.display-1.fm-en.text-center "The eDiscovery Standard"
      button 컴포넌트(fill-black)          ← 라벨 "Start a discovery"는 Designer에서 수정
```
- 뒤 배경 이미지는 사용자가 별도 처리(건드리지 않음). 앞 텍스트 + CTA 버튼 구조만 잡음.

### 3.7 About Us Sub Visual Breadcrumb

About Us pageId `6a3c82d462d1516e899d7fec`의 첫 `sub-visual`에 breadcrumb를 렌더했다.

```text
.sub-visual-container.no-container
  .inner.sub-visual-inner(position:relative)
    .sub-visual-title-box
    .breadcrumb (d5b74433-21c2-4595-0096-83ec53df6991)
      DropdownWrapper.breadcrumb-item "Company" (10e0660a-5426-1f66-8dd0-8ac4f4ceba67)
        DropdownToggle.breadcrumb-trigger
        DropdownList.breadcrumb-list > 5 links
      DropdownWrapper.breadcrumb-item "About" (facac10a-4bb6-f7c6-5c75-f5d7f8f6be9f)
        DropdownToggle.breadcrumb-trigger
        DropdownList.breadcrumb-list > 5 links
      TextLink.breadcrumb-trigger "About Us" (b7cdc914-ca8e-2f27-6ccb-e93e33c4fabf)
```

- 위치: `position:absolute; top:50%; right:0; transform:translateY(-50%)`.
- 현재 About Us hierarchy: `Company > About > About Us`.
- 구조는 3단계 breadcrumb까지 확장 가능하다. 예: `Company > About > About Us`, `Solutions > Data Security > Page`.
- Dropdown은 Webflow native `Dropdown` element를 사용한다. `data-hover="true"`와 `data-delay="0"` attributes를 wrapper에 설정했다.
- 기본 Dropdown icon은 snapshot에서 깨진 박스로 보여 visibility false 처리하고, `breadcrumb-arrow` 텍스트 caret을 toggle 안에 별도 추가했다.
- 전용 클래스는 breadcrumb 범위로만 제한: `breadcrumb`, `breadcrumb-item`, `breadcrumb-trigger`, `breadcrumb-arrow`, `breadcrumb-list`, `breadcrumb-link`.

### 3.8 Docusign Product Sub Nav

Docusign pageId `6a48b6aa23d56c4e126d23d2`의 `sub-visual-container` 앞에 제품군 sub-nav를 렌더했다.

```text
.sub-nav (nav)
  .sub-nav-inner
    Link.sub-nav-link.sub-nav-active "Docusign®" -> /page-docusign
    Link.sub-nav-link "Legal System" -> /page-legal-system
    Link.sub-nav-link "Luminance" -> /page-luminance
    Link.sub-nav-link "Litera" -> /page-litera
    Link.sub-nav-link "Kiteworks®" -> /page-kiteworks
    Link.sub-nav-link "ESG Management®" -> /page-esg-management
```

- Code Embed/HtmlEmbed가 아니라 native `nav` + Webflow `Link` 요소로 구성했다.
- style selector는 `sub-nav`, `sub-nav-inner`, `sub-nav-link`, `sub-nav-active` 4개만 추가했다.
- 현재 페이지 active underline은 `sub-nav-active`로 처리한다.
- 아직 Webflow Component로 승격하지 않았다. Legal System/Luminance/Litera/Kiteworks/ESG 페이지에 반복 적용할 때 component/variant 또는 active property로 전환 검토.
- Webflow page publish는 하지 않았다.

### 3.9 Docusign Product Tabs

Docusign pageId `6a48b6aa23d56c4e126d23d2`의 `sub-nav` 바로 아래에 제품 하위 탭 구조를 렌더했다.

```text
.product-tabs (section)
  .product-tabs-inner
    .product-tabs-menu
      Button.product-tab-link.product-tab-active [data-product-tab-trigger="docusign-iam"] "Docusign IAM"
      Button.product-tab-link [data-product-tab-trigger="docusign-esignature"] "Docusign eSignature"
      Button.product-tab-link [data-product-tab-trigger="docusign-clm"] "Docusign CLM"
    .product-tabs-content
      .product-tabs-panel.product-tabs-panel-active [data-product-tab-panel="docusign-iam"]
      .product-tabs-panel [data-product-tab-panel="docusign-esignature"]
      .product-tabs-panel [data-product-tab-panel="docusign-clm"]
```

- 초기 상태는 IAM pane만 `display:block`, eSignature/CLM pane은 `display:none`이다.
- MCP WHTML로 Webflow native `Tabs` 호환 마크업을 시도했지만 Designer가 native Tabs로 승격하지 않아 pane 3개가 모두 보였다. 해당 블록은 삭제했다.
- CSS-only radio 방식도 시도했지만 WHTML CSS validation이 nested/sibling selector를 거부해 삽입되지 않았다.
- 각 pane에 테스트용 dummy content를 추가했다.
  - IAM: `TEST DATA · IAM`, Identity Proofing / Adaptive Verification / Audit Trail Ready / Risk Signal Check
  - eSignature: `TEST DATA · eSignature`, Reusable Template / Recipient Routing / Mobile Signing / Completion Notice
  - CLM: `TEST DATA · CLM`, Clause Library / Review Workflow / Approval Matrix / Repository Sync
- Docusign page script에 tab toggle script를 추가했다.
  - registered script: `docusign_product_tabs` v`1.0.0`
  - location: page footer
  - trigger: `[data-product-tab-trigger]`
  - pane: `[data-product-tab-panel]`
  - active classes: `product-tab-active`, `product-tabs-panel-active`
  - `aria-selected`도 함께 토글한다.
- 재점검에서 `set_page_freeform_code`에 순수 JS만 저장된 상태는 버튼 클릭이 실행되지 않을 수 있어 제거했다. page-level fallback JS는 `register_inline_script` 후 `set_page_scripts`로 연결한다.
- script fallback은 MCP로 native Tabs 생성이 불가능한 현 상태의 제한된 fallback이다. Webflow Designer에서 native Tabs를 직접 만들 수 있으면 향후 해당 구조로 교체한다.
- 검증: page scripts 재조회 완료(`docusign_product_tabs` footer 연결), freeform head/footer 공백 확인, element tree depth 8에서 dummy content 3개 확인, snapshot에서 IAM panel만 표시 확인.
- 공식 기준: Webflow Tabs는 native responsive tabbed content용 요소다. MCP로 native Tabs 생성이 불가능할 때만 fallback script를 사용한다.
- 공식 기준: Webflow custom code 효과는 preview mode에서 확인 가능하지만 live site에는 publish 전까지 반영되지 않는다.
- Webflow page publish는 하지 않았다.

---

## 4. 이 프로젝트에서 만든 레이아웃 전용 클래스

| 클래스 | 용도 |
| --- | --- |
| `service-grid/-col/-card/-tall/-bg/-arrow/-text/-text-title` | Core Services 벤토 카드 |
| `global-button-wrap/-canvas/-office` | Global 섹션 |
| `badge` | badge 컴포넌트 내부 pill |
| `insights-swiper/-slide/-slide-body/-slide-overlay/-slide-title/-nav/-pagination/-arrow` | Insights Swiper |
| `insights-prev/-next` + `swiper/-wrapper/-slide/-pagination` | Swiper JS 훅 클래스 |
| `circle-list/-item/-bg/-body` + `.circle-arrow`(css) | Consulting 원형 리스트(겹침) |
| `main-services-icon-box` | (사용자 제작) Services 카드 아이콘 영역 100%×380 |
| `breadcrumb/-item/-trigger/-arrow/-list/-link` | About Us sub-visual breadcrumb |
| `sub-nav/-inner/-link/-active` | Product sibling page local navigation |
| `product-tabs/-inner/-menu/-content`, `product-tab-link/-active`, `product-tabs-panel/-active` | Docusign product tab shell |

### 정리 이력
- Services 버튼: 커스텀 LinkBlock → `button` 컴포넌트(outline-white). Main CTA: `button`(fill-black) 추가.
- `Div Block` 전역 클래스 삭제. Core Services 전용 텍스트 클래스 삭제.
- 중복 생성했던 Global/Insights 섹션 삭제(사용자 골격만 사용).
- 슬라이드/원형/CTA 인너에 딸려붙은 `hero-arrow` 잔여 클래스 제거(→ hero 전용 규칙 확정).

### 4.1 Style Selector 유틸리티 정리 (2026-07-08)

2026-07-08 재확인 결과 일부 utility selector가 삭제되어 있었고, 아래 selector를 현재 토큰 기준으로 복구했다.

복구/확인된 alias selector:

| 클래스 | 현재 id | 상태 | 토큰 |
| --- | --- | --- | --- |
| `text-title` | `ecdaa0d1-eae3-bf9d-c032-b4597ac1831e` | 삭제 후 복구 | `--color--text--title` |
| `text-body` | `3f657b69-1d65-2ea4-c31e-373238442deb` | 삭제 후 복구 | `--color--text--primary` |
| `text-desc` | `c51938f7-f3fa-72f3-5e7d-feb70b947e12` | 삭제 후 복구 | `--color--text--desc` |
| `border-weak` | `2269225d-5f23-bfc4-231f-7b382ad7ad98` | 삭제 후 복구 | `--color--border--dark-weak` |

복구/보정한 배경·표면·보더 selector:

| 클래스 | 보정 내용 |
| --- | --- |
| `bg-secondary` | 삭제 후 복구. `--color--bg--secondary` 연결 |
| `surface-primary` | 삭제 후 복구. `--color--bg--primary` 연결 |
| `surface-secondary` | 삭제 후 복구. `--color--bg--secondary` 연결 |
| `surface-elevated` | 삭제 후 복구. `--color--gray--secondary` 연결 |
| `border-inverse` | 삭제 후 복구. `--color--border--light-strong` 연결 |
| `text-muted` | `--color--text--desc` 연결 |
| `border` | `border-style: solid`, `border-width: 1px` 확인. 기존 `border-color: #24495c`는 MCP 단일 property 삭제 수단 미확인으로 남아 있음 |
| `border-strong` | `--color--border--dark-strong` 연결 |

주의:
- `text-primary`, `text-secondary`, `text-inverse`, `bg-primary`, `bg-inverse`는 같은 selector 이름의 global/duplicate combo가 공존한다.
  `update_style(style_name)`은 일부 항목에서 combo selector를 먼저 잡고, `style_id`를 함께 넘겨도 global을 타깃하지 못했다.
  해당 global selector 토큰 상태는 별도 정밀 정리가 필요하다.
- 이번 복구 작업은 selector 생성/보정만 수행했다. 기존 페이지 element 구조와 publish 상태는 변경하지 않았다.
- 검증용 임시 selector `__schema_probe_do_not_create__`는 MCP payload 확인 후 삭제했다.

### 4.2 Grid utility 확장 (2026-07-08)

Grid parent utility와 child span utility를 Webflow Style Selector에 추가했다.

Breakpoint prefix 매핑:

| Prefix | Webflow breakpoint | 조건 |
| --- | --- | --- |
| `lg-*` | `medium` | max 991px |
| `md-*` | `small` | max 767px |
| `sm-*` | `tiny` | max 479px |

생성/확인한 base grid selector:

- `grid-12`
- `grid-2-10`, `grid-3-9`, `grid-4-8`, `grid-5-7`, `grid-6-6`, `grid-7-5`, `grid-8-4`, `grid-9-3`, `grid-10-2`
- `span-1` through `span-12`

생성/보정한 responsive grid selector:

- `lg-grid-1` through `lg-grid-4`, `lg-grid-12`
- `lg-grid-2-10`, `lg-grid-3-9`, `lg-grid-4-8`, `lg-grid-5-7`, `lg-grid-6-6`, `lg-grid-7-5`, `lg-grid-8-4`, `lg-grid-9-3`, `lg-grid-10-2`
- `md-grid-1` through `md-grid-4`, `md-grid-12`
- `md-grid-2-10`, `md-grid-3-9`, `md-grid-4-8`, `md-grid-5-7`, `md-grid-6-6`, `md-grid-7-5`, `md-grid-8-4`, `md-grid-9-3`, `md-grid-10-2`
- `sm-grid-1` through `sm-grid-4`, `sm-grid-12`
- `sm-grid-2-10`, `sm-grid-3-9`, `sm-grid-4-8`, `sm-grid-5-7`, `sm-grid-6-6`, `sm-grid-7-5`, `sm-grid-8-4`, `sm-grid-9-3`, `sm-grid-10-2`
- `lg-span-1` through `lg-span-12`
- `md-span-1` through `md-span-12`
- `sm-span-1` through `sm-span-12`

처리 메모:

- `grid-12`는 parent 12-column grid, `span-*`는 child `grid-column: span n / span n` 전용이다.
- ratio grid는 parent에서 `fr` 비율을 직접 지정한다. 예: `grid-3-9`, `grid-7-5`.
- responsive selector는 base 값을 비워 두고 대상 breakpoint에만 값을 넣었다.
- 기존 `sm-grid-1`은 재사용하고 `tiny` breakpoint 값을 보정했다.
- 동작 확인용 임시 selector `__grid_probe_delete__`, `__grid_empty_probe_delete__`는 삭제 완료했다.
- Webflow page structure와 publish 상태는 변경하지 않았다.

### 4.3 Native-first 및 문서 싱크 자동화 (2026-07-08)

- Webflow 작업 원칙을 native-first로 확정했다. slider/carousel은 Webflow `Slider`, 메뉴는 `Navbar`/`Dropdown`, tab UI는 `Tabs`, form은 `Form`, 반복 콘텐츠는 CMS Collection/List, 재사용 UI는 Webflow `Component`/variant/property를 먼저 사용한다.
- custom code, HtmlEmbed, 직접 JS 구현은 native 기능으로 충족할 수 없을 때만 fallback으로 사용한다.
- Codex repo hook `.codex/hooks.json` + `.codex/hooks/webflow_doc_sync.ps1`을 추가했다.
  - `mcp__webflow*` PostToolUse에서 mutation action(`create/update/set/remove/delete/rename/insert/move/publish` 등)을 감지한다.
  - mutation 감지 시 `docs/webflow-implementation-status.md`, `docs/webflow-design-system.md`, `AGENTS.md`, `/components` 카탈로그 갱신 알림을 Codex 추가 컨텍스트로 반환한다.
  - read-only action(`get/list/read/search/audit` 등)은 알림 없이 통과한다.
- 검증: `hooks.json` JSON 파싱 완료. `update_style` payload는 알림 JSON 반환, `get_styles` payload는 무출력 통과.

삭제/리팩터 후보:

| 구분 | 클래스 | 처리 |
| --- | --- | --- |
| 즉시 삭제 후보 | `Div Block*`, `txt`, `cnt`, `link`, `mid`, `legacy-*`, `deprecated-*`, `deprecate-*`, `delete-*` | 홈 depth 검사 및 style 목록 기준 즉시 삭제할 대상 없음. 사이트 전체 사용처 확정 전 삭제 보류 |
| 교체 후 삭제 후보 | `right` | 홈 Global 섹션에서 1개 사용 중. `global-right` 또는 `global canvas-wrap`로 교체 후 삭제 |
| 교체/확인 후보 | `Mobile Margin Top 10`, `Button Primary`, `Nav Link`, `Heading 7`, `Section 2`, `conte`, `flex-co` | 자동/오타/레거시 후보. 전체 사용처 확인 후 0-use면 삭제, 사용 중이면 대체 selector로 교체 |
| 유지 | `hero-arrow` | Hero 전용이면 유지 |
| 유지 | `number-item`, `circle-list`, `circle-item` | 금지어 부분 문자열과 겹치지만 scoped 클래스라 유지 |
| 유지 | `service-*`, `global-*`, `insights-*`, `circle-*` | 현재 구현 전용 레이아웃 클래스라 유지 |

---

## 5. 규칙 대비 실제 차이

1. 변수 이름: 규칙 `color/brand/primary` vs 실제 `--color--brand--primary`. `color/state/*`,`overlay/*`,`shadow/*`,`space/*`,`radius/*`는 변수 컬렉션에 없음.
2. `no-container` 금지 위반: 실제로 `no-container` / `-xl` / `-xs` 널리 사용.
3. `padding-y-xl` = 120px (규칙 맥락 32px 아님).
4. `banner-*`가 존재하지 않는 변수(`var(--radius-lg)`,`var(--color-surface-primary)`,`var(--space-*)`) 참조 → 값 안 먹음.
5. 페이지 전용 클래스 잔존(`main-why-*`,`number-*` 등).
6. 자동 생성 전역 `Section`(100vh) / (삭제 전)`Div Block`.
7. **일부 섹션 래퍼가 `BlockContainer` 타입** (Consulting `63c74e49`, Main CTA `d7d4a723`).
   BlockContainer는 Webflow 기본 max-width가 있어 폭을 제한할 수 있음. 폭 이슈 시 일반 Block으로 통일 검토.
8. 일부 utility 이름은 global과 combo가 중복된다. MCP `update_style(style_name)`은 이름 중복 시 combo를 먼저 잡을 수 있어 global만 정확히 타깃하기 어렵다.

---

## 6. MCP 도구 사용 시 알려진 제약 (에이전트 참고)

- `button-label`은 Span → textContent 바인딩 불가 → 인스턴스 라벨 API로 못 바꿈(Designer 수정).
- `create_style`이 `-webkit-line-clamp` 등 일부 벤더 프로퍼티 거부.
- Breadcrumb 같은 메뉴 UI는 custom hover CSS/HtmlEmbed보다 native `Dropdown`을 우선 사용한다.
- `data_whtml_builder`는 nested selector(`.breadcrumb-item:hover .breadcrumb-list`)를 거부했고, 인증도 406으로 실패한 전례 있음.
- `set_style`/`update_style` pseudo는 `first-child`,`last-child`,`odd`,`even`만 지원. `nth-child(2)` 등 특정 숫자 불가.
- 컴포넌트 인스턴스에는 클래스를 직접 못 붙임(`set_style` 실패). 위치 조정은 감싸는 래퍼에서.
- `data_element_builder`가 새 div에 인접 요소 클래스를 복사해오는 경우 있음 → 빌드 후 클린업 필수.

---

## 7. 남은 작업 (TODO)

- [ ] 버튼 라벨 Designer 수정: Services "View More" / Main CTA "Start a discovery".
- [ ] 링크 대상 지정: Global 오피스 2, Services/Insights 카드, Main CTA, Consulting(필요 시).
- [ ] Insights를 CMS 컬렉션 연동(현재 정적 3슬라이드는 플레이스홀더).
- [ ] `service-bg`/슬라이드 배경 이미지 채우기.
- [ ] 모바일 반응형: Consulting 원 452 고정(좁은 화면 처리) / Insights 슬라이드 폭 등 브레이크포인트.
- [ ] backdrop-filter(blur) / Swiper / 글로브 등 임베드는 **퍼블리시 후 라이브에서만 렌더** — 스테이징 확인.
- [ ] BlockContainer 폭 제한 이슈(5-7) 정리 여부 결정.
- [ ] Docusign product tabs footer script를 Webflow Preview에서 클릭 테스트하고, 실제 컨텐츠 확정 시 `product-tab-demo-*` 더미 데이터를 교체.

---

## 8. 공식 출처 (Official Sources)

- Webflow 클래스 네이밍: https://help.webflow.com/hc/en-us/articles/33961311094419-Classes
- Webflow MCP 시작: https://developers.webflow.com/mcp/reference/getting-started
- Webflow MCP skills: https://developers.webflow.com/mcp/reference/skills
- Webflow Data API: https://developers.webflow.com/data/reference/rest-introduction
- 공식 Webflow skills: https://github.com/webflow/webflow-skills
- Webflow 로컬라이제이션: https://help.webflow.com/hc/en-us/articles/33961358401555-Localization
- Webflow 커스텀 코드/임베드: https://help.webflow.com/hc/en-us/articles/33961347731347-Custom-code-embed
- Webflow custom code head/footer: https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags
- Webflow Tabs: https://help.webflow.com/hc/en-us/articles/33961243010195-Tabs
- Webflow Slider: https://help.webflow.com/hc/en-us/articles/33961317173139-Slider
- Webflow accessible elements: https://help.webflow.com/hc/en-us/articles/33961346219923-Accessible-elements-in-Webflow
- Webflow Components overview: https://help.webflow.com/hc/en-us/articles/33961303934611-Components-overview
- Webflow variables: https://developers.webflow.com/designer/reference/variables-overview
- Webflow styles: https://developers.webflow.com/designer/reference/styles-overview
- Codex hooks: https://developers.openai.com/codex/hooks
- Codex advanced configuration: https://developers.openai.com/codex/config-advanced
- Swiper: https://swiperjs.com/get-started
- Codex AGENTS.md: https://developers.openai.com/codex/guides/agents-md
