# Early Signal Dashboard (ES) — требования к API (FE-контракт)

> Консолидация API/данных для будущих стори ES-01…05, **сверено** с:
> - Gateway: [`API_REFERENCE.md`](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md) · [`openapi.yaml`](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/openapi.yaml)
> - Path SSOT: [`49-early-signal-network-pulse-l1-api.md`](../../../../../doge-complaints-gateway/docs/requirements/49-early-signal-network-pulse-l1-api.md) · [`50-early-signal-emerging-l2-api.md`](../../../../../doge-complaints-gateway/docs/requirements/50-early-signal-emerging-l2-api.md)
> - Code: [`NetworkPulseService`](../../../../../doge-complaints-gateway/src/core/application/network_pulse.py) · [`EmergingSignalsService`](../../../../../doge-complaints-gateway/src/core/application/emerging_signals.py) · handlers [`handlers.py:40–60`](../../../../../doge-complaints-gateway/src/core/api/handlers.py) · routes [`asgi_app.py:59–67,431–459`](../../../../../doge-complaints-gateway/src/core/api/asgi_app.py)
> - SPA: [`GatewayIssueRepository.js`](../../../../src/repositories/GatewayIssueRepository.js) · [`BoardPage.jsx`](../../../../src/pages/BoardPage.jsx) · [`issueService.js`](../../../../src/services/issueService.js)
>
> **Легенда:** ✅ есть в API / контракт готов · ⚠️ частично / FE gap · ❌ отсутствует / Deferred / out of scope.  
> **Verified (As-of-Done, ES-03 T06):** Gateway `GET /tallinn/network-pulse` + `GET /tallinn/emerging-signals` in `PUBLIC_ROUTES`; handlers return `build_success_envelope` only (no error branch in handler). Emerging SPA **wired:** [`GatewayEmergingSignalsRepository.js`](../../../../src/repositories/GatewayEmergingSignalsRepository.js) L32 GET `{base}/tallinn/emerging-signals?top_n=` · [`EarlySignalDiscovery.jsx`](../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L44 `<EmergingSignalsBlock />`.  
> **Historical** (pre-P3 ES-03, 2026-08-16 re-read): spa `rg network-pulse|emerging-signals spa-app/src` → **0** (FE unwired).
>
> **Образец формата:** [`STORY-SPA-PH-api-requirements.md`](../public-home/STORY-SPA-PH-api-requirements.md).  
> **Product lock:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · **REQ:** [15](../../../requirements/15-early-signal-pre-cluster-public-dashboard.md) (AC-SPA-ES-08).  
> **Admin shell:** [ADMIN-ESD-04](ADMIN-ESD-04-api-requirements.md).

## Режим MVP (решение ADMIN-ESD-04)

- **Gateway Issues L3 — live:** reuse `issueService.getIssues` → `GET /tallinn/issues` (ES-01 empty switch / ES-05 continuum).
- **Network Pulse L1 — backend ✅ / SPA ⚠️:** contract = REQ-49; bind only sibling-approved fields **or omit** (AC-SPA-ES-08 / PRODUCT-BRIEF #5). No client-fabricated counts.
- **Emerging L2 — backend ✅ / SPA ⚠️:** contract = REQ-50; Emerging ≠ Issues (`data.signals` vs `data.issues`). No spa repository yet.
- **Help / Missing CTAs — env / existing board:** `VITE_STORY_GPT_URL` + public-home Submit patterns — no new HTTP API.
- **Coverage gaps — abstract or qualitative labels only** — no coverage DTO / % score endpoint.
- **Framing copy — static i18n** (et/ru/en) — no CMS.
- **REQ-12 `/dashboard` — out of scope** (regression only).

---

## §0. Контракты (сводка по стори)

| Контракт | Бекенд / слой | Форма (`data`) | Backend | SPA today | Для стори |
|----------|---------------|----------------|---------|-----------|-----------|
| Issues list (L3) | gateway `GET /tallinn/issues` | `{ issues: […] }` | ✅ | ✅ `GatewayIssueRepository` | ES-01, ES-05 |
| Board empty → discovery trigger | SPA client | `issues.length === 0` | ✅ none | ✅ `BoardPage` empty path | ES-01 |
| Network Pulse L1 | gateway `GET /tallinn/network-pulse` | see §2 | ✅ REQ-49 | ⚠️ no consumer | ES-02 |
| Emerging L2 | gateway `GET /tallinn/emerging-signals` | see §3 | ✅ REQ-50 | ⚠️ no consumer | ES-03 |
| Help / Missing CTA | env `VITE_STORY_GPT_URL` | URL string | ✅ env | ✅ PH Submit patterns | ES-04 |
| Coverage framing | SPA i18n ± optional Pulse keys as **labels only** | static / qualitative | ✅ none HTTP | ✅ As-of-Done i18n shipped (`earlySignal.missing.*` · `forming.message` · `help.*`) | ES-04 |
| Picture-forming / density viz | CSS/SVG/canvas | — | ✅ none | — | ES-01…05 chrome |
| Framing / honesty copy | SPA i18n | static strings | ✅ none | ⚠️ keys TBD ADMIN-05 | ES-01…04 |
| Voices / unique submitters | — | — | ❌ out of scope | — | — |
| `/metrics` as Pulse | gateway ops | service-auth | ❌ не использовать | — | — |
| Cabinet `GET /story-activity` | gateway user-scoped | — | ❌ не public board | — | — |

**As-of-Done / Current** (P3 ES-04 · T08): Coverage framing SPA = static qualitative i18n **shipped** — [`earlySignalDictionary.js`](../../../../src/i18n/earlySignalDictionary.js) `earlySignal.missing.*` · `forming.message` · `help.*` · [`WhatsMissingBlock.jsx`](../../../../src/components/earlySignal/WhatsMissingBlock.jsx) framing rows. **No** coverage HTTP / DTO / %.
**Historical** (pre-P3 ES-04): SPA today ⚠️ keys TBD ADMIN-05.

---

## §1. GATEWAY — Issues L3 (consume existing)

| Нужно | Endpoint | Статус |
|-------|----------|--------|
| Public issue list | `GET /tallinn/issues` | ✅ public ([API_REFERENCE](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md)) |
| SPA call | `issueService.getIssues` → [`GatewayIssueRepository.getIssues`](../../../../src/repositories/GatewayIssueRepository.js) (`:76`) → `envelope.data.issues` | ✅ |

**Reuse:** filter matrix and issue public shape = same as PH-04 / BoardPage — **не дублировать** 15 query params здесь; SSOT = API_REFERENCE §`GET /tallinn/issues` + existing spa wiring.

**ES-01:** zero Issues → Pre-Cluster discovery composition (not sole `board-empty` copy). Trigger = client `issues.length === 0` — **no new list API**.

**ES-05:** when `issues.length ≥ 1`, existing feed still renders (regression). Continuum chrome may remain where data allows — product REQ-15; not a new endpoint. Issue detail navigation stays `GET /tallinn/issues/{id}` (IssuePage) — link only.

---

## §2. GATEWAY — Network Pulse L1 — `GET /tallinn/network-pulse`

- **Auth:** public (`PUBLIC_ROUTES`; no service token)
- **CORS:** `OPTIONS /tallinn/network-pulse` → 200
- **SSOT:** [REQ-49](../../../../../doge-complaints-gateway/docs/requirements/49-early-signal-network-pulse-l1-api.md) · [API_REFERENCE §Pulse](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md) · openapi `getTallinnNetworkPulse`
- **Implemented:** `NetworkPulseService.build_pulse` → `handle_network_pulse` → `JSONResponse` ([`asgi_app.py:436–442`](../../../../../doge-complaints-gateway/src/core/api/asgi_app.py))
- **Query:** none
- **Success HTTP:** handler always builds success envelope; ASGI maps payload via `_json_http_status` → **200** when no `error` key ([`asgi_app.py:245–246`](../../../../../doge-complaints-gateway/src/core/api/asgi_app.py))

### 2.1 Envelope + `data` fields

Envelope: `SuccessEnvelope` = `{ data, trace_id }` ([`envelope.py`](../../../../../doge-complaints-gateway/src/core/api/envelope.py)).

| Field | Type | Semantics (from `NetworkPulseService`) |
|-------|------|----------------------------------------|
| `stories_collected` | int | `len(list_stories())` |
| `languages` | `{key, count}[]` | by `narrative_language`; sorted count desc, then key |
| `areas` | `{key, count}[]` | district → settlement → region; skip empty; **small sample ≠ city coverage** |
| `topics` | `{label, axis, count}[]` | public taxonomy label frequencies — **never Issues** |
| `recent_stories_7d` | int | UTC 7-day window on `created_at` |

**Forbidden in payload / FE must not invent:** `submitter_*`, narrative text, Voices, «N Stories until Issue», keys named `issues` / `issue_count` as Pulse metrics.

### 2.2 Normative UI bind map (M137 / AC-SPA-ES-08)

| Mockup / UI slot | Bind to | Disposition |
|------------------|---------|-------------|
| Stories | `stories_collected` | **bind** |
| Areas (count or list) | `areas` | **bind** (honesty copy: not city coverage) |
| Languages (Pulse dim) | `languages` | **bind** |
| Topics / theme freqs | `topics` | **bind** (Topic ≠ Issue) |
| Activity (recent / 7d) | `recent_stories_7d` | **bind only** if UI label = recent activity / 7d stories — not Voices |
| Contributors / Voices / unique people | — | **omit** (no field; product out of scope) |
| «N Stories until Issue» / unlock counters | — | **omit** / forbidden |
| Metric slot without approved field | — | **omit** entire slot (ESD-P-omit for that slot) |

If Pulse HTTP fails or is unavailable: UI → **ESD-P-omit** (copy-only / no numbers) per M137; board Issues path stays independent.

| Стори | Нужно | Backend | SPA |
|-------|-------|---------|-----|
| **ES-02** Pulse block | bind approved fields or omit | ✅ | ⚠️ FE gap — no repository/service call |

---

## §3. GATEWAY — Emerging L2 — `GET /tallinn/emerging-signals`

- **Auth:** public (`PUBLIC_ROUTES`)
- **CORS:** `OPTIONS /tallinn/emerging-signals` → 200
- **SSOT:** [REQ-50](../../../../../doge-complaints-gateway/docs/requirements/50-early-signal-emerging-l2-api.md) · [API_REFERENCE §Emerging](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md) · openapi `getTallinnEmergingSignals`
- **Implemented:** `EmergingSignalsService.build_emerging` → `handle_emerging_signals` ([`asgi_app.py:450–459`](../../../../../doge-complaints-gateway/src/core/api/asgi_app.py))

### 3.1 Query

| Param | Type | Default | Semantics |
|-------|------|---------|-----------|
| `top_n` | int | `10` | Max signals; FastAPI `Query(ge=1, le=50)` + service `clamp_top_n` `[1, 50]` |

Invalid `top_n` outside range → FastAPI **422** (framework validation) — not a custom Early Signal error envelope.

### 3.2 `data` fields

| Field | Type | Semantics |
|-------|------|-----------|
| `signals` | `{label, axis, story_count}[]` | Top-N public label frequencies; stories linked to cabinet-**published** Issues excluded (REQ-50 §4); sorted `story_count` desc, then label, axis |
| `top_n` | int | Applied top_n after clamp |

**Normative:** Emerging ≠ Issues (`data.signals` vs `data.issues`); Topic ≠ Issue; no Issue ids as primary emerging identity; no persistent `EmergingSignal` table; source = labels, **not** `list_projections`.

**Empty `signals: []`:** honest empty / ESD-E-empty UI — **do not** fabricate provisional rows.

On HTTP failure: omit Emerging block or empty-calm state; do not invent signals.

| Стори | Нужно | Backend | SPA |
|-------|-------|---------|-----|
| **ES-03** Emerging provisional | bind `signals` / `top_n` or omit | ✅ | ✅ As-of-Done wired (`GatewayEmergingSignalsRepository.js` L32 · `EarlySignalDiscovery.jsx` L44) |

---

## §4. NONE / ENV — Coverage / Help (ES-04)

### 4.1 Help Complete / What's Missing CTAs

| Нужно | Источник | Статус |
|-------|----------|--------|
| GPT / Submit CTA | `VITE_STORY_GPT_URL` + existing board / Submit patterns (PH-06) | ✅ env — no new gateway path |
| Secure / external affordances | existing PH / handoff UI patterns | ✅ none new API |

### 4.2 Coverage gaps (M139)

- **No** coverage HTTP / DTO / percentage / «N more Stories» score ([M139](../../../UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md): abstract categories when no contract).
- **Allowed:** static i18n categories (Areas / Languages / Groups / Themes) as **qualitative framing**.
- **Optional qualitative reuse (not inventing scores):** show Pulse `areas` / `languages` / `topics` **keys as labels** only when Pulse fetch succeeds — never invent gap counts or completeness %.
- Groups / unique-person dimensions without a field → **abstract only** or omit numeric affordance.

### 4.3 Framing honesty (all ES blocks)

Static i18n for provisional / discovery language. **API:** none ✅.

---

## §5. Viz / out of catalog API

Do **not** invent endpoints or fake metric icons for:

- Network Pulse particle / constellation fields
- Picture-forming node graphs
- Emerging density / strengthen–weaken clusters
- Mode A–D density keys, topic legend color dots
- Continuum density diagrams, loading skeletons

Implementation = CSS/SVG/canvas components. Icon inventory: [STORY-SPA-ES-icon-assets.md](STORY-SPA-ES-icon-assets.md) §Viz.

---

## §6. Example success envelopes (schema-derived)

> Constructed from openapi required keys + service field names — **not** a live curl dump.

### 6.1 Pulse

```json
{
  "data": {
    "stories_collected": 42,
    "languages": [{ "key": "et", "count": 20 }, { "key": "ru", "count": 15 }],
    "areas": [{ "key": "Kesklinn", "count": 8 }],
    "topics": [{ "label": "street-lighting", "axis": "theme", "count": 5 }],
    "recent_stories_7d": 7
  },
  "trace_id": "00000000-0000-4000-8000-000000000001"
}
```

### 6.2 Emerging

```json
{
  "data": {
    "signals": [
      { "label": "evening-transport", "axis": "theme", "story_count": 4 }
    ],
    "top_n": 10
  },
  "trace_id": "00000000-0000-4000-8000-000000000002"
}
```

### 6.3 Issues (existing spa consume)

```json
{
  "data": {
    "issues": []
  },
  "trace_id": "…"
}
```

SPA today: `envelope?.data?.issues ?? []` ([`GatewayIssueRepository.js:79`](../../../../src/repositories/GatewayIssueRepository.js)).

---

## §7. Errors / degrade (FE)

| Situation | Verified behavior | FE rule |
|-----------|-------------------|---------|
| Pulse/Emerging success | handlers → success envelope; HTTP **200** | bind per §2.2 / §3 or omit unused slots |
| Pulse/Emerging transport / non-OK | not a dedicated error envelope in handlers (unhandled → framework 500 **Unknown** detail) | treat as unavailable → **omit** metrics / Emerging list |
| Emerging `top_n` out of `[1,50]` | FastAPI Query validation → **422** | avoid sending invalid query; default `10` |
| Issues list failure | existing BoardPage error path (`ic-cloud-error` / try again) | unchanged; independent of Pulse |
| Empty Issues | `issues: []` | ES-01 discovery composition |
| Empty Emerging | `signals: []` | honest empty — no fake rows |

---

## §8. Explicit ❌ / do-not-use

| Need | Reality | Статус |
|------|---------|--------|
| Voices / unique-person metrics | product out of scope (REQ-15 / brief) | ❌ |
| Contributors as Pulse KPI | no API field | ❌ omit |
| `GET /metrics` as Pulse source | ops / service-auth; not Story aggregates | ❌ |
| `GET /story-activity` on public board | cabinet user-scoped | ❌ |
| Invented threshold / «unlock Issue» counters | anti-gaming | ❌ |
| Coverage % / gap score DTO | no endpoint; M139 abstract | ❌ |
| Alternate Pulse/Emerging HTTP paths | SSOT = REQ-49 / REQ-50 only | ❌ |
| `EmergingSignal` DDL / Issues-shaped emerging list | forbidden by REQ-50 | ❌ |

---

## §9. Gaps (FE wiring only; backend Ready)

| Gap | Тип | Закрывает |
|-----|-----|-----------|
| Pulse HTTP client + field binding | FE | future ES-02 (ADMIN-05) |
| Emerging HTTP client + provisional UI | FE | future ES-03 |
| Discovery shell on zero Issues | FE | future ES-01 |
| Continuum chrome when Issues ≥ 1 | FE / product | future ES-05 · REQ-15 PA.2 |
| Formal PA.2 Status on REQ-15 | operator | not this ADMIN task |

**Не предлагать** новых gateway endpoints в этой волне — paths named and implemented.

---

## §10. Documentation touchpoints (для ADMIN-ESD-05)

| Planned story | API section |
|---------------|-------------|
| ES-01 discovery shell | §1 Issues empty trigger · §5 Viz |
| ES-02 Network Pulse | §2 (bind map §2.2) |
| ES-03 Emerging Signals | §3 |
| ES-04 Help / Missing | §4 |
| ES-05 continuum + feed regression | §1 |

---

*Verified 2026-08-16 (re-read): gateway REQ-49/50 + API_REFERENCE + openapi + `asgi_app` PUBLIC_ROUTES + services/handlers; spa Issues consumer only. Runtime spa Pulse/Emerging wiring не в этом файле.*
