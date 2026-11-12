# SPA-CR-25-T01 — FeedReactionsMount initialSelected/summary props + sync

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

FR-CR-25.1 · 25.3: Accept initial `selected` / `summary_marks` / `aggregate_count` props and sync Live strip on mount/tree load — not only post-PUT local snapshot.

## Code Facts (verify)

- AS-IS: `FeedReactionsMount` starts `selected=[]` · summaries null until write
- Target: props + sync from authenticated tree payload

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent people API · no invent gateway schema

## AC / DoD

- [x] initialSelected / summary props Present + sync
- [x] Visual Done not claimed without OP eye · gate **BLOCK** until OP

## Where changed

`FeedReactionsMount.jsx` (P3)

## Verification

```bash
rg -n "selected|summaryMarks|aggregateCount|initial" spa-app/src/features/feed/FeedReactionsMount.jsx
```
