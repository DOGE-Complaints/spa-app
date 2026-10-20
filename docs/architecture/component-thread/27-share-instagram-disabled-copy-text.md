# CT-27 — Share Instagram disabled · Copy text-only (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T19:56Z (P5 APPLY)  
> **Package:** `pkg-000185` · EPIC-SPA-24  
> **Code home:** `FeedPostShareSurface` · `shareIssueUrl` · `#/lab/feed`  
> **Normative:** [M152d](../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) list order · lock 2B IG disabled supersede  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| List order | Telegram · Instagram · X · WhatsApp · Facebook · Copy link (M152d held) |
| Instagram | Listed · visually disabled · `disabled`/`aria-disabled` · no copy · no share intent |
| Hint | Optional why-disabled copy (e.g. Needs image · unavailable for now) |
| Copy link | **Text-only** — no icon / no `⎘` · still copies `publicIssueUrl` |
| Other networks | TG/X/WA/FB icons + intents unchanged (CT-24 held) |
| Supersede | CT-24 Instagram `copyFallback` |

## Touchpoints

- `post/share/shareIssueUrl.js` · `FeedPostShareSurface.jsx` · `FeedPostShareSurface.css`
- Tests: `feedLab.ct27` · ct24 asserts updated · Path A `scripts/tmp-ct27-capture.mjs`
- Artboard: M152d (list order · behavior supersede)

## OOS

Invent Instagram Graph/upload · invent HTTP · invent OP PASS · density · attach chip · redesign networks set · `#/next/feed`

## Evidence

- Path A shots 01–05 Present (story pipeline full-cycle) · CAPTURE-META `fails: []`
- vitest feed-lab+thread-mount **225/225** · ct27 **4/4**
- P5: F1 WAIVED operator · F2 WAIVED info · TASKED=0 · activation none · Await P8
