# SPA-CR-08-T05 — Audit F2 story-root screenshots README indexer

**Status:** Done · P6 (`2026-10-15T19:39:31Z`) · P5 scaffold (`2026-10-15T19:37:53Z`) · `run_mode=spa_cr_08_audit_2026_10_15`  
**Story:** [`../STORY-SPA-CR-08-lab-feed-theme-stress.md`](../STORY-SPA-CR-08-lab-feed-theme-stress.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-CR-08-execution-2026-10-15.md`](../../../../../../analysis/audit-STORY-SPA-CR-08-execution-2026-10-15.md) · **F2 High**  
**Package:** `pkg-000144` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `feed-lab` · docs  
**Scaffolded:** `2026-10-15T19:37:53Z`  
**run_mode:** `spa_cr_08_audit_2026_10_15`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.1

## Purpose
Close audit **F2**: create story-root `screenshots/README.md` indexer linking Happy/Edge + `full-cycle/` pack (01–05 md5 Present). Docs-only · no new captures if pack Present.

## Code Facts (verified at scaffold)
- Pack Present: [`../screenshots/full-cycle/`](../screenshots/full-cycle/) · README + PNG `01`–`05`
- Story-root indexer: [`../screenshots/README.md`](../screenshots/README.md) — **Present** (P6)
- Gate/checklist claim md5 ≡ full-cycle README

## Implement notes (P6)
- CREATE `…/STORY-SPA-CR-08-lab-feed-theme-stress/screenshots/README.md`
- Link `full-cycle/` + gate + visual checklist
- Echo md5/claims from full-cycle README / gate
- Do not invent OP PASS · do not re-capture unless broken

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No product CSS/JS · CR-09/10 OOS · M155 OOS · `#/next/feed` OOS

## AC / DoD
- [x] Story-root `screenshots/README.md` Present
- [x] Links `full-cycle/` pack + gate/checklist
- [x] md5/claims ≡ gate · OP eye not invented

## Where to change
`spa-app/docs/tasks/epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-08-lab-feed-theme-stress/screenshots/README.md`

## Verification
```bash
test -f spa-app/docs/tasks/epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-08-lab-feed-theme-stress/screenshots/README.md
rg -n "full-cycle|md5|BLOCK|OP eye" spa-app/docs/tasks/epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-08-lab-feed-theme-stress/screenshots/README.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```

**Closed:** `2026-10-15T19:39:31Z` · [acceptance-verification-spa-cr-08-t05.md](./acceptance-verification-spa-cr-08-t05.md)
