# Canonical Webflow Class and Variable Contract

contract_version: `2026-08-30.1`

This file is the single source of truth for supported typography, color, component inheritance, selector composition, and responsive values. Other documents link here and must not redefine these tables.

## Precedence

1. This contract
2. Connected Webflow `rules/design-system.md` with the same version
3. Repository workflow and migration documents
4. Historical implementation notes

A version mismatch is a synchronization task. Do not guess which copy is newer.

## Selector composition

### Standalone content

Use exactly:

`[semantic tier] + [weight] + [color]`

Examples:

- `section-head-title bold text-title`
- `section-content-subtitle semibold text-subtitle`
- `section-normal-body regular text-body-invert`
- `section-micro-eyebrow medium text-desc`

Rules:

- Semantic selectors own font family, size, line height, and letter spacing.
- Weight selectors own font weight.
- Color selectors own color.
- Alignment and state belong to the nearest structural parent.
- One content group uses one tier: `head`, `lead`, `normal`, `content`, or `micro`.
- `ui` is only for independent controls and metadata.

### Reusable components

Component internals keep stable role selectors and omit `text-*`. The outermost owned root binds the approved inherited text-color variables. A light/dark variant changes variables on that root only.

Example:

```text
card
  card-media
  card-body
    card-title
    card-desc
```

Do not attach `text-title`, `text-body`, or invert counterparts to `card-title` and `card-desc`.

## Fonts and language

- Every semantic selector binds `Font/Base`.
- Do not create or apply `lang-ko`, `lang-en`, `lang-variant`, `fm-ko`, or `fm-en`.
- Language does not change typography tokens or weight.
- The approved `sub-visual` and `intro-title` title exceptions use weight 400 in every language.

## Shared component title hierarchy

| Role | Desktop | Tablet | Mobile Landscape | Mobile Portrait | Line height | Letter spacing | Weight |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `sub-visual` H1 | 72px | 56px | 44px | 36px | 121% | -0.02em | 400 |
| `intro-title` title | 64px | 56px | 48px | 40px | 121% | -0.02em | 400 |
| `section-title` title | 48px | 42px | 36px | 32px | 121% | -0.02em | 700 |

Media-only `sub-visual-media-*` components do not receive duplicate title styles. Their owning `sub-visual` instance controls the H1 hierarchy.

## Semantic typography

All sizes are Desktop / Tablet / Mobile Landscape / Mobile Portrait.

### Title

| Selector | Sizes | Line height | Letter spacing | Paired weight |
| --- | --- | ---: | ---: | --- |
| `section-head-title` | 48 / 42 / 36 / 32 | 121% | -0.02em | `bold` 700 |
| `section-lead-title` | 40 / 36 / 32 / 28 | 121% | -0.02em | `bold` 700 |
| `section-normal-title` | 36 / 32 / 28 / 26 | 121% | -0.02em | `bold` 700 |
| `section-content-title` | 28 / 26 / 24 / 22 | 121% | -0.02em | `bold` 700 |
| `section-micro-title` | 24 / 22 / 20 / 18 | 121% | -0.02em | `bold` 700 |

### Subtitle

| Selector | Sizes | Line height | Letter spacing | Paired weight |
| --- | --- | ---: | ---: | --- |
| `section-head-subtitle` | 30 / 28 / 26 / 24 | 141% | -0.02em | `semibold` 600 |
| `section-lead-subtitle` | 28 / 26 / 24 / 22 | 141% | -0.02em | `semibold` 600 |
| `section-normal-subtitle` | 26 / 24 / 22 / 20 | 141% | -0.02em | `semibold` 600 |
| `section-content-subtitle` | 22 / 20 / 18 / 18 | 141% | -0.02em | `semibold` 600 |
| `section-micro-subtitle` | 20 / 18 / 18 / 18 | 141% | -0.02em | `semibold` 600 |

### Body

