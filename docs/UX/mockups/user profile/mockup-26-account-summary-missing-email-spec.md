# Mockup 26 Spec — Account Summary Block / Missing Email

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Account-Summary-missing-email.png`
**Version:** v1.0
**Status:** active SSOT for account summary without email data
**Related docs:** `docs/UX/design-system.md`, `docs/UX/reusable-ui-components-architecture.md`, `docs/UX/identity-frontend-ux-requirements.md`

---

## 1) Что фиксирует мокап

Состояние блока Account Summary, когда основной идентификатор аккаунта (email) недоступен.

Это отдельный сценарий от M25.

В M25 часть вторичных данных отсутствует.

В M26 отсутствует именно главный идентификатор аккаунта.

---

## 2) Зачем нужен этот сценарий

На практике возможны ситуации:

* backend временно не возвращает email;
* email ещё не синхронизирован;
* аккаунт создан через будущий внешний identity provider;
* данные повреждены;
* идёт миграция схемы данных;
* privacy policy запрещает возврат email в конкретном контексте.

Компонент должен корректно переживать такие случаи.

---

## 3) UX-смысл компонента

Пользователь должен понимать:

* аккаунт существует;
* профиль загружен;
* система работает;
* часть идентификационных данных недоступна;
* это не критическая ошибка.

Компонент не должен переходить в error state.

---

## 4) Тип компонента

React component:

```tsx
<AccountSummary />
```

State:

```tsx
missing-email
```

---

## 5) Отображаемые поля

### Email

Вместо значения:

```text
Not Available
```

или

```text
Unavailable
```

Рекомендуется использовать единый термин во всей системе.

---

### Account Created

Пример:

```text
Jun 14, 2026
```

---

### Role

Пример:

```text
Authenticated User
```

---

### Account Status

Пример:

```text
Active
```

---

## 6) Визуальные правила

Структура карточки должна оставаться идентичной M24.

Не допускается:

* удаление строки Email;
* скрытие поля Email;
* изменение высоты карточки;
* изменение сетки.

Поле Email остаётся видимым.

Изменяется только значение.

---

## 7) Визуальная подача отсутствующего email

Использовать:

```text
Email
Not Available
```

Стиль:

* muted gray
* вторичный текст
* без warning-цветов
* без error-цветов

Не использовать:

* красный цвет
* warning badge
* восклицательные знаки
* предупреждения

---

## 8) Источник данных

Пример backend ответа:

```json
{
  "created_at": "2026-06-14T10:22:00Z",
  "role": "authenticated_user",
  "status": "active"
}
```

Email отсутствует полностью.

Компонент обязан корректно отобразиться.

---

## 9) Fallback Strategy

Пример:

```ts
email ?? "Not Available"
```

Отсутствие email не должно ломать кабинет.

Не должно генерировать toast.

Не должно открывать error page.

---

## 10) Что НЕ фиксируется

* authentication errors;
* session errors;
* profile load errors;
* verification state;
* wallet state;
* contribution state;
* profile editing.

---

## 11) Трассировка в задачи

Primary:

```text
S04-2 — Account Summary Block
```

Mockup:

```text
M26 — Account Summary Block / Missing Email
```

Component:

```text
AccountSummary
```

State:

```text
missing-email
```

---

## 12) Переходы состояний

Possible Previous:

```text
Loading
```

Current:

```text
Missing Email
```

Possible Next:

```text
M24 — Account Summary Complete
M25 — Account Summary Minimal Data
```

---

## 13) Дизайнерская цель

Компонент должен создавать ощущение:

```text
The account exists.
The account is operational.
The email value is unavailable.
The system remains functional.
```

То есть отсутствие email воспринимается как деградация данных, а не как деградация системы.

---

## 14) Архитектурное замечание

M26 фактически задаёт общий паттерн для всей DOGEstonia UI.

Любое отсутствующее необязательное поле должно отображаться через единый fallback-механизм:

```text
Not Available
```

вместо:

```text
null
undefined
—
empty string
missing row
```

Это обеспечивает консистентность всего интерфейса.
