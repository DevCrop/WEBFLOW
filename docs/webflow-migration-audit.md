# Webflow One-Class First Migration Audit

Audit date: 2026-07-08

Site ID: `6a38f39fe95d43bbdbe5c71c`

Implementation status: first live migration pass applied on 2026-07-08.

No publish was performed.

## Target Pages

| Scope | Page ID | Title | Path | Status |
| --- | --- | --- | --- | --- |
| components | `6a4bd40508286c7ea12b731a` | Components | `/components` | draft |
| main | `6a38f3a0e95d43bbdbe5c758` | 홈 | `/` | live page |
| about | `6a3c82d462d1516e899d7fec` | About Us | `/page-about-us` | live page |
| docusign | `6a48b6aa23d56c4e126d23d2` | Docusign® | `/page-docusign` | live page |
| legal system | `6a48b6abc9c50156728b3e4e` | Legal System | `/page-legal-system` | draft |

## Variable Audit

Current collection:

- `collection-38609b8c-58ae-0475-189f-c192f775f492` - Base collection

Current variable groups found:

- `Color/Base/*`
- `Color/Brand/*`
- `Color/Bg/*`
- `Color/Border/*`
- `Color/Gray/*`
- `Color/Text/*`
- `Display/01/*`
- `Display/02/*`
- `Display/03/*`
- `Heading/01/*` through `Heading/06/*`
- `Body/01/*` through `Body/04/*`
- `Font/Base`
- `Font/En`
- `Font/Ko`
- `Layout/Container`
- `Layout/Gutter`
- `Weight/Regular`
- `Weight/Medium`
- `Weight/SemiBold`
- `Weight/Bold`

Semantic variables still needed:

- `space/section/padding-y-desktop`
- `space/section/padding-y-tablet`
- `space/section/padding-y-mobile`
- `space/card/padding-desktop`
- `space/card/padding-mobile`
- `space/grid/gap-desktop`
- `space/grid/gap-tablet`
- `space/grid/gap-mobile`
- `type/section-title/*`
- `type/section-desc/*`
- `type/card-title/*`
- `type/card-desc/*`
- `type/banner-title/*`
- `type/banner-desc/*`
- `size/card-num/*`
- `size/cta-banner/*`

Variable cleanup notes:

- Color naming currently mixes `Color/...` and lowercase `color/...`.
- Background tokens currently use `Color/Bg/*`; target convention is `color/background/*`.
- Existing typography variables are hierarchy-based; target semantic component variables still need aliases or additions.
- No destructive variable deletion has been performed.

## Style/Class Audit

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

Observed utility/style families to absorb:

- `grid`, `grid-2`, `grid-3`, `grid-4`, `grid-6-6`, `grid-4-8`, `grid-3-9`, `grid-2-10`, `grid-7-5`, `grid-8-4`, `grid-10-2`, `grid-12`
- `lg-grid-*`, `md-grid-*`, `sm-grid-*`
- `span-*`, `lg-span-*`, `md-span-*`, `sm-span-*`
- `gap-sm`, `gap-md`, `gap-lg`
- `stack-sm`, `stack-md`, `stack-xl`
- `flex`, `flex-col`, `flex-center`, `flex-between`, `flex-wrap`
- `heading-1` through `heading-6`
- `body-1` through `body-4`
- `text-center`, `text-title`, `text-body`, `text-title-invert`, `text-body-invert`
- `fm-base`, `fm-ko`, `fm-en`
- `regular`, `bold`
- `bg-primary`, `bg-secondary`, `bg-inverse`
- `surface-primary`, `surface-secondary`, `surface-elevated`
- `border`, `border-strong`, `border-inverse`
- `padding-x-*`, `padding-y-*`, `margin-0`
- `radius-lg`, `h-full`

### Duplicate Or Generated Names

Observed duplicate/generated classes:

- `button 2`
- `button-inner 2`
- `button-icon 2`
- `banner 2`
- `banner-inner 2`
- `banner-body 2`
- `banner-actions 2`
- `cta-banner 2`
- `cta-banner 3`
- `cta-banner 5`
- `cta-banner 6`
- `cta-banner 7`
- `cta-banner 8`
- `cta-banner 10`
- `breadcrumb-arrow 2`
- `breadcrumb-trigger 2`
- `Section 2`

### Delete Candidates

Delete only after user confirmation:

