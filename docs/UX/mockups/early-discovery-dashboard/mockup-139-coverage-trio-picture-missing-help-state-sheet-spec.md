# File Name

```text
mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md
```

# Mockup 139 Spec — Coverage Trio: Picture Forming + What’s Missing + Help Complete — State Sheet

**Functional code:** ESD-C  
**Mockup:** M139  
**Package:** ADMIN-ESD-01 / Early Signal Dashboard — Pre-Cluster Discovery  
**Future story:** ES-04  
**Version:** v1.0  
**Status:** Proposed Active SSOT  
**Area:** Public Board / Early Signal Discovery  
**Host route:** `/board`  
**Priority:** MUST  
**Parent composition:** M136 — Early Signal Discovery Composition  
**Related artboards:** M137 ESD-P · M138 ESD-E · ESD-I  
**Target folder:** `spa-app/docs/UX/mockups/early-signal-dashboard/`

---

# 1. Purpose

This artboard defines the canonical DOGEstonia **coverage trio** used inside Early Signal / Pre-Cluster discovery on the public `/board` route.

The trio contains exactly three conceptual functions:

```text
The Picture Is Forming

What’s Missing

Help Complete the Picture
```

Together they answer three different questions:

```text
What are we beginning to see?

↓

What do we still not understand well?

↓

How can another civic perspective help?
```

The trio must feel like one coherent civic-discovery sequence, not three unrelated dashboard cards.

Canonical product rule:

```text
Discovery should expose both emerging understanding and remaining uncertainty,
then offer a truthful way to contribute.
```

---

# 2. Product Context

The full Early Signal discovery composition defined by M136 contains five conceptual blocks:

```text
Network Pulse

The Picture Is Forming

Emerging Signals

What’s Missing

Help Complete the Picture
```

M139 isolates the final three coverage-oriented functions:

```text
The Picture Is Forming

What’s Missing

Help Complete the Picture
```

Their shared role is **coverage and participation**.

They do not define:

```text
confirmed Issues

clustering thresholds

Offers / Solutions

provider matching

personalized outreach
```

The host remains:

```text
/board
```

No new route is introduced.

---

# 3. Screen / Artboard Type

Type:

```text
Focused multi-block state sheet
```

Required states:

```text
ESD-C-default

ESD-C-cta

ESD-C-narrow
```

Only one runtime layout is active at a time.

The states describe:

```text
default desktop composition

CTA-emphasis behavior

narrow/mobile reflow
```

---

# 4. State Matrix

| State | Meaning | Required |
|---|---|---|
| `ESD-C-default` | All three coverage functions visible | Clear distinction + coherent flow |
| `ESD-C-cta` | Contribution action emphasized | External DOGEstonia GPT handoff |
| `ESD-C-narrow` | Narrow/mobile reflow | Three functions remain distinct when stacked |

---

# 5. Core Semantic Model

The trio is intentionally sequential.

## Function 1 — Interpretation

```text
The Picture Is Forming
```

Communicates:

```text
The network is beginning to see relationships across civic Stories.
```

It is about what is becoming visible.

---

## Function 2 — Uncertainty / Coverage Gap

```text
What’s Missing
```

Communicates:

```text
Some dimensions of the collective picture are still lightly represented or unclear.
```

It is about what remains unknown.

---

## Function 3 — Civic Contribution

```text
Help Complete the Picture
```

Communicates:

```text
Another real Story may improve collective understanding.
```

It is about participation.

Canonical sequence:

```text
Interpretation

↓

Uncertainty

↓

Contribution
```

---

# 6. Critical Product Distinction

The trio must not collapse into:

```text
progress tracking
```

or:

```text
network growth mechanics
```

Do not frame it as:

```text
we are X% complete

N Stories remain

unlock the first Issue

recruit more users

fill all categories
```

Instead:

```text
The system shows what it can see,
what it cannot yet see clearly,
and how another Story may help.
```

---

# 7. State A — ESD-C-default

## Name

```text
Default Coverage Trio
```

## Purpose

Shows the three functions together in their standard desktop relationship.

All three must be visible and distinguishable.

---

# 8. Block 1 — The Picture Is Forming

## Title

