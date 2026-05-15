# Webflow Designer Rules — Intellectual Data
# Claude reads this file before performing any Webflow Designer operations.
# Language: English (AI artifact) / Korean comments where needed

---

## MANDATORY: Variable-First Styling

**ALL style properties MUST use variables via `variable_as_value`. No exceptions.**

Rules:
- Color → always bind a `color/*` variable from COLORS collection. Never pass a raw hex.
- Font family → always bind a `font-family/*` variable from VARIABLES collection.
- Font size → always bind a `display/*/font-size`, `heading/*/font-size`, or `body/*/font-size` from TYPO.
- Line height → always bind a `*/line-height` from TYPO.
- Letter spacing → always bind a `*/letter-spacing` from TYPO.
- Font weight → always bind a `*/font-weight` from TYPO.
- Padding / margin / gap → always bind a `gap/*` from GAP collection.
- Container width → always bind a `container/*` from CONTAINER collection.
- Heights (input/header) → always bind `input-height` / `header-height` from VARIABLES.
- Hardcoded values are only allowed for one-off decorative values with zero reuse probability.

When calling `style_tool > update_style`, always use:
```json
{ "variable_as_value": "<variable-id>" }
```
not `{ "value": "..." }`.

**No semantic aliasing** — Use raw token directly (`gap/xl`), not aliased semantic names (~~`spacing-section → gap/xl`~~). Per list.todo rule (line 32-34).

---

## Variable Index — Confirmed & Live (2026-05-15)

**5 collections / 88 variables. Figma ↔ Webflow 1:1 sync. Group hierarchy via slash naming.**

### Collection IDs (Webflow)

| Collection | ID | Modes |
|---|---|---|
| COLORS | `collection-748e9712-1f35-7262-2827-9a99d120564f` | default |
| CONTAINER | `collection-fb52e24e-4359-71cc-6ebd-e541c3593adb` | default |
| GAP | `collection-17e5d53a-ade1-4340-6795-f114f9bae80c` | default |
| TYPO | `collection-62eb7c12-ce89-d036-d693-4494563da8a7` | default |
| VARIABLES | `collection-77a13f90-3338-4274-6b80-2c45eefc891a` | KR (`mode-c00fca94-da28-c9bb-c674-0159a6e7ccf1`) / EN (`mode-cbe5bd0d-dc3a-bdc7-c350-bba7fded5193`) |

### Collection IDs (Figma — file `xPtU89prtaV0S6pDVjyck5`)

| Collection | ID |
|---|---|
| COLORS | `VariableCollectionId:36302:1617` |
| CONTAINER | `VariableCollectionId:36302:1628` |
| GAP | `VariableCollectionId:36302:1634` |
| TYPO | `VariableCollectionId:36302:1644` |
| VARIABLES | `VariableCollectionId:36302:1660` (modes: KR `36302:4`, EN `36302:5`) |

### COLORS (10) — Type: Color

| Name | Value | Webflow Variable ID | Figma Variable ID |
|---|---|---|---|
| `color/navy` | `#00263b` | `variable-b674bd9e-dedb-4676-d47f-ea2525f1ef11` | `VariableID:36302:1618` |
| `color/blue` | `#00109e` | `variable-c665c94d-c706-4839-f4e1-3ed1a5722de5` | `VariableID:36302:1619` |
| `color/purple` | `#512944` | `variable-b30412b7-9072-6786-2140-56a59e2ff96c` | `VariableID:36302:1620` |
| `color/black` | `#000000` | `variable-64950201-4d23-36e1-aa56-382ec2ace921` | `VariableID:36302:1621` |
| `color/white` | `#ffffff` | `variable-b3cce01a-0406-e9a4-048d-87f0a2d6d11d` | `VariableID:36302:1622` |
| `color/gray-dark` | `#666666` | `variable-525f1107-f89c-ad4e-6046-c0fc058cff63` | `VariableID:36302:1623` |
| `color/gray-mid` | `#999999` | `variable-28f8c914-35e2-df32-dc27-b9ab303074ae` | `VariableID:36302:1624` |
| `color/gray-light` | `#dadada` | `variable-b4ae000f-2de3-0112-d108-858ab5e41007` | `VariableID:36302:1625` |
| `color/ivory` | `#efe5d9` | `variable-edebc614-ce08-a362-c282-d95c8f700830` | `VariableID:36302:1626` |
| `color/silver` | `#d2d4d4` | `variable-7bc3e8a9-a65c-846d-1892-18e26c5f5ebd` | `VariableID:36302:1627` |

