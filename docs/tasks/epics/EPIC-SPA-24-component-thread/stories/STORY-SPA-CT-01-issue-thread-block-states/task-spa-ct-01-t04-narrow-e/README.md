# SPA-CT-01-T04 — Narrow ~390 stress (E)

**Status:** Done · `2026-10-18T13:01:30Z`  
**P3 note:** narrow 390 Present  
**Story:** [`../STORY-SPA-CT-01-issue-thread-block-states.md`](../STORY-SPA-CT-01-issue-thread-block-states.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:56:22Z`  
**Package:** `pkg-000159`  
**@mockup:** OP-UX-MIRROR §4.1 · M152 P-E  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T13:01:30Z`

## Purpose

FR-CT-01.5: Narrow ~390 stack — same populated-collapsed semantics · no horizontal overflow · lab stress attrs.

## Constraints

- No invent OP PASS · no invent HTTP  
- Structure stress only until OP eye

## AC / DoD

- [x] 390 stack Present without h-overflow (structure)
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/*.css` · lab stress attrs (P3)

## Verification

```bash
# Path A shot 05 at P3 · vitest/layout markers
```
