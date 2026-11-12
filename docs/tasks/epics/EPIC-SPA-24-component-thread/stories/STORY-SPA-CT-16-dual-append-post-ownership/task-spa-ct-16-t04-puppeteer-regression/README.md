# SPA-CT-16-T04 — Puppeteer dual-append regression

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

FR-CT-16.5: Green prior HARD_FAIL dual-append asserts — after Reply or root Post on `#/lab/feed`, comment ids unique · forest not `flat` from duplicate-id when parents are valid · Path A checklist + screenshots at P3 · gate (OP eye Absent → BLOCK).

## Constraints

- No invent HTTP · OP PASS  
- Partial visual=**BLOCK** until OP eye  
- No invent PASS on gate

## AC / DoD

- [x] Puppeteer dual-append asserts green (or equivalent harness)
- [x] Path A checklist + screenshots filled at P3
- [x] Gate updated · no invent OP PASS

## Where to change

`tests/puppeteer/lab-feed-thread-*.mjs` · story-root gate/checklists/shots

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
# lab-feed-thread puppeteer dual-append harness
```
