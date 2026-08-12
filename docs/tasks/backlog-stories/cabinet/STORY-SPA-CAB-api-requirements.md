# User Cabinet (EPIC-SPA-07) — требования к API (сверено с backend-доками)

> Консолидация всех API/данных, которые нужны стори CAB-01…07, **разбито по бекендам** и **сверено** с реальными api-reference:
> - Identity: [`doge-identity-service/.../api-reference/API_REFERENCE.md`](../../../../../doge-identity-service/docs/runtime-docs/api-reference/API_REFERENCE.md) + [`openapi.yaml`](../../../../../doge-identity-service/docs/runtime-docs/api-reference/openapi.yaml)
> - Gateway: [`doge-complaints-gateway/.../api-reference/API_REFERENCE.md`](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md) + [`openapi.yaml`](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/openapi.yaml)
>
> **Легенда:** ✅ есть в API · ⚠️ частично / расхождение · ❌ отсутствует / Deferred.  
> **Verified:** 2026-07-25 — identity [`me_response.py:19-51`](../../../../../doge-identity-service/src/core/api/me_response.py); gateway [`API_REFERENCE.md:511,537`](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md) (GW-CAB-01/02 Done; GW-CAB-03 Deferred).
>
> **Обновление 2026-07-24 (identity):** `created_at` + `account_status` (AUTHCORE-02 pkg-000044); `email` + `email_verified` (ONB-01 pkg-000045). CAB-02 identity = **3/3**.
>
> ## ⚙️ Режим MVP (решение 2026-07-25)
> - **Identity — live:** CAB-01 / CAB-02 / CAB-03 / CAB-07 зовут `GET /me` (и CTA → `/verify`). Backend готов.
> - **Gateway story-activity + drafts/current — backend готов** (GW-CAB-01/02). **SPA-wiring в этой волне отложен** оператором: CAB-04 = UI без HTTP + `cabinet.common.comingSoon` на data-affordance.
> - **Gateway contribution (receipts/records) — Deferred** (GW-CAB-03 post-MVP). CAB-06 весь слой = UI + Coming soon.
> - **Wallet/web3 — POST-MVP:** CAB-05 = stub + Coming soon.
> - **CAB-02:** extend `/me` (не отдельный endpoint) — **Done** на FE (`pkg-000029`).
>
> ## §0. Контракты (факт поставки backend)
> | Контракт | Бекенд | Форма (data) | Backend | Для стори |
> |----------|--------|--------------|---------|-----------|
> | `GET /me` **extended** | identity | `email`, `email_verified`, `created_at`, `account_status`, `display_name`, `role`, `phone_*` | ✅ поставлен | CAB-01/02/03/07 |
> | `GET /story-activity` | gateway | `{ metrics, stories[] }` | ✅ GW-CAB-01 | CAB-04 A/B/E (SPA wiring later) |
> | `GET /story-drafts/current` | gateway | `{ draft_id, last_edited_at }` \| `null` | ✅ GW-CAB-02 | CAB-04 C (SPA wiring later) |
> | `GET /contribution/receipts` | gateway | `{ count, receipts[] }` | ❌ Deferred GW-CAB-03 | CAB-06 A |
> | `GET /contribution/records` | gateway | `{ count, records[] }` | ❌ Deferred GW-CAB-03 | CAB-06 B |
>
> Статус-enum: UI `published`/`under_review` ↔ gateway `PUBLISHED`/`DRAFT` — маппинг на стороне gateway (уже в story-activity).

---

## §1. IDENTITY (`doge-identity-service`)

### 1.1 `GET /me` — сессия + профиль (CAB-01, CAB-02, CAB-03, CAB-07)
**Реально отдаёт** ([API_REFERENCE §6](../../../../../doge-identity-service/docs/runtime-docs/api-reference/API_REFERENCE.md); [me_response.py:19-51](../../../../../doge-identity-service/src/core/api/me_response.py)):
`supabase_user_id`, `role` (`"authenticated"`), **`email`** (nullable), **`email_verified`** (bool — hardcoded `true`; ⚠️ не = «есть адрес» без `email != null`), `eid_verified`, `display_name` (nullable), `avatar_url`, `eid_*`, **`phone_verified`**, `phone_provider`, **`phone_dial_prefix`**, **`phone_verified_at`**, **`created_at`** (nullable), **`account_status`** (константа `"active"`). Auth: Supabase Bearer (+ OAuth Bearer); missing profile → `200` с null-полями; `401` на битый токен.

| Стори | Нужно | Поле в `/me` | Статус |
|-------|-------|--------------|--------|
| **CAB-01** shell | активная сессия / профиль | весь `/me` через `useSessionShell()` | ✅ есть |
| **CAB-03** civic | `phone_verified`, `phone_verified_at`, `phone_dial_prefix` | все три | ✅ есть |
| **CAB-02** account | `display_name` | `display_name` | ✅ есть |
| **CAB-02** account | `role` display | `role` = **`"authenticated"`** | ✅ SPA мапит `authenticated` (+ aliases) в [`accountSummaryState.js`](../../../../src/components/AccountSummary/accountSummaryState.js) |
| **CAB-02** account | **Email** | `email`, `email_verified` | ✅ ONB-01 |
| **CAB-02** account | **Account Created** | `created_at` | ✅ AUTHCORE-02 — `null` без профиля → Not Available |
| **CAB-02** account | **Account Status** | `account_status` | ✅ AUTHCORE-02 — MVP всегда `"active"` |

> **Вывод CAB-02:** identity = **3/3**. FE AccountSummary **Done** (`pkg-000029`). M24 при `email != null`; M26 при `email=null`; M25 при partial (напр. `created_at=null`).

