# Mockup 136 Spec — Early Signal Discovery Composition — State Sheet

**Functional code:** ESD-D
**Mockup:** M136
**Package:** ADMIN-ESD-01 / Early Signal Dashboard — Pre-Cluster Discovery
**Future story:** ES-01
**Version:** v1.0
**Status:** Proposed Active SSOT
**Area:** Public Board / Early Signal Discovery
**Route:** `/board`
**Priority:** MUST
**Parent surface:** M132 — Public Board Home Feed
**Public chrome:** M129 Header + M131 Footer
**Related future artboards:** ESD-P · ESD-E · ESD-C · ESD-I
**Target folder:** `spa-app/docs/UX/mockups/early-signal-dashboard/`

---

# 1. Purpose

This artboard defines the canonical DOGEstonia public-board experience when the network contains:

```text
zero confirmed Issues
```

but civic Stories already exist or the discovery process has begun.

The design replaces the psychological model:

```text
No Issues

↓

Nothing is happening
```

with:

```text
No confirmed Issues yet

↓

Signals are being collected

↓

A collective picture is beginning to form
```

The experience must communicate that early civic information already has value before clustering produces a confirmed Issue.

The user should see a living discovery surface rather than a dead empty placeholder.

---

# 2. Product Context

The host remains:

```text
/board
```

This is not a new route.

This is not:

```text
/dashboard

a personal cabinet

an analytics page

a marketing homepage

a separate Early Signal application
```

The Early Signal discovery composition occupies the same public board content region that otherwise contains the confirmed Issue feed.

The surrounding application shell remains unchanged:

```text
M129 Public Header

↓

/board content

↓

M131 Public Footer
```

When no confirmed Issues exist, the board content area renders the ESD-D discovery composition instead of the current generic empty state.

The source document explicitly identifies the current empty path as insufficient for Early Signal discovery and locks `/board` as the host surface. 

---

# 3. Core Product Shift

## Legacy zero-Issue mental model

```text
Public Board

↓

No Issues Yet
```

This is technically correct but product-incomplete.

It communicates absence.

---

## ESD-D mental model

```text
Public Board

↓

Network Pulse

↓

Picture formation

↓

Provisional patterns

↓

Coverage gaps

↓

Invitation to contribute
```

This communicates activity without pretending certainty.

Canonical principle:

```text
Absence of confirmed Issues does not mean absence of civic information.
```

---

# 4. Screen Type

Type:

```text
Route-level progressive discovery state sheet
```

Route:

```text
/board
```

The artboard documents six runtime/density states:

```text
ESD-D-load

ESD-D-A

ESD-D-B

ESD-D-C

ESD-D-D

ESD-D-err
```

Only one runtime composition is active at a time.

The sheet exists to explain how the same board surface becomes progressively richer as more early civic material becomes available.

---

# 5. Critical Terminology Model

Three concepts must remain visually and semantically distinct:

```text
Story

Emerging Signal

Issue
```

## Story

A citizen-submitted source contribution.

It is input.

---

## Emerging Signal

A provisional Level-2 pattern inferred from available Stories.

It may strengthen, weaken or disappear.

It is not yet a confirmed civic Issue.

Canonical labels:

```text
Emerging signal

Provisional — may change
```

---

## Issue

A confirmed Level-3 clustered civic object.

Issues are outside the zero-Issue ESD-D runtime states.

They appear in the later continuum defined by:

```text
ESD-I
```

Canonical rule:

```text
Story ≠ Emerging Signal ≠ Issue
```

Also:

```text
Topic ≠ Issue
```

No visual styling in M136 may blur these distinctions.

---

# 6. Density Modes — Important Interpretation

Modes A–D are:

```text
UX density modes
```

They are not clustering thresholds.

They must not be represented as:

```text
Story count milestones

progress levels

unlock stages

gamification levels
```

The source maps them conceptually as:

```text
A — First Signal

B — Diverse Early Voices

C — Patterns Beginning

D — Collective Picture Emerging
```

without permitting Story counts to become UI gates. 

Therefore the artboard may use:

```text
Mode A

Mode B

Mode C

Mode D
```

as design-state labels outside the runtime UI.

The production UI should not present users with:

```text
Mode A

Level 2

Stage 3

7/10 Stories

3 Stories remaining
```

unless a later product requirement explicitly introduces such language.

---

# 7. Five Conceptual Blocks

Every discovery composition is built from five conceptual functions:

