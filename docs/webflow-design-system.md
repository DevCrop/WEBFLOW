# Webflow Design System

이 문서는 Webflow 사이트를 다시 정리하기 위한 최종 클래스, 변수, 컴포넌트 기준이다. 목표는 페이지마다 클래스를 늘리는 방식이 아니라 범용 유틸리티, 실제 Webflow Component, 필요한 경우의 scope combo만으로 유지보수 가능한 구조를 만드는 것이다.

## 방향

- 범용 클래스만 기본 시스템에 남긴다.
- 섹션은 같은 골격으로 반복한다.
- 섹션 고유 스타일은 전역 클래스로 흩뿌리지 않고 scope combo로 제한한다.
- 폰트, spacing, grid, color, border는 변수와 유틸리티로 관리한다.
- 기존 레거시 이름은 사용하지 않는다.

## Standard Section

```text
Section
  container
    inner
      section-title
        title
          h2 ~ h6
        desc
          p
      contents
        grid / list / CMS list / dynamic content
```

Webflow에서 `section` 이름 생성이 충돌하면 현재 시스템의 `Section` 클래스를 사용한다.

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

- `display-1`
- `display-2`
- `display-3`
- `heading-1`
- `heading-2`
- `heading-3`
- `heading-4`
- `heading-5`
- `heading-6`
- `body-1`
- `body-2`
- `body-3`
- `body-4`
- `regular`
- `medium`
- `semibold`
- `bold`
- `fm-base`
- `fm-ko`
- `fm-en`

타이포 클래스 내부에서 breakpoint별 font size, line height, letter spacing을 조정한다. 별도 responsive typography utility는 기본으로 만들지 않는다.

## Utility Classes

### Structure

- `Section`
- `container`
- `inner`
- `section-title`
- `title`
- `desc`
- `contents`

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
- `grid-6-6`
- `grid-4-8`
- `grid-3-9`
- `grid-2-10`
- `flex`
- `flex-row`
- `flex-col`
- `flex-center`
- `flex-between`
- `flex-start`
- `flex-end`
- `flex-wrap`

### Responsive

- `md-grid-1`
- `md-grid-2`
- `md-grid-3`
- `md-grid-3-9`
- `md-grid-6-6`
- `sm-grid-1`
- `sm-grid-2`
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
- `banner`
- `banner-inner`
- `banner-body`
- `banner-title`
- `banner-desc`
- `banner-actions`

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
`post-card`, `news-card`, `product-card`처럼 콘텐츠 타입별 컴포넌트도 만들지 않는다. 콘텐츠 타입은 CMS 데이터나 scope combo로 구분하고, 컴포넌트 차이는 레이아웃 기준 variant로만 처리한다.

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

배너는 하나의 `banner` 컴포넌트에서 확장한다. `cta-banner`를 별도 컴포넌트로 만들지 않는다.

Component variants:

- `default-banner`
- `cta-banner`

구조는 다음을 유지한다.

```text
banner
  banner-inner
    banner-body
      banner-title
      banner-desc
    banner-actions
```

CTA가 필요하면 `banner-actions` 영역에 `button` 컴포넌트 인스턴스를 조합한다.

## Scope Combo Rule

범용으로 처리 가능한 섹션은 scope 없이 조립한다.

```text
Section container inner section-title contents grid grid-3 sm-grid-1
```

특정 섹션만의 비주얼이나 인터랙션이 필요할 때만 scope class를 추가한다.

```text
newsroom title
newsroom card
product-hero media
solution-list item
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

## Do Not Use

- `legacy-*`
- `deprecated-*`
- `deprecate-*`
- `delete-*`
- `Div Block*`
- `no-container`
- `section-padding`
- `bg-wave`
- `split-fill`
- `pb-8`
- `txt`
- `cnt`
- `left`
- `mid`
- `right`
- `lang`
- `cta`
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

필요하면 옛 이름을 되살리지 말고 최종 시스템 클래스나 scope combo로 다시 만든다.

## Header Build Rule

Header는 다음 순서로 만든다.

```text
header
  container
    inner
      logo/link
      nav
      actions
```

`logo`, `nav`, `actions` 같은 역할 이름은 header 내부 scope combo로만 쓴다. 전역 유틸리티로 만들지 않는다.

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
