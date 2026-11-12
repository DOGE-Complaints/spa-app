# SPA-CR-28-T03 — Peer empty markers · OP eye

**Status:** Done  

**Story:** [`../STORY-SPA-CR-28-peer-reactions-empty-affordance.md`](../STORY-SPA-CR-28-peer-reactions-empty-affordance.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-28-peer-reactions-empty-affordance.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-28-peer-reactions-empty-affordance.md)  
**ui_scope:** reactions-mount / next-feed · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:39:23Z`  
**Package:** `pkg-000226`  
**Path A:** Interview M14 · Partial=**BLOCK**

## Purpose

FR-CR-28.3: Vitest markers for empty peer affordance · filled continuity soft · OP eye — **no invent PASS** · **no invent people HTTP**.

## Code Facts (verify)

- AS-IS: CR-26 markers Present · peer empty markers Absent
- Target: CR-28 markers · Path A capture soft · OP eye Absent → Partial=**BLOCK**

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent people HTTP**

## AC / DoD

- [ ] Vitest markers Present
- [ ] OP eye Absent → gate **BLOCK** · no invent PASS

## Where to change

`spa-app/src/features/feed/__tests__/` · soft `reactions-mount/__tests__/` · soft capture under `spa-app/scripts/`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed/__tests__/ src/features/reactions-mount/__tests__/
```

## @mockup

```text
@mockup: spa-app/docs/architecture/component-reactions/28-peer-reactions-empty-affordance.md
```
