# SPA-HL-01-T03 — Regression verify:security + routing smoke

**Status:** Done — P3 PASS 2026-08-09T09:55:55Z  
**Story:** [`../STORY-SPA-HL-01-react-router-advisory-triage.md`](../STORY-SPA-HL-01-react-router-advisory-triage.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md)  
**Depends on:** SPA-HL-01-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T09:47:19Z  
**Package:** `pkg-000059`

## Purpose

После T02 прогнать security harness и быстрый routing smoke, чтобы upgrade не сломал session shell / public paths.

## Risk

Upgrade может сломать HashRouter routes / session shell.

## Code Facts (closed)

1. `npm run verify:security` exit 0 — vitest **485 passed / 2 skipped** · bundle guard **ok**.
2. `npm run test:ui:board-shell` exit 0 (public board shell smoke).
3. HashRouter still in [`src/main.jsx`](../../../../../../../src/main.jsx).

## Gap

Post-T02 regression → **CLOSED**.

## AC / DoD

- [x] (P0) `npm run verify:security` exit 0 → FR-HL-01.3 · AC3.
- [x] (P0) Public board shell smoke PASS (`test:ui:board-shell`).
- [x] (P0) Evidence in this task gate.

## Where to change

- [`acceptance-verification-spa-hl-01-t03.md`](./acceptance-verification-spa-hl-01-t03.md)

## Out of scope

- Полный UAT / pixel tests

## Verification

```bash
cd spa-app && npm run verify:security
cd spa-app && npm run test:ui:board-shell
```
