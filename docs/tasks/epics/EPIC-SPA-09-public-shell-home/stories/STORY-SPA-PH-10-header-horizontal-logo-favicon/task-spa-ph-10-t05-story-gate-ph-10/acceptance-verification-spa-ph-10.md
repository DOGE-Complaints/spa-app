# Story acceptance gate — STORY-SPA-PH-10-header-horizontal-logo-favicon

- **Story:** Header horizontal logo + favicon
- **Package:** `pkg-000056-20260807-epic-spa-09-ph-10-horizontal-logo-favicon.yaml`
- **Result:** PASS
- **Date:** 2026-08-07T20:53:02Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| На `/#/board` (и др. public header) brand = horizontal logo; **нет** текстового «DOGEstonia» рядом с картинкой. | PASS | Live DOM `imgSrc=/assets/DOGEstonia-logo-horizontal.png` · `hasNameSpan=false` · [`ui-baseline/post-implement/02-header-brand.png`](../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-baseline/post-implement/02-header-brand.png) · [`screenshots/full-cycle/ph10-header-brand-desktop.png`](../screenshots/full-cycle/ph10-header-brand-desktop.png) |
| `img` имеет непустой `alt` с именем продукта. | PASS | `alt="DOGEstonia logo"` · vitest Header.publicNav |
| Tab / bookmark icon = новый `favicon.png` (явный link в `index.html` + файл в `public/`). | PASS | [`index.html`](../../../../../../../index.html) link · `public/favicon.png` · live `link[rel=icon]` |
| Narrow viewport: brand не ломает header layout. | PASS | 390×844 · `brandOverflow=false` · `headerOverflow=false` · [`post-implement/03-board-narrow.png`](../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-baseline/post-implement/03-board-narrow.png) · [`screenshots/full-cycle/ph10-board-header-narrow.png`](../screenshots/full-cycle/ph10-board-header-narrow.png) |
| Click brand → `/board` (как PH-01). | PASS | `href="#/board"` / vitest `href=/board` |
| No secrets in evidence / commits of assets. | PASS | inbound PNG copy as-is; no credentials in paths |

## UI verification (§UI)

| Item | Status | Path |
|------|--------|------|
| UI-0 baseline | PASS | [`../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-baseline/`](../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-baseline/) |
| UI-1 Path A mockup | PASS | [`../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-mockup-spec.md`](../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-mockup-spec.md) extends M129 |
| UI-3 post-implement PNG | PASS | [`../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-baseline/post-implement/`](../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-baseline/post-implement/) |
| puppeteer_gate | PASS | `npm run test:ui:board-shell` |
| Vitest | PASS | Header.publicNav 6/6 |

## Commands (live verification 2026-08-07T20:53:02Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run src/components/AppShell/__tests__/Header.publicNav.test.jsx
cd spa-app && npm run test:ui:board-shell
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
