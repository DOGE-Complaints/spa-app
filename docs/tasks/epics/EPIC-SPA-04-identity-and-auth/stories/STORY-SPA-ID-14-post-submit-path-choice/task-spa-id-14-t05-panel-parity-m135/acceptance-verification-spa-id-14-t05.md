# Acceptance verification — SPA-ID-14-T05

- **Task:** Panel parity M135 (ui_anchor)
- **Result:** PASS
- **Date:** 2026-08-07T19:56:17Z
- **Package:** `pkg-000055`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Three CTAs + destinations | PASS | `/board`, `/profile`, `VITE_STORY_GPT_URL` |
| Tertiary GPT hint / external | PASS | `submitAnotherHint` + `ic-external-link` |
| No-auto-redirect chrome | PASS | `story-handoff-no-auto-redirect` + L10N |
| Calm one-shot layout vs M135 | PASS | post-implement PNGs |
| Path A `@mockup` | PASS | [ui-mockup-spec.md](./ui-mockup-spec.md) |

## UI

| Phase | Evidence |
|-------|----------|
| UI-0 | `ui-baseline/pre-implement/` |
| UI-1 | `ui-mockup-spec.md` (Path A) |
| UI-3 | `ui-baseline/post-implement/` + `npm run test:ui:board-shell` PASS |
| Story-root | [`../screenshots/`](../screenshots/) |

## Commands

```bash
rg -n "go-board|my-stories|submit-another|noAutoRedirect|submitAnotherHint" spa-app/src/components/StoryHandoff/
cd spa-app && PHASE=post-implement npm run test:ui:story-submit-m135
cd spa-app && npm run test:ui:board-shell
```
