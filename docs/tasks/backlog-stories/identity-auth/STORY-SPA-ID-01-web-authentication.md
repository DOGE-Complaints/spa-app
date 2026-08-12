# STORY-SPA-ID-01 — Web Authentication (login / signup / magic-link / reset)

## Meta
- **Key:** `STORY-SPA-ID-01-web-authentication`
- **Epic:** [EPIC-SPA-04 Identity & Auth](README.md) · **Волна 1 (Foundation)**
- **Status:** Todo (FR-layer)
- **Источник:** [epic-04 S04-1](../inbound/epic-04.md), [identity-frontend FR-FE-001 / S1](../../../../../docs/Identity/identity-frontend.md)
- **Backend:** ✅ Supabase Auth готов (`email` в `/me` — ждёт ONB-01, не блокер)

## Артборд (SSOT дизайна)
- Спек: [mockup-121-web-authentication-state-sheet-spec.md](../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.md)
- PNG: [mockup-121-web-authentication-state-sheet-spec.png](../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.png)
- Состояния артборда: A Login · B Signup · C Magic Link Sent · D Forgot Password · E Auth Error (5 вариантов) · F Auth Success.

## Зачем простыми словами
Первичный, **account-first** вход на DOGEstonia напрямую с веба (без GPT-контекста, без story-draft). Регистрация по email; телефон **не спрашивается** при signup. Это фундамент: до него недоступны кабинет и защищённые действия.

## Функциональные требования (FR)
- **FR-01.1** Login по email/password (Supabase Auth); опция «Remember me».
- **FR-01.2** Signup по email/password + confirm; вспом. текст «Phone verification happens later when required». Телефон при signup НЕ запрашивается.
- **FR-01.3** Passwordless **magic link**: запрос → состояние «Check Your Email» (метаданные: отправлено, истекает ~15 мин), Resend, «Use password instead».
- **FR-01.4** Forgot password: ввод email → «Send Reset Link» → возврат к login.
- **FR-01.5** Auth-ошибки (состояние E) с раздельными сообщениями: `invalid_credentials`, `network_error`, `rate_limited`, `magic_link_expired`, `account_not_found`.
- **FR-01.6** Auth success (F) — транзитное состояние «Welcome Back» → переход на целевой роут (Profile/Board/Issues/protected).
- **FR-01.7** Email-верификацию выполняет Supabase («Confirm email» вкл.) — фронт сам email не верифицирует (identity-frontend FR-FE-001).

## Routes / API
- Route: `/login` (+ future `/signup`, `/password-reset`).
- API: Supabase Auth (login/signup/magic-link/reset); после — Supabase JWT в `Authorization: Bearer`; `GET /me`. **Выход — `supabase.auth.signOut()` (Supabase-клиент, НЕ identity-эндпоинт `/logout` — такого нет).**

## API-интеграция (doge-identity-service)
> База: все защищённые вызовы — `Authorization: Bearer <supabase_access_token>`; envelope успех `{"data":…}`, ошибка `{"error":{"code","message","trace_id"}}`; origin должен быть в `CORS_ALLOWED_ORIGINS`.

- **Login/signup/magic-link/reset/signOut** — это **Supabase Auth** (внешний GoTrue), НЕ identity. Identity сам логин не делает.
- **`GET /me`** (Bearer) — вызвать сразу после успешного входа, чтобы загрузить профиль. `data`: `supabase_user_id, role, display_name, avatar_url, phone_verified, phone_verified_at, phone_dial_prefix, eid_verified, …` (поля [`me_response.py`](../../../../../doge-identity-service/src/core/api/me_response.py)). **`email` — отсутствует** до [ONB-01](../../../../../doge-identity-service/docs/tasks/backlog-stories/identity-onboarding/STORY-IDS-ONB-01-email-in-me-and-supabase-confirm.md).
- **401** `{"error":{"code":"AUTHENTICATION_REQUIRED"}}` на `/me` → нет/просрочена сессия → состояние logged-out.
- **Выход:** `supabase.auth.signOut()` на клиенте (чистит сессию) — identity-вызова не требуется.
- Identity-эндпоинта signup/login **нет** — не закладывать.

## Зависимости
- Нет входящих. Фундамент для всех ID-0x. Сессионные shell-состояния — в [ID-02](STORY-SPA-ID-02-session-shell-states.md). Переход после GPT-входа (`oauth_request_id`) — в [ID-08](STORY-SPA-ID-08-gpt-verification-entry.md).

## Вне scope
- Story-draft контекст (это GPT/gate — ID-06/08). Phone verify (ID-04). OAuth-выдача кода (ID-08).

## Acceptance Criteria (FR-уровень)
- [ ] Login/signup по email работают до доступа к dashboard; телефон при signup не запрашивается.
- [ ] Magic-link и forgot-password имеют свои состояния (sent / reset-requested).
- [ ] 5 auth-ошибок различимы и не generic (особенно `invalid_credentials`).
- [ ] Success ведёт на целевой роут; сессия восстановима.
- [ ] Экран без story-draft/GPT-контекста (автономный веб-вход).
