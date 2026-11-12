# SPA-NF-20-T04 — Leaves / multi-issue honesty vitest

**Status:** Done  
**Story:** [`../STORY-SPA-NF-20-map-cluster-leaves-reachable.md`](../STORY-SPA-NF-20-map-cluster-leaves-reachable.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-20-map-cluster-leaves-reachable.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-20-map-cluster-leaves-reachable.md)  
**ui_scope:** `map` · soft `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T19:49:59Z`  
**Package:** `pkg-000198`
**P3 Done:** `2026-10-21T19:56:45Z`  
**Path A:** code lock · [ARCH-DELTA §8](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-20.6: Vitest for leaves path / multi-issue honesty · OP eye — no invent PASS.

## Code Facts (verify)

- Target: tests assert leaves path invoked (or UI markers) · N>1 not silent single popup · soft markers `data-nf20-*` if used

## Constraints

- Path A ARCH-DELTA §8 · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · honesty over coverage theater

## AC / DoD

- [x] Vitest leaves / multi-issue Present
- [x] Visual Done not claimed without OP eye

## Where changed

`src/components/map/__tests__/` · soft BoardIssuesMap tests

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/map
```