Exact:

```text
The Picture Is Forming
```

## Purpose

Communicate that Stories are beginning to create a shared field of understanding.

The block should answer:

```text
What is becoming visible?
```

without claiming that a confirmed Issue already exists.

---

## Content Model

Use restrained explanatory copy.

Recommended semantic direction:

```text
Different Stories are beginning to reveal relationships across shared experiences.
```

or:

```text
The network is beginning to see where experiences may connect.
```

These are directional copy patterns, not hard-coded final localization unless separately approved.

---

## Visual Model

Allowed:

```text
abstract Story nodes

soft overlaps

partial relationship lines

small grouped fields

unfinished shared contours
```

The visual should look more connected than Network Pulse but less authoritative than an Emerging Signal card.

---

## Do Not Show

```text
Issue ID

Issue status

confirmed cluster boundary

confidence %

completion %

trend arrow

majority claim
```

Canonical rule:

```text
The picture may be forming before the system can name a stable Issue.
```

---

# 9. Picture Forming — Relationship to Emerging Signals

This block is broader than ESD-E.

It may show:

```text
relationship hints
```

even when:

```text
no explicit Emerging Signal card is ready
```

Therefore:

```text
Picture Forming ≠ Emerging Signals
```

The Picture block visualizes an incomplete field.

Emerging Signals surface named provisional patterns only when appropriate.

---

# 10. Block 2 — What’s Missing

## Title

Exact:

```text
What’s Missing
```

## Purpose

Communicate that the collective picture remains incomplete.

The block answers:

```text
Which dimensions are still under-heard or unclear?
```

without identifying specific people or manufacturing a completeness score.

---

# 11. Allowed Coverage Dimensions

The source permits abstract framing around dimensions such as:

```text
topics

areas

languages
```

and more generally:

```text
types of experience
```

These are conceptual examples.

M139 must not assume that all dimensions are available as verified live data.

If the product lacks an approved data contract, present them as **abstract coverage categories**, not measured production metrics.

---

# 12. Missing-Dimension Presentation

Preferred visual treatment:

```text
small quiet coverage markers

muted category rows

soft gaps in a field

outlined slots

abstract unfilled areas
```

Possible abstract examples:

```text
Some areas are lightly represented.

Some topics are still unclear.

Some language perspectives may be under-heard.
```

Do not use those as factual claims unless supported by actual data.

The artboard may mark them:

```text
Illustrative coverage framing
```

where necessary.

---

# 13. No Personal Targeting

Never show:

```text
specific residents

names

avatars

emails

phone numbers

contact lists

"invite these people"

"we need Russian speakers from X street"

individual contribution histories
```

Canonical rule:

```text
What’s Missing describes the collective picture,
not missing people.
```

---

# 14. No Completeness Percentage

Never show:

```text
Coverage 72%

Picture 68% complete

Understanding 55%

3/5 perspectives covered
```

unless a future explicit contract defines a legitimate, interpretable metric.

For M139:

```text
NO completeness metric
```

---

# 15. No Countdown Mechanics

Do not show:

```text
3 more Stories needed

2 more perspectives to unlock Issue

Almost complete

Next Issue at 10 Stories
```

The block communicates uncertainty, not a target counter.

---

# 16. Block 3 — Help Complete the Picture

## Title

Exact:

```text
Help Complete the Picture
```

## Purpose

Provide a clear civic-contribution action after the system has shown both:

```text
what is forming

and

what remains unclear
```

The CTA should feel like:

```text
contribute another real perspective
```

not:

```text
grow the network
```

---

# 17. Primary CTA

Canonical CTA:

```text
Submit a story
```

Alternative source copy:

```text
Tell another story
```

For M139 use:

```text
Submit a story
```

to remain aligned with the current Public Home shell.

---

# 18. CTA Destination

The CTA uses the existing DOGEstonia external GPT handoff pattern.

Destination source:

```text
VITE_STORY_GPT_URL
```

Type:

```text
External handoff
```

Use M134 button semantics:

```text
Hierarchy: Primary

Intent: External

Trailing affordance: external-link glyph
```

Optional helper:

```text
Opens DOGEstonia GPT
```

---

