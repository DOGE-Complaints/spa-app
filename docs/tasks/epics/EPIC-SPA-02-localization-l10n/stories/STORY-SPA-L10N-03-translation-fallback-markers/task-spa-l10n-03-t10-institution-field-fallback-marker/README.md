## Task workspace — `task-spa-l10n-03-t10-institution-field-fallback-marker`

- Story: [`../STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-L10N-03-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-L10N-03-execution-2026-06-16.md) §F2
- **Depends on:** SPA-L10N-03-T09 Done (можно параллельно при согласовании оператора)
- **activation:** `run_mode=spa_l10n_03_audit_2026_06_16`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_l10n_03_audit_2026_06_16` (post-audit; **не** pkg-000005)  
**Skill declared:** react-expert  
---

## Task: fix — institution field fallback marker on IssuePage

### Цель
Прогнать `issue.institution` через `resolveLocalizedTextWithMeta` и показать fallback `TranslationMarker` при `shouldShowContentFallbackMarker` (с учётом MT∥fallback приоритета `!showMtMarker && …`). Закрывает audit F2 (симметрия metadata-полей).

### Почему это важно (риск)
`institution` — единственное локализуемое metadata-поле на IssuePage без meta-resolver и fallback-маркера; issue-level MT-маркер у title не покрывает пофилдовый fallback для institution.

### Факты из кода (Code Facts / SSOT)
1. [`IssuePage.jsx:157-160`](../../../../../../../../src/pages/IssuePage.jsx) — `institution` рендерится через `resolveLocalizedText(issue.institution)` без meta.
2. [`IssuePage.jsx:92-94,109,126`](../../../../../../../../src/pages/IssuePage.jsx) — `title`/`description` уже через `resolveLocalizedTextWithMeta` + `shouldShowContentFallbackMarker`.
3. [`IssuePage.jsx:96`](../../../../../../../../src/pages/IssuePage.jsx) — `showMtMarker = shouldShowMtMarker(issue, locale)` issue-level.
4. [`translationMarkers.js:18-22`](../../../../../../../../src/i18n/translationMarkers.js) — `shouldShowMtMarker(issue, locale)`.

### Gap / Проблема
Audit F2: institution без пофилдового fallback-маркера; низкая ценность, но замыкает симметрию metadata на детальной странице.

### AC/DoD
- [x] (P0) `institution` резолвится через `resolveLocalizedTextWithMeta(issue.institution, locale)`.
- [x] (P0) При `!showMtMarker && shouldShowContentFallbackMarker(institutionMeta)` — рендер `TranslationMarker` kind=fallback рядом с institution (как title/description).
- [x] (P1) Опционально: тест IssuePage на institution fallback marker path.
- [x] (P0) `npx vitest run` — green.

### Где менять код
- [`src/pages/IssuePage.jsx`](../../../../../../../../src/pages/IssuePage.jsx)
- Опционально: [`src/pages/__tests__/IssuePage.test.jsx`](../../../../../../../../src/pages/__tests__/IssuePage.test.jsx) если существует

### Out of scope
- IssueCard (institution там не рендерится)
- Изменение MT semantics / `original_locale` контракта
- F1 mock seed (T09)
- Новый pkg / смена `spa-active-package.current.yaml`

### Проверка
```bash
cd spa-app
npx vitest run
# после P6: issue с institution fallback + UI locale → marker visible
```
