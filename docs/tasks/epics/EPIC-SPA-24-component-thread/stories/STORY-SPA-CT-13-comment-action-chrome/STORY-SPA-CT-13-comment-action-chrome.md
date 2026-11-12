# STORY-SPA-CT-13-comment-action-chrome — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-13-comment-action-chrome.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-13-comment-action-chrome.md)  
> **Status:** P3/P5 Done · gate **BLOCK** · `2026-10-19T12:42:31Z` · activation none  
> **Package:** `pkg-000171` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX residual §3 **G-H5** · M153 React/Reply · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-09 · soft CR package  
> **Runtime:** P3 Execute Done · Await **P4/P5** · no invent OP PASS

## Purpose

Paired icon+label pills **React** \| **Reply** + separator under each bubble · React stays reactions-mount plug (density wrap) · Reply not underline-only · no rewrite CR · no people in thread-mount.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-13-t01-pill-row-css](task-spa-ct-13-t01-pill-row-css/README.md) | React \| Reply pill row + separator tokens | **Done** |
| T02 | [task-spa-ct-13-t02-react-density-wrap](task-spa-ct-13-t02-react-density-wrap/README.md) | Compact wrap around renderCommentReactions · no strip DNA | **Done** |
| T03 | [task-spa-ct-13-t03-reply-pill-icon](task-spa-ct-13-t03-reply-pill-icon/README.md) | Reply icon+label (reply.svg) · remove underline-only | **Done** |
| T04 | [task-spa-ct-13-t04-vitest-actions](task-spa-ct-13-t04-vitest-actions/README.md) | Vitest pill pair · R-bound · Path A + gate | **Done** |

## Out of scope

Rewrite CR package · invent people HTTP · spine (CT-14) · invent OP PASS · `#/next/feed`

## @mockup handoff

- Mirror: [OP-UX residual §3 G-H5](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md)
- Artboard: [M153 React/Reply](../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- Verify: `#/lab/feed` pill pair · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-13-comment-action-chrome.md) · **BLOCK**
- Shots: [screenshots/full-cycle](./screenshots/full-cycle/README.md) · md5 `c2c44999fd8f` · `97def5655c12` · `c29acec07df4` · `0bcdbe134192` · `621886f00fe6`
- NO STORY-UX-MOCKUP-BRIEF
