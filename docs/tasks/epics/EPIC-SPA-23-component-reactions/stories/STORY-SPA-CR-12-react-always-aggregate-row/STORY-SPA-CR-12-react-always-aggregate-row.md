# STORY-SPA-CR-12-react-always-aggregate-row — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md)  
> **Status:** P5 APPLY · TASKED=0 · gate **BLOCK** · `2026-10-16T10:46:06Z` · tip active  
> **Package:** `pkg-000148` · component-reactions · REQ-24  
> **ui_scope:** `feed-lab` · **mixed** · UX M154 + OP-UX-MIRROR-m154 §3.2–3.3 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Prior:** CR-11 structure Present · visual BLOCK residual · Gap v2 residual held

## Purpose
React-always in strip · aggregate row under strip (M154 A) · Reactions zone wire. Supersedes CR-05 hide-React for strip chrome. Keep CR-09 no dual mount · CR-10 portal dismiss. See backlog FR/AC · mirror §3.2–3.3.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-12-t01-react-always-strip](task-spa-cr-12-t01-react-always-strip/README.md) | React always visible · opens picker | Done · ui_anchor |
| T02 | [task-spa-cr-12-t02-aggregate-row-under-strip](task-spa-cr-12-t02-aggregate-row-under-strip/README.md) | Aggregate below strip · empty/loading/error | Done |
| T03 | [task-spa-cr-12-t03-reactions-zone-wire](task-spa-cr-12-t03-reactions-zone-wire/README.md) | Reactions zone → aggregate/summary | Done |
| T04 | [task-spa-cr-12-t04-vitest-react-aggregate](task-spa-cr-12-t04-vitest-react-aggregate/README.md) | Vitest matrix + Path A shots + gate | Done |

## Out of scope
Picker tiles → CR-13 · accents → CR-14 · invent SVG · invent HTTP · M155 · `#/next/feed`

## @mockup handoff
- M154: `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+png)
- Mirror: [OP-UX-MIRROR-m154-strip-picker-visual §3.2–3.3](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md)
- Verify URL: `http://127.0.0.1:5173/#/lab/feed`
