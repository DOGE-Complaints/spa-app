# SPA-CT-08-T03 — Lab fixtures / stands

**Status:** Done  
**Story:** [`../STORY-SPA-CT-08-lab-feed-cutover.md`](../STORY-SPA-CT-08-lab-feed-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T14:03:04Z`  
**Package:** `pkg-000166`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.4 L-fix  
**Runtime:** Await P2 → P3 · depends T01–T02

## Purpose

FR-CT-08.4: Lab fixtures/status variants for M152 A–E + expanded tree + gate as configured · FixtureAdapter default.

## Constraints

- No invent HTTP · OP PASS  
- Fixture-only · no Live threads invent

## AC / DoD

- [x] Fixture stands Present for cutover OP eye
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/feed-lab/fixtures/labFeedFixtures.js` · adapter wiring

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab
```
