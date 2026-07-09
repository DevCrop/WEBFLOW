# Intellectual Data Webflow Agent Workflow

Codex + Claude operating hub for the Intellectual Data Webflow rebuild.

This repository stores current project instructions, official-source workflow
rules, and the official Webflow skills submodule. It is not an exported Webflow
site source tree.

## Current Files

- `AGENTS.md` - shared project guidance and the source of truth for coding agents.
- `CLAUDE.md` - Claude Code bridge that imports `AGENTS.md`.
- `.claude/settings.json` - shared Claude Code project settings for sensitive-file read denials.
- `docs/official-workflow.md` - official Codex + Webflow operating workflow.
- `docs/webflow-design-system.md` - target class/variable/component rules (지향점).
- `docs/webflow-implementation-status.md` - **measured current site state (현재 사실). AI 에이전트가 먼저 읽을 문서.**
- `vendor/webflow-skills` - official Webflow skills repository as a submodule.
- `.gitattributes` - UTF-8 text handling for durable instruction files.

## Quick Start

1. Open this repository in Codex or Claude Code.
2. Codex reads `AGENTS.md`; Claude Code reads `CLAUDE.md`, which imports `AGENTS.md`.
3. For Webflow work, use Webflow MCP and the Webflow skills.
4. Confirm before CMS bulk changes, destructive actions, or publishing.

## Current Webflow Conventions

- Token and utility classes use short hyphen names such as `body-20`,
  `regular`, `fm-base`, and `text-title`.
- Component structure classes stay short and match the Navigator hierarchy,
  such as `header`, `header__container`, `no-container`, `inner`, `nav`, `nav-link`, `logo`,
  `actions`, `sub-section-txt`, `sub-section-txt-title`, `sub-section-txt-body`, and `section-contents`. Role names
  such as `logo` or `actions` are header scope combo classes, not standalone
  global utilities.
- Do not use ambiguous singleton classes such as `left`, `mid`, `right`,
  `txt`, `cnt`, `item`, `list`, `link`, and `lang`. Use final system
  classes, section-prefix BEM, or component internal role classes instead.
  The full ban list lives under "Do Not Use" in `docs/webflow-design-system.md`.
- `main-cta` and `sub-cta` are the only shared CTA roots. Do not create
  page-specific CTA roots such as `sub-legal-cta` or `sub-luminance-cta`.
- Reusable grids use layout-first names such as `grid-2`, `grid-3`, `grid-4`,
  `grid-3-9`, `grid-2-10`, `grid-4-8`, and `grid-6-6`; avoid content-specific
  names such as `card-list-3`.
- Text tags do not carry structure or section-specific classes. `h1`-`h6`
  use only `display-*`/`heading-*` + `text-*` + weight class combinations;
  `p` uses only `body-*` + `text-*` + weight class combinations. Add
  `fm-ko`/`fm-en` only when the content needs a specific font family.
- BEM is allowed for scoped page/component classes, but do not create
  `*__container` wrappers. Use `no-container` or `no-container-xl` for section
  width wrappers.
- The header right action group uses scoped `header actions` roles — contact
  button, language control, then search icon — styled from existing variables.
  Do not use global `lang`; use only `main-cta`/`sub-cta` for shared CTA sections.

## Official Sources

- Codex AGENTS.md:
  https://developers.openai.com/codex/guides/agents-md
- Codex skills:
  https://developers.openai.com/codex/skills
- Claude Code memory / CLAUDE.md:
  https://code.claude.com/docs/en/memory
- Claude Code settings:
  https://code.claude.com/docs/en/settings
- Webflow class naming:
  https://help.webflow.com/hc/en-us/articles/33961311094419-Classes
- Webflow MCP:
  https://developers.webflow.com/mcp/reference/getting-started
- Webflow MCP skills:
  https://developers.webflow.com/mcp/reference/skills
- Webflow Data API:
  https://developers.webflow.com/data/reference/rest-introduction
- Official Webflow skills:
  https://github.com/webflow/webflow-skills
