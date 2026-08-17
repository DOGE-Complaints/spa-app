# File Name

```text
mockup-137-network-pulse-block-state-sheet-spec.md
```

# Mockup 137 Spec — Network Pulse Block — State Sheet

**Functional code:** ESD-P  
**Mockup:** M137  
**Package:** ADMIN-ESD-01 / Early Signal Dashboard — Pre-Cluster Discovery  
**Future story:** ES-02  
**Version:** v1.0  
**Status:** Proposed Active SSOT  
**Area:** Public Board / Early Signal Discovery  
**Host route:** `/board`  
**Priority:** MUST  
**Parent composition:** M136 — Early Signal Discovery Composition  
**Related future artboards:** ESD-E · ESD-C · ESD-I  
**Target folder:** `spa-app/docs/UX/mockups/early-signal-dashboard/`

---

# 1. Purpose

This artboard defines the canonical **Network Pulse** block used inside DOGEstonia Early Signal / Pre-Cluster discovery on the public `/board` route.

The block answers one simple product question:

```text
Is anything happening here?
```

It must do this without creating false precision, false social proof, or a fake analytics layer.

The Network Pulse is therefore not a metrics dashboard.

Its purpose is to communicate **presence of civic activity** at the earliest stage of network formation, while remaining honest about what the product can actually measure and verify.

Canonical product rule:

```text
Signal presence may be communicated before quantitative metrics are available.

Unknown data must never be replaced with invented numbers.
```

---

# 2. Product Context

The Network Pulse is the first conceptual block in the Early Signal discovery composition defined by M136 / ESD-D.

Canonical composition order:

```text
Network Pulse

↓

The Picture Is Forming

↓

Emerging Signals

↓

What's Missing

↓

Help Complete the Picture
```

The Pulse should appear early enough in the page to immediately communicate that the network has begun to receive civic input.

However, it must remain subordinate to the broader discovery composition.

It is not:

```text
a KPI dashboard

an analytics summary

a personal dashboard metric area

a growth dashboard

a social engagement counter
```

The host remains:

```text
/board
```

This artboard does not create a new route.

---

# 3. Screen / Artboard Type

Type:

```text
Focused component state sheet
```

Component concept:

```text
Network Pulse
```

Parent:

```text
M136 — Early Signal Discovery Composition
```

The artboard isolates the Pulse component in order to define:

```text
default no-metrics behavior

future bound-metrics behavior

responsive behavior
```

Only one runtime state is active at a time.

---

# 4. State Matrix

The artboard must contain exactly three required states:

| State | Meaning | Requirement |
|---|---|---|
| `ESD-P-omit` | No approved live metric contract exists | Copy-only / no numbers |
| `ESD-P-bound` | A verified sibling metric contract exists | Show only approved metric slots |
| `ESD-P-narrow` | Narrow/mobile layout | Preserve semantic hierarchy and honesty |

Canonical default:

```text
ESD-P-omit
```

until a separately approved data contract exists.

---

# 5. Core Product Principle

The Network Pulse must answer:

```text
Is anything happening?
```

It must not pretend to answer:

```text
How complete is the network?

How representative is the sample?

What is trending?

What does the majority think?

How close are we to an Issue?
```

These questions require stronger data contracts and/or product logic.

Canonical distinction:

```text
Presence ≠ completeness

Activity ≠ consensus

More signals ≠ confirmed Issue
```

---

# 6. Default Copy Canon

Block title:

```text
Network Pulse
```

Default copy-only body:

```text
Stories are already shaping a collective picture.
```

This copy is the canonical default for the zero-metrics state.

It is intentionally qualitative.

It communicates:

```text
activity exists

Stories are entering the system

the collective picture has begun to form
```

without making a numerical claim.

---

# 7. State A — ESD-P-omit

## Name

```text
Metrics Omitted / Copy-Only Presence
```

## Status

```text
DEFAULT
```

