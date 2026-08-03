# DOGEstonia Button System — Developer Specification

**Functional code:** DS-BTN  
**Related artboard:** M134 — Button System: Classification, States & Examples  
**Related product specification:** `mockup-134-button-system-classification-spec.md`  
**Version:** v1.0  
**Status:** Implemented (STORY-SPA-G10 / `pkg-000044`)  
**Area:** Design System / Components  
**Target application:** `spa-app`  
**Stack:** React + Vite  
**Priority:** MUST  

**Backlog:** [STORY-SPA-G10-button-system-ds-btn](../tasks/backlog-stories/design-foundation/STORY-SPA-G10-button-system-ds-btn.md) (Done · `pkg-000044`)  
**Developer guide (day-to-day):** [button-system-developer-guide.md](../runtime-docs/button-system-developer-guide.md)  
**Visual:** [design-system-buttons-spec.png](design-system-buttons-spec.png)

---

# 1. Purpose

This document translates the M134 button-system artboard and classification specification into an implementation contract for frontend developers.

It defines:

* component boundaries;
* supported button variants;
* semantic properties;
* state behaviour;
* icon composition;
* accessibility requirements;
* loading and disabled behaviour;
* navigation rules;
* responsive behaviour;
* token dependencies;
* expected test coverage;
* migration rules for existing screens.

The implementation must preserve the central design-system principle:

```text
Function determines hierarchy.

Hierarchy determines appearance.
```

The component API must not encode business-specific button types such as:

```text
SubmitStoryButton

LoginButton

RetryButton

DashboardButton
```

Instead, product actions must be expressed using a reusable semantic component model.

---

# 2. Implementation Scope

The initial button package must provide:

```tsx
<Button />

<IconButton />

<ButtonGroup />

<MenuAction />
```

Optional future component:

```tsx
<SplitButton />
```

`SplitButton` is reserved and must not be implemented unless a concrete product requirement appears.

The initial implementation must support:

```text
Primary buttons

Secondary buttons

Tertiary buttons

Link-style buttons

Destructive variants

Text-only buttons

Icon + text buttons

Icon-only buttons

Full-width buttons

Compact buttons

Menu-row actions

Loading states

Disabled states

Responsive button groups
```

---

# 3. Proposed File Structure

```text
src/
└── components/
    └── Button/
        ├── Button.jsx
        ├── Button.module.css
        ├── IconButton.jsx
        ├── IconButton.module.css
        ├── ButtonGroup.jsx
        ├── ButtonGroup.module.css
        ├── MenuAction.jsx
        ├── MenuAction.module.css
        ├── buttonTypes.js
        ├── buttonUtils.js
        ├── index.js
        └── __tests__/
            ├── Button.test.jsx
            ├── IconButton.test.jsx
            ├── ButtonGroup.test.jsx
            └── MenuAction.test.jsx
```

If the project uses plain CSS rather than CSS Modules, equivalent paths are acceptable:

```text
Button.css

IconButton.css

ButtonGroup.css

MenuAction.css
```

The component contract must remain unchanged.

---

# 4. Foundation Dependencies

The button package depends on design-system tokens.

Target file:

```text
src/styles/tokens.css
```

Required token families:

```text
color

typography

spacing

border

radius

focus

motion

control height
```

Buttons must not define arbitrary raw colour values inside component CSS after the token foundation is available.

Temporary hardcoded values are acceptable only during migration and must be marked with:

```text
TODO DS-BTN: replace with semantic token
```

---

# 5. Semantic Component Model

A button is defined across independent axes:

```text
Hierarchy

Intent

Size

Form factor

Runtime state
```

These axes must not be collapsed into one overloaded `variant` property.

Recommended conceptual usage:

```tsx
<Button
  hierarchy="primary"
  intent="submit"
  size="medium"
>
  Submit story
</Button>
```

The `hierarchy` property controls visual prominence.

The `intent` property describes behaviour and may control icons, accessible metadata or destructive treatment.

---

# 6. `<Button />` API

## 6.1 Proposed Props