```text
1. Network Pulse

2. The Picture Is Forming

3. Emerging Signals

4. What's Missing

5. Help Complete the Picture
```

These are not five unrelated dashboard cards.

They form one narrative sequence:

```text
Something is happening

↓

We are beginning to see structure

↓

Some provisional patterns may be emerging

↓

Some parts of the picture remain under-heard

↓

You can add another civic perspective
```

The five blocks must remain distinguishable while reading as one coherent surface. 

---

# 8. Stable Page Anatomy

Across Modes A–D:

```text
M129 Public Header

↓

Compact Public Board heading / discovery framing

↓

Network Pulse

↓

The Picture Is Forming

↓

Emerging Signals

↓

What's Missing

↓

Help Complete the Picture

↓

M131 Public Footer
```

Responsive layouts may reorder or combine visual placement, but not conceptual meaning.

---

# 9. Relationship to Existing M132 Board

M132 remains the confirmed-Issue board/feed canon.

M136 changes only the zero-confirmed-Issue content region.

## Reuse from M132

```text
Public application shell

Header/footer

/board route identity

overall dark civic-tech visual system

board-level spacing language

responsive principles

load/error operational tone
```

## Replaced in zero-Issue context

The simple:

```text
No Issues Yet
```

empty state becomes the richer Early Signal discovery composition.

## Not replaced

When confirmed Issues exist, M132/ESD-I governs the Issue feed.

M136 must not render fake Issue cards simply to make the zero-Issue board look populated.

---

# 10. Visual Language

Use the current DOGEstonia public-shell canon.

```text
deep Night / blue-black background

charcoal dark surfaces

thin structural borders

high-contrast white typography

muted secondary copy

Signal Orange / DOGEstonia yellow used sparingly

enterprise civic-tech clarity

high information integrity

calm systems thinking
```

Design character:

```text
founding network

observational

intelligent

alive but incomplete

quietly significant
```

Avoid:

```text
marketing hero

startup growth dashboard

social-media feed

gamification

celebratory onboarding

crowdfunding language

bright analytics tiles

neon

crypto styling

confetti

leaderboards
```

---

# 11. Estonian Cultural Layer

Inherit the public-shell textile canon already established for M129–M133.

## ETM-FLORAL

Allowed as:

```text
thin shell/header separator

footer separator

restrained section divider
```

## ETM-STRIPE

Allowed as:

```text
narrow shell rail

small structural accent
```

Do not use textile motifs to communicate:

```text
signal strength

completeness

status

coverage

error

priority
```

Canonical rule:

```text
Textile motifs identify the place.
Product controls communicate the state.
```

The Early Signal visualization itself should remain abstract and civic-tech, not folkloric.

---

# 12. Board Introduction

The board heading must remain compact.

Recommended title:

```text
Public Board
```

The discovery composition may add a quiet contextual label such as:

```text
Early signals
```

or equivalent only if later copy review approves it.

Do not invent a marketing headline.

Do not use:

```text
The future is taking shape

Your voice changes Estonia

Join the movement
```

The page must remain operational and informational.

---

# 13. Block 1 — Network Pulse

## Purpose

Answer the simplest first question:

```text
Is anything happening here?
```

without fabricating precision.

Default canonical copy:

```text
Network Pulse
```

Body:

```text
Stories are already shaping a collective picture.
```

This exact copy is provided as the default copy-only placeholder in the source. 

---

## Default M136 Rule

Until a separately verified sibling data contract exists:

```text
NO NUMERIC METRICS
```

Do not show:

```text
12 Stories

7 Contributors

4 Areas

63% Complete

+24% this week
```

unless those exact fields become approved through ESD-P.

The Network Pulse block must work perfectly with copy alone.

---

## Visual Treatment

Use an abstract but restrained signal-presence visualization.

Allowed concepts:

```text
small nodes

soft dots

signal lines

subtle pulse marks

light density field

small waveform-like civic activity indicator
```

It must not imply numerical accuracy.

Avoid:

```text
charts with unlabeled fake data

percentage circles

progress bars

trend arrows

growth charts
```

---

# 14. Block 2 — The Picture Is Forming

## Purpose

Communicate that separate Stories are beginning to contribute to a shared view.

Title:

```text
The Picture Is Forming
```

This block should answer:

```text
What does the network know so far?
```

without claiming a confirmed conclusion.

---

## Visual Model

Use an abstract field where individual Story signals begin to acquire relationships.

