# SPA-CT-20-T01 — Wire loading/empty/unavailable stands

**Status:** Done · P3 (`2026-10-20T13:13:37Z`)  
**Story:** [`../STORY-SPA-CT-20-lab-audit-fixtures.md`](../STORY-SPA-CT-20-lab-audit-fixtures.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-20-lab-audit-fixtures.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-20-lab-audit-fixtures.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:48:51Z`  
**Package:** `pkg-000178`  
**@mockup:** [OP-UX M153a/b · LAB-1](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md) · M152 A–E coverage

## Purpose

FR-CT-20.1: Lab stands (or always-on demos) reach `loading` / `empty` / `unavailable` without inventing new SSOT states.

## Constraints

- No invent SSOT panels · reuse host status prop types  
- Partial visual=**BLOCK** · no invent OP PASS / HTTP  
- Soft CT-18/19 paint not required

## AC / DoD

- [x] loading reachable on `#/lab/feed`  
- [x] empty reachable  
- [x] unavailable reachable  
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/feed-lab/` · `FeedLabThreadMount.jsx` · feed-lab fixtures / page stands

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab
```
