# Intellectual Data Webflow Workflow

Codex-first operating hub for the Intellectual Data Webflow rebuild.

This repository stores current project instructions, official-source workflow
rules, and the official Webflow skills submodule. It is not an exported Webflow
site source tree.

## Current Files

- `AGENTS.md` - Codex project guidance.
- `docs/official-workflow.md` - official Codex + Webflow operating workflow.
- `vendor/webflow-skills` - official Webflow skills repository as a submodule.
- `.gitattributes` - UTF-8 text handling for durable instruction files.

## Quick Start

1. Open this repository in Codex.
2. Read `AGENTS.md`.
3. For Webflow work, use Webflow MCP and the Webflow skills.
4. Confirm before CMS bulk changes, destructive actions, or publishing.

## Current Webflow Conventions

- Token and utility classes use short hyphen names such as `body-2`,
  `weight-regular`, `font-base`, and `text-title`.
- Component structure classes stay short and match the Navigator hierarchy,
  such as `header`, `container`, `left`, `mid`, `right`, `menu`, `list`,
  `item`, `link`, `logo`, `lang`, `search`, and `cta`.
- Avoid BEM-style long names for Webflow structure classes.
- The header right action group is `cta` (`Contact Us`), `lang` (`globe + EN`),
  and `search` (search icon), styled from existing variables.

## Official Sources

- Codex customization:
  https://developers.openai.com/codex/concepts/customization
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
