# Mockup 02 Spec — Dashboard Issue Card

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-card.png`  
**Version:** v1.0  
**Status:** active SSOT for Issue Card (Board)  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Каноничный вид карточки issue на board в dark theme:
- иерархия контента карточки;
- структура полей (`id/status/title/labels/date`);
- визуальные правила для status badge и label chips;
- границы контента карточки и нижняя зона footer-card.

---

## 2) Канонические метрики карточки (desktop baseline)

- Холст мокапа: `1536x1024`.
- Визуальная ширина карточки: около `920..960px` на этом фрейме (референс-сцена, не board-column runtime width).
- Высота карточки: около `430..470px` (включая внутренний footer-card).
- Внутренний padding карточки: ориентир `24px` (допуск `20..28px`).
- Радиус карточки: `14..16px`.
- Разделители секций: тонкая линия `1px` с низкой контрастностью.

Важно: эти размеры задают **пропорции и ритм** компонента. В board-column runtime карточка будет уже, но с сохранением структуры, отступов и порядка блоков.

---

## 3) Структура карточки (сверху вниз)

1. **Meta row**
   - `Issue.id` (пример: `DE-042`).
   - `Issue.status` badge (пример: `NEW`).
   - Overflow menu affordance (`...`) справа.

2. **Title row**
   - `Issue.title` как главный текст карточки.
   - Длина ограничена (line clamp), без выхода за рамки.

3. **Labels row**
   - Chips: минимум один neutral (`type`) + акцентные (`labels`).
   - Все chips uppercase, компактная высота.

4. **Date row**
   - Bullet + `Issue.created_at` (формат human-readable).

5. **Card footer (внутри рамки карточки)**
   - Нейтральная подпись проекта:
     - `DOGEstonia — Decentralized Civic Issue Tracker`.

---

## 4) Визуальные токены карточки

Рабочие ориентиры (допуск ±8%):

- Card background: `#1a1a1f` .. `#25262c`.
- Border: `rgba(255,255,255,0.14..0.18)`.
- Текст primary: `#ececf0`.
- Текст secondary: `#9a9da6`.
- Accent yellow для приоритетных chips: `~#bea056`.
- Neutral chip: темный фон, светлый текст.
- Shadow: мягкая, нижняя, без glow-эффекта.

---

## 5) Field mapping (Issue -> UI card)

| Card элемент | Поле модели |
|---|---|
| `DE-042` | `Issue.id` |
| `NEW` badge | `Issue.status` |
| Основной заголовок | `Issue.title` |
| `COMPLAINT` chip | `Issue.type` |
| `BUREAUCRACY`, `INFRASTRUCTURE` chips | `Issue.labels[]` |
| `Feb 1, 2025` | `Issue.created_at?` |

Дополнительно:
- `description`, `arweave_txid`, `image_txid` в этой board-card версии не являются обязательным видимым блоком и могут идти во variant/expanded details.

---

## 6) Правила точности (Definition of Visual Match)

- Порядок блоков в карточке строго фиксирован.
- `id + status` читаются до title.
- Badge и chips не спорят с title по визуальному весу.
- Footer-card отделен линией и читается как вторичная зона.
- Никаких ярких/маркетинговых эффектов, только инженерный тон.

---

## 7) Важное уточнение по подписи вне карточки

На исходном мокапе есть дополнительная подпись `DOGEstonia — Decentralized Civic Issue Tracker` **вне области карточки**.

Правило интеграции:
- В рамках `IssueCard` учитываем только footer **внутри рамки карточки**.
- Внешнюю подпись трактуем как элемент экрана Board (низ страницы) и переносим в спецификацию `M01` как dashboard footer guideline.

---

## 8) Трассировка в задачи EPIC-03

- `task-implement-epic03-issue-card-fields` — основной runtime контракт карточки.
- `task-implement-epic03-branding-and-verified-ui` — бренд-тональность и microcopy footer.
- `task-implement-epic03-board-main-visual-parity` — согласование карточки с layout-shell.
