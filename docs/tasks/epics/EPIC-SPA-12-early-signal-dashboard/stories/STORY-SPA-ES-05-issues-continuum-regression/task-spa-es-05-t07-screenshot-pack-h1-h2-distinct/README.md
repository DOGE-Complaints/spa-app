# SPA-ES-05-T07 — Screenshot pack H1≠H2 distinct (F2)

**Status:** Done — P6 PASS 2026-08-17T13:26:35Z · F2 CLOSED  
**Story:** [`../STORY-SPA-ES-05-issues-continuum-regression.md`](../STORY-SPA-ES-05-issues-continuum-regression.md)  
**Decision Ref:** [audit-STORY-SPA-ES-05-execution-2026-08-17.md](../../../../../../analysis/audit-STORY-SPA-ES-05-execution-2026-08-17.md) §F2  
**Depends on:** SPA-ES-05-T06 Done  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-05-t01-continuum-layout/ui-mockup-spec.md`](../task-spa-es-05-t01-continuum-layout/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-17T13:21:58Z  
**Gate Date:** 2026-08-17T13:26:35Z  
**Package:** `pkg-000070` **unchanged** · wave `spa_es_05_audit_2026_08_17`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png
```

## Purpose
Make story-root H1 vs H2 **byte-distinct**. README currently claims different intercepts; `cmp` shows identical PNGs. Recapture H1 (Pulse/Emerging omit) **or** H2 (bound residual); update `screenshots/README.md` How-triggered; keep N1.

## Risk
Adding ESD-I-event PNG / reward animation (F1 WAIVED). Changing continuum product AC. Reopening ES-01…04 empty-discovery. Faking omit vs bound without live recapture.

## Code Facts (re-verify at execute)
- H1/H2 on disk: [`../screenshots/full-cycle/es05-continuum-feed-desktop.png`](../screenshots/full-cycle/es05-continuum-feed-desktop.png) (123123) · [`../screenshots/full-cycle/es05-continuum-residual-desktop.png`](../screenshots/full-cycle/es05-continuum-residual-desktop.png) (134182) — P6 `cmp` **differ** (exit 1).
- README How-triggered: H1 omit pulse/emerging · H2 bound wait `continuum-pulse` + `continuum-emerging`: [`../screenshots/README.md`](../screenshots/README.md).
- Harness: [`es05-continuum-screenshot.mjs`](../../../../../../../tests/puppeteer/es05-continuum-screenshot.mjs) — separate pages: `installRoutes(page, 'omit'|'bound')`.
- Residual omit: [`ContinuumResidual.jsx`](../../../../../../../src/components/earlySignal/ContinuumResidual.jsx) Pulse only if bound; Emerging only if cards. **Product AC unchanged this P6.**

## Gap
Audit F2 Low — persistent screenshot-pack SSOT: H1 vs H2 intercepts claimed different; files byte-identical.

## AC / DoD
- [x] (P0) `cmp` H1 PNG ≠ H2 PNG (`ls` both still exist).
- [x] (P0) `screenshots/README.md` How-triggered matches actual intercepts (omit vs bound).
- [x] (P0) Keep N1 `es05-continuum-narrow.png`.
- [x] (P0) No ESD-I-event PNG (F1 WAIVED `out-of-DoD`). No product AC change. No `STORY-UX-MOCKUP-BRIEF`.
- [x] (P0) Gate `Date:` from `--print-utc-now` after live recapture only (`2026-08-17T13:26:35Z`)

## Where to change
- [`../screenshots/full-cycle/`](../screenshots/full-cycle/)
- [`../screenshots/README.md`](../screenshots/README.md)
- [`es05-continuum-screenshot.mjs`](../../../../../../../tests/puppeteer/es05-continuum-screenshot.mjs) (if intercepts must differ)

## Out of scope
F1 event chrome / reward animation (WAIVED). F3 artboard PNG hygiene (WAIVED `info-nonblocking`). Continuum product JSX AC. Rewrite `pkg-000070`. Git push.

## Verification
```bash
cmp spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-05-issues-continuum-regression/screenshots/full-cycle/es05-continuum-feed-desktop.png spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-05-issues-continuum-regression/screenshots/full-cycle/es05-continuum-residual-desktop.png; echo "cmp_exit:$?"
ls spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-05-issues-continuum-regression/screenshots/full-cycle/
rg -n "H1|H2|omit|bound|identical" spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-05-issues-continuum-regression/screenshots/README.md
```
