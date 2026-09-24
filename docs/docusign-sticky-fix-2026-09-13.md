# Docusign Sticky Offset Fix

- Site: `6a38f39fe95d43bbdbe5c71c` (intellectualdata).
- Page: `6a531d0c85ba94997412b0ce` (`/page/Docusign`).
- Product tabs element: `49ce6b20-e756-8d5d-e849-bf27fccf0049`.
- Applied script: `id_ui_controller`, version `1.1.68` -> `1.1.69`.
- Status: registered and applied in Webflow; not published.

## Cause And Change

The Docusign tab controller measured `#top .header__inner` height, excluding
the CMS announcement above it. Both the sticky offset and stuck-background
threshold now measure the viewport bottom of `#top .header__container`.
This includes the announcement while excluding the dropdown expansion below
the navigation container. ResizeObserver watches the container and announcement;
resize and pageshow refresh the offset.

No component definitions, CMS records, typography, or page styles changed.
The shared script change is confined to Docusign tab functions.

## Verification

Playwright loaded the published page with the candidate script substituted only
in the local browser response. The original asset's integrity attribute was
removed in that test response to allow substitution; production HTML was not edited.
Widths: 1440, 991, 767, 390 pixels. All passed:

- Announcement 56px: header bottom and sticky top both 136px.
- Simulated announcement expansion to 112px: both 192px.
- Announcement closed through its actual close control: both 80px.
- Stuck background state remained true in all three cases.

JavaScript syntax check passed. Webflow read-back matched the candidate source
and confirmed the applied version. Post-publish verification remains pending.

## Files And Recovery

- `runtime/id-ui-controller-1.1.68.js`: original hosted source snapshot.
- `runtime/id-ui-controller-1.1.69.js`: verified replacement source.
- `runtime/check-docusign-sticky.cjs`: regression browser check.
- `runtime/docusign-sticky-*.png`: viewport captures.

To revert the staged script, apply registered `id_ui_controller` version
`1.1.68` at site footer. Publishing is a separate explicitly approved step.
