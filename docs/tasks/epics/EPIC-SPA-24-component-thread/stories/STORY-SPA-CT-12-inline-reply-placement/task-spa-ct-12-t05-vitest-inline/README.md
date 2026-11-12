# SPA-CT-12-T05 — Vitest inline reply under parent

**Status:** Done  
**Story:** [`../STORY-SPA-CT-12-inline-reply-placement.md`](../STORY-SPA-CT-12-inline-reply-placement.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:21:59Z`  
**Package:** `pkg-000170`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H4 · Path A + gate  
**Runtime:** P3 Done · `2026-10-19T12:27:25Z` · ui_anchor

## Purpose

FR-CT-12.6 · AC: Assert reply mode → composer DOM under parent node testid/structure · root bottom held · cancel clears · Path A shots + gate (OP eye Absent → BLOCK).

## Constraints

- No invent HTTP · OP PASS  
- Partial visual=**BLOCK** until OP eye  
- Gate Result not PASS without OP eye

## AC / DoD

- [x] Vitest: composer under parent · not after whole block
- [x] Path A checklist + screenshots stubs filled at P3
- [x] Gate updated · no invent OP PASS

## Where to change

`src/features/thread-mount/__tests__/threadMount*.test.jsx` · story-root gate/checklists/shots

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
