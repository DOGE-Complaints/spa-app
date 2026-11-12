# SPA-CT-06-T02 — Sync vs delayed/error fixture

**Status:** Done  
**Story:** [`../STORY-SPA-CT-06-branch-disclosure.md`](../STORY-SPA-CT-06-branch-disclosure.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-06-branch-disclosure.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-06-branch-disclosure.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:44:33Z`  
**Package:** `pkg-000164`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.2 · [M153](../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · depends T01 · `2026-10-18T13:47:47Z`

## Purpose

FR-CT-06.4/06.5: Sync disclosure when children already local (no fake loader required) · optional delayed fixture for expanding stand · error stand without invent fetch endpoint.

## Constraints

- No invent branch HTTP · OP PASS  
- Fixture-only delayed/error · no network

## AC / DoD

- [x] Sync + expanding + error fixture stands Present (S–W)
- [x] Visual Done not claimed without OP eye (gate BLOCK)

## Where to change

`src/features/thread-mount/lab/ThreadLabCanvas.jsx` · CommentTree `branchExpandMode`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
