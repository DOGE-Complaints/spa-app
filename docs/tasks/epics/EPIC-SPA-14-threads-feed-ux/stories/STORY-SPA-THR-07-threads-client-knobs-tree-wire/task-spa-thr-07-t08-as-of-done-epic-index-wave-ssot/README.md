# SPA-THR-07-T08 — Epic / INDEX / wave As-of-Done SSOT (F1)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md`](../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md)  
**Decision Ref:** [audit-STORY-SPA-THR-07-execution-2026-09-24.md](../../../../../../analysis/audit-STORY-SPA-THR-07-execution-2026-09-24.md) §F1  
**Depends on:** SPA-THR-07-T07 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:42:43Z`  
**Completed:** `2026-09-24T07:44:04Z`  
**Package:** `pkg-000083` **unchanged** · wave `spa_thr_07_audit_2026_09_24`

## Purpose

Doc-only As-of-Done SSOT: EPIC-SPA-14 header + wave-order + `threads-feed/INDEX.md` footnote — stop «THR-07 scaffolded / P1.3 active»; align with P3 Done · next THR-08 after OP.

## Gap

Audit **F1** Medium — **CLOSED** (P6).

## AC / DoD

- [x] (P0) EPIC-SPA-14 header: THR-07 **Done** (`pkg-000083`), not «scaffolded»
- [x] (P0) Wave-order: THR-07 P3 Done (not «P1.3 active»)
- [x] (P0) `threads-feed/INDEX.md` footnote: pipeline **Done**, not «scaffolded»
- [x] (P0) No product `src/**` · no invent HTTP · pkg pointer unchanged

## Where changed

- `spa-app/docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/EPIC-SPA-14-threads-feed-ux.md`
- `spa-app/docs/tasks/backlog-stories/threads-feed/INDEX.md`

## Out of scope

F3 focus remount / mount vitest (WAIVED) · THR-08/09 · immutable pkg rewrite · git push

## Verification

```bash
rg -n 'scaffold|P1\.3 active' spa-app/docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/EPIC-SPA-14-threads-feed-ux.md spa-app/docs/tasks/backlog-stories/threads-feed/INDEX.md
# expect: no matches on THR-07 stale phrases
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```

Gate: [acceptance-verification-spa-thr-07-t08.md](acceptance-verification-spa-thr-07-t08.md)
