# UI baseline — SPA-CAB-03-T01 (anchor)

**Canonical story evidence** moved to story-root:

→ [`../../../screenshots/`](../../../screenshots/) (`README.md` + `archive/` + `full-cycle/`)

- **Route:** `/#/profile`
- **Viewport:** 1536×1024
- **Selectors:** `[data-testid="user-cabinet-page"]`, `[data-testid="cabinet-slot-civic"]`, `[data-civic-status-card]`
- **Historical P3 UI-0/UI-3 PNG:** [`../../../screenshots/archive/`](../../../screenshots/archive/)
- **Fresh happy/edge validation:** [`../../../screenshots/full-cycle/`](../../../screenshots/full-cycle/)

## Capture (legacy phase runner)

```bash
cd spa-app && CAB03_PHASE=pre-implement node ./tests/puppeteer/cabinet-civic-cab03-screenshot.mjs
cd spa-app && CAB03_PHASE=post-implement node ./tests/puppeteer/cabinet-civic-cab03-screenshot.mjs
```

Story-root full-cycle (preferred for gate §UI):

```bash
cd spa-app && npm run test:ui:cabinet-civic-cab03-full
```

DEV preview hook: `sessionStorage['doge.civic-preview']` = `unverified|available|in_progress|verified|failed`.
