# SPA-ID-11-T04 — PhoneInputPanel M127 validation UI

**Story:** [`../STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md)  
**Decision Ref:** FR-11.4, FR-11.5; [mockup-127](../../../../../../UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md) States A–D; extends [mockup-126](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md)  
**Depends on:** T02, T03  
**ui_scope:** `visual` (M127 anchor)  
**ui_anchor:** `true`  
**ui_gate:** on  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T12:50:19Z
**Status:** Done
**Completed:** 2026-06-30T13:08:15Z

## Purpose
Wire country-driven placeholder, mask, helper/hint/status into [`PhoneInputPanel.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx): country change updates format in real time (M127 A/B/C/D). Supported → gates Send Code; unsupported → format optional (FR-11.5, does not block waitlist).

## Risk
Regressing ID-10 unsupported waitlist path or EE OTP gating; visual drift from M127 states.

## Code Facts (re-verify at execute)
- [`PhoneInputPanel.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx) — `validateEstonianPhone`; static `phone.input.placeholder` for supported.
- [`PhoneVerificationFlow.css`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.css) — panel styles from ID-10.
- M127 host: `/#/verify`, component `PhoneInputPanel` inside `PhoneVerificationFlow`.
- ID-10 T03 anchor pattern: `ui-baseline/pre-implement|post-implement/` PNGs + puppeteer script.

## AC / DoD
- [x] (P0) Country switch updates placeholder/length hint in real time (FR-11.4, AC #3).
- [x] (P0) Supported country: invalid format disables Send Code; valid enables (M127 A/B).
- [x] (P0) Unsupported country: format validation does not block Join Waitlist (FR-11.5).
- [x] (P0) Localized country-specific hints via `t()` + `formatI18nMessage` (AC #4).
- [x] (P1) UI-0..UI-3 per [spa-ui-visual-pipeline.md](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/spa-ui-visual-pipeline.md); post-implement PNGs for M127 A/B/C/D.
- [x] (P1) `@mockup:` mockup-127 attached in P3.

## Where to change
- `spa-app/src/components/PhoneVerification/PhoneInputPanel.jsx`
- `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.css` (if hint/status styles)
- This task folder: `ui-mockup-spec.md`, `ui-baseline/`

## Out of scope
- Country selector (ID-10). Flow submit wiring (T05). New routes/API.

## Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx
cd spa-app && npm run test:ui:verify-host
# puppeteer M127 script (T06 may own repeatable gate)
```
