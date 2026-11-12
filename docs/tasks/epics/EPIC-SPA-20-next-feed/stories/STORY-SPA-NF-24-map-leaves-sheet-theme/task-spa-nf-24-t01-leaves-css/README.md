# SPA-NF-24-T01 — Leaves sheet theme tokens

**Status:** Done  
**Story:** [`../STORY-SPA-NF-24-map-leaves-sheet-theme.md`](../STORY-SPA-NF-24-map-leaves-sheet-theme.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-24-map-leaves-sheet-theme.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-24-map-leaves-sheet-theme.md)  
**ui_scope:** `map` / next-feed · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T13:29:56Z`  
**Package:** `pkg-000212`  
**Path A:** ARCH-DELTA §12 · evidence 01 · Interview M1 · p13UxReady

## Purpose

FR-NF-24.1: Theme tokens on leaves sheet (`.board-issues-map-leaves`) — light surface/text; no navy-only fill.

## Code Facts (verify)

- AS-IS: may use hardcoded navy / dark-only fallback ignoring light `data-theme`
- Target: theme tokens bound · dark held · no invent basemap

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent basemap · OOS NF-20 cluster leaves logic

## AC / DoD

- [x] Leaves sheet follows data-theme light
- [x] Visual Done not claimed without OP eye · gate held **PENDING**/BLOCK until OP

## Where changed

_(P3)_ `BoardIssuesMap.css` · `.board-issues-map-leaves`

## Verification

```bash
rg -n "board-issues-map-leaves|rgba\(12,18,30" spa-app/src/components/map
```

## @mockup

```text
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave4-2026-10-23/01-map-leaves-sheet-dark-on-light.png
```
