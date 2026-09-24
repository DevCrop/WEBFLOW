# YouTube Lifecycle Fix

## 2026-09-14 Follow-Up

Version 2.1.0 is now saved in Webflow (unpublished). Poster state keeps exact
16:9 without the former 200px minimum; active players retain the 200px minimum.
Images use cover sizing and widescreen thumbnail fallbacks rather than the
letterboxed hqdefault image. A high-contrast play control remains centered.
Existing end/replay, background pause, exclusive playback and consent guards
remain unchanged. The browser regression suite was updated and passed again,
including real mobile playback and pagehide pause. See `site-fixes-2026-09-14.md`.

- Status: saved in Webflow site custom code; not published.
- Site: `6a38f39fe95d43bbdbe5c71c`.
- Audited static pages: Reveal, Relativity, Nymi_Band, Kiteworks, Luminance, Docusign. Eight embeds total; Docusign has three tabbed embeds.
- Replaced the existing YouTube controller, preserving unrelated site head/footer code.
- Source: `runtime/youtube-lifecycle.js` and `runtime/youtube-lifecycle.css`.
- Previous controller: `runtime/youtube-lifecycle-before.html`.

## Changes

- Initial and ended states show a thumbnail with an accessible play/replay button. Playing state uses the original native YouTube controls.
- 16:9 surface with a 200px minimum height removes the mobile API exclusion caused by the previous size gate.
- Pauses managed players when the document becomes hidden or receives pagehide. Returning does not resume playback.
- Starting one video pauses the other managed players. Hidden tabs and dynamically inserted supported embeds are handled.
- Separate YouTube link pauses managed videos before opening a new tab.
- Does not initialize frames without an active YouTube src or frames marked as cookie-blocked. No consent values are changed.
- No CMS contents, native component props, or publish settings changed.

## Verification

`node runtime/check-youtube-lifecycle.cjs`

- Twelve page/viewport combinations: six pages at 1440px and 390px. Eight embeds found at each viewport; one poster and external link per embed; fullscreen attributes preserved.
- Real YouTube API ready, playback, and pagehide pause passed on mobile Docusign in a staged browser preview.
- Stubbed API contract tests passed: replay presentation, hidden-document pause, no automatic resume, external-link pause, dynamic insertion, exclusive playback, hidden-tab pause, duplicate prevention.
- Screenshots: `artifacts/youtube-lifecycle/` (staged previews, not published captures).
- Saved Webflow head/footer read back and matched exactly.

## Limits

- YouTube's own iframe links opened in a background tab cannot be reliably identified from the parent page. Foreground tab changes are handled; the separate site-owned link pauses before opening.
- Real end-of-video playback was not waited through; ended behavior was tested via the API event contract.
- YouTube network, playback restrictions, and browser autoplay policy remain external dependencies. Native controls remain available if API initialization fails.
- Active iframe wheel/keyboard event capture was not modified; this change addresses feedback items 2 and 4.

## Reference

YouTube IFrame API: https://developers.google.com/youtube/iframe_api_reference
