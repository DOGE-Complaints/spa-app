# SPA-SSR-02-T06 — Edge many/narrow screenshot pack (F1)

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-02-schema-card-overlay.md`](../STORY-SPA-SSR-02-schema-card-overlay.md)  
**Decision Ref:** [audit-STORY-SPA-SSR-02-execution-2026-09-02.md](../../../../../../analysis/audit-STORY-SPA-SSR-02-execution-2026-09-02.md) §F1  
**Depends on:** SPA-SSR-02-T05 Done  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Scaffolded:** 2026-09-02T20:13:25Z  
**Done:** 2026-09-02T20:30:25Z  
**Package:** `pkg-000075` **unchanged** · wave `spa_ssr_02_audit_2026_09_02`

## Purpose
Evidence-only: artboard states `SSR-C-many` + `SSR-C-narrow` lack PNGs under story-root `screenshots/full-cycle/`. Happy H1/H2 already exist — do not reopen product AC.

## Risk
Inventing overlay fields; pixel-matching M141 sample Issue; mixing SSR-03 / BUG pkgs.

## Code Facts (re-verify at execute)
- Collapse@4 + showMore `<p>`: [`SchemaCardOverlay.jsx`](../../../../../../../src/components/SchemaCardOverlay/SchemaCardOverlay.jsx)
- Narrow CSS `@media (max-width: 520px)`: [`SchemaCardOverlay.css`](../../../../../../../src/components/SchemaCardOverlay/SchemaCardOverlay.css)
- Harness: [`ssr02-overlay-screenshot.mjs`](../../../../../../../tests/puppeteer/ssr02-overlay-screenshot.mjs)
- Pack: [`screenshots/README.md`](../../screenshots/README.md) · full-cycle Happy only

## Gap
Audit F1 Medium — missing Edge many/narrow visual evidence.

## AC / DoD
- [x] (P0) `full-cycle` Edge PNG: many leaves (≥5) showing `schema-card-overlay-more` / bounded rows
- [x] (P0) `full-cycle` Edge PNG: narrow viewport (≤520px width) stacked label-above-value
- [x] (P0) `screenshots/README.md` Edge table lists both files
- [x] (P0) Extend harness; no invent `schema_card` keys beyond fixture leaves

## Where to change
- `spa-app/tests/puppeteer/ssr02-overlay-screenshot.mjs`
- `…/screenshots/full-cycle/*` + `screenshots/README.md`

## Out of scope
Reopen T01–T05 happy AC · SSR-03 · interactive showMore product (T07) · git push

## Verification
```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/screenshots/full-cycle/
rg -n 'Edge|many|narrow' spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/screenshots/README.md
```
