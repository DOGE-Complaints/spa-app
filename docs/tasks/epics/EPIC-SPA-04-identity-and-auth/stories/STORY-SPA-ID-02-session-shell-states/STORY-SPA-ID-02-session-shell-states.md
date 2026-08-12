# STORY-SPA-ID-02 — Session Shell States (app-level)

## Meta (pipeline)

- **Key:** `STORY-SPA-ID-02-session-shell-states`
- **Parent Epic:** [`../../EPIC-SPA-04-identity-and-auth.md`](../../EPIC-SPA-04-identity-and-auth.md)
- **Epic:** EPIC-SPA-04 Identity & Auth · **Волна 1 (Foundation)**
- **Status:** Done
- **Wave:** `pkg-000016`
- **source:** [`spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md)
- **Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md); [epic-04 S04-6](../../../../../../backlog-stories/inbound/epic-04.md); [identity-frontend §10 / S1 session restore](../../../../../../../docs/Identity/identity-frontend.md); [mockup-124](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md)
- **Источник:** [epic-04 S04-6](../../../../../../backlog-stories/inbound/epic-04.md), [identity-frontend §10 / S1 session restore](../../../../../../../docs/Identity/identity-frontend.md)
- **Backend:** ✅ (`supabase.auth.getSession()`, `GET /me`)
- **ui_scope:** `visual`

## Артборд (SSOT дизайна)
- Спек: [mockup-124-session-shell-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md)
- PNG: [mockup-124-session-shell-state-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.png)
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
- Перекликается с [ID-01](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-01-web-authentication.md) (logged-out → login) и [M37](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md)/[ID-05](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md) (session_expired/network в контексте verify). Здесь — **app-shell уровень**, не feature-specific.

## Вне scope
- Конкретные ошибки верификации (ID-05). Логика login-формы (ID-01).

## Acceptance Criteria (FR-уровень)
- [x] 5 shell-состояний реализованы и маппятся на runtime-сигналы (getSession/GET /me/401/network).
- [x] Ни одно состояние не даёт белый экран/коллапс layout; shell виден всегда.
- [x] Каждое состояние имеет явный recovery-CTA; без обвиняющего тона.
- [x] Не показываются токены/сырой session payload (privacy §9 артборда).

## Nested tasks

| Order | Task folder | Wave |
|---|---|---|
| 1 | [`task-spa-id-02-t01-session-resolver-state-machine`](./task-spa-id-02-t01-session-resolver-state-machine/README.md) | pkg-000016 |
| 2 | [`task-spa-id-02-t02-app-shell-layout-m124`](./task-spa-id-02-t02-app-shell-layout-m124/README.md) | pkg-000016 |
| 3 | [`task-spa-id-02-t03-shell-states-restoring-logged-out`](./task-spa-id-02-t03-shell-states-restoring-logged-out/README.md) | pkg-000016 |
| 4 | [`task-spa-id-02-t04-shell-states-expired-backend-network`](./task-spa-id-02-t04-shell-states-expired-backend-network/README.md) | pkg-000016 |
| 5 | [`task-spa-id-02-t05-app-route-shell-integration`](./task-spa-id-02-t05-app-route-shell-integration/README.md) | pkg-000016 |
| 6 | [`task-spa-id-02-t06-tests-session-shell-vitest`](./task-spa-id-02-t06-tests-session-shell-vitest/README.md) | pkg-000016 |
| 7 | [`task-spa-id-02-t07-story-gate-id-02`](./task-spa-id-02-t07-story-gate-id-02/README.md) | pkg-000016 |
| 8 | [`task-spa-id-02-t08-route-aware-overlay-public-routes`](./task-spa-id-02-t08-route-aware-overlay-public-routes/README.md) | `run_mode=spa_id_02_audit_2026_06_28` |
