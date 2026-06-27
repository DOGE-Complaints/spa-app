# Mockup 120 Spec — GPT Story Authorization Flow State Sheet

**File name:** `mockup-120-gpt-story-authorization-flow-state-sheet-spec.md`

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-GPT-Story-Authorization-flow-state-sheet.png`

**Version:** v1.0

**Status:** active SSOT for Custom GPT → DOGEstonia authorization flow

---

## 1) Purpose

This artboard defines the full authorization journey for a user who submits a story through DOGEstonia Custom GPT.

The flow starts in ChatGPT, redirects the user to DOGEstonia web UI for login/signup and phone verification, then returns the user back to ChatGPT.

The artboard must clearly show:

```text
ChatGPT story interview
↓
DOGEstonia redirect
↓
login / signup
↓
phone verification
↓
verified civic participant
↓
return to ChatGPT
↓
continue story submission
```

This is not a generic login flow.

This is the authorization bridge between AI-assisted story submission and DOGEstonia civic identity.

---

## 2) Product Context

A user creates or prepares a civic story inside Custom GPT.

When submission requires verified identity, GPT sends the user to DOGEstonia web page:

```text
/verify?context=custom_gpt
```

On DOGEstonia web:

* credentials are entered only on DOGEstonia;
* phone number is entered only on DOGEstonia;
* OTP code is entered only on DOGEstonia;
* GPT never receives password, phone number, or OTP;
* after successful verification, user is instructed to return to ChatGPT.

---

## 3) Artboard Type

Type:

```text
Route-level flow state sheet
```

This is not a single runtime screen.

It is a full journey artboard showing all major UX states and transitions.

Only one state appears at runtime.

---

## 4) Visual Style

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
enterprise SaaS quality
Linear / GitHub Issues / Jira-like clarity
```

Avoid:

```text
marketing hero section
consumer onboarding wizard
social login growth funnel
crypto wallet-first framing
token language
confetti
mascots
bright gradients
neon
```

---

## 5) Main Flow States

The artboard should display 8 major states.

---

# State A — Story Ready In GPT

## Purpose

User has completed the story interview inside Custom GPT.

DOGEstonia GPT determines that story submission requires verified civic identity.

## UI Representation

Show a ChatGPT-side panel or simplified GPT context block.

Title:

```text
Story Ready In GPT
```

Message:

```text
Your story is ready. DOGEstonia needs a verified civic account before submission.
```

Primary CTA:

```text
Continue To DOGEstonia
```

Context block:

```text
Story Draft
Status: Prepared
Source: DOGEstonia GPT
```

---

# State B — Redirect Resolving

## Purpose

User has landed on DOGEstonia web page.

The app is resolving session and context.

Route:

```text
/verify?context=custom_gpt
```

Title:

```text
Checking Your Session
```

Message:

```text
DOGEstonia is preparing your verification flow.
```

Show:

```text
Context: Custom GPT
Story Draft: Preserved
```

No spinner-heavy design.

Use calm progress treatment.

---

# State C — Login Required

## Purpose

No active DOGEstonia session exists.

User must sign in before verification can continue.

Title:

```text
Sign In To Continue
```

Message:

```text
Your story is saved. Sign in to continue verification.
```

Fields:

```text
Email
Password
```

Primary CTA:

```text
Sign In
```

Secondary CTA:

```text
Create Account
```

Tertiary:

```text
Magic Link
```

Persistent context block:

```text
Story Draft
Status: Saved
Source: Custom GPT
```

---

# State D — Signup Required

## Purpose

User does not have DOGEstonia account yet.

Phone is NOT requested during signup.

Signup is email-first.

Title:

```text
Create DOGEstonia Account
```

Message:

```text
Create an account to continue your story submission.
```

Fields:

```text
Email
Password
Confirm Password
```

Primary CTA:

```text
Create Account
```

Secondary CTA:

```text
Sign In Instead
```

Persistent context block:

```text
Story Draft
Status: Saved
```

Important note:

```text
Phone verification happens after account creation.
```

---

# State E — Phone Verification Disclosure

## Purpose

User is authenticated but not phone verified.

Because this is GPT-originated story submission, phone verification is required now.

Title:

```text
One Quick Step — Verify Your Phone
```

Message:

```text
We ask for your phone number to keep DOGEstonia free of bots and duplicate civic influence.
```

Support text:

```text
Currently supports Estonian numbers (+372).
Your number is stored securely and never shown to others.
```

Primary CTA:

```text
Send Code
```

Secondary CTA:

```text
Back
```

Persistent context:

```text
Story Draft
Status: Ready
```

---

