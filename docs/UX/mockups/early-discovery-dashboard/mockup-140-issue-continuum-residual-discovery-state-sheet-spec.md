# File Name

```text
mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md
```

# Mockup 140 Spec — Issue Continuum + Residual Discovery — State Sheet

**Functional code:** ESD-I  
**Mockup:** M140  
**Package:** ADMIN-ESD-01 / Early Signal Dashboard — Pre-Cluster Discovery  
**Future story:** ES-05  
**Version:** v1.0  
**Status:** Proposed Active SSOT  
**Area:** Public Board / Early Signal Discovery Continuum  
**Host route:** `/board`  
**Priority:** MUST  
**Parent surfaces:** M132 Public Board Home Feed · M136 Early Signal Discovery Composition  
**Related artboards:** M137 ESD-P · M138 ESD-E · M139 ESD-C  
**Target folder:** `spa-app/docs/UX/mockups/early-signal-dashboard/`

---

# 1. Purpose

This artboard defines the canonical DOGEstonia `/board` experience once **one or more confirmed Issues exist**, while preserving a lightweight discovery layer for civic material that is still forming.

This is the bridge between:

```text
Pre-Cluster Discovery
```

and:

```text
Confirmed Issue Feed
```

The product must not behave as if Early Signal discovery disappears the moment the first Issue appears.

Instead:

```text
Confirmed Issues become primary.

Discovery continues for what is still forming.
```

Canonical continuum copy:

```text
Issues emerging · discovery continues for what is still forming
```

The core product principle is continuity:

```text
The board evolves.
It does not switch into a different product.
```

---

# 2. Product Context

Before any confirmed Issue exists, the public `/board` may show the Early Signal discovery composition defined by:

```text
M136 — ESD-D
```

As Stories accumulate and a confirmed Issue eventually appears, the board must transition into a mixed continuum:

```text
Confirmed Issue feed
+
Residual discovery framing
```

The confirmed Issue feed remains recognizable from:

```text
M132 — Public Board Home Feed
```

The Early Signal layer remains recognizable from:

```text
M136–M139
```

The result must feel like one coherent civic operating surface.

---

# 3. Host and Shell Lock

Host:

```text
/board
```

Do not create:

```text
/issues

/discovery

/signals

/early-signal
```

as new routes for this artboard.

Reuse the existing Public Home shell:

```text
M129 Public Header

↓

/board

↓

M131 Public Footer
```

Do not redesign the shell.

---

# 4. Screen / Artboard Type

Type:

```text
Route-level continuum state sheet
```

Required states:

```text
ESD-I-feed

ESD-I-residual

ESD-I-event
```

The artboard should also include narrow/mobile expectations.

These states describe the relationship between confirmed Issues and ongoing discovery.

---

# 5. State Matrix

| State | Product meaning | Required |
|---|---|---|
| `ESD-I-feed` | Confirmed Issues exist | Existing Issue feed/cards remain primary |
| `ESD-I-residual` | Some material is still forming | Lightweight discovery chrome remains alongside the feed |
| `ESD-I-event` | First confirmed Issue has just emerged | Transition feels meaningful without gamification |

---

# 6. Core Continuum Model

Canonical lifecycle:

```text
Stories

↓

Early civic signal

↓

The Picture Is Forming

↓

Emerging Signals
(Level 2, provisional)

↓

Confirmed Issue
(Level 3)
```

After the first Issue appears:

```text
Issue feed becomes primary

BUT

other Stories may still remain pre-cluster
```

Therefore:

```text
Issue existence ≠ discovery finished
```

This distinction is the heart of M140.

---

# 7. Terminology Lock

Maintain three distinct concepts:

```text
Story
Emerging Signal
Issue
```

## Story

Source civic contribution.

## Emerging Signal

Provisional Level-2 pattern.

Required provisional semantics remain:

```text
Emerging signal

Provisional — may change
```

## Issue

Confirmed Level-3 clustered civic object.

Canonical rule:

```text
Story ≠ Emerging Signal ≠ Issue
```

and:

```text
Topic ≠ Issue
```

