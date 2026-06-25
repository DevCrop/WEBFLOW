# Docusign IAM Layout Upgrade

Source:

- Content: `docs/solutions/docusign.md`
- Page intent: Docusign IAM tab landing page

## Current Frame Diagnosis

`Frame 17237` already contains the correct Docusign IAM content, but it still
reads like a long wireframe:

- The page is a 1920px desktop-only frame with many absolute-positioned
  sections.
- Section labels such as `Part 1. 헤드라인` are visible as production content,
  which makes the page feel like a content outline.
- Header, product tabs, hero, reference cards, CTA, and footer exist, but the
  visual hierarchy is mostly linear.
- The strongest visual moments are the Docusign video card, partner image, AI
  feature cards, and white reference band.
- Mobile/tablet behavior is not defined in the frame.

## Upgraded Page Structure

Use the following production structure instead of exposing the internal
`Part 1` through `Part 6` labels.

1. Global navigation
2. Docusign product hero
3. Product tab navigation
4. IAM overview and video
5. Intellectual Data partnership
6. Agreement pain point
7. Docusign Iris AI capabilities
8. Proven business outcomes
9. Consultation CTA
10. Subscribe and footer

Recommended Webflow block names:

- `solution-hero`
- `solution-tabs`
- `iam-overview`
- `iam-partner`
- `iam-painpoint`
- `iam-ai`
- `iam-reference`
- `solution-cta`

## Section Layout Direction

### 1. Docusign Product Hero

Keep the dark product mood, but make the product identity the first viewport
signal.

- Layout: 12-column container, 1440px max width, centered.
- Left: eyebrow `Solutions`, Docusign logo/wordmark, product description.
- Right: compact product menu or breadcrumb.
- Height: 560-640px desktop.
- Add a subtle product visual area behind or beside the copy only if the final
  asset is available; otherwise keep the hero typographic.
- Remove visible outline labels from the production view.

Copy:

- `Solutions`
- `Docusign`
- `글로벌 전자서명 및 계약관리 솔루션`

### 2. Product Tab Navigation

Turn the current small pills into a sticky in-page product switcher.

- Tabs: `Docusign IAM`, `Docusign eSignature`, `Docusign CLM`.
- Active state: IAM.
- Desktop: sticky below global nav with subtle bottom border.
- Mobile: horizontally scrollable segmented tabs.
- Avoid duplicating the global nav menu styling.

### 3. IAM Overview And Video

Replace the visible `Part 1. 헤드라인` label with a production section intro.

- Layout: two-zone section.
- Top: large Noto Serif KR headline and body copy.
- Bottom: full-width 16:9 video thumbnail/card.
- The video card should feel like an embedded product proof point, not a
  placeholder rectangle.
- Add one compact supporting statement below the video:
  `Docusign IAM, Intelligent Agreement Management`.

Primary headline:

```text
전자서명을 넘어,
지능형 계약관리 솔루션으로
```

Body:

Use the Korean paragraph from Part 1 in `docusign.md`.

Video:

```text
https://youtu.be/kViCtIzCDe8
```

### 4. Intellectual Data Partnership

Make this section a credibility section, not just another text block.

- Layout: 2-column desktop.
- Left: headline and explanation.
- Right: Docusign IAM partner badge/image.
- Use a framed media area with stable aspect ratio.
- Add a small badge/chip: `IAM Sell Specialized Partner`.

Headline:

```text
인텔렉추얼데이터는
Docusign® IAM Sell Specialized Partner입니다.
```

### 5. Agreement Pain Point

The current dark rectangle can become a focused problem statement band.

- Layout: dark elevated band inside the black page.
- Top: section headline.
- Middle: three pain cards.
- Bottom: short transition sentence into IAM.

Suggested pain cards:

- `완료 문서 추적`
- `최종본 확인`
- `계약 문구 승인`

Use the Part 3 paragraph as supporting copy.

### 6. Docusign Iris AI Capabilities

This is the strongest section and should become the core product explanation.

