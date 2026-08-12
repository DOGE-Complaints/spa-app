# SPA-ID-05-T02 — PhoneVerificationErrorState shell (M37)

**Story:** [`../STORY-SPA-ID-05-verification-error-states.md`](../STORY-SPA-ID-05-verification-error-states.md)  
**Decision Ref:** [mockup-37](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md) §2, §13–14; backlog FR-05.6  
**Depends on:** T01 (error kind enum / labels)  
**ui_scope:** `visual`  
**ui_anchor:** mockup-37  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T09:20:49Z

## Purpose
Reusable `<PhoneVerificationErrorState />` shell: dark glass panel, calm copy slots, primary/secondary CTAs, optional cooldown timer, attempts-remaining line, muted technical code/trace.

## Risk
Visual drift from M37 or red “error wall” breaks trust tone required by story AC #5.

## Code Facts (re-verify at execute)
- No `PhoneVerificationErrorState` in `spa-app/src/components/PhoneVerification/` at intake.
- Reuse panel button classes from [`PhoneVerificationFlow.css`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.css) where consistent.

## AC / DoD
- [ ] (P0) Component accepts `errorKind`, `title`, `message`, `primaryAction`, `secondaryAction` (FR-05.6 next-action).
- [ ] (P0) Optional `cooldownSecondsRemaining`, `attemptsRemaining`, `technicalCode`, `traceId` render per M37 (no phone/OTP).
- [ ] (P1) `data-testid` per error kind for tests (e.g. `phone-verification-error-rate-limited`).
- [ ] (P1) Export from [`index.js`](../../../../../../../../src/components/PhoneVerification/index.js).
- [ ] (P1) Visual spot-check vs [mockup-37 PNG](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.png) documented in gate.

## Where to change
- New: `spa-app/src/components/PhoneVerification/PhoneVerificationErrorState.jsx`
- New: `spa-app/src/components/PhoneVerification/PhoneVerificationErrorState.css`
- Update: `spa-app/src/components/PhoneVerification/index.js`

## Out of scope
- Per-code copy wiring (T03–T04). Flow integration (T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneVerificationErrorState.test.jsx
# manual: compare panel to mockup-37 PNG
```
