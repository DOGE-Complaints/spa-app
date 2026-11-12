# STORY-SPA-SSR-01 — Issue public shape consume (typedef + repository)

## Meta

- **Key:** `STORY-SPA-SSR-01-issue-public-shape-consume`
- **Epic:** [EPIC-SPA-13](../../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md) · [pipeline](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/STORY-SPA-SSR-01-issue-public-shape-consume.md)
- **Package:** [semantic-schema-runtime/](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** Done
- **orientation:** tech_first
- **Severity:** 🟠 Medium (foundation for SSR-02/03)
- **Depends on:** REQ-16 Accepted; gateway sibling [51](../../../../../doge-complaints-gateway/docs/requirements/51-semantic-schema-runtime.md) Issue wire; [api-req](STORY-SPA-SSR-api-requirements.md) §5 API ready
- **Blocks:** SSR-02, SSR-03 (soft — can stub in stories, but field drop risk without this)
- **REQ:** [16-semantic-schema-spa-compatibility.md](../../../requirements/16-semantic-schema-spa-compatibility.md) §3–4, AC-SPA-REQ3-03, AC-SPA-CARD-01, AC-SPA-MAP-01
- **P3 Done:** 2026-09-02T19:37:42Z · `pkg-000074` · [gate](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/task-spa-ssr-01-t04-story-gate-ssr-01/acceptance-verification-spa-ssr-01.md)

## Зачем простыми словами

Gateway отдаёт optional `schema_card` и `geo` на public Issue. **As-of-Done (P3 `pkg-000074`):** SPA типизирует эти поля и прокидывает их из `GatewayIssueRepository` без UI — foundation для overlay (SSR-02) и map (SSR-03). **Historical:** до T01/T02 поля молча терялись на FE (нет typedef / silent drop risk).

## Текущее состояние (verified)

### As-of-Done (Current — post P3 2026-09-02)

| Fact | Evidence |
|------|----------|
| HTTP list / detail | `GET {base}/node/issues` · `/{id}` — [`GatewayIssueRepository.js:88`](../../../../src/repositories/GatewayIssueRepository.js) / L98 |
| Pass-through | [`passThroughPublicIssue`](../../../../src/repositories/GatewayIssueRepository.js) L77 · list L93 · detail L106 |
| `Issue` typedef | [`types.js`](../../../../src/domain/types.js) `IssueSchemaCard` / `IssueGeo` L56–69 · optional `@property schema_card` / `geo` L85–86 |
| Validators | `isOptionalSchemaCard` · `isOptionalIssueGeo` (rejects `admin_*` / `street` / `house`) wired into `isIssue` L229–230 |
| spa `src/` `schema_card` | present in `domain/types.js` + tests + repo comment — **not** UI overlay |
| `structured_payload` consumer | **0** product hits |
| Gateway public shape | optional `schema_card` [`dto.py:57–58`](../../../../../doge-complaints-gateway/src/core/projection/dto.py); `geo.*` incl. `detail_level` [`mapper.py:37–52`](../../../../../doge-complaints-gateway/src/core/projection/mapper.py) |
| Tallinn `card_fields` | MVP Declare Done — [GW-SSR-30](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-30-tallinn-card-fields-spa-overlay-readiness.md) |
| API sufficiency | [api-req §5](STORY-SPA-SSR-api-requirements.md) — no new gateway endpoints |

### Historical (pre-T01 / pre-P3)

| Fact | Evidence |
|------|----------|
| `Issue` typedef | omitted `geo` / `schema_card` (pre-T01) |
| spa `src/` grep `schema_card` | **0** product (pre-T01) |
| HTTP list cite | often pointed at L77 as URL — disk L77 is now `passThroughPublicIssue` (line drift) |

## Функциональные требования (FR)

- **FR-SSR-01.1** Domain `Issue` (or adjacent DTO) MAY include optional `schema_card?: Record<string, string | number | boolean | null>` with **flat dotted-path keys** verbatim from gateway.
- **FR-SSR-01.2** Domain `Issue` MAY include optional `geo?: { lat?: number; lon?: number; label?: string; district?: string; settlement?: string; region?: string; country?: string; detail_level?: string }` — **public keys only** ([api-req §2.2](STORY-SPA-SSR-api-requirements.md); [ADMIN-SSR-04](ADMIN-SSR-04-api-requirements.md)). Pin eligibility (SSR-03) uses **lat+lon** only; `detail_level` is optional metadata.
- **FR-SSR-01.3** `GatewayIssueRepository` (and any normalizer) MUST NOT strip unknown Issue keys that gateway returns in public envelope — preserve `schema_card` and `geo` if present.
- **FR-SSR-01.4** MUST NOT add client fetch for `structured_payload`, pack.json, or schema-metadata routes (AC-SPA-REQ3-03/04).
- **FR-SSR-01.5** MUST NOT rename public Issue fields (`admin_*` on wire forbidden).
- **FR-SSR-01.6** No UI changes in this story — consumers SSR-02/03 only.

## Субтаски

| Таск | Суть | Швы |
|------|------|-----|
| **[T01](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/task-spa-ssr-01-t01-issue-typedef-schema-card-geo/README.md)** | Extend `Issue` typedef: optional `schema_card` + public `geo` (incl. `detail_level`) | `domain/types.js` |
| **[T02](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/task-spa-ssr-01-t02-repository-passthrough/README.md)** | Repository pass-through — не strip sidecar keys | `GatewayIssueRepository.js` |
| **[T03](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/task-spa-ssr-01-t03-vitest-fixture-parse/README.md)** | Vitest fixture parse `schema_card` + `geo` | `__tests__` |
| **[T04](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/task-spa-ssr-01-t04-story-gate-ssr-01/README.md)** | Story gate SSR-01 | — |
| **[T05](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/task-spa-ssr-01-t05-as-of-done-backlog-verified-ssot/README.md)** | As-of-Done backlog verified SSOT (P6 F1) | backlog story |
| **[T06](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/task-spa-ssr-01-t06-package-index-ssr-01-done/README.md)** | Package INDEX SSR-01 Done (P6 F2) | package INDEX |
| **[T07](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/task-spa-ssr-01-t07-epic-bullrun-wave0-phrasing/README.md)** | Epic + bullrun Wave 0 phrasing (P6 F3) | epic / bullrun |

> Pipeline mirror: [STORY-SPA-SSR-01 (epic)](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/STORY-SPA-SSR-01-issue-public-shape-consume.md)

## API / naming contract

Full table: [ADMIN-SSR-04](ADMIN-SSR-04-api-requirements.md) · [STORY-SPA-SSR-api-requirements.md](STORY-SPA-SSR-api-requirements.md) (§2 shape · **§5 verdict: API ready for FE**; no new HTTP).

## Acceptance Criteria

- [x] `Issue` typedef documents optional `schema_card` + `geo` with public key names (incl. optional `geo.detail_level`)
- [x] Repository passes through sidecar fields from `envelope.data.issues[]` without mutation
- [x] Vitest (or equivalent) proves parse of fixture Issue with both fields
- [x] No new HTTP endpoints; no `structured_payload` handling added
- [x] grep: no `admin_district` etc. invented on Issue object in spa
- [x] Aligns with [api-req §5](STORY-SPA-SSR-api-requirements.md) (consume existing `/node/issues` only)

## Вне scope

- Rendering overlay (SSR-02)
- Map toggle / pins (SSR-03)
- L10N dictionary population (SSR-02 / ADMIN-SSR-05)
- GeoFilter query key changes (existing SEARCH-05 contract)

## Швы

- `domain/types.js` · `GatewayIssueRepository.js` · gateway `dto.py` / `mapper.py`
- Downstream: `IssueCard.jsx`, `IssuePage.jsx`, `BoardPage.jsx`
