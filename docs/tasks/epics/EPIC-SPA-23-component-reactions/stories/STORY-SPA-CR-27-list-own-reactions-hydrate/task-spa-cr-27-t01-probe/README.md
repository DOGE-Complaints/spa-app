# SPA-CR-27-T01 — Confirm list payload vs tree lift path

**Status:** Done  

**Story:** [`../STORY-SPA-CR-27-list-own-reactions-hydrate.md`](../STORY-SPA-CR-27-list-own-reactions-hydrate.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-27-list-own-reactions-hydrate.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-27-list-own-reactions-hydrate.md)  
**ui_scope:** reactions-mount / next-feed list · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:29:17Z`  
**Package:** `pkg-000225`  
**Path A:** arch 27 · Interview M10 · persist analysis · CR-25 mapping

## Purpose

FR-CR-27.2: Confirm whether list payload carries actor `selected[]` / `thread_root_reactions` · else document honesty + minimal fetch path — **no invent gateway schema**.

## Code Facts (verify)

- AS-IS: detail `FeedIssueDetail` / CR-25 hydrates · list `FeedListArea` → `FeedCivicPost` omits `initialSelected` (arch probe)
- Target: decide wire vs documented honesty path without inventing schema

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent gateway schema** · invent people API OOS · invent CDN OOS

## AC / DoD

- [ ] List vs tree path confirmed (facts cited)
- [ ] No invent gateway fields

## Where to change

`spa-app/src/features/feed/FeedListArea.jsx` · soft list repositories / adapters (read-only probe first)

## Verification

```bash
rg -n "initialSelected|thread_root_reactions|FeedCivicPost" spa-app/src/features/feed/FeedListArea.jsx spa-app/src/features/feed/
```

## @mockup

```text
@mockup: spa-app/docs/architecture/component-reactions/27-list-own-reactions-hydrate.md
@mockup: spa-app/docs/analysis/analysis-reaction-persist-reload-gap-2026-10-22.md
```