### CONTAINER (5) — Type: Size (px)

| Name | Value | Webflow Variable ID | Figma Variable ID |
|---|---|---|---|
| `container/2xl` | 1664px | `variable-8380067a-f28a-1453-e76e-a8de02b4a365` | `VariableID:36302:1629` |
| `container/xl` | 1440px | `variable-f4006cb1-334f-f4ee-cda3-f27ceab80de0` | `VariableID:36302:1630` |
| `container/lg` | 1024px | `variable-5f0c4c67-9ce7-ddc4-bf86-79dedcede099` | `VariableID:36302:1631` |
| `container/md` | 768px | `variable-3e935183-dd46-e83d-8486-a7a944bc4962` | `VariableID:36302:1632` |
| `container/sm` | 544px | `variable-941842f9-fe31-0167-2afd-b681bebecf0a` | `VariableID:36302:1633` |

### GAP (9) — Type: Size (px)

| Name | Value | Webflow Variable ID | Figma Variable ID |
|---|---|---|---|
| `gap/4xs` | 2px | `variable-7802501e-d2bd-e453-339e-e4c0cee9f123` | `VariableID:36302:1635` |
| `gap/2xs` | 4px | `variable-2e630f2c-9874-4d81-08c9-21238abb49a7` | `VariableID:36302:1636` |
| `gap/xs` | 8px | `variable-0e73e5c5-dadd-3502-8b4c-0875dbde08b2` | `VariableID:36302:1637` |
| `gap/sm` | 16px | `variable-fc466f01-6d44-816e-4289-7563ef8a305a` | `VariableID:36302:1638` |
| `gap/md` | 24px | `variable-a8f01f3a-64c4-169a-3d06-8ca9adc76b18` | `VariableID:36302:1639` |
| `gap/lg` | 32px | `variable-2705b393-9ddc-9edb-525d-85dfffdfc98a` | `VariableID:36302:1640` |
| `gap/xl` | 48px | `variable-5e8c9a77-ae94-7d7b-f9c6-a9809cbf0f10` | `VariableID:36302:1641` |
| `gap/2xl` | 64px | `variable-8884ee5a-be71-4564-320e-efc5fc5d2515` | `VariableID:36302:1642` |
| `gap/4xl` | 96px | `variable-94197a1d-d205-cbea-32df-5b25436e3c44` | `VariableID:36302:1643` |

### TYPO (60) — 15 levels × 4 properties

**font-size: Size(px) · line-height: Size(px) · letter-spacing: Number · font-weight: Number**

| Level | font-size | line-height | letter-spacing | font-weight |
|---|---|---|---|---|
| `display/1` | 288px | 288px | -10 | 700 |
| `display/2` | 188px | 188px | -10 | 700 |
| `display/3` | 128px | 128px | -10 | 700 |
| `display/4` | 96px | 96px | -10 | 700 |
| `display/5` | 72px | 72px | -10 | 700 |
| `heading/1` | 64px | 72px | -10 | 700 |
| `heading/2` | 48px | 56px | -10 | 700 |
| `heading/3` | 36px | 40px | -10 | 600 |
| `heading/4` | 28px | 36px | -10 | 600 |
| `heading/5` | 24px | 32px | -10 | 600 |
| `body/1` | 20px | 28px | -16 | 400 |
| `body/2` | 18px | 28px | -16 | 400 |
| `body/3` | 16px | 24px | -16 | 400 |
| `body/4` | 14px | 20px | -16 | 400 |
| `body/5` | 12px | 18px | -16 | 400 |

> Full per-variable Webflow/Figma IDs available via `variable_tool > get_variables` on the TYPO collection. letter-spacing values are unitless Number — interpret as percent at apply-time (Figma default behavior) or convert manually when binding to CSS letter-spacing.

