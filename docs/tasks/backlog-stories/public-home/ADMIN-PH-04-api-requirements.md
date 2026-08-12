# ADMIN-PH-04 — API requirements (слой 4.3)

## Meta

- **Key:** `ADMIN-PH-04-api-requirements`
- **Status:** Done (2026-08-01)
- **Depends on:** PRODUCT-BRIEF; mockups M129–M133 (ADMIN-PH-02)
- **Blocks:** ADMIN-PH-05 (data contracts in stories)
- **Skill:** analysis.mdc — verify against real API docs / code only
- **Образец:** [`STORY-SPA-CAB-api-requirements.md`](../cabinet/STORY-SPA-CAB-api-requirements.md)
- **Deliverable:** [`STORY-SPA-PH-api-requirements.md`](STORY-SPA-PH-api-requirements.md)

## Цель

Вынести все **доп. / существующие** API-потребности PH в один документ с легендой ✅ / ⚠️ / ❌.

## Baseline (verified in deliverable)

| Need | Source | Note |
|------|--------|------|
| Issues list + filters | Gateway `GET /tallinn/issues` via `issueService` | PH-04 — **no new list API** |
| Session guest/auth | Identity `/me` + Supabase session | PH-02 |
| Logout | Client `supabase.auth.signOut` | нет identity `/logout` |
| Submit GPT URL | `VITE_STORY_GPT_URL` (env) | PH-06; Board hardcode = FE gap |
| How it works copy | static i18n | нет API |
| Footer links | static / `#` | нет API |
| Collective metrics | — | **out of scope v1** |

## Deliverable

[`STORY-SPA-PH-api-requirements.md`](STORY-SPA-PH-api-requirements.md):

1. Meta + verified date + backends (identity / gateway / none)
2. § Contracts table per PH story
3. Gaps → FE wiring only; metrics ❌ without Proposal endpoints
4. MVP mode decisions (live issues+session, static tutorial/footer, logout client, env GPT)

## Acceptance

- [x] Каждое поле/endpoint сверено grep/read с api-reference или кодом
- [x] Нет фантазийных endpoints без Proposal label
- [x] PH-04 явно: «no new list API required»
- [x] INDEX: ADMIN-PH-04 → Done

## Как выполнять

«Выполни ADMIN-PH-04: сверь gateway/identity docs и `issueService` / session shell; напиши STORY-SPA-PH-api-requirements.md».
