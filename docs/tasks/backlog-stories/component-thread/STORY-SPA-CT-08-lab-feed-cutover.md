# STORY-SPA-CT-08 — Lab feed cutover → ThreadMount

## Meta

- **Key:** `STORY-SPA-CT-08-lab-feed-cutover`
- **Package:** [component-thread](INDEX.md)
- **Status:** P3 Done · tip · `pkg-000166` · gate BLOCK · `2026-10-18T14:06:35Z` · Await P4
- **Depends on:** CT-01…07 structure
- **UX mirror:** §4.4 L-cut/L-fix
- **Arch:** §8 Cutover
- **Prior tip:** [LAB-09](../next-feed-lab/STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md)

## Зачем

`#/lab/feed` карточка/detail используют ThreadMount вместо тонкого FeedDiscussionPlane tip; fixtures/stands для OP eye.

## FR

- **FR-CT-08.1** FeedPostCard + detail mount `FeedLabThreadMount` (FixtureAdapter default).  
- **FR-CT-08.2** Prior discussion plane retired or thin-wrap only — no dual competing discussion UIs.  
- **FR-CT-08.3** Lab markers: `data-lab-thread-mount` · preserve useful prior testids where possible.  
- **FR-CT-08.4** Fixture stands exercise M152 statuses + expanded tree + gate as configured.  
- **FR-CT-08.5** Ban product `FeedDiscussionBlock` on lab Done path (hold LAB ban).  
- **FR-CT-08.6** `#/next/feed` / `#/board` not cut over in this story.

## Вне scope

Production cutover · invent Live threads default

## Acceptance Criteria

- [x] `#/lab/feed` shows ThreadMount under strip  
- [x] Comment zone still expands/focuses  
- [x] Vitest cutover · no banned product block  
- [ ] OP eye  

## Technical subtasks

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-08-t01-feed-lab-host` | Done | FeedLabThreadMount wrapper + FixtureAdapter | `feed-lab/post/thread/` | 08.1 |
| `task-spa-ct-08-t02-card-cutover` | Done | Replace discussion plane import on card/detail | FeedPostCard · FeedIssueDetailBody | 08.1–08.2 |
| `task-spa-ct-08-t03-fixtures-stands` | Done | Lab fixtures/status variants for A–E + tree + gate | labFeedFixtures · adapter | 08.4 |
| `task-spa-ct-08-t04-vitest-cutover` | Done | Mount markers · ban product block · Comment zone | feed-lab tests | 08.3 · 08.5 · AC |

## DoD

Lab feed is the first real host of component-thread.
