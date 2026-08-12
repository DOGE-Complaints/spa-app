# STORY-SPA-G1 — Выравнивание пути Gateway API

## Meta

- **Key:** `STORY-SPA-G1-gateway-endpoint-alignment`
- **Parent Epic:** [`../../../../EPIC-DASH-01-dashboard-read-side-cutover.md`](../../../../EPIC-DASH-01-dashboard-read-side-cutover.md)
- **Status:** Done (pkg-000001, 2026-06-12)
- **Gap:** G1 (High)
- **source:** [`spa-app/docs/tasks/backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md`](../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md)
- **Decision Ref:** [`../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md`](../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md); [spa-app-doc-code-gap-report.md](../../../../../../analysis/spa-app-doc-code-gap-report.md) §G1
- **Источник:** [spa-app-doc-code-gap-report.md](../../../../../../analysis/spa-app-doc-code-gap-report.md) §G1
- **Зависит от:** —

## Зачем простыми словами

В режиме `GFL-DRIVEN` SPA читает обращения с бекенда gateway. Документация и сам gateway используют путь `/tallinn/issues`, а код SPA **до этой story** запрашивал несуществующий `/demo-tallinn/issues`. Story привела код к канону gateway; адрес сервера задаётся через `VITE_GATEWAY_BASE_URL` в `.env`. **(Исполнено, 2026-06-12: код = `/tallinn/issues`.)**

## Scope

- [src/repositories/GatewayIssueRepository.js](../../../../../../../src/repositories/GatewayIssueRepository.js): `/demo-tallinn/issues` → `/tallinn/issues` (list и get by id).
- [src/repositories/__tests__/GatewayIssueRepository.test.js](../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js): обновить ожидания URL.
- Убедиться, что `VITE_GATEWAY_BASE_URL` остаётся единственным способом задать хост (localhost/staging/prod).

## Вне scope

- Изменение gateway API.
- Новые env-переменные для path prefix.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [technical-architecture.md](../../../../../../technical-architecture.md) | Пометка «код на demo-tallinn» | Убрать пометку; подтвердить `GET {VITE_GATEWAY_BASE_URL}/tallinn/issues` |
| [domain-facade-contract.md](../../../../../../domain-facade-contract.md) | Пометка gap G1 | Убрать; синхронизировать read-flow |
| [reality-mode-data-source-switch.md](../../../../../../analysis/reality-mode-data-source-switch.md) | Пометка gap G1 | Убрать; ссылка на [gateway API_REFERENCE §7](../../../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md) |
| [gap-report](../../../../../../analysis/spa-app-doc-code-gap-report.md) §5 | G1 open | G1 ✅ |
| [INDEX.md](../../../../../../backlog-stories/INDEX.md) | Status Todo | Status Done |

## Точки в коде (после P3, 2026-06-12)

- [`GatewayIssueRepository.js:51,59`](../../../../../../../src/repositories/GatewayIssueRepository.js) — `${normalizedBaseUrl}/tallinn/issues` (list и get by id).
- [`GatewayIssueRepository.test.js:29,44`](../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) — ожидания `/tallinn/issues`.
- [`issueService.js:31`](../../../../../../../src/services/issueService.js) — `import.meta.env.VITE_GATEWAY_BASE_URL`.
- [`GatewayIssueRepository.js:5`](../../../../../../../src/repositories/GatewayIssueRepository.js) — ошибка при пустом `VITE_GATEWAY_BASE_URL`.
- Gateway канон: [`asgi_app.py:322,364`](../../../../../../../doge-complaints-gateway/src/core/api/asgi_app.py) — `GET /tallinn/issues`, `GET /tallinn/issues/{issue_id}`.

## Acceptance Criteria

- [x] `GatewayIssueRepository` вызывает `GET /tallinn/issues` и `GET /tallinn/issues/{id}` относительно `VITE_GATEWAY_BASE_URL`.
- [x] Unit-тесты проходят с новым путём.
- [x] Документация touchpoints обновлена; пометки «не выполнено» сняты.
- [x] `npm test` в `spa-app` — green.

## Nested tasks

| Order | Task folder | Wave |
|---|---|---|
| 1 | [`task-dash-g1-t01-fix-gateway-repository-endpoint-path`](./task-dash-g1-t01-fix-gateway-repository-endpoint-path/README.md) | pkg-000001 |
| 2 | [`task-dash-g1-t02-update-gateway-repository-tests`](./task-dash-g1-t02-update-gateway-repository-tests/README.md) | pkg-000001 |
| 3 | [`task-dash-g1-t03-verify-gateway-base-url-env-contract`](./task-dash-g1-t03-verify-gateway-base-url-env-contract/README.md) | pkg-000001 |
| 4 | [`task-dash-g1-t04-sync-doc-touchpoints-g1`](./task-dash-g1-t04-sync-doc-touchpoints-g1/README.md) | pkg-000001 |
| 5 | [`task-dash-g1-t05-story-acceptance-verification`](./task-dash-g1-t05-story-acceptance-verification/README.md) | pkg-000001 |
