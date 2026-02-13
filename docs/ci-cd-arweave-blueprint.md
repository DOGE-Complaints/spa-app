# CI/CD Blueprint for SPA + Arweave

Этот документ фиксирует целевую схему CI/CD для `spa-app` с учетом текущей архитектуры:
- SPA = read-side frontend;
- deploy target = Arweave/permaweb;
- ключи и публикация отделены от обычного CI.

---

## 1. Цели

- Гарантировать качество сборки на каждом PR без доступа к Arweave-ключам.
- Публиковать в Arweave только из контролируемого release-контура.
- Исключить хранение wallet keyfile в репозитории.

---

## 2. Пайплайн-контуры

### 2.1 CI (PR/branch validation, без публикации)

Назначение: быстрая валидация кода и артефактов.

Шаги:
1. `npm ci`
2. `npm run test:run`
3. `npm run build`
4. Проверка static constraints:
   - hash routing присутствует;
   - нет внешних CDN/analytics ссылок в `index.html`/`dist`.
5. Публикация `dist/` как CI artifact (для review, не для прод deploy).

Политика:
- Нет секретов Arweave.
- Нет вызовов `npm run deploy`.

---

### 2.2 CD (release publish в Arweave)

Назначение: публикация проверенного `dist` в Arweave и фиксация `txid`.

Триггеры (рекомендуемо):
- `workflow_dispatch` (ручной запуск),
- release tag,
- merge в `main` + required approval.

Шаги:
1. `npm ci`
2. `npm run test:run`
3. `npm run build`
4. Подготовка wallet во временной среде runner:
   - взять секрет (JSON/encoded) из CI secret store,
   - записать во временный файл,
   - выставить `ARWEAVE_WALLET_PATH` на этот файл.
5. `npm run deploy`
6. Считать `txid` из вывода и сохранить как deployment metadata:
   - release notes / job summary / persistent log.

Политика:
- Секреты не пишутся в репозиторий и не печатаются в лог целиком.
- Job должен падать, если `txid` не получен.

---

## 3. Секреты и безопасность

- Не хранить `arweave-wallet.json` в репо.
- Предпочтительно отдельный deploy-wallet для SPA публикаций.
- Минимизировать права и баланс ключа по operational policy.
- Использовать masked secrets и short-lived workspace files в CI.

Рекомендованные секреты:
- `ARWEAVE_WALLET_JSON` (или base64-версия),
- опционально `ARWEAVE_USE_BUNDLER`,
- опционально `ARWEAVE_BUNDLER_NODE`.

---

## 4. Минимальные quality gates

Перед publish:
- `npm run test:run` PASS.
- `npm run build` PASS.
- Проверка no-CDN/no-analytics для SPA artifact.

После publish:
- Получен валидный `txid`.
- URL `https://arweave.net/<txid>` отвечает.
- Smoke check роутов:
  - `#/board`
  - `#/issue/42`

---

## 5. Release record (обязательно)

Каждый deploy фиксируется в persistent логе (или release summary):
- дата/время,
- commit SHA,
- `txid`,
- URL,
- кто запустил deploy,
- статус smoke checks.

---

## 6. MVP vs Next

### MVP (текущий этап)
- Допустим ручной deploy оператором (`npm run deploy` локально).
- CI работает только как quality gate.

### Next step
- Включить gated CD job с manual approval.
- Автоматически писать release record после publish.

---

## 7. Связанные документы

- `docs/deploy-arweave.md`
- `docs/EPIC-02-execution-log.md`
- `docs/EPIC-02-documentation-map.md`
