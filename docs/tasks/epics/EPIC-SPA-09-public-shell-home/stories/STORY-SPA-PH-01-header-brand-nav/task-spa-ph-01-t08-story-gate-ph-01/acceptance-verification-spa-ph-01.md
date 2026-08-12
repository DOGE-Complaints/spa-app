# Story acceptance gate — STORY-SPA-PH-01-header-brand-nav

- **Story:** Header Brand + Primary Nav
- **Package:** `pkg-000045-20260803-epic-spa-09-ph-01-header-brand-nav.yaml` (immutable; not rewritten)
- **Result:** **PASS**
- **Date:** 2026-08-04T07:07:39Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Public header matches M129 zones: brand + nav + locale (+ account slot host). | PASS | `Header.jsx` zones + `[data-testid="public-header"]` / `header-account-slot`; post-implement PNG |
| Nav order: Dashboard · How it works · Submit a story; active state for in-app routes. | PASS | `Header.publicNav.test.jsx` + how-it-works active shot |
| Mobile: hamburger `ic-nav-menu`; menu dismissible. | PASS | menu toggle + Escape/outside; mobile post PNG |
| All nav labels via `t()`; `PUBLIC_HOME_FLAT_KEYS` listed; no forbidden marketing terms. | PASS | `publicHomeDictionary.js` + vitest parity + forbiddenTerms include FLAT_KEYS |
| Links to icon catalog #1 + reuse rows; api-req §1.1. | PASS | `/icons/public-home/ic-nav-menu.png`; account slot host only (PH-02) |

## UI visual pipeline

| Gate | Status | Evidence |
|------|--------|----------|
| UI-0 baseline | PASS | [ui-baseline/README.md](../task-spa-ph-01-t01-public-header-zones/ui-baseline/README.md) + `pre-implement/` |
| UI-1 Path A mockup | PASS | [ui-mockup-spec.md](../task-spa-ph-01-t01-public-header-zones/ui-mockup-spec.md) → M129/M130 |
| UI-3 post-implement | PASS | `ui-baseline/post-implement/*.png` |
| Story-root screenshots | PASS | [screenshots/README.md](../screenshots/README.md) + `full-cycle/` live happy |
| Live happy PNG on disk | PASS | `ls …/full-cycle/01-happy-live-board-header-authenticated-1536x1024.png` |
| M129 State C locale open | PASS | `full-cycle/07-edge-mock-locale-menu-open-1536x1024.png` (T12) |
| F3 mobile Path A (inline ≠ drawer) | PASS intentional | [ui-mockup-spec §Path A State D](../task-spa-ph-01-t01-public-header-zones/ui-mockup-spec.md#path-a--state-d-mobile-intentional-vs-m129-drawer); FR-PH-01.6 met; no drawer DoD for PH-01 |

## Commands (live verification)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run
# claim: 98 files; 443 passed | 2 skipped
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:public-header-ph01-full
# claim: PASS live + mock suite
rg -n 'header-status' spa-app/src/components/AppShell/Header.jsx
# claim: 0 (SYNCED removed)
test -f spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/screenshots/full-cycle/01-happy-live-board-header-authenticated-1536x1024.png
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)

## Mockups (Path A)

- `spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.png`
- `spa-app/docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md` (host only)
