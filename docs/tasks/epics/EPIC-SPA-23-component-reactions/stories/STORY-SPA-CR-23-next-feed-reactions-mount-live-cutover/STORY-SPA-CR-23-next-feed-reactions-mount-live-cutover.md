# STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md)  
> **Status:** P5 APPLY · gate **BLOCK** · `2026-10-20T21:21:04Z` · tip · activation **none** · **BLOCKED** (OP eye) · Await **P8**  
> **Package:** `pkg-000187` · component-reactions · REQ-24 · REQ-22 FR-22.6 / FR-22.15  
> **ui_scope:** `feed` / `reactions-mount` · **mixed** · Path A gap analysis · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** CR-07 lab cutover Present · soft **CT-28** (strip host adjacency)  
> **Disposition:** [p5-disposition-STORY-SPA-CR-23-2026-10-20.md](../../../../analysis/p5-disposition-STORY-SPA-CR-23-2026-10-20.md) · F1/F2 **WAIVED** · TASKED=**0** · P6 not needed · T01–T04 **Done** · Await **P8**

## Purpose

Lab feed uses `reactions-mount` (CR-07). Production `#/next/feed` still used `FeedReactionsStrip` + `ReactionChrome`. LiveAdapter wraps `ThreadsSocialClient.react`. Cutover presentation Done path to ReactionsMount on next/feed (root + comment with CT-28).

## Acceptance Criteria

See backlog story AC checklist (SSOT). Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-23-t01-strip-live](task-spa-cr-23-t01-strip-live/README.md) | Wire ReactionsMount Live on civic strip | **Done** |
| T02 | [task-spa-cr-23-t02-comment-plug](task-spa-cr-23-t02-comment-plug/README.md) | Comment target mount with ThreadMount | **Done** |
| T03 | [task-spa-cr-23-t03-retire-done](task-spa-cr-23-t03-retire-done/README.md) | Strip Done claim → ReactionsMount | **Done** |
| T04 | [task-spa-cr-23-t04-vitest](task-spa-cr-23-t04-vitest/README.md) | reactions-mount · live · lab hold | **Done** |

## Out of scope

ThreadMount bind (CT-28) · media stub (CT-29) · invent people HTTP · invent OP PASS · `#/board`

## UI Screenshots (P3)

| ID | Path | md5 prefix |
|----|------|------------|
| 01 | [screenshots/full-cycle/01-next-feed-host.png](./screenshots/full-cycle/01-next-feed-host.png) | 1ca5cd040708 |
| 02 | [screenshots/full-cycle/02-reactions-mount-live-strip.png](./screenshots/full-cycle/02-reactions-mount-live-strip.png) | 7540fbf8a18d |
| 03 | [screenshots/full-cycle/03-comment-target-mount.png](./screenshots/full-cycle/03-comment-target-mount.png) | 680c12eb69ba |
| 04 | [screenshots/full-cycle/04-strip-not-done.png](./screenshots/full-cycle/04-strip-not-done.png) | a02bba4aa68a |
| 05 | [screenshots/full-cycle/05-lab-fixture-held.png](./screenshots/full-cycle/05-lab-fixture-held.png) | 77f17e4f2d21 |

Story-root indexer: [screenshots/README.md](./screenshots/README.md) · CAPTURE-META `fails: []` · `op_eye: Absent` · `partial: BLOCK`

## @mockup handoff

- Continuity: [gap analysis next/feed cutover](../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · lab reactions-mount Present · Arch [§1](../../../../backlog-stories/component-reactions/ARCHITECTURE.md)
- Path A: [ui-mockup-spec](./ui-mockup-spec.md)
- Shots: [visual-checklists](./visual-checklists-next-feed-reactions-mount-live-cutover.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- NO STORY-UX-MOCKUP-BRIEF · no UX gen required
