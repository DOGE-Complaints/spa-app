# Screenshots — STORY-SPA-CAB-05 Wallet Status Card

**Viewport:** 1536×1024  
**Full-cycle PASS:** 2026-07-26T20:35:05Z (T07–T09 post-audit wave; identity `:8100` up)  
**Runner:** `cd spa-app && npm run test:ui:cabinet-wallet-cab05-full`

| Mock M50 / locales / CTAs | Mock Vite (`VITE_IDENTITY_MOCK_MODE=true`) + `doge.wallet-preview` / `doge.locale` |
| Script exit | `0` (PASS) |

```bash
cd spa-app && npm run test:ui:cabinet-wallet-cab05-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `doge.locale` | `localStorage` | `en` \| `et` \| `ru` |
| `doge.mock-profile` | `sessionStorage` | JSON merge into mock `/me` |
| `doge.wallet-preview` | `sessionStorage` | DEV: `unlinked` \| `linked` \| `connect` |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live profile wallet stub (A) | [full-cycle/01-happy-live-profile-wallet-stub-1536x1024.png](./full-cycle/01-happy-live-profile-wallet-stub-1536x1024.png) | `USER_*` → Continue → `/#/profile` + `[data-wallet-status-card]` |
| H2 | live auth-success | [full-cycle/02-happy-live-auth-success-1536x1024.png](./full-cycle/02-happy-live-auth-success-1536x1024.png) | live sign-in → `data-auth-state=auth-success` |
| H3 | mock unlinked stub | [full-cycle/03-happy-mock-wallet-unlinked-stub-1536x1024.png](./full-cycle/03-happy-mock-wallet-unlinked-stub-1536x1024.png) | mock + `preview=unlinked` |
| H4 | mock linked | [full-cycle/04-happy-mock-wallet-linked-1536x1024.png](./full-cycle/04-happy-mock-wallet-linked-1536x1024.png) | `preview=linked` |
| H5 | mock connect | [full-cycle/05-happy-mock-wallet-connect-1536x1024.png](./full-cycle/05-happy-mock-wallet-connect-1536x1024.png) | `preview=connect` |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | Manage → comingSoon | [full-cycle/06-edge-mock-manage-coming-soon-1536x1024.png](./full-cycle/06-edge-mock-manage-coming-soon-1536x1024.png) | `preview=linked` + Manage click |
| E2 | Connect → comingSoon | [full-cycle/07-edge-mock-connect-coming-soon-1536x1024.png](./full-cycle/07-edge-mock-connect-coming-soon-1536x1024.png) | `preview=connect` + Connect click |
| E3 | locale et unlinked | [full-cycle/08-edge-mock-locale-et-wallet-unlinked-1536x1024.png](./full-cycle/08-edge-mock-locale-et-wallet-unlinked-1536x1024.png) | `doge.locale=et` |
| E4 | locale ru unlinked | [full-cycle/09-edge-mock-locale-ru-wallet-unlinked-1536x1024.png](./full-cycle/09-edge-mock-locale-ru-wallet-unlinked-1536x1024.png) | `doge.locale=ru` |

## Archive (UI-0 / UI-3 baselines)

| Phase | Path |
|-------|------|
| UI-0 pre | [archive/pre-implement/](./archive/pre-implement/) |
| UI-3 post | [archive/post-implement/](./archive/post-implement/) |

Anchor task baseline (working copy): [../task-spa-cab-05-t01-mount-wallet-status-card/ui-baseline/](../task-spa-cab-05-t01-mount-wallet-status-card/ui-baseline/).

## Re-run

```bash
cd spa-app && npm run test:ui:cabinet-wallet-cab05-full
```

Secrets: never commit `.env`; this README does not include email/password.
