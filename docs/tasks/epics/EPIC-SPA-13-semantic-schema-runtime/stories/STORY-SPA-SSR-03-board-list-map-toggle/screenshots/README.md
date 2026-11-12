# Screenshots — STORY-SPA-SSR-03 board-list-map-toggle

**Story:** Board list | map toggle (M142)  
**Wave:** pkg-000076 P3 + P6 gap `spa_ssr_03_audit_2026_09_02`  
**Viewport canon:** 1536×1024 (narrow Edge: 480×900)

## full-cycle (primary Happy)

| File | State |
|------|--------|
| [full-cycle/01-board-list-happy-1536x1024.png](./full-cycle/01-board-list-happy-1536x1024.png) | List view + List\|Map toggle |
| [full-cycle/02-board-map-happy-1536x1024.png](./full-cycle/02-board-map-happy-1536x1024.png) | Map view · MapLibre dark · pin-capable Issues |

## full-cycle (Edge · P6 T07)

| File | Artboard |
|------|----------|
| [full-cycle/03-board-edge-ineligible-1536x1024.png](./full-cycle/03-board-edge-ineligible-1536x1024.png) | SSR-M-ineligible · Map disabled + helper |
| [full-cycle/04-board-edge-filtered-1536x1024.png](./full-cycle/04-board-edge-filtered-1536x1024.png) | SSR-M-filtered · `?search=Streetlamp` active |
| [full-cycle/05-board-edge-narrow-480x900.png](./full-cycle/05-board-edge-narrow-480x900.png) | SSR-M-narrow · ≤520px List\|Map |

Harness: `spa-app/tests/puppeteer/ssr03-list-map-screenshot.mjs` (`PHASE=post-implement`; Edge pack `EDGE_ONLY=1`).  
Live gateway not required — Issues intercepted. Anchor: [`task-spa-ssr-03-t02-…/ui-baseline/`](../task-spa-ssr-03-t02-map-pins-cluster-popup/ui-baseline/README.md).
