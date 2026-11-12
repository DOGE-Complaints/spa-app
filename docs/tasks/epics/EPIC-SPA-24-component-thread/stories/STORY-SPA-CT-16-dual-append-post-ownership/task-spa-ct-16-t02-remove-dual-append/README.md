# SPA-CT-16-T02 — Remove dual-append

**Status:** Done  
**Story:** [`../STORY-SPA-CT-16-dual-append-post-ownership.md`](../STORY-SPA-CT-16-dual-append-post-ownership.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-16-dual-append-post-ownership.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-16-dual-append-post-ownership.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T11:34:39Z`  
**Package:** `pkg-000174`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md) · BUG-1  
**Runtime:** P3 Done · `2026-10-20T11:42:13Z` · ui_anchor

## Purpose

FR-CT-16.2 · 16.3: Eliminate double append for the same success id — when host owns comments (FeedLab snap), ThreadMount must not also append into `localComments` after adapter success; when ThreadMount owns local comments, host must not also append the same id into snap.

## Constraints

- No invent HTTP · OP PASS  
- Same success path must not dual-append  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Dual-append eliminated for same success id
- [ ] Visual Done not claimed without OP eye

## Where to change

`ThreadMount.runPost` · host `handlePostComment` / FeedLabThreadMount

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
