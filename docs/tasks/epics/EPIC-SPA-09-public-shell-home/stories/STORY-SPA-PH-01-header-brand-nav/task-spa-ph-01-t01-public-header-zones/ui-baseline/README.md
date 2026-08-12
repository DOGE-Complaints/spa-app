# UI baseline — SPA-PH-01-T01 (anchor)

**Story:** STORY-SPA-PH-01-header-brand-nav  
**Captured UTC (UI-0):** 2026-08-04T07:00:00Z (pre-implement, this P3)  
**Viewport primary:** 1536×1024  
**Route:** `/#/board`  
**Selector:** `.header-strip` / `[data-testid="public-header"]` (post) / `[data-testid="app-shell"]`

## Capture method

```bash
cd spa-app && PH01_PHASE=pre-implement node tests/puppeteer/public-header-ph01-screenshot.mjs
cd spa-app && PH01_PHASE=post-implement node tests/puppeteer/public-header-ph01-screenshot.mjs
```

MCP `user-puppeteer` was unavailable (server error / auth timeout) — node puppeteer used as allowed fallback; output path = this `ui-baseline/`.

## pre-implement (UI-0)

| State | File | Notes |
|-------|------|-------|
| desktop board | [pre-implement/desktop-board-header-1536x1024.png](./pre-implement/desktop-board-header-1536x1024.png) | Legacy chrome before M129 zones (logo + locale; no primary nav) |
| mobile board | [pre-implement/mobile-board-header-390x844.png](./pre-implement/mobile-board-header-390x844.png) | Narrow viewport |

## post-implement (UI-3)

| State | File | Notes |
|-------|------|-------|
| desktop board | [post-implement/desktop-board-header-1536x1024.png](./post-implement/desktop-board-header-1536x1024.png) | Brand \| Nav \| Account slot \| Locale; no SYNCED |
| how-it-works active | [post-implement/how-it-works-active-desktop-1536x1024.png](./post-implement/how-it-works-active-desktop-1536x1024.png) | Active marker on How it works |
| mobile menu open | [post-implement/mobile-menu-open-390x844.png](./post-implement/mobile-menu-open-390x844.png) | Hamburger + panel |

> Historical PNGs at ui-baseline root / older post-implement names moved to story-root `screenshots/archive/` after UI-3.
