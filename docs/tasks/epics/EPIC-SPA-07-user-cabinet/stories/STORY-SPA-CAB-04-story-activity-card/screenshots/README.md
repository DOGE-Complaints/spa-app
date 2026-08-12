# STORY-SPA-CAB-04 — screenshots (story root)

**Viewport:** 1536×1024  
**Captured UTC:** archive UI-0/UI-3 2026-07-26T11:17:40Z–11:30Z / full-cycle PASS **2026-07-26T11:31:07Z**  
**Canonical evidence for CAB-04** — not under task subfolders (T01 `ui-baseline/` points here for pack).

## Live login status

| Check | Result |
|-------|--------|
| `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` | Present |
| Supabase `signInWithPassword` | **PASS** |
| `02-happy-live-auth-success-*.png` | Produced |
| Live `01-happy-live-profile-story-activity-*.png` | Produced (real session + `[data-story-activity-card]`) |
| Mock M45 / locales / CTAs | Mock Vite (`VITE_IDENTITY_MOCK_MODE=true`) + `doge.story-activity-preview` / `doge.locale` |
| Script exit | `0` (PASS) |

```bash
cd spa-app && npm run test:ui:cabinet-story-cab04-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `doge.locale` | `localStorage` | `en` \| `et` \| `ru` |
| `doge.mock-profile` | `sessionStorage` | JSON merge into mock `/me` |
| `doge.story-activity-preview` | `sessionStorage` | DEV: `active` \| `empty` \| `draft` \| `verify` \| `unavailable` |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live profile story activity | [full-cycle/01-happy-live-profile-story-activity-1536x1024.png](./full-cycle/01-happy-live-profile-story-activity-1536x1024.png) | `USER_*` → Continue → `/#/profile` + `[data-story-activity-card]` |
| H2 | live auth-success | [full-cycle/02-happy-live-auth-success-1536x1024.png](./full-cycle/02-happy-live-auth-success-1536x1024.png) | live sign-in → `data-auth-state=auth-success` |
| H3 | mock empty + Go to Board | [full-cycle/03-happy-mock-story-empty-go-to-board-1536x1024.png](./full-cycle/03-happy-mock-story-empty-go-to-board-1536x1024.png) | mock + `preview=empty` |
| H4 | mock active history | [full-cycle/04-happy-mock-story-active-history-1536x1024.png](./full-cycle/04-happy-mock-story-active-history-1536x1024.png) | `preview=active` |
| H5 | mock draft coming soon | [full-cycle/05-happy-mock-story-draft-coming-soon-1536x1024.png](./full-cycle/05-happy-mock-story-draft-coming-soon-1536x1024.png) | `preview=draft` |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | verify required | [full-cycle/06-edge-mock-story-verify-required-1536x1024.png](./full-cycle/06-edge-mock-story-verify-required-1536x1024.png) | `preview=verify` |
| E2 | unavailable | [full-cycle/07-edge-mock-story-unavailable-1536x1024.png](./full-cycle/07-edge-mock-story-unavailable-1536x1024.png) | `preview=unavailable` |
| E3 | locale et empty | [full-cycle/08-edge-mock-locale-et-story-empty-1536x1024.png](./full-cycle/08-edge-mock-locale-et-story-empty-1536x1024.png) | `doge.locale=et` + empty |
| E4 | locale ru empty | [full-cycle/09-edge-mock-locale-ru-story-empty-1536x1024.png](./full-cycle/09-edge-mock-locale-ru-story-empty-1536x1024.png) | `doge.locale=ru` + empty |
| E5 | Go to Board → `/board` | [full-cycle/10-edge-mock-go-to-board-navigates-1536x1024.png](./full-cycle/10-edge-mock-go-to-board-navigates-1536x1024.png) | click Go to Board |
| E6 | Verify → `/verify` | [full-cycle/11-edge-mock-verify-cta-navigates-to-verify-1536x1024.png](./full-cycle/11-edge-mock-verify-cta-navigates-to-verify-1536x1024.png) | click Verify CTA |

## archive/ (P3 UI-0 / UI-3 baselines from T01)

| File |
|------|
| [archive/b-story-slot-placeholder-1536x1024.png](./archive/b-story-slot-placeholder-1536x1024.png) |
| [archive/post-implement-a-active-history-1536x1024.png](./archive/post-implement-a-active-history-1536x1024.png) |
| [archive/post-implement-b-empty-go-to-board-1536x1024.png](./archive/post-implement-b-empty-go-to-board-1536x1024.png) |
| [archive/post-implement-c-draft-coming-soon-1536x1024.png](./archive/post-implement-c-draft-coming-soon-1536x1024.png) |
| [archive/post-implement-d-verify-required-1536x1024.png](./archive/post-implement-d-verify-required-1536x1024.png) |
| [archive/post-implement-e-unavailable-1536x1024.png](./archive/post-implement-e-unavailable-1536x1024.png) |

## Commands

```bash
cd spa-app && npm test -- --run StoryActivity UserCabinetPage cabinetDictionary
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:cabinet-story-cab04-full
```

Secrets: never commit `.env`; this README does not include email/password.
