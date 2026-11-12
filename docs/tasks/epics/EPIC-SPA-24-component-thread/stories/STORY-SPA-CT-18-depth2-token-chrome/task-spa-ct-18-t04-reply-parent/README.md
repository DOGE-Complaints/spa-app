# SPA-CT-18-T04 — Selected reply parent marker (M153b §6)

**Status:** Done  
**Story:** [`../STORY-SPA-CT-18-depth2-token-chrome.md`](../STORY-SPA-CT-18-depth2-token-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:12:55Z`  
**Package:** `pkg-000176`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · §6

## Purpose

FR-CT-18.4: Selected reply parent marker matches M153b §6 (inset stripe · no invent full yellow ring/wash).

## Constraints

- No invent hex outside M153b  
- Focus styling remains independent · Partial=**BLOCK** · no invent OP PASS

## AC / DoD

- [x] Reply parent marker Match vs §6
- [x] Visual Done not claimed without OP eye

## Where to change

thread-mount CSS · composer reply parent highlight

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
