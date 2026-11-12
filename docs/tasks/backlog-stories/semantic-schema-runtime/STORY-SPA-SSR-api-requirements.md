# Semantic Schema Runtime (SSR) — требования к API (FE-контракт)

> Консолидация API/данных для стори SSR-01…03, **сверено** с:
> - Gateway: [REQ-51](../../../../../doge-complaints-gateway/docs/requirements/51-semantic-schema-runtime.md) · [`dto.py`](../../../../../doge-complaints-gateway/src/core/projection/dto.py) · [`mapper.py`](../../../../../doge-complaints-gateway/src/core/projection/mapper.py) · [`card_fields.py`](../../../../../doge-complaints-gateway/src/core/projection/card_fields.py) · [`schema-packs/README.md`](../../../../../doge-complaints-gateway/schema-packs/README.md)
> - SPA: [`GatewayIssueRepository.js`](../../../../src/repositories/GatewayIssueRepository.js) · [`types.js`](../../../../src/domain/types.js) · [`geoAdminFilterKeys.js`](../../../../src/i18n/geoAdminFilterKeys.js) · [`boardQuery.js`](../../../../src/router/boardQuery.js)
>
> **Легенда:** ✅ есть в API / контракт готов · ⚠️ частично / FE gap · ❌ отсутствует / Deferred / out of scope.  
> **Verified:** 2026-09-02 — `GET /node/issues` ([`GatewayIssueRepository.js:77`](../../../../src/repositories/GatewayIssueRepository.js)); spa `rg schema_card|structured_payload spa-app/src` → **0**; public `schema_card` ([`dto.py:57–58`](../../../../../doge-complaints-gateway/src/core/projection/dto.py)); public `geo.*` ([`mapper.py:37–52`](../../../../../doge-complaints-gateway/src/core/projection/mapper.py)); tallinn MVP `card_fields` ([`pack.json`](../../../../../doge-complaints-gateway/schema-packs/tallinn_civic/v1/pack.json) L6–10) — [GW-SSR-30](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-30-tallinn-card-fields-spa-overlay-readiness.md) **Done** pkg-000087.
>
> **Образец формата:** [`STORY-SPA-ES-api-requirements.md`](../early-signal-dashboard/STORY-SPA-ES-api-requirements.md) · [`STORY-SPA-PH-api-requirements.md`](../public-home/STORY-SPA-PH-api-requirements.md).  
> **Product lock:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · **REQ:** [16](../../../requirements/16-semantic-schema-spa-compatibility.md).  
> **Admin shell:** [ADMIN-SSR-04](ADMIN-SSR-04-api-requirements.md).

## Режим MVP (решение ADMIN-SSR-04)

- **Gateway Issues — live:** reuse `issueService.getIssues` / `getIssue` → `GET /node/issues` (+ `/{id}`). **No new list API.**
- **Overlay / map — Issue body only:** optional `schema_card` + `geo` from the same envelope — no `GET /schema-active`, no pack.json in browser.
- **Filters — existing SEARCH-05:** URL `geo_district`… unchanged; **not** renaming public Issue JSON.
- **bbox** (`geo_lat_min`/`max`…) — ⚠️ future ([`boardQuery.js:9`](../../../../src/router/boardQuery.js)); **not** required for this Draft.
- **Pulse / Emerging / Early Signal** — spa 15 — **out of scope**.
- **Proposal endpoints:** none (operator did not request).

---

## §0. Контракты (сводка по стори)

| Контракт | Бекенд / слой | Форма (`data`) | Backend | SPA today | Для стори |
|----------|---------------|----------------|---------|-----------|-----------|
| Issues list | gateway `GET /node/issues` | `{ issues: […] }` | ✅ | ✅ `GatewayIssueRepository` L77 | SSR-01…03 |
| Issue detail | gateway `GET /node/issues/{id}` | `{ issue }` | ✅ | ✅ L85 | SSR-01, SSR-02 |
| Pass-through `schema_card` + `geo` | same Issue objects | optional fields on Issue | ✅ dto/mapper | ⚠️ typedef omit (`types.js:55–68`); repo returns JSON as-is | SSR-01 |
| Overlay render | `issue.schema_card` leaves | flat dotted-path map | ✅ tallinn MVP allowlist ([GW-SSR-30](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-30-tallinn-card-fields-spa-overlay-readiness.md)); emit when leaves resolve | ❌ UI grep 0 | SSR-02 |
| Map eligibility / pins | `issue.geo.lat` + `geo.lon` | numbers both required | ✅ mapper | ❌ UI / map deps 0 | SSR-03 |
| Admin geo filters | query `geo_district`… | URL → gateway params | ✅ | ✅ SEARCH-05 | SSR-03 |
| `structured_payload` auto-public | — | — | ❌ forbidden (SPA-003) | ✅ absent in spa | all |
| `GET /schema-active` / pack.json UI | — | — | ❌ do not invent | — | OOS |
| Pulse / Emerging | spa 15 | — | — | — | OOS |
| bbox query keys | future boardQuery | — | ⚠️ not this Draft | comment only | — |

