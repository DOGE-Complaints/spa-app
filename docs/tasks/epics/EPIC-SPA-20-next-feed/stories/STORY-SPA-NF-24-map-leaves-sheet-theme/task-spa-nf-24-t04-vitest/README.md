# SPA-NF-24-T04 — Vitest markers · Path A · gate

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

FR-NF-24.4 · 24.5: Vitest CSS/theme markers; Path A full-cycle shots; gate Result — OP eye Absent → **BLOCK** · no invent PASS.

## Code Facts (verify)

- AS-IS: may use hardcoded navy / dark-only fallback ignoring light `data-theme`
- Target: theme tokens bound · dark held · no invent basemap

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent basemap · OOS NF-20 cluster leaves logic

## AC / DoD

- [x] Vitest green · Path A shots · OP Absent → BLOCK
- [x] Visual Done not claimed without OP eye · gate held **PENDING**/BLOCK until OP

## Where changed

_(P3)_ `src/components/map/__tests__/*` · Path A capture helper · gate/checklists/shots

## Verification

```bash
cd spa-app && npm test -- --run src/components/map
```

## @mockup

```text
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave4-2026-10-23/01-map-leaves-sheet-dark-on-light.png
```
