# Mockup 135 Spec — Story Submit — Post-Submit Path Choice

**Functional code:** SS-PC
**Mockup:** M135
**Version:** v1.0
**Status:** Proposed Active SSOT
**Area:** Story Submission / Identity & Auth
**Epic:** EPIC-SPA-04 Identity & Auth
**Route:** `/story/submit`
**Priority:** MUST
**Primary traceability:** STORY-SPA-ID-14
**Related:** M128 State F · STORY-SPA-ID-12 · D12-8 · former STORY-SPA-BUG-03
**Supersedes:** current live auto-navigation-to-profile success behavior where conflicting

---

# 1. Purpose

This artboard defines the canonical DOGEstonia browser behavior immediately after a civic story has been successfully submitted.

It is a focused implementation SSOT for the post-submit success decision introduced by BUG-03.

The critical product rule is:

```text
Successful submission does NOT automatically navigate the user away.
```

After:

```http
POST /story-drafts/{draft_id}/submit
```

returns:

```text
HTTP 202

+

submission_id
```

the browser remains on:

```text
/story/submit
```

and renders the terminal success state defined by M128 State F.

The user then explicitly chooses the next destination.

---

# 2. Product Context

The story itself is prepared in DOGEstonia GPT.

The browser submission flow is defined in M128:

```text
GPT creates draft

↓

Browser opens /story/submit?draft_id=<id>

↓

Preview

↓

Submit

↓

Optional phone verification

↓

Submitting

↓

HTTP 202

↓

State F — Story Submitted
```

M135 begins at the final transition:

```text
M128 State E — Submitting

↓

HTTP 202 + submission_id

↓

M135 State F — Submitted

↓

USER CHOOSES NEXT PATH
```

The success state is terminal for the submission operation.

It is not itself a redirect instruction.

---

# 3. BUG-03 Product Lock

Canonical behavior:

```text
202 success

↓

Stay on /story/submit

↓

Render success receipt

↓

Wait for explicit user action
```

Available paths:

```text
Go To Board

↓

/board
```

```text
My Stories

↓

/profile
```

```text
Submit Another

↓

DOGEstonia GPT

↓

VITE_STORY_GPT_URL
```

Explicitly prohibited success behavior:

```text
202

↓

navigate("/profile", {
  state: {
    submittedStoryId: ...
  }
})
```

The profile route must not function as the automatic success screen.

---

# 4. Relationship to M128

M128 remains the canonical full journey:

```text
A–H + E0
```

M135 does not replace the complete M128 journey.

It creates a focused SSOT for:

```text
M128 State E

↓

M128 State F

↓

Post-submit user choice
```

## M128 remains authoritative for

```text
State F title

State F success message

Submission ID presentation

Under review status

Three canonical CTA labels

Overall success visual language
```

## M135 becomes authoritative for

```text
No-auto-redirect rule

CTA routing after success

Stay-on-route behavior

BUG-03 implementation acceptance

Post-submit responsive action hierarchy

Anti-pattern documentation
```

---

# 5. Screen / Artboard Type

Type:

```text
Focused runtime state sheet
```

The artboard should contain:

```text
Primary State F — Submitted

Optional State F Narrow

Small E → F transition callout

Compact implementation side panels
```

Do not recreate:

```text
State A

State B

State C

State D full verification UI

State G

State H

State E0
```

These remain documented by M128.

---

# 6. Artboard Composition

Recommended hierarchy:

```text
LEFT / MAIN AREA

State F — Submitted
large and visually dominant


RIGHT OR LOWER SECONDARY AREA

State F — Narrow / Mobile


SMALL SUPPORTING CALLOUT

State E → HTTP 202 → State F


COMPACT SIDE PANELS

Route & API
Destinations
Privacy
Anti-pattern
Traceability
```

The success screen must dominate the artboard.

Do not allow documentation panels to become visually larger than the actual runtime UI.

---

# 7. Visual Language

Use the established epic-04 / M128 visual system.

```text
dark civic-tech operating system aesthetic

deep blue-black / charcoal background

soft glass panels

thin restrained borders

white primary typography

muted grey secondary typography

DOGEstonia yellow accent

enterprise SaaS clarity

Linear / GitHub / Jira discipline
```

Success should feel:

```text
calm

terminal

trustworthy

non-celebratory

operationally complete
```

Avoid:

