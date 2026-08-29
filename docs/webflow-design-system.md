# Webflow Design System Overview

contract_version: `2026-08-30.1`

This is the human-readable overview of the Intellectual Data Webflow design system. Exact selector composition, values, breakpoints, and variables live only in:

`.agents/skills/webflow-design-system/references/class-contract.md`

## Goals

- predictable semantic typography
- variable-backed colors and responsive values
- stable reusable component internals
- root-owned component color inheritance
- minimal page-specific CSS
- measurable MCP migrations with read-back
- no accidental publish

## Architecture

```text
section.[main-*|sub-*].section-padding
  no-container | no-container-xl
    [main/sub]-scope__inner
      text group
      section contents
```

Use shared structural classes for repeatable layout and short root-owned roles for custom section internals. Avoid generated, numeric, vague, and page-specific typography selectors.

## Typography model

Standalone text combines:

`semantic tier + weight + color`

A text group uses one tier consistently. Content is at least 18px; the 16px floor is reserved for independent UI. Shared title hierarchy, responsive sizes, line heights, letter spacing, and approved weights are defined only in the class contract.

Every semantic selector uses `Font/Base`. Language-specific selectors and typography variants are not part of the canonical system.

## Color model

Normal selectors are white-family text for dark surfaces. Invert selectors are black-family text for light surfaces. Invert never means white.

Standalone text applies the correct color selector. Reusable components do not apply global `text-*` selectors internally: their owned root binds inherited text variables and variants switch those root variables.

## Component model

Components keep stable internal role selectors:

```text
component-root
  component-media
  component-body
    component-title
    component-desc
    component-actions
```

Props own content. Variants own approved state and root variables. Internal classes do not change between light/dark variants. Media-only variants do not duplicate text styles owned by the parent component.

## Variables and responsive behavior

Search before creating. Bind a semantic variable once on the base style and prefer automatic responsive variable modes for Tablet, Mobile Landscape, and Mobile Portrait. Use explicit breakpoint bindings only when verified inheritance requires them.

Keep typography, weights, colors, spacing, radius, border, shadow, and layout values variable-backed. Create a scoped semantic variable when an existing variable has different ownership.

## Native-first rule

Prefer native Webflow Components, CMS, Forms, Navbar, Dropdown, Tabs, Slider, and Interactions. Custom code is a documented fallback with an owner, exact target, reason, verification path, and removal condition.

## Migration and verification

Use the Webflow design-system skill for all changes. Record:

- observed current state in `docs/webflow/audit-baseline.md`
- migration lifecycle in `docs/webflow/migration-register.md`

A successful mutation is not completion. Read back exact IDs, selector paths, variables, breakpoints, and variants, then verify visible output in Designer.

## Safety

Do not delete until usage and custom-code references are zero, replacement verification passes, and separate approval is given. Do not publish without separate explicit approval.

## Related documents

- `AGENTS.md`
- `.agents/skills/webflow-design-system/SKILL.md`
- `.agents/skills/webflow-design-system/references/class-contract.md`
- `rules/design-system.md`
- `docs/official-workflow.md`
- `docs/webflow/audit-baseline.md`
- `docs/webflow/migration-register.md`
- `docs/webflow-layout-flow-examples.md`
