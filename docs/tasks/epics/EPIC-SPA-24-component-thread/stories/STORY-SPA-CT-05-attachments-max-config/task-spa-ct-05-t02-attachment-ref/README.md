# SPA-CT-05-T02 — AttachmentRef chip D/E

**Status:** Done  
**Story:** [`../STORY-SPA-CT-05-attachments-max-config.md`](../STORY-SPA-CT-05-attachments-max-config.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-05-attachments-max-config.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-05-attachments-max-config.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:36:01Z`  
**Package:** `pkg-000163`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.2 T-D/T-E · [M153](../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · gate BLOCK

## Purpose

FR-CT-05.3/05.4: Ready chip D · Remove · draft intact · not claimed published · Denied E copy · item not styled ready.

## Constraints

- No invent HTTP · OP PASS  
- No claim published media from local chip  
- Fixture local-intent only

## AC / DoD

- [x] D/E fixtures · Remove · draft intact Present
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/AttachmentRef.jsx (+ css)`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
