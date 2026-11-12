# SPA-CT-13-T01 — React \| Reply pill row + separator

**Status:** Done  
**Story:** [`../STORY-SPA-CT-13-comment-action-chrome.md`](../STORY-SPA-CT-13-comment-action-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-13-comment-action-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-13-comment-action-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:34:22Z`  
**Package:** `pkg-000171`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H5 · M153 React/Reply  
**Runtime:** P3 Done · `2026-10-19T12:39:12Z` · ui_anchor

## Purpose

FR-CT-13.1 · 13.4: Under each bubble — compact icon+label pill row **React** \| **Reply** with vertical separator · blue / primary action grammar via tokens (no purple invent).

## Constraints

- No invent HTTP · OP PASS  
- Soft CR — no rewrite CR package  
- Tokens only for blue grammar

## AC / DoD

- [x] Pill row + separator Present
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/tree/CommentNode.css`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
