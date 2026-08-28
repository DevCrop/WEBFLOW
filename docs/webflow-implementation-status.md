# Webflow Current Status

이 문서는 Webflow 사이트 `intellectualdata`의 최신 작업 기준만 남긴 현재 상태 문서다.
과거 작업 로그는 남기지 않는다. Webflow 구조, 변수, 컴포넌트, CMS, publish 상태가 바뀌면 같은 작업 안에서 이 문서를 최신 상태로 덮어쓴다.

## Site

| 항목 | 값 |
| --- | --- |
| siteId | `6a38f39fe95d43bbdbe5c71c` |
| home pageId | `6a38f3a0e95d43bbdbe5c758` |
| SessionGuardian pageId | `6a48b6b0f4a8532139b152aa` |
| home Body element | `6a38f3a0e95d43bbdbe5c75d` |
| 변수 컬렉션 | `Base collection` / `Base mode` |
| 기본 폰트 | Pretendard (`--font--base`) |
| 영문 폰트 | EB Garamond (`--font--en`) |
| 국문 포인트 폰트 | Noto Serif KR (`--font--ko`) |
| 섹션 최대 폭 | `no-container-xl` = 1664px |
| publish | 별도 승인 전까지 금지 |

## Latest Rules

- Container source of truth를 `Layout/Container` 1440px과 `Layout/Gutter` Desktop/Tablet 24px, Mobile L 20px, Mobile 16px로 통일했다. Global `no-container`(`20ca2548-3170-5c68-4c95-7c7616a049e6`)와 레거시 alias `u-no-container`(`fae42e56-6005-d7f7-18b7-d13758cce53c`)는 동일 변수, width/height 100%, auto margin, position relative를 사용한다. Header wrapper는 `header__container` 단일 class만 남겼다.
- Global selector lookup을 방해하던 빈 combo paths는 `product-tabs__container-layout`, `header__container-layout`, `u-section-container-layout`로 고유화하고 원래 빈 property 상태로 복원했다. `no-container-xl` 1664px 확장 variant는 의도적으로 유지했으며 publish는 수행하지 않았다.
- `intro-title`과 `section-title`의 타이포 위계를 분리했다. Intro H2는 실제 `heading-64`, Section H2는 새 독립 `heading-54`를 사용한다. Intro 역할은 eyebrow 24/141%, title 64/141%/400, subtitle 24/141%/600, body 20/161.8%/400이고, Section 역할은 eyebrow 18/141%, title 54/141%/700, subtitle 20/141%/600, body 18/161.8%/400이다. Intro subtitle 태그는 H4에서 H3로 바로잡았다. 기존 props, Intro 6개 언어·surface variant, Section 6개 surface·alignment variant와 총 105개 instance는 보존했다.
- Base collection에 `Heading/54/Size`(`--heading--54--size`, `variable-d3699169-3048-2309-e332-c0c73e0ee072`)를 추가했다. 크기는 Base 54px, Tablet 44px, Mobile L 36px, Mobile 30px이며, 이를 참조하는 독립 global selector `heading-54`(`9f67e00f-6a57-d7cc-3dd5-cfd2f2c7ee56`)를 line-height 141%, letter-spacing -2%, margin/padding 0으로 생성했다. Publish는 수행하지 않았다.
- Data Analytics 페이지의 `Div Block 115`(`2a519838-752a-2120-f19d-37846d69dc0f`, style `7d5b9696-7156-f01f-88ce-3a7b15580ba8`)에 `display:flex`와 `align-items:center`를 적용해 내부 `section-content-body text-title-invert` 문단을 세로 중앙 정렬했다. 기존 padding, border, background와 text-align은 유지했으며 publish는 수행하지 않았다.
- Base collection에 `Heading/72/Size`(`--heading--72--size`, `variable-6303926e-a863-63a0-d803-0885fdd152ec`)를 추가했다. 크기는 Base 72px, Tablet 56px, Mobile L 44px, Mobile 36px이며, 이를 참조하는 독립 global selector `heading-72`(`01e2edf3-fc3a-4fff-7bab-b15053071e76`)를 line-height 141%, letter-spacing -2%, margin/padding 0으로 생성했다.
- `sub-visual` 컴포넌트(`06868950-51cf-7bdf-164a-91b8dc366f91`)의 H1 selector를 `heading-64`에서 `heading-72`로 교체해 24개 instance에 반응형 위계를 적용했다. KO/EN variant는 각각 `--font--ko`/`--font--en`, weight 400, `--color--text--primary`만 `heading-72`에 override한다. About의 `sub-visual-media-about`와 `sub-visual-media-about-mobile`은 title이 없는 media-only component로 확인되어 typography를 중복 적용하지 않았고, 공통 `sub-visual`의 image/background/video media props가 동일 H1 위계를 공유한다. Publish는 수행하지 않았다.
- `num-row` 컴포넌트(`de43678e-3ea6-d3aa-225e-4c8af852d91b`)의 숫자 요소를 `num-row__badge` wrapper 안으로 이동해 원형 브랜드 badge를 복원했다. Badge는 `--color--brand--primary`를 참조하며 모든 breakpoint에서 64x64px을 사용한다. `display:flex`, `align-items:center`, `justify-content:center`, `flex-shrink:0`, `border-radius:50%`로 숫자를 중앙 고정했다. 숫자 문단은 dark/light variant 모두 margin/padding 0, line-height 100%, text-align center로 정규화해 글자 윤곽의 시각 중심도 맞췄다. 어두운 브랜드 배경과의 대비를 위해 숫자 색상을 `--color--text--primary`로 고정했다. 기존 `num` prop과 5개 instance는 보존했고 publish는 수행하지 않았다.
- `intro-title-v2` 내부 텍스트 class migration을 완료했다. Eyebrow는 `body-18 regular text-desc`, H2는 `heading-64 regular text-title-v2`, subtitle은 `body-20 regular text-subtitle`, body는 `body-18 regular text-body`를 사용한다. H2의 중복 `intro-title section-head-title`, eyebrow의 `intro-eyeblow section-lead-eyebrow`, subtitle/body의 `intro-* section-content-body--legacy-*`를 v2에서 제거했다. 기존 canonical `heading-64 > regular > text-title` path가 누락되고 생성 시 내부 충돌이 발생해 H2 컬러 단계만 migration-safe `text-title-v2`를 사용하며, 기존 selector retirement 후 `text-title`로 흡수한다. 6개 variant의 KO/EN font와 White/Black 4단계 hierarchy override도 새 class path로 이관했다. Data Analytics live instance는 아직 교체하지 않았고 publish는 수행하지 않았다.
- `intro-title`과 `intro-title-v2`의 variant surface mapping은 원래 컴포넌트 cascade에 맞춰 복원했다. `Base`, `English`, `KO White`, `English White`는 White hierarchy(Title 100% / Subtitle 88% / Body 78% / Eyebrow 60%)를 사용하고, `KO invert`, `English invert`만 Black hierarchy(Title 100% / Subtitle 88% / Body 72% / Eyebrow 56%)를 사용한다. KO 계열은 `--font--ko`, English 계열은 `--font--en`, 모든 title은 weight 400과 shadow none을 유지한다. 이전의 Base=light-surface 설명과 mapping은 제거했으며 publish는 수행하지 않았다.
- Data Analytics의 모듈별 승인 migration을 위해 기존 `intro-title`은 유지하고 rollback-safe candidate `intro-title-v2`(`ea89ac4b-f08d-484c-5e95-a3bed92b8123`)를 복제했다. Draft-only `/components` catalog에 base instance(`6325bde6-3e6e-6766-a02e-89edaf64c91b`)를 추가했다. Live page instance는 아직 교체하지 않았으며, H2의 legacy 72px을 canonical `heading-64`로 흡수할지 별도 `heading-72` token을 유지할지 승인 후 v2 내부 class migration을 진행한다. Publish는 수행하지 않았다.
- 텍스트 컬러 변수는 surface별 4단계 위계로 정규화했다. Dark surface는 Title `Color/Text/Primary` 100%, Subtitle `Color/Text/Subtitle` 88%(`#FFFFFFE0`), Body `Color/Text/Body` 78%(`#FFFFFFC7`), Desc `Color/Text/Desc` 60%(`#FFFFFF99`)를 사용한다. Light surface는 Title `Color/Text/Inverse` 100%(`#011926`), Subtitle `Color/Text/Subtitle Inverse` 88%(`#011926E0`), Body `color/text/inverse-muted` 72%(`#011926B8`), Desc `Color/Text/Desc Inverse` 56%(`#0119268F`)를 사용한다. `intro-title`의 6개 variant는 title/subtitle/body/eyebrow 순서로 해당 단계를 연결하며 publish는 수행하지 않았다.
- Data Analytics의 `intro-title` instance(`a40c505b-9c5f-1896-8aa7-2f5aae11efa6`) title override는 이전 Designer 편집에서 남은 inline `<strong>` formatting run을 제거하기 위해 동일 문구의 plain text로 재저장했다. 두 문장 사이 줄바꿈을 복원했으며 다른 props와 variant는 유지하고 publish는 수행하지 않았다.
- `intro-title` 컴포넌트는 기존 instance와 prop을 보존하는 비파괴 방식으로 6개 variant를 정규화했다. `Base`/`English`는 light surface KO/EN, `KO White`/`English White`는 dark surface KO/EN이며, `KO invert`/`English invert`는 기존 instance 호환용 dark-surface alias로 유지한다. 모든 title은 언어별 `--font--ko`/`--font--en`, `font-weight: 400`, surface별 title color token과 `box-shadow: none`을 사용한다. Eyebrow/subtitle/body도 surface별 text token으로 통일하고 subtitle/body는 400 및 Body/02 line-height 변수를 사용한다. Variant ID, content prop, visibility prop, wrapper gap과 element structure는 변경하지 않았고 publish는 수행하지 않았다.
- `.section-content-body.text-body-invert` combo selector는 main과 tiny breakpoint 모두 dark-surface body token인 `Color/Text/Body`(`#FFFFFFC7`)를 사용한다. 이전 mobile black override와 dark-text inverse-muted 연결을 제거했으며 publish는 수행하지 않았다.
- `intro-title` 컴포넌트의 한국어 H2는 기존 `section-head-title` combo selector(`.heading-92.fm-en.section-head-title`)에서 국문 폰트 변수 `--font--ko`와 `font-weight: 400`을 사용하도록 정규화했다. 영문 폰트의 한글 fallback으로 Regular가 굵게 보이던 문제를 해소했으며, 현재 `regular`는 독립 재사용 style이 아니므로 중복 selector를 새로 만들지 않았다. Publish는 수행하지 않았다.
- Webflow 페이지/섹션/카드/CTA 구조를 짜기 전 `docs/webflow-layout-flow-examples.md`를 반드시 읽는다.
- 기존 section을 먼저 읽고, 이미 만든 골격이 있으면 새로 만들지 않는다.
- section root는 identity-first로 둔다: `sub-lumi-impact section-padding`.
- section 폭 wrapper는 `no-container` 또는 `no-container-xl`만 쓴다.
- `body-20`은 현재 global typography utility다. `body-2`, `legacy-body-20-combo`는 새 작업에 쓰지 않는다.
- CTA root는 `main-cta`, `sub-cta`만 쓴다.
- Luminance/Nymi 본문은 dark body 기준이다. `bg-white`, `bg-secondary`를 되살리지 않는다.
- section-specific card wrapper는 단일 소유 class만 쓴다: `sub-lumi-impact__card`.
- card wrapper에 `bg-*`, `surface-*`, `border-*`, `radius-*`를 붙이지 않는다.
- 텍스트 태그는 `heading-*`/`body-*` + `text-*` + weight 조합만 쓴다.
- native Webflow 기능으로 가능한 것은 custom JS/HtmlEmbed로 만들지 않는다.
- CMS 대량 변경, 삭제, production publish는 사용자 확인 없이 하지 않는다.

## Typography

| Type | Classes |
| --- | --- |
| Display | `display-200`, `display-188`, `display-108`, `display-88` |
| Heading | `heading-64`, `heading-54`, `heading-48`, `heading-36`, `heading-28` |
| Body | `body-24`, `body-20`, `body-18` |
| Weight | `regular`, `medium`, `semibold`, `bold` |
| Font | `fm-base`, `fm-en`, `fm-ko` |

Text class examples:

```text
h2.heading-54.text-title-invert.bold
p.body-20.text-body-invert.regular
```

금지:

```text
h2.sub-lumi-impact__title
p.sub-lumi-impact__desc
p.body-20.text-body.text-body-invert.regular
```

## Standard Structure

```text
section.sub-xxx.section-padding
  no-container
    sub-xxx__inner
      sub-section-txt
      section-contents
        sub-xxx__grid
          sub-xxx__card
```

Sub page common sections:

```text
section.sub-visual
nav.sub-nav
section.sub-intro.section-padding
section.sub-cta.section-padding
```

Product body sections use page prefixes:

```text
sub-sg-*
sub-lumi-*
sub-nymi-*
sub-litera-*
sub-legal-*
```

SessionGuardian current structure:

```text
section.sub-visual
  no-container
nav.sub-nav
section.sub-intro.section-padding
section.sub-sg-feature
  no-container
    sub-sg-feature__inner
      sub-section-txt
      section-contents
        sub-sg-feature__slider
          sub-sg-feature__mask
            sub-sg-feature__slide
              sub-sg-feature__slide-grid
                sub-sg-feature__gallery-card
                  sub-sg-feature__media
                    sub-sg-feature__image
                  sub-sg-feature__body
                sub-sg-feature__gallery-card
                  sub-sg-feature__media
                    sub-sg-feature__image
                  sub-sg-feature__body
          sub-sg-feature__arrow sub-sg-feature__arrow-prev
          sub-sg-feature__arrow sub-sg-feature__arrow-next
          sub-sg-feature__pagination
section.sub-sg-risk.section-padding
  no-container
    sub-sg-risk__inner
      sub-section-txt
      section-contents
        sub-sg-risk__grid
          sub-sg-risk__card
            sub-sg-risk__icon
            sub-sg-risk__body
section.sub-sg-industry.section-padding
  no-container
    sub-sg-industry__inner
      sub-section-txt
      section-contents
        sub-sg-industry__tabs
          sub-sg-industry__button-list
            sub-sg-industry__button
          sub-sg-industry__panel
            p.body-20.text-body-invert.regular
section.sub-sg-deployment.section-padding
  no-container
    sub-sg-deployment__inner
      sub-section-txt.text-center
      section-contents
        sub-sg-deployment__grid
          sub-sg-deployment__card
            sub-sg-deployment__icon
            sub-sg-deployment__body
section.sub-sg-compliance.section-padding
  no-container
    sub-sg-compliance__inner
      sub-section-txt.text-center
      section-contents
        compliance card grid
section.sub-cta
footer.footer
```

## Components

| Component | Current note |
| --- | --- |
| `footer` | SessionGuardian page에 page-level footer 구조 생성. root element `06c7f329-1d9e-092f-7e79-a1ddf2b14eea` |
| `button` | variant는 API로 가능. label은 Designer에서 직접 수정 필요 |
| `card` | 실제 공통 컴포넌트. 섹션별 `sub-xxx__card` wrapper와 구분 |
| `banner` | CTA 용도로 쓰지 않음 |
| `badge` | textContent binding 가능 |
| `breadcrumb` | native Dropdown 우선 |

SessionGuardian 주요 element:

| 역할 | element |
| --- | --- |
| hero width wrapper | `b7e7bcef-e57c-0f81-70ce-bfc0339bdd17` |
| hero product logo image | `144997f4-5574-2622-5036-c1439008d9c1` |
| feature root | `efb6e81c-8237-84bd-2c30-adaeb935d713` |
| feature text wrapper | `7c1c9a87-8df5-3c36-4429-640308b43641` |
| feature active slider | `de68f6f4-2b96-0ba2-1cc8-618d61bf974a` |
| feature active mask | `de68f6f4-2b96-0ba2-1cc8-618d61bf974b` |
| feature slide page 1 | `de68f6f4-2b96-0ba2-1cc8-618d61bf974c` |
| feature slide page 2 | `de68f6f4-2b96-0ba2-1cc8-618d61bf974d` |
| feature old slider shell | `b9ee070a-2c1d-7c45-230c-83ea86123374` hidden |
| feature gallery card class | `sub-sg-feature__gallery-card` |
| risk root | `b0e02c2f-c4a0-08e5-0a18-02f84afe0b0a` |
| risk width wrapper | `b0e02c2f-c4a0-08e5-0a18-02f84afe0b0b` |
| risk inner wrapper | `b0e02c2f-c4a0-08e5-0a18-02f84afe0b0c` |
| risk text wrapper | `b0e02c2f-c4a0-08e5-0a18-02f84afe0b0d` |
| risk contents wrapper | `b0e02c2f-c4a0-08e5-0a18-02f84afe0b16` |
| risk grid | `b0e02c2f-c4a0-08e5-0a18-02f84afe0b17` |
| risk first card | `b0e02c2f-c4a0-08e5-0a18-02f84afe0b18` |
| risk first icon | `b0e02c2f-c4a0-08e5-0a18-02f84afe0b19` |
| industry root | `6e683d9e-9df2-a0da-3b86-0a3da0534812` |
| industry width wrapper | `6e683d9e-9df2-a0da-3b86-0a3da0534813` |
| industry layout wrapper | `6e683d9e-9df2-a0da-3b86-0a3da0534814` |
| industry body wrapper | `6e683d9e-9df2-a0da-3b86-0a3da0534815` |
| industry headline wrapper | `6e683d9e-9df2-a0da-3b86-0a3da0534816` |
| industry accordion root | `56bbd72e-de85-0c1b-69ef-9bf9438cef95` |
| industry button list | `56bbd72e-de85-0c1b-69ef-9bf9438cef82` |
| industry detail panel | `56bbd72e-de85-0c1b-69ef-9bf9438cef94` |
| deployment root | `d97dd608-d4e2-787f-dd45-25e2881882cb` |
| deployment width wrapper | `d97dd608-d4e2-787f-dd45-25e2881882cc` |
| deployment inner wrapper | `d97dd608-d4e2-787f-dd45-25e2881882cd` |
| deployment text wrapper | `d97dd608-d4e2-787f-dd45-25e2881882ce` |
| deployment contents wrapper | `d97dd608-d4e2-787f-dd45-25e2881882d5` |
| deployment grid | `d97dd608-d4e2-787f-dd45-25e2881882d6` |
| deployment first card | `d97dd608-d4e2-787f-dd45-25e2881882d7` |
| deployment first icon | `d97dd608-d4e2-787f-dd45-25e2881882d8` |
| deployment first body | `d97dd608-d4e2-787f-dd45-25e2881882d9` |
| compliance root | `ca20026b-9abd-c7bf-5fe4-2f20095a5173` |
| compliance width wrapper | `ca20026b-9abd-c7bf-5fe4-2f20095a5174` |
| compliance inner wrapper | `ca20026b-9abd-c7bf-5fe4-2f20095a5175` |
| compliance text wrapper | `ca20026b-9abd-c7bf-5fe4-2f20095a5176` |
| CTA root | `9ed6daa8-2cec-0024-0442-99693f8c57d1` |
| footer root | `06c7f329-1d9e-092f-7e79-a1ddf2b14eea` |
| footer width wrapper | `951db125-a018-3fd0-031c-cbfa70952c11` |

Button structure:

```text
button
  button-inner
    button-label
    button-icon
```

CTA structure:

```text
section.sub-cta
  no-container
    sub-cta__inner
      sub-cta__bg
      sub-cta__body
      sub-cta__actions
```

Footer structure:

```text
footer.footer
  no-container.footer__container
    footer__inner
      footer__subscribe
        h2.heading-54.text-title-invert.bold
        Form.footer__form
      footer__panel
        footer__top
        footer__divider
        footer__middle
        footer__divider
        footer__legal-row
```

Footer detail classes:

```text
footer__logo-img       footer brand SVG image
footer__field          email input
footer__consent-text   privacy consent copy
footer__meta-label     Company / CEO / Address labels
footer__meta-value     company information values
footer__copyright      copyright copy
footer__social-pill    social icon links
```

## Known Constraints

- 일부 Webflow utility selector가 combo selector로 저장되어 있다.
- 현재 확인된 combo utility: `no-container`, `text-center`, `text-title`, `text-body`, `heading-28/54` 적용 시 병합되는 `heading-32`, `heading-52`, `section-title`, `Section 10`, `button 2`, `sub-intro Copy`, `product-tabs__container`.
- 요소에 `set_style`을 다시 적용해도 위 combo가 재병합될 수 있다. 이 경우 요소를 계속 덮어쓰지 말고 style selector migration으로 global utility를 먼저 정규화한다.
- `section-padding`을 붙이면 `Section 10`이 재병합되는 요소가 있다. SessionGuardian의 `sub-sg-feature`, `sub-cta` root는 현재 오염 제거를 위해 owner root class만 둔다.
- `set_style`은 기존 class를 교체하므로 새 `sub-sg-*` selector가 비어 있으면 기존 레이아웃 스타일이 빠진다. 내부 class를 바꿀 때는 selector 이름뿐 아니라 기존 레이아웃 속성도 함께 이관한다.
- root가 오염됐으면 clean root를 만들고 기존 subtree를 이동한다. selector 자체가 combo면 clean root에도 재병합될 수 있으므로 selector migration 대상에 넣는다.
- 컴포넌트 인스턴스에는 클래스를 직접 붙이지 말고 wrapper에서 조정한다.
- `button-label`은 API로 인스턴스별 textContent 변경이 어렵다.
- WHTML로 만든 footer는 일부 class/inline style이 Webflow styleName으로 자동 승격되지 않을 수 있다. 필요한 wrapper는 `data_style_tool`로 style을 만들고 `set_style`로 직접 적용한다.
- SessionGuardian 기준 class:
  - feature root: `sub-sg-feature`
  - feature internals: `sub-sg-feature__inner`, `sub-sg-feature__slider`, `sub-sg-feature__mask`, `sub-sg-feature__slide`, `sub-sg-feature__media`, `sub-sg-feature__image`, `sub-sg-feature__body`, `sub-sg-feature__gallery-card`
  - endpoint risk root: `sub-sg-risk section-padding`
  - endpoint risk internals: `sub-sg-risk__inner`, `sub-sg-risk__grid`, `sub-sg-risk__card`, `sub-sg-risk__icon`, `sub-sg-risk__body`
  - industry root: `sub-sg-industry section-padding`
  - industry internals: `sub-sg-industry__inner`, `sub-sg-industry__tabs`, `sub-sg-industry__button-list`, `sub-sg-industry__button`, `sub-sg-industry__panel`
  - deployment root: `sub-sg-deployment section-padding`
  - deployment internals: `sub-sg-deployment__inner`, `sub-sg-deployment__grid`, `sub-sg-deployment__card`, `sub-sg-deployment__icon`, `sub-sg-deployment__body`, `sub-sg-deployment__list`
  - compliance root: `sub-sg-compliance section-padding`
  - compliance confirmed internals: `sub-sg-compliance__inner`, `sub-section-txt text-center`
  - compliance prepared owner classes: `sub-sg-compliance__grid`, `sub-sg-compliance__card`, `sub-sg-compliance__media`, `sub-sg-compliance__image`
  - CTA root: `sub-cta`
  - hero product logo image: `sub-visual__product-logo`
  - breadcrumb label wrapper: `breadcrumb-label`
  - hero/footer width wrapper: `no-container`
  - heading: `heading-* text-* bold`
  - hero button: `button is-brand is-fill outline-black`
- SessionGuardian 페이지에는 `sub-litera-*` 구조 class를 남기지 않는다. Litera에서 가져온 섹션/슬라이더/카드 구조는 내부 콘텐츠 역할에 맞춰 `sub-sg-*`로 다시 잡는다.
- SessionGuardian feature gallery card는 `sub-sg-feature__gallery-card`를 쓴다.
- `sub-litera-feature`처럼 복사 원본명이 보이면 현재 섹션 내용을 먼저 읽고 이름을 정한다. 예: “기존 End-point의 취약점 보완” 섹션은 `sub-sg-risk`.
- 반복 card/list의 나머지 item ID가 MCP 출력에서 잘리면 확인된 첫 item에 owner class를 적용하고, 나머지는 Designer에서 선택되는 즉시 같은 owner class로 맞춘다.
- footer의 작은 텍스트 계층은 utility 조합 대신 footer 전용 detail class로 관리한다. 예: `footer__meta-label`, `footer__meta-value`, `footer__copyright`.
- footer logo는 SVG image asset에 `footer__logo-img`를 적용하고, 임시 텍스트 로고는 숨긴 상태로 둔다.
- email input과 social pill은 sticky combo 방지를 위해 각각 `footer__field`, `footer__social-pill` 단일 class 기준으로 둔다.

