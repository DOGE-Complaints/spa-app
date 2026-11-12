# SPA-NF-19-T02 — Select style from data-theme / theme API

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

FR-NF-19.1 · 19.2: Select style from `data-theme` / theme API — light→positron · dark→dark-matter.

## Code Facts (verify)

- AS-IS: default `styleUrl = MAPLIBRE_FREE_DARK_STYLE_URL` · hosts may hardcode dark-only
- Target: `MapLibreMap` reads theme; feed/board hosts do not hardcode dark-only

## Constraints

- Path A ARCH-DELTA §7 · NO BRIEF · Partial=**BLOCK**  
- Ownership: MapLibreMap · soft bootTheme · no invent OP PASS

## AC / DoD

- [x] Light → positron · dark → dark-matter
- [x] Visual Done not claimed without OP eye

## Where changed

MapLibreMap.jsx · soft theme/bootTheme helpers

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/map
```