```tsx
<Button
  hierarchy="primary"
  intent="commit"
  size="medium"
  type="button"
  disabled={false}
  loading={false}
  fullWidth={false}
  leadingIcon={null}
  trailingIcon={null}
  loadingLabel={undefined}
  href={undefined}
  external={false}
  target={undefined}
  rel={undefined}
  onClick={undefined}
  className={undefined}
  ariaLabel={undefined}
>
  Button label
</Button>
```

---

## 6.2 Prop Definitions

### `hierarchy`

Allowed values:

```text
primary

secondary

tertiary

link
```

Default:

```text
secondary
```

The default must not be `primary`, because missing configuration must not create accidental visual dominance.

---

### `intent`

Allowed values:

```text
commit

continue

navigate

external

open

dismiss

cancel

reset

retry

destructive

authentication

submission

verification
```

Default:

```text
commit
```

`intent` must not automatically change hierarchy except for destructive styling.

Business behaviour remains explicitly controlled by the caller.

---

### `size`

Allowed values:

```text
small

medium

large
```

Default:

```text
medium
```

---

### `type`

Allowed values follow native HTML:

```text
button

submit

reset
```

Default:

```text
button
```

Never default a reusable button to:

```text
submit
```

This prevents accidental form submission.

---

### `disabled`

Type:

```ts
boolean
```

Default:

```text
false
```

Disabled buttons must not trigger `onClick`.

---

### `loading`

Type:

```ts
boolean
```

Default:

```text
false
```

When `loading=true`:

```text
activation is blocked

duplicate submission is prevented

aria-busy is exposed

button width remains stable

loading text is shown where defined
```

A loading button is functionally unavailable but should not rely exclusively on native `disabled` semantics if doing so would prevent the loading state from being announced correctly.

Implementation may use both:

```tsx
disabled={disabled || loading}
aria-busy={loading}
```

provided the loading label remains accessible.

---

### `loadingLabel`

Optional localized text.

Examples:

```text
Submitting…

Sending code…

Signing in…

Trying again…
```

If absent, the visible label may remain unchanged while a spinner appears.

For major asynchronous actions, an action-specific loading label is preferred.

---

### `fullWidth`

Type:

```ts
boolean
```

Default:

```text
false
```

Controls layout only.

It must not change hierarchy or typography.

---

### `leadingIcon`

Accepts:

```tsx
ReactNode
```

Use only when the icon adds functional meaning.

---

### `trailingIcon`

Accepts:

```tsx
ReactNode
```

Typical uses:

```text
direction

external handoff

dropdown

open-details affordance
```

Do not pass both leading and trailing icons without a documented need.

---

### `href`

When present, the component behaves as a navigational link.

The rendered element should be:

```html
<a>
```

or the project router link component.

It must not render a `<button>` that manually changes `window.location` for standard navigation.

---

### `external`

Type:

```ts
boolean
```

When true:

```text
the destination is external to the DOGEstonia SPA

an external indicator should normally be visible

safe rel attributes are applied when opening a new context
```

Recommended:

```tsx
rel="noopener noreferrer"
```

when:

```tsx
target="_blank"
```

The product may choose same-tab external handoff. `external=true` does not automatically require a new tab.

---

### `ariaLabel`

Required when the visible label does not fully communicate the action.

For text buttons, visible text should normally provide the accessible name.

Do not duplicate conflicting accessible labels.

---

# 7. Rendered Element Rules

## 7.1 Local Action

Use native:

```html
<button>
```

Examples:

```text
Try Again

Reset filters

Send verification code

Submit story
```

---

## 7.2 Internal Navigation

Use the SPA router link.

Example:

```tsx
<Link to="/board">
  Go to Dashboard
</Link>
```

Do not trigger internal route navigation through a generic `onClick` unless the router contract requires it.

---

## 7.3 External Navigation

Use an anchor:

```html
<a href="...">
```

Example:

```text
Submit a story ↗
```

The component must communicate the external handoff visibly and accessibly when relevant.

---

# 8. Hierarchy Implementation

## 8.1 Primary

Class example:

```text
button--primary
```

Visual contract:

```text
yellow filled background

dark readable text

high prominence

clear hover state

clear focus ring

darker pressed state
```

Usage rule:

```text
maximum one primary action per decision region
```

The component cannot enforce this globally, but design review and component documentation must.