Possible visual language:

```text
separate points

light spatial groupings

soft connection hints

overlap areas

topic/location fragments
```

The visual must remain explicitly incomplete.

Avoid:

```text
100% completeness

progress meters

finished map

confirmed cluster labels

majority claims
```

---

# 15. Block 3 — Emerging Signals

## Purpose

Show provisional Level-2 patterns when evidence supports displaying them.

Title:

```text
Emerging Signals
```

Canonical provisional labels:

```text
Emerging signal

Provisional — may change
```

---

## Visual Difference from Issue Cards

Emerging Signal surfaces must not reuse the full confirmed-Issue visual treatment.

They should appear:

```text
lighter

more provisional

less bordered

less authoritative

less metadata-heavy
```

than M132 Issue feed items.

Possible presentation:

```text
soft signal capsules

outlined provisional cards

pattern summaries

faint connected groups
```

Do not include Issue-specific chrome such as:

```text
Issue ID

confirmed Issue status

Open issue →

Under review

Verified Issue
```

---

# 16. Emerging Signal Empty Behavior

Emerging Signals are not mandatory in all early states.

Especially in Mode B:

```text
Emerging Signals may be absent
```

The UI must not manufacture a pattern simply to avoid visual emptiness.

If absent, allowed behavior:

```text
omit the section body

show a very quiet honest absence

or visually reserve no large empty container
```

Do not show:

```text
No signals found!
```

as a failure.

The absence simply means the system is still listening.

---

# 17. Block 4 — What's Missing

## Purpose

Communicate that the collective picture remains incomplete.

Title:

```text
What's Missing
```

This is a coverage function.

It may communicate abstract under-heard dimensions such as:

```text
areas

topics

languages

types of experience
```

without exposing personal contacts or identifying people.

---

## Tone

Use:

```text
Some parts of the picture are still lightly represented.

More perspectives may help clarify what is forming.
```

as directional content principles, not necessarily final locked copy.

Do not say:

```text
We need 3 more people.

Only 2 Russian speakers responded.

Invite these residents.

You are 72% complete.
```

---

## Privacy Rule

Only aggregated or anonymized framing is allowed.

Never show:

```text
names

phone numbers

emails

specific underrepresented users

personal targeting suggestions
```

---

# 18. Block 5 — Help Complete the Picture

## Purpose

Provide the participation action after showing what is forming and what remains unclear.

Title:

```text
Help Complete the Picture
```

The CTA must use the existing DOGEstonia story-entry model.

Canonical CTA:

```text
Submit a story
```

Optional alternative language provided by the source:

```text
Tell another story
```

For M136, prefer:

```text
Submit a story
```

to remain consistent with current public chrome.

---

## Destination

External DOGEstonia GPT handoff.

Configuration pattern:

```text
VITE_STORY_GPT_URL
```

This is not:

```text
an in-app compose page

a local story form

a new Early Signal input modal
```

Add restrained external-handoff affordance according to M134 Button System.

---

# 19. Participation Tone

The Help block must communicate:

```text
civic contribution
```

not:

```text
referral mechanics

growth hacking

unlock progression

competition
```

Avoid:

```text
Bring friends

Unlock the first Issue

Help us reach 10 Stories

Earn reputation

Complete the level

3 more Stories needed
```

The action exists because another real perspective can improve the collective picture.

---

# State 0 — ESD-D-load

## Title

Artboard label:

```text
Loading
```

Functional code:

```text
ESD-D-load
```

## Purpose

The board is checking the confirmed-Issue/discovery state.

---

## Composition

Keep:

```text
M129 Header

Public Board shell

stable discovery-region geometry

M131 Footer
```

Use quiet skeleton structures where necessary.

Do not populate:

```text
Pulse numbers

fake Emerging Signals

fake Missing categories
```

---

## Network Pulse During Loading

Either:

```text
skeleton placeholder
```

or:

```text
quiet loading surface
```

Never display invented numbers as loading placeholders.

---

## Requirements

```text
No full-page spinner.

No fake metrics.

No fake patterns.

No layout shift into the loaded composition.

Public shell remains stable.

No current generic "No Issues Yet" message during loading.
```

---

# State A — ESD-D-A / First Signal

## User Meaning

```text
The network has begun.
```

This is the sparsest valid discovery composition.

It must feel:

```text
significant

early

quiet

alive
```

not empty.

---

## Network Pulse

