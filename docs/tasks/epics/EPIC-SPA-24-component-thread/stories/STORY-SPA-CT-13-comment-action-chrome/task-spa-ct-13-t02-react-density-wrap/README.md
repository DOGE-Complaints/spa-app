# SPA-CT-13-T02 — React density wrap around plug

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

FR-CT-13.2 · 13.5: Compact density wrap around `renderCommentReactions` · React remains plug to `reactions-mount` (`target=comment`) · no strip DNA full width · no second reactions stack · no people/picker in thread-mount (CT-09 R-bound).

## Constraints

- Soft CR — **no rewrite CR package**  
- No invent people HTTP · OP PASS  
- Share / strip zones stay host strip only

## AC / DoD

- [x] React plug density wrap · not strip DNA width
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/tree/CommentNode.jsx` · host `FeedLabReactionsMount` plug

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
```
