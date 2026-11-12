# STORY-SPA-ES-03 — screenshots (story root)

**Viewport:** desktop 1536×1024 · narrow 390×844  
**Captured UTC:** P3 UI-3 `2026-08-17T11:36:37Z` against `npm run dev` `:4173` GFL-DRIVEN intercept.

**Canonical evidence** — story-root `full-cycle/` (T02 `ui-baseline/` remains anchor archive).

## Happy

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | ESD-E-empty (desktop) | [full-cycle/es03-emerging-empty-desktop.png](./full-cycle/es03-emerging-empty-desktop.png) | Issues `[]` + Emerging `signals: []` · wait `emerging-signals-empty` |
| H2 | ESD-E fail omit (desktop) | [full-cycle/es03-emerging-fail-omit-desktop.png](./full-cycle/es03-emerging-fail-omit-desktop.png) | Issues `[]` + Emerging HTTP 500 · wait `emerging-signals-empty` |
| H3 | ESD-E-cards (desktop) | [full-cycle/es03-emerging-cards-desktop.png](./full-cycle/es03-emerging-cards-desktop.png) | Issues `[]` + Emerging 200 `signals[{label,axis,story_count}]` · wait `emerging-signals` |
| N1 | ESD-E-cards (narrow) | [full-cycle/es03-emerging-cards-narrow.png](./full-cycle/es03-emerging-cards-narrow.png) | 390×844 cards |
| N2 | ESD-E-empty (narrow) | [full-cycle/es03-emerging-empty-narrow.png](./full-cycle/es03-emerging-empty-narrow.png) | 390×844 empty |

Harness: [`spa-app/tests/puppeteer/es03-emerging-screenshot.mjs`](../../../../../../../tests/puppeteer/es03-emerging-screenshot.mjs)

## Anchor (T02)

| Ref | Path |
|-----|------|
| UI-0 pre-implement | [`../task-spa-es-03-t02-emerging-cards-empty/ui-baseline/pre-implement/`](../task-spa-es-03-t02-emerging-cards-empty/ui-baseline/pre-implement/) |
| UI-3 post-implement | [`../task-spa-es-03-t02-emerging-cards-empty/ui-baseline/post-implement/`](../task-spa-es-03-t02-emerging-cards-empty/ui-baseline/post-implement/) |
| Path A spec | [`../task-spa-es-03-t02-emerging-cards-empty/ui-mockup-spec.md`](../task-spa-es-03-t02-emerging-cards-empty/ui-mockup-spec.md) |

## Notes

- Discovery host is ES-01 (`board-early-signal-discovery`). Emerging is the `early-signal-slot-emerging` child.
- Card fields come only from intercepted `/tallinn/emerging-signals` `data.signals` (not client-fabricated).
- Do not use `mockup-01-dashboard-main-spec.md`.