| Selector | Sizes | Line height | Letter spacing | Paired weight |
| --- | --- | ---: | ---: | --- |
| `section-head-body` | 22 / 20 / 18 / 18 | 161.8% | -0.02em | `regular` 400 |
| `section-lead-body` | 20 / 18 / 18 / 18 | 161.8% | -0.02em | `regular` 400 |
| `section-normal-body` | 20 / 18 / 18 / 18 | 161.8% | -0.02em | `regular` 400 |
| `section-content-body` | 18 / 18 / 18 / 18 | 161.8% | -0.02em | `regular` 400 |
| `section-micro-body` | 18 / 18 / 18 / 18 | 161.8% | -0.02em | `regular` 400 |

### Eyebrow

| Selector | Sizes | Line height | Letter spacing | Paired weight |
| --- | --- | ---: | ---: | --- |
| `section-head-eyebrow` | 22 / 20 / 18 / 18 | 141% | -0.02em | `medium` 500 |
| `section-lead-eyebrow` | 20 / 18 / 18 / 18 | 141% | -0.02em | `medium` 500 |
| `section-normal-eyebrow` | 20 / 18 / 18 / 18 | 141% | -0.02em | `medium` 500 |
| `section-content-eyebrow` | 18 / 18 / 18 / 18 | 141% | -0.02em | `medium` 500 |
| `section-micro-eyebrow` | 18 / 18 / 18 / 18 | 141% | -0.02em | `medium` 500 |

### UI floor

Independent controls and metadata may use `section-ui-*` selectors with a 16px minimum. Content typography must never use the UI tier or fall below 18px.

## Weight variables

| Selector | Variable | Value |
| --- | --- | ---: |
| `regular` | `Weight/Regular` | 400 |
| `medium` | `Weight/Medium` | 500 |
| `semibold` | `Weight/SemiBold` | 600 |
| `bold` | `Weight/Bold` | 700 |

Weight remains separate from semantic selectors. Do not store weight on `section-*` selectors and do not apply a duplicate weight selector when a component role already owns an approved exception.

## Color variables and selectors

Normal means white-family text for dark surfaces. Invert means neutral black text for light surfaces.

| Role | Normal selector and value | Invert selector and value |
| --- | --- | --- |
| Title | `text-title` → `Color/Text/Title` → `#FFFFFF` | `text-title-invert` → `Color/Text/Title Invert` → `#000000` |
| Subtitle | `text-subtitle` → `Color/Text/Subtitle` → `#FFFFFFE0` | `text-subtitle-invert` → `Color/Text/Subtitle Invert` → `#111111` |
| Body | `text-body` → `Color/Text/Body` → `#FFFFFFC7` | `text-body-invert` → `Color/Text/Body Invert` → `#222222` |
| Description | `text-desc` → `Color/Text/Desc` → `#FFFFFF99` | `text-desc-invert` → `Color/Text/Desc Invert` → `#333333` |

Do not place normal and invert selectors on the same element. Do not infer a surface from a text element's accidental background class.

## Variables and responsive modes

- Search collection names, variable names, values, modes, and usage before creation.
- Use one semantic variable binding on the base style.
- Prefer automatic responsive modes for Tablet, Mobile Landscape, and Mobile Portrait.
- Use breakpoint-specific style bindings only when read-back proves variable inheritance cannot express the result.
- Do not repurpose a shared variable when roles have different meanings.
- Use scoped semantic variables and bind only their intended canonical styles.

## Naming restrictions

Do not create or reuse:

- numeric suffix selectors such as `section-title-48`
- page-specific typography such as `kiteworks-title`
- `--legacy-*`, `--context-*`, `old-*`, or `new-*`
- auto-generated names such as `Div Block 115`
- language selectors
- vague ownership names such as `left`, `right`, `txt`, `cnt`, or `item`

Use short structural roles, canonical semantic selectors, and root-owned component roles.

## Deletion and publish gates

Deletion requires all of the following:

1. sitewide usage is zero
2. custom-code references are zero
3. the replacement is verified
4. the user separately approves deletion

Publishing always requires separate explicit approval.
