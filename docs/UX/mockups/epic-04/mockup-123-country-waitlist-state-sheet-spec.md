# Mockup 123 Spec — Country Waitlist State Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Country-Waitlist-state-sheet.png`

**Version:** v1.0

**Status:** active SSOT for unsupported-country onboarding

---

# 1) Purpose

This artboard defines the experience for users attempting to access DOGEstonia from countries that are not yet supported.

Current MVP policy:

```text
Estonia only
```

The purpose is to:

```text
explain why access is unavailable
avoid dead-end UX
capture future interest
preserve trust
collect waitlist demand
```

The flow must feel respectful and transparent.

Not exclusionary.

Not punitive.

---

# 2) File Name

```text
mockup-123-country-waitlist-state-sheet-spec.md
```

---

# 3) Related Requirement Gap

Closes:

```text
G4 — Country Waitlist Flow
```

Related requirements:

```text
COUNTRY_NOT_ALLOWED
Future expansion support
Regional rollout management
```

---

# 4) Screen Type

Type:

```text
State sheet
```

Single artboard.

Multiple runtime states.

Only one state is visible at runtime.

---

# 5) Trigger Conditions

Examples:

```text
Phone country not supported
IP geolocation outside supported regions
Unsupported onboarding country
Verification provider restriction
```

Result:

```text
COUNTRY_NOT_ALLOWED
```

---

# 6) Visual Language

Use established DOGEstonia design system:

```text
dark civic-tech aesthetic
black / charcoal surfaces
subtle texture
glass panels
thin borders
white typography
gray support text
DOGEstonia yellow accent
enterprise SaaS appearance
```

Avoid:

```text
error-page aesthetics
warning screens
red failure states
consumer growth funnels
marketing hype
crypto visuals
```

---

# 7) Artboard Structure

Display four states.

Show arrows between states.

Add side panels:

```text
Country Policy
Future Expansion
Privacy
Implementation Notes
```

---

# State A — Country Not Supported

## Purpose

Default state.

User is informed that DOGEstonia currently supports Estonia only.

---

### Title

```text
DOGEstonia Is Currently Available In Estonia
```

### Message

```text
We're gradually expanding access.

At the moment, DOGEstonia supports civic participation within Estonia only.
```

### Context Block

```text
Detected Country

Germany
```

Example only.

---

### Primary CTA

```text
Join Waitlist
```

### Secondary CTA

```text
Learn More
```

---

### Visual Requirement

Should feel informative.

Not like a rejection.

---

# State B — Waitlist Form

## Purpose

Collect future interest.

---

### Title

```text
Join The Waitlist
```

### Description

```text
We'll let you know when DOGEstonia becomes available in your country.
```

### Fields

```text
Email

Country
```

Country field:

```text
pre-filled from detected country
editable
```

Optional field:

```text
Organization
```

---

### Primary CTA

```text
Join Waitlist
```

### Secondary CTA

```text
Back
```

---

# State C — Waitlist Joined

## Purpose

Confirmation state.

---

### Title

```text
You're On The Waitlist
```

### Message

```text
Thank you.

We'll notify you when DOGEstonia becomes available in your region.
```

### Metadata

```text
Country Saved

Germany
```

### Primary CTA

```text
Return To Home
```

---

### Visual Requirement

Positive confirmation.

Professional.

No celebration graphics.

---

# State D — Submission Error

## Purpose

Waitlist submission failed.

---

### Title

```text
Unable To Join Waitlist
```

### Error Variants

```text
network_error

service_unavailable

duplicate_request

validation_error
```

### Example Messages

```text
Unable to contact DOGEstonia services.

You already joined the waitlist.

Please check the email address.

Please try again later.
```

### Primary CTA

```text
Try Again
```

### Secondary CTA

```text
Back
```

---

# 8) Country Policy Panel

Title:

```text
Current Availability
```

Content:

```text
Supported Countries

Estonia
```

Future Expansion:

```text
Additional regions may be added later.
```

---

# 9) Future Expansion Panel

Title:

```text
Why A Waitlist Exists
```

Content:

```text
Identity providers
Phone verification support
Legal compliance
Operational rollout
Localization readiness
```

---

# 10) Privacy Panel

Title:

```text
Privacy
```

Display:

```text
Email stored for availability notifications only

No account is created

No phone verification occurs

No civic profile is created
```

---

# 11) Implementation Panel

Display:

```text
COUNTRY_NOT_ALLOWED

waitlist_joined

waitlist_duplicate

waitlist_error
```

Example APIs:

```text
POST /waitlist

GET /countries/supported
```

---

# 12) State Mapping

```text
country_not_supported
→ State A

waitlist_form
→ State B

waitlist_joined
→ State C

waitlist_error
→ State D
```

---

# 13) Visual Hierarchy

Priority:

```text
1. Availability explanation

2. Waitlist action

3. Future availability

4. Privacy

5. Technical reference
```

---

# 14) Traceability

Related components:

```tsx
<CountryGate />

<CountryWaitlistForm />

<WaitlistSuccessState />

<WaitlistErrorState />
```

Related mockups:

```text
M120 GPT Story Authorization Flow

M121 Web Authentication State Sheet
```

---

# 15) Design Goal

Within five seconds the viewer should understand:

```text
DOGEstonia is not available in my country yet.

This is temporary.

I can join a waitlist.

My information is handled responsibly.

I will be notified if access becomes available.
```

The experience should feel like a controlled civic rollout rather than a rejection screen.
