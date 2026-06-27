# Mockup 121 Spec — Web Authentication State Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Web-Authentication-state-sheet.png`

**Version:** v1.0

**Status:** active SSOT for standalone web authentication

**Related docs:**

* identity-frontend.md
* EPIC-04 Identity & Auth
* M120 GPT Story Authorization Flow
* M124 Session Shell State Sheet

---

# 1) Purpose

This artboard defines the standalone DOGEstonia authentication experience.

Unlike GPT authorization flows, this flow starts directly on DOGEstonia web.

This screen is used when users:

```text
open DOGEstonia website
open protected route
restore account access
return after logout
authenticate for profile access
authenticate for issue participation
```

This flow is account-first.

No story context exists.

No GPT context exists.

No verification context exists.

---

# 2) Screen Type

Type:

```text
Route-level state sheet
```

Route:

```text
/login
```

Future routes:

```text
/signup
/password-reset
```

Single artboard.

Multiple runtime states.

Only one state is visible at runtime.

---

# 3) Visual Language

Use established DOGEstonia design system:

```text
dark civic-tech operating system aesthetic
black and charcoal surfaces
subtle textured background
soft glassmorphism panels
thin borders
white typography
muted gray secondary text
DOGEstonia yellow accent
enterprise SaaS appearance
```

Visual references:

```text
Linear
GitHub
Jira
modern administration systems
```

Avoid:

```text
marketing hero sections
social-media login patterns
consumer growth funnels
crypto aesthetics
wallet-first onboarding
token references
neon
bright gradients
mascots
illustrations
```

---

# 4) Artboard Structure

Display all authentication states together.

Use a responsive grid.

Each state should be represented as a realistic production-ready screen card.

---

# State A — Login

## Purpose

Default entry state.

User already has an account.

---

### Title

```text
Sign In
```

### Description

```text
Access your DOGEstonia account.
```

### Fields

```text
Email

Password
```

### Controls

```text
Remember Me
```

### Primary CTA

```text
Sign In
```

### Secondary CTA

```text
Create Account
```

### Tertiary Actions

```text
Magic Link

Forgot Password
```

---

# State B — Signup

## Purpose

Create new DOGEstonia account.

Phone verification does not occur here.

---

### Title

```text
Create Account
```

### Description

```text
Create a DOGEstonia account to participate.
```

### Fields

```text
Email

Password

Confirm Password
```

### Primary CTA

```text
Create Account
```

### Secondary CTA

```text
Sign In Instead
```

### Support Text

```text
Phone verification happens later when required.
```

---

# State C — Magic Link Sent

## Purpose

User requested passwordless login.

---

### Title

```text
Check Your Email
```

### Description

```text
A sign-in link has been sent to your email address.
```

### Metadata

```text
Email Sent

Expires In 15 Minutes
```

### Primary CTA

```text
Open Email App
```

### Secondary CTA

```text
Resend Link
```

### Support CTA

```text
Use Password Instead
```

---

# State D — Forgot Password

## Purpose

Password recovery.

---

### Title

```text
Reset Password
```

### Description

```text
Enter your email and we'll send a reset link.
```

### Fields

```text
Email
```

### Primary CTA

```text
Send Reset Link
```

### Secondary CTA

```text
Back To Login
```

---

# State E — Authentication Error

## Purpose

Reference state for common authentication failures.

---

### Error Variant 1

Code:

```text
invalid_credentials
```

Message:

```text
Incorrect email or password.
```

---

### Error Variant 2

Code:

```text
network_error
```

Message:

```text
Unable to contact DOGEstonia services.
```

---

### Error Variant 3

Code:

```text
rate_limited
```

Message:

```text
Too many attempts. Please try again later.
```

---

### Error Variant 4

Code:

```text
magic_link_expired
```

Message:

```text
This sign-in link has expired.
```

---

### Error Variant 5

Code:

```text
account_not_found
```

Message:

```text
No account exists for this email address.
```

---

### CTA

```text
Try Again
```

---

# State F — Authentication Success

## Purpose

Successful authentication.

Transition state before navigation.

---

### Title

```text
Welcome Back
```

### Description

```text
Authentication successful.
```

### Metadata

```text
Session Created

Account Active
```

### Next Destination Examples

```text
Profile

Board

Issues

Protected Route
```

### CTA

```text
Continue
```

---

# 5) Session Awareness Panel

Dedicated side panel.

Purpose:

Explain what authentication creates.

---

### Title

```text
Session Information
```

### Content

```text
Authenticated Session

Secure Access Token

Protected Routes Enabled

Profile Available
```

---

# 6) Privacy Panel

Dedicated side panel.

---

### Title

```text
Privacy & Security
```

### Principles

```text
Credentials stay on DOGEstonia

Passwords never enter GPT

Authentication is independent of phone verification

Authentication is independent of wallet connection
```

---

# 7) API Reference Panel

Compact implementation section.

---

### Authentication APIs

```text
POST /login

POST /signup

POST /magic-link

POST /password-reset
```

---

### Session APIs

```text
GET /me

POST /logout
```

---

# 8) State Mapping

```text
login
→ State A

signup
→ State B

magic_link_sent
→ State C

forgot_password
→ State D

authentication_error
→ State E

authenticated
→ State F
```

---

# 9) Visual Hierarchy

Priority:

```text
1. Authentication State

2. User Action

3. Recovery Path

4. Session Information

5. Technical Reference
```

---

# 10) Traceability

Related Stories:

```text
S04-1 Login & Signup
S04-6 Session States
```

Related Components:

```tsx
<LoginForm />

<SignupForm />

<MagicLinkState />

<ForgotPasswordForm />

<AuthErrorState />
```

Related Mockups:

```text
M120 GPT Story Authorization Flow

M124 Session Shell State Sheet
```

---

# 11) Design Goal

Within five seconds the viewer should understand:

```text
How users authenticate.

How users create accounts.

How passwordless login works.

How password recovery works.

What happens when authentication fails.

What happens when authentication succeeds.
```

The screen should feel like a trustworthy civic identity system rather than a consumer onboarding funnel.
