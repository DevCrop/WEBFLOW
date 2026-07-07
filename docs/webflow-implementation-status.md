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
| 로케일 | primary English(en) / secondary Korean(ko, disabled). 로컬라이제이션 add-on 미구매 |

**작업 원칙 (반드시 지킬 것):**
1. 사용자가 이미 만든 섹션 골격이 있으면 **새로 만들지 말고** 그 안만 채운다.
   섹션 추가/수정 전 `get_all_elements`(depth 1~2) + `get_display_name`으로 기존 섹션을 먼저 확인한다.
   (이 프로젝트에서 중복 섹션을 새로 만들어 여러 번 되돌린 전례가 있음 — Global/Insights.)
2. 텍스트/뱃지/보더는 전용 클래스를 만들지 않고 **범용 클래스 + 컴포넌트**로 처리한다.
   - 타이틀 → `heading-*` / 본문 → `body-*` / 색 → `text-*`
   - 뱃지 → `badge` 컴포넌트 / 버튼 → `button` 컴포넌트
   - 보더 → `border` + `border-strong`
3. 커스텀은 **레이아웃/포지셔닝에 한해서만** 전용 클래스(`service-*`,`global-*`,`insights-*`,`circle-*`)로 신설한다.
4. 카드/슬라이드 배경은 `<img>`가 아니라 `service-bg` 배경 레이어로 처리한다(비워두고 Designer에서 채움).
5. 카드/오피스/슬라이드는 `<a>`(LinkBlock)로 만들어 서브페이지 이동을 지원한다.
6. 리팩터 후 사용처 0 클래스는 삭제해 최적화한다.
7. `hero-arrow`는 **Hero 섹션 전용**이다. 다른 섹션에서 쓰지 않는다. 인너 세로 정렬이 필요하면
   `inner` + `flex-center` + `flex-col` + `gap-*` 조합을 쓴다.
8. `data_element_builder`/`whtml_builder`가 `hero-arrow` 같은 잔여 클래스를 붙이는 경우가 있으니
   빌드 직후 `set_style`로 클린업한다.

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
| header/footer/breadcrumb/sub-visual | — | 각 props | 프롭만 |
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

### 정리 이력
- Services 버튼: 커스텀 LinkBlock → `button` 컴포넌트(outline-white). Main CTA: `button`(fill-black) 추가.
- `Div Block` 전역 클래스 삭제. Core Services 전용 텍스트 클래스 삭제.
- 중복 생성했던 Global/Insights 섹션 삭제(사용자 골격만 사용).
- 슬라이드/원형/CTA 인너에 딸려붙은 `hero-arrow` 잔여 클래스 제거(→ hero 전용 규칙 확정).

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

---

## 6. MCP 도구 사용 시 알려진 제약 (에이전트 참고)

- `button-label`은 Span → textContent 바인딩 불가 → 인스턴스 라벨 API로 못 바꿈(Designer 수정).
- `create_style`이 `-webkit-line-clamp` 등 일부 벤더 프로퍼티 거부.
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

---

## 8. 공식 출처 (Official Sources)

- Webflow 클래스 네이밍: https://help.webflow.com/hc/en-us/articles/33961311094419-Classes
- Webflow MCP 시작: https://developers.webflow.com/mcp/reference/getting-started
- Webflow MCP skills: https://developers.webflow.com/mcp/reference/skills
- Webflow Data API: https://developers.webflow.com/data/reference/rest-introduction
- 공식 Webflow skills: https://github.com/webflow/webflow-skills
- Webflow 로컬라이제이션: https://help.webflow.com/hc/en-us/articles/33961358401555-Localization
- Webflow 커스텀 코드/임베드: https://help.webflow.com/hc/en-us/articles/33961347731347-Custom-code-embed
- Swiper: https://swiperjs.com/get-started
- Codex customization: https://developers.openai.com/codex/concepts/customization
