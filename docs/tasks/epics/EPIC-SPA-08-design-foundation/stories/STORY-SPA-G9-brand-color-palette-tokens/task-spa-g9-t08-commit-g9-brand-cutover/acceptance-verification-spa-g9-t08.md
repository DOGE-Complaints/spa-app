# Acceptance — SPA-G9-T08

- **Result:** PASS
- **Date:** 2026-08-02T10:13:40Z
- **run_mode:** `spa_g9_audit_2026_08_02`
- **Commit:** `0809fb9` feat(SPA-G9): brand palette cutover via --doge-* tokens

## Evidence
- `git show HEAD:src/styles/tokens.css` — `--doge-bg: #0B1320`, `--doge-accent: #F5A623`, `--color-bg-primary: var(--doge-bg)`.
- Committed: tokens.css, design-system.md §2.1, CTA/token CSS (AppErrorState, StoryActivity, CivicStatus, SessionShell, PhoneVerification*, GptBridge, AccountSummary, EmptyState, IssueCard, LocaleSelector, CountryWaitlist, UserCabinetPage), board-shell-smoke.mjs.
- Excluded (intentional): Filters.css, StatusBadge.css (F7 / out of F1 scope).

## Commands
```bash
cd spa-app && git show HEAD:src/styles/tokens.css | head -40
cd spa-app && git log -1 --oneline
```
