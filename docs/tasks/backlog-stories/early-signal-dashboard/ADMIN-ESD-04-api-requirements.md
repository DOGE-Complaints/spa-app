# ADMIN-ESD-04 — API requirements (слой 4.3)

## Meta

- **Key:** `ADMIN-ESD-04-api-requirements`
- **Status:** Todo
- **Depends on:** PRODUCT-BRIEF; mockups (ADMIN-ESD-02)
- **Blocks:** ADMIN-ESD-05 (data contracts in stories)
- **Skill:** analysis.mdc — verify against real API docs / code only
- **Образец:** [`ADMIN-PH-04`](../public-home/ADMIN-PH-04-api-requirements.md)
- **Deliverable (later):** `STORY-SPA-ES-api-requirements.md`

## Цель

Вынести API-потребности ES в один документ с легендой ✅ / ⚠️ / ❌ / Unknown. **Запрет:** invent gateway paths/fields.

## Baseline (verified now)

| Need | Source | Note |
|------|--------|------|
| Issues list (L3) | Gateway `GET /tallinn/issues` via `issueService` / `GatewayIssueRepository.js:76` | ES-01/05 — **consume existing** |
| Board empty vs discovery trigger | Client: `issues.length === 0` path in `BoardPage` | FE composition switch |
| Pulse / Emerging aggregates | Sibling REQ-48 · seam TBD | **Unknown** until PA.2 / TASK-GW-ES-04 — no path in parent |
| Submit / Help GPT | Existing `VITE_STORY_GPT_URL` / board CTAs | ES-04 — reuse |
| `/dashboard` | REQ-12 | **Out of scope** — regression only |

## Deliverable

`STORY-SPA-ES-api-requirements.md`:

1. Meta + verified date + backends
2. Contracts table per ES story
3. Gaps → sibling TBD labeled Unknown / Proposal only with operator approval
4. MVP mode: live Issues L3; Pulse omit-or-copy until contract; static i18n for framing

## Acceptance

- [ ] Every endpoint/field verified via Read/Grep or marked Unknown
- [ ] No fantasy endpoints without Proposal + TBD note
- [ ] ES-02 explicitly: bind only sibling-approved fields **or** omit (AC-SPA-ES-08)
- [ ] INDEX: ADMIN-ESD-04 → Done

## Как выполнять

«Выполни ADMIN-ESD-04: сверка gateway 48 / spa BoardPage / GatewayIssueRepository; напиши STORY-SPA-ES-api-requirements.md без invented paths».
