# Acceptance verification — SPA-G10-T10

- **Task:** Migrate board/filters/PH CTAs
- **Result:** PASS
- **Date:** 2026-08-02T20:30:00Z (execute); PH N/A note 2026-08-03T09:31:11Z (SPA-G10-T15)
- **Package:** pkg-000044-20260802-epic-spa-08-g10-button-system-ds-btn.yaml

## AC

- [x] Task DoD met (claims from live code / commands below).
- [x] **PH chrome N/A** — PublicHome surface absent in `src`; scope EPIC-SPA-09; new PH CTAs → shared `Button`.

## Commands

```bash
rg -n 'board-retry-button|issue-retry-button|issue-back-button' spa-app/src | head
ls spa-app/src/pages
rg -n 'PH chrome N/A' spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G10-button-system-ds-btn/task-spa-g10-t10-migrate-board-filters-public-home-ctas/
```

## Evidence

- Live run / code facts recorded during P3 Execute G10 (2026-08-02T20:30:00Z).
- Board/Issue CTAs on `Button`; Filters chip/trigger exceptions documented in guide §8.
- **PH chrome N/A** — no `PublicHome*` under `src/pages`; EPIC-SPA-09 owns public-home chrome; new PH CTAs must use `Button` (SPA-G10-T15 / reaudit pass3 F6).
- Story gate: task-spa-g10-t12-story-gate-g10/acceptance-verification-spa-g10.md
