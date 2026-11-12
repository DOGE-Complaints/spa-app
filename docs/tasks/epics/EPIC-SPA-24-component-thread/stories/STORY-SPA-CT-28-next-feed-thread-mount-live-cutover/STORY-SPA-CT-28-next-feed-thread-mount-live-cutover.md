# STORY-SPA-CT-28-next-feed-thread-mount-live-cutover — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md)  
> **Status:** P5 APPLY · gate **BLOCK** · `2026-10-20T20:57:07Z` · tip · activation **none** · **BLOCKED** (OP eye) · Await **P8**  

> **Package:** `pkg-000186` · component-thread · REQ-22 FR-22.4 · M158  
> **ui_scope:** `feed` / `thread-mount` · **mixed** · Path A gap analysis · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** CT-08 · soft CT-21…27 · sibling CR-23 OOS  
> **Runtime:** P5 disposition [p5-disposition-STORY-SPA-CT-28-2026-10-20.md](../../../../analysis/p5-disposition-STORY-SPA-CT-28-2026-10-20.md) · F1/F2 **WAIVED** · TASKED=**0** · P6 not needed · T01–T04 **Done** · no invent HTTP/OP PASS · Await **P8**

## Purpose

Production `#/next/feed` discussion mounts `thread-mount` Live chrome bound to Closed `ThreadsSocialClient`. Lab FixtureAdapter path unchanged. No invent HTTP / upload / OP PASS.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-28-t01-live-bind](task-spa-ct-28-t01-live-bind/README.md) | Bind LiveAdapter / host to ThreadsSocialClient | **Done** |
| T02 | [task-spa-ct-28-t02-block-cutover](task-spa-ct-28-t02-block-cutover/README.md) | ThreadMount as BlockComponent / replace FeedDiscussionBlock Done | **Done** |
| T03 | [task-spa-ct-28-t03-lab-hold](task-spa-ct-28-t03-lab-hold/README.md) | Assert lab FixtureAdapter unchanged | **Done** |
| T04 | [task-spa-ct-28-t04-vitest](task-spa-ct-28-t04-vitest/README.md) | next-feed ThreadMount · live not unwired | **Done** |

## Out of scope

Reactions chrome (CR-23) · civic media stub (CT-29) · `#/board` · Early Signal · invent OP PASS · people Live API · invent upload/bind HTTP

## @mockup handoff

- Continuity: [gap analysis next/feed cutover](../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · lab ThreadMount Present · Arch [§15.1](../../../../backlog-stories/component-thread/ARCHITECTURE.md)
- Path A: [ui-mockup-spec](./ui-mockup-spec.md)
- Shots: [visual-checklists](./visual-checklists-next-feed-thread-mount-live-cutover.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- NO STORY-UX-MOCKUP-BRIEF · no UX gen required
