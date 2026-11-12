# STORY-SPA-CT-26-density-v2-borderless-fill — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-26-density-v2-borderless-fill.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-26-density-v2-borderless-fill.md)  
> **Status:** P5 APPLY · gate **BLOCK** · TASKED=0 · `2026-10-20T19:46:26Z` · tip · activation none  
> **Package:** `pkg-000184` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount`/`feed-lab` · **mixed** · Path A M153d (+ PNG) · Partial visual=**BLOCK** · NO BRIEF  
> **Skill declared:** `react-expert`  
> **Depends:** CT-18 · CT-23 (supersedes border-keep)  
> **Runtime:** P5 APPLY · TASKED=0 · no invent HTTP/OP PASS · NO BRIEF · Await P8

## Purpose

Density v2: remove outer borders from comment bubbles and React/Reply group; light fill + compact pad/gaps per M153d. AttachmentRef chip borders unchanged. Supersedes CT-23 / ARCH §13.3 “keep M153b bubble/pill border”.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-26-density-v2-borderless-fill.md) · **BLOCK** (OP eye Absent).

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-26-t01-bubble-fill](task-spa-ct-26-t01-bubble-fill/README.md) | Remove bubble stroke · pad 8v/12h · fill | **Done** |
| T02 | [task-spa-ct-26-t02-pills-fill](task-spa-ct-26-t02-pills-fill/README.md) | Remove action-pills stroke · 4v/8h · ≥44 | **Done** |
| T03 | [task-spa-ct-26-t03-spacing](task-spa-ct-26-t03-spacing/README.md) | Apply gap 4 / node 8 | **Done** |
| T04 | [task-spa-ct-26-t04-regression](task-spa-ct-26-t04-regression/README.md) | Assert no forbidden borders · spine ok | **Done** |

## Out of scope

Invent denser-than-M153d · Share (CT-27) · attach filename (CT-25) · HOLD reactions · `#/next/feed` · global border removal on composer/chip

## @mockup handoff

- Continuity: [M153d v1.0](../../../../UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.md) · [PNG](../../../../UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.png) · AttachmentRef borders retained (M153c / M153b §7)
- Path A: [ui-mockup-spec](./ui-mockup-spec.md)
- Shots: [visual-checklists](./visual-checklists-density-v2-borderless-fill.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md) · md5 `a4782f139b77` · `a52e8e2c9a55` · `41eb3a59911f` · `30e24cbf0735` · `91dfe5bb6a13`
- NO STORY-UX-MOCKUP-BRIEF