---

## 8.2 Secondary

Class example:

```text
button--secondary
```

Visual contract:

```text
transparent or dark neutral surface

thin visible border

white text

subtle hover surface

no yellow fill
```

---

## 8.3 Tertiary

Class example:

```text
button--tertiary
```

Visual contract:

```text
transparent background

minimal border or no border

quiet white or secondary text

hover underline or subtle contrast change
```

---

## 8.4 Link Style

Class example:

```text
button--link
```

Visual contract:

```text
no container

text-level interaction

underline or equivalent hover affordance

visible focus outline
```

The rendered element still depends on behaviour:

```text
button for state mutation

link for navigation
```

---

# 9. Intent Implementation

Intent should be exposed as a data attribute:

```html
data-intent="retry"
```

or semantic class:

```text
button--intent-retry
```

Most intents do not require distinct visual styling.

They exist to:

```text
improve readability

support analytics

support testing

support future icon defaults

document product semantics
```

Do not create a unique colour for every intent.

---

# 10. Destructive Variant

When:

```tsx
intent="destructive"
```

the component receives reserved destructive styling.

Allowed combinations:

```text
secondary + destructive

tertiary + destructive

primary + destructive only inside explicit confirmation context
```

Recommended API usage:

```tsx
<Button
  hierarchy="secondary"
  intent="destructive"
>
  Delete draft
</Button>
```

The implementation should warn in development when:

```text
intent=destructive

and

hierarchy=primary
```

unless an explicit override is provided.

Possible optional prop:

```tsx
confirmedContext
```

However, this is not required in the first implementation.

---

# 11. Size Contract

## Small

Recommended visual height:

```text
32px
```

Use for:

```text
toolbars

feed-item controls

compact header controls
```

---

## Medium

Recommended height:

```text
40px
```

Default application control.

---

## Large

Recommended height:

```text
44–48px
```

Use for:

```text
mobile primary actions

verification panels

route-level action rows
```

Exact dimensions must be tokenized.

---

# 12. Button Anatomy

Every standard button may contain:

```text
container

leading icon

label

trailing icon

loading indicator
```

Canonical layout:

```text
[leading icon] [label] [trailing icon]
```

Rules:

```text
Icons align optically with text.

Icons do not reduce label readability.

Loading indicator does not cause width collapse.

Horizontal padding is size-dependent.

Gap between icon and label uses a token.
```

---

# 13. Icon Rules

Recommended icon size:

```text
16px for small

16–18px for medium

18–20px for large
```

Icons must use the DOGEstonia iconography system.

Expected icon set includes:

```text
arrow-right

external-link

refresh

filter

close

chevron-down

user

globe

copy

menu

check

warning
```

Icons must not be embedded as arbitrary emoji.

Avoid:

```text
platform-specific Unicode icons

decorative illustrations

mixed stroke weights

multicolour raster icons inside standard controls
```

---

# 14. `<IconButton />` API

## 14.1 Proposed Props

```tsx
<IconButton
  icon={<MenuIcon />}
  label="Open navigation menu"
  size="small"
  hierarchy="secondary"
  intent="open"
  disabled={false}
  loading={false}
  pressed={undefined}
  expanded={undefined}
  controls={undefined}
  onClick={undefined}
/>
```

---

## 14.2 Required `label`

`label` is mandatory.

It becomes the accessible name.

Example:

```tsx
<IconButton
  icon={<CloseIcon />}
  label="Close dialog"
/>
```

Do not accept icon-only buttons without an accessible label.

Development mode should emit an error or warning if the label is absent.

---

## 14.3 Supported Icon-Button Uses

```text
open menu

close temporary surface

copy reference

change locale

refresh

profile control on narrow viewport
```

Major task actions such as `Submit Story` should not be icon-only.

---

# 15. Toggle and Expanded States

Some icon buttons represent stateful controls.

Examples:

```text
menu open

locale selector open

filter panel expanded
```

Supported props:

```tsx
pressed
expanded
controls
```

Mapping:

```tsx
aria-pressed={pressed}
aria-expanded={expanded}
aria-controls={controls}
```

Only expose these attributes when semantically appropriate.

---

