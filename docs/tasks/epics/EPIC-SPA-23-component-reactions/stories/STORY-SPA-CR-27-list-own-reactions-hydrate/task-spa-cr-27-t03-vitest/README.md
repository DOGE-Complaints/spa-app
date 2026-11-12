# SPA-CR-27-T03 — List hydrate markers · OP eye

**Status:** Done  

**Story:** [`../STORY-SPA-CR-27-list-own-reactions-hydrate.md`](../STORY-SPA-CR-27-list-own-reactions-hydrate.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-27-list-own-reactions-hydrate.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-27-list-own-reactions-hydrate.md)  
**ui_scope:** reactions-mount / next-feed list · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:29:17Z`  
**Package:** `pkg-000225`  
**Path A:** Interview M10 · Partial=**BLOCK**

## Purpose

FR-CR-27.3: Vitest markers for list hydrate · anonymous omit · CR-25 detail regression soft · OP eye — **no invent PASS**.

## Code Facts (verify)

- AS-IS: feed.cr25 tests Present · list hydrate Absent
- Target: CR-27 markers · Path A capture soft · OP eye Absent → Partial=**BLOCK**

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent gateway schema**

## AC / DoD

- [ ] Vitest markers Present
- [ ] OP eye Absent → gate **BLOCK** · no invent PASS

## Where to change

`spa-app/src/features/feed/__tests__/` · soft capture under `spa-app/scripts/`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed/__tests__/
```

## @mockup

```text
@mockup: spa-app/docs/architecture/component-reactions/27-list-own-reactions-hydrate.md
```
