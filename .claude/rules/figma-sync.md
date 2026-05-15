# Figma → Webflow Sync — 100% Parity Guide
# Read before any Figma-driven Webflow build.
# Companion to webflow.md (Webflow-side rules) and WEBFLOW.md (global workflow).

---

## 0. The Rule

Figma is the source of truth for **visual spec**.
Webflow is the source of truth for **live output**.
When they diverge, **fix Webflow**. Never edit Figma to match a Webflow mistake.

Sync workflow: **Figma MCP → extract → map → build → diff → fix → verify**.

If any §2 checkbox is unchecked, do not start the build — fix the source first.

---

## 1. Project Identifiers

Fill these once and update on any Figma file change.

| Field | Value |
|-------|-------|
| Figma fileKey | `xPtU89prtaV0S6pDVjyck5` |
| Figma file URL | https://www.figma.com/design/xPtU89prtaV0S6pDVjyck5/ |
| Branch key (if branched) | (none) |
| Canvas — 웹플로우 전체시안 | `36217:601` |
| Section — contact 페이지 | `36260:8771` |
| Frame — Contact form | `36260:8773` |
| Symbol — contact 페이지 (Desktop 1920) | `36260:9424` |
| Section — 공통 컴포넌트 | `36260:8772` |
| Symbol — Header | `36260:8750` |
| Symbol — footer | `36260:8768` |
| Symbol — sub-visual | `36260:8752` |
| Symbol — breadcrumb | `36260:8753` |
| Symbol — modal | `36260:8770` |
| Symbol — backdrop | `36260:8769` |
| Main frame nodeId — Home Desktop 1440 | (pending — wireframe Figma file 별도) |
| Main frame nodeId — Home Tablet 768 | (pending) |
| Main frame nodeId — Home Mobile 375 | (pending) |
| Last sync timestamp | 2026-05-15 |

**Parsing the URL**: `figma.com/design/:fileKey/:fileName?node-id=:nodeId` — replace `-` with `:` in nodeId.
Branched: `figma.com/design/:fileKey/branch/:branchKey/:fileName` — pass `branchKey` to MCP calls.

---

## 2. Pre-Sync Checklist

### Figma-side (must be true BEFORE first sync)

- [ ] Variables defined in **Variables panel** (Mode-aware), not local color styles
- [ ] **All colors** come from Variables — zero raw hex on layers
- [ ] **All spacing** comes from Variables OR matches 8pt grid (4·8·12·16·24·32·48·64·80·96·128·160)
- [ ] **All text** uses Text Styles — zero inline overrides
- [ ] **All effects** (shadow, blur) use Effect Styles
- [ ] **All components** built with Auto Layout (no manual offset layouts in production frames)
- [ ] **Stroke alignment** set to **Inside** on every stroked layer (CSS cannot replicate Outside/Center)
- [ ] **No detached instances** in production frames — every reusable element is a component
- [ ] Components named meaningfully: `Card/Default`, `Button/Primary` — never `Component 47`
- [ ] Variants use **Property=Value** naming: `Size=LG`, `State=Hover`, `Theme=Dark`
- [ ] Font kerning set to **Metrics** (not Optical) — browsers default to Metrics

### Webflow-side (must be true BEFORE first sync)

- [ ] Custom fonts uploaded with **exact** family name match (case + space sensitive)
- [ ] All variables in [webflow.md §"Variable Index — Confirmed & Live"](webflow.md) created (55 variables live as of 2026-05-14)
- [ ] Global `box-sizing: border-box` set ([init.md §3](init.md))
- [ ] Reset `margin: 0; padding: 0` on `*`
- [ ] Pixel-perfect overlay tool ready (PerfectPixel extension or DevTools screenshot diff)

---

## 3. Variable Mapping

**Hard rule**: Figma variable name = Webflow variable name. **Case-sensitive. No translation layer.**

### 3.1 Naming convention enforcement

Figma path-style → Webflow variable name (identical, case-sensitive):
- `color/navy` → `color/navy`
- `container/2xl` → `container/2xl`
- `gap/xl` → `gap/xl`
- `display/1/font-size` → `display/1/font-size`
- `font-family/display` → `font-family/display`

If a Figma name uses camelCase or different prefix, **rename in Figma** — never create a parallel Webflow name.

