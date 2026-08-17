# File Name

```text
mockup-138-emerging-signals-provisional-state-sheet-spec.md
```

# Mockup 138 Spec — Emerging Signals (Provisional) — State Sheet

**Functional code:** ESD-E  
**Mockup:** M138  
**Package:** ADMIN-ESD-01 / Early Signal Dashboard — Pre-Cluster Discovery  
**Future story:** ES-03  
**Version:** v1.0  
**Status:** Proposed Active SSOT  
**Area:** Public Board / Early Signal Discovery  
**Host route:** `/board`  
**Priority:** MUST  
**Parent composition:** M136 — Early Signal Discovery Composition  
**Related artboards:** M137 ESD-P · ESD-C · ESD-I  
**Target folder:** `spa-app/docs/UX/mockups/early-signal-dashboard/`

---

# 1. Purpose

This artboard defines the canonical DOGEstonia **Emerging Signals** component used during the pre-cluster phase of the public `/board`.

Emerging Signals represent **provisional Level-2 patterns** inferred from available Stories.

They are explicitly **not confirmed Issues**.

The component exists to communicate:

```text
Something may be forming.
```

without communicating:

```text
An Issue has been confirmed.
```

Canonical product rule:

```text
Story ≠ Emerging Signal ≠ Issue
```

and:

```text
Topic ≠ Issue
```

The visual and copy system must preserve this distinction at a glance.

---

# 2. Product Context

The Emerging Signals block is the third conceptual function in the Early Signal discovery composition:

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

The host remains:

```text
/board
```

The component is used only while the system is still forming a collective picture from Stories.

It does not replace the confirmed Issue feed.

Confirmed Issues remain Level 3 and are handled by:

```text
M132 — Public Board Home Feed

and later

ESD-I — Continuum with Issues ≥1
```

---

# 3. Screen / Artboard Type

Type:

```text
Focused component state sheet
```

The artboard isolates Emerging Signals and defines three required runtime states:

```text
ESD-E-empty

ESD-E-cards

ESD-E-weaken
```

Only one runtime state is active at a time.

The sheet must make it immediately obvious that this component is provisional and reversible.

---

# 4. State Matrix

| State | Meaning | Requirement |
|---|---|---|
| `ESD-E-empty` | No meaningful Level-2 pattern is available | Honest absence / section may be omitted |
| `ESD-E-cards` | One or more provisional patterns are visible | Clear provisional card language |
| `ESD-E-weaken` | A previously visible pattern weakens or disappears | Confidence/change framing, not Issue deletion |

---

# 5. Core Semantic Model

## Story — Level 1

A Story is source material submitted by a citizen/user.

It is an input object.

---

## Emerging Signal — Level 2

An Emerging Signal is a provisional pattern inferred from one or more Stories.

It may:

```text
appear

strengthen

change

split

merge

weaken

disappear
```

It is not yet a stable confirmed civic object.

---

## Issue — Level 3

An Issue is a confirmed clustered civic object.

It belongs to the Issue feed and uses different chrome.

Canonical hierarchy:

```text
Story
↓
Emerging Signal
↓
Issue
```

The design must not flatten these levels into one card language.

---

# 6. Copy Canon

Section title:

```text
Emerging Signals
```

Required provisional label:

```text
Emerging signal
```

Required supporting status text:

```text
Provisional — may change
```

These phrases should be visible in the populated state and in the anatomy reference.

They are the primary semantic defense against treating Level 2 as a confirmed Issue.

---

# 7. State A — ESD-E-empty

## Name

```text
No Emerging Signal / Honest Absence
```

## Purpose

This state appears when the system does not currently have a meaningful provisional Level-2 pattern to show.

This is a valid discovery outcome.

The interface must not invent a pattern merely to keep the section visually populated.

---

## Preferred Behavior

Two valid implementations are allowed:

### Option A — Section omitted

```text
No Emerging Signals block is rendered.
```

Use when omission creates the clearest and calmest composition.

### Option B — Quiet honest absence

Show:

```text
Emerging Signals
```

with restrained body copy such as:

```text
No clear patterns yet.
```

and optional supporting copy:

```text
We're continuing to listen.
```

Final runtime copy may be refined during localization/content implementation.

---

## Visual Treatment

If rendered, the state should be visually lightweight.

Allowed:

```text
faint placeholder constellation

soft dotted field

empty provisional outline

subtle listening indicator
```

Do not show:

```text
empty Issue card

large error illustration

red warning

fake signal preview
```

---

## Requirements

```text
No fabricated similarity.

No fake card title.

No "No Issues" language.

No failure tone.

No CTA required.

No Offer / Solution UI.

No unlock wording.
```

Canonical meaning:

```text
Absence of an Emerging Signal is information,
not a system failure.
```

---

# 8. State B — ESD-E-cards

## Name