## Trigger

Use this state when:

```text
no sibling-approved aggregate metric contract exists
```

or when:

```text
live metrics are unavailable / intentionally not exposed
```

## Visual Content

Display:

```text
Network Pulse
```

and:

```text
Stories are already shaping a collective picture.
```

Optionally include a small abstract signal-presence visual.

Allowed visual concepts:

```text
soft signal dots

small network nodes

light pulse marks

subtle connected points

quiet activity field

small civic signal waveform
```

The visual is qualitative only.

## Numeric Content

Display:

```text
NO numeric metrics
```

Do not show placeholder numbers.

Do not show:

```text
0

—

N/A

12 Stories

4 Areas

+3 this week
```

unless a number is part of an approved contract.

If no number exists, remove the metric region rather than displaying a fake empty KPI slot.

## Functional Meaning

The user should understand:

```text
The network has started receiving civic input.

Something is happening.

The system is listening.

The picture is not yet complete or confirmed.
```

## Requirements

```text
No fake counts.

No growth arrows.

No percentages.

No completion meter.

No "trending" language.

No unique-person / Voices metric.

No Issue countdown.

No social proof claims.
```

---

# 8. State B — ESD-P-bound

## Name

```text
Bound Metrics — Verified Contract Available
```

## Purpose

Defines how the Pulse may expand if a separately verified sibling contract later provides approved quantitative fields.

This state must remain structurally valid without assuming what those fields will be.

## Critical Rule

Do not invent metric names.

The artboard may show semantic placeholders such as:

```text
Approved metric slot A

Approved metric slot B

Approved metric slot C
```

or neutral visual placeholders such as:

```text
[verified field]

[value]
```

but must not invent domain fields.

Do not label placeholders as:

```text
Stories

Voices

Regions

Active Topics

Momentum

Growth
```

unless those names are explicitly approved by a sibling product/data contract.

## Maximum Density

Recommended:

```text
1–3 approved metric slots
```

The Pulse should not become a four-to-eight-card dashboard strip.

The component must remain compact enough to serve as the first block inside M136.

## Slot Anatomy

When a metric is approved, each slot may contain:

```text
Metric label

Verified value

Optional contextual helper copy
```

Example anatomy only:

```text
[Approved metric name]

[Verified value]

[Optional neutral context]
```

## What Must Not Be Added Automatically

Even after numeric metrics become available, do not automatically introduce:

```text
percentage change

week-over-week growth

trend arrows

rankings

progress meters

targets

"up" / "down" performance framing
```

These require their own explicit product contract.

## Honest-Uncertainty Rule

If a value is unavailable:

```text
omit it
```

or show a neutral unavailable state if the sibling contract explicitly defines one.

Do not substitute:

```text
0
```

unless zero is the actual verified value.

## Requirements

```text
Only sibling-approved fields.

No invented field names.

No invented APIs.

No unique-person / Voices requirement.

No majority / consensus framing.

No completeness percentage.

No Issue-threshold prediction.
```

---

# 9. State C — ESD-P-narrow

## Name

```text
Narrow / Mobile Pulse
```

## Purpose

Defines the responsive presentation of the Network Pulse inside the mobile Early Signal discovery flow.

## Recommended Layout

### Copy-only default

```text
Network Pulse

[small signal visual]

Stories are already shaping a collective picture.
```

Use one compact vertical block.

### Bound metrics

If approved metrics exist:

```text
Network Pulse

[metric A]

[metric B]

[metric C]
```

Preferred behavior:

```text
single column

or compact 2-column wrap only when readable
```

Do not create horizontal scrolling.

## Mobile Requirements

```text
No tiny KPI cards.

No horizontal metric carousel.

No compressed labels.

No truncated metric values.

No decorative chart that dominates the copy.

Minimum readable text size.

Cultural motifs simplify before functional content.
```

---

# 10. Visual Language

Use the same visual system as M136.