```text
confetti

fireworks

marketing success hero

large illustration

celebratory green page

toast-only success

neon

crypto

wallet

token

mascot hero

forced redirect countdown

animated "taking you to profile"

gamification
```

---

# 8. Functional Color Rules

DOGEstonia yellow:

```text
Primary CTA

Keyboard focus

High-priority actionable affordance
```

Green:

```text
Success acknowledgement icon only
```

Green must not become the dominant page surface.

Status `Under review` must remain neutral.

Do not represent `Under review` as green-success completion.

The story was successfully submitted, but the civic review process is still pending.

---

# State E-mini — Submitting → Submitted Transition

## Purpose

Small transition reference showing how the focused flow begins.

This is not a full recreation of M128 State E.

---

## Input State

Label:

```text
Submitting…
```

or canonical M128 title:

```text
Submitting Your Story
```

---

## API Transition

Display:

```http
POST /story-drafts/{draft_id}/submit
```

Response:

```text
202 Accepted

submission_id
```

---

## Transition

```text
State E

↓

HTTP 202

↓

State F
```

Critical annotation:

```text
Stay on /story/submit
```

---

## Requirements

Do not show:

```text
/profile redirect

success toast as terminal UI

navigation spinner

countdown

automatic route transition
```

---

# State F — Submitted

## Functional State

```text
M128 State F
```

## Purpose

Terminal success state confirming that the current story submission has completed.

The user remains on `/story/submit`.

---

## Success Icon

Use:

```text
success check inside a restrained green circle
```

or the existing epic-04 success-icon language.

Requirements:

```text
small / medium

clear but non-celebratory

not a trophy

not a badge reward

not an illustration
```

---

## Title

Exact canonical copy:

```text
Story Submitted
```

---

## Message

Exact canonical copy:

```text
Your civic story is now under review.
```

---

# 9. Submission Receipt Metadata

Display a compact receipt block.

## Submission ID Label

```text
Submission ID
```

## Example Value

```text
SUB-847291
```

The example is illustrative only.

Implementation must display the actual returned:

```text
submission_id
```

---

## Copy Affordance

Provide a compact copy control.

Possible presentation:

```text
SUB-847291     [copy icon]
```

Accessible label:

```text
Copy submission ID
```

Optional temporary acknowledgement:

```text
Copied
```

Do not create a modal for copying the ID.

---

## Status Label

Label:

```text
Status
```

Value:

```text
Under review
```

Display as:

```text
neutral status pill

or compact metadata label
```

Do not render as:

```text
green success badge

yellow CTA-like pill

reward badge
```

---

# 10. Primary CTA — Go To Board

Label:

```text
Go To Board
```

Destination:

```text
/board
```

Type:

```text
Internal SPA navigation
```

Hierarchy:

```text
Primary
```

Visual:

```text
DOGEstonia yellow
```

This is the most prominent next-step action because the submission is complete and the public board is the primary public browsing surface.

---

# 11. Secondary CTA — My Stories

Label:

```text
My Stories
```

Destination:

```text
/profile
```

Type:

```text
Internal SPA navigation
```

Hierarchy:

```text
Secondary
```

Important:

```text
/profile is reached only after explicit user selection.
```

This CTA must not depend on:

```text
location.state.submittedStoryId
```

to represent submission success.

---

# 12. Tertiary CTA — Submit Another

Label:

```text
Submit Another
```

Destination:

```text
VITE_STORY_GPT_URL
```

Type:

```text
External DOGEstonia GPT handoff
```

Hierarchy:

```text
Tertiary / link-style
```

Show a restrained external handoff indicator.

Example:

```text
Submit Another ↗
```

Optional helper text:

```text
Opens DOGEstonia GPT
```

Do not make this CTA visually equal to the primary action.

---

# 13. CTA Decision Model

All three actions must be visible simultaneously.

Canonical hierarchy:

```text
PRIMARY

Go To Board


SECONDARY

My Stories


TERTIARY

Submit Another ↗
```

The UI must communicate:

```text
The submission has finished.

Nothing else is required.

The next destination is the user's choice.
```

No action should appear pre-selected.

---

# 14. Critical Runtime Annotation

Place immediately near State F:

```text
No auto-redirect. User chooses.
```

This is a product rule, not merely an implementation note.

Optional visual flow:

```text
              ┌→ Go To Board → /board
              │
Submitted ────┼→ My Stories → /profile
              │
              └→ Submit Another → DOGEstonia GPT
```

