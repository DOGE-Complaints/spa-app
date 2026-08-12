# STORY-SPA-CAB-03 — screenshots (story root)

**Viewport:** 1536×1024  
**Captured UTC:** archive 2026-07-25T21:40:18Z (P3 UI-0/3) / full-cycle PASS **2026-07-26T10:51:42Z** (post G2 no slot-header + real ic-civic-* icons)  
**Canonical evidence for CAB-03** — not under task subfolders (T01 `ui-baseline/` points here).

## Live login status

| Check | Result |
|-------|--------|
| `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` | Present |
| Supabase `signInWithPassword` | **PASS** |
| `02-happy-live-auth-success-*.png` | Produced |
| Live `01-happy-live-profile-civic-from-me-*.png` | Produced (real session + `/me` + `[data-civic-status-card]`) |
| Mock M28 / locales / dashboard / verify CTA | Mock Vite (`VITE_IDENTITY_MOCK_MODE=true`) + `doge.civic-preview` / `doge.locale` |
| Script exit | `0` (PASS) |

```bash
cd spa-app && npm run test:ui:cabinet-civic-cab03-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `doge.locale` | `localStorage` | `en` \| `et` \| `ru` |
| `doge.mock-profile` | `sessionStorage` | JSON merge into mock `/me` (`phone_verified`, …) |
| `doge.civic-preview` | `sessionStorage` | DEV: `unverified` \| `available` \| `in_progress` \| `verified` \| `failed` |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live profile civic from `/me` | [full-cycle/01-happy-live-profile-civic-from-me-1536x1024.png](./full-cycle/01-happy-live-profile-civic-from-me-1536x1024.png) | `USER_*` → Continue → `/#/profile` + `[data-civic-status-card]` |
| H2 | live auth-success | [full-cycle/02-happy-live-auth-success-1536x1024.png](./full-cycle/02-happy-live-auth-success-1536x1024.png) | live sign-in → `data-auth-state=auth-success` |
| H3 | mock unverified + Verify CTA | [full-cycle/03-happy-mock-civic-unverified-verify-cta-1536x1024.png](./full-cycle/03-happy-mock-civic-unverified-verify-cta-1536x1024.png) | mock + `doge.civic-preview=unverified` |
| H4 | mock verified (no re-prompt) | [full-cycle/04-happy-mock-civic-verified-no-reprompt-1536x1024.png](./full-cycle/04-happy-mock-civic-verified-no-reprompt-1536x1024.png) | preview=`verified` + `phone_verified=true` |
| H5 | dashboard civic reuse | [full-cycle/05-happy-mock-dashboard-civic-reuse-1536x1024.png](./full-cycle/05-happy-mock-dashboard-civic-reuse-1536x1024.png) | `/#/dashboard` + `[data-civic-status-card]` |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | M28 B available | [full-cycle/06-edge-mock-civic-verification-available-1536x1024.png](./full-cycle/06-edge-mock-civic-verification-available-1536x1024.png) | `doge.civic-preview=available` |
| E2 | M28 C in progress | [full-cycle/07-edge-mock-civic-verification-in-progress-1536x1024.png](./full-cycle/07-edge-mock-civic-verification-in-progress-1536x1024.png) | `doge.civic-preview=in_progress` |
| E3 | M28 E failed | [full-cycle/08-edge-mock-civic-verification-failed-1536x1024.png](./full-cycle/08-edge-mock-civic-verification-failed-1536x1024.png) | `doge.civic-preview=failed` |
| E4 | locale et civic | [full-cycle/09-edge-mock-locale-et-civic-unverified-1536x1024.png](./full-cycle/09-edge-mock-locale-et-civic-unverified-1536x1024.png) | `doge.locale=et` + unverified |
| E5 | locale ru civic | [full-cycle/10-edge-mock-locale-ru-civic-unverified-1536x1024.png](./full-cycle/10-edge-mock-locale-ru-civic-unverified-1536x1024.png) | `doge.locale=ru` + unverified |
| E6 | Verify → `/verify` | [full-cycle/11-edge-mock-verify-cta-navigates-to-verify-1536x1024.png](./full-cycle/11-edge-mock-verify-cta-navigates-to-verify-1536x1024.png) | click Verify CTA → `#/verify` |

## archive/ (P3 UI-0 / UI-3 baselines, moved from T01)

| File |
|------|
| [archive/pre-implement-civic-slot-placeholder-1536x1024.png](./archive/pre-implement-civic-slot-placeholder-1536x1024.png) |
| [archive/post-implement-a-unverified-civic-cabinet-1536x1024.png](./archive/post-implement-a-unverified-civic-cabinet-1536x1024.png) |
| [archive/post-implement-b-verification-available-civic-cabinet-1536x1024.png](./archive/post-implement-b-verification-available-civic-cabinet-1536x1024.png) |
| [archive/post-implement-c-verification-in-progress-civic-cabinet-1536x1024.png](./archive/post-implement-c-verification-in-progress-civic-cabinet-1536x1024.png) |
| [archive/post-implement-d-verified-civic-cabinet-1536x1024.png](./archive/post-implement-d-verified-civic-cabinet-1536x1024.png) |
| [archive/post-implement-e-verification-failed-civic-cabinet-1536x1024.png](./archive/post-implement-e-verification-failed-civic-cabinet-1536x1024.png) |

## Commands

```bash
cd spa-app && npm test -- --run UserCabinetPage CivicStatusCard civicStatusState DashboardPage
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:cabinet-civic-cab03-full
```

Secrets: never commit `.env`; this README does not include email/password.
