# Webflow Migration Register

contract_version: `2026-08-30.1`

This file tracks migration state and evidence. It does not define design-system rules.

## Status values

- `planned`
- `in-progress`
- `verified-stored`
- `verified-live`
- `incomplete`
- `blocked`
- `retired`

## Active migrations

| ID | Scope | Target | Status | Evidence | Next action |
| --- | --- | --- | --- | --- | --- |
| DS-001 | Documentation | Synchronize repository and Webflow `rules/design-system.md` at version `2026-08-30.1` | planned | Repository copy created | Read and update connected site rule after MCP connection |
| DS-002 | Typography | `sub-visual 72 > intro-title 64 > section-title 48` | incomplete | Repository history only | Read exact variables, styles, breakpoints, variants, and rendered sizes |
| DS-003 | Color | Normal white-family; invert `#000/#111/#222/#333` | incomplete | Conflicting historical documentation | Audit variables and exact selector/component usage |
| DS-004 | Fonts | Every semantic selector uses `Font/Base`; no language selectors | planned | Canonical contract | Find all language selectors and component overrides |
| DS-005 | Components | Root-owned color variables; internal roles omit `text-*` | incomplete | Some component migrations were documented | Audit component definitions, variants, and instances |
| DS-006 | Legacy | Remove numeric/generated/page-specific/legacy typography use | planned | Historical names recorded | Obtain usage and custom-code reference counts; request deletion approval separately |
| DS-007 | Responsive | Prefer automatic responsive variable modes | planned | Official Webflow guidance | Audit variable modes and breakpoint-specific bindings |
| DS-008 | Evidence | Replace historical success claims with current read-back | planned | Audit baseline created | Revalidate scoped targets during future work |

## Historical records

Older migration details remain available in Git history through the former `docs/webflow-implementation-status.md`. They are historical context, not current evidence. Promote an item into this register only after its target, evidence, and next action are explicit.

## Entry requirements

Every new entry must include:

- stable migration ID
- exact site/page/component/element/style/variable scope
- requested final state
- status
- evidence level
- changed breakpoints and variants
- read-back result
- rendered verification result when user-visible
- publish state
- rollback or follow-up boundary

## Closure gate

Mark an entry `verified-live` only when mutation, stored-state read-back, responsive/variant read-back, rendered verification, and documentation agree. A successful tool response alone is not closure.