## Release Notes Filter And Sort

- Release Notes page: `6a48b6c27b53afca3f2c8f38` (`/release-notes`).
- Page-level freeform code is rejected by the current Webflow API with HTTP 406. The controller is therefore appended to site footer code and is guarded by `[data-release-board]`, so it exits on every other page.
- A single state object manages `solution`, `category`, `search`, and `sort`. The common render flow filters CMS list items, sorts by `.sub-release-board__row-date`, updates the visible item count and empty state, then synchronizes selected control state.
- Existing hooks: `[data-release-search]`, `[data-release-solution]`, `[data-release-solution-cms]`, `[data-release-category]`, `[data-release-reset]`, `[data-release-sort-value]`, `[data-release-sort-label]`, `[data-release-count]`, `[data-release-empty]`.
- Sort values: `newest` uses descending date order; `oldest` uses ascending date order. Publish remains user-approved only.

## SessionGuardian Verification

- Visual check 1: feature, risk, industry, deployment, compliance, CTA가 draft 페이지에서 렌더링된다.
- Tree check 2: `sub-sg-feature`, `sub-sg-risk`, `sub-sg-industry`, `sub-sg-deployment`, `sub-sg-compliance`, `sub-cta`, `footer` root가 확인된다.
- Cleaned root classes: feature root는 `sub-sg-feature`, CTA root는 `sub-cta`, feature text wrapper는 `sub-section-txt`만 남긴다.
- Created missing classes: `sub-visual__product-logo`, `breadcrumb-label`, `sub-sg-feature__gallery-card`.
- Feature slider update: native replacement slider `de68f6f4-2b96-0ba2-1cc8-618d61bf974a` is active. It has 2 slide pages, and each page shows 2 gallery cards with image + text.
- Feature controls update: prev/next use `sub-sg-feature__arrow`, `sub-sg-feature__arrow-prev`, `sub-sg-feature__arrow-next`; pagination uses `sub-sg-feature__pagination`.
- Feature old slider shell `b9ee070a-2c1d-7c45-230c-83ea86123374` is hidden because Webflow blocks moving native slides between masks.
- Reapplied card owner classes: risk first card는 `sub-sg-risk__card`, deployment first card는 `sub-sg-deployment__card`.
- Remaining class cleanup: 일부 heading에 `heading-32`, hero wrapper에 `product-tabs__container`, hero button에 `button 2`가 재병합된다. 단순 `set_style` 반복이 아니라 selector migration 또는 clean root 재구성이 필요하다.
- Industry accordion: `sub-sg-industry__tabs` 안에 left button list + right detail panel 구조를 둔다. 현재 기본 active content는 `금융분야` 본문이다.
- Removed old placeholder content from active industry accordion. Old visual placeholder list is hidden.
- Verification note: latest successful industry accordion snapshot confirmed button column and right detail panel. A later full-section snapshot call failed twice at Webflow snapshot API level.
- Footer detail classes: `footer__meta-label`, `footer__meta-value`, `footer__copyright`, `footer__field`, `footer__social-pill`, `footer__logo-img`가 확인된다.

## Work Flow

1. `docs/webflow-layout-flow-examples.md` 읽기
2. page/section/element ID 확인
3. `get_all_elements` depth 1~2로 기존 section tree 확인
4. root class와 sticky combo 확인
5. clean root가 필요하면 만들고 `no-container` subtree 이동
6. 텍스트 class 정리
7. Designer preview 또는 read-back 확인
8. 이 문서를 최신 상태로 갱신
# Title typography adjustment

