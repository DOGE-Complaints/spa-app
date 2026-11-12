# Screenshots — STORY-SPA-THR-05 verify-before-write

**Story:** Verify gate (M147)  
**Wave:** pkg-000081 P3 · gap P6 `spa_thr_05_audit_2026_09_22`  
**Viewport canon:** 1536×1024

## full-cycle (Happy · THR-V-A…D)

| File | State |
|------|--------|
| [full-cycle/01-thr-v-a-unverified-gate-1536x1024.png](./full-cycle/01-thr-v-a-unverified-gate-1536x1024.png) | THR-V-A Unverified gate |
| [full-cycle/02-thr-v-b-handoff-verify-1536x1024.png](./full-cycle/02-thr-v-b-handoff-verify-1536x1024.png) | THR-V-B Handoff evidence: `#/verify?returnTo=` on composer chrome (**not** full Verify page crop; code handoff PASS via `buildVerifyHandoffHref`) |
| [full-cycle/03-thr-v-c-opaque-verified-1536x1024.png](./full-cycle/03-thr-v-c-opaque-verified-1536x1024.png) | THR-V-C Opaque Verified |
| [full-cycle/04-thr-v-d-civic-line-1536x1024.png](./full-cycle/04-thr-v-d-civic-line-1536x1024.png) | THR-V-D Optional civic line near CTA |

**THR-V-B:** dedicated Verify-surface crop not required this wave — **mapped to 02 href chrome + code**. Mobile pack absent (nonblocking). React write gate residual: M147 representative = Post comment (composer); attach gated; react picker ungated this story (F3 CLOSED via T07).

Harness: `spa-app/tests/puppeteer/thr05-verify-screenshot.mjs`.  
Gate on `identity_verified` — not `phone_verified` alone. **No invent pack JSON keys.**

## Capture notes (2026-09-23 live)

Recaptured against live SPA `http://127.0.0.1:5173` with backends up (gateway `:8000`, identity `:8100`, threads `:8001`).
Harness env: `PUBLIC_BOARD_URL=http://127.0.0.1:5173 LIVE_GATEWAY=1 PHASE=post-implement` — real `/node/issues*` (no issue intercept); map tiles still aborted; thread UI scenes via `window.__THR*_FORCE_*` harness hooks (no invent social HTTP).
Pre-live harness PNGs archived under `screenshots/archive/harness-pre-live-20260923/`.
