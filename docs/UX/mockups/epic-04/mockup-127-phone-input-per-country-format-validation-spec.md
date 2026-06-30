# Mockup 127 Spec — Phone Input: Per-Country Format & Validation

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Phone-Input-Per-Country-Format-Validation-sheet.png`

**Version:** v1.0

**Status:** Active SSOT

**Epic:** Identity (Epic-04)

**Story:** STORY-SPA-ID-11

**Priority:** MUST

---

# 1. Purpose

This artboard defines how the phone input dynamically adapts to the selected country.

Unlike M126, which documents country selection and waitlist routing, this specification defines country-specific formatting, placeholder generation, validation hints and recoverable validation feedback.

The selected country determines:

- phone placeholder
- input mask
- expected national number length
- validation rules
- example number
- helper text

The objective is to help users enter a correct phone number before requesting SMS verification while keeping validation understandable and recoverable.

Validation must guide users.

It must never feel punitive.

---

# 2. Screen Type

Type:

```text
Input component state sheet
```

Host Route

```text
/verify
```

Host Component

```tsx
<PhoneVerificationFlow />
```

Embedded Component

```tsx
<PhoneInputPanel />

<PhoneNumberField />
```

This is not a standalone page.

It documents one reusable component inside the verification flow.

---

# 3. Visual Language

Use the established DOGEstonia design language.

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

Avoid

```text
red panic styling

consumer onboarding

marketing hero layouts

crypto visuals

wallet UI

neon

bright gradients

illustrations

mascots

confetti
```

Validation feedback should remain calm and diagnostic.

---

# 4. Artboard Structure

Display four runtime states.

Arrange left-to-right.

Connect with directional arrows.

Implementation panels on the right:

- PHONE_FORMAT_BY_COUNTRY
- Localization
- Validation Rules
- Traceability

---

# State A — Valid Phone Number (Estonia)

## Purpose

Happy-path for Estonia.

The entered phone number satisfies all validation requirements.

---

### Title

```text
Phone Number
```

---

### Country

```text
🇪🇪 Estonia

+372
```

---

### Placeholder

```text
5555 5555
```

---

### Example

```text
Example: 5555 5555
```

---

### Helper Text

```text
Enter your Estonia phone number.
```

---

### Validation Status

```text
Valid
```

Subtle positive indication.

No bright green success banners.

---

### Primary CTA

```text
Send Verification Code
```

Enabled.

---

### Secondary CTA

```text
Back
```

---

### Requirements

Input follows Estonia dataset.

No formatting warnings.

CTA enabled.

---

# State B — Invalid Format (Estonia)

## Purpose

The phone number does not satisfy Estonia formatting rules.

---

### Title

```text
Phone Number
```

---

### Country

```text
🇪🇪 Estonia

+372
```

---

### Invalid Input Example

```text
55555
```

---

### Diagnostic Hint

```text
Enter a valid Estonia phone number.
```

---

### Helper Hint

```text
Estonia phone numbers have 7–8 digits after +372.
```

---

### Example

```text
Example: 5555 5555
```

---

### Validation Status

```text
Needs correction
```

Field appears in diagnostic style.

Muted border.

No aggressive red outline.

No warning icon.

No "Oops".

---

### Primary CTA

```text
Send Verification Code
```

Disabled.

---

### Secondary CTA

```text
Back
```

---

### Requirements

Validation remains recoverable.

The user understands exactly what should be corrected.

---

# State C — Different Country (Germany)

## Purpose

Changing the country immediately changes formatting expectations.

---

### Country

```text
🇩🇪 Germany

+49
```

---

### Placeholder

Example

```text
1512 3456789
```

---

### Example

```text
Example: 1512 3456789
```

---

### Helper Text

```text
Enter your Germany phone number.
```

---

### Validation Hint

```text
German mobile numbers usually contain 10–11 digits after +49.
```

---

### Primary CTA

```text
Send Verification Code
```

Enabled only if valid.

---

### Requirements

Everything updates automatically after country selection.

No page reload.

No separate wizard step.

---

# State D — Empty Field

## Purpose

Initial state before typing.

---

### Placeholder

Country-specific.

For Estonia:

```text
5555 5555
```

---

### Hint

```text
Enter your phone number.
```

---

### Validation Status

Neutral.

No warning.

No error.

---

### Primary CTA

```text
Send Verification Code
```

Disabled.

---

### Secondary CTA

```text
Back
```

---

### Requirements

Neutral guidance only.

Do not display validation errors before user interaction.

---

# 5. Data Contract

Phone formatting is driven entirely by:

```typescript
PHONE_FORMAT_BY_COUNTRY
```

Recommended structure:

```typescript
interface PhoneCountryFormat {

    countryCode: string;

    countryName: string;

    dialPrefix: string;

    supported: boolean;

    nationalNumberLengths: number[];

    pattern: string;

    examplePlaceholder: string;

    validationHint: string;

}
```

Example:

```typescript
EE

dialPrefix: "+372"

nationalNumberLengths: [7,8]

pattern: "#### ####"

examplePlaceholder: "5555 5555"
```

```typescript
DE

dialPrefix: "+49"

nationalNumberLengths: [10,11]

pattern: "#### ########"

examplePlaceholder: "1512 3456789"
```

The frontend derives:

- placeholder
- mask
- example
- helper text
- validation rules

from this dataset.

---

# 6. Validation Rules Panel

Display

```text
Country Selected

↓

Load PHONE_FORMAT_BY_COUNTRY

↓

Apply Placeholder

↓

Apply Mask

↓

Apply Validation Rules

↓

Apply Hint

↓

Enable / Disable CTA
```

Additional note

```text
Unsupported-country waitlist mode

↓

Phone field becomes optional

↓

Validation disabled

↓

See M126 / M123
```

---

# 7. Localization

Support runtime language switching.

Languages

```text
English

Estonian

Russian
```

Namespace

```text
phone.format.*
```

Localized strings include:

```text
Phone Number

Example

Enter your phone number

Enter a valid {country} phone number

{country} phone numbers have {lengths} digits after {prefix}

Example: {example}
```

Dynamic placeholders

```text
{country}

{example}

{lengths}

{prefix}
```

Flags and country names are not translated.

---

# 8. Traceability

Story

```text
STORY-SPA-ID-11
```

Depends on

```text
STORY-SPA-ID-10
```

Related Mockups

```text
M126 — Phone Input Country Selector & Waitlist Routing

M32 — Phone Verification Flow

M37 — Verification Error States

M123 — Country Waitlist
```

Related Components

```tsx
<PhoneInputPanel />

<CountrySelector />

<PhoneNumberField />

<PhoneValidationHint />
```

---

# 9. Out Of Scope

This artboard intentionally excludes:

- actual SMS sending
- OTP verification
- backend validation
- libphonenumber integration
- international carrier lookup
- fraud detection
- phone ownership verification

Those belong to later Identity stories.

---

# 10. Design Goal

Within five seconds a designer, developer or QA engineer should immediately understand:

```text
The selected country immediately determines the phone format.

Placeholder, mask, example and validation hints all come from PHONE_FORMAT_BY_COUNTRY.

Validation is informative and recoverable.

Errors explain how to fix the number.

Changing the country immediately updates formatting.

Waitlist mode never requires phone formatting because the phone number becomes optional.
```

The experience should feel like a mature enterprise identity component that guides users toward successful verification rather than blocking them with generic validation errors.