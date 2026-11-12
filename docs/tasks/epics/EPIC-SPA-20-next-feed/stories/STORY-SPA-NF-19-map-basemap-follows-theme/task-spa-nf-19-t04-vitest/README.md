# SPA-NF-19-T04 — URL selection / theme switch honesty

**Status:** Done  
**Story:** [`../STORY-SPA-NF-19-map-basemap-follows-theme.md`](../STORY-SPA-NF-19-map-basemap-follows-theme.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-19-map-basemap-follows-theme.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-19-map-basemap-follows-theme.md)  
**ui_scope:** `map` · soft `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T19:27:26Z`  
**Package:** `pkg-000197`
**P3 Done:** `2026-10-21T19:39:51Z`  
**Path A:** code lock · [ARCH-DELTA §7](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-19.5: Vitest / honesty for style URL selection · theme switch · OP eye — no invent PASS.

## Code Facts (verify)

- Target: unit/honesty tests for light/dark URL selection and theme-change apply path

## Constraints

- Path A ARCH-DELTA §7 · NO BRIEF · Partial=**BLOCK**  
- no invent OP PASS

## AC / DoD

- [x] Vitest / markers Present
- [x] Visual Done not claimed without OP eye

## Where changed

`src/components/map/__tests__/` (or soft feed map tests)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/map
```
