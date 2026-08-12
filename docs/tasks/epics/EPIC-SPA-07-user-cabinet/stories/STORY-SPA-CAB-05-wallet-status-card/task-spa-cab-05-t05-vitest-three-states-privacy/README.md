# SPA-CAB-05-T05 — Vitest three states A–C + privacy + no-API

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-05-wallet-status-card.md`](../STORY-SPA-CAB-05-wallet-status-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md) §T08, Acceptance Criteria (MVP stub)  
**Depends on:** T01–T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T13:51:04Z
**Completed:** 2026-07-26T19:35:18Z

## Purpose
Закрыть T08: Vitest покрывает 3 состояния A–C; MVP default A; Connect/Manage → `comingSoon`; no wallet-API; privacy; L10N/forbidden-terms parity; optional layer (cabinet not blocked).

## Risk
Ложный PASS без mount на `/profile`; тест ожидает live wallet connect вопреки MVP AC.

## Code Facts (re-verify at execute)
- Extend [`UserCabinetPage.test.jsx`](../../../../../../../src/pages/__tests__/UserCabinetPage.test.jsx) — wallet slot currently may assert placeholder; after T01 expects card.
- New: `src/components/WalletStatus/__tests__/…` (or colocated).
- MVP AC: assert `comingSoon` for Connect/Manage; default render State A.

## AC / DoD
- [x] (P0) 3 states A–C covered in Vitest.
- [x] (P0) Default / MVP stub = State A «Wallet not linked».
- [x] (P0) No wallet-API / fetch asserted (or no fetch in component under test).
- [x] (P0) Connect Wallet / Manage Wallet → `cabinet.common.comingSoon`.
- [x] (P0) Privacy: no keys / seed / full address by default / balances in rendered output.
- [x] (P0) Wallet optional — other cabinet slots still render.
- [x] (P1) L10N / forbidden-terms / flat-keys parity green.

## Where to change
- `spa-app/src/components/WalletStatus/__tests__/`
- `spa-app/src/pages/__tests__/UserCabinetPage.test.jsx`
- `spa-app/src/i18n/__tests__/` if flat-keys guard needs wallet keys

## Out of scope
- Puppeteer full-cycle (optional / T06 gate). Story gate artifact (T06). Live wallet integration tests.

## Verification
```bash
cd spa-app && npm test -- --run WalletStatus UserCabinetPage cabinetDictionary
```
