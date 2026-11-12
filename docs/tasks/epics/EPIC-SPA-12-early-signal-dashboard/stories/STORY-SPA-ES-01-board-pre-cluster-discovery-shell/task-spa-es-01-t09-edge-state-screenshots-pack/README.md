# SPA-ES-01-T09 — Edge-state screenshots pack (F3)

**Status:** Done — P6 PASS 2026-08-17T10:53:30Z · F3 CLOSED  
**Story:** [`../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md`](../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md)  
**Decision Ref:** [audit-STORY-SPA-ES-01-execution-2026-08-17.md](../../../../../../analysis/audit-STORY-SPA-ES-01-execution-2026-08-17.md) §F3  
**Depends on:** SPA-ES-01-T06 Done  
**ui_scope:** `visual`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-01-t01-discovery-root-testid/ui-mockup-spec.md`](../task-spa-es-01-t01-discovery-root-testid/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-17T10:43:26Z  
**Gate Date:** 2026-08-17T10:53:30Z  
**Package:** `pkg-000066` **unchanged** · wave `spa_es_01_audit_2026_08_17`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.png
```

## Purpose
Recapture load-error + filtered-empty (optional skeleton) into story-root `screenshots/full-cycle/` and index them in `screenshots/README.md`. Happy H1 already exists — not a High STOP.

## Risk
Faking Pulse/Emerging filled M136 A–D (that is F4 / ES-02…04). Replacing discovery happy PNG.

## Code Facts (re-verify at execute)
- Happy present: [`../screenshots/full-cycle/es01-discovery-unfiltered-empty-desktop.png`](../screenshots/full-cycle/es01-discovery-unfiltered-empty-desktop.png).
- README already notes edge not recaptured: [`../screenshots/README.md`](../screenshots/README.md).
- Product: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) `board-load-error` · `board-filtered-empty` · feed skeleton.
- Intercept pattern: [`public-board-ph04-screenshot.mjs`](../../../../../../../tests/puppeteer/public-board-ph04-screenshot.mjs).

## Gap
Audit F3 Low — `screenshots/full-cycle/` missing load-error / filtered-empty PNGs; H1 happy PNG already present.

## AC / DoD
- [x] (P0) At least load-error **and** filtered-empty live PNGs under `screenshots/full-cycle/` (`ls`).
- [x] (P0) `screenshots/README.md` indexes those files (how triggered).
- [x] (P0) Keep existing H1 happy PNG.
- [x] (P0) No product JSX/CSS change; no filled Pulse/Emerging mock data.

## Where to change
- [`../screenshots/full-cycle/`](../screenshots/full-cycle/)
- [`../screenshots/README.md`](../screenshots/README.md)

## Out of scope
Filled M136 Modes A–D / Help in-slot CTA (F4, ES-02…04); invent AC; ES-02…05 product.

## Verification
```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/screenshots/full-cycle/
rg -n "load-error|filtered-empty" spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/screenshots/README.md
```
