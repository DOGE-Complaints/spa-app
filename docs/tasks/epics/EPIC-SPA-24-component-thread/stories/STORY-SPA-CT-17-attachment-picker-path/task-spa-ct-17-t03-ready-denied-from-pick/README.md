# SPA-CT-17-T03 — Ready/Denied from pick

**Status:** Done  
**Story:** [`../STORY-SPA-CT-17-attachment-picker-path.md`](../STORY-SPA-CT-17-attachment-picker-path.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T11:54:18Z`  
**Package:** `pkg-000175`
**Runtime:** P3 Done · `2026-10-20T12:00:47Z` · ui_anchor  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · panels C–E

## Purpose

FR-CT-17.5 · 17.7: After real selection, map to local Ready or Denied `AttachmentRef` chip (origin = picker). Remove is local-only. Chip = local pending intent only · never claim uploaded / bound / published URL (even when label is `Ready to post`). Reuse Present `attach.svg` / `send.svg` when glyphs shown (FR-17.8).

## Constraints

- No invent HTTP upload/bind  
- No invent denied-submit product policy (§18 fail-closed)  
- Chip paint tokens → CT-19 OOS  
- Partial visual=**BLOCK** until OP eye · no invent OP PASS

## AC / DoD

- [x] Ready/Denied chips only after real picker selection
- [x] Remove clears local intent only
- [x] Honesty: local intent · not published
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/AttachmentRef.jsx` · composer / ThreadMount selection mapper

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
