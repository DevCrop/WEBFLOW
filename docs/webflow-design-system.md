# Webflow Design System

이 문서는 Webflow 사이트를 다시 정리하기 위한 최종 클래스, 변수, 컴포넌트 기준이다. 목표는 페이지마다 클래스를 늘리는 방식이 아니라 범용 유틸리티, 실제 Webflow Component, 공통 구조 클래스, 필요한 경우의 섹션 prefix BEM과 컴포넌트 내부 역할 클래스로 유지보수 가능한 구조를 만드는 것이다.

## 방향

- 범용 클래스만 기본 시스템에 남긴다.
- 섹션은 같은 골격으로 반복한다.
- 섹션 고유 디자인은 전역 클래스로 흩뿌리지 않고 해당 섹션 root prefix의 BEM으로 제한한다.
- 폰트, spacing, grid, color, border는 변수와 유틸리티로 관리한다.
- Webflow native element와 feature를 먼저 쓴다.
- 기존 레거시 이름은 사용하지 않는다.

## Native First Rule

Webflow가 제공하는 native element와 feature가 있으면 그것을 먼저 사용한다. native 기능은 Designer에서 구조와 설정을 읽기 쉽고, 접근성/상태/반응형 관리가 custom code보다 안전하다.

- slider/carousel: Webflow `Slider`를 먼저 사용한다.
- navigation/menu: `Navbar`, `Dropdown`, link block, component variant/property를 먼저 사용한다.
- tabs/accordion 성격의 전환 UI: `Tabs` 또는 Webflow interaction이 적합한지 먼저 검토한다.
- form/newsletter/contact: Webflow `Form` element를 먼저 사용하고, 외부 저장이나 API write가 필요하면 서버 사이드 연동으로 분리한다.
- 반복 콘텐츠: CMS Collection/List 또는 Component instance를 먼저 사용한다.
- 재사용 UI: 실제 Webflow `Component`와 variant/property를 먼저 만든다.

임의 `Div Block` 조합, custom JS, HtmlEmbed는 native 기능으로 요구사항을 충족할 수 없을 때만 쓴다. fallback을 쓰면 이유, 대상 page/element ID, 대체 불가 조건을 `docs/webflow-implementation-status.md`에 남긴다.

## Standard Section

```text
section.sub-xxx.section-padding
  no-container
    sub-xxx__inner
      sub-section-txt
        sub-section-txt-eyebrow
        sub-section-txt-title
          h2 ~ h6
        sub-section-txt-body
          p
      section-contents
        ul / li / grid / CMS list / dynamic content
```

메인 페이지 고유 섹션은 `main-*`, 서브 페이지 고유 섹션은 `sub-*`로 시작한다.
`impact`, `security`, `features`, `trust`처럼 여러 제품 페이지에서 반복될 수 있는 역할명은 페이지 약어를 함께 넣는다.
예: Luminance 고객 사례 섹션은 `sub-impact`가 아니라 `sub-lumi-impact`를 사용한다.
섹션 root class는 고유해야 하며, 공통 재사용 섹션인 `sub-visual`, `sub-intro`, `main-cta`, `sub-cta`만 예외다.
`sub-section-txt`와 `section-contents`는 형제 요소다. `section-contents`를 `sub-section-txt` 안에 넣지 않는다.
공통 구조 클래스(`no-container`, `sub-section-txt`, `section-contents`, typography/color/weight utilities)는 그대로 재사용한다.
섹션별 디자인/레이아웃 커스텀 클래스는 root prefix와 일치하는 BEM을 쓴다.
예: `sub-legal-problems__grid`, `main-services__card`.

텍스트 태그에는 구조/섹션 전용 class를 붙이지 않는다.
`h1`~`h6`는 `display-*` 또는 `heading-*` + `text-*` + weight class 조합만 사용하고,
`p`는 `body-*` + `text-*` + weight class 조합만 사용한다.
예: `display-88 text-title bold`, `heading-54 text-title bold`, `body-20 text-body regular`.
텍스트 컬러 utility는 반드시 배경을 먼저 판정한 뒤 확정한다.

