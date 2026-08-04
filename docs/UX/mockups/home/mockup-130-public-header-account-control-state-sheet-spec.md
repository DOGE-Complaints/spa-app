# File Name

```text
mockup-130-public-header-account-control-state-sheet-spec.md
```

# Mockup 130 Spec — Public Header Account Control — State Sheet

**Functional code:** PH-A

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Public-Header-Account-Control-state-sheet.png`

**Version:** v1.0

**Status:** Active SSOT

**Area:** Public Home & Global Chrome

**Priority:** MUST

**Depends on:** M129 — Public Header Chrome

---

# 1. Purpose

This artboard defines the canonical account control used in the DOGEstonia public application header.

The account control provides a compact and familiar entry point for authentication and account-related actions while preserving a calm civic-tech appearance.

It behaves differently depending on the user's authenticated session state but always occupies the same position within the header.

The objective is to make session state immediately understandable without introducing unnecessary navigation complexity.

---

# 2. Product Context

The account control is a reusable component of the public header.

It is present on all public application routes using the PH-H chrome.

The component supports three runtime states:

```text
Guest

↓

Authenticated

↓

Authenticated Menu Open
```

Only one state exists at runtime.

The component must remain visually stable across transitions.

---

# 3. Screen Type

Type

```text
Component State Sheet
```

Component

```tsx
<AccountControl />
```

Parent Component

```tsx
<PublicHeader />
```

This specification documents only the account control.

The surrounding header is shown only as context.

---

# 4. Visual Language

Use the established DOGEstonia visual language.

```text
dark civic-tech operating system aesthetic

black / charcoal surfaces

soft glass panels

thin borders

white typography

muted grey secondary text

DOGEstonia yellow accent

enterprise SaaS appearance

Linear / GitHub clarity
```

Avoid

```text
marketing styling

hero buttons

large avatars

social profile cards

wallet controls

crypto elements

neon

confetti

decorative animation
```

Interaction should feel familiar, quiet and predictable.

---

# 5. Artboard Structure

Display three runtime states arranged horizontally.

```text
State A

↓

State B

↓

State C
```

Side panels:

- Behaviour
- Navigation
- Accessibility
- Session Rules
- Traceability

---

# State A — Guest

## Purpose

Default account control for unauthenticated users.

---

### Header Context

Display the right side of the public header.

The account control appears as:

```text
Outline profile icon

Sign in
```

or

```text
Profile icon only
```

depending on available width.

---

### Primary Interaction

Click

↓

```text
/login
```

---

### Accessible Label

```text
Sign in
```

---

### Requirements

```text
Clearly communicates guest state.

Invites authentication.

Does not resemble a disabled control.

Same size as authenticated version.

No dropdown.

No profile menu.

No avatar.
```

---

# State B — Authenticated

## Purpose

Default idle state for authenticated users.

---

### Header Context

The account control displays:

```text
Avatar placeholder

or profile icon

Optional display name

Dropdown chevron
```

Example

```text
Anna ▼
```

---

### Primary Interaction

Click

↓

Open profile menu.

---

### Accessible Label

```text
Open profile menu
```

---

### Requirements

```text
Compact appearance.

Header layout unchanged.

Display name optional.

No status badges.

No DID.

No wallet.

No email.

No phone number.
```

---

# State C — Authenticated Menu Open

## Purpose

Compact dropdown menu.

The menu is anchored to the account control.

---

### Dropdown Contents

Display exactly two primary actions:

```text
Profile

Log out
```

---

### Profile

Destination

```text
/profile
```

---

### Log out

Behaviour

```text
Clear authenticated session

↓

Redirect

↓

/board
```

No confirmation modal in v1.

No intermediate screen.

---

### Menu Behaviour

```text
Click profile icon

↓

Open dropdown

↓

Select action

↓

Close menu
```

---

### Requirements

```text
Compact anchored menu.

Does not shift header layout.

Dismiss on outside click.

Dismiss on Escape.

Keyboard navigable.

Current focus retained.

No destructive styling.

Log out appears as a normal menu item.
```

---

# 6. Behaviour Panel

Display

```text
Guest

↓

Login


Authenticated

↓

Open Menu


Profile

↓

/profile


Log out

↓

Clear Session

↓

/board
```

---

# 7. Navigation Panel

Guest

```text
/login
```

Authenticated

```text
/profile
```

Logout

```text
Clear session

↓

/board
```

No confirmation dialog.

---

# 8. Session Rules

Guest session

```text
No profile menu.

Authentication entry only.
```

Authenticated session

```text
Menu available.

Profile access.

Logout available.
```

Logging out removes authenticated state before redirect.

---

# 9. Accessibility

```text
Keyboard accessible.

Visible focus state.

Screen-reader labels.

Menu role semantics.

Escape closes menu.

Arrow-key navigation.

Minimum touch target 44px.

Logical tab order.
```

---

# 10. Traceability

Functional code

```text
PH-A
```

Mockup

```text
M130
```

Parent

```text
M129 — Public Header Chrome
```

Related Components

```tsx
<AccountControl />

<AccountMenu />

<PublicHeader />
```

---

# 11. Out of Scope

This artboard intentionally excludes:

```text
Authentication screens

Profile page

Password reset

Session timeout

Avatar upload

Notification menu

Settings

Multi-account switching

Logout confirmation modal

Identity verification
```

These are documented separately.

---

# 12. Design Goal

Within five seconds a designer, developer or QA engineer should immediately understand:

```text
Guest users are guided into authentication.

Authenticated users access account actions through a familiar dropdown.

Profile and Log out are the only required actions in v1.

Logout immediately clears the session and redirects to /board.

The interaction is compact, stable and consistent with the rest of the DOGEstonia public header.
```

The final result should feel like a production-grade enterprise account control suitable for a civic operating system, following familiar dashboard interaction patterns without unnecessary complexity.