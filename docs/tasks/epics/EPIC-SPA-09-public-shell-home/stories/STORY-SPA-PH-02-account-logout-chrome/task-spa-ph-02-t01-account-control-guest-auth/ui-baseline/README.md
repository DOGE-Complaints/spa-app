# UI baseline — SPA-PH-02 AccountControl (anchor T01)

**UTC:** UI-0 pre-implement 2026-08-04T09:47:51Z · UI-3 post-implement ~2026-08-04T09:52Z  
**Viewport:** 1536×1024  
**Route:** `/#/board` · selector `[data-testid="header-account-slot"]` / `[data-testid="account-control"]`

## Path A mockup

See [`ui-mockup-spec.md`](../ui-mockup-spec.md) (M130 + M129 host).

## Captures

| State | Phase | File |
|-------|-------|------|
| A Guest idle | pre-implement | `pre-implement/a-guest-idle-board-1536x1024.png` |
| B Auth idle | pre-implement | `pre-implement/b-auth-idle-board-1536x1024.png` |
| C Menu open | pre-implement | `pre-implement/c-auth-menu-open-board-1536x1024.png` |
| A Guest idle | post-implement | `post-implement/a-guest-idle-board-1536x1024.png` |
| B Auth idle | post-implement | `post-implement/b-auth-idle-board-1536x1024.png` |
| C Menu open | post-implement | `post-implement/c-auth-menu-open-board-1536x1024.png` |

```bash
cd spa-app && PH02_PHASE=pre-implement node ./tests/puppeteer/public-header-ph02-screenshot.mjs
cd spa-app && npm run test:ui:public-header-ph02
```

Canonical story evidence: [`../../screenshots/`](../../screenshots/).
