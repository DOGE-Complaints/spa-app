# ADMIN-NS-06 — Technical decomposition + subtasks (слой 4.5)

## Meta

- **Key:** `ADMIN-NS-06-tech-decomposition`
- **Status:** Done
- **Depends on:** NS-01…06 backlog stories exist (ADMIN-NS-05)
- **Skill:** architecture-designer + pipeline scaffold (Builder Queue P1.3 style)
- **Не запускает** `pkg-*` execute — только раскладка
- **Pattern:** [ADMIN-PH-06](../public-home/ADMIN-PH-06-tech-decomposition.md)
- **Epic:** [EPIC-SPA-19-next-shell](../../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md)

## Цель

Разложить каждую NS-стори на технические subtasks (task READMEs) и materialize epic под Builder Queue **при выполнении этого ADMIN**.

## Prerequisite check

- [x] REQ-21 Phase 0 Done (`AppShellLayout` sole chrome)
- [x] ADMIN-NS-05 stories complete
- [x] Arch D2 order: next shell before classic apply; feed content **not** in this epic
- [x] Icon promote plan exists (`STORY-SPA-NS-icon-assets.md`)

## Must-include task themes

1. **Promote icons:** copy shell subset from `docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/{navigation,actions,status}/` → `spa-app/public/icons/next-shell/<group>/`  
2. Wire Header/rail to `/icons/next-shell/…` (replace PH menu PNG where NS-02 applies)  
3. **Logo:** keep `/assets/DOGEstonia-logo-*`; change brand `Link` target → `#/next/feed`  
4. Register `#/next/feed` (+ issue host) **above** catch-all `*`  
5. D2.3 classic shell apply + shelter-list intact  
6. `/` + `*` flip after working shell  
7. Vitest + browser-smoke shell; repair theme/shell tests  
8. Update `spa-url-page-map.md`

**Do not** task BoardFeed/thread/reactions production (next feed package).

## Deliverable (on execute)

1. Epic folder: [`EPIC-SPA-19-next-shell`](../../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md) — **Done**
2. Per story pipeline + `task-spa-ns-0N-t0M-*/README.md` — **Done** (25 tasks)
3. Wave order: NS-01→02→03→04 → NS-05 → NS-06 — **Done**
4. bullrun insert — **skipped** (operator request only)
5. spa-mvp-dashboard epic rollup — **Done** (scaffold close)

## Acceptance

- [x] Epic + task READMEs for all NS stories
- [x] Icon promote + runtime paths explicit in tasks (NS-02-T01; verify NS-06-T04)
- [x] No task assumes feed-content Done
- [x] Catch-all route ordering called out (NS-01-T01 / AC)
- [x] INDEX: ADMIN-NS-06 → Done; package mode → ready for P1.3

## Как выполнять

«Выполни ADMIN-NS-06: scaffold epic/tasks for NS-01…06; icons → `public/icons/next-shell/`; feed content excluded».
