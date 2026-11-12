# Run summary — STORY-SPA-DEPLOY-01 (pkg-000027)

- **builder_project:** spa
- **Package:** `pkg-000027-20260706-epic-spa-06-deploy-01-railway-deployability.yaml`
- **Story:** STORY-SPA-DEPLOY-01-railway-deployability
- **Result:** Done
- **Date:** 2026-07-06T13:53:57Z

## Tasks closed

| # | Task | Status |
|---|------|--------|
| 1 | SPA-DEPLOY-01-T01 railway monorepo serve config | Done |
| 2 | SPA-DEPLOY-01-T02 env example + railway build-vars | Done |
| 3 | SPA-DEPLOY-01-T03 verify dist env bake | Done |
| 4 | SPA-DEPLOY-01-T04 story GPT URL wiring tests | Done |
| 5 | SPA-DEPLOY-01-T05 M-5 public paths + bundle guard | Done |
| 6 | SPA-DEPLOY-01-T06 story gate | Done |

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:run   # 365 passed
cd spa-app && npm run verify:bundle:no-service-role
VITE_GATEWAY_BASE_URL=https://gateway.example.railway.app \
VITE_IDENTITY_SERVICE_URL=https://identity.example.railway.app \
VITE_LIFE_REALITY_MODE=GFL-DRIVEN npm run verify:build:env-bake
```

## Code deliverables

- `spa-app/railway.toml` — build/start for monorepo root `spa-app`
- `spa-app/docs/deploy-guide.md` §3 — Railway variables checklist + M-5 smoke
- `spa-app/.env.example` + `docs/requirements/04-env-configuration.md` — `VITE_STORY_GPT_URL`
- `spa-app/scripts/verify-build-env-bake.mjs` + `verify:build:env-bake` npm script
- `StorySubmitPage.test.jsx` — GPT URL tests (EMPTY/EXPIRED/submitAnother)
- `sessionRoutePolicy.test.js` — `/` public path assert

## Operator follow-ups

- First Railway deploy: Settings → Root Directory `spa-app`; set production `VITE_*` vars; smoke `/#/board`
- CORS: after [GW-DEPLOY-01](../../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/railway-deploy/STORY-GW-DEPLOY-01-railway-deployability.md) + [IDS-DEPLOY-01](../../../../../../doge-identity-service/docs/tasks/backlog-stories/railway-deploy/STORY-IDS-DEPLOY-01-railway-deployability.md)
