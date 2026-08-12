# SPA-DEPLOY-01-T02 — Env example + railway build-vars SSOT

**Status:** Done  
**Closed:** 2026-07-06T13:53:57Z  

**Story:** [`../STORY-SPA-DEPLOY-01-railway-deployability.md`](../STORY-SPA-DEPLOY-01-railway-deployability.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md) §Scope A, C  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-06T13:39:53Z

## Purpose
Закрыть Scope **A+C**: документировать и зафиксировать в `.env.example` + SSOT docs все `VITE_*` для railway build, включая **`VITE_STORY_GPT_URL`** (отсутствует в example на scaffold).

## Risk
Оператор задаёт localhost в Railway Variables → бандл неработоспособен для внешних пользователей (Vite bake at build).

## Code Facts (re-verify at execute)
- [`StorySubmitPage.jsx:29`](../../../../../../../../src/pages/StorySubmitPage.jsx) — `VITE_STORY_GPT_URL` уже читается в коде.
- [`.env.example`](../../../../../../../../.env.example) — есть `VITE_GATEWAY_BASE_URL`, `VITE_IDENTITY_SERVICE_URL`, `VITE_SUPABASE_*`; **нет** `VITE_STORY_GPT_URL`.
- [`identityService.js:4`](../../../../../../../../src/auth/identityService.js) — `VITE_IDENTITY_SERVICE_URL`.
- [`issueService.js:31`](../../../../../../../../src/services/issueService.js) — `VITE_GATEWAY_BASE_URL`.

## AC / DoD
- [x] (P0) Scope A: `.env.example` + [`docs/requirements/04-env-configuration.md`](../../../../../../../docs/requirements/04-env-configuration.md) — `VITE_GATEWAY_BASE_URL`, `VITE_IDENTITY_SERVICE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_LIFE_REALITY_MODE` с railway checklist.
- [x] (P0) Scope C: `VITE_STORY_GPT_URL` добавлен в `.env.example` + requirements + `deploy-guide.md` §3.
- [x] (P1) Railway Variables checklist в `deploy-guide.md` (build-time only; пересборка после смены).
- [x] Traceability: story AC #2, #3 (env contract для bake и GPT URL).

## Where to change
- [`spa-app/.env.example`](../../../../../../../../.env.example)
- [`spa-app/docs/requirements/04-env-configuration.md`](../../../../../../../docs/requirements/04-env-configuration.md)
- [`spa-app/docs/deploy-guide.md`](../../../../../../../docs/deploy-guide.md)

## Out of scope
- Реальный `.env` (gitignored). CORS на бэкендах (GW/IDS deploy). Код `StorySubmitPage` (T04 tests).

## Verification
```bash
grep -E 'VITE_GATEWAY_BASE_URL|VITE_IDENTITY_SERVICE_URL|VITE_STORY_GPT_URL|VITE_SUPABASE' spa-app/.env.example
```
