# SPA-PH-07-T04 — Screenshot indexer backdrop labels

**Status:** Done — P3 PASS 2026-08-06T13:45:10Z  
**Story:** [`../STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../STORY-SPA-PH-07-board-feed-backdrop-evidence.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md) FR-PH-07.2 · FR-PH-07.3 · FR-PH-07.4  
**Depends on:** SPA-PH-07-T02 · SPA-PH-07-T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-06T13:24:06Z  
**Package:** `pkg-000052`

## Purpose
Story-root (and chrome story) screenshot READMEs **name** backdrop mode: chrome shots → intentional results/empty; load-error shots → explicitly M132 error. Prevent audit «noise» when Submit/header AC are closed but backdrop was accidental error.

## Risk
Leaving PH-06 H1/H2 labeled as generic «happy» while still on load-error; inventing new AC wording.

## Code Facts (re-verify at execute)
- PH-07 stub: [`../screenshots/README.md`](../screenshots/README.md).
- PH-06 indexer: [`../../STORY-SPA-PH-06-submit-story-gpt-cta/screenshots/README.md`](../../STORY-SPA-PH-06-submit-story-gpt-cta/screenshots/README.md).
- PH-04 already labels H1 as live-load-error (T11) — pattern to reuse.

## AC / DoD
- [x] (P0) Load-error evidence rows are **explicitly named** in indexer when goal is M132 error → FR-PH-07.2; AC #2.
- [x] (P0) Chrome/CTA evidence rows document intentional backdrop (results/empty) → FR-PH-07.3 · FR-PH-07.4.
- [x] (P0) Live/mock paths note backdrop mode; no silent «healthy board» claim on error PNGs.

## Where to change
- `…/STORY-SPA-PH-07-…/screenshots/README.md`
- Update notes in PH-06 (and optionally PH-01) screenshot README if chrome board shots remain there

## Out of scope
Product code; new artboards.

## Verification
```bash
rg -n "load-error|backdrop|results|empty|chrome" \
  spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-07-board-feed-backdrop-evidence/screenshots/README.md \
  spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-06-submit-story-gpt-cta/screenshots/README.md
```

Gate Date: 2026-08-06T13:45:10Z.
Gate: [`acceptance-verification-spa-ph-07-t04.md`](./acceptance-verification-spa-ph-07-t04.md)
