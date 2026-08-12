# STORY-SPA-G1 — Выравнивание пути Gateway API (foundation пакета search-and-filters)

> **📍 SEARCH-00a — фундамент пакета (состыковка с реальным API).** Перенесена в пакет [search-and-filters](README.md) и поставлена **первой**: это базовое соединение SPA↔gateway, без которого `GFL-DRIVEN` не получает реальные issues. **✅ Уже исполнено** (pkg-000001, 2026-06-12) — фундамент на месте; остальное в пакете строится поверх.

## Meta

- **Key:** `STORY-SPA-G1-gateway-endpoint-alignment`
- **Status:** ✅ Done (pkg-000001, 2026-06-12)
- **Роль в пакете:** SEARCH-00a — real-API connection (предшествует [SEARCH-01](STORY-SPA-SEARCH-01-vocabulary-alignment.md))
- **Gap:** G1 (High)
- **Источник:** [spa-app-doc-code-gap-report.md](../../../analysis/spa-app-doc-code-gap-report.md) §G1
- **Зависит от:** —
- **Pipeline-копия (исполнялась):** [epics/EPIC-DASH-01/…/STORY-SPA-G1](../../epics/EPIC-DASH-01-dashboard-read-side-cutover/stories/STORY-SPA-G1-gateway-endpoint-alignment/STORY-SPA-G1-gateway-endpoint-alignment.md)

## Зачем простыми словами

В режиме `GFL-DRIVEN` SPA читает обращения с бэкенда gateway. Документация и сам gateway используют путь `/tallinn/issues`, а код SPA **до этой story** запрашивал несуществующий `/demo-tallinn/issues`. Story привела код к канону gateway; адрес сервера задаётся через `VITE_GATEWAY_BASE_URL` в `.env`. **(Исполнено, 2026-06-12: код = `/tallinn/issues`.)**

## Scope

- [src/repositories/GatewayIssueRepository.js](../../../../src/repositories/GatewayIssueRepository.js): `/demo-tallinn/issues` → `/tallinn/issues` (list и get by id).
- [src/repositories/__tests__/GatewayIssueRepository.test.js](../../../../src/repositories/__tests__/GatewayIssueRepository.test.js): обновить ожидания URL.
- Убедиться, что `VITE_GATEWAY_BASE_URL` остаётся единственным способом задать хост (localhost/staging/prod).

## Вне scope

- Изменение gateway API.
- Новые env-переменные для path prefix.

## Связь с пакетом search-and-filters

- **Поверх G1** работают серверные фильтры: список/детали issues приходят с `GET {VITE_GATEWAY_BASE_URL}/tallinn/issues[/{id}]`.
- Параметры фильтров и их словарный канон — см. [G3 §1–8 (контракт)](STORY-SPA-G3-search-input-toolbar.md) и [SEARCH-01](STORY-SPA-SEARCH-01-vocabulary-alignment.md).

## Documentation touchpoints (исполнено при закрытии)

| Файл | Что было | После Done |
|------|----------|------------|
| [technical-architecture.md](../../../technical-architecture.md) | Пометка «код на demo-tallinn» | Убрана; подтверждён `GET {VITE_GATEWAY_BASE_URL}/tallinn/issues` |
| [domain-facade-contract.md](../../../domain-facade-contract.md) | Пометка gap G1 | Убрана; read-flow синхронизирован |
| [reality-mode-data-source-switch.md](../../../analysis/reality-mode-data-source-switch.md) | Пометка gap G1 | Убрана; ссылка на [gateway API_REFERENCE §7](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md) |
| [gap-report](../../../analysis/spa-app-doc-code-gap-report.md) §5 | G1 open | G1 ✅ |
| [INDEX.md](../INDEX.md) | Todo | Done (в пакете search-and-filters) |

## Acceptance Criteria

- [x] `GatewayIssueRepository` вызывает `GET /tallinn/issues` и `GET /tallinn/issues/{id}` относительно `VITE_GATEWAY_BASE_URL`.
- [x] Unit-тесты проходят с новым путём.
- [x] Документация touchpoints обновлена; пометки «не выполнено» сняты.
- [x] `npm test` в `spa-app` — green.
