# SPA-CT-13-T04 — Vitest pill pair · R-bound · Path A

**Status:** Done  
**Story:** [`../STORY-SPA-CT-13-comment-action-chrome.md`](../STORY-SPA-CT-13-comment-action-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-13-comment-action-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-13-comment-action-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:34:22Z`  
**Package:** `pkg-000171`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H5 · Path A + gate  
**Runtime:** P3 Done · `2026-10-19T12:39:12Z` · ui_anchor

## Purpose

FR-CT-13.5 · 13.6 · AC: Markers for pill pair · R-bound no people import in thread-mount · Share/strip not on comment node · Path A shots + gate (OP eye Absent → BLOCK).

## Constraints

- No invent HTTP · OP PASS  
- Hold CT-09 plug tests  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Vitest: pill pair markers · no people import
- [x] Path A checklist + screenshots stubs filled at P3
- [x] Gate updated · no invent OP PASS

## Where to change

`src/features/thread-mount/__tests__/threadMount*.test.jsx` · feed-lab CT-09 · story-root gate/checklists/shots

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
