# File Name

```text
mockup-142-board-list-map-toggle-state-sheet-spec.md
```

# Mockup 142 Spec — Board List | Map Toggle — State Sheet

**Functional code:** SSR-M  
**Mockup:** M142  
**Version:** v1.0  
**Status:** Proposed Active SSOT  
**Area:** Public Board / Issue Result Views  
**Host route:** `/board`  
**Parent surface:** M132 Public Board Home Feed  
**Related surface:** M141 Schema Card Overlay  
**Package / story:** TBD — preserve upstream tracking identity when supplied  
**Priority:** MUST  

---

# 1. Purpose

This specification defines a public `/board` view toggle between:

```text
List

Map
```

Both views represent the same current Issue query and filtered resultset.

The list is the complete representation.

The map is a coordinate-eligible subset.

Canonical rule:

```text
One query.
Two views.
List = all current results.
Map = only current results with numeric geo.lat + geo.lon.
```

The map must never imply that Issues without coordinates do not exist.

---

# 2. Product Context

M132 defines the existing public Issue feed on `/board`, including public shell, search, filters, result states and civic Issue-card anatomy.

SSR-M adds a secondary view choice without creating a separate map product or a separate query.

The user may:

```text
search

filter

view all matching Issues as a list

view the coordinate-capable subset on a map
```

The resultset is shared. Only presentation changes.

---

# 3. Host and Shell Lock

Host route:

```text
/board
```

Reuse:

```text
M129 Public Header

M132 Board header, search and filters

M131 Public Footer
```

Do not create a new route such as:

```text
/map

/issues/map

/geo
```

Do not redesign the public header, footer or feed toolbar.

---

# 4. Screen / Artboard Type

Type:

```text
Route-level alternate-view state sheet
```

Required states:

```text
SSR-M-list

SSR-M-map

SSR-M-ineligible

SSR-M-partial

SSR-M-filtered

SSR-M-narrow
```

The artboard must include desktop and narrow/mobile expectations.

This is a visual/product specification only.

---

# 5. State Matrix

| State | Product meaning | Required visual evidence |
|---|---|---|
| `SSR-M-list` | Default list view | Full current resultset; search and filter toolbar visible; `List` selected |
| `SSR-M-map` | At least one current Issue has numeric latitude and longitude | Generic dark map with eligible pins only; toolbar remains visible; `Map` selected |
| `SSR-M-ineligible` | Zero current Issues contain both numeric coordinates | `Map` visibly disabled with honest helper copy; no enabled empty map |
| `SSR-M-partial` | Some, but not all, current Issues are pin-capable | List shows all N; map shows only M; subset relationship is explicit |
| `SSR-M-filtered` | Search and/or filters are active | Same query/filter state remains visible and drives both views |
| `SSR-M-narrow` | Mobile or narrow viewport | Compact toggle near toolbar; list or map stacked below controls |

---

# 6. Core Resultset Model

Let:

```text
R = current Issue resultset after search + filters

P = Issues in R with numeric geo.lat AND numeric geo.lon
```

Then:

```text
List view renders R

Map view renders pins for P

P ⊆ R
```

Eligibility:

```text
Map eligible when |P| ≥ 1

Map ineligible when |P| = 0
```

Canonical rule:

```text
An Issue without coordinates remains a valid list result.
It is omitted only from the map pins.
```

---

# 7. Terminology Lock

Use:

```text
Issue

resultset

list view

map view

pin-capable

public coordinates
```

Do not describe mapped Issues as all Issues unless every current result is pin-capable.

Do not substitute:

```text
Stories

signals

clusters
```

for Issues in helper copy.

Canonical partial helper example:

```text
3 of 7 Issues on map
```

This is illustrative copy, not a fixed count requirement.

---

# 8. Stable Page Anatomy

The `/board` page preserves this order:

```text
Public header

Board title / context

Search + filter toolbar

View controls: List | Map

Result helper / eligibility copy when needed

Active view surface

Public footer
```

The view toggle belongs near feed/view controls.

It must not be placed:

```text
inside a filter drawer

inside an Issue card

inside the map canvas

in the global header navigation
```

---

# 9. Search and Filter Lock

Search and filters remain visible in both modes.

The current search/filter state is not reset when switching views.

Canonical interaction:

```text
Current query + filters

↓

current resultset R

↙           ↘

List R       Map P
```

Changing search or filters recalculates both:

```text
full resultset

pin-capable subset
```

The artboard may annotate this relationship but must not depict implementation code or new endpoints.

---

# 10. Toggle Anatomy

Labels:

```text
List

Map
```

Icon + text is allowed, but text labels must remain visible.

Required visual states:

```text
List selected

Map selected

Map disabled

keyboard focus reference
```

The control should read as one segmented view selector, not two unrelated CTAs.

Selection changes presentation only.

It does not change the Issue query.

---

# 11. State A — SSR-M-list

## Name

```text
Default full list view
```

## Trigger

```text
/board opens with a non-empty Issue resultset
```

## Purpose

Preserve M132 as the default and complete public representation.

## Required Composition

Show:

```text
public board shell

search field

filter controls

List | Map toggle with List selected

full current Issue resultset

recognizable civic Issue cards
```

Issue cards may use:

```text
civic fields only

OR

civic fields + optional M141 schema overlay
```

M142 must not depend on schema overlay presence.

## Requirements

```text
✓ List is default

✓ all current results remain visible

✓ search and filters remain visible

✓ Map is available only when at least one result is pin-capable

✓ existing card routing remains
```

---

# 12. State B — SSR-M-map

## Name

```text
Eligible map view
```

## Trigger

```text
at least one Issue in the current resultset has numeric geo.lat and geo.lon
```

## Purpose

Show the spatial distribution of coordinate-capable Issues without claiming geographic completeness.

## Required Composition

Show:

```text
same board title

same search and filter toolbar

List | Map toggle with Map selected

generic dark map canvas

Issue pins for eligible current results only

optional selected-pin popup
```

## Map Surface

Use a provider-neutral map treatment:

```text
dark civic-tech frame

subtle roads / districts / water / land shapes

clear but restrained pins

no provider wordmark
```

Do not visually commit to:

```text
Mapbox

Google Maps

Leaflet

another named provider
```

## Requirements

```text
✓ only eligible Issues receive pins

✓ filters remain visible

✓ current result context remains visible

✓ public Issue identity remains recognizable in popup/callout

✕ no false completeness claim
```

---

# 13. Pin Eligibility

An Issue is pin-capable only when both are present and numeric:

```text
geo.lat

geo.lon
```

The following are not sufficient:

```text
lat without lon

lon without lat

non-numeric coordinate text

district only

settlement only

region only

country only
```

These Issues remain valid list results but receive no pin.

The artboard should communicate the paired-coordinate rule without displaying implementation logic.

---

# 14. Pin and Popup Anatomy

Pins should be visually distinct from decorative map marks.

Selected pin may open a compact public callout.

Allowed public geo fields:

```text
label

district

settlement

region

country
```

Use public labels such as:

```text
Location

District

Settlement

Region

Country
```

Do not show:

```text
admin_label

admin_district

admin_settlement

admin_region

admin_country
```

Suggested illustrative popup:

```text
DE-042 · NEW

Public waste bins need more frequent service

Location: Freedom Square

District: Kesklinn

Settlement: Tallinn

Region: Harju County

Country: Estonia

Open issue →
```

Do not display raw latitude/longitude unless a later product requirement explicitly requests them.

---

# 15. State C — SSR-M-ineligible

## Name

```text
Map unavailable for current results
```

## Trigger

```text
current resultset is non-empty

AND

zero Issues contain both numeric geo.lat and geo.lon
```

## Canonical Treatment

Keep the segmented control visible with:

```text
List selected

Map disabled
```

Show honest helper copy near the control:

```text
Map unavailable: no Issues in these results have public coordinates.
```

## Critical Rule

Do not show:

```text
enabled Map control

empty map canvas

No pins found as if this were a map-search failure
```

The user remains in the full list view.

## Requirements

```text
✓ list remains visible

✓ disabled Map state is obvious without relying on color alone

✓ helper explains current-result eligibility

✓ filters remain usable

✕ no empty enabled map
```

---

# 16. State D — SSR-M-partial

## Name

```text
Partial coordinate coverage
```

## Trigger

```text
0 < |P| < |R|
```

## Purpose

Make it clear that map pins are a subset of the complete list.

## Required Paired Evidence

Show a compact relationship:

```text
List
7 Issues
all 7 shown

Map
3 pin-capable Issues
3 pins shown
```

Illustrative helper copy:

```text
3 of 7 Issues on map
```

Supporting copy:

```text
Issues without public coordinates remain available in List view.
```

Counts are illustrative and must be internally consistent within the artboard.

## Requirements

```text
✓ list count represents all current Issues

✓ map helper represents eligible subset

✓ no unmapped Issue is silently treated as filtered out

✓ List remains available in one action

✕ map does not claim 7 pins
```

---

# 17. State E — SSR-M-filtered

## Name

```text
Shared filtered resultset
```

## Purpose

Prove that search and filters drive both views consistently.

## Required Composition

Show:

```text
active search and/or filter chips

same visible query state above list and map references

filtered list result count

filtered map subset helper
```

Example filter context:

```text
Search: waste bins

Type: Complaint

Location: Tallinn
```

Illustrative result relationship:

```text
4 filtered Issues

2 of 4 Issues on map
```

## Interaction Rule

Switching between List and Map must not clear:

```text
search term

filter values

active filter chips
```

## Requirements

```text
✓ same query visible in both modes

✓ active filters remain editable

✓ reset behavior remains M132 behavior

✓ map eligibility recalculates within filtered results
```

---

# 18. State F — SSR-M-narrow

## Name

```text
Mobile / narrow alternate views
```

## Purpose

Preserve view choice and visible query context without side-by-side compression.

## Mobile Order

```text
public header

board title

search

compact filters / active chips

List | Map segmented control

eligibility/subset helper when needed

active list OR map surface

footer
```

## Narrow List

Show stacked Issue cards at full mobile width.

## Narrow Map

Show a single stacked map canvas below toolbar and toggle.

Do not place list and map side by side.

Selected-pin popup may use:

```text
bottom sheet

compact anchored callout
```

provided it does not obscure the entire map or remove access to the toggle.

## Requirements

```text
✓ toggle remains near feed toolbar

✓ filters remain accessible in both views

✓ only one active view is stacked below controls

✓ map has usable vertical height

✓ no horizontal scrolling

✓ subset helper remains readable
```

---

# 19. Full vs Partial vs Ineligible

| Coverage | Toggle | List | Map | Helper |
|---|---|---|---|---|
| All current Issues pin-capable | Enabled | All Issues | Same number of pins | Optional |
| Some current Issues pin-capable | Enabled | All Issues | Eligible subset only | Required subset explanation |
| No current Issues pin-capable | Map disabled | All Issues | Not shown | Required ineligible explanation |

Canonical rule:

```text
Map availability is evaluated against the current resultset,
not the unfiltered database.
```

---

# 20. View-Switch Interaction

Switching view preserves:

```text
route /board

search term

filters

active chips

current resultset meaning
```

The artboard does not define URL persistence for view mode unless already specified elsewhere.

Do not invent:

```text
new query parameters

new routes

new HTTP endpoints
```

View mode selection is a presentation concern in this specification.

---

# 21. Map Loading and Error Boundary

The required state matrix does not add a full map-provider error flow.

However, the artboard may include a compact boundary annotation:

```text
Map loading/error does not invalidate the Issue resultset.
List remains the reliable fallback.
```

Do not confuse:

```text
map ineligible due to zero coordinate-capable Issues
```

with:

```text
map surface unavailable due to a runtime/provider failure
```

Provider failure behavior belongs to a separate requirement unless explicitly added.

---

# 22. Relationship to Empty and Zero-Issue States

SSR-M assumes:

```text
a non-empty Issue feed context

OR

a filtered resultset governed by existing list semantics
```

Do not redesign:

```text
M136–M140 Early Signal / zero-Issue discovery
```

If no Issues exist, the existing board state remains authoritative.

The list/map toggle must not create a new empty-map experience for zero Issues.

---

# 23. Issue Card Relationship

List mode reuses existing civic Issue cards.

Allowed:

```text
M132 civic card

M132 civic card with M141 Additional details overlay
```

Map eligibility must not depend on whether M141 overlay is present.

Do not display `geo.lat` or `geo.lon` as schema overlay rows unless separately selected and allowed by another requirement.

---

# 24. Visual Language

Reuse the DOGEstonia public-board language:

```text
deep Night / blue-black surfaces

charcoal panels

thin borders

white primary type

muted secondary type

Signal Orange / DOGEstonia yellow for active view and primary actions

blue/cool accent permitted for map geometry and secondary navigation

green/red only for real semantic validation states
```

The map should feel:

```text
civic

neutral

operational

provider-agnostic

subordinate to Issue meaning
```

Do not use:

```text
photoreal satellite imagery

branded provider chrome

neon navigation aesthetics

game-map styling
```

---

# 25. Estonian Cultural Layer

Reuse existing non-semantic public-shell framing:

```text
ETM-FLORAL separators

ETM-STRIPE shell accents
```

Do not use cultural motifs to encode:

```text
pin eligibility

coordinate coverage

selected view

filter state
```

Canonical rule:

```text
Cultural layer identifies place.
Functional controls identify view and state.
```

---

# 26. Accessibility

Toggle requirements:

```text
List and Map have visible text labels

selected state is programmatically exposed

disabled Map state is programmatically exposed

focus indicator is visible

selection does not rely on color alone
```

Map requirements:

```text
pins are keyboard reachable where interactive

selected pin/callout has a clear reading order

Issue title is available in pin accessible name

map does not trap keyboard focus

List remains an equivalent complete information path
```

Helper copy must be associated with the toggle or map region it explains.

---

# 27. Localization

Localize:

```text
List

Map

Map unavailable: no Issues in these results have public coordinates.

3 of 7 Issues on map

Issues without public coordinates remain available in List view.

Location

District

Settlement

Region

Country
```

Controls must tolerate longer translations.

On narrow screens, preserve text labels rather than collapsing to ambiguous icons only.

---

# 28. Motion

View switching should be restrained.

Allowed:

```text
short surface transition

subtle selected-segment movement

pin focus transition
```

Do not use:

```text
map unlock animation

celebratory pin appearance

animated clustering spectacle
```

Respect reduced-motion preferences.

---

# 29. Privacy and Public Geo Boundary

Map pins represent only Issues with approved public coordinates.

Popup/callout may show only approved public geo fields:

```text
label

district

settlement

region

country
```

Do not expose:

```text
admin_* fields

private address data

raw location payload

unapproved precision

identity-linked location history
```

The presence of numeric coordinates does not authorize additional private location data.

---

# 30. Artboard Composition

Use one consolidated state sheet.

Recommended hierarchy:

```text
PRIMARY / LARGE PAIR
SSR-M-list + SSR-M-map
same toolbar and result context

BOUNDARY PAIR
SSR-M-ineligible + SSR-M-partial

FILTERED STATE
SSR-M-filtered
same active query across list/map references

NARROW
SSR-M-narrow
mobile list + mobile map
```

Compact side/bottom panels:

```text
Resultset Model

Toggle Placement

Eligibility Rule

Public Popup Fields

Partial Coverage

Responsive

Anti-Patterns

Traceability
```

Runtime UI must dominate the canvas.

---

# 31. Required Artboard Labels

Show these exact state labels:

```text
SSR-M-list

SSR-M-map

SSR-M-ineligible

SSR-M-partial

SSR-M-filtered

SSR-M-narrow
```

Include these canonical annotations:

```text
Same query · two views

List = all current results

Map = coordinate-capable subset

Toggle near view controls · not inside filter drawer

Filters remain visible in both modes
```

---

# 32. Resultset Model Panel

Include:

```text
R = current filtered Issues

P = Issues with numeric geo.lat + geo.lon

List → R

Map → P

P ⊆ R
```

