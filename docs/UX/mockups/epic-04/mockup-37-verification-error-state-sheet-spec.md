# Mockup 37 Spec — Verification Error State Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Verification-Error-state-sheet.png`
**Version:** v1.0
**Status:** active SSOT for phone verification error states
**Related docs:** `docs/UX/identity-frontend-ux-requirements.md`, `docs/UX/design-system.md`

---

## 1) Purpose

This mockup defines the reusable error-state system for DOGEstonia phone verification.

It is not a single screen.

It is a component state sheet showing how the verification flow handles backend-driven errors.

Only one error state is rendered at runtime.

---

## 2) Component Scope

Recommended component group:

```tsx
<PhoneVerificationErrorState />
```

Used inside:

```text
Phone Verification Flow
User Cabinet Verification
/verify Route
GPT Verification Flow
Protected Action Gate
```

---

## 3) States Included

The sheet must include these backend-driven error states:

```text
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

For visual clarity, the artboard may group them into sections.

---

## 4) State A — Country Not Allowed

Trigger:

```text
COUNTRY_NOT_ALLOWED
```

Title:

```text
Estonian numbers only
```

Message:

```text
DOGEstonia currently supports phone verification for Estonian numbers (+372).
```

Primary action:

```text
Join Waitlist
```

Secondary action:

```text
Use Another Number
```

---

## 5) State B — Rate Limited

Trigger:

```text
RATE_LIMITED
```

Title:

```text
Please wait before requesting another code
```

Message:

```text
A verification code was sent recently. You can request a new one after the cooldown ends.
```

Required UI:

```text
Cooldown timer: 00:45
```

Primary action:

```text
Resend Code
```

State:

```text
disabled until cooldown ends
```

---

## 6) State C — Wrong Code

Trigger:

```text
CODE_MISMATCH
```

Title:

```text
Incorrect verification code
```

Message:

```text
The code you entered does not match. Please check the SMS and try again.
```

Required UI:

```text
Attempts remaining: 4
```

Primary action:

```text
Try Again
```

---

## 7) State D — Code Expired

Trigger:

```text
CODE_EXPIRED
```

Title:

```text
Verification code expired
```

Message:

```text
The code is no longer valid. Request a new code to continue.
```

Primary action:

```text
Resend Code
```

Secondary action:

```text
Change Number
```

---

## 8) State E — Too Many Attempts

Trigger:

```text
TOO_MANY_ATTEMPTS
```

Title:

```text
Too many attempts
```

Message:

```text
This verification attempt is locked. Start again to receive a new code.
```

Primary action:

```text
Start Again
```

---

## 9) State F — Provider Unavailable / Send Failed

Triggers:

```text
PROVIDER_UNAVAILABLE
SEND_FAILED
```

Title:

```text
SMS service unavailable
```

Message:

```text
We could not send a verification code right now. Please try again later.
```

Primary action:

```text
Retry
```

Secondary action:

```text
Cancel
```

---

## 10) State G — Phone Conflict

Trigger:

```text
profile_conflict
```

Title:

```text
This number is already used
```

Message:

```text
This phone number is already connected to another DOGEstonia account.
```

Primary action:

```text
Sign in to Existing Account
```

Secondary action:

```text
Use Another Number
```

Rule:

```text
Never auto-merge accounts.
```

---

## 11) State H — Authentication Required / Session Expired

Triggers:

```text
AUTHENTICATION_REQUIRED
session_expired
```

Title:

```text
Sign in required
```

Message:

```text
Your session has expired. Please sign in again to continue verification.
```

Primary action:

```text
Sign In
```

Secondary action:

```text
Cancel
```

---

## 12) State I — Network Error

Trigger:

```text
network_error
```

Title:

```text
Connection problem
```

Message:

```text
We could not reach the verification service. Check your connection and try again.
```

Primary action:

```text
Retry
```

---

## 13) Visual Rules

Use DOGEstonia style:

```text
dark surface
glass panels
white text
muted gray descriptions
yellow for primary actions
no red full-screen error pages
no emotional copy
no "Oops"
no mascot
no warning overload
```

Errors should feel diagnostic and recoverable.

---

## 14) UX Rules

* Every error must show a clear next action.
* Error code may be shown in muted technical text.
* User-facing copy must be calm and specific.
* Do not expose phone number or OTP code.
* Do not use KYC / government ID / bank verification language.
* Do not imply punishment or blame.

---

## 15) Error Mapping Contract

```text
COUNTRY_NOT_ALLOWED -> Country Not Allowed
RATE_LIMITED -> Rate Limited
CODE_MISMATCH -> Wrong Code
CODE_EXPIRED -> Code Expired
TOO_MANY_ATTEMPTS -> Too Many Attempts
PROVIDER_UNAVAILABLE -> SMS Service Unavailable
SEND_FAILED -> SMS Service Unavailable
profile_conflict -> Phone Conflict
AUTHENTICATION_REQUIRED -> Sign In Required
session_expired -> Sign In Required
network_error -> Connection Problem
```

---

## 16) Traceability

Primary stories:

```text
S04-5 — Phone Verification Error States
S05-5 — Shared Verification Component
S05-6 — Country Waitlist
S05-7 — Phone Conflict Recovery
```

Mockup:

```text
M37 — Verification Error State Sheet
```

---

## 17) Design Goal

This sheet should prove that phone verification can fail gracefully.

The user should understand:

```text
what happened
whether it is recoverable
what to do next
```

without panic, blame, or unnecessary friction.
