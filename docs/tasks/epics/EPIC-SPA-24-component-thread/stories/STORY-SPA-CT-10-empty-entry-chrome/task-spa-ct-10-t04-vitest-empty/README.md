# SPA-CT-10-T04 — Vitest empty ≠ full composer

**Status:** Done  
**Story:** [`../STORY-SPA-CT-10-empty-entry-chrome.md`](../STORY-SPA-CT-10-empty-entry-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:00:48Z`  
**Package:** `pkg-000168`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H1 · G-M1 · Path A + gate  
**Runtime:** P3 Done · ui_anchor

## Purpose

FR-CT-10.5 · AC: Assert empty ≠ full composer mount on first paint · entry marker Present · composer absent until activate · Path A shots + gate (OP eye Absent → BLOCK).

## Constraints

- No invent HTTP · OP PASS  
- Partial visual=**BLOCK** until OP eye  
- Gate Result not PASS without OP eye

## AC / DoD

- [x] Vitest: empty → entry marker · composer absent until activate
- [x] Path A checklist + screenshots stubs filled at P3
- [x] Gate updated · no invent OP PASS

## Where to change

`src/features/thread-mount/__tests__/threadMount*.test.jsx` · story-root gate/checklists/shots

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
