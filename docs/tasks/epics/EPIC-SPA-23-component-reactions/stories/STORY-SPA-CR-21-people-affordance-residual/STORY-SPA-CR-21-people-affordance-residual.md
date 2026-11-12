# STORY-SPA-CR-21-people-affordance-residual — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md)  
> **Status:** P3 Done · gate **BLOCK** · `2026-10-18T12:15:16Z` · tip active  
> **Package:** `pkg-000157` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` / `feed-lab` · **mixed** · UX residual mirror §4 · M155 A · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Prior:** CR-17…19 structure Present · CR-20 Gap v2 **Present** · visual BLOCK residual (OP eye) held  
> **Runtime:** OP QueueSpec forced · P3 Execute Done

## Purpose
People affordance residual: popover anchors to Reactions zone; chip hover parity with CR-16 React; Reactions≠picker; aggregate→people. Consume CR-20 glyphs. No invent SVG / people HTTP.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-21-t01-people-anchor-reactions](task-spa-cr-21-t01-people-anchor-reactions/README.md) | Anchor people popover to Reactions zone trigger | Done |
| T02 | [task-spa-cr-21-t02-reactions-chip-hover](task-spa-cr-21-t02-reactions-chip-hover/README.md) | Inner chip hover/focus for Reactions | Done |
| T03 | [task-spa-cr-21-t03-click-path-verify](task-spa-cr-21-t03-click-path-verify/README.md) | reactions/aggregate → people · fixture path | Done |
| T04 | [task-spa-cr-21-t04-vitest-people-affordance](task-spa-cr-21-t04-vitest-people-affordance/README.md) | Vitest + Path A shots + gate | Done |

## Out of scope
Invent people HTTP · invent SVG · invent OP PASS · CR-22 media flush · `#/next/feed` · new dialog/sheet content model

## @mockup handoff
- Mirror: [OP-UX-MIRROR residual §4](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · [M155 Panel A](../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)
- Verify: `#/lab/feed` · light/dark · ~390
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CR-21-people-affordance-residual.md) · **BLOCK** · Await P4