Use copy-only:

```text
Network Pulse

Stories are already shaping a collective picture.
```

Visual:

```text
one or a very small number of abstract signal marks
```

Do not display the number of Stories.

---

## The Picture Is Forming

Show a sparse field.

Signals remain mostly independent.

The key message is:

```text
Something has entered the shared civic space.
```

Do not imply clustering.

---

## Emerging Signals

May be omitted entirely.

No provisional pattern should appear without enough conceptual basis.

---

## What's Missing

Dominant relative to later modes.

Communicate broad incompleteness without quantifying it.

Possible abstract framing:

```text
More perspectives can help reveal what connects.
```

---

## Help Complete the Picture

Visible and meaningful.

CTA:

```text
Submit a story ↗
```

The block should feel like participation infrastructure, not growth marketing.

---

# State B — ESD-D-B / Diverse Early Voices

## User Meaning

```text
Different experiences are entering the network.
The system is listening.
```

---

## Network Pulse

Still preferably copy-only.

Do not introduce counts merely because the composition is visually denser.

---

## The Picture Is Forming

Show several separated signals.

The important visual property:

```text
diversity without forced convergence
```

Signals may differ by:

```text
topic-like color-neutral grouping

location-like positioning

language-like abstract marks
```

but these dimensions must not imply actual backend fields unless verified.

---

## Emerging Signals

May still be absent.

If absent, this is correct.

Do not force Level-2 cards into Mode B.

---

## What's Missing

Can become slightly more specific at an abstract level:

```text
some areas are still lightly represented

some kinds of experience are still absent
```

No personal data.

---

## Help Complete the Picture

Visible.

CTA remains:

```text
Submit a story ↗
```

---

# State C — ESD-D-C / Patterns Beginning

## User Meaning

```text
Something may be forming.
```

This is the first state where provisional Emerging Signals become an expected visual possibility.

---

## Network Pulse

Still honest.

No invented quantitative dashboard.

---

## The Picture Is Forming

Show subtle overlaps or connections.

Visual language:

```text
multiple signals

soft convergence

overlapping regions

partial shared context
```

No confirmed cluster boundaries.

---

## Emerging Signals

Show one or more provisional Level-2 signal representations.

Each must visibly include:

```text
Emerging signal

Provisional — may change
```

Possible supporting copy can describe a pattern without presenting it as a final Issue.

Example structure:

```text
Emerging signal

[provisional pattern title]

Several Stories appear to describe related experiences.

Provisional — may change
```

The exact topic text in mockup examples must be clearly illustrative.

---

## What's Missing

Show that understanding can still change as new perspectives arrive.

It should visually coexist with Emerging Signals rather than imply the emerging pattern is already complete.

---

## Help Complete the Picture

CTA remains available.

The user is contributing to better understanding, not “voting” for the emerging signal.

---

# State D — ESD-D-D / Collective Picture Emerging

## User Meaning

```text
We are beginning to see something together.
```

This is the densest pre-Issue state.

Important:

```text
still zero confirmed Issues
```

---

## Network Pulse

Can feel visually more active but must remain free of invented numeric claims.

---

## The Picture Is Forming

Signals have stronger visual relationships.

Possible visual:

```text
several overlapping groups

clearer shared contours

multiple adjacent patterns
```

Do not draw a completed Issue card.

---

## Emerging Signals

One or more provisional patterns may be visible.

They can be more visually substantial than in Mode C but still retain:

```text
Emerging signal

Provisional — may change
```

The user must be able to distinguish them instantly from confirmed M132 Issue feed items.

---

## What's Missing

Becomes more targeted conceptually but still abstract.

Possible framing:

```text
The picture is becoming clearer, but some perspectives are still missing.
```

Do not quantify completeness.

---

## Help Complete the Picture

Remain visible.

Do not weaken the contribution opportunity just because the discovery field is denser.

---

# State E — ESD-D-err / Load Error

## Functional Code

```text
ESD-D-err
```

## Purpose

The system cannot currently load the public-board discovery state.

---

## Title

Use the established operational board error tone.

Recommended:

```text
Unable To Load The Board
```

if consistent with M132.

---

## Message

Use existing board error copy where applicable rather than inventing Early Signal-specific technical explanations.

---

## Recovery CTA

```text
Try Again
```

---

## Requirements

```text
No fake discovery data.

No fallback fake Pulse.

No invented Emerging Signals.

No red full-screen panic state.

No raw gateway error.

No transformation into the generic zero-Issue state.

Retry preserves the /board shell.
```

