# Webflow Class Contract

contract_version: `2026-08-31.1`

This file is the canonical policy for text classes, state classes, and their variable responsibilities.

## 1. Selector grammar

Standalone text elements MUST use exactly this order:

```text
[semantic tier base] + [weight] + [color]
```

ALLOWED:

```text
section-head-title + bold + text-title
section-content-body + regular + text-body-invert
```

MUST NOT:

```text
heading-52 + bold + text-title
section-content-title + regular + bold + text-title
```

The first selector defines semantic scale and binds `Font/Base`. The next selector defines only weight and the final selector defines only color. A standalone text element therefore uses exactly three design-system selectors. Functional third-party classes such as `swiper-slide` belong on their functional wrapper, not on the text node.

Text inside a reusable Webflow component MUST use exactly this order by default:

```text
[semantic tier base] + [weight]
```

The only approved title-scale exceptions are `sub-visual`, `intro-title`, and `section-title`. Their title element MAY use one documented component-owned title scale binding in addition to the semantic role and weight, or retain the existing component-owned title selector while it is being migrated. The exception owns only the component title scale; it MUST NOT change color, alignment, or a variant's weight.

Reusable component internals MUST NOT carry `text-*` color selectors. The component's outermost owned root selector binds one approved inherited text-color variable, and variants switch only that root color. Nested buttons, badges, links, and other independently themed components retain their own color ownership.

## 1.1 Base font ownership

Every semantic tier selector MUST bind the approved `Font/Base` variable. Language-specific selectors are not part of the class grammar.

`lang-ko`, `lang-en`, `lang-variant`, and any new `lang-*` selector MUST NOT be created or applied. Existing language selectors are migration inputs and require the normal zero-use and deletion-approval lifecycle before deletion.

## 2. Semantic typography tiers

The allowed families are:

```text
section-head-*
section-lead-*
section-normal-*
section-content-*
section-micro-*
section-ui-*
```

Every semantic tier MUST provide the same four canonical roles:

```text
section-head-title
section-head-subtitle
section-head-body
section-head-eyebrow

section-lead-title
section-lead-subtitle
section-lead-body
section-lead-eyebrow

section-normal-title
section-normal-subtitle
section-normal-body
section-normal-eyebrow

section-content-title
section-content-subtitle
section-content-body
section-content-eyebrow
section-content-index

section-micro-title
section-micro-subtitle
section-micro-body
section-micro-eyebrow

section-ui-title
section-ui-subtitle
section-ui-body
section-ui-eyebrow
```

`section-content-index` is the only approved supplementary role. It uses the `content/title` typography metrics and the `bold` weight selector. Its color remains a separate text-color selector.

## 2.1 Canonical responsive typography

Breakpoints are Desktop, Tablet (991px and below), Mobile Landscape (767px and below), and Mobile Portrait (479px and below). Desktop also applies at the 1280px and 1440px larger breakpoints unless an approved variable mode explicitly overrides it.

All sizes below are pixels. Long-form body text outside `micro` has an 18px minimum. `micro` body and subtitle may use the approved 16px floor, eyebrow may use the approved 14px floor, and canonical `section-ui-*` interface text may use the approved 14px floor. These smaller roles are for short supporting copy, labels, and metadata, not long-form reading.

### Title

Uses the existing variables resolving to line-height 121% and letter-spacing -0.02em. The canonical weight is `bold` (700), except the approved `sub-visual` H1 and `intro-title` title, which use `regular` (400).

| Tier | Desktop | Tablet | Mobile Landscape | Mobile Portrait |
|---|---:|---:|---:|---:|
| head | 48 | 42 | 36 | 32 |
| lead | 40 | 36 | 32 | 28 |
| normal | 36 | 32 | 28 | 26 |
| content | 28 | 26 | 24 | 22 |
| micro | 24 | 22 | 20 | 18 |

#### Approved component display title scales

These scales apply only to the title role of the named reusable component. Eyebrow, subtitle, and body keep their component's canonical semantic tier. The three title scales MUST bind the listed Typography variables once at Base and use the automatic responsive modes.

| Component | Variable | Desktop | Tablet | Mobile Landscape | Mobile Portrait | Weight |
|---|---|---:|---:|---:|---:|---|
| `sub-visual` | `type/component/sub-visual/title/font-size` | 72 | 56 | 44 | 36 | `regular` (400) |
| `intro-title` | `type/component/intro-title/title/font-size` | 64 | 56 | 48 | 40 | `regular` (400) |
| `section-title` | `type/component/section-title/title/font-size` | 48 | 42 | 36 | 32 | `bold` (700) |

This exception exists to preserve the explicit shared-component hierarchy `sub-visual > intro-title > section-title` without repurposing the global `head`, `lead`, or `normal` semantic variables. No other component may adopt these bindings without a contract update.

### Subtitle

Uses the existing variables resolving to line-height 141%, letter-spacing -0.02em, and weight `semibold` (600).

