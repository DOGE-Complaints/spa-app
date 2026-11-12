# SPA-REQ10-02-T06 — Verified As-of-Done SSOT (F1)

**Status:** Done · P6 `2026-09-28T18:27:35Z`  
**Story:** [`../STORY-SPA-REQ10-02-reaction-selected-reload.md`](../STORY-SPA-REQ10-02-reaction-selected-reload.md)  
**Decision Ref:** [audit-STORY-SPA-REQ10-02-execution-2026-09-28.md](../../../../../../analysis/audit-STORY-SPA-REQ10-02-execution-2026-09-28.md) · F1  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-28T18:25:55Z`  
**Done:** `2026-09-28T18:27:35Z`  
**Package:** `pkg-000088` (unchanged · run_mode override)  
**Gap:** F1 Medium → **CLOSED**

## Purpose

Split backlog + pipeline §Verified into **As-of-Done / Current** (Option A selected wired) vs **Historical (pre-REQ10-02)** present-tense pre-P3 claims.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| Backlog §Verified As-of-Done / Historical | backlog STORY-SPA-REQ10-02 |
| Pipeline §Verified As-of-Done / Historical | pipeline STORY-SPA-REQ10-02 |

## AC / DoD

- [x] (P0) Backlog §Verified As-of-Done reflects selected map + initialSelected wire — **F1**
- [x] (P0) Pipeline §Verified same split
- [x] (P0) No product code / invent HTTP

## Where to change

- `spa-app/docs/tasks/backlog-stories/req10-threads-reaction-reload-honesty/STORY-SPA-REQ10-02-reaction-selected-reload.md`
- `spa-app/docs/tasks/epics/EPIC-SPA-16-req10-threads-reaction-reload-honesty/stories/STORY-SPA-REQ10-02-reaction-selected-reload/STORY-SPA-REQ10-02-reaction-selected-reload.md`

## Out of scope

REQ-19 (T07) · T01–T03 Code Facts (T08) · product src · P7/P8

## Verification

```bash
rg -n 'As-of-Done|Historical|initialSelected|mapActorSelected' spa-app/docs/tasks/backlog-stories/req10-threads-reaction-reload-honesty/STORY-SPA-REQ10-02-reaction-selected-reload.md spa-app/docs/tasks/epics/EPIC-SPA-16-req10-threads-reaction-reload-honesty/stories/STORY-SPA-REQ10-02-reaction-selected-reload/STORY-SPA-REQ10-02-reaction-selected-reload.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
