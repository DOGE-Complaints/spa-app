# Mockup 110 Spec — Story Submission Workspace

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Story-Submission-Workspace.png`

**Version:** v1.0

**Status:** active SSOT for Story Submission Runtime

---

# 1) Purpose

This mockup defines the primary story-submission experience inside DOGEstonia.

This is the screen users reach after:

```text
Custom GPT
→ Redirect
→ Authentication
→ Verification
→ Continue Story
```

This is where a user reviews, edits, and submits a civic story before it enters the signal layer.

---

# 2) Screen Type

Real runtime application screen.

Not a state sheet.

Not a design-system board.

Not a component catalog.

---

# 3) Application Shell

Reuse existing DOGEstonia shell.

## Left Sidebar

```text
Board
Issues
Profile
Settings
```

---

## Header

Page title:

```text
Story Submission
```

Right side:

```text
Language Selector
Sync Status
User Menu
```

---

# 4) Main Layout

Desktop SaaS layout.

12-column grid.

Three primary regions.

---

# Region A — Story Context

Position:

```text
Left Column
```

Purpose:

Explain where the story came from.

Card title:

```text
Story Context
```

Fields:

```text
Source

DOGEstonia GPT

Created

May 14, 2026

Draft Status

Saved
```

This section reassures users that the draft already exists.

---

# Region B — Story Content

Position:

```text
Center
```

Largest section.

Primary working area.

Card title:

```text
Story
```

Fields:

```text
Title

Summary

Story Content
```

The story appears already structured.

This is not a blank editor.

The user is reviewing AI-assisted content.

---

# Region C — Classification Preview

Position:

```text
Right Column
```

Purpose:

Show how DOGEstonia currently understands the story.

Card title:

```text
Signal Preview
```

Fields:

```text
Type

Complaint

Domain

Transportation

Location

Tallinn

Confidence

High
```

Tags displayed as pills.

---

# 5) Submission Block

Position:

Bottom of content area.

Status:

```text
Ready For Submission
```

Primary action:

```text
Submit Story
```

Secondary action:

```text
Save Draft
```

Tertiary action:

```text
Discard Draft
```

---

# 6) Transparency Panel

Small information card.

Title:

```text
What Happens Next
```

Flow:

```text
Story Submitted

↓

Issue Processing

↓

Signal Aggregation

↓

Public Dashboard
```

Purpose:

Explain lifecycle before submission.

---

# 7) Verification Indicator

Persistent badge.

Display:

```text
Verified Account

Phone Confirmed
```

The user should clearly see they are eligible to submit.

---

# 8) Visual Rules

Use DOGEstonia visual language:

```text
dark civic-tech aesthetic
glass panels
white typography
muted gray support text
DOGEstonia yellow accents
enterprise SaaS appearance
```

Avoid:

```text
social posting UI
Twitter-like composer
Facebook feed patterns
crypto dashboards
token information
```

---

# 9) Traceability

Primary stories:

```text
S06-1 Review Story
S06-2 Edit Story
S06-3 Submit Story
```

Mockup:

```text
M110 — Story Submission Workspace
```

Components:

```tsx
<StorySubmissionWorkspace />
<StoryContextCard />
<StoryEditor />
<SignalPreviewCard />
<SubmissionActions />
```

---

# 10) Design Goal

Within 5 seconds the user should understand:

```text
This story already exists.
DOGEstonia preserved my work.
I can review before publishing.
I understand how the system interpreted my story.
I know what will happen after submission.
```

The screen should feel like a civic publishing workspace rather than a social-media posting interface.
