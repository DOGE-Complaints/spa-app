# Story acceptance gate — STORY-SPA-PH-04-board-feed-home

- **Story:** Board Feed Home
- **Package:** `pkg-000048-20260804-epic-spa-09-ph-04-board-feed-home.yaml` (immutable; not rewritten)
- **Result:** PASS
- **Date:** 2026-08-04T12:16:21Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| `/board` is a **single feed**; **status/kanban columns removed** (M132 supersedes M01). | PASS | `BoardPage.jsx` `.board-feed`; vitest `BoardPage.feed` / shell; `test:ui:board-shell` 0 columns |
| Existing SEARCH filters still drive `GET /tallinn/issues`; no new list API. | PASS | toolbar retained; `issueService.getIssues`; api-req §2.1 |
| Loader (skeleton), empty, filtered-empty, error+retry states per M132. | PASS | UI-3 post-implement a–e + full-cycle E1–E3 |
| Empty uses `ic-empty-board`; error uses calm diagnostic icon; no «Oops». | PASS | catalog paths in BoardPage; copy `publicHome.board.*` |
| L10N + icon catalog + api-req §2.1 linked. | PASS | `publicHomeDictionary.js` board keys + FLAT_KEYS; gate notes |

## UI visual pipeline

| Gate | Status | Evidence |
|------|--------|----------|
| UI-0 / UI-1 Path A M132 | PASS | T01 `ui-baseline/pre-implement/` + [`ui-mockup-spec.md`](../task-spa-ph-04-t01-remove-columns-single-feed/ui-mockup-spec.md) |
| UI-3 + story-root screenshots | PASS | [`screenshots/README.md`](../screenshots/README.md) + `screenshots/full-cycle/` · **H2** = happy results SSOT · **H1** = live load-error (T11; not populated feed) |

## Commands (live verification)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run BoardPage publicHome
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:board-feed-ph04
cd spa-app && npm run test:ui:board-feed-ph04-full
rg -n 'board-columns|board-feed' spa-app/src/pages/BoardPage.jsx
rg -n 'publicHome\.board' spa-app/src/i18n/publicHomeDictionary.js
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)

## Mockups (Path A)

- `spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.png`
- `spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec-estonia.png`
