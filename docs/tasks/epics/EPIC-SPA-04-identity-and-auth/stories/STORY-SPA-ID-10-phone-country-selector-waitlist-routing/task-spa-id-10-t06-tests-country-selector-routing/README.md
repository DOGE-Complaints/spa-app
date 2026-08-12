# SPA-ID-10-T06 — Vitest country selector routing

**Story:** [`../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)  
**Decision Ref:** pipeline story AC #1–#8; FR-10.1–10.7  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T10:51:01Z

## Purpose
Regression gate: supported vs unsupported routing, `isSupportedDialPrefix`, i18n parity, VerifyPage waitlist handoff with explicit country, full `npm run test:run` green.

## Risk
Silent regressions on ID-04 OTP path or ID-05→ID-07 backend fallback.

## Code Facts (re-verify at execute)
- Baseline: **320 passed** post ID-07 (`bb74f15`).
- [`PhoneVerificationFlow.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx) — COUNTRY_NOT_ALLOWED handoff exists.
- No tests for country selector at intake.

## AC / DoD
- [ ] (P0) Tests: supported (+372) → submitPhoneRequest path; unsupported → no request + join callback (AC #3–#4).
- [ ] (P0) `isSupportedDialPrefix` unit coverage (AC #2).
- [ ] (P0) VerifyPage: join from unsupported uses selected country, not dial-derived (AC #5).
- [ ] (P0) i18n: `phone.country.*` parity all locales (AC #7).
- [ ] (P1) Full `npm run test:run` green (AC #8).
- [ ] (P1) Optional: extend `test:ui:verify-host` or puppeteer script for M126 states A/B/C.

## Where to change
- `spa-app/src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx` (new)
- `spa-app/src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx`
- `spa-app/src/pages/__tests__/VerifyPage.test.jsx`
- `spa-app/src/utils/__tests__/countriesDataset.test.js`

## Out of scope
- Story gate doc (T07).

## Verification
```bash
cd spa-app && npm run test:run
```
