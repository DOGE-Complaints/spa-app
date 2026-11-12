# STORY-SPA-CR-20-gap-v2-icon-generate — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md)  
> **Status:** P3 Done · gate **BLOCK** · `2026-10-18T12:07:24Z` · tip active  
> **Package:** `pkg-000156` · component-reactions · REQ-24  
> **ui_scope:** `feed-lab` / icon-system · **mixed** · residual mirror §3 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert` (+ SVG handoff in-task)  
> **Constraint flip applied:** Gap v2 chrome SVG Written + promoted · no multicolor/Lucide  
> **Facts:** runtime `reactions.svg` **Present** · `react.svg` thumbs-up **Present**

## Purpose
Close Gap v2: generate dual-circle `reactions.svg` + replace `react.svg` with thumbs-up; promote to runtime; flip Absent-OK tests → Present; update CR-icon catalog.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-20-t01-master-reactions-svg](task-spa-cr-20-t01-master-reactions-svg/README.md) | NEW master dual-circle reactions.svg | Done |
| T02 | [task-spa-cr-20-t02-master-react-thumbs](task-spa-cr-20-t02-master-react-thumbs/README.md) | REPLACE master react.svg thumbs-up | Done |
| T03 | [task-spa-cr-20-t03-promote-runtime](task-spa-cr-20-t03-promote-runtime/README.md) | Promote both → public/icons/next-feed/actions/ | Done |
| T04 | [task-spa-cr-20-t04-manifest-cr-icon](task-spa-cr-20-t04-manifest-cr-icon/README.md) | Manifest · Gap v2 → Reuse · ICON #10 | Done |
| T05 | [task-spa-cr-20-t05-strip-test-hygiene](task-spa-cr-20-t05-strip-test-hygiene/README.md) | Flip Absent tests → Present · Path A + gate | Done |

## Out of scope
Multicolor mark SVG · Lucide · people UX (CR-21) · media flush (CR-22) · invent HTTP · invent OP PASS · `#/next/feed`

## @mockup handoff
- Mirror: [OP-UX-MIRROR-gap-v2-people-media-residual §3](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · [CR-icon §Gap v2 closed](../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md)
- Verify: `#/lab/feed` · Reactions zone no broken img · React thumbs-up
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CR-20-gap-v2-icon-generate.md) · **BLOCK** · Await P4
