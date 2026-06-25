# AGENTS.md - Intellectual Data Webflow Project

This file is the Codex entrypoint for this Webflow workspace. Keep it concise.
Codex-specific workflow references live in `.agents/skills/`; legacy detailed
project rules remain in `.claude/rules/` until migrated.

## Project Context

- Webflow website rebuild for Intellectual Data (`intellectualdata.com`).
- Primary work happens in Webflow Designer through the Webflow MCP.
- This directory is not a normal app repository; most tasks are design-system,
  CMS, page-structure, asset, script, and publish-safety work.
- Existing Claude documents are legacy project references. Prefer Codex skill
  references when they exist, then read the relevant legacy rule file only for
  unmigrated areas.

## Rule Files To Read

- For Webflow Designer, CMS, asset, animation, performance, or publish-related
  work, use `$webflow-best-practices` first. It
  routes the task to the smallest relevant Codex reference or legacy
  `.claude/rules/*.md` file set and defines the MCP mutation workflow.
- `.agents/skills/webflow-best-practices/references/webflow.md`: Codex-first
  Webflow MCP setup checks, Designer mutation workflow, variables, class
  naming, style binding, component/page structure, assets, safety, and
  verification.
- `.claude/rules/init.md`: project background, requirements, setup order,
  custom fonts, page creation order, and pre-publish checklist.
- `.claude/rules/webflow.md`: design tokens, variable IDs, Home page structure,
  Webflow execution order, forbidden patterns, and class naming.
- `.claude/rules/custom.md`: GSAP, AOS, THREE.js, SVG animation, and custom
  attribute patterns.
- `.claude/rules/performance.md`: Core Web Vitals, image/font/script
  optimization, and pre-publish performance checks.
- `.claude/rules/cms.md`: CMS collection schemas and CMS safety rules.

## Non-Negotiable Rules

- Use Webflow variables for styling whenever an equivalent variable exists.
  Bind values through `variable_as_value`; do not hardcode colors, type sizes,
  line heights, letter spacing, spacing, widths, or layout tokens unless the
  rule file explicitly allows a one-off exception.
- Keep CSS class names BEM-lite: `block`, `block__element`,
  `block--modifier`. Do not create vague names such as `wrapper1`, `div-copy`,
  `section2`, or `block2`.
- Use uploaded/custom fonts only: Pretendard, Inter, Noto Serif KR, and
  EB Garamond. Do not load Google Fonts.
- Build CMS schemas before page elements that reference them.
- Do not embed Webflow API tokens or other secrets in client-side custom code.
  Route forms through Webflow webhooks and external automation.
- Do not use Lottie or JSON animation players. Use Webflow IX2, GSAP, AOS, SVG
  animation, CSS animation, or page-scoped THREE.js as documented.
- Do not publish automatically. Before `publish_site` or equivalent
  production-affecting actions, run or describe the pre-publish checklist and
  ask the user for explicit confirmation.

## Webflow MCP Workflow

For every Webflow mutation:

1. Read `$webflow-best-practices`, then the smallest relevant Codex reference
   or legacy `.claude/rules/*.md` file.
2. Inspect the current Webflow state through MCP before assuming IDs or
   existing structure.
3. State the planned changes, affected pages/components/CMS collections, and
   why the change matches the rule file.
4. Ask before bulk edits, destructive edits, deletes, renames, publishing, or
   changes that affect client-visible content.
5. Apply the smallest useful change.
6. Report every touched Webflow ID when available: site, page, element,
   variable, class, asset, component, collection, or item.
7. Finish with how to verify the change in Webflow Designer or preview.

## Design And Build Defaults

- Prefer Designer-native layout blocks and Webflow components over custom code
  unless the rule file requires custom behavior.
- Desktop base first, then tablet and mobile overrides, matching Webflow's
  cascade model.
- Keep structures self-editable for the client: predictable sections, clear
  classes, clean CMS fields, and minimal hidden custom logic.
- For animations, use one system per element. Do not target the same element
  with both AOS and GSAP.
- THREE.js is page-scoped only; never load it globally.
- Assets should go through Webflow Asset Manager where possible, with optimized
  formats and SEO-readable filenames.

## Verification

- For content or structure changes, verify in Webflow Designer or preview when
  MCP/tooling allows it.
- For variable or class changes, spot-check that style values are variable-bound
  and that names match the Codex Webflow reference.
- For CMS work, verify required fields, slugs, references, and sample items
  before binding UI.
- For performance-sensitive changes, check `.claude/rules/performance.md` and
  report any checks that could not be run.

## Encoding And Files

- Treat project markdown as UTF-8. Do not "fix" Korean text that only appears
  broken in a terminal; verify bytes before changing it.
- Keep Codex-specific durable guidance in this `AGENTS.md` and
  `.agents/skills/`. Keep Claude-specific skill shortcuts and Claude-only syntax
  in `CLAUDE.md` or `.claude/`.
