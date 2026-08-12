## Task workspace — `task-spa-id-01-t06-auth-errors-success-redirect`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- Decision Ref: Story FR-01.5, FR-01.6, FR-01.7; M121 state E, F
- **Depends on:** T02, T04, T05 Todo
- **ui_scope:** `mixed`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000013`  
**Skill declared:** react-expert  
---

## Task: implement — auth errors (5 codes), success redirect, session restore (FR-01.5–01.7)

### Цель
Map Supabase/network errors to 5 distinct UI messages (state E); success state F → target route; session restore on app load; FR-01.7 note (email confirm — Supabase only, no FE verify).

### Почему это важно (риск)
Generic errors break Story AC #3; missing redirect breaks AC #4; session restore required for AC #4.

### Факты из кода (Code Facts / SSOT)
1. FR-01.5 codes: `invalid_credentials`, `network_error`, `rate_limited`, `magic_link_expired`, `account_not_found`.
2. FR-01.6: state F «Welcome Back» → `/board` default (or `?redirect=` query).
3. FR-01.7: Supabase handles email confirm — no FE verify flow.
4. T02 `fetchMe` after login; 401 → logged-out.
5. T01 `useAuthSession` — persist across reload.

### Gap / Проблема
No error taxonomy UI; no post-auth redirect; session not wired to app shell.

### AC/DoD
- [ ] (P0) `mapAuthError(supabaseError)` → one of 5 codes; state E shows distinct copy per code.
- [ ] (P0) Story AC #3: errors not generic (especially `invalid_credentials`).
- [ ] (P0) State F after login/signup/magic-link completion; redirect to target route.
- [ ] (P0) Story AC #4: session restorable on reload via `useAuthSession`.
- [ ] (P1) Optional `?redirect=` preserved through auth flow.
- [ ] (P1) FR-01.7 documented in code comment — no FE email verification UI.

### Где менять код
- `src/auth/mapAuthError.js` (new)
- `src/pages/LoginPage.jsx`
- [`src/App.jsx`](../../../../../../../../src/App.jsx) (session provider wrap if needed)
- `src/auth/__tests__/mapAuthError.test.js` (new)

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).

### Проверка
```bash
cd spa-app
npx vitest run src/auth/__tests__/mapAuthError.test.js
```
