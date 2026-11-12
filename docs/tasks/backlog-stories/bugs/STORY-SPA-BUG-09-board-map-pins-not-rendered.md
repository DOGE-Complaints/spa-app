# STORY-SPA-BUG-09 — Board map pins not rendered

> **Структура:** [BUG-STORY-SCHEMA.md](BUG-STORY-SCHEMA.md)

## Meta (bug card)

| Field | Value |
|-------|-------|
| **Key** | `STORY-SPA-BUG-09-board-map-pins-not-rendered` |
| **Type** | Functional · map rendering |
| **Severity** | **P1** (demo Map empty while List has issues) |
| **Status** | **Done** · P3 `pkg-000090` · gate PASS (2026-10-03T15:18:08Z) · P6 gap F1–F3 CLOSED (`2026-10-03T15:25:37Z`) |
| **Route** | `/#/board` → Map |
| **Surface** | Board Map view (`BoardIssuesMap`) |
| **Env** | local-five SPA + gateway (verified 2026-10-03) |
| **Epic** | [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) (**REUSE**) |
| **Pipeline** | [STORY-SPA-BUG-09 pipeline](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-BUG-09-board-map-pins-not-rendered/STORY-SPA-BUG-09-board-map-pins-not-rendered.md) |
| **Package** | [`pkg-000090`](../../spa-active-packages/pkg-000090-20261003-epic-spa-09-bug-09-board-map-pins.yaml) · [bugs/](INDEX.md) |
| **Source** | [analysis-life-sim-local-load-discussions-and-map-2026-10-03.md](../../../../../doge-complaints-gateway/docs/analysis/analysis-life-sim-local-load-discussions-and-map-2026-10-03.md) |
| **Related** | [PH-04 board feed](../public-home/STORY-SPA-PH-04-board-feed-home.md) · [SSR-03 map](../semantic-schema-runtime/STORY-SPA-SSR-03-board-list-map-toggle.md) · Map toggle / pin-capable geo Present |
| **Skill declared (future P3)** | `javascript-pro` @ `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md` · Soft: `react-expert` |
| **Method** | [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc) |
| **Tech arch (in-story)** | §Техническая архитектура ниже · enriched `2026-10-03T14:55:29Z` |

## Symptom

### Historical (pre-fix · intake)

Map view на board открывается, basemap Tallinn виден, в List есть issues, у issues есть pin-capable geo — **маркеры и кластеры на карте не видны**. Demo impact: Map выглядит «пустым», хотя данные для пинов уже есть.

### As-of-Done (P3 · `2026-10-03T15:18:08Z`)

При ≥1 pin-capable issue Map показывает cluster/pin layers (live UI-3 orange cluster **12**). Symptom выше — historical only.

## Expected vs Actual

### Historical (pre-T03)

| | |
|--|--|
| **Expected** | При ≥1 pin-capable issue Map показывает pin и/или cluster на basemap |
| **Actual** | Только basemap; pin/cluster layers не появляются |

### As-of-Done

| | |
|--|--|
| **Expected** | (unchanged) pin/cluster Present when pin-capable ≥1 |
| **Actual** | Cluster **12** Present · source `ssr03-issue-pins` · Promise boot · gate AC-01…05 **PASS** |

## Repro steps

### Historical repro (pre-fix)

1. Поднять local-five (SPA + gateway) с board, где ≥1 issue имеет numeric `geo.lat` / `geo.lon`.
2. Открыть `/#/board`.
3. Убедиться, что List показывает issues.
4. Переключить view на **Map**.
5. Наблюдать: basemap Present; маркеры/кластеры Absent.

### As-of-Done verify

Same steps → cluster/pin layers Present (see pipeline `screenshots/full-cycle/`).

## Verified facts

Источник: [analysis-life-sim-local-load-discussions-and-map-2026-10-03.md](../../../../../doge-complaints-gateway/docs/analysis/analysis-life-sim-local-load-discussions-and-map-2026-10-03.md) (local session 2026-10-03) + disk re-verify.

| Fact | Evidence |
|------|----------|
| Pin rule | SPA pin requires numeric `geo.lat` + `geo.lon` (`issueGeo.js:10–14`) |
| GeoJSON build | `issuesToPinGeoJson` → FeatureCollection lon/lat (`issueGeo.js:39–58`) |
| Empty-pins UI | Only when `pinIssues.length === 0` (`BoardIssuesMap.jsx:178–183`, `data-testid="board-map-empty-pins"`) |
| Geo on board issues (session) | **12/12** pin-capable (`GET /node/issues`) — empty-pins path **not** taken |
| Map eligible | `isMapEligible` → ListMapToggle enabled (`BoardPage` + `issueGeo.js:29–31`) |
| Pin asset | `/icons/semantic-schema-runtime/ic-map-pin.png` → **200** |
| Basemap | `MapLibreMap` + CARTO dark style mounts (`MapLibreMap.jsx:31–42`) |
| Dep | `package.json` `maplibre-gl` `^4.7.1` (lock **4.7.1**) |
| **H1 code (pre-fix)** | `boot()` called callback-shaped `map.loadImage(url, cb)` — layers never mounted |
| **H1 API** | MapLibre 4.7.1: `loadImage(url): Promise<GetResourceResponse<…>>` (`maplibre-gl.d.ts:10706`) · `.data` field |
| **H1 fix (P3)** | `await map.loadImage` → `addImage(id, response.data)` → `ensureLayers`/`syncSource` (`BoardIssuesMap.jsx`) |
| **H1b fix (P3)** | Promise `getClusterExpansionZoom(clusterId).then(zoom => easeTo…)` |

