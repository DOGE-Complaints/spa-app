# UI baseline — SPA-CAB-04-T01 (anchor)

**Viewport:** 1536×1024  
**Route:** `/#/profile` · selector `[data-testid="cabinet-slot-story"]`  
**Captured UTC:** pre-implement 2026-07-26T11:27Z · post-implement 2026-07-26T11:30Z  
**Story-root pack:** [`../../screenshots/`](../../screenshots/) (canonical full-cycle)

## Capture

```bash
cd spa-app
CAB04_PHASE=pre-implement node ./tests/puppeteer/cabinet-story-cab04-screenshot.mjs
CAB04_PHASE=post-implement node ./tests/puppeteer/cabinet-story-cab04-screenshot.mjs
# or: npm run test:ui:cabinet-story-cab04
```

DEV hook: `sessionStorage['doge.story-activity-preview']` = `active|empty|draft|verify|unavailable`.

## Files

| Phase | State | Path |
|-------|-------|------|
| pre-implement | B placeholder (pre-card) | [pre-implement/b-story-slot-placeholder-1536x1024.png](./pre-implement/b-story-slot-placeholder-1536x1024.png) _(moved to story archive — see screenshots/archive)_ |
| post-implement | A active | [post-implement/a-active-history-1536x1024.png](./post-implement/a-active-history-1536x1024.png) |
| post-implement | B empty | [post-implement/b-empty-go-to-board-1536x1024.png](./post-implement/b-empty-go-to-board-1536x1024.png) |
| post-implement | C draft | [post-implement/c-draft-coming-soon-1536x1024.png](./post-implement/c-draft-coming-soon-1536x1024.png) |
| post-implement | D verify | [post-implement/d-verify-required-1536x1024.png](./post-implement/d-verify-required-1536x1024.png) |
| post-implement | E unavailable | [post-implement/e-unavailable-1536x1024.png](./post-implement/e-unavailable-1536x1024.png) |

Note: pre-implement PNG relocated to story-root `screenshots/archive/` after UI-3 pack; post-implement copies also archived there. Local `post-implement/` retained for T01 UI-3 evidence.
