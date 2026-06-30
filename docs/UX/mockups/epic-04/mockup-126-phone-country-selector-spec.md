# File Name

```text
mockup-126-phone-input-country-selector-waitlist-routing-spec.md
```

# Mockup 126 Spec — Phone Input: Country Selector & Waitlist Routing

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Phone-Input-Country-Selector-Waitlist-Routing-sheet.png`

**Version:** v1.0

**Status:** Active SSOT

**Epic:** Identity (Epic-04)

**Story:** STORY-SPA-ID-10

**Priority:** MUST

---

# 1. Purpose

This artboard defines the complete UX for country selection inside the phone verification flow.

Unlike M32, which documents the OTP verification process itself, this mockup documents the decision point that determines whether the user enters the verification flow or is redirected into the regional waitlist flow.

The objective is to make country support transparent before any verification request is initiated.

The user should never:

- enter a phone number,
- request an OTP,
- receive an avoidable backend error

before discovering that the selected country is currently unsupported.

The chosen country also becomes the source of truth for waitlist enrollment.

---

# 2. Screen Type

Type:

```text
Route-level panel
```

Host Route:

```text
/verify
```

Host Component:

```tsx
<PhoneVerificationFlow />
```

Embedded Component:

```tsx
<PhoneInputPanel />
```

This is not a standalone page.

It is one panel inside the verification flow.

---

# 3. Visual Language

Use the standard DOGEstonia visual language.

```text
dark civic-tech operating system aesthetic

black / charcoal surfaces

subtle textured background

soft glassmorphism panels

thin borders

white typography

muted gray secondary text

DOGEstonia yellow accent

enterprise SaaS appearance

Linear / GitHub / Jira clarity
```

Avoid:

```text
marketing hero layouts

consumer onboarding wizard

social login

crypto styling

wallet UI

token balances

neon

bright gradients

illustrations

mascots

confetti
```

---

# 4. Artboard Structure

Display three runtime states.

Only one state exists during execution.

Arrange left-to-right.

Connect states using directional arrows.

Add implementation side panels:

- Routing Logic
- Localization
- Accessibility
- Traceability

---

# State A — Supported Country (Default)

## Purpose

The user selected Estonia.

This is the normal verification path.

---

### Title

```text
Verify Your Phone
```

---

### Message

```text
Choose your country and enter your phone number to receive a verification code.
```

---

### Country Selector (Collapsed)

Display:

🇪🇪 Estonia

+372

Chevron Down

---

### Phone Input

Label

```text
Phone Number
```

Layout

```text
+372 | ____________
```

---

### Primary CTA

```text
Send Verification Code
```

DOGEstonia yellow.

---

### Secondary CTA

```text
Back
```

---

### Requirements

Estonia is pre-selected.

Phone field enabled.

OTP available.

Happy-path.

---

# State B — Country Selector Expanded

## Purpose

User opens the selector.

---

### Title

```text
Choose Country
```

---

### Search Field (Optional)

Placeholder

```text
Search country
```

---

### Country List

Example entries:

```text
🇪🇪 Estonia (+372)

🇱🇻 Latvia (+371)

🇱🇹 Lithuania (+370)

🇫🇮 Finland (+358)

🇸🇪 Sweden (+46)

🇩🇪 Germany (+49)

🇬🇧 United Kingdom (+44)

🇺🇸 United States (+1)

🇵🇱 Poland (+48)

🇫🇷 France (+33)
```

Estonia is marked as selected.

Supported countries may show:

```text
Supported
```

Unsupported countries:

```text
Available Soon
```

or no badge (implementation decision).

---

### Requirements

Keyboard accessible.

Screen-reader accessible.

Arrow-key navigation.

Enter selects.

Escape closes.

Focus remains trapped while open.

Uniform row height.

Flag + localized country name + dial prefix.

---

# State C — Unsupported Country Selected

Example:

🇩🇪 Germany (+49)

---

## Purpose

The user selected a country that is not yet supported.

No OTP request is possible.

Instead the user is routed toward the waitlist.

---

### Title

```text
DOGEstonia Isn't Available In Germany Yet
```

---

### Inline Information Banner

```text
DOGEstonia isn't available in Germany yet.

Join the waitlist and we'll let you know when it becomes available.
```

Tone:

Informational.

Not rejection.

Not warning.

---

### Country Selector

Collapsed.

Shows

🇩🇪 Germany

+49

---

### Phone Field

Label

```text
Phone Number (optional)
```

State

Disabled appearance.

Muted.

Optional.

No validation.

No OTP.

---

### Primary CTA

```text
Join Waitlist
```

DOGEstonia yellow.

---

### Secondary CTA

```text
Back
```

---

### Transition

Arrow annotation:

```text
→ Opens M123 Country Waitlist Flow
```

Do not duplicate M123 screens.

Only reference them.

---

### Requirements

No OTP request.

No SMS.

No backend verification.

Country selection becomes waitlist context.

Panel height remains identical to State A.

No layout jump.

---

# 5. Component Requirements

Country selector:

```text
Accessible

Keyboard navigable

Screen-reader compatible

Flag

Localized country name

Dial prefix

Estonia default
```

The component clearly distinguishes:

```text
Supported

↓

OTP verification

Unsupported

↓

Waitlist
```

Panel height must remain constant across all states.

---

# 6. Routing Logic Panel

Display:

```text
Country Selected

↓

Is Supported?

YES

↓

Phone Verification (M32)

NO

↓

Country Waitlist (M123)
```

---

# 7. Localization Panel

The mockup must demonstrate runtime language switching.

Supported locales:

```text
English

Estonian

Russian
```

Localization namespace:

```text
phone.country.*
```

Translate:

- labels
- helper text
- buttons
- information banners

Do not translate:

- flags
- endonyms
- dial prefixes

---

# 8. Accessibility Panel

Display implementation reminders:

```text
Keyboard navigation

Arrow keys

Escape closes dropdown

Enter selects

Visible focus state

Screen-reader labels

Minimum touch target 44px
```

---

# 9. State Mapping

```text
supported_country

↓

State A

country_dropdown_open

↓

State B

unsupported_country

↓

State C

Join Waitlist

↓

M123 Country Waitlist
```

---

# 10. Traceability

Story:

```text
STORY-SPA-ID-10
```

Related mockups:

```text
M32 — Phone Verification Flow

M123 — Country Waitlist

M121 — Web Authentication

M120 — GPT Story Authorization Flow
```

Related component:

```tsx
<PhoneInputPanel />

<CountrySelector />

<PhoneVerificationFlow />
```

---

# 11. Out Of Scope

This artboard intentionally does NOT specify:

- per-country phone formatting
- national numbering plans
- dynamic phone masks
- country-specific validation
- libphonenumber integration

These belong to:

```text
ID-11 — Phone Formatting & Validation
```

---

# 12. Design Goal

Within five seconds, a designer, developer, or product manager should immediately understand:

```text
Country selection happens before OTP.

Estonia follows the verification flow.

Unsupported countries never request SMS.

Unsupported countries are routed directly to the waitlist.

The selected country becomes the waitlist context.

The user never reaches a dead end.
```

The experience should feel like a mature SaaS identity flow with transparent regional rollout rather than a failed phone verification attempt.