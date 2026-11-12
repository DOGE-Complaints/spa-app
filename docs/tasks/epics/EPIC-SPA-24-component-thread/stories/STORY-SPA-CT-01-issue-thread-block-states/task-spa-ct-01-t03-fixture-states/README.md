# SPA-CT-01-T03 — FixtureAdapter snapshots A–D

**Status:** Done · `2026-10-18T13:01:30Z`  
**P3 note:** FixtureAdapter A–D Present  
**Story:** [`../STORY-SPA-CT-01-issue-thread-block-states.md`](../STORY-SPA-CT-01-issue-thread-block-states.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md)  
**ui_scope:** `thread-mount` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:56:22Z`  
**Package:** `pkg-000159`  
**@mockup:** OP-UX-MIRROR §4.1 · M152 A–D  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T13:01:30Z`

## Purpose

FR-CT-01.1–01.4: FixtureAdapter snapshots covering loading / empty / populated-collapsed / unavailable. No fake identity fields invented beyond fixture honesty.

## Constraints

- Fixtures only · no invent live HTTP  
- No invent OP PASS

## AC / DoD

- [x] Fixture stands A/B/C/D Present

## Where to change

`src/features/thread-mount/adapters/FixtureAdapter.js` (CREATE at P3)

## Verification

```bash
cd spa-app && npm test -- --run src/features/thread-mount
```