# 16. `<ButtonGroup />` API

## Proposed Props

```tsx
<ButtonGroup
  orientation="horizontal"
  align="start"
  mobileStack
  className={undefined}
>
  ...
</ButtonGroup>
```

Allowed orientations:

```text
horizontal

vertical
```

Default:

```text
horizontal
```

---

## Group Rules

A standard decision group should contain:

```text
one primary

optional one secondary

optional one tertiary
```

The component may provide development warnings when more than one primary child exists.

Suggested development-only validation:

```text
Warning: ButtonGroup contains multiple primary actions.
Confirm that the product defines equal action priority.
```

---

## Mobile Behaviour

When:

```tsx
mobileStack
```

the group becomes:

```text
vertical

full-width where configured

primary first

secondary second

tertiary last
```

Exact breakpoint must come from shared responsive tokens.

---

# 17. `<MenuAction />` API

## Proposed Props

```tsx
<MenuAction
  icon={<UserIcon />}
  intent="navigate"
  href="/profile"
  disabled={false}
>
  Profile
</MenuAction>
```

or:

```tsx
<MenuAction
  icon={<LogoutIcon />}
  intent="logout"
  onSelect={handleLogout}
>
  Log out
</MenuAction>
```

Allowed intents:

```text
navigate

action

logout

destructive
```

`Log out` is not destructive in PH-A v1.

---

## Menu Action Layout

```text
leading icon

label

optional trailing indicator
```

Requirements:

```text
full menu width

left-aligned

quiet hover background

visible focus

keyboard selectable

no primary yellow fill
```

---

# 18. Loading Behaviour

## Functional Requirements

When a button enters loading state:

```text
retain original width

prevent repeated action

show progress indicator

expose aria-busy

retain or replace label with localized loading label
```

Example:

```tsx
<Button
  hierarchy="primary"
  intent="submission"
  loading={isSubmitting}
  loadingLabel="Submitting…"
>
  Submit story
</Button>
```

The spinner must not be the only accessible indication.

---

## Layout Stability

The implementation should preserve button width using one of these patterns:

```text
minimum width derived from initial content

hidden original label occupying layout

fixed button-group width where specified
```

Do not allow:

```text
Submit story

↓

tiny spinner-only button
```

---

# 19. Disabled Behaviour

Disabled state is appropriate when:

```text
the user must complete an obvious local prerequisite

the action is temporarily unavailable due to input state

the next step cannot validly run
```

Examples:

```text
empty phone field

invalid phone format

missing required consent
```

Disabled buttons should not be used for unsupported product states when a recovery route exists.

Example:

```text
Unsupported country

Do not show disabled Send verification code

Show active Join waitlist instead
```

Nearby helper text must explain non-obvious disabled conditions.

---

# 20. Focus Behaviour

All controls require visible keyboard focus.

Required:

```text
focus-visible selector

high-contrast ring

ring offset from control border

consistent appearance across all hierarchy levels
```

Example:

```css
.button:focus-visible {
  outline: var(--button-focus-width) solid var(--button-focus-color);
  outline-offset: var(--button-focus-offset);
}
```

Do not remove focus outlines.

Focus treatment must remain visible on:

```text
yellow background

charcoal background

destructive background

disabled-looking surroundings
```

---

# 21. Hover and Pressed Behaviour

## Hover

Allowed:

```text
small colour shift

border emphasis

subtle background change

underline for link-style actions
```

## Pressed

Allowed:

```text
slightly darker background

minor inset effect

reduced shadow
```

Do not animate button scale unless later approved by the design system.

---

# 22. Motion

Use shared motion tokens.

Recommended transition duration:

```text
100–200ms
```

Apply to:

```text
background

border

text colour

icon colour

focus-adjacent visual state
```

Spinner animation must respect:

```text
prefers-reduced-motion
```

Under reduced motion, the spinner may use a static progress indicator or slower minimal movement.

---

# 23. Localization Requirements

Buttons must support:

```text
English

Estonian

Russian
```

Implementation rules:

```text
No fixed width based on English labels.

Use content-driven width.

Allow ButtonGroup wrapping.

Do not truncate primary task labels.

Avoid forced uppercase.

Use sentence case.
```

