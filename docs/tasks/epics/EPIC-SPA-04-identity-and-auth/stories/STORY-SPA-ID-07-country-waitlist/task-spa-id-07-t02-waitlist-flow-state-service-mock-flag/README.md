# SPA-ID-07-T02 — waitlist flow state + service (mock-first, feature flag)

**Story:** [`../STORY-SPA-ID-07-country-waitlist.md`](../STORY-SPA-ID-07-country-waitlist.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md) §Routes/API, FR-07.4/07.5; AC #5  
**Depends on:** T01 (optional for error message keys)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T08:57:57Z

## Purpose
Implement `WAITLIST_PHASES` flow-state enum, `dialPrefixToCountry` util (FE derives country from entered phone dial prefix per FR-07.6), and `waitlistService` for `POST /waitlist` with mock-first mode + feature flag until contract confirmed. Map error kinds: `network_error`, `service_unavailable`, `duplicate_request`, `validation_error`.

## Risk
Live `POST /waitlist` contract TBD — wrong default breaks AC #5. Privacy: service must not create account/phone/profile (FR-07.5).

## Code Facts (re-verify at execute)
- grep `waitlist` in [`spa-app/src/`](../../../../../../../../src/) → **0** service at intake (only VerifyPage stub).
- [`storyDraftService.js`](../../../../../../../../src/services/storyDraftService.js) — mock-first + env flag pattern to mirror.
- [`storyGateFlowState.js`](../../../../../../../../src/auth/storyGateFlowState.js) — phase enum pattern from ID-06.
- Backlog: `POST /waitlist` **не** в identity repo; `GET /countries/supported` не существует → MVP hardcode Estonia/+372 reference only.

## AC / DoD
- [ ] (P0) `WAITLIST_PHASES`: NOT_SUPPORTED, FORM, JOINED, ERROR (or equivalent) exported.
- [ ] (P0) `dialPrefixToCountry(phoneE164)` — derives display country from dial prefix (not IP); unit-tested with non-+372 samples.
- [ ] (P0) `waitlistService.joinWaitlist({ email, country, organization? })` — mock when flag off / no API URL; live path behind `VITE_WAITLIST_API_ENABLED` (or equivalent).
- [ ] (P0) Error mapping throws/returns distinct kinds for AC #4 (network, service_unavailable, duplicate, validation).
- [ ] (P1) No account/phone/profile creation in service layer (FR-07.5).

## Where to change
- New: `spa-app/src/auth/waitlistFlowState.js`
- New: `spa-app/src/utils/dialPrefixToCountry.js` (or `src/auth/` if preferred)
- New: `spa-app/src/services/waitlistService.js`
- New: `spa-app/src/services/__tests__/waitlistService.test.js` (minimal; full coverage in T07)

## Out of scope
- Panel UI (T03–T05). VerifyPage wiring (T06).

## Verification
```bash
cd spa-app
npm run test:run -- src/services/__tests__/waitlistService.test.js
node -e "import('./src/auth/waitlistFlowState.js').then(m => console.log(m.WAITLIST_PHASES))"
```
