# DOGEstonia — M163 Feed Civic React Underlay Residual Specification v1.0

**Date:** 2026-10-22  
**Artboard ID:** `M163-feed-civic-react-underlay-residual`  
**Artboard PNG:** **Absent** in wave3 drop (named `exec-6d94d2a9-6692-4cbd-8e82-93932eca8a7e.png` — not on disk). Written spec = SSOT until PNG promoted.  
**Surface:** SPA `#/next/feed`, `FeedCivicPost` action strip beneath media  
**Status:** written operator requirement and visual proposal. No runtime implementation, measured contrast pass or OP PASS is claimed.

## 1. Purpose and scope

Render React with one wide neutral rounded underlay spanning its entire allocated action zone. Remove any smaller inner pill or second backing. Keep Comment and Share flat/transparent and retain the fourth Reactions aggregate zone.

This residual updates React chrome only. It does not redesign the picker, aggregate contents, people surfaces, media layout, comment tree or Share flow. No new icons, reaction IDs, HTTP behavior or product code are introduced.

## 2. Authority and precedence

The current operator M163 instruction overrides the earlier action-strip density proposal **only where that proposal required React to be entirely flat**. For this residual, React has one full-zone underlay; Comment and Share remain flat.

Existing four-zone anatomy, behavior, accessibility, asset ownership and CR-23 Live ReactionsMount host remain governed by their existing packs. Earlier unaccepted numerical density proposals do not become locked merely because M163 illustrates them.

M154 governs the distinction between reaction entry/picker and aggregate display. M155 owns people surfaces. The operator-supplied live strip crop `image(20261021-101217).png` is the glyph reference. The generated sheet is not an SVG master or a source of new catalog IDs.

## 3. Four-zone ownership

| Position | Zone | Presentation / retained responsibility |
|---|---|---|
| 1 | React | One wide neutral underlay; existing reaction-entry action opens the existing M154 picker |
| 2 | Comment | Flat/transparent; existing comment-entry behavior |
| 3 | Share | Flat/transparent; existing Share behavior |
| 4 | Reactions | Existing aggregate host/content; not a second picker or a static replacement for live aggregate data |

Keep exact order **React | Comment | Share | Reactions**. The React underlay does not merge zones or extend behind neighboring controls. No fifth zone, count, new badge or additional action is specified.

## 4. Single-underlay construction

The React zone's outer control/container owns the sole rounded background. Its width follows the full horizontal allocation of that zone, not the icon-and-label intrinsic width. The icon and label sit directly on this backing.

Any inner action wrapper is transparent and has no decorative border, pill, second fill, inset shadow or card. If the existing integration requires nested elements, that structural nesting must not create visually nested controls or duplicate targets.

The exact annotated rule is:

> wide underlay kept · no double nest

This is an implementation instruction and artboard annotation, not resident-facing copy. Do not literally add it to the UI.

| Property | Rule |
|---|---|
| Background count | Exactly one visible React backing |
| Horizontal span | Full allocated React zone |
| Inner action | Transparent; no inner pill or frame |
| Shape | Rounded outer zone; exact radius inherits existing approved token or remains TBD |
| Default decorative border/shadow | None added by this residual |
| Comment/Share backing | Transparent/flat |
| Touch target | Actual interactive target at least 44 CSS px |
| Total zone width/height, padding and gaps | Existing confirmed strip layout; no new exact values inferred from raster |

No DOM structure, CSS class or new token identifier is mandated here. This is the visual ownership rule.

## 5. Light and dark presentation

### Light

Use a restrained light neutral/warm-grey React underlay within the existing civic theme. The artwork references `#F7F6F2` against the warm surface `#FFFDF8`, with primary text `#101828`, secondary `#667085` and existing neutral hairline `#E7E4DC` where already used.

These values express light-theme continuity. The authoritative semantic underlay-token mapping must be reconciled with the existing theme pack; no new opacity mixture, green/red status wash, violet palette or extra border is approved by raster interpolation.

### Dark

Retain the same single full-zone geometry. Use an existing theme-appropriate neutral backing with readable icon/text and flat Comment/Share peers. Do not carry a harsh light rectangle into dark mode or add a separate inner grey pill.

Exact dark underlay and ink roles remain **TBD / existing theme pack**. The dark panel is a contrast preview, not a numerical contrast test or new set of dark hex values.

The underlay is the requested base chrome, not evidence of a selected reaction. Existing selected/pressed/disabled/availability states retain their own semantics; do not infer a new selection rule from the backing.

## 6. Focus treatment

Keyboard focus is indicated at the outer React control boundary, following the wide zone. Do not apply a focus frame around a smaller inner icon/label pill.

A focus outline is not a second underlay. Preserve the one backing underneath. Focus must not change the action's layout or hide neighboring zones.

The light illustration uses the existing `#B54708` focus/accent role. Exact outline width, offset, radius and dark-theme mapping follow existing focus tokens or remain TBD where undefined. Do not measure them from panel D.

Removing double nesting must not remove visible keyboard focus, independent target boundaries or accessible activation behavior.

