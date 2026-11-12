# SPA-CT-11-T02 — Yellow circular send (empty path)

**Status:** Done  
**Story:** [`../STORY-SPA-CT-11-composer-icon-chrome.md`](../STORY-SPA-CT-11-composer-icon-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:12:03Z`  
**Package:** `pkg-000169`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H2 · M152-B  
**Runtime:** P3 Done · ui_anchor

## Purpose

FR-CT-11.2: Empty / first-comment send path after CT-10 entry open — yellow **circular** send with plane/send glyph via Present `send.svg`.

## Constraints

- Reuse Present `send.svg` · no invent SVG  
- No invent HTTP · OP PASS  
- Applies when empty composer path is open (post CT-10 entry)

## AC / DoD

- [x] Circular yellow send Present on empty/first-send path
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/ThreadComposer.jsx` · CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