## What this is NOT

- «Нет geo в stories / issues» — false для verified local dataset.
- «Map toggle disabled» — toggle работает.
- «Сломан basemap» — tiles и Tallinn labels рендерятся.
- «Нет pin asset» — PNG отдаётся 200.
- «Threads/discussion seed пустой» — отдельный UX-вопрос; к отсутствию пинов не относится.
- Life-sim coarse geo (все пины в одной точке Tallinn) — **H2**, не причина «pins invisible».

## Diagnostic playbook

1. Reproduce Map on board with ≥1 pin-capable issue; confirm List has data.
2. Confirm empty-pins UI absent and pin asset 200.
3. Capture whether pin/cluster source/layers exist on the MapLibre map instance after Map view settles (`getSource('ssr03-issue-pins')`).
4. Record MapLibre `loadImage` / `getClusterExpansionZoom` return shape vs boot path expectation.
5. Pin layer: SPA map rendering vs data/geo vs asset (decision after evidence).

## Hypothesis matrix

| ID | Hypothesis | Status |
|----|------------|--------|
| **H1** (primary) | MapLibre v4 Promise `loadImage` vs callback boot path → pin/cluster layers never mount | **Confirmed + fixed P3** — live cluster **12** post-fix |
| **H1b** (same wave) | `getClusterExpansionZoom` also Promise in v4 → cluster expand no-ops if callback left | **Fixed P3** with H1 — Promise API in `BoardIssuesMap.jsx` |
| **H2** (secondary, product quality) | After pins visible, many pins stack at Tallinn centroid (life-sim coarse geo) | **Separate** — out of primary AC |

---

## Техническая архитектура (verified → target)

### Topology (unchanged)

```text
BoardPage (filteredIssues)
  → boardView === 'map'
    → BoardIssuesMap({ issues })
         → listPinCapableIssues / issuesToPinGeoJson
         → MapLibreMap.onMapReady(map)
              → boot: loadImage → addImage → ensureLayers (source+cluster+pin) → syncSource
```

| Layer | Role | Path |
|-------|------|------|
| Eligibility | pin-capable filter | `src/map/issueGeo.js` |
| Map shell | style + load event | `src/components/map/MapLibreMap.jsx` |
| Pins/clusters | source/layers/popup | `src/components/map/BoardIssuesMap.jsx` |
| Runtime | MapLibre GL JS 4.x | `maplibre-gl@4.7.1` |

### Root cause (H1)

#### Historical (pre-fix)

`ensureLayers()` and first `syncSource()` were **only** scheduled inside the `loadImage` callback. Under MapLibre v4 the second argument is ignored and the returned Promise was not awaited → layers never added → basemap-only UI despite valid GeoJSON in `geojsonRef`.

#### As-of-Done

Boot uses `await map.loadImage(url)` → `addImage(id, response.data)` → `ensureLayers()` → `syncSource()`; cluster click uses Promise `getClusterExpansionZoom`. See `BoardIssuesMap.jsx` (P3).

### Target decision

| Theme | Decision |
|-------|----------|
| Fix ownership | **SPA only** — `BoardIssuesMap.jsx` boot (+ cluster click); no gateway/threads |
| `loadImage` | Use **Promise** API: `const res = await map.loadImage(url)` → `map.addImage(PIN_IMAGE_ID, res.data)` (or equivalent field per MapLibre `GetResourceResponse`) when `!map.hasImage` |
| Then | Always `ensureLayers()` + `syncSource(map, geojsonRef.current)` after image ready / already cached |
| Cancel safety | Keep `cancelled` guard around async boot |
| Cluster zoom (H1b) | `const zoom = await source.getClusterExpansionZoom(clusterId)` then `easeTo` — same MapLibre v4 Promise contract |
| Empty-pins | Unchanged: `pinIssues.length === 0` → empty UI (AC-BUG-09-02) |
| Geo / life-sim H2 | **Out of scope** for Pass |
| Invent APIs | None |

### Data / control flow (target boot)

```text
onMapReady(map)
  if cancelled return
  if !hasImage(PIN_IMAGE_ID):
    response = await map.loadImage('/icons/…/ic-map-pin.png')
    if !cancelled && response?.data: addImage(PIN_IMAGE_ID, response.data)
  ensureLayers()          // source ssr03-issue-pins + cluster/unclustered symbol
  syncSource(geojsonRef)  // setData + fitBounds
```

### Ownership

