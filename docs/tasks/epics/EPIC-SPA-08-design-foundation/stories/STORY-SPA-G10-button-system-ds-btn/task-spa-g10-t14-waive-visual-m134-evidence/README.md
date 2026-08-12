# SPA-G10-T14 — Waive M134 visual PNG evidence (post-audit F2)

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** [audit-STORY-SPA-G10-execution-2026-08-02.md](../../../../../../analysis/audit-STORY-SPA-G10-execution-2026-08-02.md) §F2  
**Depends on:** SPA-G10-T12 Done; after or with T13  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_g10_audit_2026_08_02`  
**Scaffolded:** 2026-08-02T21:11:00Z

## Purpose
Явно зафиксировать operator waive для visual gate vs M134 pixel/PNG evidence: AC «visual gate PASS vs M134 semantics» закрывается written spec §8/§36 (PNG artboard non-authoritative §40); story `screenshots/` отсутствует — без фейковых SPA PNG.

## Risk
Gate PASS без waive-формулировки оставляет audit F2 open как evidence gap.

## Code Facts (re-verify at execute)
- Dir `…/STORY-SPA-G10-button-system-ds-btn/screenshots` — **нет** (audit 2026-08-02T21:05:55Z).
- T12 gate evidence: «semantics vs written spec §8/§36» without comparison artifact.
- Pattern: SPA-G9-T09 waive for live surface PNGs.

## AC / DoD
- [x] (P0) Story gate (`acceptance-verification-spa-g10.md`) contains explicit **waive** for M134/PNG pixel evidence; semantics remain written-spec SSOT.
- [x] (P0) No fabricated board/login/cabinet button-system SPA screenshots added under story `screenshots/`.
- [x] (P0) Gate filled; Date from `--print-utc-now` after live verify.

Gate Date: 2026-08-03T07:18:09Z.

## Where to change
- EXTEND `task-spa-g10-t12-story-gate-g10/acceptance-verification-spa-g10.md` (and T12 README note if needed).
- Gate: `acceptance-verification-spa-g10-t14.md`.

## Out of scope
- Recapture live M134 shots (optional local follow-up). F1 commit (T13). F3–F7. Changing active pkg.

## Verification
```bash
rg -n 'waive|M134|§40|screenshots' \
  spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G10-button-system-ds-btn/task-spa-g10-t12-story-gate-g10/acceptance-verification-spa-g10.md
test ! -d spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G10-button-system-ds-btn/screenshots
```

Gate: [`acceptance-verification-spa-g10-t14.md`](./acceptance-verification-spa-g10-t14.md)
