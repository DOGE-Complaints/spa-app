# Task acceptance — SPA-ID-13-T04

- **Story:** STORY-SPA-ID-13 — Public route regression
- **Package:** `pkg-000041-20260801-epic-spa-04-id-13-public-route-regression.yaml`
- **Result:** PASS
- **Date:** 2026-08-01T20:02:31Z
- **Scaffolded:** 2026-08-01T19:28:37Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| FR-ID13.5 no `/login` after goto `/#/board` | PASS | `board-shell-smoke.mjs` — fail if `page.url()` includes `/login` |
| FR-ID13.5 `npm run test:ui:board-shell` green | PASS | exit 0 (Chrome via `PUPPETEER_CACHE_DIR=$HOME/.cache/puppeteer`) |

```bash
cd spa-app && PUPPETEER_CACHE_DIR="$HOME/.cache/puppeteer" npm run test:ui:board-shell
```
