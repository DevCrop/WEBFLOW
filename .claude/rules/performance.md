# Performance & Optimization — Intellectual Data

---

## Core Web Vitals Targets

| Metric                          | Target   | Tool               |
|---------------------------------|----------|--------------------|
| LCP (Largest Contentful Paint)  | < 2.5s   | PageSpeed Insights |
| CLS (Cumulative Layout Shift)   | < 0.1    | PageSpeed Insights |
| INP (Interaction to Next Paint) | < 200ms  | PageSpeed Insights |
| Total page weight               | < 2 MB   | Network tab        |
| First load JS                   | < 300 KB | Webflow publish    |

---

## Images

- Format: WebP. Use Webflow Asset Manager — auto-converts on upload.
- Lazy loading: all images below the fold → Custom Attribute `loading` = `lazy`.
- Hero / KV image: eager load + preload in Head embed:
  ```html
  <link rel="preload" as="image" href="[hero-image-url]" fetchpriority="high">
  ```
- Always set explicit `width` and `height` attributes on `<img>` to prevent CLS.
- Max dimensions: hero = 2560px · section images = 1440px · thumbnails = 800px.
- Alt text: always required (accessibility + SEO).
- Max file size: hero < 1 MB · all others < 500 KB.

---

## Fonts

- Upload 4 weights max per family (see `init.md` §2).
- `font-display: swap` is automatic for Webflow-uploaded fonts.
- Preload the two most-used font files in Head embed (see `init.md` §5).
- Do not upload all 9 weights — each extra weight is an extra HTTP request.

---

## Scripts

- All custom scripts load in Footer embed (before `</body>`) — never in Head unless critical.
- THREE.js: load per-page only (Page Settings → Footer). Never global.
- AOS + GSAP: load globally only if used on 3+ pages; otherwise per-page.
- No Lottie. No JSON-based animation players.
- SVG animations via GSAP or CSS `@keyframes` only (see `custom.md`).
- Prefer Webflow Interactions (IX2) over GSAP for simple fade/slide — zero extra KB.
- Use `defer` on non-critical external scripts when loading in Head.

---

## Webflow-Specific

- CSS classes: use combo classes to limit total class count. Avoid deep nesting.
- Symbols: avoid heavy override chains. Prefer per-page components when overrides are complex.
- Interactions: remove unused IX2 interactions before publishing.
- CMS: paginate at 20–30 items max per load.
- Asset Manager: upload all images through Webflow — enables CDN delivery.
- Embeds: remove debug/unused embed blocks before publishing.

---

## Pre-Publish Checklist

- [ ] All images < 500 KB (hero < 1 MB)
- [ ] WebP format for all section images
- [ ] Fonts: only 4 weights per family uploaded
- [ ] THREE.js not in global embed — per-page only
- [ ] Lottie not referenced anywhere
- [ ] Unused custom code blocks removed
- [ ] Unused IX2 interactions removed
- [ ] PageSpeed Insights: > 85 desktop · > 70 mobile
