# STORY-SPA-PH-09 — screenshots (story root)

**Viewport:** desktop 1536×1024 · narrow 390×844  
**Captured UTC:** P3 UI-3 **2026-08-08T09:04:55Z** (T02 post-implement)  
**Pack hygiene:** P6 T06 **2026-08-08T09:41:23Z** — copy → `full-cycle/` + this README (audit F1)  
**Canonical story-root evidence for PH-09** — `full-cycle/` (T02 `ui-baseline/post-implement/` remains anchor; do not delete).

## Happy / narrow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | board no WORKSPACE column (desktop) | [full-cycle/ph09-board-no-sidebar-desktop.png](./full-cycle/ph09-board-no-sidebar-desktop.png) | `/#/board` · `PUBLIC_SHELL_SHOW_SIDEBAR=false` |
| N1 | board no WORKSPACE column (narrow) | [full-cycle/ph09-board-no-sidebar-narrow.png](./full-cycle/ph09-board-no-sidebar-narrow.png) | 390×844 · full-width main |

## Anchor (T02 — not moved)

| Ref | Path |
|-----|------|
| UI-0 / UI-3 post-implement | [`../task-spa-ph-09-t02-appshell-css-showSidebar/ui-baseline/`](../task-spa-ph-09-t02-appshell-css-showSidebar/ui-baseline/) |

## Notes

- No product UI re-capture in T06 — copy + index only.
- Cabinet sidebar regression is vitest-only (not in this pack).
