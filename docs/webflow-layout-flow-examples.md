# Webflow Structure Cases

Webflow에서 새 section, page body, CTA, card/grid 구조를 짜기 전 반드시 이 문서를 먼저 읽는다.
이 문서는 히스토리가 아니라 현재 구조 결정 케이스만 담는다.

## Core Rules

- 기존 section tree를 먼저 읽고, 이미 골격이 있으면 새로 만들지 않는다.
- section root는 identity-first: `sub-lumi-impact section-padding`.
- section width wrapper는 `no-container` 또는 `no-container-xl`만 쓴다.
- `container`, `*__container`는 section에 쓰지 않는다.
- section title 영역은 `sub-section-txt`, content 영역은 `section-contents`로 분리한다.
- section-specific card wrapper는 단일 소유 class만 쓴다: `sub-lumi-impact__card`.
- card wrapper에 `bg-*`, `surface-*`, `border-*`, `radius-*`를 붙이지 않는다.
- 다른 제품 페이지에서 가져온 section은 원본 class를 남기지 않고, 내부 콘텐츠 역할에 맞춘 현재 페이지 prefix로 다시 잡는다.
- 텍스트 태그는 `heading-*`/`body-*` + `text-*` + weight 조합만 쓴다.
- CTA root는 `main-cta`, `sub-cta`만 쓴다.
- native Webflow 기능으로 가능한 UI는 custom JS/HtmlEmbed로 만들지 않는다.

## Case 1. Standard Sub Section

가장 기본이 되는 서브 페이지 본문 section이다.

```text
section.sub-xxx.section-padding
  no-container
    sub-xxx__inner
      sub-section-txt
        sub-section-txt-eyebrow
          p.body-18.text-body-invert.medium
        sub-section-txt-title
          h2.heading-54.text-title-invert.bold
        sub-section-txt-body
          p.body-20.text-body-invert.regular
      section-contents
```

Use when:
- 일반 설명 section
- 본문 headline + 설명 + 콘텐츠 영역이 필요한 section
- 이후 grid/list/CMS/native component를 붙일 section

Do not:
- `section.section-padding.sub-xxx`
- `sub-xxx__container`
- `h2.sub-xxx__title`
- `p.sub-xxx__desc`

## Case 2. Grid Cards

카드형 리스트가 필요한 section이다. card wrapper는 해당 카드의 단일 class만 쓴다.

```text
section.sub-xxx.section-padding
  no-container
    sub-xxx__inner
      sub-section-txt
      section-contents
        sub-xxx__grid
          sub-xxx__card
            sub-xxx__card-head
              card-num
                span.body-18.text-title-invert.semibold
              h3.heading-28.text-title-invert.bold
            p.body-18.text-body-invert.regular
```

Allowed:
- `sub-xxx__grid`
- `sub-xxx__card`
- `sub-xxx__card-head`
- `card-num`

Do not:
- `sub-xxx__card.bg-secondary`
- `sub-xxx__card.surface-elevated`
- `sub-xxx__card.border.border-weak.radius-md`
- `sub-xxx__card-title`
- `sub-xxx__card-desc`

## Case 3. Media + Text Split

이미지, 로고, 영상 placeholder와 텍스트가 나란히 있는 section이다.

```text
section.sub-xxx.section-padding
  no-container
    sub-xxx__inner
      sub-section-txt
      section-contents
        sub-xxx__layout
          sub-xxx__media
            image-placeholder
          sub-xxx__body
            h3.heading-36.text-title-invert.bold
            p.body-20.text-body-invert.regular
```

Use when:
- 제품 설명 + 이미지
- 인증/보안 설명 + 로고
- 도입 흐름 + 화면 placeholder

Do not:
- media wrapper에 `container`
- 텍스트 태그에 `sub-xxx__title`
- 실제 asset이 없다고 구조를 생략

## Case 4. Logo Grid / Trust Section

로고, 인증, 파트너 placeholder를 넣는 section이다.

```text
section.sub-xxx-trust.section-padding
  no-container
    sub-xxx-trust__inner
      sub-section-txt
      section-contents
        sub-xxx-trust__logo-grid
          sub-xxx-trust__logo
            sub-xxx-trust__logo-media
```

Use when:
- 고객사 로고
- 파트너 로고
- 인증/보안 배지

Rule:
- 로고 item도 배경 utility를 얹지 않는다.
- 실제 이미지가 없으면 `*-media` placeholder를 먼저 둔다.

## Case 5. Accordion / Detail List

펼침 정보가 필요한 경우 native Tabs/Dropdown/interaction 가능성을 먼저 본다.
MCP로 native 생성이 어려운 경우에도 구조 class는 page prefix를 유지한다.

```text
section.sub-xxx-detail.section-padding
  no-container
    sub-xxx-detail__inner
      sub-section-txt
      section-contents
        sub-xxx-detail__list
          sub-xxx-detail__item
            sub-xxx-detail__summary
              h3.heading-28.text-title-invert.bold
            sub-xxx-detail__panel
              p.body-18.text-body-invert.regular
```

