# Acceptance verification — STORY-SPA-NF-06

**Status:** PASS  
**Date:** `2026-10-10T19:40:00Z`  
**Package:** `pkg-000108`  
**Epic:** EPIC-SPA-20 · **Story:** STORY-SPA-NF-06-mounts-responsive-verify  
**Live:** SPA `127.0.0.1:4173` · gateway `:8000` **DOWN** · DEMO-NF06-1

## Traceability (backlog AC)

| AC | Result | Evidence |
|----|--------|----------|
| Mount parity + narrow body + theme/L10n M158–M160 (feed body) | PASS | full-cycle `01`…`04` · FeedIssueMount modal/sheet/route |
| Vitest + browser-smoke; catalog `/icons/next-feed/…` 404-free | PASS | FeedMounts.nf06 · board-shell 0b · NEXT_FEED_ICON_CATALOG_URLS ×24 |
| No new HTTP; shell chrome OOS | PASS | issueService reuse · AppShell untouched |
| Links register + api-req + icon catalog | PASS | backlog · NF-I · ADMIN-NF-02 |

## §UI (ui_gate auto · Path A)

| Gate | Result |
|------|--------|
| UI-0 | PASS · pre-implement baseline feed host |
| UI-1 Path A | PASS · ui-mockup-spec M158 (+ M159 body / M160) |
| UI-2 | PASS · FeedIssueMount + FeedIssueDetail + narrow CSS |
| UI-3 | PASS · vitest 21 · board-shell 0b · post-implement PNG |
| Story-root screenshots | PASS · `screenshots/README.md` + `full-cycle/` · README |

## Commands

```bash
cd spa-app && npx vitest run src/features/feed/__tests__/FeedMounts.nf06.test.jsx \
  src/i18n/__tests__/nextFeedDictionary.test.js src/pages/__tests__/NextFeedHostPage.test.jsx
# → FeedMounts 6 + dictionary + host green
cd spa-app && PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  npm run test:ui:board-shell
```

## Out of scope

- Shell mobile chrome / D2 ownership  
- M155 people · invent mounts HTTP · classic `#/issue/:id` retire  
- Icon re-promote (no 404 gap)

## Verdict

**Story gate PASS** — NF-06 mounts + responsive + feed verify Done for `pkg-000108`.

**P6 gap close (`2026-10-10T19:45:00Z`):** F1 CLOSED T07 (story-root `screenshots/README.md`) · F2 CLOSED T08 (Invite unclipped `02`) · F3–F4 WAIVED · OPEN empty.