M140 must visually preserve this hierarchy even when both Level 2 and Level 3 objects appear on the same route.

---

# 8. Primary Visual Hierarchy

When confirmed Issues exist:

```text
1. Confirmed Issue feed

2. Residual discovery context

3. Contribution affordance where appropriate
```

The discovery layer must not compete with the Issue feed.

Do not make:

```text
Emerging Signals

What’s Missing

Network Pulse
```

larger or more visually dominant than confirmed Issues.

Canonical rule:

```text
Confirmed civic objects are primary.
Still-forming civic knowledge remains visible but secondary.
```

---

# 9. State A — ESD-I-feed

## Name

```text
Issue Feed Primary
```

## Purpose

Defines the baseline `/board` state when at least one confirmed Issue exists.

The existing Issue feed/cards must remain recognizable.

This is a regression-protection state.

---

# 10. Issue Feed Canon

Reuse the functional structure of M132.

Each visible confirmed Issue item should preserve the established anatomy:

```text
Issue ID

Status badge

Title

Summary / excerpt

Label chips

Location · date metadata

Open issue →
```

Do not collapse this structure into:

```text
large visual tiles

marketing cards

cluster carousel

map-only view

analytics dashboard
```

The main board remains a structured Issue feed.

---

# 11. Issue Card Functional Distinction

Confirmed Issue cards may include statuses such as:

```text
NEW

VERIFIED

IN REVIEW

ARCHIVED
```

where supported by the current Issue model.

Emerging Signals must not reuse these status semantics.

A user should be able to distinguish:

```text
Confirmed Issue
```

from:

```text
Provisional Emerging Signal
```

within seconds.

---

# 12. Search and Filters

Preserve the existing M132 board toolbar concept:

```text
Search

Filters

Active filter chips

Reset filters
```

Do not invent new Early Signal-specific filter dimensions.

Do not add:

```text
Signal confidence

Cluster readiness

Issue probability

Promotion threshold

Story count to Issue
```

The existing Issue-feed filter behavior remains canonical unless a later story changes it.

---

# 13. Residual Discovery Principle

Once Issues exist, the full five-block Early Signal composition is **not mandatory**.

The source explicitly allows:

```text
Residual discovery framing
```

rather than a full duplicate pre-cluster dashboard.

This means M140 should preserve only enough discovery UI to communicate:

```text
some civic material is still forming
```

without overwhelming the Issue feed.

---

# 14. State B — ESD-I-residual

## Name

```text
Issue Feed + Residual Discovery
```

## Purpose

Shows the canonical mixed state:

```text
confirmed Issues are visible

and

some civic patterns remain provisional
```

---

# 15. Recommended Residual Discovery Content

Use a restrained subset of the Early Signal system.

Preferred components:

```text
small discovery context strip

one compact Emerging Signals area

small "What’s still forming" / equivalent contextual area

optional contribution affordance
```

Do not automatically render all five original discovery blocks.

---

# 16. Residual Network Pulse

Network Pulse is optional in the mixed state.

If included, keep it extremely compact.

Default behavior remains:

```text
copy-only
```

unless sibling-approved metrics exist.

Do not suddenly introduce KPI cards merely because Issues now exist.

---

# 17. Residual Emerging Signals

Emerging Signals may continue to appear.

They must retain M138 semantics:

```text
Emerging signal

Provisional — may change
```

Their styling remains:

```text
lighter

less authoritative

less metadata-heavy
```

than confirmed Issue cards.

No Emerging Signal should visually resemble an Issue.

---

# 18. Residual Coverage / What’s Missing

A compact uncertainty/coverage message may remain.

Purpose:

```text
Show that the network still has incomplete areas of understanding.
```

Do not turn it into:

```text
coverage %

progress meter

remaining Story count

recruitment target
```

---

# 19. Residual Contribution CTA

If a contribution CTA is included, use the canonical existing action:

```text
Submit a story
```

Destination:

```text
VITE_STORY_GPT_URL
```

Type:

```text
External DOGEstonia GPT handoff
```

Do not create an in-app composer.

The CTA should remain secondary to browsing confirmed Issues.

---

