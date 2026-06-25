# Codex Webflow Best Practices

Use this reference for Webflow Designer, CMS-adjacent UI, variables, styles,
components, assets, and publish-safety work in Codex.

## MCP Setup

Preferred Webflow MCP server:

- Codex server name: `webflow`
- URL: `https://mcp.webflow.com/mcp`
- Transport: Streamable HTTP
- Auth: OAuth

Before using Webflow MCP in a session:

1. Confirm `codex mcp list` shows `webflow` as enabled and OAuth-authenticated.
2. Confirm the current Codex session exposes callable Webflow tools.
3. If tools are missing, restart Codex or open a new chat after configuration.

## Operating Rule

Inspect before changing. Webflow is a live external system, so every mutation
must be small, explicit, and verifiable.

Default workflow:

```text
read reference -> inspect Webflow state -> state plan -> mutate smallest surface -> report IDs -> verify
```

## Mutation Workflow

For every mutation:

1. Identify the exact site, page, branch, component, CMS collection, asset, or
   parent element.
2. Inspect current state through MCP before assuming IDs or structure.
3. State the planned changes and why they match this reference.
4. Ask before destructive edits, bulk edits, deletes, renames, publishing, or
   client-visible content changes.
5. Apply the smallest useful change.
6. Report every touched ID when available: site, page, element, class/style,
   variable, asset, component, collection, item, script, webhook.
7. Finish with how to verify in Webflow Designer or preview.

## Variable-First Styling

Use Webflow variables for styling whenever an equivalent variable exists. Bind
values through `variable_as_value`; do not hardcode colors, type sizes, line
heights, letter spacing, spacing, widths, or layout tokens unless a one-off
exception is explicitly justified.

Bind with:

```json
{ "variable_as_value": "<variable-id>" }
```

Do not bind tokenized values as raw `value`.

Variable collection:

| Collection | ID |
| --- | --- |
| Base | `collection-d70de15e-1039-6b8c-cd06-e42e3988e8ca` |

Current live token count:

| Category | Count |
| --- | ---: |
| Color | 14 |
| Font family | 4 |
| Type size | 10 |
| Line height | 5 |
| Letter spacing | 4 |
| Space | 12 |
| Layout | 6 |
| Total | 55 |

Token naming examples:

| Token | Use |
| --- | --- |
| `Color/Brand/Navy` | Primary brand navy |
| `Color/Text/Primary` | Default readable text |
| `Font/Pretendard` | Korean sans/body/UI |
| `Font/Inter` | English UI/data |
| `Type/Size/Base` | Fluid body size; use through Body or `f-body` |
| `Type/Line/Normal` | 1.5 line height |
| `Type/Track/Normal` | 0em tracking |
| `Space/04` | 16px spacing |
| `Layout/Container Max Width` | 1280px max container |

If a variable ID is needed, inspect variables through MCP instead of relying on
stale copied tables. Legacy IDs are documented in `.claude/rules/webflow.md`
until fully migrated.

## Fluid Type Size Variables

All `Type/Size/*` Webflow variables must be fluid `clamp()` values, not fixed
`px` values. Codex must calculate the `clamp()` string internally before
creating or updating a font-size variable.

Shared formula:

```css
clamp(min, calc(min + (max - min) * ((100vw - 375px) / 1545)), max)
```

Rules:

- Use `375px` as the minimum viewport and `1920px` as the maximum viewport.
- Treat the historic fixed type size as the desktop/max value at `1920px`.
- Bind element font sizes with `variable_as_value`; do not set raw `clamp()`
  values directly on elements.
- Every typography role must resolve to a fluid `Type/Size/*` variable:
  headings, display, body, lead, label, eyebrow, caption, button, nav, chip,
  card, form, stat, and CMS text.
- Map default body text through the Body style or `f-body`, bound to
  `Type/Size/Base`.
- Map labels and eyebrow text through a label style such as `f-label`, bound to
  `Type/Size/SM` unless the design clearly requires `Type/Size/XS`.
