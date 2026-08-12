# SPA-ID-11-T06 — tests phone format validation

**Story:** [`../STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md)  
**Decision Ref:** backlog AC #6; FR-11.7 parity  
**Depends on:** T01–T05  
**ui_scope:** `extends`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T12:50:19Z
**Status:** Done
**Completed:** 2026-06-30T13:08:15Z

## Purpose
Consolidate Vitest coverage: `phoneFormats` unit tests, panel/flow integration, ≥3 countries (incl. EE), `IDENTITY_FLAT_KEYS` parity; optional puppeteer `country-format-m127-screenshot.mjs` for M127 states.

## Risk
Shallow tests miss country-switch regressions; missing EE parity allows OTP breakage.

## Code Facts (re-verify at execute)
- Existing: [`phoneFormats.test.js`](../../../../../../../../src/auth/__tests__/phoneFormats.test.js) (T01/T02), [`PhoneInputPanel.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx), [`verificationFlowState.test.js`](../../../../../../../../src/auth/__tests__/verificationFlowState.test.js).
- ID-10 pattern: [`country-selector-m126-screenshot.mjs`](../../../../../../../../tests/puppeteer/country-selector-m126-screenshot.mjs).

## AC / DoD
- [x] (P0) Validation tests for ≥3 countries including EE (AC #6).
- [x] (P0) Full `npm run test:run` green.
- [x] (P1) `IDENTITY_FLAT_KEYS` parity for new `phone.format.*` keys.
- [x] (P1) Optional: puppeteer M127 A/B/C/D captures under T04 `ui-baseline/post-implement/`.

## Where to change
- `spa-app/src/auth/__tests__/phoneFormats.test.js`
- `spa-app/src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx`
- `spa-app/src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx`
- Optional: `spa-app/tests/puppeteer/country-format-m127-screenshot.mjs`

## Out of scope
- Story gate doc (T07). Implementation of core logic (T01–T05).

## Verification
```bash
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:verify-host
```
