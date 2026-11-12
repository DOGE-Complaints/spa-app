# SPA-BUG-09-T01 — Repro evidence: basemap-only vs List

**Status:** Done · P3 `2026-10-03T15:18:08Z`  
**Story:** [`../STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../STORY-SPA-BUG-09-board-map-pins-not-rendered.md)  
**Decision Ref:** backlog STORY-SPA-BUG-09 · AC-BUG-09-01 prep  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:08:51Z`  
**Package:** `pkg-000090`

## Purpose

Стабильный repro: Map basemap-only; List Present; empty-pins absent; pin asset 200.

## Code Facts (P3 verified)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | empty-pins only when `pinIssues.length === 0` | `BoardIssuesMap.jsx` empty branch `data-testid="board-map-empty-pins"` |
| 2 | pin-capable = numeric `geo.lat`/`geo.lon` | `issueGeo.js` |
| 3 | Pin PNG 200 | `GET http://127.0.0.1:4173/icons/semantic-schema-runtime/ic-map-pin.png` → **200** (`2026-10-03T15:18:08Z`) |

## Live repro (pre-fix UI-0 / T01)

| Fact | Result |
|------|--------|
| `GET /node/issues` | **12** issues, **12/12** pin-capable |
| List | Present (issue cards) |
| Map toggle | Enabled · Map active |
| `board-map-empty-pins` | **Absent** |
| Pins/clusters (pre-fix) | **Absent** — basemap-only |
| Screenshot | [board-map-basemap-only-repro-1536x1024.png](./board-map-basemap-only-repro-1536x1024.png) · also T03 [ui-baseline/](../task-spa-bug-09-t03-fix-loadimage-boot/ui-baseline/) |

## AC / DoD

- [x] (P0) Repro notes: List has issues; Map basemap Present; pins Absent — **AC-BUG-09-01 prep**
- [x] (P0) Confirm empty-pins UI absent when pin-capable > 0 — **AC-BUG-09-01 prep**
- [x] (P0) Pin asset path returns 200 — **AC-BUG-09-01 prep**

## Where to change

- Evidence under this task folder (docs only)

## Out of scope

H2 life-sim geo · gateway invent · MapLibre downgrade · other BUG pkgs

## Verification

```bash
rg -n 'loadImage|getClusterExpansionZoom|ensureLayers' spa-app/src/components/map/BoardIssuesMap.jsx | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
