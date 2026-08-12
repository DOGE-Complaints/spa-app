# EPIC-SPA-06 — Railway deploy (spa-app)

> **ID:** `EPIC-SPA-06` · **Статус:** Done (DEPLOY-02 Done pkg-000028, 2026-07-09; DEPLOY-01 Done pkg-000027, 2026-07-06)
> **Тип:** Сквозной (deploy/NFR)
> **source:** [`../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md`](../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md)
> **Источник:** [`mvp-integration-plan-2026-07-02.md`](../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) §M-2
> **Active pkg:** `pkg-000028` → [STORY-SPA-DEPLOY-02-static-production-serve](./stories/STORY-SPA-DEPLOY-02-static-production-serve/STORY-SPA-DEPLOY-02-static-production-serve.md)

---

## Назначение

Вынести `spa-app` на публичный railway.com с корректно «запечёнными» `VITE_*` URL (gateway, identity, Supabase, Custom GPT), не ломая публичность доски (M-5) и bundle security guard (SEC-01).

## Контекст

- Vite встраивает `VITE_*` на этапе `npm run build` — localhost в `.env` не работает для внешних пользователей.
- `npm start` уже слушает `0.0.0.0:$PORT` — serve-контракт railway совместим.
- CORS на gateway/identity — парные волны GW-DEPLOY-01 / IDS-DEPLOY-01.

## Состав

| Story | Тема | Severity | Парные cross-system |
|-------|------|----------|---------------------|
| [STORY-SPA-DEPLOY-01](./stories/STORY-SPA-DEPLOY-01-railway-deployability/STORY-SPA-DEPLOY-01-railway-deployability.md) | Deployability на railway.com | 🟠 MED | [GW-DEPLOY-01](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/railway-deploy/STORY-GW-DEPLOY-01-railway-deployability.md), [IDS-DEPLOY-01](../../../../../doge-identity-service/docs/tasks/backlog-stories/railway-deploy/STORY-IDS-DEPLOY-01-railway-deployability.md) |
| [STORY-SPA-DEPLOY-02](./stories/STORY-SPA-DEPLOY-02-static-production-serve/STORY-SPA-DEPLOY-02-static-production-serve.md) | Static production serve (замена vite preview) | 🟡 P2 | — |

## Порядок

**SPA-DEPLOY-01** → **SPA-DEPLOY-02** (tech-debt, после hotfix allowedHosts 2026-07-08).

## Pipeline stories (nested)

| Story | Backlog source | Status | Pkg / Wave |
|-------|----------------|--------|------------|
| [STORY-SPA-DEPLOY-01-railway-deployability](./stories/STORY-SPA-DEPLOY-01-railway-deployability/STORY-SPA-DEPLOY-01-railway-deployability.md) | [backlog DEPLOY-01](../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md) | Done | pkg-000027 |
| [STORY-SPA-DEPLOY-02-static-production-serve](./stories/STORY-SPA-DEPLOY-02-static-production-serve/STORY-SPA-DEPLOY-02-static-production-serve.md) | [backlog DEPLOY-02](../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md) | Done | pkg-000028 |

## Cross-epic references

| Epic / Story | Relation |
|--------------|----------|
| [mvp-integration-plan M-2](../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) | Gap M-2 — spa deploy открыт |
| [EPIC-SPA-04](../EPIC-SPA-04-identity-and-auth/EPIC-SPA-04-identity-and-auth.md) | Identity env (`VITE_IDENTITY_SERVICE_URL`, Supabase) |
| [EPIC-SPA-05](../EPIC-SPA-05-security-hardening/EPIC-SPA-05-security-hardening.md) | `verify:bundle:no-service-role` guard |
