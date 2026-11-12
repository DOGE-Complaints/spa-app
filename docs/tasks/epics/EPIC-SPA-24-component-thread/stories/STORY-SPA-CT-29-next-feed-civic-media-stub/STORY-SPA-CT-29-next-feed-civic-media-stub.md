# STORY-SPA-CT-29-next-feed-civic-media-stub — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-29-next-feed-civic-media-stub.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-29-next-feed-civic-media-stub.md)  
> **Status:** P5 APPLY · gate **BLOCK** · `2026-10-20T21:39:31Z` · tip · activation **none** · F1/F2 WAIVED · Await **P8**  
> **Package:** `pkg-000188` · component-thread · REQ-22 FR-22.1 / M150 supersede  
> **ui_scope:** `feed` · **mixed** · Path A gap analysis + dogefeed stub · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft CT-28 · lab media stub Present  
> **Runtime:** T01–T03 **Done** · vitest **442/442** · shots 01–05 Present · no invent image-gen HTTP/OP PASS

## Purpose

Lab cards show `/assets/dogefeed.png`. Production `FeedCivicPost` is `no-media`. Until image generation ships, use the **same** doge stub everywhere on next/feed (list + detail).

## L1 — FR (backlog verbatim)

- **FR-CT-29.1** Civic issue cards on `#/next/feed` list show media frame with **`/assets/dogefeed.png`**.  
- **FR-CT-29.2** Issue detail / mount civic surface uses the **same** stub asset (no second placeholder).  
- **FR-CT-29.3** Supersedes M150 `data-civic-variant="no-media"` Done claim for this interim wave.  
- **FR-CT-29.4** No invent image-gen HTTP · no per-issue unique art until gen lands.  
- **FR-CT-29.5** Vitest: media Present · src = stub path · list+detail Match.

## Acceptance Criteria (backlog verbatim)

- [x] List cards show dogefeed stub  
- [x] Detail shows same stub  
- [x] Single asset path  
- [x] no-media Done claim superseded  
- [x] Vitest  
- [ ] OP eye gate (Absent = BLOCK)

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-29-next-feed-civic-media-stub.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-29-t01-list-media](task-spa-ct-29-t01-list-media/README.md) | Media slot + stub on list civic card | **Done** |
| T02 | [task-spa-ct-29-t02-detail-parity](task-spa-ct-29-t02-detail-parity/README.md) | Same stub on detail mount | **Done** |
| T03 | [task-spa-ct-29-t03-vitest](task-spa-ct-29-t03-vitest/README.md) | src stub · not no-media Done | **Done** |

**Order:** t01 → t02 → t03

## Out of scope (backlog verbatim)

Image-gen API · ThreadMount cutover (CT-28) · Reactions (CR-23) · carousel · invent OP PASS

## DoD (backlog verbatim)

Next/feed civic surfaces share one dogefeed stub until image-gen replaces it.

## @mockup handoff

- Continuity: [gap analysis next/feed cutover](../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · lab stub `/assets/dogefeed.png` Present · soft [`labMediaStub.js`](../../../../../../src/features/feed-lab/fixtures/labMediaStub.js) · Arch [§15.2](../../../../backlog-stories/component-thread/ARCHITECTURE.md)
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **Artboard tip** = reuse lab stub · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-next-feed-civic-media-stub.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- `@mockup:` _(none — gap + stub asset SSOT)_
