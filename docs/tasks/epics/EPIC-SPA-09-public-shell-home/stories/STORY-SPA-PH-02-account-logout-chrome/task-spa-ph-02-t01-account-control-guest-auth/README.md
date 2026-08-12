# SPA-PH-02-T01 — AccountControl guest/auth states

**Status:** Done — P3 2026-08-04T09:57:03Z  
**Story:** [`../STORY-SPA-PH-02-account-logout-chrome.md`](../STORY-SPA-PH-02-account-logout-chrome.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-02-account-logout-chrome.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-02-account-logout-chrome.md) FR-PH-02.1  
**Depends on:** PH-01 header slot Done  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T08:32:36Z

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.png
@mockup: spa-app/docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec-estonia.png
```

## Purpose
Introduce `<AccountControl />` and mount it in PH-01 right slot (`accountSlot` / `header-account-slot`). Guest idle vs authenticated idle per M130 (menu open = T03).

## Risk
Empty slot remains; session misread; forking header chrome.

## Code Facts (re-verify at execute)
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) — `accountSlot` prop; Board/Issue pass `<Header />` without slot content.
- Session: [`useSessionShellState.js`](../../../../../../../src/auth/useSessionShellState.js) / SessionShellContext; profile fields via `GET /me` ([api-req §1.1](../../../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md)).
- M130 SSOT on disk: `docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md` (+ `.png`).

## AC / DoD
- [ ] (P0) `<AccountControl />` rendered in header account slot (FR-PH-02.1).
- [ ] (P0) Guest vs authenticated idle states distinguishable per M130 (backlog AC #1/#2 idle).
- [ ] (P0) Uses session shell /me presence; no phone/OTP/tokens in UI (FR-PH-02.6).

## Where to change
- New: `spa-app/src/components/AccountControl/` (or under AppShell)
- `spa-app/src/components/AppShell/Header.jsx` consumers (`BoardPage`, `IssuePage`, HowItWorks if needed)
- Related CSS

## Out of scope
Guest navigate polish (T02); menu open (T03); signOut (T04); icons paths polish (T05); L10N keys (T06); Backend logout; confirmation modal; Settings/wallet menu; PH-01 brand/nav.

## Verification
```bash
test -f spa-app/docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md
rg -n 'accountSlot|header-account-slot|AccountControl' spa-app/src/components/AppShell/Header.jsx spa-app/src/pages
```

Gate: filled at T08 / per-task if used.