- `no-container`
- `right`
- `about-standard-item`
- `sub-feature-copy`
- `sub-feature-1`
- `sub-feature-image-wrap`
- `sub-feature-image-placeholder`
- `sub-feature-image-label`
- `sub-short-banner`
- `sub-cta-banner`
- `sub-cta-banner-inner`
- `banner-box`
- `banner-box-1`
- `value-card-list`
- `mission-list`
- `tab-container`
- `global-left`
- `global-wrap`
- `global-button-wrap`
- legacy generic classes matching `left`, `mid`, `right`, `txt`, `cnt`, `item`, `list`, `link`, `cta`, `lang`

No destructive class deletion has been performed.

## Applied Migration Pass

The first implementation pass updated the actual Webflow pages by replacing the highest-impact utility combinations with One-Class First role classes. This pass did not delete global classes or publish the site.

Created or updated role styles:

- `main-hero-inner`
- `main-hero-title`
- `main-hero-desc`
- `main-service-grid`
- `main-service-title`
- `main-service-desc`
- `main-client-list`
- `main-client-title`
- `main-client-desc`
- `main-cta-title`
- `main-stat-number`
- `about-hero-title`
- `about-hero-desc`
- `about-overview-title`
- `about-overview-desc`
- `about-value-grid`
- `about-value-title`
- `about-value-card`
- `about-history-title`
- `about-history-list`
- `about-location-title`
- `about-location-desc`
- `header-actions`
- `sub-visual-title`
- `sub-intro`
- `sub-feature`
- `sub-feature-grid`
- `sub-feature-title`
- `sub-feature-card-desc`
- `sub-normal-banner-title`
- `sub-normal-banner-desc`
- `sub-cases-title`
- `sub-cases-grid`
- `case-card-desc`
- `sub-solution-grid`
- `cta-banner-title`
- `cta-banner-desc`
- `legal-hero-title`
- `legal-overview-title`
- `legal-overview-desc`
- `legal-feature-title`
- `legal-feature-desc`

Element-level utility combinations removed from target pages:

- main: `grid-3`, `gap-lg`, `heading-1`, `body-2`, `right`
- about: `grid-3`, `gap-lg`, `heading-1`, `body-2`, `about-standard-item`
- docusign: `grid-3`, `gap-lg`, `heading-1`, `body-2`, `sub-feacture-grid`
- legal system: `grid-3`, `gap-lg`, `heading-1`, `body-2`

Final read-back for the utility classes above returned zero matches on the four target pages.

Notes:

- Role styles were created with equivalent visual values from the existing utility classes.
- Some newly created role styles still need a later variable-binding hardening pass because the Webflow style tool returned an internal error when `variable_as_value` was used for these new styles.
- No duplicate/generated classes were deleted in this pass.
- `/components` catalog was not published.

## Page Findings

### Main

Page ID: `6a38f3a0e95d43bbdbe5c758`

Observed utility combinations:

- `grid grid-3`
- `grid-6-6`
- `grid-4`
- `grid-3`
- `inner gap-lg flex-center`
- `heading-1`
- `text-center heading-1`
- `body-2`
- `right`

Migration direction:

- Absorb grid and gap into `main-service-grid`, `main-client-list`, or the relevant section role class.
- Replace heading/body utility combinations with `main-*-title` and `main-*-desc`.
- Replace `right` with a component-owned or section-owned role class.

2026-07-08 detail correction pass:

- Confirmed section elements still used only `h-full`, `padding-y-xl`, or `Section padding-y-xl`.
- Applied representative section classes: `main-hero`, `main-core-service`, `main-business`, `main-solution`, `main-office`, `main-value`, `main-clients`, `main-insights`, `main-news`, `main-cta`.
- Renamed generic Core Service styles: `service-bg` -> `main-core-service-card-bg`, `service-card` -> `main-core-service-card`, `service-text` -> `main-core-service-card-body`, `service-text-title` -> `main-core-service-card-title-wrap`.
- Replaced `section-title flex-between` with `main-core-section-title`.
- Replaced the CTA inner reuse of `main-hero-inner` with `main-cta-inner`.
- Replaced confirmed Core Service H4 `heading-6` usage with `main-core-service-card-title`.
- Replaced confirmed `global-office border border-strong Section padding-y-xl bg-primary` and `global-office border border-strong` with `main-office-feature` and `main-office-card`.
- Residual risk: large MCP reads timed out, so deeper elements outside the confirmed IDs still need another smaller scoped pass before calling main fully complete.

