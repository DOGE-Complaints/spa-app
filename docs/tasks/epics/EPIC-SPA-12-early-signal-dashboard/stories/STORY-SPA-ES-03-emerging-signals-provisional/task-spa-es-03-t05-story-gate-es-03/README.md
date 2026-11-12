# SPA-ES-03-T05 — Story gate ES-03

**Status:** Done  
**Story:** [`../STORY-SPA-ES-03-emerging-signals-provisional.md`](../STORY-SPA-ES-03-emerging-signals-provisional.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md) · story AC  
**Depends on:** T01–T04  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-03-t02-emerging-cards-empty/ui-mockup-spec.md`](../task-spa-es-03-t02-emerging-cards-empty/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:30:36Z · **P3:** 2026-08-17T11:36:37Z  
**Package:** `pkg-000068`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png
```

## Purpose
Story acceptance-verification for ES-03. Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md). Fill [`acceptance-verification-spa-es-03.md`](./acceptance-verification-spa-es-03.md) after live P3 (`Date` from `--print-utc-now` only).

## Risk
Filling PASS / live `Date:` before P3; mixing ES-01/02/04/05; inventing AC.

## Code Facts (As-of-Done P3 2026-08-17T11:36:37Z)
- Gate [`acceptance-verification-spa-es-03.md`](./acceptance-verification-spa-es-03.md) **Result:** PASS · **Date:** `2026-08-17T11:36:37Z`.
- [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L44 `<EmergingSignalsBlock />`.
- Story-root screenshots: `screenshots/full-cycle/`.

## AC / DoD
- [x] (P0) Live Emerging fetch; cards from `signals` only; empty/failure honest.
- [x] (P0) Topic/provisional ≠ Issue (AC-SPA-ES-02); no fabricated counts (AC-SPA-ES-08); no forbidden strings (AC-SPA-ES-03).
- [x] (P0) Links: M138 · icons · api-req §3 · L10N.
- [x] (P0) Gate file filled after live P3; `Date:` from `--print-utc-now` only (do not invent)

## Where to change
- Fill [`acceptance-verification-spa-es-03.md`](./acceptance-verification-spa-es-03.md) after live P3
- Story-root `screenshots/` at P3 (Path A UI-3)

## Out of scope
P1 product code. Invent AC. ES-04/05. Git push.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
test -f spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-03-emerging-signals-provisional/task-spa-es-03-t05-story-gate-es-03/acceptance-verification-spa-es-03.md
```
