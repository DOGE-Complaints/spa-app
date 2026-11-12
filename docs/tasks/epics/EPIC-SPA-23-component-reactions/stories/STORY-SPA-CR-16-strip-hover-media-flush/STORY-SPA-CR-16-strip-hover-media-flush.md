# STORY-SPA-CR-16-strip-hover-media-flush — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-16-strip-hover-media-flush.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-16-strip-hover-media-flush.md)  
> **Status:** P3 Execute Done · gate **BLOCK** · `2026-10-17T13:58:39Z` · tip active · structure Present · OP eye Absent  
> **Package:** `pkg-000152` · component-reactions · REQ-24  
> **ui_scope:** `feed-lab` · **visual** · UX OP-UX-MIRROR-strip-polish §3 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Prior:** CR-11…15 structure Present · pkg-000151 · activation was none

## Purpose
React chip hover (not full-cell) + media–strip flush on `#/lab/feed`. Soft before CR-17 people eye.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-16-t01-react-chip-hover](task-spa-cr-16-t01-react-chip-hover/README.md) | Inner chip hover/selected/focus | Done · ui_anchor |
| T02 | [task-spa-cr-16-t02-media-strip-flush](task-spa-cr-16-t02-media-strip-flush/README.md) | Media flush above strip · detail parity | Done |
| T03 | [task-spa-cr-16-t03-vitest-polish](task-spa-cr-16-t03-vitest-polish/README.md) | Vitest + Path A shots + gate | Done |

## Out of scope
Invent HTTP · M155 people · invent SVG · invent OP PASS · `#/next/feed`

## @mockup handoff
- Mirror: [OP-UX-MIRROR-strip-polish-m155-people §3](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md)
- Verify: `#/lab/feed` · chip hover · media–strip adjacency
- Partial visual = **BLOCK** until OP eye
