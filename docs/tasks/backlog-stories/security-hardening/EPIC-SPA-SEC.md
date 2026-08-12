# EPIC-SPA-SEC — Security hardening фронта (Supabase-креды + гигиена)

> **Статус:** 🟡 In Progress · **Тип:** Сквозной (security/NFR) · **Создан:** 2026-06-27
> **Источник:** [`identity-supabase-frontend-split-2026-06-16.md`](../../../analysis/identity-supabase-frontend-split-2026-06-16.md) §6 + [`identity-auth-target-vs-current-gap-2026-06-27.md`](../../../analysis/identity-auth-target-vs-current-gap-2026-06-27.md) §4.
> **Заметка:** стори набросаны **с позиции identity-интеграции** (как я вижу со своей стороны). Детали реализации (компоненты/тесты spa) — доработать в фокусной spa-сессии.

## Назначение
Закрыть **острые security/гигиена-проблемы** браузерного слоя авторизации, найденные при валидации состыковки spa-app ↔ Supabase ↔ identity. Это не про новые экраны (кабинет S2–S7 — отдельный плановый фронт, **не** входит сюда), а про то, чтобы **привилегированный секрет не утекал в браузер** и чтобы в проде не было debug-инструментации.

## Контекст
- Разделение Supabase↔identity — by design (Supabase = login/сессия; identity = civic-верификация + OAuth для GPT + introspection). См. split-doc §10.
- Anon-key + URL в браузере — **публичны by design** (защищены RLS), это **не** дыра; острое — только `service_role` и debug-код.

## Состав
| Story | Тема | Severity | Парная identity-стори |
|-------|------|----------|------------------------|
| [STORY-SPA-SEC-01](STORY-SPA-SEC-01-remove-service-role-from-frontend.md) | Убрать `VITE_SUPABASE_SERVICE_ROLE` из фронт-env/bundle (anon-only) + ротация | 🔴 CRITICAL | [SEC-04](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md) |
| [STORY-SPA-SEC-02](STORY-SPA-SEC-02-supabase-credential-boundary.md) | Решение по credential-boundary (anon-public vs identity-BFF) + anon/RLS hardening | 🟡 decision | [SEC-05](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-05-auth-credential-model-adr.md) |
| [STORY-SPA-SEC-03](STORY-SPA-SEC-03-remove-debug-instrumentation.md) | Удалить debug-ingest инструментацию из `src/` | 🔴 hygiene | — (spa-only) |

## Порядок
**SPA-SEC-01** (CRITICAL, сразу) → **SPA-SEC-03** (быстрая чистка) → **SPA-SEC-02** (решение/ADR, парно с identity SEC-05).

## Связь
Парные identity-стори — в [`EPIC-IDS-SEC`](../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/EPIC-IDS-SEC.md). Парадигма разделения — split-doc §10.
