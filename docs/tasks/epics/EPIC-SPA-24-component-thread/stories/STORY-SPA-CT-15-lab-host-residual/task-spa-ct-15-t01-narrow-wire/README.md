# SPA-CT-15-T01 — Narrow / sticky lab wire

**Status:** Done  
**Story:** [`../STORY-SPA-CT-15-lab-host-residual.md`](../STORY-SPA-CT-15-lab-host-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:58:55Z`  
**Package:** `pkg-000173`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-M2 · M152-E / M153-G  
**Runtime:** P3 Done · `2026-10-19T13:03:59Z` · ui_anchor

## Purpose

FR-CT-15.1 · 15.6: Lab card/stands wire `narrow` for M152-E / M153-G stress (or dedicated always-visible 390 stand on feed) · sticky keyboard composer prop remains available on narrow stands (CT-04).

## Constraints

- No invent HTTP · OP PASS  
- Reachable without only CT08 canvas  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Narrow / sticky stands Present on lab
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/feed-lab/post/thread/FeedLabThreadMount.jsx` · `FeedPostCard.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
