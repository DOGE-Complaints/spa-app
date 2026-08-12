# SPA-ID-04-T02 — PhoneVerificationFlow shell (M32)

**Story:** [`../STORY-SPA-ID-04-phone-verification-flow.md`](../STORY-SPA-ID-04-phone-verification-flow.md)  
**Decision Ref:** [mockup-32-phone-verification-flow-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md) §2–§3; [`ui-mockup-spec.md`](./ui-mockup-spec.md)  
**Depends on:** T01  
**ui_scope:** `visual` (ui_anchor)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T16:53:10Z

## Purpose
`PhoneVerificationFlow` shell (modal/inline host), M32 visual hierarchy, panel slot routing by flow phase, `data-testid` hooks. Produce `ui-mockup-spec.md` as P3 UI SSOT.

## Risk
Wrong hierarchy or missing test hooks block T03–T05 panel work and Vitest coverage.

## Code Facts (re-verify at execute)
- grep `PhoneVerificationFlow` in `spa-app/src/` → 0 at intake.
- M32 CTA copy in artboard may say `Continue`/`Cancel`; **backlog FR-04.1 wins** — disclosure uses `Send code` / `Not now`.

## AC / DoD
- [x] (P0) `PhoneVerificationFlow` component + CSS + barrel export under `spa-app/src/components/PhoneVerification/`.
- [x] (P0) Shell supports modal and inline `host` prop; renders single active panel slot (FR-04.4 tone).
- [x] (P0) M32 hierarchy: header → body panel → footer actions per [ui-mockup-spec.md](./ui-mockup-spec.md).
- [x] (P0) Stable `data-testid` hooks for each phase shell region.
- [x] (P1) Trust tone; no forbidden terms in placeholder copy (FR-04.7).

## Where to change
- New: `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.jsx`
- New: `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.css`
- New: `spa-app/src/components/PhoneVerification/index.js`
- This task: `ui-mockup-spec.md`

## Out of scope
- Panel content A–E (T03–T04). API calls (T01). `/verify` route (T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx
```