1. 섹션 root의 background/surface를 확인한다.
2. 텍스트가 카드, 패널, 리스트 아이템, 배너 안에 있으면 가장 가까운 surface wrapper의 background를 다시 확인한다.
3. dark background/surface 위의 제목은 `text-title-invert`, 본문은 `text-body-invert`를 사용한다.
   `bg-primary`는 section/card/panel/list item 같은 surface wrapper에 붙었을 때만 dark surface context로 본다.
   `p`, `h1`~`h6`, text span 같은 텍스트 태그에 `bg-*`가 직접 붙어 있으면 의도된 surface가 아니라 sticky combo 오염으로 보고 제거하거나 배경만 neutralize한다.
4. light/white background/surface 위의 제목은 `text-title`, 본문은 `text-body`를 사용한다.
5. 같은 텍스트 태그에 `text-body`와 `text-body-invert`, 또는 `text-title`과 `text-title-invert`를 동시에 남기지 않는다.
6. 기본 작업 중 `body-* text-body regular`를 먼저 넣었더라도 dark surface로 판정되면 `set_style: []` 후 `body-* regular text-body-invert`만 재적용한다.

`fm-ko`/`fm-en` 같은 font-family utility는 필요한 경우에만 텍스트 태그에 추가할 수 있다.
서브 페이지 공통 hero인 `sub-visual`의 제품/솔루션명 H1에는 `fm-en`을 붙인다.
`sub-intro`의 한국어 H2에는 `fm-ko`를 붙여 인트로 톤을 통일한다.
`sub-normal-banner-desc`, `section-title`, `legal-card__title`, `sub-legal-*__title` 같은 구조/섹션 전용 class는 텍스트 태그가 아니라 wrapper에만 쓴다.
이미지나 로고가 필요한 자료는 실제 에셋이 없어도 media/bg/icon placeholder wrapper를 먼저 잡는다.

`container`/`*__container`는 섹션에서 절대 쓰지 않는다. 페이지/섹션 폭 래퍼는
`no-container` 또는 폭 variant인 `no-container-xl`을 사용한다. Header만 예외로
`header__container`를 쓴다.

## Variables

### Color

- `color/base/black`
- `color/base/white`
- `color/brand/primary`
- `color/brand/secondary`
- `color/brand/accent`
- `color/text/primary`
- `color/text/secondary`
- `color/text/muted`
- `color/text/inverse`
- `color/background/primary`
- `color/background/secondary`
- `color/background/inverse`
- `color/surface/primary`
- `color/surface/secondary`
- `color/surface/elevated`
- `color/border/default`
- `color/border/weak`
- `color/border/strong`
- `color/border/inverse`
- `color/state/success`
- `color/state/warning`
- `color/state/error`
- `color/state/info`
- `color/overlay/dark`
- `color/overlay/light`

### Space

- `space/0`
- `space/2xs`
- `space/xs`
- `space/sm`
- `space/md`
- `space/lg`
- `space/xl`
- `space/2xl`
- `space/3xl`
- `space/4xl`

### Other Tokens

- `radius/none`, `radius/sm`, `radius/md`, `radius/lg`, `radius/xl`, `radius/full`
- `border/width/default`, `border/width/strong`
- `shadow/sm`, `shadow/md`, `shadow/lg`
- `layout/container`, `layout/container/narrow`, `layout/container/wide`, `layout/gutter`
- `font/base`, `font/en`, `font/ko`
- `weight/regular`, `weight/medium`, `weight/semibold`, `weight/bold`

## Typography Classes

기본 폰트는 `fm-base`다. 특정 요소만 바꿀 때 `fm-ko`, `fm-en`을 추가한다.

