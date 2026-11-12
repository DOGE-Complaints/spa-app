# SPA-CT-16-T03 — Vitest unique ids after post

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

FR-CT-16.4 · 16.5: Assert unique ids after reply + root post · forest must not enter `flat` / `duplicate-id` solely because of dual-append · vitest covers single-owner post path.

## Constraints

- No invent HTTP · OP PASS  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Vitest: unique ids after reply + root post · single-owner path
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/__tests__/` · `src/features/feed-lab/__tests__/`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
