# SPA-CT-09-T01 — CommentNode reaction slot

**Status:** Done  
**Story:** [`../STORY-SPA-CT-09-reactions-plug-comment-nodes.md`](../STORY-SPA-CT-09-reactions-plug-comment-nodes.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T14:39:06Z`  
**Package:** `pkg-000167`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.2 T-react · §4.4 R-plug  
**Runtime:** Await P2 → P3 · ui_anchor

## Purpose

FR-CT-09.1–09.2: CommentNode exposes render prop / slot for reactions · node actions React (+ Reply if eligible) only · no Share/Reactions strip on comment.

## Constraints

- No invent HTTP · OP PASS  
- No rewrite CR package  
- Slot only — host wires mount

## AC / DoD

- [x] CommentNode reaction slot Present
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/tree/CommentNode.jsx` · ThreadMount wire

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
