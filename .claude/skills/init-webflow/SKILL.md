---
name: init-webflow
description: Initialize this Webflow project in the correct order — fonts, variables, Home page structure. Reads rules/init.md and rules/webflow.md and executes sequentially. Use when starting a new session or when variables/pages need to be rebuilt from scratch.
---

# init-webflow

Executes the full Webflow project initialization for Intellectual Data.
Read `rules/init.md` and `rules/webflow.md` before taking any action.

## Execution Steps

### Step 1 — Pre-flight check
- Read `rules/init.md` and `rules/webflow.md` in full.
- Verify Designer is connected (call a read-only tool like `data_pages_tool` → list pages).
- If not connected, stop and tell the user to open Webflow Designer and load the connector.

### Step 2 — Color Variables
Tool: `variable_tool`
Collection: Base
Create all 14 color tokens from `rules/webflow.md` §1 in order.
Skip any token whose value is still `[TODO: hex]` and report it to the user after this step.

### Step 3 — Spacing / Size Variables
Tool: `variable_tool`
Create: `space-1` through `space-12`, then `section-pad-y-*`, `container-*` from `rules/webflow.md` §3.

### Step 4 — Typography Size Variables
Tool: `variable_tool`
Create: fluid `font-size-xs` through `font-size-display` from
`rules/webflow.md` section 2. Use the documented `clamp()` values; do not
recreate these as fixed `px` values.

### Step 5 — Create Home Page
Tool: `data_pages_tool`
Create page: name = "Home", slug = "/", title = "Intellectual Data".
Skip if a page with slug `/` already exists.

### Step 6 — Build Page Structure
Tool: `element_tool`
Build sections in order per `rules/webflow.md` §4:
nav → section-hero → section-about → section-services → section-cases → section-cta → footer

### Step 7 — Bind Styles to Variables
Tool: `style_tool`
Bind variable references as defined in `rules/webflow.md` §4 (element-by-element).
Do NOT hardcode any color or size value that has a variable equivalent. Map
default body text through Body or `f-body`, bound to `Type/Size/Base`.

### Step 8 — Report
After completion, output a summary block:
```
Variables created: N color / N spacing / N typography
Pages created: Home (/)
Sections built: nav, section-hero, section-about, section-services, section-cases, section-cta, footer
TODO remaining: [list any [TODO] color tokens still unfilled]
Verify in Designer: open Variables panel → check Base collection
```

## Rules

- Follow naming conventions exactly as listed in `rules/webflow.md`.
- Do not create any variable, element, or style not specified in the rules files.
- If a step fails, report the error and which step failed — do not skip ahead.
- Idempotent: if a variable or element already exists with the correct name, skip creation (do not duplicate).
