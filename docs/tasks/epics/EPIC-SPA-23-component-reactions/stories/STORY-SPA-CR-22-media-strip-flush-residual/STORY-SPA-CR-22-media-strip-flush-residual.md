# STORY-SPA-CR-22-media-strip-flush-residual — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-22-media-strip-flush-residual.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-22-media-strip-flush-residual.md)  
> **Status:** P3 Done · gate **BLOCK** · `2026-10-18T12:25:27Z` · tip active  
> **Package:** `pkg-000158` · component-reactions · REQ-24  
> **ui_scope:** `feed-lab` · **mixed** · UX residual mirror §5 · CR-16 intent · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Prior:** CR-16 structure flush Present · soft after CR-20/21 · visual BLOCK residual (OP eye) held  
> **Runtime:** OP QueueSpec forced · P3 Execute Done  
> **Cause:** [`measure-cause-CR-22.md`](./measure-cause-CR-22.md) — layout gap **0** · plate bg removed

## Purpose
Media–strip flush residual: measure-then-fix. Hold CR-16 chip. No invent SVG / HTTP / OP PASS.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-22-t01-measure-gap](task-spa-cr-22-t01-measure-gap/README.md) | Measure media vs strip · record cause | Done |
| T02 | [task-spa-cr-22-t02-flush-fix](task-spa-cr-22-t02-flush-fix/README.md) | Minimal fix for verified cause · detail parity | Done |
| T03 | [task-spa-cr-22-t03-vitest-flush](task-spa-cr-22-t03-vitest-flush/README.md) | Markers · no chip regression · Path A + gate | Done |

## Out of scope
Gap SVG (CR-20) · people affordance (CR-21) · carousel · invent HTTP · new hero chrome · `#/next/feed`

## @mockup handoff
- Mirror: [OP-UX-MIRROR residual §5](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · CR-16 intent · [M154](../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
- Verify: `#/lab/feed` · detail overlay if same anatomy · light/dark
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CR-22-media-strip-flush-residual.md) · **BLOCK** · Await P4
