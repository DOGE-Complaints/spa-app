# DOGEstonia — M151 Board List | Map Toggle (SSR-M) State-Sheet Specification v1.0

**Package:** M151, third in the approved M149–M160 sequence  
**Status:** **accepted** for handoff (revision 2); written implementation contract remains authoritative · residual visual polish → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Date:** 2026-10-07  
**Target:** current light-first `/board`; desktop list/map and 390 px mobile expectation  
**Artboard:** `generated_images/exec-adba3b7f-d90c-4d0f-bf98-b9496f640273.png`, revision 2

**Visual audit, 2026-10-07:** A and B use the same selected filter, with all seven demo Issues represented in List and exactly three pins in Map; B/E visibly explain the subset; C1 now keeps populated List while Map is unavailable; C2/C3/D/E distinguish local map loading, local failure and pin preview. Provider-neutral map and attribution placeholder are visible. In the small C1 crop the generated action row omits `Reactions`; it is an illustration limitation, not a permitted three-action variant. A and the written component contract require all four actions. `Clear filters` is not visible next to selected `Needs` in A/B; the written toolbar rule in §7 still requires it. Revision 1 is superseded by revision 2. Do not treat either omission as an implementation change.

## 1. Purpose

Show the same filtered Issue result set in two views while preserving a fundamental distinction: List contains every received Issue; Map contains only Issues with valid numeric coordinates. Lock eligibility, partial results, loading, failure, pin selection, filtering and narrow behavior in the approved current dashboard visual language.

## 2. Scope and non-goals

Included: `BoardToolbar`, `ListMapToggle`, `BoardFeed` list state, `BoardMap`, selected `MapIssuePreview`, list/map filter continuity, provider-neutral map surface, mobile preview card and return path. Required M151 states are listed in §5.

Excluded: new map provider selection, map tile implementation, private street-level geo, geocoding, clustering, bounding-box query UI, map-driven filter mutation, routing/directions, Issue-thread design and unsupported search semantics. This sheet does not establish a live public map release while coordinate precision/privacy policy is unresolved.

## 3. Authority and continuity

The current package instruction and *Current Design State-Artboard Coverage & Generation Backlog v1.0* lead. Then use *Unified State Inventory v1.0* §§2, 7–8; *Component & Variants Specification v1.0* (`BoardToolbar`, `FilterChipGroup`, `ListMapToggle`, `BoardFeed`, `BoardMap`, `MapIssuePreview`); *Interaction & Behavior Specification v1.0* §11; *Data-to-UI Contract v1.0* §§6, 9–10 and 31; *Dashboard Layout Specification v1.0*; *Mobile Responsive Design Pack v1.0* §13; *Design Tokens Package v1.0*; *Accessibility & Localization Pack v1.0* §§15–16; *Asset Manifest v1.0* §14. Written specifications override pixels.

Accepted M149 revision 1 establishes the light board shell and toolbar position; accepted M150 revision 3 (handoff 2026-10-08) establishes the Issue post/card. Use `exec-26720537-2028-4b60-af0b-67df6f385bc3.png` for current full-board continuity. Historical M143–M148 dark sheets are previous visual skin, state logic only. Brand logo assets are read-only references. M151 introduces a new map view within that shell, not a redesigned board.

## 4. Shared anatomy, data rule and state ownership

```text
PublicHeader + ProfileRail + NodeContextRail
└─ Board main
   ├─ BoardToolbar (node search, filter chips, result context, List | Map)
   └─ BoardFeed
      ├─ List: ordered BoardIssuePost[] for every received Issue
      └─ Map: BoardMap with pins for eligible Issues[] + MapIssuePreview?
```

Eligibility is strict: `typeof issue.geo.lat === "number" && typeof issue.geo.lon === "number"`. Neither a textual address nor district/postal code makes a pin eligible. Compute eligible pins from the **same received Issue array and same supported filter query** used by List. The current endpoint exposes no server total, cursor, sort or separate map resource. A numeric subset helper `M of N` means M coordinate-eligible entries from the current N-entry response array, not all Issues in the database. If pagination is later introduced, revisit this wording before shipping.

The toolbar owns query/filter and view selection; `BoardFeed` owns result-region states. Map loading/error changes only the map region. Known filters, civic shell and the list representation remain available. Do not copy a coordinate-less Issue into Map as a guessed pin. Do not silently hide it from List.

## 5. Required state matrix and panel mapping

