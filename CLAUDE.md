# CLAUDE.md — Intellectual Data Webflow Project
# Auto-loaded by Claude Code on every session in this directory.

## Project Context

Webflow website rebuild for Intellectual Data (intellectualdata.com).
Client: 김민아 팀장 · mina@intellectualdata.com · 010-5205-2047
Status: 시안(Design) phase — wireframe delivered 05.11, client feedback in progress.
Full project history, milestone, and requirements → `rules/init.md` §0

## Rules Files

@.claude/rules/init.md          — Project history · client info · milestone · feature requirements · init checklist
@.claude/rules/webflow.md       — Design tokens (variables) · Home page structure · forbidden patterns · CSS naming · execution instructions
@.claude/rules/custom.md        — GSAP · AOS · THREE.js · SVG animation patterns · library load order
@.claude/rules/performance.md   — CWV targets · image/font/script optimization · pre-publish checklist
@.claude/rules/cms.md           — CMS collection schemas: Insight · Newsroom · Release Notes · Contact · Newsletter

## Non-Negotiable Constraints

1. **Interaction-first** — Client's top priority. Use Webflow IX2 + GSAP / AOS. No Lottie. No JSON-based animation players.
2. **Self-editable structure** — Client edits after launch. CMS and page structure must stay clean and predictable.
3. **Variable-only styling** — Never hardcode colors, font sizes, or spacing that have a variable equivalent. Always bind via `variable_as_value`.
4. **Class naming** — BEM-lite: `block`, `block__element`, `block--modifier`. No generic names (`wrapper1`, `div-copy`, `block2`).
5. **Custom fonts only** — Never load Google Fonts. Use uploaded fonts: Pretendard · Inter · Noto Serif KR · EB Garamond.
6. **CMS before UI** — Build collection schema before any page element that references it.
7. **Production gate** — Always call `safe-publish` skill or confirm with user before `publish_site`. Never auto-publish.
8. **No token exposure** — Never embed Webflow API tokens in client-side custom code. Route form submissions through webhooks + external automation.

## Webflow MCP Execution Pattern

For every mutation task:
1. Read relevant rules file(s)
2. State the plan (what changes, on which IDs, why)
3. Preview (diff / sample / variable table)
4. Confirm with user for bulk or destructive operations
5. Apply — echo every touched ID (page · element · variable · collection)
6. Report: "what changed / how to verify in Designer"

## Skill Shortcuts

| Task | Skill |
|------|-------|
| Full project init (fonts → variables → Home page) | `/init-webflow` |
| Site health check | `site-audit` |
| Bulk CMS item create/update | `bulk-cms-update` |
| Pre-publish safety check | `safe-publish` |
| Accessibility audit | `accessibility-audit` |
| Alt text / SEO file names | `asset-audit` |
