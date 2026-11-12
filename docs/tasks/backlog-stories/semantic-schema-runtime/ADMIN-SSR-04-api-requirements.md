# ADMIN-SSR-04 — API requirements (слой 4.3)

## Meta

- **Key:** `ADMIN-SSR-04-api-requirements`
- **Status:** **Done** (2026-09-02)
- **Depends on:** PRODUCT-BRIEF; visual freeze after ADMIN-SSR-02
- **Blocks:** ADMIN-SSR-05 (data contracts in stories)
- **Skill:** analysis.mdc — verify against real API docs / code only
- **Образец:** [`STORY-SPA-PH-api-requirements.md`](../public-home/STORY-SPA-PH-api-requirements.md) · [`STORY-SPA-ES-api-requirements.md`](../early-signal-dashboard/STORY-SPA-ES-api-requirements.md)
- **Deliverable:** [`STORY-SPA-SSR-api-requirements.md`](STORY-SPA-SSR-api-requirements.md)

## Цель

Вынести все API-потребности SSR в один документ с легендой ✅ / ⚠️ / ❌. Без invented HTTP.

## Baseline (verified 2026-09-02)

| Need | Source | Note |
|------|--------|------|
| Issues list | `GET /node/issues` · [`GatewayIssueRepository.js:77`](../../../../src/repositories/GatewayIssueRepository.js) | **no new list API** ✅ |
| Issue detail | L85 `GET …/node/issues/{id}` | same envelope ✅ |
| `schema_card` | gateway [`dto.py:57–58`](../../../../../doge-complaints-gateway/src/core/projection/dto.py); spa grep **0** | civic-only when pack omits `card_fields` · SPA ⚠️ |
| `geo.lat`/`lon` (+ label/district/…/`detail_level`) | [`mapper.py:37–52`](../../../../../doge-complaints-gateway/src/core/projection/mapper.py) | map eligibility = lat+lon ✅ data / ❌ UI |
| Filters `geo_*` | [`geoAdminFilterKeys.js:4–18`](../../../../src/i18n/geoAdminFilterKeys.js) | do not break ✅ |
| `structured_payload` auto-public | spa **0**; dto no dump | SPA-003 ✅ |
| Schema-metadata / pack.json UI | — | ❌ do not invent |
| bbox | [`boardQuery.js:9`](../../../../src/router/boardQuery.js) | ⚠️ future — not this Draft |
| Pulse/Emerging | spa 15 | OOS |

Naming contract + per-story tables: **SSOT** [`STORY-SPA-SSR-api-requirements.md`](STORY-SPA-SSR-api-requirements.md) §2–§3.

## Deliverable

[`STORY-SPA-SSR-api-requirements.md`](STORY-SPA-SSR-api-requirements.md):

1. MVP mode — no new HTTP; Issue body only for overlay/map
2. §0 contracts by SSR-01…03
3. §1 consume existing `GET /node/issues`
4. §2 naming: `schema_card` + public `geo` (incl. `detail_level`) + filters
5. §3 per-story needs + §4 FE gaps only

## Acceptance

- [x] Каждое поле/path сверено Read/Grep или Unknown
- [x] Нет фантазийных endpoints
- [x] Явно: no new list API; gateway public geo keys on Issue (incl. `detail_level`)
- [x] INDEX: ADMIN-SSR-04 → Done

## Как выполнять

«Выполни ADMIN-SSR-04: сверь gateway 51 / dto / mapper и `GatewayIssueRepository`; напиши STORY-SPA-SSR-api-requirements.md».