| State | Predicate / trigger | Required presentation | Sheet location |
|---|---|---|---|
| `SSR-M-list` | Default or List selected | All N filtered Issues, including coordinate-less entries | A |
| `SSR-M-map` | Map selected with M ≥ 1 | Only M valid pins on provider-neutral map | B |
| `SSR-M-ineligible` | M = 0 | List stays complete; Map disabled/hidden with helper, no empty enabled map | C1 |
| `SSR-M-partial` | 0 < M < N | List=N, Map=M; explicit subset explanation near map | B and linked B1 |
| `SSR-M-filtered` | Supported filters active | Same selected chips/query and resulting set in both views | A↔B linked comparison |
| `MAP-LOADING` | Map surface/pins pending after eligible selection | Framed map placeholder, filters visible, no fake pins | C2 |
| `MAP-ERROR` | Map rendering/service fails | Persistent map unavailable message and `Return to List`; list intact | C3 |
| `MAP-PIN-SELECTED` | Pin activated | Public Issue preview with `Open issue`; selected pin exposed | D desktop and E mobile |
| `SSR-M-narrow` | Mobile/narrow | Toggle remains by result context, map plus bottom preview above nav | E |

The sheet uses four primary areas: A list, B map/partial, C state gallery (C1–C3), and D selected pin, with mobile E as linked narrow detail. Each state ID is visibly labelled. The A↔B link must establish that view selection changes representation, not query scope.

## 6. Deterministic illustrative fixture

Use one clearly labelled **demo result set** with N=7 Issues after the same supported filters. Exactly M=3 have numeric lat **and** lon; four lack at least one coordinate. A shows all seven in list representation, which may be visually indicated by the first two Issue cards plus a compact continuation/count annotation outside the UI; B shows three pins and the honest helper `3 of 7 Issues shown on map`. The fixture is for visual logic, not a production metric or server total. Pin locations are schematic and must not imply true home-level coordinates.

Use public generic Issue titles and district-level labels where the approved presentation allows them. Do not use the demo fixture to promise that the current UI has a public `geo.label`, accurate point precision, a basemap license or a live geocoder. At least one list-only Issue is explicitly annotated outside UI as having no coordinates, so the List completeness rule is visually testable.

## 7. Panel A — `SSR-M-list` + `SSR-M-filtered`

Show the accepted light three-column board at a large enough scale to recognize fixed header, left navigation, center feed, right civic context, board heading and toolbar. A selected supported filter chip persists; `Clear filters` is available when selection differs from default. `List` is visibly selected at the far right of the toolbar. Show the current Issue-as-post card with `React`, `Comment`, `Share`, `Reactions`; a second card or continuation establishes ordered feed. Annotate that all seven demo Issues, including four without coordinates, are in List. Do not claim the illustrated cards are live residents or that `7` is a server total.

The node search visual may remain in the inherited toolbar; text-search results are not asserted. The reviewed API supports structural filters, not a text query. The same selected structural filter state must appear in B.

## 8. Panel B — `SSR-M-map` + `SSR-M-partial` + `SSR-M-filtered`

In the same shell and toolbar, select `Map` and replace only the feed result region with a provider-neutral map canvas. Show exactly three distinct Issue pins, selected/focus-ready shapes with clear contrast. Keep selected filter chips visible and unchanged. A helper immediately near map results says `3 of 7 Issues shown on map` and explains that Issues without map coordinates remain in List. The map is a subset, not a replacement result set.

The basemap may be an abstract, low-detail street/area illustration with no named provider or vendor logo. Reserve a visible bottom-corner **provider attribution slot** without inventing a provider name; actual attribution is mandatory once one is chosen. Do not render private home markers, street-level labels, precise address callouts, clustering counters or bounding-box tools. The schematic district/road geometry is illustrative, not geospatially accurate.

## 9. Panel C — eligibility, loading and failure

### C1 `SSR-M-ineligible`

Use a current result set with N>0 and M=0. List is selected and remains populated with all N Issues. `Map` is visibly disabled (or absent with adjacent text) and a concise helper explains `No Issues in these results have map coordinates`. No enabled empty map canvas and no implication that the Issue query itself failed. If N=0, use the board empty result from M149, not an invented special map screen.

### C2 `MAP-LOADING`

After a valid switch to Map, preserve the shell, filter controls and selected Map state. Show a stable framed placeholder for the map region and one bounded `Loading map…` status. No fake pins, fake tile labels, fabricated count or page-wide skeleton. The List switch remains available.

### C3 `MAP-ERROR`

