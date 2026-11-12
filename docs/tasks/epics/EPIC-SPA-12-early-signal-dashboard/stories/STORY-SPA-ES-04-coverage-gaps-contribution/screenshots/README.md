# STORY-SPA-ES-04 — screenshots (story root)

**Viewport:** desktop 1536×1024 · narrow 390×844  
**Captured UTC:** P3 UI-3 `2026-08-17T12:02:25Z` against `npm run dev` `:4173` GFL-DRIVEN intercept.

**Canonical evidence** — story-root `full-cycle/` (T01 `ui-baseline/` remains anchor archive).

## Happy

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | ESD-C-default (desktop) | [full-cycle/es04-coverage-default-desktop.png](./full-cycle/es04-coverage-default-desktop.png) | Issues `[]` · wait `picture-forming` / `whats-missing` / `help-complete-picture` |
| H2 | ESD-C-cta (desktop) | [full-cycle/es04-coverage-cta-desktop.png](./full-cycle/es04-coverage-cta-desktop.png) | same + wait `help-complete-cta` (PH-06 env URL in harness) |
| N1 | ESD-C-narrow | [full-cycle/es04-coverage-narrow.png](./full-cycle/es04-coverage-narrow.png) | 390×844 stacked trio |

Harness: [`spa-app/tests/puppeteer/es04-coverage-screenshot.mjs`](../../../../../../../tests/puppeteer/es04-coverage-screenshot.mjs)

## Anchor (T01)

| Ref | Path |
|-----|------|
| UI-0 pre-implement | [`../task-spa-es-04-t01-whats-missing-abstract/ui-baseline/pre-implement/`](../task-spa-es-04-t01-whats-missing-abstract/ui-baseline/pre-implement/) |
| UI-3 post-implement | [`../task-spa-es-04-t01-whats-missing-abstract/ui-baseline/post-implement/`](../task-spa-es-04-t01-whats-missing-abstract/ui-baseline/post-implement/) |
| Path A spec | [`../task-spa-es-04-t01-whats-missing-abstract/ui-mockup-spec.md`](../task-spa-es-04-t01-whats-missing-abstract/ui-mockup-spec.md) |

## Notes

- Discovery host is ES-01 (`board-early-signal-discovery`). Coverage trio fills `early-signal-slot-forming` / `missing` / `help`.
- No coverage HTTP. Help CTA href from `getStoryGptHref()` (PH-06).
- Do not use `mockup-01-dashboard-main-spec.md`.