## 7. Existing icons and labels

Reuse the actual existing SVG masters and aggregate glyphs corresponding to the live reference:

- React: outline hand with thumb up, not a heart substituted as the entry glyph.
- Comment: existing message outline with tail.
- Share: existing bent share-arrow outline.
- Reactions: existing overlapping aggregate glyph treatment, as supplied by the current host.

The left curved mark in the reference aggregate is a glyph, not a numeric count. This document assigns it no reaction ID or new semantic catalog entry. The ear-like/heart/check shapes visible in the raster are visual references only; live aggregate contents must continue to follow their actual existing data/contract.

Do not bake the three reference glyphs into a replacement static aggregate, invent counts, create a new icon pack or derive SVG paths by tracing this artboard. Exact master filenames/paths must come from the repository catalog; none are invented here.

Keep visible localized action labels and existing accessible names. The English fixtures are `React`, `Comment`, `Share`, `Reactions`. Orange handwritten underlines from the source screenshot are review marks and must not be rendered.

## 8. Panel mapping

| Panel | State / purpose | Required reading |
|---|---|---|
| A — Desktop | Civic action strip beneath illustrative media | Full-zone React underlay; no inner pill; flat peers |
| B — Narrow ~390 CSS px | Same four zones in narrow layout | Underlay spans React column; labels/readability and actual targets retained |
| C — Dark | Theme continuity preview | Same single backing and readable theme roles; exact dark mapping pending |
| D — Keyboard focus | Enlarged outer-zone focus example | Focus belongs to outer control; no second filled layer |

Media in A–C is contextual illustration, not a published-media claim, URL, API fixture or gallery requirement. Artboard callouts, rulers, documentation frames and semantic notes are not product UI.

## 9. Narrow layout and responsiveness

At approximately 390 CSS px, preserve all four zones and the same single-underlay rule. The artboard stacks icon above label for narrow presentation. This is a visual arrangement example, not a newly approved breakpoint or fixed strip height.

Use the existing responsive strip rules. Do not shrink fonts/targets, clip labels, overlap zones or introduce horizontal page overflow. Controls may grow vertically for real text and localization; every actual control remains at least 44 CSS px in its relevant target dimensions.

The underlay follows the React zone after responsive reflow. It must not revert to an intrinsic-width pill around just the icon/label. Verify the fourth zone using real existing aggregate content rather than a fabricated count or static schematic label.

## 10. Semantic and interaction boundaries

React remains reaction entry and uses the existing M154 picker. Reactions remains aggregate display/host with its established behavior. Neither is silently repurposed by this paint change.

People surfaces belong to M155 and are not drawn. This sheet introduces no reactors list, avatar, Connect, privacy exposure or new endpoint. Comment/Share behavior, existing capability gating and fail-soft treatment remain unchanged by this residual.

Preserve CR-23 Live ReactionsMount host identity and integration. No remount/replacement architecture, catalog revision or gateway HTTP contract is supplied.

## 11. Accessibility and verification

Retain visible text labels, actual minimum 44 CSS px targets, independent controls, keyboard activation and a sensible existing focus order. Underlay paint alone must not carry reaction meaning or selected status.

Verify focus and contrast in the actual component with light/dark tokens and real assets. Test narrow/localized/large-text states for fit. No accessibility pass or OP acceptance is implied by the generated PNG or this Markdown request.

## 12. Remaining decisions

| Item | Current handling |
|---|---|
| One full-zone backing / no double nest | Locked operator requirement |
| Comment / Share flat | Locked operator requirement |
| Exact light semantic token mapping | Reconcile with existing theme pack |
| Dark backing / ink role | Existing pack; exact mapping TBD |
| Radius, padding, gap, icon sizing and responsive breakpoint | Existing confirmed rules; no new numerical tokens from raster |
| Focus width/offset and dark role | Existing tokens; otherwise TBD |
| Actual SVG paths and aggregate contents | Existing asset catalog and CR-23/M154 contracts |
| Real-layout/contrast/OP verification | Not performed or claimed |

## 13. Review checklist

- [ ] Four zones retain their exact order and existing ownership.
- [ ] React has one rounded background spanning its full allocated zone.
- [ ] No smaller inner pill, duplicate backing, decorative nested frame or shadow substitute remains.
- [ ] Comment and Share stay flat/transparent.
- [ ] Outer React target retains visible keyboard focus; focus outline adds no second fill.
- [ ] Actual touch targets remain at least 44 CSS px.
- [ ] Narrow reflow retains full-zone backing, readable labels and no overflow.
- [ ] Light/dark roles are verified in real UI; no PNG-sampled new palette.
- [ ] Existing thumb/message/share SVG masters are reused.
- [ ] Reactions remains the actual aggregate host; no fixed glyph/count fixture replaces it.
- [ ] M154 picker and M155 people boundaries are preserved.
- [ ] Documentation labels and media examples do not become invented product behavior.
- [ ] No new reaction catalog, asset filenames, HTTP or OP PASS is inferred.
