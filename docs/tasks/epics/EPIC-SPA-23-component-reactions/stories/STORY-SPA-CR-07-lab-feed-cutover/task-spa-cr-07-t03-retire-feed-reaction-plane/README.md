# SPA-CR-07-T03 — Retire FeedReaction* dual plane

**Status:** Done  
**Story:** [`../STORY-SPA-CR-07-lab-feed-cutover.md`](../STORY-SPA-CR-07-lab-feed-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md)  
**ui_scope:** `feed-lab`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T11:03:17Z`  
**Package:** `pkg-000143`  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.4

## Purpose
FR-07.5 / FR-07.6: document and implement retire-or-`*Deprecated` for `FeedReactionPlane` / Aggregate / Picker — **no dual live planes**; ban classic `ReactionChrome` / Controls.css on greenfield path.

## Code Facts (verified at scaffold)
- Modules: `spa-app/src/features/feed-lab/post/reactions/FeedReactionPlane.jsx` · `FeedReactionAggregate.jsx` · `FeedReactionPicker.jsx`
- Barrel: `spa-app/src/features/feed-lab/post/reactions/index.js` · `post/index.js` re-exports
- Tests still reference plane: `feedLabGreenfield.nflab08.test.jsx`

## Implement notes
- Choose delete **or** Deprecated suffix — one path; no dual live imports on `#/lab/feed`
- Update barrels; keep ban on ReactionChrome / Controls.css / emoji-soup on greenfield
- OOS: delete `#/lab/reactions` · `#/next/feed` · invent HTTP · M155

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Depends T01/T02 wires Present before hard-delete preferred

## AC / DoD
- [ ] No live `FeedReactionPlane` as active `#/lab/feed` path
- [ ] Retire/Deprecated decision recorded in code/docs; barrels consistent
- [ ] Greenfield path still bans ReactionChrome / Controls.css

## Where to change
`spa-app/src/features/feed-lab/post/reactions/**` · barrels · consumers after T01/T02

## Verification
```bash
rg -n "FeedReactionPlane|ReactionChrome|Controls\.css" spa-app/src/features/feed-lab
```