---

# State F-Narrow — Mobile / Narrow

## Purpose

Responsive success state for approximately:

```text
390px
```

viewport width.

---

## Content Order

Preserve:

```text
Success icon

Title

Message

Submission ID

Status

Primary CTA

Secondary CTA

Tertiary CTA
```

---

## CTA Layout

Stack vertically:

```text
Go To Board

My Stories

Submit Another ↗
```

Primary and secondary controls should be full width.

Tertiary action may be:

```text
full-width quiet control

or centred link-style action
```

---

## Mobile Requirements

```text
Minimum touch target 44px.

Submission ID remains readable.

Copy control remains independently tappable.

No horizontal overflow.

Status remains visible.

CTA labels must not truncate.

No sticky forced navigation.

No modal success sheet.
```

---

# 15. Route & API Panel

Keep compact.

## Current Route

```text
/story/submit
```

After successful submission:

```text
remain on /story/submit
```

---

## API

```http
POST /story-drafts/{draft_id}/submit
```

Success:

```text
202 Accepted
```

Response contains:

```text
submission_id
```

Conceptual response:

```json
{
  "submission_id": "SUB-847291"
}
```

The exact production DTO remains defined by the Gateway contract.

---

# 16. Destination Panel

Display:

```text
Go To Board

→ /board

Internal
```

```text
My Stories

→ /profile

Internal
```

```text
Submit Another

→ VITE_STORY_GPT_URL

External DOGEstonia GPT
```

---

# 17. Navigation Rules

## Board

Use internal SPA routing.

```text
/board
```

---

## My Stories

Use internal SPA routing.

```text
/profile
```

Navigation occurs only after explicit interaction.

---

## Submit Another

Use the configured external GPT URL.

```text
VITE_STORY_GPT_URL
```

Do not hardcode the public GPT URL into component code.

---

# 18. Anti-Pattern Panel

Title:

```text
Do Not Implement
```

Show:

```text
202

↓

navigate("/profile")

↓

location.state.submittedStoryId
```

Mark clearly as:

```text
✕ NOT CANONICAL
```

Supporting rule:

```text
Success is a visible terminal state, not an automatic route transition.
```

Also prohibit:

```text
Auto-redirect timer

Toast-only success

Immediate profile navigation

Hidden success receipt

Single forced next path
```

---

# 19. Why Auto-Navigation Is Incorrect

The product contract requires three legitimate post-submit paths.

Automatic navigation to `/profile`:

```text
removes user choice

hides the submission receipt too quickly

makes profile behave like a submission-success screen

creates unnecessary coupling between submission flow and profile state

requires navigation-state consumption

contradicts M128 State F
```

Canonical architecture:

```text
Submission owns submission success.

Profile owns profile browsing.

Board owns public browsing.

GPT owns new story creation.
```

---

# 20. Privacy Panel

Allowed to display:

```text
Submission ID

Status: Under review

Generic success message
```

Never display:

```text
access token

refresh token

OTP

raw phone number

authentication credentials

Gateway internal response data

private moderation metadata
```

The success state does not need the original full story content.

---

# 21. Localization

Runtime chrome supports:

```text
EN

ET

RU
```

Proposed namespace:

```text
storyHandoff.success.*

storyHandoff.cta.*
```

Canonical semantic keys should cover:

```text
title

message

submissionIdLabel

copySubmissionId

copied

statusLabel

statusUnderReview

goToBoard

myStories

submitAnother

submitAnotherHint
```

Where matching i18n keys already exist from M128 / ID-12, reuse them.

Do not create duplicate keys solely for M135.

The artboard itself should remain:

```text
English
```

unless a localization-specific sheet is requested separately.

---

# 22. Accessibility

## Success Region

The success result should be announced appropriately after the async submit operation completes.

Recommended semantic pattern:

```text
status / live region appropriate to implementation
```

Avoid aggressive repeated announcement.

---

## Submission ID

Copy button requires accessible name:

```text
Copy submission ID
```

Copied acknowledgement must also be perceivable without relying on colour.

---

## CTAs

Required:

```text
keyboard accessible

visible focus states

logical order

clear route semantics

44px minimum mobile target

external action communicated for Submit Another
```

Tab order:

```text
Go To Board

↓

My Stories

↓

Submit Another
```

---

# 23. Button-System Mapping

Use DS-BTN / M134.

