# SPA-G10-T15 — Close pass3 leftover docs (F3/F5/F6)

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** [reaudit-STORY-SPA-G10-gap-closure-2026-08-03-pass3.md](../../../../../../analysis/reaudit-STORY-SPA-G10-gap-closure-2026-08-03-pass3.md) · [audit §F3/F5/F6](../../../../../../analysis/audit-STORY-SPA-G10-execution-2026-08-02.md)  
**Depends on:** SPA-G10-T13/T14 Done; pass3 reaudit  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_g10_pass3_leftovers`  
**Scaffolded:** 2026-08-03T09:31:11Z

## Purpose
Docs-only закрытие leftovers reaudit pass3: F3 stale §анализ; F5 IconButton/ButtonGroup 0 product use (definition-ready note); F6 T10 PH chrome N/A. Без product wire и без правок методологии.

## Risk
Done story + pre-exec «0 files» / ~108 в backlog вводит ложный open gap; T10 без PH N/A оставляет F6 OPEN в каждом reaudit.

## Code Facts (re-verify at execute)
- HEAD `src/components/Button/` present (`d767a13`); inventory raw `<button` excl. tests+Button = **22** (Filters + CountrySelector).
- Product `rg IconButton|ButtonGroup` excl. `__tests__`/`Button/` = **0**.
- No `PublicHome*` under `src/pages`; PH scope = EPIC-SPA-09.

## AC / DoD
- [x] (P0) Backlog + pipeline §анализ → As-of-Done / historical; Meta без «~108» as current; inventory **22**.
- [x] (P0) Guide: IconButton/ButtonGroup shipped + tested; **0 product consumers by design** (definition-ready).
- [x] (P0) T10 acceptance + README: explicit **PH chrome N/A** (surface absent; EPIC-SPA-09; new PH CTAs → Button).
- [x] (P0) Gate filled; Date from `--print-utc-now` after live verify.

Gate Date: 2026-08-03T09:34:04Z.

## Where to change
- EDIT backlog + pipeline `STORY-SPA-G10-button-system-ds-btn.md` §анализ / Meta
- EDIT `docs/runtime-docs/button-system-developer-guide.md`
- EDIT `task-spa-g10-t10-migrate-board-filters-public-home-ctas/` README + acceptance
- Gate: `acceptance-verification-spa-g10-t15.md`

## Out of scope
- Product wire IconButton/ButtonGroup; Button runtime/tokens/vitest; methodology workflow.md; commit/push; T16+; changing active pkg.

## Verification
```bash
rg -n 'As-of-Done|inventory \*\*22\*\*|definition-ready|PH chrome N/A' \
  spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G10-button-system-ds-btn.md \
  spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G10-button-system-ds-btn/STORY-SPA-G10-button-system-ds-btn.md \
  spa-app/docs/runtime-docs/button-system-developer-guide.md \
  spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G10-button-system-ds-btn/task-spa-g10-t10-migrate-board-filters-public-home-ctas/
```

Gate: [`acceptance-verification-spa-g10-t15.md`](./acceptance-verification-spa-g10-t15.md)
