# SPA-PH-04-T08 — Story gate PH-04

**Status:** Done — P3 2026-08-04T12:16:21Z
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) all AC  
**Depends on:** T01–T07  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T11:24:18Z

## Purpose
Story acceptance gate for STORY-SPA-PH-04: all backlog AC PASS with evidence; UI Path A M132 on T01; package `pkg-000048` recorded. Fill [`acceptance-verification-spa-ph-04.md`](./acceptance-verification-spa-ph-04.md) at P3 close (not this P1).

## Risk
Marking Done without UI/visual evidence or L10N/api-req/icon checks; restoring columns.

## Code Facts (re-verify at execute)
- Gate stub: this folder · pattern from PH-03 T05 `acceptance-verification-spa-ph-03.md`.
- Mockups Path A: M132 md+png (+ estonia) on T01.
- api-req §2.1 + icon catalog linked.

## AC / DoD
- [x] (P0) All five backlog AC checked with evidence → story Done eligible.
- [x] (P0) UI-0/UI-1 Path A M132 recorded for T01; story-root screenshots if visual pipeline ran.
- [x] (P0) api-req §2.1 + icon catalog + L10N table noted.
- [x] (P0) `acceptance-verification-spa-ph-04.md` Result PASS + UTC date (at P3).

## Where to change
- `acceptance-verification-spa-ph-04.md` (fill at gate)
- Pipeline / backlog Status → Done (at P3/P6 close, not P1)
- Optional: story-root `screenshots/`

## Out of scope
Implementing feed code (T01–T07); inventing AC; committing `docs/tasks/**`; new APIs; metrics; PH-06 CTA.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run BoardPage publicHome
test -f spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md
```
