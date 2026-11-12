# SPA-CT-23-T04 — Verify bubble/spine/pills unchanged vs M153b

**Status:** Done  
**Story:** [`../STORY-SPA-CT-23-thread-density-artboard-frames.md`](../STORY-SPA-CT-23-thread-density-artboard-frames.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-23-thread-density-artboard-frames.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-23-thread-density-artboard-frames.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T15:10:29Z`  
**Package:** `pkg-000181`  
**@mockup:** [M153](../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) · [M153b](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · [M152](../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · strict · no denser invent

## Purpose

FR-CT-23.2: Verify bubble/spine/pills unchanged vs M153b.

## Constraints

- Path A M152/M153/M153b **strict** · keep M153b bubble border · no invent denser/HTTP/OP PASS · Partial=**BLOCK**  
- NO STORY-UX-MOCKUP-BRIEF

## AC / DoD

- [x] Bubble 1px #E7E4DC · spine · pills held
- [x] No invent palette
- [x] Visual Done not claimed without OP eye

## Where to change

CommentNode.css

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
