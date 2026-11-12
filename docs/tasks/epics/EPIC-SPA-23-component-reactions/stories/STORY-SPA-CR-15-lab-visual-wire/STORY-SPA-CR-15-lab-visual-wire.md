# STORY-SPA-CR-15-lab-visual-wire — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-15-lab-visual-wire.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-15-lab-visual-wire.md)  
> **Status:** P3 Execute Done · gate **BLOCK** · `2026-10-16T11:13:45Z` · tip active · structure Present · OP eye Absent · Gap v2 residual  
> **Package:** `pkg-000151` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` / `feed-lab` · **mixed** · UX OP-UX-MIRROR-m154 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Prior:** CR-11…14 structure Present · Gap v2 residual · visual BLOCK fact

## Purpose
Wire CR-11…14 into both lab hosts for OP end-to-end strip+picker eye. Stress CR-08 held. No production cutover.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-15-t01-lab-reactions-wire](task-spa-cr-15-t01-lab-reactions-wire/README.md) | Lab reactions stands CR-11…14 | Done · ui_anchor |
| T02 | [task-spa-cr-15-t02-lab-feed-wire](task-spa-cr-15-t02-lab-feed-wire/README.md) | Lab feed strip+aggregate+picker | Done |
| T03 | [task-spa-cr-15-t03-stress-regression](task-spa-cr-15-t03-stress-regression/README.md) | Theme/locale/320 regression | Done |
| T04 | [task-spa-cr-15-t04-vitest-lab-both](task-spa-cr-15-t04-vitest-lab-both/README.md) | Vitest + Path A shots + gate | Done |

## Out of scope
Invent HTTP · M155 · `#/next/feed` · invent OP PASS · invent Gap v2 SVG

## @mockup handoff
- Mirror: [OP-UX-MIRROR-m154-strip-picker-visual](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md)
- Verify: `#/lab/reactions` · `#/lab/feed` · light/dark stress
- Gap v2 residual → visual **BLOCK** until OP eye + glyph promote
