# SPA-CR-12-T02 — Aggregate row under strip

**Status:** Done · `2026-10-16T10:42:46Z`  
**Story:** [`../STORY-SPA-CR-12-react-always-aggregate-row.md`](../STORY-SPA-CR-12-react-always-aggregate-row.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-16T10:37:39Z`  
**Package:** `pkg-000148`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.3

## Purpose
FR-12.3–12.4: Aggregate summary renders **below** `FeedPostActionStrip` (card + detail). Empty → row absent; loading/error Present (M154 A2/A3).

## Code Facts (verified at scaffold)
- Aggregate currently lives inside `ReactionSummaryStrip` (in-strip)
- CR-09: no under-strip root `ReactionsMount` — keep that; this is **summary row**, not second mount
- Hosts: `FeedPostCard.jsx` · `FeedIssueDetailBody.jsx`

## Implement notes
- Prefer extract/split: strip React chrome vs under-strip aggregate row host
- Marks + counts + «N total» when populated
- OOS: Reactions zone click (T03) · M155 people

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No dual React mount under strip
- No invent HTTP · no M155

## AC / DoD
- [x] Aggregate DOM **below** action strip when populated
- [x] Empty → aggregate row absent
- [x] Loading / unavailable + retry Present

## Where to change
`FeedPostCard.jsx` · `FeedIssueDetailBody.jsx` · `ReactionSummaryStrip` / new row component · CSS

## Verification
```bash
rg -n "aggregate|FeedPostActionStrip|reaction-summary" spa-app/src/features/feed-lab/post/FeedPostCard.jsx spa-app/src/features/feed-lab/post/FeedIssueDetailBody.jsx
```
