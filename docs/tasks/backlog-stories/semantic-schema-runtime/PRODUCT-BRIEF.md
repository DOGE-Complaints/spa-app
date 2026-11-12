# Semantic Schema Runtime — SPA compatibility — Product Brief

> **Источник:** [REQ-16](../../../requirements/16-semantic-schema-spa-compatibility.md)  
> **Статус:** locked для ADMIN-SSR-01…06 (REQ Status: Draft — awaiting PA.2)  
> **Пакет:** [INDEX.md](INDEX.md)  
> **Parent:** `docs/requirements backlog/REQ3-Semantic-Schema-Runtime-and-Node-Specific-Data-Processing.md` · parent-id `req3-semantic-schema-runtime` · SPA-001…004, REQ3-AC-017, §30  
> **Siblings:** [gateway 51](../../../../../doge-complaints-gateway/docs/requirements/51-semantic-schema-runtime.md) (`GET /node/issues`, optional `schema_card`, Issue.`geo`) · [identity 20](../../../../../doge-identity-service/docs/requirements/20-semantic-schema-identity-boundary.md) (none named SPA↔identity for schema) · [GPT REQ-45](../../../../../GPT%20UI/docs/requirements/REQ-45-semantic-schema-intake-envelope-compatibility.md) (intake → gateway → Issues; not board)  
> **Verified baseline (код):** Issues list `GET {base}/node/issues` ([`GatewayIssueRepository.js:77`](../../../../src/repositories/GatewayIssueRepository.js)); `/` → `/board` ([`App.jsx:24–25`](../../../../src/App.jsx)); `IssueCard` civic fields ([`IssueCard.jsx:39–80`](../../../../src/components/IssueCard/IssueCard.jsx)); `IssuePage` civic details, no `schema_card`/`geo` ([`IssuePage.jsx:85–116`](../../../../src/pages/IssuePage.jsx)); `Issue` typedef без `geo`/`schema_card` ([`types.js:55–68`](../../../../src/domain/types.js)); spa `src/` `schema_card`/`structured_payload` **0** (grep); map deps **0** ([`package.json`](../../../../package.json) L73–78); `GeoFilter` admin keys ([`GeoFilter.jsx`](../../../../src/components/Filters/GeoFilter.jsx) + [`geoAdminFilterKeys.js:4–18`](../../../../src/i18n/geoAdminFilterKeys.js)); bbox future-only ([`boardQuery.js:9`](../../../../src/router/boardQuery.js)). Gateway public shape: optional `schema_card` ([`dto.py:57–58`](../../../../../doge-complaints-gateway/src/core/projection/dto.py)); `geo.lat`/`lon`/`label`/`district`/`settlement`/`region`/`country` when both lat+lon ([`mapper.py:28–42`](../../../../../doge-complaints-gateway/src/core/projection/mapper.py), REQ-51 §3).

## Решения (locked)

| # | Тема | Решение |
|---|------|---------|
| 1 | Host | Public board **`/board`** only — architecture overlay, not a new dashboard epic (AC-SPA-REQ3-17) |
| 2 | Cards | Civic Issue остаётся базой; overlay **только** named leaves из `schema_card`; отсутствие sidecar = civic-only |
| 3 | Payload | **Не** показывать `structured_payload` / raw node payload / street depth, если лист не в `schema_card` (SPA-003, SEC-004) |
| 4 | Authority | SPA **не** schema validator; client assistive only (SPA-001/002) |
| 5 | Map | list\|map на **том же** resultset; toggle eligible iff ≥1 Issue с `geo.lat` **и** `geo.lon` (numbers); pins только с обеими coords |
| 6 | HTTP | Только существующий `GET /node/issues` (+ existing query keys). **Нет** `GET /schema-active` / pack.json / clustering-knob UI |
| 7 | Filters | Existing `GeoFilter` admin dimensions remain; map does not replace them |
| 8 | ES | Не трогать Early Signal / Emerging cards (spa 15) |
| 9 | i18n | et / ru / en для новых chrome-строк (toggle, overlay labels, map empty/ineligible) |
| 10 | Gateway naming SSOT | Public Issue JSON = эталон для SPA (`schema_card` keys, `geo.*` keys). SPA **не** переименовывает поля на Issue (не invent `admin_*` на public wire) |
| 11 | L10N glue | Подписи overlay-полей: i18n key = **тот же dotted-path**, что ключ в `schema_card` (из pack `card_fields`). Значения — из JSON; подписи — из словаря по тому же id (см. ADMIN-SSR-05) |
| 12 | Overlay surfaces | Compact **Issue card** в списке **и** **Issue detail** page — оба |

## Вне scope

- Schema Runtime / `story_dimensions` в spa
- Full dynamic form/preview builder (§30)
- Four node-specific product dashboards
- Story submit forms (GPT REQ-45)
- Invented schema-metadata HTTP
- Reading pack.json / `geo_intake` / `node_clustering` in the browser
- Clustering knobs in SPA UI
- Product choice of map library in this brief (REQ §6 Q2 → after mockups)
- Inventing overlay field names (gateway `schema_card` keys only)

## Planned stories

| Key | orientation | Status at materialize |
|-----|-------------|------------------------|
| STORY-SPA-SSR-01-issue-public-shape-consume | tech_first | Todo |
| STORY-SPA-SSR-02-schema-card-overlay | ui_first | Draft · Blocked-on ADMIN-02 |
| STORY-SPA-SSR-03-board-list-map-toggle | ui_first | Draft · Blocked-on ADMIN-02 |

## Mockup table (ADMIN-SSR-02 SSOT)

Целевая папка (факт intake): [`docs/UX/mockups/semantic-schema/`](../../../UX/mockups/semantic-schema/) — не `semantic-schema-runtime/`. Indexer: [README.md](../../../UX/mockups/semantic-schema/README.md).

| Artboard | Mockup | Future story | Spec | PNG |
|----------|--------|--------------|------|-----|
| SSR-C | M141 | STORY-SPA-SSR-02 | [mockup-141-…-spec.md](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md) | [PNG](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png) |
| SSR-M | M142 | STORY-SPA-SSR-03 | [mockup-142-…-spec.md](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md) | [PNG](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.png) |
