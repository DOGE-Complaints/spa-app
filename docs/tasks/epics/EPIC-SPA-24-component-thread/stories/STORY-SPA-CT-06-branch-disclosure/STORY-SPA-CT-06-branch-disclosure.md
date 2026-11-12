# STORY-SPA-CT-06-branch-disclosure — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-06-branch-disclosure.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-06-branch-disclosure.md)  
> **Status:** P3/P5 Done · gate **BLOCK** · `2026-10-18T13:51:05Z` · tip active  
> **Package:** `pkg-000164` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX-MIRROR §4.2 T-coll/T-exp/T-err · M153 branch · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-03 structure Present  
> **Runtime:** P5 APPLY Done · TASKED=0 · activation none · Await **P8**

## Purpose

Local branch collapse / expand / error disclosure on CommentTree — View N replies when count local, expanding chrome, scoped error Try again — no invent branch-fetch HTTP.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-06-t01-branch-state](task-spa-ct-06-t01-branch-state/README.md) | collapsed/expanding/error per branch | Done |
| T02 | [task-spa-ct-06-t02-sync-vs-async](task-spa-ct-06-t02-sync-vs-async/README.md) | Sync local · delayed/error fixture | Done |
| T03 | [task-spa-ct-06-t03-vitest-branch](task-spa-ct-06-t03-vitest-branch/README.md) | Vitest · Path A + gate | Done |

## Out of scope

Server pagination · invent HTTP · tombstone prod inference · invent OP PASS

## @mockup handoff

- Mirror: [OP-UX-MIRROR §4.2 T-coll/T-exp/T-err](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)
- Artboard: [M153](../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) branch
- Verify: `#/lab/thread` branch · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-06-branch-disclosure.md) · **BLOCK**
- NO STORY-UX-MOCKUP-BRIEF
