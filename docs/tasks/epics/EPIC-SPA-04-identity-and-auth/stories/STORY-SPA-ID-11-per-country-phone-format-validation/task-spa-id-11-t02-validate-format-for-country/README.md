# SPA-ID-11-T02 — validatePhoneForCountry + formatPhoneForCountry

**Story:** [`../STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md)  
**Decision Ref:** backlog FR-11.2, FR-11.3; [verificationFlowState.js](../../../../../../../../src/auth/verificationFlowState.js)  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T12:50:19Z
**Status:** Done
**Completed:** 2026-06-30T13:08:15Z

## Purpose
Generalize phone validation/formatting: `validatePhoneForCountry(country, nationalDigits)` → `{ valid, hintKey }`; `formatPhoneForCountry` → E.164. Estonia remains special case with **backward compat** for existing OTP happy-path (`+372` 7–8 digits).

## Risk
Breaking `validateEstonianPhone` behavior regresses ID-04/ID-10 OTP path and existing tests.

## Code Facts (re-verify at execute)
- [`validateEstonianPhone`](../../../../../../../../src/auth/verificationFlowState.js#L48) / [`formatEstonianPhone`](../../../../../../../../src/auth/verificationFlowState.js#L37) — EE-only.
- [`PhoneInputPanel.jsx:35`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx#L35) — calls `validateEstonianPhone(previewPhone)` when supported.
- [`verificationFlowState.test.js`](../../../../../../../../src/auth/__tests__/verificationFlowState.test.js) — EE pattern tests.

## AC / DoD
- [x] (P0) `validatePhoneForCountry` + `formatPhoneForCountry` implemented using T01 dataset (FR-11.2, FR-11.3, AC #2).
- [x] (P0) EE path equivalent to current `validateEstonianPhone`/`formatEstonianPhone` (OTP happy-path preserved).
- [x] (P1) `verificationFlowState.js` re-exports or thin-wraps `*ForCountry` (Routes/API migration note).
- [x] (P1) Unit tests: EE valid/invalid; ≥1 non-EE country length check.

## Where to change
- `spa-app/src/auth/phoneFormats.js` (extend T01)
- `spa-app/src/auth/verificationFlowState.js` (re-export / deprecate Estonian-only)
- `spa-app/src/auth/__tests__/phoneFormats.test.js`
- `spa-app/src/auth/__tests__/verificationFlowState.test.js` (compat)

## Out of scope
- PhoneInputPanel UI wiring (T04). PhoneVerificationFlow submit (T05). i18n (T03).

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/phoneFormats.test.js src/auth/__tests__/verificationFlowState.test.js
```
