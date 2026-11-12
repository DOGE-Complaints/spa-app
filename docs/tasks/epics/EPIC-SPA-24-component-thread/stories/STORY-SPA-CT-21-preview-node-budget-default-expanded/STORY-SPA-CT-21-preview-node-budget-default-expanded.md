# STORY-SPA-CT-21-preview-node-budget-default-expanded — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
> **Status:** P3 Execute Done · gate **BLOCK** · `2026-10-20T14:49:17Z` · tip active  
> **Package:** `pkg-000179` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A M152c · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-01 · CT-03 · CT-08 · CT-15  
> **Runtime:** P3 Done · gate **BLOCK** (OP eye Absent) · no invent HTTP/OP PASS · NO BRIEF

## Purpose

Feed-card discussion first paint **expanded** with `previewNodeBudget` DEFAULT **3** (DFS nodes) · `Show more comments` one-shot · **omit** Discussion heading — per M152c.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-21-t01-knob](task-spa-ct-21-t01-knob/README.md) | `DEFAULT_PREVIEW_NODE_BUDGET=3` + resolve + prop | **Done** |
| T02 | [task-spa-ct-21-t02-default-expanded](task-spa-ct-21-t02-default-expanded/README.md) | Lab/card default expanded populated | **Done** |
| T03 | [task-spa-ct-21-t03-dfs-truncate](task-spa-ct-21-t03-dfs-truncate/README.md) | DFS slice by budget + `Show more comments` one-shot | **Done** |
| T04 | [task-spa-ct-21-t04-omit-heading](task-spa-ct-21-t04-omit-heading/README.md) | Remove Discussion heading chrome | **Done** |
| T05 | [task-spa-ct-21-t05-vitest](task-spa-ct-21-t05-vitest/README.md) | expanded · budget · one-shot · no heading | **Done** |

## Out of scope

Chunked pagination · Share (CT-24) · attach-in-node (CT-22) · density frames (CT-23) · HOLD reactions · `#/next/feed` · invent OP PASS

## @mockup handoff

- Artboard: [M152c v1.0](../../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md) · [PNG](../../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.png)
- Interview: [INTERVIEW-CT-21-plus…](../../../../backlog-stories/component-thread/INTERVIEW-CT-21-plus-thread-density-share-attach-2026-10-20.md)
- Arch: [§13.1](../../../../backlog-stories/component-thread/ARCHITECTURE.md)
- Verify: `#/lab/feed` · expanded · budget 3 DFS · Show more · no heading · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-21-preview-node-budget-default-expanded.md) · **BLOCK**
- Shots: [visual-checklists](./visual-checklists-preview-node-budget-default-expanded.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- NO STORY-UX-MOCKUP-BRIEF