- `display-200`
- `display-188`
- `display-108`
- `display-88`
- `heading-64`
- `heading-54`
- `heading-48`
- `heading-36`
- `heading-28`
- `body-24`
- `body-20`
- `body-18`
- `body-20` is the canonical global 20px body utility. Do not use `body-2` or `legacy-body-20-combo` for new work; migrate old usage to `body-20 text-* regular/medium` during page cleanup.
- Do not use CSS priority override keywords in Webflow style selectors or custom code. Resolve priority issues by fixing class order, selector paths, and wrapper structure.
- Section root classes put the identity class first and utilities after it: `sub-lumi-impact section-padding`, `sub-nymi-workflow section-padding`. If Webflow shows `section-padding` first, treat that root as a combo-selector hygiene issue.
- `regular`
- `medium`
- `semibold`
- `bold`
- `fm-base`
- `fm-ko`
- `fm-en`

타이포 클래스 내부에서 breakpoint별 font size, line height, letter spacing을 조정한다. 별도 responsive typography utility는 기본으로 만들지 않는다.

텍스트 요소에는 typography/color/weight class를 조합해서 쓴다. 타이포 값은 `heading-*`/`body-*`가 source of truth이고, 색은 `text-*`, 굵기는 weight class가 담당한다.

현재 기준 Webflow global selector에 적용해야 하는 base scale은 다음과 같다.

| Class | font-size | line-height | letter-spacing |
| --- | ---: | ---: | ---: |
| `display-200` | 200px | 1.1 | -0.02em |
| `display-188` | 188px | 1.1 | -0.02em |
| `display-108` | 108px | 1.1 | -0.02em |
| `display-88` | 88px | 1.1 | -0.02em |
| `heading-64` | 64px | 1.2 | -0.02em |
| `heading-54` | 54px | 1.25 | -0.02em |
| `heading-48` | 48px | 1.3 | -0.02em |
| `heading-36` | 36px | 1.35 | -0.02em |
| `heading-28` | 28px | 1.4 | -0.02em |
| `body-24` | 24px | 1.5 | -0.02em |
| `body-20` | 20px | 1.5 | -0.02em |
| `body-18` | 18px | 1.5 | -0.02em |

기존 scale을 새 scale로 줄일 때는 같은 카테고리 안에서 font-size 차이가 가장 작은 토큰으로 보낸다. 동률이면 계층을 덜 낮추는 쪽을 우선한다.

## Utility Classes

### Structure

- `Section`
- `no-container`
- `no-container-xl`
- `inner`
- `sub-section-txt`
- `sub-section-txt-eyebrow`
- `sub-section-txt-title`
- `sub-section-txt-body`
- `section-contents`

### Spacing

- `padding-top-sm`
- `padding-top-md`
- `padding-top-lg`
- `padding-top-xl`
- `padding-top-2xl`
- `padding-bottom-sm`
- `padding-bottom-md`
- `padding-bottom-lg`
- `padding-bottom-xl`
- `padding-bottom-2xl`
- `padding-left-sm`
- `padding-left-md`
- `padding-left-lg`
- `padding-right-sm`
- `padding-right-md`
- `padding-right-lg`
- `padding-x-sm`
- `padding-x-md`
- `padding-x-lg`
- `padding-x-xl`
- `padding-y-sm`
- `padding-y-md`
- `padding-y-lg`
- `padding-y-xl`
- `padding-y-2xl`
- `margin-0`
- `margin-x-auto`
- `margin-top-sm`
- `margin-top-md`
- `margin-top-lg`
- `margin-top-xl`
- `margin-bottom-sm`
- `margin-bottom-md`
- `margin-bottom-lg`
- `margin-bottom-xl`
- `gap-sm`
- `gap-md`
- `gap-lg`
- `gap-xl`
- `stack-sm`
- `stack-md`
- `stack-lg`
- `stack-xl`

### Layout

