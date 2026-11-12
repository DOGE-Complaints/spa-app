# SPA-REQ10-02-T04 — Vitest Keep + write path + no invent

**Status:** Done · P3 `2026-09-28T18:22:01Z`  
**Story:** [`../STORY-SPA-REQ10-02-reaction-selected-reload.md`](../STORY-SPA-REQ10-02-reaction-selected-reload.md)  
**Decision Ref:** backlog STORY-SPA-REQ10-02 · AC-02…05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-28T18:17:14Z`  
**Package:** `pkg-000088`

## Purpose

Prove mapper/props for Option A `selected`; Keep empty strip (`marks = marksState || []`); no new threads HTTP path; PUT U2 write-response still applies `data.selected` / `summary_marks` (THR-09 regression).

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Keep empty strip | `ReactionControls.jsx` marks fallback |
| Write applies selected | `ReactionControls.jsx:108–109` |
| Closed paths SSOT | `ThreadsSocialClient.js` `CLOSED_SOCIAL_PATHS` |
| Existing client/mapper tests | `ThreadsSocialClient.test.js` |

## AC / DoD

- [x] (P0) Vitest covers selected map + initialSelected wiring smoke — **AC-01**
- [x] (P0) Counts from summaries evidenced — **AC-02**
- [x] (P0) Empty marks → empty strip — **AC-03**
- [x] (P0) No new invent path in client — **AC-04**
- [x] (P0) PUT U2 selected/summary_marks update still green — **AC-05**
- [x] (P0) H9 optional — **not** required — **AC-06**

## Where to change

- Tests under `spa-app/src/**/__tests__/` / threads component tests as needed
- Evidence only for path inventory (`rg` Closed paths)

## Out of scope

Product wire (T01–T03) · story gate Date (T05) · H9 puppeteer Pass

## Verification

```bash
cd spa-app && npx vitest run src/repositories/__tests__/ThreadsSocialClient.test.js
# plus any new/updated component tests for selected
rg -n 'by-issue|/threads/' spa-app/src/repositories/ThreadsSocialClient.js | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