| Concern | Module |
|---------|--------|
| Promise boot + cluster zoom | `BoardIssuesMap.jsx` |
| Geo eligibility (unchanged) | `issueGeo.js` |
| Map mount (unchanged unless needed) | `MapLibreMap.jsx` |
| Regression tests | NEW `BoardIssuesMap` / boot helper tests (mock map API) |

---

## Техническое решение (implement outline)

1. **Rewrite `boot` to async/Promise** for `loadImage`; never depend on callback arity.
2. **Handle image response shape** from MapLibre v4 (`GetResourceResponse` — use documented `.data` / bitmap field after reading runtime return once in T02).
3. **Call `ensureLayers` + `syncSource`** after successful image path **and** when image already present.
4. **Fix cluster click** to `await getClusterExpansionZoom` (H1b) so expand works once pins exist.
5. **Errors:** image load failure → fail-soft (no throw to kill map); optional still try layers without custom icon only if product accepts — prefer log + retry path; DoD = pins/clusters visible with icon when asset 200.
6. **Tests:** unit/integration with mocked `map` (`loadImage` resolves Promise; assert `addSource`/`addLayer` called). Cover “image already hasImage” branch.
7. **Manual:** Map with ≥1 pin-capable issue shows pin or cluster (AC-BUG-09-01).

---

## FR / AC

- **FR-BUG-09.1** Когда на board есть ≥1 pin-capable issue, Map показывает видимые pin и/или cluster markers.
- **FR-BUG-09.2** List feed и Map toggle не регрессируют.
- **FR-BUG-09.3** Исправление сопровождается regression coverage, подтверждающей видимость pin/cluster path при pin-capable issues.

| ID | Criterion |
|----|-----------|
| **AC-BUG-09-01** | Repro: Map с ≥1 pin-capable issue показывает ≥1 pin или cluster (не только basemap). |
| **AC-BUG-09-02** | Empty-pins UI появляется только когда pin-capable issues действительно отсутствуют. |
| **AC-BUG-09-03** | List mode и переключение List ↔ Map без регрессии относительно PH-04. |
| **AC-BUG-09-04** | Regression evidence: pin/cluster path монтируется при pin-capable data (test and/or verified repro). |
| **AC-BUG-09-05** | Story gate: H1 confirmed; fix pinned to SPA `BoardIssuesMap` MapLibre v4 Promise API (+ H1b cluster zoom). |

## Субтаски

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-bug-09-t01-repro-evidence` | Стабильный repro: Map basemap-only vs List Present; note empty-pins absent + pin asset 200 |
| **T02** | `task-spa-bug-09-t02-confirm-h1-api` | Confirm H1: `loadImage` Promise vs callback; record return shape; note H1b `getClusterExpansionZoom` Promise |
| **T03** | `task-spa-bug-09-t03-fix-loadimage-boot` | Fix `BoardIssuesMap` boot to await `loadImage` → `addImage` → `ensureLayers` → `syncSource` (AC-BUG-09-01) |
| **T04** | `task-spa-bug-09-t04-fix-cluster-zoom-promise` | Fix cluster expand via Promise `getClusterExpansionZoom` (H1b) |
| **T05** | `task-spa-bug-09-t05-regression-tests` | Vitest (mocked map): layers/source added after Promise boot; hasImage short-circuit; empty-pins path unchanged (AC-BUG-09-02/04) |
| **T06** | `task-spa-bug-09-t06-list-map-smoke` | Confirm List ↔ Map toggle / PH-04 states (AC-BUG-09-03) |
| **T07** | `task-spa-bug-09-t07-story-gate` | Story gate FR/AC; H1 confirmed in gate notes |

## Точки в коде (targets)

- `src/components/map/BoardIssuesMap.jsx` (`boot` ~L144–160 · cluster click ~L103–113)
- `src/map/issueGeo.js` (read-only eligibility)
- `src/components/map/MapLibreMap.jsx` (touch only if mount lifecycle blocks boot)
- NEW tests under `src/components/map/__tests__/` (or colocated)

## Вне scope

- Life-sim geo enrichment / disperse pins (H2) — related follow-up, не DoD этой bug story.
- Threads seed copy quality / discussion UX.
- Gateway clustering / issue creation pipeline.
- Invent новых map API контрактов на gateway.
- Downgrade MapLibre to v3 as “fix” (prefer align to v4 Promise API).
- Pipeline epic folder / pkg activation из этого draft alone.

## Швы

- Board List (PH-04) ↔ Map view shared issue set.
- Pin-capable geo contract (`geo.lat` / `geo.lon`) ↔ Map rendering.
- MapLibre v4 Promise API ↔ SPA boot / cluster zoom paths.

## Risks

| Risk | Mitigation |
|------|------------|
| Wrong field on `GetResourceResponse` | T02 capture once against runtime; assert in test mock |
| Pins stack (H2) after fix | Expected for coarse Tallinn centroid — document, not fail AC |
| Async race on unmount | Keep `cancelled` flag through await |

## Next (process)

1. Optional refine → P1.3 when activated.  
2. Do **not** activate pkg from this draft alone.