**No semantic aliasing** (per list.todo line 32-34): each value is declared once with the raw token name. Do not create `spacing-section → gap/3xl` aliases.

### 3.2 Current variable count (rebuilt 2026-05-15)

| Collection | Count | Modes | Figma ID | Webflow ID |
|---|---|---|---|---|
| COLORS | 10 | default | `VariableCollectionId:36302:1617` | `collection-748e9712-1f35-7262-2827-9a99d120564f` |
| CONTAINER | 5 | default | `VariableCollectionId:36302:1628` | `collection-fb52e24e-4359-71cc-6ebd-e541c3593adb` |
| GAP | 9 | default | `VariableCollectionId:36302:1634` | `collection-17e5d53a-ade1-4340-6795-f114f9bae80c` |
| TYPO | 60 (15 levels × 4 props) | default | `VariableCollectionId:36302:1644` | `collection-62eb7c12-ce89-d036-d693-4494563da8a7` |
| VARIABLES | 4 | KR / EN | `VariableCollectionId:36302:1660` | `collection-77a13f90-3338-4274-6b80-2c45eefc891a` |
| **Total** | **88** | | | |

Full per-variable IDs and values → [webflow.md §"Variable Index — Confirmed & Live"](webflow.md).

### 3.3 Variable Modes (Light/Dark, KO/EN)

Figma Variable Modes → Webflow Variable Modes (1:1).
- Mode names identical (`Light`, `Dark`, `KO`, `EN`)
- If Figma has only one mode → only `Base` in Webflow
- This project currently uses single-mode (no dark mode confirmed by client)

### 3.4 Variable updates

When client updates a Figma variable value:
1. Note the variable name and new value
2. Update in Webflow via `variable_tool` (do not create a duplicate)
3. Echo the Variable ID to user for verification

---

## 4. Typography Mapping

### 4.1 Font family — exact match required

| Figma family name | Webflow uploaded as | Variable ID |
|-------------------|---------------------|-------------|
| Pretendard | `Pretendard` | `variable-2a9ad757-6dfe-3c12-0a7b-0d6a68ad5bd1` |
| Inter | `Inter` | `variable-e24148c6-1d26-f1c5-3651-691366dc1331` |
| Noto Serif KR | `Noto Serif KR` | `variable-cdcc2c56-5f0d-8376-1379-80977b929cbb` |
| EB Garamond | `EB Garamond` | `variable-317aaeb8-6d40-5101-8962-407fe113697c` |

**Gotcha**: If Figma uses `Pretendard Variable` (variable font), upload **static weights** in Webflow named `Pretendard`. Webflow's font matching is case + space sensitive. `Pretendard ` (trailing space) ≠ `Pretendard`.

### 4.2 Font weight numeric mapping

Always use **numbers** in Webflow, never weight names:

| Figma weight name | CSS weight number |
|-------------------|-------------------|
| Thin | 100 |
| ExtraLight | 200 |
| Light | 300 |
| Regular | 400 |
| Medium | 500 |
| SemiBold | 600 |
| Bold | 700 |
| ExtraBold | 800 |
| Black | 900 |

If Figma file shows `SemiBold` but Webflow only has `Regular`/`Bold` uploaded → upload `SemiBold` before any element uses it. Never let Webflow fake-bold a missing weight.

### 4.3 Line height conversion

