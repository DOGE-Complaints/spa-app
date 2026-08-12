# Task acceptance — SPA-G8-T07

- **Story:** STORY-SPA-G8 — AppShell refactor (post-audit)
- **Package:** `pkg-000040-20260729-epic-spa-08-g8-app-shell-refactor.yaml`
- **run_mode:** `spa_g8_audit_2026_07_29`
- **Result:** PASS
- **Date:** 2026-07-29T09:39:05Z
- **Scaffolded:** 2026-07-29T09:04:00Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Single locale selector logic source | PASS | `LanguageSelector.jsx` now wraps `LocaleSelector` (`variant=\"header\"`); no duplicated selector logic |
| Board/Issue/Cabinet behavior parity | PASS | `npm test` 419 pass / 2 skip; `npm run test:ui:board-shell` exit 0 |
| No aria/CSS drift introduced | PASS | Header keeps `header-locale-*` classes via `LocaleSelector` variant mapping |

Gate Date: 2026-07-29T09:39:05Z.
