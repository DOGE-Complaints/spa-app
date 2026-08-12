# SPA-HL-02-T03 — Evidence: one green public URL bake

**Status:** Done — P3 PASS 2026-08-09T11:52:18Z  
**Story:** [`../STORY-SPA-HL-02-prod-env-bake-gate.md`](../STORY-SPA-HL-02-prod-env-bake-gate.md)  
**Decision Ref:** [STORY-SPA-HL-02 backlog](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-02-prod-env-bake-gate.md) · audit C3 Partial  
**Depends on:** SPA-HL-02-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Package:** `pkg-000060`

## Purpose

Один успешный прогон bake с **public** URLs; сохранить evidence без секретов (AC2 · FR-HL-02.1 · FR-HL-02.4).

## Code Facts (closed)

1. Gate exit 0 with Tallinn demo public gateway/identity hosts + non-local supabase/gpt.
2. Dist scan: 0 hits for `127.0.0.1:8000` / `:8100`.
3. Evidence: [`evidence-STORY-SPA-HL-02-public-env-bake-2026-08-09.md`](../../../../../../analysis/evidence-STORY-SPA-HL-02-public-env-bake-2026-08-09.md).

## AC / DoD

- [x] (P0) run-report / analysis evidence exit 0 (no secrets).
- [x] (P0) No `127.0.0.1:8000` / `:8100` in `dist/assets/*.js`.
- [x] (P0) Public URL bake used.

## Verification

PASS 2026-08-09T11:52:18Z — `[verify-build-env-bake] ok`.
