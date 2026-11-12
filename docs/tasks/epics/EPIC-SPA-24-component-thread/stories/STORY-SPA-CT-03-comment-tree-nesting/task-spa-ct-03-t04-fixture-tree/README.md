# SPA-CT-03-T04 — Fixture nest A→A1→A1a literal bodies

**Status:** Done  
**Story:** [`../STORY-SPA-CT-03-comment-tree-nesting.md`](../STORY-SPA-CT-03-comment-tree-nesting.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-03-comment-tree-nesting.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-03-comment-tree-nesting.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:17:37Z`  
**Package:** `pkg-000161`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.2 · [M153](../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · Await P4nds T02–T03

## Purpose

AC: FixtureAdapter / lab fixtures with M153 literal nest bodies; demonstrate maxDepth≠visual cap when knobs differ.

## Constraints

- No invent HTTP · OP PASS  
- No fake author chrome  
- Depth checks only via config/props (no hardcode outside)

## AC / DoD

- [x] Fixture nest A→A1→A1a readable · depth demo Present
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/adapters/FixtureAdapter.js · fixtures`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
