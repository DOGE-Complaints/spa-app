# Acceptance verification — SPA-ID-14-T02

- **Task:** Wire SUBMITTED phase; no auto-navigate
- **Result:** PASS
- **Date:** 2026-08-07T19:56:17Z
- **Package:** `pkg-000055`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| After 202 → SUBMITTED + submission id | PASS | `StorySubmitPage.jsx` `setSubmissionId` + `setPhase(SUBMITTED)` |
| No success default `navigate('/profile', { submittedStoryId })` | PASS | removed from `submitDraft`; vitest asserts not called |
| Draft cleared; invalid id → no empty success | PASS | `clearDraftId()`; empty `submission_id` → `SERVICE_DOWN` |
| CTA leave paths user-driven | PASS | Board/My Stories/GPT handlers unchanged |

## Commands

```bash
rg -n "navigate\\('/profile'|setPhase|setSubmissionId|SUBMITTED" spa-app/src/pages/StorySubmitPage.jsx
cd spa-app && npx vitest run src/pages/__tests__/StorySubmitPage.test.jsx --reporter=dot
```
