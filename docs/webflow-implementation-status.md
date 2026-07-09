# Webflow Implementation Status — intellectualdata

> **문서 목적**: 라이브 Webflow 사이트 `intellectualdata`의 **현재 실제 상태**를 MCP로 실측해 기록한
> 단일 진실 소스(single source of truth). `webflow-design-system.md`가 "지향 규칙"이면 이 문서는 "구현된 사실"이다.
> Claude / Codex 등 AI 에이전트가 이 사이트를 이어서 작업할 때 **가장 먼저 읽어야 하는 문서**다.
>
> **갱신 규칙**: 클래스/변수/컴포넌트/섹션 구조를 바꿀 때마다 같은 작업 안에서 이 문서를 갱신한다.

---

## 0.1 2026-07-09 End-of-Day Handoff

Today focused on Webflow class-system cleanup, page content documentation, and
the Luminance/Nymi dark-body rollback. No Webflow publish was performed.

Current operating baseline:
- `body-20` was migrated back to a real global typography utility. Do not use
  `body-2` or `legacy-body-20-combo` for new work.
- `main-cta` and `sub-cta` are the only CTA roots. Page-specific CTA roots are
  migration targets.
- Section roots must be identity-first, then utility: `sub-lumi-impact
  section-padding`, `sub-nymi-workflow section-padding`.
- Luminance and Nymi body sections should not carry `bg-white` or
  `bg-secondary` as the current final direction. They should inherit the page
  body dark background unless a future section-specific surface is explicitly
  approved.
- Do not use CSS priority override keywords in Webflow styles or custom code.
  Resolve conflicts by selector hygiene, class order, and wrapper structure.

Known live Webflow risk:
- Several selectors are already stored by Webflow as combo selectors. Confirmed
  examples include `sub-lumi-trust`, `text-title`, `text-body`,
  `no-container`, `display-88`, and some background utilities.
- MCP `set_style` can merge old combo paths back onto elements. Confirmed
  sticky classes include `sub-intro Copy`, `sub-litera-trust`,
  `legacy-body-20-combo`, `section-title`, `heading-32`, and
  `text-bg-reset` on some Luminance/Nymi elements.
- Because of that behavior, the next cleanup should not continue with broad
  style mutation. Work section by section: audit element tree, create/confirm a
  clean root selector, migrate one section, verify in Designer, then continue.
- Common atom selector cleanup should happen after page roots are stable,
  because renaming shared utilities can affect multiple pages at once.

Recommended next pass:
1. Start with one Luminance section, preferably `sub-lumi-trust`.
2. Rebuild or normalize the root so the visible class order is
   `sub-lumi-trust section-padding`, with no `sub-intro Copy` or
   `sub-litera-trust`.
3. Move only the existing `no-container` subtree/content into the clean root.
4. Remove old root only after visual check.
5. Repeat for the remaining Luminance sections, then Nymi.

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
   - 텍스트 → `heading-*`/`body-*` + `text-*` + weight class 조합. 예: `body-20 text-title regular`
   - 섹션별 `*-title`, `*-desc` 텍스트 전용 클래스는 새로 만들지 않는다. 레이아웃 wrapper가 필요할 때만 섹션 prefix BEM을 쓴다.
   - 뱃지 → `badge` 컴포넌트 / 버튼 → `button` 컴포넌트
   - 보더 → `border` + `border-strong` / `border-weak` / `border-inverse`
3. 커스텀은 **레이아웃/포지셔닝에 한해서만** 전용 클래스(`service-*`,`global-*`,`insights-*`,`circle-*`)로 신설한다.
4. 카드/슬라이드 배경은 `<img>`가 아니라 `service-bg` 배경 레이어로 처리한다(비워두고 Designer에서 채움).
5. 카드/오피스/슬라이드는 `<a>`(LinkBlock)로 만들어 서브페이지 이동을 지원한다.
6. `list.md` 임시 메모는 2026-07-09에 Codex/Claude 공용 규칙으로 흡수했다. 이후 작업 기준은 `AGENTS.md`와 `docs/webflow-design-system.md`다.
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
Display = 200 / 188 / 108 / 88px · Heading = 64 / 54 / 48 / 36 / 28px ·
Body = 24 / 20 / 18px. letter-spacing -0.02em.
클래스: `display-200`, `display-188`, `display-108`, `display-88`,
`heading-64`, `heading-54`, `heading-48`, `heading-36`, `heading-28`,
`body-24`, `body-20`, `body-18`.

2026-07-09 MCP 보정:
- `display-96` global selector를 새로 만들고 96px / 1.1 / -0.02em 적용.
- `display-88`, `heading-64/52/48/40/32/28`, `body-24/18/16` global selector에 문서 scale 적용.
- ordinal typography 이름을 size-based 이름으로 전환함: `display-1/2/3` → `display-108/96/88`, `heading-1..6` → `heading-64/52/48/40/32/28`, `body-1..4` → `body-24/20/18/16`.
- `display-108`, `body-20`는 이름 중복 때문에 MCP가 combo selector를 먼저 타깃한 이력이 있어 추가 확인 후 요소 사용처를 새 이름으로 교체함.
- 홈 페이지 실측 기준 주요 텍스트 사용처는 새 size-based 이름으로 반영됨. 단, Main CTA title은 MCP `set_style` 이력상 `heading-48 fm-en fm-ko display-108` combo가 함께 남아 있어, Designer에서 클래스 위생을 정리할 때 `fm-en display-108`만 남기는 후속 확인이 필요함.
- Publish는 하지 않음.

2026-07-09 scale 단순화:
- 최종 scale을 `display-200/188/108/88`, `heading-64/54/48/36/28`, `body-24/20/18`로 줄임.
- 매핑 알고리즘: 같은 카테고리 안에서 font-size 차이가 가장 작은 새 토큰으로 이동. 동률은 계층을 덜 낮추는 쪽 우선.
- 매핑: `display-96 → display-88`, `heading-52 → heading-54`, `heading-40 → heading-36`, `heading-32 → heading-36`, `body-16 → body-18`.
- Webflow MCP로 `display-200`, `display-188` 생성, `heading-40 → heading-36` rename, `heading-54/36/body-18` 값 보정, 홈 주요 사용처 일부 치환.
- `set_style`이 일부 요소에서 기존 combo를 병합해 `body-18 body-16 text-secondary`처럼 old class를 같이 남김. 값 기준으로는 `body-18`이 추가됐지만, 클래스 위생은 Designer에서 `body-16` 제거 후 확인 필요.
- Publish는 하지 않음.

2026-07-09 container naming 정리:
- 목표 규칙: 헤더에서만 `header container` combo를 쓰고, 섹션 폭 래퍼는 `no-container` / `no-container-xl`로 통일.
- BEM식 `*__container` 래퍼는 새로 만들지 않으며, 기존 `main-hero__container`, `product-tabs__container` 같은 래퍼는 `no-container` 계열로 흡수한다.
- 홈 섹션 폭 래퍼 9개는 `no-container-xl`로 정리됨. MCP `query_elements(style:"container-xl")`는 `no-container-xl`도 부분 매칭으로 반환하므로, 실제 `styleNames`를 확인해야 한다.
- 홈 Hero 래퍼에는 `no-container`를 추가했지만 기존 combo가 함께 남아 현재 `product-tabs__container no-container`로 보임.
- Services 아이콘 박스 3개는 `set_style` 및 스타일 비우기 후 재적용을 시도해도 `main-services-icon-box main-hero__container flex-center` combo가 계속 되살아남음. Designer에서 combo 직접 제거가 필요하다.
- Publish는 하지 않음.

