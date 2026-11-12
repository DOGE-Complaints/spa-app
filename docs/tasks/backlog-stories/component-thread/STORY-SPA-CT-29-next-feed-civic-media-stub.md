# STORY-SPA-CT-29 — `#/next/feed` civic media stub (dogefeed)

## Meta

- **Key:** `STORY-SPA-CT-29-next-feed-civic-media-stub`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §15.2](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P5 APPLY · gate BLOCK · F1/F2 WAIVED · TASKED=0 · `pkg-000188` · [disposition](../../analysis/p5-disposition-STORY-SPA-CT-29-2026-10-20.md) · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-29-next-feed-civic-media-stub/STORY-SPA-CT-29-next-feed-civic-media-stub.md) · activation none · Await **P8**
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.1 / M150 supersede lock
- **Depends on:** soft CT-28 · lab media stub Present
- **Blocks:** OP eye uniform post image on next/feed until image-gen
- **Interview:** [INTERVIEW-CT-28-plus…](INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md) N4 · N8
- **Artboard tip:** reuse lab stub asset — **no UX gen** · supersede M150 ISSUE-CARD-NO-MEDIA for this interim
- **Code home (targets):** `FeedCivicPost.jsx` · list card media · `/assets/dogefeed.png` · soft `labMediaStub.js` path reuse

## Зачем

Lab cards show `/assets/dogefeed.png`. Production `FeedCivicPost` is `no-media`. OP: until image generation ships, use the **same** doge stub everywhere on next/feed (list + detail).

## L1 — FR

- **FR-CT-29.1** Civic issue cards on `#/next/feed` list show media frame with **`/assets/dogefeed.png`**.  
- **FR-CT-29.2** Issue detail / mount civic surface uses the **same** stub asset (no second placeholder).  
- **FR-CT-29.3** Supersedes M150 `data-civic-variant="no-media"` Done claim for this interim wave.  
- **FR-CT-29.4** No invent image-gen HTTP · no per-issue unique art until gen lands.  
- **FR-CT-29.5** Vitest: media Present · src = stub path · list+detail Match.

## Вне scope

Image-gen API · ThreadMount cutover (CT-28) · Reactions (CR-23) · carousel · invent OP PASS

## L1 — Acceptance Criteria

- [ ] List cards show dogefeed stub  
- [ ] Detail shows same stub  
- [ ] Single asset path  
- [ ] no-media Done claim superseded  
- [ ] Vitest  
- [ ] OP eye gate (Absent = BLOCK)

## L2 — Technical subtasks

> Skill: `react-expert` · Arch [§15.2](ARCHITECTURE.md) · Await P1.3 · parallelizable with CT-28

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-29-t01-list-media` | Await | Media slot + stub on list civic card | FeedCivicPost / list host | 29.1 · 29.3 |
| `task-spa-ct-29-t02-detail-parity` | Await | Same stub on detail mount | FeedIssueDetail path | 29.2 |
| `task-spa-ct-29-t03-vitest` | Await | src stub · not no-media Done | `__tests__` | 29.5 |

### Order

`t01` → `t02` → `t03`

## DoD

Next/feed civic surfaces share one dogefeed stub until image-gen replaces it.
