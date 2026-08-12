# SPA-ID-03-T06 — Tests civic status (Vitest)

**Story:** [`../STORY-SPA-ID-03-civic-status-component.md`](../STORY-SPA-ID-03-civic-status-component.md)  
**Decision Ref:** [mockup-28 §6 mapping table](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md); story AC #1–#5  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T09:45:56Z

## Purpose
Vitest coverage: derivation matrix (`phone_verified` × flow phases), canonical label guard, component renders correct `data-civic-status-state`, no `verification_status` in codebase paths touched.

## Risk
Missing matrix cases allow wrong state on `/dashboard` or label drift.

## Code Facts (re-verify at execute)
- M28 §6 table — Unverified / Available / In Progress / Verified / Failed mapping.
- Story AC #3 — exact strings for three canonical labels.

## AC / DoD
- [ ] (P0) Unit tests for `deriveCivicStatusState` — all five card states + edge phases (story AC #2).
- [ ] (P0) Test asserts canonical labels unchanged (story AC #3).
- [ ] (P0) Component tests for A–E panels + wallet placeholder in D (story AC #1, #5).
- [ ] (P0) Guard: no `verification_status` field read in civic status modules.
- [ ] (P1) `npm run test:run` green; no regressions vs prior suite count.

## Where to change
- New: `spa-app/src/auth/__tests__/civicStatusState.test.js` (or under `CivicStatus/__tests__/`)
- New: `spa-app/src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx`

## Out of scope
- E2E puppeteer (optional follow-up). ID-04 phone API tests.

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/civicStatusState.test.js src/components/CivicStatus
cd spa-app && npm run test:run
```