```text
Provisional Emerging Signal Cards Present
```

## Purpose

Displays one or more Level-2 patterns when the system has enough basis to surface a provisional relationship.

The pattern must remain visually and verbally provisional.

---

# 9. Emerging Signal Card Anatomy

Each provisional card should contain:

```text
1. Provisional type label

2. Pattern title / short descriptive phrase

3. Supporting explanation

4. Provisional status text

5. Optional abstract source/context visualization
```

Required visible labels:

```text
Emerging signal

Provisional — may change
```

---

## 9.1 Type Label

Exact:

```text
Emerging signal
```

Use a restrained badge or eyebrow.

Do not use:

```text
Issue

Verified

Confirmed

Trending
```

---

## 9.2 Pattern Title

The title describes what appears to connect.

It must be phrased as a pattern, not as a final civic claim.

Illustrative structure:

```text
Related experiences around public transport reliability
```

or:

```text
Several Stories appear connected around evening transport access
```

The exact sample topic is illustrative only.

Do not make the example appear as a confirmed production Issue.

---

## 9.3 Supporting Copy

Recommended semantic pattern:

```text
Several Stories appear to describe related experiences.
```

Alternative:

```text
A provisional relationship is beginning to appear across submitted Stories.
```

Copy must communicate uncertainty.

Avoid:

```text
Citizens agree that...

The main problem is...

This is a confirmed issue...

Most people report...
```

---

## 9.4 Provisional Status

Exact canonical text:

```text
Provisional — may change
```

This must remain visible and legible.

It must not be replaced by an icon-only status.

---

# 10. Card Visual Hierarchy

Emerging Signal cards must be less authoritative than confirmed Issue cards.

Recommended characteristics:

```text
lighter border

softer surface contrast

less metadata

more open spacing

subtle provisional badge

abstract relationship visual
```

Confirmed Issue chrome is intentionally stronger and more structured.

Emerging Signal must not use the full M132 Issue anatomy.

---

# 11. Explicit Difference from Issue Cards

Do not show Issue-specific fields such as:

```text
Issue ID

Open issue →

Issue status enum

VERIFIED Issue badge

IN REVIEW Issue badge

ARCHIVED Issue badge

confirmed institution routing

submission/issue provenance chrome
```

An Emerging Signal may later lead to an Issue, but it must not visually pretend that transition already happened.

Canonical visual rule:

```text
Level 2 looks provisional.

Level 3 looks confirmed.
```

---

# 12. Topic / Taxonomy Rule

A topic or taxonomy label may help describe a provisional pattern.

However:

```text
Topic ≠ Issue
```

If category-like labels are shown, they must look like contextual metadata rather than Issue identity.

Do not render a taxonomy term as if it were the confirmed card title.

Example:

```text
Context: Mobility
```

is acceptable as contextual support.

But:

```text
ISSUE: Mobility
```

is not.

---

# 13. State C — ESD-E-weaken

## Name

```text
Signal Weakens / Disappears
```

## Purpose

Defines how the UI communicates that a previously surfaced provisional pattern is no longer strong enough to show in the same way.

This is essential because Level-2 patterns are reversible.

A weakening signal must not look like a deleted Issue.

---

# 14. Weakening Semantics

Canonical meaning:

```text
The pattern is less clear now.
```

Not:

```text
The Issue was removed.
```

The product may represent weakening through:

```text
reduced visual emphasis

changed provisional helper copy

fading relationship lines

movement into an "unclear / still forming" presentation

eventual disappearance from the Emerging Signals section
```

The exact algorithmic trigger remains out of scope.

---

# 15. Weakening Copy

Recommended directional copy:

```text
This pattern is becoming less clear as new Stories arrive.
```

or:

```text
The relationship is no longer strong enough to present as an emerging signal.
```

Final copy may be refined during content implementation.

Required semantic anchor remains:

```text
Provisional — may change
```

---

# 16. Disappearance Behavior

If the signal no longer qualifies for display, it may simply disappear from the active Emerging Signals list.

The UI must not imply:

```text
deletion

moderation removal

censorship

Issue closure

archive action
```

Do not show destructive controls.

Do not show:

```text
Deleted

Removed

Rejected

Archived
```

unless a separate product state explicitly requires them.

---

# 17. Visual Weakening Pattern

Allowed:

```text
lower contrast

lighter connecting lines

fewer relationship marks

muted provisional card surface

short explanatory note
```

Avoid:

```text
red error styling

strikethrough

trash icon

"deleted" badge

collapse animation suggesting moderation action
```

The user should understand:

```text
the pattern changed,
not that somebody erased a civic object.
```

---

# 18. Relationship to M136 Modes

Suggested composition relationship:

```text
Mode A
→ Emerging Signals absent

Mode B
→ Emerging Signals may still be absent

Mode C
→ first provisional patterns may appear

Mode D
→ denser provisional pattern field
```

