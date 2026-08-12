# STORY-SPA-SEC-02 — Граница Supabase-кредов в браузере (решение + hardening)

## Meta
- **Key:** `STORY-SPA-SEC-02-supabase-credential-boundary`
- **Epic:** [`EPIC-SPA-SEC`](EPIC-SPA-SEC.md)
- **Status:** 🟢 Решено — **вариант B (identity-BFF)**; spa-scope = переписать клиент на identity (оператор, 2026-06-27)
- **Severity:** 🟡 decision / hardening
- **Источник:** запрос оператора 2026-06-27 «хранить supabase ключ и url на фронте не стоит»; [`split-doc §4.4, §8`](../../../analysis/identity-supabase-frontend-split-2026-06-16.md)
- **Парная identity-стори:** [SEC-05 ADR](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-05-auth-credential-model-adr.md) → реализация [`EPIC-IDS-AUTHBFF`](../../../../../doge-identity-service/docs/tasks/backlog-stories/auth-bff/EPIC-IDS-AUTHBFF.md)

> **🟢 РЕШЕНИЕ (2026-06-27):** вариант **B (identity-BFF)** — браузер **без** Supabase-кредов; SPA логинится через identity (httpOnly-cookie сессия). Контракт → [`auth-bff-proxy-design-2026-06-27.md`](../../../../../doge-identity-service/docs/analysis/auth-bff-proxy-design-2026-06-27.md). **spa-scope сужается до:** убрать прямой `@supabase/supabase-js` Auth ([`supabaseClient.js`](../../../../src/auth/supabaseClient.js), [`LoginPage.jsx`](../../../../src/pages/LoginPage.jsx)), переписать на `fetch(identity, {credentials:'include'})`, `useAuthSession` → `GET /auth/session`; убрать все `VITE_SUPABASE_*` из браузерного `.env`. Детали — в фокусной spa-сессии.

## Зачем простыми словами
После выноса `service_role` (SEC-01) в браузере остаются `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`. **Важно честно:** anon-ключ и URL — **публичны by design** в модели Supabase-SPA (anon защищён RLS, это не секрет). То есть **сами по себе они не дыра**. Но у оператора есть валидный вопрос: «хотим ли мы, чтобы браузер вообще держал какие-либо Supabase-креды?» Есть два пути, и это **архитектурное решение**, а не однозначный фикс. Цель стори — принять решение (совместно с identity [SEC-05](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-05-auth-credential-model-adr.md)) и, что бы ни выбрали, зафиксировать hardening.

## Два варианта (для решения)
- **Вариант A — оставить anon-in-browser (текущий, стандарт Supabase-SPA):** браузер ходит в Supabase Auth напрямую с anon-ключом; identity = resource server. Плюсы: меньше latency, refresh-token не через нас, identity stateless (split-doc §4.4). Минусы: два backend-URL в `.env`, ошибки login выглядят как «DOGEstonia» (split-doc §5).
- **Вариант B — identity-BFF (браузер без Supabase-кредов):** SPA шлёт login/signup на **identity**, который проксирует в Supabase Auth (server-side) и отдаёт сессию. Браузер не держит ни anon-ключ, ни URL Supabase. Плюсы: ноль Supabase-кредов в браузере, единый backend-домен. Минусы: identity получает новый поверхностный слой (login-эндпоинты, refresh, cookie/session) — **сейчас в коде identity этого нет**; рост сложности и latency.

> Решение фиксируется в identity [SEC-05 ADR](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-05-auth-credential-model-adr.md). Эта стори — spa-сторона того же решения.

## Scope
- Принять вариант (A или B) совместно с identity SEC-05; зафиксировать в ADR.
- **Hardening (независимо от выбора):** проверить, что в браузере **только** anon-ключ (никаких иных Supabase-секретов — следствие SEC-01); подтвердить корректность RLS-политик (anon видит только разрешённое); зафиксировать в `04-env-configuration` пометку «anon — публичный, by design».
- Если **B** — снять прямой `@supabase/supabase-js` Auth из браузера, перевести login на identity-proxy (контракт — из SEC-05).

## Вне scope
- Реализация identity-proxy-эндпоинтов (если B) — identity [SEC-05](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-05-auth-credential-model-adr.md).
- Вынос service_role — [SPA-SEC-01](STORY-SPA-SEC-01-remove-service-role-from-frontend.md).

## Acceptance Criteria
- [ ] Зафиксировано решение A/B (ADR, парно с identity SEC-05).
- [ ] Подтверждено: в браузере нет Supabase-секретов кроме anon (если A) ИЛИ нет вообще (если B).
- [ ] RLS-политики проверены: anon-роль не читает чужого/служебного.
- [ ] `04-env-configuration` обновлён: anon — публичный by-design (если A) / browser без Supabase-кредов (если B).

## Парадигма-якорь
[`split-doc §4.4, §8, §10`](../../../analysis/identity-supabase-frontend-split-2026-06-16.md); identity [SEC-05](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-05-auth-credential-model-adr.md).
