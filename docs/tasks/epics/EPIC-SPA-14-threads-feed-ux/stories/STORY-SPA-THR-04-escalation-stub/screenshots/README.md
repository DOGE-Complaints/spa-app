# Screenshots — STORY-SPA-THR-04 escalation stub

**Story:** Invite organization stub (M146)  
**Wave:** pkg-000080 P3 · gap P6 `spa_thr_04_audit_2026_09_22`  
**Viewport canon:** 1536×1024 (mobile: 480×900)

## full-cycle (Happy · THR-E-A…C)

| File | State |
|------|--------|
| [full-cycle/01-thr-e-a-idle-1536x1024.png](./full-cycle/01-thr-e-a-idle-1536x1024.png) | THR-E-A Idle Invite organization |
| [full-cycle/02-thr-e-b-activated-1536x1024.png](./full-cycle/02-thr-e-b-activated-1536x1024.png) | THR-E-B Activated informational feedback · **also covers mobile B** (same chrome; no dedicated `*mobile*` B) |
| [full-cycle/03-thr-e-c-soon-1536x1024.png](./full-cycle/03-thr-e-c-soon-1536x1024.png) | THR-E-C Soon/disabled + helper · **also covers mobile C** |
| [full-cycle/04-thr-e-a-idle-mobile-480x900.png](./full-cycle/04-thr-e-a-idle-mobile-480x900.png) | THR-E-A Idle mobile (Invite short label) |

**Mobile B/C:** no dedicated filenames — **mapped to desktop 02/03** (F3 CLOSED via T06). Short `Invite` evidence = 04.

Harness: `spa-app/tests/puppeteer/thr04-escalation-screenshot.mjs`.  
Force `__THR01_FORCE_THREAD_STATUS__=populated` + `__THR04_FORCE_SCENE__` — **no invent escalate HTTP**. No false success.

## Capture notes (2026-09-23 live)

Recaptured against live SPA `http://127.0.0.1:5173` with backends up (gateway `:8000`, identity `:8100`, threads `:8001`).
Harness env: `PUBLIC_BOARD_URL=http://127.0.0.1:5173 LIVE_GATEWAY=1 PHASE=post-implement` — real `/node/issues*` (no issue intercept); map tiles still aborted; thread UI scenes via `window.__THR*_FORCE_*` harness hooks (no invent social HTTP).
Pre-live harness PNGs archived under `screenshots/archive/harness-pre-live-20260923/`.
