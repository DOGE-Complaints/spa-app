# SPA-G9-T09 — Waive live visual surface shots (post-audit F2)

**Status:** Done  
**Story:** [`../STORY-SPA-G9-brand-color-palette-tokens.md`](../STORY-SPA-G9-brand-color-palette-tokens.md)  
**Decision Ref:** [audit-STORY-SPA-G9-execution-2026-08-02.md](../../../../../../analysis/audit-STORY-SPA-G9-execution-2026-08-02.md) §F2  
**Depends on:** SPA-G9-T05 / T07 Done; after or with T08  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_g9_audit_2026_08_02`  
**Scaffolded:** 2026-08-02T10:02:24Z

## Purpose
Явно зафиксировать operator waive для FR-G9.6 live board/login/cabinet/filters PNG: evidence = token SSOT + swatch; live Chrome shots env-blocked (crashpad) — без фейковых SPA PNG.

## Risk
Gate PASS без waive-формулировки оставляет audit F2 open как evidence gap.

## Code Facts (re-verify at execute)
- Waive text added to T05 + story gate acceptance files (2026-08-02T10:13:40Z).
- Swatch remains sole PNG under `screenshots/post-implement/`.

## AC / DoD
- [x] (P0) Story gate + T05 acceptance contain explicit **waive** for live surface PNGs (FR-G9.6).
- [x] (P0) No fabricated board/login/cabinet/filters SPA screenshots added.
- [x] (P0) Gate filled; Date from `--print-utc-now` after verify.

## Where to change
- EXTEND T07 + T05 acceptance-verification files.
- Gate: `acceptance-verification-spa-g9-t09.md`.

## Out of scope
- Recapture live shots (optional local follow-up). F1 commit (T08). F3–F7.

## Verification
```bash
rg -n 'waive|FR-G9.6|crashpad' \
  spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G9-brand-color-palette-tokens/task-spa-g9-t07-story-gate-g9/acceptance-verification-spa-g9.md \
  spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G9-brand-color-palette-tokens/task-spa-g9-t05-visual-gate-brand-surfaces/acceptance-verification-spa-g9-t05.md
```

Gate: [`acceptance-verification-spa-g9-t09.md`](./acceptance-verification-spa-g9-t09.md)

Gate Date: 2026-08-02T10:13:40Z.
