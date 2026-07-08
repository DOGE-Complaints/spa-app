# Mockup 128 Spec — Story Draft Handoff & Submit — State Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Story-Draft-Handoff-Submit-state-sheet.png`

**Version:** v1.0

**Status:** Active SSOT

**Epic:** Story Submission

**Story:** STORY-SPA-ID-12

**Priority:** MUST

---

# 1. Purpose

This artboard documents the complete browser-side submission flow after a citizen creates a story inside DOGEstonia GPT.

Unlike M120, which documents the authentication bridge between GPT and DOGEstonia, this specification documents the runtime responsible for reviewing and submitting an already-created draft.

The browser becomes the submission client.

The browser—not GPT—submits the story under the authenticated Supabase session.

This flow guarantees:

- story draft preservation
- explicit review before submission
- one-time phone verification when required
- automatic submission retry after verification
- terminal success inside the SPA

The user never returns to GPT to complete the submission.

---

# 2. Product Context

## Runtime Model

Story creation happens inside DOGEstonia GPT.

GPT stores the draft inside Gateway.

GPT redirects the browser to

```text
/story/submit?draft_id=<id>
```

The browser performs:

```text
Resolve session

↓

Load draft preview

↓

Review

↓

Submit

↓

Phone verification (if required)

↓

Automatic resubmit

↓

Submission completed
```

This is intentionally different from M120.

M120 ends with successful authentication.

M128 ends with successful civic story submission.

---

# 3. Screen Type

Type

```text
Full Journey State Sheet
```

Runtime

Only one state exists at a time.

The artboard documents the complete journey.

States are arranged left-to-right.

Transitions are shown with arrows.

Implementation reference panels appear on the right.

---

# 4. Visual Language

Use the established DOGEstonia visual language.

```text
dark civic-tech operating system aesthetic

black / charcoal surfaces

subtle textured background

soft glassmorphism panels

thin borders

white typography

muted gray secondary text

DOGEstonia yellow accent

enterprise SaaS appearance

Linear / GitHub / Jira clarity
```

Avoid

```text
marketing hero

consumer onboarding

social login funnels

wallet UI

crypto

token balances

mascots

confetti

bright gradients

neon
```

The entire board should resemble production engineering documentation.

---

# 5. Artboard Structure

Display nine runtime states.

Arrange horizontally.

Connect with directional arrows.

Right-side implementation panels:

- Flow Mapping
- Error Mapping
- Route & API
- Privacy
- Principles

---

# State A — Resolving / Checking Session

## Purpose

Initial runtime.

Browser restores session and requests the draft preview.

---

### Title

```text
Preparing Your Story
```

---

### Message

```text
Loading your story draft from DOGEstonia GPT.
```

---

### Context Chip

```text
Story Draft

Preserved

Source: DOGEstonia GPT
```

---

### Visual

Subtle loading placeholders.

Progress indicator.

No heavy spinner.

---

### Requirements

No story content visible yet.

---

# State B — Login Required

## Purpose

User is not authenticated.

Draft remains preserved.

---

### Title

```text
Sign In To Continue
```

---

### Message

```text
Your story draft is saved.

Sign in to preview and submit it.
```

---

### Context Chip

```text
Story Draft

Saved
```

---

### Primary CTA

```text
Sign In
```

---

### Secondary CTA

```text
Create Account
```

---

### Implementation Note

```text
Redirect to /login

↓

Return to

/story/submit?draft_id=<id>
```

---

### Requirements

Draft must never be lost.

---

# State C — Draft Preview

## Purpose

Primary runtime screen.

User reviews the story before submission.

---

### Title

```text
Review Your Story
```

---

### Message

```text
Check your story before submitting.

This is what you built in DOGEstonia GPT.
```

---

### Read-only Preview

Display

```text
Title

Summary

Description

Category

Labels

Institution

Location
```

---

### Language Badge

Example

```text
ET
```

Story content remains in its original language.

Only interface chrome is localized.

---

### Primary CTA

```text
Submit Story
```

---

### Secondary CTA

```text
Not Now
```

---

### Tertiary Navigation

```text
Back To Board
```

---

### Helper Note

```text
You'll confirm your phone once before your first submission.
```

---

### Requirements

Entire draft visible.

Read-only.

No editing.

---

# State D — Verification Required

## Purpose

Phone verification is required before submission.

---

### Title

```text
One Step Before Submitting
```

---

### Message

```text
Verify your phone to submit civic stories.

This keeps DOGEstonia free of bots.
```

---

### Story Context

Do NOT display story content.

Only

```text
Story Draft

Ready
```

---

### Verification Block

Compact card

```text
Phone Verification

↓

See M32
```

Do not redraw OTP UI.

---

### Transition

```text
Verification Success

↓

Automatic Resubmit
```

---

### Requirements

Privacy-first.

Authentication screen only.

---

# State E — Submitting

## Purpose

Browser submits the story.

---

### Title

```text
Submitting Your Story
```

---

### Message