---

# 20. State Progression Model

Display as an annotation, not as a user-facing progress meter.

```text
LOAD

↓

A — First Signal

↓

B — Diverse Early Voices

↓

C — Patterns Beginning

↓

D — Collective Picture Emerging
```

Then conceptually:

```text
D

↓

First confirmed Issue

↓

ESD-I / Mode E
```

Critical annotation:

```text
Density progression only.
Not Story-count thresholds.
```

Do not connect these states using:

```text
25%

50%

75%

100%
```

or numerical milestones.

---

# 21. Discovery Composition Hierarchy

Recommended page-level visual weight:

```text
1. The Picture Is Forming

2. Network Pulse

3. Emerging Signals when present

4. What's Missing

5. Help Complete the Picture
```

However the reading order remains:

```text
Pulse

→ Picture

→ Emerging

→ Missing

→ Help
```

This creates one coherent narrative:

```text
Activity

→ interpretation

→ provisional patterns

→ uncertainty

→ participation
```

---

# 22. Layout Guidance — Desktop

Recommended composition:

```text
┌─────────────────────────────────────────────┐
│ Network Pulse                               │
├─────────────────────────────────────────────┤
│                                             │
│ The Picture Is Forming                      │
│ primary discovery field                     │
│                                             │
├──────────────────────┬──────────────────────┤
│ Emerging Signals     │ What's Missing       │
│ provisional          │ coverage             │
├──────────────────────┴──────────────────────┤
│ Help Complete the Picture        [CTA ↗]    │
└─────────────────────────────────────────────┘
```

This is conceptual, not a mandatory pixel grid.

The five blocks should read as a single discovery instrument.

---

# 23. Layout Guidance — Narrow / Mobile

Use one vertical reading flow:

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

Requirements:

```text
No horizontal canvas dependency.

No tiny network graph.

No squeezed two-column cards.

CTA full-width where appropriate.

Minimum touch target 44px.

Provisional labels remain readable.

Cultural motifs simplify before content does.
```

---

# 24. Network Visualization Rules

The discovery field must avoid false precision.

Allowed:

```text
abstract relationships

soft signal nodes

partial connections

fading lines

overlap hints

density changes
```

Not allowed:

```text
exact similarity percentages

confidence percentages

fake map coordinates

fake geographic heatmap values

fake trend lines

fake Story counts

fake clustering scores
```

If a visual cannot be supported without implying a numerical claim, simplify it.

---

# 25. Honest Data Rule

Until sibling data contracts define available fields:

```text
copy > fabricated metric
```

Canonical Pulse fallback:

```text
Stories are already shaping a collective picture.
```

M136 must not invent:

```text
API field names

gateway routes

metric DTOs

aggregate counts

unique-user metrics
```

This constraint is explicitly locked in ADMIN-ESD-01. 

---

# 26. Prohibited Product Claims

Never use:

```text
trending

majority

consensus

most people

everyone agrees

top concern
```

for Early Signal small-N discovery unless a later verified product/data contract explicitly permits it.

Also prohibit:

```text
73% understood

Picture 80% complete

3 Stories until Issue

Issue almost unlocked

Next Issue in 2 Stories
```

These patterns are explicitly prohibited by the Early Signal source. 

---

# 27. Anti-Gaming Rules

Discovery must never feel like a progress game.

Do not introduce:

```text
points

levels

unlocking

streaks

badges

story targets

progress bars

recruitment goals

leaderboards
```

The incentive is:

```text
better collective understanding
```

not:

```text
completing a system meter
```

---

# 28. Offers / Solutions Rule

There are zero confirmed Issues in M136.

Therefore:

```text
No Offers

No Solutions

No provider matching

No tender mechanics
```

These belong to later Issue-level functionality.

Do not show disabled Offers UI either.

It should simply not exist in this surface.

---

# 29. Privacy

Allowed:

```text
aggregated patterns

abstract signal presence

anonymized coverage language

general area/topic/language gaps when supported
```

Never display:

```text
Story author names

personal contact details

phone numbers

emails

individual participation targeting

private Story text unless explicitly public by product contract
```

`What's Missing` describes the picture, not specific people.

---

# 30. CTA Routing

## Submit a story

Purpose:

```text
add another civic Story
```

Behaviour:

```text
External DOGEstonia GPT handoff
```

Configuration pattern:

