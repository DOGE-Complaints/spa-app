# Task acceptance — SPA-G8-T02

- **Story:** STORY-SPA-G8 — AppShell refactor
- **Package:** `pkg-000040-20260729-epic-spa-08-g8-app-shell-refactor.yaml`
- **Result:** PASS
- **Date:** 2026-07-29T08:27:15Z
- **Scaffolded:** 2026-07-29T08:03:20Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| BoardPage via AppShell | PASS | `BoardPage.jsx` imports `AppShell, Header, Sidebar`; `data-testid="app-shell"` |
| No duplicated inline header/sidebar/locale | PASS | No `header-strip` / `header-locale` / `LOCALE_SELECTOR` markup left in BoardPage |
| Behavior preserved | PASS | sync status + flag locale via Header; Board active nav via Sidebar |

Gate Date: 2026-07-29T08:27:15Z.