Examples:

```text
Submit a story

Esita lugu

Подать историю
```

Longer translated labels must not overlap icons or adjacent controls.

---

# 24. Content Rules

All button labels must:

```text
begin with an action verb where possible

describe the result

avoid technical implementation language

avoid vague labels
```

Preferred:

```text
Reset filters

Send verification code

Create a new story

Open DOGEstonia GPT
```

Avoid:

```text
OK

Yes

Proceed

Click here

Execute

POST
```

---

# 25. Internal vs External Navigation

## Internal

Use:

```tsx
<Link />
```

Examples:

```text
Go to Dashboard → /board

Profile → /profile

Open issue → /issue/:id
```

## External

Use:

```html
<a>
```

Example:

```text
Submit a story → DOGEstonia GPT URL
```

External handoff must include:

```text
external icon

or explicit helper text

or both
```

Accessible label example:

```text
Submit a story. Opens DOGEstonia GPT in an external service.
```

---

# 26. Form Integration

Buttons inside forms must receive explicit type.

Examples:

```tsx
<Button type="submit">
  Sign in
</Button>
```

```tsx
<Button type="button" onClick={handleCancel}>
  Cancel
</Button>
```

Do not rely on browser default button type.

---

# 27. Async Submission Pattern

Canonical pattern:

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

async function handleSubmit() {
  if (isSubmitting) return;

  setIsSubmitting(true);

  try {
    await submitAction();
  } finally {
    setIsSubmitting(false);
  }
}
```

The production implementation must additionally handle:

```text
error mapping

session expiration

verification-required responses

retry states

navigation after success
```

Buttons must not own full business-flow orchestration.

The parent flow or service layer remains responsible.

---

# 28. Story Submission Integration

M128 canonical behaviour:

```text
Submit Story

↓

POST /story-drafts/{draft_id}/submit

↓

202 → submitted state

403 verification_required → verification gate

401 → login

404 → expired state

503 → retry state
```

The button itself only emits the submit intent.

It must not contain gateway-specific branching.

Recommended separation:

```tsx
<StorySubmitPage>
  <Button onClick={handleSubmit} />
</StorySubmitPage>
```

---

# 29. Retry Integration

Retry buttons must repeat the failed operation without clearing valid user context.

Examples:

```text
M128 — retry story submission

M132 — reload public board
```

Retry handlers should preserve:

```text
active filters

draft ID

current route

user-entered data
```

unless the product contract explicitly says otherwise.

---

# 30. Verification Integration

Verification actions include:

```text
Send verification code

Verify & Continue

Resend code

Restart verification
```

Requirements:

```text
prevent repeated rapid activation

respect rate-limit response

provide specific loading labels

preserve the original protected action context
```

`Verify & Continue` must not lose the action that triggered verification.

---

# 31. Account-Control Integration

M130 canonical actions:

```text
Guest → Sign in → /login

Authenticated → Profile → /profile

Authenticated → Log out → clear session → /board
```

Implementation notes:

```text
Sign in may be a compact link-style or account control.

Profile and Log out are MenuAction rows.

Log out requires no confirmation modal in v1.

Log out is not styled as destructive.
```

---

# 32. Filter Integration

M132 canonical controls:

```text
Filters

Reset filters

Try Again

Open issue
```

Rules:

```text
Filters uses compact secondary or tertiary styling.

Reset filters uses link-style or tertiary styling.

Try Again uses primary styling in load-error state.

Open issue uses compact secondary, tertiary or link-style styling.
```

Do not style filter chips as standard buttons unless they are implemented through a separate chip component.

---

# 33. Responsive Requirements

## Desktop

```text
content-width controls

horizontal button groups

small and medium sizes preferred
```

## Tablet

```text
groups may wrap

labels remain complete

primary action stays visually dominant
```

## Mobile

```text
primary button may become full width

secondary button may stack below

minimum touch target 44px

vertical gap uses shared spacing tokens
```

Recommended mobile order:

```text
Primary

Secondary

Tertiary link
```

---

# 34. Accessibility Contract

Every button implementation must meet:

```text
WCAG AA contrast

keyboard activation

visible focus

semantic native element

accessible name

minimum touch target