- `grid`
- `grid-2`
- `grid-3`
- `grid-4`
- `grid-12`
- `grid-2-10`
- `grid-3-9`
- `grid-4-8`
- `grid-5-7`
- `grid-6-6`
- `grid-7-5`
- `grid-8-4`
- `grid-9-3`
- `grid-10-2`
- `span-1` through `span-12`
- `flex`
- `flex-row`
- `flex-col`
- `flex-center`
- `flex-between`
- `flex-start`
- `flex-end`
- `flex-wrap`

Grid rule:

- `grid-*` and `grid-*-*` are parent layout utilities.
- `grid-12` creates a 12-column parent grid. Use child `span-1` through `span-12` for column placement.
- ratio grids such as `grid-3-9`, `grid-4-8`, `grid-7-5` are two-column parent grids and use `fr` ratios directly.
- spacing between grid items is controlled separately with `gap-*`; grid classes should not carry gap by default.

### Responsive

Breakpoint prefixes:

- `lg-*`: Webflow `medium` breakpoint, max 991px.
- `md-*`: Webflow `small` breakpoint, max 767px.
- `sm-*`: Webflow `tiny` breakpoint, max 479px.

- `md-grid-1`
- `md-grid-2`
- `md-grid-3`
- `md-grid-4`
- `md-grid-12`
- `md-grid-2-10`
- `md-grid-3-9`
- `md-grid-4-8`
- `md-grid-5-7`
- `md-grid-6-6`
- `md-grid-7-5`
- `md-grid-8-4`
- `md-grid-9-3`
- `md-grid-10-2`
- `sm-grid-1`
- `sm-grid-2`
- `sm-grid-3`
- `sm-grid-4`
- `sm-grid-12`
- `sm-grid-2-10`
- `sm-grid-3-9`
- `sm-grid-4-8`
- `sm-grid-5-7`
- `sm-grid-6-6`
- `sm-grid-7-5`
- `sm-grid-8-4`
- `sm-grid-9-3`
- `sm-grid-10-2`
- `lg-grid-1` through `lg-grid-4`
- `lg-grid-12`
- `lg-grid-2-10`, `lg-grid-3-9`, `lg-grid-4-8`, `lg-grid-5-7`, `lg-grid-6-6`, `lg-grid-7-5`, `lg-grid-8-4`, `lg-grid-9-3`, `lg-grid-10-2`
- `lg-span-1` through `lg-span-12`
- `md-span-1` through `md-span-12`
- `sm-span-1` through `sm-span-12`
- `md-flex-col`
- `md-flex-row`
- `sm-flex-col`
- `sm-flex-row`
- `md-text-left`
- `md-text-center`
- `md-text-right`
- `sm-text-left`
- `sm-text-center`
- `sm-text-right`
- `md-padding-y-lg`
- `sm-padding-y-md`

Responsive grid rule:

- responsive grid/span utilities should only define values at their target breakpoint.
- desktop layout stays on the base class, then `lg-*`, `md-*`, `sm-*` progressively override at narrower breakpoints.
- example: `grid-12 md-grid-6-6 sm-grid-1` on the parent, `span-7 md-span-6 sm-span-12` on a child.

### Text And Color

- `text-left`
- `text-center`
- `text-right`
- `text-primary`
- `text-secondary`
- `text-muted`
- `text-inverse`
- `bg-primary`
- `bg-secondary`
- `bg-inverse`
- `surface-primary`
- `surface-secondary`
- `surface-elevated`

### Border And Size

- `border`
- `border-top`
- `border-bottom`
- `border-weak`
- `border-strong`
- `border-inverse`
- `radius-sm`
- `radius-md`
- `radius-lg`
- `radius-xl`
- `radius-full`
- `w-full`
- `h-full`
- `self-start`
- `self-end`

## Component Classes

- `header`
- `footer`
- `breadcrumb`
- `sub-visual`
- `button`
- `button-inner`
- `button-label`
- `button-icon`
- `card`
- `card-media`
- `card-body`
- `card-title`
- `card-desc`
- `card-num`
- `banner`
- `banner-inner`
- `banner-body`
- `banner-title`
- `banner-desc`
- `banner-actions`

