# SPA-CT-14-T02 — Bubble wash tokens + denser action gaps

**Status:** Done  
**Story:** [`../STORY-SPA-CT-14-spine-bubbles-fixtures.md`](../STORY-SPA-CT-14-spine-bubbles-fixtures.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-14-spine-bubbles-fixtures.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-14-spine-bubbles-fixtures.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:45:54Z`  
**Package:** `pkg-000172`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H8 · M153 wash  
**Runtime:** P3 Done · `2026-10-19T12:51:56Z` · ui_anchor

## Purpose

FR-CT-14.3 · 14.4: Bubble fill/border/padding = M153 light blue-grey wash (thread-mount tokens) · action row spacing denser per mockup rhythm (CT-13 chrome held).

## Constraints

- No invent HTTP · OP PASS  
- Tokens only — no purple invent · no rewrite CT-13 pill grammar  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Bubble wash closer to M153 than white elevated card
- [x] Action gaps denser · CT-13 chrome held
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/tree/CommentNode.css`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
