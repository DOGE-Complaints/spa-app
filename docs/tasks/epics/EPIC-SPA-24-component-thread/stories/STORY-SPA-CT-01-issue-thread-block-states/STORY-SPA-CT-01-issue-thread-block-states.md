# STORY-SPA-CT-01-issue-thread-block-states — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md)  
> **Status:** P3 Done · gate **BLOCK** · `2026-10-18T13:01:37Z` · tip active  
> **Package:** `pkg-000159` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A M152 · OP-UX-MIRROR §4.1 · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Runtime:** P3 Execute Done · `#/lab/thread` · feed cutover CT-08

## Purpose

Пять семантических состояний обсуждения под strip при целой civic Issue: loading / empty / populated-collapsed / unavailable / narrow (M152 A–E).

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-01-t01-issue-thread-block](task-spa-ct-01-t01-issue-thread-block/README.md) | Greenfield IssueThreadBlock status chrome A–D | Done |
| T02 | [task-spa-ct-01-t02-thread-mount-status](task-spa-ct-01-t02-thread-mount-status/README.md) | ThreadMount owns status prop + collapsed summary slot | Done |
| T03 | [task-spa-ct-01-t03-fixture-states](task-spa-ct-01-t03-fixture-states/README.md) | FixtureAdapter snapshots for A–D | Done |
| T04 | [task-spa-ct-01-t04-narrow-e](task-spa-ct-01-t04-narrow-e/README.md) | CSS/stack for 390 lab stress | Done |
| T05 | [task-spa-ct-01-t05-vitest-states](task-spa-ct-01-t05-vitest-states/README.md) | Status → testids / no fake identity · Path A + gate | Done |

## Out of scope

M153 nest detail · M157 · reactions people · invent HTTP · `#/next/feed`

## @mockup handoff

- Mirror: [OP-UX-MIRROR §4.1](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) · [M152](../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) (+ PNG)
- Verify: `#/lab/thread` (matrix) · `#/lab/feed` cutover → CT-08 · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-01-issue-thread-block-states.md) · **BLOCK** · Await P4
- NO STORY-UX-MOCKUP-BRIEF
