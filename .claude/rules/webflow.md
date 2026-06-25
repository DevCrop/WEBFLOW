# Webflow Designer Rules — Intellectual Data
# Claude reads this file before performing any Webflow Designer operations.
# Language: English (AI artifact) / Korean comments where needed

---

## MANDATORY: Variable-First Styling

**ALL style properties MUST use variables via `variable_as_value`. No exceptions.**

Rules:
- Color → always bind a `Color/*` variable. Never pass a raw hex.
- Font family → always bind a `Font/*` variable.
- Font size → always bind a `Type/Size/*` variable.
- Line height → always bind a `Type/Line/*` variable.
- Letter spacing → always bind a `Type/Track/*` variable.
- Padding / margin / gap / width / height → always bind a `Space/*` or `Layout/*` variable when one exists.
- Hardcoded values are only allowed for: one-off decorative values with zero reuse probability (e.g. a single pixel border, a 100% width).

When calling `style_tool > update_style`, always use:
```json
{ "variable_as_value": "<variable-id>" }
```
not `{ "value": "..." }`.

Variable collection ID (Base): `collection-d70de15e-1039-6b8c-cd06-e42e3988e8ca`

---

## Variable Index — Confirmed & Live (2026-05-14)

### Color Variables

| Designer Name         | CSS Variable                    | Value     | Variable ID |
|-----------------------|---------------------------------|-----------|-------------|
| Color/Brand/Navy      | `--color-brand-navy`            | `#0E253C` | `variable-cb42717e-6dbd-b2e8-cbef-8929c75cd220` |
| Color/Brand/Navy Dark | `--color-brand-navy-dark`       | `#07182A` | `variable-cfc35e0d-e26d-6e2a-bffb-38b232dd358c` |
| Color/Brand/Navy Light| `--color-brand-navy-light`      | `#1E4268` | `variable-8295a7d7-d7f9-8159-45ab-8fa60871dc46` |
| Color/Neutral/White   | `--color-neutral-white`         | `#FFFFFF` | `variable-b9f6c931-e84e-de33-119d-e3cf492b33ef` |
| Color/Neutral/Black   | `--color-neutral-black`         | `#000000` | `variable-ac159bf7-ce79-7950-0ff4-e07b7251fe18` |
| Color/Neutral/Light Gray | `--color-neutral-light-gray` | `#DADADA` | `variable-d2a4288a-6e30-7e7c-97c4-55003c69dd08` |
| Color/Neutral/Mid Gray | `--color-neutral-mid-gray`    | `#999999` | `variable-f2ea73d6-eb3b-0084-0179-ef3a935106ef` |
| Color/Neutral/Silver  | `--color-neutral-silver`        | `#B8B8B8` | `variable-31a5d22c-1373-148b-807a-cc57c488cb0e` |
| Color/Text/Primary    | `--color-text-primary`          | `#111418` | `variable-55693976-d8b5-fd2a-9975-816ff0fb5dee` |
| Color/Text/Secondary  | `--color-text-secondary`        | `#606476` | `variable-2292e556-ebc9-783b-022a-3d16f1eb4b10` |
| Color/Text/Inverse    | `--color-text-inverse`          | `#FFFFFF` | `variable-c396fa31-99e5-7073-b045-8ee65c34fdaa` |
| Color/BG/Primary      | `--color-bg-primary`            | `#FFFFFF` | `variable-54ab76e0-a47b-ad2e-d17e-0cf605851fd2` |
| Color/BG/Dark         | `--color-bg-dark`               | `#0E253C` | `variable-01d0beda-7370-e9fd-75e9-8fe2dd6e4da4` |
| Color/BG/Subtle       | `--color-bg-subtle`             | `#F5F7FA` | `variable-7e1fa62c-e5b1-4cc5-4223-228aaa916316` |

> Navy `#0E253C` extracted from official logo PNG. Navy Dark/Light are derived — update if client provides exact hex.

