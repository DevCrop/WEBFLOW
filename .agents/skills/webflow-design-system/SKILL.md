---
name: webflow-design-system
description: Audit and migrate typography, color, spacing, variables, classes, and reusable components on the Intellectual Data Webflow site.
---

# Webflow Design System

contract_version: `2026-08-30.1`

Use this skill for every Webflow class, variable, typography, color, spacing, component, or page-migration task in this repository.

## Required context

Read these files before any write:

1. `references/class-contract.md`
2. `../../../rules/design-system.md`
3. `../../../docs/webflow/audit-baseline.md`
4. `../../../docs/webflow/migration-register.md`

Read the connected Webflow instruction `rules/design-system.md` before site writes. If its `contract_version` differs from the repository copy, treat synchronization as the first task.

## Workflow

1. Inspect the repository dirty tree and preserve unrelated user changes.
2. Call `webflow_guide_tool` at the beginning of the Webflow workflow.
3. Resolve the exact site, page, component, element, style, and variable IDs in scope.
4. Read variables with `data_variable_tool.get_variable_collections` and `get_variables`.
5. Read styles with `data_style_tool.get_styles`, using `query: "all"`, `include_properties: true`, and only the breakpoints required by the task.
6. Filter locally by exact selector name, ID, and style type. Search existing variables and usage before creating anything.
7. Report the intended mapping, affected IDs, variants, breakpoints, and rollback boundary.
8. Apply small, scoped writes. Prefer a base variable binding plus responsive variable modes.
9. Read every changed target back. Verify exact selector paths, variable IDs, component variants, and all changed breakpoints.
10. For user-visible changes, verify the rendered Designer state or element snapshot.
11. Record observed state in `docs/webflow/audit-baseline.md` and migration state in `docs/webflow/migration-register.md`.
12. Do not publish without separate explicit approval.

## Non-negotiable rules

- The class contract is the only source for selector composition and responsive values.
- Standalone text uses semantic tier + weight + color.
- Reusable component internals omit `text-*`; the owned root binds inherited text-color variables.
- Variants switch root variables, not internal color selectors.
- All semantic selectors bind `Font/Base`. Do not create or apply language selectors.
- One text group uses one semantic tier consistently.
- Content text never falls below 18px. Only independent UI text may use the 16px floor.
- Normal text colors are white-family colors for dark surfaces. Invert colors are the neutral black scale for light surfaces.
- Do not create numeric, page-specific, legacy, context, old, or new typography selectors.
- Do not delete a class, variable, component, or variant until site usage and custom-code references are zero, replacement verification passes, and the user separately approves deletion.
- Treat mutation success as acceptance, not proof. Completion requires read-back and rendered verification.

## Fallbacks

Retry a dated schema or connection failure with the current official action shape before declaring the capability unavailable. If an exact duplicate-name style cannot be addressed through MCP, use the official Webflow Designer API only for the verified style ID and confirm the same ID before and after. Never delete duplicates as a shortcut.

## Official references

- https://developers.webflow.com/mcp/tools/data-tools
- https://developers.webflow.com/mcp/prompts/variables-refactor
- https://developers.webflow.com/mcp/skills/skill-migration
- https://help.webflow.com/hc/en-us/articles/33961268146323-Variables
- https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview
- https://help.webflow.com/hc/en-us/articles/33961311094419-Classes
