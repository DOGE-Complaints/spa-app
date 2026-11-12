# SPA-NF-19-T01 — Add light style URL constant

**Status:** Done  
**Story:** [`../STORY-SPA-NF-19-map-basemap-follows-theme.md`](../STORY-SPA-NF-19-map-basemap-follows-theme.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-19-map-basemap-follows-theme.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-19-map-basemap-follows-theme.md)  
**ui_scope:** `map` · soft `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T19:27:26Z`  
**Package:** `pkg-000197`
**P3 Done:** `2026-10-21T19:39:51Z`  
**Path A:** code lock · [ARCH-DELTA §7](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-19.1: Add light style URL constant (tip free Carto **positron** GL style).

## Code Facts (verify)

- AS-IS: `MAPLIBRE_FREE_DARK_STYLE_URL` dark-matter only in `MapLibreMap.jsx`
- Target: export light constant alongside dark (positron tip URL)

## Constraints

- Path A ARCH-DELTA §7 · NO BRIEF · Partial=**BLOCK**  
- Free Carto URLs only · no invent tile vendor · no invent OP PASS

## AC / DoD

- [x] Light style URL constant Present
- [x] Visual Done not claimed without OP eye

## Where changed

MapLibreMap.jsx · soft `src/components/map/index.js` exports

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/map
```
