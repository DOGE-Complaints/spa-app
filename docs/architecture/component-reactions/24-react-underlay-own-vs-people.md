# CR-24 — React wide underlay · own vs people (structure Present · visual BLOCKED)

> **UTC:** 2026-10-22T15:12:28Z (P8 local close)  
> **Package:** `pkg-000208` · EPIC-SPA-23  
> **Code home:** `ReactionSummaryStrip` · `FeedReactionsMount` · `FeedCivicPost` · soft `FeedLabCt23Stand`  
> **Normative:** [ARCHITECTURE §2](../../tasks/backlog-stories/component-reactions/ARCHITECTURE.md) · Interview **Rx7** · [M163](../../UX/next/feed/artboards/DOGEstonia-M163-feed-civic-react-underlay-spec-v1.0.md) · [M164](../../UX/next/feed/artboards/DOGEstonia-M164-stable-react-own-vs-people-spec-v1.0.md) · Path A **p13UxReady**  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| React underlay | One wide zone backing (`data-rm-react-underlay=wide` · `--own-in-zone`) · no double nest / inner pill (M163) |
| React tap | Opens M154 picker · not people |
| Reactions zone | Text `Reactions` only · opens M155 people (honesty) · no glyph stack |
| Own marks | Icons **inside** React underlay · stable 0/1/2/3 · max 3 · **no** page-wide below-row (M164) |
| Zero state | Thumb above `React` label · peer-aligned |
| Comment/Share | Flat / transparent held |

## Touchpoints

- `reactions-mount/ReactionSummaryStrip.jsx` · `.css` · `ReactionsMount.jsx` (`ownInZone`)
- `feed/FeedReactionsMount.jsx` · `.css` · `FeedCivicPost.jsx` · `FeedLabCt23Stand.jsx`
- Tests: `reactionsMount.cr24` · `feed.cr24` · soft nf18 underlay tip · Path A `scripts/tmp-cr24-capture.mjs`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent CDN · no invent M163 PNG · no invent people · CR-25 hydrate OOS.
