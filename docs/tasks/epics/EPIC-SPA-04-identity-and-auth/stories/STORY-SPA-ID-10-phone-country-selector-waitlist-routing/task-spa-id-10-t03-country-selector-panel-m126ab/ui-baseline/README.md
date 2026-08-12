# UI baseline — STORY-SPA-ID-10 anchor T03

**Route:** `/#/verify` → disclosure → phone panel  
**Viewport:** 1536×1024  
**Captured (pre-implement):** 2026-06-30T10:58:19Z  
**Mockup:** [ui-mockup-spec.md](../ui-mockup-spec.md) → M126 Path A

## Pre-implement (UI-0)

| State | File |
|-------|------|
| A (readonly country) | `pre-implement/supported-m126a-1536x1024.png` |

## Post-implement (UI-3)

| State | File |
|-------|------|
| A supported | `post-implement/supported-m126a-1536x1024.png` |
| B dropdown | `post-implement/dropdown-m126b-1536x1024.png` |
| C unsupported | `post-implement/unsupported-m126c-1536x1024.png` |

## Capture script

```bash
cd spa-app
PHASE=pre-implement node ./tests/puppeteer/country-selector-m126-screenshot.mjs
PHASE=post-implement node ./tests/puppeteer/country-selector-m126-screenshot.mjs
```
