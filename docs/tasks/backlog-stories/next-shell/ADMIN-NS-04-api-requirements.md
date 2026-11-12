# ADMIN-NS-04 — API requirements (shell)

## Meta

- **Key:** `ADMIN-NS-04-api-requirements`
- **Status:** Done
- **Depends on:** PRODUCT-BRIEF; ADMIN-NS-02 freeze
- **Blocks:** ADMIN-NS-05
- **Skill:** analysis.mdc — verify against real API docs / code only
- **Образец:** [ADMIN-PH-04](../public-home/ADMIN-PH-04-api-requirements.md)
- **Deliverable:** [`STORY-SPA-NS-api-requirements.md`](STORY-SPA-NS-api-requirements.md)

## Цель

Вынести API-потребности **shell** в один документ с легендой ✅ / ⚠️ / ❌. **Без invent** endpoints/fields.

## Baseline (verify on execute)

| Need | Expected source | Note |
|------|-----------------|------|
| Session guest/auth for account chrome | Identity `/me` + Supabase session (PH/ID) | Reuse |
| Logout | Client `supabase.auth.signOut` | Reuse |
| Nav / shelter links | static hash routes | No API |
| Own-story metrics (Q15) | Existing CAB / story-activity seams | **Verify path:line or sibling REQ**; else ⚠️ TBD Open question |
| Issues list / threads | — | **OOS** this package (feed package) |
| Right-rail data | — | ❌ no production module (Q16) |
| Icons / logo | static public assets | Not HTTP API |

## Deliverable

[`STORY-SPA-NS-api-requirements.md`](STORY-SPA-NS-api-requirements.md):

1. Meta + verified date + backends  
2. Contracts table per NS story  
3. Gaps → FE wiring only; Proposal/TBD labeled  
4. Explicit: no new list/thread API for shell package

## Acceptance

- [x] Every endpoint/field verified or labeled Proposal/TBD
- [x] No fantasized gateway/threads paths
- [x] INDEX: ADMIN-NS-04 → Done
- [x] Explicit: no new list/thread API for shell; reuse only

## Как выполнять

«Выполни ADMIN-NS-04: сверка identity/session + any own-story API; напиши STORY-SPA-NS-api-requirements.md».
