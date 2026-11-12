# SPA-CT-18-T03 — React/Reply ≥44px locked palette (M153b §5)

**Status:** Done  
**Story:** [`../STORY-SPA-CT-18-depth2-token-chrome.md`](../STORY-SPA-CT-18-depth2-token-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:12:55Z`  
**Package:** `pkg-000176`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · §5

## Purpose

FR-CT-18.3: Shared React/Reply pill group · each control **≥44px** touch · locked M153b palette (no AS-IS `#2E90FA` / ~32px Drift).

## Constraints

- No invent hex outside M153b  
- Actual controls ≥44px · not fake enlarged hit-only  
- HOLD reaction summary unchanged · Partial=**BLOCK**

## AC / DoD

- [x] React/Reply ≥44px · locked palette Match vs §5
- [x] Visual Done not claimed without OP eye

## Where to change

`CommentNode` React/Reply chrome · thread-mount CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
