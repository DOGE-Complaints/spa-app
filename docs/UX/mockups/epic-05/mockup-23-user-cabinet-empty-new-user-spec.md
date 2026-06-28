# Mockup 23 Spec — User Cabinet Empty / New User

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-User-Cabinet-empty-new-user.png`
**Version:** v1.0
**Status:** active SSOT for newly created account state
**Related docs:** `docs/UX/design-system.md`, `docs/UX/reusable-ui-components-architecture.md`, `docs/UX/identity-frontend-ux-requirements.md`

---

## 1) Что фиксирует мокап

Состояние пользовательского кабинета сразу после создания аккаунта.

Условия:

* пользователь успешно зарегистрирован;
* пользователь успешно авторизован;
* профиль существует;
* backend работает корректно;
* ошибок загрузки нет;
* пользователь ещё не взаимодействовал с системой.

Это первый визит нового пользователя в кабинет.

---

## 2) UX-смысл состояния

Пользователь должен сразу понять:

1. Аккаунт создан успешно.
2. Система работает корректно.
3. Кабинет активен.
4. Историй пока нет.
5. Wallet пока не подключён.
6. Репутации пока нет.
7. Следующим логичным шагом является участие в системе.

Состояние должно ощущаться как начало пути, а не как ошибка.

---

## 3) Что показано на мокапе

### Account

Карточка аккаунта содержит реальные данные.

Пример:

```text
Account

Email:
z***@example.com

Account Created:
Jun 14, 2026

Role:
Authenticated User

Account Status:
Active
```

---

### Civic Status

Состояние:

```text
Civic account not verified yet
```

Описание:

```text
Phone verification is required before submitting stories.
You can verify your account when you are ready.
```

Primary action:

```text
Verify Account
```

---

### Story Activity

Пустое состояние.

Заголовок:

```text
Story Activity
```

Сообщение:

```text
No stories submitted yet.
```

Описание:

```text
Your submitted stories will appear here.
```

Primary action:

```text
Go to Board
```

---

### Wallet

Состояние:

```text
Wallet not linked
```

Описание:

```text
Wallet signatures will be available later for proving authorship.
```

Action:

```text
Coming Later
```

Disabled.

---

### Civic Contributions

Состояние:

```text
No contribution records yet
```

Подразделы:

```text
Story Receipts
Contribution Records
Reputation
```

Все отображаются как empty state.

---

## 4) Empty State Strategy

Важно:

Это НЕ экран с большим центральным сообщением.

DOGEstonia остаётся dashboard-first системой.

Пользователь должен видеть структуру будущего кабинета.

Каждая секция отображается полностью, но показывает своё empty состояние.

---

## 5) Визуальные правила

Использовать:

* полноценный shell;
* реальные карточки;
* реальные секции;
* локальные empty states внутри секций.

Не использовать:

* giant welcome illustration;
* mascot;
* onboarding carousel;
* confetti;
* success celebration;
* gamification;
* social profile aesthetics.

---

## 6) Функциональный контракт

Backend может вернуть:

```json
{
  "phone_verified": false,
  "stories_count": 0,
  "drafts_count": 0,
  "wallet_connected": false,
  "receipts_count": 0,
  "contributions_count": 0
}
```

Все блоки должны корректно отображать нулевые значения.

---

## 7) Что НЕ фиксируется

* verification modal;
* OTP flow;
* story submission flow;
* wallet connection flow;
* receipts implementation;
* contribution calculations.

---

## 8) Трассировка в задачи

Primary:

```text
S04-1 — Profile Cabinet Shell
S04-3 — Civic Verification Status
S04-6 — Story Activity
S04-7 — Wallet Placeholder
S04-8 — Contribution Placeholder
```

Mockup:

```text
M23 — User Cabinet Empty / New User
```

---

## 9) Переходы состояний

Previous:

```text
Signup Success
First Login
Account Created
```

Current:

```text
New User Cabinet
```

Possible Next States:

```text
Verify Account → M32
Submit First Story → M45
Connect Wallet → future wallet flow
Receive First Receipt → future receipt states
```

---

## 10) Дизайнерская цель

Этот экран должен создавать ощущение:

```text
The system is ready.
You have just started.
Nothing is broken.
Nothing is missing.
Your civic activity has not begun yet.
```

То есть это состояние "нулевой истории", а не состояние "отсутствия данных".