# State F — Phone Number + OTP

## Purpose

Show the operational OTP verification sequence.

This can be displayed as two compact sub-states inside one card.

## Sub-state F1 — Phone Number

Field:

```text
Phone Number
+372 5555 1234
```

CTA:

```text
Send Verification Code
```

## Sub-state F2 — OTP Code

Field:

```text
6-digit code
```

Metadata:

```text
Code expires in 5:00
Resend available in 00:60
Attempts remaining: 5
```

CTA:

```text
Confirm Code
```

Rules:

```text
6 digits
5 minute TTL
5 attempts
60 second resend cooldown
```

---

# State G — Verification Success

## Purpose

Phone verification is complete.

The account can now submit civic stories.

Title:

```text
Verified Civic Participant
```

Message:

```text
Your civic account is verified. Return to ChatGPT to continue your story submission.
```

Trust indicators:

```text
Verified
Phone Confirmed
```

Primary CTA:

```text
Return To ChatGPT
```

Secondary CTA:

```text
Open Profile
```

Persistent context:

```text
Story Draft
Status: Ready
```

---

# State H — Already Verified

## Purpose

User arrives from GPT already authenticated and phone verified.

No OTP needed.

Title:

```text
You're Ready
```

Message:

```text
Your account is already verified. Return to ChatGPT to continue.
```

Primary CTA:

```text
Return To ChatGPT
```

Context:

```text
Story Draft
Status: Ready
Verification: Already Complete
```

---

## 6) Error States To Include As Compact Side Panel

The main artboard should include a compact error-state reference panel, not full separate screens.

Include:

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

Map to user-facing handling:

```text
COUNTRY_NOT_ALLOWED → Estonia-only waitlist
RATE_LIMITED → cooldown timer
CODE_MISMATCH → wrong code, attempts remaining
CODE_EXPIRED → resend code
TOO_MANY_ATTEMPTS → start again
PROVIDER_UNAVAILABLE / SEND_FAILED → retry later
profile_conflict → sign in to existing account / use another number
AUTHENTICATION_REQUIRED / session_expired → sign in again
network_error → retry
```

---

## 7) Route & API Reference Panel

Show this as a small implementation panel.

Routes:

```text
/verify?context=custom_gpt
/login
```

Future route:

```text
/oauth/authorize
```

Note:

```text
OAuth authorize is not release-ready until backend OAUTH-01 is complete.
```

Identity APIs:

```text
GET /me
POST /auth/phone/request
POST /auth/phone/confirm
```

Auth:

```text
Authorization: Bearer <supabase_access_token>
```

---

## 8) Data & Privacy Rules

Never display:

```text
raw phone number after verification
OTP code after submit
passwords
tokens
wallet addresses
story private content in auth screens
```

Allowed to display:

```text
Story Draft status
verification status
phone dial prefix
phone_verified=true
phone_verified_at
non-sensitive story reference
```

---

## 9) UX Principles Panel

Show concise principles:

```text
Story first
Account second
Phone verification third
Return to GPT
Credentials never enter GPT
OTP never enters GPT
Draft is always preserved
No repeated verification
```

---

## 10) Flow Mapping

```text
gpt_story_ready
→ State A

redirect_resolving
→ State B

login_required
→ State C

signup_required
→ State D

phone_verification_required
→ State E

otp_flow
→ State F

verification_success
→ State G

already_verified
→ State H
```

---

## 11) Visual Hierarchy

Priority:

```text
1. Story draft preservation
2. Current authorization state
3. Next action
4. Trust / privacy reassurance
5. Technical route/API references
```

The user must always understand:

```text
My story is safe.
I am not starting over.
This is a short verification checkpoint.
I will return to ChatGPT after this.
```

---

## 12) Traceability

Related components:

```tsx
<GPTRedirectLanding />
<AuthFlow />
<PhoneVerificationFlow />
<CivicStatusCard />
<StoryContextCard />
```

Related mockups:

```text
M32 — Phone Verification Flow Sheet
M37 — Verification Error State Sheet
M61 — GPT Verification Flow Sheet
M66 — Authentication State Sheet
M80 — GPT Redirect Landing State Sheet
M120 — GPT Story Authorization Flow State Sheet
```

---

## 13) Design Goal

Within 5 seconds, the viewer should understand the complete authorization path:

```text
GPT prepared the story.
DOGEstonia preserves the draft.
User signs in or creates account.
User verifies phone on DOGEstonia web.
DOGEstonia confirms verification.
User returns to GPT.
Story submission continues.
```

The artboard should feel like a precise civic identity bridge between AI-assisted story creation and verified civic participation.