# 19. CTA Must Not Open In-App Compose

Explicit prohibition:

```text
Submit a story
```

must not open:

```text
local compose form

/story/compose

inline Story editor

modal Story editor
```

The existing GPT entry model remains canonical.

---

# 20. Contribution Tone

Allowed:

```text
Another perspective may help clarify the picture.

Share another real experience.

Help the network understand what is still forming.
```

Avoid:

```text
Invite friends

Grow the network

Recruit contributors

Reach the next level

Unlock an Issue

Earn reputation

Complete the map
```

Canonical rule:

```text
Participation is civic contribution,
not referral gamification.
```

---

# 21. State B — ESD-C-cta

## Name

```text
CTA Emphasis
```

## Purpose

Demonstrates the contribution action as the strongest interactive element in the trio.

This state does not change product semantics.

It only clarifies hierarchy.

---

## CTA Hierarchy

The CTA should be:

```text
visually dominant within the Help Complete block
```

but not dominate the entire `/board` route.

Use:

```text
DOGEstonia yellow / Signal Orange primary button
```

Do not introduce a second primary CTA inside the trio.

---

## Supporting Copy

Keep concise.

Recommended structure:

```text
Help Complete the Picture

[one or two lines of explanatory copy]

[Submit a story ↗]

Opens DOGEstonia GPT
```

Do not add:

```text
signup requirement

reward claim

submission count

urgency countdown
```

---

# 22. CTA Interaction Requirements

Must support:

```text
mouse

keyboard

touch

screen reader
```

External behavior should be clear.

Accessible label should communicate the handoff when useful:

```text
Submit a story. Opens DOGEstonia GPT.
```

---

# 23. State C — ESD-C-narrow

## Name

```text
Narrow / Mobile Coverage Trio
```

## Purpose

Defines responsive reflow while preserving the distinction between the three conceptual functions.

---

## Mobile Order

Use:

```text
The Picture Is Forming

↓

What’s Missing

↓

Help Complete the Picture
```

Do not change order.

---

## Mobile Layout

Each function becomes a full-width section.

Recommended:

```text
one stacked block per function

clear heading

short supporting copy

simple visual

full-width CTA in Help block
```

---

## Mobile Requirements

```text
No horizontal carousel.

No tiny three-column cards.

No clipped coverage labels.

No collapsed meaning.

CTA touch target ≥44px.

No ornament competing with text.

No horizontal data visualization dependency.
```

---

# 24. Visual Language

Use the established M136 Early Signal visual system.

```text
deep Night / blue-black shell

charcoal surfaces

thin borders

white primary copy

muted secondary copy

Signal Orange / DOGEstonia yellow for primary action

quiet abstract discovery visualization

enterprise civic-tech clarity
```

The trio should feel:

```text
thoughtful

incomplete

participatory

non-judgmental

trustworthy
```

Avoid:

```text
marketing cards

growth funnel

campaign page

social referral widget

game progression

bright analytics dashboard
```

---

# 25. Estonian Cultural Layer

Inherit the restrained textile layer.

Allowed:

```text
ETM-FLORAL as a thin section divider

ETM-STRIPE as a short edge accent
```

Prefer the cultural layer at:

```text
section boundaries

outer composition frame
```

not inside functional data or CTA controls.

Do not put motifs:

```text
inside button icons

inside coverage markers

inside status labels

as data encoding
```

Canonical rule:

```text
Cultural motifs frame the discovery experience.
They do not encode coverage.
```

---

# 26. Composition Relationship

The three blocks should not look equal merely because there are three of them.

Recommended visual hierarchy:

```text
The Picture Is Forming
largest interpretive surface

What’s Missing
secondary coverage surface

Help Complete the Picture
compact action surface with clear primary CTA
```

This creates:

```text
understanding

↓

uncertainty

↓

action
```

rather than:

```text
three equal feature cards
```

---

# 27. Suggested Desktop Composition

Conceptual structure:

```text
┌────────────────────────────────────────────────────┐
│ THE PICTURE IS FORMING                             │
│                                                    │
│     abstract relationship / shared field           │
│                                                    │
├───────────────────────────┬────────────────────────┤
│ WHAT'S MISSING            │ HELP COMPLETE          │
│                           │ THE PICTURE            │
│ coverage / uncertainty    │ supporting copy        │
│                           │ [Submit a story ↗]      │
└───────────────────────────┴────────────────────────┘
```

