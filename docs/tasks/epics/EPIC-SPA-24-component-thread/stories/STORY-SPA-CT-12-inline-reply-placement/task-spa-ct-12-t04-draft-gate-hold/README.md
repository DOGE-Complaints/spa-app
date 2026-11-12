# SPA-CT-12-T04 — Draft / fail / verify single-owner hold

**Status:** Done  
**Story:** [`../STORY-SPA-CT-12-inline-reply-placement.md`](../STORY-SPA-CT-12-inline-reply-placement.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:21:59Z`  
**Package:** `pkg-000170`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H4  
**Runtime:** P3 Done · `2026-10-19T12:27:25Z` · ui_anchor

## Purpose

FR-CT-12.5: Draft / fail F / verify gate still owned by composer + ThreadMount (CT-04 · CT-07) after inline placement — no second draft owner.

## Constraints

- No invent HTTP · OP PASS · Identity methods  
- Single draft/replyTarget owner  
- VerifyWriteGate ownership held

## AC / DoD

- [x] Draft / fail / verify still single-owner with inline reply
- [ ] Visual Done not claimed without OP eye

## Where to change

`ThreadComposer.jsx` · `VerifyWriteGate` · `ThreadMount.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
