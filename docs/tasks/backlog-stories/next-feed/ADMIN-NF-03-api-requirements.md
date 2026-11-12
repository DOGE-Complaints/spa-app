# ADMIN-NF-03 — API requirements (feed content)

## Meta

- **Key:** `ADMIN-NF-03-api-requirements`
- **Status:** Done
- **Depends on:** PRODUCT-BRIEF; [ADMIN-NF-01](ADMIN-NF-01-ux-mockup-intake.md) freeze
- **Blocks:** ADMIN-NF-04
- **Skill:** analysis.mdc — verify code/docs only
- **Siblings:** [Data-to-UI](../../../UX/next/feed/DOGEstonia-data-to-ui-contract-v1.0.md) · [threads-feed-ux/02](../../../architecture/threads-feed-ux/02-clients-and-write-gates.md) · [STORY-SPA-THR-api-requirements](../threads-feed/STORY-SPA-THR-api-requirements.md)
- **Deliverable:** [`STORY-SPA-NF-api-requirements.md`](STORY-SPA-NF-api-requirements.md)
- **Rework:** was ADMIN-NF-04

## Цель

Contracts ✅ / ⚠️ / ❌ for feed — cite Data-to-UI + DUI + threads arch / **path:line**. **No invent** endpoints/fields.

## Baseline (verify on execute)

| Need | Expected source | Note |
|------|-----------------|------|
| Issues list + structural filters | Gateway via existing issueService / SEARCH | `status=PUBLISHED`; no invent |
| Thread tree / knobs | Closed threads GET (THR-07…) | arch clients doc |
| Comment write | Closed POST + Bearer (THR-08) | text path only in UI |
| Reactions | Closed PUT (THR-09) + local catalog Q09 | no people API |
| Attach | Closed attach_ref; UI gated Q06 | |
| Invite | **no** send API | stub only Q18 |
| Verify gate | `identity_verified` on GET `/me` | Q07 — no auto `/verify` |
| Map pins | Issue coords if present | ship gate Q14 |
| Icons | static `public/icons/next-feed/` (after ADMIN-NF-02) | not HTTP API |

## Deliverable

[`STORY-SPA-NF-api-requirements.md`](STORY-SPA-NF-api-requirements.md): Meta · contracts per NF story · gaps FE-only · OOS people/schema/media/search.

## Acceptance

- [x] Every claim verified or TBD/Proposal labeled
- [x] No fantasized gateway/threads paths
- [x] INDEX: ADMIN-NF-03 → Done

## Как выполнять

«Выполни ADMIN-NF-03 — сверка gateway/threads/identity + Data-to-UI; напиши STORY-SPA-NF-api-requirements.md».