## Go To Board

```text
Hierarchy: Primary
Intent: Navigate
Size: Medium / Large depending viewport
```

## My Stories

```text
Hierarchy: Secondary
Intent: Navigate
```

## Submit Another

```text
Hierarchy: Tertiary / Link
Intent: External
Trailing icon: External link
```

## Copy Submission ID

```text
Form factor: Icon-only
Intent: Local action
Accessible label required
```

Do not introduce new button styling for M135.

---

# 24. Responsive Behaviour

## Desktop

Recommended structure:

```text
Success panel

Metadata receipt

Horizontal or balanced action group
```

Preferred CTA presentation:

```text
Go To Board      My Stories      Submit Another ↗
```

with explicit hierarchy.

---

## Narrow

```text
Success panel

Metadata

Go To Board

My Stories

Submit Another ↗
```

No horizontal CTA compression.

---

# 25. State Mapping

Display:

```text
M128 State E

Submitting

↓

POST /story-drafts/{draft_id}/submit

↓

202 + submission_id

↓

M135 State F

Story Submitted

↓

WAIT
```

Then:

```text
User chooses Go To Board

↓

/board
```

or:

```text
User chooses My Stories

↓

/profile
```

or:

```text
User chooses Submit Another

↓

DOGEstonia GPT
```

Critical:

```text
There is no automatic transition from State F.
```

---

# 26. Traceability

Functional code:

```text
SS-PC
```

Mockup:

```text
M135
```

Primary story:

```text
STORY-SPA-ID-14
```

Former bug (moved):

```text
STORY-SPA-BUG-03
```

Related story:

```text
STORY-SPA-ID-12
```

Decision:

```text
D12-8
```

Related mockup:

```text
M128 — Story Draft Handoff & Submit

State F — Submitted
```

Related design system:

```text
M134 — DOGEstonia Button System
```

Supersedes where conflicting:

```text
Live implementation behavior that automatically navigates to /profile after successful submission.
```

---

# 27. Out of Scope

This artboard intentionally does not define:

```text
Profile consumption of location.state

submittedStoryId profile banner

Profile success banner

BUG-01 P0

Phone OTP UI

M32 verification internals

M37 OTP errors

States A–E full handoff flow

State G

State H

State E0

Story editor

GPT internal UI

Moderation workflow

Detailed My Stories page

Board redesign
```

---

# 28. Implementation Acceptance Criteria

The BUG-03 fix passes when:

```text
POST submit returns 202.

The SPA remains on /story/submit.

State F becomes visible.

Submission ID is displayed.

Submission ID can be copied.

Status displays Under review.

Go To Board is visible.

My Stories is visible.

Submit Another is visible.

No automatic /profile navigation occurs.

Go To Board routes to /board.

My Stories routes to /profile only after click.

Submit Another opens VITE_STORY_GPT_URL.

No location.state.submittedStoryId is required for success rendering.

Mobile layout exposes the same three choices.
```

---

# 29. Artboard Validation Checklist

The generated PNG must visibly confirm:

```text
✓ Story Submitted

✓ Your civic story is now under review.

✓ Submission ID + copy affordance

✓ Under review

✓ Go To Board

✓ My Stories

✓ Submit Another

✓ No auto-redirect. User chooses.

✓ Stay on /story/submit after 202

✓ Board → /board

✓ My Stories → /profile

✓ Submit Another → DOGEstonia GPT

✓ narrow/mobile action stack

✕ no automatic profile redirect

✕ no success toast-only flow

✕ no countdown

✕ no forced path
```

---

# 30. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
The story was successfully submitted.

The success receipt remains visible on /story/submit.

The story is now under review.

The user receives a submission ID.

Nothing automatically redirects them.

The user chooses what to do next:

Board,

My Stories,

or another story through DOGEstonia GPT.
```

Canonical mental model:

```text
Submit succeeded

↓

Receipt shown

↓

User chooses next path
```

Not:

```text
Submit succeeded

↓

Silent teleport to profile
```

The final result should feel like a calm civic receipt: the system confirms what happened, preserves control, and lets the citizen decide where to go next.

```

Когда перейдём к генерации, я бы сделал **State F примерно 65–70% площади артборда**, narrow — около 20%, а API/anti-pattern/traceability оставил компактными инженерными блоками. Так M135 будет именно **focused gate screenshot SSOT**, а не второй перегруженный M128.
```