loading announcement

disabled semantics

logical tab order
```

Specific rules:

```text
IconButton requires label.

External links communicate external behaviour where relevant.

Menu trigger exposes aria-expanded.

Loading button exposes aria-busy.

Disabled button exposes disabled state.

Pressed toggle exposes aria-pressed.

Current navigation should use aria-current on links, not button pressed state.
```

---

# 35. Suggested CSS State Selectors

```css
.button {}

.button--primary {}

.button--secondary {}

.button--tertiary {}

.button--link {}

.button--small {}

.button--medium {}

.button--large {}

.button--fullWidth {}

.button--destructive {}

.button[data-loading="true"] {}

.button:disabled {}

.button:hover {}

.button:active {}

.button:focus-visible {}
```

Avoid selectors tied to page-specific parents such as:

```css
.story-page .yellow-button
```

The button system must remain reusable and context-independent.

---

# 36. Proposed Semantic Tokens

```css
:root {
  --button-primary-bg: var(--color-accent-primary);
  --button-primary-bg-hover: var(--color-accent-active);
  --button-primary-text: var(--color-background-primary);

  --button-secondary-bg: transparent;
  --button-secondary-bg-hover: var(--color-background-secondary);
  --button-secondary-border: var(--color-border-default);
  --button-secondary-text: var(--color-text-primary);

  --button-tertiary-text: var(--color-text-primary);
  --button-tertiary-text-muted: var(--color-text-secondary);

  --button-link-text: var(--color-text-primary);
  --button-link-text-active: var(--color-accent-primary);

  --button-disabled-bg: var(--color-background-secondary);
  --button-disabled-text: var(--color-text-secondary);
  --button-disabled-opacity: 0.55;

  --button-destructive-text: var(--color-danger-text);
  --button-destructive-border: var(--color-danger-border);
  --button-destructive-bg-hover: var(--color-danger-bg-muted);

  --button-focus-color: var(--color-accent-primary);
  --button-focus-width: 2px;
  --button-focus-offset: 2px;

  --button-height-small: 32px;
  --button-height-medium: 40px;
  --button-height-large: 48px;

  --button-radius: 6px;

  --button-padding-inline-small: 10px;
  --button-padding-inline-medium: 14px;
  --button-padding-inline-large: 18px;

  --button-icon-gap: 8px;
  --button-transition-duration: 150ms;
}
```

Exact values remain subject to implementation validation against the current application.

---

# 37. Development Warnings

In development mode, the components should warn about common misuse.

Recommended warnings:

```text
IconButton rendered without label.

ButtonGroup contains multiple primary buttons.

Button has both href and onClick performing navigation.

External button has no visible or accessible external indication.

Loading button has no accessible label.

Destructive primary button used outside confirmed context.

Button uses both leading and trailing icons without explicit allowance.
```

Warnings should not break production.

---

# 38. Test Requirements

## 38.1 Button Unit Tests

Test:

```text
renders visible label

renders correct semantic element

supports internal link

supports external anchor

applies hierarchy class

applies size class

applies destructive class

blocks activation when disabled

blocks duplicate activation while loading

exposes aria-busy while loading

renders leading icon

renders trailing icon

uses type=button by default
```

---

## 38.2 IconButton Tests

Test:

```text
requires accessible label

renders icon

supports expanded state

supports pressed state

supports disabled state

supports keyboard activation
```

---

## 38.3 ButtonGroup Tests

Test:

```text
renders horizontal group

renders vertical group

supports responsive stack class

warns for multiple primary actions in development
```

---

## 38.4 MenuAction Tests

Test:

```text
renders as link when href exists

renders as button for local action

supports icon

supports logout intent

supports keyboard focus

does not apply destructive styling to logout by default
```

---

# 39. Integration Test Scenarios

Required product-level tests:

```text
Sign in control routes to /login.

Profile action routes to /profile.

Log out clears session and routes to /board.

Go to Dashboard routes to /board.

Submit a story opens the environment-backed GPT URL.

Reset filters clears active filters.

Try Again repeats the failed board request.

Submit Story cannot fire twice during loading.

Send Verification Code remains disabled for invalid input.

