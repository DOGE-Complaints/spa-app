# SPA-PH-03-T05 — Story gate PH-03

**Status:** Done — P3 2026-08-04T10:46:36Z  
**Story:** [`../STORY-SPA-PH-03-public-footer.md`](../STORY-SPA-PH-03-public-footer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md) all AC  
**Depends on:** T01–T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T10:35:41Z

## Purpose
Story acceptance gate for STORY-SPA-PH-03: all backlog AC PASS with evidence; UI Path A M131 on T01; package `pkg-000047` recorded. Fill [`acceptance-verification-spa-ph-03.md`](./acceptance-verification-spa-ph-03.md) at P3 close (not this P1).

## Risk
Marking Done without UI/visual evidence or L10N/api-req checks.

## Code Facts (re-verify at execute)
- Gate stub: this folder · pattern from PH-02 T08 `acceptance-verification-spa-ph-02.md`.
- Template reference: `spa-app/docs/tasks/templates/story-acceptance-gate-template.md` (if present) / prior PH gates.
- Mockups Path A: M131 md+png (+ estonia) on T01.

## AC / DoD
- [x] (P0) All three backlog AC checked with evidence → story Done eligible.
- [x] (P0) UI-0/UI-1 Path A M131 recorded for T01; story-root screenshots if visual pipeline ran.
- [x] (P0) api-req §3.2 + icon catalog (no NEW) noted; L10N table complete.
- [x] (P0) `acceptance-verification-spa-ph-03.md` Result PASS + UTC date.

## Where to change
- `acceptance-verification-spa-ph-03.md` (fill at gate)
- Pipeline / backlog Status → Done (at P3/P6 close, not P1)
- Optional: story-root `screenshots/`

## Out of scope
Implementing footer code (T01–T04); inventing AC; committing `docs/tasks/**`.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run PublicFooter publicHome
test -f spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md
```
