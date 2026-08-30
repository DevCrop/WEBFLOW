# Webflow Project Instructions

contract_version: `2026-08-31.1`

## Active guidance

- The canonical class and variable contract is [`.agents/skills/webflow-design-system/references/class-contract.md`](.agents/skills/webflow-design-system/references/class-contract.md).
- For Webflow class, typography, color, spacing, component, or migration work, use [`.agents/skills/webflow-design-system/SKILL.md`](.agents/skills/webflow-design-system/SKILL.md).
- Read `rules/design-system.md` from the connected Webflow site before design-system writes. If its version differs, update the local and site copies in the same documentation batch before implementation; a stale copy is a synchronization task, not a permanent blocker.
- Current observations belong in [`docs/webflow/audit-baseline.md`](docs/webflow/audit-baseline.md); migration state belongs in [`docs/webflow/migration-register.md`](docs/webflow/migration-register.md).

## Non-negotiable gates

- Standalone text selectors MUST follow `[semantic tier] + [weight] + [color]`. Reusable component internals MUST omit `text-*`; their outermost owned root selector binds the approved inherited text-color variable and variants switch only that root color. `lang-ko`, `lang-en`, `lang-variant`, and other language selectors MUST NOT be created or applied; every semantic selector binds `Font/Base`. Alignment and component state belong on the parent structural selector.
- A single content component or text group MUST use one content tier consistently. `head`, `lead`, `normal`, `content`, and `micro` roles MUST NOT be mixed inside the same group. `ui` is reserved for independent interface controls and metadata and MUST NOT replace content typography.
- Canonical role weights are title `bold` (700), subtitle `semibold` (600), body `regular` (400), and eyebrow `medium` (500). The approved `sub-visual` H1 and `intro-title` title exceptions use `regular` (400) in every language variant. Weight remains a separate selector and MUST NOT be stored on `section-*` selectors or combos.
- Canonical responsive sizes, line heights, and letter spacing are defined only in the class contract. Long-form body text outside `micro` MUST NOT fall below 18px; `micro` body and subtitle may use the approved 16px floor, eyebrow may use the approved 14px floor, and canonical `section-ui-*` interface text may use the approved 14px floor.
- Normal text-color selectors (`text-title`, `text-subtitle`, `text-body`, `text-desc`) MUST use white-family colors on dark surfaces. `-invert` selectors MUST use the neutral black scale `#000000`, `#111111`, `#222222`, and `#333333` on light surfaces. Invert never means white text.
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

Official references: [Codex project instructions](https://developers.openai.com/codex/guides/agents-md), [Codex skills](https://developers.openai.com/codex/skills), [Webflow MCP Data tools](https://developers.webflow.com/mcp/tools/data-tools), [Webflow variables and responsive modes](https://help.webflow.com/hc/en-us/articles/33961268146323-Variables), [Webflow breakpoints](https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview), [Webflow variables refactor workflow](https://developers.webflow.com/mcp/prompts/variables-refactor), [Webflow classes](https://help.webflow.com/hc/en-us/articles/33961311094419-Classes).
