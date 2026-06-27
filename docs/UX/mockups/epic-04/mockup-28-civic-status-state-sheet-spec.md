# Mockup 28 Spec — Civic Status State Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Civic-Status-state-sheet.png`
**Version:** v1.0
**Status:** active SSOT for Civic Verification Status component
**Related docs:** `docs/UX/design-system.md`, `docs/UX/identity-frontend-ux-requirements.md`, `docs/UX/reusable-ui-components-architecture.md`

---

# 1) Purpose

This mockup defines the canonical Civic Status component used throughout DOGEstonia.

This component communicates:

* whether a user may participate in protected civic actions;
* whether phone verification is required;
* whether verification is currently in progress;
* whether verification has been successfully completed.

This component becomes one of the primary trust indicators of the entire platform.

---

# 2) Component Type

Recommended React component:

```tsx
<CivicStatusCard />
```

Primary usage locations:

```text
User Cabinet
Protected Actions
GPT Redirect Flow
Verification Route
Future Reputation Views
```

---

# 3) State Sheet Structure

The mockup contains multiple states on a single artboard.

These states are design references.

Only one state is rendered at runtime.

---

# State A — Unverified

## Purpose

User account exists.

Phone verification has not been completed.

Protected actions are unavailable.

---

### Title

```text
Account Verification Required
```

### Description

```text
Verify your phone number to participate in civic actions and submit stories.
```

### Visual Indicator

Neutral verification icon.

No warning styling.

---

### Primary Action

```text
Verify Account
```

DOGEstonia yellow.

Most prominent CTA.

---

### Secondary Information

```text
Verification takes less than one minute.
```

---

# State B — Verification Available

## Purpose

User reached a protected action.

System requests verification before continuing.

---

### Title

```text
Verification Required
```

### Description

```text
This action requires a verified civic account.
```

### Primary Action

```text
Verify & Continue
```

### Secondary Action

```text
Cancel
```

---

### Context Block

Optional.

Can display:

```text
Submit Story
Join Verification
Protected Action
```

---

# State C — Verification In Progress

## Purpose

Verification process has started.

Backend is waiting for OTP completion.

---

### Title

```text
Verification In Progress
```

### Description

```text
Complete the verification process to activate your civic account.
```

### Status Indicator

Processing state.

Subtle.

Not spinner-centric.

Could use:

```text
Waiting for confirmation
```

---

### Primary Action

Disabled.

```text
Continue
```

---

# State D — Verified

## Purpose

User successfully completed verification.

Protected actions are available.

---

### Title

```text
Verified Civic Account
```

### Description

```text
Your account is verified and eligible for civic participation.
```

---

### Verification Metadata

Optional section:

```text
Verified
Phone Confirmed
```

Future:

```text
Verification Date
Verification Method
```

---

### Visual Treatment

Primary trust state.

DOGEstonia yellow accent.

Must feel trustworthy.

Not celebratory.

Not gamified.

---

### Primary Action

None required.

Optional:

```text
View Activity
```

---

# State E — Verification Failed

## Purpose

Verification process could not be completed.

Temporary failure state.

---

### Title

```text
Verification Failed
```

### Description

```text
We could not complete account verification.
Please try again.
```

---

### Error Reference

Example:

```text
Code: VERIFICATION_FAILED
```

Displayed in muted technical style.

---

### Primary Action

```text
Retry Verification
```

---

### Secondary Action

```text
Contact Support
```

Optional.

---

# 4) Visual Hierarchy

Priority order:

```text
1. Status Icon
2. Status Title
3. Description
4. Primary Action
5. Secondary Metadata
```

The state should be understandable within 2–3 seconds.

---

# 5) Visual Rules

Use:

* dark DOGEstonia surface
* glassmorphism card
* white typography
* muted gray support text
* DOGEstonia yellow accent
* consistent card dimensions

Avoid:

* green success badges
* red error pages
* gamification
* trophies
* social reputation indicators
* crypto symbolism

---

# 6) Data Contract

Civic status must be derived from:

```ts
GET /me
```

Expected relevant fields:

```json
{
  "phone_verified": true,
  "phone_dial_prefix": "+372",
  "phone_verified_at": "2026-06-12T10:00:00+00:00",
  "eid_verified": false,
  "role": "authenticated",
  "display_name": null
}
```

