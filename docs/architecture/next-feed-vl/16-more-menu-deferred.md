# NF-16 — `#/next/feed` More (⋮) menu deferred (structure Present · visual BLOCKED)

> **UTC:** 2026-10-21T12:58Z (P5 APPLY)  
> **Package:** `pkg-000192` · EPIC-SPA-20  
> **Code home:** `FeedCivicPost` · `IssueIdentityHeader` · `#/next/feed`  
> **Normative:** [ARCH-DELTA §4](../../tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · Path A **code lock**  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Gate | List `moreOutsideHit` behind `false && (` · not hard-deleted |
| Header | `IssueIdentityHeader` `showMore={false}` default · civic always passes false |
| TODO | `TODO(NF-16 / INTERVIEW-NF-13-plus M4)` on civic + header |
| Asset | Keep `/icons/next-feed/actions/more.svg` · catalog row deferred |
| DOM | `feed-civic-post-more` Absent · probe `moreCount=0` |
| Restore | ARCH-DELTA §4 SSOT when product defines overflow menu actions |

## Touchpoints

- `FeedCivicPost.jsx` · `IssueIdentityHeader.jsx`
- Tests: `feed.nf16` · nf02 / nf14 aligned · Path A `scripts/tmp-nf16-capture.mjs`

## OOS

Implement overflow menu · invent menu actions · invent OP PASS · invent HTTP · delete `more.svg`

## Evidence

- Path A shots 01–05 Present · CAPTURE-META `fails: []` · `visual_gate: BLOCK`
- vitest feed+feed-lab+i18n+reactions-mount+thread-mount **527/527** · feed.nf16 **2/2**
- P5: F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none`
