# File Name

```text
mockup-129-public-header-chrome-state-sheet-spec.md
```

# Mockup 129 Spec — Public Header Chrome — State Sheet

**Functional code:** PH-H  
**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Public-Header-Chrome-state-sheet.png`  
**Version:** v1.0  
**Status:** Active SSOT  
**Area:** Public Home & Global Chrome  
**Priority:** MUST  
**Supersedes:** M19 Header Strip where requirements conflict

---

# 1. Purpose

This artboard defines the canonical public DOGEstonia application header.

The header is persistent application chrome shared by public-facing routes and entry points.

It is responsible for:

- identifying the DOGEstonia product;
- exposing primary public navigation;
- providing access to authentication or the authenticated profile;
- providing language selection;
- adapting cleanly to narrow and mobile layouts.

The header must remain compact, stable and immediately scannable.

It is not a marketing surface.

It must not compete with page content.

---

# 2. Product Context

The public header acts as the stable top-level navigation layer for DOGEstonia.

It appears on public routes such as:

```text
/
 /dashboard
 /how-it-works
 /story/submit
 /login
 /signup
```

The exact route set may evolve, but the header contract remains consistent.

The public header contains three functional zones:

```text
Brand

Primary Navigation

Session & Locale Controls
```

The header changes according to:

- session state;
- active route;
- locale selector state;
- viewport width.

---

# 3. Naming and Package Structure

This artboard belongs to the Public Home package.

Package codes:

```text
PH-H — Public Header Chrome

PH-F — Public Footer Chrome

PH-P — Public Home Page
```

Mockup number:

```text
M129
```

Canonical specification filename:

```text
mockup-129-public-header-chrome-state-sheet-spec.md
```

---

# 4. Screen Type

Type:

```text
Global application chrome state sheet
```

This is not a full page.

This is not a marketing hero.

This is not a landing-page composition.

This artboard documents one reusable application header across multiple runtime states.

Only one state is active at runtime.

---

# 5. Visual Language

Use the established DOGEstonia civic-tech design language.

```text
dark civic-tech operating system aesthetic

black / charcoal surfaces

subtle textured background

soft glassmorphism only where structurally useful

thin borders

white primary typography

muted grey secondary text

DOGEstonia yellow accent

enterprise SaaS appearance

Linear / GitHub / Jira clarity

high information density

precise alignment

fast scanning
```

Yellow is reserved for:

```text
active navigation

primary/high-priority affordances

focused controls

selected locale

important session action
```

Avoid:

```text
marketing hero treatment

large decorative logo

oversized navigation

consumer onboarding styling

social-login funnel appearance

crypto or wallet visuals

token balances

SYNCED badge

system synchronization labels

bright gradients

neon

mascots

confetti

promotional banners
```

---

# 6. Canonical Header Anatomy

The desktop header uses three horizontal zones.

## Zone 1 — Brand

Position:

```text
Left
```

Contents:

```text
DOGEstonia logo

DOGEstonia wordmark
```

The combined logo and name act as one home-link control.

The brand block is the primary visual signal in the header.

It must remain clearly identifiable without becoming oversized.

---

## Zone 2 — Primary Navigation

Position:

```text
Centre / central-left
```

Navigation items:

```text
Dashboard

How It Works

Submit A Story
```

Canonical labels:

```text
Dashboard

How it works

Submit a story
```

Only one item may appear active at a time.

Active state uses:

```text
yellow indicator

or yellow text emphasis

plus shape / underline / marker
```

Colour must never be the only active-state signal.

---

## Zone 3 — Session and Locale Controls

Position:

```text
Right
```

Contents:

```text
Profile / account control

Locale control
```

The order should remain stable across session states.

Recommended order:

```text
Profile

Locale
```

or:

```text
Locale

Profile
```

The chosen order must remain identical across all desktop states.

For this specification, use:

```text
Profile

Locale
```

---

# 7. Artboard Structure

Display four clearly labelled states on one consolidated state-sheet.

Recommended layout:

```text
Top row

State A — Guest Session

State B — Authenticated Session


Bottom row

State C — Locale Selector Open

State D — Narrow / Mobile Header
```

Include compact side panels:

```text
Header Anatomy

Responsive Behaviour

Interaction Rules

Accessibility

Supersede Note

Traceability
```

Each state should look like a realistic production header, not an abstract wireframe.

---

# State A — Guest Session

## Purpose

Default public header for a user without an active authenticated session.

---

## Header Content

### Brand Block

```text
DOGEstonia logo

DOGEstonia
```

Clicking the brand returns to the public home route.

---

### Primary Navigation

```text
Dashboard

