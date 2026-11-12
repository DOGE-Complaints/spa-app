# SPA-CT-11-T01 — Attach paperclip chrome

**Status:** Done  
**Story:** [`../STORY-SPA-CT-11-composer-icon-chrome.md`](../STORY-SPA-CT-11-composer-icon-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:12:03Z`  
**Package:** `pkg-000169`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H6 · M153 attach grammar  
**Runtime:** P3 Done · ui_anchor

## Purpose

FR-CT-11.1 · 11.4: Attach control shows paperclip glyph via Present `public/icons/next-feed/actions/attach.svg` when `attachmentsAvailable` · left / in-field discoverable placement.

## Constraints

- Reuse Present `attach.svg` · no invent SVG / emoji / Lucide  
- No invent HTTP · OP PASS  
- AttachmentRef logic unchanged (CT-05)

## AC / DoD

- [x] Paperclip Attach chrome Present when available
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/ThreadComposer.jsx` · CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