Keep toolbar and filters. In map region show persistent `Map unavailable` copy, a meaningful `Retry map` if applicable and `Return to List`. List can still show the same Issues; failure of map tiles/rendering does not become a feed query error or delete the data. If the entire Issue query fails, the M149 feed error state governs instead.

## 10. Panel D — `MAP-PIN-SELECTED` desktop

Show B's map with one visually selected pin and a compact public `MapIssuePreview` anchored nearby, without covering the selected toggle or attribution slot. Preview contains the Issue's public title/identity and only available public location names, plus a distinct `Open issue` action. Selecting another pin updates the preview in place; activating `Open issue` follows the same existing Issue modal/detail behavior as opening it from List. Do not print `admin_*` source keys, raw coordinates, exact private address or unconfirmed `geo.label`. If details are pending or unavailable, preserve a local preview loading/error state instead of making up values.

## 11. Panel E — `SSR-M-narrow` and selected pin at 390 × 844

Use the accepted 56 px mobile app bar, active node, 16 px gutters, board search and horizontally scrollable filter chips. Put result context and `List | Map` together near the toolbar, not inside a hidden filter drawer. Map fills remaining space above 64 px bottom navigation plus safe area. A selected Issue appears as a bottom preview card above nav; it may be draggable but must have explicit controls and not require a gesture. The preview must not obscure the view toggle, provider attribution or the only way to return to List. Keep a compact partial-map helper in view. At 320 px, allow stacked controls and 12 px page gutters without horizontal document overflow.

## 12. Visual tokens, responsive and dark parity

Use current light shell, warm page `#F7F6F2`, white/warm surfaces `#FFFFFF`/`#FFFDF8`, navy primary text `#101828`, secondary `#667085`, subtle border `#E7E4DC`, civic yellow `#F5C542` for selected toggle, accessible orange text link `#B54708`. Map pins must remain high contrast in selected, keyboard-focused and rest states, never color-only. Provider-neutral map texture is subordinate to pins and helper copy.

At 1440 × 1024, retain 64 px fixed public header, 240 px left rail, ~824 px feed, 280 px right rail, 20 px gaps and ~28 px outer gutters. Toggle is ~144 × 40 px at the far right of board toolbar. At 1024–1199 right modules relocate; at 768–1023 feed centers in one column; 320–767 uses mobile shell. Light/dark themes preserve geometry and eligibility semantics; dark tokens use `#141417` page, `#1B1C1F` surface and `#F2F2F2` text. M151 need not duplicate all panels in dark; M160 consolidates theme parity.

## 13. Interactions, focus and return behavior

- List is the default complete representation. `List | Map` is a controlled labelled two-option selector with visible selected state, keyboard and touch operation. Do not move it into the filter drawer.
- Activating Map is allowed only when M≥1 for the current response array. Switch starts map loading while selected filters remain visible. Switching back to List restores the full array and preserves query, focus context and scroll where practical.
- Changing a supported filter refreshes one shared result set and recomputes M/N. If M becomes zero while Map is active, return to a complete List with honest helper; never leave an enabled empty Map with stale pins from an old query. Obsolete responses cannot overwrite the current node/query.
- Pin selection updates one accessible nearby summary; another pin replaces it without navigation. Escape dismisses the preview before leaving map. `Open issue` uses the existing Issue overlay/route, with focus and scroll restoration on return.
- Map error has a local retry/return route. A failed map request cannot invalidate the Issue list or silently clear filters. Mobile preview offers explicit close/open controls; dragging is optional.

## 14. Data dependencies and contract boundaries

| Surface | Source/derivation | Boundary |
|---|---|---|
| List | `GET /node/issues` `data.issues[]` with supported structural filters | Full received array; no server total, pagination or sort metadata. |
| Pin eligibility | Numeric `issue.geo.lat` AND numeric `issue.geo.lon` | Both required; textual geo cannot be geocoded in UI as a substitute. |
| Partial helper | M eligible of N received | Honest only for current complete unpaginated response; revisit with `DUI-Q13`. |
| Preview location | `geo.admin_district`, `admin_settlement`, `admin_region`, `admin_country` when available | Human public labels only; `geo.label` is absent (`DUI-Q14`). |
| Search | No confirmed text-search query | Search box inherited as visual control; no authoritative text-search result claim (`DUI-Q12`). |
| Basemap/attribution | Provider not chosen | Provider-neutral artwork plus attribution placement; no vendor commitment. |
| Coordinate privacy | No precision/privacy indicator | Public map release requires `DUI-Q14` policy; schematic fixture only. |

No invented endpoint, field, metric or bounding-box workflow is implied by this artboard. Geo bounds parameters exist in the API, but the map is not an approved interactive spatial-query editor.

