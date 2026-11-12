# SPA-NF-LAB-05-T03 — Discussion copy / depth

**Status:** Blocked · P3 prerequisite unmet (`2026-10-13T13:17:15Z`) · not Done
**Story:** [`../STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md`](../STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md)
**ui_scope:** `next-feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T13:13:55Z`
**Package:** `pkg-000131`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png)
**@mockup-m153:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
**Depends on:** LAB-03 discussion atoms proven · LAB-03/04 visual PASS for Done claim
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK**

## Purpose
Align DISCUSSION → DS/lab copy where lab already fixed; keep Closed honesty for missing public labels / unsupported author fields.

## Constraints
- Do not invent author/time/sort/media contracts.
- Classic `#/board` DISCUSSION path OOS unless smoke only.
- name ≠ create until P3 (and unlock).

## AC / DoD
- [ ] Next discussion Done copy ≠ classic «DISCUSSION» where lab fixed
- [ ] Literal comment bodies; Closed honesty held
- [ ] M152/M153 must-states aimed · visual OP in T04

## Where to change
- Next discussion hosts / DS comments atoms under `features/feed/`
- Cite lab `FeedLabDiscussion` copy pattern

## Verification
- Grep / visual Path A in T04
