# SPA-CAB-04-T07 — Replace ic-story / ic-status placeholder PNG assets

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-04-story-activity-card.md`](../STORY-SPA-CAB-04-story-activity-card.md)  
**Decision Ref:** [`../../../../../../analysis/audit-STORY-SPA-CAB-04-execution-2026-07-26.md`](../../../../../../analysis/audit-STORY-SPA-CAB-04-execution-2026-07-26.md) §G1; [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #10–#15  
**Depends on:** T03 Done (paths wired); assets currently blank placeholders  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T11:53:08Z  
**Completed:** 2026-07-26T12:01:46Z  
**Post-audit wave:** `run_mode=spa_cab_04_audit_2026_07_26`

## Purpose
Закрыть audit **G1**: заменить 6 blank placeholder PNG (`1096` bytes each) в `public/icons/user-cabinet/` реальной арт-графикой по каталогу #10–#15. **Код не трогать** — `ICONS` в `StoryActivityCard` уже указывает на эти пути.

## Risk
Placeholder-ok закрывает wire/slot, но визуал M45 остаётся пустым квадратом; без реальных ассетов artboard parity неполная.

## Code Facts (re-verify at execute)
- Replaced (sizes ≫ 1096):  
  `ic-story-activity.png` 12176 · `ic-story-empty.png` 9373 · `ic-story-draft.png` 6885 · `ic-story-id.png` 10208 ·  
  `ic-status-published.png` 17199 · `ic-status-under-review.png` 13490
- Wire unchanged: [`StoryActivityCard.jsx`](../../../../../../../src/components/StoryActivity/StoryActivityCard.jsx) `ICONS` map
- Spec: [STORY-SPA-CAB-icon-assets.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #10–#15
- Pattern: CAB-03 T08 civic icon replace (assets only)

## AC / DoD
- [x] (P0) Шесть файлов заменены; размер каждого ≫ 1096 B (реальный PNG с alpha).
- [x] (P0) Имена/пути неизменны (`ic-story-activity|empty|draft|id.png`, `ic-status-published|under-review.png`).
- [x] (P0) Стиль: icon-assets conventions (256×256, thin stroke, transparent BG; #f5f7fa как в каталоге).
- [x] (P1) Vitest StoryActivity still PASS (icon src assertions).
- [x] (P1) **No** changes to `StoryActivityCard.jsx` / CSS in this task (assets only).
- [x] (P0) [`acceptance-verification-spa-cab-04-t07.md`](./acceptance-verification-spa-cab-04-t07.md) PASS with live `Date:` post verify.

## Where to change
- `spa-app/public/icons/user-cabinet/ic-story-*.png` (four files)
- `spa-app/public/icons/user-cabinet/ic-status-*.png` (two files)

## Out of scope
- Doc gaps G2–G4 (ignored). Story-handoff reuse icons (already real). JSX path renames. New pkg.

## Verification
```bash
cd spa-app && ls -la public/icons/user-cabinet/ic-story-*.png public/icons/user-cabinet/ic-status-*.png
cd spa-app && npm test -- --run StoryActivity
```

Gate: [`acceptance-verification-spa-cab-04-t07.md`](./acceptance-verification-spa-cab-04-t07.md) PASS.