Primary source of truth:

```ts
phone_verified: boolean
```

---

## FE-Derived State Model

The UI state is derived from:

```ts
phone_verified
```

plus local frontend flow phase:

```ts
idle
requesting
code_entry
confirming
verified
failed
```

and optional error code:

```ts
COUNTRY_NOT_ALLOWED
RATE_LIMITED
CODE_MISMATCH
CODE_EXPIRED
TOO_MANY_ATTEMPTS
PROVIDER_UNAVAILABLE
SEND_FAILED
profile_conflict
AUTHENTICATION_REQUIRED
session_expired
network_error
```

---

## State Derivation Table

| UI State                 | Backend Input          | FE Local Phase                             | Error Code             | Result                                 |
| ------------------------ | ---------------------- | ------------------------------------------ | ---------------------- | -------------------------------------- |
| Unverified               | `phone_verified=false` | `idle`                                     | none                   | Show verification required / available |
| Verification Available   | `phone_verified=false` | protected action attempted                 | none                   | Show `Verify & Continue`               |
| Verification In Progress | `phone_verified=false` | `requesting` / `code_entry` / `confirming` | none                   | Show progress / OTP flow               |
| Verified                 | `phone_verified=true`  | any                                        | none                   | Show verified civic participant        |
| Verification Failed      | `phone_verified=false` | `failed`                                   | any verification error | Show recoverable error state           |

---

## Canonical Labels

Use exact labels:

```text
Civic account not verified yet
Verified civic participant
```

Do not replace with:

```text
KYC verified
Identity verified
Government verified
Legally verified
```

---

## Display Rules

### If `phone_verified=false`

Show:

```text
Civic account not verified yet
```

Support text:

```text
You can browse DOGEstonia, but some actions require a one-time phone verification.
```

CTA:

```text
Verify when needed
```

or, in protected action context:

```text
Verify & Continue
```

---

### If `phone_verified=true`

Show:

```text
Verified civic participant
```

Support text:

```text
Your account can submit stories and participate in civic signals.
```

Metadata allowed:

```text
Phone Confirmed
Verified At
Dial Prefix: +372
```

Never show raw phone number.

---

## Component Contract

Recommended component:

```tsx
<CivicStatusCard
  phoneVerified={me.phone_verified}
  phoneDialPrefix={me.phone_dial_prefix}
  phoneVerifiedAt={me.phone_verified_at}
  flowPhase={verificationFlow.phase}
  errorCode={verificationFlow.errorCode}
/>
```

---

## Runtime Rule

Backend remains the source of truth.

Even if frontend cached state says verified, protected submit may still return:

```text
verification_required
```

In that case:

```text
open verification flow
preserve draft/action context
refresh /me after success
resume original action
```

---

## Design Impact

No new visual artboard required.

Existing M28 cards remain valid as UI states.

Only their source-of-truth logic changes:

```text
backend enum
```

is replaced by:

```text
/me.phone_verified + frontend flow phase
```

---

# 7) State Mapping

```text
unverified
→ State A

verification_available
→ State B

verification_in_progress
→ State C

verified
→ State D

verification_failed
→ State E
```

---

# 8) Reuse Strategy

This component should be reused everywhere verification status is needed.

Do not create separate verification cards for:

```text
Profile
GPT Verification
Protected Actions
Future Wallet Features
```

All should consume the same component.

---

# 9) Traceability

Primary Stories:

```text
S04-3 Civic Verification Status
S05-1 Verification Entry
S05-4 Protected Actions
```

Mockup:

```text
M28 — Civic Status State Sheet
```

Component:

```text
CivicStatusCard
```

---

# 10) Design Goal

The component should communicate:

```text
Can this person perform civic actions right now?
```

before communicating anything else.

It is a trust component, not an achievement component.

Verification is presented as eligibility and participation readiness, not as social status.

## Acceptance Criteria

```text
M28 clearly states that verified = phone_verified=true.
In-progress and failed states are marked as FE-derived.
No raw phone number is displayed.
No KYC / government / bank verification language is used.
Protected actions still handle backend verification_required.
```