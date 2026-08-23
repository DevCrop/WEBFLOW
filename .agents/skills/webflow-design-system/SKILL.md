---
name: webflow-design-system
description: Audit and migrate typography, color, spacing, classes, variables, and shared components on the intellectualdata Webflow site. Use for design-system changes, INDA cleanup, legacy selector replacement, or class naming decisions; do not use for unrelated CMS content edits.
metadata:
  contract_version: "2026-08-23.8"
  webflow_mcp_version: "2.0.1"
---

# Webflow Design System

Use the connected Webflow site as the live implementation and the repository contract as the policy source.

## Required workflow

1. Read [`references/class-contract.md`](references/class-contract.md).
2. Read `rules/design-system.md` from the connected Webflow site's Agent Instructions.
3. Compare `contract_version`. If versions differ, synchronize the local contract and site rule before design implementation; instruction synchronization itself is allowed.
4. Read [`references/migration-workflow.md`](references/migration-workflow.md) for migration, component, variable, or deletion work.
5. Audit the scoped target's current styles, variables, breakpoints, and relevant consumers. Do not require an unrelated sitewide audit before a non-destructive scoped change.
6. Record the source-to-target mapping and impact in [`../../../docs/webflow/migration-register.md`](../../../docs/webflow/migration-register.md).
7. Migrate the smallest coherent batch. Reuse a variable only when its semantic meaning and responsive values match; otherwise create a scoped semantic variable and rebind the canonical style.
8. Verify the affected breakpoints, representative component variants, behavior, and current usage counts.
9. Update the migration register with observed evidence. Never advance a status without satisfying its exit condition.

## Execution rules

- Start every Webflow workflow with `webflow_guide_tool`.
- Prefer headless `data_style_tool` and `data_variable_tool` reads/writes. Do not wait for a Designer session unless canvas context or a snapshot is required.
- For styles, use `get_styles` with `query: "all"` and filter exact global, non-combo records locally. Duplicated empty or combo records do not invalidate the canonical global record.
- For responsive typography, prefer automatic variable modes linked to `medium`, `small`, and `tiny`, then bind each canonical style to its semantic variable once at Base.
- For standalone text, normal selectors use white-family variables on dark surfaces and `-invert` selectors use the neutral black scale from `#000000` through `#333333` on light surfaces.
- Reusable component internals MUST NOT carry `text-*` color selectors. Their outermost owned root selector binds one approved text-color variable and variants switch only that root color; typography, language, and weight remain on the text nodes.
- If an action is rejected, compare the payload with the current Webflow MCP Data tool documentation and retry the exact documented shape. Record a blocker only after the documented action and a scoped fallback both fail.
- When duplicate names prevent exact MCP mutation, use the official Designer API for that exact style ID; read back the same ID afterward.
- The user's scoped implementation request is sufficient approval for non-destructive variable/style updates described by the task. Pause only for an unresolved semantic choice, an out-of-scope impact, deletion, or publication.

Stop before deletion or publication when:

- any page, component, variant, CMS template, or custom-code use remains;
- the replacement has not passed responsive verification;
- the user has not separately approved the exact deletion or publication target.

## Evidence boundary

Policy belongs in the contract. Dated site facts belong in `audit-baseline.md`. Per-target progress belongs in `migration-register.md`. Do not copy volatile counts into this skill.

Official references:

- https://developers.webflow.com/mcp/tools/data-tools
- https://developers.webflow.com/mcp/prompts/variables-refactor
- https://help.webflow.com/hc/en-us/articles/33961268146323-Variables
- https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview
