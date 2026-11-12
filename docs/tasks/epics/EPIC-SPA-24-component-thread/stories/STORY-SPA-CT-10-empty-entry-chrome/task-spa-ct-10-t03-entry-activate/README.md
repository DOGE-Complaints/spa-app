# SPA-CT-10-T03 — Entry activate opens composer

**Status:** Done  
**Story:** [`../STORY-SPA-CT-10-empty-entry-chrome.md`](../STORY-SPA-CT-10-empty-entry-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:00:48Z`  
**Package:** `pkg-000168`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H1 · M152 §8  
**Runtime:** P3 Done · ui_anchor

## Purpose

FR-CT-10.2: Activating entry opens composer chrome (per CT-11) without contradicting entry-only first paint · without re-opening always-on empty composer.

## Constraints

- No invent HTTP · OP PASS  
- Composer icon glyphs remain CT-11 OOS  
- FR-CT-10.4 held (populated entry rules)

## AC / DoD

- [x] Entry activate → composer opens
- [x] First paint remains entry-only
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/ThreadMount.jsx` · `IssueThreadBlock.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
