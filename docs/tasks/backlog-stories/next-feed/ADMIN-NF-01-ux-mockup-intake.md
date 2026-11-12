# ADMIN-NF-01 — UX mockup intake register (existing SSOT)

## Meta

- **Key:** `ADMIN-NF-01-ux-mockup-intake`
- **Status:** Done
- **Depends on:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) locked
- **Blocks:** ADMIN-NF-02, ADMIN-NF-03 freeze; ADMIN-NF-04
- **Skill:** docs curation — **register + state checklist, don’t author mockups**
- **Pattern:** [ADMIN-NS-02](../next-shell/ADMIN-NS-02-ux-mockup-intake.md)
- **Rework:** was ADMIN-NF-02; old product-ux-prompts layer **removed** ([sync mirror](ADMIN-NF-rework-sync-mirror.md))
- **Deliverable:** [NF-feed-mockup-intake-register.md](NF-feed-mockup-intake-register.md)

## Цель

Зафиксировать feed SSOT как **register** на уже лежащие файлы в `docs/UX/next/feed/artboards/` + state checklists для implementer (бывшая матрица NF-01). Папка artboards — **read-only**.

**Запрещено:** генерировать PNG, писать новые `*-spec.md` в `artboards/`; отдельный `UX-PROMPTS.md`.

## Вход

- [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- [feed INDEX](../../../UX/next/feed/INDEX.md) · artboards M149–M160
- [DUI Q01–Q18](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md)
- Arch [02-features-feed](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- Interaction / USI / Component packs under `docs/UX/next/feed/`
- Explicit exclude: PublicHeader / ProfileRail **ownership** ([next-shell](../next-shell/INDEX.md) Done)

## Deliverable

1. **`NF-feed-mockup-intake-register.md`** в этой папке:

### Surface → story map

| NF surface | Future story | Spec path | § / panels | PNG | Notes |
|------------|--------------|-----------|------------|-----|-------|
| NF-F | NF-01 | `artboards/mockup-m149-…` | feed/toolbar | same stem | not Header/rails |
| NF-P | NF-02 | `mockup-m150-…` | … | … | no schema/media prod |
| NF-M | NF-03 | `mockup-m151-…` | … | … | Q14 ship gate |
| NF-T | NF-04 | `mockup-m152-…` + `m153-…` | … | … | text path |
| NF-R | NF-05 | `m154` + `m156` + `m157` | … | … | |
| NF-I | NF-06 | `m158`–`m160` | … | … | |
| M155 | — | `mockup-m155-…` | people | … | **OOS** — no story |

### State checklists (absorb old UX brief)

| ID | Surface | States to call out |
|----|---------|-------------------|
| NF-F | BoardFeed + toolbar | load/empty/error/stale/retry/filter |
| NF-P | Issue-as-post | no-media civic; collapse missing |
| NF-M | List \| Map | list/map/partial/error |
| NF-T | Thread + composer | empty/load/populated/unavailable; text path |
| NF-R | Reactions + stub + gate | aggregates/picker; stub; 403 draft |
| NF-I | Mounts + responsive | modal/sheet/route; narrow; theme |

2. Shell chrome rows → pointer to [next-shell](../next-shell/INDEX.md) register (not missing).  
3. Global constraints in register: home `#/next/feed*`; `features/feed`; no invent API; shell OOS.  
4. INDEX: ADMIN-NF-01 → Done.

## Acceptance

- [x] All NF-F/P/M/T/R/I mapped with verified artboard paths; zero «create artboard»
- [x] State checklists present; no separate `UX-PROMPTS.md`
- [x] No files added under `artboards/`
- [x] M155 OOS without story key
- [x] INDEX updated

## Как выполнять

«Выполни ADMIN-NF-01 — register M149–M160 feed slices + state checklists; без gen».
