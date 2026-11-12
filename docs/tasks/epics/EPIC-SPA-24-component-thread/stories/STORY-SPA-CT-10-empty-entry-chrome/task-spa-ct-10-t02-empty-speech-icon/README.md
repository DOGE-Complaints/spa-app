# SPA-CT-10-T02 — Speech-bubble empty icon

**Status:** Done  
**Story:** [`../STORY-SPA-CT-10-empty-entry-chrome.md`](../STORY-SPA-CT-10-empty-entry-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:00:48Z`  
**Package:** `pkg-000168`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-M1 · M152 artboard B empty  
**Runtime:** P3 Done · ui_anchor

## Purpose

FR-CT-10.3: Empty panel shows large speech-bubble empty icon (artboard B tone) + existing lead/helper copy.

## Constraints

- No invent HTTP · OP PASS  
- Keep existing lead/helper copy  
- Icon Present · Partial visual=BLOCK until OP eye

## AC / DoD

- [x] Speech empty icon Present on empty panel
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/IssueThreadBlock.jsx` · related CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
