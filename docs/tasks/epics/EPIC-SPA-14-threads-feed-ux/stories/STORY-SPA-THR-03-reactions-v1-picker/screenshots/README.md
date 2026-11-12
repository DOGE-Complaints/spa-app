# Screenshots — STORY-SPA-THR-03 reactions.v1 picker

**Story:** reactions.v1 strip + picker (M145)  
**Wave:** pkg-000079 P3 · gap P6 `spa_thr_03_audit_2026_09_22`  
**Viewport canon:** 1536×1024 (mobile: 480×900)

## full-cycle (Happy · THR-R-A…G)

| File | State |
|------|--------|
| [full-cycle/01-thr-r-a-strip-1536x1024.png](./full-cycle/01-thr-r-a-strip-1536x1024.png) | THR-R-A compact summary strip · **also THR-R-D** desktop React button (closed) |
| [full-cycle/02-thr-r-b-picker-layers-1536x1024.png](./full-cycle/02-thr-r-b-picker-layers-1536x1024.png) | THR-R-B picker · 3 layers · **also THR-R-D** desktop open via button |
| [full-cycle/03-thr-r-c-enabled-only-1536x1024.png](./full-cycle/03-thr-r-c-enabled-only-1536x1024.png) | THR-R-C enabled-only helper |
| [full-cycle/04-thr-r-g-agree-disagree-1536x1024.png](./full-cycle/04-thr-r-g-agree-disagree-1536x1024.png) | THR-R-G agree ⟂ disagree |
| [full-cycle/05-thr-r-f-keyboard-focus-1536x1024.png](./full-cycle/05-thr-r-f-keyboard-focus-1536x1024.png) | THR-R-F keyboard focus path |
| [full-cycle/06-thr-r-e-mobile-button-480x900.png](./full-cycle/06-thr-r-e-mobile-button-480x900.png) | THR-R-E mobile React button |

**THR-R-D (desktop button/hover open):** no dedicated `*thr-r-d*` filename — **mapped to 01 (button chrome) + 02 (picker open)**. Explicit button path always available (M145 THR-R-D). Gap F3 CLOSED via T08.

Harness: `spa-app/tests/puppeteer/thr03-reactions-screenshot.mjs`.  
Force `window.__THR01_FORCE_THREAD_STATUS__=populated` + `__THR02_FORCE_SCENE__=nested` + `__THR03_FORCE_SCENE__` — **no invent reaction HTTP**. Prefer Chrome for Testing ≤142 if screenshot hangs on newer builds.

## Capture notes (2026-09-23 live)

Recaptured against live SPA `http://127.0.0.1:5173` with backends up (gateway `:8000`, identity `:8100`, threads `:8001`).
Harness env: `PUBLIC_BOARD_URL=http://127.0.0.1:5173 LIVE_GATEWAY=1 PHASE=post-implement` — real `/node/issues*` (no issue intercept); map tiles still aborted; thread UI scenes via `window.__THR*_FORCE_*` harness hooks (no invent social HTTP).
Pre-live harness PNGs archived under `screenshots/archive/harness-pre-live-20260923/`.
