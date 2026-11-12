# SPA-CT-28-T04 — Vitest next-feed ThreadMount Live

**Status:** Done  
**Closed:** `2026-10-20T20:53:02Z` · P3 · feed.ct28 **3/3** · suite **350/350** · Path A shots Present  

**Story:** [`../STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md`](../STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md)  
**ui_scope:** `feed` / `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T20:46:49Z`  
**Package:** `pkg-000186`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)

## Purpose

FR-CT-28.7: Vitest — next-feed mount uses ThreadMount markers · Live snapshot not `live-adapter-unwired` when issueId Present. Prefer `feed.ct28` / thread-mount Live tests + lab hold.

## Constraints

- Path A gap analysis · NO BRIEF · Partial=**BLOCK**  
- Story-root screenshots/full-cycle mandatory at P3 · no invent OP PASS / HTTP

## AC / DoD

- [x] Vitest Present
- [x] Live not unwired when issueId Present
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/feed/__tests__` · `src/features/thread-mount/__tests__` · feed-lab as needed

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/thread-mount src/features/feed-lab
```
