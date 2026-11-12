# SPA-SSR-02-T01 — Overlay on compact Issue card

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-02-schema-card-overlay.md`](../STORY-SPA-SSR-02-schema-card-overlay.md)  
**Decision Ref:** backlog FR-SSR-02.1 / FR-SSR-02.5 · M141  
**Depends on:** SSR-01 · M141  
**ui_scope:** `visual`  
**ui_complexity:** `standard`  
**ui_anchor:** `true`  
**UI routes:** `/#/board`  
**puppeteer_gate:** `test:ui:board-shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-02  
**P1.3 APPLY:** 2026-09-02T19:53:04Z · `pkg-000075`  
**Done:** 2026-09-02T20:06:33Z  
**Gate:** [acceptance-verification-spa-ssr-02-t01.md](./acceptance-verification-spa-ssr-02-t01.md)

```text
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png
```

## Purpose
When `issue.schema_card` non-empty, render Additional details sub-block on compact board Issue card; absent/empty → civic-only (no empty chrome).

## Risk
Dumping `structured_payload`; inventing overlay keys; empty overlay shell; mixing Early Signal cards.

## Code Facts
- [`SchemaCardOverlay.jsx`](../../../../../../../src/components/SchemaCardOverlay/SchemaCardOverlay.jsx) · wired in [`IssueCard.jsx`](../../../../../../../src/components/IssueCard/IssueCard.jsx)
- UI: [`ui-baseline/`](./ui-baseline/README.md) · [`ui-mockup-spec.md`](./ui-mockup-spec.md)

## AC / DoD
- [x] (P0) Non-empty `schema_card` → overlay on card
- [x] (P0) Empty/absent → no overlay block
- [x] (P0) Keys verbatim from JSON; labels via i18n glue (T03)
- [x] (P0) UI Path A: @mockup M141 md+png on this ui_anchor

## Where changed
- `IssueCard.jsx` · `SchemaCardOverlay/` · i18n (T03)

## Out of scope
Map · pack.json · invent paths · detail page (T02)

## Verification
```bash
test -f spa-app/docs/UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md
rg -n 'schema_card|schema-card-overlay' spa-app/src/components/IssueCard spa-app/src/components/SchemaCardOverlay
```