```text
deep Night / blue-black background

charcoal civic-tech surface

thin structural borders

white primary typography

muted secondary copy

Signal Orange / DOGEstonia yellow used sparingly

calm system visualization

enterprise public-infrastructure clarity
```

The block should feel:

```text
alive

observational

early

trustworthy

non-promotional
```

Avoid:

```text
startup KPI dashboard

crypto dashboard

social-media counters

growth analytics

neon charts

gamified gauges

large hero numbers
```

---

# 11. Estonian Cultural Layer

The Network Pulse inherits the existing DOGEstonia public-shell textile system.

Allowed:

```text
ETM-FLORAL as a thin section divider

ETM-STRIPE as a small structural edge accent
```

Do not place textile patterns:

```text
inside numeric values

inside metric labels

inside functional icons

inside status indicators

inside data visualizations
```

The cultural layer is non-semantic.

Canonical rule:

```text
Textile motifs identify the place.
Pulse content communicates network activity.
```

---

# 12. Signal-Presence Visualization

The default ESD-P-omit state may contain one abstract visualization to provide visual life without creating fake data.

Allowed:

```text
a small field of independent signal dots

soft node constellation

minimal pulse line

quiet wave of civic activity

a few abstract Story-origin marks
```

The visualization may become slightly denser when shown in richer M136 modes, but density must not be labeled numerically unless backed by real data.

---

# 13. Visualization Semantics

The visualization may communicate:

```text
presence

plurality

activity

early formation
```

It must not communicate:

```text
exact count

exact geographic density

statistical confidence

clustering threshold

representativeness

completion
```

If the visualization could reasonably be interpreted as a precise chart, redesign it to be more abstract.

---

# 14. No Voices Metric

The Early Signal package explicitly excludes mandatory Voices / unique-person metrics.

Therefore M137 must not require:

```text
Unique voices

Participants

People contributing

Number of citizens
```

This remains out of scope unless separately approved.

Do not infer unique people from Story count.

---

# 15. No Completeness Model

Never show:

```text
Picture completeness

Understanding completeness

Coverage %

Signal completeness

Network maturity %
```

Examples explicitly prohibited:

```text
42% complete

67% understood

Picture 80% formed
```

The Pulse communicates activity, not completion.

---

# 16. No Unlock / Threshold Model

Do not show:

```text
Stories until Issue

Signals until cluster

Next Issue progress

Issue readiness

Promotion threshold
```

Examples prohibited:

```text
3 more Stories to unlock Issue

7/10 Stories

Almost an Issue
```

Modes A–E belong to UX density, not hard gates.

---

# 17. No Small-N Certainty Claims

Never use:

```text
Trending

Majority

Consensus

Top concern

Most citizens

Popular issue
```

unless later product/data requirements explicitly define valid statistical conditions.

The Pulse must be especially conservative because it appears during the earliest stages of network formation.

---

# 18. Error / Unavailable Philosophy

M137 does not require a separate error state because the parent M136 route owns load/error behavior.

If the Pulse-specific metric source later fails while the discovery page itself remains available:

```text
fall back to ESD-P-omit
```

when product logic permits.

That means:

```text
Network Pulse

Stories are already shaping a collective picture.
```

may remain valid without quantitative metrics.

Do not show:

```text
Pulse API failed

Metric service unavailable

0 signals
```

as a user-facing fallback unless explicitly required later.

---

# 19. Loading Philosophy

Do not create fake numeric skeleton values.

Allowed loading forms:

```text
quiet text skeleton

small neutral signal visualization skeleton

compact placeholder surface
```

Do not show:

```text
XX Stories

XX Voices

00%

fake chart bars
```

as skeletons.

---

# 20. Relationship to M136 Modes

M137 defines the component contract.

M136 defines how the Pulse participates in the whole discovery composition.

Suggested visual behavior:

```text
Mode A
→ sparse signal presence

Mode B
→ somewhat richer signal field

Mode C
→ more visible activity

Mode D
→ denser qualitative activity field
```

But the runtime Pulse copy may remain identical:

```text
Stories are already shaping a collective picture.
```

The artboard must not label qualitative visual density with exact Story counts.

---

# 21. Relationship to Future Metrics Contract

The `ESD-P-bound` state is intentionally future-safe.

Until another story defines live aggregate fields, M137 does not define:

```text
field names

response schema

API paths

data types

refresh cadence

calculation logic

aggregation source
```

Those remain external dependencies.

The component specification only defines how **approved** metrics should be visually received.

---

# 22. Data Contract Placeholder Rule

If the artboard needs to demonstrate the bound state, use placeholders such as:

```text
Approved metric A

Approved metric B
```

or:

```text
Metric label

Verified value
```

Add annotation:

```text
Populate only from sibling-approved contract.
```

Do not use mock values that look production-real if the fields themselves are not approved.

---

# 23. CTA Rules

The Network Pulse block itself has:

```text
NO required CTA
```

Contribution CTA belongs to:

```text
Help Complete the Picture
```

in M136 / ESD-C.

Do not add:

```text
Submit a story

View details

Invite others

Explore metrics
```

inside the Pulse block unless later explicitly approved.

This protects the Pulse as an observational block rather than an action card.

---

# 24. Interaction Model

Default ESD-P-omit:

```text
non-interactive informational block
```

ESD-P-bound:

```text
non-interactive by default
```

unless a future metric contract explicitly requires drilldown behavior.

Do not make metric slots look clickable without a defined destination.

---

# 25. Accessibility

Requirements:

```text
WCAG AA minimum contrast

Semantic heading: Network Pulse

Equivalent text for visual signal-presence meaning

No information carried by color alone

No meaning dependent solely on animation

Readable at browser zoom

Responsive mobile text

Reduced-motion safe
```

If a decorative signal field is used:

```text
mark as decorative
```

unless it contains unique semantic meaning.

The body copy must carry the core meaning independently.

---

# 26. Motion

If future implementation uses motion, keep it subtle.

Allowed:

```text
slow signal fade-in

soft node appearance

very restrained pulse
```

Not allowed:

```text
radar sweep

continuous flashing

heartbeat animation

particle explosion

growth animation

attention-demanding loop
```

Respect:

```text
prefers-reduced-motion
```

The component must remain understandable when completely static.

---

# 27. Localization

Artboard language:

```text
English
```

Public app locales:

```text
EN

ET

RU
```

Suggested namespace:

```text
earlySignal.pulse.*
```

Possible conceptual keys:

```text
earlySignal.pulse.title

earlySignal.pulse.presence

earlySignal.pulse.metricUnavailable
```

Exact implementation keys remain to be frozen during story intake.

Do not generate three full localized variants on this artboard.

---

# 28. Responsive Behavior

## Desktop

Recommended:

```text
wide compact strip

or shallow card integrated early in discovery composition
```

Copy-only state should use negative space rather than artificial metric slots.

Bound metrics may align horizontally if their labels remain readable.

## Medium

Allow:

```text
metric slots to wrap
```

The block remains compact.

## Mobile

Use:

```text
single-column composition

copy-first hierarchy

small visual

stacked metrics if approved
```

No horizontal scrolling.

---

# 29. Artboard Composition

Recommended state-sheet layout:

```text
LEFT / TOP — PRIMARY

ESD-P-omit
large default reference


RIGHT / TOP

ESD-P-bound
future-contract state


BOTTOM / SIDE

ESD-P-narrow
mobile state
```

Compact side panels:

```text
Honest Data Rules

Metric Contract Boundary

Prohibited Patterns

Responsive Rules

Traceability
```

Runtime UI examples should occupy most of the canvas.

Avoid creating a documentation-heavy appendix.

---

# 30. Required Artboard Labels