- INDA caps migration completed on Data Analytics: `section-content-eyebrow` is 16px/141%/600, `section-content-title` is 34px/141%/700, `section-content-sub-title` is 22px/161.8%/400, and `section-content-body` is 18px/161.8%/400.
- The four INDA caps explanatory paragraphs now use `section-content-sub-title`; the legacy `section-content-body + sub-inda-caps__desc` combination was removed. `sub-inda-caps__check` remains structural but its combo typography is normalized to the body role.
- INDA migration preparation: `Heading/01` through `Heading/03` line-height variables are `141%`; `Body/01` through `Body/04` are `161.8%`; `Content/Sub Title/Size` was added at `22px`.
- Pending Designer reconnection: assign `section-content-sub-title` to the INDA DataCenter introductory copy, then normalize only active INDA content overrides.
- Main-breakpoint line-height scale: title/heading `141%`, body `161.8%`, eyebrow `141%`, and display `121%`.
- The existing `display-200` and `heading-36` classes were not present, so no replacement classes were created.
- `section-title-body` uses `Body/Content/Size` (20px), `161.8%` line height, and `Color/Text/Desc` (#EEE) so body copy sits below white titles in contrast.
- The former `section-title-eyeblow` selector was later proven unused across all 41 pages and current component definitions and has been removed. Current section-title eyebrow content uses `section-head-eyebrow medium`.
- No publish was performed.

### Native monochrome pagination migration

- Migrated the Release Notes pagination surface from runtime-injected CSS to native Webflow styles.
- Added global styles `release-pagination-control`, `release-pagination-current`, and `release-pagination-disabled`.
- `release-pagination-control` uses the existing `color/base/black` and `color/base/white` variables, a centered flex layout, a 1px white border, and a true circular radius.
- Controls are `44px x 44px` at main/tablet/mobile-landscape inheritance and `40px x 40px` at the tiny breakpoint.
- The current-page state uses a white surface with black text; unavailable arrows use `0.3` opacity and disabled pointer events.
- Previous and next arrow elements were read back with the exact final `styleNames` value `["release-pagination-control"]`.
- Registered and applied `release_notes_filter_pagination` version `1.0.4`; dynamically generated page numbers receive the native control/current classes and boundary arrows receive the native disabled class.
- Removed `release_notes_pagination_monochrome_theme` from the site's applied scripts, so runtime CSS no longer owns the visual treatment.
- Final site-script read-back confirmed `release_notes_filter_pagination` version `1.0.4` is applied and the monochrome theme script is absent.
- Webflow element snapshot still returned `status:false`, so visual snapshot verification remains pending; stored styles, element classes, and applied scripts passed MCP read-back.
- No publish was performed.

### Pagination navigation correction

- Corrected the Release Notes pagination controls that could fall through to their anchor navigation and move the viewport instead of changing pages.
- Removed `href` from the stored previous and next Link elements while retaining `role="button"`, their accessible labels, data attributes, and `release-pagination-control` style.
- Registered and applied `release_notes_filter_pagination` version `1.0.5`.
- Dynamic page numbers are now generated as `button type="button"` elements rather than anchors.
- Previous and next controls now clamp requested pages to the valid range, prevent default navigation, stop click propagation, update item visibility, and re-render current/disabled states.
- Enter and Space keyboard activation is supported on the stored previous and next controls.
- MCP read-back confirmed both controls have no `href` and the site applies version `1.0.5`.
- No publish was performed.

### Pagination global-controller isolation

- Preview mode still scrolled upward after the anchor correction because the Release Notes DOM retained the global `cms-pagination*` selectors used by `id_cms_pagination`.
- Added native `release-pagination` and `release-pagination-numbers` layout styles.
- Replaced the pagination root and numbers wrapper style lists with the exact values `["release-pagination"]` and `["release-pagination-numbers"]`.
- Registered and applied `release_notes_filter_pagination` version `1.0.6`.
- Dynamic page buttons now use only `release-pagination-control` and `release-pagination-current`; no `cms-pagination*` classes or anchor targets remain.
- Pagination clicks are handled in the capture phase, cancel default behavior, and stop competing global listeners before changing the page state.
- MCP read-back confirmed the isolated root/wrapper class lists and the applied `1.0.6` script.
- The initial combined style creation returned HTTP 504 and was not treated as success; both styles were subsequently created in separate calls and confirmed by successful element assignment/read-back.
- No publish was performed.

### Pagination item-visibility root cause correction

- Confirmed from `id_ui_controller` version `1.1.57` that Release Notes filtering writes both `item.hidden` and inline `item.style.display`.
- The pagination implementation only wrote the HTML `hidden` state. The Webflow item selector's authored `display` value could override that state, leaving all filtered items visible and making page clicks appear ineffective.
- Added the native `release-page-hidden` style with `display:none` as the pagination-only visibility state.
- Registered and applied `release_notes_filter_pagination` version `1.0.7`.
- Filtering remains owned by `id_ui_controller`; pagination now removes/applies only `release-page-hidden` after reading the filter's `hidden` and inline display results.
- Page size remains eight items. The earlier excessive visible count was caused by the overridden `hidden` state, not by the page-size calculation.
- Site-script read-back confirmed version `1.0.7` is applied.
- No publish was performed.

### Pagination result-position scrolling

- Registered and applied `release_notes_filter_pagination` version `1.0.8`.
- After a successful page-number, previous, or next change, the viewport now scrolls to the Release Notes result-list start with a 96px header offset.
- Scroll behavior is smooth by default and switches to immediate movement when `prefers-reduced-motion: reduce` is active.
- Invalid, disabled, or already-current page requests do not trigger scrolling.
- Site-script read-back confirmed version `1.0.8` is applied.
- No publish was performed.

### Pagination spacing refinement

- Updated native `release-pagination` spacing to separate the controls from the final result row.
- Main/tablet/mobile-landscape inherit `margin-top: 48px`; mobile portrait overrides it to `32px`.
- Webflow style mutation read-back confirmed both breakpoint values.
- No publish was performed.

### Shared pagination visual component migration

- Audited Release Notes, Newsroom, and Insights pagination structures. Newsroom uses stored page links, Insights uses Webflow Native Pagination, and Release Notes uses filter-aware client pagination; forcing one shared DOM/component instance would break one or more behavior models.
- Unified the visual component layer while preserving each page's native/owned behavior.
- Added shared selectors: `pagination-control` (dark/default/current-on-light), `pagination-on-light` (inactive controls on light surfaces), `pagination-numbers`, `pagination-current-dark`, and `pagination-disabled`.
- Shared control size is `44px x 44px` on main/tablet/mobile landscape and `40px x 40px` on mobile portrait, with true circular radius and centered content.
- Root and number gaps are `12px` on main and `8px` on mobile portrait. Existing `cms-pagination` and `cms-pagination__numbers` were updated to the same gap scale.
- Release Notes uses the shared dark control and numbers layer; Newsroom and Insights use the shared light treatment while preserving href and Webflow Native Pagination behavior.
- Registered and applied `release_notes_filter_pagination` version `1.0.9` so runtime-created controls use the shared visual classes.
- Exact element styleNames were read back successfully on all three pages.
- Removed unused migration selectors: `release-pagination-control`, `release-pagination-current`, `release-pagination-disabled`, `release-pagination-numbers`, `pagination-on-dark`, and `pagination-current-light`.
- The first five-style cleanup request returned HTTP 504 and was not treated as success; cleanup was repeated in batches of two or fewer and each removal returned success.
- No publish was performed.

### Release detail empty-media spacing correction

- Release Notes template: `6a51b6b07ac4cedebadca69b`; media wrapper: `ea27c0d5-6911-bc92-17cc-72199be583b5`.
- Confirmed the image binds to the Release Notes `Cover` field while the figure wrapper remains structurally present.
- Existing `id_ui_controller` version `1.1.57` already sets the media wrapper's `hidden` state when no image source exists.
- The root cause was authored `display:block` on `sub-release-detail__media`, which overrode the browser's `[hidden] { display:none }` behavior and left the wrapper's `48px` top margin in layout.
- Removed only the authored `display` property. Preserved `margin-top:48px` for entries that actually have a Cover image.
- Normalized figure margins to `margin-left/right/bottom:0`; retained width, overflow, and radius.
- A temporary fallback script/style was created during diagnosis, then removed after the cleaner existing-controller fix was confirmed. No extra runtime layer remains.
- Style mutation read-back confirmed `sub-release-detail__media` no longer contains `display`.
- No publish was performed.

## Reveal awards typography migration

- Page: `Reveal` (`6a531d2b86942d09a53222e1`), grid `sub-reveal-awards__grid` (`f2fc078d-7e44-22cc-2b66-f28f91fa4d36`).
- Replaced both legacy award H3 elements with canonical `section-micro-title` headings while preserving their text and heading level.
- Removed `sub-reveal-awards__highlight`, `section-micro-title--legacy-16`, and the auto-generated text wrapper classes from the active nodes.
- Replaced both `Div Block 122` wrappers with `sub-reveal-awards__body` (`7364a558-a676-5cc0-155f-2a8cb33978e9`).
- The body subroot owns flex centering, centered text alignment, and the existing `text-title-invert` color variable so both headings inherit the required light-surface title color without a contaminated combo selector.
- Stored-state read-back confirmed both wrappers use only `sub-reveal-awards__body` and both H3 nodes use only `section-micro-title`.
- Designer Bridge disconnected before the final element snapshot, so visual snapshot verification remains pending.
- No publish was performed.

## `section-content-title` line-height adjustment

- Updated the bound Percentage variable `type/section/content/title/line-height` (`variable-1ed9a77f-ceab-fcbb-bdde-c7ecfd0a0f92`) from `121%` to `141%`.
- Updated all four explicit Typography collection modes: Base, Tablet, Mobile L, and Mobile.
- Preserved global selector `section-content-title` (`04d6c5c9-d6a4-5eef-5992-b97b817859bb`) and its existing variable binding, responsive font-size variable, `700` weight, letter-spacing variable, and spacing reset.
- Variable read-back returned Base/Tablet/Mobile L/Mobile = `141/141/141/141`.
- No publish was performed.

## K-Discovery alternating content candidate

- Page: `K-Discovery` (`6a531cf5199ab832e2a92655`).
- Preserved the existing comparison content and added a separate three-row candidate `sub-kdisc-rich` (`cd692ea8-c679-01ca-8974-485833af91fb`) after the copied AI-layout grid.
- The candidate uses the sequence `전문 기술 PM → 기술 플랫폼 → 디스커버리 분야 전문기관` and reuses only K-Discovery copy already present on the page or in the existing qualification section.
- Existing site assets are connected for AI-assisted review, large-scale data analysis, and INDA DataHandler. All three images include descriptive alt text.
- Desktop alternates image/text left-right-left. Tablet reduces gaps, and mobile stacks every row image-first in reading order.
- Designer snapshot confirmed all three images, alternating layout, dark-surface text contrast, and section spacing render on desktop.
- Existing sections and the user's earlier copied grid remain in place for comparison. No deletion or publish was performed.
- The site's contaminated combo selectors rejected API reattachment of standalone text color utilities. The candidate currently stores `section-content-title + bold` and `section-content-body + regular`, while visible white text is inherited from the dark parent surface. Normalize the selector layer before treating the candidate as the final production section.

### 2026-08-24 - `u-no-container` large breakpoint gutter sync

- K-Discovery에서 `sub-visual`과 본문 인트로의 좌측 정렬 차이를 측정했다.
- 원인은 `1440px and up`에서 `no-container`는 좌우 `24px`, `u-no-container`는 레거시 좌우 `80px`을 사용한 것이었다.
- `u-no-container`의 해당 breakpoint 좌우 padding을 `24px`로 동기화했다.
- `sub-kdisc-intro__inner`와 `intro-title`에는 추가 좌우 padding이 없으므로 변경하지 않았다.
- Publish는 수행하지 않았다.
- 재확인 과정에서 Designer UI 입력이 저장되지 않은 상태를 발견해 MCP `update_style`로 `large / noPseudo` 값을 다시 적용했다.
- 2827px 캔버스 측정 결과 Hero와 Intro 모두 좌우 padding `24px`, content x `717.5px`, content width `1392px`로 일치한다.

### 2026-08-24 - `section-title` title font normalization

- `section-title__title`의 font-family를 `Font/Base` (`Pretendard`) 변수에 직접 연결했다.
- 제목 외 eyebrow, subtitle, body 및 `intro-title`은 변경하지 않았다.
- 모든 `section-title` variant가 제목 폰트를 동일하게 상속한다.
- Publish는 수행하지 않았다.

### 2026-08-24 - `heading-54` utility cleanup

- `heading-54`에서 오염된 `font-family`, color, font-weight, margin, padding을 제거했다.
- 최종 책임은 font-size, line-height `141%`, letter-spacing `-0.02em`만 유지한다.
- font family는 `fm-base`/`fm-ko`/`fm-en` 또는 컴포넌트 역할 클래스, 색상은 `text-*`, 굵기는 weight utility가 담당한다.
- `section-title__title`은 기존처럼 `Font/Base` (`Pretendard`)를 직접 참조한다.
- 별도의 `section-*` 크기 클래스를 만들지 않고 기존 global type scale을 source of truth로 유지한다.
- Publish는 수행하지 않았다.
- `section-title` 비기본 variant `d6167a22-0486-3422-c2a3-d825c590f954`의 `heading-54`에 남은 font-family, color, font-weight override도 제거했다.
- variant의 정상적인 역할 색상은 `section-title__title`에 유지한다.

### 2026-08-24 - `intro-title` title size adjustment

- `intro-title` KO White variant (`9cb644f7-0259-0397-9625-f384ae4d1a04`)의 제목 font-size를 64px에서 60px로 조정했다.
- 기존 `Typography/Size/60` 변수를 연결했으며 전역 `heading-64` scale은 변경하지 않았다.
- line-height와 letter-spacing은 기존 heading 규칙을 유지한다.
- Publish는 수행하지 않았다.

### 2026-08-24 - Text color hierarchy migration phase 1

- DOM, class, component variant, background, brand, border 변수는 변경하지 않고 Base collection의 text role Color 값만 조정했다.
- `color/text/desc`: `#FFFFFF99` -> `#FFFFFFC7`.
- `color/text/body`: `#FFFFFFC7` -> `#FFFFFFAD`.
- `color/text/title-invert`: `#000000` -> `#011926`.
- `color/text/subtitle-invert`: `#111111` -> `#18313D`.
- `color/text/desc-invert`: `#333333` -> `#354A54`.
- `color/text/body-invert`: `#222222` -> `#53636B`.
- `color/text/title`과 `color/text/subtitle`은 각각 `#FFFFFF`, `#FFFFFFE0`으로 유지했다.
- Tablet/Mobile 모드는 Base mode 상속을 유지했으며 별도 override를 만들지 않았다.
- `color/text/primary`, `color/text/inverse`는 호환성을 위해 유지했다.
- 다음 단계는 `section-title`의 Title/Subtitle/Description/Body 변수 연결 분리다.
- Publish는 수행하지 않았다.

### 2026-08-24 - Text color hierarchy migration phase 2 (`section-title`)

- `section-title`의 Base, Invert, Base Center variant를 역할 컬러로 분리했다.
- Base/Base Center: root title=`color/text/title`, eyebrow/subtitle=`color/text/subtitle`, description=`color/text/desc`.
- Invert: root title=`color/text/title-invert`, eyebrow/subtitle=`color/text/subtitle-invert`, description=`color/text/desc-invert`.
- `base-center`의 `heading-54`에 남아 있던 font-family, color, font-weight override를 제거했다.
- alignment, visibility props, typography size, spacing, DOM 구조는 변경하지 않았다.
- shared legacy class의 global 값을 바꾸지 않고 component variant scope만 수정해 `intro-title` 영향 범위를 차단했다.
- `/components`의 기존 `section-title` instances는 동일 component definition을 참조하므로 변경된 variant 스타일을 자동 반영한다.
- 다음 단계는 `intro-title`의 Title/Subtitle/Body 컬러 분리다.
- Publish는 수행하지 않았다.
### 2026-08-24 - Text color hierarchy migration phase 3 (`intro-title`)

- `intro-title` base/KO White variants now use the role-based white-surface hierarchy consistently.
- Component root: `color/text/title`
- Eyebrow and subtitle: `color/text/subtitle`
- Body: `color/text/body`
- Heading-local color overrides were removed so the heading inherits the component title role.
- Base heading size was mapped to `Typography/Size/60`; KO White already used the same size.
- Intentional Korean font-family and `400` weight settings were preserved.
- This was a component style-only migration, so existing `/components` instances update automatically.

### 2026-08-24 - K Discovery text color audit

- Audited page `6a531cf5199ab832e2a92655` after the role-token migration.
- `sub-visual` is already compliant: eyebrow uses the muted white role, H1 uses the title role, and description uses the body role.
- Both content headings use `section-content-title text-title-invert`.
- Both content lists use `section-content-body text-body-invert`.
- No `inverse` or `text-inverse` legacy class remains on the page-level content nodes returned by the Designer API.
- Remaining page-level exceptions are `sub-gallery__headline` and `sub-gallery__summary`; these still combine structural and text styling. They were intentionally left unchanged because the current connector did not expose their parent surface context reliably. Migrate them only with the gallery module so the light/dark role can be selected without visual regression.
- No publish was performed.
### 2026-08-24 - Micro body size adjustment

- Changed `type/section/micro/body/font-size` from `18px` to `17px`.
- Existing `section-micro-body` variable bindings were preserved, so all linked component instances inherit the new value.
- Line-height remains `161.8%` and letter-spacing remains `-0.02em`.
- No publish was performed.
### 2026-08-24 - Micro title size adjustment

- Changed `type/section/micro/title/font-size` from `24px` to `26px`.
- Existing `section-micro-title` variable bindings were preserved.
- Line-height remains `121%` and letter-spacing remains `-0.02em`.
- No publish was performed.
### 2026-08-24 - `section-title` font-family normalization

- Audited all six `section-title` variants across the root, wrappers, and internal text selectors.
- Removed the Base variant `section-head-subtitle` `font-family` override.
- Removed `heading-54` `font-family` overrides from `base-right`, `invert-center`, and `invert-right`.
- `Base`, `invert`, `base-center`, `base-right`, `invert-center`, and `invert-right` now use the inherited Base font family without variant-specific KO/EN family logic.
- Alignment, color, size, line-height, letter-spacing, and weight settings were preserved.
- No publish was performed.
### 2026-08-24 - `intro-title` title weight normalization

- Audited all six `intro-title` variants: Base, English, KO White, English White, KO invert, and English invert.
- Every variant already stored `font-weight: 400` on the title selector.
- The internal H2 lacked the standard weight utility, so its classes were normalized from `heading-64` to `heading-64 regular`.
- KO variants retain only `Font/Ko`; English variants retain only `Font/En`. Both language families now share the explicit 400 weight rule.
- Color, size, line-height, letter-spacing, spacing, and visibility props were preserved.
- No publish was performed.

### 2026-08-24 - `intro-title` inline strong cleanup

- Removed the full-title bold inline formatting from the shared `intro-title` H2 source.
- Preserved the title text, line break, text-content prop, typography classes, and all six component variants.
- The title now inherits `regular` (`font-weight: 400`) directly instead of rendering a nested `strong` element at `700`.
- No publish was performed.

### 2026-08-24 - `banner` title scale adjustment

- Created the dedicated global `banner-title` style and mapped its responsive scale to existing heading tokens: Desktop `heading/01` (64), Tablet `heading/02` (54), Mobile Landscape `heading/03` (48), and Mobile Portrait `heading/04` (36).
- Replaced the shared banner H2 class list with the single global selector `banner-title`; `section-head-title` and the polluted `bold` combo were removed from this element.
- `banner-title` now owns `font-weight: 700`, `line-height: 121%`, and `letter-spacing: -0.02em` in addition to its responsive font-size scale.
- Stored-state verification returned `styleNames: ["banner-title"]`.
- Live Designer DOM verification returned `font-size: 64px`, `font-weight: 700`, `line-height: 77.44px`, and `letter-spacing: -1.28px` at the current desktop breakpoint.
- `main`, `medium`, `small`, and `tiny` breakpoint token bindings were read back successfully.
- Body (`24px`), CTA label (`18px`), color roles, weight, and spacing were not changed.
- No publish was performed.

### 2026-08-24 - `sub-visual` title selector normalization

- Replaced the shared `sub-visual` H1 selector `heading-72` with the dedicated global `sub-visual-title` selector.
- Normalized the responsive scale to Desktop `80px`, Tablet `heading/01` (64), Mobile Landscape `heading/02` (54), and Mobile Portrait `heading/03` (48).
- Set the title to `font-weight: 400`, `line-height: 121%`, and `letter-spacing: -0.02em`.
- Preserved language-driven typography: Base uses `Font/Ko` (`Noto Serif KR`) and English uses `Font/En` (`EB Garamond`); both explicitly use weight `400`.
- Stored-state verification returned `styleNames: ["sub-visual-title"]`.
- Stored variant verification confirms Base `Font/Ko + 400` and English `Font/En + 400`; responsive sizing and zero nested `strong` elements remain unchanged.
- No publish was performed.

### 2026-08-24 - NCT define responsive layout spacing

- Increased only the `sub-nct-define__layout` flex gap while preserving its direction, wrapping, grid metadata, and child structure.
- Responsive gap hierarchy: Desktop `32px`, Tablet `28px`, Mobile Landscape `24px`, Mobile Portrait `20px`.
- Applied matching `grid-column-gap` and `grid-row-gap` values at each breakpoint so the spacing remains deterministic if the layout display mode changes later.
- No publish was performed.

### 2026-08-24 - Banner CTA terminal punctuation

- Audited all 24 `banner` component instances and preserved the About Us title as requested.
- Added a missing terminal period only to the five affected titles: Kiteworks, Litera, Legal System, 기업용 AI 도입, and 국가핵심기술(NCT).
- Existing titles already ending in a period were left unchanged to avoid duplicate punctuation.
- No publish was performed.

### 2026-08-24 - Banner copy residue cleanup

- Removed the IAM-specific default value from the shared `banner` description prop; explicit page-specific description overrides were preserved.
- Trimmed the trailing space from the INDA FullDiscovery banner button label to `전문가 자문 받기`.
- Final title audit: About Us intentionally remains `The eDiscovery Standard` without punctuation; every other page-level banner title ends with a single period.
- No publish was performed.

### 2026-08-24 - NCT text color hierarchy normalization

- Measured the rendered NCT page and found dark-surface section bodies matching title white, a light-surface body matching its title navy, and the process-panel title rendering dimmer than its body.
- Normalized shared `section-title` Base hierarchy with existing variables: title=`color/text/title`, body=`color/text/desc`, eyebrow=`color/text/body`.
- Normalized the NCT light/invert `section-title` variant with existing variables: title=`color/text/title-invert`, body=`color/text/desc-invert`, eyebrow=`color/text/body-invert`.
- Normalized the `intro-title` KO White variant body to `color/text/desc` and eyebrow to `color/text/body`; title color, font family, weight, and typography scale were preserved.
- Updated the NCT process-panel heading from `section-content-title` to `section-content-title text-title`, and bound `u-on-dark-body` to `color/text/desc` instead of a hardcoded rgba value.
- No publish was performed.

### 2026-08-24 - About video hero title migration

- Confirmed `sub-visual-media-about` and `sub-visual-media-about-mobile` are media-only desktop/mobile native video components; the shared title is a page-level heading outside both media components.
- Replaced the About hero title legacy class stack `heading-92 fm-en section-display` with `sub-visual-title is-sub-visual-en`.
- `sub-visual-title` now owns the same responsive 80/64/54/48 scale, 121% line-height, title color variable, and weight 400 used by the shared `sub-visual` component.
- Added the collision-free combo modifier `is-sub-visual-en`, bound to the same `Font/En` variable used by the `sub-visual` EN variant; the existing contaminated `fm-en` combo paths were not reused.
- Video components, assets, visibility behavior, title text, and surrounding structure were preserved.
- No publish was performed.

### 2026-08-24 - `sub-visual` inline-bold cleanup

- Audited all 24 rendered `sub-visual` title instances in the Designer and found five nested `<strong>` contaminations: Newsroom, Contact, ESG Management, NCT, and hidden Litera text title.
- Re-saved each affected `titleText` prop individually as identical plain text; all other props, variants, assets, and visibility values were preserved.
- Post-mutation live DOM verification passed for all five: `strongCount: 0`, computed `font-weight: 400`, unchanged title text, and unchanged visible/hidden state.
- The remaining 19 `sub-visual` titles were already clean and were not modified.
- No publish was performed.
### 2026-08-24 - shared title inline-bold cleanup

- Audited 91 `h2.heading-64` / `h2.heading-54` elements across 24 major pages.
- Removed nested `<strong>` formatting from 6 `intro-title` instances by re-saving the existing `title` prop as plain text: Reveal, TypingDNA, ESG Management, Kiteworks, Legal System, and Litera.
- Preserved each title's text, line breaks, component variant, color utilities, and responsive typography. The intended `intro-title` weight remains `400`.
- Removed redundant nested `<strong>` formatting from 13 `section-title` instances: Legal System (2), INDA FullDiscovery (1), and Docusign (10).
- Preserved the intended `section-title` hierarchy and `700` weight; only inline formatting markup was normalized.
- No site publish was performed.
### 2026-08-24 - product tabs shared container migration

- Updated the Docusign product tabs section to use the shared `no-container` width wrapper.
- Added `DivBlock.no-container` immediately outside the existing `product-tabs__container` element.
- Moved the existing tab root into the shared wrapper without changing `product-tabs__container`, `product-tabs__container-scope`, `product-tabs__container-layout`, `role="tablist"`, children, or interactions.
- Avoided replacing the original base class because its scope/layout classes are dependent combo selectors.
- No site publish was performed.

## Data Analytics color hierarchy migration - Active Learning module

- Page: `Data Analytics` (`6a5317bbd02345c985f5d43b`)
- Scope: page-level `sub-data-analytics-tar__learning` module only; component instances were excluded.
- Main title: retained `section-normal-title` typography and added `text-title`.
- Upper body: retained `section-content-body` typography and added `text-body`.
- First light-card body: corrected `text-title-invert` to `text-body-invert`; card headings remain `text-title-invert`.
- Supporting subtitle remains on `section-content-title`. Applying `text-subtitle` is blocked because the stored element class and the site's contaminated combo selector chain do not agree; the global selector was not changed to avoid cross-page regressions.
- No typography values, DOM structure, component definitions, variables, or published site state were changed.

## Data Analytics color hierarchy migration - Advanced Analytics module

- Page: `Data Analytics` (`6a5317bbd02345c985f5d43b`)
- Scope: page-level `da-tar` / Advanced Analytics content only; the `section-title` component instance was excluded.
- Existing Conceptual Analytics, Clustering, Search description, and Structured Analytics text utilities were retained where already correct.
- Four Search list headings now use `section-micro-title text-title-invert`.
- Four Search list descriptions now use `section-micro-body text-body-invert`.
- Correction: the four Search list cards use a dark brand surface. Their headings use `section-micro-title text-title`, and descriptions use `section-micro-body text-body`; the earlier invert mapping was removed.
- Only color utility mappings were added; typography values, content, DOM structure, components, variables, and publish state were not changed.

## Data Analytics color hierarchy migration - Insights and final audit

- Insights CMS card overlay heading now uses `sub-gallery__headline text-title`.
- Insights CMS card overlay summary now uses `sub-gallery__summary text-body`.
- Minimal combo paths were created for those two existing structural selectors; their original layout and typography properties were not changed.
- The Active Learning supporting line was normalized from contaminated `section-content-title` to `section-content-sub-title text-subtitle`.
- Final page-level Heading/Paragraph audit found no remaining color-utility omissions outside component instances.
- Paragraph elements used as short diagram labels retain `text-title-invert` because their semantic content is a label/title rather than body copy.
- Components, CMS content, DOM structure, variable values, and publish state were not changed.

## eDiscovery compact process layout prototype

- Page: `eDiscovery 란?` (`6a531cf45392c9be635e08bc`).
- Existing `How eDiscovery Works` block (`946b193e-31aa-b5e7-1a99-828228bff279`) was preserved unchanged.
- Added a comparison-only section immediately after it: `sub-ediscovery-process-alt` (`e85fe0b6-9538-cf1e-8bf6-2ad1ad76bc40`).
- The alternative presents four ordered rows with `number | title and description | compact 16:9 static media placeholder`, separated by bottom borders.
- Responsive layout is 3 columns on desktop, a reduced media column on tablet, and reading-order stacking on mobile. No autoplay video or play/pause control is included.
- Stored-state read-back confirmed the section root, four list rows, four text bodies, and four accessible media placeholders.
- Completion gate is not fully passed: the current site stores several typography/color/weight utilities only as contaminated combo paths, so requested new combinations were rejected and some new text nodes retain only their base size class. Element snapshot also returned `status:false`, so rendered visual verification is pending.
- No existing section, component, CMS content, asset, or publish state was changed.
## eDiscovery compact process layout final

- Page: `6a531cf45392c9be635e08bc`
- Final section: `6efd0350-c51b-c8d0-1c9f-123ed8279916` (`sub-ediscovery-process-final`)
- Original process section remains unchanged.
- Temporary prototype roots `e85fe0b6-9538-cf1e-8bf6-2ad1ad76bc40` and `e20dc026-7ca2-e355-6037-f0a8f298435d` are absent.
- Row titles use only `section-content-title`; row descriptions use only `section-content-body`.
- Existing four source videos and original Korean/English copy are reused. Video controls are omitted.
- Responsive layout read-back:
  - Desktop: `64px / flexible text / 320px`, gap `32px`, number `64px`.
  - Tablet: `56px / flexible text / 220px`, gap `24px`, number `56px`.
  - Mobile landscape: two-column text flow with media below, number `48px`.
  - Mobile portrait: `36px / flexible text`, full-width media below, number `48px`.
- Computed typography inherits the shared content roles at every breakpoint; no `section-micro-*` class remains on the final row copy.
- Not published.
## case-card component responsive migration

- Component: `case-card` (`f86a942e-5c0a-cd72-b413-8b437a9cf99c`), 14 instances, variants `Base / Light / White / Brand`.
- Typography nodes:
  - H4 uses only `section-micro-title`.
  - P uses only `section-micro-body`.
  - Removed `Heading 100` and `Paragraph 27` legacy selectors.
- Color responsibility:
  - Title inherits the variant root color variable.
  - Description is wrapped by `case-card__desc-wrap`; this component-owned wrapper stores the variant color variable and `0.68` body hierarchy opacity.
  - No `text-title`, `text-body`, or inverse text utility is attached to component text nodes.
- Responsive root:
  - Desktop: row, `24px 28px` padding, `32px` gap, `88px` icon.
  - Tablet: row, `20px 24px` padding, `24px` gap, `88px` icon.
  - Mobile landscape: column/icon-first, `20px` padding, `20px` gap, `72px` icon.
  - Mobile portrait: column/icon-first, `16px` padding, `16px` gap, `64px` icon.
- White variant gap overrides are explicitly synchronized across all breakpoints.
- Verified on the actual eDiscovery page at the 393px Designer breakpoint: column layout, icon above text, `16px` gap/padding, correct title/body color hierarchy.
- Not published.
## Typography global migration audit - in progress

- MCP 2.0 audit found selector and variable-mode pollution beyond simple combo classes.
- `section-micro-title` is normalized and verified on the eDiscovery page: `26 / 24 / 22 / 20px`, line-height `141%`.
- `section-micro-body` currently verifies as `17 / 16 / 18 / 17px`; target is `17 / 16 / 15 / 14px`, line-height `161.8%`.
- Root cause: duplicated selectors (`section-micro-body`, copies, numbered copies, legacy combos) plus Typography variable modes mapped to the wrong breakpoint. Style Manager reports 17 matching selector/use rows and 146 other-page usages.
- No remaining typography roles are marked complete until variable-mode mappings and duplicate selector paths are normalized, then all target roles are read back at four breakpoints.
- No publish performed.

## K-Discovery qualification layout V3

- Page: `K-Discovery` (`6a531cf5199ab832e2a92655`).
- Added the comparison-only section `sub-kdisc-qualification-v3` (`778e9ff9-ff9d-7936-e361-12697ebffb7c`) below the existing qualification section.
- Preserved the original title and all three description lines verbatim; no label, metadata, or supporting copy was added.
- Desktop uses a left-aligned text-first grid with a restrained non-text certification/check graphic. Tablet and mobile rules reduce spacing and stack the graphic above the text without changing reading content.
- The failed V2 comparison section (`62a9ed55-da07-82f8-acd0-53f55244dff6`) was removed.
- Stored-state selection read-back passed. The Designer element snapshot request timed out, so final rendered visual verification remains pending and the section is not marked visually complete.
- No publish was performed.
## Release Notes `All content` filter

- Page: `Release Notes` (`6a48b6c27b53afca3f2c8f38`).
- Added `All content` as the first option in the `Content Type` group.
- Element: `3a0a9da4-a951-cba1-4d19-252700f4b4f9`, native `button`, class `sub-release-board__filter-option`, attribute `data-release-category-all`, initial `aria-pressed="true"`.
- Registered `Release Notes All Content Filter` (`release_notes_all_content_filter`, version `1.0.0`) and applied it to the site footer. The script exits immediately unless `[data-release-board]` exists, so behavior is isolated to Release Notes.
- Clicking `All content` clears only active `data-release-category` filters through the existing `ID UI Controller`; search, Solution, and sort state are preserved.
- The active state stays synchronized after category changes and the global Reset action.
- Stored element state and applied script version passed MCP read-back.
- Visual verification remains pending: Webflow element snapshot returned `status:false`, and the local in-app browser runtime failed to initialize. Do not describe rendered-state verification as complete until one of those surfaces succeeds.
- No publish was performed.

### Duplicate residue cleanup

- Removed the unstyled duplicate `All content` Link (`9bf94ebc-d9e9-d348-930f-88b724479cd2`) left by the initial builder validation failure.
- Post-cleanup read-back confirms the duplicate ID is absent.
- The `Content Type` wrapper now contains exactly one `All content` button followed by `New Feature`, `Update`, and `Bug Fix`.
- The retained button is `3a0a9da4-a951-cba1-4d19-252700f4b4f9` with only `sub-release-board__filter-option` plus the intended data and ARIA attributes.
- No publish was performed.

## Release Notes filtered pagination

- Page: `Release Notes` (`6a48b6c27b53afca3f2c8f38`).
- Added pagination root `ff18d906-6d34-7617-3408-3456db6b8de0` after the existing results and empty-state area.
- Reused only the existing global pagination classes: `cms-pagination`, `cms-pagination__arrow`, `cms-pagination__numbers`, with runtime-created `cms-pagination__number` and `cms-pagination__dot` nodes.
- Added accessible previous/next labels, `aria-current` for the active page, and disabled-state `aria-disabled` / keyboard removal at the range boundaries.
- Registered and applied `Release Notes Filter Pagination` (`release_notes_filter_pagination`, version `1.0.0`) after the existing UI and All Content scripts.

### Release Notes attachment visibility and download UI

- Release Notes list page `6a48b6c27b53afca3f2c8f38` groups the clip and date inside `sub-release-board__row-meta-end` (`2e91582d-f446-02fb-dcc2-b51ade1193cd`). This right-side group uses flex, center alignment, `space-between`, responsive minimum width, and `margin-left: auto`; the left solution/category metadata and original row arrow remain independent. The clip is a low-emphasis 18px indicator across desktop/tablet/mobile. Responsive attachment normalization remains in hook `2b08a76a-cae9-bf20-cae6-b90a63595b56`. The filename span `0bf422fb-89e1-cb3d-84cc-ad924c19eeac` remains hidden while attachment detection and accessible filename metadata are preserved.
- User-created `Div Block 189` (`e27fbb15-d12e-ec6d-f7fa-5247ad87ba91`) was migrated to `sub-release-board__row-content` (`1649046e-0bd3-4aa9-5a63-e347abe5a555`). The new wrapper contains only `sub-release-board__row-main` and `sub-release-board__row-arrow` and uses responsive flex, full width, center alignment, and `space-between`. Read-back confirmed the legacy block no longer exists.
- User-created `Div Block 188` (`4f9b9303-59f3-6f12-04e0-d5a171d1176b`) was migrated to `sub-release-board__row-layout` (`52422703-a799-fe9c-4fb9-428dc13cd12b`). It contains `sub-release-board__row-meta` and `sub-release-board__row-content`, uses full-width column flex, and applies responsive gaps of 20px / 18px / 16px / 14px from main through tiny. Read-back confirmed the legacy block no longer exists.
- The list enhancement embed is `5abd722e-ac09-fed5-0a10-0a5edccd0244`; its scoped responsive style embed is `5fc8ee74-e320-f886-6a09-0273b77acf16`.
- Direct CMS attribute binding writes were unavailable through the current MCP permission surface. The isolated list embed therefore reads each row's existing same-origin detail URL, confirms `.sub-release-detail__attachment a[href]`, and reveals the indicator only when a real attachment exists. This avoids false attachment badges and leaves filtering, pagination, and row navigation unchanged.
- Release Notes detail template `6a51b6b07ac4cedebadca69b` keeps its native `Attachment` file binding on link `eaa29298-b8cc-e054-4a40-e5ba32749261`. Read-back confirmed collection `6a51b6af7ac4cedebadca695`, field `7fce940d4e2f7c8577d87bc4f0a2d237`.
- Detail enhancement embed `f62afcb1-5dc1-b31d-3d16-734d696fb346` exposes the cleaned filename, preserves the direct file URL, adds the download filename/accessible label, and scopes the refreshed download-card styling to `.sub-release-detail__attachment`.
- Designer DOM read-back confirmed all three new elements and the original CMS file binding. Element snapshot/browser runtime verification was unavailable due a local browser runtime error, so interactive click verification remains required in Designer Preview after publishing.
- No publish was performed.
- Client-side page size is 8. Pagination is hidden automatically when the filtered result count is 8 or fewer.
- Search, Solution, Content Type, Reset, and sort changes reset only the page index to 1; their active filter state remains managed by `ID UI Controller` and is preserved during pagination navigation.
- Pagination uses the filtered and sorted DOM order, so it does not enable native CMS pagination or restrict filtering to one server page.
- Stored DOM structure, exact style names, script source, version, and site-footer application passed MCP read-back.
- Visual verification remains pending because Webflow element snapshot returned `status:false`.
- No publish was performed.

### Invert color and interaction verification

- Registered and applied `release_notes_filter_pagination` version `1.0.1`.
- Pagination numbers and arrows now use the existing CSS variable `--color--text--title-invert`; the global light-surface `cms-pagination` styles were not changed.
- Boundary arrows retain the invert color and use opacity `0.35`, `aria-disabled`, and `tabindex=-1` when unavailable.
- Chromium interaction verification passed with the registered `1.0.1` source and a matching Release Notes DOM:
  - Initial page: items 1-8 visible, page 1 active.
  - Clicking page 2: items 9-14 visible, page 2 active.
  - Clicking a filter from page 2: filtered items remain selected, page resets to 1, and pagination hides when results fit on one page.
  - Both page-number and arrow runtime colors resolved from `var(--color--text--title-invert)`.
- The Codex in-app browser bridge still fails to initialize because its local kernel-assets path is missing, so the interaction verification used bundled headless Chromium rather than the live Designer canvas.
- No publish was performed.

### Pagination control surface contrast correction

- Corrected the previous text-only contrast treatment by registering and applying `release_notes_filter_pagination` version `1.0.2`.
- Page-number and previous/next controls now use `--color--base--white` for their background and `--color--brand--primary` for numbers/arrows.
- The active page uses full opacity, inactive page numbers use `0.65`, and unavailable boundary arrows use `0.35` while retaining their white control surface.
- Global `cms-pagination` styles remain unchanged; this treatment is isolated to the Release Notes runtime instance.
- Bundled Chromium verification passed against the registered `1.0.2` hosted script: 1-8 → page 2 shows 9-14 → filter selection preserves its active state, resets to page 1, and hides pagination for three results.
- Runtime style inspection confirmed both numbers and arrows receive the white-background and brand-foreground variables.
- No publish was performed.

### Monochrome circular pagination refinement

- Replaced the all-white inline treatment with separated behavior and theme layers.
- `release_notes_filter_pagination` is now version `1.0.3`; it owns pagination/filter behavior only and no longer writes colors or backgrounds inline.
- Added `Release Notes Pagination Monochrome Theme` (`release_notes_pagination_monochrome_theme`, version `1.0.0`), scoped by `[data-release-pagination]`.
- Desktop/tablet controls are true `44px × 44px` circles; mobile portrait controls are `40px × 40px` circles.
- Default numbers/arrows use a 10% white surface, white foreground, and an 18% white border.
- The current page uses a white surface, black foreground, white border, and restrained black shadow.
- Hover uses an 18% white surface and a 1px upward translation; unavailable arrows use `0.3` opacity and no pointer events.
- The legacy pagination dot is hidden in this circular variant.
- Hosted-script Chromium verification passed: computed active state `44px / 44px / 50% / white background / black text`, inactive state `44px / 44px / 50% / 10% white background / white text`, and page 1 → page 2 changed visible items from 1-8 to 9-14.
- Existing global `cms-pagination*` classes and other pages remain unchanged.
- No publish was performed.

## Shared sub-nav container normalization (2026-08-27)

- Shared `sub-nav` component `56e6d2de-a523-db49-3246-0756fda56119` now uses plain Block `930179bc-bbef-6b83-7c45-da082117cdc0` with exact styles `no-container sub-nav-swiper`.
- The existing `sub-nav-inner sub-nav-swiper__wrapper` subtree and all navigation links were moved without content changes.
- Legacy BlockContainer `56e6d2de-a523-db49-3246-0756fda5611a` and its `product-tabs__container*` selector combination were removed.
- MCP read-back confirmed the new wrapper once and the legacy wrapper zero times. A Release Notes component-instance snapshot confirmed the rendered navigation remains visible and centered within the standardized width.
- This is a shared component change, so all existing `sub-nav` instances inherit the normalized container. No production publish was performed.

## Release Notes mobile filter UI audit (2026-08-27)

- Audited the deployed mobile filter behavior and current Designer DOM for the Release Notes page.
- The existing transition remains unchanged: the overlay uses a short `300ms` fade and the panel uses a `320ms` scale/fade easing. The controller also handles `prefers-reduced-motion`, Escape close, backdrop close, body scroll lock, focus transfer to the close button, and focus return to the trigger.
- Updated global selector `sub-release-board__filter-close` at the `small` breakpoint from `40px` to `44px` for both width and height. `tiny` inherits the same value without a duplicate override.
- Element read-back confirmed exact role classes and accessibility wiring: trigger `sub-release-board__mobile-filter-button`, panel `sub-release-board__filters`, and close control `ui-modal-close sub-release-board__filter-close`; `aria-controls` matches panel id `release-mobile-filters`.
- No new selector was created. The two close-button classes are intentional: shared modal-close behavior plus the Release Notes scoped visual override. No selector removal was necessary.
- The style update response confirmed the stored `small` values. A separate targeted style-search read is unavailable on the current connector permission surface, so no production publish was performed.

## Release Notes mobile filter vertical alignment (2026-08-27)

- Root cause: the compact, collapsed filter form used `align-self: center` inside a `100dvh` overlay, creating a large inactive-looking area beneath the card.
- Updated global `sub-release-board__filter-form` at `small` to `align-self: flex-start` and `transform-origin: 50% 0%`.
- `tiny` inherits the `small` values; no duplicate selector or breakpoint override was added.
- Existing overlay dimensions, safe-area-aware maximum height, internal scrolling, filter behavior, and `300-320ms` reduced-motion-aware transitions remain unchanged.
- MCP style response confirmed the stored values and an element snapshot confirmed the filter content now begins at the top without the previous centered-card gap. No production publish was performed.

## Release Notes mobile filter header alignment (2026-08-27)

- Root cause: `Filters`, `Reset`, and the close control were distributed by a flex `space-between` row, making `Reset` appear detached in the middle.
- Updated global `sub-release-board__filters-head` at `small` to `display: grid`, `grid-template-columns: 1fr auto auto`, `column-gap: 12px`, and centered cross-axis alignment.
- The title remains left-aligned while `Reset` and the close control form a compact right-side action area. `tiny` inherits the same layout without a duplicate override.
- No wrapper or selector was added, and desktop behavior remains inherited from the existing base flex layout. No production publish was performed.

## Shared board detail back button migration (2026-08-27)

- Added `board-back` variant `7baae161-5727-0cd5-f290-6d6d26fc8ec7` to master `button` component `665c98a3-189c-44a3-bc1d-420ae20e224c` by duplicating the existing token-based `outline-white` variant.
- Main: `56px` minimum height, `24px` horizontal padding, `18px` text, leading icon with `12px` gap. Small: `52px` minimum height, `20px` horizontal padding, `16px` text. Tiny inherits small without another override.
- Existing outline-white hover behavior is preserved: white surface and inverse text, with no transform lift. The default arrow asset is rotated for the back direction.
- Removed `section-content-body--legacy-18` from shared `button-inner`; replaced automatic `Text Block 6` with canonical global `button-label`. Final component classes read back as `button > button-inner > button-label + button-icon`.
- Release Notes Template instance `c97d513d-4db1-05c9-3cf1-e59edd0168ab` now uses `board-back`, label `목록으로 돌아가기`, link `/release-notes`, and `showIcon: true`.
- Newsroom and Insights templates currently contain no back-to-list control, so no new action was inserted. Future back actions must reuse `board-back`.
- Added representative `board-back` instance `df15e488-4e75-96b9-7427-60f5d2dc2910` to the draft Components page shared UI area and verified its props.
- MCP read-back confirmed component classes, variant main/small/hover styles, and both instance prop sets. A Designer snapshot confirmed the Release Notes button renders as an outlined pill with a leading back arrow. No production publish was performed.

## Release detail button contrast correction (2026-08-27)

- Corrected `board-back` icon layout from `row-reverse` to `row` while retaining icon `order: -1`, so the left-pointing arrow now appears before the label.
- Added `mix-blend-mode: difference` to the `board-back` icon. The white source asset remains visible on the dark default surface and becomes dark against the white hover surface without a second asset or a page-specific hover selector.
- Updated existing global `sub-release-detail__attachment-label` to use `color/base/white`, inherited button font size, and `1.4` line height. Its existing `600` weight remains unchanged.
- No new selector was created. The attempted canonical class replacement was rejected because the template page did not resolve the newly created styles; the element therefore safely retained its single scoped class and only that existing selector's values were updated.
- Variant read-back confirmed `row`, `order: -1`, `rotate(180deg)`, and difference blending. Element read-back confirmed the PDF label's exact class. Designer snapshots confirmed the back arrow is leading and the PDF label is visibly white. No production publish was performed.

## Banner language and invert variants (2026-08-27)

- Added `en` (`eaa38fbe-596c-f4f1-a7ac-4f522952d01e`) and `ko` (`32ecc78c-b5ba-6d6b-7e47-59bae9d14e63`) to banner component `dd757598-1c8a-df83-fe4e-f8deec6f96f6` by duplicating the existing dark base.
- Added `en-invert` (`de9a1736-2856-e0e3-410a-eb9b9887a8ae`) and `ko-invert` (`8d9c1c12-e8a3-9c10-c70e-5c9233993368`) by duplicating the existing light variant.
- Root font-family values resolved through existing variables: `en` to `variable-ad9aed0c-874f-af62-a7ff-0c57090bb8e1` and `ko` to `variable-594caf2b-9394-0f5f-2379-2c30cab5c727`.
- Invert variants use `Color/Base/White` for the surface, `color/text/title-invert` for title/root color, and `color/text/body-invert` for the description. No hard-coded font or color value was introduced.
- Added four representative banner instances to the draft Components page shared UI area and set each corresponding variant with language-specific sample text.
- MCP read-back confirmed the six-variant list, all font/color variable bindings, and all four catalog prop sets. Designer snapshots confirmed the normal English dark state and the Korean white-surface invert state. No production publish was performed.

## Sub-visual sentence punctuation normalization (2026-08-27)

- Audited all current shared `sub-visual` description props and limited punctuation changes to complete sentence-form copy; noun-form product taglines remain unchanged.
- Insights CMS Template description now reads `전문가가 분석한 최신 업계 동향과 인사이트를 확인하세요.`
- Newsroom CMS Template description now reads `Intellectual Data의 주요 소식과 보도자료를 확인하세요.`
- No component structure, styles, variants, visibility settings, or other prop values were changed.
- MCP prop read-back and Designer snapshots confirmed both final rendered values. No production publish was performed.

## Insights optional author display (2026-08-27)

- Audited all 78 Insights CMS items: every existing item uses `인텔렉추얼데이터` in the optional Author field and no item had an empty author value.
- Added optional Switch field `Show Author` (`show-author`, field ID `b6a13cb7d562003be1160810b37b12d9`) with help text for external-contributor use.
- Placed `Show Author` immediately after Author in the existing `콘텐츠` collection field group.
- Bound the featured-card author (`a1446c28-f183-8eaa-a6e9-82064ab3822d`) and separator (`ab3e1857-2178-1abd-14a2-0e0e4d616982`) visibility to `Show Author`.
- Bound the archive-card author (`d40832a1-da33-8b70-7815-65396c5803c1`) and separator (`d40832a1-da33-8b70-7815-65396c5803c2`) visibility to the same field.
- Featured and archive date elements remain statically visible. Existing Author values were preserved; no bulk CMS content rewrite was performed.
- Designer snapshot confirmed current internal posts render with date only and no dangling separator in both featured and archive layouts. Future external-author posts display author metadata by entering Author and enabling `Show Author`.
- No custom code, new selector, component change, or production publish was performed.
## Insights external author test item (2026-08-27)

- Updated one Featured Insights CMS item for optional-author display testing.
- Item ID: `6a605a01bc0e3a4218fd7cc6`
- Item title: `AI와의 대화, 미국 법원에서 eDiscovery 증거가 될까? Heppner, Warner 사건 판례`
- `author`: `외부 필진 테스트`
- `show-author`: `true`
- CMS read-back confirmed both staged values and preserved the existing published timestamp.
- No site or CMS publish was performed; the change remains staged in Webflow.
- Designer selection read-back succeeded, but element snapshots for the dynamic Featured Collection Item and its footer returned an empty Webflow response. Visual rendering remains unverified and must not be reported as complete until a Designer DOM snapshot succeeds.
## Insights page typography and color migration (2026-08-27)

- Scope: static `Insights` page `6a531d42d02345c985f7df52`; reusable component instances were excluded.
- Language selectors were intentionally not added or changed because language handling already exists separately.
- Dark Featured region migrated to `section-head-*`, `section-content-*`, and `section-micro-*` typography with `text-title`, `text-body`, and `text-desc` colors.
- Light All Posts region migrated to the corresponding `*-invert` color utilities.
- Featured card title uses `section-content-title + text-title`, preserving the former 30px hierarchy with the nearest canonical 28px tier. Weight remains 700 from the current canonical base selector because the missing three-class combo could not be selected by name.
- Archive card body and metadata were migrated to `section-micro-body regular text-body-invert` and `section-micro-eyebrow medium text-desc-invert`.
- `ins-badge` remains as its dedicated pill selector so its padding, radius, background, and existing variable-bound color are preserved.
- Residual: archive card title element `d40832a1-da33-8b70-7815-65396c5803be` still uses `sub-insights__card-title + section-micro-title--legacy-02`. The canonical `section-micro-title` name has duplicate/ambiguous definitions and MCP rejected both `section-micro-title + bold` and the standalone name. It was not forced to `section-content-title` because that would increase the title from 24px to 28px and alter the existing card hierarchy.
- Read-back confirmed every successful target's exact final `styleNames`; a full Designer section snapshot confirmed dark/light contrast and layout remained visually stable.
- No publish was performed.

## Newsroom page typography and color migration (2026-08-27)

- Scope: static text elements on the Newsroom page (`6a531d435392c9be635e4a8a`). Shared components were excluded.
- Existing language handling was preserved; no `lang-*` class was added or changed.
- Top introduction: `section-head-title bold text-title`, `section-head-body regular text-body`.
- Featured area: `section-content-title text-title`, card title `section-micro-title text-title`, body `section-micro-body regular text-body`.
- General list area: `section-content-title text-title-invert`, body `section-micro-body regular text-body-invert`.
- Metadata wrappers retain only `sub-news-list__meta`; metadata text uses `section-micro-eyebrow medium` with `text-desc` or `text-desc-invert` according to its surface.
- Removed target-element legacy selectors including `news-title`, `news-summary`, `Heading 93`, `Paragraph 22`, and `section-micro-body--legacy-*`.
- Webflow Data API read-back confirmed the exact final `styleNames` on all 13 migrated elements.
- Designer visual snapshot remains unverified because the Webflow Designer MCP app was disconnected at verification time.
- Publish was not performed.

## Careers page typography migration audit (2026-08-27)

- Page: Careers (`6a531d43f6d47994d2a339ae`, `/board/Careers`).
- Component instances were excluded from page-level edits: header, sub-visual media, CTA button, breadcrumb, sub-nav, intro-title, section-title, icon-card, slider-arrow, banner, and footer.
- Surface audit: Hero, employee voice, and jobs areas are dark; the application modal uses the light `ui-modal-surface` panel.
- Safely migrated the three CMS job metadata paragraphs from `section-micro-body Copy Copy` to `section-micro-body regular text-body-invert`.
- Hero body was read back unchanged as `section-head-body regular text-body-invert`.
- A clean multi-utility pilot (`section-micro-title semibold text-title-invert`) was rejected because Webflow requires an existing exact combo selector path. The pilot job title was restored to `section-icro-title` immediately and read back successfully.
- Remaining page-level legacy targets are not marked complete: `section-icro-title`, `sub-careers-voice__mark Copy`, `section-micro-title--legacy-11`, `section-content-body--legacy-07`, and modal text selectors.
- `data_style_tool get_styles` confirmed clean global selectors exist, but style creation/write access is unavailable in the current MCP tool schema; required empty combo paths could not be created safely.
- Designer snapshot confirmed no visible regression in the jobs section after the safe partial cleanup.
- No component variants, CMS bindings/content, layout structure, or publish state were changed.
## Careers static typography cleanup (2026-08-27)

- Page: Careers (`6a531d43f6d47994d2a339ae`).
- Shared component instances and component variants were excluded from this page-level migration.
- Migrated the misspelled `section-icro-title` job title to the current role-based title utility.
- Normalized `sub-careers-voice__mark Copy` to `sub-careers-voice__mark`.
- Removed `section-micro-title--legacy-11` and `section-content-body--legacy-07` from the employee voice copy.
- Replaced application modal typography-only selectors with existing role utilities:
  - modal title: `section-content-title text-title`
  - questions: `section-micro-title text-title`
  - emphasized answers and labels: `section-micro-body text-title`
  - normal answers: `section-content-body regular text-body`
  - list items: `section-micro-body regular text-body`
- MCP read-back found all 28 target elements and confirmed no target retains `section-icro-title`, `Copy`, `legacy`, `sub-careers-modal__*`, `sub-careers-voice__name`, or `sub-careers-voice__role` typography classes.
- Designer snapshot confirmed the employee name renders with sufficient light-on-dark contrast. The job-title snapshot endpoint returned an empty error response, so its visual snapshot remains unverified even though its stored class read-back passed.
- No component, CMS, layout, or publish changes were made.
## About Us micro-title typo cleanup (2026-08-27)

- Page: About Us (`6a531d3f86942d09a5323036`).
- Audited the full static page tree and found 13 headings using the misspelled `section-icro-title` selector.
- Replaced all 13 exact class lists with `section-micro-title text-title`.
- The page's dark variable mode resolves `text-title` to the intended light title color; representative snapshots across five card groups confirmed sufficient light-on-dark contrast and preserved micro-title hierarchy.
- MCP read-back found all 13 target elements and confirmed every target has the exact final `styleNames` list with no `section-icro-title` remaining.
- Existing component instances, variants, body typography, layout wrappers, CMS content, and page structure were not changed.
- No publish was performed.
## About Us typography and color hierarchy migration (2026-08-27)

- Page: About Us (`6a531d3f86942d09a5323036`).
- Audited 54 static heading/paragraph elements and preserved dedicated gallery interaction typography and the `sub-visual-title` display title.
- Updated 34 elements in this pass:
  - content titles: `section-content-title text-title`
  - content descriptions: `section-content-body regular text-body`
  - value-card descriptions: `section-micro-body regular text-body`
  - standard-card numbers and supporting subtitles: `section-micro-title text-title`
  - hero eyebrow: `section-micro-body regular text-body`
  - hero description: `section-content-body regular text-body`
- The 13 About micro titles migrated earlier remain exactly `section-micro-title text-title`.
- Dark page variable mode resolves title tokens to the highest light tone and body tokens to the lower-emphasis light tone. Representative snapshots confirmed the intended hierarchy across hero, Mission, Values, history, case support, and standards sections.
- `Heading 91 section-lead-title` remains on one lead heading. `section-lead-title` exists only as that combo selector, and no standalone `section-lead-title` or `heading-48` selector is available; removal attempts were rejected by Webflow without changing the element. It was preserved to avoid a visual regression until the selector layer is normalized deliberately.
- Existing components, variants, CMS content, layout wrappers, and interaction-specific gallery classes were not changed.
- No publish was performed.

## Shared component display-title scale migration (2026-08-28)

- Site: `intellectualdata` (`6a38f39fe95d43bbdbe5c71c`).
- Updated the shared title hierarchy without changing the global semantic `section-head-title` variable:
  - `sub-visual`: 72 / 64 / 54 / 44, regular 400.
  - `intro-title`: 64 / 56 / 48 / 40, regular 400.
  - `section-title`: 48 / 42 / 36 / 32, bold 700.
- Created Typography variables:
  - `type/component/sub-visual/title/font-size` (`variable-51e4f81e-040b-89a2-6e8a-c10317176269`).
  - `type/component/intro-title/title/font-size` (`variable-0ed1195c-a6bc-8e75-a083-f78bc3737559`).
  - `type/component/section-title/title/font-size` (`variable-80d71ea1-90ea-16fa-6214-135849c68d7f`).
- Bound `sub-visual-title` and `intro-title__title-text` to their scoped variables.
- Added `section-title__title-text` as the approved component-only size combo after `section-head-title + bold`.
- Applied the Typography collection's automatic Tablet, Mobile Landscape, and Mobile Portrait modes at `medium`, `small`, and `tiny`.
- Removed the old explicit `sub-visual-title` breakpoint font-size overrides, including the previous 52px Mobile Landscape value.
- Read-back confirmed:
  - all three Base variable bindings;
  - all three responsive mode mappings;
  - `section-title` title class order is exactly `section-head-title + bold + section-title__title-text`;
  - site rule `rules/design-system.md` is version `2026-08-28.2`.
- Audited all 12 `sub-visual-media-*` desktop/mobile components: each contains six media nodes and zero Heading, Paragraph, Text Block, or title-style nodes.
- The shared `sub-visual` component has 28 instances. All media-split variants inherit their rendered title from this parent component.
- Updated all 12 media component descriptions to document that they are media-only and must not own title typography.
- No site publish was performed.
- Verification scope: Webflow MCP stored-state and binding read-back passed. A rendered Designer Preview/snapshot was not performed in this batch.

## Enterprise AI static style migration (2026-08-28)

- Page: `기업용 AI 도입` (`6a531cf785ba94997412a151`, `/page/AI`).
- Shared component instances were excluded from the page-level migration: `edge-gradient`, `header`, `sub-visual`, `sub-nav`, `intro-title`, `section-title`, `banner`, and `footer`.
- Replaced the two documented legacy container aliases with the canonical global wrapper:
  - consulting section wrapper `4c0abfc8-f9f9-0851-e7ed-02a1c8facf1e`: `u-no-container` -> `no-container`;
  - Legal AI section wrapper `b9b58657-6254-0eb2-a311-2e44f4941ce7`: `u-no-container` -> `no-container`.
- Normalized the three consulting body paragraphs to the exact dark/light-surface-compatible class list `section-content-body regular text-body-invert`:
  - `adf2c6f3-73f8-83a1-cc29-101069802331`;
  - `a1b21879-5940-8775-ef24-ff4f952f2664`;
  - `be94b678-99c7-2ade-b191-1880f27485bf`.
- Normalized the three Legal AI item headings to `section-content-title text-title`:
  - `35244870-e74a-ab16-36b0-0c7e4a1e3b1a`;
  - `35244870-e74a-ab16-36b0-0c7e4a1e3b22`;
  - `35244870-e74a-ab16-36b0-0c7e4a1e3b2a`.
- Normalized the three Legal AI item body paragraphs to `section-micro-body regular text-body`:
  - `35244870-e74a-ab16-36b0-0c7e4a1e3b1e`;
  - `35244870-e74a-ab16-36b0-0c7e4a1e3b26`;
  - `35244870-e74a-ab16-36b0-0c7e4a1e3b2e`.
- MCP element read-back confirmed the exact final `styleNames` on all 11 changed elements with no missing or remerged class.
- Designer snapshots confirmed the consulting section remains a light surface with readable dark text and preserved alternating media layout, while the Legal AI section remains a dark surface with readable light text and preserved media layout.
- Used the live Designer style selector and rendered DOM to inspect selector usage before structural renames. Renamed only selectors with no other-page usage, preserving their existing breakpoint/style data in place:
  - `Div Block 141` -> `sub-ai-adopt-consulting__media` on `da6f4cf5-610d-505a-075b-773d362b528b`;
  - `Div Block 78` -> `sub-ai-adopt-legal__media` on `c8be8eb2-03ec-9f7f-3565-021aab919eec`;
  - `Image 239` -> `sub-ai-adopt-legal__image` on `c3d7527d-9b19-9d1f-dcaa-9f76185da240`.
- MCP read-back confirmed the three renamed elements' exact final `styleNames`. New Designer snapshots confirmed the consulting media, Legal AI media, Legal AI image, alternating layout, and dark/light contrast remain rendered correctly after rename.
- Remaining shared structural selectors were intentionally preserved because Designer usage read-back showed they affect other pages: `Div Block 142` (3 on this page, 2 on other pages), `Div Block 143` (3 on this page, 2 on other pages), `Div Block 144` (2 on this page, 1 on another page), and `Image 255` (3 on this page, 2 on other pages). Renaming them globally would exceed this page-only scope.
- `Div Block 144 Copy Copy` and `u-section-padding` remain. A direct `sub-ai-adopt-legal section-padding` pilot was rejected with `styles not found`, leaving the root unchanged as `sub-ai-adopt-legal u-section-padding`; no partial class change occurred.
- No component, component prop, content, asset, CMS data, page structure, or publish state was changed. No production publish was performed.

## NCT static typography migration (2026-08-28)

- Page: `국가핵심기술(NCT)` (`6a531cf6624189f3842b9870`, `/page/NCT`).
- Used Webflow MCP 2.0.1 Data Tools. Shared component instances were excluded, including `edge-gradient`, `header`, `sub-visual`, `sub-nav`, `intro-title`, `section-title`, `icon-card`, `banner`, and `footer`.
- Re-read every target immediately before mutation and found no concurrent class-list change.
- Normalized the page-level process-panel heading `8b6a98e5-e296-8296-a0f2-5d4a2feaa79c` from `section-content-title text-title` to the exact canonical order `section-content-title bold text-title`.
- Normalized the page-level process-panel paragraph `0fbe32ad-1c11-61c5-fccf-01c9fffd094b` from `section-content-body u-on-dark-body` to `section-content-body regular text-desc`. `u-on-dark-body` and `text-desc` resolve to the same existing color variable (`variable-98e0836a-e764-be6f-55bf-aad365bbd615`), preserving the prior foreground value while removing the context alias.
- MCP element read-back confirmed both exact final `styleNames`, original text, heading level, and visibility.
- No global selector, variable, breakpoint value, component, component prop, content, asset, CMS data, or page structure was changed.
- Structural cleanup candidates `Div Block 140` (`9b435b87-24a2-e83d-5e5c-a767fa59e421`) and `Image 237` (`0b5abb55-bdc3-9892-a973-ad8c68c4b186`) were intentionally left unchanged because rendered verification was unavailable.
- Designer element snapshot retried after stored-state verification but returned an empty Webflow response. Rendered state remains unverified, so this pass is stored-state complete but not visually complete.
- No production publish was performed.

## K-Discovery static structure migration (2026-08-28)

- Page: `K-디스커버리` (`6a531cf5199ab832e2a92655`, `/page/K_Discovery`).
- Used Webflow MCP 2.0.1 Data Tools. Shared component instances and component props were excluded.
- Re-read 14 target elements before mutation. The first bulk read encountered Webflow asset API `429` responses on image-containing targets; no failed request was treated as success. After backoff, mutations were retried in small batches.
- The planned canonical text combinations were rejected without changing the elements because the exact combo path does not exist:
  - `section-content-title bold text-title-invert` for headings;
  - `section-content-body regular text-body-invert` for lists.
- Read-back confirmed the two headings remain `section-content-title text-title-invert` and the two lists remain `section-content-body text-body-invert`. Their current global semantic selectors already own the previous visual weight, so no global selector or variable was modified to force the grammar migration.
- Replaced page-level copied and auto-generated structure selectors with K-Discovery-owned BEM selectors:
  - `Div Block 183` -> `sub-kdisc-system__inner` on `afcfa48a-bcb1-cdb8-7a83-3fbf090b2993`;
  - `sub-ai-adopt-consulting__grid` -> `sub-kdisc-service__rows` on `147ae9f3-6e95-6091-2855-54fdcc4e5dbf`;
  - both `Div Block 142` rows -> `sub-kdisc-service__row` on `147ae9f3-6e95-6091-2855-54fdcc4e5dc0` and `147ae9f3-6e95-6091-2855-54fdcc4e5dc8`;
  - both `Div Block 143` text wrappers -> `sub-kdisc-service__body` on `147ae9f3-6e95-6091-2855-54fdcc4e5dc3` and `147ae9f3-6e95-6091-2855-54fdcc4e5dcb`;
  - `Div Block 144` -> `sub-kdisc-service__row-media` on `147ae9f3-6e95-6091-2855-54fdcc4e5dc1`;
  - `Div Block 144 Copy Copy` -> `sub-kdisc-service__row-media-reverse` on `147ae9f3-6e95-6091-2855-54fdcc4e5dc9`;
  - the unclassified main-media wrapper -> `sub-kdisc-service__media-main` on `e9e21800-0d0b-862d-9b25-2aba959bad0f`;
  - `Image 253` -> `sub-kdisc-service__image` on `e3df109b-d577-c46a-5266-bdccbe1c8324`.
- New style IDs:
  - `sub-kdisc-system__inner`: `4341a81e-fc09-4a9a-d540-a09630fcf0e7`;
  - `sub-kdisc-service__rows`: `3164cdc7-a316-4a25-cd95-9bd938f965de`;
  - `sub-kdisc-service__row`: `0c7bddc5-d229-87c9-b31e-baf3646b6baa`;
  - `sub-kdisc-service__body`: `26002c97-86eb-468f-73b2-c6b997308e7c`;
  - `sub-kdisc-service__row-media`: `2e85efc7-20dc-2932-e7c0-e0d84bb66447`;
  - `sub-kdisc-service__row-media-reverse`: `0bf3ac5b-0c03-e451-13a3-660b8a7c6878`;
  - `sub-kdisc-service__media-main`: `01811ae5-742b-276e-1b39-057aa2fe4615`;
  - `sub-kdisc-service__image`: `f5549dec-4275-f8f2-061d-2c69630fffac`.
- Style read-back confirmed the copied Base and responsive values on every changed selector: rows Base/medium, row Base/small/tiny, media Base/small, reverse media Base/small/tiny, body Base, and image Base width.
- Element read-back confirmed every exact final `styleNames`, tag, visibility, and the main image asset ID `6a5a33aef112858b986a5a6c`.
- Page-scoped queries confirmed zero remaining K-Discovery elements using `Div Block 183`, `sub-ai-adopt-consulting__grid`, `Div Block 142`, `Div Block 143`, `Div Block 144`, `Div Block 144 Copy Copy`, or `Image 253`.
- Existing style definitions were not deleted. Sitewide zero-use and separate deletion approval are required before removal.
- A post-change Designer element snapshot returned an empty Webflow response. Stored-state and responsive read-back passed, but rendered visual verification remains pending.
- No component, component prop, content, CMS data, asset binding, section root, global selector, variable, or publish state was changed. No production publish was performed.

## DocuSign static typography and color migration (2026-08-28)

- Page: `DocuSign` (`6a531d0c85ba94997412b0ce`, `/page/Docusign`).
- Used Webflow MCP `2.0.1`; shared component instances and component variants were excluded from this page-level pass.
- Migrated 23 static text elements to the existing `section-*` role system and then corrected their color utilities against the rendered DocuSign surfaces:
  - dark normal banner: `section-micro-eyebrow`, `section-head-title bold text-title`, `section-head-body regular text-body`;
  - three light case cards: `section-micro-title text-title-invert`, `section-micro-body regular text-body-invert`;
  - dark quote/author and Part11 title: `section-content-title text-title`, `section-micro-body regular text-body`;
  - dark Gartner source, five values, and five labels: `section-micro-eyebrow`, `section-micro-title text-title`, `section-micro-body text-body`.
- Removed target-element legacy and typo selectors including `section-normal-title--legacy-07`, `Heading 88`, `Heading 89`, `Heading 90`, and `section-icro-title`.
- Restored the three light customer-case body paragraphs to their original `Paragraph 10 section-micro-body` path because that existing selector owns the required centered alignment. The cleaner `section-micro-body regular text-body-invert text-center` path was rejected because the exact combo selector does not exist, and this MCP workspace does not expose parent-combo creation. No global body selector or inline style was modified.
- Re-audited the shared `section-title` component (`9b4fc63d-3bda-d34d-302e-3b45259e7312`): its title is exactly `section-head-title bold section-title__title-text`, and its definition contains no `section-icro-title`. The misspelled selector and its old combo definitions still exist globally in the site style registry; they were not deleted because sitewide zero-use has not been proven.
- Preserved inline `Strong` runs inside existing content to avoid changing CMS/editorial emphasis during this outer-class migration.
- The first color mapping was visually rejected by the user-provided Designer screenshot: light-card text became white and dark quote text became black. The mapping was reversed immediately so light surfaces use the page's dark `*-invert` utilities and dark surfaces use the page's light non-invert utilities.
- MCP full-page element read-back confirmed all 23 corrected targets have their exact expected final `styleNames`; no target failed or remerged an old selector.
- Automated Designer render verification remains unavailable. Element snapshots returned empty responses and browser control failed to initialize because its local runtime asset path was unavailable. The supplied Designer screenshot was used as direct visual evidence for the correction, but a fresh post-correction Designer screenshot is still required for full visual completion.
- No global style declaration, variable, breakpoint value, component, content, CMS data, layout structure, or publish state was changed. No production publish was performed.

## Data Security static style migration (2026-08-28)

- Page: `Data Security` (`6a531cf63cafe13ffe61dcf3`, `/page/Data_Security`).
- Used Webflow MCP `2.0.1`. Shared component instances were excluded: `edge-gradient`, `header`, `sub-visual`, `sub-nav`, `intro-title`, `section-title`, `icon-card`, `banner`, and `footer`.
- Re-read the complete page tree immediately before mutation and applied the site contract order `[semantic tier] + [weight] + [color]` to the three static transfer cards.
- Normalized the three card headings to the exact class list `section-content-title bold text-title` and changed their semantic tag from `h1` to `h3`:
  - `03eb98e9-64bc-d35b-dd0b-499fd3992f9b`;
  - `cbb0615e-195d-006c-d95d-42717f22a7be`;
  - `3369c0a7-a7ed-e9f0-891d-d872249007a2`.
- Normalized the three corresponding paragraphs to the exact class list `section-content-body regular text-body`:
  - `88d7347b-e924-a665-d726-404cc486fe35`;
  - `cbb0615e-195d-006c-d95d-42717f22a7c0`;
  - `3369c0a7-a7ed-e9f0-891d-d872249007a4`.
- MCP read-back confirmed all six exact final `styleNames` lists and all three `h3` tags. Designer snapshots confirmed the dark surface, white hierarchy, three-column layout, media proportions, and following process content remain visually intact.
- The dark feature-panel title/body remain `section-normal-title text-title` and `section-normal-body`. Attempts to apply `section-normal-title bold text-title` and `section-normal-body regular text-body` were rejected with `styles not found`; Webflow made no partial change. The panel remained visually intact in the follow-up snapshot.
- Structural migration remains pending. Roots `Section 14 sub-ai-adopt-process u-section-padding` and `Section 15 sub-ai-adopt-process Copy Copy Copy u-section-padding`, plus generic wrappers such as `List 6`, `List Item 4`, and `Div Block *`, were not renamed because page-owned exact selector paths could not be safely created/applied in this pass and their sitewide usage was not proven zero.
- No component, component prop, content, asset, CMS data, global selector declaration, page structure, or publish state was changed. No production publish was performed.

### Data Security static structure follow-up (2026-08-28)

- Audited all 41 site pages before structural selector rename. `sub-ai-adopt-process` is shared by Data Security, Careers, K-Discovery, and Data Analytics; every other successfully migrated selector below was found only on Data Security.
- Preserved each selector's existing stored breakpoint/style values by renaming the selector definition rather than recreating the element or copying CSS manually.
- Transfer section read-back:
  - root: `sub-ds-transfer sub-ai-adopt-process u-section-padding`;
  - list: `sub-ds-transfer__grid`;
  - all three items: `sub-ds-transfer__item`;
  - all three media wrappers: `sub-ds-transfer__media`;
  - all three images: `sub-ds-transfer__image`;
  - all three body wrappers: `sub-ds-transfer__body`;
  - process wrapper: `sub-ds-transfer__process`;
  - existing empty layout node: `sub-ds-transfer__process-spacer`.
- Protection section read-back:
  - root identity: `sub-ds-protection`;
  - title wrapper: `sub-ds-protection__heading`;
  - feature panel: `sub-ds-protection__feature`;
  - feature text wrapper: `sub-ds-protection__feature-body`;
  - media wrapper/image: `sub-ds-protection__media`, `sub-ds-protection__image`;
  - icon-card group wrapper: `sub-ds-protection__cards`.
- The protection root still includes `sub-ai-adopt-process Copy Copy Copy u-section-padding`. Duplicate selector names prevented the Designer selector manager from deterministically addressing the exact style ID attached to this element; it was preserved rather than forcing an ambiguous replacement.
- The transfer root keeps shared `sub-ai-adopt-process` because sitewide use is non-zero and its `u-section-padding` combo owns the existing spacing. The page-owned identity selector is first in the final class order.
- The feature-panel title/body remain `section-normal-title text-title` and `section-normal-body`. MCP rejected both the canonical three-class combo and semantic-base-only fallback as unresolved exact paths, so the visually stable stored classes were preserved.
- Two unused pilot selector definitions, `sub-ds-transfer__image-03` and `sub-ds-protection__surface`, remain in the style registry. They are not attached to the verified target elements and were not deleted because style deletion requires a separate exact-ID approval and zero-use verification.
- MCP read-back confirmed the exact class lists on all migrated non-image wrappers and all four migrated images, including original asset IDs and transfer-image alt text.
- Designer snapshots confirmed both sections preserve their dark/light surfaces, three-column layouts, media proportions, text contrast, and process/feature composition after the structural rename.
- Shared components, component props, content, assets, CMS data, and page structure were not changed. No production publish was performed.

### NCT static structure cleanup follow-up (2026-08-28)

- Re-audited the exact legacy selectors at `main`, `medium`, `small`, and `tiny` before replacement.
- Created page-owned BEM selectors with properties identical to the legacy Base definitions:
  - `sub-nct-process__media` (`88b24a22-e0dd-38ea-5ebd-048004fc0212`): `margin-top: 48px`;
  - `sub-nct-define__image` (`a81883ce-d8eb-d6da-de1b-fe80867c2ddd`): `width: 100%`.
- Replaced the complete class lists on:
  - process media wrapper `9b435b87-24a2-e83d-5e5c-a767fa59e421`: `Div Block 140` -> `sub-nct-process__media`;
  - definition image `0b5abb55-bdc3-9892-a973-ad8c68c4b186`: `Image 237` -> `sub-nct-define__image`.
- MCP element read-back confirmed both exact final `styleNames`. The process wrapper retained its `responsive-media` subtree, desktop/mobile image asset IDs, existing desktop alt text, tag, and visibility. The definition image retained its asset ID and visibility.
- Page-scoped style queries confirmed zero remaining NCT-page elements using `Div Block 140` or `Image 237`.
- Preserved `sub-nct-process`, `sub-nct-reason`, and `sub-intro u-section-padding`. Their existing responsive spacing values do not exactly match the current global section-padding modes, so forced replacement would alter layout.
- A post-change Designer element snapshot again returned an empty Webflow response. Asset preview for the definition image returned Webflow `429 Too Many Requests`; no alt text was invented without visual evidence.
- The superseded style definitions were not deleted. Sitewide zero-use and explicit deletion approval are still required before removal.
- No production publish was performed.
## Data Analytics static typography migration (2026-08-28)

- Page: `Data Analytics` (`6a5317bbd02345c985f5d43b`, `/page/Data_Analytics`).
- Used Webflow MCP `2.0.1`. Shared component instances and the functional `sub-gallery__*` area were excluded.
- Preserved the current dark/light surface mapping and existing typography sizes. This pass only made weight ownership explicit where the exact existing combo path resolved.
- Migrated the Active Learning supporting heading from `section-content-sub-title text-subtitle` to `section-content-subtitle semibold text-subtitle`.
- Added `regular` to 14 visible static body elements while preserving their existing `text-body` or `text-body-invert` class and the legacy `section-micro-body` opacity.
- Added `bold` to ten `section-icro-title` headings using existing exact combo paths. The typo selector was intentionally retained because the canonical `section-micro-title bold text-title-invert` path does not exist and Webflow rejected it without partial change.
- The following visually stable headings remain unchanged because their requested exact combo paths do not exist: `section-normal-title text-title` on `8fc8402e-9e25-6607-5308-eb0ae4bd96f4`; `section-icro-title text-title-invert` on `8fc8402e-9e25-6607-5308-eb0ae4bd96fc`; and both `section-content-title text-title-invert` headings on `58a81cc2-e1be-2308-4547-28fcea894d07` and `a8d9cf47-9ec7-c8de-d1c7-c0f4c735cbc7`.
- Four hidden functional labels remain `section-content-body text-title-invert` with visibility false. They were not reclassified without rendered/function evidence.
- MCP read-back confirmed every successful target's exact final `styleNames`. One temporary `429 Too Many Requests` was retried successfully.
- Structural roots and copied selectors remain pending because `sub-ai-adopt-process + u-section-padding` and `sub-ai-adopt-process Copy + u-section-padding + bg-secondary` own the current responsive spacing/background paths. Removing them without page-owned selector copies would change the current appearance.
- Designer element snapshots returned empty responses before this migration, so rendered verification remains pending; stored-state verification passed.
- No component, component prop, content, asset, CMS data, global selector declaration, variable, page structure, or publish state was changed. No production publish was performed.

## INDA FullDiscovery static typography migration (2026-08-28)

- Page: `INDA FullDiscovery®` (`6a5317ba9538f5ffd5a324c2`, `/page/INDA_FullDiscovery`).
- Used Webflow MCP `2.0.1`. Shared component instances, component props, CMS gallery interaction classes, content, and assets were excluded.
- Designer snapshots established the current surface mapping before mutation: the intro/process/capability area is a black surface with white hierarchy, the process cards use a dark navy surface with white hierarchy, and the expertise/LPO areas are light gray surfaces with dark hierarchy. The migration therefore used non-invert text utilities on dark surfaces and `-invert` utilities on light surfaces.
- Normalized the process section heading to `section-content-title bold text-title`.
- Normalized all eight process cards to exact class lists:
  - index: `section-content-index bold text-title`;
  - subtitle: `section-content-subtitle semibold text-subtitle`;
  - English stage title: `section-icro-title bold text-title`;
  - body: `section-content-body regular text-body`.
- Normalized the four capability item headings to `section-content-title bold text-title`. Their body/list typography was already explicit and was retained.
- The four capability subtitles remain `section-content-sub-title medium text-subtitle`. Webflow rejected the visually equivalent canonical-name request `section-content-subtitle medium text-subtitle` because that exact selector path does not exist; no partial change occurred.
- On the light expertise section, normalized the subtitle to `section-content-subtitle semibold text-subtitle-invert` and the body to `section-content-body regular text-body-invert`. The heading remains `section-content-title` because `section-content-title bold text-title-invert` does not exist and Webflow rejected the request without partial change.
- On the light LPO section, normalized all three card headings to `section-icro-title bold text-title-invert` and all three descriptions to `section-micro-body regular text-body-invert`.
- Full-page MCP read-back confirmed the exact final `styleNames` for all eight process-card index/subtitle/title/body groups, the expertise subtitle/body, and all six LPO text elements. A later title-only read-back encountered Webflow asset API `429`; the successful mutation responses and the earlier complete tree remain the stored evidence for the process heading and four capability headings.
- Post-change Designer snapshots confirmed the intro/process dark surface, process-card navy surface, white hierarchy, capability layouts, and LPO light surface/dark hierarchy remain visually intact. The expertise post-change snapshot returned an empty Webflow response; its pre-change surface snapshot and stored class read-back passed.
- Structural legacy selectors including `sub-intro Copy`, `sub-inda-caps__inner Copy`, `sub-inda-caps__media Copy`, `sub-inda-out`, `Div Block 69`, `Div Block 71`, and `Image 229/232/233/234` remain. They were not replaced because their exact responsive property ownership and sitewide usage were not proven safe in this typography-preservation pass.
- The legacy typo selector `section-icro-title` remains where the existing exact combo paths own the preserved rendered typography. No global selector or variable was changed to force a rename.
- No production publish was performed.

### INDA FullDiscovery static structure follow-up (2026-08-28)

- Continued the page-level cleanup while preserving each legacy selector's existing stored properties rather than rebuilding the affected elements.
- Renamed the original selector definitions in place, preserving their IDs and all stored responsive values:
  - `Div Block 69` -> `sub-inda-process__media-panel` (`c2a610e5-1691-eb88-3bbb-7a840b59dae3`), including Base 36/48px padding, 24px gap/radius, 4% white surface and medium/small/tiny padding overrides;
  - `Div Block 71` -> `sub-inda-lpo__body` (`bcc0efbf-42db-0058-5a82-0e17ea816c14`), preserving the column flex layout and 6px gaps;
  - `Image 229` -> `sub-inda-caps__image` (`0f96d236-6ac8-9de8-37e1-f6faa75d2dd1`), preserving 100% width and 12px radius;
  - `Image 232` -> `sub-inda-lpo__image` (`9f6d9a93-079f-bcdb-4f80-a71e5829135d`), preserving 8px radius and small-breakpoint 100% width;
  - `sub-inda-caps__media Copy` -> `sub-inda-caps__media-reverse` (`4b1e8070-aac4-0b3a-b324-af6794f7747b`), preserving its surface variable, radius, reverse order, and medium override;
  - `sub-inda-caps__inner Copy` -> `sub-inda-caps__content` (`fa4a5bf7-084a-2063-cdbb-e58ef9069721`), preserving Base/medium/tiny spacing and inherited color variable;
  - `sub-inda-out` -> `sub-inda-lpo` (`a5a36bf4-06d2-6c85-47f6-8636ea690083`).
- Consolidated the second and third LPO images from `Image 233` and `Image 234` onto the same existing `sub-inda-lpo__image` selector. The three legacy image definitions had identical Base radius and small-breakpoint width values.
- Created the empty identity selector `sub-inda-lpo__item` (`1f355568-e05d-bff4-7f64-ce1568188dfe`) and applied it to all three previously unclassified LPO card wrappers. This adds ownership without changing layout.
- Style registry read-back confirmed all renamed selector IDs and exact Base/main/medium/small/tiny properties. Element mutation responses confirmed the two image consolidations and three item identities were applied.
- Full element-tree read-back and post-change element snapshots were retried but Webflow returned repeated asset API `429` and empty snapshot responses. Therefore responsive stored-style verification is complete, while a fresh rendered snapshot remains pending and is not reported as visually complete.
- `sub-intro Copy` remains because two different style definitions share that same display name/selector, so name-based rename is ambiguous. It was not forced. The unused `Image 233` and `Image 234` style definitions were not deleted because sitewide zero-use could not be established during the asset API rate-limit window.
- No component, component prop, CMS binding, content, asset, page structure, or publish state was changed. No production publish was performed.

### INDA FullDiscovery title hierarchy completion (2026-08-28)

- Completed the remaining safe title cleanup without changing the shared components or CMS gallery.
- Converted the previously unclassified duplicate H1 `INDA FullDiscovery®` (`1e5405ee-5ff8-c9ee-e470-1974829b33d7`) to heading level 3 and the exact class list `section-content-title text-title`. This removes the duplicate page-level H1 while using the existing 28/26/24/22px responsive content-title hierarchy, its stored 700 weight, 141% line-height, -2% letter spacing, and explicit white title token.
- Added explicit light-surface color ownership to the expertise heading `c36f8376-cdab-fac7-3fbd-5d44d5435310`: `section-content-title text-title-invert`. The content-title size/weight hierarchy is unchanged and the color now resolves directly to `color/text/title-invert` (`#000000`) instead of relying on a wrapper.
- The canonical `section-micro-title` is 26/24/22/20px, while the legacy typo selector used by INDA owns a smaller 24/22/20/18-class scale. A direct swap would change the current design, so the original selector definition was renamed in place from `section-icro-title` to `section-micro-title-24` (`db3f385d-5b9a-2797-f400-ba410da41482`).
- Style registry read-back confirmed the renamed selector retains the original font-family, font-size, line-height, letter-spacing, and all main/medium/small/tiny references. Its existing `bold`, `text-title`, and `text-title-invert` combo descendants were automatically reparented to the renamed selector.
- Element-tree read-back confirmed the representative dark process heading is `section-micro-title-24 bold text-title`, the representative light LPO heading is `section-micro-title-24 bold text-title-invert`, the former unclassified heading is `section-content-title text-title`, and the expertise heading is `section-content-title text-title-invert`.
- Post-change Designer snapshots were retried but returned an empty Webflow response. Stored selector and element state is fully verified; fresh rendered visual verification remains pending and is not reported as complete.
- No production publish was performed.

### Data Analytics typo-selector removal follow-up (2026-08-28)

- Removed `section-icro-title` from all 11 Data Analytics page headings. Page-scoped MCP read-back confirmed zero remaining matches and 11 matches for `section-micro-title`.
- The site's existing canonical micro-title selector is registered under the exact path `Heading 100 > section-micro-title > bold`; therefore the final base/semantic/weight order on all migrated headings is `Heading 100 section-micro-title bold`.
- Four dark-surface headings use the existing exact color path `Heading 100 section-micro-title bold text-title`.
- The standard `text-title-invert` color step could not be created at the canonical path because Webflow returned an internal style-path collision error. Created the page-scoped final color combo `sub-data-analytics-text-title-invert` (`ea844734-1176-b248-db2f-5549b46f537b`) under `Heading 100 section-micro-title bold`, bound to the same existing inverse title variable `variable-759fb0ac-b062-9f1b-b699-9c1f9109159b`. Seven light-surface headings use this path.
- Exact final read-back:
  - seven headings: `Heading 100 section-micro-title bold sub-data-analytics-text-title-invert`;
  - four headings: `Heading 100 section-micro-title bold text-title`.
- Two unused global pilot styles were created while determining the connector's combo-path syntax: `section-micro-title.bold.text-title-invert` (`0171d771-ac72-9585-7854-211d405ba608`) and `section-micro-title.bold.text-title` (`e92d2208-9b04-1c35-648c-6662014af3be`). Neither is attached to a page element. The current connector exposes no accepted remove/delete action, so they remain registry-only cleanup candidates.
- No production publish was performed.

### Data Analytics micro-title hierarchy finalization (2026-08-28)

- Replaced the intermediate `Heading 100` and page-scoped color path with the standalone global semantic typography selector.
- Added the two missing standard combo continuations while preserving existing variables:
  - `section-micro-title text-title-invert bold` (`8a1164f8-458a-7feb-cee7-41152a890d0b`) uses the existing bold variable `variable-6921fef4-aed5-e816-85a4-79b62889fa2c`;
  - `section-micro-title text-title bold` (`6026afb8-5508-0b28-acb3-830ff1f90346`) uses the same bold variable.
- Final element classes:
  - seven light-surface headings: `section-micro-title text-title-invert bold`;
  - four dark-surface headings: `section-micro-title text-title bold`.
- Page-scoped read-back confirmed 11 `section-micro-title` matches and zero matches for `section-icro-title`, `Heading 100`, and `sub-data-analytics-text-title-invert`.
- The standalone `section-micro-title` responsive hierarchy remains 26 / 24 / 22 / 20 with 141% line-height. Existing title color variables and bold variable are preserved.
- The intermediate page-scoped combo and two unused pilot global selectors remain unattached registry cleanup candidates because the current connector exposes no accepted style-delete action.
- No production publish was performed.

## Sitewide section-icro-title usage migration (2026-08-28)

- Audited all 41 site pages with page-scoped element queries. Before mutation, `section-icro-title` had 16 remaining page usages: 15 on Nymi Band and one on Release Notes. The other 39 pages, including Data Analytics, had zero.
- Nymi Band (`6a531d264cd6203ae8486fef`, `/page/Nymi_Band`) is a dark-body page. Migrated 13 Paragraph labels to `section-micro-title text-title regular`, preserving their prior 400 paragraph weight, and two H3 regulation titles to `section-micro-title text-title bold`, preserving heading emphasis.
- The same audit exposed three additional Nymi H3 headings using `Heading 94 section-micro-title` (GAMP, GDPR, CCPA). Removed `Heading 94` and normalized all three to `section-micro-title text-title bold`.
- Release Notes (`6a48b6c27b53afca3f2c8f38`, `/release-notes`) migrated its dark-page H2 from `section-icro-title` to `section-micro-title text-title bold`.
- Added the missing standard regular continuation `section-micro-title text-title regular` (`82db8161-17b1-a2db-b8b8-440e28d4ed90`) with `font-weight: 400`.
- Exact read-back confirmed zero `section-icro-title` matches on Nymi Band and Release Notes. Combined with the unchanged zero results on the other 39 audited pages, page-level usage is zero across all 41 pages.
- Designer snapshots returned empty responses for Nymi and Release Notes representative elements. Stored-state, tag, visibility, exact class-list, and surface-token read-back passed; rendered verification remains pending.
- Registry-only audit still contains unused or separately scoped cleanup candidates: 26 names containing `legacy`, 44 names containing `Copy`, and 209 auto-generated names matching `Div Block/Heading/Paragraph/Image/Section/List + number`. Registry presence does not prove live usage; each requires page/component usage and breakpoint-property verification before rename or deletion.
- The old selector definitions were not deleted. Component-definition usage and exact style deletion support must be verified separately before registry cleanup.
- No component, component prop, content, asset, CMS data, or publish state was changed. No production publish was performed.

## Sitewide numeric badge style migration (2026-08-28)

- Audited all 41 pages and the numeric components `num-card`, `icon-num-card`, `num-row`, `stat`, and `stats-band`.
- Added the shared numeric badge selector system:
  - base `num-badge` (`4a08eee0-43f9-4915-85a8-00b66667ce69`): flex center/center, no shrink, 50% radius, line-height 1;
  - sizes `size-md` 48, `size-lg` 64, `size-xl` 88, `size-lg-responsive` 64/56/48, and `size-about` preserving About's prior 64 base, 48x64 small, and 54x48 tiny behavior;
  - surface paths `is-brand`, `is-ghost`, `is-plain`, and the Nymi-preserving `is-nymi`. Brand variants use existing brand/title variables; ghost preserves the previous white 8% surface; Nymi preserves the previous 12px bottom margin and 1px token border.
- Component definitions:
  - `num-row` badge -> `num-badge size-lg is-brand`;
  - `num-row` title -> `section-micro-title text-title bold`, removing the component-definition `section-icro-title`;
  - `icon-num-card` number -> shared class path `num-badge size-lg`; visual tokens are controlled by the component variant layer, not by a fixed surface modifier;
  - `num-card` number -> `num-badge size-lg is-plain`.
- Page-direct migrations:
  - Nymi Band five badges -> initially `num-badge is-nymi`, then corrected to `num-badge size-lg is-brand` after rendered-shape review (details below);
  - About Us three badges -> `num-badge size-about is-ghost`;
  - eDiscovery four process badges -> `num-badge size-lg-responsive is-brand`;
  - Data Analytics three 88px badges -> `num-badge size-xl is-ghost`.
- Nymi, About, and eDiscovery element read-back confirmed all exact final class lists and zero matches for their page-specific legacy badge selectors. The element tool's style filter is substring-based, so a query for `num` also matches `num-badge`; exact `styleNames` were used for verification.
- Data Analytics initially hit Webflow asset API `429 Too Many Requests` during verification. After backoff, exact element read-back succeeded and confirmed all three badges as `num-badge size-xl is-ghost`.
- Newsroom's apparent `num` hit was a fuzzy match on `cms-pagination__numbers`; it is pagination UI, not a numeric badge, and was not changed.
- Added actual `num-card`, `icon-num-card`, and `num-row` instances to the draft `/components` catalog shared-UI content area:
  - `771e5d1a-0dc5-136a-24ed-18a3d543f77d`;
  - `b7e585f3-a954-6b67-c9d1-64bd759d27de`;
  - `2bf4be25-09f3-7613-1a3a-be6074bf3703`.
- Existing props, component instance IDs, content, and assets were preserved. `stat` and `stats-band` were excluded from badge conversion because they are large statistic typography, not circular badges.
- Old selector definitions were not deleted. Zero-use across component definitions and a supported exact style-delete action are required before registry cleanup.
- Designer snapshots remained unavailable. No production publish was performed.

### Nymi numeric badge rendered-shape correction (2026-08-28)

- User visual review found that `num-badge is-nymi` had no square size class, so the 50% radius did not render as a circle around the number.
- Attempts to create `num-badge size-lg is-nymi` were blocked twice by Webflow `429 Too Many Requests`.
- Immediately corrected all five Nymi feature numbers to the already verified exact path `num-badge size-lg is-brand`.
- This restores 64x64 dimensions, 50% radius, flex center/center, brand background, and title-color token. Exact element read-back confirmed the final class list on all five elements.
- The previous Nymi-specific 12px bottom margin and 1px border are not included in this fallback path. A dedicated Nymi surface combo may be added after rate-limit recovery only if rendered comparison shows those details are still required.
- No production publish was performed.

### `icon-num-card` variant-owned badge correction (2026-08-28)

- Removed the incorrectly fixed `is-brand` modifier from the component definition. The interim `num-badge size-lg` path was subsequently superseded by the full numeric-component ownership audit below; the final number element uses only `icon-num-card__num` in every component variant.
- Preserved the original component variant logic on the component-owned `icon-num-card__num` style path:
  - `light` (`base`) owns the existing brand background, title color, font-family, font-size, line-height, weight, letter-spacing, and tabular-number settings;
  - `white` has no local number override and continues to inherit the base badge values;
  - `dark` overrides only the existing dark-variant background token and title color token.
- Final MCP read-back confirmed the component element has exactly `icon-num-card__num`; fixed `is-brand`, `is-plain`, and shared `num-badge` classes are absent from its `styleNames`.
- Variant-style read-back confirmed the base token set, empty white override, and dark-only color override. The shared `size-lg` path remains 64x64 with a 64px minimum width.
- Designer rendered snapshot was not returned, so this correction is stored-state and variant-style verified; visual snapshot verification remains pending. No production publish was performed.

### Numeric component variant ownership audit and correction (2026-08-28)

- Re-audited the numeric component set by component metadata and definition trees: `num-card`, `icon-num-card`, `num-row`, and non-badge `stat`. `stats-band` remains excluded because it is large statistic typography rather than a circular number badge.
- Found two additional fixed surface modifiers and one shared-selector contamination:
  - `num-card`: `num-badge size-lg is-plain` was fixed in the definition;
  - `num-row`: `num-badge size-lg is-brand` was fixed in the definition;
  - `num-badge` had temporarily inherited `icon-num-card` base background and typography tokens during the preceding correction.
- Corrected each component so every variant now keeps one identical component-owned role selector on the number element:
  - `num-card` -> `num-card-num`;
  - `icon-num-card` -> `icon-num-card__num`;
  - `num-row` -> `num-row__badge`.
- Removed all fixed `is-brand`, `is-plain`, `num-badge`, and size modifier classes from those three component-definition number elements. Existing component role styles and variant overrides were preserved instead of recreating values.
- Restored the shared `num-badge` selector to geometry-only ownership: flex centering, no shrink, 50% radius, and line-height 1. Removed the accidentally introduced background, font-family, text color, font size, weight, letter-spacing, and tabular-number properties.
- Variant read-back:
  - `num-card`: dark base retains the original 64x64 centered role style and title-color token; light and brand retain empty local overrides and inherit the component base;
  - `icon-num-card`: light base retains the original 64x64 token-based badge style, white inherits base, and dark retains its existing dark background/color override;
  - `num-row`: dark base retains the original 64x64 brand badge role style and light retains its existing empty local role override.
- Exact component-tree read-back confirmed each number element has only its corresponding role selector and no fixed surface modifier.
- Responsive read-back passed for every `num-card`, `icon-num-card`, and `num-row` variant at `medium`, `small`, and `tiny`. `icon-num-card` keeps its existing 48x48 small override and 20px tiny type override; `num-row` remains 64x64 across all three narrower breakpoints.
- Designer snapshots confirmed the final base rendering for `icon-num-card` and `num-row` as centered circular 01 badges. The `num-card` snapshot returned its expected plain 01 treatment, although the preceding canvas-open response timed out; its stored-state and breakpoint checks passed.
- Updated the draft `/components` catalog with the missing representative variants:
  - `num-card` light `edcbf9e1-b278-f76a-cda4-6a1434612d66` and brand `746d8550-3c70-ee25-2496-b1673934eb8c`;
  - `icon-num-card` white `d1b2be7b-3d7d-c4ab-bfd1-1f15d88b4f55` and dark `33236a83-3f13-2124-1d66-7f59350f1c65`;
  - `num-row` light `fb81e05c-a460-43b4-966a-368eacd55977`.
- Variant prop mutation responses returned the intended unique variant IDs for all five catalog instances. Independent resolved-prop read-back passed for both `num-card` instances; Webflow returned `429 Too Many Requests` for the two `icon-num-card` instances and the `num-row` instance, so those three catalog read-backs remain pending.
- No production publish was performed.

### Numeric badge surface-contrast correction (2026-08-28)

- Rechecked the complete previously audited numeric set: 41 pages plus `num-card`, `icon-num-card`, `num-row`, `stat`, and `stats-band`. `stat` and `stats-band` remain large statistic typography, not circular badge targets. Page-direct Nymi, About, eDiscovery, and Data Analytics badges keep their verified shared `num-badge` geometry/surface paths; Newsroom `cms-pagination__numbers` remains excluded as pagination UI.
- Root cause: component role selectors were structurally normalized, but several variants still inherited the card text color or had no badge background. This made a number disappear when the card and number resolved to the same surface/text family.
- Applied a single contrast matrix without changing component structure, props, content, instance IDs, or badge sizes:
  - light/white card or row context -> brand-primary badge surface (`variable-cc80bdda-e1aa-a20e-c421-28db0ffef6b3`) + light number (`variable-b90879fd-bc66-1d32-d73c-675a5d8414f2`);
  - dark/brand card or row context -> white/light badge surface (`variable-26444bb2-0ad8-a411-43bf-4b3e499b0fc7`) + dark number (`variable-759fb0ac-b062-9f1b-b699-9c1f9109159b`).
- `num-card`: dark base and brand now use white/light badge + dark number; light uses primary badge + light number. Base `num-card-num` now also owns `flex-shrink:0` and 50% corner radii while preserving 64x64 and flex center/center.
- `icon-num-card`: light base already had primary + light contrast; white now explicitly owns the same pair instead of relying on inheritance; dark now uses white/light badge + dark number. Existing 64px main and 48px small sizes, typography, and centering were preserved.
- `num-row`: dark base now uses white/light badge + dark number; light uses primary badge + light number. The nested `section-micro-eyebrow` number receives the matching explicit color per variant so paragraph color cannot override the badge-level contrast. Existing 64px size and flex centering were preserved.
- Exact variant-style read-back passed for all eight badge variants at `main`, `medium`, `small`, and `tiny`. Narrow breakpoints contain only the pre-existing size overrides and otherwise inherit the corrected main contrast pair.
- Draft `/components` catalog read-back reconfirmed the representative instances and exact variants: `icon-num-card` white `d1b2be7b-3d7d-c4ab-bfd1-1f15d88b4f55`, dark `33236a83-3f13-2124-1d66-7f59350f1c65`, and `num-card` light `edcbf9e1-b278-f76a-cda4-6a1434612d66`. No catalog structure change was necessary because these actual variant instances already exist.
- Designer element snapshot calls for the three catalog representatives returned empty responses. Stored variant IDs, exact token read-back, component trees, geometry, and breakpoint inheritance passed; rendered snapshot verification remains pending and is not reported as passed.
- No production publish was performed.

### Numeric badge typography consistency correction (2026-08-28)

- Full typography read-back found that only `icon-num-card__num` owned a complete number typography token set. Shared page badge `num-badge` owned geometry only, `num-card-num` inherited surrounding card text, and the `num-row` number reused global `section-micro-eyebrow`. This caused visually smaller numbers inside otherwise identical 64px circles.
- Standardized `num-badge`, `num-card-num`, `icon-num-card__num`, and the new `num-row__number` on the existing verified icon-number token set: font family `variable-9597f4fe-89fb-5854-de16-968abd065eb3`, font size `variable-e8ca801c-9892-23ed-7ccd-42e9ebe4f5ee`, line height `variable-51b66c59-950d-47cd-6b59-3df4102ce456`, weight `variable-6921fef4-aed5-e816-85a4-79b62889fa2c`, letter spacing `variable-a41ecc80-09d7-d533-cfb7-751b1e97f3a1`, and `tabular-nums`.
- Responsive number sizing is now consistent: main/medium inherit the number font-size token, small is 24px, and tiny is 20px. Existing badge dimensions remain unchanged, including `icon-num-card`'s existing 48x48 small badge.
- Removed the `num-row` number paragraph's global `section-micro-eyebrow medium` class path and replaced it with the sole component-owned selector `num-row__number` (`03ef886c-598b-e309-8238-b19850da24d5`). This selector owns zero margins/padding, centered line box, number typography, and variant text color.
- Restored global `section-micro-eyebrow` to its original font-family, font-size, line-height, 600 weight, and letter-spacing tokens and confirmed it has no number-specific margin, padding, color, alignment, tabular-number, small, or tiny overrides.
- Exact component-tree read-back confirmed the `num-row` paragraph now has exactly `num-row__number`. Typography read-back passed for shared page badges and all three numeric components at main, small, and tiny; medium has no local override and inherits main as intended.
- Card surface contrast rules from the preceding correction remain intact. Content, props, instance IDs, dimensions, CMS data, and publish state were not changed. No production publish was performed.

### Data Analytics Structured Analytics brand badge correction (2026-08-28)

- Corrected the three direct page badges under `Structured Analytics` from `num-badge size-xl is-ghost` to the exact light-surface path `num-badge size-xl is-brand`.
- The required triple combo did not previously exist, so created only `.num-badge.size-xl.is-brand` with the established contrast pair: brand-primary background `variable-cc80bdda-e1aa-a20e-c421-28db0ffef6b3` and light number `variable-b90879fd-bc66-1d32-d73c-675a5d8414f2`.
- Preserved the existing 88x88 `size-xl` geometry and shared number typography. Medium, small, and tiny contain no local surface overrides and inherit the corrected main pair.
- Exact element read-back confirmed all three final class lists. Designer snapshot confirmed a circular primary badge with centered white `01`.
- No card structure, image, copy, typography, component variant, CMS data, or publish state was changed.
- Follow-up visual sizing: reduced all three badges one scale from `size-xl` 88px to `size-lg` 64px while preserving `is-brand`. Final exact class list is `num-badge size-lg is-brand`; Designer snapshot confirmed the smaller circle and centered number.

### Section semantic hierarchy revalidation and breakpoint correction (2026-08-28)

- Re-read all 24 canonical `section-[head|lead|normal|content|micro|ui]-[title|subtitle|body|eyebrow]` selectors at main and audited their medium/small/tiny overrides. Title values and embedded default weights still match the approved hierarchy: head 60, lead 48, normal 36, content 28, micro 24, UI 18 at main; titles 700 except UI 600, subtitles/eyebrows 600, bodies 400.
- Confirmed the reported body pair was not numerically inverted: `section-content-body` is `18/17/16/15px`; `section-micro-body` is `16/16/15/14px`. Both use 171% line height and -0.02em letter spacing. Rewrote both selectors at all four breakpoints to their own semantic font-size, line-height, and letter-spacing sources so they no longer reference legacy Body scale variables at narrower breakpoints.
- Found and corrected an actual lower-tier inversion in `section-micro-eyebrow`: small/tiny had no font-size override, so the medium 15px cascaded into both widths, making tiny micro eyebrow larger than tiny content eyebrow 14px. Its narrower breakpoint line-height also incorrectly referenced a body 171% variable.
- Final eyebrow hierarchy: `section-content-eyebrow` `18/16/15/14px`; `section-micro-eyebrow` `16/15/14/13px`. Micro eyebrow medium/small/tiny now reference its semantic 141% line-height and -0.02em letter-spacing variables.
- Four-breakpoint read-back passed for the corrected content/micro body selectors and content/micro eyebrow selectors. The first combined verification hit HTTP 504, so the reads were retried in smaller selector groups and completed successfully.
- No text color, content, component prop/variant, layout, CMS data, or publish state was changed. No production publish was performed.

## Homepage Hero typography migration (2026-08-28)

- Page: homepage (`6a38f3a0e95d43bbdbe5c758`). Scope was limited to the static `main-hero` text elements; layout, content, media, alignment, interactions, and components were not changed.
- Added Typography variables that preserve the measured Hero values:
  - `type/section/display/title/font-size`: `148px`;
  - `type/section/display/title/line-height`: `110%`;
  - `type/section/display/title/letter-spacing`: `-0.02em`;
  - `type/section/ui/label/font-size`: `22px`;
  - `type/section/ui/label/line-height`: `141%`;
  - `type/section/ui/label/letter-spacing`: `0px`.
- Added global semantic selectors `section-display-title` and `section-ui-label`, plus the required `fm-en` / `regular` / text-color combo continuations.
- Exact final element read-back:
  - Hero H1 `b25c3ebb-f213-6f52-a378-25f661901844`: `fm-en section-display-title regular text-title`;
  - Hero description `b8e06e9f-8ce3-1a4a-6467-1eb23c134cc3`: `section-head-body regular text-body`;
  - Scroll label `f96b5029-8424-b904-72fd-275887e541aa`: `fm-en section-ui-label regular text-body`.
- Removed page usage of `display-188`, `main-hero__scroll-title`, and `section-micro-body--context-03` from these three text elements. Their registry definitions were not deleted because sitewide zero-use was not established.
- Webflow accepted the stored DOM and style changes. The Designer snapshot endpoint returned repeated `status:false` responses for both the Hero root and its static content wrapper, so rendered verification remains pending and this pass is not reported as visually complete.
- No production publish was performed.

### Homepage main-why typography migration (2026-08-28)

- Scope: homepage `main-why` section only. Structure, copy, icons, assets, spacing, card surfaces, and responsive layout were not changed.
- Surface mapping was preserved: `main-why__card` uses `Color/Brand/Primary` (`#002539`), so card titles use `color/text/title` (`#FFFFFF`) and body copy uses `color/text/body` (`#FFFFFFC7`).
- Exact final headline classes:
  - first and third H2: `section-head-title bold text-title`;
  - emphasized `eDiscovery` H2: `Heading 70 section-head-title bold text-title`.
- Exact final card typography:
  - three H4 titles: `section-micro-title text-title bold`;
  - two existing descriptions: `section-micro-body regular text-body`.
- Removed `section-micro-title-24` from all three `main-why` card titles. No new size-suffixed selector or variable was created; the cards now use the existing canonical responsive `section-micro-title` hierarchy.
- `Heading 70` was retained only on the emphasized H2 because its existing combo removes the global `section-head-title` box shadow. Removing it without first correcting and auditing the global title selector would change the rendered appearance outside this page.
- MCP query read-back confirmed all eight modified elements have the exact final class lists and retained their original tags and visibility.
- The post-change section snapshot ended with Webflow HTTP `504`; rendered verification remains pending and is not reported as visually complete.
- No production publish was performed.

## Legal, Private Resources, and residual class migration (2026-08-28)

- Site: `6a38f39fe95d43bbdbe5c71c`. Production publish was not performed.
- Terms of Use (`6a48bf39f4a8532139b6c0f3`): renamed `sub-terms Copy` to `sub-terms` in place, preserving selector ID `1f238d6a-dc79-dee2-0a4c-5cb63540cab5` and the existing secondary-background token. Seven headings now read back exactly as `section-content-title text-title-invert`; fourteen paragraphs read back exactly as `section-micro-body regular text-body-invert`. Page read-back found no remaining `Copy`, `Paragraph 19`, numbered auto-generated, or `eyeblow` class.
- Privacy and Cookie Policy (`6a48bf3823d56c4e12728cf2`): renamed `sub-privacy Copy` to `sub-privacy` in place, preserving selector ID `688205fe-de20-4043-1fc9-acfb8f55cb1b` and the existing secondary-background token. Six headings now read back exactly as `section-content-title text-title-invert`; twenty-three paragraphs read back exactly as `section-micro-body regular text-body-invert`. `sub-ai-adopt-process` remains on the root because its existing `u-section-padding` combo owns the measured responsive padding; removing it before a verified replacement path exists would change layout. No `Copy`, `Paragraph 19`, numbered auto-generated, or `eyeblow` class remains on the page.
- Private Resources list (`6a587d49ad6bb9a4a35cea16`): renamed `Section 25` to `sub-private-resources` in place, preserving selector ID `80dd9c0f-a62b-0578-7da0-d115743a5b97`, the 80px top margin, and its existing `u-section-padding bg-secondary` combo chain. The CMS card title is `section-micro-title text-title-invert bold`; the summary is `section-micro-body regular text-body-invert`. Read-back preserved four CMS nodes, the empty state, and both detail/PDF links.
- Private Resources template (`6a587ccd5538ad94bffb2767`): renamed `Section 13` to `sub-private-detail__spacing` in place, preserving selector ID `b380ae68-70dd-f208-aeb4-9985114065b4` and the existing 120px bottom spacing. CMS-bound title, summary, and navigation structure were not changed.
- Re-audited all 32 sitemap-listed static pages after the legal/private changes. Zero page usages of `sub-visual-eyeblow` and `section-title-eyeblow` were found. The current `sub-visual` and `section-title` component definitions already use `section-head-eyebrow medium`, not either typo selector. Removed the unused typo families from the style registry in child-first order; registry read-back returned zero remaining `eyeblow` selector or name.
- Residual static-page renames preserve the original selector IDs and every stored breakpoint property: `Div Block 155` -> `sub-news-featured__heading`, `Div Block 160` -> `section-contents__heading`, `Section 24` -> `sub-news-list`, `Div Block 161` -> `sub-news-list__heading`, `Div Block 168` -> `sub-insights__heading`, `Div Block 96` -> `sub-locations__visual`, `Div Block 173` -> `sub-locations__content`, `Section 22` -> `sub-litera-products`, `Div Block 153` -> `sub-litera-products__sticky`, `Image 257` -> `sub-litera-products__logo-image`, and `Image 258` -> `sub-litera-products__logo-image-alt` before consolidating the second image element onto `sub-litera-products__logo-image`.
- Litera product-feature paragraphs: eleven `Paragraph 11 section-micro-body` elements now use `section-micro-body regular text-body-invert`. Three registry selectors shared the same legacy name `banner-box-1 Copy Copy`; the first two (`3a8d3f12-e8cc-a12d-5a35-73ca6883ec43`, `aa84eee5-28e7-f4c4-528b-ee084e394a7b`) were confirmed not to change the Litera target when renamed and were removed as unused duplicates. The remaining selector `c6003fc1-965f-44d7-bd04-4bd302c6ab24`, which retains the measured Litera background, 64px top margin, and tiny breakpoint values, was renamed to `sub-litera-products__banner`. Final element read-back confirmed the target uses exactly `sub-litera-products__banner`, both logos use `sub-litera-products__logo-image`, all eleven bodies use the canonical body path, and no numbered/Copy/eyeblow class remains on Litera.
- Designer snapshots now pass for Terms, Privacy/Cookies, and Private Resources. They confirm the secondary light surface, dark title/body contrast, preserved legal-document rhythm, preserved CMS list rows, and the existing detail/PDF actions. Litera's element snapshot endpoint returned `status:false`; its stored DOM and full main/tiny style read-back passed.

### Full 41-page completion audit (2026-08-28)

- Read the live Designer Pages panel to include pages excluded from sitemap. Final scope is 41 real pages: 32 sitemap-listed static pages, seven CMS collection templates, Search Results utility, and Password utility. The `page` and `board` rows are folders; the temporary `mint-*` 404 row is not a persisted page ID.
- CMS template IDs audited: Newsroom `6a50840a1b7df41d1cf52e7e`, Insights `6a508428578978d6ae556d00`, Solutions `6a51b6af8538aa1c6ae856c1`, Release Notes `6a51b6b07ac4cedebadca69b`, Careers Jobs `6a51d9909532a35d28ba4d80`, Private Resources `6a587ccd5538ad94bffb2767`, and Insight Categories `6a6079e6e3638d2a83ab40e1`.
- Template migrations preserve selector IDs and measured styles:
  - Newsroom `Section 13 Copy` -> `cms-detail__spacing` (`f5c4088c-14a9-cb0d-a541-88a5671d6f2f`, 120px bottom padding);
  - Insights duplicate `Section 13 Copy` -> `sub-insights-detail__spacing` (`256f2b4d-5fb9-cdf3-0d22-4e06fff7c455`, 120px bottom padding);
  - Release Notes `sub-ai-adopt-process Copy Copy` -> `sub-release-detail__surface` (`2811e2c3-3ef5-166a-c8b6-41bce27e36dd`), preserving its existing `u-section-padding` responsive combo chain;
  - Careers Jobs `sub-careers-detail__head Copy` -> `sub-careers-detail__head` (`2b65b2c9-0ccd-630e-320a-12ff1ce0dc17`), preserving flex, token spacing/border, and the small breakpoint row-gap.
- Password utility (`6a59ec5f666955b924ba14b8`): renamed `Image 261` to `password-access__logo` in place (`8359c27f-c599-8ebb-77ff-30c0ef462ca1`), preserving its 256px width. Final read-back confirmed the password form/action, input, button, and error structure remain intact.
- Exact post-change tree read-back found zero live class names matching `eyeblow`, `section-icro`, a whitespace-delimited `Copy`, or numbered `Div Block/Image/Heading/Paragraph/Section/List/List Item/Text Block` on all 41 pages. Representative changed pages were re-read after every duplicate-selector resolution.
- Registry audit contains zero `eyeblow` or `section-icro` selectors. It still contains 59 `Copy`-named and 203 numbered historical selectors with no live page usage proven by this audit. These registry-only entries were not bulk-deleted because component variant usage and selector ancestry must be independently proven before deletion; their presence is not a live-page migration defect.
- Responsive source read-back passed for all selectors changed in this pass. In-place renames retain the same selector IDs and breakpoint records; canonical legal body uses 17px main, 16px medium, and the existing small token; title-invert retains its small/tiny overrides; Litera banner retains 520px/64px/72px main geometry and 360px/32px/48px tiny geometry.
- No content copy, CMS data, component props, form behavior, asset binding, link destination, or production publish state was changed.

### Homepage `main-insights` title migration (2026-08-28)

- Page: Home (`6a38f3a0e95d43bbdbe5c758`)
- Element: Insights H2 (`bcce99ed-3936-ad17-f795-b16283c3fc2a`)
- Final classes: `section-head-title bold text-title`
- Removed legacy empty combo: `heading-84`
- MCP read-back confirmed the exact final `styleNames`.
- Designer element snapshot confirmed the white title and existing visual hierarchy remain intact.
- No component structure, CMS content, interaction, or publish state was changed.

### Homepage typography hierarchy migration (2026-08-28)

- Page: Home (`6a38f3a0e95d43bbdbe5c758`)
- Migrated confirmed semantic combinations across `main-why`, `main-num`, `main-refer`, `main-core`, `main-global-infra-webgl`, `main-core-services`, and `main-consulting`.
- Canonical heading pattern: `section-head-title bold text-title`.
- Canonical content title pattern: `section-content-title bold text-title`.
- Canonical micro title pattern: `section-micro-title text-title bold`.
- Canonical body patterns: `section-head-body|section-content-body|section-micro-body regular text-body`.
- Removed confirmed text legacy selectors: `section-micro-title-24`, `Heading 83`, `Heading 85`, `Paragraph 16`, `Paragraph 17`, `Paragraph 24`, and `Text Block 7` from migrated elements.
- MCP read-back confirmed final `styleNames` on representative elements after migration.
- Preserved pending legacy selectors where removal would change rendering without selector property access: `Heading 70` on the emphasized eDiscovery heading, `Paragraph 9` on four statistic values, and `heading-52 text-center` on `main-consulting__head`.
- `Heading 70` currently compensates for the global `section-head-title` box-shadow pollution; remove only after the global selector is normalized.
- `heading-52 text-center` cannot be reduced to `main-consulting__head text-center` because that selector path does not exist and style update access is unavailable in the current MCP schema.
- `number-item Copy` remains a structural legacy wrapper and was not changed during typography migration.
- No CMS content, component definition, interaction, or publish state was changed.
### Homepage remaining typography cleanup follow-up (2026-08-28)

- Removed `Heading 70` from the emphasized eDiscovery heading; final classes are `section-head-title bold text-title`.
- Replaced four `Paragraph 9` statistic values with `fm-en section-display-title regular text-title`.
- Replaced the `number-item Copy` structural wrapper with the existing `number-item number-item-2` combination used by sibling items.
- MCP read-back confirmed all four statistic values and the removed legacy selectors.
- The only remaining typography/layout legacy on the homepage is `main-consulting__head heading-52 text-center`.
- It remains because the current Webflow MCP workspace schema does not expose existing-style update/create operations, and removing `heading-52` through element class assignment would also remove the centered alignment. No unsafe inline style, custom code, or temporary selector was introduced.
- No publish was performed.

### 2026-08-28 LPO navigation registration follow-up

- Target draft page: `해외소송 지원(LPO)` (`6a90e69e85b0d836c3e1cd94`, `/LPO`).
- The LPO page already had its local `sub-nav` entry enabled with label `해외소송 지원(LPO)` and URL `/LPO` after `K-디스커버리`.
- The `sub-visual` instance already exposes `eDiscovery > 해외소송 지원(LPO)` through `bcDepth1Label` and `bcDepth2Label`, with both breadcrumb depths visible.
- Added one shared Footer navigation link after `eDiscovery`: element `8825fcf1-1ed6-7f52-5570-a5311e461980`, text `해외소송 지원(LPO)`, URL `/LPO`, class `footer__link`. The connector rejects the sibling `u-body-18` combo in component scope, so exact sibling typography and visual rendering remain unverified.
- Shared Header desktop/mobile insertion calls repeatedly returned HTTP 504. Lightweight component-content read-back found no LPO node, so Header registration is not marked complete and no duplicate retry should occur without a fresh Header tree/content check.
- No publish was performed.

### `section-micro-title-24` final migration audit (2026-08-28)

- Hard rule: micro titles use the existing canonical `section-micro-title`; size-suffixed `section-micro-title-24` must not be created or reused.
- Migrated the Private Resources CMS title to `section-micro-title text-title-invert bold` and all eleven INDA headings plus the Homepage `End-to-End eDiscovery` heading to their surface-correct canonical combinations.
- Full Designer DOM audit covered all 41 discoverable static, CMS-template, search, password, and catalog pages. Thirty-eight pages have zero direct or rendered matches.
- Remaining rendered matches are component-propagated only: Components catalog 7, Litera 11, Luminance 6, and Docusign 3. The source definitions are `review-card` (quote and author elements) and `icon-card-cms` (title element).
- Webflow MCP component-scoped `set_style` resolves the elements but currently rejects the already-existing global `section-micro-title` and `bold` selectors as not found. A one-element clear/reapply probe was immediately restored to its original class list after the connector rejected the canonical path; no visual state was left changed.
- The forbidden selector family has not been deleted because those component definitions still reference it. Delete only after the three definition elements are migrated and the `/components` catalog plus downstream pages read back with zero matches.
- No publish was performed.
### Homepage statistic font and alignment correction (2026-08-28)

- Corrected the four statistic values (`150`, `55`, `566`, `3`) after visual feedback.
- Removed `fm-en` and the polluted combo chain from all four values.
- Renamed the previously unused standalone global `section-display-title` selector to `section-stat-value`; the existing hero combo `.fm-en.section-display-title` was preserved.
- Final statistic value classes: `section-stat-value` only.
- Updated global `number-item-body` at `main / noPseudo` with `align-items: center` and `text-align: center`; existing flex-column and gap properties were preserved.
- Updated global `main-consulting__head` with centered alignment, then removed `heading-52 text-center` from the element.
- Final Consulting wrapper classes: `main-consulting__head` only.
- MCP style read-back and element-tree read-back confirmed the saved values and exact final class lists.
- No publish was performed.

### Homepage statistic weight and center-axis correction (2026-08-28)

- Root cause: `number-item-head` still used `justify-content: flex-start`, while `section-stat-value` had no explicit weight.
- Updated `section-stat-value` to `font-weight: 400`.
- Updated `number-item-head` to `width: 100%`, `justify-content: center`, and `text-align: center`; preserved `align-items: flex-end` for value/unit baseline alignment.
- Existing `number-item-body` center alignment remains active.
- MCP style read-back confirmed saved values, and the first complete `number-item` snapshot confirmed value, label, and description share the same center axis.
- No publish was performed.

### Global section typography normalization (2026-08-28)

- Updated semantic variables: head title `60px`, lead title `48px`, UI title `18px`; display and normal tiers remain unchanged. Micro body is `16px` and micro/UI eyebrow bases are `16px`/`14px`.
- Updated all section body line-height variables and the four legacy Body variables from `161.8%` to `171%`.
- Normalized title, subtitle, body, and eyebrow selectors across `main`, `medium`, `small`, and `tiny`; direct color/opacity declarations were removed so surface-aware text utilities or component inheritance own contrast.
- Updated text colors to a readable four-step hierarchy: dark surfaces title `#FFFFFF`, subtitle `#FFFFFFE6`, body `#FFFFFFD1`, desc `#FFFFFFB3`; light surfaces title `#011926`, subtitle `#18313D`, body `#354A54`, desc `#53636B`.
- Full read-only audit covered all 41 pages and all 54 component definitions. Live explicit legacy findings were limited to one About Us auto-heading combo, one Insights RichText body combo, and component definitions in footer, card, review-card, icon-card-cms, and stats-band.
- Completed migrations: cookie body -> `section-ui-body regular`; card definition -> single `card-title` / `card-desc` roles with canonical content typography at every breakpoint; stats-band labels -> `section-content-subtitle semibold`; Insights RichText -> single `cms-detail__body` role with canonical content-body scale and `171%` line-height.
- Remaining connector-blocked definitions: review-card quote/author and icon-card-cms title still reference `section-micro-title-24`; About Us H2 still includes `Heading 91`; footer subscribe H3 still includes `Heading 97`. The MCP resolves each element but rejects the already-existing global canonical path as `style not found` because duplicate combo selectors share the same class name. They were not force-cleared, renamed, or given fixed color utilities because that would risk variant breakage.
- No global vertical-centering rule was added to text. Existing explicit flex/panel wrappers retain their alignment; line-height is used only for text rhythm.
- Read-back confirmed the successful class replacements and responsive style writes. No publish was performed.

### Semantic typography default-weight normalization (2026-08-28)

- Embedded default weights directly into all 24 canonical section typography roles: head/lead/normal/content/micro title `700`; UI title, all subtitle, and all eyebrow roles `600`; all body roles `400`.
- Preserved display typography weights and all existing responsive font-size, line-height, letter-spacing, color inheritance, and component variant behavior.
- Applied the same rule to canonical component-only roles created during migration: `card-title` `700`, `card-desc` `400`, and `cms-detail__body` `400`.
- Main-breakpoint MCP read-back confirmed each representative and boundary role stores the requested weight. Weight inherits through medium/small/tiny because no breakpoint-specific weight overrides were added.
- Existing same-value weight utility classes on legacy element combinations are now redundant migration candidates; they were not bulk-removed in this pass because duplicate Webflow combo paths can clear an element's full style list when canonical resolution fails.
- No publish was performed.

### Final legacy-title application retry (2026-08-28)

- Re-read the current shared definitions after the parallel session. `review-card` quote is clean `section-micro-title`; its embedded 700 weight means no `bold` utility is required.
- Retried exact canonical assignment for `review-card` author, `icon-card-cms` title, About Us lead H2, and Footer subscribe H3. The headless MCP again returned `style not found` for the existing standalone `section-micro-title`, `section-lead-title`, and `section-content-title` selectors.
- Immediate read-back confirmed all four elements retained their original class lists; the rollback guard restored any target whose observed list differed. Current remaining lists are `section-micro-title-24 bold` on two component elements, `Heading 91 section-lead-title` on About Us, and `Heading 97 section-content-title` in Footer.
- Inspected the registry and confirmed the collision source is multiple historical combo children sharing each canonical final class name. Attempts to address a combo by selector path or selector ID through `rename_style` were rejected as not found; no broad ambiguous rename/remove was executed.
- The connected Designer UI fallback could not initialize because the local browser-control runtime failed before opening Webflow. No unsafe registry deletion, fixed component color utility, custom code, or publish was performed.

### Compatibility-alias finalization (2026-08-28)

- Per final direction, no selector-registry deletion was performed. Existing names may remain for compatibility but must not define a separate typography hierarchy or be used on new elements.
- Synchronized `section-micro-title-24` to the canonical `section-micro-title` values: base font variable, 24/22/20/18px responsive scale, 141% line-height, -2% letter-spacing variable, zero vertical margins, and embedded 700 weight. Direct color and opacity were removed.
- Four-breakpoint read-back confirmed the alias now renders identically to the canonical role. The existing `bold` on the two old component elements is redundant but does not change the computed 700 weight.
- Registry read-back shows the About Us `.heading-91.section-lead-title` and Footer `.heading-97.section-content-title` combo records contain no stored properties. They therefore do not override the canonical lead/content title variables or embedded 700 weight and are treated as inert compatibility paths.
- Final source of truth remains `section-micro-title`, `section-lead-title`, and `section-content-title`. New elements must not use `section-micro-title-24`, `Heading 91`, or `Heading 97`.
- No content, component variant, CMS data, structure, link, or publish state was changed.

### `section-micro-title-24` zero-use completion (2026-08-28)

- Supersedes the compatibility-alias note above: `section-micro-title-24` is no longer permitted as an alias and has zero registry entries.
- Resolved the MCP name collision by renaming historical combo children away from the canonical name, promoted selector ID `db3f385d-5b9a-2797-f400-ba410da41482` to the sole standalone `section-micro-title`, and retained the approved 24/22/20/18px, 141%, -2%, 700 scale.
- Migrated the original review-card author and icon-card-cms title plus every affected former-canonical reference found across pages and component definitions back to `section-micro-title`. Removed redundant `bold`/`regular` on migrated elements and preserved page surface color utilities; component definitions use the role class alone.
- Affected live surfaces included Private Resources, Newsroom, Insights, Careers, Data Analytics, Docusign, Locations, About Us, Reveal, Nymi Band, INDA FullDiscovery, Newsroom Template, Release Notes, Home, and seven shared card/number component definitions.
- Registry read-back returned zero selectors whose name or selector contains `section-micro-title-24`, and exactly one standalone global `section-micro-title` selector.
- No selector deletion, content change, CMS mutation, component variant change, or publish was performed.

### LPO page scaffold (2026-08-28)

- Created draft static page `해외소송 지원(LPO)` (`6a90e69e85b0d836c3e1cd94`) with slug and staged path `/LPO`.
- Added the verified shared page sequence: `edge-gradient`, `header`, `sub-visual`, `sub-nav`, LPO body scaffold, `banner`, and `footer`.
- Configured `sub-visual` for the eDiscovery context with title `해외소송 지원(LPO)`, description `Legal Process Outsourcing`, matching K-Discovery background media, breadcrumbs, and expert-consultation CTA label.
- Added `해외소송 지원(LPO)` as visible item 5 in both the new LPO page and K-Discovery page `sub-nav`, linked to `/LPO`; item 6 remains hidden.
- Added the page-owned body scaffold `sub-lpo-body > sub-lpo-content > no-container > sub-lpo-content__inner > sub-section-txt + sub-lpo-content__body` for later content insertion.
- The actual Webflow Body element rejects style assignment through the current MCP, so `sub-lpo-body` is a page content wrapper rather than a Body selector.
- The existing `section-contents` name is present only through an unusable selector path in the current MCP and could not be applied as a standalone global class; the clean page-specific `sub-lpo-content__body` wrapper was used instead.
- The current page-creation connector rejected folder/parent parameters, so the page is currently root-level rather than nested under the eDiscovery folder. Navigation placement reflects the requested K-Discovery-following relationship.
- MCP metadata and full DOM read-back confirmed the page remains `draft: true`, the final component order, LPO prop overrides, and exact body scaffold class lists.
- No publish was performed.

### LPO Korean content and numbered-flow implementation (2026-08-28)

- Replaced the empty LPO body placeholder with four native sections in this order: `sub-lpo-intro`, `sub-lpo-proof`, `sub-lpo-services`, and `sub-lpo-facility`.
- Used only the supplied Korean source copy. No sentence was summarized, rewritten, translated, or omitted.
- Updated `sub-visual` to the supplied title `해외소송 지원(Legal Process Outsourcing)` and description `해외 소송 과정을 지원하는 종합 법률 아웃소싱 서비스`.
- Updated the shared banner instance title to the supplied Korean CTA sentence; the existing shared button label and link remain unchanged.
- Implemented the customer-preferred fully expanded reading flow rather than sticky, tab, or accordion UI: proof `01–03`, services `01–04`, and facilities `01–02`.
- Added nine reusable 64px circular number markers using the existing brand-primary and base-white variables.
- Added fluid page structure styles using `auto-fit`, `minmax`, and `clamp` so desktop rows collapse naturally to one-column reading order without temporary breakpoint classes.
- Existing canonical `section-*` typography selectors are present in the site but the current MCP rejects them as unavailable when assigned to new elements. To prevent unstyled text and avoid numeric suffix utilities, five LPO role selectors were created: `sub-lpo-head-title`, `sub-lpo-head-body`, `sub-lpo-content-title`, `sub-lpo-content-subtitle`, and `sub-lpo-content-body`. They reference the existing `type/section/*` and `color/text/*` variables.
- MCP DOM read-back confirmed all four section titles, the final facility sentence, nine number elements, and correct section order.
- Designer element snapshots could not be completed because the active Designer MCP app timed out. Visual verification remains pending; DOM/state verification succeeded.
- No publish was performed.

## 2026-08-28 LPO page detail correction

- Draft page: `6a90e69e85b0d836c3e1cd94` (`/LPO`), not published.
- Preserved all supplied Korean copy without rewriting.
- Reused shared `sub-visual`, `sub-nav`, `intro-title`, `section-title`, `num-card`, `banner`, and `footer` components.
- Verified all four body sections use `no-container`; the live reference eDiscovery page has no existing `section-padding` selector, so no new global padding selector was introduced.
- Corrected service sequence numbers to `01`-`04`.
- Service hierarchy: topic `sub-lpo-content-title` bound to existing section content title size/line-height/letter-spacing and light-surface title variable; body `section-content-body text-body-invert`; detail title `section-micro-title text-title-invert`.
- Applied light card surface and border variables across `main`, `large`, `xl`, `medium`, `small`, and `tiny`.
- On `small`/`tiny`, removed service-body indentation and collapsed detail/card grids to one column.
- Designer snapshot verified the representative service row after canvas reload. Full-section snapshot returned an empty Designer response; no publish was performed.

### LPO service list component reuse

- Replaced four page-specific `sub-lpo-service-row` elements with four shared `num-row` component instances from the eDiscovery page.
- Preserved every supplied Korean sentence and original ordering in the component props.
- Used the `dark/base` variant because the LPO service section is a dark surface; Designer snapshot confirmed white text, white number circles, and divider contrast.
- Removed the wrapper's duplicated gap at all six breakpoints so spacing is owned by `num-row`.
- Existing proof and facility sections continue to use the shared `num-card` component.
- No publish was performed.

## 2026-08-28 LPO 전문성 카드 레이아웃 교체

- 대상 페이지: `해외소송 지원(LPO)` (`6a90e69e85b0d836c3e1cd94`)
- 대상 섹션: `검증된 전문성과 체계로 완성하는 해외소송 LPO`
- 기존 `num-card` 3개를 제거하고, `기업용 AI 도입` 페이지의 이미지 교차 그리드 구조와 기존 이미지 자산 3개를 재사용했다.
- 카드 제목과 본문은 기존 LPO 원문을 변경하지 않고 그대로 이전했다.
- 상위 레이아웃은 `sub-ai-adopt-consulting__grid`를 재사용했으며, 어두운 LPO 배경에 맞춰 제목은 `section-content-title + text-title`, 본문은 `section-content-body + regular + text-body`로 적용했다.
- MCP read-back에서 새 카드 3개, 이미지 asset ID, 전체 원문, 최종 selector 목록을 확인했고 Designer element snapshot으로 교차 배치와 텍스트 대비를 검증했다.
- Publish는 수행하지 않았다.

## 2026-08-28 LPO 서비스 섹션 surface inverse

- 대상: `sub-lpo-services` (`db5d8e69-5cda-731f-e321-190d344f0bf0`)
- `background-color`를 global `bg-secondary`와 동일한 `variable-811bec04-ba1b-1e66-30e6-adcb79e2a126`에 직접 연결했다. 신규 combo selector는 만들지 않았다.
- 내부 `section-title` 인스턴스를 `invert` variant로 변경했다.
- 내부 `num-row` 4개를 모두 `light` variant로 변경했다.
- style read-back과 Designer element snapshot에서 밝은 배경, 어두운 텍스트, 번호 배지 및 구분선 대비를 확인했다.
- Publish는 수행하지 않았다.

## 2026-08-28 Native YouTube scroll and playback remediation

- Scope: Docusign page `6a531d0c85ba94997412b0ce` and Luminance page `6a531d0dd02345c985f7c974`; no content, URL, title, CMS, component variant, or publish state was changed.
- Removed Docusign page HtmlEmbed `2bf0cdde-e4e7-ebfa-6f7e-598625ab23b0`. It contained the legacy click-to-enable buttons and `pointer-events` switching, including CSS priority overrides.
- Preserved all four Webflow-native `YouTubeVideo` elements and their native controls. Docusign videos remain `kViCtIzCDe8`, `rL8lPWy3E6A`, and `1nM30uwBBw0`; Luminance remains `BioPZqbot8A`.
- Added standalone global `youtube-native-player` and applied it as the exact sole style to all four native video elements. It fills the parent frame with absolute inset, 100% width/height, and zero padding.
- Updated `youtube-video-wrap` to `position: relative`, 100% width, 16:9 aspect ratio, and hidden overflow while preserving its existing 16px radius.
- Preserved Luminance's existing 100%, 16:9, variable-radius, hidden-overflow frame and added only the required relative positioning context.
- Added one idempotent site-footer manager marked `id-youtube-native-manager:v1`. It normalizes all YouTube embed iframes with `enablejsapi`, `playsinline`, `rel`, and `origin`; pauses other players when one plays; pauses players on hidden/pagehide; and cues the initial video after the ended state.
- Footer read-back confirmed one manager marker, all required lifecycle hooks, zero `!important`, and zero `pointer-events` rules. Existing search and release-board scripts were preserved.
- Element read-back confirmed exact `youtube-native-player` style lists on all four videos and zero matches for the removed legacy HtmlEmbed.
- Style read-back confirmed main values and empty local overrides at `medium`, `small`, and `tiny`, so all responsive breakpoints inherit the canonical main frame.
- Designer element snapshot returned an empty MCP response after the page canvas opened. DOM, settings, exact class, breakpoint, and custom-code read-back passed; post-publish browser verification remains pending because publish was not authorized.
- Native YouTube focus behavior remains subject to the cross-origin iframe: mouse and trackpad page scrolling are restored by removing the legacy pointer-event interception, but arrow keys intentionally continue to operate YouTube controls while the iframe itself owns keyboard focus.
- No publish was performed.

## 2026-08-28 Body typography and contrast normalization

- Normalized both canonical body roles to the same hierarchy: `section-content-body` and `section-micro-body` now resolve to `18px`, `161.8%`, and regular weight. `section-content-body` keeps its existing typography variables; `section-micro-body` now uses `type/section/micro/body/font-size` at `18px`.
- Removed the explicit responsive font-size overrides from the canonical `section-content-body` and `section-micro-body` globals so `main`, `medium`, `small`, and `tiny` inherit the same 18px source of truth.
- Increased body contrast without collapsing the title/body hierarchy: `color/text/body` changed from `#FFFFFFD1` to `#FFFFFFE0`, and `color/text/body-invert` changed from `#354A54` to `#263A44`.
- Audited all 42 site pages after isolating duplicate `section-micro-body` combo selectors. No page element referenced the isolated combos. Ten unused legacy combos were removed.
- One unused combo remains as `.text-body-invert.migration-temp-micro-body-4` (`69bcd822-3d2e-c64b-b65d-cd20543c517b`). Site-wide usage scan found zero element references, but Webflow MCP `remove_style` currently returns an internal error for this selector. It has no visual effect and remains a cleanup item rather than a runtime dependency.
- Variable and style read-back confirmed the stored 18px sizes and updated body colors. Designer snapshot of `sub-lpo-services` confirmed the brighter body contrast and preserved layout.
- No publish was performed.

### Site-wide YouTube completion

- Audited all 42 discoverable static, utility, CMS-template, catalog, and draft pages for both native `YouTubeVideo` elements and page-level `HtmlEmbed` elements.
- Additional video surfaces found after the Docusign/Luminance pass: Kiteworks native video `942e8289-3d4d-9834-3de6-cf45377e21a8` (`9M0a6DBdWP0`, `What Is Kiteworks`) and Reveal iframe embed `094ef9bb-a915-145b-afff-4c0d09ec2f8e` (`ROOKpNDYSUY`, `Reveal overview`).
- Applied exact sole style `youtube-native-player` to the Kiteworks native video. Its existing `youtube-video-wrap` parent inherits the already-verified canonical 16:9 frame.
- Reveal's existing `sub-reveal-intro__media` parent already stores relative positioning, 100% width, 16:9 ratio, hidden overflow, 20px radius, variable border, and variable background with no medium/small/tiny overrides; those values were preserved.
- The current MCP can create a native YouTube element but rejected writing its required video setting. The empty probe element was immediately removed and read back at zero matches. The working Reveal iframe and its URL/title were therefore preserved, assigned only `youtube-native-player`, and remain covered by the site-level YouTube IFrame API manager.
- Other audited HtmlEmbeds were non-video code: Careers presentation CSS/SVG, Insights hover CSS, Locations Google Maps, Litera marquee CSS, and an empty Release Notes attachment hook. They were not changed.
- Final read-back confirmed Kiteworks and Reveal exact class lists, the removed probe at zero matches, and no changes to video copy, URLs, page structure, component variants, CMS data, or publish state.
- Reveal Designer snapshot returned `status: false` after the canvas opened; DOM, class, settings, wrapper-style, and breakpoint read-back passed, while browser-level visual verification remains pending until an authorized publish or preview is available.
- No publish was performed.

### Docusign hidden-tab thumbnail quality correction

- Confirmed all three source videos provide real 1280x720 `maxresdefault.jpg` assets, so the blurred poster was not caused by missing high-resolution source thumbnails.
- Root cause was lifecycle timing: the eSignature and CLM panels start with `hidden` and `aria-hidden=true`, while YouTube manager v1 normalized and initialized every iframe at DOM ready. Hidden iframe viewports therefore had no usable rendered size, and tab activation reused that early player state.
- Replaced the single site-footer marker `id-youtube-native-manager:v1` with idempotent `v2`. V2 skips frames inside `[hidden]`, requires a rendered viewport of at least 200x200, observes `hidden`, `aria-hidden`, and `class` changes, and waits two animation frames after activation before normalizing and connecting the player.
- Preserved native YouTube controls, 16:9 wrapper geometry, API parameters, one-player-at-a-time pause behavior, hidden/pagehide pause behavior, and ended-state cue reset.
- Footer read-back confirmed zero v1 markers, exactly one v2 marker, the hidden/viewport guards, tab-state observer, double-frame scheduling, lifecycle controls, zero `!important`, and zero `pointer-events` rules.
- Live tab-flow capture could not run because the Codex in-app browser runtime failed to write its local kernel assets. Stored Webflow tab attributes, player settings, wrapper styles, source thumbnail dimensions, and custom-code read-back passed. Final customer-visible validation remains pending until preview/publish can execute the updated footer code.
- No publish was performed.

### 2026-08-28 Safe legacy migration gate audit

- Rechecked the Data Analytics `Structured Analytics` surface in the live Designer. The section root `ae7b77f7-fd29-e102-eafe-777fc213583b` resolves as a light `bg-secondary` surface, and the rendered headings, body copy, and three `num-badge size-lg is-brand` markers have readable dark/brand contrast. No color-class mutation was made from selector names alone.
- The same Data Analytics section still stores legacy/combo structure names including `sub-ai-adopt-process Copy`, `u-section-padding`, and `u-no-container`. The relevant padding selector is a combo path (`.sub-ai-adopt-process.u-section-padding`), so replacing the class list before selector-layer normalization could remove layout values. The root/container migration remains intentionally gated.
- Rechecked Docusign product tab panels. IAM remains `product-tabs__panel product-tabs__panel--active`; the hidden eSignature and CLM panels still store only `product-tabs__panel--active` together with `hidden` and `aria-hidden=true`.
- Attempted to normalize the two hidden panels to standalone `product-tabs__panel`, but Webflow rejected both writes with `One or more styles not found: product-tabs__panel`. No panel class, attribute, content, video, or interaction state changed. A global base selector must be normalized or recreated before retrying this migration.
- No temporary selector, custom CSS, `!important`, destructive cleanup, CMS mutation, component variant change, or publish was performed.

### 2026-08-28 Docusign product-tab selector normalization

- Completed the previously gated Docusign panel-class migration on page `6a531d0c85ba94997412b0ce` without changing tab content, attributes, videos, or interaction code.
- Registry inspection found one valid standalone base selector (`product-tabs__panel`, `23cc9c0b-5811-3783-921b-6de26282c846`), one valid active combo (`.product-tabs__panel.product-tabs__panel--active`, `9bdb176d-28fc-3131-ced1-7d3be12c233d`), and one reversed combo that reused the base name (`.product-tabs__panel--active.product-tabs__panel`, `5f3cf619-3f7c-cb82-a8a2-9d85f1a50054`). The reversed combo caused name-based MCP writes to reject the standalone base as ambiguous.
- Preserved the reversed combo and its stored properties but isolated its name as `migration-temp-product-tabs-panel-order`; it was not deleted. Docusign page usage read-back returned zero elements using the isolated name.
- Final exact panel state:
  - IAM `49ce6b20-e756-8d5d-e849-bf27fccf0044`: `product-tabs__panel product-tabs__panel--active`, `aria-hidden=false`;
  - eSignature `04ea9fcf-f013-3437-dc4a-adba61f5aca4`: `product-tabs__panel`, `hidden`, `aria-hidden=true`;
  - CLM `f032750f-b131-7ef5-f477-e8526a18f0eb`: `product-tabs__panel`, `hidden`, `aria-hidden=true`.
- Stored-state and selector-registry read-back passed. Designer snapshots of both the product-tabs root and active IAM panel returned empty MCP responses, so rendered verification remains pending and this normalization is not claimed as visually complete.
- No custom CSS, `!important`, selector deletion, CMS mutation, component variant change, or publish was performed.

### 2026-08-28 Insights CMS whitespace normalization

- Audited all seven CMS collections (122 staged items total). High-confidence visible whitespace defects were isolated to the 78-item Insights collection `6a508428578978d6ae556cfa`; Rich Text tag-boundary whitespace in Newsroom, Release Notes, and Careers was excluded as non-visible structure rather than edited.
- Used staged partial updates only. A one-item pilot confirmed omitted fields remained unchanged before the remaining work was applied in batches of at most five items.
- Updated 39 Insights items: 35 `summary` fields, 35 matching `seo-description` fields, two each of `name`, `seo-title`, and `thumbnail-alt`, and seven Rich Text `body` fields. These totals include the one-item pilot.
- Plain-text normalization removed only whitespace immediately before `. , ? !` and their CJK equivalents plus zero-width characters (`U+200B`–`U+200D`, `U+FEFF`). The two title records collapsed only repeated ASCII spaces. Numeric, parenthetical, English/product-name spacing, and `&nbsp;` were intentionally preserved.
- Rich Text normalization tokenized the stored HTML and changed text segments only; tag markup, attributes, links, lists, emphasis, and other structure were preserved.
- Full 78-item staged read-back returned zero mismatches against every requested field value. Remaining checks returned zero Summary punctuation-space rows, zero Summary zero-width rows, zero SEO-description punctuation-space rows, zero SEO-description zero-width rows, zero title-family repeated-space rows, and zero selected Body text-node punctuation-space matches.
- Completed the two previously missing-content cases without inventing legacy article copy. Slug `305` received a source-grounded Summary and matching SEO description, and its dedicated thumbnail alt, thumbnail image alt, and OG image alt were corrected from the unrelated robot-vacuum title to the article title. Slug `191` had its complete Rich Text Body restored from the public legacy `/post/191` source; Webflow resolved the lead image to the existing CDN asset on save.
- Extended the same text-node-only normalization to the remaining 49 Rich Text bodies in batches of at most five items. This removed only zero-width characters and ASCII whitespace immediately before punctuation while preserving HTML tags, attributes, links, images, emphasis, lists, and non-breaking spaces.
- Final full 78-item staged read-back returned: zero empty Summary fields, zero empty Body fields, zero preview/SEO punctuation-space rows, zero preview/SEO zero-width rows, zero repeated-title-space rows, zero Body punctuation-space rows, zero Body zero-width rows, and zero duplicate slugs. Slug `191` retained the expected heading and CDN image; all three slug `305` alt values exactly match its article title.
- A representative Insights card Designer snapshot returned an empty MCP response. Stored CMS verification passed, while rendered Designer verification remains pending.
- No CMS item publish, site publish, schema change, slug change, date/category/reference change, or custom CSS was performed.

### 2026-08-28 Weight variable mapping correction

- Confirmed the canonical Base collection scale: `Weight/Regular` 400 (`--weight--regular`), `Weight/Medium` 500 (`--weight--medium`), `Weight/SemiBold` 600 (`--weight--semibold`), and `Weight/Bold` 700 (`--weight--bold`). No `Font/Weight/*` variables existed before this correction.
- The stored style registry contained five invalid references: `.bold-parent.bold` and `.bold` used undefined `--font--weight-bold`; `.section-content-eyebrow.medium` used undefined `--font--weight-medium`; `.semibold-1-parent.semibold-1` used undefined `--font--weight-semibold`; `.regular-1-parent.regular-1` used undefined `--font--weight-regular`.
- Rebound `.bold-parent.bold`, `.semibold-1-parent.semibold-1`, and `.regular-1-parent.regular-1` directly to the canonical Bold, SemiBold, and Regular variable IDs. A same-value update also bound `.section-micro-eyebrow.medium` to canonical `Weight/Medium`; this does not change its computed value.
- Because the style API resolves duplicate selector names by name rather than the supplied selector ID, the remaining `.bold` and `.section-content-eyebrow.medium` rules could not be safely targeted without renaming classes. Added exact compatibility variables `Font/Weight-Bold` (`--font--weight-bold`, 700) and `Font/Weight-Medium` (`--font--weight-medium`, 500) instead. These make both stored references valid without changing element class lists or selector names.
- A mistakenly shaped trial alias `--font--weight--bold` was removed immediately. Final read-back contains only the two exact compatibility CSS names above, and every remaining `font--weight` string reference now resolves to an existing Number variable with the expected value.
- No element class, component, variant, breakpoint value, content, custom CSS, `!important`, publish, or selector deletion was performed.

### 2026-08-28 `intro-title` language variant font mapping

- Re-audited the active `intro-title` component (`43352630-4ca3-722b-7270-ff62ac820a04`) and its six variants. `English`, `English White`, and `English invert` already mapped `lang-variant` to `Font/En` (`variable-ad9aed0c-874f-af62-a7ff-0c57090bb8e1`), while `Base`, `KO White`, and `KO invert` had no stored font-family override and therefore fell back to the Base font.
- Mapped the three KO variants' `lang-variant` selector to `Font/Ko` (`variable-594caf2b-9394-0f5f-2379-2c30cab5c727`) at `main`. Existing EN mappings, surface colors, typography scale, weight, content props, visibility props, variant IDs, and structure were preserved.
- Read-back confirmed the final language matrix: Base / KO White / KO invert = `Font/Ko`; English / English White / English invert = `Font/En`. `medium`, `small`, and `tiny` contain no language override for the three modified KO variants and therefore inherit the `main` mapping consistently.
- The shared `/components` catalog instances inherit the updated component variants automatically; no catalog structure or prop change was required.
- A Designer snapshot of the known Data Analytics `intro-title` instance returned an empty MCP response. Variant stored-state and all modified breakpoint read-backs passed, but rendered snapshot verification remains pending.
- No page content, instance prop, class list, component structure, custom CSS, `!important`, or publish was changed.

## 2026-08-28 Typography and color override audit

- Site-wide audit scope: 42 pages, 54 component definitions, and 1,974 style selectors.
- Normalized active body typography paths so `section-content-body` and `section-micro-body` retain their variable-backed base size, 161.8% line-height, and regular weight without breakpoint-specific size or color contamination.
- Removed active duplicate weight/color overrides from canonical section typography combinations and neutralized the legacy `lang-variant` font-family override.
- Replaced the sole `intro-title-v2` catalog instance with the canonical `intro-title` component while preserving Variant, eyebrow, title, subtitle, body, and all visibility prop values.
- Unregistered the deprecated `intro-title-v2` component and removed its dedicated `heading-64 regular text-title-v2` selector.
- Read-back verification: `intro-title-v2` is no longer discoverable by component name; the replacement instance resolves to component `43352630-4ca3-722b-7270-ff62ac820a04` (`intro-title`) with the preserved content and visibility props.
- Visual snapshot verification was attempted twice after selecting the replacement instance, but Webflow returned HTTP 504 and then `status:false`. Structural and prop read-back passed; no publish was performed.
- Connector limitation: duplicate leaf selector names cannot always be targeted as a true global path through name-only style updates. Zero-use legacy selectors were not modified when exact targeting could not be verified.

## 2026-08-28 Final section typography variable scale

- Updated only the existing Typography collection semantic `type/section/*/*/font-size` variables. No selector, element class, component, content, CMS data, layout, color, weight, line-height, or custom code was changed.
- Final order is `Base / Tablet / Mobile L / Mobile`:
  - Head: eyebrow `22/20/19/18`, title `60/44/38/32`, subtitle `32/28/26/24`, body `26/24/23/22`.
  - Lead: eyebrow `20/18/17/16`, title `48/36/32/28`, subtitle `28/25/24/22`, body `24/22/21/20`.
  - Content: eyebrow `18/16/15/15`, title `30/27/25/24`, subtitle `24/22/21/20`, body `22/20/19/18`.
  - Micro: eyebrow `16/15/14/14`, title `26/23/21/20`, subtitle `22/20/19/18`, body `20/18/18/17`.
  - UI: eyebrow `14/13/13/12`, title `18/17/16/16`, subtitle `16/15/14/14`, body `16/15/14/14`.
- Base variable read-back confirmed all 20 semantic font-size variables. Each mode update response confirmed the corresponding stored value; the timed-out Tablet eyebrow batch was retried successfully.
- Designer element snapshots for the homepage head title and head body returned an empty response, so rendered snapshot verification remains pending. No production publish was performed.

## 2026-08-28 Header `#top` interaction boundary correction

- The supplied rendered DOM confirmed the shared header root is `div#top.header`, while the existing desktop expansion selector was limited to `.header__nav:hover` / `.header__nav:focus-within`. The language dropdown lives under `.header__actions`, outside `.header__nav`, so opening or entering the language list did not own the expanded header region.
- Added one idempotent site-head block, `id-header-top-boundary`, scoped to desktop pointer environments. `#top.header:hover` and `#top.header:focus-within` now own the expanded padding and surface state, so navigation, language, logo, CTA, and other header descendants share one continuous boundary.
- The expanded padding uses `max(var(--header-content-height, 0px), 65px) + 12px`: measured navigation panels can still grow the header further, while the language dropdown receives a stable minimum interaction corridor even before a navigation menu has been measured.
- Leaving the actual `#top` box removes `:hover` and collapses through the existing header transition. Native Webflow Dropdown markup, menu links, language links, search, mobile drawer, component props, and DOM structure were preserved.
- Site-head read-back confirmed exactly one marker, both `#top` selectors, the 65px minimum-height fallback, desktop-only scope, zero `!important`, and zero new `:has()` selector. Runtime hover traversal remains pending because the change is unpublished. No production publish was performed.

### Superseded after interaction regression

- The `id-header-top-boundary` hover block above was removed after testing exposed a self-retaining hover region: expanding `#top` enlarged the same hit area that owned `:hover`, preventing collapse and conflicting with native Dropdown click state.
- Root-cause audit found two additional controller conflicts. Applied `id_header_dropdown_boundary` 1.0.2 captured `mouseout`, called `stopImmediatePropagation()`, and invoked `toggle.click()` while moving between menu items. Applied `id_header_overlay_states` 1.0.2 created a hidden fake `.header__menu-list` beside the real language dropdown to mirror `w--open`.
- Replaced the applied scripts with `id_header_dropdown_boundary` 1.0.4 and `id_header_overlay_states` 1.0.3. Webflow native Dropdown now owns normal open/close behavior. The boundary controller only observes the real `.header__menu-list.w--open` and `.header__lang-list.w--open`, synchronizes `has-open-menu` and the body-level backdrop, and closes real open dropdowns when the pointer or keyboard focus leaves the complete Header.
- Removed all capture-level `mouseout` suppression, menu `mouseenter` forced clicks, and the fake language-menu mirror. Overlay 1.0.3 retains only the required search-open and native language-list display rules.
- Added one state-only head block, `id-header-open-surface-state`. Header expansion now depends on `#top.header.has-open-menu`, not `#top:hover`; therefore the expanded area cannot keep itself open. The existing measured panel height remains supported with a 65px minimum for the compact language menu.
- Final read-back: boundary `1.0.4`, overlay `1.0.3`, all 15 pre-existing applied script entries preserved, no `mouseout` capture, no menu-enter click, real language selector present, fake mirror absent, one state marker, no hover-owned expansion, and no `!important`. Runtime pointer traversal remains pending because the changes are unpublished. No production publish was performed.

### Header close-position shift correction

- The remaining close-time position jump came from animating `padding-bottom` on the `#top.header` layout box. Collapsing that padding changed the header's actual box height, so the document/reference position moved while the dropdown was closing.
- Reworked `id-header-open-surface-state` so the Header root remains at its stable 80px layout height with `padding-bottom: 0`. Desktop overflow is visible for the existing absolute dropdown panels.
- The existing first child `.header__surface` now owns the visual expansion: 80px closed and `80px + measured content height + 12px` while `has-open-menu` is active. Surface height and colors retain the existing easing, but the page flow no longer changes.
- Read-back confirmed one state marker, fixed root padding, visible overflow, 80px closed surface, open-state expansion only on `.header__surface`, no open-state root padding, and zero `!important`. Runtime pointer/position validation remains pending because the changes are unpublished. No production publish was performed.

### 2026-08-28 Careers interview modal visibility repair

- Diagnosed the Careers `보러가기` failure as a presentation-state mismatch rather than a broken trigger. The trigger stores `data-modal-open="interview-ediscovery-pm"`, and the dialog root stores the matching `data-modal="interview-ediscovery-pm"`; the existing controller opens the root, applies scroll lock and focus handling, and supports backdrop, close-button, and Escape dismissal.
- The Careers panel was left at `opacity: 0` and `filter: blur(12px)`, while the controller toggled the unstyled `is-careers-visible` state. The later shared `.ui-modal-surface` selector also stored `opacity: 0`, so changing only the page-specific selector would still lose in the cascade.
- Normalized visibility ownership: `.sub-careers-modal__panel` now stores `opacity: 1`, `filter: blur(0px)`, and its existing geometry/transition values; `.ui-modal-surface` now stores `opacity: 1`. The modal root remains the sole closed/open owner through `hidden`, `aria-hidden`, backdrop opacity, pointer-event blocking, and the existing `is-visible` state.
- Stored DOM read-back confirmed the exact trigger element, matching modal key, dialog accessibility attributes, exact root classes `sub-careers-modal ui-modal-backdrop`, and exact panel classes `sub-careers-modal__panel ui-modal-surface`. Style-registry read-back confirmed both relevant selectors at `opacity: 1` and the Careers panel at `blur(0px)` with no responsive overrides returned.
- No modal copy, link target, media, DOM structure, component variant, custom JavaScript, `!important`, CMS data, or publish state changed.
- Browser click-through validation could not run because the Codex in-app browser runtime failed to write its local kernel assets. Stored-state verification passed; customer-visible runtime verification remains pending until an authorized preview/publish is available.

### 2026-08-28 Header submenu hover-boundary repair

- Diagnosed the disappearing desktop submenu as a native Webflow Dropdown hit-area gap. The shared header is 80px tall, but `.header__menu` previously occupied only its text-height while `.header__menu-list` was absolutely positioned at `top: 50px`; moving from a toggle toward its panel could therefore leave the Dropdown root before reaching the panel.
- Kept the native Webflow Dropdown structure and behavior. At `main`, `.header__nav` now uses `align-self: stretch`, `.header__menu` uses `align-self: stretch` with centered content, and `.header__menu-list` is anchored at `top: 100%` so the trigger, header-height hover region, and submenu form one continuous interaction boundary.
- The submenu consequently remains open while the pointer moves from its top-level item into the panel and closes through Webflow's existing native leave behavior only after the pointer leaves the menu/panel boundary. No synthetic hover controller, custom JavaScript, `!important`, or arbitrary close timer was added.
- MCP style read-back confirmed the three exact global selectors and their final `main` values. No medium, small, or tiny override was introduced; the existing separate mobile header behavior remains unchanged.
- A Designer snapshot of the shared `header` component confirmed the desktop header layout remained aligned after the geometry change. Interaction click-through on unpublished state could not be exercised by the unavailable in-app browser runtime.
- No header copy, links, component props or variants, mobile drawer, CMS data, or publish state changed.

### 2026-08-28 Header-owned dropdown boundary and backdrop motion

- Refined the desktop interaction boundary from each individual `.header__menu` to the complete shared `.header` region, including its open submenu descendants. Registered and applied the focused inline script `id_header_dropdown_boundary` version `1.0.0` at the site footer.
- The controller preserves Webflow's native Dropdown elements and state. It suppresses only premature menu `mouseout` events whose destination remains inside the same header, closes sibling menus when entering another top-level menu, and closes all open menus on the shared header's actual `mouseleave`. Keyboard focus leaving the header closes the same state as an accessibility fallback.
- Added the single site-head runtime style block `id-header-dropdown-layer`, because Webflow-generated `.w--open` and `.is-closing` runtime states and the header pseudo-element backdrop cannot be expressed as static component selectors through the Designer style layer.
- While a desktop submenu is open, the header receives a denser inverse surface, stronger border, and restrained shadow. The fixed backdrop covers the complete viewport with `inset: 0`, `rgba(1, 10, 16, .56)`, 8px blur, and reduced saturation; the header container and open submenu remain on the higher internal layer. The backdrop uses `pointer-events: none` so it does not create a second interaction trap.
- Submenu entry uses a 320ms `cubic-bezier(.16, 1, .3, 1)` opacity/translate/scale/blur transition. Exit uses the existing `is-closing` lifecycle with a 220ms `cubic-bezier(.4, 0, 1, 1)` reverse transition. The backdrop/header use the shared 280–320ms emphasized easing, and `prefers-reduced-motion` reduces all of these transitions to effectively immediate state changes.
- Final script/code read-back confirmed exactly one applied `id_header_dropdown_boundary` v1.0.0, exactly one `id-header-dropdown-layer` marker, the internal-boundary guard, the header-level leave handler, both motion paths, reduced-motion support, zero `!important`, and preservation of the existing YouTube manager footer marker.
- The changes are scoped to desktop pointer/hover environments at 992px and above. Mobile header/drawer behavior, header copy and links, components/variants, CMS data, and publish state were not changed.
- Stored-state verification passed. Customer-visible runtime hover/backdrop verification remains pending until an authorized preview/publish is available; no publish was performed.

- The pseudo-element backdrop did not render reliably through the header's Webflow stacking context, so it was replaced rather than layered over. Added one real `header__backdrop` Div as the first child of the shared `header` component (`02040faf-f7ea-693a-a90f-c3bd47d360a9`) with `data-header-backdrop="true"` and `aria-hidden="true"`; all component instances inherit it.
- Created the standalone global `.header__backdrop` selector with fixed full-viewport `inset: 0`, hidden/zero-opacity base state, `rgba(1, 10, 16, .56)`, 8px blur with reduced saturation, no pointer events, and the existing 280ms visibility transition.
- Upgraded `id_header_dropdown_boundary` to v1.0.1. A subtree class observer now synchronizes the real backdrop Div's `is-visible` and `aria-hidden` states and the header's `has-open-menu` state from native `.header__menu-list.w--open` changes.
- Replaced the runtime block atomically: `.header__backdrop.is-visible` is now the sole open-state rule; the failed `header::before` and `:has(...)` paths are both zero. Final read-back confirmed one real backdrop selector, one runtime marker, v1.0.1 applied once, full-screen inset, explicit ARIA synchronization, zero pseudo backdrop rules, zero `:has`, and zero `!important`.
- The `/components` catalog header instance inherits the shared component's new internal Div automatically; no instance prop, variant, or catalog slot topology changed.

- Final topology correction: the backdrop must not inherit the header component's stacking context. Removed element `02040faf-f7ea-693a-a90f-c3bd47d360a9` from the shared header definition; exact-ID read-back now returns `Element not found`, so no static backdrop remains inside the component or its catalog instance.
- Upgraded `id_header_dropdown_boundary` to v1.0.2. It creates or reuses one `.header__backdrop` element and moves it to `document.body` as the first direct child before synchronizing native Dropdown state. This keeps the backdrop outside every header instance while remaining site-wide and idempotent.
- The body-level backdrop runtime geometry is explicit: `position: fixed`, `top: 0`, `left: 0`, `width: 100vw`, `height: 100vh`, and `z-index: 999`; the shared header remains at `z-index: 1000`. The base hidden/opacity/blur/transition values and pointer-event pass-through remain unchanged.
- Final read-back confirmed v1.0.2 applied once, direct `document.body.insertBefore` placement, explicit Div creation, all viewport geometry values, zero pseudo backdrop rules, zero `:has`, and zero `!important`. No publish was performed.

### 2026-08-28 Insights slider horizontal-overflow containment

- Confirmed the shared Insights slider uses `sub-gallery__arrow-prev` / `sub-gallery__arrow-next` controls positioned beyond the viewport edge. The arrows themselves, Swiper track, card geometry, and navigation behavior were preserved.
- Applied `overflow: hidden` only to the relevant section roots: shared INDA `sub-gallery`, homepage `main-insights`, eDiscovery `sub-ediscovery-insights`, K-Discovery `sub-kdisc-insights`, and Data Analytics `sub-data-analytics-insights`.
- Each exact selector update returned the stored `main` value `overflow: hidden`. No medium, small, or tiny override was introduced, so all lower breakpoints inherit the same containment rule.
- No inner viewport, slider track, arrow component/variant, CMS binding or content, custom CSS, `!important`, or publish state changed.

### 2026-08-28 Header overlay containing-block migration

- Migrated the shared Header component `ce592e07-2e11-1f60-55a0-dab536e25ba9` without changing header copy, links, typography, spacing, native Dropdown structure, component props, or variants.
- Added one first-child decorative Div `5e3485e5-811d-9c65-d2b8-9e51e68df351` with the exact class list `header__surface` and `aria-hidden="true"`. The `/components` catalog and every Header instance inherit this shared component structure automatically.
- Created the standalone global selector `.header__surface` (`17ce5416-1e83-bd49-f974-8bf289841a32`) with the former Header visual surface: `rgba(6, 9, 14, 0.72)`, `blur(16px) saturate(120%)`, absolute full inset, `z-index: 0`, and no pointer events.
- Removed only `background-color` and `backdrop-filter` from the global `.header` selector (`c35018d6-3d74-037c-28ab-aa374c62fe8e`). The root retains its fixed positioning, top offset, `z-index: 1000`, full width, and existing bottom border. This removes the filtered ancestor that previously changed the containing block of the fixed search panel.
- Set `.header__container` (`d6dfa21c-6053-590c-4370-eae0821f5c27`) to `position: relative` and `z-index: 1`, keeping all header content and native Dropdown controls above the decorative surface.
- Exact element read-back confirmed one surface element, its exact class and ARIA attribute, and root order `header__surface` before `header__container`. Exact style-ID read-back confirmed the final values above. No `medium`, `small`, or `tiny` overrides exist on the three changed selectors, so those breakpoints inherit the verified `main` state.
- Designer snapshot verification timed out with HTTP 504. Stored component topology and responsive selector state passed, but search centering, EN/KO dropdown extension below the bar, and mobile drawer behavior remain customer-visible runtime verification items and are not claimed as visually complete.
- No script, CMS data, localization content, custom CSS block, `!important`, or publish state changed.

### 2026-08-28 Header search visibility and language hover boundary

- Reproduced the stored-state cause of the search backdrop-only result: native `.header__search-panel` opened, but `.header__search-inner` remained permanently at `opacity: 0`, `filter: blur(12px)`, and `transform: scale(0.985)`. The panel's base `display: none` also required an explicit flex value for its generated `.w--open` runtime state to use the stored centering properties.
- Registered and applied `id_header_overlay_states` version `1.0.2` as the fifteenth and final footer script. Its scoped runtime rules set `.header__search-panel.w--open` to flex and reveal only its existing `.header__search-inner` through `opacity: 1`, `blur(0)`, and `scale(1)`. Existing panel dimensions, backdrop color, dialog surface, copy, form, close control, and responsive widths were preserved.
- Kept the native language Dropdown structure. Updated wrapper `ced00009-1345-7c9c-8935-280ca29ab9c0` to the exact attributes `data-hover=true`, `data-delay=0`, and `data-dropdown-exit-motion=true`, so leaving its DOM hover boundary closes it without the previous 350ms linger.
- The same applied `id_header_overlay_states` version bridges `.header__lang-list.w--open` into the already verified `id_header_dropdown_boundary` v1.0.2 body-level backdrop state. This makes the language control use the same Header DOM boundary and backdrop ownership as the desktop navigation without adding a second backdrop controller.
- Site script read-back confirmed all fourteen previous footer scripts were preserved and `id_header_overlay_states` v1.0.2 is applied exactly once. CDN source read-back confirmed the search open-state selectors and language bridge code. Attribute read-back confirmed the exact final language wrapper values.
- Two exploratory registered versions were not applied: an empty `id_header_dropdown_boundary` v1.0.3 and `id_header_language_backdrop_bridge` v1.0.0/v1.0.1. They remain inert registry history because registered-script deletion was not authorized; none appear in the site applied-script list.
- Customer-visible click/hover verification still requires an available unpublished Designer runtime or an authorized preview/publish. No publish, CMS data, localization content, Header copy/link, component prop/variant, or `!important` change was performed.
