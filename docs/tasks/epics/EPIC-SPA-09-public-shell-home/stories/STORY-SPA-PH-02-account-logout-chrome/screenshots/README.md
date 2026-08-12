# STORY-SPA-PH-02 — screenshots (story root)

**Viewport:** 1536×1024  
**Captured UTC:** UI-0/3 baselines 2026-08-04T09:47–09:52Z · full-cycle PASS **2026-08-04T09:57:03Z**  
**Canonical evidence for PH-02** — story-root `full-cycle/` (not only T01 `ui-baseline/`).

## Live login status

| Check | Result |
|-------|--------|
| `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` | Present |
| Supabase `signInWithPassword` | **PASS** |
| `02-happy-live-auth-success-*.png` | Produced |
| Live `01-happy-live-board-account-authenticated-*.png` | Produced (`[data-testid="account-control"][data-state="authenticated"]`) |
| Live menu open | Produced |
| Mock guest / auth / menu / logout | Mock Vite (`VITE_IDENTITY_MOCK_MODE=true`) |
| Script exit | `0` (PASS) |

```bash
cd spa-app && npm run test:ui:public-header-ph02-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `doge.locale` | `localStorage` | `en` \| `et` \| `ru` |
| `doge.mock-profile` | `sessionStorage` | Override `/me` mock fields (`display_name`, …) |
| `VITE_IDENTITY_MOCK_MODE` | Vite | Mock `/me` for deterministic auth chrome (live login still uses Supabase) |
| `dogestonia-auth` | localStorage | Seeded mock JWT session (mock suite) |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live board account authenticated | [full-cycle/01-happy-live-board-account-authenticated-1536x1024.png](./full-cycle/01-happy-live-board-account-authenticated-1536x1024.png) | `USER_*` → Continue → `/#/board` + `account-control[data-state=authenticated]` |
| H1b | live account menu open | [full-cycle/01b-happy-live-board-account-menu-open-1536x1024.png](./full-cycle/01b-happy-live-board-account-menu-open-1536x1024.png) | click `account-control-trigger` |
| H2 | live auth-success | [full-cycle/02-happy-live-auth-success-1536x1024.png](./full-cycle/02-happy-live-auth-success-1536x1024.png) | live sign-in → `data-auth-state=auth-success` |
| H3 | mock guest Sign in | [full-cycle/03-happy-mock-guest-sign-in-1536x1024.png](./full-cycle/03-happy-mock-guest-sign-in-1536x1024.png) | clear auth → `/#/board` guest |
| H4 | mock auth idle | [full-cycle/04-happy-mock-auth-idle-1536x1024.png](./full-cycle/04-happy-mock-auth-idle-1536x1024.png) | seed mock session + `doge.mock-profile` |
| H5 | mock auth menu open | [full-cycle/05-happy-mock-auth-menu-open-1536x1024.png](./full-cycle/05-happy-mock-auth-menu-open-1536x1024.png) | M130 State C |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | after logout → guest | [full-cycle/06-edge-mock-after-logout-guest-1536x1024.png](./full-cycle/06-edge-mock-after-logout-guest-1536x1024.png) | menu → Log out → client `signOut` → guest |

## archive/ (P3 UI-0 / UI-3 baselines)

Historical pre/post T01 `ui-baseline/` copies under `archive/ui-baseline/`. Canonical live evidence remains under `full-cycle/`.

## Commands

```bash
cd spa-app && npm test -- --run AccountControl publicHome
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:public-header-ph02
cd spa-app && npm run test:ui:public-header-ph02-full
```

Secrets: never commit `.env`; this README does not include email/password.
