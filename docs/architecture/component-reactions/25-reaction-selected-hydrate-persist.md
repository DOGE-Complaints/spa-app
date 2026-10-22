# CR-25 — Reaction selected hydrate persist (structure Present · visual BLOCKED)

> **UTC:** 2026-10-22T17:51:19Z (P8 local close)  
> **Package:** `pkg-000209` · EPIC-SPA-23  
> **Code home:** `FeedReactionsMount` · `FeedCivicPost` · `FeedThreadMount` · `LiveAdapter` · `buildCommentForest`  
> **Normative:** Interview **Rp12** · [persist analysis](../../analysis/analysis-reaction-persist-reload-gap-2026-10-22.md) · Path A **p13UxReady**  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Post hydrate | `initialSelected` / `initialSummaryMarks` / `initialAggregateCount` from authenticated tree (`thread_root_reactions`) |
| Comment hydrate | FeedThreadMount per-comment plugs pass tree-mapped selected/summaries |
| Forest preserve | `buildCommentForest` keeps selected / summaryMarks / aggregateCount |
| PUT→reload | `rehydrateFromTree` after successful write · LiveAdapter `threadRootReactions` in snapshot |
| Anonymous | Omit selected honesty · Vitest · OP eye — no invent PASS |

## Touchpoints

- `feed/FeedReactionsMount.jsx` · `FeedCivicPost.jsx` · `FeedIssueDetail.jsx` · `FeedThreadMount.jsx` · soft `FeedLabCt23Stand.jsx`
- `thread-mount/adapters/LiveAdapter.js` · `thread-mount/tree/buildCommentForest.js`
- Tests: `feed.cr25` · Path A `scripts/tmp-cr25-capture.mjs`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent people API · no invent gateway schema · no invent CDN · CR-24 underlay visual OOS.
