# CT-24 — Share Issue link sheet (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T15:30Z (P5 APPLY)  
> **Package:** `pkg-000182` · EPIC-SPA-24  
> **Code home:** `FeedPostShareSurface` · `shareIssueUrl` · `FeedPostCard` · `FeedIssueDetailBody` · `FeedPostActionStrip` · `#/lab/feed`  
> **Normative:** [M152d](../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) · icons `/icons/next-feed/share/*` · Arch §13.4  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Share zone | Custom UI — not silent no-op · not OS share-sheet hybrid |
| Desktop / narrow | Popover / bottom sheet (~390 · `SHARE_NARROW_MQ`) |
| Rows | Telegram · Instagram · X · WhatsApp · Facebook · Copy link |
| Icons | `/icons/next-feed/share/{telegram,instagram,x,whatsapp,facebook}.svg` |
| Payload | `fixture.publicIssueUrl` when Present · lab honesty when Absent |
| Copy | `Link copied` toast · Instagram copy-link fallback · no invent Graph API |
| Strip | Anatomy unchanged · active Share highlight while open |

## Touchpoints

- `post/share/FeedPostShareSurface.jsx` · `shareIssueUrl.js` · `useShareSurfaceMode.js`
- `FeedPostCard.jsx` · `FeedIssueDetailBody.jsx` · `FeedPostActionStrip.jsx` · `fixtures/labFeedFixtures.js`
- Tests: `feedLab.ct24` · Path A `scripts/tmp-ct24-capture.mjs`
- Icons: `public/icons/next-feed/share/`

## OOS

OAuth · short-link · Instagram Graph · invent production domain · strip redesign · density · invent HTTP · invent OP PASS · `#/next/feed`

## Evidence

- Path A shots 01–05 Present (story pipeline full-cycle) · CAPTURE-META `fails: []`
- vitest feed-lab+thread-mount structure suite · ct24 **6/6**
- P5: F1 WAIVED operator · F2 WAIVED info · TASKED=0 · activation none · Await P8
