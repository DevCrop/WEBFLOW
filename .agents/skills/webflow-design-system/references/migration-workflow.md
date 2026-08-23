# Webflow Migration Workflow

contract_version: `2026-08-24.1`

Use this workflow for INDA, shared components, sitewide typography, variables, and legacy removal. The class rules themselves live only in [`class-contract.md`](class-contract.md).

## 1. Batch lifecycle

Every target moves through:

```text
observed → mapped → migrated → zero-use → delete-approved → deleted
```

Exit conditions:

- `observed`: exact style/component ID, selector list, properties, variable bindings, usage locations, and breakpoint behavior captured.
- `mapped`: target three-class combination and parent state chosen; unresolved semantics are zero.
- `migrated`: target batch written and responsive/behavioral checks pass.
- `zero-use`: all pages, components, variants, CMS templates, and custom-code selectors report no reference.
- `delete-approved`: user approves the exact zero-use IDs for deletion.
- `deleted`: only approved individual IDs are removed and the post-delete audit passes.

Never jump states. A visual match alone is not migration evidence.

## 2. Preflight

1. Confirm connected site, Designer mode, current page, and branch.
2. Search site Agent Instructions. Synchronize a stale contract before design implementation instead of treating it as a permanent blocker.
3. Capture the target element tree and a visual snapshot when the tool supports it.
4. Query styles and variables using the current MCP 2.0 Data action shapes. Resolve duplicate names to the global, non-combo record that owns the intended declarations; retain its exact ID as evidence.
5. Query component definitions, instance counts, variants, and representative pages.
6. Read site/page custom code for selectors in the batch.
7. Write the scoped mapping and evidence to `docs/webflow/migration-register.md`. Unrelated pages and components do not block a non-destructive batch.

## 3. Canonical-style preparation

- Pick one existing style ID for each approved semantic, weight, standalone color, component root, structure, and state selector.
- Prefer the style ID with the correct global usage and variable bindings. Do not assume the oldest or most-used duplicate is correct.
- Remove disallowed properties from canonical semantic, weight, and color selectors only after listing every affected element and component.
- Bind supported values to existing semantic variables. Create a new semantic variable when a shared variable has conflicting role values; never overwrite a variable's meaning to avoid creation.
- Do not add declarations to combined text selectors. Standalone text composes semantic, weight, and color selectors; component text composes semantic and weight selectors while its root supplies inherited color.

## 3.1 MCP 2.0 typography-variable procedure

1. Read collections and every mode with `data_variable_tool.get_variable_collections` and `get_variables`.
2. Read styles with `data_style_tool.get_styles`, `query: "all"`, `include_properties: true`, and breakpoints `main`, `medium`, `small`, `tiny`.
3. Build an exact changeset: variables to reuse/create, Base bindings, inherited breakpoint declarations to remove, and expected resolved values.
4. Prefer a dedicated typography collection when legacy variables share incompatible semantics. Create automatic modes for `medium`, `small`, and `tiny` so responsive values apply without four separate style bindings.
5. Create or update variables before binding styles. Use longhand property names and `variable_as_value` for MCP style updates.
6. Update 2-4 properties per call when needed to avoid large action failures. Use the official Designer API only for exact-ID updates that the name-addressed MCP action cannot target.
7. Read variables and styles again after every coherent batch. Compare IDs, bindings, Base values, mode values, and resolved breakpoint values.

Official behavior sources:

- https://developers.webflow.com/mcp/tools/data-tools
- https://developers.webflow.com/mcp/prompts/variables-refactor
- https://help.webflow.com/hc/en-us/articles/33961268146323-Variables
- https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview

## 4. INDA pilot mapping

| Current | Target |
|---|---|
| `section-content-title + heading-52 + text-center` | text `section-head-title + bold + text-title`; parent `is-centered` |
| `section-content-index` | `section-content-index + bold + text-title` |
| `section-micro-title` | `section-micro-title + bold + text-title` |
| `section-content-subtitle` | `section-content-subtitle + semibold + text-subtitle` |
| `section-content-body` | `section-content-body + regular + text-body` |
| `section-content-sub-title` | `section-content-body + regular + text-body` |
| `section-content-eyebrow + sub-inda-caps__eyebrow` | `section-content-eyebrow + semibold + text-desc`; move section presentation to parent |
| `section-content-body + sub-inda-caps__check` | move checklist structure to wrapper; text `section-content-body + regular + text-body` |
| `section-micro-title + text-title-invert` | `section-micro-title + bold + text-title-invert` |
| `Paragraph 18 + section-micro-body` | `section-micro-body + regular + text-body-invert` |

Keep `swiper`, `swiper-wrapper`, and `swiper-slide` as functional classes on their existing functional elements.

Verification widths:

```text
1440px
991px
767px
375px
```

Check visual hierarchy, line wrapping, overflow, card height, content spacing, CTA behavior, Swiper controls, three-card preview, and five-second autoplay. Publishing remains a separate approval.

## 5. Shared-component batches

Migrate only after the INDA pilot is accepted.

### `intro-title`

```text
root     intro-title; Base color/text/title; invert color/text/title-invert
eyebrow  section-head-eyebrow + medium
title    section-head-title + lang-variant + bold
subtitle section-head-subtitle + semibold
body     section-head-body + regular
```

### `section-title`

```text
wrapper  section-title + is-centered when centered
root     section-title; Base color/text/title; invert color/text/title-invert
eyebrow  section-head-eyebrow + medium
title    section-head-title + bold
subtitle section-head-subtitle + semibold
body     section-head-body + regular
```

Component variants switch only the root color binding. Internal text never receives a `text-*` selector.

### `sub-visual`

```text
root     sub-visual; color/text/title
title    section-head-title + lang-variant + regular
KO       lang-variant font-family Font/Ko
EN       lang-variant font-family Font/En
```

The H1 uses the approved component-wide `regular` (400) exception in both languages. KO and EN variants switch only `font-family`; they MUST NOT override `font-weight`.

For each component, verify Base, invert, centered, and right-aligned variants on representative pages before expanding the batch.

### `intro-title-v2`

Replace both instances with the existing `intro-title` component. Map `heading-64 + regular + text-title-v2` to `section-head-title + bold`, inheriting color from the component root. The component and `text-title-v2` may move to `zero-use` only after both replacement instances and every variant/custom-code reference are verified.

## 6. Sitewide expansion order

1. Static pages using direct legacy selectors.
2. Shared components and every variant.
3. CMS template pages and bound content.
4. Site and page custom code.
5. Remaining duplicate and unused style definitions.

Complete audit → map → migrate → verify → register for one page or component batch at a time. Do not combine unrelated visual redesign with semantic migration.

## 7. Visual acceptance

For each batch:

- compare before/after snapshots at all required breakpoints;
- confirm hierarchy and contrast are clearer without changing content meaning;
- confirm text does not clip, overflow, or create unintended orphan lines;
- confirm card padding, content gaps, and section rhythm use variables;
- confirm interactive controls retain focus, click, keyboard, pagination, and autoplay behavior;
- confirm shared-component variants do not leak styles into one another.

## 8. Deletion and publication

Deletion is a separate operation. Query affected items and custom code again immediately before deletion. Delete only the exact approved style, variable, or component IDs; never run the global unused-class broom.

After deletion, repeat usage and responsive checks. Publication requires a second, separate explicit approval and a pre-publish review of staged changes.
