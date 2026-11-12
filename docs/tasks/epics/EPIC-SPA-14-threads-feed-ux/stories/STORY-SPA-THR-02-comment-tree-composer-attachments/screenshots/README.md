# Screenshots — STORY-SPA-THR-02 comment-tree-composer-attachments

**Story:** Comment tree + composer + attachments (M144)  
**Wave:** pkg-000078 P3  
**Viewport canon:** 1536×1024 (narrow: 480×900)

## full-cycle (Happy · THR-T-A…F)

| File | State |
|------|--------|
| [full-cycle/01-thr-t-a-nested-1536x1024.png](./full-cycle/01-thr-t-a-nested-1536x1024.png) | THR-T-A nested tree |
| [full-cycle/02-thr-t-b-max-depth-1536x1024.png](./full-cycle/02-thr-t-b-max-depth-1536x1024.png) | THR-T-B max-depth boundary |
| [full-cycle/03-thr-t-c-reply-composer-1536x1024.png](./full-cycle/03-thr-t-c-reply-composer-1536x1024.png) | THR-T-C reply composer |
| [full-cycle/04-thr-t-d-attach-allowed-1536x1024.png](./full-cycle/04-thr-t-d-attach-allowed-1536x1024.png) | THR-T-D attach chip |
| [full-cycle/05-thr-t-e-attach-denied-1536x1024.png](./full-cycle/05-thr-t-e-attach-denied-1536x1024.png) | THR-T-E attach denied |
| [full-cycle/06-thr-t-f-post-fail-1536x1024.png](./full-cycle/06-thr-t-f-post-fail-1536x1024.png) | THR-T-F post soft-fail |
| [full-cycle/07-thr-t-a-nested-narrow-480x900.png](./full-cycle/07-thr-t-a-nested-narrow-480x900.png) | Narrow nested |

Harness: `spa-app/tests/puppeteer/thr02-comment-tree-screenshot.mjs`.  
Force local `window.__THR01_FORCE_THREAD_STATUS__=populated` + `window.__THR02_FORCE_SCENE__` — **no invent social HTTP**.

## Capture notes (2026-09-23 live)

Recaptured against live SPA `http://127.0.0.1:5173` with backends up (gateway `:8000`, identity `:8100`, threads `:8001`).
Harness env: `PUBLIC_BOARD_URL=http://127.0.0.1:5173 LIVE_GATEWAY=1 PHASE=post-implement` — real `/node/issues*` (no issue intercept); map tiles still aborted; thread UI scenes via `window.__THR*_FORCE_*` harness hooks (no invent social HTTP).
Pre-live harness PNGs archived under `screenshots/archive/harness-pre-live-20260923/`.