### VARIABLES (4, KR/EN modes)

| Name | Type | KR | EN | Webflow Variable ID |
|---|---|---|---|---|
| `font-family/display` | FontFamily | Noto Serif KR | EB Garamond | `variable-f5e0235c-54cf-540a-8d79-ccf3c481c16b` |
| `font-family/sans` | FontFamily | Pretendard | Inter | `variable-3e280973-0a5f-529d-a7c4-5fd246396cf1` |
| `input-height` | Size (px) | 48 | 48 | `variable-372c3af6-3c93-81ae-885b-5ff9a1db7399` |
| `header-height` | Size (px) | 80 | 80 | `variable-d2b75010-b3a4-9fae-b86e-69e701a18e91` |

### CSS naming convention (Webflow auto-prefixed)

Webflow generates CSS variable names from `{collection}/{path}` as `--_{collection-lowercase}---{path-with-slash-as-double-dash}`.

Examples:
- `color/navy` → `--_colors---color--navy`
- `gap/xl` → `--_gap---gap--xl`
- `display/1/font-size` → `--_typo---display--1--font-size`
- `font-family/display` → `--_variables---font-family--display`

### Legacy variables (Base collection) — to be ignored

Site still contains 95 legacy variables in `Base collection` (`collection-d70de15e-1039-6b8c-cd06-e42e3988e8ca`) from the previous design system attempt. Names differ (e.g. `color-brand-navy` vs the new `color/navy`) so no functional conflict. **Do not bind to or reference these.** Can be cleaned up manually in Designer when convenient — MCP delete is BETA-broken.

---

## Execution Order

1. ~~Create Variables~~ ✅ Done 2026-05-15 — 5 collections / 88 variables live in both Figma and Webflow
2. Map Figma layer styles to variables (Step 3 of list.todo)
3. Apply global styles in Webflow (bind variables to Body / All Elements)
4. Create pages and build structure in Webflow

---

## 2. Font Files (Webflow Site Settings → Custom Fonts)

Variable definitions live in §"Variable Index — Confirmed & Live" above. Below is the **font file upload requirement** — the variable values (e.g. `Noto Serif KR`) only render if the file is uploaded.

| Role | KR (Korean) | EN (English) | Format | Weights to upload |
|---|---|---|---|---|
| display (serif) | Noto Serif KR | EB Garamond | TTF | Regular 400 · SemiBold 600 · Bold 700 |
| sans (body/UI) | Pretendard | Inter | OTF/TTF | Regular 400 · Medium 500 · SemiBold 600 · Bold 700 |

Font files location: `docs/2026 Intellectual Data_Brand Assets-*/3. Font/`

**Rule**: Max 4 weights per family. Each extra weight = extra HTTP request → bigger CLS/LCP hit.

---

## 3. Home Page

### Page Info

| Field | Value         |
|-------|---------------|
| Name  | Home          |
| Slug  | /             |
| Title | Intellectual Data |

### Section Structure

> All variable refs below use the **new 5-collection naming** (see Variable Index above). Section padding falls back to `gap/4xl` (96px) since the simplified GAP set has no 128px slot.

#### 3.1 Navigation

- Element tag: `nav`
- Class: `nav`
- Layout: Flexbox, `justify-between`, `align-center`
- Position: Fixed, top 0, full width
- Background: `color/white` (transparent on scroll toggle optional)
- Children:
  - Logo image (left) — link to `/`
  - Nav links (center): About · Service · Cases · Contact
  - CTA button (right): label "문의하기", link to `#contact`

#### 3.2 Hero Section

- Element tag: `section`
- Class: `section-hero`
- Layout: Flexbox column, `align-center`, `justify-center`
- Min-height: 100vh
- Background: `color/navy`
- Children:
  - Eyebrow label — `body/5/font-size`, `color/white`
  - H1 heading — `display/5/font-size` (72px), `font-family/display`, `color/white`
  - Subheading paragraph — `body/1/font-size` (20px), `color/white`
  - CTA button group:
    - Primary button: `color/white` bg, `color/navy` text
    - Secondary button: outline `color/white`
  - Background layer: KV image `[IntellectualData]KV(3840x2160).png` or pattern overlay

