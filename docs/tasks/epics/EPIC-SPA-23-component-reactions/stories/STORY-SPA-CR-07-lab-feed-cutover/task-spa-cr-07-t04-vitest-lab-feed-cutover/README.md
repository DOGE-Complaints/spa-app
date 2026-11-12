# SPA-CR-07-T04 — Vitest + lab smoke cutover

**Status:** Done  
**Story:** [`../STORY-SPA-CR-07-lab-feed-cutover.md`](../STORY-SPA-CR-07-lab-feed-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md)  
**ui_scope:** `feed-lab`  
**Skill declared:** `test-master`  
**Scaffolded:** `2026-10-15T11:03:17Z`  
**Package:** `pkg-000143`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.4

## Purpose
FR-07.4 + story gate: update vitest/lab smoke to prefer `reactions-mount` / strip/picker testids; deprecate assertions that **require** `feed-reaction-plane` as sole plane; Path A screenshots on `#/lab/feed`; fill gate + checklist.

## Code Facts (verified at scaffold)
- Existing: `spa-app/src/features/feed-lab/__tests__/feedLabGreenfield.nflab08.test.jsx` asserts FeedReaction* Present
- Reactions-mount suites: `spa-app/src/features/reactions-mount/__tests__/reactionsMount.cr0*.test.jsx`
- Gate stub: [`../story-acceptance-gate-STORY-SPA-CR-07-lab-feed-cutover.md`](../story-acceptance-gate-STORY-SPA-CR-07-lab-feed-cutover.md) PENDING
- Shots stub: [`../screenshots/full-cycle/README.md`](../screenshots/full-cycle/README.md)

## Implement notes
- Add/adjust tests for cutover; do not require sole `feed-reaction-plane`
- Capture Path A shots; md5 in checklist/README
- Gate Result stays **BLOCK** if OP eye Absent (Partial visual) — no invent PASS
- OOS: invent HTTP · M155 · `#/next/feed`

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Story Done ≠ invent OP eye

## AC / DoD
- [ ] Vitest covers root+comment ReactionsMount path (or feed-lab host tests)
- [ ] Assertions no longer require live FeedReactionPlane as sole plane
- [ ] Screenshots + checklist filled; gate Date from live `--print-utc-now`
- [ ] `data-lab-visual-done=false` until OP PASS

## Where to change
`spa-app/src/features/feed-lab/__tests__/**` · optional `reactions-mount/__tests__/*cr07*` · gate/checklist/shots under story root

## Verification
```bash
cd spa-app && npx vitest run src/features/feed-lab src/features/reactions-mount
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
