# SPA-PH-07-T01 — Shared board-feed backdrop helper

**Status:** Done — P3 PASS 2026-08-06T13:45:10Z  
**Story:** [`../STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../STORY-SPA-PH-07-board-feed-backdrop-evidence.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md) FR-PH-07.1  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-06T13:24:06Z  
**Package:** `pkg-000052`

## Purpose
Extract a shared puppeteer helper that intentionally sets `/board` feed backdrop for evidence: modes `results` | `empty` | `error` (request interception pattern from PH-04). Chrome/CTA runners must call this helper instead of inheriting gateway availability.

## Risk
Duplicating PH-04 interception with divergent URLs; changing product Board UX; inventing a new list API.

## Code Facts (re-verify at execute)
- PH-04 interception modes live in [`tests/puppeteer/public-board-ph04-full-cycle.mjs`](../../../../../../../tests/puppeteer/public-board-ph04-full-cycle.mjs) (`results` / `empty` / filtered / `error`).
- Load-error UI: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) `data-testid="board-load-error"`.
- No shared helper module under `tests/puppeteer/` for board feed backdrop today.

## AC / DoD
- [x] (P0) Shared helper exposes intentional backdrop modes `results` | `empty` | `error` → FR-PH-07.1; backlog AC #1 (enabler).
- [x] (P0) Helper is importable from chrome and feed evidence runners without copying PH-04 inline blocks.
- [x] (P0) No product Board UX rewrite; no new gateway list API → backlog «Вне scope».

## Where to change
- New module e.g. `spa-app/tests/puppeteer/lib/boardFeedBackdrop.mjs` (name at execute)
- Optionally thin refactor of PH-04 runner to import helper (parity; not required if PH-04 stays stable)

## Out of scope
Wire chrome runners (T02); indexer labels (T04); story gate (T06).

## Verification
```bash
# After implement: node can import helper; unit/smoke call with mocked page optional
rg -n "boardFeedBackdrop|results|empty|error" spa-app/tests/puppeteer/
```

Gate Date: 2026-08-06T13:45:10Z.
Gate: [`acceptance-verification-spa-ph-07-t01.md`](./acceptance-verification-spa-ph-07-t01.md)
