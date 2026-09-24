# Site Fixes: Video, Cards, Links And CTA

Status: saved in Webflow, not published. Site `6a38f39fe95d43bbdbe5c71c`.
Unrelated local files, CMS content and site scripts were preserved.

Follow-up: `.card-heading-group.is-lpo-service` now binds Color/Base/White.
Its existing radius/card/small (8px) and responsive padding are preserved.
The scoped combo update affects LPO detail groups and their catalog instances,
not other card-heading-group consumers. Native saved values were verified.

## Saved Changes

1. YouTube lifecycle 2.1.0: exact 16:9 posters, cover fit, widescreen fallback
   images and a centered high-contrast play button. Active player minimum height
   remains 200px per the [YouTube API reference](https://developers.google.com/youtube/iframe_api_reference).
   Changed only the marked video style/controller blocks in site head/footer.
2. LPO component `6a120161-d7e9-ad77-bce6-d70394b05251`: root background now uses
   Color/Bg/Secondary, radius/card/small and space/card/standard/padding-x/y,
   matching icon-card padding. Both dark/base and light variants updated.
   The four LPO page cards and existing catalog instances inherit the styles.
3. Three gallery link templates now bind data-gallery-slug to the actual CMS
   slug and data-gallery-collection to insights/newsroom. The shared site routing
   controller creates same-locale detail URLs, including dynamic/swiper copies.
   No CMS records were changed and no per-item route list is shipped to the site.
   Valid archive links are kept as a no-JavaScript fallback.
4. Header component `ce592e07-2e11-1f60-55a0-dab536e25ba9`: English and Korean
   links now have real fallback hrefs and data-site-locale attributes. The shared
   controller uses same-origin hreflang links when available, otherwise the
   verified /en prefix; current path, query and hash are retained. This fixes
   navigation only; it does not translate untranslated English content.
5. Release Notes sub-visual: enabled showActions and set primaryButtonLabel to
   "전문가 자문 받기". Existing primaryButtonLink remains /page/Contact_Us.

## Exact Page Targets

| Page | Page ID | Element ID |
| --- | --- | --- |
| K-Discovery | 6a531cf5199ab832e2a92655 | b930c8a9-24c4-dcfd-1806-8cc8e5d61ead |
| Data Analytics | 6a5317bbd02345c985f5d43b | 64c2ec00-e1aa-69d3-9ec1-4db8632407eb |
| About Us | 6a531d3f86942d09a5323036 | aab8f8c4-c929-87ba-b7c9-c9c3c679086c |
| Release Notes | 6a48b6c27b53afca3f2c8f38 | e3d2f3c3-e063-fb21-1fba-552eb9aeb444 |

Header locale elements: `ced00009-1345-7c9c-8935-280ca29ab9c6` (en) and
`ced00009-1345-7c9c-8935-280ca29ab9c8` (ko).
Existing draft catalog: `6a5a61aaa9af5f2ce1a89d5f`; shared instances inherit changes.

## Verification

- Native slug bindings, LPO properties, CTA props and site code read back.
  Site head/footer exactly match saved candidates; unrelated code retained.
- `node runtime/check-youtube-lifecycle.cjs`: six pages, eight embeds at desktop
  and mobile. Poster geometry and centered controls pass; real mobile YouTube
  play and pagehide pause pass. Deterministic ended/replay, exclusive playback,
  hidden-tab pause, dynamic insertion and no-duplicate tests pass.
- `node runtime/check-site-fixes.cjs`: 18 gallery destinations return HTTP 200.
  Six real first-card clicks, four locale-switch clicks and two release CTA
  clicks pass in staged desktop/mobile previews. Four LPO cards pass at
  1440/991/390: padding matches icon-card, vertical layout and no overflow.
- LPO padding top/right/bottom/left: desktop 24/32/24/32, tablet 24/28/24/28,
  mobile portrait 16/20/16/20, all resolved from existing variables.
- Mobile LPO and desktop/mobile video screenshots visually reviewed.
- JavaScript syntax checks pass. No forms submitted, no production publish.

## Limits And Remaining Inputs

Browser tests simulate unpublished native changes: gallery attributes are
populated from a test-only CMS name/slug fixture, and the enabled Release Notes
CTA is previewed with markup from the identical public sub-visual component.
Native save/readback and staged clicks are not a post-publish end-to-end check.

Previous confirmed link findings are resolved. Imported article anchors with no
href have no known destination; the EPIC 403 is an access response, not proof of
a broken URL. Neither was changed speculatively. Policy open-date and exact Word
source comparison still require those source inputs; no legal text or date was
invented in this task. Other historical fixes recorded as saved/unpublished are
not missing implementations; publication remains a separate approval gate.

## Evidence

- `artifacts/site-fixes-2026-09-14-before.json`: pre-change site code and LPO styles.
- `artifacts/site-fixes-validation.json`: browser results.
- `artifacts/youtube-lifecycle/`: updated poster captures.
- `artifacts/lpo-surface-*.png`: final LPO card captures after entrance animation.
- `runtime/site-link-routing.js`: shared live routing source.
- `runtime/lpo-service-surface.css`: native-style preview equivalent, not an
  additional production stylesheet.
