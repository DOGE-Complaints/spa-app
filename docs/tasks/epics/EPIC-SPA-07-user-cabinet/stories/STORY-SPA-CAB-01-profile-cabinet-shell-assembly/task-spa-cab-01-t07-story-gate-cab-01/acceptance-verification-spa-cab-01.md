# Story acceptance gate — STORY-SPA-CAB-01-profile-cabinet-shell-assembly

- **Story:** STORY-SPA-CAB-01 — Profile Cabinet Shell & Assembly
- **Package:** `pkg-000030-20260725-epic-spa-07-cab-01-profile-cabinet-shell.yaml`
- **Result:** PASS
- **Date:** 2026-07-25T12:51:04Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Авторизованный пользователь видит собранный кабинет на `/profile` (не placeholder). | PASS | `UserCabinetPage.test.jsx`; `[data-testid="user-cabinet-page"]` + `cabinet-grid` + slots; no `protected-route-placeholder` |
| Layout соответствует M99 section slots и visual hierarchy. | PASS | 5 slots civic/story/contribution/account/wallet; CSS 12-col; Account keeps `AccountSummary` |
| Неавторизованный — SessionShell overlay (ID-02). | PASS | `UserCabinetPage.test.jsx` logged_out → `session-shell-overlay`; `sessionRoutePolicy.js` `/profile` protected |
| `/dashboard` не изменён. | PASS | `UserCabinetPage.test.jsx` `/dashboard` → `dashboard-page`; route in `App.jsx` unchanged |
| Все строки shell локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` / `IDENTITY_FLAT_KEYS` обновлены; forbidden-terms нет. | PASS | `cabinetDictionary.js` + `appShell.nav.profile` in `identityDictionary.js`; `cabinetDictionary.test.js` + `identityDictionary.test.js` |

## UI acceptance (anchor T02 → story-root screenshots)

| Check | Status | Evidence |
|-------|--------|----------|
| ui-mockup-spec.md | PASS | [ui-mockup-spec.md](../task-spa-cab-01-t02-m99-grid-section-slots/ui-mockup-spec.md) Path A extends M21/M99 (+M22 loading) |
| Story-root screenshots index | PASS | [screenshots/README.md](../../screenshots/README.md) |
| archive post-implement (default) | PASS | [post-implement-default-cabinet-shell-1536x1024.png](../../screenshots/archive/post-implement-default-cabinet-shell-1536x1024.png) |
| archive post-implement (loading) | PASS | [post-implement-loading-cabinet-shell-1536x1024.png](../../screenshots/archive/post-implement-loading-cabinet-shell-1536x1024.png) |
| Live login happy-path (`02-auth-success`) | PASS | [02-auth-success-1536x1024.png](../../screenshots/full-cycle/02-auth-success-1536x1024.png) |
| full-cycle profile default **live** | PASS | [03-profile-default-live-1536x1024.png](../../screenshots/full-cycle/03-profile-default-live-1536x1024.png) |
| full-cycle profile default **mock** (reference) | PASS | [03-profile-default-mock-1536x1024.png](../../screenshots/full-cycle/03-profile-default-mock-1536x1024.png) |
| Profile nav active | PASS | [04-profile-nav-active-1536x1024.png](../../screenshots/full-cycle/04-profile-nav-active-1536x1024.png) |
| logged_out / skeleton / locales / dashboard | PASS | [05](../../screenshots/full-cycle/05-logged-out-overlay-1536x1024.png)·[06](../../screenshots/full-cycle/06-shell-loading-skeleton-1536x1024.png)·[07](../../screenshots/full-cycle/07-locale-et-profile-1536x1024.png)·[08](../../screenshots/full-cycle/08-locale-ru-profile-1536x1024.png)·[09](../../screenshots/full-cycle/09-dashboard-unchanged-1536x1024.png)·[10 en](../../screenshots/full-cycle/10-locale-en-profile-1536x1024.png) |
| restoring (S12) | PASS | [11-restoring-overlay-1536x1024.png](../../screenshots/full-cycle/11-restoring-overlay-1536x1024.png) |
| session_expired / backend_unavailable / network_error | PASS | [12](../../screenshots/full-cycle/12-session-expired-overlay-1536x1024.png)·[13a](../../screenshots/full-cycle/13a-backend-unavailable-overlay-1536x1024.png)·[13b ready](../../screenshots/full-cycle/13b-backend-status-ready-1536x1024.png)·[13c status](../../screenshots/full-cycle/13c-backend-status-unavailable-1536x1024.png)·[14](../../screenshots/full-cycle/14-network-error-overlay-1536x1024.png) |
| Shell skeleton (no giant spinner) | PASS | `[data-testid="cabinet-shell-skeleton"]` |

## Commands (gate code 2026-07-25T12:51:04Z; screenshots closed 2026-07-25T20:40Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run UserCabinetPage identityService cabinetDictionary identityDictionary
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:cabinet-shell-cab01-full
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)