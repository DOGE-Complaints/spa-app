# EPIC-DASH-01 — Dashboard read-side backend cutover

> **ID:** `EPIC-DASH-01` · **Статус:** In Progress (materialized 2026-06-12)
> **Layer:** spa-app dashboard data-flow — mock layer → gateway read adapter
> **Зависит от:** —
> **Блокирует:** стабильный `GFL-DRIVEN` runtime для BoardPage / IssuePage

---

## 1. Назначение

Перевести read-side SPA с mock-слоя (`FAKE-OLD`) на реальный бекенд `doge-complaints-gateway` (`GFL-DRIVEN`) через `GatewayIssueRepository` и `issueService`, без изменения UI-контракта.

Парадигма-якорь: [reality-mode-data-source-switch.md](../../../analysis/reality-mode-data-source-switch.md), gateway [API_REFERENCE §7](../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md).

---

## 2. Legacy flat tasks (pre-nested pipeline)

| Key | Path | Status |
|-----|------|--------|
| `DASH-P0-01` | [task-dash-p0-01-reality-mode-switch-issue-service/README.md](../../task-dash-p0-01-reality-mode-switch-issue-service/README.md) | Done |
| `DASH-P0-02` | [task-dash-p0-02-gateway-issue-repository/README.md](../../task-dash-p0-02-gateway-issue-repository/README.md) | Done |
| `DASH-P1-01` | [task-dash-p1-01-tests-reality-mode-read-flow/README.md](../../task-dash-p1-01-tests-reality-mode-read-flow/README.md) | In Progress |
| `DASH-P1-02` | [task-dash-p1-02-fix-reality-mode-docs-alignment/README.md](../../task-dash-p1-02-fix-reality-mode-docs-alignment/README.md) | Todo |
| `DASH-P2-01` | [task-dash-p2-01-add-run-reporting-bootstrap/README.md](../../task-dash-p2-01-add-run-reporting-bootstrap/README.md) | Todo |

---

## 3. Pipeline stories (nested)

| Story | Source | Status | Pkg |
|-------|--------|--------|-----|
| [STORY-SPA-G1-gateway-endpoint-alignment](./stories/STORY-SPA-G1-gateway-endpoint-alignment/STORY-SPA-G1-gateway-endpoint-alignment.md) | [backlog STORY-SPA-G1](../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md) | Done (2026-06-12) | pkg-000001 |

---

## 4. Вне scope эпика

- Identity-модуль (`docs/requirements/`)
- Изменение gateway API на стороне `doge-complaints-gateway`
- Doc-gap stories G2–G8 (отдельные P1.3 волны; см. [backlog-stories/INDEX.md](../../backlog-stories/INDEX.md))
