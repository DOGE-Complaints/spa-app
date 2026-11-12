# SPA-CT-01-T01 — IssueThreadBlock status chrome A–D

**Status:** Done · `2026-10-18T13:01:30Z`  
**P3 note:** IssueThreadBlock A–D Present  
**Story:** [`../STORY-SPA-CT-01-issue-thread-block-states.md`](../STORY-SPA-CT-01-issue-thread-block-states.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:56:22Z`  
**Package:** `pkg-000159`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.1 · [M152](../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T13:01:30Z`

## Purpose

FR-CT-01.1–01.4 · 01.7: Greenfield `IssueThreadBlock` status chrome for loading / empty / populated-collapsed / unavailable. No invented authors/avatars/times/counts. Skeletons only in loading; literal bodies in populated-collapsed.

## Constraints

- No invent HTTP · Identity · OP PASS  
- No gray bars for loaded bodies  
- Do not own reactions surfaces · M153/M157 OOS

## AC / DoD

- [x] Status chrome A–D Present on IssueThreadBlock
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/IssueThreadBlock.*` (CREATE at P3)

## Verification

```bash
# after P3
cd spa-app && npm test -- --run src/features/thread-mount
```
