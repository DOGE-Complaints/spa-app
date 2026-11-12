# SPA-CT-31-T05 — ARCH §17 tip A · INDEX · link REQ-05

**Status:** Done  
**Story:** [`../STORY-SPA-CT-31-live-attach-preview-consumable.md`](../STORY-SPA-CT-31-live-attach-preview-consumable.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md)  
**ui_scope:** `thread-mount` / `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T17:56:40Z`  
**Package:** `pkg-000195`  
**P3 Done:** `2026-10-21T18:04:58Z`  
**Path A:** ARCH §17 · policy **A** locked

## Purpose

FR-CT-31.5 · 31.6: Document policy **A** locked in ARCH §17 · INDEX tip · **link** REQ-05 / HTTP-07/08 · **no** create HTTP-09.

## Constraints

- name ≠ create for HTTP-09 · no invent B · no invent OP PASS  
- Docs only this task (no product invent)

## AC / DoD

- [x] ARCH §17 records tip **A** locked
- [x] INDEX / backlog Meta synced
- [x] REQ-05 linked · HTTP-09 Absent (not invented)

## Where changed

ARCHITECTURE.md §17 · INDEX · residual note · HTTP-09 Absent

## Verification

```bash
# docs sync · path presence · no HTTP-09 invent
ls doge-threads/docs/tasks/epics 2>/dev/null | grep -i HTTP-09 || echo 'HTTP-09 absent (expected)'
```
