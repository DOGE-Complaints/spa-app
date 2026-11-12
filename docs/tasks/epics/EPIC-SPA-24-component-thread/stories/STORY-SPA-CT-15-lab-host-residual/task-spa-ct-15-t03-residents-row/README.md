# SPA-CT-15-T03 — Residents row only if aggregate confirmed

**Status:** Done  
**Story:** [`../STORY-SPA-CT-15-lab-host-residual.md`](../STORY-SPA-CT-15-lab-host-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-19T12:58:55Z`  
**Package:** `pkg-000173`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-M4 · soft CR  
**Runtime:** P3 Done · `2026-10-19T13:03:59Z` · ui_anchor

## Purpose

FR-CT-15.3 · 15.4: Collapsed populated — «Reactions from residents» row **only if** aggregate confirmed via existing reactions aggregate contract · if unavailable omit row (honest) · **no invent** counts/names.

## Constraints

- No invent aggregate/people HTTP · OP PASS  
- Soft dep CR — omit when unconfirmed  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Residents row absent unless aggregate confirmed
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/IssueThreadBlock.jsx` · soft CR aggregate contract

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
