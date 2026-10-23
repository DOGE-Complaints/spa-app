# NF-24 — Map leaves sheet / pin popup theme (structure Present · visual BLOCKED)

> **UTC:** 2026-10-23T13:41:03Z (P8 local close)  
> **Package:** `pkg-000212` · EPIC-SPA-20  
> **Code home:** `BoardIssuesMap.css` · soft `MapIssuePreview` / `MapChrome.css`  
> **Normative:** Interview **M1** · [ARCH-DELTA §12](../../tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · [evidence 01](../../analysis/evidence/op-residual-wave4-2026-10-23/01-map-leaves-sheet-dark-on-light.png) · Path A **p13UxReady**  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Leaves sheet | `.board-issues-map-leaves` → `--color-surface-elevated` / theme text tokens · no navy-only fill |
| Pin popup | `.board-issues-map-popup` same theme bind |
| Soft preview | `MapIssuePreview` · no dark-only `rgba(12,18,30,…)` fallback on light |
| Dark | Readability held via same tokens |
| Naming | Pin atom `IssueMapPin` · cluster UI = leaves sheet |

## Touchpoints

- `components/map/BoardIssuesMap.css` · `.jsx` (`data-nf24`)
- `features/feed/map/MapChrome.css` · `MapIssuePreview.jsx`
- Tests: `BoardIssuesMap.nf24.test.jsx` · Path A `scripts/tmp-nf24-capture.mjs`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent basemap · NF-20 cluster leaves logic OOS.
