# Intellectual Data Webflow Design System Rule

contract_version: `2026-08-30.1`

This is the repository copy of the connected Webflow site instruction. Keep both copies byte-equivalent where practical and always keep the version equal.

## Source of truth

The complete class and variable contract is:

`.agents/skills/webflow-design-system/references/class-contract.md`

Do not redefine responsive typography or color values elsewhere.

## Before writes

1. Call `webflow_guide_tool`.
2. Resolve the exact site and page.
3. Read collections, modes, variables, styles, components, variants, and target elements.
4. Search existing names, values, IDs, and usage.
5. Report the intended mapping and affected scope.
6. Do not treat an earlier connection or schema error as current evidence.

## Class rules

- Standalone text uses semantic tier + weight + color.
- A content group uses one tier consistently.
- Reusable component internals omit `text-*`.
- The outermost owned component root binds inherited text colors.
- Light/dark variants switch variables on that root only.
- Alignment and component state belong to structural parents.
- All semantic typography binds `Font/Base`.
- Do not create or apply language selectors.
- Content is at least 18px; only independent UI controls may use 16px.
- Do not create numeric, generated, page-specific, legacy, context, old, or new typography selectors.

## Typography and color

- Shared title hierarchy: `sub-visual` 72, `intro-title` 64, `section-title` 48 on Desktop, with responsive values defined in the class contract.
- Canonical weights: title 700, subtitle 600, body 400, eyebrow 500.
- `sub-visual` and `intro-title` titles are approved 400 exceptions.
- Normal color selectors are white-family text for dark surfaces.
- Invert selectors are `#000000`, `#111111`, `#222222`, and `#333333` for light surfaces.
- Invert never means white.

## Variables and breakpoints

- Read variable collections and variables before creation or update.
- Read all relevant style properties and only the required breakpoints.
- Prefer one base semantic binding plus responsive variable modes.
- Verify Tablet, Mobile Landscape, and Mobile Portrait independently when changed.
- Create a scoped semantic variable instead of repurposing a variable owned by another role.

## Component rules

- Keep one stable role selector per internal element.
- A variant changes root variables rather than adding internal color classes.
- Media-only `sub-visual-media-*` components do not duplicate title typography.
- Preserve component props and instances unless the scoped request explicitly changes them.
- Update the draft-only component catalog when component structure, props, or variants change.

## Completion gate

A mutation is complete only when:

- the write succeeds
- the same target is read back
- exact IDs, selector paths, variables, and values match
- every changed breakpoint and variant matches
- rendered Designer state is verified for visible changes
- audit and migration documents are updated

If any check fails, record the observed state as incomplete.

## Safety

- Preserve unrelated user work.
- Do not delete until usage and custom-code references are zero, replacement verification passes, and the user separately approves deletion.
- Do not publish without separate explicit approval.

## Official references

- https://developers.webflow.com/mcp/tools/data-tools
- https://developers.webflow.com/mcp/prompts/variables-refactor
- https://developers.webflow.com/mcp/skills/skill-migration
- https://help.webflow.com/hc/en-us/articles/33961268146323-Variables
- https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview
