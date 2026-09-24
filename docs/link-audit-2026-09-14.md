# Public Link Audit

## Resolution Update

The four confirmed issues below were corrected in a subsequent user-authorized
change on 2026-09-14. Saved in Webflow, not published. The original audit remains
below as historical evidence. See `site-fixes-2026-09-14.md` for targets and checks.

- K-Discovery and Data Analytics gallery anchors now carry native CMS slug
  bindings. The shared routing controller builds the matching insight URL.
- About Us gallery anchors use the equivalent Newsroom slug binding.
- Header locale anchors have valid home fallbacks and the shared controller
  resolves the current page in the selected locale.
- Staged browser checks passed: all 18 cards have distinct, HTTP 200 destinations;
  first-card clicks on three pages and locale switching pass on desktop/mobile.
- Cleanup candidates are not confirmed navigation defects. No unknown article
  destinations were invented and no access restriction was bypassed.

## Scope

- Read-only site audit; no Webflow content edits or publishing.
- Site: `6a38f39fe95d43bbdbe5c71c`.
- Public origin: `https://intellectualdata.webflow.io`.
- Crawled 198 paths from static Korean/English pages and discovered internal CMS links.
- Checked 24 unique external URLs: 23 returned HTTP 200; EPIC returned HTTP 403.
- Protected `/private-resources` and `/en/private-resources` returned HTTP 401 and were not inspected internally.
- Draft pages, undiscovered/orphan CMS items, query-string pagination variants, and all possible UI interactions are not covered.

## Confirmed Issues

1. `/page/K_Discovery`: six insight gallery cards use literal relative URL `detail_insights`. Actual first-card click reaches `/page/detail_insights`, HTTP 404.
2. `/page/Data_Analytics`: six insight gallery cards have the same incorrect URL and actual click failure.
3. `/page/About_Us`: six newsroom gallery cards use `#`; actual first-card click does not navigate. Native link setting is `{"mode":"collectionPage"}` without a resolved destination. Element: `aab8f8c4-c929-87ba-b7c9-c9c3c679086c`.
4. Shared header language menu: both English and Korean choices use `#`. Actual English selection on Korean About Us and Korean selection on English About Us leave the language/path unchanged.

## Cleanup Candidates

- Insight bodies `/insights/373`, `/insights/366`, `/insights/356`, `/insights/345` contain 23 visible anchor elements without href, plus empty anchors. These appear to be imported text markup; intended destinations are unknown, so they are not classified as confirmed broken navigation.
- `https://epic.org/epic-settles-ice-lawsuit-about-palantir-and-profiling/` from `/insights/360` returned 403 to the automated request. This is not evidence of a missing destination.
- Cookie controls, search-close controls, filters, disabled pagination arrows, and hidden empty CMS file links were excluded from broken-navigation findings.
- LinkedIn and Naver blog URLs returned HTTP 200.

## Evidence

- `artifacts/site-link-audit.json`: per-page anchors, attributes, and HTTP results.
- `runtime/audit-site-links.cjs`: resumable crawler and external URL check.
- Broken card and language-menu findings were independently checked by real Playwright clicks after page initialization.