# 20. Recommended Residual Framing Copy

Canonical source placeholder:

```text
Issues emerging · discovery continues for what is still forming
```

This may appear as:

```text
small contextual strip

section eyebrow

quiet explanatory line
```

It must not become a marketing slogan.

The copy should communicate product continuity, not celebration.

---

# 21. State C — ESD-I-event

## Name

```text
First Issue Emergence
```

## Purpose

Defines the moment when the system moves from:

```text
zero confirmed Issues
```

to:

```text
first confirmed Issue
```

The transition should feel meaningful because the collective picture has produced its first stable civic object.

But it must not feel like:

```text
a game reward

an unlock animation

a milestone counter
```

---

# 22. First-Issue Narrative

The user should understand:

```text
A confirmed Issue has emerged from the broader civic picture.
```

Possible quiet supporting framing:

```text
The first confirmed Issue is now visible.
Discovery continues for other Stories still taking shape.
```

This is directional copy; final runtime text may be refined later.

Do not claim:

```text
We reached the goal.

Issue unlocked!

Level complete!

You did it!

10 Stories created an Issue.
```

---

# 23. First-Issue Visual Treatment

Allowed:

```text
subtle emphasis around the new Issue card

short contextual highlight

quiet transition marker

temporary "first confirmed Issue" helper text
```

Avoid:

```text
confetti

large success hero

fireworks

trophy

progress completion animation

countdown hitting zero

celebratory badge
```

The visual meaning should be:

```text
new civic structure became visible
```

not:

```text
the user won
```

---

# 24. Transition Model

Show as a compact reference:

```text
Mode D
Collective Picture Emerging

↓

First confirmed Issue

↓

ESD-I

Issue feed primary
+
Residual discovery
```

Add explicit note:

```text
No hard shell switch.
```

The same `/board` experience continues.

---

# 25. No Hard-Cut Product Switch

Do not show:

```text
OLD PRODUCT
→
NEW PRODUCT
```

or a completely different page shell.

Header, footer, navigation and board identity remain stable.

The change happens inside the board content model.

Canonical rule:

```text
Discovery matures into Issue visibility.
It does not disappear behind a route change.
```

---

# 26. Relationship to M132

M132 remains the confirmed Issue feed visual and functional baseline.

M140 must preserve recognizable:

```text
Issue list/card anatomy

search

filters

open issue affordance

load/error conventions

public shell
```

M140 adds only the discovery continuum around that baseline.

It does not redesign the Issue feed.

---

# 27. Relationship to M136

M136 governs:

```text
zero confirmed Issues
```

M140 governs:

```text
one or more confirmed Issues
```

Transition:

```text
M136 Mode D

↓

first confirmed Issue

↓

M140 / ESD-I
```

---

# 28. Relationship to M137

M137 defines Network Pulse.

In M140:

```text
Pulse is optional / residual
```

If present, it must keep the honest-data rules:

```text
no invented metrics

no completeness %

no Voices requirement

no trending claims
```

---

# 29. Relationship to M138

M138 defines Emerging Signals.

In M140:

```text
Emerging Signals may coexist with confirmed Issues
```

but retain provisional treatment.

This coexistence is important:

```text
one part of the civic picture may be confirmed

while another part is still forming
```

---

# 30. Relationship to M139

M139 defines:

```text
The Picture Is Forming

What’s Missing

Help Complete the Picture
```

In M140 these may appear only in compact residual form.

Do not require the full trio if it competes with confirmed Issues.

---

# 31. Honest Data Rule

M140 must not introduce new data claims merely because confirmed Issues exist.

Do not invent:

```text
Issue emergence rate

Signal conversion rate

Stories-to-Issue ratio

average Stories per Issue

discovery completeness

cluster confidence

remaining Issue count
```

No new metric API contract is defined by this artboard.

---

# 32. No Promotion Threshold UI

Do not display:

```text
5 Stories → Issue

80% confidence → Issue

Promotion threshold met

Signal promoted

Ready for Issue
```

The clustering/promotion algorithm is not defined as a user-facing UI rule here.

Canonical rule:

