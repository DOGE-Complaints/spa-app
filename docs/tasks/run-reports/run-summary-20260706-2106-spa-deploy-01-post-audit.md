# Run summary — STORY-SPA-DEPLOY-01 post-audit (T07–T08)

- **builder_project:** spa
- **Wave:** `run_mode=spa_deploy_01_audit_2026_07_06`
- **Package (unchanged):** `pkg-000027-20260706-epic-spa-06-deploy-01-railway-deployability.yaml`
- **Result:** Done (gap wave)
- **Date:** 2026-07-06T21:06:30Z

## Tasks closed

| # | Task | Status |
|---|------|--------|
| 7 | SPA-DEPLOY-01-T07 railway live smoke + AC #1 alignment | Done |
| 8 | SPA-DEPLOY-01-T08 verify env bake supabase/gpt | Done |

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173 npm run verify:railway:live
cd spa-app && VITE_LIFE_REALITY_MODE=GFL-DRIVEN \
  VITE_GATEWAY_BASE_URL=https://gateway.example.railway.app \
  VITE_IDENTITY_SERVICE_URL=https://identity.example.railway.app \
  VITE_SUPABASE_URL=https://example.supabase.co \
  VITE_SUPABASE_ANON_KEY=fake-anon-key-for-bake-verify-only \
  VITE_STORY_GPT_URL=https://chatgpt.com/g/example-gpt \
  npm run verify:build:env-bake
```

## Code deliverables

- `spa-app/scripts/verify-railway-live-smoke.mjs` + `verify:railway:live`
- `spa-app/scripts/verify-build-env-bake.mjs` — Supabase + GPT bake checks
- `spa-app/docs/deploy-guide.md` — smoke + extended env-bake examples

## Operator follow-up

- Production Railway: `SPA_BASE_URL=https://<spa>.railway.app npm run verify:railway:live` (без `ALLOW_LOCAL_SMOKE`)
- CORS (F2): после GW/IDS railway deploy
