## Task workspace — `task-spa-id-06-t08-verify-continue-draft-saved-m122c`

- Story: [`../STORY-SPA-ID-06-protected-action-gate.md`](../STORY-SPA-ID-06-protected-action-gate.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-06-execution-2026-06-29.md`](../../../../../../analysis/audit-STORY-SPA-ID-06-execution-2026-06-29.md) §3 F2
- **Depends on:** SPA-ID-06-T01..T07 Done (pkg-000021)
- **activation:** `run_mode=spa_id_06_audit_2026_06_29`
- **ui_scope:** `extends` (M122 C interpolation — reuse `DraftSavedPanel`)

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_id_06_audit_2026_06_29` (post-audit; **не** pkg-000021)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T20:01:02Z  
**Closed:** 2026-06-29T20:07:00Z  
---

## Task: fix — Verify & Continue через M122 C (Draft Saved) перед VERIFYING

### Цель
На ветке gate-панели (M122 B) «Verify & Continue» показывать промежуточный экран «Draft Saved» (M122 C) перед embed верификации (M122 D). Закрыть audit F2 UX-flow без потери уже сохранённого draft.

### Почему это важно (риск)
Сжатый путь B→D минует явный сигнал FR-06.3 «ничего не потеряно» на основном submit-flow; пользователь не видит отдельный C-экран, хотя draft уже сохранён до gate.

### Факты из кода (Code Facts / SSOT)
1. `handleVerifyContinue` с gate и с `DraftSavedPanel` — один колбэк → сразу `VERIFYING` — [`StoryComposePage.jsx:113-115`](../../../../../../../../src/pages/StoryComposePage.jsx#L113).
2. Gate-панель передаёт тот же handler — [`StoryComposePage.jsx:210-212`](../../../../../../../../src/pages/StoryComposePage.jsx#L210).
3. `DraftSavedPanel` рендерится только в фазе `DRAFT_SAVED` — [`StoryComposePage.jsx:218-225`](../../../../../../../../src/pages/StoryComposePage.jsx#L218); на пути «Save Draft» C уже работает.
4. Draft сохраняется до gate на Submit — [`StoryComposePage.jsx:97-100`](../../../../../../../../src/pages/StoryComposePage.jsx#L97); повторный `persistDraft` на B→C **не** нужен.
5. M122 states B→C→D — [`mockup-122-story-compose-verification-gate-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.md).
6. Audit F2 — [audit-STORY-SPA-ID-06-execution-2026-06-29.md](../../../../../../analysis/audit-STORY-SPA-ID-06-execution-2026-06-29.md) §3 F2.

### Gap / Проблема
Post-audit: «Verify & Continue» (B) ведёт напрямую в `VERIFYING` (D), минуя `DRAFT_SAVED` (C). Данные не теряются; расхождение — порядок экранов M122.

### AC/DoD
- [x] (P0) С gate-панели (B) «Verify & Continue» → фаза `DRAFT_SAVED` (C), не `VERIFYING`.
- [x] (P0) С `DraftSavedPanel` (C) «Continue Verification» → фаза `VERIFYING` (D).
- [x] (P0) Разделить колбэки (gate vs draft-saved); не дублировать `persistDraft` на B→C.
- [x] (P0) Vitest: [`StoryComposePage.test.jsx`](../../../../../../../../src/pages/__tests__/StoryComposePage.test.jsx) — assert `data-story-gate-phase` / `story-gate-draft-saved` на пути Verify & Continue.
- [x] (P1) `npm run test:run` green (307 passed, 2 skipped); без регрессий ID-04 embed / ID-06 gate.
- [x] (P1) **Не** менять `pkg-000021`, `spa-active-package.current.yaml`, pipeline story Status Done, backlog AC.

### Где менять код
- [`src/pages/StoryComposePage.jsx`](../../../../../../../../src/pages/StoryComposePage.jsx) — phase handlers + panel wiring
- [`src/pages/__tests__/StoryComposePage.test.jsx`](../../../../../../../../src/pages/__tests__/StoryComposePage.test.jsx)

### Out of scope
- F1 (live gateway `/story-drafts` E2E — waived, integration seam). Новый pkg. ID-07 waitlist. Изменение i18n-ключей (reuse `storyGate.draftSaved.*`).

### Verification
```bash
cd spa-app
npm run test:run -- src/pages/__tests__/StoryComposePage.test.jsx
npm run test:run
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