```text
VITE_STORY_GPT_URL
```

Visual hierarchy:

```text
Primary / high-priority civic contribution action
```

Use the canonical M134 external-handoff button semantics.

The artboard must make clear:

```text
Submit a story does NOT open a local /board compose form.
```

---

# 31. Search / Filters Relationship

M136 does not redefine the existing M132 filter contract.

If the existing board toolbar is shown in the page context:

```text
preserve its existing structure
```

Do not invent Early Signal-specific filters.

Particularly do not introduce:

```text
Signal strength

Confidence %

Story threshold

Cluster readiness
```

unless those become separate approved product requirements.

---

# 32. Loading vs Discovery

Important runtime distinction:

```text
Loading
```

means:

```text
the system does not yet know which state to render
```

Mode A means:

```text
the system has loaded and the earliest discovery state is genuinely present
```

Therefore Mode A must not visually resemble a skeleton or empty placeholder.

---

# 33. Empty vs Early Signal

M136 deliberately changes the interpretation of the zero-Issue board.

Do not show the old centralized:

```text
No Issues Yet
```

empty block as the dominant content when Early Signal discovery data is available.

The user should instead understand:

```text
There are no confirmed Issues yet,
but the network is already learning.
```

This wording expresses the design intention; it is not necessarily final runtime copy.

---

# 34. Accessibility

Requirements:

```text
WCAG AA minimum contrast

Logical heading hierarchy

Discovery blocks have semantic headings

Keyboard-accessible CTA

Visible focus state

External handoff announced accessibly

No information communicated only through colour

No signal-strength meaning dependent solely on opacity

Reduced-motion support

Readable mobile layout

Minimum touch target 44px
```

If network relationships are visually represented, equivalent text must communicate the important semantic meaning.

The visualization cannot be the sole carrier of product information.

---

# 35. Motion Rules

Motion, if used in future implementation, must be quiet.

Allowed:

```text
very subtle signal appearance

gentle line emergence

soft opacity transition
```

Not allowed:

```text
constant pulsing

radar animation

gamified particles

celebratory growth animation

flashing "new signal" effects
```

The static artboard should not depend on animation to explain meaning.

---

# 36. Localization

Public chrome already supports:

```text
EN

ET

RU
```

M136 artboard should use:

```text
English
```

unless a localization sheet is requested separately.

Candidate namespace:

```text
earlySignal.*
```

Possible conceptual groups:

```text
earlySignal.pulse.*

earlySignal.picture.*

earlySignal.emerging.*

earlySignal.missing.*

earlySignal.help.*
```

Exact key names should be finalized in implementation intake.

Do not create three full language versions on this state sheet.

---

# 37. Future Discovery Root Test Hook

Document a future FE affordance:

```text
data-testid="board-early-signal-discovery"
```

Purpose:

```text
stable discovery-root selector for integration / UAT
```

This specification records the expected testability contract.

It is not itself a frontend implementation task.

The source explicitly asks ESD-D specifications to reserve this affordance. 

---

# 38. Artboard Side Panels

Keep engineering panels compact.

Recommended:

```text
State Progression

Terminology Ladder

Honest Data Rules

Prohibited Patterns

CTA Routing

Responsive Behaviour

Traceability
```

The actual six UI states must occupy most of the canvas.

Do not create a rules-heavy appendix where documentation panels dominate the runtime states.

---

# 39. Artboard State Composition

Recommended large-state allocation:

```text
Mode A — medium

Mode B — medium

Mode C — large

Mode D — large
```

Supporting:

```text
Loading — compact

Error — compact
```

Reason:

Modes C and D carry the greatest visual distinction between:

```text
individual Stories

provisional Emerging Signals

confirmed Issues
```

and therefore need enough room to demonstrate that hierarchy clearly.

---

# 40. State Matrix

| State        | Product meaning             | Emerging Signals    | Pulse                     | Primary UX emphasis     |
| ------------ | --------------------------- | ------------------- | ------------------------- | ----------------------- |
| `ESD-D-load` | State unresolved            | None                | Skeleton / no numbers     | Stable loading          |
| `ESD-D-A`    | Network has begun           | Absent              | Copy-only                 | First civic presence    |
| `ESD-D-B`    | Diverse experiences         | Optional / absent   | Copy-only                 | Listening / separation  |
| `ESD-D-C`    | Patterns beginning          | Provisional         | Copy-only                 | First overlap           |
| `ESD-D-D`    | Collective picture emerging | Provisional, denser | Copy-only unless verified | Stronger shared picture |
| `ESD-D-err`  | Board failed to load        | None                | None                      | Honest retry            |

