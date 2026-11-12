# STORY-SPA-CT-12-inline-reply-placement — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md)  
> **Status:** P3/P5 Done · gate **BLOCK** · `2026-10-19T12:30:53Z` · activation none  
> **Package:** `pkg-000170` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX residual §3 **G-H4** · M153-C · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-03 CommentTree · CT-04 ThreadComposer  
> **Runtime:** P3 Execute Done · Await **P4/P5** · no invent OP PASS

## Purpose

Reply composer renders **under parent comment** in tree (not after entire IssueThreadBlock) · root compose may stay bottom · cancel clears target · draft/fail/verify single-owner held.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-12-t01-reply-slot-contract](task-spa-ct-12-t01-reply-slot-contract/README.md) | CommentNode slot / renderReplyComposer when replyTarget matches | **Done** |
| T02 | [task-spa-ct-12-t02-mount-split](task-spa-ct-12-t02-mount-split/README.md) | Root composer bottom; reply leaves post-block sibling | **Done** |
| T03 | [task-spa-ct-12-t03-cancel-clear](task-spa-ct-12-t03-cancel-clear/README.md) | Cancel reply clears target · unmounts inline slot | **Done** |
| T04 | [task-spa-ct-12-t04-draft-gate-hold](task-spa-ct-12-t04-draft-gate-hold/README.md) | Draft / fail F / verify still single-owner | **Done** |
| T05 | [task-spa-ct-12-t05-vitest-inline](task-spa-ct-12-t05-vitest-inline/README.md) | Vitest composer under parent · Path A + gate | **Done** |

## Out of scope

Composer icons (CT-11) · action pills (CT-13) · invent HTTP/OP PASS · `#/next/feed`

## @mockup handoff

- Mirror: [OP-UX residual §3 G-H4](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md)
- Artboard: [M153-C](../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- Verify: `#/lab/feed` reply under parent · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-12-inline-reply-placement.md) · **BLOCK**
- Shots: [screenshots/full-cycle](./screenshots/full-cycle/README.md) · md5 `b08e98e9947e` · `89ad47171e0d` · `97b2e273b94c` · `5dcf9fad8e7d` · `05dc76f241b0`
- NO STORY-UX-MOCKUP-BRIEF
