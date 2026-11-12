# SPA-REQ10-02-T08 — T01–T03 Code Facts As-of-Done (F3)

**Status:** Done · P6 `2026-09-28T18:27:35Z`  
**Story:** [`../STORY-SPA-REQ10-02-reaction-selected-reload.md`](../STORY-SPA-REQ10-02-reaction-selected-reload.md)  
**Decision Ref:** [audit-STORY-SPA-REQ10-02-execution-2026-09-28.md](../../../../../../analysis/audit-STORY-SPA-REQ10-02-execution-2026-09-28.md) · F3  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-28T18:25:55Z`  
**Done:** `2026-09-28T18:27:35Z`  
**Package:** `pkg-000088` (unchanged · run_mode override)  
**Gap:** F3 Low → **CLOSED**

## Purpose

Rewrite T01–T03 README Code Facts from «pre-P3 / no selected» to **As-of-Done / Current** pointing at live Option A wire.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| T01–T03 Code Facts As-of-Done | task READMEs under REQ10-02 |

## AC / DoD

- [x] (P0) T01 Code Facts: `mapActorSelected` / selected on root+comments — **F3**
- [x] (P0) T02 Code Facts: Mount `threadRootSelected` + Block `initialSelected`
- [x] (P0) T03 Code Facts: CommentTree `initialSelected={node.selected ?? []}`
- [x] (P0) No product code

## Where to change

- `…/task-spa-req10-02-t01-mapper-selected-option-a/README.md`
- `…/task-spa-req10-02-t02-mount-root-initial-selected/README.md`
- `…/task-spa-req10-02-t03-comment-tree-initial-selected/README.md`

## Out of scope

Verified SSOT (T06) · REQ-19 (T07) · product src · P7/P8

## Verification

```bash
rg -n 'As-of-Done|pre-P3|mapActorSelected|threadRootSelected|initialSelected' spa-app/docs/tasks/epics/EPIC-SPA-16-req10-threads-reaction-reload-honesty/stories/STORY-SPA-REQ10-02-reaction-selected-reload/task-spa-req10-02-t0{1,2,3}-*/README.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
