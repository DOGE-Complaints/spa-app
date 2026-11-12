# SPA-CT-12-T01 — Reply slot contract on CommentNode

**Status:** Done  
**Story:** [`../STORY-SPA-CT-12-inline-reply-placement.md`](../STORY-SPA-CT-12-inline-reply-placement.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:21:59Z`  
**Package:** `pkg-000170`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H4 · M153-C  
**Runtime:** P3 Done · `2026-10-19T12:27:25Z` · ui_anchor

## Purpose

FR-CT-12.1 · 12.3: CommentNode exposes slot / `renderReplyComposer` when `replyTarget` matches node id · L-connector / in-context relationship (soft with CT-14 spine).

## Constraints

- No invent HTTP · OP PASS  
- Single replyTarget owner · no dual composers  
- Slot only — host wires composer

## AC / DoD

- [x] Reply slot Present when target matches
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/tree/CommentNode.jsx` · ThreadMount / CommentTree props

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
