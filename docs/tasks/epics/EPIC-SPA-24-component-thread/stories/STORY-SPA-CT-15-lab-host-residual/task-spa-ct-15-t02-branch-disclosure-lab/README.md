# SPA-CT-15-T02 — branchDisclosure on lab when fixture needs it

**Status:** Done  
**Story:** [`../STORY-SPA-CT-15-lab-host-residual.md`](../STORY-SPA-CT-15-lab-host-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:58:55Z`  
**Package:** `pkg-000173`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-M3 · M153 branch  
**Runtime:** P3 Done · `2026-10-19T13:03:59Z` · ui_anchor

## Purpose

FR-CT-15.2: When fixture has collapsed branches needing disclosure — lab passes `branchDisclosure={true}` (CT-06 code Present).

## Constraints

- No invent HTTP · OP PASS  
- Hold CT-06 local disclosure semantics  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] branchDisclosure wired when fixture needs it
- [ ] Visual Done not claimed without OP eye

## Where to change

`FeedLabThreadMount.jsx` · lab fixtures / stands

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
