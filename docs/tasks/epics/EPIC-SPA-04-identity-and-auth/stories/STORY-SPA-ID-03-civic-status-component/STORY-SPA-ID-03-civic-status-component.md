# STORY-SPA-ID-03 — Civic Status Component (reusable)

## Meta (pipeline)

- **Key:** `STORY-SPA-ID-03-civic-status-component`
- **Parent Epic:** [`../../EPIC-SPA-04-identity-and-auth.md`](../../EPIC-SPA-04-identity-and-auth.md)
- **Epic:** EPIC-SPA-04 Identity & Auth · **Волна 1 (Foundation)**
- **Status:** Done (pkg-000017, 2026-06-28)
- **Wave:** `pkg-000017`
- **source:** [`spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md)
- **Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md); [identity-frontend FR-FE-002 / §9](../../../../../../../docs/Identity/identity-frontend.md); [mockup-28](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md); [`me_response.py`](../../../../../../../doge-identity-service/src/core/api/me_response.py)
- **Источник:** [identity-frontend FR-FE-002 / §9](../../../../../../../docs/Identity/identity-frontend.md)
- **Backend:** ✅ (`GET /me.phone_verified`)
- **ui_scope:** `visual`

## Артборд (SSOT дизайна)
- Спек: [mockup-28-civic-status-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md)
- PNG: [mockup-28-civic-status-state-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.png)
- Состояния: A Unverified · B Verification Available · C Verification In Progress · D Verified · E Verification Failed. Компонент: `<CivicStatusCard />`.

## Зачем простыми словами
Единый компонент-индикатор «может ли этот человек выполнять гражданские действия прямо сейчас». Переиспользуется **везде**: кабинет, гейт защищённого действия, GPT-флоу, /verify. Это trust-компонент, не achievement (без геймификации/трофеев).

## Функциональные требования (FR)
- **FR-03.1** Один компонент `CivicStatusCard` с 5 состояниями; в рантайме рендерится одно.
- **FR-03.2** **Контракт (критично):** состояние — **FE-derived** из `GET /me.phone_verified` (bool) + локальная фаза flow (`idle|requesting|code_entry|confirming|verified|failed`) + опц. код ошибки. **Backend-поля `verification_status` НЕ существует** (M28 §6 обновлён) — не закладывать его.
- **FR-03.3** Канонические лейблы (не подменять): `Civic account not verified yet` / `Verified civic participant` / `Wallet not linked` (identity-frontend §9).
- **FR-03.4** Визуальная иерархия: иконка → заголовок → описание → primary action → метаданные; понятно за 2-3 сек.
- **FR-03.5** Verified-состояние резервирует место под будущий wallet-слой (info-блок, не блокер).
- **FR-03.6** Reuse: не создавать отдельные verification-карточки для Profile/GPT/Protected/Wallet (M28 §8).

## Routes / API
- Используется на `/dashboard` и встраивается в ID-04/06/08. API: `GET /me` (`phone_verified`, `phone_verified_at`, `phone_dial_prefix`).

## API-интеграция (doge-identity-service)
> База: Bearer Supabase JWT; envelope `{"data"}`/`{"error":{"code","message","trace_id"}}`.

- **Единственный источник статуса — `GET /me`** (Bearer). Релевантные поля `data`: `phone_verified` (bool), `phone_verified_at` (ISO|null), `phone_dial_prefix` (`"+372"`|null); для будущего — `eid_verified`. **Поля `verification_status` НЕ существует** ([`me_response.py`](../../../../../../../doge-identity-service/src/core/api/me_response.py)) — состояние карточки **FE-derived**: `phone_verified` + локальная фаза flow (`idle|requesting|code_entry|confirming|verified|failed`) + опц. код последней ошибки (из ID-04/05).
- Маппинг состояний карточки: `D Verified` ⇔ `phone_verified=true`; `A Unverified` ⇔ `false`; `B/C/E` — локальные фазы flow (бэкенд их не отдаёт).
- Wallet-поля в `/me` есть (`avatar_url` и пр.), но `wallet_linked` **нет** — wallet-блок чисто future-info, не читать из `/me`.

## Зависимости
- Потребляет статус из `/me`. Является зависимостью [ID-04](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) (отображение фазы) и встраивается в [ID-06](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md)/[ID-08](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md).

## Вне scope
- Сам OTP-flow (ID-04). Wallet-подключение (future).

## Acceptance Criteria (FR-уровень)
- [x] 5 состояний реализованы в одном `CivicStatusCard`, переиспользуемом во всех контекстах.
- [x] Состояние выводится из `phone_verified` + FE-фаза, без чтения несуществующего `verification_status`.
- [x] Канонические лейблы статуса не подменены синонимами.
- [x] Нет green-badge/трофеев/геймификации; trust-тон выдержан.
- [x] Зарезервирован wallet-info-блок (future).

## Nested tasks

| Order | Task folder | Wave |
|---|---|---|
| 1 | [`task-spa-id-03-t01-civic-status-state-derivation`](./task-spa-id-03-t01-civic-status-state-derivation/README.md) | pkg-000017 |
| 2 | [`task-spa-id-03-t02-civic-status-card-shell-m28`](./task-spa-id-03-t02-civic-status-card-shell-m28/README.md) | pkg-000017 |
| 3 | [`task-spa-id-03-t03-civic-states-unverified-available-verified`](./task-spa-id-03-t03-civic-states-unverified-available-verified/README.md) | pkg-000017 |
| 4 | [`task-spa-id-03-t04-civic-states-in-progress-failed`](./task-spa-id-03-t04-civic-states-in-progress-failed/README.md) | pkg-000017 |
| 5 | [`task-spa-id-03-t05-dashboard-route-civic-status-integration`](./task-spa-id-03-t05-dashboard-route-civic-status-integration/README.md) | pkg-000017 |
| 6 | [`task-spa-id-03-t06-tests-civic-status-vitest`](./task-spa-id-03-t06-tests-civic-status-vitest/README.md) | pkg-000017 |
| 7 | [`task-spa-id-03-t07-story-gate-id-03`](./task-spa-id-03-t07-story-gate-id-03/README.md) | pkg-000017 |
| 8 | [`task-spa-id-03-t08-civic-status-panel-dom-order-m28`](./task-spa-id-03-t08-civic-status-panel-dom-order-m28/README.md) | `run_mode=spa_id_03_audit_2026_06_28` |
