# SPA-CT-15-T06 — Audit F2 story-root screenshots README indexer

**Status:** Done · P6 (`2026-10-20T09:00:37Z`) · P5 scaffold (`2026-10-19T13:34:44Z`) · `run_mode=spa_ct15_p5_gap`  
**Story:** [`../STORY-SPA-CT-15-lab-host-residual.md`](../STORY-SPA-CT-15-lab-host-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-CT-15-execution-2026-10-19.md`](../../../../../../analysis/audit-STORY-SPA-CT-15-execution-2026-10-19.md) · **F2 High**  
**Disposition:** [`../../../../../../analysis/p5-disposition-STORY-SPA-CT-15-2026-10-19.md`](../../../../../../analysis/p5-disposition-STORY-SPA-CT-15-2026-10-19.md)  
**Package:** `pkg-000173` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `thread-mount` / `feed-lab` · docs  
**Scaffolded:** `2026-10-19T13:34:44Z`  
**run_mode:** `spa_ct15_p5_gap`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-M2…M4 · G-L5  
**Runtime:** P6 Done · `2026-10-20T09:00:37Z` · ui_anchor docs

## Purpose

Close audit **F2**: create story-root `screenshots/README.md` indexer linking Happy/Edge + `full-cycle/` pack (01–05 md5 Present). Docs-only · no new captures if pack Present · no invent OP PASS.

## Code Facts (verified at scaffold)

- Pack Present: [`../screenshots/full-cycle/`](../screenshots/full-cycle/) · README + PNG `01`–`05`
- Story-root indexer: [`../screenshots/README.md`](../screenshots/README.md) — **Present** (P6)
- Gate/checklist claim md5 ≡ full-cycle README

## Implement notes (P6)

- CREATE `…/STORY-SPA-CT-15-lab-host-residual/screenshots/README.md`
- Link `full-cycle/` + gate + visual checklist
- Echo md5/claims from full-cycle README / gate
- Do not invent OP PASS · do not re-capture unless broken
- Do not implement product code

## Constraints

- Partial visual = BLOCK · no invent OP PASS
- No product CSS/JS · no invent aggregate/HTTP · `#/next/feed` OOS

## AC / DoD

- [x] Story-root `screenshots/README.md` Present
- [x] Links `full-cycle/` pack + gate/checklist
- [x] md5/claims ≡ gate · OP eye not invented

**Closed:** `2026-10-20T09:00:37Z` · [acceptance-verification-spa-ct-15-t06.md](./acceptance-verification-spa-ct-15-t06.md)

## Where to change

`spa-app/docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-15-lab-host-residual/screenshots/README.md`

## Verification

```bash
test -f spa-app/docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-15-lab-host-residual/screenshots/README.md
rg -n "full-cycle|md5|BLOCK|OP eye" spa-app/docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-15-lab-host-residual/screenshots/README.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
