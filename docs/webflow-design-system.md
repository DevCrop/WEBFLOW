# Webflow Design System

이 문서는 Intellectual Data Webflow 리빌드의 최종 클래스, 변수, 컴포넌트 기준이다. 목표는 Webflow Designer에서 요소를 고칠 때 여러 utility class를 지우고 다시 붙이는 불편을 없애고, 가능한 한 하나의 역할 클래스 안에 레이아웃, 간격, 타이포, 색상, 반응형 값을 포함하는 것이다.

## Core Rule

### One-Class First

- 일반 요소는 가능한 한 클래스 하나만 가진다.
- 섹션과 컴포넌트의 스타일은 역할 클래스 내부에 포함한다.
- `grid-*`, `gap-*`, `flex-*`, `heading-*`, `body-*`, `text-*`, `padding-*`, `margin-*`, weight utility를 페이지 요소에 직접 조합하지 않는다.
- 기존 utility 조합은 마이그레이션 과정에서 각 역할 클래스로 흡수한다.
- 반복 섹션 여백처럼 완전히 동일한 패턴만 공통 클래스로 허용한다.

허용되는 공통 예외:

- `container`
- `section-padding`
- `section-padding-sm`
- `section-padding-lg`
- `placeholder`
- `header`
- `footer`
- `button`
- `card`
- `banner`
- `breadcrumb`
- `card-num`

## Standard Structure

페이지 섹션의 기본 골격은 유지하되, 실제 스타일은 섹션별 역할 클래스에 둔다.

```html
<section class="section-role section-padding">
  <div class="container">
    <div class="section-role-inner">
      <div class="section-role-head">
        <h2 class="section-role-title"></h2>
        <p class="section-role-desc"></p>
      </div>
      <div class="section-role-content"></div>
    </div>
  </div>
</section>
```

`inner`, `head`, `title`, `desc`, `content` 같은 단어는 단독 전역 클래스로 남발하지 않는다. 섹션에 귀속된 역할 클래스로 작성한다.

## Media Placeholder Rule

사용자가 이미지, SVG, 그래픽, 일러스트, 아이콘 제작/삽입을 명시하기 전까지 모든 시각 자료 영역은 실제 asset이 아니라 일반 placeholder 구조로 처리한다.

이 규칙은 main, about, Docusign, legal system, `/components`를 포함한 모든 페이지와 섹션에 동일하게 적용한다. Figma, Webflow, 캡처 이미지에서 그래픽이 보이더라도 사용자가 명시적으로 asset 반영을 요청하지 않으면 구조와 공간만 잡는다.

기본 구조:

```html
<div class="main-hero-media placeholder"></div>
```

배경 이미지가 들어갈 영역도 실제 이미지를 바로 넣지 않는다. 배경 asset 예정 영역은 해당 역할 클래스 내부에 placeholder 배경값만 연결한다.

## Variables

모든 스타일 값은 Webflow Variables를 우선 참조한다. 직접 hex, 임의 px, 임의 shadow, 임의 radius를 넣지 않는다. 필요한 값이 없으면 먼저 변수 scale에 추가한 뒤 클래스에 연결한다.

### Base Scales

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
- `font/base`
- `font/en`
- `font/ko`
- `weight/regular`
- `weight/medium`
- `weight/semibold`
- `weight/bold`
- `radius/none`
- `radius/sm`
- `radius/md`
- `radius/lg`
- `radius/xl`
- `radius/full`
- `border/width/default`
- `border/width/strong`
- `shadow/sm`
- `shadow/md`
- `shadow/lg`
- `layout/container`
- `layout/container/narrow`
- `layout/container/wide`
- `layout/gutter`

### Semantic Scales

- `space/section/padding-y-desktop`
- `space/section/padding-y-tablet`
- `space/section/padding-y-mobile`
- `space/card/padding-desktop`
- `space/card/padding-mobile`
- `space/grid/gap-desktop`
- `space/grid/gap-tablet`
- `space/grid/gap-mobile`
- `type/section-title/desktop`
- `type/section-title/tablet`
- `type/section-title/mobile`
- `type/section-desc/desktop`
- `type/section-desc/tablet`
- `type/section-desc/mobile`
- `type/card-title/desktop`
- `type/card-title/tablet`
- `type/card-title/mobile`
- `type/card-desc/desktop`
- `type/card-desc/tablet`
- `type/card-desc/mobile`
- `type/banner-title/desktop`
- `type/banner-title/tablet`
- `type/banner-title/mobile`
- `type/banner-desc/desktop`
- `type/banner-desc/tablet`
- `type/banner-desc/mobile`
- `size/card-num/desktop`
- `size/card-num/mobile`
- `size/cta-banner/height-desktop`
- `size/cta-banner/height-tablet`
- `size/cta-banner/height-mobile`

