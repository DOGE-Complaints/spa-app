# SPA-CT-22-T02 — `.md` family allow-list hook

**Status:** Done  
**Story:** [`../STORY-SPA-CT-22-comment-attachment-preview.md`](../STORY-SPA-CT-22-comment-attachment-preview.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T14:58:07Z`  
**Package:** `pkg-000180`  
**@mockup:** [M153a v1.1](../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · family allow-list

## Purpose

FR-CT-22.5: Allow-list families extend with Markdown `.md` (family hook + extension; exact MIME TBD — no invent full MIME table).

## Constraints

- Family+extension only · no invent MIME table / HTTP/OP PASS  
- Continuity CT-17 `ATTACHMENT_FAMILY_ALLOWLIST` / `inferAttachmentFamily`

## AC / DoD

- [x] `.md` accepted as allow-list family  
- [x] Non-allow types still fail-closed  
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/config/threadMountConfig.js`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
