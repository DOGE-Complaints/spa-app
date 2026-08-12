# Story acceptance gate — STORY-SPA-PH-08-how-it-works-first-class-page

- **Story:** How it works as first-class public page
- **Package:** `pkg-000058-20260809-epic-spa-11-ph-08-how-it-works-first-class.yaml`
- **Result:** PASS
- **Date:** 2026-08-09T07:46:54Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Нет ощущения «карточка в панели» на desktop. | PASS | Transparent steps · UI-3 desktop · T01 audit → T02 |
| 4 steps + CTA + footer first-class. | PASS | vitest · Header/PublicFooter · CTA testids |
| Narrow order preserved. | PASS | UI-3 narrow PNG · T03 |
| PH-09 не требуется для закрытия composition AC (может сосуществовать). | PASS | `PUBLIC_SHELL_SHOW_SIDEBAR` unchanged · FR-PH-08.5 |

## UI verification (§UI)

| Item | Status | Path |
|------|--------|------|
| UI-0 baseline | PASS | [`../task-spa-ph-08-t02-…/ui-baseline/01-hiw-baseline-with-step-cards-1536x1024.png`](../task-spa-ph-08-t02-page-layout-reduce-nesting/ui-baseline/01-hiw-baseline-with-step-cards-1536x1024.png) |
| UI-1 Path A M133 | PASS | [`../task-spa-ph-08-t02-…/ui-mockup-spec.md`](../task-spa-ph-08-t02-page-layout-reduce-nesting/ui-mockup-spec.md) |
| UI-3 post-implement | PASS | [`../task-spa-ph-08-t02-…/ui-baseline/post-implement/`](../task-spa-ph-08-t02-page-layout-reduce-nesting/ui-baseline/post-implement/) |
| Story-root screenshots pack | PASS | [`../screenshots/`](../screenshots/) · P6 T05 pack hygiene |
| Vitest / UI smoke | PASS | HowItWorksPage 6/6 · `test:ui:how-it-works` · `test:ui:board-shell` |

## FR checklist

| FR | Status |
|----|--------|
| FR-PH-08.1 | PASS |
| FR-PH-08.2 | PASS |
| FR-PH-08.3 | PASS |
| FR-PH-08.4 | PASS |
| FR-PH-08.5 | PASS |

## Commands (live verification 2026-08-09T07:46:54Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npx vitest run src/pages/__tests__/HowItWorksPage.test.jsx
cd spa-app && npm run test:ui:how-it-works
cd spa-app && npm run test:ui:board-shell
```