No Story count appears in this matrix because counts are not UI state gates.

---

# 41. Relationship to Future ESD-P

M136 demonstrates Network Pulse only at composition level.

Detailed Pulse states belong to:

```text
ESD-P
```

Therefore M136 should not invent:

```text
metric anatomy

metric API

metric fields

metric charts
```

It should show enough to establish placement and role only.

---

# 42. Relationship to Future ESD-E

M136 shows Emerging Signals only at page-composition level.

Detailed provisional card behavior belongs to:

```text
ESD-E
```

Therefore M136 should not attempt to fully solve:

```text
signal weakening

signal disappearance

all provisional-card variants
```

Only representative provisional presentation is required.

---

# 43. Relationship to Future ESD-C

The three lower-level participation/coverage functions:

```text
The Picture Is Forming

What's Missing

Help Complete the Picture
```

receive more detailed treatment in:

```text
ESD-C
```

M136 establishes their composition and hierarchy.

---

# 44. Relationship to Future ESD-I

M136 covers:

```text
0 confirmed Issues
```

The transition to:

```text
≥1 confirmed Issue
```

belongs to:

```text
ESD-I
```

Do not show confirmed Issue cards inside Modes A–D.

A small reference arrow may say:

```text
First confirmed Issue → ESD-I
```

but no Mode E full UI belongs on M136.

---

# 45. Traceability

Functional code:

```text
ESD-D
```

Mockup:

```text
M136
```

Package:

```text
ADMIN-ESD-01
```

Future Story:

```text
ES-01
```

Route:

```text
/board
```

Related public UX:

```text
M129 — Public Header Chrome

M131 — Public Footer Chrome

M132 — Public Board Home Feed

M134 — Button System
```

Related Early Signal artboards:

```text
ESD-P — Network Pulse

ESD-E — Emerging Signals

ESD-C — Coverage trio

ESD-I — Issues + residual discovery continuum
```

Source:

```text
UX-PROMPTS.md
Early Signal / Pre-Cluster Discovery
```

---

# 46. Out of Scope

M136 must not define or display:

```text
REQ-12 personal /dashboard redesign

personal cabinet

Offers

Solutions

provider matching

tenders

Civic Search & Matching

Companions

Voices / unique-person metrics

fake analytics dashboard

clustering algorithm

promotion thresholds

Story-count gates

Issue unlock rules

new gateway endpoints

new DTO fields

in-app Story composer

confirmed Issue detail behavior

Issue-level Offers
```

These exclusions are explicitly locked by the package source. 

---

# 47. Anti-Pattern Panel

The artboard should explicitly reject:

```text
✕ 67% understood

✕ 3 more Stories to unlock an Issue

✕ Trending concern

✕ Majority agrees

✕ Emerging Signal styled as confirmed Issue

✕ Offer a solution

✕ Invite 5 friends

✕ Level 2 complete
```

Canonical rule:

```text
Discovery communicates uncertainty honestly.
It never manufactures certainty to create engagement.
```

---

# 48. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
There are no confirmed Issues yet.

The board is not empty.

Stories are already creating civic signal.

The network is beginning to see relationships.

Some patterns may emerge provisionally.

Those patterns are not Issues yet.

The system openly shows what it still does not know.

Citizens can contribute another Story through DOGEstonia GPT.

Nothing is gamified.

Nothing is fabricated.

The interface becomes richer as the collective picture becomes richer.
```

Canonical mental model:

```text
Stories

↓

Early civic signal

↓

Collective picture forming

↓

Emerging provisional patterns

↓

Confirmed Issue later
```

Not:

```text
Stories

↓

Progress bar

↓

Unlock Issue
```

The final design should make the earliest days of DOGEstonia feel valuable and alive without pretending that the system understands more than it actually does.

```

В этой спеке я специально сделал **Mode A не empty-state**, а минимально живым discovery-state. Это ключевой продуктовый перелом всего пакета: раньше M132 при `0 Issues` сообщал «ничего ещё нет», а M136 должен сообщать **«Issue ещё не сформирован, но коллективное знание уже существует и система честно показывает степень его структурирования»** — без превращения этого в псевдоаналитику или game progression. :contentReference[oaicite:10]{index=10}
```
