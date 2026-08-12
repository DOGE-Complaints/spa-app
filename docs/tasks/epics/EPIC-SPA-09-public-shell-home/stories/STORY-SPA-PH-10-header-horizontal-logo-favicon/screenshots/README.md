# STORY-SPA-PH-10 — screenshots (story root)

**Viewport:** desktop 1536×1024 · narrow 390×844  
**Captured UTC:** P3 UI-3 / full-cycle pack **2026-08-07T20:53:02Z** (T02 post-implement + story-root copies)  
**Pack hygiene:** P6 T07 **2026-08-08T08:34:56Z** — moved PNGs → `full-cycle/` + this README (audit F2)  
**Canonical evidence for PH-10** — story-root `full-cycle/` (T02 `ui-baseline/post-implement/` remains anchor; do not delete).

## Happy / narrow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | header brand crop (desktop) | [full-cycle/ph10-header-brand-desktop.png](./full-cycle/ph10-header-brand-desktop.png) | Live board · brand strip · horizontal logo only |
| H2 | board + header (desktop) | [full-cycle/ph10-board-header-desktop.png](./full-cycle/ph10-board-header-desktop.png) | `/#/board` · public header horizontal |
| N1 | board + header (narrow) | [full-cycle/ph10-board-header-narrow.png](./full-cycle/ph10-board-header-narrow.png) | 390×844 · no brand/header overflow |

## Anchor (T02 — not moved)

| Ref | Path |
|-----|------|
| UI-0 / UI-3 post-implement | [`../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-baseline/`](../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-baseline/) |

## Notes

- No product UI re-capture in T07 — arrange + index only.
- Favicon tab icon verified via `index.html` link + live `rel=icon` (gate T05); not a PNG in this pack.