### Font Family Variables

| Designer Name       | CSS Variable          | Value           | Variable ID |
|---------------------|-----------------------|-----------------|-------------|
| Font/Pretendard     | `--font-pretendard`   | `Pretendard`    | `variable-2a9ad757-6dfe-3c12-0a7b-0d6a68ad5bd1` |
| Font/Inter          | `--font-inter`        | `Inter`         | `variable-e24148c6-1d26-f1c5-3651-691366dc1331` |
| Font/Noto Serif KR  | `--font-noto-serif-kr`| `Noto Serif KR` | `variable-cdcc2c56-5f0d-8376-1379-80977b929cbb` |
| Font/EB Garamond    | `--font-eb-garamond`  | `EB Garamond`   | `variable-317aaeb8-6d40-5101-8962-407fe113697c` |

### Typography Size Variables

All `Type/Size/*` variables use fluid `clamp()` values from `375px` to
`1920px`. The historic fixed sizes are treated as max values at `1920px`.

| Designer Name      | CSS Variable          | Value | Variable ID |
|--------------------|-----------------------|-------|-------------|
| Type/Size/XS       | `--font-size-xs`      | `clamp(11px, calc(11px + 1 * ((100vw - 375px) / 1545)), 12px)` | `variable-1a6865f4-513d-1178-567d-0eeb82ef6740` |
| Type/Size/SM       | `--font-size-sm`      | `clamp(13px, calc(13px + 1 * ((100vw - 375px) / 1545)), 14px)` | `variable-1d9dc520-ea8b-0070-d48b-05efec5640df` |
| Type/Size/Base     | `--font-size-base`    | `clamp(15px, calc(15px + 1 * ((100vw - 375px) / 1545)), 16px)` | `variable-63f1e5d5-ba05-6841-1784-14f4d98b1ae7` |
| Type/Size/MD       | `--font-size-md`      | `clamp(16px, calc(16px + 2 * ((100vw - 375px) / 1545)), 18px)` | `variable-5c4b3007-09e7-3e9a-1203-00fa9b446bae` |
| Type/Size/LG       | `--font-size-lg`      | `clamp(18px, calc(18px + 2 * ((100vw - 375px) / 1545)), 20px)` | `variable-98e4a649-5c21-37c7-5bf7-3dac358783b3` |
| Type/Size/XL       | `--font-size-xl`      | `clamp(20px, calc(20px + 4 * ((100vw - 375px) / 1545)), 24px)` | `variable-5ee12ed6-164e-4f49-5ed6-1d2f3d4c1656` |
| Type/Size/2XL      | `--font-size-2xl`     | `clamp(24px, calc(24px + 8 * ((100vw - 375px) / 1545)), 32px)` | `variable-69e4856d-018b-9f5e-3357-09f241402df1` |
| Type/Size/3XL      | `--font-size-3xl`     | `clamp(28px, calc(28px + 12 * ((100vw - 375px) / 1545)), 40px)` | `variable-198bf2d1-02b7-f56d-ea6d-30aacbef4e2b` |
| Type/Size/4XL      | `--font-size-4xl`     | `clamp(36px, calc(36px + 20 * ((100vw - 375px) / 1545)), 56px)` | `variable-b84712b2-ed6d-a8b7-f814-a01469875d2c` |
| Type/Size/Display  | `--font-size-display` | `clamp(44px, calc(44px + 28 * ((100vw - 375px) / 1545)), 72px)` | `variable-3d3d2bee-ab12-9dd5-e6e8-df37a97b5f76` |

### Line Height Variables