Unsupported country shows Join Waitlist instead of disabled OTP action.
```

---

# 40. Visual Regression Coverage

Create visual snapshots for:

```text
Primary — default, hover, focus, active, loading, disabled

Secondary — default, hover, focus, active, loading, disabled

Tertiary — default, hover, focus, active, disabled

Link-style — default, hover, focus, disabled

Destructive secondary — default, hover, focus, disabled

IconButton — default, hover, focus, active, disabled

MenuAction — default, hover, focus, destructive

Small, medium and large sizes

Icon + text

Full-width mobile button

Two-button group

Three-action group
```

M134 is the visual reference.

The implementation must not attempt to reproduce accidental text or rendering artifacts from the generated image.

The written specification remains authoritative for semantics.

---

# 41. Migration Strategy

## Phase 1 — Foundation

Create:

```text
button tokens

Button

IconButton

ButtonGroup

MenuAction
```

Add component tests and Storybook-equivalent development examples if available.

---

## Phase 2 — Public Home Package

Migrate:

```text
M129 header controls

M130 account controls

M131 footer interactions where button semantics apply

M132 board actions

M133 tutorial CTAs
```

---

## Phase 3 — Identity and Submission

Migrate:

```text
M28

M32

M37

M120

M126

M127

M128
```

---

## Phase 4 — Cleanup

Remove:

```text
duplicated button CSS

page-specific yellow-button classes

inconsistent loading spinners

arbitrary inline button styles

button-like div elements
```

---

# 42. Legacy Compatibility

During migration, legacy classes may coexist temporarily.

Example:

```tsx
<Button className="legacy-submit-action">
  Submit story
</Button>
```

This is transitional only.

New screens must not create new legacy button classes.

All new button styling must go through DS-BTN.

---

# 43. Acceptance Criteria

The implementation is complete when:

```text
A reusable Button component supports all four hierarchy levels.

Destructive treatment is available independently of hierarchy.

Small, medium and large sizes are supported.

Leading and trailing icons are supported.

Icon-only controls require accessible labels.

Loading state prevents duplicate activation.

Disabled state is visually and semantically correct.

Internal and external navigation render appropriate elements.

ButtonGroup supports responsive stacking.

MenuAction supports Profile and Log out patterns.

All states have automated tests.

All primary public-home actions use the shared button system.

No new page-specific button styling is introduced.
```

---

# 44. QA Checklist

## Visual

```text
Primary is visually dominant.

Secondary remains clearly subordinate.

Tertiary does not look disabled.

Link-style remains visibly interactive.

Focus ring is visible on all variants.

Loading state does not change width unexpectedly.

Disabled labels remain readable.

Icons align consistently.
```

## Functional

```text
No duplicate async submission.

Internal routes stay inside SPA navigation.

External GPT handoff uses configured URL.

Disabled buttons do not activate.

Loading buttons do not activate twice.

Menu actions close menus after selection.

Logout redirects only after session clear.
```

## Accessibility

```text
All controls reachable by keyboard.

All icon buttons have names.

Focus order is logical.

Loading state is announced.

Expanded menu controls expose state.

External action is understandable.

Contrast meets WCAG AA.
```

## Localization

```text
EN labels fit.

ET labels fit.

RU labels fit.

No forced uppercase.

No label truncation on primary actions.

Mobile groups stack when required.
```

---

# 45. Out of Scope

This developer specification does not define:

```text
chip implementation

tab implementation

dropdown container implementation

modal confirmation system

toast action system

pagination buttons

floating action buttons

final icon asset production

final destructive colour tokens

analytics event taxonomy

backend action contracts
```

These require separate component or product specifications.

---

# 46. Final Engineering Rule

The button component must remain visually reusable and functionally honest.

```text
Do not create a new button style for every new screen.

Do not derive semantics from colour alone.

Do not represent navigation as mutation.

Do not represent external handoff as internal navigation.

Do not hide loading, disabled or destructive meaning.

Do not allow visual hierarchy to drift from product priority.
```

The implementation is successful when a developer can add a new DOGEstonia action by selecting:

```text
the correct semantic element

the correct hierarchy

the correct functional intent

the correct size

the correct runtime state
```

without writing new button CSS.

```
```
