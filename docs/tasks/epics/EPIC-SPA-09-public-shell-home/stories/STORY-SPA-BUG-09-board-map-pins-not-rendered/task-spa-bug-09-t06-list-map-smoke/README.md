# SPA-BUG-09-T06 — List ↔ Map smoke / PH-04

**Status:** Done · P3 `2026-10-03T15:18:08Z`  
**Story:** [`../STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../STORY-SPA-BUG-09-board-map-pins-not-rendered.md)  
**Decision Ref:** backlog STORY-SPA-BUG-09 · AC-BUG-09-03  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:08:51Z`  
**Package:** `pkg-000090`

## Purpose

Confirm List mode and List↔Map toggle without PH-04 regression.

## Code Facts (P3 live)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | List renders issues | MCP: `board-view-list` · cards Present after toggle |
| 2 | Map toggle works | `board-view-map` aria-pressed true → `board-issues-map` Present |
| 3 | Puppeteer board-shell gate | `npm run test:ui:board-shell` **PASS** (`2026-10-03T15:13Z` local) |
| 4 | ListMapToggle unit | `ListMapToggle.test.jsx` **2 passed** |

## AC / DoD

- [x] (P0) List still renders issues — **AC-BUG-09-03**
- [x] (P0) Toggle List↔Map works — **AC-BUG-09-03**

## Where to change

- Manual/smoke notes Evidence (no product change)

## Out of scope

H2 life-sim geo · gateway invent · MapLibre downgrade · other BUG pkgs

## Verification

```bash
cd spa-app && npm run test:ui:board-shell
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
