# STORY-SPA-SSR-03 — Board list | map toggle

## Meta

- **Key:** `STORY-SPA-SSR-03-board-list-map-toggle`
- **Epic:** [EPIC-SPA-13](../../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md) · [pipeline](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/STORY-SPA-SSR-03-board-list-map-toggle.md)
- **Package:** [semantic-schema-runtime/](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [UX-PROMPTS.md](UX-PROMPTS.md) (SSR-M)
- **Status:** Done
- **orientation:** ui_first
- **Severity:** 🔴 HIGH (REQ-16 map mode)
- **Depends on:** [M142](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md); [SSR-01](STORY-SPA-SSR-01-issue-public-shape-consume.md); PH-04 `/board` host; SEARCH-05 GeoFilter; [api-req §2.2 / §3](STORY-SPA-SSR-api-requirements.md); [icon catalog](STORY-SPA-SSR-icon-assets.md)
- **REQ:** [16](../../../requirements/16-semantic-schema-spa-compatibility.md) §4.2, AC-SPA-MAP-01…03

## Артборд (SSOT дизайна)

| Мокап | Artboard | Состояние | Спека (.md) | PNG |
|-------|----------|-----------|-------------|-----|
| **M142** | SSR-M | List \| Map on `/board`; eligible / ineligible / partial pins | [mockup-142-board-list-map-toggle-state-sheet-spec.md](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md) | [PNG](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.png) |

> SSOT folder: [`docs/UX/mockups/semantic-schema/`](../../../UX/mockups/semantic-schema/README.md).

## Зачем простыми словами

На той же доске, с теми же фильтрами, пользователь переключается между списком и картой. Карта показывает только Issues с координатами; список — полный resultset.

## Текущее состояние (As-of-Done · P3 `pkg-000076` 2026-09-02)

- `/board` host — PH-04 Done
- Map UI — **Done**: `ListMapToggle` + `BoardIssuesMap` + thin `MapLibreMap` ([`src/components/map/`](../../../../src/components/map/))
- Map dep — `maplibre-gl` ^4.7.1 in [`package.json`](../../../../package.json); free dark Carto vector style (ADR D1/D3)
- Public `geo.lat`/`lon` — consumed for pin eligibility ([`issueGeo.js`](../../../../src/map/issueGeo.js)); list remains full resultset
- bbox query keys — future-only [`boardQuery.js:9`](../../../../src/router/boardQuery.js) — **OOS** this story (unchanged)
- Public geo shape — [api-req §2.2](STORY-SPA-SSR-api-requirements.md) · [api-req §5](STORY-SPA-SSR-api-requirements.md)

### Historical (pre-map · before P3)

- Map UI / map deps were **0**; `geo` typed (SSR-01) but not rendered on `/board` until this story.

## Функциональные требования (FR)

- **FR-SSR-03.1** On `/board`, control to switch **list** ↔ **map** for the **current** Issues resultset (same filters/query as list).
- **FR-SSR-03.2** Toggle **eligible** (Map enabled) iff current resultset has **≥1** Issue with numeric `geo.lat` **and** `geo.lon` (AC-SPA-MAP-01). When ineligible: Map **disabled** + helper copy; do not open empty enabled map (M142 SSR-M-ineligible).
- **FR-SSR-03.3** Map **pins** = Issues with both coords only; Issues without coords appear in list, not on map (AC-SPA-MAP-02).
- **FR-SSR-03.4** List view always shows **full** current resultset.
- **FR-SSR-03.5** Existing GeoFilter + URL admin geo query keys unchanged ([`geoAdminFilterKeys.js`](../../../../src/i18n/geoAdminFilterKeys.js)).
- **FR-SSR-03.6** Read public `issue.geo.*` keys only — `lat`, `lon`, `label`, `district`, `settlement`, `region`, `country`, optional `detail_level` — **not** `admin_*` on Issue wire ([api-req §2.2](STORY-SPA-SSR-api-requirements.md)). Pin eligibility = **lat+lon only** (`detail_level` not sufficient).
- **FR-SSR-03.7** No pack.json / clustering-knob UI (AC-SPA-MAP-03).
- **FR-SSR-03.8** No new gateway endpoint for map.
- **FR-SSR-03.9** Toggle is **not** icon-only: text labels «List»/«Map» required beside glyphs (catalog a11y).
- **FR-SSR-03.L10N** Namespace `schemaRuntime.map.*` — below. EN — канон M142.

## Субтаски

| Таск | Суть | Швы |
|------|------|-----|
| **[T00](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/task-spa-ssr-03-t00-maplibre-adr-spike/README.md)** | MapLibre spike per ADR + [Architecture](ARCHITECTURE-SSR-03-board-map-pins.md) | `package.json` · map wrapper |
| **[T01](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/task-spa-ssr-03-t01-list-map-toggle-eligibility/README.md)** | List\|Map toggle + eligibility | `BoardPage.jsx` |
| **[T02](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/task-spa-ssr-03-t02-map-pins-cluster-popup/README.md)** | Pins · cluster zoom · popup→open (M142 ui_anchor) | `BoardIssuesMap` · MapLibre |
| **[T03](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/task-spa-ssr-03-t03-list-full-resultset/README.md)** | List = full resultset | `BoardPage.jsx` feed |
| **[T04](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/task-spa-ssr-03-t04-preserve-geofilter-url/README.md)** | Preserve GeoFilter + URL keys | filters · `boardQuery` |
| **[T05](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/task-spa-ssr-03-t05-vitest-story-gate-ssr-03/README.md)** | Vitest + story gate SSR-03 | `__tests__` |
| **[T06](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/task-spa-ssr-03-t06-ph04-es05-regression/README.md)** | PH-04 / ES-05 regression (Wave 3) | `BoardPage.jsx` |

> Pipeline mirror: [STORY-SPA-SSR-03 (epic)](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/STORY-SPA-SSR-03-board-list-map-toggle.md) · Map assemble: [ARCHITECTURE-SSR-03-board-map-pins.md](ARCHITECTURE-SSR-03-board-map-pins.md)

## Иконки (из каталога)

> Источник: [STORY-SPA-SSR-icon-assets.md](STORY-SPA-SSR-icon-assets.md). PNG ON DISK.

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| List view segment | `ic-view-list.png` | `/icons/semantic-schema-runtime/ic-view-list.png` | NEW #1 |
| Map view segment | `ic-view-map.png` | `/icons/semantic-schema-runtime/ic-view-map.png` | NEW #2 |
| Issue map pin | `ic-map-pin.png` | `/icons/semantic-schema-runtime/ic-map-pin.png` | NEW #3 (#F5A623) |
| Map ineligible helper | `ic-info.png` | `/icons/story-handoff/ic-info.png` | Reuse |
| Search toolbar | `ic-search.png` | `/icons/identity/ic-search.png` | Reuse |
| Load error | `ic-cloud-error.png` | `/icons/story-handoff/ic-cloud-error.png` | Reuse |
| Retry | `ic-auto-resubmit.png` | `/icons/story-handoff/ic-auto-resubmit.png` | Reuse |
| Location meta (card) | `ic-field-location.png` | `/icons/story-handoff/ic-field-location.png` | Reuse — ≠ map pin |

## Routes / API

- Same `GET /node/issues` as PH-04 — [api-req §1 / §3 SSR-03](STORY-SPA-SSR-api-requirements.md) — **no map endpoint**
- bbox (`geo_lat_min`/…) — **out of scope** (not Draft AC; invent filter HTTP запрещён)
- Naming: [ADMIN-SSR-04](ADMIN-SSR-04-api-requirements.md)

## Зависимости

- PH-04 board feed · filter panel (SEARCH-02…05)
- SSR-01 `geo` typing
- ES discovery shell — **do not** break zero-Issues / filtered-empty semantics (ES-05)

## Map library ADR + Architecture (SSOT)

| Doc | Role |
|-----|------|
| [ADR-SSR-03-map-library.md](ADR-SSR-03-map-library.md) | Product interview locks D1–D8 (MapLibre, no paid key, popup→open, …) |
| [ARCHITECTURE-SSR-03-board-map-pins.md](ARCHITECTURE-SSR-03-board-map-pins.md) | How to assemble map+pins on `/board` (BoardPage seams, modules, data flow) |

Implements REQ-16 §6 Q2. Execute map tasks **T00 / T01 / T02 / T05** against Architecture; do not re-interview.

## Вне scope

- `schema_card` overlay (SSR-02)
- Pack configuration UI
- Early Signal / Emerging cards
- bbox HTTP filter
- Re-picking map vendor without updating ADR-SSR-03

## Тексты и переводы (en / et / ru)

> EN — канон M142 (toggle + ineligible helper). et/ru — factual.

### `schemaRuntime.map.*`

| key | en | et | ru |
|-----|----|----|----|
| `schemaRuntime.map.toggle.list` | List | Nimekiri | Список |
| `schemaRuntime.map.toggle.map` | Map | Kaart | Карта |
| `schemaRuntime.map.ineligible` | Map unavailable: no Issues in these results have public coordinates. | Kaart pole saadaval: ühelgi teemal selles tulemuses pole avalikke koordinaate. | Карта недоступна: ни у одной темы в этих результатах нет публичных координат. |
| `schemaRuntime.map.emptyPins` | No locations to show on the map for this view | Selle vaate jaoks pole kaardil asukohti | Для этого вида нет точек на карте |
| `schemaRuntime.map.partialHint` | Issues without public coordinates remain available in List view. | Teemad ilma avalike koordinaatideta jäävad Nimekirja vaatesse. | Темы без публичных координат остаются в виде Список. |
| `schemaRuntime.map.pinOpen` | Open issue | Ava teema | Открыть тему |

## Acceptance Criteria

- [x] list\|map toggle on `/board` for current resultset (M142)
- [x] Eligibility = data-driven from `geo.lat`+`geo.lon` count; ineligible = disabled Map + helper
- [x] Pins ⊆ resultset; list = full resultset
- [x] Filters remain functional in both modes
- [x] No pack.json read; no clustering knobs; no bbox invent
- [x] Icons: catalog NEW #1–3 + text labels on toggle
- [x] Links: M142 spec · icon catalog · api-req §2.2 · [ADR-SSR-03](ADR-SSR-03-map-library.md) · [ARCHITECTURE-SSR-03](ARCHITECTURE-SSR-03-board-map-pins.md)
- [x] Map stack matches ADR + Architecture (MapLibre, cluster zoom, popup→open, fitBounds, no paid key)

## Швы

- `BoardPage` · MapLibre map component · `Issue` geo fields · PH-04 loader/error patterns · [ADR-SSR-03](ADR-SSR-03-map-library.md) · [ARCHITECTURE-SSR-03](ARCHITECTURE-SSR-03-board-map-pins.md)
