## Task workspace — `task-spa-deploy-01-t08-verify-env-bake-supabase-gpt`

- Story: [`../STORY-SPA-DEPLOY-01-railway-deployability.md`](../STORY-SPA-DEPLOY-01-railway-deployability.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-DEPLOY-01-execution-2026-07-06.md`](../../../../../../analysis/audit-STORY-SPA-DEPLOY-01-execution-2026-07-06.md) §Findings F6; §T03 gap
- **Depends on:** SPA-DEPLOY-01-T07 Done
- **activation:** `run_mode=spa_deploy_01_audit_2026_07_06`
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Closed:** 2026-07-06T21:06:30Z  
**Wave:** `run_mode=spa_deploy_01_audit_2026_07_06` (post-audit; **не** pkg-000027)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-06T20:24:48Z  
---

## Task: implement — extend verify-build-env-bake for Supabase + GPT URL

### Цель
Закрыть audit **F6**: расширить `verify-build-env-bake.mjs` — assert bake `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_STORY_GPT_URL`.

### AC/DoD
- [x] (P0) Script assert: нет localhost gateway/identity в dist.
- [x] (P0) Script assert: gateway + identity + supabase URL + anon key + story GPT URL в dist.
- [x] (P1) `npm run verify:build:env-bake` green с полным prod-like env set.
- [x] (P1) [`deploy-guide.md`](../../../../../../../docs/deploy-guide.md) — расширенный пример env.
- [x] (P1) **Не** менять `pkg-000027`, `spa-active-package.current.yaml`.

### Verification
```bash
cd spa-app
VITE_LIFE_REALITY_MODE=GFL-DRIVEN \
VITE_GATEWAY_BASE_URL=https://gateway.example.railway.app \
VITE_IDENTITY_SERVICE_URL=https://identity.example.railway.app \
VITE_SUPABASE_URL=https://example.supabase.co \
VITE_SUPABASE_ANON_KEY=fake-anon-key-for-bake-verify-only \
VITE_STORY_GPT_URL=https://chatgpt.com/g/example-gpt \
  npm run verify:build:env-bake
```