---

## §1. GATEWAY — Issues (consume existing)

| Нужно | Endpoint | Статус |
|-------|----------|--------|
| Public issue list | `GET {base}/node/issues` | ✅ spa [`GatewayIssueRepository.js:77`](../../../../src/repositories/GatewayIssueRepository.js) |
| Public issue detail | `GET {base}/node/issues/{id}` | ✅ L85; 404 → `null` |
| List envelope | `envelope.data.issues` | ✅ L80 |
| Detail envelope | `envelope.data.issue` | ✅ L91 |

**Reuse:** civic Issue fields + SEARCH filter matrix = PH-04 / BoardPage — **не** дублировать полный filter catalog здесь.

**Правило:** SSR **не** добавляет HTTP. Overlay и map читают поля уже в Issue JSON.

---

## §2. Public Issue shape — Gateway ↔ SPA naming (SSOT)

**Правило:** эталон = JSON из `GET /node/issues`. SPA **не** переименовывает, **не** добавляет `admin_*` на public Issue, **не** invent dotted paths.

### 2.1 `schema_card` (overlay)

| Слой | Имя | Эталон |
|------|-----|--------|
| Pack allowlist | `card_fields[]` dotted paths | [`schema-packs/README.md`](../../../../../doge-complaints-gateway/schema-packs/README.md) L30 |
| Extract | `project_card_fields` | [`card_fields.py`](../../../../../doge-complaints-gateway/src/core/projection/card_fields.py) |
| Public sidecar | `issue.schema_card[<dotted-path>]` | [`dto.py:57–58`](../../../../../doge-complaints-gateway/src/core/projection/dto.py) — emit only if non-empty |
| SPA typedef / UI | same keys verbatim | L10N label id = same dotted-path ([ADMIN-SSR-05](ADMIN-SSR-05-backlog-stories-l10n.md)) |

- Keys = **flat dotted-path** strings (e.g. `signals.desired_outcome`), not nested objects.
- **Tallinn MVP allowlist (GW-SSR-30 Done):** `signals.desired_outcome` · `signals.affected_group` · `signals.service_object` — [`tallinn_civic/v1/pack.json`](../../../../../doge-complaints-gateway/schema-packs/tallinn_civic/v1/pack.json).
- Absent / empty `schema_card` = civic-only card (valid when pack omits `card_fields`, e.g. legal/mobility; or leaves do not resolve; or Issue projected before pack revise — residual reproject).
- `forbidden` / `node_private` paths never projected even if listed in allowlist.

### 2.2 `geo` (map + label)

Domain snapshot may use `admin_district`, … — **public** Issue uses:

| Public `issue.geo` key | Domain source | SPA use | Status |
|------------------------|---------------|---------|--------|
| `lat` | geo lat | pin eligibility (with `lon`) | ✅ mapper L39 |
| `lon` | geo lon | pin eligibility (with `lat`) | ✅ mapper L40 |
| `label` | normalized label | optional display / pin popup | ✅ L42 |
| `district` | admin_district | admin geo display / filters match | ✅ L44 |
| `settlement` | admin_settlement | admin geo | ✅ L46 |
| `region` | admin_region | admin geo | ✅ L48 |
| `country` | admin_country | admin geo | ✅ L50 |
| `detail_level` | geo_detail_level | optional metadata; **not** pin eligibility | ✅ L51–52 |

**Не на public Issue:** `street`, `house`, `admin_*` prefix, raw `geo_detail`, `structured_payload`.

REQ-16 «admin_*» = domain wording; **public wire** = таблица выше.

Pin eligibility (SSR-03 / REQ-16): **numeric** `geo.lat` **and** `geo.lon` both present. Geo object may exist without coords (admin-only / detail_level) — then Issue stays list-only.

### 2.3 HTTP filters (do not break)

| Query key (URL) | Gateway param | Notes |
|-----------------|---------------|-------|
| `geo_district` | `geo_district` | [`GatewayIssueRepository.test.js`](../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) |
| `geo_settlement` / `geo_region` / `geo_country` / `geo_postal_code` | same | [`geoAdminFilterKeys.js:4–18`](../../../../src/i18n/geoAdminFilterKeys.js) |

`GEO_ADMIN_PAYLOAD_KEYS` maps filter UI → **Issue.geo** keys (`district`, …) for client match — **не** переименование HTTP или public JSON.

### 2.4 Illustrative Issue fragment (example keys only)

```json
{
  "id": "DE-042",
  "status": "NEW",
  "type": "IMPROVEMENT",
  "title": { "en": "…" },
  "schema_card": {
    "signals.desired_outcome": "…",
    "signals.affected_group": "…"
  },
  "geo": {
    "lat": 59.437,
    "lon": 24.753,
    "label": "Tallinn",
    "district": "Kesklinn",
    "country": "Eesti"
  }
}
```

