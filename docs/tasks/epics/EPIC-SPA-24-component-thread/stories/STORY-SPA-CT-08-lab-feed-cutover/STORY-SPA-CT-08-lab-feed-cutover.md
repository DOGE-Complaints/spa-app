# STORY-SPA-CT-08-lab-feed-cutover — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md)  
> **Status:** P3 Execute Done · gate **BLOCK** · `2026-10-18T14:06:35Z` · tip active  
> **Package:** `pkg-000166` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX-MIRROR §4.4 L-cut/L-fix · `#/lab/feed` · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-01…07 structure Present  
> **Runtime:** P3 Done · Await **P4**

## Purpose

`#/lab/feed` card/detail mount ThreadMount via FeedLabThreadMount + FixtureAdapter — retire thin discussion tip plane · no dual competing discussion UIs · ban product FeedDiscussionBlock on lab Done path.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-08-t01-feed-lab-host](task-spa-ct-08-t01-feed-lab-host/README.md) | FeedLabThreadMount + FixtureAdapter | Done |
| T02 | [task-spa-ct-08-t02-card-cutover](task-spa-ct-08-t02-card-cutover/README.md) | Card/detail cutover | Done |
| T03 | [task-spa-ct-08-t03-fixtures-stands](task-spa-ct-08-t03-fixtures-stands/README.md) | Fixtures A–E + tree + gate | Done |
| T04 | [task-spa-ct-08-t04-vitest-cutover](task-spa-ct-08-t04-vitest-cutover/README.md) | Vitest · Path A + gate | Done |

## Out of scope

`#/next/feed` · `#/board` · invent Live threads · invent OP PASS

## @mockup handoff

- Mirror: [OP-UX-MIRROR §4.4 L-cut/L-fix](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)
- Prior: LAB-09 greenfield discussion plane
- Verify: `#/lab/feed` ThreadMount under strip · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-08-lab-feed-cutover.md) · **BLOCK**
- NO STORY-UX-MOCKUP-BRIEF
