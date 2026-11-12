# Acceptance verification — STORY-SPA-NF-03

**Status:** PASS  
**Date:** `2026-10-10T18:53:45Z`  
**Package:** `pkg-000105`  
**Epic:** EPIC-SPA-20 · **Story:** STORY-SPA-NF-03-list-map-toggle  
**Live:** SPA `127.0.0.1:4173` · gateway `:8000` **DOWN** · populated = `DEMO-NF03-*`

## Traceability (backlog AC)

| AC | Result | Evidence |
|----|--------|----------|
| List\|Map toggle + states per M151 | PASS | `FeedListMapToggle` · `FeedMapArea` · full-cycle PNG |
| Pins next-feed map-pin; lat/lon only | PASS | `pinImageUrl` + `issueGeo` · vitest NF-03 |
| No invent map API; api-req + Q14 honesty | PASS | same gateway list · no new HTTP · partial/unavailable copy |
| L10N keys; shell OOS | PASS | `nextFeed.map.*` · AppShell untouched |

## §UI (ui_gate auto · Path A)

| Gate | Result |
|------|--------|
| UI-0 | PASS · pre-implement baseline |
| UI-1 Path A | PASS · ui-mockup-spec M151 |
| UI-2 | PASS · features/feed map toggle |
| UI-3 | PASS · vitest 19 · board-shell 0 · post-implement PNG |
| Story-root screenshots | PASS · `screenshots/full-cycle/` · README |

## UI Screenshots

| File | Claim |
|------|-------|
| `…/ui-baseline/pre-implement/01-next-feed-list-only-1536x1024.png` | UI-0 list-only |
| `…/ui-baseline/post-implement/01-feed-list-view-selected-1536x1024.png` | UI-3 List selected |
| `…/ui-baseline/post-implement/02-feed-map-view-partial-1536x1024.png` | UI-3 Map + partial |

## Story-root screenshots

| File | Claim |
|------|-------|
| `screenshots/full-cycle/01-feed-map-error-retry-1536x1024.png` | Host error + Retry |
| `screenshots/full-cycle/02-feed-list-view-demo-fixture-1536x1024.png` | List + toggle |
| `screenshots/full-cycle/03-feed-map-view-partial-demo-fixture-1536x1024.png` | Map + partial helper |
| `screenshots/full-cycle/04-feed-map-ineligible-demo-fixture-1536x1024.png` | Map disabled |

## Commands

```bash
cd spa-app && npx vitest run src/features/feed src/i18n/__tests__/nextFeedDictionary.test.js \
  src/pages/__tests__/NextFeedHostPage.test.jsx
# → 5 files / 19 tests passed
cd spa-app && PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  npm run test:ui:board-shell   # exit 0
```

## Out of scope

- Invent map/geocode/search HTTP  
- Shell D2 ownership  
- Q14 privacy product gate (process)

## Verdict

**Story gate PASS** — NF-03 list|map toggle Done for `pkg-000105`.
