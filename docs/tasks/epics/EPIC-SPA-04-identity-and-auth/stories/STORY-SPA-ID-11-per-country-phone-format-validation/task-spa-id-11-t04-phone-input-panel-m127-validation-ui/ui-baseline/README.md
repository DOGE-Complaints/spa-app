# UI baseline — STORY-SPA-ID-11 anchor T04

**Route:** `/#/verify` → disclosure → phone panel  
**Viewport:** 1536×1024  
**Captured (pre-implement):** 2026-06-30T13:05:00Z  
**Captured (post-implement):** 2026-06-30T19:12:21Z  
**Mockup:** [ui-mockup-spec.md](../ui-mockup-spec.md) → M127 Path A

## Pre-implement (UI-0)

| State | File |
|-------|------|
| A valid EE | `pre-implement/valid-ee-m127a-1536x1024.png` |
| B invalid EE | `pre-implement/invalid-ee-m127b-1536x1024.png` |
| C DE country | `pre-implement/different-country-de-m127c-1536x1024.png` |
| D empty | `pre-implement/empty-m127d-1536x1024.png` |

## Post-implement (UI-3)

| State | File |
|-------|------|
| A valid EE | `post-implement/valid-ee-m127a-1536x1024.png` |
| B invalid EE | `post-implement/invalid-ee-m127b-1536x1024.png` |
| C DE country | `post-implement/different-country-de-m127c-1536x1024.png` |
| D empty | `post-implement/empty-m127d-1536x1024.png` |

## Capture script

```bash
cd spa-app
PHASE=pre-implement node ./tests/puppeteer/country-format-m127-screenshot.mjs
PHASE=post-implement node ./tests/puppeteer/country-format-m127-screenshot.mjs
# or: npm run test:ui:country-format-m127
```
