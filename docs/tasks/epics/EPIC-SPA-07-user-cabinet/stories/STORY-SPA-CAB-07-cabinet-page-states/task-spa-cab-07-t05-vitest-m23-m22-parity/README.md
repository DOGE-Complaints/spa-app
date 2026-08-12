# SPA-CAB-07-T05 — Vitest M23/M22 parity

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-07-cabinet-page-states.md`](../STORY-SPA-CAB-07-cabinet-page-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) §T07  
**Depends on:** T01…T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T13:48:38Z

## Purpose
Vitest coverage: M23 all-empty composite; M22 retry/back + shell stable; dictionary parity for `cabinet.error.profileLoad.*`.

## Risk
UI Done without regression tests → silent break of composite/error paths.

## Code Facts (re-verify at execute)
- Existing patterns: `UserCabinetPage` / cabinet card Vitest under `spa-app/src/**/__tests__` or colocated.
- Dictionary tests for FLAT_KEYS parity (CAB-06 pattern).

## AC / DoD
- [ ] (P0) Test: M23 composite — all sections present with empty/stub defaults.
- [ ] (P0) Test: M22 — Retry triggers re-fetch; Back to Board navigates; shell markers remain.
- [ ] (P0) Test: dictionary parity for `cabinet.error.profileLoad.*` + FLAT_KEYS.
- [ ] (P1) `npm test -- --run` green for new suites.

## Where to change
- New/updated Vitest files under `spa-app/src/`
- Possibly `package.json` script if dedicated suite added

## Out of scope
- Puppeteer full-cycle (story gate / P3 UI). Story Done sync (T06).

## Verification
```bash
cd spa-app && npm test -- --run
```

Gate: [`acceptance-verification-spa-cab-07-t05.md`](./acceptance-verification-spa-cab-07-t05.md)
