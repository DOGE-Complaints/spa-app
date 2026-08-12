# SPA-ID-13-T08 — Sync mvp-plan §7.7 M-5 checklist (post-audit F3)

**Status:** Done  
**Story:** [`../STORY-SPA-ID-13-public-route-regression.md`](../STORY-SPA-ID-13-public-route-regression.md)  
**Decision Ref:** [audit-STORY-SPA-ID-13-execution-2026-08-01.md](../../../../../../../analysis/audit-STORY-SPA-ID-13-execution-2026-08-01.md) §F3  
**Depends on:** SPA-ID-13-T05/T06 Done (tables Meta Done)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-01T20:28:56Z  
**run_mode:** `spa_id_13_audit_2026_08_01`

## Purpose
Синхронизировать pilot DoD checklist §7.7 в mvp-integration-plan с уже закрытой spa-половиной M-5 (`pkg-000041`).

## Risk
§0/§2/§5 помечают M-5 spa Done, а §7.7 checkbox остаётся `[ ]` → ложный open gap для пилота.

## Code Facts (re-verify at execute)
- [`docs/analysis/mvp-integration-plan-2026-07-02.md:252`](../../../../../../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) — `[ ] /board и /issue/:id … (M-5 regression green)`.
- §0/§2/§5 (audit): M-5 spa Done `pkg-000041`; gateway GW-PUBLIC-01 Done.
- FR-ID13.6 / T05: таблицы обновлены; §7.7 — остаток F3.

## Gap
F3 Low — mvp-plan §7.7 M-5 checkbox still open.

## AC / DoD
- [x] (P0) §7.7 checkbox для M-5 spa regression → `[x]` **или** явная пометка «spa unit/gate Done (`pkg-000041`); live E2E operator optional».
- [x] (P0) Согласовано с §0/§2 M-5 spa Done (без противоречия).
- [x] (P0) Не требовать `verify:railway:live` / production URL как условие этой строки.
- [x] (P0) Gate заполнен; Date из `--print-utc-now` после live verify.

Gate Date: 2026-08-01T20:33:33Z.

## Where to change
- [`docs/analysis/mvp-integration-plan-2026-07-02.md`](../../../../../../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) §7.7 (~line 252)

## Out of scope
- F1 commit (T07); F2 §анализ rewrite; F4–F6; runtime code; смена active pkg.

## Verification
```bash
rg -n 'M-5 regression|/board.*issue/:id' docs/analysis/mvp-integration-plan-2026-07-02.md
```

Gate: [`acceptance-verification-spa-id-13-t08.md`](./acceptance-verification-spa-id-13-t08.md)
