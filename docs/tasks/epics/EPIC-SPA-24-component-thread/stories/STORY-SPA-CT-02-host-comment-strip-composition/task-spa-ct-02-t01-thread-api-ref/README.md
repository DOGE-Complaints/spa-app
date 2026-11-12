# SPA-CT-02-T01 — ThreadMount apiRef expand / focusComposer

**Status:** Done  
**Story:** [`../STORY-SPA-CT-02-host-comment-strip-composition.md`](../STORY-SPA-CT-02-host-comment-strip-composition.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-02-host-comment-strip-composition.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-02-host-comment-strip-composition.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:07:07Z`  
**Package:** `pkg-000160`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.1 P-strip · P-compose  
**Runtime:** P3 Done · Await P4

## Purpose

FR-CT-02.1: Ensure `ThreadMount` exposes `apiRef` with `{ expand, focusComposer }` (hold reactions apiRef pattern).

## Constraints

- No invent HTTP · OP PASS  
- Do not put discussion UI in strip

## AC / DoD

- [x] apiRef expand / focusComposer Present
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/ThreadMount.jsx` (P3)

## Verification

```bash
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
```
