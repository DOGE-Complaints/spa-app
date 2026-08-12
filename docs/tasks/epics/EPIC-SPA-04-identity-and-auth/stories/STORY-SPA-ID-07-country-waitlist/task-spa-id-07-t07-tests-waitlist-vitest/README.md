# SPA-ID-07-T07 — Vitest waitlist coverage

**Story:** [`../STORY-SPA-ID-07-country-waitlist.md`](../STORY-SPA-ID-07-country-waitlist.md)  
**Decision Ref:** pipeline story AC #1–#6; FR-07.1–07.7  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T08:57:57Z

## Purpose
Add Vitest coverage for waitlist i18n guards, `waitlistService`, CountryWaitlist panels, `dialPrefixToCountry`, and VerifyPage handoff from `COUNTRY_NOT_ALLOWED`. Regression gate before story close.

## Risk
Untested handoff regressions re-break ID-05 → ID-07 seam silently.

## Code Facts (re-verify at execute)
- Baseline suite green at intake — `npm run test:run` (307+ tests post ID-06).
- [`PhoneVerificationFlow.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx) — COUNTRY_NOT_ALLOWED + `onJoinWaitlist` already covered; extend for new callback shape if T06 changes it.

## AC / DoD
- [ ] (P0) Tests assert 4 M123 states reachable (AC #1) — at least via VerifyPage integration test.
- [ ] (P0) Form: email required; country pre-filled editable (AC #2).
- [ ] (P0) Error kinds distinct in UI (AC #4).
- [ ] (P0) `waitlistService` mock path + flag behavior (AC #5).
- [ ] (P0) i18n: no missing `waitlist.*` keys (AC #6).
- [ ] (P1) Full `npm run test:run` green; no regressions ID-04/05 phone flow.

## Where to change
- `spa-app/src/components/CountryWaitlist/__tests__/*.test.jsx`
- `spa-app/src/services/__tests__/waitlistService.test.js` (expand if T02 minimal)
- `spa-app/src/pages/__tests__/VerifyPage.test.jsx`
- `spa-app/src/utils/__tests__/dialPrefixToCountry.test.js` (if util extracted)

## Out of scope
- Story gate doc (T08). Live E2E puppeteer (optional UI-3).

## Verification
```bash
cd spa-app && npm run test:run
```