Show clearly:

```text
ESD-P-omit

ESD-P-bound

ESD-P-narrow
```

Default badge:

```text
DEFAULT
```

on:

```text
ESD-P-omit
```

Bound-state annotation:

```text
Only when verified sibling metric contract exists.
```

---

# 31. Prohibited Pattern Panel

Include a compact visual rejection list:

```text
✕ 67% understood

✕ 3 Stories until Issue

✕ Trending

✕ Majority concern

✕ 12 Voices

✕ +24% this week

✕ fake chart

✕ invented metric name
```

Canonical rule:

```text
If the system cannot verify a metric, the UI does not pretend it can.
```

---

# 32. Honest Data Panel

Include:

```text
✓ Copy-only state is valid

✓ Numbers are optional

✓ Only approved fields may appear

✓ Missing metrics may be omitted

✓ Pulse ≠ analytics dashboard

✓ Activity ≠ consensus
```

---

# 33. Future Testability Note

The parent discovery root is expected to expose:

```text
data-testid="board-early-signal-discovery"
```

M137 may additionally reserve a conceptual component hook such as:

```text
data-testid="network-pulse"
```

only as a future testability recommendation.

This is not a frontend implementation task in this artboard phase.

---

# 34. Traceability

Functional code:

```text
ESD-P
```

Mockup:

```text
M137
```

Package:

```text
ADMIN-ESD-01
```

Future story:

```text
ES-02
```

Host:

```text
/board
```

Parent:

```text
M136 — Early Signal Discovery Composition
```

Related:

```text
M129 — Public Header Chrome

M131 — Public Footer Chrome

M132 — Public Board Home Feed

M134 — Button System
```

Future package relationships:

```text
ESD-E — Emerging Signals

ESD-C — Coverage trio

ESD-I — Issue continuum
```

---

# 35. Out of Scope

M137 must not define:

```text
new gateway APIs

aggregate response schemas

metric field names

Voices / unique-person metric

personal dashboard metrics

growth analytics

clustering thresholds

Issue promotion thresholds

coverage percentages

Emerging Signal card anatomy

What's Missing behavior

Help Complete CTA

confirmed Issue feed

Offers / Solutions

in-app Story compose
```

---

# 36. Implementation Acceptance Intent

When eventually implemented, the component should pass product review if:

```text
It works with zero quantitative metrics.

The default copy is meaningful by itself.

No metric is invented.

No number is required to make the block look complete.

Approved metrics can later be inserted without redesigning the component.

Mobile remains readable.

No completion, majority, trend, threshold, or unlock claim appears.

The block feels like civic activity awareness, not analytics.
```

---

# 37. Artboard Validation Checklist

The generated state sheet must visibly confirm:

```text
✓ Network Pulse title

✓ Default copy:
  Stories are already shaping a collective picture.

✓ ESD-P-omit shown as default

✓ ESD-P-bound contains neutral approved-field slots only

✓ ESD-P-narrow exists

✓ No required Voices metric

✓ No completeness %

✓ No unlock countdown

✓ No trending / majority / consensus

✓ No fake API fields

✓ No CTA inside Pulse

✓ Cultural motifs remain non-semantic
```

---

# 38. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
Network Pulse answers whether civic activity exists.

It does not claim to know more than the data supports.

The default component works without any numeric API.

Copy-only presence is an intentional product state, not a fallback failure.

If verified metrics become available later, the component can display them.

Only approved fields may appear.

The Pulse never becomes a completeness meter, Issue countdown, trend dashboard, or social-proof counter.
```

Canonical mental model:

```text
Something is happening.

↓

The system can say that honestly.

↓

Quantify only what is verified.
```

Not:

```text
The UI needs numbers to look alive.

↓

Invent numbers.
```

The final visual should feel calm, observant and trustworthy: a small civic heartbeat that proves the network has begun without pretending to know the final shape of what is emerging.
