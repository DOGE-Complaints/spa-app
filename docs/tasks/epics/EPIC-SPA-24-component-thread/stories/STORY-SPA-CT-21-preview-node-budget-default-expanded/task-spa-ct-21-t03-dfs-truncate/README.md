# SPA-CT-21-T03 — DFS truncate + Show more one-shot

**Status:** Done  
**Story:** [`../STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T14:35:27Z`  
**Package:** `pkg-000179`  
**@mockup:** [M152c panels B/C](../../../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md)

## Purpose

FR-CT-21.3–21.5: Budget counts nodes DFS (parent → children → next root) · when total > budget show first budget + **`Show more comments`** · one-shot reveal **all** remaining · control then omitted.

## Constraints

- No chunked pagination · no invent HTTP/OP PASS  
- Label exactly `Show more comments`

## AC / DoD

- [x] DFS slice by budget  
- [x] Control Present when truncated  
- [x] One-shot reveal · control omitted after  
- [x] Visual Done not claimed without OP eye

## Where to change

`CommentTree.jsx` / `IssueThreadBlock.jsx` · related CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