| Tier | Desktop | Tablet | Mobile Landscape | Mobile Portrait |
|---|---:|---:|---:|---:|
| head | 30 | 28 | 26 | 24 |
| lead | 28 | 26 | 24 | 22 |
| normal | 26 | 24 | 22 | 20 |
| content | 22 | 20 | 18 | 18 |
| micro | 20 | 18 | 17 | 16 |

### Body

Uses the existing variables resolving to line-height 161.8%, letter-spacing -0.02em, and weight `regular` (400).

| Tier | Desktop | Tablet | Mobile Landscape | Mobile Portrait |
|---|---:|---:|---:|---:|
| head | 24 | 22 | 20 | 18 |
| lead | 22 | 20 | 19 | 18 |
| normal | 20 | 19 | 18 | 18 |
| content | 19 | 18 | 18 | 18 |
| micro | 17 | 17 | 16 | 16 |

### Eyebrow

Uses the existing variables resolving to line-height 141%, letter-spacing -0.02em, and weight `medium` (500).

| Tier | Desktop | Tablet | Mobile Landscape | Mobile Portrait |
|---|---:|---:|---:|---:|
| head | 20 | 19 | 18 | 17 |
| lead | 19 | 18 | 17 | 16 |
| normal | 18 | 17 | 16 | 15 |
| content | 17 | 16 | 15 | 14 |
| micro | 16 | 15 | 14 | 14 |


### UI

`ui` is an interface-only tier. It uses the compact responsive scale below, with a 14px floor, line-height 141%, and letter-spacing -0.02em.

| Role | Desktop | Tablet | Mobile Landscape | Mobile Portrait | Weight |
|---|---:|---:|---:|---:|---|
| title | 18 | 18 | 17 | 16 | `bold` |
| subtitle | 17 | 16 | 16 | 15 | `semibold` |
| body | 16 | 16 | 15 | 15 | `regular` |
| eyebrow | 15 | 15 | 14 | 14 | `medium` |

`ui` MUST be used only for controls, filter options, buttons, dates, counts, tags, file metadata, and equivalent interface text. It MUST NOT be selected merely to make content typography smaller.
Every size, line-height, letter-spacing, and weight value MUST use an approved Webflow variable. Reuse an existing variable only when its semantic role and every responsive value match. If one shared legacy variable is required to resolve to conflicting values, create a semantic role variable instead of repurposing it. Responsive values belong in automatic variable modes or the canonical single selector, never in combined selectors.

## 2.2 Tier consistency inside a component

A single component, card, heading group, or other cohesive text block MUST choose one semantic tier and use that tier for every text role it contains. `head`, `lead`, `normal`, `content`, and `micro` MUST NOT be mixed inside the same block.

ALLOWED:

```text
section-head-eyebrow
section-head-title
section-head-subtitle
section-head-body
```

MUST NOT:

```text
section-lead-eyebrow
section-head-title
section-micro-subtitle
section-content-body
```

The tier expresses the hierarchy of the whole text group. The role expresses the hierarchy inside that group. If a role is absent from a particular instance, omit the element rather than substituting a role from another tier.

A semantic tier selector MUST contain only:

- `font-family`
- `font-size`
- `line-height`
- `letter-spacing`

It MUST NOT contain:

- `font-weight`
- `color`
- `text-align`
- margin or padding
- width, height, display, positioning, grid, or flex properties
- page-specific or component-specific overrides

Choose a role by meaning and hierarchy, never by matching a desired pixel size. New roles require a sitewide use case and contract update before implementation.

## 3. Weight selectors

Only these weight selectors are allowed:

| Selector | Variable | Value |
|---|---|---:|
| `regular` | `font/weight/regular` | 400 |
| `medium` | `font/weight/medium` | 500 |
| `semibold` | `font/weight/semibold` | 600 |
| `bold` | `font/weight/bold` | 700 |

Each selector MUST contain only `font-weight`, linked to its listed variable. Multiple weight selectors on one element are forbidden.

Canonical role assignments are mandatory:

| Role | Weight selector |
|---|---|
| `title` | `bold` (`regular` only for the approved `sub-visual` H1 and `intro-title` title exceptions) |
| `subtitle` | `semibold` |
| `body` | `regular` |
| `eyebrow` | `medium` |
| `index` | `bold` |

A component variant MUST NOT change a role's weight. The two approved title exceptions are component-wide and language variants MUST NOT override their `regular` weight. Any other different weight requires a different semantic role or a contract update.

## 4. Color selectors

Only these text-color selectors are allowed:

```text
text-title
text-title-invert
text-subtitle
text-subtitle-invert
text-body
text-body-invert
text-desc
text-desc-invert
```

Each color selector MUST contain only `color`, linked to the matching `color/text/*` variable. `invert` means the role used against the opposite surface theme; it does not change type scale or weight.

Color polarity is fixed:

- normal selectors without `-invert` use the white family on dark surfaces;
- `-invert` selectors use the neutral black family on light surfaces;
- `invert` MUST NOT be interpreted as white text.

