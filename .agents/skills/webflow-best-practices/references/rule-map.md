# Rule Map

Use this map to choose the smallest reference set for a Webflow task.
Codex-first references live in this `references/` folder. Legacy detailed
project rules still live under `.claude/rules/` until migrated.

## Codex-First References

- `references/webflow.md`
  - Read for Webflow MCP setup checks, Designer mutation workflow, variables,
    class naming, style binding, component/page structure, assets, safety, and
    verification.

## Legacy References

- `.claude/rules/init.md`
  - Read for project background, client requirements, font upload order, page
    creation order, and pre-publish checklist.
- `.claude/rules/cms.md`
  - Read for CMS collection schemas, required fields, slugs, contact/newsletter
    handling, and CMS creation checklist.
- `.claude/rules/custom.md`
  - Read for AOS, GSAP, ScrollTrigger, SplitText, SVG animation, THREE.js,
    Font Awesome, footer/head embeds, and custom attribute conventions.
- `.claude/rules/performance.md`
  - Read for Core Web Vitals targets, image optimization, font rules, script
    limits, Webflow-specific performance checks, and pre-publish checks.

## Common Combinations

- **Create or update a Webflow section**:
  - Read `references/webflow.md`.
  - Also read `.claude/rules/custom.md` if the section includes animation or
    embeds.
- **Create CMS-backed UI**:
  - Read `.claude/rules/cms.md` first.
  - Then read `references/webflow.md` for layout and styling.
- **Add interaction or animation**:
  - Read `.claude/rules/custom.md`.
  - Then read `.claude/rules/performance.md` if scripts/assets are added.
- **Prepare publish or client handoff**:
  - Read `.claude/rules/init.md` and `.claude/rules/performance.md`.
  - Ask for explicit confirmation before publishing.

## Stop Conditions

Stop and ask the user before:

- Publishing.
- Deleting or renaming live Webflow pages, components, variables, styles, CMS
  collections, or CMS fields.
- Making bulk mutations.
- Adding third-party libraries not already approved in `.claude/rules/custom.md`.
- Hardcoding values that should be project variables.
