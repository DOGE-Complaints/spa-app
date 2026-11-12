# SPA-CT-28-T01 — LiveAdapter bind · ThreadsSocialClient

**Status:** Done  
**Closed:** `2026-10-20T20:53:02Z` · P3 · LiveAdapter → ThreadsSocialClient · not unwired  

**Story:** [`../STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md`](../STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md)  
**ui_scope:** `feed` / `thread-mount` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T20:46:49Z`  
**Package:** `pkg-000186`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)

## Purpose

FR-CT-28.2–28.3: Bind LiveAdapter / host to existing ThreadsSocialClient · replace `live-adapter-unwired` · no second client · no invent paths.

## Constraints

- Path A gap analysis · NO BRIEF · no UX gen · Partial=**BLOCK**  
- ThreadsSocialClient only · no invent HTTP/OP PASS · no invent upload/bind

## AC / DoD

- [x] Live threads read/write via ThreadsSocialClient
- [x] createLiveAdapter unbound stub replaced by real bind (or host wires without invent)
- [x] Visual Done not claimed without OP eye

## Where to change

`thread-mount/adapters/LiveAdapter.js` · `FeedThreadMount.jsx` · LiveIssueThreadMount host seams

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/thread-mount
```