| Designer Name      | CSS Variable             | Value | Variable ID |
|--------------------|--------------------------|-------|-------------|
| Type/Line/Tight    | `--line-height-tight`    | 1.2   | `variable-ef5565ea-8f57-5bb0-e501-0c4183b2e37d` |
| Type/Line/Snug     | `--line-height-snug`     | 1.35  | `variable-e6b3a095-9f1d-f341-6f1b-831bec01dc20` |
| Type/Line/Normal   | `--line-height-normal`   | 1.5   | `variable-68227083-bfb2-48a9-e420-f588e56443f1` |
| Type/Line/Relaxed  | `--line-height-relaxed`  | 1.65  | `variable-8f8cf887-2c4f-5813-e728-e64f63ef8672` |
| Type/Line/Loose    | `--line-height-loose`    | 1.8   | `variable-6dd17088-22a9-bb3c-9f64-03701f39f2dd` |

### Letter Spacing Variables

| Designer Name      | CSS Variable         | Value   | Variable ID |
|--------------------|----------------------|---------|-------------|
| Type/Track/Tight   | `--tracking-tight`   | -0.02   | `variable-52a1923c-2f5c-f402-1dcf-85df36b9ba5a` |
| Type/Track/Normal  | `--tracking-normal`  | 0em     | `variable-a1ac8ba5-20ce-d0be-711d-b10a6be01255` |
| Type/Track/Wide    | `--tracking-wide`    | 0.04em  | `variable-573526e9-119e-2357-5bbd-cc5655f895bc` |
| Type/Track/Wider   | `--tracking-wider`   | 0.08em  | `variable-d583897d-2540-b932-dc17-00d3f6f67e95` |

### Spacing Variables

| Designer Name  | CSS Variable       | Value  | Variable ID |
|----------------|--------------------|--------|-------------|
| Space/01       | `--space-1`        | 4px    | `variable-72521fb8-5b2e-7e8f-2d8c-a16575ba3750` |
| Space/02       | `--space-2`        | 8px    | `variable-31ad8530-4824-008c-a594-96ae63c3396c` |
| Space/03       | `--space-3`        | 12px   | `variable-bcc6e108-36ba-6e77-3eab-cba6317dcae0` |
| Space/04       | `--space-4`        | 16px   | `variable-e8e2da92-e9c8-00b2-9ca0-ab1a885249f6` |
| Space/05       | `--space-5`        | 24px   | `variable-65f8979e-81e1-e6c3-0005-b98045fab52e` |
| Space/06       | `--space-6`        | 32px   | `variable-1f39ed9e-e004-78ab-e045-eee6bb127169` |
| Space/07       | `--space-7`        | 48px   | `variable-541e2201-c881-bb46-e872-4edaa97142d5` |
| Space/08       | `--space-8`        | 64px   | `variable-28b8226c-a70a-4132-5393-d19bca09c9d2` |
| Space/09       | `--space-9`        | 80px   | `variable-6285991b-57bd-5af1-dbd6-a4893bfff426` |
| Space/10       | `--space-10`       | 96px   | `variable-505681f2-9cb7-f4c9-0277-1a1e61464574` |
| Space/11       | `--space-11`       | 128px  | `variable-93c77371-5b9f-6dc1-bada-c5fc37dc19ee` |
| Space/12       | `--space-12`       | 160px  | `variable-3919ddab-0be6-8f4e-d35e-d66cb4365c42` |

### Layout Variables

| Designer Name               | CSS Variable               | Value  | Variable ID |
|-----------------------------|----------------------------|--------|-------------|
| Layout/Section Pad Y SM     | `--section-pad-y-sm`       | 64px   | `variable-a2483d42-16ae-d12f-2ae5-ae82f70482a4` |
| Layout/Section Pad Y MD     | `--section-pad-y-md`       | 96px   | `variable-993c5d1a-26c9-e277-0c6a-efcfce0d931d` |
| Layout/Section Pad Y LG     | `--section-pad-y-lg`       | 128px  | `variable-20c815bd-ddba-3b49-1010-a5bc990f1046` |
| Layout/Container Max Width  | `--container-max-width`    | 1280px | `variable-344013b9-5d31-3f9b-1934-9933315bd8a1` |
| Layout/Container Pad X      | `--container-pad-x`        | 40px   | `variable-d8ab2e61-8230-a428-3972-1f7666474ec5` |
| Layout/Container Pad X Mobile | `--container-pad-x-mobile` | 20px | `variable-553b78b1-96f6-7c7c-a897-485f06844b70` |

