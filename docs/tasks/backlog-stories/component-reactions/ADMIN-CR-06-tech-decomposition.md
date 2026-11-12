# ADMIN-CR-06 — Technical decomposition + subtasks

## Meta

- **Key:** `ADMIN-CR-06-tech-decomposition`
- **Status:** Done (2026-10-14T09:58:29Z)
- **Depends on:** CR-01…04 backlog stories Done-as-docs (ADMIN-05); shell lab pattern Present
- **Skill:** architecture-designer + pipeline scaffold (P1.3 style)
- **Не запускает** `pkg-*` execute — только раскладка
- **Epic:** [EPIC-SPA-23-component-reactions](../../epics/EPIC-SPA-23-component-reactions/EPIC-SPA-23-component-reactions.md)

## Цель

Разложить CR-стори на epic/tasks/pkg plan. Scaffold **on this ADMIN execute**. Emphasize **adapter tasks**, not new repositories.

## Вход — UX files

Same as ADMIN-CR-03 Вход. Implementation targets map primarily to M154; M160 = QA tasks; M155 = no implement tasks.

## Prerequisite check (verified 2026-10-14T09:58:29Z)

- [x] `#/lab/feed` pattern in `App.jsx` (shell Routes) — baseline for `#/lab/reactions`  
- [x] `ThreadsSocialClient.react` / `getKnobs` Present (L454 / L524) — reuse only  
- [x] REQ-24 locks L1–L10 + BRIEF data-plane lock unchanged  
- [x] ADMIN-CR-05 stories complete  
- [x] No claim of REQ-22 Phase 1 Done  

## Deliverable (executed)

1. Epic: [`EPIC-SPA-23-component-reactions/`](../../epics/EPIC-SPA-23-component-reactions/EPIC-SPA-23-component-reactions.md)  
2. Per-story pipeline mirrors + **18** `task-spa-cr-0N-t0M-*/README.md`  
3. Wave order: CR-icon/CR-api Done → CR-01 → CR-02 → CR-03 → CR-04  
4. **Forbidden tasks:** new SocialClient; invent `/threads/*`; M155 people UI; mandatory next-feed cutover — in every task Constraints  
5. bullrun insert — **skipped** (operator request only)  
6. spa-mvp-dashboard epic rollup — Done (scaffold close)  

**Required adapter task:** [task-spa-cr-03-t02-live-adapter-threads-social-client](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-03-lab-reactions-page/task-spa-cr-03-t02-live-adapter-threads-social-client/README.md) — LiveAdapter reuses `ThreadsSocialClient` (no duplicate HTTP).

## Acceptance

- [x] Epic + task READMEs for CR-01…04  
- [x] At least one task explicitly: LiveAdapter reuses `ThreadsSocialClient` (no duplicate HTTP)  
- [x] No task implements M155 people UI  
- [x] No invent HTTP fields  
- [x] Lab-first; production next-feed cutover **not** in this epic unless operator expands  
- [x] INDEX: ADMIN-CR-06 Done; package «backlog ready for P1.3»  

## Как выполнять

«Выполни ADMIN-CR-06: scaffold epic + task decomposition for CR-01…04; lab-first; FixtureAdapter + thin LiveAdapter; M155 excluded; no second client».
