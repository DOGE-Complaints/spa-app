# STORY-SPA-CAB-01 — screenshots (story root)

**Viewport:** 1536×1024  
**Captured UTC:** archive 2026-07-25T15:28:48Z / full-cycle PASS 2026-07-25T20:40Z  
**Canonical evidence for CAB-01** — not under task subfolders.

## Live login status

| Check | Result |
|-------|--------|
| `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` | Present |
| Supabase `signInWithPassword` | **PASS** |
| `02-auth-success-*.png` | Produced |
| Live `03-profile-default-live-*.png` | Produced (real session + `/me`) |
| Mock `03-profile-default-mock-*.png` | Kept (earlier mock fallback rename) |
| Tier-2 overlays `11`–`14` | Mock Vite (`VITE_IDENTITY_MOCK_MODE=true`) + `doge.mock-me-error` |
| Script exit | `0` (PASS) |

```bash
cd spa-app && npm run test:ui:cabinet-shell-cab01-full
```

## Dev hooks (G3-style)

| Key | Where | Effect |
|-----|-------|--------|
| `doge.locale` | `localStorage` | `en` \| `et` \| `ru` |
| `doge.mock-profile` | `sessionStorage` | JSON merge into mock `/me` profile |
| `doge.mock-me-error` | `sessionStorage` | mock `/me` only: `session_expired` \| `backend_unavailable` \| `network_error` \| `restoring` (2.5s delay then profile) |
| `doge.force-cabinet-loading` | `sessionStorage` | DEV: force `cabinet-shell-skeleton` without overlay |

## full-cycle/ (S1–S12 + login context)

| ID | State | File | How triggered |
|----|-------|------|---------------|
| ID-01 | login form | [01-login-form-1536x1024.png](./full-cycle/01-login-form-1536x1024.png) | `/#/login?redirect=/profile` |
| ID-01 | login error (context) | [00-login-error-1536x1024.png](./full-cycle/00-login-error-1536x1024.png) | historical FAIL shot retained |
| — | auth-success | [02-auth-success-1536x1024.png](./full-cycle/02-auth-success-1536x1024.png) | live `USER_*` → `data-auth-state=auth-success` |
| S1 | profile default **live** | [03-profile-default-live-1536x1024.png](./full-cycle/03-profile-default-live-1536x1024.png) | Continue → `/#/profile` + 5 slots + AccountSummary |
| S1 | profile default **mock** | [03-profile-default-mock-1536x1024.png](./full-cycle/03-profile-default-mock-1536x1024.png) | seeded mock session (reference) |
| S2 | Profile nav active | [04-profile-nav-active-1536x1024.png](./full-cycle/04-profile-nav-active-1536x1024.png) | crop `app-shell-nav-profile` |
| S4 | logged_out overlay | [05-logged-out-overlay-1536x1024.png](./full-cycle/05-logged-out-overlay-1536x1024.png) | clear auth → `/#/profile` |
| S3 | shell loading (dev) | [06-shell-loading-skeleton-1536x1024.png](./full-cycle/06-shell-loading-skeleton-1536x1024.png) | `doge.force-cabinet-loading=1` |
| S6 | locale et | [07-locale-et-profile-1536x1024.png](./full-cycle/07-locale-et-profile-1536x1024.png) | `doge.locale=et` · h1=`Profiil` |
| S7 | locale ru | [08-locale-ru-profile-1536x1024.png](./full-cycle/08-locale-ru-profile-1536x1024.png) | `doge.locale=ru` · h1=`Профиль` |
| S8 | dashboard unchanged | [09-dashboard-unchanged-1536x1024.png](./full-cycle/09-dashboard-unchanged-1536x1024.png) | `/#/dashboard` (no cabinet) |
| S5 | locale en | [10-locale-en-profile-1536x1024.png](./full-cycle/10-locale-en-profile-1536x1024.png) | `doge.locale=en` · h1=`Profile` |
| S12 | restoring overlay | [11-restoring-overlay-1536x1024.png](./full-cycle/11-restoring-overlay-1536x1024.png) | `doge.mock-me-error=restoring` → overlay + skeleton |
| S9 | session_expired | [12-session-expired-overlay-1536x1024.png](./full-cycle/12-session-expired-overlay-1536x1024.png) | `doge.mock-me-error=session_expired` |
| S10 | backend_unavailable | [13a-backend-unavailable-overlay-1536x1024.png](./full-cycle/13a-backend-unavailable-overlay-1536x1024.png) | `doge.mock-me-error=backend_unavailable` |
| S10 | View Status (ready) | [13b-backend-status-ready-1536x1024.png](./full-cycle/13b-backend-status-ready-1536x1024.png) | click View Status → live `GET /ready` → `session.statusReady` |
| S10 | View Status (unavailable) | [13c-backend-status-unavailable-1536x1024.png](./full-cycle/13c-backend-status-unavailable-1536x1024.png) | abort `/ready` → `session.statusUnavailable` |
| S11 | network_error | [14-network-error-overlay-1536x1024.png](./full-cycle/14-network-error-overlay-1536x1024.png) | `doge.mock-me-error=network_error` |

## archive/ (P3 UI-0 / UI-3 baselines, moved from T02)

| File |
|------|
| [archive/pre-implement-default-cabinet-shell-1536x1024.png](./archive/pre-implement-default-cabinet-shell-1536x1024.png) |
| [archive/pre-implement-loading-cabinet-shell-1536x1024.png](./archive/pre-implement-loading-cabinet-shell-1536x1024.png) |
| [archive/post-implement-default-cabinet-shell-1536x1024.png](./archive/post-implement-default-cabinet-shell-1536x1024.png) |
| [archive/post-implement-loading-cabinet-shell-1536x1024.png](./archive/post-implement-loading-cabinet-shell-1536x1024.png) |

## Commands

```bash
cd spa-app && npm test -- --run UserCabinetPage identityService cabinetDictionary
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:cabinet-shell-cab01-full
```

Secrets: never commit `.env`; this README does not include email/password.
