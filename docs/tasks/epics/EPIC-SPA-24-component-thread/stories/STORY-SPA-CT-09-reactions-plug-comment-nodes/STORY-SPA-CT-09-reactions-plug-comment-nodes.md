# STORY-SPA-CT-09-reactions-plug-comment-nodes — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md)  
> **Status:** P3 Execute Done · gate **BLOCK** · `2026-10-18T14:42:44Z` · tip active  
> **Package:** `pkg-000167` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX-MIRROR §4.2 T-react · §4.4 R-plug/R-bound · M153 React · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-03 CommentNode · component-reactions Present · CT-08 lab host held  
> **Runtime:** P3 Done · Await **P4**

## Purpose

Each CommentNode mounts reactions-mount (`target=comment`) via slot/render prop — React (+ Reply if eligible) only · no Share/Reactions strip on node · thread package never opens people · root strip reactSlot unchanged.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-09-t01-node-reaction-slot](task-spa-ct-09-t01-node-reaction-slot/README.md) | CommentNode reaction slot | Done |
| T02 | [task-spa-ct-09-t02-lab-wire](task-spa-ct-09-t02-lab-wire/README.md) | FeedLabReactionsMount per comment id | Done |
| T03 | [task-spa-ct-09-t03-boundary-guard](task-spa-ct-09-t03-boundary-guard/README.md) | No people/popover in thread-mount | Done |
| T04 | [task-spa-ct-09-t04-vitest-plug](task-spa-ct-09-t04-vitest-plug/README.md) | Vitest · Path A + gate | Done |

## Out of scope

People on comment aggregate invent · CR-20…22 icon residual · dual reaction stacks · invent HTTP/OP PASS · CR package rewrite

## @mockup handoff

- Mirror: [OP-UX-MIRROR §4.2 T-react · §4.4 R-plug/R-bound](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)
- Prior: CT-03 CommentNode · CT-08 lab ThreadMount host · EPIC-SPA-23 reactions Present
- Verify: `#/lab/feed` / `#/lab/thread` nested React · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-09-reactions-plug-comment-nodes.md) · **BLOCK**
- NO STORY-UX-MOCKUP-BRIEF
