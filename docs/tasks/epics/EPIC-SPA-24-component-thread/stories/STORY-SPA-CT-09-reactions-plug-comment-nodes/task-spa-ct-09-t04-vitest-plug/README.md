# SPA-CT-09-T04 — Vitest plug · Path A + gate

**Status:** Done  
**Story:** [`../STORY-SPA-CT-09-reactions-plug-comment-nodes.md`](../STORY-SPA-CT-09-reactions-plug-comment-nodes.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T14:39:06Z`  
**Package:** `pkg-000167`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.2 T-react · §4.4  
**Runtime:** Await P2 → P3 · final task · depends T01–T03

## Purpose

AC: Vitest `data-rm-target=comment` on nodes · picker ≠ composer steal · no people import · Path A shots · gate BLOCK until OP eye.

## Constraints

- No invent HTTP · OP PASS  
- Partial visual = BLOCK  
- story-root `screenshots/full-cycle/` mandatory at P3

## AC / DoD

- [x] Vitest comment-target plug Present
- [x] Path A shots + gate Result filled (BLOCK until OP eye)

## Where to change

`src/features/thread-mount/__tests__/` · `src/features/feed-lab/__tests__/` · capture · gate/checklist

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