- Layout: left sticky intro, right stacked capability cards on desktop.
- Mobile: intro first, then cards.
- Use four cards:
  - `AI 기반 계약 검토`
  - `갱신 관리`
  - `AI 기반 데이터 추출`
  - `AI 계약 에이전트`
- Each card should include a small index, title, and 2-3 line body.
- Consider a thin vertical progress line or subtle card hover state in Webflow.

Headline:

```text
Docusign Iris,
지능형 계약관리를
완성하는 AI
```

### 7. Proven Business Outcomes

Keep the white section because it creates useful contrast, but make it more
structured and data-led.

- Layout: full-width white band.
- Top: headline.
- Middle: 3 outcome cards.
- Bottom: quote block from Catchafire.
- If logos are not available, use text-first cards with company initials or
  simple wordmarks.

Cards:

- Metro Credit Union: `75% 운영 효율성 향상`, `600건+ 자동화`
- Kelly Park Capital: `70% 시간 절감`, `87%+ 템플릿 감소`
- Catchafire: `약 77% 처리 시간 절감`, `2배 처리 역량 향상`

### 8. Consultation CTA

Make CTA copy specific and action-oriented.

- Layout: centered dark CTA band.
- Headline first, then short supporting line.
- Primary button: `상담 문의하기`
- Secondary link if needed: `Docusign 솔루션 보기`

Copy:

```text
Docusign IAM 도입 및 솔루션이 궁금하다면
IAM Sell Specialized Partner, 인텔렉추얼데이터와 상담하세요.
```

## Responsive Rules

Desktop:

- Container max width: project `Layout/Container Max Width` token.
- Section vertical rhythm: use project spacing tokens.
- Hero and overview can use wide layouts.

Tablet:

- Collapse two-column sections to stacked layouts when media width drops below
  comfortable reading width.
- Keep product tabs sticky or directly under hero.

Mobile:

- Hide decorative nav density.
- Product tabs become horizontal scroll.
- Headlines should wrap intentionally; avoid viewport-scaled text.
- Cards stack one per row.
- Video/card media should keep fixed aspect ratio.

## Content Corrections

Before production build:

- Change `Carrers` to `Careers` in the navigation.
- Remove `[SM1]` from visible body copy unless it is an intentional annotation.
- Replace internal labels `Part 1` through `Part 6` with production section
  headings or remove them entirely.
- Confirm whether Korean-only, English-only, or bilingual copy should appear on
  this page.

## Webflow Build Notes

- Use Webflow variables for color, type, spacing, layout, and border values.
- Build each content section with the project spine:
  `section.section-[name] > .container > .section-[name]__inner`.
- Inside `__inner`, choose the smallest useful role zones: `__head`, `__txt`,
  `__cnt`, `__media`, `__list`, `__item`, `__actions`, or `__foot`.
- When a text zone needs clearer editing, structure it as
  `section-[name]__txt > section-[name]__title` for semantic `h2`-`h6`
  headings and `section-[name]__desc` for paragraphs, spans, notes, or mixed
  supporting copy.
- Add section-owned BEM classes to text elements, then inspect live Webflow
  typography classes or typography variables and attach the actual declared
  heading, body, lead, label, caption, or metadata style. Do not assume names
  such as `f-body-1`, `f-h2`, or `f-label`.
- When `__cnt` follows `__head` or `__txt`, default its top separation to
  `Space/08` (`64px`) through the spacing variable. Override per section or
  breakpoint when the design needs a different rhythm.
- Componentize repeated inner units such as cards, tabs, stats, media units,
  and CTA groups; do not componentize full sections unless reuse is real.
- Map body-sized copy through `f-body` or Body, bound to the fluid
  `Type/Size/Base` variable.
- Map labels, eyebrows, product tabs, chips, buttons, metadata, and captions to
  fluid typography roles such as `f-label` or `f-caption`; do not use fixed
  font-size values for compact UI text.
- Map any fixed font-size values to the nearest fluid `Type/Size/*`
  variable before building new classes.
- Use uploaded fonts only: Pretendard and Noto Serif KR are required here.
- Build desktop first, then tablet and mobile overrides.
- Prefer native sections, grids, flex layouts, image assets, and embeds.
- Do not publish automatically.