Breadcrumb:

- `breadcrumb`는 위치/정렬 wrapper다.
- depth별 선택 메뉴는 custom hover CSS나 HtmlEmbed가 아니라 Webflow native `Dropdown`을 먼저 사용한다.
- 내부 클래스는 `breadcrumb-item`, `breadcrumb-trigger`, `breadcrumb-arrow`, `breadcrumb-list`, `breadcrumb-link`까지만 허용한다.
- 현재 페이지 leaf는 dropdown 없이 `breadcrumb-trigger`를 적용한 TextLink/TextBlock으로 둔다.

Sub Nav:

- `sub-nav`는 같은 depth의 형제 페이지를 이동하는 horizontal local navigation이다.
- 구조는 native `nav > sub-nav-inner > Link`로 만든다. HtmlEmbed나 custom JS를 쓰지 않는다.
- 클래스는 `sub-nav`, `sub-nav-inner`, `sub-nav-link`, `sub-nav-active`까지만 허용한다.
- 현재 페이지 링크에만 `sub-nav-active`를 추가한다.
- 모바일에서는 줄바꿈 대신 horizontal scroll을 허용한다.

Product Tabs:

- 제품 상세 안의 하위 탭은 `product-tabs > product-tabs-inner > product-tabs-menu / product-tabs-content` 구조를 쓴다.
- tab trigger는 `product-tab-link`, active trigger는 `product-tab-active`를 쓴다.
- content pane은 `product-tabs-panel`을 기본으로 숨기고, 현재 pane에만 `product-tabs-panel-active`를 추가해 보인다.
- MCP로 Webflow native Tabs element 생성이 불가능할 때만 registered page-level footer script fallback을 허용한다.
- fallback script는 `register_inline_script` + `set_page_scripts`로 등록한다. `set_page_freeform_code`에 순수 JS를 넣지 않는다.
- fallback script는 trigger의 `data-product-tab-trigger`와 pane의 `data-product-tab-panel`만 토글해야 하며 publish 전 문서에 기록한다.
- fallback을 쓰는 경우 dummy/test content는 실제 content로 교체하기 전까지 `product-tab-demo-*` scope class 안에만 둔다.

Variant/state:

- `is-fill`
- `is-outline`
- `is-brand`
- `is-white`
- `is-black`
- `is-xs`
- `is-sm`
- `is-md`
- `is-lg`
- `has-icon`
- `icon-front`
- `icon-end`
- `is-primary`
- `is-secondary`
- `is-dark`
- `is-light`
- `is-small`
- `is-large`
- `is-disabled`
- `is-featured`
- `is-link`
- `is-active`

## Component Variable Rule

모든 컴포넌트와 variant는 Webflow 변수를 기준으로 스타일링한다. 컴포넌트 내부에 색상, 배경, border, surface, text color, shadow, radius, spacing, typography 값을 hex나 임의 숫자로 직접 고정하지 않는다.

예:

- `fill-brand` background: `color/brand/primary`
- `fill-brand` text: `color/text/primary`
- `outline-brand` border: `color/brand/primary`
- `outline-white` border/text: `color/base/white`
- `fill-white` background: `color/base/white`
- `fill-black` background/border: `color/base/black`
- card/banner border: `color/border/*`
- card/banner surface: `color/background/*` 또는 `color/surface/*`

필요한 토큰이 없으면 컴포넌트에 값을 직접 넣지 말고 먼저 변수 scale에 추가한다.

## Button Rule

버튼은 하나의 `button` 컴포넌트에서 확장한다. 형태나 색상별로 컴포넌트를 분리하지 않는다.

Component variants:

