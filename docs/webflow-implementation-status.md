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
