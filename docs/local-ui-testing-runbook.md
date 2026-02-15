# Local UI Testing Runbook (EPIC-03)

## Цель

Единый персистентный документ: как локально запускать SPA, проверять UI по мокапам и где смотреть артефакты проверки.

---

## 1) Предусловия

- Node.js и npm установлены.
- Рабочая директория:
  - `/Users/eslinko/Development/Dogecomplaints/spa-app`
- Установлены зависимости:
  - `npm install`
- Для Puppeteer установлен браузер:
  - `npx puppeteer browsers install chrome`

---

## 2) Базовый локальный запуск

```bash
cd /Users/eslinko/Development/Dogecomplaints/spa-app
npm run dev
```

Роуты для проверки:
- `http://127.0.0.1:5173/#/board`
- `http://127.0.0.1:5173/#/issue/DE-042`

---

## 2.1 Полноценный ручной запуск в браузере (для личного тестирования)

Если ты хочешь сама пройти весь SPA руками как пользователь:

1. Запусти dev-сервер:

```bash
cd /Users/eslinko/Development/Dogecomplaints/spa-app
npm run dev
```

2. Открой обычный браузер (Chrome/Safari/Firefox) и зайди на:
   - `http://127.0.0.1:5173/#/board`

3. Тестируй вручную UI-потоки:
   - shell (`header`, `sidebar`, `board columns`, `footer`);
   - статусы/бейджи;
   - переходы по hash-роутам (`/#/board`, `/#/issue/:id`);
   - визуальное соответствие мокапам (с допуском `10%`).

4. Если меняется код — обновляй страницу:
   - обычно Vite делает hot reload автоматически;
   - при сомнении сделай hard refresh.

5. Для проверки production-поведения (не dev):

```bash
npm run build
npm run preview
```

и открой URL, который покажет `vite preview` (обычно `http://127.0.0.1:4173` или `http://localhost:4173`).

---

## 3) Автотесты

### Unit + build

```bash
npm run test:run
npm run build
```

### Puppeteer smoke

```bash
npm run test:ui:board-shell
npm run test:ui:status-badge
npm run test:ui:epic03
```

---

## 4) Где смотреть результаты

- Общий отчет автопроверки:
  - `docs/analysis/EPIC-03-puppeteer-validation-report.md`
- Чеклист ручной приемки:
  - `docs/analysis/EPIC-03-personal-ui-validation-checklist.md`
- История запусков:
  - `docs/analysis/validation/epic03/run-history.md`
- Скриншоты:
  - `docs/analysis/validation/epic03/board-default-current.png`
  - `docs/analysis/validation/epic03/issue-details-current.png`

---

## 5) Критерии визуальной приемки

- Допуск по геометрии ключевых блоков: `<= 10%`.
- Небольшие отклонения AI-мокапов в деталях допустимы.
- Семантика и state-поведение обязаны совпадать с SSOT.

---

## 6) Частые проблемы и решения

### Не видно логотип

- Проверить, что файл реально существует на диске:
  - `spa-app/dist/assets/DOGEstonia-logo-big.png`
- Если файла нет, положить каноничный логотип в стабильную директорию проекта (рекомендуется `spa-app/public/assets/`) и обновить `src` в `BoardPage` на этот путь.
- Прогнать:
  - `npm run build`
  - `npm run test:ui:epic03`
- В отчете должен пройти check:
  - `Header logo image is loaded`.

### Не видно статус-бейджей

- Проверить наличие `.status-badge` в DOM через DevTools.
- Прогнать:
  - `npm run test:ui:status-badge`
- В отчете должны пройти checks:
  - `Status badge system renders 4 badges`
  - `VERIFIED badge has marker`
  - `IN_REVIEW enum is rendered as IN REVIEW label`

### Puppeteer не запускается (Chrome not found)

```bash
npx puppeteer browsers install chrome
```

---

## 7) Процесс для новой UI-задачи EPIC-03

1. Реализация UI-задачи.
2. Обновление Puppeteer-сценария (или добавление нового).
3. Прогон `npm run test:ui:epic03`.
4. Проверка отчета + скриншотов.
5. Ручная валидация по чеклисту.
