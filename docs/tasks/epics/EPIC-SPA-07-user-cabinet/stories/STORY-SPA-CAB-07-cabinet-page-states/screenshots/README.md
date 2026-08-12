# Screenshots — STORY-SPA-CAB-07 Cabinet Page States

**Viewport:** 1536×1024  
**Full-cycle PASS:** 2026-07-28T14:05:08Z  
**Runner:** `cd spa-app && npm run test:ui:cabinet-page-states-cab07-full`

| Live | `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` → auth-success + `/#/profile` |
| Mock | `VITE_IDENTITY_MOCK_MODE=true` + `doge.cabinet-preview` / `doge.mock-me-error` / `doge.locale` |

```bash
cd spa-app && npm run test:ui:cabinet-page-states-cab07-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `doge.locale` | `localStorage` | `en` \| `et` \| `ru` |
| `doge.mock-profile` | `sessionStorage` | JSON merge into mock `/me` |
| `doge.cabinet-preview` | `sessionStorage` | `new-user` → M23 empty composite defaults |
| `doge.mock-me-error` | `sessionStorage` | `profile_load_failed` \| `backend_unavailable` \| `network_error` \| `session_expired` \| `restoring` |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live profile composite | [full-cycle/01-happy-live-profile-composite-1536x1024.png](./full-cycle/01-happy-live-profile-composite-1536x1024.png) | `USER_*` → Continue → `/#/profile` + `[data-testid="cabinet-grid"]` |
| H2 | live auth-success | [full-cycle/02-happy-live-auth-success-1536x1024.png](./full-cycle/02-happy-live-auth-success-1536x1024.png) | live sign-in → `data-auth-state=auth-success` |
| H3 | mock M23 new-user | [full-cycle/03-happy-mock-m23-new-user-composite-1536x1024.png](./full-cycle/03-happy-mock-m23-new-user-composite-1536x1024.png) | mock + `doge.cabinet-preview=new-user` |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | M22 profile load error | [full-cycle/04-edge-mock-m22-profile-load-error-1536x1024.png](./full-cycle/04-edge-mock-m22-profile-load-error-1536x1024.png) | `doge.mock-me-error=profile_load_failed` |
| E2 | M22 locale ru | [full-cycle/05-edge-mock-m22-locale-ru-1536x1024.png](./full-cycle/05-edge-mock-m22-locale-ru-1536x1024.png) | error + `doge.locale=ru` |
| E3 | M22 network error | [full-cycle/06-edge-mock-m22-network-error-1536x1024.png](./full-cycle/06-edge-mock-m22-network-error-1536x1024.png) | `doge.mock-me-error=network_error` |

## Archive (UI-0 / UI-3 baselines)

| Phase | Path |
|-------|------|
| UI-0 pre | [archive/pre-implement/](./archive/pre-implement/) |
| UI-3 post | [archive/post-implement/](./archive/post-implement/) |

Anchor task baseline (working copy): [../task-spa-cab-07-t01-m23-composite-new-user-empty/ui-baseline/](../task-spa-cab-07-t01-m23-composite-new-user-empty/ui-baseline/).  
Target: [../task-spa-cab-07-t01-m23-composite-new-user-empty/ui-mockup-spec.md](../task-spa-cab-07-t01-m23-composite-new-user-empty/ui-mockup-spec.md).

## Re-run

```bash
cd spa-app && npm run test:ui:cabinet-page-states-cab07-full
```

Secrets: never commit `.env`; this README does not include email/password.
