# Mockup 124 Spec — Session Shell State Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Session-Shell-state-sheet.png`

**Version:** v1.0

**Status:** active SSOT for app-level session shell states

**Priority:** SHOULD

**Closes gap:** G5 — Session app-shell states

---

# 1) Purpose

This artboard defines DOGEstonia application-shell states related to session restoration, logged-out access, expired sessions, backend unavailability, and network failure.

These states are not specific to Profile, Story Submission, GPT Redirect, or Verification.

They are global application-level states.

The goal is to ensure that DOGEstonia never appears broken when authentication or backend context is temporarily unavailable.

---

# 2) Screen Type

Type:

```text
Application shell state sheet
```

This is not a single runtime screen.

It shows several global shell states on one artboard.

Only one state appears at runtime.

---

# 3) Related Requirement Gap

Closes:

```text
G5 — Session app-shell states incomplete
```

Missing states from gap analysis:

```text
Logged Out
Backend Unavailable
Loading Session Restore
```

Extended into a complete app-shell state pack:

```text
Restoring Session
Logged Out
Session Expired
Backend Unavailable
Network Error
```

---

# 4) Routes / Usage Context

Applies globally to:

```text
/
 /board
 /issues
 /profile
 /story/compose
 /verify
 /login
```

Used whenever the application shell is mounted but the session or backend state is unresolved.

---

# 5) Visual Language

Use established DOGEstonia visual language:

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

Avoid:

```text
browser default error pages
red panic screens
large centered spinners
marketing hero sections
social media styling
crypto visuals
mascots
confetti
neon
```

---

# 6) Application Shell Requirements

Every state must preserve the DOGEstonia shell as much as possible:

```text
DOGEstonia logo
left sidebar container
top header container
footer / system status area
main content panel
```

The UI should communicate:

```text
The application exists.
The shell is stable.
Only session or service state is unresolved.
```

No full-page blank loaders.

No layout collapse.

No white error screens.

---

# State A — Restoring Session

## Purpose

App is starting.

Supabase session restoration is in progress.

The user may already be authenticated, but the app does not know yet.

---

### Title

```text
Restoring Session
```

### Message

```text
DOGEstonia is checking your secure session.
```

### Visual Content

Show the app shell.

Show skeleton blocks for:

```text
sidebar navigation
header user menu
main content card
```

### Status

```text
Checking session
```

### CTA

None.

---

### Visual Requirement

Use subtle skeleton/progress state.

No giant spinner.

No empty screen.

No false error.

---

# State B — Logged Out

## Purpose

No active session exists.

The user is not authenticated.

---

### Title

```text
Sign In Required
```

### Message

```text
Please sign in to access DOGEstonia.
```

### Primary CTA

```text
Sign In
```

### Secondary CTA

```text
Create Account
```

### Optional Link

```text
Continue To Public Board
```

if public browsing is allowed.

---

### Visual Requirement

This should feel like a clean route guard.

Not an error.

Not a rejection.

---

# State C — Session Expired

## Purpose

User had a session, but it expired or became invalid.

---

### Title

```text
Session Expired
```

### Message

```text
Your session has expired. Please sign in again to continue.
```

### Primary CTA

```text
Sign In Again
```

### Secondary CTA

```text
Return To Public Board
```

### Context Preservation Block

If applicable:

```text
Previous Action
Status: Waiting
```

---

### Visual Requirement

Calm recovery state.

No blame.

No security alarm language.

---

# State D — Backend Unavailable

## Purpose

DOGEstonia backend services are temporarily unavailable.

This is not a user authentication problem.

---

### Title

```text
DOGEstonia Services Temporarily Unavailable
```

### Message

```text
We could not load DOGEstonia services right now. Please try again shortly.
```

### Technical Reference

```text
Code: BACKEND_UNAVAILABLE
```

### Primary CTA

```text
Retry
```

### Secondary CTA

```text
View System Status
```

---

### Visual Requirement

Professional operational outage state.

Not a catastrophic error page.

---

# State E — Network Error

## Purpose

User device or browser cannot reach DOGEstonia.

---

### Title

```text
Connection Problem
```

### Message

```text
We could not reach DOGEstonia. Check your connection and try again.
```

### Technical Reference

```text
Code: NETWORK_ERROR
```

### Primary CTA

```text
Retry
```

---

### Visual Requirement

Make the problem recoverable.

No dramatic warning screen.

---

# 7) State Mapping Panel

```text
session_restoring
→ State A — Restoring Session

logged_out
→ State B — Logged Out

session_expired
→ State C — Session Expired

backend_unavailable
→ State D — Backend Unavailable

network_error
→ State E — Network Error
```

---

# 8) API / Runtime Mapping Panel

```text
supabase.auth.getSession()
→ session_restoring / logged_out / authenticated

GET /me
→ authenticated profile state / authentication_required / backend_unavailable

401 AUTHENTICATION_REQUIRED
→ logged_out or session_expired

session_expired
→ Session Expired

network_error
→ Network Error

backend_unavailable
→ Backend Unavailable
```

---

# 9) Privacy Rules

Never display:

```text
access tokens
refresh tokens
raw session payload
phone number
OTP code
internal stack traces
private story content
```

Allowed to display:

```text
session status
route context
generic error code
safe previous action label
retry action
```

---

# 10) UX Principles Panel

Display concise principles:

```text
Shell stays stable
No blank screen
Recoverable states
Clear next action
No user blame
No sensitive data
```

---

# 11) Traceability

Related stories:

```text
S04-6 Session States
S04-1 Login & Signup
```

Related components:

```tsx
<AppShell />

<SessionRestoreState />

<RouteGuardState />

<SessionExpiredState />

<AppServiceErrorState />

<NetworkErrorState />
```

Related mockups:

```text
M121 — Web Authentication State Sheet

M37 — Verification Error State Sheet

M120 — GPT Story Authorization Flow State Sheet
```

---

# 12) Design Goal

Within five seconds the viewer should understand:

```text
The DOGEstonia shell is stable.
The app is either restoring session, waiting for login, or temporarily unable to reach services.
The user has a clear recovery path.
Nothing sensitive is exposed.
The system is calm, trustworthy, and operationally honest.
```

The result should feel like a mature civic SaaS application handling session and infrastructure states gracefully.
