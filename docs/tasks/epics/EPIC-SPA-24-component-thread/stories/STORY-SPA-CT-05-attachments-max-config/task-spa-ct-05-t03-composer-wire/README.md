# SPA-CT-05-T03 — Composer Attach wire

**Status:** Done  
**Story:** [`../STORY-SPA-CT-05-attachments-max-config.md`](../STORY-SPA-CT-05-attachments-max-config.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-05-attachments-max-config.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-05-attachments-max-config.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:36:01Z`  
**Package:** `pkg-000163`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.2 · [M153](../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · gate BLOCK

## Purpose

FR-CT-05.2/05.5/05.6: Attach control respects max + mediaAllowedTypes · omit/disable when unavailable · honest copy · no invent upload/bind as persistent success.

## Constraints

- No invent upload/bind HTTP · OP PASS  
- Partial-success honesty when text ok / bind fails (fixture)  
- Gallery / real media API OOS

## AC / DoD

- [x] Attach clamp + unavailable honesty Present
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/ThreadComposer.jsx` · FixtureAdapter attach stubs · lab stands

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
