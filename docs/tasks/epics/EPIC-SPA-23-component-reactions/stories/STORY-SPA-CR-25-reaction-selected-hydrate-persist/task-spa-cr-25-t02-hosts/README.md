# SPA-CR-25-T02 — FeedCivicPost + FeedThreadMount pass tree mapped fields

**Status:** Done  
**Story:** [`../STORY-SPA-CR-25-reaction-selected-hydrate-persist.md`](../STORY-SPA-CR-25-reaction-selected-hydrate-persist.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-25-reaction-selected-hydrate-persist.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-25-reaction-selected-hydrate-persist.md)  
**ui_scope:** `reactions-mount` / next-feed · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T15:15:09Z`  
**Package:** `pkg-000209`  
**Path A:** Interview Rp12 · persist analysis · p13UxReady

## Purpose

FR-CR-25.1 · 25.2: Pass tree-mapped `selected` / summaries into Live mounts for post strip and comment plugs (`commentId`).

## Code Facts (verify)

- AS-IS: mapThreadTreeToBlock selected mapper Present (soft) · hosts may not pass into FeedReactionsMount
- Target: FeedCivicPost + FeedThreadMount wire mapped fields

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent gateway schema · no invent people API

## AC / DoD

- [x] Post host passes tree fields
- [x] Comment host passes per commentId
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedCivicPost.jsx` · `FeedThreadMount.jsx` (P3)

## Verification

```bash
rg -n "FeedReactionsMount|selected|summary_marks|thread_root_reactions" spa-app/src/features/feed/FeedCivicPost.jsx spa-app/src/features/feed/FeedThreadMount.jsx
```
