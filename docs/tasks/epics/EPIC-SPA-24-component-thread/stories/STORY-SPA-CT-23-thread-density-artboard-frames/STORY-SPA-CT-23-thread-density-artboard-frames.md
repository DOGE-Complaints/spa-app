# STORY-SPA-CT-23-thread-density-artboard-frames — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-23-thread-density-artboard-frames.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-23-thread-density-artboard-frames.md)  
> **Status:** P5 APPLY · gate **BLOCK** · `2026-10-20T15:17:16Z` · activation **none** · T01–T05 Done  
> **Package:** `pkg-000181` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A M153 · M153b · M152 **strict** · keep M153b bubble border · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-18 · soft CT-21  
> **Runtime:** P5 disposition Present · TASKED=0 · no invent denser/HTTP/OP PASS · NO BRIEF · Await **P8** (OP eye)

## Purpose

Remove non-artboard discussion frames; density strictly M152/M153/M153b — keep bubble/spine/pills/composer; spacing artboard rhythm only.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-23-t01-frame-audit](task-spa-ct-23-t01-frame-audit/README.md) | Document Present borders vs artboard allow-list | **Done** |
| T02 | [task-spa-ct-23-t02-remove-extra](task-spa-ct-23-t02-remove-extra/README.md) | Remove host/thread-block extra frames | **Done** |
| T03 | [task-spa-ct-23-t03-spacing](task-spa-ct-23-t03-spacing/README.md) | Align node/children/composer gaps to artboard | **Done** |
| T04 | [task-spa-ct-23-t04-keep-m153b](task-spa-ct-23-t04-keep-m153b/README.md) | Verify bubble/spine/pills unchanged vs M153b | **Done** |
| T05 | [task-spa-ct-23-t05-regression](task-spa-ct-23-t05-regression/README.md) | CSS/vitest + optional puppeteer spacing smoke | **Done** |

## Out of scope

Invent denser-than-artboard tokens · reaction HOLD · Share sheet · attach preview chrome invent beyond CT-22 · `#/next/feed`

## @mockup handoff

- Continuity: [M153](../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) · [M153b](../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · [M152](../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) — **strict** · no invent new M-number
- Interview: [INTERVIEW-CT-21-plus…](../../../../backlog-stories/component-thread/INTERVIEW-CT-21-plus-thread-density-share-attach-2026-10-20.md) C1 · C3
- Arch: [§13.3](../../../../backlog-stories/component-thread/ARCHITECTURE.md)
- Verify: `#/lab/feed` · no nested discussion plates · bubble border held · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-23-thread-density-artboard-frames.md) · **PENDING**
- Shots: [visual-checklists](./visual-checklists-thread-density-artboard-frames.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- NO STORY-UX-MOCKUP-BRIEF
