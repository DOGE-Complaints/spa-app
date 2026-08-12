# Acceptance verification — SPA-PH-08-T02

- **Task:** Page layout reduce nesting (ui_anchor)
- **Result:** PASS
- **Date:** 2026-08-09T07:46:13Z
- **Package:** `pkg-000058`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Not utility-card desktop | PASS | UI-3 desktop PNG · CSS transparent steps |
| 4 steps + CTA + chrome | PASS | vitest 4/4 pre-extend · how-it-works-smoke PASS |
| Nested frames weakened | PASS | HowItWorksPage.css · shell workspace soft pad |
| UI-0 / UI-1 / UI-3 | PASS | `ui-baseline/` · `ui-mockup-spec.md` · `post-implement/` |
| No sidebar display change | PASS | `PUBLIC_SHELL_SHOW_SIDEBAR` still wired |

## Commands

```bash
# utc_now: 2026-08-09T07:46:13Z
cd spa-app && npx vitest run src/pages/__tests__/HowItWorksPage.test.jsx
cd spa-app && npm run test:ui:how-it-works
```
