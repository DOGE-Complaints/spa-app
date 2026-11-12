# SPA-CT-11-T03 — Post label + plane icon

**Status:** Done  
**Story:** [`../STORY-SPA-CT-11-composer-icon-chrome.md`](../STORY-SPA-CT-11-composer-icon-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:12:03Z`  
**Package:** `pkg-000169`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H6 · M153 C  
**Runtime:** P3 Done · ui_anchor

## Purpose

FR-CT-11.3 · 11.4: Root/reply open composer keeps labelled **Post comment** / **Post reply** + plane/send icon · Post primary right.

## Constraints

- Reuse Present `send.svg` · retain visible labels  
- No invent HTTP · OP PASS  
- Layout: Attach left · Post right

## AC / DoD

- [x] Post comment/reply label + plane icon Present
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/ThreadComposer.jsx` · CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
