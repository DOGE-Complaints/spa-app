# SPA-CT-03-T03 — CommentNode body · Reply gate · max-depth copy

**Status:** Done  
**Story:** [`../STORY-SPA-CT-03-comment-tree-nesting.md`](../STORY-SPA-CT-03-comment-tree-nesting.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-03-comment-tree-nesting.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-03-comment-tree-nesting.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:17:37Z`  
**Package:** `pkg-000161`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.2 · [M153](../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · Await P4nds T01–T02

## Purpose

FR-CT-03.3/03.4: Literal selectable body · Reply iff depth < maxDepth · at max: no Reply + «Maximum reply depth reached» · child slot.

## Constraints

- No invent HTTP · OP PASS  
- No fake author chrome  
- Depth checks only via config/props (no hardcode outside)

## AC / DoD

- [x] Reply gate · max-depth copy · body Present
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/tree/CommentNode.jsx (+ css)`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
