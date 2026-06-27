# Mockup 122 Spec — Story Compose Verification Gate Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Story-Compose-Verification-Gate-sheet.png`

**Version:** v1.0

**Status:** active SSOT for web lazy verification gate during story submission

---

# 1) Purpose

This artboard defines the web-side protected action gate for story submission.

It covers the non-GPT path where a user writes or reviews a story directly inside DOGEstonia web UI, clicks submit, and is asked to verify only at the moment of protected action.

The goal is to prove:

```text
The user can compose freely.
Verification happens only when needed.
The draft is saved before verification.
The user returns to the exact same story after verification.
```

---

# 2) File Name

```text
mockup-122-story-compose-verification-gate-sheet-spec.md
```

---

# 3) Related Requirement Gap

Closes:

```text
G3 — Web inline lazy-gate on compose story
```

Related requirements:

```text
FR-FE-003 — Lazy gate for protected action
FR-FE-004 — Phone verification inline
FR-FE-005 — Do not repeat verification
FR-FE-010 — Refresh /me and resume interrupted action
```

---

# 4) Screen Type

Type:

```text
Route-level flow state sheet
```

This is not a single runtime screen.

It shows the state sequence for the protected story submit action.

Only one state appears at runtime.

---

# 5) Route Context

Primary route:

```text
/story/compose
```

Possible future routes:

```text
/story-drafts/:draft_id
/story/:draft_id/review
```

---

# 6) Visual Language

Use established DOGEstonia visual language:

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
```

Avoid:

```text
social-media composer
Facebook post UI
Twitter/X post UI
blog editor aesthetics
crypto dashboard
gamification
confetti
mascots
bright gradients
neon
```

---

# 7) Artboard Structure

Display five states in one left-to-right flow.

Use arrows between states.

Add compact side panels for:

```text
API Mapping
State Mapping
Privacy Rules
UX Principles
```

---

# State A — Compose Story

## Purpose

User is composing or reviewing a story before submission.

Verification is not requested yet.

---

### Screen Content

Page title:

```text
Story Submission
```

Main editor card:

```text
Story
```

Fields:

```text
Title
Summary
Story Content
```

Example title:

```text
Unsafe pedestrian crossing near primary school
```

Example summary:

```text
Parents report repeated dangerous traffic situations during morning arrival hours.
```

Example status:

```text
Draft Saved
```

Actions:

```text
Submit Story
Save Draft
Discard Draft
```

---

### Visual Requirement

The user should feel fully inside the story workspace.

No verification prompt is shown yet.

---

# State B — Verification Required Gate

## Purpose

User clicks `Submit Story`.

Frontend checks `/me.phone_verified`.

If `phone_verified=false`, submission is paused.

---

### Modal / Inline Panel Title

```text
Verification Required
```

### Message

```text
Before submitting, verify that this account belongs to a real person.
This protects DOGEstonia from bots and duplicate civic influence.
```

### Preserved Context Block

```text
Story Draft
Status: Waiting For Verification
```

### Primary CTA

```text
Verify & Continue
```

### Secondary CTA

```text
Save Draft
```

### Tertiary CTA

```text
Cancel
```

---

### Visual Requirement

This must not feel like access denied.

It should feel like a temporary trust checkpoint.

---

# State C — Draft Saved Before Verification

## Purpose

Before entering verification, the system saves the draft.

This prevents data loss.

---

### Title

```text
Draft Saved
```

### Message

```text
Your story has been safely saved before verification.
```

### Draft Reference

```text
Draft ID
DR-2041
```

### Metadata

```text
Last Saved
May 14, 2026 · 14:32
```

### Primary CTA

```text
Continue Verification
```

### Secondary CTA

```text
Return To Story
```

---

### Visual Requirement

The user must immediately understand:

```text
Nothing was lost.
The story is safe.
Verification can continue.
```

---

# State D — Verification Completed / Resume Draft

## Purpose

Phone verification succeeded.

Frontend refreshes `/me`.

The saved draft is restored.

---

### Title

```text
Verification Complete
```

### Message

```text
Your account is verified. You can now submit the saved story.
```

### Trust Indicators

```text
Verified
Phone Confirmed
```

### Context Block

```text
Draft Restored
Status: Ready For Submission
```

### Primary CTA

```text
Submit Story
```

### Secondary CTA

```text
Review Story
```

---

### Visual Requirement

The user should be returned to the original action with no confusion.

---

# State E — Submission Success

## Purpose

The story is submitted after verification.

---

### Title

```text
Story Submitted
```

### Message

```text
Your civic story has been received and entered into processing.
```

### Submission Reference

```text
Submission ID
DE-ST-2041
```

### Status

```text
Under Review
```

### Primary CTA

```text
View Activity
```

### Secondary CTA

```text
Submit Another Story
```

---

# 8) API Mapping Panel

Display as compact implementation reference.

```text
GET /me
→ check phone_verified

POST /story-drafts
→ save draft before verification

POST /auth/phone/request
→ send SMS code

POST /auth/phone/confirm
→ confirm OTP

GET /me
→ refresh verification state

POST /story-drafts/{draft_id}/submit
→ submit saved story
```

---

# 9) State Mapping Panel

```text
composing
→ State A

submit_clicked_unverified
→ State B

draft_saved_before_verification
→ State C

phone_verified_resume_draft
→ State D

story_submitted
→ State E
```

---

# 10) Backend Source Of Truth Rule

Even if frontend believes the user is verified, backend may still return:

```text
verification_required
```

In that case:

```text
open verification gate
preserve draft
resume after verification
```

---

# 11) Privacy Rules

Never display:

```text
phone number
OTP code
Supabase token
internal moderation notes
raw private user identifiers
```

Allowed to display:

```text
draft ID
draft status
verification status
submission ID
story metadata
```

---

# 12) UX Principles

Display principles on artboard:

```text
Compose first
Verify only when needed
Save before interrupting
Resume exact action
No data loss
Backend is source of truth
```

---

# 13) Traceability

Related stories:

```text
S04-5 Protected Action Gate
S3 Story compose + gate
```

Related components:

```tsx
<StorySubmissionWorkspace />
<ProtectedActionGate />
<ActionContextCard />
<PhoneVerificationFlow />
<StoryDraftResumeState />
```

Related mockups:

```text
M32 — Phone Verification Flow Sheet
M72 — Protected Action Verification Sheet
M85 — Story Submission Success State Sheet
M110 — Story Submission Workspace
```

---

# 14) Design Goal

Within five seconds the viewer should understand:

```text
The user writes a story normally.
Submit triggers verification only if required.
The draft is saved before interruption.
Phone verification happens inline.
The user resumes the exact saved story.
The story is then submitted successfully.
```

The experience must feel like a respectful civic publishing workflow, not a hard security wall.
