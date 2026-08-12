# ADMIN-ESD-06 — Technical decomposition + subtasks (слой 4.5)

## Meta

- **Key:** `ADMIN-ESD-06-tech-decomposition`
- **Status:** Todo
- **Depends on:** ES-01…05 backlog stories Done-as-docs (ADMIN-ESD-05)
- **Skill:** architecture-designer + pipeline scaffold (Builder Queue P1.3 style)
- **Не запускает** `pkg-*` execute — только раскладка

## Цель

Разложить каждую ES-стори на технические subtasks и materialize epic под Builder Queue **при выполнении слоя**.

## Prerequisite check

- [ ] ADMIN-ESD-05 stories on disk
- [ ] Board still hosted under AppShell / PH chrome (no shell redesign in ES)
- [ ] Sibling Pulse contract: either Unknown-documented in api-req **or** decided exposure list

## Deliverable (later — on layer run)

1. Epic folder plan: e.g. `docs/tasks/epics/EPIC-SPA-*-early-signal-dashboard/` (final number at run time)
2. Per-story pipeline + `task-spa-es-0N-t0M-*/README.md`
3. Wave order suggestion: ES-01 → ES-02/03 (data-gated) → ES-04 → ES-05
4. Dashboard / bullrun insert — operator request only

## Acceptance

- [ ] Epic + task READMEs exist for all ES stories
- [ ] No task invents gateway path
- [ ] No task assumes Offers / Voices / REQ-12 changes
- [ ] INDEX: ADMIN-ESD-06 → Done; package mode → «backlog ready for P1.3/P3»

## Как выполнять

«Выполни ADMIN-ESD-06: scaffold epic и task decomposition для ES-01…05; не invent GW paths».