## 15. Accessibility and localization

List is the complete accessible alternative to Map. Toggle selection is exposed programmatically and Map's disabled reason is tied to its control. Each pin is a keyboard-operable control with an accessible name from public Issue/title and location data; selected state and preview association are announced. Zoom/pan controls, if shown, have names and keyboard support; no gesture-only instruction. When M/N changes after a committed filter action, announce subset copy once through a polite status, not repeatedly on pan/pin movement.

ET/RU/EN labels expand 30–40% without losing `List`, `Map`, `Return to List`, partial helper or filter controls. At 200% zoom/320 px, page reflows, even if the map canvas itself pans in two dimensions. Focus ring is visible; status never relies on pin color alone. Map attribution remains legible and uncovered. The preview avoids exposing raw coordinates or private address fields.

## 16. Forbidden representations

- Map as the only way to reach an Issue; coordinate-less Issues disappearing from List.
- A pin inferred from district, postal code, address text or a missing/non-numeric coordinate.
- An enabled empty map when M=0, or stale pins after filter/node change.
- Presenting `3 of 7` as a server total, a production metric or a count after future pagination without a new contract.
- Vendor branding/licensing claim, missing attribution slot, real-looking exact home pins, private street-level data, clusters or map-bound filter tools.
- Filters hidden in Map mode, page-wide error for local map failure, or blank map without return to List.
- New dark default skin, marketing hero, Meta assets, regenerated DOGEstonia logo or invented backend paths.

## 17. Artboard composition instructions

One high-contrast, sharp state sheet titled `M151 · BOARD LIST / MAP · SSR-M · rev 1`. Use 2–5 large primary panels and linked subpanels: A full light board list anchor; B same toolbar and partial map side-by-side or below A with an explicit same-query connection; C1–C3 enlarged eligibility/loading/error crops; D selected pin desktop close-up; E 390 px mobile map/preview. If a 1440 board repeated in every state would be illegible, show the complete shell once and enlarge center-region crops elsewhere, with clear state labels outside functional UI. Provide enough space for a readable partial helper and return control. No provider-specific cartography or invented street labels.

Use illustrative 7/3 fixture consistently in A, B and D. Keep ineligible C1 a separately labelled result set, so viewers do not confuse it with the partial fixture. Place an external note by B: `Demo subset: 3 of 7 received Issues have numeric coordinates`. Place a separate note on privacy/attribution contract. Artboard communicates UI ownership and state transitions, not final map tiles.

## 18. Implementation handoff notes

Compute map-eligible Issues from the current list response in the same query cache; do not issue a second silently different Issue query for Map. Query identity includes active node and normalized supported filters. Reset pin selection if its Issue is no longer in the current eligible subset. Keep map renderer loading/error state independent of Issue data, and preserve access to List in every map state. Release of public pins needs a product privacy decision on precision and location copy; provider choice needs license/attribution implementation.

## 19. Acceptance checklist

- [ ] A shows all received filtered Issues and visibly includes a coordinate-less example.
- [ ] B shows only numeric-coordinate pins for the same filters and states `3 of 7` as a demo subset.
- [ ] C1 disables/hides Map for M=0 without making the full List disappear.
- [ ] C2 has a map-only placeholder and no fake pins; C3 has map-only error and Return to List.
- [ ] D selected pin has public preview and Open issue; E retains controls, partial helper and safe-area navigation on mobile.
- [ ] Filters and toggle position remain consistent between List and Map.
- [ ] Provider neutrality, attribution placement and coordinate-privacy boundary are visible.
- [ ] All nine required M151 state labels in §5 are traceable to readable panels.
- [ ] No unavailable API field, production total, geocoding inference or street-level data is implied.
- [ ] Audit generated artboard against this spec; regenerate only for implementation-relevant semantic mismatch.

## 20. Open decisions requiring product/API answer

| ID | Question | Handling in M151 |
|---|---|---|
| `DUI-Q14` | Public coordinate precision/privacy, safe location label, and whether `geo.label` is needed | Schematic pins and public district-level preview only; no release claim. |
| Map provider/license | Which tiles, attribution and interaction controls are approved? | Provider-neutral canvas with explicit attribution slot. |
| `DUI-Q13` | Pagination/sort and authoritative total | `M of N` refers solely to current full response array. |
| `DUI-Q12` | Text-search semantics | No search-result implication in this sheet. |
| `DUI-Q01` | Public Draft exposure | Demo map/list do not settle public publication policy. |
