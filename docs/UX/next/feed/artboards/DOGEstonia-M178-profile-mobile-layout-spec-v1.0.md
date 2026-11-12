# DOGEstonia M178 — Profile Mobile Layout

**Version:** 1.0  
**Date:** 2026-10-25  
**Surface:** SPA `/profile` inside next-shell; phone and tablet portrait layout.  
**Artboard:** `exec-1937e41d-4095-407b-84ef-c4f5f7015840.png`.  
**Status:** specification requested after visual review; no implementation or runtime pass claimed.

## 1. Purpose and authority

Make the existing Account summary readable on narrow screens. Email and Account Created must render as normal label/value fields, never crushed columns or vertical stacks of individual characters.

Remove unused desktop right-rail allocation from phone/tablet portrait layouts. Keep account summary and permitted Story Activity content in one normal-flow column.

Authority:

1. Current operator brief and this written specification.
2. Existing CAB-08 gates, account data/state contracts and localization dictionaries.
3. M177 mobile appbar and drawer.
4. M170 cabinet hierarchy and full-width Story Activity continuity.
5. M178 raster as an illustrative reference.

CAB-08 source and current copy dictionaries were not supplied during artboard generation. Implementation must inspect them rather than reconstruct their details from the image.

## 2. Scope

Included: responsive shell width allocation, account field layout, natural wrapping, card spacing, theme parity and soft Story Activity continuity.

Excluded: new profile fields, account editing, verification semantics, authentication redesign, new statuses, APIs, wallet/contribution functionality and production brand exports.

This is a layout residual, not a replacement cabinet.

## 3. Page hierarchy

1. Existing next-shell appbar appropriate to the current breakpoint.
2. Existing localized account page heading.
3. Account summary card.
4. Existing Story Activity and status blocks only when allowed by current CAB-08.

All sections share the available main-column edges. Heights follow content. No floating account field, badge or card may overlap another region.

No empty right rail, hidden grid track, spacer card or desktop column may continue reserving width when its content is absent. Remove the layout allocation along with the hidden module.

## 4. Shell and breakpoint continuity

At **≤767 CSS px**, reuse M177 MobileAppBar: left burger, correct theme PNG brand, full-width chrome and internal safe-area padding. Drawer behavior remains M177.

The artboard also includes a **768 px tablet-portrait example** to demonstrate a single-column profile. This does not extend M177's mobile-appbar breakpoint above 767 px. At 768 px and above, use the existing shell/header breakpoint behavior; the drawn burger header is continuity shorthand, not a new tablet-shell requirement.

Portrait profile content must not lose width to an empty desktop rail, regardless of the shell variant. A sensible existing main max-width may center the single column on larger screens; do not force a phone-width column on a tablet.

No new orientation-detection or global breakpoint system is introduced.

## 5. Account field layout

Reuse existing Email and Account Created labels and actual account values.

| Available space | Layout |
| --- | --- |
| Comfortable two-column width | Label left; value right, with stable gap and adequate width for both |
| Narrow or larger text | Label above value; each field uses full available inner width |
| Long value | Wrap within the flexible value region; allow card height to grow |

Choose layout before either column becomes cramped. Do not preserve two columns at the cost of unreadable labels or single-character value wrapping.

In stacked layout, each label remains directly associated with its value. Keep fields in the existing order, Email followed by Account Created.

In horizontal layout, labels remain whole words and values get the remaining space. Rows align consistently without giving one field a tiny fixed-width cell.

Do not use vertical writing mode, forced per-character breaks, fixed narrow value columns or font shrinking to fit. Long unbroken email segments may require safe overflow wrapping, but only after using the available width and switching to stacked layout.

Missing, loading or unavailable values retain existing honest handling. Do not fill them with the fixture values from the artboard.

## 6. Width and spacing

| Property | Value / rule | Status |
| --- | --- | --- |
| Phone reference viewport | 390 CSS px | Reference |
| Main horizontal gutter | 16 CSS px per side | Proposed; existing tokens govern |
| Card width at 390 | 358 CSS px with those gutters | Derived illustration |
| Card inner padding | 16 CSS px | Proposed |
| Card radius | 12 CSS px | Proposed |
| Stacked label-to-value gap | Approximately 8 CSS px | Proposed |
| Gap between field groups | Approximately 16 CSS px | Proposed |
| Flexible grid/flex children | Allow shrinkage, e.g. equivalent of min-width: 0 | Required behavior, not mandated code |

No hard minimum content width may force horizontal page overflow. The minimum usable width is the actual viewport space after existing safe areas and gutters.

Existing confirmed card, typography and responsive tokens take priority over proposed measurements. Do not sample the raster as CSS scale.

At narrower widths, large text or 200% zoom, preserve readable values and accessible content rather than maintaining a fixed card height.

## 7. Account data and fixture boundary

