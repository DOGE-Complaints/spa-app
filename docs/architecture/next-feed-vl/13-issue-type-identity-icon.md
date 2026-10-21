# NF-13 — `#/next/feed` issue-type identity icon (structure Present · visual BLOCKED)

> **UTC:** 2026-10-21T11:38Z (P5 APPLY)  
> **Package:** `pkg-000189` · EPIC-SPA-20  
> **Code home:** `issueTypeIcons.js` · `FeedCivicPost` · `IssueTypeIcon` · `FeedLabNf13Stand` · `#/next/feed`  
> **Normative:** Path A [M161](../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md) · exact `ISSUE_TYPE_ICON_BY_TYPE`  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Map | Case-sensitive wire keys only · 5 types · unknown/missing → `null` (honest omit) |
| Bind | `FeedCivicPost` → `IssueIdentityHeader` `iconSrc` from `issueTypeIconForType(issue.type)` |
| Glyph | `IssueTypeIcon` slot 48×48 · glyph **24** (M161) |
| Assets | `public/icons/next-feed/types/ic-issue-type-*.svg` · catalog mirror under `dogestonia-icon-system-v1.0/icons/types/` |
| Path A stand | `FeedLabNf13Stand` on `#/lab/feed` · OP eye Absent → BLOCK |

## Touchpoints

- `src/i18n/issueTypeIcons.js` · `FeedCivicPost.jsx` · `identity/IssueTypeIcon.{jsx,css}`
- Lab: `FeedLabNf13Stand.jsx` · `FeedLabPage.jsx`
- Tests: `feed.nf13` · `issueTypeIcons.nf13` · `feedLab.nf13` · Path A `scripts/tmp-nf13-capture.mjs`

## OOS

Type aliases / lowercase synonyms · invent SVG · invent OP PASS · invent HTTP · ThreadMount / Reactions cutover

## Evidence

- Path A shots 01–05 Present (story pipeline full-cycle) · CAPTURE-META `fails: []` · `visual_gate: BLOCK`
- vitest feed+feed-lab+i18n+reactions-mount+thread-mount **451/451** · feed.nf13 **4/4** · map **3/3** · feedLab.nf13 **2/2**
- P5: F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none`