Use when:
- FAQ
- 기능 상세
- integration group
- workflow step detail

Do not:
- custom JS부터 만들기
- `item`, `list`, `summary` 같은 단독 전역 class 만들기

## Case 6. Sub Page Body

서브 제품/솔루션 페이지 전체 골격이다.

```text
body
  section.sub-visual
  nav.sub-nav
  section.sub-intro.section-padding

  section.sub-xxx-overview.section-padding
  section.sub-xxx-feature.section-padding
  section.sub-xxx-trust.section-padding
  section.sub-xxx-impact.section-padding

  section.sub-cta.section-padding
```

Rule:
- 공통: `sub-visual`, `sub-nav`, `sub-intro`, `sub-cta`
- 본문: 반드시 page prefix 포함
- `impact`, `feature`, `trust` 단독 root 금지

Examples:
- `sub-lumi-impact`
- `sub-nymi-integrations`
- `sub-litera-products`
- `sub-legal-functions`
- `sub-sg-feature`
- `sub-sg-risk`

## Case 7. Main Page Section

메인 페이지 전용 section이다.

```text
section.main-xxx.section-padding
  no-container-xl
    main-xxx__inner
      sub-section-txt
      section-contents
        main-xxx__grid
```

Use when:
- 홈/메인 페이지 고유 section
- 넓은 레이아웃이 필요한 section

Rule:
- main page root는 `main-*`
- section width는 보통 `no-container-xl`
- header만 `header__container` 예외

## Case 8. Shared CTA

CTA는 page별 root를 만들지 않는다.

```text
section.sub-cta.section-padding
  no-container
    sub-cta__inner
      sub-cta__bg
      sub-cta__body
        h2.heading-54.text-title-invert.bold
        p.body-20.text-body-invert.regular
      sub-cta__actions
        button
```

Main page:

```text
section.main-cta.section-padding
  no-container
    main-cta__inner
      main-cta__bg
      main-cta__body
      main-cta__actions
```

Do not:
- `sub-lumi-cta`
- `sub-nymi-cta`
- `sub-legal-cta`
- `cta-band`

## Case 9. Existing Dirty Root Cleanup

root에 sticky combo가 붙어 있으면 기존 root를 계속 덮어쓰지 않는다.

```text
old section
  no-container
    existing subtree

new section.sub-xxx.section-padding
  move existing no-container here
```

Steps:
1. 기존 top-level section tree 확인
2. root class 순서 확인
3. clean root 생성
4. 기존 `no-container` subtree 이동
5. old root 제거는 Designer 확인 후 진행

Do not:
- broad `set_style` 반복
- old combo가 붙은 root를 기준 구조로 인정

## Case 10. Copied Product Section Rename

다른 제품 페이지에서 가져온 section은 현재 페이지의 실제 내용에 맞춰 root와 내부 BEM을 다시 정한다.

```text
old section.sub-litera-feature.section-padding
  no-container
    sub-litera-feature__inner
      sub-section-txt
      section-contents

new section.sub-sg-risk.section-padding
  no-container
    sub-sg-risk__inner
      sub-section-txt
      section-contents
        sub-sg-risk__grid
          sub-sg-risk__card
            sub-sg-risk__icon
            sub-sg-risk__body
```

Naming examples:
- 주요 특징: `sub-sg-feature`
- End-point 취약점 보완: `sub-sg-risk`
- 지원 환경/연동: `sub-sg-platform`
- 인증 흐름/작동 방식: `sub-sg-workflow`

Rule:
- 원본 제품명 class(`sub-litera-*`, `sub-lumi-*`, `sub-nymi-*`)를 현재 페이지에 남기지 않는다.
- `feature`, `risk`, `platform`, `workflow`처럼 내용 역할을 먼저 정하고, 앞에 페이지 prefix `sub-sg-`를 붙인다.
- 내부 wrapper는 root prefix와 같은 BEM만 쓴다.

## Case 11. Text Color Decision

텍스트 색은 가장 가까운 실제 배경 기준으로만 고른다.

Dark:

```text
h2.heading-54.text-title-invert.bold
p.body-20.text-body-invert.regular
```

Light:

```text
h2.heading-54.text-title.bold
p.body-20.text-body.regular
```

Do not:

```text
p.body-20.text-body.text-body-invert.regular
h2.heading-54.text-title.text-title-invert.bold
```

## Before Build Checklist

- [ ] 이 문서를 읽었다.
- [ ] 기존 section tree를 확인했다.
- [ ] root class가 identity-first다.
- [ ] section width wrapper가 `no-container` 또는 `no-container-xl`다.
- [ ] card wrapper가 단일 소유 class다.
- [ ] card wrapper에 background/surface/border/radius utility가 없다.
- [ ] 텍스트 태그에 section-specific class가 없다.
- [ ] native Webflow 기능 가능성을 먼저 확인했다.
- [ ] 변경 후 `docs/webflow-implementation-status.md` 갱신 계획이 있다.
