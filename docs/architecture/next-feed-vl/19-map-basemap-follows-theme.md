# NF-19 — Map basemap follows theme (structure Present · visual BLOCKED)

> **UTC:** 2026-10-21T19:39Z (P3) · P5 APPLY `2026-10-21T19:45:42Z`  
> **Package:** `pkg-000197` · EPIC-SPA-20  
> **Code home:** `MapLibreMap.jsx` · soft `BoardIssuesMap` · `#/next/feed` map  
> **Normative:** [ARCH-DELTA §7](../../tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · Interview M3 · Path A  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual) · P5 F1/F2 **WAIVED** · TASKED=0 · activation none

## Surface

| Piece | Rule |
|-------|------|
| Light | `data-theme=light` → Carto **positron** (`MAPLIBRE_FREE_LIGHT_STYLE_URL`) |
| Dark | `data-theme=dark` → Carto **dark-matter** (`MAPLIBRE_FREE_DARK_STYLE_URL`) |
| Switch | MutationObserver on `data-theme` · remount on `styleUrl` change |
| Shared | single `MapLibreMap` helper · BoardIssuesMap inherits · no second engine |
| Markers | `data-nf19-basemap` · `data-map-style-url` |

## Evidence

- Path A shots 01–05 · CAPTURE-META `fails: []` · `visual_gate: BLOCK` · `op_eye: Absent`
- vitest MapLibreMap.nf19 **5/5** · map suite **10/10**
- probe_final light → positron · no invent OP PASS / tile vendor
