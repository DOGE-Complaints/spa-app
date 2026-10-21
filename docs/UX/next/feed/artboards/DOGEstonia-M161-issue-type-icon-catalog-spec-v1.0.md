# DOGEstonia — M161 IssueTypeIcon Catalog and SVG Handoff Specification v1.0

**Date:** 2026-10-21  
**Artboard id:** **M161**  
**Surface:** SPA `#/next/feed` — `FeedCivicPost` / `IssueTypeIcon`  
**Raster:** [DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.png](DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.png)  
**Story tip:** [STORY-SPA-NF-13](../../tasks/backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md)  
**Intake:** [analysis-m161-m162-generation-intake-2026-10-21.md](../../analysis/analysis-m161-m162-generation-intake-2026-10-21.md)  
**Status:** five metaphors + filenames OP-accepted · SVG masters **Present** (icon-system + runtime) · bind Apply = NF-13 · no invent OP PASS

## 1. Purpose and scope

Replace the empty identity slot beside an Issue ID with a glyph representing the known `issue.type`. This is an Issue-type identity slot, never an author avatar or evidence of personal identity.

The catalog covers exactly five requested keys: `INCIDENT`, `complaint`, `system_bug`, `observation`, `absurdity`. It does not assert that all five have been observed in live responses or that this set is the complete backend enum. Unknown/unmapped types get no invented glyph.

Included: accepted visual metaphors, exact key-to-filename mapping, slot/glyph geometry, fallback honesty, SVG delivery and an illustrative header crop. Excluded: product code, HTTP/API changes, author/avatar/time, type normalization, additional wire types, engagement counts, new Issue data, full feed redesign and OP PASS claims.

## 2. Authority and source boundaries

1. Current operator request and accepted metaphors.
2. Operator acceptance of exact filenames, including key case and underscores.
3. Delivered SVG geometry and this written register for implementation handoff.
4. Raster catalog for visual hierarchy and tone; it is not a pixel-measurement source.

The existing `/icons/next-feed/actions` source assets were not available for inspection. A match to their precise line weight is **TBD**. No existing runtime catalog registration or Present status is inferred from delivered files.

## 3. Exact catalog mapping

| Exact key | Accepted metaphor | Exact SVG filename | Boundary |
|---|---|---|---|
| `INCIDENT` | Warning triangle with exclamation mark | `ic-issue-type-INCIDENT.svg` | Preserve uppercase key and filename segment |
| `complaint` | Message/speech outline with exclamation mark | `ic-issue-type-complaint.svg` | Civic complaint cue; not an author message avatar |
| `system_bug` | Restrained bug contour | `ic-issue-type-system_bug.svg` | No cartoon face or emoji |
| `observation` | Eye outline with pupil | `ic-issue-type-observation.svg` | No invented verification or surveillance status |
| `absurdity` | Tangled/crossing directional arrows | `ic-issue-type-absurdity.svg` | Type cue, not a clickable shuffle/share/refresh action |

These are exact requested mappings, not instructions to lowercase or normalize backend values. For example, `incident` is not automatically an alias of `INCIDENT`. Any aliases require an authoritative contract decision. Missing, null or unmapped values receive no mapped glyph under this catalog.

## 4. Slot and glyph geometry

| Property | Rule |
|---|---|
| Identity slot | 48 × 48 CSS px |
| Slot corner radius | 12 CSS px |
| Glyph render box | 24 × 24 CSS px, centered in slot |
| Master coordinate system | `viewBox="0 0 24 24"` |
| Master intrinsic dimensions | 24 × 24 |
| Master fill | None by default; small exclamation dots use currentColor |
| Master stroke | `currentColor` |
| Working stroke width | 2 units in the 24-unit grid; equivalent to 2 CSS px at 24 px render size |
| Caps / joins | Round |
| Backing and slot geometry | Owned by consuming UI, not embedded in the SVG master |

Do not scale the glyph to fill the entire 48 px slot. The artwork shows magnified documentation samples; apparent line weight and dimensions must not override these written values.

The 2-unit stroke is a delivered working value, not an operator-confirmed match to action icons. Reconcile with actual action SVG sources before claiming full visual integration. No non-scaling-stroke behavior or alternative 16 px master is established by this handoff.

## 5. Visual language and palette

Use flat civic line icons with consistent visual weight, no gradients, shadows, purple glow, emoji or face-like avatar treatment. Keep the existing textual type badge/label authoritative; the glyph is supplementary.

The light-feed reference uses page `#F7F6F2`, surface `#FFFDF8`, text `#101828`, secondary `#667085`, neutral hairline `#E7E4DC`, yellow accent `#F5C542` and link/accent `#B54708`. For a neutral light presentation, glyph ink follows the existing primary text role through `currentColor`.

The artboard's backing tint, border/shading and yellow INCIDENT badge are illustrative continuity, not new status tokens. Exact slot backing/border roles and unknown-slot grey remain **TBD** unless already defined by the consuming feed pack. Do not sample the PNG to invent another hex value.

