# Screenshots — STORY-SPA-THR-01 board-issue-post-mounts

**Story:** BoardIssuePost + IssueThreadBlock (M143/M148)  
**Wave:** pkg-000077 P3 + P6 gap `spa_thr_01_audit_2026_09_22`  
**Viewport canon:** 1536×1024 (narrow: 480×900)

## full-cycle (Happy)

| File | State |
|------|--------|
| [full-cycle/01-board-issue-post-happy-1536x1024.png](./full-cycle/01-board-issue-post-happy-1536x1024.png) | `/board` continuous post · empty discussion + action row + composer |
| [full-cycle/02-issue-thread-happy-1536x1024.png](./full-cycle/02-issue-thread-happy-1536x1024.png) | `/issue/:id` shared `issue-thread-block` (M148) |
| [full-cycle/03-board-issue-post-narrow-480x900.png](./full-cycle/03-board-issue-post-narrow-480x900.png) | Narrow stack THR-P-E |

## full-cycle (Edge · P6 T08)

| File | Artboard |
|------|----------|
| [full-cycle/04-board-edge-loading-1536x1024.png](./full-cycle/04-board-edge-loading-1536x1024.png) | THR-P-A loading |
| [full-cycle/05-board-edge-populated-1536x1024.png](./full-cycle/05-board-edge-populated-1536x1024.png) | THR-P-C populated (placement slots) |
| [full-cycle/06-board-edge-unavailable-1536x1024.png](./full-cycle/06-board-edge-unavailable-1536x1024.png) | THR-P-D unavailable |
| [full-cycle/07-issue-edge-populated-1536x1024.png](./full-cycle/07-issue-edge-populated-1536x1024.png) | M148 non-empty parity |
| [full-cycle/08-issue-edge-narrow-populated-480x900.png](./full-cycle/08-issue-edge-narrow-populated-480x900.png) | M148 narrow + populated |

Harness: `spa-app/tests/puppeteer/thr01-board-issue-post-screenshot.mjs` (`PHASE=post-implement`; Edge pack `EDGE_ONLY=1`).  
Force local `window.__THR01_FORCE_THREAD_STATUS__` via `resolveHarnessThreadStatus` — **no invent social HTTP**. Default harness intercepts Issues; live recapture uses `LIVE_GATEWAY=1` (real `/node/issues*`).

## Capture notes (2026-09-23 live)

Recaptured against live SPA `http://127.0.0.1:5173` with backends up (gateway `:8000`, identity `:8100`, threads `:8001`).
Harness env: `PUBLIC_BOARD_URL=http://127.0.0.1:5173 LIVE_GATEWAY=1 PHASE=post-implement` — real `/node/issues*` (no issue intercept); map tiles still aborted; thread UI scenes via `window.__THR*_FORCE_*` harness hooks (no invent social HTTP).
Pre-live harness PNGs archived under `screenshots/archive/harness-pre-live-20260923/`.
