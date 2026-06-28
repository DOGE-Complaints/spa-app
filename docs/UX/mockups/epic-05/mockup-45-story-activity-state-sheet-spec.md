# Mockup 45 Spec — Story Activity State Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Story-Activity-state-sheet.png`

**Version:** v1.0

**Status:** active SSOT for Story Activity component

**Related docs:**

* Story Receipt Layer
* User Cabinet UX
* GPT Submission Flow
* DOGEstonia Civic Signal Architecture

---

# 1) Purpose

This mockup defines the Story Activity component displayed inside the user cabinet.

The component shows the user's participation history.

It answers:

```text
What has this account contributed?
```

without exposing private story contents.

---

# 2) Component Type

Recommended React component:

```tsx
<StoryActivityCard />
```

Used in:

```text
User Cabinet
Future Reputation Views
Contribution Views
Future Profile Pages
```

---

# 3) State Sheet Structure

Single artboard.

Five states displayed together.

Only one state is rendered at runtime.

---

# State A — Active Story History

## Purpose

User has submitted stories.

Stories are available.

---

### Title

```text
Story Activity
```

### Metrics

```text
Stories Submitted: 12

Published: 8

Under Review: 4
```

### Table

Columns:

```text
Story ID
Status
Created
```

Example:

```text
DE-ST-2041
Published
May 12, 2026

DE-ST-2038
Under Review
May 8, 2026

DE-ST-2035
Published
May 2, 2026
```

---

# State B — Empty State

## Purpose

User has never submitted a story.

---

### Title

```text
Story Activity
```

### Empty Message

```text
No stories submitted yet.
```

### Description

```text
Share your first observation, concern, or idea to start participating.
```

### Primary Action

```text
Submit First Story
```

---

# State C — Draft Available

## Purpose

User started a story but did not finish.

---

### Title

```text
Draft Available
```

### Description

```text
You have an unfinished story waiting for completion.
```

### Metadata

```text
Last Edited:
May 14, 2026
```

### Primary Action

```text
Resume Draft
```

### Secondary Action

```text
Discard Draft
```

---

# State D — Verification Required

## Purpose

User attempts to access story participation features before verification.

---

### Title

```text
Verification Required
```

### Description

```text
Verify your account before submitting stories.
```

### Primary Action

```text
Verify Account
```

---

# State E — Activity Unavailable

## Purpose

Story activity cannot be loaded.

---

### Title

```text
Activity Unavailable
```

### Description

```text
We could not load your story activity.
```

### Technical Reference

```text
Code: ACTIVITY_LOAD_FAILED
```

### Primary Action

```text
Retry
```

---

# 4) Privacy Rules

The component must never expose:

```text
Full story text
Personal phone numbers
Verification details
Wallet addresses
Internal moderation notes
```

Only metadata.

---

# 5) Future Compatibility

The component must support future additions:

```text
Story Receipts
Contribution Records
Reputation Events
Civic Participation Metrics
```

without redesigning the base layout.

---

# 6) Visual Rules

Use DOGEstonia design language:

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
social feed layouts
Facebook styling
Twitter styling
crypto portfolio visuals
gamification
```

---

# 7) State Mapping

```text
stories_present
→ Active Story History

no_stories
→ Empty State

draft_exists
→ Draft Available

verification_required
→ Verification Required

activity_load_failed
→ Activity Unavailable
```

---

# 8) Traceability

Stories:

```text
S04-6 Story Activity
S05-4 Protected Actions
```

Mockup:

```text
M45 — Story Activity State Sheet
```

Component:

```tsx
<StoryActivityCard />
```

---

# 9) Design Goal

The component should answer:

```text
What civic participation has this account already made?
```

within 3 seconds.

It should feel like an activity ledger, not a social feed.
