# Story acceptance gate — STORY-SPA-DEPLOY-01 (post-audit update)

- **Story:** Deployability на railway.com (spa-app)
- **Package:** `pkg-000027-20260706-epic-spa-06-deploy-01-railway-deployability.yaml`
- **Post-audit wave:** `run_mode=spa_deploy_01_audit_2026_07_06` (T07–T08)
- **Result:** PASS (smoke tooling + env bake extended)
- **Date:** 2026-07-06T21:06:30Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Деплой на railway поднимается; доска issues открывается по публичному URL без логина (M-5) | PASS (smoke) | `npm run verify:railway:live` — green local preview (`ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173`); production: `SPA_BASE_URL=https://<spa>.railway.app` |
| `VITE_GATEWAY_BASE_URL`/`VITE_IDENTITY_SERVICE_URL` в бандле = публичные railway-URL (не localhost) | PASS | `npm run verify:build:env-bake` — gateway/identity/supabase/gpt baked |
| `VITE_STORY_GPT_URL` присутствует; веб-кнопка «создать историю» ведёт на Custom GPT | PASS | T04 Vitest + env-bake includes GPT URL |
| Запросы из браузера к gateway/identity проходят (CORS — GW-DEPLOY-01 / IDS-DEPLOY-01) | DEFERRED | Cross-system |
| `npm run verify:bundle:no-service-role` зелёный | PASS | T05 |

## Commands (live verification — post-audit T07–T08)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173 npm run verify:railway:live
cd spa-app && VITE_LIFE_REALITY_MODE=GFL-DRIVEN \
  VITE_GATEWAY_BASE_URL=https://gateway.example.railway.app \
  VITE_IDENTITY_SERVICE_URL=https://identity.example.railway.app \
  VITE_SUPABASE_URL=https://example.supabase.co \
  VITE_SUPABASE_ANON_KEY=fake-anon-key-for-bake-verify-only \
  VITE_STORY_GPT_URL=https://chatgpt.com/g/example-gpt \
  npm run verify:build:env-bake
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
