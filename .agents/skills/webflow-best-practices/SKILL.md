---
name: webflow-best-practices
description: Project-specific Webflow workflow for Intellectual Data. Use when Codex is asked to inspect, plan, create, update, audit, or publish Webflow pages, elements, styles, variables, CMS collections/items, components, assets, custom code, animations, responsive behavior, or Webflow performance for this project.
---

# Webflow Best Practices

Use this skill as the Codex operational wrapper for Intellectual Data Webflow
work. Keep `AGENTS.md` small, use this `SKILL.md` for routing, and load detailed
workflow material from `references/` only when needed.

## First Step

Read [references/rule-map.md](references/rule-map.md), then read only the
smallest listed reference needed for the task.

If Webflow MCP tools are needed but unavailable, stop and tell the user to
restart Codex or open a new chat after confirming `codex mcp list` shows
`webflow` as enabled and OAuth-authenticated.

## Task Routing

- **Webflow variables, styles, classes, pages, components, Designer mutations**:
  read `references/webflow.md`.
- **CMS schemas, CMS items, forms to CMS workflows**: read
  `.claude/rules/cms.md` until migrated.
- **GSAP, AOS, THREE.js, SVG animation, custom attributes, embeds**: read
  `.claude/rules/custom.md` until migrated.
- **Images, fonts, scripts, Core Web Vitals, pre-publish optimization**: read
  `.claude/rules/performance.md` until migrated.
- **Project setup, fonts, page order, pre-publish checklist**: read
  `.claude/rules/init.md` until migrated.

## MCP Mutation Workflow

For every Webflow mutation:

1. Identify the exact site, page, component, or CMS collection before editing.
2. Inspect current state first; do not invent IDs.
3. State a short plan with affected surfaces and reference-file basis.
4. Ask before destructive edits, bulk edits, deletes, renames, publishing,
   or client-visible content changes.
5. Apply the smallest useful change.
6. Report touched IDs when available.
7. Give a Designer or preview verification path.

## Non-Negotiables

- Prefer Webflow variables over raw values. Use `variable_as_value` whenever an
  equivalent project variable exists.
- Keep classes BEM-lite: `block`, `block__element`, `block--modifier`.
- Use uploaded fonts only: Pretendard, Inter, Noto Serif KR, EB Garamond.
- Build desktop base first, then tablet and mobile overrides.
- Never expose tokens or secrets in client-side code.
- Never auto-publish. Require explicit user confirmation.
- Do not use Lottie or JSON animation players.
- Do not let AOS and GSAP target the same element.
- Load THREE.js per-page only, never globally.

## Verification

Match verification to risk:

- **Style/variable edits**: confirm variable bindings and BEM-lite names.
- **CMS edits**: confirm required fields, slugs, references, and sample items.
- **Animation/custom code**: confirm load order, selectors, and no duplicated
  animation ownership.
- **Performance/publish work**: use `.claude/rules/performance.md` and
  `.claude/rules/init.md` until migrated.

Report any verification that could not be run.
