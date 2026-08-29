# Official Codex and Webflow Workflow

contract_version: `2026-08-30.1`

This document defines the operating sequence. Design values belong only in the class contract.

## Documentation model

Codex loads layered `AGENTS.md` guidance. Keep repository-wide rules concise and route detailed repeatable procedures to skills and focused reference files.

| Concern | Owner |
| --- | --- |
| Repository behavior | `AGENTS.md` |
| Repeatable Webflow procedure | `.agents/skills/webflow-design-system/SKILL.md` |
| Exact design contract | `class-contract.md` |
| Connected-site instruction | `rules/design-system.md` |
| Current evidence | `audit-baseline.md` |
| Migration lifecycle | `migration-register.md` |

## Webflow MCP operating model

Webflow Data tools work directly against project data and do not require an open Designer session. Designer/canvas tools are required for navigation, selection, and rendered visual verification.

Page-building Data tool actions require the exact `siteId` and `pageId`. Use the current specialized tools for elements, element settings, components, component props, component variants, styles, and variables.

## Read-before-write sequence

1. Call `webflow_guide_tool`.
2. Discover and confirm the site and page.
3. Read the connected `rules/design-system.md`; compare its contract version.
4. Read variable collections, modes, and variables.
5. Read styles with `query: "all"`, `include_properties: true`, and only required breakpoints.
6. Query elements, components, variants, props, and settings in the exact scope.
7. Search existing variable names, values, style paths, IDs, and usage.
8. Produce a mapping and impact report.
9. Apply a small batch.
10. Read the same records back before continuing.

## Variables and responsive work

Prefer one semantic variable binding on a base style. Use automatic responsive variable modes for Tablet, Mobile Landscape, and Mobile Portrait when they express the intended cascade. Use explicit breakpoint style overrides only when current read-back proves they are required.

Do not create a variable before checking collections, modes, names, values, aliases, and existing usage. Do not repurpose a shared variable across different semantic roles.

## Style and component work

- Filter style inventories locally by exact name, ID, combo path, and style type.
- Treat class order and combo parents as part of the selector identity.
- Keep stable component-role selectors across variants.
- Make variants switch root-owned variables.
- Preserve props, bindings, and instances unless explicitly in scope.
- Update the draft-only component catalog when component definitions change.
- For exact duplicate-name styles that MCP cannot address, use the official Designer API only with a verified style ID and verify that same ID afterward.

## Completion gate

| Gate | Required evidence |
| --- | --- |
| Mutation | Intended write returned success |
| Stored state | Same target read back with exact IDs and values |
| Responsive state | Every changed breakpoint verified |
| Variant state | Base inheritance and each changed variant verified |
| Rendered state | Designer DOM or element snapshot confirms visible result |
| Documentation | Audit and migration records match observed state |
| Publish | Separate explicit approval |

Failure of any required gate means incomplete, not complete.

## Failure handling

- Retry an old schema or connection failure using the current official action shape.
- Reduce large writes to component, section, or small style batches.
- Record the exact blocker and last verified state.
- Do not broaden scope, delete duplicates, or publish as a workaround.
- Do not promote an attempted mutation into the audit baseline.

## Native-first implementation

Prefer Webflow Components, variants, CMS, Forms, Navbar, Dropdown, Tabs, Slider, and Interactions when they meet the requirement. Use custom code only when the native path cannot meet the requirement, and record its owner, page, element, reason, validation, and removal condition in the migration register.

## Publication

Repository commits and pull requests do not publish Webflow. Webflow publication requires a separate user confirmation and the safe-publish workflow.

## Official sources

- https://developers.openai.com/codex/guides/agents-md
- https://developers.openai.com/codex/skills
- https://developers.openai.com/codex/mcp
- https://developers.openai.com/codex/hooks
- https://developers.webflow.com/mcp/tools/data-tools
- https://developers.webflow.com/mcp/prompts/variables-refactor
- https://developers.webflow.com/mcp/skills/skill-migration
- https://help.webflow.com/hc/en-us/articles/33961268146323-Variables
- https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview
