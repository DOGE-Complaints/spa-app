# File Name

```text
mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md
```

# Mockup 141 Spec — Schema Card Overlay: Issue Card + Detail — State Sheet

**Functional code:** SSR-C  
**Mockup:** M141  
**Version:** v1.0  
**Status:** Proposed Active SSOT  
**Area:** Public Issue surfaces / Schema Runtime  
**Host surfaces:** M132 Public Board Issue Card · existing civic Issue Detail  
**Package / story:** TBD — preserve upstream tracking identity when supplied  
**Priority:** MUST  

---

# 1. Purpose

This specification defines how optional named fields from:

```text
issue.schema_card
```

appear on top of the existing DOGEstonia civic Issue presentation.

The schema overlay is not a new Issue type and not a replacement for the civic Issue model.

Canonical relationship:

```text
Civic Issue identity
+
Optional schema_card details
```

The civic layer remains primary:

```text
title
summary
type
labels
status
dates
```

The schema overlay appears only as a distinct secondary sub-block when `schema_card` contains one or more renderable leaves.

Canonical rule:

```text
No schema_card → no overlay chrome.

Non-empty schema_card → Additional details sub-block.
```

---

# 2. Product Context

DOGEstonia nodes may use different schemas while preserving a shared civic Issue experience.

The shared civic layer gives every Issue a stable public identity. A schema pack may additionally declare selected fields that are useful on cards and detail pages. The gateway exposes those selected values through `issue.schema_card`.

SSR-C visualizes that optional schema-specific layer without exposing the underlying structured payload or allowing schema fields to overtake the civic Issue.

The same Issue must remain recognizable across:

```text
Board / list card

↓

Issue detail
```

The overlay changes density between surfaces, but not meaning.

---

# 3. Screen / Artboard Type

Type:

```text
Cross-surface component state sheet
```

Required states:

```text
SSR-C-civic

SSR-C-overlay-compact

SSR-C-overlay-detail

SSR-C-many

SSR-C-narrow
```

The consolidated artboard must show desktop and narrow/mobile expectations.

This is a visual/product specification only.

It must not define implementation code.

---

# 4. State Matrix

| State | Product meaning | Required visual evidence |
|---|---|---|
| `SSR-C-civic` | `schema_card` is absent or empty | Civic list card and civic detail remain unchanged; no empty overlay title, container or placeholder |
| `SSR-C-overlay-compact` | List card has non-empty `schema_card` | Compact `Additional details` sub-block below civic fields |
| `SSR-C-overlay-detail` | Detail page for the same Issue | Fuller overlay density with the same keys and values |
| `SSR-C-many` | Overlay contains more leaves than the compact surface can comfortably show | Honest row limit, wrapping/clamping and optional progressive disclosure |
| `SSR-C-narrow` | Narrow/mobile viewport | Civic-first card and detail stack; overlay remains secondary and readable |

---

# 5. Core Product Model

SSR-C adds a schema-specific presentation layer to an existing civic object.

```text
Issue
├─ Civic identity — universal and primary
└─ schema_card — optional and secondary
```

The overlay must never imply:

```text
schema_card = complete Issue

schema_card = raw submitted data

schema_card = a separate Issue

schema_card = higher-priority civic truth
```

Canonical mental model:

```text
This is the same civic Issue,
with a few additional schema-specific details.
```

---

# 6. Data Boundary

The overlay may display only flat leaf entries present in:

```text
issue.schema_card
```

Each rendered row has:

```text
dotted-path key

human-readable label

display value
```

The artboard must use only these illustrative example paths:

```text
signals.desired_outcome

signals.affected_group

signals.service_object
```

Do not invent additional schema field names for visual fullness.

For a many-leaves example, represent undisclosed additional rows through a neutral continuation affordance rather than fabricated keys.

Allowed example production label ids:

```text
schemaRuntime.cardField.signals.desired_outcome

schemaRuntime.cardField.signals.affected_group

schemaRuntime.cardField.signals.service_object
```

Canonical mapping:

```text
same dotted path

↓

schemaRuntime.cardField.<path>
```

---

# 7. Explicitly Forbidden Data

The overlay must not show:

```text
structured_payload

raw JSON

serialized objects or arrays

bind fields

hash fields

internal schema metadata

pack administration fields

street-level geolocation not present in the approved allowlist
```

The artboard must not visually suggest a developer inspector, JSON viewer or admin schema editor.

---

# 8. Civic Base Regression Lock

The existing civic Issue chrome remains unchanged.

The list card continues to prioritize:

```text
Issue ID where already present

status

title

summary

type

labels

location/date metadata where already allowed

Open issue →
```

The detail page continues to prioritize its existing civic title, narrative, status and metadata.

The overlay must not:

```text
move schema fields above the title

replace the summary

replace type or labels

change Issue status semantics

remove civic dates

change existing card routing

redesign the public shell
```

Canonical hierarchy:

```text
1. Civic Issue identity

2. Additional details

3. Existing card/detail actions
```

---

# 9. Shared Overlay Anatomy

When non-empty, the overlay is a visually distinct sub-block titled:

```text
Additional details
```

Equivalent localized copy may be used in production.

Required anatomy:

```text
section title

divider or restrained surface separation

ordered field rows

human-readable label

field value

dotted-path annotation on the specification artboard
```

The dotted-path annotation is developer-facing artboard information. It does not need to appear as visible public UI in production.

The sub-block must feel:

```text
secondary

structured

quiet

readable

schema-aware
```

It must not feel like:

```text
a second card nested inside the Issue

an admin inspector

a technical payload dump

a competing metadata header
```

---

# 10. Field Label Model

The mockup shows human-readable labels:

| Dotted path | Human-readable example | Production label id |
|---|---|---|
| `signals.desired_outcome` | Desired outcome | `schemaRuntime.cardField.signals.desired_outcome` |
| `signals.affected_group` | Affected group | `schemaRuntime.cardField.signals.affected_group` |
| `signals.service_object` | Service object | `schemaRuntime.cardField.signals.service_object` |

Human-readable labels must not be derived on the artboard through arbitrary capitalization of unknown keys.

Canonical rule:

```text
Visible label = localized product copy

Traceability id = schemaRuntime.cardField.<path>
```

If a production translation is unavailable, fallback behavior belongs to the runtime contract and is outside this artboard unless separately specified.

---

# 11. Value Presentation

Values must be presented as user-facing content, not code.

Allowed visual examples:

```text
Desired outcome
More frequent waste collection in public areas

Affected group
Residents and people using the square

Service object
Public waste bins
```

These are illustrative values only. They do not define a schema vocabulary or production data contract.

Value rules:

```text
preserve meaningful text

allow honest wrapping

do not expose quote marks or JSON syntax

do not fabricate missing values

do not show empty-value rows
```

---

# 12. State A — SSR-C-civic

## Name

```text
Civic-only regression baseline
```

## Trigger

```text
issue.schema_card is absent

OR

issue.schema_card contains no renderable leaves
```

## Purpose

Prove that schema support does not alter Issues that do not use card fields.

## Required Composition

Show both:

```text
civic list card

civic Issue detail
```

Both retain their existing appearance.

Do not show:

```text
Additional details

empty overlay panel

No additional details

schema placeholder

reserved blank space
```

## Requirements

```text
✓ civic title remains primary

✓ summary/type/labels/status/dates remain visible according to existing surface rules

✓ card action remains recognizable

✓ detail remains civic-only

✕ no empty overlay chrome
```

---

# 13. State B — SSR-C-overlay-compact

## Name

```text
List card with compact schema overlay
```

## Trigger

```text
issue.schema_card contains one or more renderable leaves
```

## Purpose

Expose useful schema-specific context without changing the primary identity or scannability of the civic card.

## Position

```text
Civic fields

↓

Additional details

↓

Existing card action / footer
```

## Compact Density

Recommended card treatment:

```text
tight label/value rows

up to 3 visible rows in the reference state

one-line label

value may wrap when short and meaningful

long values clamp honestly
```

The three example rows are:

```text
Desired outcome
signals.desired_outcome

Affected group
signals.affected_group

Service object
signals.service_object
```

## Visual Hierarchy

The overlay title and labels use secondary emphasis.

Values may use primary or near-primary text but must remain visually quieter than the Issue title and summary.

## Requirements

```text
✓ distinct Additional details sub-block

✓ compact rows

✓ all visible rows correspond to schema_card leaves

✓ developer annotation exposes dotted-path identity

✓ existing Open issue → remains clear

✕ overlay does not become the card headline
```

---

# 14. State C — SSR-C-overlay-detail

## Name

```text
Issue detail with fuller schema overlay
```

## Purpose

Show the same Issue and the same schema field meanings at a more readable detail-page density.

## Continuity Rule

The artboard must make clear that compact card and detail page represent the same Issue.

Use matching civic title, status and illustrative schema values across both states.

Canonical rule:

```text
Same Issue.
Same schema_card leaves.
Different presentation density.
```

## Position

Place the overlay below the primary civic Issue content and before any lower-priority supporting or system sections, according to the existing detail hierarchy.

Do not move it above the Issue title or civic summary.

## Detail Density

Detail presentation allows:

```text
more vertical spacing

longer value wrapping

clearer label/value separation

more visible rows before progressive disclosure
```

The detail state must not simply scale up the compact card.

It should use the existing Issue detail content width and rhythm.

## Requirements

```text
✓ civic detail remains primary

✓ Additional details is visibly subordinate

✓ same dotted paths and values as compact state

✓ values have honest vertical space

✓ no raw payload view
```

---

# 15. State D — SSR-C-many

## Name

```text
Many overlay leaves
```

## Purpose

Define a readable overflow pattern when `schema_card` contains more renderable leaves than the current surface should display at once.

## Compact Card Rule

The compact card should preserve scanning density.

Recommended reference behavior:

```text
show up to 3 rows

clamp unusually long values

indicate that additional fields exist

keep Open issue → available
```

Optional continuation affordance:

```text
Show more details
```

On the list card, this affordance may route to the existing Issue detail rather than expand the card in place.

The artboard must label this as an optional UX choice, not a new route requirement.

## Detail Page Rule

The detail page may show more rows and permit longer wrapping.

For exceptionally long overlays, a progressive disclosure control may be used:

```text
Show all details

Show fewer details
```

Do not fabricate hidden field names on the artboard. Represent additional rows through continuation treatment only.

## Truncation Rule

Truncation must be visually honest:

```text
ellipsis for clamped text

visible continuation affordance when content is withheld

no silent disappearance of rows
```

## Requirements

```text
✓ civic hierarchy survives large schema_card payloads

✓ row and value overflow are visibly intentional

✓ additional content is not silently lost

✓ no invented example keys

✕ no endlessly growing list card

✕ no nested scroll area inside a card
```

---

# 16. State E — SSR-C-narrow

## Name

```text
Mobile / narrow overlay stack
```

## Purpose

Preserve civic-first hierarchy and readable schema details at narrow widths.

## Required Narrow Examples

Show both:

```text
compact list card

Issue detail overlay stack
```

## Mobile Content Order

```text
Civic identity

↓

Civic summary and metadata

↓

Additional details

↓

Existing action
```

## Row Layout

At narrow width:

```text
label above value is preferred

dotted-path annotation moves outside production UI into artboard callout

values wrap naturally

controls use full-width or safely tappable treatment
```

Do not compress label and value into an unreadable two-column table.

## Requirements

```text
✓ title and summary remain first

✓ overlay becomes a vertical stack

✓ no horizontal scrolling

✓ no clipped dotted paths in public UI

✓ card action remains reachable

✓ detail overlay remains secondary
```

---

# 17. Empty and Missing Values

Overlay visibility is based on renderable leaves.

If the object is absent, empty or contains no presentable values:

```text
omit the entire overlay
```

Do not render empty rows for:

```text
null

missing

empty string

non-presentable internal values
```

Do not show public fallback copy such as:

```text
Not available

No schema data

No additional details
```

unless a later product requirement explicitly introduces it.

---

# 18. Compact vs Detail Comparison

The artboard must include a compact comparison panel.

| Property | List card | Issue detail |
|---|---|---|
| Civic identity | Primary | Primary |
| Overlay position | Below civic card fields | Below primary civic detail content |
| Section title | `Additional details` | `Additional details` |
| Row spacing | Tight | Relaxed |
| Visible rows | Bounded for scanability | Fuller set |
| Long values | Honest clamp/wrap | More generous wrapping |
| Progressive disclosure | Optional; may route to detail | Optional for exceptional length |
| Dotted paths | Artboard annotations only | Artboard annotations only |

---

# 19. Interaction Model

## Civic List Card

Existing Issue-card routing remains authoritative.

The overlay does not create a second competing card destination.

## Overlay Rows

Rows are read-only by default.

Do not imply editing, voting, filtering or schema inspection.

## Progressive Disclosure

If shown, the affordance must have a clear accessible label and predictable result.

On the list card, preferred behavior is continuation to the existing Issue detail surface.

On the detail page, local expand/collapse is permitted as an optional pattern.

No new route is introduced by this specification.

---

# 20. Visual Language

Reuse the established DOGEstonia public Issue language from M132 and the existing civic Issue detail:

```text
deep Night / blue-black surfaces

charcoal panels

thin restrained borders

white primary type

muted secondary type

Signal Orange / DOGEstonia yellow used sparingly

green/red only for existing semantic states
```

The overlay should use:

```text
subtle section separation

small secondary heading

consistent label/value rhythm

no stronger accent than the civic Issue status or primary action
```

The overlay must not resemble:

```text
a bright promotional banner

a neon crypto panel

a form

a code block

an admin table
```

---

# 21. Estonian Cultural Layer

Reuse the existing public-shell cultural canon where already present.

Allowed:

```text
ETM-FLORAL shell separators

ETM-STRIPE framing accents

existing non-semantic Issue-card motif
```

Do not use cultural motifs to encode:

```text
schema presence

field type

field importance

validation

overlay expansion
```

Canonical rule:

```text
Cultural layer identifies place.
Functional layer identifies state.
```

---

# 22. Responsive Behaviour

## Desktop

```text
Civic content remains visually dominant.

Overlay uses the existing card/detail width.

Compact labels and values align consistently.

Detail rows receive more vertical space.
```

## Medium Width

```text
Preserve the same order.

Allow values to wrap before reducing legibility.

Avoid a narrow fixed label column.
```

## Narrow / Mobile

```text
Stack label above value.

Keep overlay below civic content.

Use no horizontal scroll.

Keep actions tappable and visible.
```

---

# 23. Accessibility

The overlay must preserve semantic reading order:

```text
Issue heading

Issue civic content

Additional details heading

field label

field value

existing action
```

Requirements:

```text
section title is programmatically distinguishable from rows

label/value association is clear

color is not the only indicator of separation

clamped content has a discoverable continuation path

focus order follows visual order

expand/collapse control, if present, exposes its state

touch targets remain usable on narrow screens
```

Do not expose dotted-path ids as noisy duplicate speech in the public accessibility tree unless the product explicitly requires technical labels.

---

# 24. Localization

Localize:

```text
Additional details

human-readable field labels

Show more details

Show all details

Show fewer details
```

Field-label identity remains traceable through:

```text
schemaRuntime.cardField.<path>
```

Localization must tolerate longer labels and values.

The mobile stack is the safe fallback when translated labels no longer fit a compact horizontal row.

---

# 25. Motion

No motion is required for overlay appearance.

If progressive disclosure is shown:

```text
use restrained expand/collapse motion

preserve reading position

respect reduced-motion preferences
```

Do not animate schema fields as newly unlocked, promoted or discovered.

---

# 26. Privacy and Safety

The overlay must display only the already-approved `schema_card` leaves.

Do not infer, enrich or expose additional information from:

```text
structured_payload

raw Story content

identity data

precise location

internal bindings
```

The artboard must visibly reinforce:

```text
Allowlisted display layer, not raw payload.
```

---

# 27. Relationship to Existing Surfaces

## M132 Public Board Home Feed

M132 remains authoritative for:

```text
public board shell

Issue feed hierarchy

card identity

search and filters

card routing

loading / empty / error board states
```

M141 becomes authoritative only for:

```text
optional schema_card presentation on Issue cards and Issue detail
```

## Existing Civic Issue Detail

The current civic detail layout remains the regression baseline.

M141 adds a secondary `Additional details` section without redesigning the page.

## M136–M140 Early Signal Discovery

These surfaces are out of scope for M141.

Do not include:

```text
Network Pulse

The Picture Is Forming

Emerging Signals

What’s Missing

Help Complete the Picture
```

---

# 28. Artboard Composition

Use one consolidated state sheet.

Recommended hierarchy:

```text
PRIMARY / LARGE
SSR-C-overlay-compact + SSR-C-overlay-detail
same Issue shown across list and detail

REGRESSION BASELINE
SSR-C-civic
civic-only card + civic-only detail

BOUNDARY STATE
SSR-C-many
compact overflow + detail progressive disclosure

NARROW
SSR-C-narrow
mobile card + detail overlay stack
```

Compact side/bottom panels:

```text
State Matrix

Civic Base Lock

Field Mapping

Compact vs Detail

Data Boundary

Responsive Behaviour

Anti-Patterns

Traceability
```

Runtime UI examples must dominate the canvas.

The annotation panels support implementation understanding; they must not overwhelm the state comparison.

---

# 29. Required Artboard Labels

The state sheet must visibly label:

```text
SSR-C-civic

SSR-C-overlay-compact

SSR-C-overlay-detail

SSR-C-many

SSR-C-narrow
```

Include these canonical annotations:

```text
Civic base unchanged

Overlay appears only when schema_card is non-empty

Same Issue · same fields · different density

Allowlisted schema_card leaves only

No raw structured_payload
```

---

# 30. Field Mapping Panel

The artboard must include this exact conceptual mapping:

```text
signals.desired_outcome
→ Desired outcome
→ schemaRuntime.cardField.signals.desired_outcome

signals.affected_group
→ Affected group
→ schemaRuntime.cardField.signals.affected_group

signals.service_object
→ Service object
→ schemaRuntime.cardField.signals.service_object
```

Do not add illustrative paths beyond these three.

---

# 31. Civic Base Lock Panel

Include:

```text
✓ title / summary remain primary

✓ type / labels remain civic metadata

✓ status / dates remain unchanged

✓ existing card and detail routing remain

✓ no overlay chrome when schema_card is empty
```

---

# 32. Data Boundary Panel

Include:

```text
SHOW
✓ flat dotted-path leaves from issue.schema_card
✓ localized human-readable labels
✓ presentable values

NEVER SHOW
✕ structured_payload
✕ raw JSON
✕ bind/hash fields
✕ unallowlisted street-level geo
✕ empty or missing rows
```

---

# 33. Anti-Pattern Panel

Include:

```text
✕ schema fields above civic title

✕ overlay replacing summary/type/labels

✕ empty Additional details block

✕ raw JSON or developer inspector

✕ invented schema field names

✕ nested scrolling card

✕ endlessly expanding list card

✕ form controls or pack administration

✕ Early Signal / Emerging Signal blocks

✕ new routes or invented APIs
```

---

# 34. Traceability

Functional code:

```text
SSR-C
```

Mockup:

```text
M141
```

Primary reference:

```text
M132 — Public Board Home Feed
```

Host data surface:

```text
issue.schema_card
```

Production field-label namespace:

```text
schemaRuntime.cardField.<path>
```

Package / story:

```text
TBD — attach upstream identity without renaming SSR-C
```

---

# 35. Out of Scope

M141 must not define:

```text
schema pack creation

pack administration

form builder

schema registry UI

card_fields authoring

gateway parsing logic

structured_payload storage

database schema

clustering behavior

new Issue fields

new Issue routes

new APIs

Early Signal discovery

Emerging Signals

Offers / Solutions

editing schema_card values

filtering by schema_card values
```

---

# 36. Implementation Acceptance Intent

When eventually implemented, SSR-C should pass product review if:

```text
An Issue without schema_card renders exactly as the civic regression baseline.

No empty overlay title or spacing appears when schema_card is absent or empty.

A non-empty schema_card appears below civic fields on the list card.

The same Issue shows a fuller overlay on the detail page.

Only schema_card leaves are displayed.

Human-readable labels remain traceable to the exact dotted paths.

Compact and detail density are visibly different.

Many leaves do not make the list card unbounded.

Hidden or clamped content has an honest continuation path.

Mobile preserves civic-first hierarchy without horizontal scrolling.

No structured_payload, raw JSON, bind/hash data or unallowlisted precise geo appears.

No Early Signal, form-builder or pack-admin UI appears.
```

---

# 37. Artboard Validation Checklist

The generated PNG must visibly confirm:

```text
✓ one consolidated state sheet

✓ SSR-C-civic

✓ civic-only list card and civic-only detail

✓ no empty overlay chrome

✓ SSR-C-overlay-compact

✓ SSR-C-overlay-detail

✓ same Issue across compact and detail states

✓ Additional details section title

✓ three approved dotted-path examples

✓ production label-id mapping

✓ SSR-C-many

✓ honest wrapping / truncation / continuation

✓ SSR-C-narrow

✓ mobile card and detail stack

✓ civic base visibly primary

✓ M132-compatible Issue card language

✕ no structured_payload

✕ no raw JSON

✕ no invented field names

✕ no empty schema placeholder

✕ no Early Signal / Emerging content

✕ no form builder or pack admin
```

---

# 38. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
The civic Issue is still the main object.

schema_card adds optional named details below it.

No schema_card means no visual change.

The list card is compact.

The detail page is fuller.

Only approved leaves are shown.

Large overlays remain readable without turning the card into a payload viewer.
```

Canonical final impression:

```text
One civic Issue.
Optional schema-specific context.
Clear boundaries.
No leakage of internal structure.
```

