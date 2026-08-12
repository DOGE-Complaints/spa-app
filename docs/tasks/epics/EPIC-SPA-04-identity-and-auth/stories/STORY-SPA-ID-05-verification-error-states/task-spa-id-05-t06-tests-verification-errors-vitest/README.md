# SPA-ID-05-T06 — Tests: verification errors (Vitest)

**Story:** [`../STORY-SPA-ID-05-verification-error-states.md`](../STORY-SPA-ID-05-verification-error-states.md)  
**Decision Ref:** backlog AC; T01–T05 deliverables  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T09:20:49Z

## Purpose
Regression coverage for error mapping, error state component, and flow branches when identity returns known error codes.

## Risk
Missing coverage on `profile_conflict` or `COUNTRY_NOT_ALLOWED` allows silent regression to generic failed panel.

## Code Facts (re-verify at execute)
- [`identityService.phone.test.js`](../../../../../../../../src/auth/__tests__/identityService.phone.test.js) — HTTP mock only, no error-code UI tests.
- [`PhoneVerificationFlow.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx) — happy-path + one confirm-failure without code assertion.

## AC / DoD
- [ ] (P0) `verificationErrorMapping.test.js` — full code table + cooldown/attempts helpers.
- [ ] (P0) `PhoneVerificationErrorState.test.jsx` — render smoke for rate/wrong/expired + conflict/country.
- [ ] (P0) `PhoneVerificationFlow.test.jsx` — mock reject with `IdentityApiError` for: `CODE_MISMATCH`, `RATE_LIMITED`, `profile_conflict`, `COUNTRY_NOT_ALLOWED`, `network_error`.
- [ ] (P1) Optional puppeteer `verify-page-error-smoke.mjs` + npm script (non-blocking).

## Where to change
- `spa-app/src/auth/__tests__/verificationErrorMapping.test.js`
- `spa-app/src/components/PhoneVerification/__tests__/PhoneVerificationErrorState.test.jsx`
- `spa-app/src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx`
- Optional: `spa-app/tests/puppeteer/verify-page-error-smoke.mjs`, `package.json`

## Out of scope
- Story gate doc (T07). Identity backend integration tests.

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/verificationErrorMapping.test.js src/components/PhoneVerification/__tests__/
```
