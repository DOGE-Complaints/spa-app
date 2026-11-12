# SPA-ES-04-T06 — Story gate ES-04

**Status:** Done  
**Story:** [`../STORY-SPA-ES-04-coverage-gaps-contribution.md`](../STORY-SPA-ES-04-coverage-gaps-contribution.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md) · story AC  
**Depends on:** T01–T05  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-04-t01-whats-missing-abstract/ui-mockup-spec.md`](../task-spa-es-04-t01-whats-missing-abstract/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:54:44Z · **P3:** 2026-08-17T12:02:25Z  
**Package:** `pkg-000069`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png
```

## Purpose
Story acceptance-verification for ES-04. Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md). Fill [`acceptance-verification-spa-es-04.md`](./acceptance-verification-spa-es-04.md) after live P3 (`Date` from `--print-utc-now` only).

## Risk
Filling PASS / live `Date:` before P3; mixing ES-01/02/03/05; inventing AC.

## Code Facts (re-verify at execute)
- Gate file scaffolded unfilled (this P1) — **no** `Date:` until P3 live-run.
- Story-root `screenshots/` exists (empty pack until P3 UI-3).

## AC / DoD
- [x] (P0) Missing = abstract/qualitative; no coverage score API.
- [x] (P0) Help CTA uses `VITE_STORY_GPT_URL` helper (PH-06); no Offers (AC-SPA-ES-06); no forbidden strings (AC-SPA-ES-03).
- [x] (P0) Links: M139 · icons · api-req §4 · L10N.
- [x] (P0) Gate file filled after live P3; `Date:` from `--print-utc-now` only (do not invent)

## Where to change
- Fill [`acceptance-verification-spa-es-04.md`](./acceptance-verification-spa-es-04.md) after live P3
- Story-root `screenshots/` at P3 (Path A UI-3)

## Out of scope
P1 product code. Invent AC. ES-05. Git push.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
test -f spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/task-spa-es-04-t06-story-gate-es-04/acceptance-verification-spa-es-04.md
```