- Map non-fluid legacy font-size values to the nearest `Type/Size/*` variable
  before creating a new type variable.

Fluid type scale:

| Variable | CSS variable | Fluid value | Usage |
| --- | --- | --- | --- |
| `Type/Size/XS` | `--font-size-xs` | `clamp(11px, calc(11px + 1 * ((100vw - 375px) / 1545)), 12px)` | Caption, footnote |
| `Type/Size/SM` | `--font-size-sm` | `clamp(13px, calc(13px + 1 * ((100vw - 375px) / 1545)), 14px)` | Small body, label |
| `Type/Size/Base` | `--font-size-base` | `clamp(15px, calc(15px + 1 * ((100vw - 375px) / 1545)), 16px)` | Body text, `f-body` |
| `Type/Size/MD` | `--font-size-md` | `clamp(16px, calc(16px + 2 * ((100vw - 375px) / 1545)), 18px)` | Large body |
| `Type/Size/LG` | `--font-size-lg` | `clamp(18px, calc(18px + 2 * ((100vw - 375px) / 1545)), 20px)` | Lead paragraph |
| `Type/Size/XL` | `--font-size-xl` | `clamp(20px, calc(20px + 4 * ((100vw - 375px) / 1545)), 24px)` | H4, subheading |
| `Type/Size/2XL` | `--font-size-2xl` | `clamp(24px, calc(24px + 8 * ((100vw - 375px) / 1545)), 32px)` | H3 |
| `Type/Size/3XL` | `--font-size-3xl` | `clamp(28px, calc(28px + 12 * ((100vw - 375px) / 1545)), 40px)` | H2 |
| `Type/Size/4XL` | `--font-size-4xl` | `clamp(36px, calc(36px + 20 * ((100vw - 375px) / 1545)), 56px)` | H1 |
| `Type/Size/Display` | `--font-size-display` | `clamp(44px, calc(44px + 28 * ((100vw - 375px) / 1545)), 72px)` | Hero title |

Recommended typography role mapping:

| Role or class | Type size variable | Notes |
| --- | --- | --- |
| `f-display`, hero title | `Type/Size/Display` | Largest first-viewport headline |
| `f-h1`, page H1 | `Type/Size/4XL` | Standard page headline |
| `f-h2`, section H2 | `Type/Size/3XL` | Main section headline |
| `f-h3`, card group heading | `Type/Size/2XL` | Subsection headline |
| `f-h4`, card title | `Type/Size/XL` | Card and compact heading |
| `f-lead`, intro paragraph | `Type/Size/LG` | Lead copy and hero supporting text |
| `f-body-lg` | `Type/Size/MD` | Large body copy |
| `f-body`, Body text, CMS rich text | `Type/Size/Base` | Default paragraph text |
| `f-label`, eyebrow, section label, button, nav | `Type/Size/SM` | UI labels and short controls |
| `f-caption`, footnote, metadata, tag | `Type/Size/XS` | Small supporting text |

## Class Naming

Use BEM-lite:

- `block`
- `block__element`
- `block--modifier`
- `block__element--modifier`

Rules:

- Lowercase and hyphen-separated.
- No vague generated names such as `wrapper1`, `div-copy`, `section2`, or
  `block2`.
- State classes use `is-active`, `is-open`, `is-hidden`.
- Utility classes are rare and prefixed with `u-`.

Common blocks:

| Surface | Class |
| --- | --- |
| Navigation | `nav` |
| Hero section | `section-hero` |
| About section | `section-about` |
| Services section | `section-services` |
| Cases section | `section-cases` |
| CTA section | `section-cta` |
| Footer | `footer` |
| Container wrapper | `container` |
| Card | `card` |
| Button | `btn` |

## Flexible Section BEM Structure

Build content sections with a stable structural spine and flexible role zones.
The invariant is hierarchy and role clarity, not identical DOM in every
section.

```text
section.section-[name]
  div.container
    div.section-[name]__inner
      [role zones...]
```

