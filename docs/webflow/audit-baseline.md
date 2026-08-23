# Webflow Audit Baseline

contract_version: `2026-08-23.8`

observed_through: `2026-08-23 Asia/Seoul`

This document records observations, not policy. Counts may change after any Designer edit.

## Connected site

| Field | Observed value |
|---|---|
| Site | `intellectualdata` |
| Site ID | `6a38f39fe95d43bbdbe5c71c` |
| Current Designer page | `INDA FullDiscovery®` |
| Page ID | `6a5317ba9538f5ffd5a324c2` |
| Slug | `INDA_FullDiscovery` |
| Designer mode | `design` |
| Site Agent Instructions before migration | none |
| Breakpoints | main, 1280+, 1440+, 991-, 767-, 479- |

## Sitewide style and variable observations

| Metric | Observed value |
|---|---:|
| Style definitions | 4,197 |
| Unique style names | 3,412 |
| Duplicate style names | 267 |
| Empty style definitions | 967 |
| Variables | 111 |
| Referenced variables | 88 |
| Unused variables | 23 |
| Variable modes | 4 |
| Variables with observed mode values | 0 |

Observed variable-binding coverage:

| Property | Approximate binding coverage |
|---|---:|
| font-size | 29% |
| line-height | 2.5% |
| font-weight | 13% |
| letter-spacing | 6% |
| color | 38% |
| background-color | 25% |

Frequently duplicated names included `u-section-padding` (63 definitions), `text-title-invert` (32), `text-body-invert` (29), `section-micro-title` (11), and `section-micro-body` (16). Current MCP 2.0 `get_styles` reads can distinguish the intended global, non-combo declaration owner from empty and combo records; exact IDs still belong in each batch record.

## INDA observations

| Metric | Observed value |
|---|---:|
| Elements | 281 |
| Styled elements | 180 |
| Used class names | 82 |
| Multi-class elements | 30 |
| Referenced variables | 40 |

Observed INDA combinations:

| Combination | Count |
|---|---:|
| `section-content-title` | 6 |
| `section-content-title + heading-52 + text-center` | 1 |
| `section-content-index` | 8 |
| `section-micro-title` | 9 |
| `section-content-subtitle` | 8 |
| `section-content-body` | 9 |
| `section-content-eyebrow + sub-inda-caps__eyebrow` | 4 |
| `section-content-sub-title` | 4 |
| `section-content-body + sub-inda-caps__check` | 6 |
| `sub-inda-caps__check + section-content-body` | 5 |
| `section-micro-title + text-title-invert` | 3 |
| `Paragraph 18 + section-micro-body` | 3 |

## Observed typography declarations

| Selector | Main observed declaration | Noted issue |
|---|---|---|
| `section-content-index` | 40 / 1 / 700 | direct weight |
| `section-content-title` | 34 / 141% / 700 | direct weight; inconsistent responsive values |
| `section-content-subtitle` | 18 / 27 / 600 | direct weight |
| `section-content-body` | 18 / 161.8% / 400 | direct weight/color; grows at some smaller breakpoints |
| `section-micro-title` | 26 / 130% / 700 | direct weight; irregular responsive values |
| `section-micro-body` | 20 / 151% | irregular responsive values |
| `section-content-sub-title` | 22 / 161.8% / 400 | name does not match long-body use |

Values are recorded as `font-size / line-height / weight` where available.

## Color observations

Canonical normal roles are the white family for dark surfaces: Title `#FFFFFF`, Subtitle `#FFFFFFE0`, Body `#FFFFFFC7`, Desc `#FFFFFF99`. Canonical `-invert` roles use an opaque neutral-black scale for light surfaces: Title `#000000`, Subtitle `#111111`, Body `#222222`, Desc `#333333`. `invert` never means white text.

Variable namespaces were inconsistently cased as `Color/...` and `color/...`. Role mapping and contrast verification are required before renaming or rebinding.

### 2026-08-23 canonical text-color implementation

The eight canonical variables use lowercase semantic paths. Seven existing variable IDs were retained and `color/text/title-invert` was created as `variable-759fb0ac-b062-9f1b-b699-9c1f9109159b`. On 2026-08-23 the four invert values were normalized to opaque neutral blacks from `#000000` through `#333333`; all four exceed the 4.5:1 target on white.

Exact global-style readback confirms all eight standalone `text-*` selectors use their canonical semantic variables. The exact duplicate-name globals `text-title-invert` and `text-body-invert` were repaired through the scoped Designer fallback; `text-body-invert` no longer contains the accidental `position: static` declaration. All temporary probe elements were removed. No deletion or publication occurred.

## Shared components

| Component | ID | Instances | Observed issue |
|---|---|---:|---|
| `section-title` | `9b4fc63d-3bda-d34d-302e-3b45259e7312` | 81 | internal roles use typography and weight only; root owns white Base color and neutral-black invert color |
| `intro-title` | `43352630-4ca3-722b-7270-ff62ac820a04` | 24 | internal roles use typography/language/weight only; root owns Base/White and invert color polarity |
| `sub-visual` | `06868950-51cf-7bdf-164a-91b8dc366f91` | 24 | eyebrow/title/body canonical normal white-family hierarchy |
| `intro-title-v2` | `ea89ac4b-f08d-484c-5e95-a3bed92b8123` | 2 | numeric typography and `text-title-v2` |

