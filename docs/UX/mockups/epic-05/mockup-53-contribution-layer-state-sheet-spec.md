# Mockup 53 Spec — Contribution Layer State Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Contribution-Layer-state-sheet.png`

**Version:** v1.0

**Status:** active SSOT for contribution tracking components

**Related docs:**

* DOGEstonia Story Receipt Layer
* User Cabinet UX
* DOGE OS Receipt Architecture
* Civic Participation Architecture

---

# 1) Purpose

This mockup defines the future Contribution Layer section inside the User Cabinet.

The goal is to make participation visible.

The goal is NOT:

* social ranking
* gamification
* popularity
* token speculation

The component communicates:

```text
What contributions have been recorded?
```

---

# 2) Component Structure

Recommended parent component:

```tsx
<ContributionLayer />
```

Contains three child cards:

```tsx
<StoryReceiptsCard />
<ContributionRecordsCard />
<ReputationCard />
```

---

# 3) State Sheet Structure

Single artboard.

Display three contribution modules side-by-side.

Each module contains multiple states.

This is a component specification sheet.

Not a runtime screen.

---

# Module A — Story Receipts

Purpose:

Show recorded proof of story submissions.

---

## State A1 — No Receipts

Title:

```text
Story Receipts
```

Description:

```text
No story receipts recorded yet.
```

Primary Action:

```text
Submit Story
```

---

## State A2 — Receipts Present

Title:

```text
Story Receipts
```

Metrics:

```text
Receipts: 12
```

Sample records:

```text
SR-2041
Published

SR-2038
Published

SR-2035
Under Review
```

---

## State A3 — Receipt Service Unavailable

Title:

```text
Story Receipts
```

Message:

```text
Receipt data temporarily unavailable.
```

Technical label:

```text
RECEIPT_SERVICE_UNAVAILABLE
```

Action:

```text
Retry
```

---

# Module B — Contribution Records

Purpose:

Track participation events.

---

## State B1 — No Contributions

Message:

```text
No contribution records yet.
```

---

## State B2 — Contributions Present

Metrics:

```text
Contribution Events: 18
```

Examples:

```text
Story Submitted
Story Updated
Issue Participated
```

---

## State B3 — Service Error

Message:

```text
Contribution history unavailable.
```

Action:

```text
Retry
```

---

# Module C — Reputation

Purpose:

Future civic trust layer.

---

## State C1 — Not Active Yet

Title:

```text
Reputation
```

Description:

```text
Reputation features will become available in a future release.
```

Badge:

```text
Coming Later
```

---

## State C2 — Reputation Available

Example metrics:

```text
Participation Consistency

Verified Contributions

Community Trust Signals
```

No numeric score.

No ranking.

No leaderboard.

---

## State C3 — Reputation Unavailable

Message:

```text
Reputation data unavailable.
```

Action:

```text
Retry
```

---

# 4) Visual Rules

Use DOGEstonia visual language:

```text
dark civic-tech aesthetic
glass panels
white typography
muted gray text
DOGEstonia yellow accents
enterprise SaaS feel
```

Avoid:

```text
leaderboards
XP
levels
points
badges as achievements
token balances
wallet balances
financial metrics
```

---

# 5) Privacy Rules

Never display:

```text
story contents
phone numbers
verification details
wallet balances
personal identifiers
```

Display only:

```text
receipt identifiers
event metadata
timestamps
status values
```

---

# 6) State Mapping

```text
receipts_empty
receipts_present
receipts_unavailable

contributions_empty
contributions_present
contributions_unavailable

reputation_disabled
reputation_available
reputation_unavailable
```

---

# 7) Traceability

Primary stories:

```text
S04-8 Receipts & Contributions
```

Mockup:

```text
M53 — Contribution Layer State Sheet
```

Components:

```tsx
<StoryReceiptsCard />
<ContributionRecordsCard />
<ReputationCard />
```

---

# 8) Design Goal

The user should understand:

```text
My participation exists.
My contributions are recorded.
My authorship can be proven.
```

without feeling:

```text
ranked
judged
gamified
financialized
```

The component should feel like a civic ledger rather than a social reputation system.
