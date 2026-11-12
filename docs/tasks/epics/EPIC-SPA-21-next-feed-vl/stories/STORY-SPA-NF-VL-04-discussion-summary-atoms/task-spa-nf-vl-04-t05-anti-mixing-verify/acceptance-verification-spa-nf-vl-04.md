# Acceptance verification — STORY-SPA-NF-VL-04

**Stamp:** `2026-10-12T14:41:59Z` · **pkg-000118** · **Result:** **PASS**  
**Path A:** M152 + DS §6 · AD-VL-01/02 · live Vite `:5173` + gateway `:8000` + threads `:8001` UP (local-five)

## Tasks

| Task | Status | Evidence |
|------|--------|----------|
| T01 as-is / shelter map | Done | Classic DISCUSSION / Existing discussion cited · ban named |
| T02 DS comments modules | Done | `features/feed/comments/*` · ui-mockup-spec · vitest nfvl04 |
| T03 semantics seam | Done | `selectPreviewBodies` Closed body only · no invent fields |
| T04 wire / displace shelter | Done | `FeedDiscussionBlock` mounts `DiscussionHeader` + `DiscussionSummaryChrome` |
| T05 anti-mixing + verify | Done | this gate · screenshots · `#/board` smoke 05 |
| T06 docs residual | Done | gap/surface map cite · NF-08 Related only |

## UI / Path A

- [x] Live `#/next/feed` shows DS DiscussionHeader + DiscussionSummaryChrome (01)
- [x] ThreadSummary / CommentPreview / ViewDiscussion Present (02/03)
- [x] Narrow 390 PNG Present (04)
- [x] `#/board` smoke — no `data-vl-done-surface="DiscussionSummaryChrome"` (05)
- [x] Story-root `screenshots/README.md` + `screenshots/full-cycle/` Present
- [x] Vitest nfvl04 + nf08 + nf09 PASS
- [x] Anti-mixing: classic IssueThreadBlock DISCUSSION chrome ≠ Done on next path
- [x] Grep: product Done path uses comments/ DS atoms

## Locks honored

No invent threads API · no mutate `#/board` · no reopen NF-08 body · no git push · pkg-000118 immutable