- `fill-brand`
- `outline-brand`
- `fill-white`
- `outline-white`
- `fill-black`
- `outline-black`
- `size-xs`
- `size-sm`
- `size-md`
- `size-lg`
- `icon-none`
- `icon-front`
- `icon-end`

구조는 다음을 유지한다.

```text
button
  button-inner
    button-label
    button-icon
```

`is-fill`은 채워진 버튼, `is-outline`은 투명 배경의 라인 버튼이다. `is-brand`, `is-white`, `is-black`은 색상 축이다. `is-xs`, `is-sm`, `is-md`, `is-lg`는 크기 축이다. 아이콘은 `button-inner`에 `has-icon icon-front` 또는 `has-icon icon-end`를 붙여 제어한다.

## Card Rule

카드는 하나의 `card` 컴포넌트에서 확장한다. 이미지 카드와 텍스트 카드를 별도 컴포넌트로 만들지 않는다.
`post-card`, `news-card`, `product-card`처럼 콘텐츠 타입별 컴포넌트도 만들지 않는다. 콘텐츠 타입은 CMS 데이터나 섹션 prefix BEM으로 구분하고, 컴포넌트 차이는 레이아웃 기준 variant로만 처리한다.

Component variants:

- `image-card`
- `text-card`
- `link-card`
- `featured-card`

구조는 다음을 유지한다.

```text
card
  card-media
  card-body
    card-title
    card-desc
```

## Banner Rule

배너는 하나의 `banner` 컴포넌트에서 확장한다. CTA는 Banner variant가 아니라 `main-cta`/`sub-cta` 공통 섹션으로 만든다.

Component variants:

- `default-banner`

구조는 다음을 유지한다.

```text
banner
  banner-inner
    banner-body
      banner-title
      banner-desc
    banner-actions
```

배너 안에 액션이 필요하면 `banner-actions` 영역에 `button` 컴포넌트 인스턴스를 조합한다.

## CTA Rule

CTA는 `main-cta`와 `sub-cta` 두 공통 섹션/컴포넌트 구조만 사용한다. 페이지마다
`sub-legal-cta`, `sub-luminance-cta`처럼 page-specific CTA root를 새로 만들지 않는다.

페이지별로 달라지는 값은 콘텐츠와 에셋뿐이다.

- title
- description
- button label/link
- background image
- logo/image asset

구조는 다음을 우선한다.

```text
sub-cta.section-padding
  no-container
    sub-cta__inner
      sub-cta__bg or sub-cta__media
      sub-cta__body
        sub-cta__title
        sub-cta__desc
      sub-cta__actions
        button
```

메인 페이지는 같은 구조에서 prefix만 `main-cta`로 바꾼다. 최종 이미지가 없더라도 `sub-cta__bg`/`main-cta__bg`
또는 `sub-cta__media`/`main-cta__media` placeholder를 먼저 만든다. 이후 작업에서는
구조/클래스를 바꾸지 않고 텍스트와 이미지 에셋만 교체한다.

## Text Class Rule

텍스트 태그에는 구조/섹션 전용 class를 붙이지 않는다.
`h1`~`h6`는 `display-*` 또는 `heading-*` + `text-*` + weight class 조합만 사용한다.
`p`는 `body-*` + `text-*` + weight class 조합만 사용한다.
섹션별 `*-title`, `*-desc` 텍스트 전용 클래스를 새로 만들지 않는다. 레이아웃 wrapper가 필요할 때만 섹션 prefix BEM을 쓴다.
예: `display-88 text-title bold`, `heading-54 text-title bold`, `body-20 text-body regular`.
텍스트 컬러 utility는 가장 가까운 배경/surface를 판정한 뒤 확정한다.
dark background/surface/card 위에서는 `text-title-invert`/`text-body-invert`, light background/surface/card 위에서는 `text-title`/`text-body`를 사용한다.
`bg-primary`는 실제 surface wrapper에 있을 때만 dark context다. 텍스트 태그에 직접 붙은 `bg-*`는 sticky combo 오염으로 보고 제거하거나 배경만 neutralize한다.
한 텍스트 태그에 일반 컬러와 invert 컬러를 동시에 남기지 않는다. 예: `body-20 text-body text-body-invert regular` 금지.
기본으로 `body-* text-body regular`를 붙인 뒤 dark surface로 판정되면 `set_style: []` 후 `body-* regular text-body-invert`만 재적용한다.
`fm-ko`/`fm-en` 같은 font-family utility는 필요한 경우에만 텍스트 태그에 추가할 수 있다.
서브 페이지 공통 hero인 `sub-visual`의 제품/솔루션명 H1에는 `fm-en`을 붙인다.
`sub-intro`의 한국어 H2에는 `fm-ko`를 붙여 인트로 톤을 통일한다.
`sub-normal-banner-desc`, `section-title`, `legal-card__title`, `sub-legal-*__title` 같은 구조/섹션 전용 class는 텍스트 태그가 아니라 wrapper에만 쓴다.