Keys inside `schema_card` must come from pack `card_fields` at runtime — examples above are **illustrative**, not invented SPA names.

---

## §3. Per-story needs

### SSR-01 — Issue public shape consume (tech_first)

| Need | Status | Note |
|------|--------|------|
| Preserve `schema_card` / `geo` from envelope | ⚠️ | Repo returns objects as-is (L80/L91); typedef [`types.js:55–68`](../../../../src/domain/types.js) omits both — document + type |
| No new HTTP | ✅ | — |
| No `structured_payload` handling | ✅ | spa grep 0; do not add |

### SSR-02 — Schema card overlay (ui_first)

| Need | Status | Note |
|------|--------|------|
| Read non-empty `schema_card` on card + detail | ❌ FE | UI 0; backend ✅ tallinn MVP paths ([GW-SSR-30](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-30-tallinn-card-fields-spa-overlay-readiness.md)) |
| Labels 1:1 dotted-path | — | `schemaRuntime.cardField.<path>` → ADMIN-SSR-05 (MVP: three `signals.*` above) |
| Never dump `structured_payload` | ✅ contract | SPA-003 / SEC-004 |

### SSR-03 — Board list \| map (ui_first)

| Need | Status | Note |
|------|--------|------|
| Same `GET /node/issues` resultset | ✅ | no map endpoint |
| Eligibility ≥1 Issue with numeric lat+lon | ✅ data / ❌ UI | mapper emits when both set |
| Pins = subset; list = full | — | product AC-SPA-MAP-01…02 |
| Filters remain | ✅ | SEARCH-05 |
| bbox | ⚠️ future | not this Draft |

---

## §4. Gaps / MVP

| Gap (api-req mark) | Суть | Owner | Linked story |
|--------------------|------|-------|--------------|
| typedef / pass-through ⚠️ | SPA `types.js` omit; repo JSON as-is | FE | [SSR-01](STORY-SPA-SSR-01-issue-public-shape-consume.md) |
| Overlay UI ❌ | spa grep 0 | FE | [SSR-02](STORY-SPA-SSR-02-schema-card-overlay.md) |
| Map UI ❌ | map deps 0 | FE | [SSR-03](STORY-SPA-SSR-03-board-list-map-toggle.md) |
| Lucide icons | catalog Done | SPA assets | [icon-assets](STORY-SPA-SSR-icon-assets.md) |
| Tallinn pack `card_fields` | MVP Declare Done — three `signals.*` | Gateway pack data | [GW-SSR-30](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-30-tallinn-card-fields-spa-overlay-readiness.md) **Done** pkg-000087 |
| Historical Issues без sidecar | Pack change не rewrite stored projections | Gateway residual | GW-SSR-30 pitfall — reproject / «new Issues only»; FE treats empty as civic-only |
| New gateway endpoints | none | — | — |
| bbox ⚠️ | future; not Draft AC | SPA later | OOS / not Draft — **no** GW story (invent filter HTTP запрещён) |
| `structured_payload` ❌ | forbidden by design | contract OK | — |
| `GET /schema-active` ❌ | do not invent | OOS | — |

**MVP:** live Issues L3; overlay/map when sidecar/coords present; civic-only and map-ineligible are valid states.

---

## §5. Re-verification (2026-09-02, post GW-SSR-30)

Повторная достаточность API после **Done** [GW-SSR-30](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-30-tallinn-card-fields-spa-overlay-readiness.md) (Declare MVP `card_fields` в tallinn pack):

| Check | Verdict | Note |
|-------|---------|------|
| HTTP list/detail | ✅ | `GET /node/issues` (+ `/{id}`) sufficient for SSR-01…03 — no new routes |
| Public shape `schema_card` + `geo` | ✅ | mechanism ([GW-SSR-11](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-11-pack-declared-issue-projection.md)) + tallinn allowlist ([pack.json](../../../../../doge-complaints-gateway/schema-packs/tallinn_civic/v1/pack.json) L6–10) |
| Tallinn overlay data path | ✅ | pack declares MVP paths; Issues **MAY** emit non-empty `schema_card` when leaves resolve |
| Historical density | ⚠️ residual | pre-revise Issues may lack sidecar until reproject — AC civic-only still valid |
| Map coords | ✅ | when projected; UI = [SPA SSR-03](STORY-SPA-SSR-03-board-list-map-toggle.md) |
| New gateway endpoints | ❌ not required | confirmed |

**Verdict — API ready for FE package:** contract + Tallinn data path **достаточны** для реализации [SSR-01](STORY-SPA-SSR-01-issue-public-shape-consume.md) / [SSR-02](STORY-SPA-SSR-02-schema-card-overlay.md) / [SSR-03](STORY-SPA-SSR-03-board-list-map-toggle.md). **Новых gateway endpoints не нужно.** Remaining = только SPA FE (+ L10N keys для MVP paths); gateway pack gap G-CARD-01 (tallinn half) closed.
