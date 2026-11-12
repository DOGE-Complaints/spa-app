# SPA-CT-28-T03 — Lab FixtureAdapter held

**Status:** Done  
**Closed:** `2026-10-20T20:53:02Z` · P3 · FixtureAdapter held · feedLab.ct28  

**Story:** [`../STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md`](../STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T20:46:49Z`  
**Package:** `pkg-000186`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)

## Purpose

FR-CT-28.5: Lab `#/lab/feed` FixtureAdapter path unchanged after next/feed Live cutover.

## Constraints

- Path A gap analysis · NO BRIEF · Partial=**BLOCK**  
- Lab Fixture unchanged · no invent HTTP/OP PASS

## AC / DoD

- [x] Lab Fixture path held
- [x] feed-lab ThreadMount + FixtureAdapter regression Present
- [x] Visual Done not claimed without OP eye

## Where to change

feed-lab tests · assert FixtureAdapter / FeedLabThreadMount held (prefer no product change)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab
```
