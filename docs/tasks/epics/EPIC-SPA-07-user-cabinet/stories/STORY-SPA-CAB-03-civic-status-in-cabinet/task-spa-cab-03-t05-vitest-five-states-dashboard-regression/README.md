# SPA-CAB-03-T05 — Vitest five civic states + Dashboard regression

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../STORY-SPA-CAB-03-civic-status-in-cabinet.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) §T05  
**Depends on:** T01–T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T21:26:27Z
**Completed:** 2026-07-25T21:40:18Z

## Purpose
Закрыть T05: Vitest покрывает 5 civic-состояний (с icon paths после T03); регресс `DashboardPage` / `CivicStatusCard` не сломан; forbidden-terms check.

## Risk
Пропуск регресса Dashboard после icon-swap; ложный PASS без mount assertions на `/profile`.

## Code Facts (re-verify at execute)
- Existing: [`CivicStatusCard.test.jsx`](../../../../../../../src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx), [`civicStatusState.test.js`](../../../../../../../src/auth/__tests__/civicStatusState.test.js).
- [`UserCabinetPage.test.jsx`](../../../../../../../src/pages/__tests__/UserCabinetPage.test.jsx) — slot exists; extend for live card.
- Dashboard tests / page tests as present in repo.

## AC / DoD
- [x] (P0) 5 civic states covered (icons asserted after T03).
- [x] (P0) `/profile` civic slot mounts card (not `comingLater`).
- [x] (P0) Dashboard civic render still PASS.
- [x] (P1) forbidden-terms / L10N parity guards green.
- [x] (P1) Traceability: AC #1–#5 testable via suite.

## Where to change
- `spa-app/src/pages/__tests__/UserCabinetPage.test.jsx`
- `spa-app/src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx` (icon assertions)
- Dashboard-related tests if needed

## Out of scope
- Puppeteer full-cycle (optional later). Story gate artifact (T06).

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage CivicStatusCard civicStatusState DashboardPage identityDictionary
```
