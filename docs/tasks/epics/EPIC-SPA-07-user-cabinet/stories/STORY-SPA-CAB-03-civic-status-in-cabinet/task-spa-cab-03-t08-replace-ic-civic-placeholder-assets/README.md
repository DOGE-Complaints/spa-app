# SPA-CAB-03-T08 — Replace ic-civic placeholder PNG assets

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../STORY-SPA-CAB-03-civic-status-in-cabinet.md)  
**Decision Ref:** [`../../../../../../analysis/audit-STORY-SPA-CAB-03-execution-2026-07-26.md`](../../../../../../analysis/audit-STORY-SPA-CAB-03-execution-2026-07-26.md) §G3; [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #5–#9  
**Depends on:** T03 Done (paths wired); assets currently blank placeholders  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T09:07:57Z  
**Completed:** 2026-07-26T09:11:17Z  
**Post-audit wave:** `run_mode=spa_cab_03_audit_2026_07_26`

## Purpose
Закрыть audit **G3**: заменить 5 blank placeholder PNG (`1096` bytes each) в `public/icons/user-cabinet/ic-civic-*.png` реальной арт-графикой по каталогу #5–#9. **Код не трогать** — `CIVIC_ICON_SRC` уже указывает на эти пути.

## Risk
Placeholder-ok закрывает wire/slot, но визуал M28 остаётся пустым кругом; без реальных ассетов artboard parity неполная.

## Code Facts (re-verify at execute)
- Replaced (sizes ≫ 1096):  
  `ic-civic-unverified.png` 16352 · `verify-required` 8900 · `in-progress` 5709 · `verified` 10044 · `failed` 8481
- Wire unchanged: [`CivicStatusCard.jsx`](../../../../../../../src/components/CivicStatus/CivicStatusCard.jsx) `CIVIC_ICON_SRC`
- Spec: [STORY-SPA-CAB-icon-assets.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #5–#9

## AC / DoD
- [x] (P0) Пять файлов `ic-civic-*.png` заменены; размер каждого ≫ 1096 B (реальный PNG с alpha).
- [x] (P0) Имена/пути неизменны (`ic-civic-unverified|verify-required|in-progress|verified|failed.png`).
- [x] (P0) Стиль: icon-assets conventions (256×256, thin stroke, transparent BG; yellow #f5c542 где указано).
- [x] (P1) Vitest CivicStatusCard still PASS (icon src assertions).
- [x] (P1) **No** changes to `CivicStatusCard.jsx` / CSS in this task (assets only).

## Where to change
- `spa-app/public/icons/user-cabinet/ic-civic-*.png` (five files)

## Out of scope
- Dashboard Vitest (T07). Other cabinet icons #1–#4, #10+. CAB-07 G2.

## Verification
```bash
cd spa-app && ls -la public/icons/user-cabinet/ic-civic-*.png
cd spa-app && npm test -- --run CivicStatusCard
```

Gate: [`acceptance-verification-spa-cab-03-t08.md`](./acceptance-verification-spa-cab-03-t08.md) PASS.
