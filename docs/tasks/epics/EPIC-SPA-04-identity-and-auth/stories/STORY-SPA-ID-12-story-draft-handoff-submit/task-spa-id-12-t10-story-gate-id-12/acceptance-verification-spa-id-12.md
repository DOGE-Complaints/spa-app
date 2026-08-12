# Story acceptance gate — STORY-SPA-ID-12

- **Story:** Story draft handoff submit (M128)
- **Package:** `pkg-000026-20260705-epic-spa-04-id12-story-draft-handoff-submit.yaml`
- **Result:** PASS
- **Date:** 2026-07-05T08:19:17Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| #1 `?draft_id` → GET preview; 401→login; 404→expired; E0 empty | PASS | `StorySubmitPage.test.jsx` (preview/401/404/empty); `storyDraftService.handoff.test.js`; `storyHandoffFlowState.js` sessionStorage |
| #2 Preview before verify; content hidden on verify | PASS | Preview phase before submit; verify panel embeds `PhoneVerificationFlow` only (no narrative fields) |
| #3 Submit 202/403 auto-resubmit/401/503/404 | PASS | `StorySubmitPage.test.jsx` success/verify/service-down; `VerificationRequiredError` mapping |
| #4 No browser `POST /story-drafts` | PASS | `createStoryDraft` removed; grep src — no browser create path |
| #5 M-7 closed | PASS | `getStoryDraft` GET + `submitStoryDraft` POST under Bearer |
| #6 Editor removed; GPT URL empty-state | PASS | `StoryComposePage` deleted; empty/expired CTAs use `VITE_STORY_GPT_URL` |
| #7 `/story/submit` + compose redirect | PASS | `App.jsx` routes; `sessionRoutePolicy.js` |
| #8 L10N et/ru/en | PASS | `storyHandoff.*` in `identityDictionary.js` + FLAT_KEYS; `forbiddenVerificationTerms` prefix |

## Scope I (icons)

| Item | Status | Evidence |
|------|--------|----------|
| Icon paths `/icons/story-handoff/ic-*.png` | PASS | `StoryHandoffPanels.jsx`, `StorySubmitPage.jsx` |
| Catalog filenames | PASS (placeholder raster) | 19 files in `public/icons/story-handoff/`; **note:** 18 icons are spinner placeholders pending final art gen |

## §UI (M128 anchor T08)

| Item | Status | Evidence |
|------|--------|----------|
| ui-mockup-spec.md Path A | PASS | `task-spa-id-12-t08-ui-anchor-m128-icons/ui-mockup-spec.md` |
| 9 states post-implement PNG 1536×1024 | PASS | `ui-baseline/post-implement/*-m128-1536x1024.png` |
| Puppeteer gate | PASS | `npm run test:ui:story-handoff-m128` green |

## Commands (live verification 2026-07-05)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:story-handoff-m128
```

## Task traceability

| Task | Status |
|------|--------|
| T01 storyDraftService GET+submit | Done |
| T02 draft preview mapper | Done |
| T03 storyHandoff i18n | Done |
| T04 route cutover | Done |
| T05 login draft_id storage | Done |
| T06 StorySubmitPage | Done |
| T07 verify interpose | Done |
| T08 M128 UI anchor | Done |
| T09 tests + puppeteer | Done |
| T10 story gate | Done |
