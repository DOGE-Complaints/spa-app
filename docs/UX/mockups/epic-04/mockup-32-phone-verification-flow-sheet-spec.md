# Mockup 32 Spec — Phone Verification Flow Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Verification-Flow-sheet.png`

**Version:** v1.0

**Status:** active SSOT for phone verification flow

**Related stories:**

* S04-4 Phone Verification From Cabinet
* S05-1 Verification Entry
* S05-4 Protected Actions

---

# 1) Purpose

This mockup defines the canonical phone verification flow used throughout DOGEstonia.

The flow must be reusable from:

* User Cabinet
* Protected Actions
* GPT Redirect Flow
* Verification Route

The verification flow is a trust mechanism.

It is not onboarding.

It is not marketing.

It is not identity collection.

---

# 2) State Sheet Structure

Single artboard.

Five states displayed together.

Only one state appears at runtime.

---

# State A — Verification Disclosure

Purpose:

Explain why verification is required.

Title:

```text
Verify Your Civic Account
```

Description:

```text
Phone verification helps protect the platform from abuse and ensures trusted participation.
```

Primary Action:

```text
Continue
```

Secondary:

```text
Cancel
```

---

# State B — Phone Number Input

Purpose:

Collect phone number.

Fields:

```text
Country
Phone Number
```

Primary Action:

```text
Send Verification Code
```

Secondary:

```text
Back
```

Requirements:

* country selector
* phone formatting
* validation hints

---

# State C — OTP Code Entry

Purpose:

Verify phone ownership.

Fields:

```text
6-digit verification code
```

Additional:

```text
Resend Code
Change Number
```

Primary Action:

```text
Verify
```

---

# State D — Verification Processing

Purpose:

Backend validation in progress.

Title:

```text
Confirming Verification
```

Description:

```text
Please wait while we verify your account.
```

Visual Rules:

* subtle progress treatment
* no giant spinner
* no full-screen loader

Primary Action:

Disabled.

---

# State E — Verification Success

Purpose:

Verification completed.

Title:

```text
Account Verified
```

Description:

```text
Your civic account is now eligible for protected actions.
```

Primary Action:

```text
Continue
```

Secondary:

```text
Return to Profile
```

---

# 3) Visual Rules

Use DOGEstonia visual language:

* dark civic-tech aesthetic
* glass panels
* white typography
* muted gray support text
* DOGEstonia yellow accent
* no neon
* no social styling
* no crypto styling

---

# 4) State Mapping

```text
not_started
→ Disclosure

phone_required
→ Phone Input

otp_sent
→ OTP Entry

verification_processing
→ Processing

verified
→ Success
```

---

# 5) Reuse Strategy

This flow must be implemented once and reused everywhere verification is required.

Do not create separate verification flows for:

* Cabinet
* GPT
* Protected Actions
* Future Wallet Features

All routes should use the same flow.

---

# 6) Traceability

Mockup:

```text
M32 — Verification Flow Sheet
```

Component Group:

```text
Phone Verification Flow
```

Stories:

```text
S04-4
S05-1
S05-4
```

---

# 7) Design Goal

A user should understand the complete verification journey in under 30 seconds.

The flow should feel:

```text
Simple
Fast
Trustworthy
Institutional
```

rather than bureaucratic or security-heavy.
