# SPA-G9-T08 — Commit G9 brand cutover to git HEAD (post-audit F1)

**Status:** Done  
**Story:** [`../STORY-SPA-G9-brand-color-palette-tokens.md`](../STORY-SPA-G9-brand-color-palette-tokens.md)  
**Decision Ref:** [audit-STORY-SPA-G9-execution-2026-08-02.md](../../../../../../analysis/audit-STORY-SPA-G9-execution-2026-08-02.md) §F1  
**Depends on:** SPA-G9-T01…T07 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_g9_audit_2026_08_02`  
**Scaffolded:** 2026-08-02T10:02:24Z

## Purpose
Зафиксировать G9 brand cutover в `git HEAD`: сейчас Done на working tree, но `HEAD:src/styles/tokens.css` всё ещё G4 charcoal/yellow — clone/reset откатывает бренд.

## Risk
Story/INDEX/bullrun Done при uncommitted runtime → риск доставки (M-5-аналог).

## Code Facts (re-verify at execute)
- Audit F1 closed: commit `0809fb9` — `HEAD:src/styles/tokens.css` has `--doge-*` + consumer rebind.
- Excluded Filters.css / StatusBadge.css (F7 / out of F1 scope).

## AC / DoD
- [x] (P0) G9 runtime + design-system (+ scoped CTA CSS) committed.
- [x] (P0) `git show HEAD:src/styles/tokens.css` contains `--doge-bg` / `--doge-accent` and consumer rebind.
- [x] (P0) Gate filled; Date from `--print-utc-now` after verify.

## Where to change
- Commit (spa-app git root): `src/styles/tokens.css`, `docs/UX/design-system.md`, G9 CTA CSS diffs; exclude unrelated `M` unless audited into this commit.
- Gate: `acceptance-verification-spa-g9-t08.md`.

## Out of scope
- F2 visual waive (T09). F3–F7 ignored/info. Changing active pkg / rewriting `pkg-000042`.

## Verification
```bash
cd spa-app && git show HEAD:src/styles/tokens.css | head -40
cd spa-app && git log -1 --oneline
```

Gate: [`acceptance-verification-spa-g9-t08.md`](./acceptance-verification-spa-g9-t08.md)

Gate Date: 2026-08-02T10:13:40Z.
