## Task workspace — `task-spa-id-01-t02-identity-api-me-client`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- Decision Ref: [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-01-web-authentication.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-01-web-authentication.md); [07-identity-api-client.md](../../../../../../../requirements/07-identity-api-client.md); [`me_response.py`](../../../../../../../../../doge-identity-service/src/core/api/me_response.py)
- **Depends on:** T01 Todo
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000013`  
**Skill declared:** react-expert  
---

## Task: implement — identityService + GET /me Bearer client

### Цель
Реализовать `identityService.fetchMe(accessToken)` с `Authorization: Bearer`; env `VITE_IDENTITY_*`; mock mode flag. **Не** реализовать identity login endpoints (их нет).

### Почему это важно (риск)
После Supabase login нужен профиль через `/me` (Story AC #1, #4); без клиента success redirect не знает user state.

### Факты из кода (Code Facts / SSOT)
1. Story API §: `GET /me` Bearer; envelope `{"data":…}` / `{"error":…}`; 401 → logged-out.
2. [`me_response.py`](../../../../../../../../../doge-identity-service/src/core/api/me_response.py) — поля профиля; **`email` absent** до ONB-01.
3. [07-identity-api-client.md](../../../../../../../requirements/07-identity-api-client.md) — Planned, NOT IMPLEMENTED.
4. [`.env.example`](../../../../../../../../.env.example) — **нет** `VITE_IDENTITY_BASE_URL`.
5. Identity **нет** signup/login endpoints — только `/me` и protected routes.

### Gap / Проблема
Нет HTTP client для identity service; нет typed profile shape на FE.

### AC/DoD
- [ ] (P0) `.env.example` — `VITE_IDENTITY_BASE_URL`; optional `VITE_IDENTITY_MOCK=true`.
- [ ] (P0) `src/auth/identityService.js` — `fetchMe(token)` → profile or throws mapped error.
- [ ] (P0) 401 `AUTHENTICATION_REQUIRED` → typed `AuthenticationRequiredError`.
- [ ] (P0) Mock mode returns fixture profile when `VITE_IDENTITY_MOCK=true`.
- [ ] (P1) Vitest: success envelope parse; 401 mapping; mock mode.

### Где менять код
- [`.env.example`](../../../../../../../../.env.example)
- `src/auth/identityService.js` (new)
- `src/auth/__tests__/identityService.test.js` (new)

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).
- Supabase login/signup/magic-link (T04/T05). Identity login endpoints (не существуют).

### Проверка
```bash
cd spa-app
npx vitest run src/auth/__tests__/identityService.test.js
```
