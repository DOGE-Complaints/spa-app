# SPA-CT-09-T02 — Lab wire FeedLabReactionsMount per comment

**Status:** Done  
**Story:** [`../STORY-SPA-CT-09-reactions-plug-comment-nodes.md`](../STORY-SPA-CT-09-reactions-plug-comment-nodes.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T14:39:06Z`  
**Package:** `pkg-000167`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.4 R-plug  
**Runtime:** Await P2 → P3 · ui_anchor · depends T01

## Purpose

FR-CT-09.1 · 09.5: Wire `FeedLabReactionsMount` / `ReactionsMount` `target=comment` + `commentId` per node · FixtureAdapter lab · Live fail-closed held · root strip reactSlot unchanged.

## Constraints

- Reuse CR mount — no package rewrite  
- No invent people HTTP / OP PASS  
- Lab host `#/lab/feed` / thread lab

## AC / DoD

- [x] Per-comment reactions mount Present (`data-rm-target=comment`)
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/feed-lab/post/thread/FeedLabThreadMount.jsx` · CommentNode slot consumer · lab stands as needed

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