## Class Migration Buckets

### Keep

- `container`
- `section-padding`
- `section-padding-sm`
- `section-padding-lg`
- `placeholder`
- `header`
- `footer`
- `button`
- `card`
- `banner`
- `breadcrumb`
- `card-num`

### Absorb Into Role Classes

- `grid-*`
- `gap-*`
- `flex-*`
- `heading-*`
- `body-*`
- `bold`
- `medium`
- `semibold`
- `text-*`
- `padding-*`
- `margin-*`
- `fm-*`

### Delete Candidates

삭제는 사용자 확인 후 진행한다.

- 미사용 클래스
- `legacy-*`
- `deprecated-*`
- `deprecate-*`
- `delete-*`
- `Div Block*`
- `txt`
- `cnt`
- `item`
- `list`
- `link`
- `left`
- `mid`
- `right`
- `cta`
- `lang`
- `no-container`
- `bg-wave`
- `split-fill`
- `pb-*`
- 페이지별 중복 임시 클래스

## Responsive Rule

- desktop, tablet, mobile 값은 각 역할 클래스 내부에 포함한다.
- `md-grid-2`, `sm-grid-1`, `md-flex-col`, `sm-text-center` 같은 breakpoint utility를 새로 조합하지 않는다.
- 섹션별 grid, flex, gap, padding은 해당 섹션 역할 클래스 내부에서 breakpoint별로 조정한다.
- 타이포 크기, 줄 높이, letter spacing도 `main-hero-title`, `sub-cases-title` 같은 역할 클래스 내부에 포함한다.

## Page Structures

### Main

```html
<section class="main-hero section-padding">
  <div class="container">
    <div class="main-hero-inner">
      <div class="main-hero-content">
        <h1 class="main-hero-title"></h1>
        <p class="main-hero-desc"></p>
      </div>
      <div class="main-hero-media placeholder"></div>
    </div>
  </div>
</section>
```

권장 역할 클래스:

- `main-hero`
- `main-hero-inner`
- `main-hero-content`
- `main-hero-title`
- `main-hero-desc`
- `main-hero-media`
- `main-service`
- `main-service-inner`
- `main-service-title`
- `main-service-desc`
- `main-service-grid`
- `main-service-card`
- `main-client`
- `main-client-list`
- `main-cta`

### About

- `about-hero`
- `about-hero-inner`
- `about-hero-title`
- `about-hero-desc`
- `about-overview`
- `about-overview-inner`
- `about-overview-title`
- `about-overview-desc`
- `about-value`
- `about-value-grid`
- `about-value-card`
- `about-history`
- `about-history-list`
- `about-location`

`about-standard-*`처럼 임시로 생성된 중복 클래스는 역할 클래스로 흡수한다.

### Docusign

- `sub-visual`
- `breadcrumb`
- `sub-nav`
- `product-tabs`
- `product-tabs-menu`
- `product-tab-link`
- `product-tabs-content`
- `product-tabs-panel`
- `sub-intro`
- `youtube-video-wrap`
- `sub-feature`
- `sub-feature-inner`
- `sub-feature-head`
- `sub-feature-title`
- `sub-feature-desc`
- `sub-feature-grid`
- `sub-feature-card`
- `sub-feature-card-title`
- `sub-feature-card-desc`
- `sub-normal-banner`
- `sub-normal-banner-inner`
- `sub-normal-banner-title`
- `sub-normal-banner-lead`
- `sub-normal-banner-desc`
- `sub-cases`
- `sub-cases-inner`
- `sub-cases-title`
- `sub-cases-grid`
- `case-card`
- `case-card-logo`
- `case-card-title`
- `case-card-desc`
- `case-quote`
- `sub-cta`
- `cta-banner`

