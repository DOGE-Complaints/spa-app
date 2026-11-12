# SPA-NF-03-T04 — Capture distinct MAP-ERROR full-cycle PNG (F1)

**Status:** ✅ Done · P6 `2026-10-10T19:03:46Z`  
**Story:** [`../STORY-SPA-NF-03-list-map-toggle.md`](../STORY-SPA-NF-03-list-map-toggle.md)  
**Decision Ref:** [audit-STORY-SPA-NF-03-execution-2026-10-10.md](../../../../../../analysis/audit-STORY-SPA-NF-03-execution-2026-10-10.md) · F1 Medium  
**ui_scope:** `feed` (screenshots / evidence)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T18:57:13Z`  
**Done:** `2026-10-10T19:03:46Z`  
**Package:** `pkg-000105` (unchanged · `run_mode=spa_nf_03_audit_2026_10_10`)  
**Gaps:** F1 → **CLOSED**  
**acceptance:** [`acceptance-verification-spa-nf-03-t04.md`](./acceptance-verification-spa-nf-03-t04.md)  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md)

## Purpose

Replace/relabel dishonest `01-feed-map-error-retry-…` (host feed error) with a distinct Path A **MAP-ERROR** frame: `data-testid="feed-map-error"` + return-to-list. Keep an honest host-error file if needed. Update story-root README matrix → pass.

## Code Facts (As-of-Scaffold)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Map-region error UI Present | [`FeedMapArea.jsx`](../../../../../../../src/features/feed/FeedMapArea.jsx) `feed-map-error` · Return to List |
| 2 | P3 `01` = host abort frame | audit §2 · md5 shared with prior host error |
| 3 | No invent map HTTP | same list gateway · `onErrorCapture` / demo harness OK |

## AC / DoD

- [x] Distinct full-cycle PNG shows map-region MAP-ERROR (`feed-map-error` + list return)
- [x] Host feed error either renamed/separate or not claimed as MAP-ERROR
- [x] Story-root `screenshots/README.md` matrix updated
- [x] No invent map/geocode HTTP · no shell invent
- [x] Gap F1 CLOSED in P6 acceptance

## Where to change

- `…/screenshots/full-cycle/**`
- `…/screenshots/README.md`
- Optional: minimal capture harness in `FeedMapArea` (sessionStorage / demo flag) — no new HTTP

## Out of scope

Pin visibility (F2 → T05) · F3–F5 WAIVED · invent map API · shell chrome

## Verification

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-03-list-map-toggle/screenshots/full-cycle/
rg -n "MAP-ERROR|feed-map-error|host" spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-03-list-map-toggle/screenshots/README.md
```
