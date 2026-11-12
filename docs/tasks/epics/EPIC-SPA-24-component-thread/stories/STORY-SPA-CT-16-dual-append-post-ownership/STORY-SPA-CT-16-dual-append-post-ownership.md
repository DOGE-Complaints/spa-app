# STORY-SPA-CT-16-dual-append-post-ownership — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-16-dual-append-post-ownership.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-16-dual-append-post-ownership.md)  
> **Status:** P6 T05 Done · gate **BLOCK** · `2026-10-20T11:48:47Z` · tip active  
> **Package:** `pkg-000174` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX M153a/b **BUG-1** dual-append · Artboard Meta=**—** · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-03 · CT-08  
> **Runtime:** P6 T05 Done · Await **P7/P8** · F1 OP eye held · no invent OP PASS · no invent HTTP

## Purpose

Single write-owner for successful post/reply comment append on lab feed: eliminate dual-append of the same `lab-posted-*` id (host snap + ThreadMount `localComments`) so forest does not enter `flat` / `duplicate-id` solely from dual-append.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-16-t01-pin-owner](task-spa-ct-16-t01-pin-owner/README.md) | Pin single write-owner (host vs ThreadMount) on FeedLab post path | **Done** |
| T02 | [task-spa-ct-16-t02-remove-dual-append](task-spa-ct-16-t02-remove-dual-append/README.md) | Eliminate double append for same success id | **Done** |
| T03 | [task-spa-ct-16-t03-vitest-unique-ids](task-spa-ct-16-t03-vitest-unique-ids/README.md) | Assert unique ids after reply + root post | **Done** |
| T04 | [task-spa-ct-16-t04-puppeteer-regression](task-spa-ct-16-t04-puppeteer-regression/README.md) | Green prior HARD_FAIL dual-append asserts | **Done** |
| T05 | [task-spa-ct-16-t05-screenshots-root-readme](task-spa-ct-16-t05-screenshots-root-readme/README.md) | Audit F2 story-root `screenshots/README.md` indexer | **Done** |

## Out of scope

Redesign of `buildCommentForest` beyond dedupe/owner fix · invent HTTP · `#/next/feed` · invent OP PASS · attach picker (CT-17) · HOLD reactions

## @mockup handoff

- Mirror: [OP-UX M153a/b gaps · BUG-1](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)
- Artboard: **—** (code bug · not artboard hole)
- Verify: `#/lab/feed` Reply + root Post · unique ids · non-flat forest · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-16-dual-append-post-ownership.md) · **BLOCK**
- Shots: [screenshots/README.md](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md) · md5 `6355b33fdaf9` · `698ce06921c7` · `fb2a895c8dea`
- NO STORY-UX-MOCKUP-BRIEF
