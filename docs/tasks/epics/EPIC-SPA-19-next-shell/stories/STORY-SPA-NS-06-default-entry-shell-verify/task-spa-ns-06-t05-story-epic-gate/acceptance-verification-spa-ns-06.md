# Acceptance verification — STORY-SPA-NS-06

**Status:** PASS  
**Date:** `2026-10-09T17:50:50Z`  
**Package:** `pkg-000102`  
**Epic:** EPIC-SPA-19 · **Story:** STORY-SPA-NS-06-default-entry-shell-verify  
**Live:** SPA `127.0.0.1:4173` · Backend UP (gateway `:8000`, identity `:8100`, threads `:8001`)

## Traceability (backlog AC)

| AC | Result | Evidence |
|----|--------|----------|
| `/` and `*` land on `#/next/feed` | PASS | `App.jsx` Navigate · vitest `App.ns06DefaultEntry` · live screenshots `02`/`03` |
| spa-url-page-map updated | PASS | `spa-app/docs/spa-url-page-map.md` next shell + home flip |
| Vitest + browser-smoke shell | PASS | 45 vitest (layout/AppShell/ns06) · `npm run test:ui:board-shell` exit 0 |
| Icon runtime URLs 404-free; logo | PASS | curl 200 menu/board/profile.svg + logo-horizontal.png |
| Feed body E2E not required | PASS | not claimed · WIP host only |

## §UI (ui_gate auto · Path A)

| Gate | Result |
|------|--------|
| UI-0 baseline (anchor T01) | PASS · `task-spa-ns-06-t01…/ui-baseline/` |
| UI-1 mockup Path A | PASS · `ui-mockup-spec.md` · `@mockup` Arch 03 verified exists |
| UI-2 implement | PASS · redirects + map + tests + smoke repair |
| UI-3 verify | PASS · vitest + board-shell + post-implement PNG |
| Story-root screenshots | PASS · `screenshots/full-cycle/` ≥1 happy PNG (`01-…`) · README |

## Commands (claims)

```bash
cd spa-app && npx vitest run src/pages/__tests__/App.ns06DefaultEntry.test.jsx \
  src/pages/__tests__/BoardPage.shell.test.jsx src/layout/__tests__/ \
  src/components/AppShell/__tests__/ src/pages/__tests__/NextFeedHostPage.test.jsx
# → 12 files / 45 tests passed
cd spa-app && npm run test:ui:board-shell   # exit 0 (NS-05 chrome selectors)
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/icons/next-shell/navigation/menu.svg  # 200
ls screenshots/full-cycle/*.png
```

## Out of scope (confirmed not Done)

- Retire classic permanently  
- Full feed product / BoardFeed invent  
- Invent CI beyond existing patterns  

## Verdict

**Story gate PASS** — NS-06 shell verify complete. Epic EPIC-SPA-19 Wave C closed for this story.