2026-07-09 main page BEM ownership 1차 정리:
- 메인 페이지 섹션 10개를 얕은 트리로 검토해 복붙/중복 클래스명을 먼저 확인함.
- 중복 섹션명: 두 번째 `main-core`는 실제 Services 섹션이므로 `main-services`로 분리.
- 단일 사용 복붙 클래스 rename:
  - `main-business__inner` → `main-refer__inner`
  - `main-business__grid` → `main-refer__grid`
  - `main-solution__grid` → `main-num__grid`
  - `main-client-list` → `main-services__list`
  - `main-clients__card` → `main-services__card`
  - `main-clients__card-title` → `main-services__card-title`
- generic 내부 래퍼 교체:
  - `section-inner` 0건, `section-contents` 0건, `main-section-title` 0건으로 정리됨.
  - `main-num__inner/head/contents`, `main-services__inner/head/contents`, `main-insights__inner/head/contents`, `main-consulting__inner/head/contents`, `main-why__contents`, `main-core__contents`, `main-core__card-head`, `main-refer__head`를 추가/적용.
- `header-actions`가 Main Office 안에 남아 있어 `main-office__actions`로 교체함.
- 검증: `query_elements` 기준 `main-business__inner`, `main-business__grid`, `main-solution__grid`, `main-client-list`, `main-clients__card`, `header-actions`, `section-inner`, `section-contents`, `main-section-title`는 0건.
- 잔여/주의:
  - Hero wrapper는 `main-hero__inner product-tabs__container no-container`로, `product-tabs__container` combo가 MCP 교체 후에도 남음.
  - Services icon box 3개는 `main-hero__container` combo가 계속 되살아남음.
  - 일부 typography old combo(`heading-1`, `heading-40`, `heading-52`, `body-16`)와 자동 병합 combo(`heading-28` on services cards)는 별도 typography hygiene 패스 필요.
  - 새로 만든 일부 wrapper 클래스는 빈 스타일로 시작했으므로 Designer Preview에서 spacing/layout 차이를 확인해야 한다.
- `element_snapshot_tool`로 Services 섹션 스냅샷을 시도했지만 Webflow가 `status:false`를 반환해 시각 검증은 완료하지 못함.
- Publish는 하지 않음.

2026-07-09 typography scale 재확인:
- 요청 scale은 여전히 다음으로 확정: Display `200/188/108/88`, Heading `64/54/48/36/28`, Body `24/20/18`.
- 메인 페이지 실제 요소를 다시 조회한 결과, old typography가 일부 남아 있음이 확인됨.
- `heading-48` selector가 실제 Webflow에 없어서 새로 생성함(48px / 1.3 / -0.02em).
- 치환 성공:
  - `heading-1` 사용처는 `heading-64`를 추가해 0건으로 확인.
  - `heading-3` 실제 old 사용처 3개는 `heading-48`로 치환. 이후 `query_elements(style:"heading-3")` 결과는 `heading-36` 부분 매칭만 반환.
  - `display-96`, `display-2`, `display-3`, `heading-6`, `body-3`, `body-4`는 메인 페이지 사용처 0건.
- MCP 한계로 남은 sticky combo:
  - CTA heading: `heading-40 fm-en fm-ko display-108`
  - Services heading: `heading-52 text-center heading-64`
  - Consulting head: `main-consulting__head heading-52 text-center`
  - 6개 문단: `body-18 body-16 text-secondary`
- 위 sticky combo는 `set_style`, 스타일 비우기 후 재적용을 모두 시도해도 old class가 되살아남음.
- `remove_style`로 `body-16`, `heading-40`, `heading-52` selector 삭제도 시도했지만 Webflow MCP가 `internal error`를 반환함.
- 값 기준 새 클래스는 붙어 있으나, class hygiene 기준으로는 Designer에서 old combo 직접 제거가 필요하다.
- Publish는 하지 않음.

2026-07-09 Docusign typography 추가 정리:
- Docusign pageId `6a48b6aa23d56c4e126d23d2`에서 눈에 보이는 구형 heading 사용처를 현재 scale에 맞춰 치환했다.
- `heading-40` 2건은 가까운 새 scale인 `heading-36`으로 이동.
- `heading-32` 2건은 기존 문서 매핑(`heading-32 → heading-36`)에 맞춰 `heading-36`으로 이동하고, 기존 invert text combo는 유지.
- Publish는 하지 않음.

2026-07-09 typography scale 재검증/값 보정:
- 홈 페이지를 다시 조회한 결과, `heading-40`, `heading-52`, `body-16`이 일부 요소의 `styleNames`에 여전히 남아 있음.
- `set_style`로 해당 요소에서 old class를 제거하려 했지만 MCP가 기존 combo를 다시 병합해 실제 `styleNames`가 유지됨.
- 렌더링 값 기준으로는 old selector를 가장 가까운 최종 scale 값과 동일하게 보정했다.
  - `display-96` = `display-88` 값(88px / 1.1 / -0.02em)
  - `heading-52` = `heading-54` 값(54px / 1.2 / -0.02em)
  - `heading-40`, `heading-32` = `heading-36` 값(36px / 1.3 / -0.02em)
  - `body-16` = `body-18` 값(18px / 1.5 / -0.02em)
- 결론: 실제 표시 값은 요청 scale로 맞췄지만, 클래스명 기준 완전 정리는 Webflow Designer에서 sticky old combo를 직접 제거해야 한다.
- Publish는 하지 않음.

2026-07-09 typography selector completeness 재확인:
- `body-20` selector가 존재하지만 스타일 값이 비어 있거나 기대 값이 안 보이는 문제를 재확인했다.
- 최종 typography selector 전체에 명시 값을 다시 적용했다:
  - Display: `display-200/188/108/88`
  - Heading: `heading-64/54/48/36/28`
  - Body: `body-24/20/18`
- `body-20`은 Webflow가 이미 존재하는 path로 판단해 신규 생성은 거절했다. 기존 `body-20` selector에 `font-size:20px`, `line-height:1.5`, `letter-spacing:-0.02em`을 적용했다.
- 2026-07-09 재확인 당시 `body-20` path는 true global이 아니라 `isComboClass:true` selector로 잡혔다. 아래 `body-20 global migration`에서 해결했다.
- `heading-54/36/28` 및 sticky old selector(`heading-52/40/32`)의 line-height를 `docs/webflow-design-system.md` 표와 일치하도록 보정했다.
- Publish는 하지 않음.

2026-07-09 body-20 global migration 완료:
- 문제 원인: `body-2`가 20px 값을 갖고 있고, `body-20`은 단독 global utility가 아니라 combo/empty path로 잡혀 단독 적용 시 스타일이 먹지 않았다.
- 조치: 기존 combo `body-20` selector(`f48fd70b-e2f5-7fca-0b69-14c8932abfae`)를 `legacy-body-20-combo`로 rename했다.
- 조치: 기존 `body-20` path를 true global selector(`dc131ea8-ab87-7985-4ffa-a95fbfca2ec0`, `isComboClass:false`)로 업데이트하고 `font-size:20px`, `line-height:1.5`, `letter-spacing:-0.02em`을 적용했다.
- 운영 기준: 새 작업은 `body-20 text-* regular/medium` 조합만 사용한다. `body-2`와 `legacy-body-20-combo`는 legacy로 보고 page cleanup 때 `body-20`으로 치환한다.
- Publish는 하지 않음.

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
  .service-head (flex-between margin-bottom-xl) : h2.display-88 + p.body-18.text-secondary
  .service-grid                          2열 벤토
    .service-col
      a.service-card[.service-tall|.h-full].border.border-strong.text-primary
        .service-bg / .service-arrow>↗ / .service-text
          badge(컴포넌트) / .service-text-title (h3.heading-48 + p.body-18.text-secondary)
```

### 3.2 Global — 사용자 골격(fee26521)
```text
.inner.grid-6-6
  (left) .section-title>.service-text-title(display-88 + body-18) / .global-button-wrap>a.global-office ×2
  .right .global-canvas > HtmlEmbed(three.js 글로브)