```text
Issue emergence is observed as product state,
not exposed as a game threshold.
```

---

# 33. No Small-N Certainty Claims

Do not use:

```text
Trending

Majority

Consensus

Top issue

Most important

Most citizens agree
```

unless later verified product/data contracts explicitly authorize those claims.

---

# 34. Offers / Solutions Scope

The package source states Offers / Solutions are out of scope for Early Signal mockups.

Therefore M140 must not introduce:

```text
Offer a solution

Submit offer

Provider match

Mini tender

Solution vote
```

as part of this artboard.

Even though confirmed Issues are now visible, this specific ESD-I sheet documents the **discovery-to-Issue continuum**, not the future Offers feature.

---

# 35. Issue Feed vs Residual Discovery Layout

Recommended desktop hierarchy:

```text
┌──────────────────────────────────────────────┐
│ Context strip                               │
│ Issues emerging · discovery continues...    │
├──────────────────────────────────────────────┤
│                                              │
│ CONFIRMED ISSUE FEED                         │
│ primary surface                              │
│                                              │
├───────────────────────┬──────────────────────┤
│ Emerging Signals      │ What’s still forming│
│ provisional / compact │ residual coverage   │
├───────────────────────┴──────────────────────┤
│ optional contribution affordance             │
└──────────────────────────────────────────────┘
```

This is conceptual, not a fixed pixel grid.

---

# 36. Alternative Desktop Layout

Allowed:

```text
main column:
confirmed Issue feed

narrow secondary rail:
residual discovery
```

Requirements:

```text
Issue feed retains primary width.

Residual discovery does not look like a personal dashboard sidebar.

No dual navigation sidebar.

No full five-block duplication.
```

---

# 37. Narrow / Mobile Behavior

Recommended order:

```text
Context strip

↓

Confirmed Issue feed

↓

Residual Emerging Signals

↓

Residual What’s Missing / discovery context

↓

Optional Submit a story CTA
```

Issue feed stays primary.

Do not place provisional content above confirmed Issues unless a specific future product requirement demands it.

---

# 38. Mobile Requirements

```text
Single column.

No horizontal board columns.

Issue cards remain readable.

Emerging Signal cards retain provisional badge.

No dense side rail.

No horizontal discovery carousel.

Minimum touch targets ≥44px.

CTA stacks cleanly.

ETM cultural layer simplifies before content.
```

---

# 39. First-Issue Event on Mobile

Keep extremely restrained.

Possible:

```text
small contextual line above first Issue card
```

Example directional framing:

```text
First confirmed Issue
```

No full-screen celebration.

No modal.

No forced scroll.

No auto-navigation.

---

# 40. Visual Language

Use the established DOGEstonia public board language:

```text
deep Night / blue-black surfaces

charcoal panels

thin borders

white primary type

muted secondary type

Signal Orange / yellow for primary action and active navigation

green/red only for valid semantic states where already defined

Estonian textile layer as non-semantic framing
```

The mixed state should feel:

```text
mature

operational

continuous

epistemically honest

civic
```

---

# 41. Estonian Cultural Layer

Reuse the existing canon.

Allowed:

```text
ETM-FLORAL header/footer separators

ETM-STRIPE shell rail

thin stripe accent on confirmed Issue cards where already established
```

Emerging Signal styling may keep its own restrained provisional visual language.

Do not use textile motifs to encode:

```text
Issue confirmation

signal strength

promotion

coverage

priority
```

Canonical rule:

```text
Cultural layer identifies place.
Functional layer identifies state.
```

---

# 42. Issue vs Emerging Visual Contrast

Artboard should include a compact comparison.

## Confirmed Issue

```text
structured card

Issue ID

status badge

title

summary

label chips

location · date

Open issue →
```

## Emerging Signal

```text
provisional badge

pattern title

supporting explanation

Provisional — may change

no Issue ID

no Issue status

no Open issue action
```

Add:

```text
Level 2 ≠ Level 3
```

---

# 43. Interaction Model

## Confirmed Issue

Interactive:

```text
Open issue →
```

Destination:

```text
/issue/:id
```

## Emerging Signal