#### 3.3 About / Mission Section

- Class: `section-about`
- Layout: 2-column CSS Grid (text left, visual/stat right)
- Padding: `gap/4xl` (96px vertical)
- Background: `color/white`
- Children:
  - Section label — `body/4/font-size`, `color/navy`
  - H2 heading — `heading/2/font-size` (48px)
  - Body paragraph — `body/3/font-size` (16px)
  - Stats row — 3 key numbers + descriptions

#### 3.4 Services Section

- Class: `section-services`
- Layout: CSS Grid, 3 columns on desktop / 1 column on mobile
- Padding: `gap/4xl`
- Background: `color/ivory` (subtle backdrop)
- Children:
  - Section header (label + H2)
  - Service cards × 3:
    - Icon (from `docs/.../7. Icon/PNG/1.Navy/`)
    - Card title — `heading/5/font-size` (24px)
    - Description — `body/3/font-size`

#### 3.5 Cases / Portfolio Section

- Class: `section-cases`
- Layout: CSS Grid, 2-column (horizontal scroll on mobile)
- Padding: `gap/4xl`
- Background: `color/white`
- Children:
  - Section header (label + H2 + "전체 보기" link)
  - Case cards × 4:
    - Thumbnail image
    - Tag chip
    - Card title — `heading/5/font-size`
    - Arrow link

#### 3.6 Contact CTA Section

- Class: `section-cta`
- Layout: Flexbox column, `align-center`
- Padding: `gap/4xl`
- Background: `color/navy`
- Children:
  - H2 heading — `color/white`, `heading/2/font-size`
  - Description — `color/white`, `body/2/font-size`
  - CTA button: label "문의하기", `color/white` fill

#### 3.7 Footer

- Element tag: `footer`
- Class: `footer`
- Layout: CSS Grid, 4 columns desktop / 2 tablet / 1 mobile
- Padding: `gap/2xl` (64px vertical)
- Background: `color/black`
- Children:
  - Logo (white variant from `docs/.../2. Logo/PNG/3_White/`)
  - Nav group × 3 (About / Service / Legal)
  - Contact info (email, address)
  - Bottom bar: copyright text + SNS icon links

---

## 4. Claude Execution Instructions

### Step 1 — Variables ✅ Done 2026-05-15

5 collections (COLORS / CONTAINER / GAP / TYPO / VARIABLES) / 88 variables in both Figma and Webflow. Variable Index above is canonical.

### Step 2 — Map Figma layer styles to variables

```
Tool: mcp__claude_ai_Figma__use_figma
Action: walk all layers in the Figma URL, replace raw hex/px with variable bindings
Rule: list.todo step 3. No double-declaration — bind directly to color/navy, gap/xl, etc.
```

### Step 3 — Create Page in Webflow

```
Tool: data_pages_tool
Action: create
Name: "Home"
Slug: "/"
SEO title: "Intellectual Data"
```

### Step 4 — Build Page Structure

```
Tool: element_tool
Action: create elements in order matching §3 structure (nav → hero → about → services → cases → cta → footer)
Rule: Webflow Div Block for layout. Apply class names exactly as listed in §3.
```

### Step 5 — Apply Styles

```
Tool: style_tool > update_style
Action: bind variable references via variable_as_value
Rule: Use variable_as_value whenever a variable exists. Do not hardcode any value that has a variable equivalent.
```

---

## 5. Forbidden Patterns

