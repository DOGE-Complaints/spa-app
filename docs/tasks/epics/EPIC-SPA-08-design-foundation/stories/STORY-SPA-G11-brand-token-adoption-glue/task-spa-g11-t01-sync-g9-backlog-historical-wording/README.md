# SPA-G11-T01 — Sync G9 backlog historical wording

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** backlog FR/D-G11 + reaudit F3–F8  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T12:25:03Z

## Purpose
F3 / FR-G11.1: переписать G9 backlog §Зачем + §анализ как historical pre-cutover / «As of Done» snapshot; G9 Status остаётся Done.

## Risk
Stale «уголь+жёлтый» / «0 hits --doge-*» вводит в заблуждение после HEAD `0809fb9`.

## Code Facts (re-verify at execute)
- Backlog [`STORY-SPA-G9-brand-color-palette-tokens.md`](../../../../../backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md) §Зачем / §анализ — pre-cutover wording (verify at execute).
- HEAD cutover: `0809fb9` feat(SPA-G9); G9 Status Done.

## AC / DoD
- [ ] (P0) G9 §Зачем + §анализ = historical / As-of-Done; no claim that code still charcoal+yellow or 0 `--doge-*` hits.
- [ ] (P0) G9 Meta Status remains Done; optional Meta pointer → G11.
- [ ] (P0) Story AC: F3 docs synced.

## Where to change
- EDIT `spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md`

## Out of scope
T02–T11. Runtime CSS.

## Verification
```bash
rg -n 'уголь|0 hits|#141417|#f5c518' spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md
```

Gate: [`acceptance-verification-spa-g11-t01.md`](./acceptance-verification-spa-g11-t01.md)

Gate Date: 2026-08-02T12:33:18Z.
