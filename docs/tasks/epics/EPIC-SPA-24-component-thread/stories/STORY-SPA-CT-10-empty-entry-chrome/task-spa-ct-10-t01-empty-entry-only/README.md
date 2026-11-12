# SPA-CT-10-T01 — Empty entry-only first paint

**Status:** Done  
**Story:** [`../STORY-SPA-CT-10-empty-entry-chrome.md`](../STORY-SPA-CT-10-empty-entry-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:00:48Z`  
**Package:** `pkg-000168`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H1 · [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) §8  
**Runtime:** P3 Done · ui_anchor

## Purpose

FR-CT-10.1 · 10.2: Split `showComposer` vs `composerEntry` — `status=empty` + write allowed → show `Write a comment` **entry** only · **not** full `ThreadComposer` on first paint.

## Constraints

- No invent HTTP · OP PASS  
- Do not re-open always-on empty composer  
- Collapsed/expanded populated entry rules unchanged (CT-01)

## AC / DoD

- [x] Empty first paint = entry-only
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/ThreadMount.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
