# SPA-CT-17-T01 — Native file picker

**Status:** Done  
**Story:** [`../STORY-SPA-CT-17-attachment-picker-path.md`](../STORY-SPA-CT-17-attachment-picker-path.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T11:54:18Z`  
**Package:** `pkg-000175`
**Runtime:** P3 Done · `2026-10-20T12:00:47Z` · ui_anchor  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · [OP-UX M153a/b](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)

## Purpose

FR-CT-17.1–17.3: Wire Attach → OS/native file picker (`input[type=file]` or platform equivalent); remove synthetic Ready seed path; Cancel/dismiss leaves draft and selection unchanged; first paint zero chips.

## Constraints

- Native picker only · no custom in-app file manager  
- No invent MIME · no invent HTTP · no invent OP PASS  
- Partial visual=**BLOCK** until OP eye  
- Fail-closed on §18 TBD

## AC / DoD

- [x] Attach opens native picker
- [x] No synthetic Ready without picker selection
- [x] Cancel leaves draft/selection unchanged
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/ThreadComposer.jsx` · `src/features/thread-mount/ThreadMount.jsx` · `src/features/feed-lab/post/thread/FeedLabThreadMount.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