2026-07-08 BEM migration pass:

- Adopted main BEM naming for newly migrated main sections and wrappers.
- Renamed main-only styles:
  - `main-hero-container` -> `main-hero__container`
  - `main-hero-txt` -> `main-hero__content`
  - `main-hero-arrow-container` -> `main-hero__scroll`
  - `main-service-grid` -> `main-core-service__grid`
  - `main-why-card` -> `main-core-service__card`
  - `main-why-icon-box` -> `main-core-service__icon`
  - `main-cta-inner` -> `main-cta__inner`
- Created shared wrappers: `container-xl`, `section-inner`, `main-section-title`, `main-section-desc`.
- Applied BEM/shared wrappers to confirmed main sections:
  - hero
  - core service
  - business proof
  - solution stats
  - services
  - office/global infrastructure
  - clients
  - insights
  - CTA
- Corrected section naming:
  - the `Core Services` list section now uses `main-services`
  - the `Global Infrastructure` section now uses `main-office`
- Preserved Swiper runtime classes as functional exceptions: `swiper`, `swiper-wrapper`, `swiper-slide`.
- Deletion status:
  - Old renamed class names no longer exist as active style names.
  - `no-container`, `no-container-xl`, `inner`, `contents`, `flex-*`, `grid-*`, `gap-*`, `text-*`, `bg-*`, and typography combo classes were not globally deleted because remaining usage could not be proven zero across all pages and the news section timed out.
- Residual issue:
  - `heading-1`, `body-2`, and `display-1` have duplicate combo/global naming conflicts. The Webflow MCP resolves some typography-only assignments back to combo stacks such as `text-center heading-1`, `sub-solution-table-body-list-desc body-2`, or `fm-ko display-1`.
  - A later typography cleanup pass should remove or rename these duplicate combo classes, then recreate/verify the global typography classes.
  - The main news section still needs a scoped pass; even `limit: 8` timed out through MCP.

2026-07-08 main services scoped correction:

- Target section: `main-services` (`b303c173-4385-802a-62b7-ffcbd631a929`) on main page `6a38f3a0e95d43bbdbe5c758`.
- Problem confirmed: section internals used mismatched legacy/service names such as `section-contents`, `service-col`, `main-core-service-card`, `main-core-service-card-bg`, `service-arrow`, `main-core-service-card-body`, `main-core-service-card-title-wrap`, and card utility combos.
- Renamed style families so the section owns its internals:
  - `service-col` -> `main-services__col`
  - `main-core-service-card` -> `main-services__card`
  - `main-core-service-card-bg` -> `main-services__card-bg`
  - `service-arrow` -> `main-services__card-arrow`
  - `main-core-service-card-body` -> `main-services__card-body`
  - `main-core-service-card-title-wrap` -> `main-services__card-title`
- Applied section-matched wrappers:
  - `main-section-title` -> `main-services__head`
  - `section-contents` -> `main-services__contents`
- Removed visible utility combos from the scoped section:
  - service cards now use only `main-services__card`
  - service descriptions now use only `body-4`
- Read-back confirmed no `main-client-*`, `main-core-service-*`, `service-col`, `service-arrow`, `border`, `border-strong`, `text-primary`, `text-secondary`, or multi-body text combo remains inside the scoped `main-services` section.

2026-07-08 main core naming correction:

- User correction: the section content is `Core Services`, so the section should not be named `main-services`. Renamed the scoped section family from `main-services` to `main-core`.
- Renamed style families:
  - `main-services` -> `main-core`
  - `main-services__head` -> `main-core__head`
  - `main-services__contents` -> `main-core__contents`
  - `main-services__grid` -> `main-core__grid`
  - `main-services__col` -> `main-core__col`
  - `main-services__card` -> `main-core__card`
  - `main-services__card-bg` -> `main-core__card-bg`
  - `main-services__card-arrow` -> `main-core__card-arrow`
  - `main-services__card-body` -> `main-core__card-body`
  - `main-services__card-title` -> `main-core__card-title`
- Read-back confirmed the scoped Core Services section now uses `main-core__*` internals.

2026-07-08 main why scoped correction:

