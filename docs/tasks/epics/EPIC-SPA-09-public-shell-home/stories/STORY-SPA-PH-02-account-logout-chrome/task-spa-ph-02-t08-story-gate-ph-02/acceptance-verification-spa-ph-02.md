# Story acceptance gate — STORY-SPA-PH-02-account-logout-chrome

- **Story:** Account Control + Logout Chrome
- **Package:** `pkg-000046-20260804-epic-spa-09-ph-02-account-logout-chrome.yaml` (immutable; not rewritten)
- **Result:** PASS
- **Date:** 2026-08-04T09:57:03Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Guest shows Sign in → `/login` (M130 State A). | PASS | `AccountControl.jsx` guest `Link to="/login"`; vitest `AccountControl.test.jsx`; full-cycle `03-happy-mock-guest-sign-in-…` |
| Auth shows account control; menu = Profile + Log out only (M130 State C). | PASS | menu items Profile+Log out; full-cycle `01b-…` + `05-happy-mock-auth-menu-open-…` |
| Log out clears session via client `signOut` and lands on `/board`; no BE logout call. | PASS | `supabase.auth.signOut` + `navigate('/board')`; vitest no `/logout` fetch; full-cycle `06-edge-mock-after-logout-guest-…` |
| L10N keys listed; icon catalog reuse rows referenced; api-req §1.1–1.2 linked. | PASS | `publicHomeDictionary.js` `publicHome.account.*` + FLAT_KEYS; icons `/icons/user-cabinet/ic-field-role.png`, `/icons/identity/ic-chevron-down.png` |

## UI visual pipeline

| Gate | Status | Evidence |
|------|--------|----------|
| UI-0 / UI-1 Path A M130 | PASS | T01 `ui-baseline/` + [`ui-mockup-spec.md`](../task-spa-ph-02-t01-account-control-guest-auth/ui-mockup-spec.md) |
| UI-3 + story-root screenshots | PASS | [`screenshots/README.md`](../screenshots/README.md) + `screenshots/full-cycle/` live happy |

## Commands (live verification)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run AccountControl publicHome
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:public-header-ph02
cd spa-app && npm run test:ui:public-header-ph02-full
rg -n 'signOut' spa-app/src/components/AccountControl
rg -n '/logout' spa-app/src || echo 'no_be_logout'
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)

## Mockups (Path A)

- `spa-app/docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.png`
- Host: `mockup-129-public-header-chrome-state-sheet-spec.md` (+ estonia png)
