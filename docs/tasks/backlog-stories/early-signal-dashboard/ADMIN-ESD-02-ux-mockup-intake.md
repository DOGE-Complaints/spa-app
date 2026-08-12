# ADMIN-ESD-02 — UX mockup intake (слой 4.1 → specs)

## Meta

- **Key:** `ADMIN-ESD-02-ux-mockup-intake`
- **Status:** Todo
- **Depends on:** [ADMIN-ESD-01](ADMIN-ESD-01-product-ux-prompts.md) Done + UX-диалог выполнен оператором
- **Blocks:** ADMIN-ESD-03, ADMIN-ESD-05; freeze для ADMIN-ESD-04
- **Skill:** docs / UX SSOT curation

## Цель

Зафиксировать результаты UX-генерации как **SSOT mockup specs** в репозитории.

## Целевая директория (план)

`spa-app/docs/UX/mockups/early-signal-dashboard/`

Индекс: `docs/UX/mockups/early-signal-dashboard/README.md` (создаётся при выполнении слоя).

| Artboard | Future story | Spec pattern |
|----------|--------------|--------------|
| ESD-D | ES-01 | `mockup-*-discovery-shell-state-sheet-spec.md` |
| ESD-P | ES-02 | `mockup-*-network-pulse-state-sheet-spec.md` |
| ESD-E | ES-03 | `mockup-*-emerging-signals-state-sheet-spec.md` |
| ESD-C | ES-04 | `mockup-*-coverage-contribution-state-sheet-spec.md` |
| ESD-I | ES-05 | `mockup-*-issues-continuum-state-sheet-spec.md` |

PNG artboards: may be **pending** — note in README (как PH home).

## Deliverable

1. Folder `docs/UX/mockups/early-signal-dashboard/` + `*-spec.md` per surface
2. README index + link from PRODUCT-BRIEF Mockup table
3. Optional L10N appendix for discovery copy (en/et/ru)
4. Explicit note: do not invent gateway fields in visual specs

## Acceptance

- [ ] All five surfaces have `*-spec.md` (or documented deferral with operator note)
- [ ] States A–E / Pulse omit-vs-bind covered
- [ ] Routes agree with brief (`/board` only)
- [ ] INDEX: ADMIN-ESD-02 → Done

## Как выполнять

После UX-сессии: «Выполни ADMIN-ESD-02 — зафиксируй спеки в `docs/UX/mockups/early-signal-dashboard/` как SSOT пакета».
