# SPA-PH-01-T13 — Document Path A mobile inline nav (vs M129 drawer)

**Status:** Done — P6 PASS 2026-08-04T07:31:52Z  
**Story:** [`../STORY-SPA-PH-01-header-brand-nav.md`](../STORY-SPA-PH-01-header-brand-nav.md)  
**Decision Ref:** [audit-STORY-SPA-PH-01-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-01-execution-2026-08-04.md) §F3  
**Depends on:** SPA-PH-01-T08 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_01_audit_2026_08_04`  
**Scaffolded:** 2026-08-04T07:23:37Z

## Purpose
Закрыть audit **F3** документированием intentional Path A: mobile = inline `.header-mobile-nav` under header (nav items only), **не** artboard State D side-drawer с session/locale в панели. FR-PH-01.6 (hamburger + dismiss) уже PASS — без runtime drawer rewrite.

## Risk
Повторные reaudit Medium OPEN при сравнении E1 PNG с M129 drawer composition.

## Code Facts (re-verify at execute)
- [`Header.css`](../../../../../../../src/components/AppShell/Header.css) `@media (max-width: 960px)` hides `.header-primary-nav`, shows toggle + `.header-mobile-nav`.
- Docs: `ui-mockup-spec.md` §Path A State D; story gate §UI F3 row.

## AC / DoD
- [x] (P0) `ui-mockup-spec.md` (T01 anchor): explicit Path A note State D = inline panel ≠ drawer.
- [x] (P0) Story gate `acceptance-verification-spa-ph-01.md` §UI (or note): F3 documented intentional; no drawer DoD for PH-01.
- [x] (P0) Optional one-line in `screenshots/README.md` E1 notes (inline vs drawer).
- [x] (P0) Gate filled; Date from `--print-utc-now`.

Gate Date: 2026-08-04T07:31:52Z.

## Where to change
- EDIT `task-spa-ph-01-t01-public-header-zones/ui-mockup-spec.md`
- EDIT `task-spa-ph-01-t08-story-gate-ph-01/acceptance-verification-spa-ph-01.md`
- EDIT (opt) `screenshots/README.md`
- Gate: `acceptance-verification-spa-ph-01-t13.md`

## Out of scope
- Implementing M129 side-drawer; moving locale/account into mobile panel; icon art swap; PH-02.

## Verification
```bash
rg -n 'Path A|inline|drawer|State D' \
  spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/task-spa-ph-01-t01-public-header-zones/ui-mockup-spec.md \
  spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/task-spa-ph-01-t08-story-gate-ph-01/acceptance-verification-spa-ph-01.md
```

Gate: [`acceptance-verification-spa-ph-01-t13.md`](./acceptance-verification-spa-ph-01-t13.md)
