# STORY-SPA-PH-01 — screenshots (story root)

**Viewport:** 1536×1024 (mobile edge 390×844)  
**Captured UTC:** UI-0/3 baselines 2026-08-04T07:00–07:06Z · full-cycle PASS **2026-08-04T07:07:04Z** · State C locale-open **2026-08-04T07:30:45Z** (T12)  
**Canonical evidence for PH-01** — story-root `full-cycle/` (not only T01 `ui-baseline/`).

## Live login status

| Check | Result |
|-------|--------|
| `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` | Present |
| Supabase `signInWithPassword` | **PASS** |
| `02-happy-live-auth-success-*.png` | Produced |
| Live `01-happy-live-board-header-authenticated-*.png` | Produced (`[data-testid="public-header"]` + account slot host) |
| Mock desktop / how-it-works / mobile / locale et | Mock Vite (`VITE_IDENTITY_MOCK_MODE=true`) |
| Script exit | `0` (PASS) |

```bash
cd spa-app && npm run test:ui:public-header-ph01-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `doge.locale` | `localStorage` | `en` \| `et` \| `ru` |
| `VITE_STORY_GPT_URL` | env | Submit a story href (PH-06) |
| `VITE_IDENTITY_MOCK_MODE` | Vite | Mock session for deterministic shots |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live board header (authenticated) | [full-cycle/01-happy-live-board-header-authenticated-1536x1024.png](./full-cycle/01-happy-live-board-header-authenticated-1536x1024.png) | `USER_*` → Continue → `/#/board` + `[data-testid="public-header"]` |
| H2 | live auth-success | [full-cycle/02-happy-live-auth-success-1536x1024.png](./full-cycle/02-happy-live-auth-success-1536x1024.png) | live sign-in → `data-auth-state=auth-success` |
| H3 | mock desktop board | [full-cycle/03-happy-mock-board-header-desktop-1536x1024.png](./full-cycle/03-happy-mock-board-header-desktop-1536x1024.png) | mock Vite `/#/board` |
| H4 | mock how-it-works active | [full-cycle/04-happy-mock-how-it-works-active-1536x1024.png](./full-cycle/04-happy-mock-how-it-works-active-1536x1024.png) | `/#/how-it-works` + active nav class |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | mobile menu open | [full-cycle/05-edge-mock-mobile-menu-open-390x844.png](./full-cycle/05-edge-mock-mobile-menu-open-390x844.png) | 390×844 + menu toggle (Path A: inline under header, not M129 side-drawer) |
| E2 | locale et board | [full-cycle/06-edge-mock-locale-et-board-header-1536x1024.png](./full-cycle/06-edge-mock-locale-et-board-header-1536x1024.png) | `doge.locale=et` |
| E3 | M129 State C locale menu open | [full-cycle/07-edge-mock-locale-menu-open-1536x1024.png](./full-cycle/07-edge-mock-locale-menu-open-1536x1024.png) | mock Vite `/#/board` → click `.header-locale-trigger` → `.header-locale[data-open=yes]` |

## archive/ (P3 UI-0 / prior UI-3 baselines)

Historical pre/post and loose story PNGs moved here after this full-cycle pass. Live canonical evidence remains under `full-cycle/`.

## Commands

```bash
cd spa-app && npm test -- --run
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:public-header-ph01
cd spa-app && npm run test:ui:public-header-ph01-full
```

Secrets: never commit `.env`; this README does not include email/password.

## UI gate links

- [ui-mockup-spec.md](../task-spa-ph-01-t01-public-header-zones/ui-mockup-spec.md) (Path A M129)
- [acceptance §UI](../task-spa-ph-01-t08-story-gate-ph-01/acceptance-verification-spa-ph-01.md#ui-visual-pipeline)
