# SPA-CR-27-T02 — Pass initialSelected into list FeedCivicPost

**Status:** Done  

**Story:** [`../STORY-SPA-CR-27-list-own-reactions-hydrate.md`](../STORY-SPA-CR-27-list-own-reactions-hydrate.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-27-list-own-reactions-hydrate.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-27-list-own-reactions-hydrate.md)  
**ui_scope:** reactions-mount / next-feed list · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:29:17Z`  
**Package:** `pkg-000225`  
**Path A:** CR-25 props reuse · Interview M10

## Purpose

FR-CR-27.1: On `#/next/feed` list load (authenticated), each card’s own React strip hydrates actor `selected[]` via CR-25-compatible props on list `FeedCivicPost`.

## Code Facts (verify)

- AS-IS: list omits `initialSelected` / summary hydrate props
- Target: pass mapped fields from Present list/tree path (T01) · anonymous omit held

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent gateway schema** · CR-26 visual OOS · invent people API OOS

## AC / DoD

- [ ] List cards hydrate own selected (Bearer) — structure
- [ ] Detail CR-25 regression held
- [ ] Visual Done not claimed without OP eye · gate **BLOCK** when OP Absent

## Where to change

`spa-app/src/features/feed/FeedListArea.jsx` · soft `FeedCivicPost` prop pass · soft list adapters

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "initialSelected|initialSummaryMarks|ownInZone" spa-app/src/features/feed/FeedListArea.jsx
```

## @mockup

```text
@mockup: spa-app/docs/architecture/component-reactions/27-list-own-reactions-hydrate.md
```
