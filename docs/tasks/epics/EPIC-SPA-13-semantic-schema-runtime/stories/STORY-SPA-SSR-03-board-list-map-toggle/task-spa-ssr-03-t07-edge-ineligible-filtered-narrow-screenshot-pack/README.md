# SPA-SSR-03-T07 — Edge ineligible/filtered/narrow screenshot pack (F1)

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-03-board-list-map-toggle.md`](../STORY-SPA-SSR-03-board-list-map-toggle.md)  
**Decision Ref:** [audit-STORY-SPA-SSR-03-execution-2026-09-02.md](../../../../../../analysis/audit-STORY-SPA-SSR-03-execution-2026-09-02.md) §F1  
**Depends on:** SPA-SSR-03-T05 Done  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Scaffolded:** 2026-09-02T20:47:38Z  
**Closed:** 2026-09-02T21:11:01Z  
**Package:** `pkg-000076` **unchanged** · wave `spa_ssr_03_audit_2026_09_02`

## Purpose
Evidence-only: artboard states `SSR-M-ineligible` / `SSR-M-filtered` / `SSR-M-narrow` lack PNGs under story-root `screenshots/full-cycle/`. Happy H1/H2 already exist — do not reopen product AC. Optional stronger partial crop OK.

## Risk
Inventing bbox HTTP; pixel-matching M142 sample Issues; mixing SSR-01/02 / BUG pkgs.

## Code Facts (re-verify at execute)
- Ineligible Map disabled + helper: [`ListMapToggle.jsx`](../../../../../../../src/components/map/ListMapToggle.jsx)
- Harness: [`ssr03-list-map-screenshot.mjs`](../../../../../../../tests/puppeteer/ssr03-list-map-screenshot.mjs) (`EDGE_ONLY=1`)
- Pack: [`screenshots/README.md`](../screenshots/README.md)

## Gap
Audit F1 Medium — missing Edge visual evidence. **CLOSED**

## AC / DoD
- [x] (P0) `full-cycle` Edge PNG: ineligible (civic-only / Map disabled + `board-map-ineligible`)
- [x] (P0) `full-cycle` Edge PNG: filtered query state (toolbar shows active query/filters)
- [x] (P0) `full-cycle` Edge PNG: narrow viewport (≤520px width)
- [x] (P0) `screenshots/README.md` Edge table lists files
- [x] (P0) Extend harness; no invent bbox

## Where changed
- `spa-app/tests/puppeteer/ssr03-list-map-screenshot.mjs`
- `…/screenshots/full-cycle/03|04|05-*.png` + `screenshots/README.md`

## Out of scope
Reopen T00–T06 product · invent bbox · git push

## Verification
```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/screenshots/full-cycle/
rg -n 'Edge|ineligible|filtered|narrow' spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/screenshots/README.md
```
