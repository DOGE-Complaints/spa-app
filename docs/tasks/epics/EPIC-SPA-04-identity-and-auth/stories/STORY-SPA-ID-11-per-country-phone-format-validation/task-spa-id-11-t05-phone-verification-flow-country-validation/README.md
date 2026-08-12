# SPA-ID-11-T05 — PhoneVerificationFlow country validation wire-up

**Story:** [`../STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md)  
**Decision Ref:** FR-11.2 consumption; Routes/API migration `validateEstonianPhone`/`formatEstonianPhone`  
**Depends on:** T02, T04  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T12:50:19Z
**Status:** Done
**Completed:** 2026-06-30T13:08:15Z

## Purpose
Replace EE-only validation in [`PhoneVerificationFlow.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx) with `validatePhoneForCountry` / `formatPhoneForCountry` using `selectedCountry` from ID-10 state on phone submit and OTP request path.

## Risk
Submitting malformed E.164 breaks `/auth/phone/request`; EE regression breaks primary verification path.

## Code Facts (re-verify at execute)
- [`PhoneVerificationFlow.jsx:249-250`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx#L249) — `formatEstonianPhone` / `validateEstonianPhone` on submit.
- ID-10 — `selectedCountry` state + `onCountryChange` already wired.
- [`PhoneVerificationFlow.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx) — happy path + unsupported routing tests.

## AC / DoD
- [x] (P0) Flow uses `*ForCountry` with current `selectedCountry` (AC #2).
- [x] (P0) EE OTP happy-path unchanged (same E.164 output for valid EE digits).
- [x] (P1) `validationHintKey` propagated to panel from country-aware validation.
- [x] (P1) Extend `PhoneVerificationFlow.test.jsx` for country-aware submit.

## Where to change
- `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.jsx`
- `spa-app/src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx`

## Out of scope
- Panel placeholder UI (T04). Dataset/i18n (T01–T03). Waitlist routing (ID-10).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx
```
