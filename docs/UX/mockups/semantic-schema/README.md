# Semantic Schema mockups (SSOT)

> **Package intake:** [`docs/tasks/backlog-stories/semantic-schema-runtime/`](../../tasks/backlog-stories/semantic-schema-runtime/INDEX.md)  
> **Product lock:** [PRODUCT-BRIEF.md](../../tasks/backlog-stories/semantic-schema-runtime/PRODUCT-BRIEF.md)  
> **UX prompts:** [UX-PROMPTS.md](../../tasks/backlog-stories/semantic-schema-runtime/UX-PROMPTS.md)  
> **ADMIN-SSR-02:** specs landed here as **M141–M142** (not under `mockups/semantic-schema-runtime/`)

## Canon routes / surfaces

| Label / control | Target |
|-----------------|--------|
| Board list \| map | `/board` — same Issues resultset (M142 / SSR-M) |
| Issue card overlay | Board feed Issue card + civic base (M141 / SSR-C) |
| Issue detail overlay | Existing civic Issue detail route (M141 / SSR-C) |
| Host chrome | Reuse PH header / footer / SEARCH filters (M132) |

## Mockup index

| Mockup | Artboard | Future story | Spec |
|--------|----------|--------------|------|
| M141 | SSR-C Schema card overlay (card + detail) | [STORY-SPA-SSR-02](../../tasks/backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-02-schema-card-overlay.md) | [mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md](mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md) |
| M142 | SSR-M Board list \| map toggle | [STORY-SPA-SSR-03](../../tasks/backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-03-board-list-map-toggle.md) | [mockup-142-board-list-map-toggle-state-sheet-spec.md](mockup-142-board-list-map-toggle-state-sheet-spec.md) |

## PNG artboards

| Mockup | PNG | Notes |
|--------|-----|-------|
| M141 | [mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png](mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png) | On disk — basename = spec without `.md` |
| M142 | [mockup-142-board-list-map-toggle-state-sheet-spec.png](mockup-142-board-list-map-toggle-state-sheet-spec.png) | On disk — for ADMIN-SSR-03 icon extract |

Spec markdown remains Active SSOT for states / copy / L10N glue; PNG is visual companion.

## Locks (do not invent in visuals)

- Overlay keys = `issue.schema_card` dotted paths only; labels → `schemaRuntime.cardField.<path>`
- Public `issue.geo.*` only (`lat`, `lon`, `label`, `district`, `settlement`, `region`, `country`) — not `admin_*`
- No `structured_payload` dump; no pack.json / clustering UI; no Early Signal Emerging cards
