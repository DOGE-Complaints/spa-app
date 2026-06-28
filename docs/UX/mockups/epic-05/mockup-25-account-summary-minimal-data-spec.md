# Mockup 25 Spec — Account Summary Block / Minimal Data

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Account-Summary-minimal-data.png`
**Version:** v1.0
**Status:** active SSOT for minimal account summary state
**Related docs:** `docs/UX/design-system.md`, `docs/UX/reusable-ui-components-architecture.md`, `docs/UX/identity-frontend-ux-requirements.md`

---

## 1) Что фиксирует мокап

Минимальную рабочую версию блока Account Summary.

Используется когда backend предоставляет только базовую информацию об аккаунте.

Это ожидаемое состояние для раннего MVP.

---

## 2) UX-смысл компонента

Пользователь должен понимать:

* аккаунт существует;
* авторизация успешна;
* данные загружены корректно;
* часть информации пока недоступна;
* отсутствие некоторых полей не является ошибкой.

Компонент должен выглядеть законченным даже при ограниченном наборе данных.

---

## 3) Тип компонента

React component:

```tsx
<AccountSummary />
```

State:

```tsx
minimal-data
```

---

## 4) Отображаемые поля

### Email

Пример:

```text
z***@example.com
```

Главный идентификатор аккаунта.

---

### Account Status

Пример:

```text
Active
```

---

### Поля отсутствуют

Следующие данные пока не получены:

```text
Account Created
Role
```

Для них показывается системный placeholder.

---

## 5) Отображение отсутствующих данных

Вместо пустого пространства использовать:

```text
Not Available
```

или

```text
Pending
```

в зависимости от итогового дизайн-системного решения.

Пример:

```text
Account Created
Not Available

Role
Not Available
```

---

## 6) Визуальные правила

Компонент должен выглядеть практически идентично M24.

Не допускается:

* изменение размеров карточки;
* исчезновение строк;
* скачки layout;
* перестройка сетки.

Даже отсутствующие поля должны занимать свои места.

---

## 7) Пример данных

Backend может вернуть:

```json
{
  "email": "z***@example.com",
  "status": "active"
}
```

Компонент обязан корректно отрендерить такой объект.

---

## 8) Fallback Strategy

Если поле отсутствует:

```ts
value ?? "Not Available"
```

Если поле существует:

```ts
render(value)
```

Компонент не должен переходить в error state.

---

## 9) Что НЕ фиксируется

* ошибки загрузки;
* loading state;
* verification status;
* wallet status;
* contribution data;
* profile editing.

---

## 10) Трассировка в задачи

Primary:

```text
S04-2 — Account Summary Block
```

Mockup:

```text
M25 — Account Summary Block / Minimal Data
```

Component:

```text
AccountSummary
```

State:

```text
minimal-data
```

---

## 11) Переходы состояний

Possible Previous:

```text
Loading
```

Current:

```text
Minimal Account Data Available
```

Possible Next:

```text
M24 — Account Summary Complete
M26 — Account Summary Missing Email
```

---

## 12) Дизайнерская цель

Компонент должен создавать ощущение:

```text
The account is valid.
The system is working.
Additional metadata is simply not available yet.
```

Отсутствие данных должно восприниматься как нормальное состояние развития продукта, а не как дефект системы.
