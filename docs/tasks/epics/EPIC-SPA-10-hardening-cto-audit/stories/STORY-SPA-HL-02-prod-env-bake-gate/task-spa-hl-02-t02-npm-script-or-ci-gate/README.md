# SPA-HL-02-T02 — npm script wrapping verify-build-env-bake (release path)

**Status:** Done — P3 PASS 2026-08-09T11:52:18Z  
**Story:** [`../STORY-SPA-HL-02-prod-env-bake-gate.md`](../STORY-SPA-HL-02-prod-env-bake-gate.md)  
**Decision Ref:** [STORY-SPA-HL-02 backlog](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-02-prod-env-bake-gate.md) · audit §F4 / C3  
**Depends on:** SPA-HL-02-T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Package:** `pkg-000060`

## Purpose

Сделать/задокументировать один npm script, который запускает `verify-build-env-bake`, как обязательную проверку release path (FR-HL-02.2). Не invent CI vendor YAML.

## Code Facts (closed)

1. [`package.json`](../../../../../../../package.json) `"verify:build:env-bake"` unchanged.
2. Deploy-guide documents script as **обязательный** pre-release gate + required `VITE_*`.
3. Bare run without public env → exit 1.

## AC / DoD

- [x] (P0) Script documented as mandatory pre-release gate.
- [x] (P0) Required `VITE_*` listed; without public env — expect fail.
- [x] (P0) No new CI vendor YAML.

## Verification

PASS 2026-08-09T11:52:18Z — bare `npm run verify:build:env-bake` exit 1.
