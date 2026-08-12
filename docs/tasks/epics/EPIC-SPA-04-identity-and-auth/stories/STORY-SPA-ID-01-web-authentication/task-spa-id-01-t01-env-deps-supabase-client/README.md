## Task workspace — `task-spa-id-01-t01-env-deps-supabase-client`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- Decision Ref: [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-01-web-authentication.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-01-web-authentication.md); [04-env-configuration.md](../../../../../../../requirements/04-env-configuration.md); [05-supabase-auth-client.md](../../../../../../../requirements/05-supabase-auth-client.md)
- **Depends on:** —
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000013`  
**Skill declared:** react-expert  
---

## Task: implement — Supabase deps, env contract, auth client + session hook

### Цель
Добавить `@supabase/supabase-js`, env keys в `.env.example`, singleton `supabaseClient.js` и `useAuthSession.js` для восстановления сессии (FR basis; Story AC #4 partial).

### Почему это важно (риск)
Без Supabase client и session hook все auth flows (T04–T06) не имеют runtime foundation.

### Факты из кода (Code Facts / SSOT)
1. [`package.json`](../../../../../../../../package.json) — **нет** `@supabase/supabase-js`.
2. [`.env.example`](../../../../../../../../.env.example) — **нет** `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
3. `spa-app/src/**` — grep `supabase|auth|login` → **0 matches** (greenfield).
4. Planned spec: [05-supabase-auth-client.md](../../../../../../../requirements/05-supabase-auth-client.md).
5. Env SSOT: [04-env-configuration.md](../../../../../../../requirements/04-env-configuration.md).

### Gap / Проблема
Identity/auth runtime layer отсутствует; env contract не materialized.

### AC/DoD
- [ ] (P0) `@supabase/supabase-js` в `package.json` dependencies.
- [ ] (P0) `.env.example` — `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` с комментариями из requirements.
- [ ] (P0) `src/auth/supabaseClient.js` — createClient singleton; fail-fast при missing env в dev.
- [ ] (P0) `src/auth/useAuthSession.js` — subscribe `onAuthStateChange`; expose `{ session, user, loading }`.
- [ ] (P1) Unit test: hook initializes with null session when no stored token (mock supabase).

### Где менять код
- [`package.json`](../../../../../../../../package.json)
- [`.env.example`](../../../../../../../../.env.example)
- `src/auth/supabaseClient.js` (new)
- `src/auth/useAuthSession.js` (new)
- `src/auth/__tests__/useAuthSession.test.js` (new)

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).
- Identity `GET /me` (T02). Login UI (T03+).

### Проверка
```bash
cd spa-app
npm install
npx vitest run src/auth/__tests__/useAuthSession.test.js
```
