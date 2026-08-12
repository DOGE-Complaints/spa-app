# Screenshots — STORY-SPA-CAB-06 Contribution Layer

**Viewport:** 1536×1024  
**Full-cycle PASS:** 2026-07-28T11:13:39Z (P6 V1 re-shot — mock 03–10 without Session Expired)  
**Prior PASS:** 2026-07-28T09:28:43Z (P3; mock 03–10 had Session Expired — audit V1)  
**Runner:** `cd spa-app && npm run test:ui:cabinet-contrib-cab06-full`

| Mock M53 / locales / Retry CTA | Mock Vite (`VITE_IDENTITY_MOCK_MODE=true`) + `doge.contrib-preview` / `doge.locale` |
| Script exit | `0` (PASS) |
| V1 harden | free `:4173` before live/mock restart; assert no Session Expired before mock shots; re-seed JWT TTL each capture |

```bash
cd spa-app && npm run test:ui:cabinet-contrib-cab06-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `doge.locale` | `localStorage` | `en` \| `et` \| `ru` |
| `doge.mock-profile` | `sessionStorage` | JSON merge into mock `/me` |
| `doge.contrib-preview` | `sessionStorage` | DEV: `receipts-*` \| `records-*` \| `reputation-*` |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live profile contrib stub (A1/B1/C1) | [full-cycle/01-happy-live-profile-contrib-stub-1536x1024.png](./full-cycle/01-happy-live-profile-contrib-stub-1536x1024.png) | `USER_*` → Continue → `/#/profile` + `[data-contribution-layer]` |
| H2 | live auth-success | [full-cycle/02-happy-live-auth-success-1536x1024.png](./full-cycle/02-happy-live-auth-success-1536x1024.png) | live sign-in → `data-auth-state=auth-success` |
| H3 | mock A1/B1/C1 stub | [full-cycle/03-happy-mock-contrib-a1-b1-c1-stub-1536x1024.png](./full-cycle/03-happy-mock-contrib-a1-b1-c1-stub-1536x1024.png) | mock + default preview |
| H4 | mock receipts populated | [full-cycle/04-happy-mock-receipts-populated-1536x1024.png](./full-cycle/04-happy-mock-receipts-populated-1536x1024.png) | `preview=receipts-populated` |
| H5 | mock records populated | [full-cycle/07-happy-mock-records-populated-1536x1024.png](./full-cycle/07-happy-mock-records-populated-1536x1024.png) | `preview=records-populated` |
| H6 | mock reputation available | [full-cycle/08-happy-mock-reputation-available-1536x1024.png](./full-cycle/08-happy-mock-reputation-available-1536x1024.png) | `preview=reputation-available` |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | receipts unavailable | [full-cycle/05-edge-mock-receipts-unavailable-1536x1024.png](./full-cycle/05-edge-mock-receipts-unavailable-1536x1024.png) | `preview=receipts-unavailable` |
| E2 | Retry → comingSoon | [full-cycle/06-edge-mock-retry-coming-soon-1536x1024.png](./full-cycle/06-edge-mock-retry-coming-soon-1536x1024.png) | unavailable + Retry click |
| E3 | locale et stub | [full-cycle/09-edge-mock-locale-et-contrib-stub-1536x1024.png](./full-cycle/09-edge-mock-locale-et-contrib-stub-1536x1024.png) | `doge.locale=et` |
| E4 | locale ru stub | [full-cycle/10-edge-mock-locale-ru-contrib-stub-1536x1024.png](./full-cycle/10-edge-mock-locale-ru-contrib-stub-1536x1024.png) | `doge.locale=ru` |

## Archive (UI-0 / UI-3 baselines)

| Phase | Path |
|-------|------|
| UI-0 pre | [archive/pre-implement/](./archive/pre-implement/) |
| UI-3 post | [archive/post-implement/](./archive/post-implement/) |

Anchor task baseline (working copy): [../task-spa-cab-06-t01-mount-contribution-layer/ui-baseline/](../task-spa-cab-06-t01-mount-contribution-layer/ui-baseline/).

## Re-run

```bash
cd spa-app && npm run test:ui:cabinet-contrib-cab06-full
```

Secrets: never commit `.env`; this README does not include email/password.