## 6. Unknown / omit behavior

For a type without a catalog mapping, omit the glyph. An empty neutral/grey 48 px slot is allowed by the operator; no question mark, initial, dash, emoji, generic warning or fabricated type symbol is inserted.

`unknown / omit` is a documentation label, not a sixth backend type. No `unknown.svg` is delivered. The 24 px empty preview area on the sheet is not an extra UI element to render.

If the consuming layout keeps the empty slot, preserve the surrounding header geometry. Whether a particular existing layout removes the slot entirely and its precise fallback backing treatment remain TBD; this catalog does not authorize a new layout-shift behavior. Preserve an existing real type label when supplied; no fallback copy is invented.

## 7. Artboard panel mapping

| Panel | Content | Meaning |
|---|---|---|
| A / B | Five type tiles, each with slot and standalone glyph preview | Same mapped glyph at two documentation presentations; exact keys printed below |
| C | Empty unknown/omit tile | Honest absence of a mapped glyph; not a catalog entry |
| D | Civic card header with INCIDENT icon, `Issue {id}`, PUBLISHED and INCIDENT badge | Illustrative placement only; no invented author or live-data claim |
| Export proposal | Proposed filenames and runtime directory | Naming/path handoff; not evidence of repository installation |

The in-context `Issue {id}` is a literal placeholder. `PUBLISHED` illustrates an existing status chip and must follow actual Issue data in implementation; an icon cannot force publication status. The fixture title `Neighbourhood crossing visibility` is not a real Issue record or backend evidence.

## 8. SVG delivery and promotion (intake 2026-10-21)

Five SVG masters Present (no raster embed · `viewBox="0 0 24 24"` · `currentColor` · stroke-width 2). Exact filenames §3 preserved.

| Role | Path |
|------|------|
| Masters (docs) | `docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/types/ic-issue-type-*.svg` |
| Runtime | `public/icons/next-feed/types/ic-issue-type-*.svg` |
| URL | `/icons/next-feed/types/ic-issue-type-{key}.svg` |

Do not create an extra unknown master or silently rename uppercase/underscore keys to kebab aliases. Raster panel captions that say “assets not Present” describe the pre-promotion stage — **superseded** by this intake (files on disk). Product bind (`FeedCivicPost` → `iconSrc`) remains **NF-13 Apply** — not claimed Done here.

## 9. Accessibility and behavior

The identity glyph is informational and has no standalone click action. Retain the existing type label, Issue identifier, header semantics and keyboard behavior. A repeated icon beside a fully expressed type label may be decorative in the consuming accessibility tree; do not duplicate announcements unnecessarily.

If the existing UI requires an accessible type description, use the actual known type/localized label rather than inventing identity information. Unknown gets no fabricated accessible type label. Final markup and localization keys belong to implementation, not this vector package.

No HTTP request, upload, reaction, navigation or status change is triggered merely by displaying a mapped icon. Dark-theme verification and any color mapping outside this light sheet remain with the existing theme pack; currentColor alone is not proof that contrast has been checked.

## 10. Integration gates and remaining TBDs

| Item | Current boundary |
|---|---|
| Existing action SVG stroke | Source unavailable; compare before claiming exact match |
| Runtime directory / promotion | **Present** under `public/icons/next-feed/types/` (intake) · React bind Await NF-13 Apply |
| Full wire enum and aliases | Only five requested keys mapped; no normalization invented |
| Exact slot backing / grey fallback paint | Reuse existing approved tokens; otherwise TBD |
| Unknown slot retention versus omission | Glyph omission locked; precise layout policy TBD |
| Runtime manifest/import shape | Existing code/catalog must govern; design manifest is not a new API |
| Dark/high-contrast and screen-reader verification | Not demonstrated by raster or file delivery |
| OP acceptance of delivered SVG rendering | Names/metaphors accepted; no OP PASS invented |

## 11. Review checklist

- [ ] Exactly five known-type masters; filenames match §3 case and underscores.
- [ ] Identity slot is 48 × 48 CSS px, radius 12; glyph is centered at 24 × 24.
- [ ] Type mapping follows actual supplied key; no silent aliases or new types.
- [ ] Existing textual type label remains; no avatar/author interpretation.
- [ ] Unknown omits glyph without question mark, emoji or invented master.
- [ ] SVGs use the documented currentColor/24-unit construction; 2-unit stroke remains labelled working until compared.
- [ ] Slot backing is applied by UI and not duplicated inside the master.
- [ ] INCIDENT/PUBLISHED header uses real data in implementation; fixtures stay fixtures.
- [ ] Runtime promotion/Present status is checked separately from file delivery.
- [ ] Contrast, narrow layout and accessibility are verified in the real feed.
- [ ] No HTTP behavior, product code or OP PASS is inferred from this handoff.