> PENDING (Designer only — MCP rename/delete BETA not functional):
> - Rename variables from `color-brand-navy` → `Color/Brand/Navy` format in Variables panel
> - Delete legacy variables: Green/*, Neutral/*, Orange/*, Red/*, Violet/*, brand-primary, brand-bg, brand-text, brand-accent, font-heading, font-body, size-hero-title, size-hero-sub

---

## Execution Order

1. ~~Create Variables~~ ✅ Done 2026-05-14 — all 55 variables live
2. Apply global styles (bind variables to Body / All Elements)
3. Create pages and build structure

---

## 2. Typography Variables

### Font Families

Upload to Webflow Site Settings → Custom Fonts before use.

| Language        | Font Family    | Format       | Weights Available                                     | Use Case             |
|-----------------|----------------|--------------|-------------------------------------------------------|----------------------|
| Korean (sans)   | Pretendard     | OTF / TTF    | Thin 100 – Black 900                                  | Primary body + UI    |
| Korean (serif)  | Noto Serif KR  | TTF          | ExtraLight 200 – Black 900                            | Display / headings   |
| English (sans)  | Inter          | TTF          | Thin 100 – Black 900                                  | UI, captions, data   |
| English (serif) | EB Garamond    | TTF          | Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800 (+ Italics) | Display, pull-quotes |
| Chinese (sans)  | Noto Sans TC   | TTF          | Thin 100 – Black 900                                  | CN body text         |
| Chinese (serif) | Noto Serif TC  | TTF          | ExtraLight 200 – Black 900                            | CN display           |

Font files location: `docs/2026 Intellectual Data_Brand Assets-*/3. Font/`

### Type Scale — Size Variables

Create as Size variables in Webflow using the shared fluid formula:

```css
clamp(min, calc(min + (max - min) * ((100vw - 375px) / 1545)), max)
```

Map default body text through Body or `f-body`, bound to `Type/Size/Base`.
Map labels and eyebrow text through a label style such as `f-label`, bound to
`Type/Size/SM` unless the design clearly requires `Type/Size/XS`.
Every typography role must resolve to a fluid `Type/Size/*` variable:
headings, display, body, lead, label, eyebrow, caption, button, nav, chip, card,
form, stat, and CMS text.
Map non-fluid legacy font-size values to the nearest `Type/Size/*` token
before creating a new token.

| Variable Name    | Fluid Value | Usage                    |
|------------------|-------------|--------------------------|
| font-size-xs     | `clamp(11px, calc(11px + 1 * ((100vw - 375px) / 1545)), 12px)` | Caption, footnote        |
| font-size-sm     | `clamp(13px, calc(13px + 1 * ((100vw - 375px) / 1545)), 14px)` | Small body, label        |
| font-size-base   | `clamp(15px, calc(15px + 1 * ((100vw - 375px) / 1545)), 16px)` | Body text, `f-body`      |
| font-size-md     | `clamp(16px, calc(16px + 2 * ((100vw - 375px) / 1545)), 18px)` | Large body               |
| font-size-lg     | `clamp(18px, calc(18px + 2 * ((100vw - 375px) / 1545)), 20px)` | Lead paragraph           |
| font-size-xl     | `clamp(20px, calc(20px + 4 * ((100vw - 375px) / 1545)), 24px)` | H4 / subheading          |
| font-size-2xl    | `clamp(24px, calc(24px + 8 * ((100vw - 375px) / 1545)), 32px)` | H3                       |
| font-size-3xl    | `clamp(28px, calc(28px + 12 * ((100vw - 375px) / 1545)), 40px)` | H2                       |
| font-size-4xl    | `clamp(36px, calc(36px + 20 * ((100vw - 375px) / 1545)), 56px)` | H1                       |
| font-size-display| `clamp(44px, calc(44px + 28 * ((100vw - 375px) / 1545)), 72px)` | Hero title               |

Recommended typography role mapping:

| Role or class | Type size variable | Notes |
|---------------|--------------------|-------|
| `f-display`, hero title | `Type/Size/Display` | Largest first-viewport headline |
| `f-h1`, page H1 | `Type/Size/4XL` | Standard page headline |
| `f-h2`, section H2 | `Type/Size/3XL` | Main section headline |
| `f-h3`, card group heading | `Type/Size/2XL` | Subsection headline |
| `f-h4`, card title | `Type/Size/XL` | Card and compact heading |
| `f-lead`, intro paragraph | `Type/Size/LG` | Lead copy and hero supporting text |
| `f-body-lg` | `Type/Size/MD` | Large body copy |
| `f-body`, Body text, CMS rich text | `Type/Size/Base` | Default paragraph text |
| `f-label`, eyebrow, section label, button, nav | `Type/Size/SM` | UI labels and short controls |
| `f-caption`, footnote, metadata, tag | `Type/Size/XS` | Small supporting text |

### Line Height Variables

| Variable Name         | Value |
|-----------------------|-------|
| line-height-tight     | 1.2   |
| line-height-snug      | 1.35  |
| line-height-normal    | 1.5   |
| line-height-relaxed   | 1.65  |
| line-height-loose     | 1.8   |

### Letter Spacing Variables

| Variable Name    | Value    |
|------------------|----------|
| tracking-tight   | -0.02em  |
| tracking-normal  | 0em      |
| tracking-wide    | 0.04em   |
| tracking-wider   | 0.08em   |

---

## 3. Spacing Variables

Based on 8px grid.

| Variable Name       | Value  | Label  |
|---------------------|--------|--------|
| space-1             | 4px    | Micro  |
| space-2             | 8px    | XS     |
| space-3             | 12px   | S      |
| space-4             | 16px   | Base   |
| space-5             | 24px   | M      |
| space-6             | 32px   | L      |
| space-7             | 48px   | XL     |
| space-8             | 64px   | 2XL    |
| space-9             | 80px   | 3XL    |
| space-10            | 96px   | 4XL    |
| space-11            | 128px  | 5XL    |
| space-12            | 160px  | Section|

### Section & Layout Variables

| Variable Name          | Value   |
|------------------------|---------|
| section-pad-y-sm       | 64px    |
| section-pad-y-md       | 96px    |
| section-pad-y-lg       | 128px   |
| container-max-width    | 1280px  |
| container-pad-x        | 40px    |
| container-pad-x-mobile | 20px    |

---

## 4. Home Page

### Page Info

| Field | Value         |
|-------|---------------|
| Name  | Home          |
| Slug  | /             |
| Title | Intellectual Data |

### Section Structure

#### 4.1 Navigation

- Element tag: `nav`
- Class: `nav`
- Layout: Flexbox, `justify-between`, `align-center`
- Position: Fixed, top 0, full width
- Background: `color-bg-primary` (or transparent with scroll-based toggle)
- Children:
  - Logo image (left) — link to `/`
  - Nav links (center): About · Service · Cases · Contact
  - CTA button (right): label "문의하기", link to `#contact`

#### 4.2 Hero Section

- Element tag: `section`
- Class: `section-hero`
- Layout: Flexbox column, `align-center`, `justify-center`
- Min-height: 100vh
- Background: `color-bg-dark` (Navy)
- Children:
  - Eyebrow label — small caps, `tracking-wider`, `color-text-inverse`
  - H1 heading — `font-size-display`, Noto Serif KR or EB Garamond, `color-text-inverse`
  - Subheading paragraph — `font-size-lg`, `line-height-relaxed`, `color-text-inverse`
  - CTA button group:
    - Primary button: solid, `color-brand-navy` bg → invert on dark
    - Secondary button: outline, `color-text-inverse` border
  - Background layer: KV image `[IntellectualData]KV(3840x2160).png` or Pattern overlay

#### 4.3 About / Mission Section

- Class: `section-about`
- Layout: 2-column CSS Grid (text left, visual/stat right)
- Padding: `section-pad-y-lg`
- Background: `color-bg-primary`
- Children:
  - Section label — `font-size-sm`, `tracking-wider`, `color-brand-navy`
  - H2 heading — `font-size-3xl`, `line-height-snug`
  - Body paragraph — `font-size-base`, `line-height-relaxed`
  - Stats row — 3 key numbers (number + description label each)

#### 4.4 Services Section

- Class: `section-services`
- Layout: CSS Grid, 3 columns on desktop / 1 column on mobile
- Padding: `section-pad-y-md`
- Background: `color-bg-subtle`
- Children:
  - Section header (label + H2)
  - Service cards × 3:
    - Icon (from `docs/.../7. Icon/PNG/1.Navy/`)
    - Card title — `font-size-xl`
    - Description — `font-size-base`, `line-height-relaxed`

#### 4.5 Cases / Portfolio Section

- Class: `section-cases`
- Layout: CSS Grid, 2-column (or horizontal scroll on mobile)
- Padding: `section-pad-y-md`
- Background: `color-bg-primary`
- Children:
  - Section header (label + H2 + "전체 보기" link)
  - Case cards × 4:
    - Thumbnail image
    - Tag chip
    - Card title — `font-size-xl`
    - Arrow link

#### 4.6 Contact CTA Section

- Class: `section-cta`
- Layout: Flexbox column, `align-center`
- Padding: `section-pad-y-lg`
- Background: `color-brand-navy`
- Children:
  - H2 heading — `color-text-inverse`, `font-size-3xl`
  - Description — `color-text-inverse`, `font-size-md`
  - CTA button: label "문의하기", white fill

#### 4.7 Footer

- Element tag: `footer`
- Class: `footer`
- Layout: CSS Grid, 4 columns on desktop / 2 on tablet / 1 on mobile
- Padding: `section-pad-y-sm`
- Background: `color-neutral-black`
- Children:
  - Logo (white variant from `docs/.../2. Logo/PNG/3_White/`)
  - Nav group × 3 (About / Service / Legal)
  - Contact info (email, address)
  - Bottom bar: copyright text + SNS icon links

---

## 5. Claude Execution Instructions

### Step 1 — Create Variables

```
Tool: variable_tool
Action: create
Collection: Base
Order: Color variables → Size variables → Typography variables
Rule: Use semantic names exactly as listed in sections 1–3.
      Mark [TODO] values as placeholder strings until brand guide values are confirmed.
```

### Step 2 — Create Page

```
Tool: data_pages_tool
Action: create
Name: "Home"
Slug: "/"
SEO title: "Intellectual Data"
```

### Step 3 — Build Page Structure

```
Tool: element_tool
Action: create elements in order
Order:
  1. nav (Navigation)
  2. section.section-hero
  3. section.section-about
  4. section.section-services
  5. section.section-cases
  6. section.section-cta
  7. footer.footer
Rule: Use Webflow Div Block for layout containers.
      Apply class names exactly as listed in section 4.
```

### Step 4 — Apply Styles

```
Tool: style_tool
Action: bind variable references to element styles
Rule: Use variable_as_value whenever a variable exists for the property.
      Do not hardcode hex colors or px values that have a variable equivalent.
```

---

## 6. Forbidden Patterns

These patterns are **never allowed** regardless of context.

| Forbidden | Correct alternative |
|-----------|---------------------|
| Hardcoded color hex (`color: #1A2B4C`) | `variable_as_value` → `color-brand-navy` |
| Google Fonts `@import` or `<link>` | Uploaded custom fonts only (Pretendard · Inter · Noto Serif KR · EB Garamond) |
| Hardcoded font-size px (`font-size: 40px`) | Fluid `font-size-3xl` variable via `variable_as_value` |
| Hardcoded spacing px on elements that have a variable | `space-*` / `section-pad-y-*` variable |
| Generic class names: `wrapper1`, `div2`, `block-copy`, `text-area` | BEM-lite names (see §7) |
| THREE.js in global Site embed | Per-page only via Page Settings → Custom Code |
| Lottie or any JSON animation player | GSAP `svg-draw` or CSS `@keyframes` (see `custom.md`) |
| `publish_site` without user confirmation | Use `safe-publish` skill |
| Webflow API token in client-side `<script>` | Webhook → Make / Zapier / n8n → CMS API |
| Creating variables with different names than listed in §1–3 | Use exact names from §1–3 |

---

## 7. CSS Class Naming — BEM-lite

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

### Flexible Section BEM Structure

Build content sections with a stable structural spine and flexible role zones.
The invariant is hierarchy and role clarity, not identical DOM in every section.

```text
section.section-[name]
  div.container
    div.section-[name]__inner
      [role zones...]
```

Required spine:

- `section.section-[name]`
- `div.container`
- `div.section-[name]__inner`

Allowed role zones inside `section-[name]__inner`:

| Role zone | Use |
|-----------|-----|
| `section-[name]__head` | Intro/header zone: eyebrow, title, summary |
| `section-[name]__txt` | Text zone when the section is split or text-led |
| `section-[name]__cnt` | Main content zone |
| `section-[name]__media` | Image, video, visual, canvas, or embed |
| `section-[name]__list` | Repeated content wrapper, preferably `ul` |
| `section-[name]__item` | Repeated item, preferably `li` |
| `section-[name]__actions` | CTA buttons and text links |
| `section-[name]__foot` | Footer note, secondary CTA, legal, or metadata |

Optional text-zone children:

```text
div.section-[name]__txt
  div.section-[name]__title
    h2/h3/h4/h5/h6.section-[name]__heading.[live-typography-class]
  div.section-[name]__desc
    p.section-[name]__body.[live-body-class]
    span.section-[name]__note.[live-caption-class]
```

- Use `section-[name]__title` when the text zone needs one or more headings.
  Choose the heading tag by document outline, not by visual size.
- Use `section-[name]__desc` for supporting copy, multiple paragraphs, inline
  spans, notes, or mixed text fragments.
- Give text elements both a section-owned BEM class and the closest live
  Webflow typography class or typography variable. Do not assume names such as
  `f-body-1`, `f-h2`, or `f-label`; inspect the live Webflow styles and
  variables first, then attach the actual declared class or variable.
- `__txt` may contain a direct heading and paragraph for very simple sections,
  but prefer `__title` and `__desc` when the section has more than one text
  child or needs clearer Navigator editing.
- `__head` may use the same internal `__title` and `__desc` pattern when a
  header zone needs explicit heading/copy groups.
- `section-[name]__cnt` should default to `margin-top: Space/08` (`64px`)
  when it follows `__head` or `__txt`. Bind the margin through the spacing
  variable, not a raw `64px` value.
- The `__cnt` margin is a default rhythm, not a lock. Override it per section
  with a section modifier, a more specific section-owned class, or breakpoint
  styles when the design needs tighter or looser spacing.

Default class stacks for component templates:

| Element | Section-owned class | Live typography binding |
|---------|-----------------|--------------------------|
| Eyebrow/label | `section-[name]__eyebrow` | Inspect live label/eyebrow class or variable |
| Main heading | `section-[name]__heading` | Inspect live heading/title class or variable |
| Subheading | `section-[name]__heading` | Inspect live subtitle/card-title class or variable |
| Body copy | `section-[name]__body` | Inspect live body class or variable |
| Lead copy | `section-[name]__body` | Inspect live lead/intro class or variable |
| Note/meta | `section-[name]__note` | Inspect live caption/meta class or variable |
| Content zone | `section-[name]__cnt` | `margin-top: Space/08` default |

Recommended variants:

```text
// Text-only
section.section-[name]
  div.container
    div.section-[name]__inner
      div.section-[name]__head

// Split
section.section-[name]
  div.container
    div.section-[name]__inner
      div.section-[name]__txt
        div.section-[name]__title
          h2.section-[name]__heading.[live-heading-class]
        div.section-[name]__desc
          p.section-[name]__body.[live-body-class]
      div.section-[name]__cnt

// Content-first split
section.section-[name]
  div.container
    div.section-[name]__inner
      div.section-[name]__cnt
      div.section-[name]__txt

// Header plus grid/list
section.section-[name]
  div.container
    div.section-[name]__inner
      div.section-[name]__head
      ul.section-[name]__list
        li.section-[name]__item

// Header plus media and actions
section.section-[name]
  div.container
    div.section-[name]__inner
      div.section-[name]__head
      div.section-[name]__media
      div.section-[name]__actions
```

Rules:

- Use `section-[name]` as the block class for page sections.
- Use section-owned BEM for page-specific children: `__inner`, `__head`,
  `__txt`, `__cnt`, `__media`, `__list`, `__item`, `__actions`, and `__foot`.
- `container` constrains max width and horizontal padding only. Put layout,
  grid, flex, gap, alignment, and ordering on `section-[name]__inner`.
- Visual order can change per breakpoint, but Navigator hierarchy should stay
  understandable.
- Use semantic `ul`/`li` for repeated content unless CMS or another Webflow
  native element is required.
- Avoid generic names: `wrapper`, `content`, `box`, `left`, `right`, `area`,
  `group`, `div-copy`, and `text-area`.

### Component Structure Rules

- Do not componentize full page sections unless the same structure is reused on
  multiple pages.
- Componentize repeated inner pieces by default: cards, tabs, stats, badges,
  logo items, media units, accordion items, form rows, and CTA/button groups.
- A section component may own `section > container > inner` only when section
  reuse is real.
- A content component goes inside `section-[name]__cnt`.
- A card or item component goes inside `section-[name]__item`.
- A CTA or button component goes inside `section-[name]__actions`.
- Prefer Webflow component slots only when inner content changes often but the
  wrapper must remain reusable.
- Avoid deep component nesting beyond section > list/item > atom or molecule.

### Component Classes

| Component         | Block          | Elements                              |
|-------------------|----------------|---------------------------------------|
| Card (generic)    | `card`         | `card__image`, `card__body`, `card__title`, `card__tag`, `card__link` |
| Button            | `btn`          | modifiers: `btn--primary`, `btn--secondary`, `btn--outline` |
| Nav link          | `nav__link`    | modifier: `nav__link--active`         |
| CMS list          | `cms-list`     | `cms-list__item`                      |

---

## 8. TODO — Confirm from Brand Guide PDF

Open `docs/2026 Intellectual Data_Brand Assets-.../1. Brand Guide/[IntellectualData]BrandGuide.pdf`
and fill in the following before running variables:

- [ ] `color-brand-navy` — exact hex
- [ ] `color-brand-navy-dark` — exact hex
- [ ] `color-brand-navy-light` — exact hex
- [ ] `color-neutral-light-gray` — exact hex
- [ ] `color-neutral-mid-gray` — exact hex
- [ ] `color-neutral-silver` — exact hex
- [ ] `color-text-primary` — exact hex
- [ ] `color-text-secondary` — exact hex
- [ ] `color-bg-dark` — exact hex (likely same as `color-brand-navy`)
- [ ] `color-bg-subtle` — exact hex
- [ ] Confirm official type scale values if brand guide specifies them
- [ ] Confirm official spacing values if brand guide specifies them
