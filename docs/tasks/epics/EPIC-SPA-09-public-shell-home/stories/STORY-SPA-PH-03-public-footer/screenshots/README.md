# STORY-SPA-PH-03 — screenshots (story root)

**Viewport:** 1536×1024 (narrow 390×844)  
**Captured UTC:** UI-0 2026-08-04T10:41:47Z · UI-3 / full-cycle PASS **2026-08-04T10:46:36Z**  
**Canonical evidence for PH-03** — story-root `full-cycle/` (not only T01 `ui-baseline/`).

## Live login status

| Check | Result |
|-------|--------|
| `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` | Present |
| Supabase `signInWithPassword` | **PASS** |
| `01-happy-live-board-public-footer-*.png` | Produced |
| Mock desktop / HIW / narrow | Mock Vite (`VITE_IDENTITY_MOCK_MODE=true`) |
| Script exit | `0` (PASS) |

```bash
cd spa-app && npm run test:ui:public-footer-ph03-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `doge.locale` | `localStorage` | `en` \| `et` \| `ru` |
| Footer links | `href="#about|#privacy|#contact"` | Placeholders until static routes exist |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live board PublicFooter | [full-cycle/01-happy-live-board-public-footer-1536x1024.png](./full-cycle/01-happy-live-board-public-footer-1536x1024.png) | `USER_*` login → Continue → `/#/board` + `[data-testid=public-footer]` |
| H2 | mock board desktop | [full-cycle/02-happy-mock-board-public-footer-desktop-1536x1024.png](./full-cycle/02-happy-mock-board-public-footer-desktop-1536x1024.png) | clear auth → `/#/board` |
| H3 | mock how-it-works | [full-cycle/03-happy-mock-how-it-works-public-footer-1536x1024.png](./full-cycle/03-happy-mock-how-it-works-public-footer-1536x1024.png) | `/#/how-it-works` |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | narrow wrap | [full-cycle/04-edge-mock-board-public-footer-narrow-390x844.png](./full-cycle/04-edge-mock-board-public-footer-narrow-390x844.png) | viewport 390×844 `/#/board` |

## Archive (UI-0 / UI-3 baselines)

| Phase | Path |
|-------|------|
| pre-implement | [archive/ui-baseline/pre-implement/](./archive/ui-baseline/pre-implement/) |
| post-implement | [archive/ui-baseline/post-implement/](./archive/ui-baseline/post-implement/) |

Anchor live copies remain under `task-spa-ph-03-t01-…/ui-baseline/`.

## Related

- [ui-mockup-spec.md](../task-spa-ph-03-t01-public-footer-layout/ui-mockup-spec.md)
- [acceptance-verification-spa-ph-03.md](../task-spa-ph-03-t05-story-gate-ph-03/acceptance-verification-spa-ph-03.md)
