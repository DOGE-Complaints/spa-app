# EPIC-SPA-05 — Security hardening фронта (Supabase-креды + гигиена)

> **ID:** `EPIC-SPA-05` · **Статус:** In Progress (SEC-03 Done pkg-000015; SEC-02 next Deferred)
> **Тип:** Сквозной (security/NFR)
> **source:** [`../../backlog-stories/security-hardening/EPIC-SPA-SEC.md`](../../backlog-stories/security-hardening/EPIC-SPA-SEC.md)
> **Источник:** [`identity-supabase-frontend-split-2026-06-16.md`](../../../analysis/identity-supabase-frontend-split-2026-06-16.md) §6 + [`identity-auth-target-vs-current-gap-2026-06-27.md`](../../../analysis/identity-auth-target-vs-current-gap-2026-06-27.md) §4.
> **Заметка:** стори набросаны **с позиции identity-интеграции** (как я вижу со своей стороны). Детали реализации (компоненты/тесты spa) — доработать в фокусной spa-сессии.
> **Active pkg:** `pkg-000015` → [STORY-SPA-SEC-03-remove-debug-instrumentation](./stories/STORY-SPA-SEC-03-remove-debug-instrumentation/STORY-SPA-SEC-03-remove-debug-instrumentation.md)

---

## Назначение
Закрыть **острые security/гигиена-проблемы** браузерного слоя авторизации, найденные при валидации состыковки spa-app ↔ Supabase ↔ identity. Это не про новые экраны (кабинет S2–S7 — отдельный плановый фронт, **не** входит сюда), а про то, чтобы **привилегированный секрет не утекал в браузер** и чтобы в проде не было debug-инструментации.

## Контекст
- Разделение Supabase↔identity — by design (Supabase = login/сессия; identity = civic-верификация + OAuth для GPT + introspection). См. split-doc §10.
- Anon-key + URL в браузере — **публичны by design** (защищены RLS), это **не** дыра; острое — только `service_role` и debug-код.

## Состав
| Story | Тема | Severity | Парная identity-стори |
|-------|------|----------|------------------------|
| [STORY-SPA-SEC-01](./stories/STORY-SPA-SEC-01-remove-service-role-from-frontend/STORY-SPA-SEC-01-remove-service-role-from-frontend.md) | Убрать `VITE_SUPABASE_SERVICE_ROLE` из фронт-env/bundle (anon-only) + ротация | 🔴 CRITICAL | [SEC-04](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md) |
| [STORY-SPA-SEC-02](../../backlog-stories/security-hardening/STORY-SPA-SEC-02-supabase-credential-boundary.md) | Решение по credential-boundary (anon-public vs identity-BFF) + anon/RLS hardening | 🟡 decision | [SEC-05](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-05-auth-credential-model-adr.md) |
| [STORY-SPA-SEC-03](../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md) | Удалить debug-ingest инструментацию из `src/` | 🔴 hygiene | — (spa-only) |

## Порядок
**SPA-SEC-01** (CRITICAL, сразу) → **SPA-SEC-03** (быстрая чистка) → **SPA-SEC-02** (решение/ADR, парно с identity SEC-05).

## Связь
Парные identity-стори — в [`EPIC-IDS-SEC`](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/EPIC-IDS-SEC.md). Парадигма разделения — split-doc §10.

## Pipeline stories (nested)

| Story | Backlog source | Status | Pkg / Wave |
|-------|----------------|--------|------------|
| [STORY-SPA-SEC-01-remove-service-role-from-frontend](./stories/STORY-SPA-SEC-01-remove-service-role-from-frontend/STORY-SPA-SEC-01-remove-service-role-from-frontend.md) | [backlog SEC-01](../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md) | Done (pkg-000014, 2026-06-27) | pkg-000014 |
| STORY-SPA-SEC-02 | [backlog SEC-02](../../backlog-stories/security-hardening/STORY-SPA-SEC-02-supabase-credential-boundary.md) | Deferred | — |
| [STORY-SPA-SEC-03-remove-debug-instrumentation](./stories/STORY-SPA-SEC-03-remove-debug-instrumentation/STORY-SPA-SEC-03-remove-debug-instrumentation.md) | [backlog SEC-03](../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md) | Done (pkg-000015, 2026-06-28) | pkg-000015 |

## Cross-epic references

| Epic | Status | Relation |
|------|--------|----------|
| [EPIC-SPA-04](../EPIC-SPA-04-identity-and-auth/EPIC-SPA-04-identity-and-auth.md) | ID-01 Done (pkg-000013) | Auth layer introduced Supabase env contract |
| [EPIC-IDS-SEC](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/EPIC-IDS-SEC.md) | In Progress | Pair SEC-04 rotation sync |
