# STORY-SPA-CT-02-host-comment-strip-composition — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-02-host-comment-strip-composition.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-02-host-comment-strip-composition.md)  
> **Status:** P3 Done · gate **BLOCK** · `2026-10-18T13:12:08Z` · tip active  
> **Package:** `pkg-000160` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX-MIRROR §4.1 P-strip · P-compose · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-01 structure Present  
> **Runtime:** P3 Execute Done · `#/lab/feed` · Await P4

## Purpose

Comment на полоске открывает/фокусирует тред по той же оркестрации, что Reactions→people. Тред — непрерывная область под strip внутри карточки.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-02-t01-thread-api-ref](task-spa-ct-02-t01-thread-api-ref/README.md) | apiRef `{ expand, focusComposer }` on ThreadMount | Done |
| T02 | [task-spa-ct-02-t02-card-handle-zone](task-spa-ct-02-t02-card-handle-zone/README.md) | Wire Comment zone → apiRef | Done |
| T03 | [task-spa-ct-02-t03-composition-css](task-spa-ct-02-t03-composition-css/README.md) | Flush thread under strip · same card | Done |
| T04 | [task-spa-ct-02-t04-vitest-comment-zone](task-spa-ct-02-t04-vitest-comment-zone/README.md) | Vitest Comment zone · Path A + gate | Done |

## Out of scope

Share behavior · M153 interior · invent HTTP

## @mockup handoff

- Mirror: [OP-UX-MIRROR §4.1 P-strip · P-compose](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)
- Verify: `#/lab/feed` composition · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-02-host-comment-strip-composition.md) · **BLOCK** · Await P4
- NO STORY-UX-MOCKUP-BRIEF