Default:

```text
informational / non-interactive
```

No detail route is defined by this package.

## Contribution

Optional:

```text
Submit a story ↗
```

External DOGEstonia GPT handoff.

---

# 44. Search / Filter Behavior

Search and filter controls remain tied to the confirmed Issue feed contract.

Residual discovery must not silently repurpose them.

Do not imply that existing Issue filters also filter Emerging Signals unless a later explicit product decision says so.

This distinction should be annotated if both appear in the same artboard.

---

# 45. Loading / Error Boundary

M140 does not redefine the M132 board loading and load-error patterns.

Preserve established board behavior.

Do not fabricate residual discovery content if the board cannot load.

If only residual discovery data is unavailable while Issue feed data exists, the Issue feed should remain usable where implementation permits.

A dedicated partial-failure pattern is not defined in this artboard.

---

# 46. Privacy

Confirmed Issue content follows existing public Issue rules.

Residual discovery must remain:

```text
aggregated

provisional

non-personal
```

Never display:

```text
private Story authors

phone numbers

emails

personal contact suggestions

raw private Story content

identity details
```

---

# 47. Accessibility

Requirements:

```text
WCAG AA minimum contrast

semantic section hierarchy

confirmed Issue and Emerging Signal labels readable as text

no Level distinction by color alone

keyboard-accessible Issue actions

visible focus

external handoff announced where present

single-column logical mobile order

screen-reader labels for icon-only controls

reduced-motion safe
```

The transition from first Issue to mixed continuum must remain understandable without animation.

---

# 48. Motion

Allowed:

```text
subtle appearance of first Issue

quiet residual discovery reveal

soft transition in section layout
```

Not allowed:

```text
unlock animation

confetti

progress completion

large counter animation

celebratory burst

flashing "first Issue"
```

---

# 49. Localization

Artboard language:

```text
English
```

Supported product locales:

```text
EN

ET

RU
```

Suggested conceptual namespaces:

```text
earlySignal.continuum.*

earlySignal.residual.*

earlySignal.firstIssue.*
```

Reuse existing:

```text
publicHome.board.*

earlySignal.emerging.*

earlySignal.help.*
```

where appropriate.

Do not duplicate existing Issue-feed localization keys.

Exact key names remain for implementation intake.

---

# 50. Artboard Composition

Recommended sheet:

```text
PRIMARY / LARGE
ESD-I-residual
full mixed desktop state

SECONDARY
ESD-I-feed
regression/reference state

FOCUSED CALLOUT
ESD-I-event
first-Issue emergence

NARROW
mobile mixed state
```

Compact side panels only:

```text
Continuum Model

Issue vs Emerging

Regression Lock

Anti-Patterns

Responsive Behavior

Traceability
```

Runtime UI must dominate the canvas.

---

# 51. State A Artboard Requirements — ESD-I-feed

Show:

```text
existing Issue feed primary

recognizable M132 card anatomy

search + filters

public shell

no mandatory full discovery composition
```

Annotation:

```text
Regression lock: confirmed Issue feed remains intact.
```

---

# 52. State B Artboard Requirements — ESD-I-residual

Show:

```text
Issue feed primary

small residual discovery context

at least one clearly provisional Emerging Signal example

optional compact What’s Missing framing

optional Submit a story external CTA
```

Add the continuum copy:

```text
Issues emerging · discovery continues for what is still forming
```

---

# 53. State C Artboard Requirements — ESD-I-event

Show:

```text
transition from Mode D / zero Issues

↓

first confirmed Issue appears

↓

Issue feed + residual discovery
```

Add explicit rule:

```text
Meaningful, not gamified.
```

---

# 54. Regression Lock Panel

Include:

```text
✓ Existing Issue cards remain recognizable

✓ Open issue → remains

✓ Search remains

✓ Filters remain

✓ /board remains

✓ M129 / M131 shell remains
```

No regression into:

```text
✕ status-column board

✕ cluster carousel

✕ map-first dashboard

✕ KPI dashboard
```

---

# 55. Residual Discovery Rules Panel

Include:

