# Webflow Audit Baseline

contract_version: `2026-08-30.1`
observed_at: `2026-08-30 Asia/Seoul`
evidence_scope: `repository documentation only; live Webflow read-back pending`

This file contains current observations only. Intended rules belong in the class contract. Historical work belongs in the migration register.

## Site identity recorded in the repository

| Item | Recorded value | Verification |
| --- | --- | --- |
| Site | `intellectualdata` | Live revalidation required |
| siteId | `6a38f39fe95d43bbdbe5c71c` | Live revalidation required |
| Home pageId | `6a38f3a0e95d43bbdbe5c758` | Live revalidation required |
| SessionGuardian pageId | `6a48b6b0f4a8532139b152aa` | Live revalidation required |
| Publish policy | Separate explicit approval required | Repository rule |
| Last action in this documentation task | No Webflow mutation; no publish | Verified |

## Recorded design-system state

The previous implementation log reports the following, but this baseline does not promote those reports to live evidence:

- `sub-visual` title variables and a 72px Desktop hierarchy were created.
- `intro-title` uses a 64px Desktop hierarchy.
- section-title values have conflicting historical records, including 54px and the later approved 48px hierarchy.
- normal/invert color terminology is inconsistent across older documents.
- language-specific font utilities and variants remain in older documentation.
- component migrations were recorded for banner, card, num-row, SessionGuardian, Reveal, TypeDNA, Kiteworks, Docusign, and shared title components.
- publishing was generally recorded as not performed.

## Known documentation drift

| Area | Observed drift | Required live audit |
| --- | --- | --- |
| Canonical contract | Missing before this documentation branch | Confirm site rule version |
| Section title | Historical 54px and approved 48px both appear | Read variable and style bindings |
| Colors | Older docs reverse normal/invert semantics | Read exact color variables and usage |
| Language | Older docs use `fm-ko`, `fm-en`, KO/EN variants | Find selectors, styles, and component overrides |
| Component color | Older internal `text-*` classes may remain | Inspect component definitions and variants |
| Status evidence | Mutation logs often lack current rendered snapshots | Re-run stored and rendered verification |
| Legacy names | Numeric/generated/page-specific selectors are mentioned | Query exact usage and custom-code references |

## Required first MCP audit

After connecting Webflow MCP:

1. Call `webflow_guide_tool`.
2. Read the connected `rules/design-system.md`; compare `contract_version`.
3. Confirm site and page IDs.
4. Get variable collections, modes, and variables.
5. Get all styles with properties at `main`, `medium`, `small`, and `tiny` only where responsive inspection is required.
6. Query exact canonical selectors and forbidden selector patterns.
7. Inspect shared component definitions, variants, props, and instance counts.
8. Verify root-owned component color inheritance.
9. Record exact IDs, bindings, usage counts, and rendered values here.
10. Add each migration decision to the migration register.

## Evidence standard

Use one of these states:

- `verified-live`: current MCP read-back and rendered verification agree
- `verified-stored`: current MCP stored state agrees; rendered verification pending
- `documented-only`: present only in repository history
- `incomplete`: attempted or partially verified
- `blocked`: exact blocker recorded

Do not describe `documented-only` evidence as current Webflow state.