Required spine:

- `section.section-[name]`
- `div.container`
- `div.section-[name]__inner`

Allowed role zones inside `section-[name]__inner`:

| Role zone | Use |
| --- | --- |
| `section-[name]__head` | Intro/header zone: eyebrow, title, summary |
| `section-[name]__txt` | Text zone when the section is split or text-led |
| `section-[name]__cnt` | Main content zone |
| `section-[name]__media` | Image, video, visual, canvas, or embed |
| `section-[name]__list` | Repeated content wrapper, preferably `ul` |
| `section-[name]__item` | Repeated item, preferably `li` |
| `section-[name]__actions` | CTA buttons and text links |
| `section-[name]__foot` | Footer note, secondary CTA, legal, or metadata |

Optional text-zone children:

```text
div.section-[name]__txt
  div.section-[name]__title
    h2/h3/h4/h5/h6.section-[name]__heading.[live-typography-class]
  div.section-[name]__desc
    p.section-[name]__body.[live-body-class]
    span.section-[name]__note.[live-caption-class]
```

- Use `section-[name]__title` when the text zone needs one or more headings.
  Choose the heading tag by document outline, not by visual size.
- Use `section-[name]__desc` for supporting copy, multiple paragraphs, inline
  spans, notes, or mixed text fragments.
- Give text elements both a section-owned BEM class and the closest live
  Webflow typography class or typography variable. Do not assume names such as
  `f-body-1`, `f-h2`, or `f-label`; inspect the live Webflow styles and
  variables first, then attach the actual declared class or variable.
- `__txt` may contain a direct heading and paragraph for very simple sections,
  but prefer `__title` and `__desc` when the section has more than one text
  child or needs clearer Navigator editing.
- `__head` may use the same internal `__title` and `__desc` pattern when a
  header zone needs explicit heading/copy groups.
- `section-[name]__cnt` should default to `margin-top: Space/08` (`64px`)
  when it follows `__head` or `__txt`. Bind the margin through the spacing
  variable, not a raw `64px` value.
- The `__cnt` margin is a default rhythm, not a lock. Override it per section
  with a section modifier, a more specific section-owned class, or breakpoint
  styles when the design needs tighter or looser spacing.

Default class stacks for component templates:

| Element | Section-owned class | Live typography binding |
| --- | --- | --- |
| Eyebrow/label | `section-[name]__eyebrow` | Inspect live label/eyebrow class or variable |
| Main heading | `section-[name]__heading` | Inspect live heading/title class or variable |
| Subheading | `section-[name]__heading` | Inspect live subtitle/card-title class or variable |
| Body copy | `section-[name]__body` | Inspect live body class or variable |
| Lead copy | `section-[name]__body` | Inspect live lead/intro class or variable |
| Note/meta | `section-[name]__note` | Inspect live caption/meta class or variable |
| Content zone | `section-[name]__cnt` | `margin-top: Space/08` default |

Recommended section variants:

```text
// Text-only
section.section-[name]
  div.container
    div.section-[name]__inner
      div.section-[name]__head

// Split
section.section-[name]
  div.container
    div.section-[name]__inner
      div.section-[name]__txt
        div.section-[name]__title
          h2.section-[name]__heading.[live-heading-class]
        div.section-[name]__desc
          p.section-[name]__body.[live-body-class]
      div.section-[name]__cnt

// Content-first split
section.section-[name]
  div.container
    div.section-[name]__inner
      div.section-[name]__cnt
      div.section-[name]__txt

// Header plus grid/list
section.section-[name]
  div.container
    div.section-[name]__inner
      div.section-[name]__head
      ul.section-[name]__list
        li.section-[name]__item

// Header plus media and actions
section.section-[name]
  div.container
    div.section-[name]__inner
      div.section-[name]__head
      div.section-[name]__media
      div.section-[name]__actions
```

Rules:

