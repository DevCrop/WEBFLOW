# Intellectual Data Webflow Workflow

Codex-first operating hub for the Intellectual Data Webflow rebuild.

This repository stores current project instructions, official-source workflow
rules, and the official Webflow skills reference. It is not an exported Webflow
site source tree.

## Current Files

- `AGENTS.md` - Codex project guidance.
- `docs/official-workflow.md` - official Codex + Webflow operating workflow.
- `docs/webflow-design-system.md` - One-Class First Webflow design system.
- `docs/webflow-migration-audit.md` - current Webflow class and variable audit.
- `.gitattributes` - UTF-8 text handling for durable instruction files.

## Quick Start

1. Open this repository in Codex.
2. Read `AGENTS.md`.
3. For Webflow work, use Webflow MCP and Webflow skills first.
4. Confirm before CMS bulk changes, destructive cleanup, class deletion, or publishing.

## Current Webflow Convention

The current convention is One-Class First.

- General elements should have one role class whenever possible.
- Repeated section spacing may use shared classes such as `section-padding`, but every section still needs its own representative role class.
- `container`, `container-xl`, `section-inner`, `section-contents`, `placeholder`, `header`, `footer`, `button`, `card`, `banner`, `breadcrumb`, and `card-num` are allowed shared exceptions.
- Main uses readable BEM names such as `main-hero__container`, `main-core-service__grid`, and `main-cta__inner`.
- Utility combinations such as `grid-3 gap-lg`, `flex-col`, `text-*`, `padding-*`, and `margin-*` should be absorbed into role classes during migration.
- `display-*`, `heading-*`, and `body-*` are allowed only as the single typography class on text leaf elements.
- Variables stay generic value lists such as `space/*`, `size/*`, `type/*`, and `color/*`; page-scoped variables such as `space/main/*` are not allowed.
- Header and footer use component-owned classes such as `header-container`, `header-logo`, `footer-container`, and `footer-meta`; do not use generic `left`, `mid`, `right`, `item`, `list`, `link`, `cta`, or `lang`.
- Images, SVGs, graphics, illustrations, icons, and background assets stay as placeholders unless the user explicitly asks to insert or create them.
- All visual values should reference Webflow Variables.
- Publish is never automatic.

## Target Pages

Current migration scope:

- main
- about
- docusign
- legal system
- `/components` catalog

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