```text
✓ Discovery may remain after Issues exist

✓ Full five-block composition is optional

✓ Emerging Signals remain provisional

✓ Confirmed Issues remain Level 3

✓ Issue feed has priority

✓ Contribution may remain available
```

---

# 56. Anti-Pattern Panel

Include:

```text
✕ Hard route switch

✕ Discovery disappears completely

✕ Emerging Signal styled as Issue

✕ First Issue unlock animation

✕ N Stories to Issue

✕ Confidence %

✕ Trending / majority / consensus

✕ Offers / Solutions

✕ Invented APIs
```

Canonical rule:

```text
The board matures continuously.
It does not manufacture certainty or gamify emergence.
```

---

# 57. CTA Routing

If shown:

```text
Submit a story

↓

External handoff

↓

VITE_STORY_GPT_URL

↓

DOGEstonia GPT
```

No in-app compose.

---

# 58. Future Testability Notes

Possible future stable selectors:

```text
data-testid="board-issue-feed"

data-testid="board-residual-discovery"

data-testid="first-issue-emergence"
```

The parent Early Signal discovery root remains conceptually associated with:

```text
data-testid="board-early-signal-discovery"
```

These are future UAT/FE recommendations only.

---

# 59. Traceability

Functional code:

```text
ESD-I
```

Mockup:

```text
M140
```

Package:

```text
ADMIN-ESD-01
```

Future story:

```text
ES-05
```

Route:

```text
/board
```

Depends on / related:

```text
M129 — Public Header Chrome

M131 — Public Footer Chrome

M132 — Public Board Home Feed

M136 — Early Signal Discovery Composition

M137 — Network Pulse

M138 — Emerging Signals

M139 — Coverage Trio

M134 — Button System
```

Source:

```text
UX-PROMPTS.md
Early Signal / Pre-Cluster Discovery
```

---

# 60. Out of Scope

M140 must not define:

```text
Offers / Solutions

provider matching

mini-tender flow

new Issue APIs

new Emerging Signal APIs

clustering algorithm

promotion threshold

confidence score

Issue-emergence formula

unique-person / Voices metrics

personal /dashboard

in-app Story editor

Issue detail redesign

new public shell

new filter dimensions
```

---

# 61. Implementation Acceptance Intent

When eventually implemented, the continuum should pass product review if:

```text
At least one confirmed Issue renders through the recognizable Issue feed.

The board stays on /board.

Public shell remains unchanged.

Issue feed is primary.

Residual discovery may remain for still-forming material.

Emerging Signals remain visibly provisional.

The first Issue emergence feels meaningful but not celebratory.

No Story-count threshold is shown.

No confidence/completeness metric is invented.

No Offers / Solutions appear.

Mobile preserves Issue-first hierarchy.
```

---

# 62. Artboard Validation Checklist

The generated PNG must visibly confirm:

```text
✓ ESD-I-feed

✓ ESD-I-residual

✓ ESD-I-event

✓ confirmed Issue feed recognizable

✓ Issue ID + status + title + summary + labels + meta + Open issue →

✓ residual discovery secondary

✓ Emerging signal

✓ Provisional — may change

✓ first-Issue emergence reference

✓ /board continuity

✓ mobile Issue-first hierarchy

✕ no hard shell switch

✕ no Issue unlock meter

✕ no confidence %

✕ no fake metrics

✕ no Offers / Solutions
```

---

# 63. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
The first confirmed Issue does not end discovery.

The public board remains the same product surface.

Confirmed Issues become the primary content.

Other civic material may still be forming.

Emerging Signals remain visibly provisional.

The system can hold certainty and uncertainty at the same time.

The transition to the first Issue is meaningful, but never gamified.
```

Canonical mental model:

```text
Stories are forming a picture.

↓

One part becomes clear enough to appear as an Issue.

↓

The Issue feed becomes primary.

↓

The rest of the picture keeps forming.
```

Not:

```text
Issue unlocked.

↓

Discovery complete.

↓

Switch products.
```

The final visual should feel like a mature civic continuum: confirmed structure appears where evidence supports it, while uncertainty remains visible and legitimate everywhere else.
