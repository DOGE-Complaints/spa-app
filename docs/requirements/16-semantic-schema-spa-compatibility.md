# 16. Semantic Schema Runtime — SPA compatibility (board overlay + map mode)

Parent: docs/requirements backlog/REQ3-Semantic-Schema-Runtime-and-Node-Specific-Data-Processing.md REQ3-SPA-001…004, REQ3-AC-017, §30 (full form generator remains non-goal; architecture overlay separately scoped)  
Parent-id: req3-semantic-schema-runtime  
Siblings: doge-complaints-gateway/docs/requirements/51-semantic-schema-runtime.md (contract: `GET /node/issues` public Issue read; optional **`schema_card`** from pack `card_fields`; Issue.`geo` may include `lat`/`lon`/label/admin_*; `structured_payload` MUST NOT auto-public — SPA-003) · doge-identity-service/docs/requirements/20-semantic-schema-identity-boundary.md (contract: none named SPA↔identity for schema) · GPT UI/docs/requirements/REQ-45-semantic-schema-intake-envelope-compatibility.md (contract: none named SPA↔GPT; stories via GPT → gateway → Issues on board)  
Status: Accepted as REQ (PA.2 closed by operator 2026-09-01T10:12:26Z); FE overlay/map implementation pending (parallel wave)  

Дата: 2026-08-27; T-cover 2026-08-28; sibling-seam sync 2026-08-31T09:40:45Z; Status sync 2026-09-01T10:12:26Z  
Проект: spa-app  
Фокус: Issue board architecture overlay + list|map toggle — **без** form builder; **без** invented schema-metadata HTTP; **без** чтения pack.json в браузере

---

## 1) Goal

SPA MAY adapt the public Issue board to Schema Runtime architecture (REQ3-SPA-004, REQ3-AC-017):

1. **Cards:** civic Issue fields remain the base card; when gateway includes **`schema_card`**, SPA SHALL be able to render those named leaves as overlay (SPA-004) — connection from extended story intake / pack model to the dashboard card without dumping `structured_payload`.
2. **Map mode:** the same `GET /node/issues` resultset MAY be shown as a map when sufficient projected geo exists (`geo.lat` + `geo.lon` on Issues), reflecting intake geo (`geo_detail` / resolved location) that survived clustering → Issue projection.

SPA MUST NOT become the authoritative schema validator (SPA-001). This REQ does **not** order a new dashboard product epic or full dynamic form generator (§30).

---

## 2) Scope / Out of scope

### In scope

- Public Issue read path `GET /node/issues` (D-SSR-7; no `/tallinn/*` alias).
- Architecture overlay of Issue card / detail when **`schema_card`** is present (gateway-named leaves only).
- Board view toggle **list | map** on `/board` for the current Issues resultset.
- Map eligibility and pins driven by Issue.`geo.lat` / `geo.lon` (data-driven; see §4).
- Client-side validation assistive only (SPA-001/002).
- SEC-004: no automatic display of raw node payload / street depth unless those leaves appear inside `schema_card` via pack allowlist (gateway SSOT).
- Existing admin geo filters remain compatible; map does not replace them.

### Out of scope

- Implementing Schema Runtime or `story_dimensions` in spa.
- Full dynamic form/preview builder (§30).
- Four node-specific product dashboards / discovery UX epic.
- Story submit forms (stories via Custom GPT — sibling REQ-45).
- Inventing HTTP paths for SPA-002 UI metadata or `GET /schema-active`.
- Reading / parsing gateway `pack.json` / `geo_intake` / `node_clustering` in the browser.
- Configuring clustering knobs in SPA UI (pack on gateway — sibling 51 / operator manual).
- Early Signal / Emerging cards (spa 15) — not Issue cards; not this overlay.
- Product implementation of map library / JSX in this REQ edit (requirements only).

---

## 3) Verified current state