| Selector | Variable | Canonical value | Surface |
|---|---|---|---|
| `text-title` | `color/text/title` | `#FFFFFF` | dark |
| `text-title-invert` | `color/text/title-invert` | `#000000` | light |
| `text-subtitle` | `color/text/subtitle` | `#FFFFFFE0` | dark |
| `text-subtitle-invert` | `color/text/subtitle-invert` | `#111111` | light |
| `text-body` | `color/text/body` | `#FFFFFFC7` | dark |
| `text-body-invert` | `color/text/body-invert` | `#222222` | light |
| `text-desc` | `color/text/desc` | `#FFFFFF99` | dark |
| `text-desc-invert` | `color/text/desc-invert` | `#333333` | light |

Text-color roles are surface-dependent, not viewport-dependent. They MUST NOT use responsive breakpoint modes. The minimum contrast target is 4.5:1 for normal text against the approved surface used by the component.

Title and subtitle are distinct roles. `title` provides the strongest foreground emphasis. `subtitle` is intentionally lower contrast. `body` supports reading; `desc` is reserved for tertiary or supporting information and MUST still satisfy the project's accessibility target.

### 4.1 Reusable component color ownership

- Title, card, banner, and other reusable content components bind their default inherited text color on the outermost owned root selector.
- Component variants switch only that root `color` binding.
- Internal text keeps semantic typography and weight selectors only.
- A separately themed nested region requires a documented component-owned subroot.
- Nested interactive or independently themed components retain their own color ownership.

## 5. Structural and state selectors

Parent elements use:

```text
[structural selector] + [is-* state]
```

Allowed shared states:

```text
is-centered
is-active
is-current
is-featured
is-disabled
```

`is-centered` owns child text alignment through the parent context. Text nodes MUST NOT use `text-center` for component alignment. Additional `is-*` states require a reusable behavioral or presentation state, a documented owner, and a contract update.

Structural selectors may own layout, spacing, and component geometry. They MUST NOT own reusable text scale or weight. Only the outermost owned root of a reusable component, or a documented component-owned subroot, may own inherited text color. Page-specific `sub-inda-*` selectors may remain only on structural wrappers and MUST NOT own reusable typography, weight, or color.

## 6. Variable contract

Supported typography, weight, color, and spacing values MUST use Webflow variables. Hard-coded `px`, hex, rgba, or numeric weight values are migration debt unless the property is not supported by Webflow variables and the exception is recorded.

Variable namespaces:

```text
type/section/{tier}/{role}/font-family
type/section/{tier}/{role}/font-size
type/section/{tier}/{role}/line-height
type/section/{tier}/{role}/letter-spacing

type/component/{sub-visual|intro-title|section-title}/title/font-size

font/weight/{regular|medium|semibold|bold}

color/text/{title|title-invert|subtitle|subtitle-invert|body|body-invert|desc|desc-invert}

space/section/{role}
space/card/{role}
```

Before creating a variable, search existing names, values, aliases, modes, and usage. Reuse a variable when its semantic role and complete responsive value set match. Rename or alias only after impact review. Responsive typography SHOULD use one Base binding plus automatic Tablet (`medium`), Mobile Landscape (`small`), and Mobile Portrait (`tiny`) modes in the same collection. Breakpoint-specific selector overrides are a compatibility fallback, not the preferred architecture.

Canonical typography variables use these paths:

```text
type/section/{tier}/{role}/font-size
type/section/{tier}/{role}/line-height
type/section/{tier}/{role}/letter-spacing
```

Mode values follow the responsive tables in section 2.1. A mode-driven variable may be linked once on the Base selector; Webflow applies its automatic mode at the configured breakpoint. Only one automatic mode per breakpoint is allowed in a collection.

## 7. Forbidden selector patterns

MUST NOT create or reuse:

```text
heading-[number]
body-[number]
Heading [number]
Paragraph [number]
Text Block [number]
*--legacy-*
*--context-*
legacy-*
old-*
new-*
```

Also forbidden:

- duplicate canonical selectors with separate style IDs;
- combo selectors that store new typography, weight, color, or spacing declarations, except the three approved component title-scale bindings in section 2.1;
- component or page selectors used to override the semantic text contract, except the three approved component title-scale bindings in section 2.1;
- class names chosen only from their current visual value.

Existing forbidden selectors are migration inputs, not reusable tools. Track them by exact current name in the migration register; never rename them to another temporary legacy name.

## 8. Source references

- [Webflow classes and combo classes](https://help.webflow.com/hc/en-us/articles/33961311094419-Classes)
- [Webflow variables and responsive modes](https://help.webflow.com/hc/en-us/articles/33961268146323-Variables)
- [Webflow MCP Data tools](https://developers.webflow.com/mcp/tools/data-tools)
- [Webflow variables refactor workflow](https://developers.webflow.com/mcp/prompts/variables-refactor)
- [Webflow breakpoints](https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview)
- [Webflow Style selectors and affected items](https://help.webflow.com/hc/en-us/articles/33961365722899-Style-selectors-panel)
