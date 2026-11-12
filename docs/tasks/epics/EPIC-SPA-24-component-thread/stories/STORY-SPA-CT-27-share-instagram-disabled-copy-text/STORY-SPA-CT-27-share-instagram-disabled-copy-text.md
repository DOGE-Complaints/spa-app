# STORY-SPA-CT-27-share-instagram-disabled-copy-text — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md)  
> **Status:** P5 APPLY · gate **BLOCK** · TASKED=0 · `2026-10-20T19:56:55Z` · tip · activation **none**  
> **Package:** `pkg-000185` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `feed-lab` · **mixed** · Path A M152d (list order) · Instagram behavior supersede · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** CT-24  
> **Runtime:** P5 APPLY · TASKED=0 · no invent HTTP/OP PASS · NO BRIEF · Await P8

## Purpose

Instagram stays in Share list but is visually disabled with no copy/share on click (lock 2B). Copy link is text-only (no icon / no `⎘`). Other networks unchanged.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-27-share-instagram-disabled-copy-text.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-27-t01-ig-disabled](task-spa-ct-27-t01-ig-disabled/README.md) | Instagram row disabled · no copy on click · hint ok | **Done** |
| T02 | [task-spa-ct-27-t02-copy-text](task-spa-ct-27-t02-copy-text/README.md) | Remove Copy link icon/glyph | **Done** |
| T03 | [task-spa-ct-27-t03-vitest](task-spa-ct-27-t03-vitest/README.md) | disabled IG · no clipboard on IG · copy text-only | **Done** |

## Out of scope

Invent Instagram image upload · invent Graph API · density · attach chip · redesign sheet networks set

## @mockup handoff

- Continuity: [M152d](../../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) · [PNG](../../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.png) — **list order** · behavior supersede Instagram copy-fallback
- Path A: [ui-mockup-spec](./ui-mockup-spec.md)
- Shots: [visual-checklists](./visual-checklists-share-instagram-disabled-copy-text.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- NO STORY-UX-MOCKUP-BRIEF · no UX gen required