```text
Please wait while DOGEstonia submits your civic story.
```

---

### Context Chip

```text
Story Draft

Ready
```

---

### Visual

Calm progress.

No blocking modal.

---

# State F — Submitted

## Purpose

Terminal success state.

---

### Title

```text
Story Submitted
```

---

### Message

```text
Your civic story is now under review.
```

---

### Metadata

Submission ID

```text
SUB-847291
```

Status

```text
Under Review
```

---

### Primary CTA

```text
Go To Board
```

---

### Secondary CTA

```text
My Stories
```

---

### Tertiary CTA

```text
Submit Another
```

Destination

```text
DOGEstonia GPT
```

---

### Requirements

No Return To ChatGPT button.

Submission already completed.

---

# State G — Draft Expired

## Purpose

Draft is no longer available.

---

### Title

```text
This Draft Is No Longer Available
```

---

### Message

```text
Your story draft expired or was already submitted.
```

---

### Primary CTA

```text
Create A New Story
```

Destination

DOGEstonia GPT.

---

### Secondary CTA

```text
Go To Board
```

---

### Requirements

Single-use drafts.

---

# State H — Service Unavailable

## Purpose

Submission service unavailable.

---

### Title

```text
Submission Temporarily Unavailable
```

---

### Message

```text
We couldn't reach the submission service.

Please try again in a moment.
```

---

### Primary CTA

```text
Try Again
```

---

### Secondary CTA

```text
Back To Board
```

---

### Requirements

Maps HTTP 503.

---

# State E0 — Empty

## Purpose

User opened

```text
/story/submit
```

without

```text
draft_id
```

---

### Title

```text
Start Your Story In DOGEstonia GPT
```

---

### Message

```text
Stories are created in DOGEstonia GPT,

then submitted here.
```

---

### Primary CTA

```text
Open DOGEstonia GPT
```

Destination

```text
VITE_STORY_GPT_URL
```

---

# 6. Error Mapping Panel

Display

```text
401

AUTHENTICATION_REQUIRED

↓

State B


session_expired

↓

State B


403

verification_required

↓

State D

↓

Automatic Resubmit


404

draft_not_found

expired

already_submitted

↓

State G


503

SERVICE_UNAVAILABLE

↓

State H


network_error

↓

Retry
```

OTP-specific failures

```text
See

M32

M37
```

---

# 7. Route & API Panel

Route

```text
/story/submit?draft_id=<id>
```

Gateway

```http
GET

/story-drafts/{draft_id}

↓

200 Preview

401

404
```

```http
POST

/story-drafts/{draft_id}/submit

↓

202 Submission Created

403 verification_required

401

404

503
```

Implementation note

```text
Browser NEVER calls

POST /story-drafts

That endpoint belongs only to GPT.
```

---

# 8. Privacy Rules

Never display

```text
Passwords

Access Tokens

Refresh Tokens

OTP after verification

Raw phone number
```

Allowed

```text
Story Preview

Submission ID

Submission Status

Draft Status
```

Important

Story content appears only on the Preview screen.

Authentication and Verification screens display draft status only.

---

# 9. Principles

Display

```text
Story Built In GPT

Draft Always Preserved

Review Before Submit

Verify Once

Automatic Resubmit

Browser Submits

Original Language Preserved
```

---

# 10. Flow Mapping

Display

```text
Enter

↓

A Resolving


401

↓

B Login

↓

A


No draft_id

↓

E0


404

↓

G


200

↓

C Preview

↓

Submit


202

↓

F Submitted


403

↓

D Verify

↓

Automatic Resubmit


401

↓

B


404

↓

G


503

↓

H
```

---

# 11. Localization

Support runtime language switching.

Languages

```text
English

Estonian

Russian
```

Namespaces

```text
storyHandoff.*

gptBridge.*
```

Only interface labels are translated.

Story content remains in its original language.

Display language badge.

---

# 12. Traceability

Story

```text
STORY-SPA-ID-12
```

Related Mockups

```text
M120 — GPT Story Authorization Flow

M32 — Phone Verification

M37 — Verification Errors

M80 — GPT Redirect Landing

M121 — Authentication

M128 depends on M120 but replaces it as the browser-side submission runtime.
```

Related Components

```tsx
<StoryDraftPreview />

<StorySubmissionFlow />

<SubmissionStatusCard />

<PhoneVerificationGate />

<StoryDraftResolver />
```

---

# 13. Design Goal

Within five seconds a designer, developer or QA engineer should immediately understand:

```text
The story is created inside DOGEstonia GPT.

The draft is safely stored before the browser opens.

The browser—not GPT—submits the story.

Users always review the story before submission.

Phone verification happens only when required.

Successful verification automatically resumes submission.

Submission finishes inside the SPA.

The user never returns to GPT to complete submission.
```

The final result should feel like a production-grade enterprise submission workflow where GPT creates structured civic stories, while DOGEstonia securely reviews, verifies and submits them into the civic signal network.
````
