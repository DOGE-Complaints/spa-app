# SPA-CT-11-T04 — Vitest icon DOM + AttachmentRef held

**Status:** Done  
**Story:** [`../STORY-SPA-CT-11-composer-icon-chrome.md`](../STORY-SPA-CT-11-composer-icon-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:12:03Z`  
**Package:** `pkg-000169`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H2 · G-H6 · Path A + gate  
**Runtime:** P3 Done · ui_anchor

## Purpose

FR-CT-11.5 · 11.6 · AC: Assert icon DOM Present (img/svg markers) · attach still works when available · AttachmentRef D/E unchanged · Path A shots + gate (OP eye Absent → BLOCK).

## Constraints

- No invent SVG bodies · stop if glyph missing  
- No invent HTTP · OP PASS  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Vitest: attach/send icon markers · attach behavior held
- [x] Path A checklist + screenshots stubs filled at P3
- [x] Gate updated · no invent OP PASS

## Where to change

`src/features/thread-mount/__tests__/threadMount.ct04*.test.jsx` · ct05 · ct11 · story-root gate/checklists/shots

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
