# Screenshots — STORY-SPA-SSR-02 schema-card-overlay

**Story:** Schema card overlay (M141)  
**Wave:** pkg-000075 P3 + P6 Edge  
**Viewport canon:** 1536×1024 (happy / Edge many) · 480×900 (Edge narrow)

## full-cycle (primary happy)

| File | State |
|------|--------|
| [full-cycle/01-board-overlay-happy-1536x1024.png](./full-cycle/01-board-overlay-happy-1536x1024.png) | Board card + Additional details |
| [full-cycle/02-detail-overlay-happy-1536x1024.png](./full-cycle/02-detail-overlay-happy-1536x1024.png) | Issue detail + overlay |

## full-cycle (Edge)

| File | State |
|------|--------|
| [full-cycle/03-board-overlay-edge-many-1536x1024.png](./full-cycle/03-board-overlay-edge-many-1536x1024.png) | SSR-C-many · ≥5 leaves · `schema-card-overlay-more` visible |
| [full-cycle/04-board-overlay-edge-narrow-480x900.png](./full-cycle/04-board-overlay-edge-narrow-480x900.png) | SSR-C-narrow · ≤520px · stacked label-above-value |

Harness: `spa-app/tests/puppeteer/ssr02-overlay-screenshot.mjs` (`PHASE=post-implement`).  
Live gateway not required — Issues intercepted. Anchor archive: [`task-spa-ssr-02-t01-…/ui-baseline/`](../task-spa-ssr-02-t01-overlay-compact-card/ui-baseline/README.md).