| Forbidden | Correct alternative |
|-----------|---------------------|
| Hardcoded color hex (`color: #1A2B4C`) | `variable_as_value` → `color/navy` |
| Google Fonts `@import` or `<link>` | Uploaded custom fonts only (Pretendard · Inter · Noto Serif KR · EB Garamond) |
| Hardcoded font-size px (`font-size: 40px`) | `heading/*/font-size` or `body/*/font-size` or `display/*/font-size` |
| Hardcoded line-height px | `*/line-height` from TYPO |
| Hardcoded letter-spacing | `*/letter-spacing` from TYPO |
| Hardcoded font-weight | `*/font-weight` from TYPO |
| Hardcoded spacing px | `gap/*` from GAP collection |
| Hardcoded container width px | `container/*` from CONTAINER collection |
| Semantic alias variables (`spacing-section → gap/3xl`) | Bind raw token directly (`gap/4xl`) — no double-declaration (list.todo line 32-34) |
| Generic class names: `wrapper1`, `div2`, `block-copy`, `text-area` | BEM-lite names (see §6) |
| THREE.js in global Site embed | Per-page only via Page Settings → Custom Code |
| Lottie or any JSON animation player | GSAP `svg-draw` or CSS `@keyframes` (see `custom.md`) |
| `publish_site` without user confirmation | Use `safe-publish` skill |
| Webflow API token in client-side `<script>` | Webhook → Make / Zapier / n8n → CMS API |
| Creating variables outside the 5-collection Variable Index | Add only to existing 5 collections, name matching Figma 1:1 |

---

## 6. CSS Class Naming — BEM-lite

Pattern: `block`, `block__element`, `block--modifier`, `block__element--modifier`

### Rules

- All lowercase, hyphen-separated words. No camelCase, no underscores in block/element names.
- Block = independent component: `nav`, `section-hero`, `card`, `footer`
- Element = child that only makes sense inside its block: `nav__logo`, `card__title`, `footer__col`
- Modifier = variation of a block or element: `btn--primary`, `card--featured`, `section--dark`
- State classes (JS-toggled): `is-active`, `is-open`, `is-hidden`
- Utility classes (single-purpose, use sparingly): `u-sr-only`, `u-visually-hidden`

### Section Classes

| Element           | Class                   |
|-------------------|-------------------------|
| Navigation        | `nav`                   |
| Hero section      | `section-hero`          |
| About section     | `section-about`         |
| Services section  | `section-services`      |
| Cases section     | `section-cases`         |
| CTA section       | `section-cta`           |
| Footer            | `footer`                |
| Container wrapper | `container`             |
| Section inner     | `section__inner`        |
| Section header    | `section__header`       |

### Component Classes

| Component         | Block          | Elements                              |
|-------------------|----------------|---------------------------------------|
| Card (generic)    | `card`         | `card__image`, `card__body`, `card__title`, `card__tag`, `card__link` |
| Button            | `btn`          | modifiers: `btn--primary`, `btn--secondary`, `btn--outline` |
| Nav link          | `nav__link`    | modifier: `nav__link--active`         |
| CMS list          | `cms-list`     | `cms-list__item`                      |

---

## 7. Brand Guide Cross-Check

Variables are seeded from the existing Figma file values (designer-set, presumed sourced from brand guide). One-time confirmation pass against:
`docs/2026 Intellectual Data_Brand Assets-.../1. Brand Guide/[IntellectualData]BrandGuide.pdf`

Cross-check the following values against the brand guide PDF. Update both Figma and Webflow if any mismatch — name stays the same, value updates via `update_color_variable` / `update_size_variable`.

- [ ] `color/navy` = `#00263b` (current — confirm against brand)
- [ ] `color/blue` = `#00109e`
- [ ] `color/purple` = `#512944`
- [ ] `color/ivory` = `#efe5d9`
- [ ] `color/silver` = `#d2d4d4`
- [ ] `color/gray-dark` = `#666666`
- [ ] `color/gray-mid` = `#999999`
- [ ] `color/gray-light` = `#dadada`
- [ ] Confirm TYPO scale (288/188/128/96/72 / 64/48/36/28/24 / 20/18/16/14/12) matches brand guide if it specifies
- [ ] Confirm CONTAINER widths (1664/1440/1024/768/544) are correct
- [ ] Confirm GAP scale (2/4/8/16/24/32/48/64/96) is correct

## 8. Implementation Status

| Phase | Status | Date |
|---|---|---|
| Figma variable rebuild (5 collections / 88 vars) | ✅ Done | 2026-05-15 |
| Webflow variable rebuild (mirror) | ✅ Done | 2026-05-15 |
| Figma layer mapping to new variables | ⏳ Pending | — |
| Webflow page/component build | ⏳ Pending | — |
| CMS · FORM · 뉴스레터 · ICON 통합 | ⏸ 보류 (시안컨펌 후) | — |
