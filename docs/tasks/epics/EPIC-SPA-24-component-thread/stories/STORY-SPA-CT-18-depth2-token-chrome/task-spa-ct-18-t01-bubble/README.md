# SPA-CT-18-T01 — Bubble tokens (M153b §3)

**Status:** Done  
**Story:** [`../STORY-SPA-CT-18-depth2-token-chrome.md`](../STORY-SPA-CT-18-depth2-token-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:12:55Z`  
**Package:** `pkg-000176`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · §3

## Purpose

FR-CT-18.1 · 18.5: Apply M153b §3 comment bubble tokens (fill/border/radius/pad) in **px** — not rem-as-16.

## Constraints

- No invent hex outside M153b register  
- px not rem (§8)  
- Partial visual=**BLOCK** until OP eye · no invent OP PASS  
- A–D only · §7 paint → CT-19 OOS

## AC / DoD

- [x] Bubble computedStyle Match vs M153b §3
- [x] Values expressed in px
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/` CSS · CommentNode bubble surfaces

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
