# SPA-CT-14-T03 — Lab feed nest fixtures ≥1

**Status:** Done  
**Story:** [`../STORY-SPA-CT-14-spine-bubbles-fixtures.md`](../STORY-SPA-CT-14-spine-bubbles-fixtures.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-14-spine-bubbles-fixtures.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-14-spine-bubbles-fixtures.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:45:54Z`  
**Package:** `pkg-000172`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-L2  
**Runtime:** P3 Done · `2026-10-19T12:51:56Z` · ui_anchor

## Purpose

FR-CT-14.5: Default `#/lab/feed` fixtures include at least one card with nest depth ≥1 (G-L2) so spine/bubbles are visible without inventing HTTP.

## Constraints

- No invent HTTP · OP PASS  
- Fixture / FixtureAdapter local only  
- Hold indent cap ≠ maxDepth (CT-03)

## AC / DoD

- [x] ≥1 default lab feed fixture nests depth ≥1
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/feed-lab/fixtures/labFeedFixtures.js` · FixtureAdapter (as wired)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
