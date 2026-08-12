# Acceptance verification — SPA-PH-07-T02

- **Task:** Wire chrome evidence runners (ui_anchor)
- **Result:** PASS
- **Date:** 2026-08-06T13:45:10Z
- **Package:** `pkg-000052`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Chrome shots intentional results | PASS | `captureBoardChrome` + H1/H2 PNGs |
| No silent load-error as healthy | PASS | `assertNoBoardLoadError` before shot |
| Submit CTAs still captured | PASS | `public-nav-submit` + `board-submit-cta` |
| ui_anchor evidence | PASS | PH-07 `screenshots/full-cycle/01|02-*.png` + ui-mockup-spec Path A |

## Commands

```bash
cd spa-app && npm run test:ui:submit-ph06-full
ls …/STORY-SPA-PH-07-…/screenshots/full-cycle/
```
