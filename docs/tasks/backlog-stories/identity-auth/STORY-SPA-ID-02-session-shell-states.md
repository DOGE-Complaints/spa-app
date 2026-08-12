# STORY-SPA-ID-02 — Session Shell States (app-level)

## Meta
- **Key:** `STORY-SPA-ID-02-session-shell-states`
- **Epic:** [EPIC-SPA-04 Identity & Auth](README.md) · **Волна 1 (Foundation)**
- **Status:** ✅ Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-02-session-shell-states/STORY-SPA-ID-02-session-shell-states.md) (pkg-000016, 2026-06-28)
- **Источник:** [epic-04 S04-6](../inbound/epic-04.md), [identity-frontend §10 / S1 session restore](../../../../../docs/Identity/identity-frontend.md)
- **Backend:** ✅ (`supabase.auth.getSession()`, `GET /me`)

## Артборд (SSOT дизайна)
- Спек: [mockup-124-session-shell-state-sheet-spec.md](../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md)
- PNG: [mockup-124-session-shell-state-sheet-spec.png](../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.png)
- Состояния: A Restoring Session · B Logged Out · C Session Expired · D Backend Unavailable · E Network Error.

## Зачем простыми словами
Глобальные состояния app-shell, когда сессия или бэкенд ещё не разрешены. Приложение **никогда не выглядит сломанным**: shell стабилен (лого, сайдбар, хедер), показываются восстановимые состояния, без белых экранов и паник-страниц.

## Функциональные требования (FR)
- **FR-02.1** Restoring Session — скелетон shell во время `supabase.auth.getSession()` (без гигантского спиннера, без пустого экрана).
- **FR-02.2** Logged Out — чистый route-guard: «Sign in required» + Sign In / Create Account + **«Continue to public board»** (анонимный просмотр публичного контента **разрешён** — решение 2026-06-23; логин обязателен только для действий/кабинета, не для просмотра board/issues).
- **FR-02.3** Session Expired — «Sign in again»; опц. блок сохранения предыдущего действия (`Previous Action: Waiting`).
- **FR-02.4** Backend Unavailable (`BACKEND_UNAVAILABLE`) — операционный outage, Retry + «View System Status».
- **FR-02.5** Network Error (`NETWORK_ERROR`) — Retry, восстановимое.
- **FR-02.6** Каждое состояние сохраняет shell-контейнеры (лого/сайдбар/хедер/футер), без layout-collapse.

## Routes / API
- Применяется глобально: `/`, `/board`, `/issues`, `/profile`, `/story/compose`, `/verify`, `/login`.
- API/runtime: `supabase.auth.getSession()` → restoring/logged_out/authenticated; `GET /me` → authenticated / `AUTHENTICATION_REQUIRED` / backend_unavailable; `401` → logged_out|session_expired.

## API-интеграция (doge-identity-service)
> База: Bearer Supabase JWT; envelope `{"data"}`/`{"error":{"code","message","trace_id"}}`.

- **`supabase.auth.getSession()`** (Supabase-клиент) — определяет `restoring`/`logged_out`/`authenticated` до любых identity-вызовов.
- **`GET /me`** (Bearer) — подтверждает authenticated и грузит профиль. Маппинг ответов:
  - `200 {data}` → `authenticated`.
  - `401 {error.code:"AUTHENTICATION_REQUIRED"}` → `logged_out` (нет сессии) / `session_expired` (была, истекла — различать по тому, был ли токен).
  - сетевой сбой / 5xx → `backend_unavailable` / `network_error`.
- **`GET /ready`** (без auth) — опционально для кнопки «View System Status» (FR-02.4): `200` ready / `503` degraded (payload `{data:{status,db_backend,db_ready,db_checks}}`).
- **Анонимный просмотр:** `/board`, `/issues` доступны без сессии (не требуют `/me`); identity-вызовы — только на защищённых роутах/кабинете.
- Identity сам refresh токена не делает — это Supabase-клиент (`getSession()` auto-refresh).

## Зависимости
- Перекликается с [ID-01](STORY-SPA-ID-01-web-authentication.md) (logged-out → login) и [M37](../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md)/[ID-05](STORY-SPA-ID-05-verification-error-states.md) (session_expired/network в контексте verify). Здесь — **app-shell уровень**, не feature-specific.

## Вне scope
- Конкретные ошибки верификации (ID-05). Логика login-формы (ID-01).

## Acceptance Criteria (FR-уровень)
- [x] 5 shell-состояний реализованы и маппятся на runtime-сигналы (getSession/GET /me/401/network).
- [x] Ни одно состояние не даёт белый экран/коллапс layout; shell виден всегда.
- [x] Каждое состояние имеет явный recovery-CTA; без обвиняющего тона.
- [x] Не показываются токены/сырой session payload (privacy §9 артборда).