- Problem confirmed: `main-why` still contained shared or wrong-section internals: `section-inner`, `main-section-title`, `section-contents`, `main-core-service__grid`, `main-core-service__card`, `main-core-service__icon`, `main-core-service__card-body`, `text-center heading-1`, and `sub-solution-table-body-list-desc body-2`.
- Applied section-owned classes:
  - `section-inner` -> `main-why__inner`
  - `main-section-title` -> `main-why__head`
  - `section-contents` -> `main-why__contents`
  - `main-core-service__grid` -> `main-why__grid`
  - `main-core-service__card` -> `main-why__card`
  - `main-core-service__icon` -> `main-why__icon`
  - `main-core-service__card-body` -> `main-why__card-body`
  - `text-center heading-1` title lines -> `main-why__title-line`
  - `sub-solution-table-body-list-desc body-2` descriptions -> `main-why__card-desc`
- Read-back at that point confirmed no `main-core-service__*`, `section-inner`, `main-section-title`, `text-center`, or `sub-solution-table-body-list-desc` remained inside the scoped `main-why` section. `section-contents` was later restored as a shared contents-area wrapper in the correction below.

2026-07-08 main contents common correction:

- User correction: `section-contents` is a shared contents-area wrapper, not a section-owned BEM element.
- Applied on the main page:
  - `main-core__contents` -> `section-contents`
  - `main-why__contents` -> `section-contents`
- Read-back confirmed `main-core` and `main-why` now use common `section-contents` while keeping section-owned `head`, `grid`, `card`, `card-bg`, `card-body`, and related layout classes.
- Attempted to rename `main-cta-title` -> `main-consulting__title`, but Webflow reported style `main-cta-title` was not found in the style registry.
- `main-core__card-bg` is valid inside `main-core`; if it appears inside `main-insights`, it must be replaced on those specific insight elements only. Do not rename the global `main-core__card-bg` style because that would break the legitimate Core Services cards.

2026-07-08 main cleanup pass:

- Completed Webflow cleanup:
  - Removed confirmed unused style `main-core__contents` after its element was changed to common `section-contents`.
  - Removed confirmed unused style `main-why__contents` after its element was changed to common `section-contents`.
  - Renamed `main-consulting-title` -> `main-consulting__title`.
- Additional Webflow cleanup was stopped by the tool usage limit before the next rename batch could run.
- Next main rename candidates:
  - `main-hero-arrow` -> `main-hero__arrow`
  - `main-client-list` -> `main-clients__list`
  - `main-client-desc` -> `main-clients__desc`
  - `number-contents` -> `main-num__contents`
  - `number-item-head` -> `main-num__item-head`
  - `number-item-body` -> `main-num__item-body`
  - `main-stat-number` -> `main-num__stat-number`
  - `global-left` -> `main-global__left`
- Delete candidates that still need usage-zero verification before removal:
  - `main-core-service__card-title`
  - `main-core-section-title`
  - `main-service-title`
  - `main-service-desc`
  - `main-hero-title`
  - `main-hero-desc`
  - `contents`
  - `inner`
  - `Section 4`
  - `button-inner 2`
  - duplicate generated CTA/banner variants such as `cta-banner 2`, `cta-banner 3`, `cta-banner 5`, `cta-banner 6`, `cta-banner 7`, `cta-banner 8`, `banner 2`, `banner-body 2`, `button-icon 2`.
- Important constraint: do not globally rename or remove `main-core__card-bg` until the `main-insights` element using it is identified. `main-core__card-bg` is still valid for the Core Services cards.

### About

Page ID: `6a3c82d462d1516e899d7fec`

Observed utility combinations:

- `grid-6-6`
- `value-card-list grid-3 gap-lg`
- `grid-3`
- `grid-2`
- `flex-col gap-lg`
- `heading-1 fm-en`
- `text-center heading-1`
- `body-2 text-body`
- `about-standard-item`

Migration direction:

- Absorb `value-card-list grid-3 gap-lg` into `about-value-grid`.
- Absorb `about-standard-item` into `about-overview-*`, `about-value-card`, or the exact section role after structure confirmation.
- Replace heading/body combinations with `about-*-title` and `about-*-desc`.

2026-07-08 detail correction pass:

- Confirmed first visible About section still had `Section 2`, `sub-visual-container no-container`, `inner sub-visual-inner regular regu`, `flex flex-col`, and `heading-6`.
- Applied role classes: `about-hero`, `about-visual-container`, `about-visual-inner`, `about-hero-kicker-box`, `about-hero-title-box`, `about-hero-eyebrow`, `about-hero-lead`.
- Replaced the visible sub navigation `no-container` with `sub-nav-container`.
- Residual risk: About has 323 elements and large MCP reads timed out, so remaining sections need smaller scoped passes before claiming full page completion.

