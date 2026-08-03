# Button system (DS-BTN) — гид для разработчика (spa-app)

> Практические правила: **какой `hierarchy` / `intent` выбрать** и как не плодить page-local кнопки.  
> **Полный contract (API, states, a11y, migration):** [design-system-buttons-spec.md](../UX/design-system-buttons-spec.md) (DS-BTN).  
> **Visual reference:** [design-system-buttons-spec.png](../UX/design-system-buttons-spec.png) (M134) — written spec побеждает артефакты картинки.  
> **Backlog:** [STORY-SPA-G10](../tasks/backlog-stories/design-foundation/STORY-SPA-G10-button-system-ds-btn.md).  
> **Цвета:** [G9 palette](../tasks/backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md) / [`tokens.css`](../../src/styles/tokens.css).

---

## 1. Принцип

```text
Function determines hierarchy.
Hierarchy determines appearance.
```

Не создавайте `SubmitStoryButton`, `LoginButton`, `RetryButton`.  
Используйте semantic API:

```tsx
import { Button, IconButton, ButtonGroup, MenuAction } from '../components/Button'
```

Пакет: [`src/components/Button/`](../../src/components/Button/) (G10 Done). Не добавляйте новые page-local `*-btn` CSS классы.

---

## 2. Hierarchy (визуальный вес)

| Hierarchy | Когда | Визуал (токены) |
|-----------|--------|-----------------|
| **primary** | Одно главное действие в регионе | Fill `--color-accent-primary` (`#F5A623`); **текст** `--doge-ink` или `--doge-bg` (не белый) |
| **secondary** | Важная альтернатива | Surface / border; текст `--color-text-primary` |
| **tertiary** | Низкий акцент, utility | Transparent; не выглядеть disabled |
| **link** | Inline-действие («Reset filters») | Accent/link text; underline per spec |

**Destructive** — отдельный флаг/intent, обычно на **secondary** оболочке (не primary fill). Log out в меню: destructive *style* без confirm modal v1 — см. PH-02 / spec §31.

На регион экрана — **один** primary.

---

## 3. Intent (поведение / иконка / a11y)

Intent **не** заменяет hierarchy. Примеры:

| Intent | Типичный UI |
|--------|-------------|
| `submit` / `commit` | Форма, создание |
| `continue` / `navigate` | Внутренний переход (`Link`/`href` internal) |
| `external` | GPT / внешний URL (`external`, `rel`, icon handoff) |
| `retry` / `reset` | Повтор запроса, сброс фильтров |
| `dismiss` / `cancel` | Закрыть / отмена |
| `destructive` | Удаление draft и т.п. |

Иконки: 16–20px, monochrome, только если несут смысл (spec §13).

---

## 4. Size и touch

| Size | Height |
|------|--------|
| small | 32px |
| medium | 40px (default) |
| large | 44–48px |

Mobile: primary часто `fullWidth`; min touch **44px** где требуется spec §33.

Не хардкодить fixed width под одну локаль — EN/ET/RU labels должны влезать.

---

## 5. States (обязательно)

| State | Правила |
|-------|---------|
| **Focus** | Видимое focus ring; keyboard TAB |
| **Loading** | Ширина стабильна; spinner; `aria-busy`; label «…ing» через `t()`; **блок повторного клика** |
| **Disabled** | Визуально + `disabled` / `aria-disabled`; не путать с tertiary |

---

## 6. Навигация

| Случай | Элемент |
|--------|---------|
| Действие без URL | `<button type="button|submit">` |
| Внутренний маршрут | Router `Link` / `href` internal (не `window` хак) |
| Внешний (DOGEstonia GPT) | `external` + env URL (`VITE_STORY_GPT_URL`); явный handoff |

---

## 7. Do / Don't

### Do

- Один primary на секцию.
- Labels = action verbs, sentence case; `t('…')`.
- External handoff показывать явно.
- Новые экраны / EPIC-SPA-09 CTA — только shared Button API.
- Цвета только из `tokens.css` (G9).

### Don't

- Несколько равных primary рядом.
- «OK» / «Click here» / «Done» без смысла.
- Белый мелкий текст на accent (`#F5A623`) — контраст ~2:1.
- Новые page-local классы вида `foo__btn--yellow`.
- Копировать жёлтый с PNG вместо `--color-accent-primary`.

---

## 8. Миграция легаси

Порядок (G10 / spec §41):

1. Foundation components + tokens  
2. Identity / handoff / cabinet CTAs  
3. Board / filters / public-home chrome  
4. Cleanup дублирующих CSS  

Временно: `<Button className="legacy-…">` только как transitional (spec §42).

**Исключение — filter chips (G10 T10):** dropdown-триггеры фильтров (`board-filter-trigger`), chip-remove (`board-filter-chip-remove`), panel toggle и search clear остаются raw `<button>` с локальным CSS в `Filters.css`. Не мигрировать на DS-BTN без отдельного chip/toggle spec.

**Исключение — combobox/listbox (G10 T11):** `PhoneVerification/CountrySelector.jsx` (trigger + `role="option"`) остаётся raw `<button>` — это listbox UX, не product CTA; не заменять на `MenuAction` (`role="menuitem"`).

Перед PR: `rg '<button' src --glob '*.jsx'` — новые product CTA без shared API = reject.

---

## 9. Тесты (минимум)

- Primary/secondary render + `hierarchy` class/attr  
- Loading блокирует повторный click  
- Icon-only требует accessible name  
- External рендерит корректный `rel`/`target`  
- MenuAction: Profile / Log out patterns  

Детали: spec §38–§40.

---

## 10. Куда смотреть дальше

| Вопрос | Документ |
|--------|----------|
| Полный props API | [design-system-buttons-spec.md](../UX/design-system-buttons-spec.md) §6–§17 |
| AC / QA | spec §43–§44 |
| Цвета бренда | [DOGEstonia_Color_Palette_v1.0_RU.md](../tasks/backlog-stories/design-foundation/DOGEstonia_Color_Palette_v1.0_RU.md) |
| i18n строк | [localization-developer-guide.md](localization-developer-guide.md) |
