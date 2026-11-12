# SPA-CT-23-T01 — Document Present borders vs artboard allow-list

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

FR-CT-23.1: Document Present borders vs artboard allow-list.

## Constraints

- Path A M152/M153/M153b **strict** · keep M153b bubble border · no invent denser/HTTP/OP PASS · Partial=**BLOCK**  
- NO STORY-UX-MOCKUP-BRIEF

## AC / DoD

- [x] Inventory of borders/backgrounds/radii vs M152/M153/M153b allow-list Present
- [x] Extra frames flagged for T02 removal
- [x] Visual Done not claimed without OP eye

## Where to change

analysis note / story evidence · IssueThreadBlock · FeedPostCard thread-host

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
