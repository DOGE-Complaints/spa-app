# EPIC-SPA-13 — Semantic Schema Runtime (board overlay + map)

> **ID:** `EPIC-SPA-13` · **Статус:** In Progress · Wave 0 SSR-01 **Done** (`pkg-000074`) · Wave 1 SSR-02 **Done** (`pkg-000075`) · Wave 2–3 SSR-03 **Done** (`pkg-000076` P3 2026-09-02)  
> **Тип:** Product / UX  
> **source:** [`../../backlog-stories/semantic-schema-runtime/INDEX.md`](../../backlog-stories/semantic-schema-runtime/INDEX.md)  
> **Prerequisite:** PH-04 board feed Done · ADMIN-SSR-01…05 Done · REQ-16 Accepted · gateway REQ-51 `schema_card`+`geo` · [ADR-SSR-03](../../backlog-stories/semantic-schema-runtime/ADR-SSR-03-map-library.md) map lock  
> **Admin:** [ADMIN-SSR-06](../../backlog-stories/semantic-schema-runtime/ADMIN-SSR-06-tech-decomposition.md)

---

## Назначение

На публичном `/board` и Issue detail:

1. **Consume** public Issue sidecars `schema_card` + `geo` (Wave 0)
2. **Overlay** named leaves on Issue card + detail when `schema_card` non-empty (Wave 1 / M141)
3. **List | map** toggle of the current Issues resultset with MapLibre pins (Wave 2 / M142 / ADR)
4. **Regression:** PH-04 filtered-empty + ES-05 continuum unchanged (Wave 3 / SSR-03 T06)

Мокапы SSOT: [`docs/UX/mockups/semantic-schema/`](../../../UX/mockups/semantic-schema/) M141–M142.

## Prerequisites (verified at scaffold)

| Prerequisite | Status |
|--------------|--------|
| PH-04 board feed host | Done (`pkg-000048`) |
| `GET /node/issues` in spa | Done — [`GatewayIssueRepository.js:77`](../../../src/repositories/GatewayIssueRepository.js) |
| Gateway `schema_card` + `geo` | Sibling [REQ-51](../../../../doge-complaints-gateway/docs/requirements/51-semantic-schema-runtime.md) · GW-SSR-11 / [GW-SSR-30](../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-30-tallinn-card-fields-spa-overlay-readiness.md) |
| ES / Early Signal on `/board` | Done — do not mix with Issue overlay |
| Map library | **Locked** — [ADR-SSR-03-map-library.md](../../backlog-stories/semantic-schema-runtime/ADR-SSR-03-map-library.md) |

## Состав

| Story | Тема | Wave | Mockup / ADR | Pipeline | Backlog |
|-------|------|------|--------------|----------|---------|
| SSR-01 | Issue public shape consume | 0 | api-req §2 | [pipeline](stories/STORY-SPA-SSR-01-issue-public-shape-consume/STORY-SPA-SSR-01-issue-public-shape-consume.md) | [backlog](../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-01-issue-public-shape-consume.md) |
| SSR-02 | Schema card overlay | 1 | M141 | [pipeline](stories/STORY-SPA-SSR-02-schema-card-overlay/STORY-SPA-SSR-02-schema-card-overlay.md) | [backlog](../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-02-schema-card-overlay.md) |
| SSR-03 | Board list \| map | 2–3 | M142 + ADR | [pipeline](stories/STORY-SPA-SSR-03-board-list-map-toggle/STORY-SPA-SSR-03-board-list-map-toggle.md) | [backlog](../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-03-board-list-map-toggle.md) |

## Порядок волн

```
Wave 0: SSR-01 (typedef + repository pass-through)
Wave 1: SSR-02 overlay (after Wave 0 recommended)
Wave 2: SSR-03 map (T00 MapLibre ADR → toggle → pins); may ∥ SSR-02 after Wave 0
Wave 3: Regression glue = SSR-03 T06 (PH-04 / ES-05) — no SSR-04 story
```

## Cross-epic references

| Epic / Story | Relation |
|--------------|----------|
| [EPIC-SPA-09](../EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) | PH-04 feed host |
| [EPIC-SPA-12](../EPIC-SPA-12-early-signal-dashboard/EPIC-SPA-12-early-signal-dashboard.md) | ES-05 continuum — do not break |
| [EPIC-SPA-03](../EPIC-SPA-03-search-and-filters/EPIC-SPA-03-search-and-filters.md) | SEARCH GeoFilter URL keys |
| Gateway REQ-51 / GW-SSR-30 | Public Issue wire + tallinn `card_fields` |

## Локализация (L10N)

- **SSOT:** §«Тексты и переводы» in SSR-02 / SSR-03 backlog
- **Namespace:** `schemaRuntime.*` (`cardField.*`, `overlay.*`, `map.*`)
- **Glue:** i18n key = dotted-path from `schema_card` (1:1)
- **Forbidden:** invent overlay keys; `admin_*` on public Issue; pack.json in browser

## Map (ADR)

[ADR-SSR-03-map-library.md](../../backlog-stories/semantic-schema-runtime/ADR-SSR-03-map-library.md) D1–D8: MapLibre GL + free dark vector · light client cluster · pin popup→open · cluster=zoom · `fitBounds` · no paid key. SSR-03 **T00** implements ADR.

## Вне scope эпика

- New gateway endpoints / bbox invent / `GET /schema-active`
- Pack.json / clustering-knob UI; `structured_payload` dump
- Mapbox / Google Maps; Early Signal Emerging as Issue overlay
- Icon PNG generation execute; bullrun/`pkg-*` activate; `spa-mvp-dashboard` rollup (operator separate)
