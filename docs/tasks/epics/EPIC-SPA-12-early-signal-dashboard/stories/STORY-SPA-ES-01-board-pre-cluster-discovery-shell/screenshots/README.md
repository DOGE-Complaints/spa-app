# STORY-SPA-ES-01 — screenshots (story root)

**Viewport:** desktop 1536×1024 · narrow 390×844  
**Captured UTC:** P3 UI-3 happy `2026-08-17T10:32:24Z` · P6 T09 edge `2026-08-17T10:53:30Z` against `npm run dev` `:4173` GFL-DRIVEN intercept.

**Canonical evidence** — story-root `full-cycle/` (T01 `ui-baseline/` remains anchor archive).

## Happy

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | unfiltered zero Issues → discovery (desktop) | [full-cycle/es01-discovery-unfiltered-empty-desktop.png](./full-cycle/es01-discovery-unfiltered-empty-desktop.png) | Puppeteer intercept `GET /tallinn/issues` → `{ data: { issues: [] } }` · wait `board-early-signal-discovery` |
| N1 | same discovery (narrow) | [full-cycle/es01-discovery-unfiltered-empty-narrow.png](./full-cycle/es01-discovery-unfiltered-empty-narrow.png) | 390×844 · five slots stacked |

## Edge (T09 · P6 F3)

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | load-error | [full-cycle/es01-board-load-error-desktop.png](./full-cycle/es01-board-load-error-desktop.png) | Intercept `GET /tallinn/issues` → HTTP 500 · wait `board-load-error` · discovery **absent** |
| E2 | filtered-empty | [full-cycle/es01-board-filtered-empty-desktop.png](./full-cycle/es01-board-filtered-empty-desktop.png) | Intercept mock issues + `?search=zzznomatches01` · wait `board-filtered-empty` · discovery **absent** |

Harness: [`spa-app/tests/puppeteer/es01-edge-screenshot.mjs`](../../../../../../../tests/puppeteer/es01-edge-screenshot.mjs)

## Anchor (T01)

| Ref | Path |
|-----|------|
| UI-0 pre-implement (load-error, no discovery) | [`../task-spa-es-01-t01-discovery-root-testid/ui-baseline/pre-implement/`](../task-spa-es-01-t01-discovery-root-testid/ui-baseline/pre-implement/) |
| UI-3 post-implement | [`../task-spa-es-01-t01-discovery-root-testid/ui-baseline/post-implement/`](../task-spa-es-01-t01-discovery-root-testid/ui-baseline/post-implement/) |
| Path A spec | [`../task-spa-es-01-t01-discovery-root-testid/ui-mockup-spec.md`](../task-spa-es-01-t01-discovery-root-testid/ui-mockup-spec.md) |

## Notes

- UI-0 live board was `board-load-error` (gateway `:8000` down) — honest baseline, not empty-board.
- Discovery happy path required request intercept; FAKE-OLD in-memory demo issues would hide the shell.
- Filtered-empty / load-error preserved in product (`BoardPage.jsx`); recaptured into `full-cycle/` in T09.
- Not filled M136 Modes A–D (F4 / ES-02…04).
