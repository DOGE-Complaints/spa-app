# SPA-CT-20-T02 — forcePostFail · attach-off · maxDepth fixtures

**Status:** Done · P3 (`2026-10-20T13:13:37Z`)  
**Story:** [`../STORY-SPA-CT-20-lab-audit-fixtures.md`](../STORY-SPA-CT-20-lab-audit-fixtures.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-20-lab-audit-fixtures.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-20-lab-audit-fixtures.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:48:51Z`  
**Package:** `pkg-000178`  
**@mockup:** [OP-UX · LAB-2…4](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md) · M153 F/G · M153a F

## Purpose

FR-CT-20.2–20.4: `forcePostFail` / adapter fail-next-post reachable · stand with `attachmentsAvailable=false` · fixture with depth ≥ `maxDepth` so Reply block is exercisable.

## Constraints

- No invent HTTP · no invent OP PASS  
- Wire existing knobs · no invent SSOT panels  
- Depends CT-15 host residual Present

## AC / DoD

- [x] post-fail stand reachable (THR-T-F)  
- [x] attach-off stand reachable  
- [x] max-depth Reply block reachable  
- [x] Visual Done not claimed without OP eye

## Where to change

`FeedLabThreadMount.jsx` · fixtures · host props · FixtureAdapter fail-next-post

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
