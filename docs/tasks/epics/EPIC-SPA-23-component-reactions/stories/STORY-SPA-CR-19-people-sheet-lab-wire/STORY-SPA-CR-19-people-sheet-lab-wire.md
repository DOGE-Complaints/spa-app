# STORY-SPA-CR-19-people-sheet-lab-wire — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md)  
> **Status:** P3 Done · gate **BLOCK** · `2026-10-18T10:55:57Z` · tip active  
> **Package:** `pkg-000155` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` / `feed-lab` · **mixed** · UX M155 C + polish §4.5 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Prior:** CR-17/18 structure Present · visual BLOCK residual (OP eye · Gap v2) held  
> **Runtime:** OP queueSpec forced · P3 Execute Done

## Purpose
Mobile/narrow people as bottom sheet (≤88dvh). Wire both labs so OP validates M155 end-to-end with fixtures. Reactions≠picker. CR-16 polish held.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-19-t01-people-sheet-surface](task-spa-cr-19-t01-people-sheet-surface/README.md) | Sheet ≤88dvh · resolvePeopleSurface · Back/Escape | Done |
| T02 | [task-spa-cr-19-t02-lab-reactions-people-wire](task-spa-cr-19-t02-lab-reactions-people-wire/README.md) | `#/lab/reactions` people wire | Done |
| T03 | [task-spa-cr-19-t03-lab-feed-people-wire](task-spa-cr-19-t03-lab-feed-people-wire/README.md) | `#/lab/feed` people wire · polish held | Done |
| T04 | [task-spa-cr-19-t04-vitest-lab-people](task-spa-cr-19-t04-vitest-lab-people/README.md) | Vitest + Path A shots + gate | Done |

## Out of scope
Invent people HTTP · real Connect product · invent SVG · invent OP PASS · `#/next/feed`

## @mockup handoff
- Mirror: [OP-UX-MIRROR-strip-polish §4.5](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [M155 Panel C](../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)
- Verify: `#/lab/reactions` · `#/lab/feed` · narrow / 320 stress · light/dark
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CR-19-people-sheet-lab-wire.md) · **BLOCK** · Await P4
