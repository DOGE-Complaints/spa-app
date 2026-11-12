# SPA-CT-15-T05 — Vitest narrow · branch · residents omit · Path A

**Status:** Done  
**Story:** [`../STORY-SPA-CT-15-lab-host-residual.md`](../STORY-SPA-CT-15-lab-host-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:58:55Z`  
**Package:** `pkg-000173`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-M2…M4 · G-L5 · Path A + gate  
**Runtime:** P3 Done · `2026-10-19T13:03:59Z` · ui_anchor

## Purpose

FR-CT-15.1–15.5 · AC: Markers for narrow/branch/omit-residents-without-aggregate · Path A shots + gate (OP eye Absent → BLOCK).

## Constraints

- No invent HTTP · OP PASS · no invent aggregate  
- Soft CR hold  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Vitest: narrow · branchDisclosure · residents omit without aggregate
- [x] Path A checklist + screenshots filled at P3
- [x] Gate updated · no invent OP PASS

## Where to change

`src/features/thread-mount/__tests__/` · feed-lab tests · story-root gate/checklists/shots

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
