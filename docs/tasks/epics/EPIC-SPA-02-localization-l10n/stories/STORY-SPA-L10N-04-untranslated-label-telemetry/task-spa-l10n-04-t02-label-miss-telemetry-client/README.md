## Task workspace — `task-spa-l10n-04-t02-label-miss-telemetry-client`

- Story: [`../STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../STORY-SPA-L10N-04-untranslated-label-telemetry.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md) §Scope (transport, env, toggle, dedup)
- **Depends on:** SPA-L10N-04-T01 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000006`  
**Skill declared:** javascript-pro  
---

## Task: implement — label-miss telemetry client (transport + env + dedup)

### Цель
Тонкая абстракция `reportLabelMiss({ label_key, locale })`: `POST {VITE_GATEWAY_BASE_URL}/telemetry/label-misses`, privacy-тумблер `VITE_TELEMETRY_ENABLED`, session dedup, quiet no-op при выключенном toggle / пустом URL / сетевой ошибке.

### Почему это важно (риск)
Без абстракции `labelDisplay` привяжется к fetch; без dedup — лишний трафик (бэк без rate-limit).

### Факты из кода (Code Facts / SSOT)
1. Gateway endpoint: [`asgi_app.py:414`](../../../../../../../../../doge-complaints-gateway/src/core/api/asgi_app.py) `POST /telemetry/label-misses`.
2. Env precedent: [`issueService.js:31`](../../../../../../../../src/services/issueService.js) — `import.meta.env.VITE_GATEWAY_BASE_URL`.
3. Телеметрии в `src/**` — 0 matches (grep 2026-06-16).
4. Backlog: тело `{ label_key, locale }`; без cookies; `accepted` не обрабатывать.

### Gap / Проблема
Нет клиентского модуля отправки humanize-miss событий.

### AC/DoD
- [x] (P0) Story AC #3: транспорт за абстракцией; sink из env; no-op при отсутствии URL или ошибке.
- [x] (P0) Story AC #4: `VITE_TELEMETRY_ENABLED` off → полный no-op (нет fetch).
- [x] (P0) Story AC #5: повторный `{label_key, locale}` в сессии не шлётся (in-memory dedup).
- [x] (P1) POST body только `{ label_key, locale }`; без Authorization/cookies.

### Где менять код
- Новый: [`src/i18n/labelMissTelemetry.js`](../../../../../../../../src/i18n/labelMissTelemetry.js) (или `src/services/`)
- Опционально: [`src/i18n/core.js`](../../../../../../../../src/i18n/core.js) — `LOCALE_CODES` для валидации locale

### Out of scope
- labelDisplay emit wire (T03)
- `.env.example` (T05)
- Бэк sink implementation

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/labelMissTelemetry.test.js
# после T04 — полная сюита
```
