# ADR-SSR-03 — Map library (product interview SSOT)

> **Status:** Accepted (operator interview 2026-09-02)  
> **Story:** [STORY-SPA-SSR-03-board-list-map-toggle.md](STORY-SPA-SSR-03-board-list-map-toggle.md)  
> **Admin:** [ADMIN-SSR-06-tech-decomposition.md](ADMIN-SSR-06-tech-decomposition.md) · task **T00**  
> **Mockup lock:** [M142](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md) — provider-neutral; no Mapbox/Google wordmark  
> **REQ:** [16](../../../requirements/16-semantic-schema-spa-compatibility.md) §6 Q2

This document is the **source of truth** for map stack decisions in SSR-03. Implementation and epic T00 MUST follow it; do not re-litigate without operator.

---

## Locked decisions

| ID | Topic | Decision |
|----|-------|----------|
| **D1** | Cost / API key | **No paid map vendor key** for MVP (interview Q1 = A) |
| **D2** | Capability level | **L1 pins + light client-side cluster** (Q2) |
| **D3** | Library | **MapLibre GL JS** + free dark **vector** style (Q3 = B) |
| **D4** | Expected pin volume | **~30–200** in a typical filtered `/board` view (Q4) |
| **D5** | Pin click | **Mini-popup** (title + optional `geo.label`) → explicit open to Issue detail (Q5 = B) |
| **D6** | Cluster tap | **Zoom-in only** on first wave (Q5 = A); no spider/list sheet yet |
| **D7** | Initial camera | **`fitBounds`** over current pin-capable Issues (Q5 = A) |
| **D8** | Mobile | Full-width map under toolbar; native MapLibre pan/zoom; no separate mini-mode (Q5 OK) |

---

## Interview record (human answers)

| Q | Question (summary) | Answer |
|---|--------------------|--------|
| Q1 | Paid API key? | **A** — free / no key |
| Q2 | Map depth? | **L1 + light cluster** |
| Q3 | Stack under no-key + dark UI? | **B** — MapLibre + dark vector + cluster |
| Q4 | Typical pin count? | **30–200** |
| Q5 | Pin / cluster / start / mobile? | Pin **B** · cluster **A** · start **A** · mobile OK |

---

## Why this stack (short)

- **No Mapbox/Google:** matches D1 and M142 «no provider branding»; avoids billing and vendor chrome.
- **MapLibre over Leaflet for this package:** operator chose vector dark style (Q3 B); volume 30–200 benefits from GL performance + clustering without a tile API key when using a free style + public/self-hostable sources.
- **Light cluster:** justified by D4; **not** gateway `ClusterLens` / pack clustering UI (still forbidden on board).
- **Popup then navigate:** fewer accidental navigations than direct route on dense maps.
- **fitBounds:** camera honest to **current** resultset/filters (same Issues as list).

---

## Implementation constraints (SSR-03 / T00)

**In:**

- Depend on `maplibre-gl` (and a maintained React wrapper if used, e.g. `react-map-gl` MapLibre adapter — choose at T00 spike; keep API surface thin).
- Free dark vector style URL or vendored style JSON + attribution required by style/source licenses (compact credit OK; **no** commercial wordmark).
- Custom pin glyph: catalog [`ic-map-pin.png`](../../../../public/icons/semantic-schema-runtime/ic-map-pin.png) (#F5A623) — not provider default teardrop branding.
- Client-side cluster for pin layer only; expand = zoom.
- Eligibility / list|map rules unchanged ([SSR-03](STORY-SPA-SSR-03-board-list-map-toggle.md) FR).
- Popup fields from civic Issue + public `geo` only — **no** `structured_payload`, **no** pack.json.

**Out:**

- Mapbox / Google Maps SDK or token-gated tiles as default
- Server-side cluster / invent bbox HTTP (still OOS)
- Cluster = gateway lenses / knobs UI
- Provider logos on canvas
- Changing PH-04 filter contract

**Residual (document, not block MVP):**

- Exact free style source (e.g. community dark demotiles / self-host) — pick in T00 spike; record URL in task README
- Cluster library choice (`supercluster` via MapLibre layer vs addon) — T00
- Popup L10N for «Open» — reuse existing open-issue string if present; else add under `schemaRuntime.map.*` in implementation wave

---

## Analytics snapshot (for operators)

| Option rejected | Reason vs locks |
|-----------------|-----------------|
| Mapbox / Google | Q1 A; M142 branding; cost |
| Leaflet + raster only | Operator Q3 = B (MapLibre vector) |
| Direct navigate on pin | Q5 = B (popup first) |
| Cluster spider/list MVP | Q5 = A (zoom only) |
| Fixed Tallinn center | Q5 = A (fitBounds) |

---

## Handoff

- Wire this ADR from SSR-03 §Routes/ADR and ADMIN-SSR-06 T00.
- Epic scaffold **EPIC-SPA-13**: SSR-03 **T00** = implement ADR (deps + spike + style URL), not re-interview.
- Re-open only if cost model, branding, or volume assumptions change.
