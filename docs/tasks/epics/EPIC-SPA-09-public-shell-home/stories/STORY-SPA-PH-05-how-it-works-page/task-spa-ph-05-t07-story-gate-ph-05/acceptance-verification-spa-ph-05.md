# Story acceptance gate — STORY-SPA-PH-05-how-it-works-page

- **Story:** How It Works Page
- **Package:** `pkg-000050-20260804-epic-spa-09-ph-05-how-it-works.yaml` (immutable; not rewritten)
- **Result:** PASS
- **Date:** 2026-08-04T13:22:05Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Public route `/how-it-works` renders tutorial page (not protected redirect). | PASS | `App.jsx` route; `HowItWorksPage` `data-testid=how-it-works-page`; vitest; smoke |
| Exactly four steps; order identical in en/et/ru; no status-column board language. | PASS | 4× `how-it-works-step`; dict parity; no board-columns language |
| Dashboard CTA → `/board`; Submit → env GPT URL; external handoff explicit. | PASS | CTAs + `VITE_STORY_GPT_URL` + `submitAccessibleLabel` / `externalHandoff` |
| Full `howItWorks.*` L10N from appendix; api-req §3.1 + icons linked. | PASS | `howItWorksDictionary.js` + FLAT_KEYS; icons catalog paths |
| No marketing/campaign/rewards fluff; `DOGEstonia GPT` untranslated. | PASS | appendix copy; product name in strings untranslated |

## UI visual pipeline

| Gate | Status | Evidence |
|------|--------|----------|
| UI-0 / UI-1 Path A M133 | PASS | T02 `ui-baseline/pre-implement/` + [`ui-mockup-spec.md`](../task-spa-ph-05-t02-four-step-layout/ui-mockup-spec.md) |
| UI-3 + story-root screenshots | PASS | [`screenshots/README.md`](../screenshots/README.md) + `screenshots/full-cycle/` live happy |

## Commands (live verification)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run HowItWorks publicHome
cd spa-app && npm run test:ui:how-it-works
cd spa-app && npm run test:ui:how-it-works-ph05
cd spa-app && npm run test:ui:how-it-works-ph05-full
ls spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-05-how-it-works-page/screenshots/full-cycle/
```

## Mockups (Path A)

- `spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md`
- `spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix-estonia.png`
