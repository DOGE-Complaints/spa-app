# STORY-SPA-CR-14-mark-accent-tokens — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-14-mark-accent-tokens.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-14-mark-accent-tokens.md)  
> **Status:** P3 structure Done · gate **BLOCK** · `2026-10-16T11:04:23Z` · tip active  
> **Package:** `pkg-000150` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` / `feed-lab` · **mixed** · UX OP-UX-MIRROR-m154 §4.5 + icon-token-map · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Prior:** CR-13 structure Present · visual BLOCK residual · CSS accents only

## Purpose
Per-mark CSS accent tokens on `currentColor` masks (picker tiles + summary). No multicolor SVG generate. See backlog FR/AC · mirror §4.5 · token map.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-14-t01-mark-accent-map](task-spa-cr-14-t01-mark-accent-map/README.md) | mark-id → token alias map | Done · ui_anchor |
| T02 | [task-spa-cr-14-t02-picker-tile-color](task-spa-cr-14-t02-picker-tile-color/README.md) | Tile accent + soft bg | Done |
| T03 | [task-spa-cr-14-t03-summary-mark-color](task-spa-cr-14-t03-summary-mark-color/README.md) | Aggregate/summary accents | Done |
| T04 | [task-spa-cr-14-t04-vitest-accents](task-spa-cr-14-t04-vitest-accents/README.md) | Vitest + Path A shots + gate | Done |

## Out of scope
Multicolor SVG generate · invent HTTP · M155 · Gap v2 chrome glyph invent · `#/next/feed`

## @mockup handoff
- Token map: `spa-app/docs/UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md`
- Mirror: [OP-UX-MIRROR-m154-strip-picker-visual §4.5](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md)
- Verify: `#/lab/reactions` · `#/lab/feed` · light/dark stress
