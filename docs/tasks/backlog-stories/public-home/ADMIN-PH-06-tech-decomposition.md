# ADMIN-PH-06 — Technical decomposition + subtasks (слой 4.5)

## Meta

- **Key:** `ADMIN-PH-06-tech-decomposition`
- **Status:** Done (2026-08-02) — EPIC-SPA-09 + pipeline tasks scaffolded
- **Depends on:** PH-01…06 backlog stories Done-as-docs; **G8 AppShell Done** (verified `pkg-000040`)
- **Skill:** architecture-designer + pipeline scaffold (Builder Queue P1.3 style)
- **Не запускает** `pkg-*` execute — только раскладка

## Цель

Разложить каждую PH-стори на технические subtasks (task READMEs) и при необходимости materialize epic под Builder Queue.

## Prerequisite check (verified)

Перед стартом подтвердить в коде/индексе:

- [x] G8 status Done в [design-foundation INDEX](../design-foundation/INDEX.md) / bullrun — Done `pkg-000040`
- [x] Header/Sidebar живут в shared AppShell (не дубль BoardPage) — Board mounts `AppShell` + `Header`/`Sidebar`; PH work extends Header, feed cutover in BoardPage
- [x] PH backlog stories complete (ADMIN-05)

Если G8 ещё Todo — **стоп**; обновить INDEX note, не плодить tasks на устаревший shell.

## Deliverable

1. Epic folder: [`docs/tasks/epics/EPIC-SPA-09-public-shell-home/`](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) — **Done**
2. Per story pipeline mirror + `task-spa-ph-0N-t0M-*/README.md` — **Done** (43 tasks)
3. Wave order: 1 PH-01→02→03 · 2 PH-04 · 3 PH-06→PH-05
4. bullrun queue insert — **skipped** (operator request only)
5. spa-mvp-dashboard — epic rollup + §Now updated

## Acceptance

- [x] Epic + task READMEs exist for all PH stories
- [x] No task assumes column board layout
- [x] Logout task names real session API used in codebase (`supabase.auth.signOut` / `supabaseClient.js`)
- [x] INDEX: ADMIN-PH-06 → Done; package mode → «backlog ready for P1.3/P3»

## Как выполнять

«Выполни ADMIN-PH-06: scaffold EPIC-SPA-09 и task decomposition для PH-01…06; G8 считать Done».