### Docusign

Page ID: `6a48b6aa23d56c4e126d23d2`

Observed utility combinations:

- `grid-2 gap-lg`
- `sub-feacture-grid padding-y-xl`
- `grid-3 gap-lg`
- `flex flex-col`
- `heading-1 fm-en`
- `heading-1 fm-ko text-title`
- `text-center heading-1 text-title-invert`
- `body-2 text-body`
- `body-2 text-body-invert`
- `sub-solution-table-body-list-desc body-2 text-body-invert`

Migration direction:

- Rename or absorb typo class `sub-feacture-grid` into `sub-feature-grid`.
- Absorb layout utilities into `sub-feature-grid`, `sub-cases-grid`, `product-tabs-panel`, and `cta-banner`.
- Replace title/body/invert combinations with section-owned classes.
- Keep `card-num` as shared.

2026-07-08 scoped BEM correction pass:

- Designer current page was confirmed as `Docusign®` (`6a48b6aa23d56c4e126d23d2`), not the main page, even though the visible Navigator still showed several main-prefixed or generic legacy structures.
- Page-wide `get_all_elements` timed out with HTTP 504, so cleanup proceeded section by section with scoped reads and read-backs.
- `sub-visual` first viewport cleanup:
  - `Section 2` -> `sub-visual`.
  - `sub-visual-container no-container` -> `sub-visual__container`.
  - `sub-visual-title-box` -> `sub-visual__title-box`.
  - `flex flex-col` -> `sub-visual__title-stack`.
  - Remaining issue: `sub-visual__inner` still resolves as `inner sub-visual__inner` because Webflow stores the old inner-based combo. This needs a combo cleanup pass before deletion.
- `product-tabs` cleanup:
  - `product-tabs-inner` -> `product-tabs__inner`.
  - `tab-container no-container` -> `product-tabs__container`.
  - `product-tabs-menu` -> `product-tabs__menu`.
  - `product-tabs-content` -> `product-tabs__content`.
  - `product-tabs-panel` -> `product-tabs__panel`.
  - `product-tabs-panel-active` was renamed to `product-tabs__panel--active` and reapplied to the active panel.
- `sub-intro` cleanup:
  - `sub-intro padding-y-xl` -> `sub-intro`.
  - `no-container` -> `sub-intro__container`.
  - `inner` -> `sub-intro__inner`.
  - `sub-section-headline` -> `sub-intro__headline`.
  - `sub-section-txt-title` -> `sub-intro__title`.
  - `sub-section-headline-body` -> `sub-intro__body`.
  - `contents` -> `sub-intro__contents`.
- Selected Docusign Iris feature section cleanup:
  - `no-container` -> `sub-feature__container`.
  - `inner` -> `sub-feature__inner`.
  - `section-title text-center` -> `sub-feature__head`.
  - `body-1 text-body` -> `body-1`.
  - `contents` -> `sub-feature__contents`.
  - `sub-feature-grid` -> `sub-feature__grid`.
  - `feature-card` -> `sub-feature__card`.
  - `feature-number` spans -> shared `card-num`.
- New rule reinforced: when MCP reads time out, process one selected section or `scope_element_id` at a time and do not report page completion until every target section is read back.

### Legal System

Page ID: `6a48b6abc9c50156728b3e4e`

Observed utility combinations:

- `heading-1 fm-en`
- `heading-1 fm-ko text-title`
- `heading-1`
- `body-2 text-body`

Migration direction:

- Replace heading/body combinations with `legal-hero-title`, `legal-overview-title`, `legal-feature-title`, and matching desc classes.
- Continue using placeholder media until explicit asset insertion is requested.

## Safe Execution Order

1. Create or confirm missing semantic variables.
2. For each target page, add or update role classes with equivalent layout, spacing, typography, color, and responsive values.
3. If a full-page read times out, switch immediately to one section or selected subtree at a time.
4. Move one scoped section from utility combinations to role classes.
5. Read back that same section before moving to the next section.
6. Repeat until every target section has a verified read-back.
7. Update `/components` catalog.
8. Present duplicate and unused style delete list.
9. Delete only after explicit user confirmation or when the active task explicitly includes deletion and zero usage is proven.
10. Publish only after explicit user confirmation.
