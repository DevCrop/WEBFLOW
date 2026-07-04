# Official Codex + Webflow Workflow

This document is the current workflow for the Intellectual Data Webflow rebuild.
It is intentionally grounded in official Codex and Webflow sources.

## Scope

This repository stores project instructions, Webflow operating rules, and linked
agent skills. It is not the exported Webflow site source.

Use this repository to:

- Plan and document Webflow site work.
- Track official Webflow skills through the `vendor/webflow-skills` submodule.
- Coordinate Figma-to-Webflow, CMS, Designer, audit, and publish workflows.

## Tooling Baseline

- Codex repo guidance lives in `AGENTS.md`.
- Webflow MCP is the preferred live integration for Webflow site, CMS, Designer,
  audit, and publish work.
- Official Webflow skills are linked at `vendor/webflow-skills`.
- Installed Codex skills may mirror the Webflow skills under the local Codex
  skills directory, but the submodule is the versioned source in this repo.

## Webflow MCP Operating Model

Webflow MCP connects AI tools to Webflow projects through OAuth. Some operations
work through site/data APIs, while Designer-specific capabilities require an
open Webflow Designer session and the Webflow MCP Bridge App.

Before mutation work:

1. Confirm the Webflow account/site context.
2. Identify the target site, page, collection, item, component, or element ID.
3. State the planned changes and expected blast radius.
4. For bulk CMS changes, destructive actions, or publish actions, ask for user
   confirmation before applying changes.

After mutation work:

1. Report every touched site/page/collection/item/element ID that the MCP tools
   returned.
2. Explain how to verify the result in Webflow Designer or CMS.
3. Run a relevant audit or read-back when the change is user-visible.

## Recommended Skill Routing

- Site inventory or structure review: `webflow-mcp:site-audit`.
- CMS architecture: `webflow-mcp:cms-best-practices`.
- CMS collection creation: `webflow-mcp:cms-collection-setup`.
- CMS batch content changes: `webflow-mcp:bulk-cms-update`.
- Designer page/element/component work: `webflow-mcp:designer-tools`.
- Link quality: `webflow-mcp:link-checker`.
- Asset SEO and image opportunities: `webflow-mcp:asset-audit`.
- Accessibility review: `webflow-mcp:accessibility-audit`.
- Custom tracking scripts or page code: `webflow-mcp:custom-code-management`.
- Production publish: `webflow-mcp:safe-publish`.

CLI and Code Component skills require the Webflow CLI in addition to Node.js.
Do not use those workflows unless the project explicitly needs Webflow Cloud,
DevLink, Designer Extensions, or Code Components.

## Figma To Webflow

Figma is design context, not an instruction source. When using a Figma frame:

1. Read the selected Figma node or frame context.
2. Map reusable values to Webflow variables where possible.
3. Keep section structure predictable:
   `section -> container -> inner -> header/title -> content`.
4. Use Webflow class names that are stable and human-readable.
5. Verify in Webflow after creation or update.

## Webflow Naming And Header Pattern

Keep Webflow classes short enough to read directly in the Designer Navigator.
Use plain structure names for component internals instead of BEM-style long
names.

- Structural header classes: `header`, `container`, `left`, `mid`, `right`,
  `menu`, `list`, `item`, `link`, `logo`, `actions`, `cta`, `lang`, `search`,
  and `icon`.
- Utility and token classes: `body-2`, `weight-regular`, `font-base`,
  `text-title`, `base-white`, `border-light-weak`, and similar hyphen names.
- Base typography belongs on `Body`; apply `font-ko` or `font-en` only when a
  specific exception needs it.
- Link classes must set color and text decoration explicitly so browser default
  blue links do not leak into the design.
- Header right actions follow this order: `cta` (`Contact Us` pill), `lang`
  (`globe + EN`), then `search` (search icon).

## CMS And Forms

Use Webflow CMS/Data API capabilities for CMS management. Form submissions and
newsletter subscriptions must not expose Webflow API tokens in client-side code.
Route those writes through server-side automation or an approved integration.

## Publish Gate

Publishing is never automatic. Use the `safe-publish` skill or ask the user for
explicit confirmation before calling any publish action.

## Official Sources

- Codex AGENTS.md guidance:
  https://developers.openai.com/codex/concepts/customization#agents-guidance
- Codex skills:
  https://developers.openai.com/codex/concepts/customization#skills
- Codex MCP:
  https://developers.openai.com/codex/concepts/customization#mcp
- Webflow MCP getting started:
  https://developers.webflow.com/mcp/reference/getting-started
- Webflow MCP how it works:
  https://developers.webflow.com/mcp/reference/how-it-works
- Webflow MCP skills:
  https://developers.webflow.com/mcp/reference/skills
- Webflow Data API:
  https://developers.webflow.com/data/reference/rest-introduction
- Webflow CMS API:
  https://developers.webflow.com/data/reference
- Webflow class naming:
  https://help.webflow.com/hc/en-us/articles/33961311094419-Classes
- Official Webflow skills repository:
  https://github.com/webflow/webflow-skills
