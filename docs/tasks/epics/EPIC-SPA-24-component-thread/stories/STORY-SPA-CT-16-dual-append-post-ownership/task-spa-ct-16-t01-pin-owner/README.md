# SPA-CT-16-T01 — Pin single write-owner

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

FR-CT-16.1–16.3: Pin single write-owner (host vs ThreadMount) on FeedLab post path — either host updates comments via `onCommentsChange` **or** ThreadMount appends locally — **never both** for the same success path.

## Constraints

- No invent HTTP · OP PASS  
- Prefer minimal ownership fix over forest rewrite  
- Arch §12 hold when present  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Single write-owner pinned on FeedLab post/reply success path
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/feed-lab/post/thread/FeedLabThreadMount.jsx` · `src/features/thread-mount/ThreadMount.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