How it works

Submit a story
```

Example active item:

```text
Dashboard
```

The active item receives a restrained yellow marker or underline.

---

### Guest Profile Control

Display a profile/account icon in the right-side control area.

The icon should clearly indicate an unauthenticated state without looking disabled.

Possible treatment:

```text
outline user icon

subtle neutral border

tooltip / accessible label: Sign in
```

Optional adjacent text on wider desktop:

```text
Sign in
```

The icon or combined control opens the login entry point.

---

### Locale Control

Display:

```text
EN
```

with a compact chevron or language/globe icon.

The selected locale must be readable without relying only on a flag.

---

## Primary Interaction

Profile control:

```text
Sign in
```

Destination:

```text
/login
```

---

## Requirements

```text
Brand remains visually dominant over utility controls.

Navigation is fully visible on desktop.

Profile control clearly communicates guest state.

Locale is visible and discoverable.

No SYNCED label or badge.

No promotional CTA in the header.

Submit a story remains navigation, not a hero button.
```

---

# State B — Authenticated Session

## Purpose

Header for a user with an active authenticated session.

The structure remains stable.

Only the session control changes.

---

## Header Content

### Brand Block

Same as State A.

```text
DOGEstonia logo

DOGEstonia
```

---

### Primary Navigation

Same canonical items:

```text
Dashboard

How it works

Submit a story
```

Example active item:

```text
Submit a story
```

---

### Authenticated Profile Control

Replace the guest account icon with an authenticated profile control.

Possible visual content:

```text
profile icon or avatar placeholder

optional short display name

dropdown chevron
```

Example:

```text
Profile icon

Anna
```

The display name is optional and may be hidden at medium widths.

The control opens the account menu.

Possible menu destinations are outside this artboard, but may include:

```text
My stories

Profile

Sign out
```

Do not display these menu contents in the closed header state.

---

### Locale Control

Same placement and size as State A.

Example:

```text
ET
```

---

## Requirements

```text
Header width must not jump between guest and authenticated states.

Navigation position must remain stable.

Profile control must not dominate the header.

Authenticated state must be recognisable through icon, label or avatar treatment.

No verification reward styling.

No token, wallet or DID information in the header.

No SYNCED label.
```

---

# State C — Locale Selector Open

## Purpose

Documents the expanded locale-selection state.

This state may be entered from either guest or authenticated session.

For the artboard, show it using the authenticated desktop header or the guest state, but make the underlying session context visually clear.

---

## Closed Control Anchor

Locale control displays the current locale:

```text
EN
```

with chevron.

---

## Open Locale Menu

Show a compact anchored popover below the locale control.

Options:

```text
English

Eesti

Русский
```

Optional locale abbreviations:

```text
EN

ET

RU
```

Recommended row format:

```text
EN — English

ET — Eesti

RU — Русский
```

The currently selected locale receives:

```text
checkmark

selected row background or border

yellow focus/selection marker
```

Colour must not be the only indicator.

---

## Behaviour

```text
Click locale control

↓

Open popover

↓

Select locale

↓

Apply locale

↓

Close popover
```

The header must not move when the menu opens.

The popover overlays page content.

---

## Requirements

```text
Popover anchored to locale control.

No full-screen language page.

No flag-only selection.

Endonyms are preserved.

Keyboard navigation supported.

Escape closes menu.

Click outside closes menu.

Selected locale is marked by text plus shape/icon.

Popover must remain inside viewport.
```

---

# State D — Narrow / Mobile Responsive Header

## Purpose

Documents how the public header adapts when the full desktop structure no longer fits.

This is not a separate mobile product.

It is the responsive version of the same application chrome.

---

## Narrow Header Anatomy

Left:

```text
DOGEstonia logo

optional shortened wordmark
```

Right:

```text
Locale control

Profile control

Navigation menu control
```

Recommended mobile control order:

```text
Locale

Profile

Menu
```

The logo remains visible at all supported widths.

---

## Primary Navigation Behaviour

Desktop navigation items are removed from the horizontal centre zone.

They become available through a menu control.

Menu icon:

```text
three-line menu

or compact navigation icon
```

Do not show all three desktop navigation labels compressed into the mobile header.

---

## Mobile Navigation Panel

Show the menu-open expectation as a compact annotation or inset, not as a fifth full state.

Menu items:

```text
Dashboard

How it works

Submit a story
```

Session-specific entry may appear below a divider:

Guest:

```text
Sign in

Create account
```

Authenticated:

```text
My stories

Profile

