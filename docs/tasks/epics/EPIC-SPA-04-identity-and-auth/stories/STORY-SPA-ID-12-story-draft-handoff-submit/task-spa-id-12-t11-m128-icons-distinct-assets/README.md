## Task workspace — `task-spa-id-12-t11-m128-icons-distinct-assets`

- Story: [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-12-execution-2026-07-05.md`](../../../../../../analysis/audit-STORY-SPA-ID-12-execution-2026-07-05.md) §2 F1, F4; [STORY-SPA-ID-12-icon-assets.md](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md)
- **Depends on:** SPA-ID-12-T01..T10 Done (pkg-000026)
- **activation:** `run_mode=spa_id_12_audit_2026_07_05`
- **ui_scope:** `extends` (M128 all states; anchor T08)

---
**Приоритет:** P1  
**Сложность:** M  
**Статус:** Done  
**Closed:** 2026-07-05T10:04:25Z
**Wave:** `run_mode=spa_id_12_audit_2026_07_05` (post-audit; **не** pkg-000026)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T10:00:56Z  
---

## Task: fix — distinct story-handoff icons 256×256 per icon-assets catalog

### Цель
Закрыть audit F1+F4: заменить 19 байт-идентичных PNG-плейсхолдеров в `public/icons/story-handoff/` на **различимые** иконки по [icon-assets catalog](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md); экспорт 256×256 (+ опц. @2x 512), сжатие — снизить суммарный вес с ~25 МБ.

### Почему это важно (риск)
Все 19 файлов `ic-*.png` имеют один md5 `a0c11aa9dcd29eccf858dd2bd2315724` (1024×1024, ~1.3 МБ каждый). В проде lock/spinner/success/cloud-error/field-* показывают **одну картинку** — визуально нефункционально; не соответствует M128 и каталогу (distinct glyphs, 256²).

### Факты из кода (Code Facts / SSOT)
1. Все 19 PNG — идентичный md5, 1024×1024 RGBA — audit [§2 F1](../../../../../../analysis/audit-STORY-SPA-ID-12-execution-2026-07-05.md).
2. Каталог SSOT: 19 ассетов `ic-<kebab>.png`, 256×256, промпты генерации — [STORY-SPA-ID-12-icon-assets.md](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md).
3. UI ссылается на `/icons/story-handoff/ic-*.png` — [`StoryHandoffPanels.jsx`](../../../../../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) (`ic-info`, `ic-success-check`, `ic-copy`, field icons).
4. Anchor baseline: [`task-spa-id-12-t08-.../ui-baseline/`](../task-spa-id-12-t08-ui-anchor-m128-icons/ui-baseline/) — post-implement 9 state PNG.

### Gap / Проблема
Post-audit Medium (F1) + Low (F4): плейсхолдер-иконки; тяжёлые 1024² ассеты вместо 256² каталога.

### AC/DoD
- [x] (P0) Заменить 19 PNG на **различимые** ассеты по каталогу (промпты в icon-assets.md); формат 256×256 (+ опц. @2x 512).
- [x] (P0) Проверить уникальность: `md5` по файлам — **не** один на все 19.
- [x] (P1) Суммарный вес `public/icons/story-handoff/` существенно ниже ~25 МБ (F4).
- [x] (P1) UI-3: обновить `task-spa-id-12-t08-.../ui-baseline/post-implement/*.png` (9 state PNG, 1536×1024).
- [x] (P1) `npm run test:run` green; `npm run test:ui:story-handoff-m128` green.
- [x] (P1) **Не** менять `pkg-000026`, `spa-active-package.current.yaml`, story Status Done.

### Где менять код
- [`public/icons/story-handoff/ic-*.png`](../../../../../../../../public/icons/story-handoff/) — замена ассетов
- [`scripts/generate-story-handoff-icons.py`](../../../../../../../scripts/generate-story-handoff-icons.py) — генератор
- Anchor UI: [`task-spa-id-12-t08-.../ui-baseline/post-implement/`](../task-spa-id-12-t08-ui-anchor-m128-icons/ui-baseline/post-implement/)

### Out of scope
- F5 wire (`ic-phone`, `ic-auto-resubmit`, `ic-warning-triangle`) — отдельное решение оператора.
- F2 My Stories CTA (T12). F3 `verify_url` (waived). R1 GPT redirect (cross-system).

### Verification
Gate: [acceptance-verification-spa-id-12-t11.md](./acceptance-verification-spa-id-12-t11.md)

```bash
cd spa-app && python3 scripts/generate-story-handoff-icons.py
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:story-handoff-m128
```
