# SPA-CT-13-T03 — Reply pill icon+label

**Status:** Done  
**Story:** [`../STORY-SPA-CT-13-comment-action-chrome.md`](../STORY-SPA-CT-13-comment-action-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-13-comment-action-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-13-comment-action-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:34:22Z`  
**Package:** `pkg-000171`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H5  
**Runtime:** P3 Done · `2026-10-19T12:39:12Z` · ui_anchor

## Purpose

FR-CT-13.3: Reply as icon+label pill — reuse Present `reply.svg` if applicable · remove underline-only grey text link chrome.

## Constraints

- No invent SVG bodies · reuse Present `reply.svg`  
- No invent HTTP · OP PASS  
- Reply behavior (set replyTarget) held

## AC / DoD

- [x] Reply pill icon+label · underline-only gone
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/tree/CommentNode.jsx` · `CommentNode.css`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