This is a UX-density relationship only.

Do not use Story counts as gates.

Do not label:

```text
3 Stories required

5 Stories minimum

Level 2 unlocked
```

---

# 19. Pattern Strength

The artboard must not introduce numeric confidence or strength values.

Do not show:

```text
Confidence 68%

Signal strength 4/5

Similarity 82%

Pattern score 0.73
```

unless a later approved product/data contract explicitly requires them.

For M138, strength is communicated qualitatively only.

---

# 20. No Trending / Majority / Consensus

Prohibited labels include:

```text
Trending

Majority

Consensus

Popular

Top concern

Most reported
```

The Early Signal stage is too provisional for these product claims unless future verified rules explicitly authorize them.

---

# 21. No Unlock Gamification

Do not show:

```text
2 more Stories until Issue

Almost confirmed

Issue unlock progress

Signal ready to promote

7/10
```

The visual must not create a game-like progression toward Issue creation.

Canonical rule:

```text
Emergence is observed,
not unlocked.
```

---

# 22. No Offers / Solutions

Emerging Signals are pre-Issue.

Therefore this component must not include:

```text
Offer a solution

Submit offer

Provider matching

Tender

Vote on solution

Propose service
```

Offers/Solutions belong to later Issue-level product work.

---

# 23. No Direct User Voting on Signal Existence

M138 does not define:

```text
confirm this signal

upvote signal

agree / disagree

like

vote to promote
```

The existence of an Emerging Signal is a system interpretation of Story relationships, not a popularity contest.

---

# 24. Story Relationship Visualization

Optional abstract visual language may include:

```text
small Story nodes

soft overlapping circles

partial connection lines

cluster-like but unfinished geometry

fading links
```

The visualization must remain abstract enough not to imply exact statistical calculations.

---

# 25. Source Story Count

Do not show a Story count on the card by default unless a sibling-approved contract explicitly defines that value.

Even if a count later exists, it must not be framed as:

```text
evidence strength

progress to Issue

social proof
```

No count is required in M138.

---

# 26. Card Interactivity

Default:

```text
non-interactive informational card
```

Do not make the card appear clickable without a defined route.

M138 does not define an Emerging Signal detail page.

If later a detail surface exists, it requires a separate product decision.

---

# 27. CTA Rules

The Emerging Signals block itself requires:

```text
NO primary CTA
```

Participation CTA remains in:

```text
Help Complete the Picture
```

Do not insert:

```text
Submit a story

Explore signal

Confirm signal

View Issue
```

inside each provisional card.

---

# 28. Accessibility

Requirements:

```text
WCAG AA contrast

Semantic section heading

Provisional status readable as text

No status communicated by color alone

Card title and supporting copy readable at zoom

No animation required to understand weakening

Reduced-motion safe

Screen-reader order follows visual order
```

If relationship graphics are decorative, hide them from assistive technology.

If they carry unique meaning, provide equivalent text.

---

# 29. Motion

If future implementation adds transitions:

Allowed:

```text
soft fade

subtle connection appearance

quiet opacity change when weakening
```

Not allowed:

```text
dramatic collapse

card explosion

shake

red flash

gamified upgrade animation

Issue-unlock celebration
```

A signal may weaken quietly.

---

# 30. Localization

Artboard language:

```text
English
```

Supported app locales:

```text
EN

ET

RU
```

Suggested namespace:

```text
earlySignal.emerging.*
```

Possible conceptual keys:

```text
earlySignal.emerging.title

earlySignal.emerging.badge

earlySignal.emerging.provisional

earlySignal.emerging.empty

earlySignal.emerging.weakened
```

Exact keys remain to be frozen during implementation intake.

Do not show all three full language versions on this artboard.

---

# 31. Estonian Cultural Layer

Use the same restrained DOGEstonia textile system.

Allowed:

```text
thin ETM-FLORAL section divider

small ETM-STRIPE edge accent

optional non-semantic floral marker
```

Do not use motifs:

```text
as status badges

as confidence indicators

inside functional icons

as replacements for provisional text
```

The cultural layer remains decorative and non-semantic.

---

# 32. Narrow / Mobile Behavior

The three functional states must remain understandable at narrow widths.

Recommended card behavior:

```text
single-column stack

full-width provisional cards

title before supporting copy

provisional badge always visible

no horizontal card carousel
```

Weakening state should remain readable without requiring hover.

Minimum touch target rules apply only if future interactivity is introduced.

---

# 33. Artboard Composition

Recommended sheet structure:

```text
LEFT — ESD-E-empty

CENTER / LARGE — ESD-E-cards

RIGHT / LOWER — ESD-E-weaken
```

The populated state should be the largest because it defines the primary card anatomy.

Compact documentation panels:

```text
Level Ladder

Card Anatomy

Provisional Rules

Anti-Patterns

Responsive Behavior

Traceability
```

Runtime examples must dominate the canvas.

---

# 34. Card Anatomy Panel

Show a compact anatomy diagram with:

```text
Emerging signal badge

Pattern title

Supporting copy

Provisional — may change

Optional relationship visual
```

Add explicit note:

```text
No Issue ID.
No Issue status.
No Open issue action.
```

---

# 35. Level Ladder Panel

Display:

```text
Story
Level 1
Source contribution

↓

Emerging Signal
Level 2
Provisional pattern

↓

Issue
Level 3
Confirmed clustered civic object
```

Add:

```text
Level 2 ≠ Level 3
```

---

# 36. Prohibited Pattern Panel

Include:

```text
✕ Confirmed Issue chrome

✕ Trending

✕ Majority / consensus

✕ Confidence %

✕ N Stories until Issue

✕ Offer a solution

✕ Vote to promote

✕ Deleted / archived language for weakening
```

Canonical rule:

```text
Provisional patterns can change without becoming failures.
```

---

# 37. Honest Absence Rule

If no pattern exists:

```text
show nothing
```

or:

```text
show a quiet honest absence
```

Do not create a visually rich fake card.

Canonical rule:

```text
Empty is better than fabricated similarity.
```

---

# 38. Weakening Rule

If a signal weakens:

```text
reduce certainty
```

not:

```text
increase alarm
```

The visual system should move toward ambiguity, not toward error.

---

# 39. Relationship to Future ESD-I

When a confirmed Issue exists:

```text
Issue chrome belongs to ESD-I / M132 continuum
```

M138 does not define the promotion transition algorithm.

A small reference annotation may show:

```text
Confirmed Issue → ESD-I
```

but must not imply a visible countdown or deterministic threshold.

---

# 40. Future Testability Note

Possible future test hooks:

```text
data-testid="emerging-signals"
```

and:

```text
data-testid="emerging-signal-card"
```

These are recommendations for future FE acceptance/UAT.

They are not implementation tasks in this artboard phase.

---

# 41. Traceability

Functional code:

```text
ESD-E
```

Mockup:

```text
M138
```

Package:

```text
ADMIN-ESD-01
```

Future story:

```text
ES-03
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
M137 — Network Pulse

M132 — Public Board Home Feed

ESD-C — Coverage Trio

ESD-I — Issues + Residual Discovery Continuum
```

Source:

```text
UX-PROMPTS.md
Early Signal / Pre-Cluster Discovery
```

---

# 42. Out of Scope

M138 must not define:

```text
clustering algorithm

signal confidence formula

promotion threshold

Story-count gate

Emerging Signal API schema

gateway path

Emerging Signal detail page

Issue promotion workflow

Offers / Solutions

provider matching

user voting

moderation controls

personal contacts

personal dashboard

in-app Story compose
```

---

# 43. Implementation Acceptance Intent

When eventually implemented, the component should pass product review if:

```text
No Emerging Signal can be mistaken for a confirmed Issue.

The empty state does not fabricate a pattern.

The populated state always says "Emerging signal".

The populated state always communicates "Provisional — may change".

Weakening does not look like Issue deletion.

No confidence percentage appears.

No countdown to Issue appears.

No trending / majority / consensus claim appears.

No Offers or voting actions appear.

Mobile retains the provisional hierarchy.
```

---

# 44. Artboard Validation Checklist

The generated PNG must visibly confirm:

```text
✓ ESD-E-empty

✓ ESD-E-cards

✓ ESD-E-weaken

✓ Emerging Signals title

✓ "Emerging signal" label

✓ "Provisional — may change"

✓ populated card anatomy

✓ honest absence

✓ weakening without delete/error semantics

✓ Story → Emerging Signal → Issue ladder

✕ no Issue ID

✕ no confirmed Issue status

✕ no "Open issue →"

✕ no confidence %

✕ no Story threshold

✕ no trending

✕ no Offers / Solutions
```

---

# 45. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
Emerging Signals are Level-2 provisional patterns.

They are derived from Stories but are not confirmed Issues.

The section may honestly be absent when no pattern exists.

When a pattern appears, the interface clearly marks it as provisional.

The pattern may strengthen, weaken, change, or disappear.

Weakening is not deletion.

The product does not use confidence percentages, unlock thresholds, trending claims, or Offers to make early signals feel more certain than they are.
```

Canonical mental model:

```text
Stories

↓

A possible pattern appears

↓

We show it carefully

↓

The pattern may change

↓

A confirmed Issue may emerge later
```

Not:

```text
Stories

↓

Signal card

↓

Progress bar

↓

Issue unlocked
```

The final visual should feel exploratory but disciplined: the system is allowed to say “we may be seeing something” without pretending that uncertainty has already become civic fact.