IAM/eSignature 패널은 같은 내부 구조를 공유한다. 패널마다 중복 클래스 세트를 만들지 않는다.

### Legal System

- `legal-hero`
- `legal-hero-inner`
- `legal-hero-title`
- `legal-hero-desc`
- `legal-overview`
- `legal-overview-inner`
- `legal-overview-title`
- `legal-overview-desc`
- `legal-feature`
- `legal-feature-grid`
- `legal-feature-card`
- `legal-feature-title`
- `legal-feature-desc`
- `legal-process`
- `legal-process-list`
- `legal-process-card`
- `legal-faq`
- `legal-faq-list`
- `legal-cta`

## Components

### Header

```html
<header class="header">
  <div class="header-container">
    <a class="header-logo"></a>
    <nav class="header-nav"></nav>
    <div class="header-actions"></div>
  </div>
</header>
```

`left`, `mid`, `right`, `item`, `link`, `cta`, `lang`를 새로 만들지 않는다.

### Footer

```html
<footer class="footer">
  <div class="footer-container">
    <div class="footer-brand"></div>
    <nav class="footer-nav"></nav>
    <div class="footer-meta"></div>
  </div>
</footer>
```

### Button

버튼은 여러 variant class를 조합하지 않는다. 최종 단일 클래스는 다음을 우선 사용한다.

- `button-primary`
- `button-dark`
- `button-outline`

기존 `button is-fill is-black is-md` 조합은 마이그레이션 과정에서 흡수한다.

### Card

범용 카드가 필요한 경우만 `card`를 유지한다. 페이지 섹션에서는 역할 클래스가 우선이다.

- `case-card`
- `main-service-card`
- `about-value-card`
- `legal-feature-card`

`card-num`은 width, height, flex-center를 포함하는 단독 범용 클래스로 유지한다.

### Banner And CTA

`banner cta-banner bg-placeholder is-invert` 조합 대신 `cta-banner` 단일 클래스를 사용한다.

```html
<section class="sub-cta section-padding">
  <div class="container">
    <div class="cta-banner">
      <div class="cta-banner-inner">
        <p class="cta-banner-desc"></p>
        <h2 class="cta-banner-title"></h2>
        <div class="cta-banner-actions">
          <a class="button-dark"></a>
        </div>
      </div>
    </div>
  </div>
</section>
```

- `cta-banner` 기본 높이는 desktop 기준 `size/cta-banner/height-desktop`이며 현재 기준값은 640px이다.
- `cta-banner-desc`와 `cta-banner-actions`는 optional이다.
- 페이지별 배경 차이는 `cta-banner` 역할 클래스의 변수 연결 또는 page-specific 역할 클래스에서 처리한다.
- 실제 배경 asset은 placeholder 상태로 유지한다.

## Components Catalog

`/components` 페이지는 draft-only 컴포넌트 카탈로그다. 검색 색인 대상이 되지 않도록 draft/noindex 상태를 유지한다.

컴포넌트를 추가, 삭제, 이름 변경, variant 변경, prop 변경, 내부 구조 변경할 때는 같은 작업 안에서 `/components` 페이지도 갱신한다.

## Migration Workflow

1. Webflow MCP로 site 전체 클래스와 변수 목록을 audit한다.
2. main, about, docusign, legal system, `/components`의 요소 구조를 확인한다.
3. utility 조합을 역할 클래스 내부 스타일로 흡수한다.
4. 중복 변수와 직접값을 semantic variable로 연결한다.
5. 사용 중인 레거시 클래스는 삭제하지 않고 먼저 삭제 후보로 기록한다.
6. 사용자 확인 후 삭제와 정리를 진행한다.
7. publish는 별도 승인 전까지 하지 않는다.

## Acceptance Checklist

- 일반 요소는 가능한 한 클래스 하나만 가진다.
- 반복 여백은 `section-padding` 계열만 예외로 쓴다.
- utility 조합이 페이지 요소에서 제거된다.
- 모든 스타일 값은 Webflow Variables를 참조한다.
- desktop/tablet/mobile 값이 역할 클래스 내부에 포함된다.
- 중복 클래스와 중복 변수는 audit 결과에 따라 병합 또는 삭제 후보화된다.
- 문서, `/components`, 실제 페이지 구조가 같은 규칙을 말한다.
- publish는 별도 승인 전까지 하지 않는다.
