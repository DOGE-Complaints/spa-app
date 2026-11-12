# SPA-CT-14-T04 — Vitest nest fixture · indent cap hold · Path A

**Status:** Done  
**Story:** [`../STORY-SPA-CT-14-spine-bubbles-fixtures.md`](../STORY-SPA-CT-14-spine-bubbles-fixtures.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-14-spine-bubbles-fixtures.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-14-spine-bubbles-fixtures.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:45:54Z`  
**Package:** `pkg-000172`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H7 · G-H8 · G-L2 · Path A + gate  
**Runtime:** P3 Done · `2026-10-19T12:51:56Z` · ui_anchor

## Purpose

FR-CT-14.6 · AC: Nest fixture Present · `VISUAL_INDENT_CAP` / `maxDepth` rules unchanged (CT-03) · Path A shots + gate (OP eye Absent → BLOCK).

## Constraints

- No invent HTTP · OP PASS  
- Hold CT-03 indent cap ≠ maxDepth  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Vitest: nest fixture Present · indent cap hold
- [x] Path A checklist + screenshots filled at P3
- [x] Gate updated · no invent OP PASS

## Where to change

`src/features/thread-mount/__tests__/` · feed-lab fixtures tests · story-root gate/checklists/shots

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
