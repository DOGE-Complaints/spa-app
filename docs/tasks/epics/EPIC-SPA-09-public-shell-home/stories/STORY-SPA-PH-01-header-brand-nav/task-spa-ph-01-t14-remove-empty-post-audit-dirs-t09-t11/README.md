# SPA-PH-01-T14 — Remove empty post-audit dirs T09–T11

**Status:** Done — P6 PASS 2026-08-04T07:32:16Z  
**Story:** [`../STORY-SPA-PH-01-header-brand-nav.md`](../STORY-SPA-PH-01-header-brand-nav.md)  
**Decision Ref:** [audit-STORY-SPA-PH-01-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-01-execution-2026-08-04.md) §F5  
**Depends on:** SPA-PH-01-T08 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_01_audit_2026_08_04`  
**Scaffolded:** 2026-08-04T07:23:37Z

## Purpose
Закрыть audit **F5**: удалить пустые каталоги без README (`t09-commit-ph01-runtime`, `t10-screenshots-full-cycle-contract`, `t11-remove-synced-badge-m129`). Не создавать фейковые gates — работа уже в HEAD / T01–T08.

## Risk
Пустые dirs выглядят как orphan gap tasks в `ls` / будущих audit.

## Code Facts (re-verify at execute)
- Empty dirs removed via `rmdir` (P6). Commit / screenshots / SYNCED already Done prior.

## AC / DoD
- [x] (P0) Three empty dirs removed from disk.
- [x] (P0) Pipeline story / INDEX do not list T09–T11 as open tasks (never had README; T12–T14 are post-audit).
- [x] (P0) Gate filled; Date from `--print-utc-now`.

Gate Date: 2026-08-04T07:32:16Z.

## Where to change
- DELETE dirs:
  - `task-spa-ph-01-t09-commit-ph01-runtime/`
  - `task-spa-ph-01-t10-screenshots-full-cycle-contract/`
  - `task-spa-ph-01-t11-remove-synced-badge-m129/`
- Gate: `acceptance-verification-spa-ph-01-t14.md`

## Out of scope
- Re-scaffolding commit/screenshot/SYNCED work; active pkg change; runtime.

## Verification
```bash
test ! -d spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/task-spa-ph-01-t09-commit-ph01-runtime
test ! -d spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/task-spa-ph-01-t10-screenshots-full-cycle-contract
test ! -d spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/task-spa-ph-01-t11-remove-synced-badge-m129
```

Gate: [`acceptance-verification-spa-ph-01-t14.md`](./acceptance-verification-spa-ph-01-t14.md)
