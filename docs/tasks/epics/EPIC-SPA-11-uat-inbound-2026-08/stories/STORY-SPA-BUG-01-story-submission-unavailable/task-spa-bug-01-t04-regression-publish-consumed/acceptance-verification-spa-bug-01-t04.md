# Acceptance verification — SPA-BUG-01-T04

- **Task:** Regression publish once + consumed draft safe
- **Result:** PASS
- **Date:** 2026-08-07T10:51:48Z
- **Package:** `pkg-000053`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Success UX + single publish | PASS | Live submit **202** + `story_id`; UI left handoff (`navigated-away` → profile) — [`evidence-…104447Z.md`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-07T104447Z.md) |
| Consumed draft calm; no double publish | PASS | Reload same `draft_id` → GET **404**, phase `expired`, `story-handoff-expired` — [`evidence-…consumed-105148Z.md`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-consumed-2026-08-07T105148Z.md) |
| Real error path: draft + Retry | PASS | Unit: submit 503 → `story-handoff-service-down` + retry (`StorySubmitPage.test.jsx`); pre-fix live Retry same (`…201810Z`) |
| Tests / UAT checklist | PASS | Vitest handoff **19/19**; live UAT above |

## Commands

```bash
cd spa-app && npx vitest run --reporter=dot \
  src/pages/__tests__/StorySubmitPage.test.jsx \
  src/services/__tests__/storyDraftService.handoff.test.js
# 19 passed (2026-08-07)
```
