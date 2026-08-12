# Acceptance verification — SPA-BUG-01-T01

- **Task:** Reproduce + capture POST submit HTTP
- **Result:** PASS
- **Date:** 2026-08-06T20:19:57Z
- **Package:** `pkg-000053`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Evidence fills `submit_post.status` or `cors_failed` | PASS | Live: `submit_post.status: 503` |
| Preview GET OK vs submit fail; `phase_testid: story-handoff-service-down`; no secrets | PASS | GET 200 · POST 503 · service_down · sanitized body |
| Repro: verified user, draft filled, Submit + Retry | PASS | Puppeteer live Railway SPA + gateway |

## Evidence files

- Primary (UAT-shaped): [`docs/analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-06T201810Z.md`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-06T201810Z.md)
- Local misconfig (Identity /me unset): [`docs/analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-06T193558Z.md`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-06T193558Z.md) — GET 503 before POST; not UAT pin

## Commands

```bash
cd spa-app
SPA_BASE_URL=https://spa-app-tallinn-demo.up.railway.app \
GATEWAY_BASE_URL=https://dogestonia-tallinn.up.railway.app \
SERVICE_API_TOKEN=<railway> \
  node ./scripts/bug01-capture-submit-http.mjs
rg -n "submit_post|story-handoff-service-down|cors_failed" docs/analysis/
```