### 1.2 Phone verification (CAB-03 CTA → `/verify`)
CTA «Verify Account» → SPA `/verify` (ID-04) → identity `POST /auth/phone/request` + `confirm` — **✅ оба есть**. Кабинет не зовёт phone API напрямую.

### 1.3 CAB-07 load error
- Источник профиля = **`GET /me`** (отдельного aggregate-endpoint нет).
- Коды `PROFILE_LOAD_FAILED`, `SESSION_EXPIRED` — **FE-моделируемые** (identity отдаёт `401` + envelope). Показывать как code-ref.

---

## §2. GATEWAY (`doge-complaints-gateway`)

**Есть по факту** ([API_REFERENCE](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md)): story-drafts (stash/get/submit + **`GET /story-drafts/current`**), **`GET /story-activity`**, issues public/operator.

### 2.1 CAB-04 — resume draft (State C)
| Нужно | Endpoint | Статус |
|-------|----------|--------|
| Resume draft → `/story/submit?draft_id=` | `GET /story-drafts/{id}` + `POST …/submit` | ✅ (ID-12) |
| **Pending draft discovery** | `GET /story-drafts/current` | ✅ **GW-CAB-02** ([API_REFERENCE §current](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md)) |

### 2.2 CAB-04 — список + метрики (States A/B/E)
| Нужно | Endpoint | Статус |
|-------|----------|--------|
| User-scoped список + metrics | `GET /story-activity` | ✅ **GW-CAB-01** ([API_REFERENCE §story-activity](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md)) |
| UI statuses `published` / `under_review` | маппинг на gateway | ✅ на стороне gateway projection |

> **Вывод CAB-04 (2026-07-25):** backend **готов**. **SPA HTTP wiring отложен** — FE строит UI states + Coming soon на data-affordance; Go to Board / Verify Account — без gateway.

### 2.3 CAB-06 Contribution (Receipts / Records / Reputation)
| Нужно | Реальность | Статус |
|-------|-----------|--------|
| Story Receipts (A) | — | ❌ **Deferred** [GW-CAB-03](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/cabinet-api/STORY-GW-CAB-03-contribution-layer-api.md) |
| Contribution Records (B) | — | ❌ **Deferred** GW-CAB-03 |
| Reputation (C) | — | ❌ post-MVP by design |

> **Вывод CAB-06:** contribution API отсутствует. FE = UI + `cabinet.common.comingSoon` (весь слой, не только Reputation).

---

## §3. POST-MVP / stubs

### 3.1 CAB-05 Wallet — 🚫 POST-MVP (MVP = stub)
Нет wallet-полей в `/me`/gateway. MVP: State A «not linked»; клик → `cabinet.common.comingSoon`.

### 3.2 CAB-06 Reputation + receipts/records live data
Reputation — post-MVP. Receipts/Records live — после GW-CAB-03 / web3. В MVP FE — stub UI.

---

## §4. Сводная матрица (MVP) — verified 2026-07-25

| Стори | Данные/endpoint | Бекенд | Backend status | FE MVP (2026-07-25) | Scope |
|-------|-----------------|--------|----------------|---------------------|-------|
| CAB-01 | `GET /me` (сессия) | identity | ✅ | **live** | MVP |
| CAB-02 | `display_name`, `role`, `email`, `created_at`, `account_status` | identity | ✅ 3/3 | **Done** (`pkg-000029`) | MVP |
| CAB-03 | `phone_verified*`, `phone_dial_prefix` | identity | ✅ | **live** CivicStatusCard | MVP |
| CAB-04 | `GET /story-activity` | gateway | ✅ GW-CAB-01 | **UI only, no HTTP**; Coming soon на data-affordance; Go to Board / Verify — ок | MVP |
| CAB-04 | `GET /story-drafts/current` | gateway | ✅ GW-CAB-02 | **UI only, no HTTP** (Resume → Coming soon until wiring) | MVP |
| CAB-05 | wallet_* | — | ❌ | **stub + Coming soon** | 🚫 POST-MVP |
| CAB-06 | receipts / records | gateway | ❌ Deferred GW-CAB-03 | **UI only + Coming soon** | MVP UI / API post |
| CAB-06 | reputation | — | ❌ | **stub + Coming soon** | 🚫 POST-MVP |
| CAB-07 | profile load = `/me` | identity | ✅ | **live** M22/M23 | MVP |

---

## §5. Итог для планирования

- **Identity = go:** CAB-01, CAB-03, CAB-07 live на `/me`; CAB-02 Done.
- **Gateway story-activity/drafts = backend ready; SPA wiring later** (оператор 2026-07-25).
- **Gateway contribution = Deferred** (GW-CAB-03) — не блокирует старт FE волны.
- **FE order:** CAB-01 shell → CAB-03 → stubs CAB-04/05/06 → CAB-07.
- Клик data-affordance на stubs → `cabinet.common.comingSoon` («This feature is coming soon»).

## §6. Readiness gate (запуск cabinet FE)

| Gate | Verdict |
|------|---------|
| **Go now** | CAB-01 shell — identity ready; CAB-02 Done |
| **Go next (identity)** | CAB-03, CAB-07 |
| **Go UI-stub (no GW HTTP)** | CAB-04, CAB-05, CAB-06 |
| **Blocked only on** | live contribution data (post GW-CAB-03 / web3) — **не** блокирует старт |
| **Не блокер** | G4 / G7 / G8, ID-13 (параллельные пакеты) |

*Verified 2026-07-25: identity `me_response.py` + gateway API_REFERENCE / cabinet-api INDEX. Реализация runtime не в этом файле.*
