# SPA-CT-27-T01 — Instagram disabled · no copy

**Status:** Done  
**Closed:** `2026-10-20T19:53:14Z` · P3 · IG `disabled`/`copyFallback:false` · no clipboard  

**Story:** [`../STORY-SPA-CT-27-share-instagram-disabled-copy-text.md`](../STORY-SPA-CT-27-share-instagram-disabled-copy-text.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T19:49:22Z`  
**Package:** `pkg-000185`  
**@mockup:** [M152d](../../../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) (list order · behavior supersede)

## Purpose

FR-CT-27.1–27.4: Instagram row remains in list · visually disabled · click does not copy · does not open share intent · hint ok.

## Constraints

- Path A M152d list order · Instagram behavior supersede · NO BRIEF · no UX gen · Partial=**BLOCK**  
- Instagram disabled · no-copy · no invent HTTP/OP PASS · no invent Graph API / image upload

## AC / DoD

- [x] Instagram listed + visually disabled
- [x] Instagram click ≠ copy · no share intent
- [x] Visual Done not claimed without OP eye

## Where to change

shareIssueUrl.js · FeedPostShareSurface.jsx · CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab
```