Sign out
```

The actual full menu-state artboard may be specified separately if required.

---

## Responsive Priorities

Preserve in this order:

```text
1. Brand recognition

2. Navigation access

3. Profile access

4. Locale access

5. Optional display name
```

Hide first:

```text
profile display name
```

Then:

```text
desktop navigation labels
```

Never hide:

```text
brand icon

profile access

locale access

navigation access
```

---

## Requirements

```text
No horizontal overflow.

Minimum touch target 44px.

No collapsed unreadable text.

No layout jump between guest and authenticated variants.

Brand remains legible.

Profile and locale controls remain independently accessible.

Mobile menu control has an explicit accessible label.
```

---

# 8. Active Navigation Rules

An active navigation item must use at least two signals.

Allowed combinations:

```text
yellow text + underline

yellow marker + semibold label

yellow border + active indicator
```

Do not use:

```text
yellow text only

large filled yellow pill

glowing neon state

animated gradient
```

Hover treatment:

```text
subtle underline

border emphasis

text contrast increase
```

Avoid large filled hover backgrounds.

---

# 9. Profile Control Rules

## Guest

Accessible name:

```text
Sign in
```

Visual:

```text
outline profile icon
```

Optional desktop label:

```text
Sign in
```

---

## Authenticated

Accessible name:

```text
Open profile menu
```

Visual:

```text
profile icon

avatar placeholder

or user initials
```

Optional:

```text
display name
```

The profile control must not reveal:

```text
email

phone number

DID

wallet address

internal role IDs
```

---

# 10. Locale Control Rules

Supported locales:

```text
EN

ET

RU
```

Display requirements:

```text
current locale visible

not flag-only

clear expanded state

keyboard accessible

screen-reader label
```

Example accessible label:

```text
Change language. Current language: English.
```

---

# 11. Responsive Behaviour Panel

Display a compact breakpoint model.

```text
Wide Desktop

Brand + full nav + profile + locale


Medium Desktop / Tablet

Brand + reduced spacing + full nav or abbreviated profile


Narrow / Mobile

Brand + locale + profile + menu
```

Do not hardcode exact breakpoint values in this visual specification unless product engineering has already defined them.

This artboard defines behavioural priority, not CSS implementation.

---

# 12. Accessibility Requirements

```text
WCAG AA contrast minimum

Visible keyboard focus

Colour never carries meaning alone

Minimum touch target 44px on narrow layouts

Semantic navigation landmark

Accessible names for icon-only controls

Current page exposed through aria-current equivalent

Locale menu keyboard navigable

Logical tab order

No focus loss after locale change
```

---

# 13. Supersede Rules

This specification supersedes M19 Header Strip where the two artefacts conflict.

Explicitly superseded behaviour:

```text
SYNCED badge in primary header chrome
```

Canonical rule:

```text
Do not include a SYNCED badge or label in the public header.
```

System synchronization status, when required, belongs in:

```text
system status area

diagnostic surface

footer status area

or dedicated operational view
```

It does not belong in the primary public navigation chrome.

Other non-conflicting M19 decisions may remain valid until separately superseded.

---

# 14. Narrative Rules

The public header should communicate:

```text
stability

clarity

system identity

quiet confidence
```

It must not communicate:

```text
promotional urgency

gamification

political messaging

surveillance

technical noise

system self-congratulation
```

---

# 15. Traceability

Functional code:

```text
PH-H
```

Mockup:

```text
M129
```

Supersedes where conflicting:

```text
M19 — Header Strip
```

Related package artefacts:

```text
PH-F — Public Footer Chrome

PH-P — Public Home Page
```

Related design-system components:

```tsx
<PublicHeader />

<BrandBlock />

<PrimaryNavigation />

<ProfileControl />

<LocaleControl />

<MobileNavigationControl />
```

Component names are proposed until implementation naming is frozen.

---

# 16. Out of Scope

This artboard does not define:

```text
profile dropdown contents in full detail

mobile navigation drawer in full detail

authentication screens

homepage hero

footer

system-status diagnostics

SYNCED state

notification centre

search

wallet controls

token balances
```

These should be documented separately where needed.

---

# 17. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
The DOGEstonia brand anchors the left side.

Public navigation is clear and stable.

Guest and authenticated sessions use the same header structure.

Profile and locale controls remain available in every state.

The locale menu is compact and accessible.

The header adapts cleanly to narrow and mobile widths.

SYNCED is intentionally absent from primary chrome.

The header behaves as application infrastructure, not as a marketing hero.
```

The final result should feel like stable, high-trust public application chrome for a civic operating system: compact, precise and immediately understandable.