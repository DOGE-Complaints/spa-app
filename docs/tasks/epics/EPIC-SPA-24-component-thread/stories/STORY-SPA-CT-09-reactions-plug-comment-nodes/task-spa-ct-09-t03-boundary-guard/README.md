# SPA-CT-09-T03 — Boundary guard · no people in thread-mount

**Status:** Done  
**Story:** [`../STORY-SPA-CT-09-reactions-plug-comment-nodes.md`](../STORY-SPA-CT-09-reactions-plug-comment-nodes.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T14:39:06Z`  
**Package:** `pkg-000167`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.4 R-bound  
**Runtime:** Await P2 → P3 · depends T01–T02

## Purpose

FR-CT-09.3–09.4: Ensure thread-mount does not import ReactorsPopover / open people · root post reactions remain in card strip reactSlot.

## Constraints

- Boundary lint/test only · no invent people UI  
- No CR package rewrite

## AC / DoD

- [x] No people/popover import in thread-mount Present
- [x] Root strip reactSlot held

## Where to change

`src/features/thread-mount/**` source scan · package tests

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
