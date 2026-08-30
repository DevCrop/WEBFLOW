# Webflow Audit Baseline

contract_version: `2026-08-31.1`

observed_at: `2026-08-22 Asia/Seoul`

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

## Local documentation transition

- Archived source files: 12
- Archived files: 12
- SHA-256 mismatches: 0
- Archive: `docs/archive/pre-codex-2026-08-22/`
- `.gitattributes`: not present; no blanket encoding or line-ending normalization was performed.

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

Exact global-style readback confirms `text-title`, `text-subtitle`, `text-subtitle-invert`, `text-body`, `text-desc`, and `text-desc-invert` use their canonical semantic variables. `text-title-invert` and `text-body-invert` still point to `Color/Base/Black` because the name-addressed connector and Designer class chooser resolve duplicate definitions instead of the exact global IDs. A Designer attempt also left `position: static` on global `text-body-invert`; this disallowed declaration requires exact-global cleanup before the color-class migration can be marked complete. All temporary probe elements were removed. No deletion or publication occurred.

## Shared components

| Component | ID | Instances | Observed issue |
|---|---|---:|---|
| `section-title` | `9b4fc63d-3bda-d34d-302e-3b45259e7312` | 81 | prior evidence predates v2026-08-24.2 root-color ownership; current implementation readback required |
| `intro-title` | `43352630-4ca3-722b-7270-ff62ac820a04` | 24 | title must remain `regular`; prior evidence predates root-color ownership |
| `sub-visual` | `06868950-51cf-7bdf-164a-91b8dc366f91` | 24 | H1 must remain `regular`; prior evidence predates root-color ownership |
| `intro-title-v2` | `ea89ac4b-f08d-484c-5e95-a3bed92b8123` | 2 | numeric typography and `text-title-v2` |

The site had 54 components at observation time.

## Custom-code observations

The site head currently defines legacy numeric typography groups (`.display-*`, `.heading-*`, `.body-*`) and a second `.u-display-*` / `.u-heading-*` / `.u-body-*` layer. Weight utilities are also hard-coded in custom CSS. These are live migration inputs and prevent zero-use or 100% variable-binding claims until their selectors and callers are migrated.

The INDA page footer contains equal-height Swiper CSS and a clamp rule for `.sub-inda-process__card-desc`. The current process-card body nodes use `section-content-body`, so that clamp selector's intended owner needs verification.

## 2026-08-23 canonical section color verification

The 17 canonical selectors listed in `class-contract.md` were read at Base, Tablet, Mobile Landscape, and Mobile Portrait. Direct `color` declarations were removed from Base on `section-head-eyebrow`, `section-lead-body`, `section-lead-eyebrow`, and `section-micro-body`, and from Tablet on `section-micro-body`. Final readback found zero direct `color` declarations across all 68 selector/breakpoint combinations.

## 2026-08-23 responsive typography specification

The canonical specification fixes size, line height, letter spacing, and weight together using existing Webflow variables:

- Title: 121% line height, -0.02em letter spacing, `bold` 700; approved `sub-visual` H1 and `intro-title` title exceptions use `regular` 400 in every language variant.
- Subtitle: 141% line height, -0.02em letter spacing, `semibold` 600.
- Body: 161.8% line height, -0.02em letter spacing, `regular` 400.
- Eyebrow: 141% line height, -0.02em letter spacing, `medium` 500.
- Content minimum size: 18px. Canonical `section-ui-*` interface text is the only approved 16px exception.
- Desktop title hierarchy: head 50, lead 40, normal 36, content 28, micro 24.

On 2026-08-23 a dedicated `Typography` collection was created as `collection-cf6f1323-c8ad-7880-560f-027c0371d902`. It contains 60 semantic variables: `font-size`, `line-height`, and `letter-spacing` for all 20 tier/role pairs. Automatic breakpoint modes were created for Tablet (`medium`), Mobile L (`small`), and Mobile (`tiny`), and all 60 responsive font-size mode values were written from the canonical matrix. Designer UI readback showed the expected Desktop, Tablet, Mobile L, and Mobile values. The current `get_variables` response returns an empty `modeValues` array even when the Designer shows the stored mode values, so Designer readback is retained as the verification source for this batch.

Exact `get_styles` readback confirms semantic Desktop/Base bindings on 14 global selectors: `section-head-title`, `section-normal-title`, `section-content-title`, `section-micro-title`; all five subtitle selectors; `section-head-body`, `section-lead-body`, `section-normal-body`; and `section-lead-eyebrow`, `section-content-eyebrow`. Six global selectors remain on their previous Base declarations: `section-lead-title`, `section-content-body`, `section-micro-body`, `section-head-eyebrow`, `section-normal-eyebrow`, and `section-micro-eyebrow`. Their names collide with combo definitions, while the current name-addressed `update_style` action selects a combo even when `parent_style_names` is empty. The variables themselves are complete; these six exact-global bindings are a separate migration step and MUST NOT be reported as complete until exact-ID mutation is available or a Designer selection proves the global owner was edited.

## Superseded connection limitation

The earlier duplicate-name mutation block was resolved on 2026-08-23 by selecting the exact global owners in Designer and creating the exact ordered micro invert paths there. `text-title-invert` and `text-body-invert` contain only their canonical invert variable bindings, with no stray position declaration. Deferred body and card roles were migrated, and representative-only variant overrides passed readback across section-title, intro-title, num-card, num-row, icon-card, icon-card-cms, story-card, review-card, and banner. Structural component classes do not own text color.

Four empty combo definitions recorded in the migration register are retained until exact usage and custom-code deletion gates are independently satisfied. Empty declaration blocks are not themselves a rendering defect: the ordered class path can still be required by live elements. No global unused-style broom is authorized.

The 2026-08-22 schema-failure note is historical. On 2026-08-23, MCP 2.0 reads succeeded with the documented payloads: `data_style_tool.get_styles` using `query: "all"` and `data_variable_tool.get_variables` using the collection ID. All 20 canonical typography selector names produced one global, non-combo declaration owner after local filtering. Read access and variable writes are therefore operational. Exact duplicate-name style mutation remains a narrower connector limitation, not a reason to block variable creation or unrelated unambiguous style updates. Future work MUST retry current official action shapes before reusing the old blocked conclusion.

## 2026-08-28 documentation contract sync

The live Webflow Agent Instruction `rules/design-system.md` was read back at contract v2026-08-24.2. Active local policy, skill, workflow, audit, and migration documents were synchronized to that version. The new policy distinguishes standalone text color selectors from reusable-component root color ownership and preserves `regular` weight for the approved `sub-visual` H1 and `intro-title` title exceptions. No Webflow style, variable, component, deletion, or publication change was performed in this documentation batch.

## 2026-08-31 older-audience typography scale

All 24 canonical section font-size variables were updated at Base, Tablet, Mobile Landscape, and Mobile Portrait: 96 variable writes completed without error. Fourteen duplicate-free global selectors were rebound to their own semantic variable at all four breakpoints and passed exact readback. Ten canonical names still have duplicate combo definitions, so the name-addressed style action cannot safely rebind their exact global owners: `section-content-body`, `section-content-title`, `section-head-body`, `section-head-eyebrow`, `section-head-title`, `section-lead-title`, `section-micro-body`, `section-micro-eyebrow`, `section-normal-body`, and `section-normal-title`. Their exact-ID selector cleanup remains pending; no deletion or publication occurred.
