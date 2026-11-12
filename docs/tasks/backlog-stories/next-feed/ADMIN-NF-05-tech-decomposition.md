# ADMIN-NF-05 — Technical decomposition + subtasks

## Meta

- **Key:** `ADMIN-NF-05-tech-decomposition`
- **Status:** Done
- **Depends on:** NF-01…06 backlog stories exist (ADMIN-NF-04)
- **Skill:** architecture-designer + pipeline scaffold plan
- **Не запускает** `pkg-*` execute — только раскладка
- **Pattern:** [ADMIN-NS-06](../next-shell/ADMIN-NS-06-tech-decomposition.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Rework:** was ADMIN-NF-06; icon **first promote** already done in ADMIN-NF-02

## Цель

Разложить каждую NF-стори на task READMEs + epic scaffold **при выполнении этого ADMIN**.

## Prerequisite check

- [x] next-shell host `/#/next/feed` available ([next-shell](../next-shell/INDEX.md) Done)
- [x] Icons **on disk** under `public/icons/next-feed/` (ADMIN-NF-02) + catalog `STORY-SPA-NF-icon-assets.md`
- [x] One data plane; reuse threads clients (REQ-17) — no second HTTP client
- [x] ADMIN-NF-04 stories complete

## Must-include task themes

1. **Verify** feed icon URLs 404-free (promote already done in ADMIN-NF-02 — do **not** re-copy unless gap)
2. Scaffold `features/feed/` composing existing services / `components/threads`
3. Wire NF-01…06 AC; fail-soft; mounts on `#/next/feed*`
4. Vitest + browser-smoke feed critical states
5. Do **not** re-own AppShell / Header chrome (next-shell)

## Deliverable (on execute)

1. Epic under `docs/tasks/epics/` — [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)  
2. Per-story tasks — **25** task READMEs under `stories/STORY-SPA-NF-0N-*/`  
3. Wave: NF-01→02→03→04→05→06  
4. bullrun insert — **skipped** (operator request only)  
5. Dashboard epic rollup when scaffolded

## Acceptance

- [x] Epic + tasks for all NF stories
- [x] Icon paths cite `/icons/next-feed/…` (verify, not invent promote wave)
- [x] No task claims shell D2 ownership
- [x] INDEX: ADMIN-NF-05 → Done; ready for P1.3

## Как выполнять

«Выполни ADMIN-NF-05: scaffold epic/tasks for NF-01…06; icons already in `public/icons/next-feed/`; shell excluded».