This is a product model annotation, not implementation code.

---

# 33. Eligibility Panel

Include:

```text
MAP ELIGIBLE
✓ at least one current Issue has numeric lat + lon

MAP INELIGIBLE
✕ zero current Issues have both coordinates
→ Map disabled
→ List remains complete
```

---

# 34. Public Popup Fields Panel

Include:

```text
ALLOWED
✓ label
✓ district
✓ settlement
✓ region
✓ country

NEVER LABEL AS
✕ admin_label
✕ admin_district
✕ admin_settlement
✕ admin_region
✕ admin_country
```

---

# 35. Partial Coverage Panel

Include:

```text
7 Issues in List

3 pin-capable Issues

3 pins on Map

3 of 7 Issues on map
```

Add:

```text
Unmapped Issues remain in List view.
```

---

# 36. Anti-Pattern Panel

Include:

```text
✕ enabled empty map when no pins qualify

✕ map presented as the full resultset when coverage is partial

✕ filters hidden in Map mode

✕ separate query for Map

✕ Issues without coordinates removed from List

✕ admin_* popup labels

✕ provider branding

✕ pin clustering controls

✕ bbox drawing tools

✕ pack.json UI

✕ new HTTP endpoints

✕ Early Signal redesign
```

---

# 37. Traceability

Functional code:

```text
SSR-M
```

Mockup:

```text
M142
```

Host:

```text
/board
```

Primary reference:

```text
M132 — Public Board Home Feed
```

Related optional card presentation:

```text
M141 — Schema Card Overlay
```

Coordinate eligibility fields:

```text
geo.lat

geo.lon
```

Package / story:

```text
TBD — attach upstream identity without renaming SSR-M
```

---

# 38. Out of Scope

M142 must not define:

```text
map provider selection

map SDK integration

new HTTP endpoints

new query parameters

bbox search

draw tools

distance/radius filters

geocoding workflow

coordinate editing

pin clustering algorithm

clustering controls

heatmaps

route planning

pack.json UI

schema pack administration

Early Signal discovery

zero-Issue redesign

private or admin geo fields
```

---

# 39. Implementation Acceptance Intent

When eventually implemented, SSR-M should pass product review if:

```text
/board opens in List mode.

List shows every Issue in the current filtered resultset.

Search and filters remain visible in List and Map modes.

Switching views preserves the same query and filters.

Map becomes eligible only when at least one current Issue has numeric geo.lat and geo.lon.

Map pins represent only eligible current Issues.

Issues without coordinates remain available in List.

Partial map coverage is explicitly explained.

When no Issues are pin-capable, Map is disabled and no enabled empty map appears.

Pin popup uses public geo names without admin_* prefixes.

Mobile stacks controls above one active view.

No provider branding, pack UI, bbox tools, clustering knobs or new endpoints appear.
```

---

# 40. Artboard Validation Checklist

The generated PNG must visibly confirm:

```text
✓ one consolidated state sheet

✓ SSR-M-list

✓ SSR-M-map

✓ SSR-M-ineligible

✓ SSR-M-partial

✓ SSR-M-filtered

✓ SSR-M-narrow

✓ /board public shell continuity

✓ search and filters visible in both main modes

✓ List selected by default

✓ Map selected only in eligible state

✓ Map disabled with honest copy when no pins qualify

✓ list shows complete current resultset

✓ map shows coordinate-capable subset

✓ 3 of 7 Issues on map example is internally consistent

✓ public popup labels

✓ toggle placed near feed controls

✓ mobile list and mobile map stacked

✕ no enabled empty map

✕ no admin_* public labels

✕ no provider branding

✕ no pack/admin/bbox/clustering UI

✕ no Early Signal blocks
```

---

# 41. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
List and Map are two views of the same current query.

List is complete.

Map is conditional and may be partial.

Filters stay visible and unchanged.

No coordinates means no enabled map.

Partial coverage is stated honestly.
```

Canonical final impression:

```text
One Issue resultset.
One reliable complete list.
One optional spatial subset.
No hidden losses and no false geographic completeness.
```

