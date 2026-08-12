# Story acceptance gate — STORY-SPA-PH-06-submit-story-gpt-cta

- **Story:** Submit Story → GPT CTA
- **Package:** `pkg-000051-20260805-epic-spa-09-ph-06-submit-gpt-cta.yaml` (immutable; not rewritten)
- **Result:** PASS
- **Date:** 2026-08-05T10:31:01Z

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Every public-home Submit CTA opens `VITE_STORY_GPT_URL` (env), not a hardcoded ChatGPT URL. | PASS | `getStoryGptHref()` in `Header.jsx`, `HowItWorksPage.jsx`, `BoardPage.jsx`, `StorySubmitPage.jsx`; `src/config/storyGptUrl.js` |
| Board legacy hardcoded URL removed/replaced on Submit path. | PASS | `rg` no `g-RkVU9xLWN` in Board/Header/HowItWorks; `ph06SubmitNoHardcode.test.js` |
| a11y label communicates external DOGEstonia GPT handoff. | PASS | `howItWorks.cta.submitAccessibleLabel` on nav + board + HowItWorks CTA |
| Optional external-link icon from catalog #3; api-req §3.3 linked. | PASS | `/icons/public-home/ic-external-link.png` on Header/Board/HowItWorks; api-req §3.3 = FE env only |
| No in-app compose implied. | PASS | external `target=_blank` / `#` calm when empty; no compose route |

## UI visual pipeline

| Gate | Status | Evidence |
|------|--------|----------|
| UI-0 / UI-1 Path A M129+M133 | PASS | T02 [`ui-baseline/`](../task-spa-ph-06-t02-wire-nav-submit/ui-baseline/) + [`ui-mockup-spec.md`](../task-spa-ph-06-t02-wire-nav-submit/ui-mockup-spec.md) |
| UI-3 post-implement | PASS | `ui-baseline/post-implement/a-board-nav-submit-1536x1024.png`, `b-how-it-works-submit-cta-1536x1024.png` |
| Story-root screenshots | PASS | [`screenshots/README.md`](../screenshots/README.md) + `screenshots/full-cycle/01-happy-live-board-submit-ctas-1536x1024.png` |

## Commands (live verification 2026-08-05T10:31:01Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:submit-ph06
cd spa-app && npm run test:ui:submit-ph06-full
rg -n "g-RkVU9xLWN" spa-app/src/pages/BoardPage.jsx spa-app/src/components/AppShell/Header.jsx spa-app/src/pages/HowItWorksPage.jsx
ls spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-06-submit-story-gpt-cta/screenshots/full-cycle/
```

## Mockups (Path A)

- `spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md`
- `spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.png`
- `spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-estonia.png`