The image uses:

- `resident@example.org`
- `a.longer.address@example.org`
- `14 October 2026`

These are illustrative layout fixtures, not a real identity, creation date, schema default or production record. Do not hard-code them.

Use existing account sources and date formatting. The example date does not establish an English-only date format, timezone conversion or new date precision.

No avatar, DID, wallet address, new profile identifier or additional account field is required by this sheet.

Existing civic badges/statuses, if mounted under the current contract, remain compact in normal flow. M178 does not create a Verified status, infer verification from account data or require a new badge.

## 8. CAB-08 gates

Keep Wallet and Contribution hidden under the existing CAB-08 rules. Do not unfreeze, delete or reimplement their code.

Do not render their disabled cards, “coming soon” placeholders, balances, links or reserved grid columns. Their absence releases layout space.

Reuse actual gate names and mechanisms from the repository. This specification introduces no new flag or rollout policy.

## 9. Story Activity and optional status blocks

Story Activity is a soft continuity element, rendered only if present and allowed by current CAB-08. It sits below Account at full available main width.

Reuse existing state components, copy keys and supported data. M178 does not define metrics, table columns, story IDs, pagination or new status vocabulary.

| Existing state | Required treatment |
| --- | --- |
| Confirmed empty | Existing approved localized empty state |
| Populated | Existing supported activity content in a readable stack |
| Loading | Existing scoped loading state |
| Failed/unavailable | Existing honest scoped failure state |
| Gated/absent | Omit block and release space |

The artboard shows an empty illustration with “No story activity yet.” and “Go to Feed”. These reference strings do not override current dictionaries or establish approved new translations.

The grey image/card silhouette inside the empty illustration is not a required Story image, fake activity row, loading claim or new asset requirement. Reuse the existing empty-state visual.

The illustrated empty state is not evidence of a successful data read. No new API or integration-completion claim follows.

Where the existing Go to Feed CTA is rendered, its destination is **`/next/feed`** using current router conventions.

Other existing status blocks may stack below the account region if CAB-08 allows them. Do not invent blocks merely to fill the page.

## 10. Themes, copy and accessibility

Keep equivalent anatomy in light and dark. Use existing semantic roles for page/card surfaces, dividers, primary values, secondary labels and actions.

M177 governs theme brand assets. Do not crop a logo from M178 or use the generated artwork as a production master.

Reuse existing RU/EN/ET copy keys. English reference labels on this sheet do not authorize new dictionary keys or automatic replacement translations.

Use semantic field association, such as the existing description-list pattern. Visual right alignment must not change reading order.

Email remains normal selectable readable text; this layout does not introduce a mail link or editing action.

Keep visible focus and actual minimum 44 × 44 CSS px targets for interactive elements, including burger and the existing CTA. Account field rows are not made interactive by this sheet.

## 11. Panel mapping and raster precedence

| Panel | Meaning |
| --- | --- |
| A — Light phone, 390 px | Stacked labels and values; full-width single-column main |
| B — Portrait / detail | Horizontal rows when comfortable; stacked alternative for narrow/long values; no empty right rail |
| C — Dark phone | Same readable stack and permitted activity continuity |

Annotations, route badges and fixture labels are documentation, not product copy.

The image's 768 px burger-header example does not alter M177's breakpoint; §4 governs. The outer artboard heading's mobile label does not restrict the profile fix to ≤767 px when tablet portrait still suffers from reserved rail width.

No numeric minimum, exact breakpoint for field stacking, typography token or contrast pass is established by generated pixels.

## 12. Reusable layout reference

For future related profile artboards, cite:

> M178: one profile main column without empty rail allocation; label/value rows only while comfortable, otherwise label above value; flexible value width, natural wrapping and content-driven height; CAB-08 gates held; appbar breakpoints remain M177/current shell.

## 13. Verification checklist

- [ ] Account fields remain readable on phone and tablet portrait.
- [ ] Labels do not become vertical character stacks.
- [ ] Email/date values use available width and wrap safely.
- [ ] Two-column rows switch to stacked fields before becoming cramped.
- [ ] Main column has no empty rail/grid allocation.
- [ ] Mobile appbar reuses M177 without extending its breakpoint from the raster.
- [ ] Cards grow naturally and do not overlap or clip.
- [ ] Wallet/Contribution remain gated with no placeholder space.
- [ ] Activity/status blocks reuse existing CAB-08 availability and state behavior.
- [ ] Fixtures and empty illustration are not presented as real account/activity data.
- [ ] Existing dictionary keys, date formatting and data sources remain.
- [ ] Go to Feed retains /next/feed.
- [ ] Light/dark, narrow layouts, large text and keyboard focus remain usable.
- [ ] Proposed dimensions are distinguished from confirmed tokens.

No new API, runtime test pass, OP PASS or production deployment is claimed.