| Figma input | Conversion | Webflow value |
|-------------|------------|---------------|
| `Auto` | Not deterministic — replace in Figma first | (don't sync until replaced) |
| `150%` | direct | `1.5` (unitless) |
| `24px` on 16px text | 24 / 16 | `1.5` (unitless) |
| `28px` on 18px text | 28 / 18 | `1.555…` → round to nearest existing `--line-height-*` variable |

**Rule**: Convert all Figma line-heights to unitless multipliers in Webflow. Unitless scales with `font-size`; px doesn't.

### 4.4 Letter spacing conversion

Figma uses px or %; Webflow uses em.

| Figma value | Conversion | Webflow value |
|-------------|------------|---------------|
| `0.32px` on 16px text | 0.32 / 16 | `0.02em` |
| `-2%` | Figma % is /100 of font-size, em is /100 of font-size | `-0.02em` |
| `0px` | direct | `0em` |

**Rule**: Always use em in Webflow — scales with font size.

### 4.5 Text Style → Webflow class

Each Figma Text Style becomes **one Webflow class**:

| Figma Text Style | Webflow class | Properties bound |
|------------------|---------------|------------------|
| `Display/01` | `text-display-01` | font-family + font-size + line-height + letter-spacing + weight |
| `Heading/H1` | `text-h1` | (same) |
| `Body/Base` | `text-body-base` | (same) |
| `Caption/SM` | `text-caption-sm` | (same) |

All values bound via `variable_as_value`. Zero hardcoded px.

---

## 5. Layout Conversion — Auto Layout → Flexbox

### 5.1 Direction

| Figma Auto Layout | Webflow |
|-------------------|---------|
| Horizontal | Flex direction = Row |
| Vertical | Flex direction = Column |
| Wrap enabled | + `flex-wrap: wrap` |

### 5.2 Resize behavior

| Figma resize | Webflow equivalent |
|--------------|---------------------|
| Fill container (W or H) | `width: 100%` / `height: 100%` OR `flex-grow: 1` |
| Hug contents | `width: auto` / `height: auto` |
| Fixed | exact px |
| Fill in parent + Min/Max | `min-width` / `max-width` |

### 5.3 Alignment — Figma 9-point picker → flex props

**Auto Layout direction = Horizontal:**

| Figma cell | justify-content | align-items |
|------------|-----------------|-------------|
| Top-Left | flex-start | flex-start |
| Top-Center | center | flex-start |
| Top-Right | flex-end | flex-start |
| Mid-Left | flex-start | center |
| Center | center | center |
| Mid-Right | flex-end | center |
| Bot-Left | flex-start | flex-end |
| Bot-Center | center | flex-end |
| Bot-Right | flex-end | flex-end |

**Direction = Vertical**: swap `justify-content` ↔ `align-items` from the table above (the main-axis flips).

### 5.4 Spacing mode

| Figma spacing | Webflow |
|---------------|---------|
| Packed, gap X | `gap: var(--space-X)` |
| Space Between | `justify-content: space-between`, no gap |
| Auto (Figma deprecated) | Replace in Figma — use Packed |

### 5.5 Padding

Figma per-side padding → Webflow per-side padding. **Always bind a `space-*` variable**.

Example: Figma Top 32 / Right 24 / Bottom 32 / Left 24:
- Webflow: `padding-top: var(--space-6)` (32px), `padding-right: var(--space-5)` (24px), `padding-bottom: var(--space-6)`, `padding-left: var(--space-5)`

If Figma padding is `26px` (not on 8pt grid): **fix Figma to 24 or 32** before syncing. Off-grid values break the design system.

### 5.6 Absolute children inside Auto Layout

Figma's "Ignore auto layout" toggle on a child:
- Webflow: child gets `position: absolute` + explicit `top`/`left`/`right`/`bottom`
- Parent must be `position: relative` (Webflow default for flex containers)

Mixed-positioning frames are sometimes unavoidable (decorative overlays, badges) — replicate exactly, but flag for review.

---

## 6. Effects & Decoration

### 6.1 Drop Shadow

Figma Drop Shadow → CSS `box-shadow`:

| Figma input | CSS output |
|-------------|-----------|
| X, Y | offset-x offset-y |
| Blur | blur-radius |
| Spread | spread-radius |
| Color (RGBA) | color |

Single shadow: `box-shadow: X Y B S color`
Multiple shadows: comma-separated, **top-most Figma layer first**.

### 6.2 Inner Shadow

Figma Inner Shadow → CSS `box-shadow` with `inset`:
`box-shadow: inset X Y B S color`

### 6.3 Border / Stroke

**Critical**: Figma Stroke alignment **must be Inside** before sync.

| Figma stroke alignment | CSS replicable? | Action |
|------------------------|-----------------|--------|
| Inside | Yes | `border: Xpx solid var(...)` |
| Center | No | Change to Inside in Figma |
| Outside | No | Change to Inside in Figma, expand element box by stroke width |

Multi-side strokes (top only, bottom only): use `border-top`, `border-bottom` etc.

### 6.4 Corner Radius

| Figma input | Webflow |
|-------------|---------|
| Uniform 8 | `border-radius: 8px` (bind a radius variable when reused) |
| Individual 8/8/0/0 (TL/TR/BR/BL) | `border-radius: 8px 8px 0 0` |
| Mixed with smoothing | Webflow has no "smoothing" — set Figma smoothing to 0% before sync |

### 6.5 Background Blur / Layer Blur

| Figma effect | CSS |
|--------------|-----|
| Background Blur | `backdrop-filter: blur(Xpx)` |
| Layer Blur | `filter: blur(Xpx)` |

Note: `backdrop-filter` works in all modern browsers. Confirm Safari behavior if targeting iOS < 14.

### 6.6 Blend modes

CSS-supported: `normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, luminosity`.

**Not in CSS**: `pass-through, plus-darker, plus-lighter`. Replace in Figma before sync.

---

## 7. Image & Asset Export

### 7.1 Format decision

| Content type | Format | Reason |
|--------------|--------|--------|
| Photograph, complex gradient | WebP | 30–50% smaller than JPEG, lossless option |
| Photograph w/ transparency | PNG | WebP transparency support inconsistent on older Safari |
| Icon, logo, simple shape | SVG | Vector — scales infinitely, tiny |
| Hero KV (full-bleed) | WebP @ 2x | Most viewport-dominant — optimize hardest |
| Animated illustration | GSAP + SVG / CSS | Lottie forbidden ([webflow.md §6](webflow.md)) |

### 7.2 Export resolution

| Use case | Export scale |
|----------|--------------|
| Hero / above-fold | 2x (3x only for premium-device target) |
| Section image | 2x |
| Thumbnail | 2x at displayed size |
| Icon | SVG (no scale needed) |

### 7.3 Naming convention

`section-purpose-variant@2x.format`

Examples:
- `hero-kv-desktop@2x.webp`
- `case-card-finance@2x.webp`
- `icon-arrow-right.svg`

### 7.4 Image element parity

Figma image fill with corner radius:
- **Preferred**: `<img>` with `border-radius` (works in all modern browsers)
- **Alternative**: Div with `background-image: url(...)` + `background-size: cover` + `border-radius`

---

## 8. Responsive Breakpoint Mapping

### 8.1 Figma frame widths → Webflow breakpoints

| Figma frame | Webflow breakpoint | Pixel range |
|-------------|---------------------|-------------|
| 1920 | Larger than desktop | 1920px+ |
| 1440 | Desktop (**base**) | 1280–1919px |
| 1280 | Desktop (base) | 1280–1919px |
| 1024 | Tablet (large) | 992–1279px |
| 768 | Tablet | 768–991px |
| 414 | Mobile landscape | 480–767px |
| 375 | Mobile portrait | up to 479px |

**Build order**: Desktop base first → override progressively smaller (Webflow's cascade direction).

### 8.2 Required Figma frames per page

Minimum: **Desktop 1440**, **Tablet 768**, **Mobile 375**.
Optional: 1024 only if layout meaningfully diverges from Tablet/Desktop.

If a Figma page is missing a breakpoint frame: **ask the designer**. Do not invent layouts.

### 8.3 Responsive prop mapping

| Figma resizing | Webflow behavior |
|----------------|-------------------|
| Fixed width on container | `max-width: Xpx` |
| Fill container | `width: 100%` — naturally responsive |
| Constraints: Left & Right | `width: auto; left: X; right: Y` |
| Constraints: Center | `margin: 0 auto` + `max-width` |
| Constraints: Scale | percentage-based width |

---

## 9. Component Mapping

Build smallest first, compose up.

### 9.1 Component hierarchy

| Tier | Examples | Built as |
|------|----------|----------|
| Atom | `btn`, `chip`, `input`, `icon`, `badge` | Webflow Component |
| Molecule | `card`, `nav-item`, `form-field`, `breadcrumb` | Webflow Component (composes atoms) |
| Organism | `nav`, `hero`, `footer`, `section-cases` | Webflow Component |
| Page | Home, Insight detail | Webflow Page (composes organisms) |

### 9.2 Variants → Component Properties

| Figma | Webflow |
|-------|---------|
| Variant property `Size=SM\|MD\|LG` | Component Property `size` (Text, options: SM/MD/LG) |
| Variant property `State=Default\|Hover\|Active` | CSS pseudo-states (not exposed as property) |
| Variant property `Theme=Light\|Dark` | Component Property `theme` (Text) OR Variable Mode |
| Boolean variant `hasIcon=true\|false` | Component Property `has-icon` (Boolean) |

### 9.3 Slots

Figma instance swap → Webflow Component **Slot**.
- Configure in Webflow: select the inner element → "Make this a slot"
- Slot accepts any child element when component is used

### 9.4 Naming

| Figma | Webflow |
|-------|---------|
| `Button/Primary` | `Button — Primary` (Webflow doesn't allow `/` in names) |
| `Card/Default` | `Card — Default` |
| `Nav/Item` | `Nav — Item` |

Keep variant property **names** identical (`size`, `state`, `theme`).

### 9.5 Mapping table (fill as components are built)

| Figma component | Figma node ID | Webflow component name | Webflow component ID |
|-----------------|----------------|------------------------|----------------------|
| [TODO] | [TODO] | [TODO] | [TODO] |

---

## 10. Known Mismatches & Workarounds

| Symptom | Root cause | Workaround |
|---------|------------|------------|
| Border looks 1px off | Figma stroke alignment ≠ Inside | Set Inside in Figma |
| Text slightly larger/smaller | Font weight rendering differs | Verify exact weight number; confirm font file uploaded |
| Shadow too soft / too sharp | Figma blur math differs from CSS box-shadow | Compare side-by-side; tune blur ±20% |
| Gradient banding | Figma exports 8-bit gradient | Use CSS gradient directly via Webflow gradient picker — never export gradient as raster |
| Image looks compressed | WebP quality default low | Re-export at higher quality |
| Element jumps on hover | Figma hover variant ≠ CSS transition | Add explicit `transition: all 200ms ease` on hovered properties |
| Mixed auto-layout + absolute | Figma allows complex nesting | Flatten in Figma OR use `position: relative` parent + `position: absolute` children |
| Custom font kerning differs | Figma Optical kerning vs browser default | Set Figma kerning to **Metrics** |
| Vertical text alignment off | Figma vertical-trim enabled | Disable Figma vertical trim; verify Webflow line-height |
| Italic missing | Italic weight not uploaded | Upload italic font file or replace with non-italic in Figma |
| Color slightly off | Figma using Display-P3 color space | Set Figma document color profile to sRGB |
| Spacing off by 1-2px | Figma uses visual bounds, Webflow uses box model | Verify both use `box-sizing: border-box` (Webflow default) |

---

## 11. MCP Workflow — Step-by-Step

### 11.1 First-time sync per page

```
Step 1 — Get metadata (structure without rendering)
  Tool: mcp__claude_ai_Figma__get_metadata
  Args: { fileKey, nodeId: "<page-frame-nodeId>" }
  Output: node tree with names, types, sizes

Step 2 — Pull variable definitions
  Tool: mcp__claude_ai_Figma__get_variable_defs
  Args: { fileKey }
  Output: every variable used in the file

Step 3 — Pull design context (tokens + structural details)
  Tool: mcp__claude_ai_Figma__get_design_context
  Args: { fileKey, nodeId: "<page-frame-nodeId>" }
  Output: styles, layout, tokens applied to nodes

Step 4 — Pull reference screenshot
  Tool: mcp__claude_ai_Figma__get_screenshot
  Args: { fileKey, nodeId: "<page-frame-nodeId>" }
  Output: PNG for visual diff

Step 5 — Diff & fill gaps
  - Figma variables vs Webflow variables → create missing Webflow variables
  - Figma text styles vs Webflow classes → create missing classes
  - Figma components vs Webflow components → identify gap, plan order

Step 6 — Build page structure
  Tools: element_builder, element_tool
  Rule: smallest reusable units first → compose up to page

Step 7 — Apply styles
  Tool: style_tool > update_style
  Rule: variable_as_value on EVERY property that has a matching variable

Step 8 — Verify (§12)
```

### 11.2 Code Connect

Code Connect maps Figma components to React/Vue/Svelte code components. **Not applicable here** — this project is Webflow, not React. Skip Code Connect; maintain §9.5 mapping table in this file instead.

(Exception: if/when this site uses Webflow Code Components — convertible React components — revisit Code Connect via `mcp__claude_ai_Figma__add_code_connect_map`.)

---

## 12. Verification Ritual

Run after each component / page is built — before declaring "done".

### 12.1 Side-by-side screenshot diff

1. Webflow Designer Preview: set viewport to **exact Figma frame width** (1440, 768, 375)
2. Take Webflow screenshot (DevTools → Capture full-page screenshot)
3. Pull Figma screenshot via `mcp__claude_ai_Figma__get_screenshot` for the same frame
4. Overlay:
   - Image editor at 50% opacity, OR
   - PerfectPixel browser extension overlay
5. **Acceptance threshold**: < 2px diff on any element edge; < 5% diff on any color sample

### 12.2 Computed style spot-check

For each notable element (hero text, CTA button, card title, primary nav):
1. Webflow published preview → DevTools → Inspect element
2. Confirm computed styles match Figma:
   - Color exact (use color picker on Figma export to verify hex)
   - Font-family, font-size, line-height, letter-spacing identical
   - Padding/margin/gap per-side identical
   - Border-radius per-corner identical
   - Box-shadow values identical

### 12.3 Per-breakpoint walkthrough

Test at: **1920 / 1440 / 1024 / 768 / 414 / 375**.
Watch for:
- Text reflow at intermediate widths
- Image scaling artifacts
- Nav transformation (desktop horizontal → mobile drawer)
- Hover/focus state visibility on touch widths

### 12.4 Variable binding audit

For each touched element:
```
Tool: style_tool > query_styles
Args: { include_all_breakpoints: true }
```
Confirm every color/font/spacing field reads `variable_as_value`, not hardcoded.

### 12.5 Order-match evidence (per CLAUDE.md)

| Acceptance criterion | Evidence form |
|----------------------|---------------|
| "Page matches Figma" | Side-by-side screenshot at each breakpoint |
| "All styles use variables" | `query_styles` output with `variable_as_value` keys |
| "Components match" | Webflow component IDs + Figma node IDs in §9.5 table |
| "Responsive works" | Per-breakpoint screenshot at 1440/768/375 |

---

## 13. Sync Cadence

| Trigger | Action |
|---------|--------|
| Figma file updated by designer | Re-run §11.1 for affected pages; diff via §12 |
| Webflow variable updated | Verify Figma matches; update Figma if Webflow has authoritative value (rare) |
| New component appears in Figma | Add to §9.5 mapping; build in Webflow before referencing pages |
| New page in Figma | Add nodeId to §1 table; run §11.1 |
| Figma file branched | Update §1 with branchKey; flag for merge tracking |

**Never sync without running §12.** A "looks right" build that doesn't pass verification is technical debt.

---

## 14. Failure Modes — Recovery Playbook

| Symptom | Most likely cause | First-pass fix |
|---------|--------------------|----------------|
| Color "almost right" | Display-P3 vs sRGB color space | Set Figma doc color profile to sRGB; re-export |
| Text wraps at wrong point | Font metrics differ between Figma & browser | Confirm exact weight number; verify uploaded font file |
| Padding off by 1-2px | Box-model mismatch | Confirm `box-sizing: border-box` on element + parent |
| Hover state missing | Webflow Hover state not configured | Webflow class state: Hover → bind hover-variant values from Figma |
| Component spacing collapsing | Margin used instead of gap | Replace margins with `gap: var(--space-*)` |
| Background image cropping unexpectedly | Parent overflow not set | Parent `overflow: hidden` + child `object-fit: cover` |
| Font appears, then flashes (FOUT) | Font file not preloaded | Add `<link rel="preload">` for primary weights ([init.md §5](init.md)) |
| Mobile layout broken | Built mobile-first instead of desktop-first | Rebuild starting from 1440 Desktop, then override smaller |
| Animation timing off | GSAP duration ≠ Figma prototype duration | Match Figma's "Smart Animate" duration; use same easing curve |
| Image aliased / blurry | Exported at 1x | Re-export at 2x (or 3x for hero) |

---

## 15. References

- [CLAUDE.md](../../CLAUDE.md) — project root rules
- [WEBFLOW.md (global)](C:/Users/nineonelabs003/.claude/WEBFLOW.md) — overall Webflow workflow rules
- [.claude/rules/webflow.md](webflow.md) — Webflow-side design tokens, BEM-lite naming, forbidden patterns
- [.claude/rules/init.md](init.md) — fonts, project init checklist, custom code
- Figma MCP docs: https://developers.figma.com/docs/mcp
- Webflow Variables docs: https://help.webflow.com/hc/en-us/articles/33961294303891
- Skills: `/figma-use`, `/figma-generate-design`, `/figma-code-connect`

---

## 16. Quick-Start When Figma URL Arrives

When the client shares the Figma file URL:

1. Parse URL → fill §1 fileKey + nodeIds
2. Run §11.1 Step 1–4 in parallel (4 MCP calls, independent)
3. Audit Figma against §2 Figma-side checklist; report any failed items to user
4. Diff Figma variables vs §3.2 Webflow variables; create missing ones
5. Confirm font family names match §4.1 (case-sensitive)
6. Build first component (smallest atom) → run §12.1 + §12.2
7. Iterate

---

## 17. "섹션 만들어줘" Command Pattern

User-facing single command (e.g. "Contact 섹션 만들어줘", "Hero 빌드해", "Footer build해") that triggers an end-to-end section build using the 88-variable design system.

### 17.1 Trigger recognition

Patterns:
- `<section name> (만들어|빌드|build) (줘|해)`
- `<section name> 섹션 생성`
- Korean examples: "Contact 섹션 만들어줘", "Hero 빌드해줘", "Footer 만들어"

### 17.2 Automated action sequence

1. **Preconditions check**
   - §1 `fileKey` is filled — if not, ask user for Figma URL
   - 88-variable system is live in both Figma and Webflow (see §3.2) — if not, redirect to variable rebuild
   - Webflow Designer is connected (active foreground tab)
2. **Locate Figma frame**
   - `get_metadata` on §1 canvas to find the matching section by name
   - On miss, ask user for exact nodeId
3. **Check CMS dependency**
   - If section references a CMS collection (per `rules/cms.md` table), create the collection first
4. **Confirm breakpoint frames**
   - Desktop 1440 / Tablet 768 / Mobile 375 required (per §8.2)
   - Missing breakpoints → report to user, do NOT invent layouts
   - Exception: if user has explicitly opted into "Desktop-only first, mobile later" mode, proceed at Desktop and flag the deferral
5. **Plan → Preview → Confirm → Apply** (per WEBFLOW.md §4)
   - Preview the planned element tree + variable bindings table
   - Wait for explicit confirm before mutations
   - Apply via `element_tool` + `style_tool` with `variable_as_value`
6. **Auto-verify** per §12 (screenshot diff at each breakpoint, variable-binding audit)
7. **Report touched IDs** per WEBFLOW.md §11 (pages, elements, styles, variables, CMS items)

### 17.3 Standard response template

```
## Plan
- Source frame: <section name> (nodeId: <id>)
- Breakpoints: Desktop / Tablet / Mobile (각 nodeId)
- CMS dependency: <yes/no — 컬렉션명>
- Variables to bind: <count>개 (모두 88-var index 내)
- New components: <list>

## Preview
<element tree + 적용 variable 표>

## Confirm? (y/n)
```

### 17.4 Variable selection rules (when picking which variable to bind)

When converting a Figma observed value to a binding, pick the **closest matching** named variable. If no match exists within ±5% tolerance, surface to user — do not silently round.

| Property | Source | Webflow type |
|---|---|---|
| Background color | COLORS (`color/*`) | Color |
| Text color | COLORS (`color/*`) | Color |
| Border color | COLORS (`color/*`) | Color |
| Font size | TYPO (`{level}/font-size`) | Size px |
| Line height | TYPO (`{level}/line-height`) | Size px |
| Letter spacing | TYPO (`{level}/letter-spacing`) | Number |
| Font weight | TYPO (`{level}/font-weight`) | Number |
| Font family | VARIABLES (`font-family/display` or `/sans`) | FontFamily |
| Gap / margin / padding | GAP (`gap/*`) | Size px |
| Container max-width | CONTAINER (`container/*`) | Size px |
| Input / header height | VARIABLES (`input-height` / `header-height`) | Size px |
| Anything else | Raw value with comment justifying non-token | — |

### 17.5 Out-of-scope (delegate to other passes)

- CMS collection schema design → `rules/cms.md`
- Form webhook + automation → defer to "시안컨펌전 가능" tasks
- Newsletter / icon library setup → defer
- Animation interactions → `rules/custom.md` after the structural build passes verification
