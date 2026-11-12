# SPA-CT-18-T02 — Spine / L-elbow (M153b §4)

**Status:** Done  
**Story:** [`../STORY-SPA-CT-18-depth2-token-chrome.md`](../STORY-SPA-CT-18-depth2-token-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:12:55Z`  
**Package:** `pkg-000176`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · §4

## Purpose

FR-CT-18.2: Apply M153b §4 continuous spine + L-elbow (width/color/radius) in **px**.

## Constraints

- No invent hex outside M153b  
- px not rem · Partial=**BLOCK** · no invent OP PASS  
- Logical max_depth unchanged

## AC / DoD

- [x] Spine / L-elbow Match vs M153b §4
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/` CSS · `CommentTree` nest connectors

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
