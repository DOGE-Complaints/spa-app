# SPA-CT-17-T04 — Attach omitted when unavailable

**Status:** Done  
**Story:** [`../STORY-SPA-CT-17-attachment-picker-path.md`](../STORY-SPA-CT-17-attachment-picker-path.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T11:54:18Z`  
**Package:** `pkg-000175`
**Runtime:** P3 Done · `2026-10-20T12:00:47Z` · ui_anchor  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · panel F

## Purpose

FR-CT-17.6: When `attachmentsAvailable=false`, omit Attach · do not seed Denied (panel F).

## Constraints

- No fake Denied when attach capability off  
- No invent HTTP · MIME · OP PASS  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Attach omitted when attachments unavailable
- [x] No fake Denied seeded in that state
- [ ] Visual Done not claimed without OP eye

## Where to change

composer props · `ThreadComposer` · `ThreadMount` / FeedLab stands

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
