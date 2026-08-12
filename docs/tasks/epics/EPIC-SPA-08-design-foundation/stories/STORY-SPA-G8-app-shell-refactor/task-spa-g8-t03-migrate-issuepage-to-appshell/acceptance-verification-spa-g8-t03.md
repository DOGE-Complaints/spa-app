# Task acceptance — SPA-G8-T03

- **Story:** STORY-SPA-G8 — AppShell refactor
- **Package:** `pkg-000040-20260729-epic-spa-08-g8-app-shell-refactor.yaml`
- **Result:** PASS
- **Date:** 2026-07-29T08:27:15Z
- **Scaffolded:** 2026-07-29T08:03:20Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| IssuePage via AppShell | PASS | `IssuePage.jsx` uses `AppShell` + `Header` + `Sidebar boardTo={boardBackUrl}` |
| No duplicated inline shell | PASS | No inline header/locale/sidebar markup in IssuePage |
| Back + locale + active Board nav | PASS | `issue-back-button`; LanguageSelector in Header; Sidebar Link to boardBackUrl |

Gate Date: 2026-07-29T08:27:15Z.
