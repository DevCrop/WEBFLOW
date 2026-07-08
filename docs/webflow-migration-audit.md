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
3. Move page elements from utility combinations to role classes.
4. Read back page structure after each page.
5. Update `/components` catalog.
6. Present duplicate and unused style delete list.
7. Delete only after explicit user confirmation.
8. Publish only after explicit user confirmation.
