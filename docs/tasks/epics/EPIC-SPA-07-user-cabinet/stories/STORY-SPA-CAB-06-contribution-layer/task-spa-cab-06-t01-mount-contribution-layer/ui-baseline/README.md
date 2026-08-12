# UI baseline — SPA-CAB-06-T01 (Contribution Layer)

**Viewport:** 1536×1024  
**Route:** `/#/profile`  
**UTC (UI-0):** 2026-07-28T09:20:22Z  
**Selector:** `[data-testid="cabinet-slot-contribution"]` → post-implement `[data-contribution-layer]`

## Capture

```bash
cd spa-app
CAB06_PHASE=pre-implement node ./tests/puppeteer/cabinet-contrib-cab06-screenshot.mjs
CAB06_PHASE=post-implement node ./tests/puppeteer/cabinet-contrib-cab06-screenshot.mjs
# or: npm run test:ui:cabinet-contrib-cab06
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `doge.contrib-preview` | `sessionStorage` | Module override (see ui-mockup-spec) |
| `doge.mock-profile` | `sessionStorage` | Mock `/me` profile merge |
| `VITE_IDENTITY_MOCK_MODE` | Vite env | Mock auth for deterministic shots |

## Pre-implement (UI-0)

| State | File |
|-------|------|
| A1 placeholder | [pre-implement/a1-contribution-slot-placeholder-1536x1024.png](./pre-implement/a1-contribution-slot-placeholder-1536x1024.png) |

## Post-implement (UI-3)

See `post-implement/` after `npm run test:ui:cabinet-contrib-cab06`.

Canonical story evidence: [`../../screenshots/`](../../screenshots/) (full-cycle + archive).
