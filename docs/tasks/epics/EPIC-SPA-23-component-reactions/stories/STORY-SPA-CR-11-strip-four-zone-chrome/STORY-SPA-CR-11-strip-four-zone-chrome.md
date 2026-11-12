# STORY-SPA-CR-11-strip-four-zone-chrome — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md)  
> **Status:** P5 APPLY · TASKED=0 · gate **BLOCK** · `2026-10-16T10:36:02Z` · tip active  
> **Package:** `pkg-000147` · component-reactions · REQ-24  
> **ui_scope:** `feed-lab` · **mixed** · UX M154+M160 + OP-UX-MIRROR-m154 §3.1–3.4 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Gap v2 residual:** `react.svg` Present wrong glyph · `reactions.svg` Absent — wire URLs only · no invent SVG

## Purpose
Restore M154/M160 four-zone strip chrome on `#/lab/feed`: icon+label ×4 · React thumbs-up Runtime URL · Reactions dual-circle · M160 states · narrow 2×2. Supersedes CR-09 3-zone chrome. See backlog FR/AC · mirror §3.1–3.4.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-11-t01-four-zones-icons](task-spa-cr-11-t01-four-zones-icons/README.md) | ZONES×4 · icon+label · Runtime URLs | Done · ui_anchor |
| T02 | [task-spa-cr-11-t02-react-m160-states](task-spa-cr-11-t02-react-m160-states/README.md) | React rest/hover/focus/selected/disabled | Done |
| T03 | [task-spa-cr-11-t03-narrow-2x2](task-spa-cr-11-t03-narrow-2x2/README.md) | Narrow stress 2×2 grid | Done |
| T04 | [task-spa-cr-11-t04-vitest-strip-chrome](task-spa-cr-11-t04-vitest-strip-chrome/README.md) | Vitest zones=4 + Path A shots + gate | Done |

## Out of scope
Aggregate row → CR-12 · picker tiles → CR-13 · invent SVG · invent HTTP · M155 · `#/next/feed`

## @mockup handoff
- M154: `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+png)
- M160: `spa-app/docs/UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md` (+png)
- Mirror: [OP-UX-MIRROR-m154-strip-picker-visual §3.1–3.4](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md)
- Icons Gap v2: [STORY-SPA-CR-icon-assets.md](../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md)
- Verify URL: `http://127.0.0.1:5173/#/lab/feed`
