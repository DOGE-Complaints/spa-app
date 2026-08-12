# SPA-ID-10-T01 — countries dataset + supported dial prefixes

**Story:** [`../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md) §FR-10.1/10.2, Findings-note  
**Depends on:** ID-07 Done (dialPrefixToCountry baseline)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T10:51:01Z

## Purpose
Create FE countries SSOT (`{code, dialPrefix, name{en,et,ru}, flag?}`) and `SUPPORTED_DIAL_PREFIXES = ['+372']` mirror of backend `PHONE_ALLOWED_DIAL_PREFIXES` with `isSupportedDialPrefix(prefix)`.

## Risk
Drift from backend allowed prefixes breaks client short-circuit vs API behavior. Incomplete M126 country list blocks selector UX.

## Code Facts (re-verify at execute)
- [`dialPrefixToCountry.js`](../../../../../../../../src/utils/dialPrefixToCountry.js) — 11 dial prefixes in `DIAL_PREFIX_COUNTRY_NAMES`; no `isSupportedDialPrefix`.
- [`verificationFlowState.js`](../../../../../../../../src/auth/verificationFlowState.js) — `PHONE_VERIFICATION_RULES.DIAL_PREFIX` hardcoded `+372`.
- Story §country list — 10 countries + France (M126 §State B).

## AC / DoD
- [ ] (P0) Export countries dataset with M126 list (FR-10.1); extensible structure.
- [ ] (P0) `SUPPORTED_DIAL_PREFIXES = ['+372']` + `isSupportedDialPrefix()` (FR-10.2, AC #2).
- [ ] (P0) `dialPrefixToCountry` delegates to dataset or re-export; backward compat for ID-07 callers.
- [ ] (P1) Comment/test documents FE mirror of backend `PHONE_ALLOWED_DIAL_PREFIXES` (Findings-note).
- [ ] (P1) Unit tests for supported/unsupported prefix detection.

## Where to change
- New/refactor: `spa-app/src/utils/countriesDataset.js` (or expand `dialPrefixToCountry.js`)
- New: `spa-app/src/utils/__tests__/countriesDataset.test.js` (or extend dialPrefix tests)
- Optional: `spa-app/src/auth/supportedDialPrefixes.js`

## Out of scope
- PhoneInputPanel UI (T03). i18n panel strings (T02). Flow routing (T05).

## Verification
```bash
cd spa-app
npm run test:run -- src/utils/__tests__/countriesDataset.test.js
node -e "import('./src/utils/countriesDataset.js').then(m => console.log(m.SUPPORTED_DIAL_PREFIXES))"
```
