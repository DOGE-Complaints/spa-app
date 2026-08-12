# STORY-SPA-L10N-04 — Телеметрия непереведённых меток + пересмотр privacy

## Meta

- **Key:** `STORY-SPA-L10N-04-untranslated-label-telemetry`
- **Parent Epic:** [`../../../../EPIC-SPA-02-localization-l10n.md`](../../../../EPIC-SPA-02-localization-l10n.md)
- **Status:** Done
- **Gap:** GL-5 (🟠) — [localization-target-and-gap-analysis-2026-06-15.md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)
- **Решения:** D6 (детект через телеметрию), D11 (сознательно пересмотреть «no analytics»)
- **Зависит от:** решение по privacy (governance, обязательно перед реализацией). Бэк-sink ✅ **доставлен** (GW-L10N-03) — [REQUIREMENTS-BACKEND-L10N.md](../../../../../../backlog-stories/localization/REQUIREMENTS-BACKEND-L10N.md) REQ-BE-2.
- **source:** [`spa-app/docs/tasks/backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md)
- **Decision Ref:** [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md); [localization/README.md](../../../../../../backlog-stories/localization/README.md); [localization-target-and-gap-analysis-2026-06-15.md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md); [backend-l10n-integration-bridge-2026-06-16.md](../../../../../../analysis/backend-l10n-integration-bridge-2026-06-16.md)

## ✅ Контракт бэка (доставлен, verified 2026-06-16)

Мост: [backend-l10n-integration-bridge-2026-06-16.md](../../../../../../analysis/backend-l10n-integration-bridge-2026-06-16.md) §2.

```
POST {GATEWAY}/telemetry/label-misses          # публичный, БЕЗ токена
Content-Type: application/json
{ "label_key": "<непустая строка>", "locale": "et" | "ru" | "en" }
→ 202 Accepted { "data": { "accepted": true|false }, "trace_id": "…" }
```
- Verified: [`asgi_app.py:414`](../../../../../../../doge-complaints-gateway/src/core/api/asgi_app.py#L414), [`handlers.py:432`](../../../../../../../doge-complaints-gateway/src/core/api/handlers.py#L432).
- `accepted` фронту реагировать не нужно (всегда 202 при валидном теле); невалидное тело → `400 "Invalid request"`.
- **Без PII / без идентификаторов** — фронт куки/ID не добавляет.
- ⚠️ **Rate-limit на бэке отсутствует** (зафиксированный риск) → фронт шлёт только на humanize-miss + см. privacy-тумблер ниже.

## Зачем простыми словами

Метки докручиваются в словарь вручную. Чтобы не пропустить новую непереведённую метку, нужно автоматически узнавать, когда сработал humanize-fallback. Решено собирать это телеметрией — но это **противоречит** текущему принципу «no analytics/cookies», поэтому сначала надо осознанно обновить privacy-политику.

## Целевое (из интервью)

- При срабатывании humanize (перевода метки нет) — эмитится **анонимное** событие (что за ключ, какая локаль; без PII).
- Принцип «no analytics/cookies» из [i18n-architecture.md](../../../../../../i18n-architecture.md) **пересматривается** и переписывается под анонимную продуктовую телеметрию.
- Канал отправки — анонимный sink (требование к бэку, см. REQ-BE).

## ⚠️ Предусловие (governance, не код)

Перед реализацией: переписать раздел Security/Privacy в [i18n-architecture.md](../../../../../../i18n-architecture.md) («No cookies, no analytics») под новое решение D11 — что именно собираем, что анонимно, как соотносится с верификацией/eID. Без этого решения стори не стартует.

## Scope (фактические точки)

- [src/i18n/labelDisplay.js](../../../../../../../src/i18n/labelDisplay.js): ветка humanize ([:25](../../../../../../../src/i18n/labelDisplay.js#L25)) — точка эмита события (через абстракцию/хук, без жёсткой привязки к транспорту).
- Тонкая абстракция отправки телеметрии: `POST {sink}/telemetry/label-misses` с телом `{label_key, locale}`; тихий no-op при недоступности/ошибке (не критичный путь).
- Конфиг: env для адреса sink (по аналогии с `VITE_GATEWAY_BASE_URL`).
- **Privacy-тумблер (отвечает на открытый вопрос bridge §7):** env-флаг включения/выключения телеметрии (напр. `VITE_TELEMETRY_ENABLED`); при выключенном — полный no-op. Нужен, т.к. бэк не лимитирует частоту и для соблюдения пересмотренной privacy-политики.
- Дедуп/троттлинг на клиенте (минимально): не слать один и тот же `{label_key, locale}` повторно в рамках сессии (снижает объём без бэк-rate-limit).

## Вне scope

- Реализация sink на бэке — ✅ уже доставлено (GW-L10N-03), не наша зона.
- Любая телеметрия за пределами humanize-miss (не расширять охват без отдельного решения).
- Сбор PII — запрещён по определению.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [i18n-architecture.md](../../../../../../i18n-architecture.md) §Security/Privacy | «no analytics/cookies» | анонимная телеметрия humanize-miss; что собираем/что нет |
| [localization-target…md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) | GL-5 open | GL-5 ✅ |
| [REQUIREMENTS-BACKEND-L10N.md](../../../../../../backlog-stories/localization/REQUIREMENTS-BACKEND-L10N.md) | sink требуется | sink-контракт согласован |

## Точки в коде (P1 facts, 2026-06-16)

| Факт | Путь |
|------|------|
| Humanize-ветка с `usedHumanize: true` при dictionary miss | [`labelDisplay.js:19-25`](../../../../../../../src/i18n/labelDisplay.js) |
| `formatLabelKeyWithMeta(t, key)` **не принимает `locale`** — P3 T03 должен протащить locale для `{label_key, locale}` | [`labelDisplay.js:19`](../../../../../../../src/i18n/labelDisplay.js) |
| Call sites: IssueCard, IssuePage (`formatLabelKeyWithMeta`); LabelsFilter (`formatLabelKey` → humanize) | [`IssueCard.jsx`](../../../../../../../src/components/IssueCard/IssueCard.jsx), [`IssuePage.jsx`](../../../../../../../src/pages/IssuePage.jsx), [`LabelsFilter.jsx`](../../../../../../../src/components/Filters/LabelsFilter.jsx) |
| Privacy: «No cookies / No analytics» | [`i18n-architecture.md:244-249`](../../../../../../i18n-architecture.md) |
| Env precedent `VITE_GATEWAY_BASE_URL` | [`issueService.js:31`](../../../../../../../src/services/issueService.js) |
| Телеметрии в `spa-app/src/**` — 0 модулей | grep 2026-06-16 |
| Gateway sink `POST /telemetry/label-misses` | [`asgi_app.py:414`](../../../../../../../doge-complaints-gateway/src/core/api/asgi_app.py), [`handlers.py:432`](../../../../../../../doge-complaints-gateway/src/core/api/handlers.py) |

## Acceptance Criteria

- [x] Privacy-раздел `i18n-architecture.md` обновлён и явно описывает, что собирается (анонимно) и что — нет.
- [x] При humanize-miss эмитится `POST /telemetry/label-misses {label_key, locale}`, без PII/куки.
- [x] Транспорт за абстракцией; адрес sink — из env; при отсутствии адреса или ошибке — тихий no-op.
- [x] Privacy-тумблер (env): при выключенной телеметрии — полный no-op (ничего не уходит в сеть).
- [x] Повторный `{label_key, locale}` в рамках сессии не шлётся повторно (клиентский дедуп).
- [x] `npx vitest run` — green; тесты: событие на humanize-ветке; нет события при попадании в словарь; нет события при выключенном тумблере.

## Nested tasks

| Order | Task folder | Wave | Notes |
|---|---|---|---|
| 1 | [`task-spa-l10n-04-t01-privacy-governance-i18n-architecture`](./task-spa-l10n-04-t01-privacy-governance-i18n-architecture/README.md) | pkg-000006 | Governance gate + AC #1 |
| 2 | [`task-spa-l10n-04-t02-label-miss-telemetry-client`](./task-spa-l10n-04-t02-label-miss-telemetry-client/README.md) | pkg-000006 | Client transport, env, dedup, toggle |
| 3 | [`task-spa-l10n-04-t03-label-display-humanize-telemetry-emit`](./task-spa-l10n-04-t03-label-display-humanize-telemetry-emit/README.md) | pkg-000006 | Wire emit in labelDisplay |
| 4 | [`task-spa-l10n-04-t04-tests-label-miss-telemetry`](./task-spa-l10n-04-t04-tests-label-miss-telemetry/README.md) | pkg-000006 | Test coverage AC #6 |
| 5 | [`task-spa-l10n-04-t05-sync-doc-touchpoints-l10n04`](./task-spa-l10n-04-t05-sync-doc-touchpoints-l10n04/README.md) | pkg-000006 | Gap doc + REQ-BE + .env.example |
| 6 | [`task-spa-l10n-04-t06-story-acceptance-verification`](./task-spa-l10n-04-t06-story-acceptance-verification/README.md) | pkg-000006 | Story gate |