### Text Utility Migration

Webflow에서 `heading-*`, `body-*`, `display-*`, `text-*`, `fm-*` 같은 utility selector가
기존 combo selector로 저장되어 있으면, 요소에 재적용하는 순간 old class가 다시 붙을 수 있다.
이 경우 요소 단위로 계속 덮어쓰지 않고 selector layer를 먼저 정규화한다.

- clean utility는 global selector여야 하며 `isComboClass: false` 상태여야 한다.
- combo로 오염된 utility는 새 섹션 작업에 재사용하지 않는다.
- 오염된 utility가 필요한 경우 `docs/webflow-implementation-status.md`에 기록하고,
  별도 style-selector migration pass에서 global utility로 정리한 뒤 요소에 다시 적용한다.
- 요소 정리 중 색상/타이포 utility가 old combo를 되살리면, 임시로 size/weight만 남기고
  완전한 `text-*` 재적용은 selector 정규화 이후로 미룬다.

## Card Num

- `card-num`은 카드 번호(01, 02 …)를 담는 범용 atom이다. `card` 컴포넌트 내부 구조가 아니라 어느 섹션에서나 재사용하는 독립 클래스다.
- 고정 width/height + flex-center로 숫자를 가운데 정렬한다. 숫자는 typography/color/weight utility를 조합하고, 섹션마다 새 번호 클래스를 만들지 않는다.

## Icon / Num Utilities

- `icon-wrap`은 SVG 또는 Image가 들어갈 수 있는 범용 아이콘 슬롯 wrapper다. 기본 64×64, flex-center, overflow hidden으로 둔다.
- 번호 뱃지는 base/size/color를 분리한다: `num` + `num-64`/`num-88` + `num-primary` 같은 조합을 쓴다.
- `num-primary`처럼 색을 포함한 유틸은 배경과 텍스트 색을 반드시 변수에 연결한다.

## Common Structure / Section BEM Rule

공통 구조는 공통 클래스로 조립한다.

```text
section.sub-xxx.section-padding
  no-container
    sub-xxx__inner
      sub-section-txt
      section-contents
```

특정 섹션만의 비주얼이나 인터랙션이 필요할 때만 섹션 prefix BEM을 추가한다.

```text
sub-legal-problems__grid
sub-legal-problems__card
main-services__media
```

단독 전역 `item`, `list`, `link`, `txt`, `cnt`, `left`, `mid`, `right`는 만들지 않는다.

## Scope-Specific Class Rule (구현 학습 반영)

일부 클래스는 특정 섹션 전용이다. 다른 섹션에서 재사용하지 않는다.

- `hero-arrow` (position:absolute; bottom:80px) 는 **Hero 섹션 전용**이다. 다른 섹션의
  인너 세로 정렬에는 쓰지 않는다. 대신 `inner` + `flex-center` + `flex-col` + `gap-*` 조합을 쓴다.