```

### 3.3 Services (3카드) — 사용자 골격(7a2eb61f)
```text
.section-title>h2.text-center.heading-64(2줄)
.contents>.grid-3
  .service-card.border.border-strong.text-primary ×3
    .service-text-title(h4.heading-36 + p.body-18.text-secondary)
    .main-services-icon-box.flex-center>HtmlEmbed(아이콘 SVG)
    div > button 컴포넌트(outline-white)   ← 라벨 "View More"는 Designer에서 수정
```

### 3.4 Insight (Swiper) — 사용자 골격(baa13aed), CMS 연동 예정
```text
.section-title>h2.heading-54.text-center "Insights"
.contents
  [사용자 지정 div] .insights-swiper.swiper
    .swiper-wrapper > a.insights-slide.swiper-slide.border.border-strong.text-primary ×3
        .service-bg / .insights-slide-overlay(다크 그라데이션) / .insights-slide-body(z2)
          badge("Data Security") / h3.heading-28.insights-slide-title
  .insights-nav
    .insights-arrow.insights-prev>HtmlEmbed(←) / .insights-pagination.swiper-pagination / .insights-arrow.insights-next>HtmlEmbed(→)
  HtmlEmbed → Swiper CDN(v11) + init
```
- Swiper: desktop 3 (992+) / tablet 2 (640+) / mobile 1.1. navigation→`.insights-prev/.insights-next`, pagination→`.swiper-pagination`.
- **pagination은 `insights-pagination`으로 분리, `position:static` + `margin-top`** (absolute 금지). nav 행에 prev/pagination/next 가로 하단 배치.

### 3.5 Consulting (원형 4개, 겹침) — 사용자 골격(fc4eadbf)
```text
.section-title.text-center>h2.heading-64 "eDiscovery Consulting" + p.body-24.regular(서브카피)
.contents
  ul.circle-list                         display:flex, justify-content:center, gap 0, nowrap
    li.circle-item ×4                     452×452 고정, radius-full, overflow hidden, flex 0 0 auto
                                          margin-left: -96px  (겹침), first-child margin-left: 0
      .circle-bg                          blur 글래스 (backdrop-filter blur 8px, rgba(3,14,22,0.55), 보더)
      .circle-body (z1, max-width 220px)  .heading-28.text-primary [제목] / .circle-arrow ↓ / p.body-18.text-secondary
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
      h1.display-108.fm-en.text-center "The eDiscovery Standard"
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
- URL 상태 확인: Docusign page slug/publishedPath는 `/page-docusign`이 맞지만 `draft:true` 상태라 `https://intellectualdata.webflow.io/page-docusign`은 404가 정상이다.
- Webflow page publish는 하지 않았다. live URL 테스트는 Docusign page를 draft 해제하고 publish한 뒤 진행한다.

### 3.10 Docusign Sub Sticky List

Docusign pageId `6a48b6aa23d56c4e126d23d2`의 product tab 하단, 사용자가 만든 `.sub-sticky-list` 섹션(grid-2)
안을 native로 채웠다. 왼쪽은 sticky 제목, 오른쪽은 카드 3개인 2단 레이아웃이다.

```text
.sub-sticky-list (section, padding-y-xl)
  (no-container / inner, grid-2 ← align-items:start)
    .sub-sticky-aside                     왼쪽: position:sticky
      Heading "지금 우리 기업에게 Docusign®이 필요한 이유"
    (right block)
      ul.sub-sticky-items (role=list)
        li.sub-sticky-card ×3
          .sub-sticky-card-head
            .sub-sticky-card-icon         48×48 flex-center, 빈 아이콘 슬롯
            p.card-num                    "01" / "02" / "03"
          .sub-sticky-card-body
            h3.sub-sticky-card-title
            p.sub-sticky-card-desc
```

- native `List`(ul) + `List Item`(li)로 만들었다. HtmlEmbed/custom JS를 쓰지 않았다.
- 왼쪽 `sub-sticky-aside`: `position:sticky; top:120px; align-self:start`. 조상 중 overflow:hidden/auto가 없어 sticky가 유효하다(grid-2가 이미 align-items:start). `top:120px`는 헤더 offset 기본값이며 조정 가능. 실제 따라오는 동작은 Preview/publish에서 확인한다.
- 아이콘 슬롯 `sub-sticky-card-icon`(48×48 flex-center)은 빈 placeholder다. 사용자가 아이콘을 채운다.
- 당시 단일 클래스 규칙을 적용해 scope 요소에 typography 값을 직접 넣었다. 이 규칙은 2026-07-09 최종 규칙에서 폐기되었고, 이후 작업은 `heading-*`/`body-*` + `text-*` + weight 조합을 쓴다.
  - title 굵기는 h3 태그 기본 heading 스타일에서 온다(`heading-36`에도 weight 없음).
