# STORY-SPA-ES-05 — screenshots (story root)

**Viewport:** desktop 1536×1024 · narrow 390×844  
**Captured UTC:** P6 T07 `2026-08-17T13:26:35Z` against `npm run dev` `:4173` GFL-DRIVEN intercept (Issues ≥ 1). H1 omit vs H2 bound residual (byte-distinct). N1 kept bound stacked.

**Canonical evidence** — story-root `full-cycle/` (T01 `ui-baseline/` remains anchor archive).

## Happy

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | ESD-I-feed omit residual (desktop) | [full-cycle/es05-continuum-feed-desktop.png](./full-cycle/es05-continuum-feed-desktop.png) | Issues `[ISS-100]` · pulse `data: {}` · emerging `signals: []` · wait `board-feed` + `continuum-residual` + `continuum-missing` · assert **no** `continuum-pulse` / `continuum-emerging` |
| H2 | ESD-I-residual bound (desktop) | [full-cycle/es05-continuum-residual-desktop.png](./full-cycle/es05-continuum-residual-desktop.png) | Issues `[ISS-100]` · pulse bound (`stories_collected: 4` …) · emerging cards (`Night lighting`) · wait `continuum-pulse` + `continuum-emerging` |
| N1 | ESD-I-narrow | [full-cycle/es05-continuum-narrow.png](./full-cycle/es05-continuum-narrow.png) | 390×844 · same bound intercepts as H2 · feed primary, residual stacked |

Harness: [`spa-app/tests/puppeteer/es05-continuum-screenshot.mjs`](../../../../../../../tests/puppeteer/es05-continuum-screenshot.mjs)

## Anchor (T01)

| Ref | Path |
|-----|------|
| UI-0 pre-implement | [`../task-spa-es-05-t01-continuum-layout/ui-baseline/pre-implement/`](../task-spa-es-05-t01-continuum-layout/ui-baseline/pre-implement/) |
| UI-3 post-implement | [`../task-spa-es-05-t01-continuum-layout/ui-baseline/post-implement/`](../task-spa-es-05-t01-continuum-layout/ui-baseline/post-implement/) |
| Path A spec | [`../task-spa-es-05-t01-continuum-layout/ui-mockup-spec.md`](../task-spa-es-05-t01-continuum-layout/ui-mockup-spec.md) |

## Notes

- Issues ≥ 1 keep PH-04 `board-feed` + `IssueCard`. Residual is `continuum-residual` (not empty-board `board-early-signal-discovery`).
- Topic icons only for exact catalog labels (`waste` in fixture). No invented taxonomy. No Offers. `/dashboard` unchanged.
- H1 vs H2 **must** use different residual intercepts (omit vs bound). Do not recapture both on one bound page.
- No ESD-I-event PNG (F1 WAIVED).
- Do not use `mockup-01-dashboard-main-spec.md`.
