# SPA-CT-01-T02 — ThreadMount status + collapsed summary

**Status:** Done · `2026-10-18T13:01:30Z`  
**P3 note:** ThreadMount status + summary Present  
**Story:** [`../STORY-SPA-CT-01-issue-thread-block-states.md`](../STORY-SPA-CT-01-issue-thread-block-states.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:56:22Z`  
**Package:** `pkg-000159`  
**@mockup:** OP-UX-MIRROR §4.1 · M152 P-C  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T13:01:30Z`

## Purpose

FR-CT-01.3: `ThreadMount` owns `status` prop and collapsed summary slot (literal previews · View discussion).

## Constraints

- No invent HTTP · OP PASS  
- Civic chrome above strip remains interactive (01.6 held by host)

## AC / DoD

- [x] ThreadMount status wiring Present
- [x] Collapsed summary slot Present for populated

## Where to change

`src/features/thread-mount/ThreadMount.jsx` (CREATE at P3)

## Verification

```bash
cd spa-app && npm test -- --run src/features/thread-mount
```