- Use `section-[name]` as the block class for page sections.
- Use section-owned BEM for page-specific children: `__inner`, `__head`,
  `__txt`, `__cnt`, `__media`, `__list`, `__item`, `__actions`, and `__foot`.
- `container` constrains max width and horizontal padding only. Put section
  layout, grid, flex, gap, alignment, and ordering on `section-[name]__inner`.
- Visual order can change per breakpoint, but Navigator hierarchy should stay
  understandable.
- Use semantic `ul` and `li` for repeated content unless the content must be a
  CMS Collection List or another Webflow-native element.
- Avoid generic names such as `wrapper`, `content`, `box`, `left`, `right`,
  `area`, `group`, `div-copy`, and `text-area`.
- Keep role zones visible in the Designer Navigator so future edits are
  predictable without forcing every section to have every zone.

## Fonts

Use uploaded/custom fonts only:

| Family | Primary use |
| --- | --- |
| Pretendard | Korean body and UI |
| Inter | English UI, captions, data |
| Noto Serif KR | Korean display/headings |
| EB Garamond | English display and pull quotes |

Do not load Google Fonts. If a needed weight is missing, upload/register the
font file before applying the style.

## Layout And Build Defaults

- Prefer Designer-native layout blocks and Webflow components over custom code.
- Build desktop base first, then tablet and mobile overrides.
- Keep structures self-editable for the client: predictable sections, clear
  classes, clean CMS fields, and minimal hidden custom logic.
- Use CSS grid for multi-column content and flex for one-dimensional alignment.
- Use `gap` over child margins when matching repeated spacing.
- Use uploaded assets through Webflow Asset Manager where possible.

## Components And Pages

Build smallest reusable units first:

| Tier | Examples | Webflow target |
| --- | --- | --- |
| Atom | Button, chip, badge, icon | Component or reusable class |
| Molecule | Card, form field, nav item | Component |
| Organism | Nav, hero, footer, service section | Component or section |
| Page | Home, detail pages | Webflow page |

For CMS-backed UI, create or inspect the CMS schema before binding UI.

Component structure rules:

- Do not componentize full page sections unless the same structure is reused on
  multiple pages.
- Componentize repeated inner pieces by default: cards, tabs, stats, badges,
  logo items, media units, accordion items, form rows, and CTA/button groups.
- A section component may own `section > container > inner` only when section
  reuse is real.
- A content component goes inside `section-[name]__cnt`.
- A card or item component goes inside `section-[name]__item`.
- A CTA or button component goes inside `section-[name]__actions`.
- Prefer Webflow component slots only when inner content changes often but the
  wrapper must remain reusable.
- Avoid deep component nesting beyond section > list/item > atom or molecule.

## Animation And Custom Code Safety

- Use one animation system per element.
- Do not target the same element with both AOS and GSAP.
- Do not use Lottie or JSON animation players.
- Load THREE.js per-page only, never globally.
- Put page-specific custom code on the page, not site-wide, unless explicitly
  justified.
- Never embed Webflow API tokens or secrets in client-side code.

Read `.claude/rules/custom.md` before animation or custom-code mutations until
that reference is migrated.

## Publish Safety

Never publish automatically.

Before `publish_site` or equivalent:

1. Run or describe the pre-publish checklist.
2. Confirm target domains and whether the Webflow subdomain is included.
3. Ask the user for explicit confirmation.

Read `.claude/rules/init.md` and `.claude/rules/performance.md` before publish
work until those references are migrated.

## Verification

Match verification to risk:

- **Style/variable edits**: confirm variable bindings and class names.
- **Element structure**: verify hierarchy in Designer or with element snapshots.
- **Components**: verify instance slots/properties and affected component IDs.
- **Assets**: verify Webflow asset IDs, alt text, filenames, and rendered
  dimensions.
- **CMS-backed UI**: verify required fields, slugs, references, and sample item
  binding.
- **Responsive work**: check desktop, tablet, mobile landscape, and mobile
  portrait.
- **Performance-sensitive work**: report checks that could not be run.
