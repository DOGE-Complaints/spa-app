# SPA-CR-07-T02 — Comment ReactionsMount wire

**Status:** Done  
**Story:** [`../STORY-SPA-CR-07-lab-feed-cutover.md`](../STORY-SPA-CR-07-lab-feed-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md)  
**ui_scope:** `feed-lab`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T11:03:17Z`  
**Package:** `pkg-000143`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.4

## Purpose
FR-07.1 / FR-07.3: comment reaction nodes on `#/lab/feed` use **`ReactionsMount`** with `target="comment"` (three groups); root remains no selectable Moderation.

## Code Facts (verified at scaffold)
- Comment-node `FeedReactionPlane` / `ReactionsMount` under `FeedCommentTree` — **Absent** (grep at P1)
- Discussion tree: `spa-app/src/features/feed-lab/post/discussion/` (`FeedCommentTree` / related)
- Mount API: `resolveReactionsMountTargetConfig('comment')` Present in reactions-mount

## Implement notes
- Wire comment reaction slots → `ReactionsMount` + FixtureAdapter (or same contract)
- Ensure three groups for comment; moderation selectable per CR-01 target config
- Depends T01 root path Present preferred
- OOS: invent HTTP · M155 · `#/next/feed` · retire FeedReaction* (T03)

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No invent HTTP · no M155 · no `#/next/feed` cutover

## AC / DoD
- [ ] Comment reaction slots render `ReactionsMount` (`target=comment`)
- [ ] Three groups on comment; root moderation non-selectable held
- [ ] FixtureAdapter / same contract — no invent PUT

## Where to change
`spa-app/src/features/feed-lab/post/discussion/` (comment tree / row hosts) · `features/reactions-mount/`

## Verification
```bash
rg -n "ReactionsMount|target=.comment" spa-app/src/features/feed-lab/post/discussion
# manual: expand thread on #/lab/feed
```