- `data_element_builder` / `whtml_builder` 로 새 요소를 만들 때 인접 요소의 클래스(특히 `hero-arrow`)가
  복사되어 붙는 경우가 있다. 빌드 직후 `set_style` 로 의도한 클래스만 남기도록 클린업한다.
- 겹치는 원형 레이아웃 등 폭 계산이 중요한 배치는 `transform` 대신 음수 `margin` 을 써서
  실제 레이아웃 폭을 줄인다(컨테이너 넘침 + 겹침 동시 해결). 자세한 값은
  `webflow-implementation-status.md` 3.5 Consulting 참고.

실제 구현 상태·변수 실측·컴포넌트 제약은 `docs/webflow-implementation-status.md` 를 우선 참조한다.

## Documentation Update Rule

Webflow 변수, style selector, 컴포넌트, variant, page structure, CMS schema/content가 바뀌면 같은 작업 안에서 문서를 갱신한다.

- 실측 상태와 변경 이력: `docs/webflow-implementation-status.md`
- 유지할 디자인 시스템 규칙: `docs/webflow-design-system.md`
- 에이전트 공통 운영 규칙: `AGENTS.md`
- 컴포넌트 생성/삭제/variant/property 변경: draft-only `/components` 카탈로그

Codex 작업에서는 `.codex/hooks.json`의 PostToolUse hook이 Webflow MCP 변경 후 문서 싱크 알림을 추가 컨텍스트로 제공한다. hook은 알림 장치일 뿐이며, 문서 갱신은 작업의 일부로 완료한다.

## Do Not Use

- `legacy-*`
- `deprecated-*`
- `deprecate-*`
- `delete-*`
- `Div Block*`
- `*__container`
- `bg-wave`
- `split-fill`
- `pb-8`
- `txt`
- `cnt`
- `left`
- `mid`
- `right`
- `lang`
- `footer-info`
- `footer-bottom`
- `newsroom-*`
- `about-standard-*`
- `news-card`
- `post-card`
- `solution-card`
- `product-card`
- `people-card`
- `location-card`
- `cta-band`

CTA는 `main-cta`와 `sub-cta` root로만 허용한다. page-specific CTA root(`sub-legal-cta`,
`sub-luminance-cta`)나 `cta`, `cta-band` 같은 변형 이름은 만들지 않는다.
필요하면 옛 이름을 되살리지 말고 최종 시스템 클래스, 섹션 prefix BEM, 또는 컴포넌트 내부 역할 클래스로 다시 만든다.

## Header Build Rule

Header는 다음 순서로 만든다.

```text
header
  header__container
    inner
      logo/link
      nav
      actions
```

`logo`, `nav`, `actions` 같은 역할 이름은 header 내부 scope combo로만 쓴다. 전역 유틸리티로 만들지 않는다.
Header는 새 구조 기준으로 다시 만들며, 섹션용 `container`/`*__container`를 쓰지 않고 `header__container`만 쓴다.

예:

```text
header logo
header nav
header nav-link
header actions
button is-primary
```

## Publish Rule

Publish는 별도 승인 전까지 하지 않는다. Designer 정리는 draft 검증 후에만 publish를 요청한다.

## Components Catalog Rule

`/components` 페이지는 실제 Webflow 컴포넌트 인스턴스를 모아두는 draft-only 카탈로그다. 검색 색인 대상이 되지 않도록 draft/noindex 상태를 유지한다.

컴포넌트를 추가, 삭제, 이름 변경, variant 변경, prop 변경, 내부 구조 변경할 때는 같은 작업 안에서 `/components` 페이지도 갱신한다. 이 페이지의 슬롯은 자동 갱신을 쉽게 하기 위해 다음 속성으로 관리한다.

- `data-component-slot`
- `data-button-slot`
- `data-card-slot`
- `data-banner-slot`

버튼, 카드, 배너처럼 variant가 있는 컴포넌트는 base 인스턴스만 두지 말고 대표 variant를 모두 렌더한다.
