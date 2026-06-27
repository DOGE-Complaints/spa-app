# Mockup 125 Spec — Identity System Overview Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Identity-System-Overview-sheet.png`

**Version:** v1.0

**Status:** Identity Epic Overview

**Purpose:** Identity Architecture Master Map

**Priority:** Documentation / Architecture

---

# 1) Purpose

This artboard serves as the master visual map for the entire DOGEstonia Identity System.

Unlike previous mockups, this is not a runtime screen and not a state sheet for a single feature.

Its purpose is to provide a complete overview of how all Identity-related systems interact.

The audience is:

```text
Product Managers
UX Designers
Frontend Developers
Backend Developers
Architects
New Team Members
```

This artboard becomes the entry point for understanding Epic-04.

---

# 2) Scope

This overview must connect all major identity-related subsystems.

It should answer:

```text
How does a user authenticate?

How does phone verification work?

How does GPT authorization work?

How are protected actions handled?

How are sessions restored?

How does regional access work?

Which mockup describes each area?
```

---

# 3) Artboard Type

Type:

```text
Architecture Overview Sheet
```

This is not a runtime screen.

This is not a workflow wizard.

This is not a UI state.

This is a visual architecture map.

---

# 4) Visual Style

Use established DOGEstonia visual language:

```text
dark civic-tech operating system aesthetic
black and charcoal background
glassmorphism panels
thin borders
white typography
muted gray secondary text
DOGEstonia yellow accent
enterprise SaaS appearance
```

Visual inspiration:

```text
Miro
FigJam
Linear Architecture Maps
GitHub Engineering Documentation
Stripe System Diagrams
```

---

# 5) Layout Structure

Use a layered architecture diagram.

Display six horizontal layers.

Each layer contains a subsystem card.

Connections must be shown visually.

---

# Layer 1 — Authentication Layer

Purpose:

```text
Account creation and access
```

Display:

```text
Login

Signup

Magic Link

Password Reset
```

Reference:

```text
M121
```

Label:

```text
Authentication establishes account access.
```

---

# Layer 2 — Session Layer

Purpose:

```text
Maintain and restore authenticated state.
```

Display:

```text
Session Restore

Logged Out

Session Expired

Backend Unavailable

Network Error
```

Reference:

```text
M124
```

Label:

```text
Session management controls application access.
```

---

# Layer 3 — Verification Layer

Purpose:

```text
Prove that an account belongs to a real person.
```

Display:

```text
Phone Verification

OTP Flow

Verification States

Verification Errors
```

References:

```text
M28
M32
M37
```

Backend source:

```text
GET /me

phone_verified
```

Label:

```text
Verification is required only for protected actions.
```

---

# Layer 4 — GPT Identity Bridge

Purpose:

```text
Connect Custom GPT and DOGEstonia Identity.
```

Display:

```text
Story Ready

Redirect

Authorization

Verification

Return To GPT
```

References:

```text
M80

M120
```

Label:

```text
Credentials and OTP never enter GPT.
```

---

# Layer 5 — Protected Actions Layer

Purpose:

```text
Handle actions requiring verification.
```

Display:

```text
Submit Story

Verification Gate

Save Draft

Resume Action

Submission Success
```

References:

```text
M72

M110

M122
```

Label:

```text
Verification should never destroy user work.
```

---

# Layer 6 — Regional Access Layer

Purpose:

```text
Manage availability by country.
```

Display:

```text
Country Gate

Country Waitlist

Future Expansion
```

Reference:

```text
M123
```

Label:

```text
Unsupported users are redirected to waitlist rather than blocked permanently.
```

---

# 6) Cross-Layer Data Flow

Display primary flow arrows.

Main journey:

```text
Authentication
↓
Session
↓
Verification
↓
Protected Actions
```

GPT journey:

```text
GPT
↓
DOGEstonia Auth
↓
Verification
↓
Return To GPT
```

Regional journey:

```text
Country Check
↓
Supported
or
Waitlist
```

---

# 7) Backend Source Of Truth Panel

Display a dedicated architecture card.

Title:

```text
Identity Source Of Truth
```

Content:

```text
GET /me

phone_verified

phone_verified_at

role

display_name
```

Rule:

```text
Backend remains source of truth.
```

---

# 8) Privacy Boundary Panel

Title:

```text
Privacy Boundaries
```

Display:

```text
Passwords never enter GPT

OTP never enters GPT

Phone number hidden after verification

No raw session tokens shown

Protected actions use verification gates
```

---

# 9) Runtime Principles Panel

Display:

```text
Authenticate Once

Verify When Needed

Preserve Drafts

Resume Original Action

Backend Is Source Of Truth

No Repeated Verification

No Data Loss
```

---

# 10) Mockup Traceability Panel

Display complete Epic-04 map.

```text
M28  Civic Status

M32  Phone Verification

M37  Verification Errors

M72  Protected Action Verification

M80  GPT Redirect Landing

M110 Story Submission Workspace

M120 GPT Story Authorization

M121 Web Authentication

M122 Story Compose Verification Gate

M123 Country Waitlist

M124 Session Shell States
```

Purpose:

```text
Show where every identity artifact belongs.
```

---

# 11) Visual Hierarchy

Priority:

```text
1. Identity Architecture Layers

2. User Journey Flows

3. Backend Source Of Truth

4. Privacy Boundaries

5. Mockup Traceability
```

---

# 12) Design Goal

Within ten seconds, a developer, designer, architect, or stakeholder should understand:

```text
How authentication works.

How sessions work.

How verification works.

How GPT authorization works.

How protected actions work.

How country restrictions work.

How all identity mockups fit together.
```

The final result should feel like a professional engineering architecture map for the entire DOGEstonia Identity System rather than a traditional UI screen.
