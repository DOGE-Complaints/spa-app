# EPIC-SPA-16 — REQ10 threads reaction reload honesty

> **ID:** `EPIC-SPA-16` · **Статус:** **In Progress** · REQ10-01+02 Product Done · P6 gap CLOSED (`pkg-000088`, 2026-09-28T18:27:35Z)  
> **Тип:** Production hygiene + reaction reload honesty (spa half)  
> **source:** [`../../backlog-stories/req10-threads-reaction-reload-honesty/INDEX.md`](../../backlog-stories/req10-threads-reaction-reload-honesty/INDEX.md)  
> **Parent REQ:** [`19-req10-threads-reaction-reload-honesty.md`](../../../requirements/19-req10-threads-reaction-reload-honesty.md)  
> **Parent product:** [`REQ10-DOGEstonia-Threads-Board-Architecture-Hardening.md`](../../../../docs/requirements%20backlog/REQ10-DOGEstonia-Threads-Board-Architecture-Hardening.md) §3.1, §3.5, §3.7, §6.2, §7.1 H1/H5(client), §7.2 H7/H9  
> **created_at:** `2026-09-28T18:02:36Z` · **P1.3 REQ10-01:** `2026-09-28T18:02:36Z` · **P3 REQ10-01:** `2026-09-28T18:05:35Z` · **P6 REQ10-01:** `2026-09-28T18:12:58Z` · **P1.3 REQ10-02:** `2026-09-28T18:17:14Z` · **P3 REQ10-02:** `2026-09-28T18:22:01Z` · **P6 REQ10-02:** `2026-09-28T18:27:35Z`

---

## Назначение

Spa half of REQ10: remove Cursor debug ingest from production `spa-app/src` (H1); consume optional Bearer tree `selected[]` on reload (H5 Option A). Do not invent HTTP paths; do not mix threads-server / gateway lifecycle.

## Prerequisites (verified)

| Prerequisite | Status |
|--------------|--------|
| Parent REQ-19 on disk | Yes · Done (H1+H5 spa) |
| Backlog STORY-SPA-REQ10-01 | Done · P3/P6 |
| Backlog STORY-SPA-REQ10-02 | Done · P3/P6 |
| EPIC-SPA-14 threads Closed knobs/tree/react | Done |
| EPIC-SPA-15 REQ9 | Done — separate track |
| threads STORY-THREADS-REQ10-05 | **Done** |

## Состав

| Story | Тема | Pipeline | Status |
|-------|------|----------|--------|
| REQ10-01 | Remove Cursor `7840/ingest` from spa `src` | [pipeline](stories/STORY-SPA-REQ10-01-debug-ingest-cleanup/STORY-SPA-REQ10-01-debug-ingest-cleanup.md) | **Done** · P3 `pkg-000087` · P6 CLOSED |
| REQ10-02 | Option A `selected` → pickers (root + comments) | [pipeline](stories/STORY-SPA-REQ10-02-reaction-selected-reload/STORY-SPA-REQ10-02-reaction-selected-reload.md) | **Done** · P3 `pkg-000088` · P6 CLOSED · OPEN empty |

## Operator locks

| Theme | Decision |
|-------|----------|
| H5 wire shape | **Option A** — consume optional Bearer tree `selected[]`; no Option B invent |
| `selected` targets | thread-root **+** comments |
| Story order | REQ10-01 Done; REQ10-02 P3+P6 Done (`pkg-000088`) |

## Active tip

**REQ10-02** P6 gap CLOSED · [`pkg-000088`](../../spa-active-packages/pkg-000088-20260928-epic-spa-16-req10-02-reaction-selected-reload.yaml) · T01–T08 Done · OPEN empty · `run_mode=spa_req10_02_audit_2026_09_28` · [audit](../../../analysis/audit-STORY-SPA-REQ10-02-execution-2026-09-28.md) · **Skip P7**. Do not invent HTTP. Do not git push.
