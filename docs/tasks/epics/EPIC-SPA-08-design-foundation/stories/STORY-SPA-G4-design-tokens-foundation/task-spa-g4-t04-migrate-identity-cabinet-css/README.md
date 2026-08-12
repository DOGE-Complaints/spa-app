# SPA-G4-T04 — Migrate identity/cabinet CSS to var(--…)

**Status:** Done  
**Story:** [`../STORY-SPA-G4-design-tokens-foundation.md`](../STORY-SPA-G4-design-tokens-foundation.md)  
**Decision Ref:** backlog §FR-G4.3, T04, D-G4-2 (identity/cabinet surface)  
**Depends on:** T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T16:01:20Z
**Completed:** 2026-07-28T16:20:38Z

## Purpose
Мигрировать identity/cabinet/auth surfaces (~18 CSS per backlog §E) на `var(--…)`; заменить локальные `--story-handoff-*` на глобальные токены где уместно.

## Risk
Оставить hex в Login/Verify/Cabinet → визуальный drift относительно board после T03.

## Code Facts (re-verify at execute)
Targets include (confirm list at execute): LoginPage, PhoneVerification*, GptBridge, StoryActivity, ContributionLayer, WalletStatus, AppErrorState, CivicStatus, AccountSummary, StoryHandoff, SessionShellState, LocaleSelector, CountryWaitlist, UserCabinetPage, VerifyPage CSS.

## AC / DoD
- [ ] (P0) Listed identity/cabinet CSS primary colors use `var(--color-*)`.
- [ ] (P0) StoryHandoff local color vars collapsed into global tokens where equivalent.
- [ ] (P1) No new local `:root` color islands for shared palette.

## Where to change
- Component CSS under `src/components/**` and pages listed in backlog §E / story Where to change.

## Out of scope
- Board-core (T03). Typography body vars (T05). Spacing deferred.

## Verification
```bash
rg -n '#[0-9a-fA-F]{3,8}' spa-app/src/components --glob '*.css' | head -80
cd spa-app && npm test -- --run
```

Gate: [`acceptance-verification-spa-g4-t04.md`](./acceptance-verification-spa-g4-t04.md)
