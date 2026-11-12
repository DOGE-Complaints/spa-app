# ADMIN-ESD-04 — API requirements (слой 4.3)

## Meta

- **Key:** `ADMIN-ESD-04-api-requirements`
- **Status:** Done (2026-08-16; deliverable enriched re-verify same day)
- **Depends on:** PRODUCT-BRIEF; mockups (ADMIN-ESD-02)
- **Blocks:** ADMIN-ESD-05 (data contracts in stories)
- **Skill:** analysis.mdc — verify against real API docs / code only
- **Образец:** [`ADMIN-PH-04`](../public-home/ADMIN-PH-04-api-requirements.md)
- **Deliverable:** [`STORY-SPA-ES-api-requirements.md`](STORY-SPA-ES-api-requirements.md)

## Цель

Вынести API-потребности ES в один **FE-контракт** с легендой ✅ / ⚠️ / ❌ / Unknown. **Запрет:** invent gateway paths/fields.

## Baseline (verified 2026-08-16)

| Need | Source | Note |
|------|--------|------|
| Issues list (L3) | Gateway `GET /tallinn/issues` via `issueService` / `GatewayIssueRepository.js:76` | ES-01/05 — **consume existing** ✅ |
| Board empty vs discovery trigger | Client: `issues.length === 0` path in `BoardPage` | FE composition switch ✅ |
| Network Pulse L1 | `GET /tallinn/network-pulse` · [REQ-49](../../../../../doge-complaints-gateway/docs/requirements/49-early-signal-network-pulse-l1-api.md) · [API_REFERENCE](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md) · `NetworkPulseService` | Backend ✅ · SPA ⚠️ FE gap (no consumer) |
| Emerging L2 | `GET /tallinn/emerging-signals` · [REQ-50](../../../../../doge-complaints-gateway/docs/requirements/50-early-signal-emerging-l2-api.md) · openapi `top_n` `[1,50]` | Backend ✅ · SPA ⚠️ FE gap; Emerging ≠ Issues |
| UI bind / omit matrix | STORY §2.2 (M137 → REQ-49 fields; Contributors/Voices omit) | AC-SPA-ES-08 ✅ documented |
| Submit / Help GPT | Existing `VITE_STORY_GPT_URL` / board CTAs | ES-04 — reuse ✅ |
| Coverage gaps | No coverage HTTP; abstract / qualitative labels only (STORY §4) | M139 ✅ |
| Viz / density / picture-forming | No API (STORY §5) | CSS/component ✅ |
| `/dashboard` | REQ-12 | **Out of scope** — regression only |

## Deliverable

[`STORY-SPA-ES-api-requirements.md`](STORY-SPA-ES-api-requirements.md):

1. Meta + verified date + backends (REQ-49/50, openapi, handlers, spa Issues)
2. Contracts table per ES story (ES-01…05) + viz-only rows
3. Pulse envelope + **UI bind/omit** map (AC-SPA-ES-08)
4. Emerging query/`signals` + empty/failure → omit
5. Coverage/Help = env + abstract (no coverage DTO)
6. Schema-derived example JSON envelopes
7. Errors/degrade rules (verified 200 success; FE omit on failure)
8. Gaps → FE wiring only; no invented endpoints
9. MVP mode: live Issues L3; Pulse/Emerging bind **or** omit; static i18n for framing

## Acceptance

- [x] Every endpoint/field verified via Read/Grep or marked Unknown
- [x] No fantasy endpoints without Proposal + TBD note
- [x] ES-02 explicitly: bind only sibling-approved fields **or** omit (AC-SPA-ES-08)
- [x] UI bind/omit matrix (Stories/Areas/Languages/topics/7d; Contributors/Voices omit)
- [x] Envelope examples + Emerging `top_n` + degrade-to-omit
- [x] Coverage abstract / viz no-API documented
- [x] ES-01…05 touchpoints for ADMIN-05
- [x] INDEX: ADMIN-ESD-04 → Done

## Как выполнять

«Выполни ADMIN-ESD-04: сверка gateway REQ-49/50 + API_REFERENCE + openapi + spa BoardPage / GatewayIssueRepository; напиши полный STORY-SPA-ES-api-requirements.md (bind/omit, envelopes, gaps) без invented paths».
