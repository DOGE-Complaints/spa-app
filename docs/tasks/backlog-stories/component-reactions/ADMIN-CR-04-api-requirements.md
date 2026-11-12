# ADMIN-CR-04 — API requirements (reuse Closed social)

## Meta

- **Key:** `ADMIN-CR-04-api-requirements`
- **Status:** Done (2026-10-14T09:33:02Z)
- **Depends on:** PRODUCT-BRIEF; UX inventory (same as ADMIN-CR-03 Вход)
- **Blocks:** ADMIN-CR-05
- **Skill:** analysis.mdc — verify against Data-to-UI / code only; **prefer reuse over new**
- **Образец:** `public-home/ADMIN-PH-04-api-requirements.md`
- **Sibling SSOT (do not fork):** [STORY-SPA-NF-api-requirements.md](../next-feed/STORY-SPA-NF-api-requirements.md) §2 THREADS Closed
- **Deliverable:** [`STORY-SPA-CR-api-requirements.md`](STORY-SPA-CR-api-requirements.md)

## Цель

Один документ: что ReactionsMount / lab **потребляет** vs fixtures vs blocked (M155) — с явным **reuse** `ThreadsSocialClient` / knobs / catalog (REQ-22 FR-22.15 · PRODUCT-BRIEF data-plane lock).

## Вход — UX files

Same as ADMIN-CR-03 Вход (full table). Layer-critical paths:

- `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+ `.png`) — aggregate/selection/write UX  
- `spa-app/docs/UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md` (+ `.png`) — people **blocked** (`DUI-Q08`)  
- `spa-app/docs/UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md` (+ `.png`) — no new API  

## Baseline (verified in deliverable)

| Need | Source | Lab (REQ-24 L6) | Status |
|------|--------|-----------------|--------|
| Knobs | `GET /threads/knobs` via [`ThreadsSocialClient.getKnobs`](../../../../src/repositories/ThreadsSocialClient.js) + [`threadsKnobsCache.js`](../../../../src/repositories/threadsKnobsCache.js) | Fixture default max=3; fail-closed if live absent | ✅ **reuse** |
| Tree + aggregates | `GET /threads/issues/{issue_id}` · [`mapThreadTreeToBlock.js`](../../../../src/repositories/mapThreadTreeToBlock.js) | Fixture `summary_marks` / `aggregate_count` / optional `selected[]` | ✅ **reuse** |
| Reaction mutation | `PUT /threads/issues/{issue_id}/reactions` · `client.react` (~L454) | FixtureAdapter local state OK for lab AC; LiveAdapter optional later | ✅ **reuse** |
| `onReact` seam | [`ReactionChrome.jsx`](../../../../src/features/feed/reactions/ReactionChrome.jsx) · [`LiveIssueThreadMount.jsx`](../../../../src/components/threads/LiveIssueThreadMount.jsx) | Same callback shape | ✅ **reuse contract** |
| Catalog metadata | Local `reactions.v1` ([`reactionsV1Catalog.js`](../../../../src/components/threads/reactionsV1Catalog.js)) · `DUI-Q09` | Local ship | ✅ **reuse** |
| People / Connect | — | OOS | ❌ M155 · `DUI-Q08`/`Q17` |
| New reaction HTTP client | — | — | ❌ forbidden (FR-22.15) |
| Verify gate | Sibling REQ-22 FR-22.8 / M157 | Stub writeCapability in lab | Do not invent discriminator |

**Sibling honesty:** [REQ-19](../../../requirements/19-req10-threads-reaction-reload-honesty.md) — `selected` reload; reuse, don’t reinvent.

**Adapter split (documented in deliverable):**

```
ReactionsMount (UI)
  → FixtureAdapter (lab default) | LiveThreadsReactionAdapter (thin)
       → ThreadsSocialClient + knobsCache + catalog
```

## Deliverable

[`STORY-SPA-CR-api-requirements.md`](STORY-SPA-CR-api-requirements.md):

1. Meta + verified date + **pointer to NF-api §2** as Closed path SSOT  
2. ✅/⚠️/❌ matrix — emphasize **reuse** rows  
3. Gaps → FE adapter wiring only; no Proposal endpoints for reactions write/read already Closed  
4. MVP mode: **lab fixtures first**; live adapter optional fail-closed · explicit **no people API** · **no second client**

## Acceptance

- [x] Every field/endpoint cited from Data-to-UI or code path:line — else Unknown/Open  
- [x] Explicit reuse of `ThreadsSocialClient` / knobs / catalog; no invent paths  
- [x] Points to NF-api §2 (not a forked endpoint list as new SSOT)  
- [x] No invented people endpoints  
- [x] Lab fixture mode + `onReact` seam documented  
- [x] INDEX ADMIN-CR-04 → Done  

## Как выполнять

«Выполни ADMIN-CR-04: сверка Data-to-UI + ThreadsSocialClient + NF-api §2; напиши STORY-SPA-CR-api-requirements.md как **reuse map** + lab FixtureAdapter; M155 = blocked; no second client».

**Executed:** 2026-10-14T09:33:02Z.
