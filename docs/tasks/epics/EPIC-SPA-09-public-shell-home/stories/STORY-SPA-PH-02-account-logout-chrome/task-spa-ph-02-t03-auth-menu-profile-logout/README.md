# SPA-PH-02-T03 — Auth menu: Profile + Log out

**Status:** Done — P3 2026-08-04T09:57:03Z  
**Story:** [`../STORY-SPA-PH-02-account-logout-chrome.md`](../STORY-SPA-PH-02-account-logout-chrome.md)  
**Decision Ref:** backlog FR-PH-02.3–02.5 · AC «menu = Profile + Log out only»  
**Depends on:** T01  
**ui_scope:** `visual`  
**extends ui-mockup:** T01 anchor (M130 State C)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T08:32:36Z

## Purpose
Authenticated idle: avatar/`ic-field-role` + optional `display_name` + chevron; click opens menu with **exactly** Profile → `/profile` and Log out (action wired in T04). Outside click / Escape dismiss; keyboard navigable; Log out not destructive-styled.

## Risk
Extra menu items (Settings/wallet); destructive styling; a11y gaps.

## Code Facts (re-verify at execute)
- `/profile` exists (CAB-01 UserCabinetPage).
- Prefer DS `MenuAction` / Button patterns from G10 where applicable.
- Privacy: no raw phone/OTP/tokens (FR-PH-02.6).

## AC / DoD
- [ ] (P0) Auth control opens menu with Profile + Log out only (backlog AC #2 / FR-PH-02.3–02.4 items).
- [ ] (P0) Profile navigates `/profile`.
- [ ] (P0) Escape / outside click closes; keyboard navigable (FR-PH-02.5).
- [ ] (P0) Log out control not destructive-styled (FR-PH-02.5).

## Where to change
- `AccountControl` auth + menu UI/CSS

## Out of scope
signOut implementation (T04); icons asset swap (T05); Settings/wallet shortcuts; confirmation modal.

## Verification
```bash
rg -n 'profile|logOut|openMenu|Escape' spa-app/src/components/AccountControl 2>/dev/null || true
cd spa-app && npm test -- --run AccountControl
```
