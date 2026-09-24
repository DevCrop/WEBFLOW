# Button Typography Migration

- Site: `6a38f39fe95d43bbdbe5c71c` (Intellectual Data).
- Status: Webflow native styles saved; not published.
- Root cause: `button` had no explicit typography, and `button-label` inherited the page's small body font. The size-xs variant also explicitly used 0.875rem.
- Updated shared button and CTA labels plus contact, header search, footer newsletter, password and search-result submit styles. Icon-only controls were not changed.
- Existing Font/Base (Pretendard), Weight/SemiBold (600), UI font-size and line-height variables are used. Letter spacing uses the existing zero-valued UI label token. No new classes or variables were created.
- Default font-size follows UI subtitle: desktop 17px, tablet 16px. Portrait uses UI title, which resolves to 16px, to avoid the existing mobile subtitle/body tokens shrinking to 15px.
- Size-xs/sm use UI body on desktop; size-md uses UI subtitle; size-lg and board-back use UI title. Portrait overrides use UI title for a 16px minimum. Existing dimensions, color variants, icons, link bindings and hover behavior are preserved.
- Existing `/components` button and nested CTA instances inherit the shared changes. No catalog instances were deleted or rebuilt.

## Verification

- Native component variants and base/tablet/mobile typography inspected before modification; affected base and portrait properties read back after saving.
- Playwright applied the exact unpublished style changes in a test browser on Kiteworks, Contact Us, Docusign, INDA FullDiscovery and Release Notes.
- 1440px, 768px and 390px: 15 page/viewport cases, 42 visible label checks passed (minimum 16px and no label clipping).
- Mobile Kiteworks outline-white button screenshot visually checked. Link/color/layout declarations were not modified.
- This is staged browser verification, not a post-publish test or an exhaustive every-page audit. Forms were not submitted.
- Evidence: `artifacts/button-font-migration.json`, `artifacts/button-font-final-actions.json`, `artifacts/button-font-native-readback.json`, `artifacts/button-font-validation.json`.
- Repeat staged verification with `node runtime/check-button-fonts.cjs`.
