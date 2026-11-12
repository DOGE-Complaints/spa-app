# SPA-NF-19-T03 — Apply style on theme change

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

FR-NF-19.3 · 19.4: Apply style on theme change (`setStyle` and/or controlled remount) — mount-once ignore not Done · shared helper for feed + soft board.

## Code Facts (verify)

- AS-IS: comment «mount once» ignores `styleUrl` after mount
- Target: theme change updates basemap; `#/next/feed` map + soft classic board inherit same MapLibre helper

## Constraints

- Path A ARCH-DELTA §7 · NO BRIEF · Partial=**BLOCK**  
- No invent second map engine · no invent OP PASS

## AC / DoD

- [x] Theme toggle updates map style
- [x] Shared MapLibre helper (no duplicate engine)
- [x] Visual Done not claimed without OP eye

## Where changed

MapLibreMap.jsx · soft BoardIssuesMap / FeedMapArea hosts (no hardcode dark-only)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/map
```
