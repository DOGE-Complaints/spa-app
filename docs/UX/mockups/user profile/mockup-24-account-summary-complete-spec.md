# Mockup 24 Spec — Account Summary Block / Complete

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Account-Summary-complete.png`
**Version:** v1.0
**Status:** active SSOT for populated account summary component
**Related docs:** `docs/UX/design-system.md`, `docs/UX/reusable-ui-components-architecture.md`, `docs/UX/identity-frontend-ux-requirements.md`

---

## 1) Что фиксирует мокап

Полностью заполненный блок Account Summary.

Это НЕ отдельный экран.

Это переиспользуемый UI-компонент кабинета пользователя.

Компонент отображает основные сведения об аккаунте после успешной загрузки профиля.

---

## 2) UX-смысл компонента

Пользователь должен сразу понимать:

* аккаунт существует;
* авторизация успешна;
* профиль загружен корректно;
* данные аккаунта доступны;
* это техническая информация об аккаунте, а не социальный профиль.

---

## 3) Тип компонента

Рекомендуемый React-компонент:

```tsx
<AccountSummary />
```

Использование:

```text
User Cabinet
Admin View
Support Tools
Future Account Settings
```

---

## 4) Отображаемые поля

### Email

Пример:

```text
z***@example.com
```

Email является главным идентификатором аккаунта.

---

### Account Created

Пример:

```text
Jun 14, 2026
```

Дата создания аккаунта.

---

### Role

Пример:

```text
Authenticated User
```

На текущем этапе MVP.

В будущем возможны:

```text
Authenticated User
Moderator
Administrator
Support
```

---

### Account Status

Пример:

```text
Active
```

Возможные будущие состояния:

```text
Active
Pending
Suspended
Archived
```

---

## 5) Визуальные правила

Компонент должен выглядеть как системная карточка.

Использовать:

* иконки рядом с полями;
* строгую табличную структуру;
* одинаковый ритм строк;
* нейтральную визуальную подачу.

Не использовать:

* аватар пользователя;
* обложки;
* социальные метрики;
* фотографии;
* персональные украшения профиля.

---

## 6) Источник данных

Ожидается получение данных из:

```http
GET /me
```

или

```http
GET /profile
```

в зависимости от итогового backend контракта.

---

## 7) Пример данных

```json
{
  "email": "z***@example.com",
  "created_at": "2026-06-14T10:22:00Z",
  "role": "authenticated_user",
  "status": "active"
}
```

---

## 8) Обработка отсутствующих данных

Если отдельные поля отсутствуют:

* компонент продолжает отображаться;
* отсутствующее поле показывает placeholder;
* ошибка не должна ломать весь кабинет.

Пример:

```text
Email
Not Available
```

---

## 9) Что НЕ фиксируется

* phone verification;
* wallet status;
* receipts;
* reputation;
* contribution history;
* profile editing;
* account settings.

Эти области имеют собственные компоненты.

---

## 10) Трассировка в задачи

Primary:

```text
S04-2 — Account Summary Block
```

Mockup:

```text
M24 — Account Summary Block / Complete
```

Component:

```text
AccountSummary
```

---

## 11) Дизайнерская цель

Компонент должен создавать ощущение:

```text
This account exists.
It is authenticated.
It is operational.
```

Не социальный профиль.

Не персональная страница.

А техническая карточка гражданского аккаунта внутри DOGEstonia.
