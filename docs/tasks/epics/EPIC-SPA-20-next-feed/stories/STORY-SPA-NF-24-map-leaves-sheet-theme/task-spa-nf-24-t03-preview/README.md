# SPA-NF-24-T03 — MapIssuePreview light honesty

**Status:** Done  
**Story:** [`../STORY-SPA-NF-24-map-leaves-sheet-theme.md`](../STORY-SPA-NF-24-map-leaves-sheet-theme.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-24-map-leaves-sheet-theme.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-24-map-leaves-sheet-theme.md)  
**ui_scope:** `map` / next-feed · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T13:29:56Z`  
**Package:** `pkg-000212`  
**Path A:** ARCH-DELTA §12 · evidence 01 · Interview M1 · p13UxReady

## Purpose

FR-NF-24.3: Soft MapIssuePreview / feed pin card — remove dark-only CSS fallback when theme light.

## Code Facts (verify)

- AS-IS: may use hardcoded navy / dark-only fallback ignoring light `data-theme`
- Target: theme tokens bound · dark held · no invent basemap

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent basemap · OOS NF-20 cluster leaves logic

## AC / DoD

- [x] MapIssuePreview light honesty
- [x] Visual Done not claimed without OP eye · gate held **PENDING**/BLOCK until OP

## Where changed

_(P3)_ soft `MapIssuePreview` / `MapChrome.css`

## Verification

```bash
rg -n "MapIssuePreview|MapChrome" spa-app/src --glob '*.{jsx,css}' | head -30
```

## @mockup

```text
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave4-2026-10-23/01-map-leaves-sheet-dark-on-light.png
```
