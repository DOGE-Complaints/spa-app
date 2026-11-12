# STORY-SPA-CT-24-share-issue-link-sheet — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-24-share-issue-link-sheet.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-24-share-issue-link-sheet.md)  
> **Status:** P5 APPLY · gate **BLOCK** · TASKED=0 · `2026-10-20T15:30:48Z` · tip · activation none  
> **Package:** `pkg-000182` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `feed-lab` · **mixed** · Path A M152d (+ PNG) · icons `/icons/next-feed/share/*` · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-02 · CT-08  
> **Runtime:** P5 APPLY · TASKED=0 · no invent HTTP/OP PASS · NO BRIEF · Await P8

## Purpose

Share opens custom M152d popover (desktop) / bottom sheet (~390) with Telegram · Instagram · X · WhatsApp · Facebook · Copy link — not silent no-op.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text. Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-24-share-issue-link-sheet.md) · **BLOCK** (OP eye Absent).

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-24-t01-zone-wire](task-spa-ct-24-t01-zone-wire/README.md) | Handle share in FeedPostCard / detail | **Done** |
| T02 | [task-spa-ct-24-t02-surface](task-spa-ct-24-t02-surface/README.md) | Desktop popover + narrow bottom sheet chrome | **Done** |
| T03 | [task-spa-ct-24-t03-rows-icons](task-spa-ct-24-t03-rows-icons/README.md) | Six rows + `/icons/next-feed/share/*` | **Done** |
| T04 | [task-spa-ct-24-t04-url-copy](task-spa-ct-24-t04-url-copy/README.md) | Resolve Issue URL · copy · Link copied · unavailable | **Done** |
| T05 | [task-spa-ct-24-t05-vitest](task-spa-ct-24-t05-vitest/README.md) | Zone → surface · rows · honesty | **Done** |

## Out of scope

OAuth · short-link service · Instagram Graph API · invent production domain · redesign strip · thread density · `#/next/feed`

## @mockup handoff

- Continuity: [M152d v1.0](../../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) · [PNG](../../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.png) · icons `/icons/next-feed/share/*.svg`
- Path A: [ui-mockup-spec](./ui-mockup-spec.md)
- Verify: `#/lab/feed` · Share → popover/sheet · six rows · OP eye · Partial=**BLOCK**
- Shots: [visual-checklists](./visual-checklists-share-issue-link-sheet.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md) · md5 `0b38c7267021` · `de3c94cc0957` · `f9a4fe6b76a2` · `ff3ec57704d0` · `04639f73f7bc`
- NO STORY-UX-MOCKUP-BRIEF
