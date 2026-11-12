# SPA-ES-01-T08 — Sync bullrun ES-01 task table (F2)

**Status:** Done — P6 PASS 2026-08-17T10:48:52Z · F2 CLOSED  
**Story:** [`../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md`](../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md)  
**Decision Ref:** [audit-STORY-SPA-ES-01-execution-2026-08-17.md](../../../../../../analysis/audit-STORY-SPA-ES-01-execution-2026-08-17.md) §F2  
**Depends on:** SPA-ES-01-T06 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-17T10:43:26Z  
**Gate Date:** 2026-08-17T10:48:52Z  
**Package:** `pkg-000066` **unchanged** · wave `spa_es_01_audit_2026_08_17`

## Purpose
Doc-only: sync bullrun task table story + T01–T06 to Done · P4 verified. §Актуальная точка already says P3 Done; table still `🟡 P1.3` / `⬜ Todo`.

## Risk
Closing T07–T09 in the same edit (they stay Todo until P6). Rewriting pkg YAML.

## Code Facts (re-verify at execute)
- §Актуальная точка P3 Done: [`bullrun-launch-index.md`](../../../../../bullrun-launch-index.md) (top).
- Table drift: same file ~L799–805 `STORY-SPA-ES-01` `🟡 P1.3` · T01–T06 `⬜ Todo`.
- Gate PASS: [`acceptance-verification-spa-es-01.md`](../task-spa-es-01-t06-story-gate-es-01/acceptance-verification-spa-es-01.md) Date `2026-08-17T10:32:24Z`.

## Gap
Audit F2 Medium — bullrun ES-01 table still `🟡 P1.3` / `⬜ Todo` for story + T01–T06 vs §Актуальная точка / gate Done.

## AC / DoD
- [x] (P0) Table rows `STORY-SPA-ES-01` + T01–T06 = Done · P4 verified (match §Актуальная точка / gate).
- [x] (P0) T07–T09 remain Todo until their P6 close.
- [x] (P0) Do not rewrite `pkg-000066` / `spa-active-package.current.yaml`.

## Where to change
- [`spa-app/docs/tasks/bullrun-launch-index.md`](../../../../../bullrun-launch-index.md) task table (ES-01 block)

## Out of scope
Product code; invent AC; ES-02…05; F1 As-of-Done (T07); F3 PNGs (T09).

## Verification
```bash
rg -n "STORY-SPA-ES-01|SPA-ES-01-T0" spa-app/docs/tasks/bullrun-launch-index.md
```