| Fact | Path |
|------|------|
| Public board Issues | `GatewayIssueRepository.js` `GET {base}/node/issues`; gateway `GET /node/issues` |
| Issue card fields today | `IssueCard.jsx`: id, status, summary\|title, type, labels, created_at — **no** `geo`, **no** `schema_card` |
| Issue detail | `IssuePage.jsx` — civic fields; **no** geo / schema_card |
| Domain typedef | `domain/types.js` — no `geo` / schema fields |
| Admin geo filters | `GeoFilter.jsx` + `geo_district` etc. query keys |
| `schema_card` / `structured_payload` in spa `src/` | **Not found** |
| Map UI / map deps | **Not found** |
| Gateway Issue.`geo` | may include `lat`, `lon`, label, admin_* when projected (sibling 51) |
| Gateway `schema_card` | present only if pack declares `card_fields`. **Tallinn Declare (GW-SSR-30):** `tallinn_civic/v1` MVP allowlist `signals.desired_outcome` / `affected_group` / `service_object` — Issues **MAY** carry non-empty `schema_card` when leaves resolve. legal/mobility remain civic-only until their owners declare. |

---

## 4) Target behavior

### 4.1 Cards ↔ extended story model

1. Base card remains civic Issue projection (title/summary, type, labels, status, dates, etc. as today).
2. If an Issue object includes non-empty **`schema_card`**, SPA overlay SHALL be able to show those key/value leaves on the card and/or detail page without inventing keys.
3. SPA MUST NOT render `structured_payload`, raw story geo snapshot, or bind/hash fields even if a future leak appears — only public Issue shape.
4. Absence of `schema_card` = civic card only (valid when pack has no `card_fields`).

### 4.2 Map mode (same resultset)

1. On `/board`, SPA MAY provide a control to switch between **list** and **map** views of the **current** Issues resultset (same filters/query).
2. Map toggle is **eligible** (visible / enabled) iff the current resultset contains **≥1** Issue with both `geo.lat` and `geo.lon` set (numbers).
3. Map pins = only Issues that have both coords; Issues without coords remain available in list view and are not pinned.
4. List view always shows the full current resultset.
5. Sufficiency of intake geo for pins is **gateway’s** responsibility (projection from dominant story after `geo_detail` / `location_query` + pack `geo_intake`). SPA does not call pack APIs; pack `require_*` modes increase pin coverage but are not read by SPA.
6. No new gateway endpoint for map. Optional future use of existing bbox query keys (`geo_lat_min`/`max`, `geo_lon_min`/`max` if exposed) is enhancement, not required for this Draft’s AC.
7. Clustering customization (civic `node_clustering`, exact lenses, `geo_scope` / `geo_filter`) stays on the node pack — SPA consumes clustered Issues only.

### 4.3 Authority

- SPA is not the schema validator (SPA-001).
- No full form builder (§30).

---

## 5) Acceptance criteria

1. AC-SPA-REQ3-01: SPA is not authoritative validator (SPA-001).
2. AC-SPA-REQ3-02: No full dynamic form generator (§30).
3. AC-SPA-REQ3-03: `structured_payload` is not automatically shown as Issue data (SPA-003).
4. AC-SPA-REQ3-04: This Draft does not invent schema-metadata routes / `GET /schema-active`.
5. AC-SPA-REQ3-17: REQ3-AC-017 — architecture overlay of the board is in scope; not a product epic.
6. AC-SPA-CARD-01: When `schema_card` is present on an Issue, SPA can render its named leaves as overlay; when absent, civic card only.
7. AC-SPA-MAP-01: Board supports list|map toggle of the current resultset; toggle eligible iff ≥1 Issue has `geo.lat` and `geo.lon`.
8. AC-SPA-MAP-02: Map pins only Issues with both coords; list shows full resultset.
9. AC-SPA-MAP-03: No pack.json / clustering-knob UI in SPA for this REQ.

---

## 6) Open questions

1. Visual density of `schema_card` on compact card vs detail-only — UX detail at implementation (not invent field names).
2. Map library choice — implementation, not this Draft.
3. Pre-cluster / pulse surfaces (spa 15) vs schema dimensions — not in this REQ; IDX later (gateway SSR-06).

**Closed:** which derived fields for overlay = gateway `schema_card` (+ civic Issue keys). Map eligibility = data-driven from Issue.`geo.lat`/`lon` (no SPA-002 metadata API).

---

## 7) Dependencies

- Parent §17, §30, COMPAT-002, SEC-004, SPA-001…004, AC-017.
- Sibling gateway 51 (Issue contract, `schema_card`, `geo` projection).
- Sibling GPT REQ-45 (intake → stories; not board).
- Existing spa 12 / 15 — board vs cabinet / Early Signal; do not mix Issue overlay with Emerging cards.
