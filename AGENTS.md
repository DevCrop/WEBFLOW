# Webflow Project Instructions

contract_version: `2026-08-24.2`

## Active guidance

- This repository targets the current Webflow MCP `2.0.1` tool layout. Computer, browser, OAuth, and Bridge setup is documented in [`docs/webflow/mcp-2-setup.md`](docs/webflow/mcp-2-setup.md).
- The canonical class and variable contract is [`.agents/skills/webflow-design-system/references/class-contract.md`](.agents/skills/webflow-design-system/references/class-contract.md).
- For Webflow class, typography, color, spacing, component, or migration work, use [`.agents/skills/webflow-design-system/SKILL.md`](.agents/skills/webflow-design-system/SKILL.md).
- Read `rules/design-system.md` from the connected Webflow site before design-system writes. If its version differs, update the local and site copies in the same documentation batch before implementation; a stale copy is a synchronization task, not a permanent blocker.
- Current observations belong in [`docs/webflow/audit-baseline.md`](docs/webflow/audit-baseline.md); migration state belongs in [`docs/webflow/migration-register.md`](docs/webflow/migration-register.md).

## Non-negotiable gates

- Standalone text selectors MUST follow `[semantic tier] + [optional language] + [weight] + [color]`. Reusable component internals omit `[color]` and inherit it from the component's outermost owned root selector.
- A single component or text group MUST use one semantic tier consistently. `head`, `lead`, `normal`, `content`, and `micro` roles MUST NOT be mixed inside the same group.
- Canonical role weights are title `bold` (700), subtitle `semibold` (600), body `regular` (400), and eyebrow `medium` (500). The approved component exceptions are the `sub-visual` H1 and `intro-title` title, which MUST use `regular` (400) for both KO and EN. Weight remains a separate selector, MUST NOT be stored on `section-*` selectors or combos, and MUST NOT change by language variant.
- Canonical responsive sizes, line heights, and letter spacing are defined only in the class contract. Text sizes MUST NOT fall below 18px.
- Normal text-color selectors (`text-title`, `text-subtitle`, `text-body`, `text-desc`) MUST use white-family colors on dark surfaces. `-invert` selectors MUST use the neutral black scale `#000000`, `#111111`, `#222222`, and `#333333` on light surfaces. Invert never means white text.
- A reusable title, card, banner, or content component MUST NOT place `text-*` color selectors on internal text nodes. Its outermost owned root selector MUST bind the approved color variable, and component variants MUST switch color only on that root. Nested buttons, badges, links, or other independently themed components retain their own color ownership.
- Numeric, auto-generated, page-specific typography, `--legacy-*`, `--context-*`, `old-*`, and `new-*` selectors MUST NOT be created or reused.
- Supported typography, weight, color, and spacing values MUST be linked to Webflow variables. Search names, values, and usage before creating a variable.
- Do not repurpose a shared variable when different semantic roles require different values. Create a scoped semantic variable and rebind the intended canonical styles.
- Prefer one semantic variable binding on the base style plus automatic responsive variable modes for Tablet, Mobile Landscape, and Mobile Portrait. Retain breakpoint-specific style bindings only when the current Webflow capability or verified inheritance requires them.
- Preserve existing user work. Inspect the dirty tree before local edits and never revert unrelated changes.
- A user request to build, migrate, normalize, or fix a scoped design-system target authorizes the necessary non-destructive variable creation/update and canonical style rebinding within that target. Do not ask for repeated per-call confirmation.
- A class, variable, or component MUST NOT be deleted until sitewide usage is zero, custom-code references are zero, the replacement is verified, and the user separately approves deletion.
- The site MUST NOT be published without separate explicit approval.

## Webflow MCP execution baseline

- Use `webflow_guide_tool` first in a Webflow workflow.
- Use `data_style_tool.get_styles` with `query: "all"`, `include_properties: true`, and only the required breakpoints when auditing bindings. Filter the returned records locally by exact selector and style type.
- Use `data_variable_tool.get_variable_collections` and `get_variables` before creation or updates. Variable and style Data tools are headless; a Designer session is required only for canvas navigation, selection, or snapshots.
- Treat an earlier schema or connection failure as dated evidence. Retry with the current official action shape before declaring a capability unavailable.
- When the MCP style action cannot address an exact duplicate-name definition, use the official Webflow Designer API as the scoped fallback and verify the exact style ID before and after. Do not broaden the target or delete duplicates as a workaround.

Official references: [Codex project instructions](https://developers.openai.com/codex/guides/agents-md), [Codex skills](https://developers.openai.com/codex/skills), [Webflow MCP Data tools](https://developers.webflow.com/mcp/tools/data-tools), [Webflow MCP skill migration](https://developers.webflow.com/mcp/skills/skill-migration), [Webflow variables and responsive modes](https://help.webflow.com/hc/en-us/articles/33961268146323-Variables), [Webflow breakpoints](https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview), [Webflow variables refactor workflow](https://developers.webflow.com/mcp/prompts/variables-refactor), [Webflow classes](https://help.webflow.com/hc/en-us/articles/33961311094419-Classes).