- `card-num`은 **범용 글로벌 atom**으로 승격했다(`sub-sticky-card-num` → `card-num` rename). 고정 `48×48` + flex-center 구조다. 숫자 타이포/색은 최종 규칙상 utility 조합으로 관리한다.
- 색은 전부 변수 참조: title `color/text/title`(#FFF), num/desc `color/text/desc`(#EEE), card border `color/border/default`(#24495c).
- Webflow page publish는 하지 않았다.

### 3.11 Docusign Case Grid Row Fix

Docusign pageId `6a48b6aa23d56c4e126d23d2`의 IAM 업무 효율화 사례 카드 그리드(`sub-cases-grid`)를 재확인했다.

- 실제 구조상 `sub-cases-grid`의 직접 자식은 `case-card` 3개뿐이다.
- Designer에서 하단에 빈 3칸이 보인 원인은 `repeat(3, 1fr)` column 설정이 아니라 explicit row track이 남아 있었기 때문으로 판단했다.
- `sub-cases-grid` 스타일을 `display:grid`, `grid-template-columns: repeat(3, minmax(0, 1fr))`, `grid-auto-rows:auto`, `grid-template-rows:auto`로 정리했다.
- 3개 카드만 있을 때 두 번째 빈 행이 생기지 않도록 row를 자동 행으로 맞췄다.
- Publish는 하지 않았다.

### 3.12 Legal System Content Layout

Legal System pageId `6a48b6abc9c50156728b3e4e`는 기존 공통 `sub-visual`과 `intro` 구조를 유지하고, 본문 하단만 내용 우선 카드 구조로 정리했다.

```text
sub-visual
  sub-visual__container.no-container
    inner.sub-visual__inner
      sub-visual__title-box
        heading-28.text-title.bold "Solutions"
        sub-visual__title-stack
          display-88.text-title.bold.fm-en "Legal System"
          body-24.text-body.regular
  breadcrumb

sub-nav
  sub-nav-inner
    sub-nav-link
    sub-nav-link.sub-nav-active "Legal System"

section-padding
  no-container
    sub-intro__headline
      sub-intro__title > h2.heading-54.text-title.bold
      sub-intro__body > p.body-24.text-body.regular

sub-legal-problems
  no-container
    sub-legal-problems__inner
      sub-section-txt
        sub-section-txt-title
        h2.heading-54.text-title-invert
      section-contents
        ul.sub-legal-problems__grid
          li.sub-legal-problems__card x4
            sub-legal-problems__card-head > icon-wrap + h4.heading-28
            sub-legal-problems__card-body > p.body-20

sub-legal-functions
  no-container
    sub-legal-functions__inner
      sub-section-txt
        sub-section-txt-eyebrow > body-24.text-title.regular "Main Function"
        sub-section-txt-title > h2.heading-54.text-title.bold
      section-contents
        ul.sub-legal-functions__list
          li.sub-legal-functions__card x4
            sub-legal-functions__num-wrap > p.num.num-64.num-primary
            sub-legal-functions__card-head > h4.heading-28
            sub-legal-functions__card-body > p.body-20

sub-cta.section-padding
  no-container
    sub-cta__inner
      sub-cta__body > h1.heading-54.text-title.bold
      sub-cta__actions > button.is-brand.is-fill
```

- `sub-visual`과 intro는 기존 페이지 공통 구조를 그대로 사용하도록 복원했다.
- 페이지 내용 기준으로 Problems / Functions 위계를 명확히 분리했다.
- 페이지/영역 prefix 규칙에 따라 Legal System 본문 섹션은 `sub-legal-*`로 시작하도록 정리했다.
- 하단 본문 섹션 컨테이너는 최종 규칙에 맞춰 `no-container`를 목표로 정리했다. Header 외 `*__container`는 새 기준에서 쓰지 않는다.
- Product sub-nav active 상태를 Docusign에서 Legal System으로 수정했다.
- 기능 카드 번호가 모두 `1`이던 것을 `01`~`04`로 정리했다.
- breadcrumb의 현재 페이지명을 `Legal System`으로 수정하고, 복사 잔여 클래스(`breadcrumb-trigger 2`, `breadcrumb-link 4` 등)를 페이지 내에서 정리했다.
- 문제/기능 카드에 `sub-legal-problems__card-head/body`, `sub-legal-functions__card-head/body`를 추가해 제목/본문 간격과 카드 내부 위계를 보강했다.
- 카드 텍스트는 `legal-card__title`, `legal-card__desc` 같은 전용 텍스트 클래스를 쓰지 않고 범용 typography로 접근한다.
- 실제 적용값은 제목 `heading-28`, 본문 `body-20`이다. 제목 굵기는 기존 Strong inline 구조가 담당한다.
- 기존 법무 업무 어려움 카드 4개에는 `icon-wrap` 빈 슬롯을 추가했다. 내부에는 이후 SVG 또는 Image를 넣는다.
- 기능 번호는 Legal System 전용 번호 클래스가 아니라 범용 `num num-64 num-primary` 조합으로 교체했다.
- 섹션 contents 래퍼는 Legal System 전용 이름을 쓰지 않고 범용 `section-contents`로 통일했다.
- `icon-wrap`: 64×64, flex-center, overflow hidden. `num`: flex-center/round/base number style, `num-64`: 64×64 size, `num-primary`: brand primary 배경 + white text 변수 참조.
- Legal System 전용 `legal-visual*`, `legal-intro*` 구조는 최종 사용하지 않는다.
- Webflow Designer에서 카드 텍스트 16개를 실제로 교체했고, 최종 트리 기준 `legal-card__title`, `legal-card__desc`는 남아 있지 않다.
- 2026-07-09 추가 정리:
  - Problems / Functions 섹션 헤드 wrapper를 공통 `sub-section-txt` + `sub-section-txt-title`/`sub-section-txt-eyebrow` 구조로 변경했다.
  - page-specific CTA root `sub-legal-cta` 구조를 공통 `sub-cta > no-container > sub-cta__inner > sub-cta__body + sub-cta__actions` 기준으로 흡수했다.
  - 카드 본문 문단에는 최종 텍스트 조합 `body-20 text-body-invert regular`를 재적용했다.
  - 텍스트 태그 정리 규칙에 맞춰 Legal System의 주요 `h/p`에 target 조합을 재적용했다.
    - sub-visual: `h4.heading-28 text-title bold`, `h1.display-88 text-title bold fm-en`, `p.body-24 text-body regular`
    - intro: `h2.heading-54 text-title bold`, `p.body-24 text-body regular`
    - section title/CTA: `heading-54 text-title/text-title-invert bold`
    - card title/body: `heading-28 text-title-invert bold`, `body-20 text-body-invert regular`
  - `Main Function` eyebrow는 실제로는 Heading element라 body utility를 적용했지만, Webflow MCP `set_tag`가 Heading element에서 `p` tag 변환을 허용하지 않아 태그 자체는 h2로 남는다.
  - MCP `set_style` 한계로 일부 요소의 기존 combo가 병합되어 남는다. 확인된 sticky combo는 `sub-normal-banner-title`, `sub-normal-banner-desc`, `sub-solution-table-body-list-desc`, `inner`, `sub-visual__inner`, `product-tabs__container`, `section-title`, `heading-32`, `sub-intro` 등이다.
  - 위 sticky combo는 값 기준 표시보다 클래스 위생 문제에 가깝다. Webflow Designer에서 해당 요소의 old combo를 직접 제거해야 완전 정리된다.
- 2026-07-09 class hygiene 재검토:
  - `sub-section-txt-eyebrow > h2`의 `inner sub-visual__inner` combo는 `set_style: []` 후 `body-24 regular`를 재적용해 제거했다. 태그는 MCP 제한으로 h2 상태다.
  - Legal System 주요 텍스트에 대해 `set_style: []` 후 clean utility 재적용을 테스트했다.
  - `text-title`, `text-body`, `text-title-invert`, `display-88`, `fm-en`, `no-container`, `num-64`, `num-primary`가 Webflow style query 기준 combo selector로 확인됐다.
  - 추가 검증에서 `heading-28`, `heading-54`, `heading-64`, `body-20`도 요소에 재적용할 때 `heading-32` 또는 `sub-solution-table-body-list-desc`가 다시 붙는 sticky behavior를 보였다.
  - 따라서 Legal System의 완전한 텍스트 class hygiene은 요소 교체만으로 완료할 수 없고, typography/color utility selector를 global utility(`isComboClass: false`)로 정규화하는 별도 style-selector migration pass가 필요하다.
  - 현재 page-level cleanup으로 `body-24 regular`가 clean하게 남는 본문/eyebrow 일부는 정리됐지만, `heading-*`/`body-20` 기반 제목과 카드 본문에는 `heading-32`, `sub-solution-table-body-list-desc` 같은 selector-level legacy가 계속 남을 수 있다.
  - 이 상태에서는 `text-*` 색상 utility를 억지로 다시 붙이지 않는다. 붙이는 순간 old combo가 되살아나므로, 색상 utility 정규화 이후에 `heading-* text-* weight`, `body-* text-* weight` 최종 조합으로 재적용한다.
- 2026-07-09 font-family 정리:
  - Legal System `sub-visual` 제품명 H1은 영문 제품/솔루션명 톤에 맞춰 `fm-en`을 적용했다.
  - Legal System `sub-intro` 한국어 H2는 인트로 문장 톤에 맞춰 `fm-ko`를 적용했다.
  - 검증된 실제 style stack: sub-visual H1 `heading-64 heading-40 fm-en heading-32 bold`, sub-intro H2 `heading-64 fm-ko heading-32 bold`.
  - `fm-en`과 `heading-*` utility가 아직 combo selector 영향을 받아 `heading-40`/`heading-32`가 함께 남는다. 폰트 방향은 반영됐고, 완전한 class hygiene은 typography selector 정규화 pass에서 처리한다.
- 2026-07-09 text color 복구:
  - 이전 class hygiene 패스에서 일부 `text-*` color utility를 빼면서 Legal System 화면 컬러가 어긋났기 때문에 최신 텍스트 규칙을 우선해 컬러 유틸을 재적용했다.
  - sub-visual: `heading-28 text-title bold`, `display-88 text-title fm-en bold`, `body-24 text-body regular`.
  - sub-intro: `heading-64 text-title fm-ko bold`, `body-24 text-body regular`.
  - Problems: section/card title은 `text-title-invert`, card body는 `text-body-invert` 기준으로 복구했다.
  - Functions: eyebrow/title/CTA는 `text-title`, card title/body는 `text-title-invert`/`text-body-invert` 기준으로 복구했다.
  - 검증상 `text-title`, `text-body`, `display-88`, `fm-en` 등이 기존 combo selector를 끌고 와 `section-title`, `inner`, `sub-visual__inner`, `heading-32`, `fm-ko` 같은 old class가 다시 보일 수 있다. 현재 패스는 화면 컬러 복구가 우선이며, class hygiene은 selector 정규화 이후 다시 처리한다.
- Publish는 하지 않았다.

### 3.13 Luminance Content Layout

Luminance pageId `6a48b6ac5c255cd6f771aba7`는 기존 공통 `sub-visual`과 `sub-intro`를 유지하고, 중간 본문만 `docs/luminance.md` 내용 기준으로 다시 구성했다.

```text
sub-visual
  sub-visual__container.no-container
    inner.sub-visual__inner
      sub-visual__title-box
        heading-28 "Solutions"
        sub-visual__title-stack
          fm-en.display-96 "Luminance"
          body-24.regular
  breadcrumb "Luminance"

sub-nav
  sub-nav-inner
    sub-nav-link
    sub-nav-link.sub-nav-active "Luminance"

sub-intro.section-padding
  no-container
    sub-intro__headline
    contents > youtube-video-wrap

sub-lumi-trust.section-padding
  no-container
    sub-lumi-trust__inner
      sub-section-txt
      section-contents > sub-lumi-trust__logo-grid

sub-lumi-partner.section-padding
  no-container
    sub-lumi-partner__inner
      sub-section-txt
      section-contents > sub-lumi-partner__layout

sub-lumi-capabilities.section-padding
  no-container
    sub-lumi-capabilities__inner
      sub-section-txt
      section-contents > sub-lumi-capabilities__grid

sub-lumi-security.section-padding
  no-container
    sub-lumi-security__inner
      sub-section-txt
      section-contents > sub-lumi-security__layout

sub-lumi-impact.section-padding
  no-container
    sub-lumi-impact__inner
      sub-section-txt
      section-contents > sub-lumi-impact__grid

sub-cta.section-padding
  no-container
    sub-cta__inner > sub-cta__box
```

- `sub-visual`, `sub-intro`, CTA 성격의 버튼/배너 패턴은 기존 공통 흐름을 유지했다.
- Hero 제목/설명과 breadcrumb 현재 페이지명을 `Luminance`로 교체했다.
- Product sibling `sub-nav`를 추가하고 Luminance 링크만 `sub-nav-active`로 설정했다.
- 기존에 남아 있던 Docusign/Legal System 복사 잔여 섹션을 이 페이지 안에서 제거했다.
- 본문은 Trust / Korea Partner / Capabilities / Security / Customer Stories / CTA 순서로 재구성했다.
- 2026-07-09 추가 정리:
  - 잘못 남아 있던 Legal System intro 섹션을 제거했다.
  - 본문 섹션 root의 `sub-intro` combo를 제거하고 `sub-lumi-trust`, `sub-lumi-partner`, `sub-lumi-capabilities`, `sub-lumi-security`, `sub-lumi-impact`, `sub-cta` 기준으로 재적용했다.
  - 각 본문 섹션은 `no-container > sub-xxx__inner > sub-section-txt + section-contents` 구조로 정리했다.
  - Luminance nav active는 `Luminance` 링크 1개만 갖도록 수정했다.
  - 기존 축약 copy를 `docs/luminance.md`의 KR 원문 기준으로 복구했다. 검증된 복구 문구는 Forbes AI Startup 문장, 한국 공식 파트너 문장, Legal-Grade LLM 설명, 보안 cloud 분리 설명, TRENCH 비용 절감 문장, CTA comma 포함 title이다.
  - MCP `set_style: []` 후 재적용해도 root query에 `sub-litera-trust` sticky combo가 함께 남는다. 화면 영향 확인과 class hygiene은 Designer 수동 정리 대상이다.
- 로고/인증 이미지는 아직 파일 연결 전이라 텍스트 placeholder와 카드 구조만 먼저 잡았다.
- Webflow `element_snapshot_tool`은 `status:false`를 반환해 시각 캡처 검증은 완료하지 못했다.
- Publish는 하지 않았다.

2026-07-09 Luminance layout refinement:

Note: the white/secondary background choices in this refinement were a
temporary middle state. The later "Luminance dark-body background reset" is the
current final direction for Luminance page sections.

- `sub-lumi-trust`, `sub-lumi-partner`, `sub-lumi-capabilities`, `sub-lumi-security`, `sub-lumi-impact` root selector background을 재정의했다. `#171a21` 계열 배경을 새로 쓰지 않고, `sub-lumi-trust`/`sub-lumi-partner`는 white, `sub-lumi-capabilities`/`sub-lumi-security`/`sub-lumi-impact`는 `--color--bg--secondary` 기준값 `#EEF1F2`로 맞췄다.
- `sub-lumi-capabilities`, `sub-lumi-security`, `sub-lumi-impact`는 page root에 `bg-secondary`를 추가해 secondary 섹션으로 식별된다. 해당 섹션 내부 텍스트는 secondary의 밝은 배경 기준으로 `text-title`/`text-body`를 사용하고, inverse 텍스트는 쓰지 않는다.
- `sub-lumi-trust__logo-grid`는 3-column logo card grid로 정리하고, 각 logo card는 `sub-lumi-trust__logo > sub-lumi-trust__logo-media + label` 구조가 되도록 placeholder 6개를 추가했다.
- `sub-lumi-security__layout`은 cloud 설명 card, security media placeholder, certification card grid가 보이도록 재구성했다. 보안 다이어그램 슬롯 `sub-lumi-security__media` 1개와 인증 배지 슬롯 `sub-lumi-security__cert-media` 3개를 추가했다.
- `sub-lumi-partner__layout`, `sub-lumi-partner__list`, `sub-lumi-partner__item`, `sub-lumi-partner__trial`, `sub-lumi-capabilities__grid`, `sub-lumi-capabilities__card`, `sub-lumi-capabilities__card-head`, `sub-lumi-security__cloud`, `sub-lumi-security__cert-list`, `sub-lumi-security__cert`, `sub-lumi-impact__card-head` 스타일을 생성/적용했다.
- Webflow MCP `set_style`은 Luminance root에서 기존 `sub-litera-trust`/`sub-litera-feature` combo를 완전히 제거하지 못하고 병합한다. 실제 배경 충돌을 줄이기 위해 Luminance root selector 자체에 white/secondary background를 명시했으며, 남은 legacy combo는 class hygiene 마이그레이션 대상이다.
- 검증 기준: `sub-lumi-trust__logo-media` 6개, `sub-lumi-security__media` 1개, `sub-lumi-security__cert-media` 3개, `bg-secondary` root 3개 확인. Publish는 하지 않았다.
- 2026-07-09 Luminance inherited background fix:
  - `sub-litera-trust`와 `sub-litera-feature`에 남은 sticky background 영향은 selector 자체를 `transparent`/`inherit` 기준으로 neutralize했다.
  - Luminance root background는 실제 의도에 맞춰 명시했다. `sub-lumi-trust`/`sub-lumi-partner`는 white, `sub-lumi-capabilities`/`sub-lumi-security`/`sub-lumi-impact`는 secondary `#EEF1F2` 기준이다.
  - 공통 섹션인 `sub-visual`, `sub-nav`, `sub-intro`, `sub-cta`는 그대로 두고, Luminance 본문 전용 섹션은 `sub-lumi-*` prefix로 통일했다.
  - `sub-trust`, `sub-partner`, `sub-capabilities`, `sub-security`, `sub-impact`는 어떤 제품 페이지의 섹션인지 모호해 각각 `sub-lumi-trust`, `sub-lumi-partner`, `sub-lumi-capabilities`, `sub-lumi-security`, `sub-lumi-impact`와 대응 BEM 내부 클래스로 rename했다.
  - 이전 pass에서 `sub-lumi-impact` root style은 강제 우선순위 배경값과 `color:#171A21` 기준으로 보정했으나, 이후 dark-body reset에서 폐기했다.
  - `sub-lumi-impact` 내부 텍스트는 밝은 surface 기준 `text-title`/`text-body`로 재적용했다. 텍스트 태그에 sticky로 남은 `bg-primary`는 실제 surface가 아니므로 해당 문단에 `text-bg-reset`을 다시 적용했다.
  - Luminance 본문 텍스트는 inverse가 아니라 light surface 기준 `text-body`/`text-title`로 복구했다. affected text 기준 `text-body-invert`/`text-title-invert` 잔여는 0개로 확인했다.
  - `bg-primary`가 텍스트 태그 14개에 sticky combo로 남아 있으나, 이는 실제 dark surface가 아니라 MCP class 병합 오염이다. 해당 텍스트에는 `text-bg-reset`을 적용해 텍스트 레벨 background만 transparent로 neutralize했다.
  - `text-bg-reset`은 sticky text-tag `bg-primary` 완화용 예외이며, 실제 section/card surface의 `bg-primary`를 대체하는 일반 규칙이 아니다. 콘텐츠 copy는 변경하지 않았고 Publish도 하지 않았다.

2026-07-09 Luminance dark-body background reset:
- 사용자 기준 변경에 따라 Luminance 본문 섹션의 `bg-white`/`bg-secondary` surface utility를 제거하고, page/body의 dark background를 기준으로 쓰도록 되돌렸다.
- `text-bg-reset`에 남아 있던 강제 우선순위 배경값은 일반 `background: transparent`로 교체했다. 이 프로젝트에서는 CSS 강제 우선순위 키워드를 쓰지 않는다.
- 추가 확인에서 element class가 아니라 `sub-lumi-trust` selector 자체에 white background와 강제 우선순위 배경값이 남아 있음을 확인했다. `sub-lumi-trust`, `sub-lumi-partner`, `sub-lumi-capabilities`, `sub-lumi-security`, `sub-lumi-impact` root selector를 모두 `background-color: transparent`, `background: transparent`, `color: inherit`로 재설정했다.
- Luminance card/panel류 selector(`sub-lumi-trust__logo`, `sub-lumi-partner__item`, `sub-lumi-partner__trial`, `sub-lumi-capabilities__card`, `sub-lumi-security__cloud`, `sub-lumi-security__cert`, `sub-lumi-impact__card`)도 `background-color: transparent`, `background: transparent`, `color: inherit`로 재설정했다.
- `sub-lumi-* section-padding` 순서가 최종 기준이다. MCP `set_style`은 일부 root에서 기존 combo path를 병합해 `section-padding`이 앞에 보이거나 `sub-litera-trust` sticky combo가 다시 붙는다.
- 따라서 Luminance root 중 `section-padding`이 앞에 보이는 항목은 화면 배경 유틸 제거는 완료됐지만, selector path 자체를 global root class로 재생성하는 별도 class hygiene 대상이다.
- Publish는 하지 않음.

### 3.14 Litera Content Layout

Litera pageId `6a48b6ac277c73d0d6510cf8`는 1차 WHTML 레이아웃이 별도 AI 랜딩처럼 보였고,
2차 `litera-shell` 구조도 Legal System의 상단 구조와 달라 제거했다. 최종 상태는 Legal System 페이지의
`sub-visual`, `sub-nav`, `sub-intro` 흐름을 그대로 재사용하고, 본문만 Litera 내용에 맞춘 다크 브랜드 톤으로 구성했다.

```text
section.sub-visual
  sub-visual__container.no-container
    inner.sub-visual__inner
      sub-visual__title-box
      sub-visual__title-stack
      sub-visual__actions
      breadcrumb

nav.sub-nav
  no-container
    sub-nav-inner
      sub-nav-link
      sub-nav-link.sub-nav-active "Litera"

section.sub-intro.section-padding
  no-container
    sub-intro__inner
      sub-intro__headline
      sub-intro__title
      sub-intro__body
        litera-body-stack

section.sub-litera-proof
  litera-container
    section-title
    litera-logo-marquee
      ul.litera-logo-track[data-litera-marquee="true"]
        li.litera-logo-item
          div.litera-logo-wrap
            img.litera-logo-img
            span.litera-logo-label

section.sub-litera-local
section.sub-litera-products#litera-products
section.sub-litera-compliance
section.sub-litera-stories
section.sub-cta#litera-contact
```

- 1차로 삽입했던 `sub-litera-page` root와 2차 `main.litera-shell` root는 제거했다.
- 상단 `sub-visual`, product sibling `sub-nav`, `sub-intro`는 Legal System의 구조와 클래스 흐름을 기준으로 맞췄다.
- 본문은 Proof / Local Partner / Products / Compliance / Stories / CTA 순서로 구성했다.
- 고객이 민감하게 보는 본문 문구는 `docs/litera.md` 한국어 원문을 요약하거나 재작성하지 않고 그대로 배치했다.
- 별도 장식용 라벨과 임의 metric row는 제거했다.
- 새 본문은 `#011926` / `#061f2e` 기반의 다크 브랜드 톤, 얇은 border, 넓은 여백, 절제된 panel 구조로 정리했다.
- 공통 selector에 CSS를 덮어쓰지 않고, 충돌이 없는 `litera-*` / `sub-litera-*` selector만 정의했다.
- `get_all_elements` 검증 기준 실제 Body top-level에는 `sub-visual`, `sub-nav`, `sub-intro section-padding` 이후 Litera 본문 섹션이 배치되어 있다.
- 고객사 로고와 보안 인증 로고는 `ul > li > div.litera-logo-wrap > img.litera-logo-img + span.litera-logo-label` 구조로 만들었다.
- 고객사 로고 마퀴는 `litera-logo-track[data-litera-marquee="true"]`에 page 내부 script가 `transform: translateX(...)`를 갱신한다.
  CSS `@keyframes`는 WHTML builder에서 거부되어, 사용자가 요청한 마퀴 효과에 한해 script fallback을 유지했다.
- placeholder 이미지는 실제 asset이 아니므로 WHTML builder가 16개 image에 대해 managed asset 미연결 warning을 반환했다. 실제 로고/인증 파일 연결 시 교체 대상이다.
- 레거시/미사용 selector는 삭제하지 않는다. 새 작업에서 재사용하지 않는 방향으로만 관리한다.
- 2026-07-09 추가 정리: Litera 페이지의 `h`/`p` 태그에 붙어 있던 전용 텍스트 클래스
  (`litera-section-title`, `litera-card-title`, `litera-proof-copy`, `litera-card-copy`,
  `litera-product-name`, `litera-story-title`, `litera-story-copy`)를 제거하고
  `heading-*`/`body-*` + `text-*` + weight utility 조합으로 교체했다.
  검증 기준 `Heading`/`Paragraph` 요소에서 `litera-` style query는 0건이다.
- 2026-07-09 제품 카드 정리:
  - `litera-feature-item` 11개를 단순 리스트가 아니라 border/background/padding이 있는 카드형 리스트로 변경했다.
  - 제품명 H3 옆에 `litera-product-head > h3 + litera-product-logo` 구조를 추가했다.
  - 기존 큰 로고 영역으로 쓰던 `litera-product-media`와 "로고 파일 전달 예정" 텍스트는 Litera 페이지 기준 0건이다.
  - 제품명 H3에는 `heading-28 text-title-invert bold`를 적용했다. Webflow MCP sticky combo로 `heading-32`가 함께 표시될 수 있다.
- 2026-07-09 섹션 제목/아이콘 슬롯 정리:
  - `litera-proof-head`, `litera-sticky-head`는 섹션 제목 영역 전용 wrapper이므로 공통 `section-title`로 흡수했다.
  - `litera-proof-head`, `litera-sticky-head` style query는 Litera 페이지 기준 0건이다.
  - `Litera의 법률 AI 및 업무 자동화 기능` 영역의 `litera-feature-item`에는 아이콘 슬롯을 두지 않는다. 제품 기능은 카드형 텍스트 리스트로만 유지한다.
  - `Litera 도입부터 운영까지 지원하는 한국 공식 파트너` 영역의 `litera-support-card` 4개에는 첫 자식으로 빈 `icon-wrap`을 추가했다.
    구조는 `litera-support-card > icon-wrap + heading/text utility title + body/text utility desc`이며, 각 슬롯은 `aria-hidden="true"`이다.
- 2026-07-09 contrast 정리:
  - 어두운 Litera 본문 섹션(`sub-litera-proof`, `sub-litera-local`, `sub-litera-products`, `sub-litera-compliance`, `sub-litera-stories`)의 paragraph를 배경 기준으로 다시 판정했다.
  - dark section/card/panel 내부 paragraph는 `set_style: []` 후 `body-* regular text-body-invert`만 재적용했다.
  - 검증 기준 dark section 내부 paragraph는 모두 `text-body-invert`를 갖는다.
    단, Litera 지원 카드 paragraph 일부는 Webflow MCP `set_style` 한계로 기존 `sub-solution-table-body-list-desc`, `body-24`, `text-body` sticky combo가 query 결과에 함께 남는다.
    `set_style: []` 후 재적용, 새 요소 재생성, TextBlock 생성까지 테스트했으나 페이지의 기존 텍스트 selector가 자동 병합되어 클래스 query상 완전 제거는 Designer 수동 정리 대상이다.
  - `litera-quote`, `litera-logo-label`, `litera-cert-label`처럼 텍스트 태그 utility 규칙 밖의 custom text class도 dark background에서 읽히도록 흰색 계열 color로 보정했다.
- Publish는 하지 않았다.

### 3.15 Nymi Band Content Layout

Nymi Band pageId `6a48b6af930b76bea467508d`는 기존 공통 `sub-visual`, `sub-nav`, `sub-intro`를 유지하고,
본문만 `docs/nymi band.md`의 업데이트 내용과 기존 페이지의 변경 없음 영역을 기준으로 다시 구성했다.

Note: early Nymi layout notes used white/secondary surface sections. The later
"Nymi dark-body background reset" is the current final direction: no
`bg-white`/`bg-secondary` on Nymi body section roots unless explicitly approved
in a future pass.

```text
section.sub-visual
nav.sub-nav
section.sub-intro.section-padding

section.sub-nymi-workflow.section-padding
  no-container
    sub-nymi-workflow__inner
      sub-section-txt
      section-contents
        sub-nymi-workflow__layout
          sub-nymi-workflow__media.image-placeholder
          sub-nymi-workflow__accordion
            details.sub-nymi-workflow__item

section.sub-nymi-trust.section-padding
  no-container
    sub-nymi-trust__inner
      sub-section-txt
      section-contents
        sub-nymi-trust__logo-grid
        sub-nymi-trust__result

section.sub-nymi-feature.section-padding
section.sub-nymi-industries.section-padding
section.sub-nymi-integrations.section-padding
section.sub-cta.section-padding
```

- 기존에 복사 잔여로 남아 있던 `sub-litera-feature`와 `sub-solution` root를 제거했다.
- 본문 전용 섹션은 모두 `sub-nymi-*` prefix로 통일했다. 공통 섹션은 `sub-visual`, `sub-nav`, `sub-intro`, `sub-cta`를 재사용한다.
- `sub-nymi-workflow`는 white 섹션 안에 image placeholder와 `details/summary` 기반 accordion 구조로 정리했다.
- `sub-nymi-trust`는 7개 로고 placeholder(Pfizer, Lilly, 기존 5개 슬롯)와 도입 성과 metric card grid를 포함한다.
- `sub-nymi-feature`는 기능 및 장점 5개를 카드형 레이아웃으로 구성했고, Part4 01 사진 교체 영역은 `sub-nymi-feature__media.image-placeholder`로 남겼다.
- `sub-nymi-industries`는 추천 분야 6개를 카드 grid로 구성했다.
- `sub-nymi-integrations`는 white 섹션의 고급형 accordion으로 Software / Hardware / 글로벌 표준 컴플라이언스 준수를 묶었다.
- 텍스트 태그 규칙을 다시 맞췄다. 새 Nymi 본문 기준 `Paragraph(style:"sub-nymi")`, `Heading(style:"sub-nymi")` query는 0건이며, 텍스트는 `heading-*`/`body-*` + `text-*` + weight utility 조합만 사용한다.
- MCP `set_style`이 root에 `sub-litera-trust` sticky combo를 다시 붙이는 현상이 있어, root는 `section-padding`을 첫 class로 둔 새 section을 만든 뒤 기존 `no-container`를 이동시키는 방식으로 정리했다.
  최종 Body top-level 검증 기준 `sub-litera*`와 `sub-solution*` query는 0건이다.
- Product sibling nav의 복사 잔여를 정리했다. `Legal System` 링크의 `sub-nav-active`를 제거하고 `Nymi Band` 링크(`/page-nymi-band`)를 추가해 active nav는 1개만 남겼다.
- Breadcrumb 현재 페이지도 `Nymi Band`와 `/page-nymi-band`로 교체했다.

2026-07-09 Nymi dark-body background reset:
- 사용자 기준 변경에 따라 Nymi 본문 섹션의 `bg-white`/`bg-secondary` surface utility를 제거하고, page/body의 dark background를 기준으로 쓰도록 되돌렸다.
- `sub-nymi-workflow`, `sub-nymi-trust`, `sub-nymi-feature`, `sub-nymi-industries`, `sub-nymi-integrations` root selector를 모두 `background-color: transparent`, `background: transparent`, `color: inherit`로 재설정했다.
- Nymi card/panel류 selector(`sub-nymi-workflow__item`, `sub-nymi-trust__logo`, `sub-nymi-trust__result`, `sub-nymi-trust__metric`, `sub-nymi-feature__card`, `sub-nymi-industries__card`, `sub-nymi-integrations__item`, `sub-nymi-integrations__panel`)도 `background-color: transparent`, `background: transparent`, `color: inherit`로 재설정했다.
- `sub-nymi-* section-padding` 순서가 최종 기준이다. MCP `set_style`은 일부 root에서 기존 combo path를 병합해 `section-padding`이 앞에 보이거나 `sub-litera-trust` sticky combo가 다시 붙는다.
- 따라서 Nymi root 중 `section-padding`이 앞에 보이는 항목은 화면 배경 유틸 제거는 완료됐지만, selector path 자체를 global root class로 재생성하는 별도 class hygiene 대상이다.
- Publish는 하지 않음.
- 이미지/로고가 들어갈 위치는 실제 asset 연결 전까지 `image-placeholder`/`logo-placeholder` wrapper로 유지한다. 최종 query 기준 placeholder slot은 13개다.
- Publish는 하지 않았다.

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
| `sub-sticky-list/-aside/-items/-card/-card-head/-card-icon/-card-body/-card-title/-card-desc` | Docusign sticky 2단 리스트(왼쪽 sticky 제목, 오른쪽 카드 3) |
| `sub-cases-grid` | Docusign IAM 사례 카드 3열 그리드. row는 auto로 유지 |
| `sub-legal-problems`, `sub-legal-functions` | Legal System 페이지 하단 본문 섹션 |
| `sub-legal-problems__inner/-grid/-card/-card-head/-card-body` | Legal System 문제 카드 섹션 구조. 텍스트는 `heading-*`/`body-*` 사용 |
| `sub-legal-functions__inner/-list/-card/-num-wrap/-card-head/-card-body` | Legal System 기능 카드 섹션 구조. 텍스트는 `heading-*`/`body-*` 사용 |
| `sub-section-txt/-title/-eyebrow` | 서브 페이지 섹션 제목 영역 공통 wrapper. `section-contents`와 sibling |
| `sub-cta/-__inner/-__body/-__actions` | 서브 페이지 공통 CTA 구조. 페이지별 CTA root를 새로 만들지 않음 |
| `sub-lumi-trust/-partner/-capabilities/-security/-impact` | Luminance 페이지 본문 전용 섹션 root. 공통 섹션이 아니므로 page prefix를 포함 |
| `sub-lumi-trust__inner/-logo-grid/-logo`, `sub-lumi-partner__inner/-layout/-list/-item/-trial` | Luminance 신뢰 로고/한국 파트너 섹션 구조. 섹션 제목 wrapper는 공통 `sub-section-txt` 사용 |
| `sub-lumi-capabilities__inner/-grid/-card/-card-head`, `sub-lumi-security__inner/-layout/-cloud/-cert-list/-cert` | Luminance 기능/보안 섹션 구조. 섹션 제목 wrapper는 공통 `sub-section-txt` 사용 |
| `sub-lumi-impact__inner/-grid/-card/-card-head` | Luminance 고객 사례 섹션 구조. quote 문단은 `body-* text-body regular` utility 조합 사용 |
| `sub-lumi-trust__logo-media`, `sub-lumi-security__media`, `sub-lumi-security__cert-media` | Luminance 이미지/로고/인증 배지 placeholder. 실제 이미지 연결 전 구조 슬롯으로 유지 |
| `sub-lumi-capabilities`, `sub-lumi-security`, `sub-lumi-impact` | Luminance 본문 섹션. 2026-07-09 dark-body rollback 이후 `bg-secondary`를 최종 기준으로 쓰지 않음 |
| `litera-container` | Litera 본문 전용 max-width wrapper. 상단 `sub-visual`/`sub-nav`/`sub-intro`에는 Legal System 공통 구조 사용 |
| `sub-litera-proof/-local/-products/-compliance/-stories` | Litera 본문 섹션 root. `sub-visual`, `sub-nav`, `sub-intro`, `sub-cta`는 공통 구조 재사용 |
| `section-title`, `litera-body-stack`, `litera-support-list/-card`, `litera-product-layout/-stack/-panel/-head/-logo`, `litera-story-grid/-card` | Litera 정보 위계와 카드/그리드 구조. `litera-support-card` 내부는 `icon-wrap + title + desc` 순서 |
| `litera-feature-list/-item` | Litera 제품 기능 카드형 리스트. 제품 기능 카드에는 아이콘 슬롯을 두지 않음 |
| `litera-logo-marquee/-track/-item/-wrap/-img/-label`, `litera-cert-grid/-wrap/-label` | Litera 고객사/인증 로고 placeholder 및 script marquee 구조 |
| `sub-nymi-workflow/-trust/-feature/-industries/-integrations` | Nymi Band 본문 섹션 root. 공통 `sub-visual`/`sub-nav`/`sub-intro`/`sub-cta` 외에는 page prefix를 포함 |
| `sub-nymi-workflow__inner/-layout/-media/-accordion/-item/-summary` | Nymi white workflow 섹션 구조. `details/summary` accordion과 image placeholder 포함 |
| `sub-nymi-trust__inner/-logo-grid/-logo/-result/-metric-grid/-metric` | Nymi 글로벌 도입 로고 placeholder 및 성과 metric card grid |
| `sub-nymi-feature__inner/-grid/-card/-media`, `sub-nymi-industries__inner/-grid/-card` | Nymi 기능 카드와 도입 추천 분야 카드 구조 |
| `sub-nymi-integrations__inner/-accordion/-item/-summary/-panel/-group/-badge-grid/-badge` | Nymi 연동 가능 시스템과 컴플라이언스 accordion 구조 |
| `icon-wrap` | 범용 아이콘 슬롯 wrapper. SVG/Image 삽입용 64×64 flex-center |
| `num`, `num-64`, `num-primary` | 범용 번호 뱃지 유틸. base/size/color를 분리해서 조합 |
| `card-num` (글로벌 atom) | 카드 번호 뱃지: 고정 48×48 + flex-center 구조, 재사용용 |

### 정리 이력
- Services 버튼: 커스텀 LinkBlock → `button` 컴포넌트(outline-white). Main CTA: `button`(fill-black) 추가.
- `Div Block` 전역 클래스 삭제. Core Services 전용 텍스트 클래스 삭제.
- 중복 생성했던 Global/Insights 섹션 삭제(사용자 골격만 사용).
- 슬라이드/원형/CTA 인너에 딸려붙은 `hero-arrow` 잔여 클래스 제거(→ hero 전용 규칙 확정).
- Sub Sticky List: 당시 단일 클래스 규칙으로 정리했으나, 최종 규칙은 텍스트 utility 조합으로 변경됨. `sub-sticky-card-num` → 범용 `card-num` 승격은 유지.

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
2. container naming 잔여: 홈 섹션 폭 래퍼는 `no-container-xl`로 정리됐지만, 일부 `*__container` combo가 Webflow MCP 교체 후에도 남아 있음.
3. `padding-y-xl` = 120px (규칙 맥락 32px 아님).
4. `banner-*`가 존재하지 않는 변수(`var(--radius-lg)`,`var(--color-surface-primary)`,`var(--space-*)`) 참조 → 값 안 먹음.
5. 페이지 전용 클래스 잔존(`main-why-*`,`number-*` 등).
6. 자동 생성 전역 `Section`(100vh) / (삭제 전)`Div Block`.
7. **일부 섹션 래퍼가 `BlockContainer` 타입** (Consulting `63c74e49`, Main CTA `d7d4a723`).
   BlockContainer는 Webflow 기본 max-width가 있어 폭을 제한할 수 있음. 폭 이슈 시 일반 Block으로 통일 검토.
8. 일부 utility 이름은 global과 combo가 중복된다. MCP `update_style(style_name)`은 이름 중복 시 combo를 먼저 잡을 수 있어 global만 정확히 타깃하기 어렵다.
9. CTA 최종 규칙은 `main-cta`/`sub-cta` 두 공통 구조 재사용이다. Legal System CTA는 `sub-cta` 구조로 흡수했지만 MCP sticky combo 때문에 `sub-intro` 등 일부 old combo가 표시될 수 있다.
10. `list.md`는 임시 메모였으므로 제거됨. 남은 규칙은 `AGENTS.md` / `docs/webflow-design-system.md`를 기준으로 판단한다.
11. Litera 1차/2차 WHTML에서 생성된 별도 랜딩형 root(`sub-litera-page`, `litera-shell`)는 잘못된 방향으로 판단해 제거했다. 최종 페이지는 Legal System의 `sub-visual`/`sub-nav`/`sub-intro` 구조를 재사용하고 본문만 `sub-litera-*`로 구성한다. 남아 있을 수 있는 미사용 selector는 화면 영향이 없으면 삭제하지 않고 재사용만 금지한다.

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
- [ ] Designer에서 Legal System sticky combo 정리: `sub-normal-banner-title`, `sub-normal-banner-desc`, `sub-solution-table-body-list-desc`, `product-tabs__container`, `section-title`, `heading-32`, `inner`, `sub-visual__inner`, `sub-intro`.
- [ ] Litera placeholder 이미지/로고/인증 asset 교체 및 `litera-logo-wrap > img.litera-logo-img` 실제 파일 연결.
- [ ] Litera script marquee를 Webflow Preview에서 확인하고, 필요 시 native interaction 또는 공통 component 방식으로 승격.
- [ ] Insights를 CMS 컬렉션 연동(현재 정적 3슬라이드는 플레이스홀더).
- [ ] `service-bg`/슬라이드 배경 이미지 채우기.
- [ ] 모바일 반응형: Consulting 원 452 고정(좁은 화면 처리) / Insights 슬라이드 폭 등 브레이크포인트.
- [ ] backdrop-filter(blur) / Swiper / 글로브 등 임베드는 **퍼블리시 후 라이브에서만 렌더** — 스테이징 확인.
- [ ] BlockContainer 폭 제한 이슈(5-7) 정리 여부 결정.
- [ ] Docusign product tabs script를 Webflow Preview에서 클릭 테스트하고, live URL 테스트는 draft 해제/publish 후 진행한다. 실제 컨텐츠 확정 시 `product-tab-demo-*` 더미 데이터를 교체.

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
