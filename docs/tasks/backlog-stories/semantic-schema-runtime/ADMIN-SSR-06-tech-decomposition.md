# ADMIN-SSR-06 — Technical decomposition (слой 4.5)

## Meta

- **Key:** `ADMIN-SSR-06-tech-decomposition`
- **Status:** Done (2026-09-02) — [EPIC-SPA-13](../../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md) scaffolded
- **Depends on:** SSR-01…03 backlog-ready (ADMIN-SSR-05 Done); PH-04 board host Done; REQ-16 Accepted
- **Skill:** architecture-designer + pipeline scaffold (Builder Queue P1.3 style)
- **Не запускает** `pkg-*` execute — только раскладка epic/tasks

## Цель

Разложить SSR-01…03 на технические subtasks и materialize epic под Builder Queue.

## Prerequisite check (verified at materialize)

| Prerequisite | Status |
|--------------|--------|
| PH-04 board feed host | Done (`pkg-000048`) |
| `GET /node/issues` in spa | Done — [`GatewayIssueRepository.js:77`](../../../../src/repositories/GatewayIssueRepository.js) |
| Gateway `schema_card` + `geo` projection | Sibling 51 — gateway side |
| ES / Early Signal on `/board` | Done — do not mix with Issue overlay (REQ-16 OOS) |
| Map library | **Locked** — [ADR-SSR-03-map-library.md](ADR-SSR-03-map-library.md) (MapLibre + free dark vector; interview 2026-09-02) |

## Wave order (as-of-Done)

| Wave | Story | Rationale |
|------|-------|-----------|
| **0** | SSR-01 tech_first | typedef + repository pass-through |
| **1** | SSR-02 ui_first | overlay M141 |
| **2** | SSR-03 ui_first | list\|map M142; T00 = ADR |
| **3** | Regression | SSR-03 **T06** PH-04 / ES-05 — no SSR-04 story |

## Deliverable

1. Epic: [`EPIC-SPA-13-semantic-schema-runtime`](../../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md) — **Done**
2. Per-story pipeline + `task-spa-ssr-0N-t0M-*/README.md` — **Done** (SSR-01: 4 · SSR-02: 5 · SSR-03: 7)
3. Map interview SSOT: [ADR-SSR-03-map-library.md](ADR-SSR-03-map-library.md)
4. spa-mvp-dashboard — **skipped** (operator request only)

## Acceptance

- [x] Wave order documented; no task assumes pack.json in browser
- [x] ES-05 / PH-04 regression called out explicitly (SSR-03 T06)
- [x] INDEX: ADMIN-SSR-06 → Done; package «backlog ready for P1.3»

## Как выполнять

«Выполни ADMIN-SSR-06: scaffold EPIC-SPA-13 и task decomposition для SSR-01…03».