The site had 54 components at observation time.

## Custom-code observations

The site head currently defines legacy numeric typography groups (`.display-*`, `.heading-*`, `.body-*`) and a second `.u-display-*` / `.u-heading-*` / `.u-body-*` layer. Weight utilities are also hard-coded in custom CSS. These are live migration inputs and prevent zero-use or 100% variable-binding claims until their selectors and callers are migrated.

The INDA page footer contains equal-height Swiper CSS and a clamp rule for `.sub-inda-process__card-desc`. The current process-card body nodes use `section-content-body`, so that clamp selector's intended owner needs verification.

## 2026-08-23 canonical section color verification

The 17 canonical selectors listed in `class-contract.md` were read at Base, Tablet, Mobile Landscape, and Mobile Portrait. Direct `color` declarations were removed from Base on `section-head-eyebrow`, `section-lead-body`, `section-lead-eyebrow`, and `section-micro-body`, and from Tablet on `section-micro-body`. Final readback found zero direct `color` declarations across all 68 selector/breakpoint combinations.

## 2026-08-23 responsive typography specification

The canonical specification fixes size, line height, letter spacing, and weight together using existing Webflow variables:

- Title: 121% line height, -0.02em letter spacing, `bold` 700.
- Subtitle: 141% line height, -0.02em letter spacing, `semibold` 600.
- Body: 161.8% line height, -0.02em letter spacing, `regular` 400.
- Eyebrow: 141% line height, -0.02em letter spacing, `medium` 500.
- Minimum size: 18px.
- Desktop title hierarchy: head 50, lead 40, normal 36, content 28, micro 24.

On 2026-08-23 a dedicated `Typography` collection was created as `collection-cf6f1323-c8ad-7880-560f-027c0371d902`. It contains 60 semantic variables: `font-size`, `line-height`, and `letter-spacing` for all 20 tier/role pairs. Automatic breakpoint modes were created for Tablet (`medium`), Mobile L (`small`), and Mobile (`tiny`), and all 60 responsive font-size mode values were written from the canonical matrix. Designer UI readback showed the expected Desktop, Tablet, Mobile L, and Mobile values. The current `get_variables` response returns an empty `modeValues` array even when the Designer shows the stored mode values, so Designer readback is retained as the verification source for this batch.

Exact `get_styles` readback confirms semantic Desktop/Base bindings on 14 global selectors: `section-head-title`, `section-normal-title`, `section-content-title`, `section-micro-title`; all five subtitle selectors; `section-head-body`, `section-lead-body`, `section-normal-body`; and `section-lead-eyebrow`, `section-content-eyebrow`. Six global selectors remain on their previous Base declarations: `section-lead-title`, `section-content-body`, `section-micro-body`, `section-head-eyebrow`, `section-normal-eyebrow`, and `section-micro-eyebrow`. Their names collide with combo definitions, while the current name-addressed `update_style` action selects a combo even when `parent_style_names` is empty. The variables themselves are complete; these six exact-global bindings are a separate migration step and MUST NOT be reported as complete until exact-ID mutation is available or a Designer selection proves the global owner was edited.

## Current connector boundary

MCP 2.0.1 Data reads and variable/style writes are operational with the documented `data_*` action shapes. Exact duplicate-name global owners were repaired on 2026-08-23 through the scoped Designer fallback, and the ordered micro paths were created there. `text-title-invert` and `text-body-invert` contain only their canonical invert variable bindings, with no stray position declaration.

On 2026-08-23 the reusable component color model moved to root inheritance. Final tree readback across `section-title`, `intro-title`, `banner`, `num-card`, `icon-card`, `icon-card-cms`, `icon-num-card`, `story-card`, `review-card`, `num-row`, and `case-card` found zero internal `text-title`, `text-subtitle`, `text-body`, `text-desc`, or `-invert` bindings. Ten distinct root selectors bind one approved title foreground variable: white `variable-b90879fd-bc66-1d32-d73c-675a5d8414f2` on dark surfaces or neutral black `variable-759fb0ac-b062-9f1b-b699-9c1f9109159b` on light surfaces. Twenty-six non-base variant root readbacks passed, and 58 stale internal variant `color` overrides were removed. Representative post-cleanup reads returned empty property sets on internal `text-*` variant styles.

The `num-row` Light variant required one additional runtime correction after that batch. Data readback reported empty Light-variant properties for H3 `de43678e-3ea6-d3aa-225e-4c8af852d91e`, while the Designer still emitted a duplicate-name `section-micro-title` variant rule with `color: white`. The exact Designer declaration was reset without adding an internal color selector, and `bold` was restored on the H3. Final computed-style verification returned Base `rgb(255, 255, 255)` and Light `rgb(0, 0, 0)`, both at weight 700; the Light root remained bound to `color/text/title-invert` (`variable-759fb0ac-b062-9f1b-b699-9c1f9109159b`). This is evidence that an empty Data property set does not by itself prove the absence of stale duplicate-name Designer CSS; representative computed-style verification remains required for affected variants.

Four empty combo definitions recorded in the migration register are retained until exact usage and custom-code deletion gates are independently satisfied. Empty declaration blocks are not themselves a rendering defect: the ordered class path can still be required by live elements. No global unused-style broom is authorized. Earlier schema-failure rows in the chronological register are historical evidence and MUST NOT be reused as a current capability conclusion.
