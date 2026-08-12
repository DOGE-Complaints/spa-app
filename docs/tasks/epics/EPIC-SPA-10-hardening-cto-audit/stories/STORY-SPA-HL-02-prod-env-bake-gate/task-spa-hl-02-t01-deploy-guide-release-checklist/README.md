# SPA-HL-02-T01 — Deploy-guide release vs local dist checklist

**Status:** Done — P3 PASS 2026-08-09T11:52:18Z  
**Story:** [`../STORY-SPA-HL-02-prod-env-bake-gate.md`](../STORY-SPA-HL-02-prod-env-bake-gate.md)  
**Decision Ref:** [STORY-SPA-HL-02 backlog](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-02-prod-env-bake-gate.md) · audit §F4  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Package:** `pkg-000060`

## Purpose

Явно разделить local smoke dist и shippable release; bake обязателен для release (FR-HL-02.3 · AC1 · AC3).

## Risk

Оператор выкатывает dist с `127.0.0.1` service bases как production.

## Code Facts (closed)

1. [`docs/deploy-guide.md`](../../../../../../../docs/deploy-guide.md) §Release checklist — env-bake (HL-02).
2. Audit F4: local dist may contain `127.0.0.1:8000` / `:8100`.
3. Gate script: [`scripts/verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs).

## AC / DoD

- [x] (P0) Release checklist / deploy docs требуют env-bake gate (AC1).
- [x] (P0) Явная фраза: dist с `127.0.0.1` service bases — **не** release (AC3 · FR-HL-02.3).
- [x] (P0) Doc-only — no product JSX / vite pipeline change.

## Where to change

- [`docs/deploy-guide.md`](../../../../../../../docs/deploy-guide.md)
- [`acceptance-verification-spa-hl-02-t01.md`](./acceptance-verification-spa-hl-02-t01.md)

## Verification

PASS 2026-08-09T11:52:18Z — `rg` hits on Release checklist / Local smoke / HL-02.