This is a hierarchy guide, not a rigid pixel grid.

---

# 28. Suggested Narrow Composition

```text
┌───────────────────────┐
│ The Picture Is Forming│
└───────────────────────┘

┌───────────────────────┐
│ What’s Missing        │
└───────────────────────┘

┌───────────────────────┐
│ Help Complete         │
│ the Picture           │
│                       │
│ Submit a story ↗      │
└───────────────────────┘
```

---

# 29. Relationship to Network Pulse

Network Pulse answers:

```text
Is anything happening?
```

The Picture Is Forming answers:

```text
What relationships are becoming visible?
```

These roles must remain distinct.

M139 must not add Pulse metrics or duplicate M137.

---

# 30. Relationship to Emerging Signals

Emerging Signals answers:

```text
Can the system name a provisional pattern yet?
```

The Picture Is Forming may exist before the answer is yes.

M139 therefore must not force:

```text
named provisional signal cards
```

inside the Picture block.

Those belong to M138.

---

# 31. Relationship to ESD-I

When confirmed Issues exist:

```text
Issue feed becomes primary
```

and discovery may remain residually.

That continuum belongs to:

```text
ESD-I
```

M139 does not define Issue-feed placement.

---

# 32. Honest Data Rule

M139 must not invent:

```text
coverage API

coverage percentage

language counts

topic counts

regional counts

representation score

under-heard score

confidence score
```

If no verified data contract exists, use qualitative/abstract framing only.

Canonical rule:

```text
Unknown coverage is represented as uncertainty,
not as fabricated analytics.
```

---

# 33. Prohibited Small-N Claims

Do not use:

```text
Trending

Majority

Consensus

Top missing topic

Most underrepresented

Most requested
```

unless later product/data contracts establish valid statistical semantics.

---

# 34. Anti-Gaming Rules

Never display:

```text
N more Stories

progress to Issue

unlock target

participation streak

referral count

coverage completion score

contribution points
```

The trio must remain civic and epistemic, not game-like.

---

# 35. Offers / Solutions Rule

No Offers / Solutions in M139.

Do not show:

```text
Offer a solution

Provide a service

Bid

Tender

Match provider
```

The surface is pre-Issue.

---

# 36. Privacy

Allowed:

```text
aggregated abstract gaps

non-personal category framing

general area/topic/language concepts
```

Never show:

```text
personal contacts

identifiable contributors

individual Story authors

private profile data

raw Story attribution
```

---

# 37. Interaction Model

## The Picture Is Forming

Default:

```text
informational / non-interactive
```

## What’s Missing

Default:

```text
informational / non-interactive
```

unless future contracts define drilldown.

## Help Complete the Picture

Interactive through:

```text
Submit a story
```

Do not make decorative coverage elements look clickable.

---

# 38. Accessibility

Requirements:

```text
WCAG AA contrast

semantic headings for each block

logical reading order

CTA accessible by keyboard

external handoff communicated

no meaning through color alone

visualization has equivalent explanatory text

mobile remains readable

reduced-motion safe
```

If visual gap markers are decorative, hide them from assistive technology.

---

# 39. Motion

Allowed only as subtle enhancement:

```text
soft relationship line appearance

gentle fade

quiet reveal of abstract gap markers
```

Avoid:

```text
animated completion

count-up

pulse-to-unlock

celebratory CTA animation

urgent blinking missing areas
```

---

# 40. Localization

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

Suggested namespaces:

```text
earlySignal.picture.*

earlySignal.missing.*

earlySignal.help.*
```

Possible conceptual keys:

```text
earlySignal.picture.title

earlySignal.picture.body

earlySignal.missing.title

earlySignal.missing.body

earlySignal.help.title

earlySignal.help.body

earlySignal.help.submit
```

Exact keys remain for implementation intake.

Do not show all three language variants on this artboard.

---

# 41. Artboard Composition

Recommended sheet layout:

```text
PRIMARY / LARGE
ESD-C-default

SECONDARY
ESD-C-cta

NARROW / MOBILE
ESD-C-narrow
```

Compact side panels:

```text
Three-Function Model

CTA Routing

Honest Coverage Rules

Privacy

Responsive Behavior

Traceability
```

Runtime UI examples must occupy most of the artboard.

---

# 42. Required Artboard Labels

Show:

```text
ESD-C-default

ESD-C-cta

ESD-C-narrow
```

The default state should clearly demonstrate all three blocks.

---

# 43. CTA Routing Panel

Show:

```text
Submit a story

↓

External handoff

↓

VITE_STORY_GPT_URL

↓

DOGEstonia GPT
```

Explicit note:

```text
No in-app Story compose.
```

---

# 44. Coverage Rules Panel

Include:

```text
✓ Show uncertainty honestly

✓ Abstract areas/topics/languages allowed when supported

✓ No personal contacts

✓ No completeness %

✓ No Story countdown

✓ No majority / consensus

✓ No fake metrics
```

---

# 45. Anti-Pattern Panel

Include:

```text
✕ 72% complete

✕ 3 Stories remaining

✕ Unlock Issue

✕ Invite 5 friends

✕ Majority missing

✕ Contact these residents

✕ Offer a solution

✕ In-app compose
```

Canonical rule:

```text
Coverage is about understanding the civic picture,
not completing a game board.
```

---

# 46. Future Testability Note

Possible future selectors:

```text
data-testid="picture-forming"

data-testid="whats-missing"

data-testid="help-complete-picture"
```

These are recommendations for future FE/UAT stability.

They are not implementation tasks in this UX-artboard phase.

---

# 47. Traceability

Functional code:

```text
ESD-C
```

Mockup:

```text
M139
```

Package:

```text
ADMIN-ESD-01
```

Future story:

```text
ES-04
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

M138 — Emerging Signals

M132 — Public Board Home Feed

ESD-I — Issues + Residual Discovery Continuum
```

Source:

```text
UX-PROMPTS.md
Early Signal / Pre-Cluster Discovery
```

---

# 48. Out of Scope

M139 must not define:

```text
new API fields

coverage DTO

representation score

unique-person metrics

clustering algorithm

promotion thresholds

confirmed Issue feed

Emerging Signal detailed states

Offers / Solutions

provider matching

personal outreach

personal dashboard

in-app Story compose

Story editor
```

---

# 49. Implementation Acceptance Intent

When eventually implemented, the trio should pass product review if:

```text
All three functions are visible and distinct.

The Picture Is Forming communicates partial understanding.

What’s Missing communicates uncertainty without personal targeting.

Help Complete the Picture offers exactly the existing external Story entry.

The CTA goes to DOGEstonia GPT.

No completeness percentage appears.

No Story countdown appears.

No referral mechanics appear.

No Offers / Solutions appear.

Mobile preserves the same conceptual order.
```

---

# 50. Artboard Validation Checklist

The generated PNG must visibly confirm:

```text
✓ ESD-C-default

✓ ESD-C-cta

✓ ESD-C-narrow

✓ The Picture Is Forming

✓ What’s Missing

✓ Help Complete the Picture

✓ Submit a story

✓ external GPT handoff

✓ three functions remain distinct

✓ mobile stacks in same order

✕ no completeness %

✕ no N Stories to Issue

✕ no personal contacts

✕ no referral gamification

✕ no Offers / Solutions

✕ no in-app compose
```

---

# 51. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
The system is beginning to see relationships.

It also shows what remains unclear.

Missing coverage is expressed as uncertainty, not as a score.

The product does not identify or target specific missing people.

Another Story can help clarify the picture.

The contribution action uses the existing DOGEstonia GPT handoff.

Nothing is gamified.

Nothing is fabricated.
```

Canonical mental model:

```text
We are beginning to see something.

↓

We are honest about what is still missing.

↓

You can add another real perspective.
```

Not:

```text
We are 72% complete.

↓

We need 3 more Stories.

↓

Unlock the Issue.
```

The final visual should feel like a civic observatory: it reveals partial understanding, makes uncertainty visible, and invites contribution without pressure, manipulation, or false precision.
