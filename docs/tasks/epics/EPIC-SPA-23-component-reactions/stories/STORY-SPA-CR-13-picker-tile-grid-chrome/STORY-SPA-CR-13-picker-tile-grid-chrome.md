# STORY-SPA-CR-13-picker-tile-grid-chrome — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-13-picker-tile-grid-chrome.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-13-picker-tile-grid-chrome.md)  
> **Status:** P3 structure Done · gate **BLOCK** · `2026-10-16T10:53:17Z` · tip active  
> **Package:** `pkg-000149` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` / `feed-lab` · **mixed** · UX M154 B/C/D + OP-UX-MIRROR-m154 §4 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Prior:** CR-12 structure Present · visual BLOCK residual · CR-10 portal Present

## Purpose
Picker tile grid (icon+label+description) · header/footer Cancel/Add reactions · sheet Done. Keep CR-10 portal+dismiss. See backlog FR/AC · mirror §4.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-13-t01-option-tile-layout](task-spa-cr-13-t01-option-tile-layout/README.md) | Tile grid · description · selected | Done · ui_anchor |
| T02 | [task-spa-cr-13-t02-header-footer-chrome](task-spa-cr-13-t02-header-footer-chrome/README.md) | Header + Cancel/Add/Done footer | Done |
| T03 | [task-spa-cr-13-t03-portal-regression](task-spa-cr-13-t03-portal-regression/README.md) | Portal+dismiss regression | Done |
| T04 | [task-spa-cr-13-t04-vitest-picker-tiles](task-spa-cr-13-t04-vitest-picker-tiles/README.md) | Vitest + Path A shots + gate | Done |

## Out of scope
Mark accents → CR-14 · invent HTTP · M155 · Lucide · `#/next/feed`

## @mockup handoff
- M154: `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+png)
- Mirror: [OP-UX-MIRROR-m154-strip-picker-visual §4](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md)
- Verify: `#/lab/reactions` · `#/lab/feed`
