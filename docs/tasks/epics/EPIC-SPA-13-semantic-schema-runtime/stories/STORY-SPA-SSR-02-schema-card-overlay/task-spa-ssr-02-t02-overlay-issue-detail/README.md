# SPA-SSR-02-T02 — Overlay on Issue detail

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-02-schema-card-overlay.md`](../STORY-SPA-SSR-02-schema-card-overlay.md)  
**Decision Ref:** backlog FR-SSR-02.2 · M141  
**Depends on:** T01 (shared overlay) · SSR-01  
**ui_scope:** `visual`  
**extends ui-mockup:** [`../task-spa-ssr-02-t01-overlay-compact-card/ui-mockup-spec.md`](../task-spa-ssr-02-t01-overlay-compact-card/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-02  
**P1.3 APPLY:** 2026-09-02T19:53:04Z  
**Done:** 2026-09-02T20:06:33Z  
**Gate:** [acceptance-verification-spa-ssr-02-t02.md](./acceptance-verification-spa-ssr-02-t02.md)

```text
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png
```

## Purpose
Same overlay semantics on Issue detail page as compact card.

## Code Facts
- [`IssuePage.jsx`](../../../../../../../src/pages/IssuePage.jsx) · `SchemaCardOverlay` density=`detail`

## AC / DoD
- [x] (P0) Non-empty `schema_card` → overlay on detail
- [x] (P0) Civic-only when absent
- [x] (P0) Reuse same overlay component / glue as T01
- [x] (P0) UI Path A: @mockup M141 md+png (extends T01 ui_anchor)

## Verification
```bash
rg -n 'SchemaCardOverlay|schema_card' spa-app/src/pages/IssuePage.jsx
```
