# STORY-SPA-ES-02 — screenshots (story root)

**Viewport:** desktop 1536×1024 · narrow 390×844  
**Captured UTC:** P3 UI-3 `2026-08-17T11:10:56Z` against `npm run dev` `:4173` GFL-DRIVEN intercept.

**Canonical evidence** — story-root `full-cycle/` (T02 `ui-baseline/` remains anchor archive).

## Happy

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | ESD-P-omit (desktop) | [full-cycle/es02-pulse-omit-desktop.png](./full-cycle/es02-pulse-omit-desktop.png) | Issues `[]` + Pulse HTTP 500 · wait `network-pulse-omit` |
| H2 | ESD-P-bound (desktop) | [full-cycle/es02-pulse-bound-desktop.png](./full-cycle/es02-pulse-bound-desktop.png) | Issues `[]` + Pulse 200 bind-map payload · wait `network-pulse-bound` |
| N1 | ESD-P-bound (narrow) | [full-cycle/es02-pulse-bound-narrow.png](./full-cycle/es02-pulse-bound-narrow.png) | 390×844 bound |
| N2 | ESD-P-omit (narrow) | [full-cycle/es02-pulse-omit-narrow.png](./full-cycle/es02-pulse-omit-narrow.png) | 390×844 omit |

Harness: [`spa-app/tests/puppeteer/es02-pulse-screenshot.mjs`](../../../../../../../tests/puppeteer/es02-pulse-screenshot.mjs)

## Anchor (T02)

| Ref | Path |
|-----|------|
| UI-0 pre-implement | [`../task-spa-es-02-t02-pulse-omit-bound-ui/ui-baseline/pre-implement/`](../task-spa-es-02-t02-pulse-omit-bound-ui/ui-baseline/pre-implement/) |
| UI-3 post-implement | [`../task-spa-es-02-t02-pulse-omit-bound-ui/ui-baseline/post-implement/`](../task-spa-es-02-t02-pulse-omit-bound-ui/ui-baseline/post-implement/) |
| Path A spec | [`../task-spa-es-02-t02-pulse-omit-bound-ui/ui-mockup-spec.md`](../task-spa-es-02-t02-pulse-omit-bound-ui/ui-mockup-spec.md) |

## Notes

- Discovery host is ES-01 (`board-early-signal-discovery`). Pulse is the `early-signal-slot-pulse` child.
- Bound numbers come only from intercepted `/tallinn/network-pulse` `data` (not client-fabricated).
- Do not use `mockup-01-dashboard-main-spec.md`.
