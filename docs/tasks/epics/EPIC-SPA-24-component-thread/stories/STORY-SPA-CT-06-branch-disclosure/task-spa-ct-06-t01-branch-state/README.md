# SPA-CT-06-T01 — Branch collapsed / expanding / error state

**Status:** Done  
**Story:** [`../STORY-SPA-CT-06-branch-disclosure.md`](../STORY-SPA-CT-06-branch-disclosure.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-06-branch-disclosure.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-06-branch-disclosure.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:44:33Z`  
**Package:** `pkg-000164`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.2 T-coll/T-exp/T-err · [M153](../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · ui_anchor · `2026-10-18T13:47:47Z`

## Purpose

FR-CT-06.1–06.3: Collapsed View N replies when count local · expanding local progress · error Couldn’t load replies · Try again scoped · rest of tree intact.

## Constraints

- No invent branch-fetch HTTP · OP PASS  
- No server pagination invent  
- Count only when derivable from complete local tree

## AC / DoD

- [x] Collapse/expand/error chrome Present
- [x] Visual Done not claimed without OP eye (gate BLOCK)

## Where to change

`src/features/thread-mount/tree/CommentTree.jsx` · CommentNode branch affordances

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
