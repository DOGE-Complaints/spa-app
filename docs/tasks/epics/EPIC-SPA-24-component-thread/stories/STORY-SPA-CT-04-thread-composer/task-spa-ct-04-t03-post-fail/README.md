# SPA-CT-04-T03 — Post fail F chrome

**Status:** Done  
**Story:** [`../STORY-SPA-CT-04-thread-composer.md`](../STORY-SPA-CT-04-thread-composer.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-04-thread-composer.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-04-thread-composer.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:25:58Z`  
**Package:** `pkg-000162`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.2 · [M153](../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · gate BLOCK

## Purpose

FR-CT-04.4: Inline fail F · draft+target kept · Try again / Keep editing · fixture adapter fail path.

## Constraints

- No invent HTTP · OP PASS  
- Fixture adapter write only · no optimistic permanent comment  
- Attachments OOS (CT-05) · verify gate OOS (CT-07)

## AC / DoD

- [x] Fail F recoverable chrome Present
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/ThreadComposer.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
