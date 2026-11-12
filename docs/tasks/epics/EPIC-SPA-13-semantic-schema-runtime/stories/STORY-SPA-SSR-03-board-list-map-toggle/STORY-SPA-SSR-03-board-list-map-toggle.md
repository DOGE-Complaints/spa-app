# STORY-SPA-SSR-03-board-list-map-toggle — Board list | map toggle

## Meta (pipeline)

- **Key:** `STORY-SPA-SSR-03-board-list-map-toggle`
- **Parent Epic:** [`../../EPIC-SPA-13-semantic-schema-runtime.md`](../../EPIC-SPA-13-semantic-schema-runtime.md)
- **Epic:** EPIC-SPA-13 Semantic Schema Runtime · **Wave 2–3**
- **Status:** Done
- **Severity:** HIGH
- **orientation:** ui_first
- **source:** [`../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-03-board-list-map-toggle.md`](../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-03-board-list-map-toggle.md)
- **decision_ref:** backlog + [M142](../../../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md) + [ADR-SSR-03](../../../../backlog-stories/semantic-schema-runtime/ADR-SSR-03-map-library.md) + [ARCHITECTURE-SSR-03](../../../../backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md) + [api-req §2.2](../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-api-requirements.md) + [icons](../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-icon-assets.md)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md`
- **Depends on:** SSR-01 `geo` · PH-04 · M142 · ADR D1–D8

```text
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.png
```

## Зачем

List | map of the **current** Issues resultset; pins only when `geo.lat`+`geo.lon`; MapLibre per ADR.

## Субтаски (pipeline)

| Таск | Folder | Суть |
|------|--------|------|
| **T00** | [task-spa-ssr-03-t00-maplibre-adr-spike](./task-spa-ssr-03-t00-maplibre-adr-spike/README.md) | MapLibre deps + style + cluster spike (ADR) |
| **T01** | [task-spa-ssr-03-t01-list-map-toggle-eligibility](./task-spa-ssr-03-t01-list-map-toggle-eligibility/README.md) | Toggle chrome + eligibility |
| **T02** | [task-spa-ssr-03-t02-map-pins-cluster-popup](./task-spa-ssr-03-t02-map-pins-cluster-popup/README.md) | Pins · cluster zoom · popup→open · **ui_anchor** |
| **T03** | [task-spa-ssr-03-t03-list-full-resultset](./task-spa-ssr-03-t03-list-full-resultset/README.md) | List = full resultset |
| **T04** | [task-spa-ssr-03-t04-preserve-geofilter-url](./task-spa-ssr-03-t04-preserve-geofilter-url/README.md) | GeoFilter + URL keys |
| **T05** | [task-spa-ssr-03-t05-vitest-story-gate-ssr-03](./task-spa-ssr-03-t05-vitest-story-gate-ssr-03/README.md) | Vitest + story gate |
| **T06** | [task-spa-ssr-03-t06-ph04-es05-regression](./task-spa-ssr-03-t06-ph04-es05-regression/README.md) | PH-04 / ES-05 regression (Wave 3) |

## Вне scope

Overlay (SSR-02) · bbox invent · pack UI · Mapbox/Google · spider cluster list
