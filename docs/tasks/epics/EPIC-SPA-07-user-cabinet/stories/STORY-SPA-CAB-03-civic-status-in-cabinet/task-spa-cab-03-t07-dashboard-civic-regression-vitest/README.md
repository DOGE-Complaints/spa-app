# SPA-CAB-03-T07 — Dashboard civic regression Vitest

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../STORY-SPA-CAB-03-civic-status-in-cabinet.md)  
**Decision Ref:** [`../../../../../../analysis/audit-STORY-SPA-CAB-03-execution-2026-07-26.md`](../../../../../../analysis/audit-STORY-SPA-CAB-03-execution-2026-07-26.md) §G1  
**Depends on:** T01–T06 Done (CAB-03); icon-swap T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T09:07:57Z  
**Completed:** 2026-07-26T09:11:17Z  
**Post-audit wave:** `run_mode=spa_cab_03_audit_2026_07_26`

## Purpose
Закрыть audit **G1**: добавить automated render-тест `DashboardPage`, проверяющий наличие `[data-civic-status-card]` и `civic-status-icon` на `/dashboard`.

## Risk
Без гарды icon-swap / mount regress на Dashboard может пройти незамеченным при будущих правках общего `CivicStatusCard`.

## Code Facts (re-verify at execute)
- Created: [`DashboardPage.test.jsx`](../../../../../../../src/pages/__tests__/DashboardPage.test.jsx).
- [`DashboardPage.jsx`](../../../../../../../src/pages/DashboardPage.jsx) монтирует `CivicStatusCard`.
- Icons: `data-testid="civic-status-icon"` после T03.

## AC / DoD
- [x] (P0) Существует `spa-app/src/pages/__tests__/DashboardPage.test.jsx`.
- [x] (P0) Authenticated render: `[data-civic-status-card]` present на dashboard.
- [x] (P0) `[data-testid="civic-status-icon"]` present (иконка после T03).
- [x] (P1) `npm test -- --run DashboardPage CivicStatusCard` PASS.

## Where to change
- `spa-app/src/pages/__tests__/DashboardPage.test.jsx` (create)

## Out of scope
- Icon asset generation (T08). Puppeteer full-cycle. CAB-07 double-heading (G2).

## Verification
```bash
cd spa-app && npm test -- --run DashboardPage CivicStatusCard
test -f src/pages/__tests__/DashboardPage.test.jsx
```

Gate: [`acceptance-verification-spa-cab-03-t07.md`](./acceptance-verification-spa-cab-03-t07.md) PASS.
