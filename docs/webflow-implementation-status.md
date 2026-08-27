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
- `section-title-eyeblow` uses `Body/01/Size` (24px) and `141%` line height. Existing smaller-breakpoint overrides remain unchanged.
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
