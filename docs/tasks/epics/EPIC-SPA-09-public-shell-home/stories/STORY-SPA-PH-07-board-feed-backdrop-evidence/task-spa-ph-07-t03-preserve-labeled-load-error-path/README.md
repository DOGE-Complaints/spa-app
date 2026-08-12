# SPA-PH-07-T03 — Preserve labeled load-error path

**Status:** Done — P3 PASS 2026-08-06T13:45:10Z  
**Story:** [`../STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../STORY-SPA-PH-07-board-feed-backdrop-evidence.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md) FR-PH-07.2  
**Depends on:** SPA-PH-07-T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-06T13:24:06Z  
**Package:** `pkg-000052`

## Purpose
Keep M132 **load-error** capturable and valid when the evidence goal is error-state (PH-04 pattern). T01 `error` mode (and/or existing PH-04 runner) must still produce `board-load-error`; chrome wiring in T02 must not delete this path.

## Risk
Removing PH-04 error edge shots; making load-error unreachable from helpers; conflating chrome happy with error evidence.

## Code Facts (re-verify at execute)
- PH-04 full-cycle writes `05-edge-mock-load-error-*.png` and labels H1 as live-load-error in [`…/STORY-SPA-PH-04-…/screenshots/README.md`](../../STORY-SPA-PH-04-board-feed-home/screenshots/README.md).
- `data-testid="board-load-error"` remains product UI (PH-04).

## AC / DoD
- [x] (P0) Load-error evidence remains possible via T01 `error` and/or PH-04 runner → FR-PH-07.2; backlog AC #2.
- [x] (P0) PH-04 load-error capture path still works (`npm run test:ui:board-shell` / PH-04 full-cycle as applicable).
- [x] (P0) No Board load-error UX redesign → backlog «Вне scope».

## Where to change
- Ensure T01 helper retains `error` mode
- Docs/assert note in PH-04 or PH-07 task only if PH-04 import refactor needs a smoke check

## Out of scope
Screenshot indexer wording (T04); chrome runner happy path (T02).

## Verification
```bash
cd spa-app && npm run test:ui:board-shell
# or PH-04 full-cycle: edge mock load-error PNG still produced / selector waitable
rg -n "board-load-error|mode = 'error'|error" spa-app/tests/puppeteer/
```

Gate Date: 2026-08-06T13:45:10Z.
Gate: [`acceptance-verification-spa-ph-07-t03.md`](./acceptance-verification-spa-ph-07-t03.md)
