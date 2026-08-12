# EPIC-SPA-03 — Search and filters (UI + filter-API contract)

> **ID:** `EPIC-SPA-03` · **Статус:** Done (planned search-and-filters stories complete, 2026-06-18)
> **Layer:** spa-app BoardPage — client-side search UI, server-side filter contract, future Jira-like filter panel
> **Зависит от:** [EPIC-DASH-01 G1](../EPIC-DASH-01-dashboard-read-side-cutover/EPIC-DASH-01-dashboard-read-side-cutover.md) (gateway read path — Done, pkg-000001)
> **Primary (active):** SEARCH-05 geo filter (`pkg-000012`)

---

## 1. Назначение

Материализовать пакет [search-and-filters](../../backlog-stories/search-and-filters/README.md): foundation контракта фильтр-API (§1–8 в G3) + базовый UI поиска на доске; далее — выравнивание словарей, панель фильтров, institution/date/geo.

Парадигма-якорь: [search-filters-cto-interview-2026-06-15.md](../../../analysis/search-filters-cto-interview-2026-06-15.md), gateway [API_REFERENCE §7](../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md).

---

## 2. Pipeline stories (nested)

| Story | Source | Status | Pkg |
|-------|--------|--------|-----|
| [STORY-SPA-G3-search-input-toolbar](./stories/STORY-SPA-G3-search-input-toolbar/STORY-SPA-G3-search-input-toolbar.md) | [backlog STORY-SPA-G3](../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md) | Done (2026-06-16) | pkg-000007 |
| [STORY-SPA-SEARCH-01-vocabulary-alignment](./stories/STORY-SPA-SEARCH-01-vocabulary-alignment/STORY-SPA-SEARCH-01-vocabulary-alignment.md) | [backlog SEARCH-01](../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-01-vocabulary-alignment.md) | Done (2026-06-17) | pkg-000008 |
| [STORY-SPA-SEARCH-02-filter-panel-shell](./stories/STORY-SPA-SEARCH-02-filter-panel-shell/STORY-SPA-SEARCH-02-filter-panel-shell.md) | [backlog SEARCH-02](../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md) | Done (UI closure 2026-06-17) | pkg-000009 |
| [STORY-SPA-SEARCH-03-cross-language-search-input](./stories/STORY-SPA-SEARCH-03-cross-language-search-input/STORY-SPA-SEARCH-03-cross-language-search-input.md) | [backlog SEARCH-03](../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md) | Done (2026-06-18) | pkg-000010 |
| [STORY-SPA-SEARCH-04-institution-date-filters](./stories/STORY-SPA-SEARCH-04-institution-date-filters/STORY-SPA-SEARCH-04-institution-date-filters.md) | [backlog SEARCH-04](../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md) | Done (2026-06-18) | pkg-000011 |
| [STORY-SPA-SEARCH-05-geo-filter](./stories/STORY-SPA-SEARCH-05-geo-filter/STORY-SPA-SEARCH-05-geo-filter.md) | [backlog SEARCH-05](../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md) | Done (2026-06-18) | pkg-000012 |

---

## 3. Cross-epic references

| Story | Epic | Status |
|-------|------|--------|
| [STORY-SPA-G1-gateway-endpoint-alignment](../EPIC-DASH-01-dashboard-read-side-cutover/stories/STORY-SPA-G1-gateway-endpoint-alignment/STORY-SPA-G1-gateway-endpoint-alignment.md) | EPIC-DASH-01 | Done (pkg-000001) |

---

## 4. Вне scope эпика

- Изменение gateway API на стороне `doge-complaints-gateway`
- Geo bbox (`geo_lat/lon_*`) — future (admin-geo в [SEARCH-05](./stories/STORY-SPA-SEARCH-05-geo-filter/STORY-SPA-SEARCH-05-geo-filter.md), `pkg-000012`)
- Identity-модуль, doc-gap G4/G7/G8
