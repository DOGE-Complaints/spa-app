# SPA-NF-03-T05 — Recapture map+partial with visible pins (F2)

**Status:** ✅ Done · P6 `2026-10-10T19:03:46Z`  
**Story:** [`../STORY-SPA-NF-03-list-map-toggle.md`](../STORY-SPA-NF-03-list-map-toggle.md)  
**Decision Ref:** [audit-STORY-SPA-NF-03-execution-2026-10-10.md](../../../../../../analysis/audit-STORY-SPA-NF-03-execution-2026-10-10.md) · F2 Medium  
**ui_scope:** `feed` (screenshots / pin asset for MapLibre)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T18:57:13Z`  
**Done:** `2026-10-10T19:03:46Z`  
**Package:** `pkg-000105` (unchanged · `run_mode=spa_nf_03_audit_2026_10_10`)  
**Gaps:** F2 → **CLOSED**  
**acceptance:** [`acceptance-verification-spa-nf-03-t05.md`](./acceptance-verification-spa-nf-03-t05.md)  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md)

## Purpose

Close visual gap: `03-feed-map-view-partial-…` must show ≥1 pin marker on the map canvas (not basemap-only). Prefer MapLibre-compatible next-feed pin raster if SVG `currentColor` is invisible; keep catalog SVG Present. Update README matrix.

## Code Facts (As-of-Scaffold)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Pin URL wired | `FeedMapArea` `NEXT_FEED_PIN` · `pinImageUrl` · `data-pin-asset` |
| 2 | Catalog SVG Present | `public/icons/next-feed/map/map-pin.svg` |
| 3 | P3 `03` pins unclear | audit §2 visual |

## AC / DoD

- [x] Recaptured `03` (or successor) shows ≥1 visible pin + partial helper when DEMO-NF03 partial fixture
- [x] Pin asset remains under `/icons/next-feed/map/` (SVG catalog + PNG for MapLibre OK)
- [x] Story-root README matrix updated
- [x] No invent map HTTP · no shell invent
- [x] Gap F2 CLOSED in P6 acceptance

## Where to change

- `public/icons/next-feed/map/map-pin.png` (optional raster)
- `FeedMapArea.jsx` pin URL for MapLibre if needed
- `…/screenshots/full-cycle/03-…` · README

## Out of scope

MAP-ERROR (F1 → T04) · F3–F5 WAIVED · invent geocode · PIN-SELECTED artboard

## Verification

```bash
ls spa-app/public/icons/next-feed/map/
ls spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-03-list-map-toggle/screenshots/full-cycle/03*
```
