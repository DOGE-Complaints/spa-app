# T01 Inventory — lab mounts · Borrow-forbidden (live `2026-10-13T15:08:26Z`)

## Lab-owned mounts (rename targets for T02)

| Path | Mounted from | Fact |
|------|--------------|------|
| `features/feed-lab/FeedLabIssueCard.jsx` (+ `.css`) | `FeedLabPage` via barrel | Present · lab-owned |
| `features/feed-lab/LabReactionChrome.jsx` (+ `.css`) | IssueCard · DetailOverlay | Present · lab-owned |
| `features/feed-lab/FeedLabDiscussion.jsx` (+ `.css`) | IssueCard · DetailOverlay | Present · lab-owned |
| `features/feed-lab/FeedLabDetailOverlay.jsx` (+ `.css`) | `FeedLabPage` | Present · lab-owned |
| `features/feed-lab/index.js` | page import surface | Present · barrel |
| `pages/FeedLabPage.jsx` | `#/lab/feed` route | Present · host |

Not rename targets this tip: `fixtures/**` · `labI18n.js` · page CSS.

## Borrow-forbidden shared VL (do **not** rename · cite for LAB-07+)

| Import (from feed-lab) | Shared path |
|------------------------|-------------|
| `IssueIdentityHeader` | `features/feed/identity/` |
| `ReactionAggregateStrip` · `ReactionPicker` | `features/feed/reactions/` |
| `reactionsV1` · `NEXT_FEED_THREAD_ICONS` | `features/feed/semantics/` · `feedThreadIcons.js` |
| `DiscussionHeader` · `DiscussionLayout` · `DiscussionSummaryChrome` | `features/feed/comments/` |
| `ComposerEntry` | `features/feed/composer/` |
| `OverlayHost` · `OverlayLayout` · `IssuePresentationLayout` · `PresentationChrome.css` | `features/feed/presentation/` |

## Commands

```bash
ls spa-app/src/features/feed-lab/*.{jsx,css}
rg -n "from ['\"]\\.\\./feed/" spa-app/src/features/feed-lab --glob '*.jsx'
```

## Result
- Inventory Present · no rename in T01 · no shared `features/feed/**` rename
