# Acceptance verification — STORY-SPA-NF-02

**Status:** PASS  
**Date:** `2026-10-10T18:41:45Z`  
**Package:** `pkg-000104`  
**Epic:** EPIC-SPA-20 · **Story:** STORY-SPA-NF-02-civic-issue-post  
**Live:** SPA `127.0.0.1:4173` · Backend gateway `:8000` **DOWN** (error state honest; populated = DEMO-NF02 fixtures)

## Traceability (backlog AC)

| AC | Result | Evidence |
|----|--------|----------|
| Civic post matches M150 content claim without schema/media production | PASS | `FeedCivicPost` · ISSUE-CARD-NO-MEDIA / SSR-C-civic · no SchemaCardOverlay |
| Icons from catalog runtime URLs | PASS | open-issue/more/comment/react/share + location · PNG action strip |
| API = existing issue fields only; links api-req | PASS | title/summary/labels/status/type/geo/created_at only |
| L10N reuse + draft keys; shell OOS | PASS | `threadsFeed.post.action.*` + `nextFeed.post.*` en/et/ru · AppShell untouched |

## §UI (ui_gate auto · Path A)

| Gate | Result |
|------|--------|
| UI-0 baseline (anchor T01) | PASS · `task-spa-nf-02-t01…/ui-baseline/pre-implement/` |
| UI-1 mockup Path A | PASS · `ui-mockup-spec.md` · M150 `@mockup` |
| UI-2 implement | PASS · `features/feed/FeedCivicPost.*` |
| UI-3 verify | PASS · vitest 16 · `test:ui:board-shell` exit 0 · post-implement PNG |
| Story-root screenshots | PASS · `screenshots/full-cycle/` · README |

## UI Screenshots

| File | Claim |
|------|-------|
| `…/ui-baseline/pre-implement/01-next-feed-issuecard-host-1536x1024.png` | UI-0 pre (IssueCard path / error) |
| `…/ui-baseline/post-implement/01-civic-post-no-media-demo-fixture-1536x1024.png` | UI-3 FeedCivicPost no-media |
| `…/ui-baseline/post-implement/02-civic-post-action-strip-icons-1536x1024.png` | UI-3 catalog action icons + geo |

## Story-root screenshots

| File | Claim |
|------|-------|
| `screenshots/full-cycle/01-feed-civic-error-retry-1536x1024.png` | Error + Retry |
| `screenshots/full-cycle/02-feed-civic-empty-1536x1024.png` | Empty |
| `screenshots/full-cycle/03-feed-civic-populated-demo-fixture-1536x1024.png` | Populated DEMO-NF02 |
| `screenshots/full-cycle/04-feed-civic-ssr-c-civic-no-schema-1536x1024.png` | No schema overlay |

## Commands (claims)

```bash
cd spa-app && npx vitest run src/features/feed src/i18n/__tests__/nextFeedDictionary.test.js \
  src/pages/__tests__/NextFeedHostPage.test.jsx
# → 4 files / 16 tests passed
cd spa-app && PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  npm run test:ui:board-shell   # exit 0
ls docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-02-civic-issue-post/screenshots/full-cycle/*.png
rg -n "FeedCivicPost|nextFeed\.post\." spa-app/src/features/feed spa-app/src/i18n -g '*.js' -g '*.jsx' | head -40
```

## Out of scope (confirmed not Done)

- Schema/media production  
- NF-04/05 write behavior beyond strip affordances  
- Shell chrome D2 ownership  

## Verdict

**Story gate PASS** — NF-02 civic issue-as-post content Done for `pkg-000104`.
