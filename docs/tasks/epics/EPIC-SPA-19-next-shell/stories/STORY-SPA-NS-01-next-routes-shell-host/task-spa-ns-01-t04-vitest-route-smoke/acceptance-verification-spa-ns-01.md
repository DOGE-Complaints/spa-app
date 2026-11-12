# Acceptance verification — STORY-SPA-NS-01

**UTC:** `2026-10-09T15:09:58Z`  
**Package:** `pkg-000097`  
**Result:** **PASS**

## AC checklist

| AC | Result | Evidence |
|----|--------|----------|
| `#/next/feed` + `#/next/feed/issue/:id` inside AppShellLayout | **PASS** | `App.jsx` routes · `NextFeedHostPage.test.jsx` · post PNGs |
| Placeholder uses `t()`; no fake feed cards | **PASS** | `nextShell.wip.*` · no `board-feed` in host |
| Links UX register + api-req; feed body OOS | **PASS** | backlog + register _(routes)_ · next-feed deferred |
| No new HTTP endpoints | **PASS** | SPA router only |

## UI verification (§UI)

| Item | Path / result |
|------|----------------|
| Baseline UI-0 | [`../task-spa-ns-01-t01-…/ui-baseline/pre-implement/01-board-shelter-default.png`](../task-spa-ns-01-t01-register-next-feed-routes/ui-baseline/pre-implement/01-board-shelter-default.png) |
| Target mockup | [`../task-spa-ns-01-t01-…/ui-mockup-spec.md`](../task-spa-ns-01-t01-register-next-feed-routes/ui-mockup-spec.md) · M149 Path A · **принято** overnight |
| Story-root pack (P6) | [`../screenshots/README.md`](../screenshots/README.md) · [`full-cycle/`](../screenshots/full-cycle/) |
| Story-root Happy | [`01-next-feed-wip.png`](../screenshots/full-cycle/01-next-feed-wip.png) · [`02-next-feed-issue-host-wip.png`](../screenshots/full-cycle/02-next-feed-issue-host-wip.png) |
| Task post-implement | T01 `ui-baseline/post-implement/01…` · `02…` |
| Vitest | NextFeedHostPage **5/5** · nextShellDictionary · sessionRoutePolicy |
| Puppeteer gate | `npm run test:ui:board-shell` **PASS** |

## OOS (explicit)

BoardFeed / threads / reactions / `/` flip (NS-06) / classic apply (NS-05) / Header invent (NS-02).
