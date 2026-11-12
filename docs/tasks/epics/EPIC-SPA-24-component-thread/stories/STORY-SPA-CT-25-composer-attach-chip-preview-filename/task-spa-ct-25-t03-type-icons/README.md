# SPA-CT-25-T03 — Non-image type cues + filename

**Status:** Done  
**Story:** [`../STORY-SPA-CT-25-composer-attach-chip-preview-filename.md`](../STORY-SPA-CT-25-composer-attach-chip-preview-filename.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-25-composer-attach-chip-preview-filename.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-25-composer-attach-chip-preview-filename.md)  
**ui_scope:** `thread-mount`/`feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T19:24:38Z`
**Executed:** `2026-10-20T19:28:55Z`  
**Package:** `pkg-000183`  
**@mockup:** [M153c v1.0](../../../../../UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.md) (+ PNG)

## Purpose

FR-CT-25.2 / 25.4: Non-image Ready cues (MD/PDF/Word) + filename · keep M153b/M153c paint.

## Constraints

- Path A M153c · 48×48 thumb · fileName middle ellipsis · keep M153b/M153c paint · no invent HTTP/OP PASS · Partial=**BLOCK**  
- NO STORY-UX-MOCKUP-BRIEF · no invent MIME · no invent upload HTTP · no node preview rewrite (CT-22)

## AC / DoD

- [x] Non-image Ready: type cue + filename
- [x] Keep Ready/Denied paint · Ready to post · Local intent · not published · Remove
- [x] No invent MIME / upload HTTP
- [x] Visual Done not claimed without OP eye

## Where to change

AttachmentRef.jsx · AttachmentRef.css

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
```
