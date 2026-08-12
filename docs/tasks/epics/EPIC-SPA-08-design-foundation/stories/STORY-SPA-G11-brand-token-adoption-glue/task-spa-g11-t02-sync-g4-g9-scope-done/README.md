# SPA-G11-T02 — Sync G4 «Вне scope» G9 Done

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** backlog FR/D-G11 + reaudit F3–F8  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T12:25:03Z

## Purpose
F4 / FR-G11.1: в G4 backlog «Вне scope» строку `G9 … (Todo)` → Done при уже Done Meta note `pkg-000042`.

## Risk
Рассинхрон Todo vs Done в одной story.

## Code Facts (re-verify at execute)
- [`STORY-SPA-G4-design-tokens-foundation.md`](../../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md) — Meta note G9 Done; «Вне scope» still `(Todo)` (verify).

## AC / DoD
- [ ] (P0) G4 «Вне scope» G9 marked Done (not Todo).
- [ ] (P0) Story AC: F4 docs synced.

## Where to change
- EDIT `spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md`

## Out of scope
Runtime CSS. Reopen G9.

## Verification
```bash
rg -n 'G9.*Todo|G9.*Done' spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md
```

Gate: [`acceptance-verification-spa-g11-t02.md`](./acceptance-verification-spa-g11-t02.md)

Gate Date: 2026-08-02T12:33:18Z.
