# STORY-SPA-CT-03-comment-tree-nesting — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-03-comment-tree-nesting.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-03-comment-tree-nesting.md)  
> **Status:** P3 Done · gate **BLOCK** · `2026-10-18T13:21:17Z` · tip active  
> **Package:** `pkg-000161` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX-MIRROR §4.2 T-A/T-cap/T-depth/T-B · M153 A/B · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-01 structure Present  
> **Runtime:** P3 Execute Done · `#/lab/thread` F–I · Await P4

## Purpose

Вложенное дерево комментариев с literal bodies; визуальный indent cap 3 ≠ reply `max_depth` из конфига/knobs.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-03-t01-config-depth](task-spa-ct-03-t01-config-depth/README.md) | DEFAULT_MAX_DEPTH · VISUAL_INDENT_CAP | Done |
| T02 | [task-spa-ct-03-t02-comment-tree](task-spa-ct-03-t02-comment-tree/README.md) | CommentTree nest · connectors · flat fallback | Done |
| T03 | [task-spa-ct-03-t03-comment-node](task-spa-ct-03-t03-comment-node/README.md) | CommentNode body · Reply gate · max-depth copy | Done |
| T04 | [task-spa-ct-03-t04-fixture-tree](task-spa-ct-03-t04-fixture-tree/README.md) | M153 literal nest fixtures | Done |
| T05 | [task-spa-ct-03-t05-vitest-nest](task-spa-ct-03-t05-vitest-nest/README.md) | Vitest nest · Path A + gate | Done |

## Out of scope

Composer (CT-04) · attachments · invent branch HTTP · Share on node · invent OP PASS

## @mockup handoff

- Mirror: [OP-UX-MIRROR §4.2 T-A/T-cap/T-depth/T-B](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)
- Artboard: [M153](../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- Verify: `#/lab/thread` / expanded ThreadMount · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-03-comment-tree-nesting.md) · **BLOCK** · Await P4
- NO STORY-UX-MOCKUP-BRIEF
