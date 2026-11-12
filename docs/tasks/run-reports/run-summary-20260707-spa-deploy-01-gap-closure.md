# Run summary — SPA-DEPLOY-01 gap closure (2026-07-07)

> **Wave:** gap-closure post re-audit F1–F8  
> **Date:** 2026-07-07T09:33:00Z

## Deliverables

| Item | Status |
|------|--------|
| F8 Vitest (`VITE_STORY_GPT_URL` → `#`) | ✅ 12/12 StorySubmitPage tests |
| `verify:cors:preflight` script | ✅ added |
| `docs/railway-git-deploy-manual.md` | ✅ added |
| F3/F4/F5 doc drift | ✅ synced |
| Local smoke `:4173` | ✅ green |
| Full `test:run` | ✅ 366 passed, 2 skipped |
| `verify:build:env-bake` | ✅ green (Tallinn demo URLs) |

## Local smoke log

```bash
cd spa-app && npm run build && PORT=4173 npm start
ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173 npm run verify:railway:live
# → shell ok, M-5 ok (no login redirect)
```

## CORS preflight (live backends)

**Update 2026-07-07T10:45Z** — identity railpack fix pushed (`doge-identity-service` `76a11bf`); live URL всё ещё **502** до redeploy Railway. См. [identity run-summary](../../../doge-identity-service/docs/tasks/run-reports/run-summary-20260707-identity-railway-502-fix.md).

```bash
SPA_ORIGIN=https://dogestonia-spa-tallinn-demo.up.railway.app \
GATEWAY_BASE_URL=https://dogestonia-tallinn.up.railway.app \
IDENTITY_SERVICE_URL=https://doge-identity-service-tallinn-demo.up.railway.app \
  npm run verify:cors:preflight
```

| Target | Result (2026-07-07T10:45Z) |
|--------|----------------------------|
| Gateway `OPTIONS /tallinn/issues` | ✅ `Access-Control-Allow-Origin: *` |
| Identity `OPTIONS /me` | ❌ **502** (ожидается green после Manual Deploy `76a11bf` + `CORS_ALLOWED_ORIGINS`) |

## Production SPA smoke

**SPA URL:** TBD (ожидается после Git → Railway deploy по [railway-git-deploy-manual.md](../../railway-git-deploy-manual.md))

```bash
# После деплоя:
SPA_BASE_URL=https://<spa>.up.railway.app npm run verify:railway:live
SPA_ORIGIN=https://<spa>.up.railway.app \
GATEWAY_BASE_URL=https://dogestonia-tallinn.up.railway.app \
IDENTITY_SERVICE_URL=https://doge-identity-service-tallinn-demo.up.railway.app \
  npm run verify:cors:preflight
```

## Gap closure rollup

| ID | Status |
|----|--------|
| F1 local smoke | ✅ CLOSED |
| F1b production URL | OPEN (SPA not deployed) |
| F2 CORS | PARTIAL (script ✅; identity 502) |
| F3 | ✅ CLOSED |
| F4 | ✅ CLOSED |
| F5 | ✅ CLOSED |
| F6 | ✅ CLOSED (prior) |
| F7 | waived |
| F8 | ✅ CLOSED |

## Operator next steps

1. **Railway identity:** Manual Deploy ветки `dev` commit `76a11bf`; Deploy Logs — uvicorn стартует (не `.venv/bin/python`)
2. **Railway identity vars:** `CORS_ALLOWED_ORIGINS=https://dogestonia-spa-tallinn-demo.up.railway.app` + pilot checklist в [identity run-summary](../../../doge-identity-service/docs/tasks/run-reports/run-summary-20260707-identity-railway-502-fix.md)
3. Re-run `make smoke` + `verify:cors:preflight`; mark AC #4 `[x]`
4. Deploy spa via Git → Railway (`spa-app` root) if not yet live
