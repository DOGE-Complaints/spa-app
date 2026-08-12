# Acceptance verification — SPA-PH-04-T12

- **Task:** IssueCard open affordance vs M132 (F6)
- **Package:** `pkg-000049`
- **Result:** PASS
- **Date:** 2026-08-04T12:48:38Z
- **extends ui-mockup:** T01 `ui-mockup-spec.md` (UI-0 skipped)

## AC

| AC | Status | Evidence |
|----|--------|----------|
| Visible open cue («Open issue →»); no misleading ellipsis when openable | PASS | `IssueCard.jsx` + CSS `issue-card-openable` |
| Still navigates `/issue/:id` | PASS | `to=` unchanged; vitest Link + affordance |
| Vitest / board-shell | PASS | IssueCard + BoardPage.feed; `test:ui:board-shell` |
| UI-3 partial post-implement | PASS | `ui-baseline/post-implement/` A–E; H2 refreshed from results |

## UI

| Gate | Status |
|------|--------|
| UI-0 | SKIP (dependent visual) |
| UI-1 | extends T01 Path A M132 |
| UI-2 | IssueCard + `publicHome.board.openIssue` |
| UI-3 partial | post-implement PNGs under this task |

## Commands

```bash
rg -n 'showOpenAffordance|openIssue|issue-card-open' spa-app/src/components/IssueCard spa-app/src/i18n/publicHomeDictionary.js
cd spa-app && npm test -- --run BoardPage.feed IssueCard publicHome
cd spa-app && npm run test:ui:board-shell
```
