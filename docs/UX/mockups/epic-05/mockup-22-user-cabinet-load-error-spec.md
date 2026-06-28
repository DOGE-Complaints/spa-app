# Mockup 22 Spec — User Cabinet Load Error

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-User-Cabinet-load-error.png`
**Version:** v1.0
**Status:** active SSOT for profile data load failure state
**Related docs:** `docs/UX/design-system.md`, `docs/UX/reusable-ui-components-architecture.md`, `docs/UX/identity-frontend-ux-requirements.md`

---

## 1) Что фиксирует мокап

Состояние пользовательского кабинета, когда:

* пользователь успешно авторизован;
* routing работает корректно;
* shell приложения загружен;
* профильный экран открыт;
* backend не смог вернуть данные кабинета.

Это НЕ ошибка всего приложения.

Это ошибка загрузки конкретного набора данных.

---

## 2) UX-смысл состояния

Пользователь должен сразу понять:

1. Приложение работает.
2. Авторизация существует.
3. Навигация существует.
4. Проблема относится только к данным кабинета.
5. Ошибка может быть временной.
6. Доступна попытка повторной загрузки.

---

## 3) Что показано на мокапе

### Основная ошибка

Заголовок:

```text
Unable to load account data
```

Описание:

```text
We could not retrieve your profile information at this time.
Please try again.
```

---

### Действия

Primary:

```text
Retry
```

Secondary:

```text
Back to Board
```

---

### Technical Details

Показывается пример отображения backend ошибки.

Пример:

```text
PROFILE_LOAD_FAILED
```

Дополнительные детали:

```text
Profile aggregate endpoint returned an unexpected response.
```

---

### Error Variants Showcase

Нижний блок НЕ означает что все эти ошибки показываются одновременно.

Он существует исключительно как UX reference для дизайнеров и разработчиков.

На реальном экране отображается только одна ошибка.

Блок показывает примеры будущих состояний:

```text
SESSION_EXPIRED
AUTHENTICATION_REQUIRED
PROFILE_NOT_FOUND
BACKEND_UNAVAILABLE
NETWORK_ERROR
RATE_LIMITED
UNKNOWN_ERROR
```

---

## 4) Важное архитектурное решение

Данный мокап НЕ должен рассматриваться как уникальный экран кабинета.

Он задаёт глобальный шаблон отображения backend ошибок во всём DOGEstonia.

Рекомендуется реализовать единый компонент:

```text
<AppErrorState />
```

или

```text
<ErrorPanel />
```

который может переиспользоваться в любом разделе системы.

---

## 5) Рекомендуемый контракт компонента

Пример:

```ts
type AppErrorStateProps = {
  code: string
  title: string
  message: string
  details?: string
  actions?: Action[]
}
```

---

## 6) Планируемые error codes

На текущем этапе рекомендуется предусмотреть поддержку:

```text
AUTHENTICATION_REQUIRED
SESSION_EXPIRED
PROFILE_NOT_FOUND
PROFILE_LOAD_FAILED
BACKEND_UNAVAILABLE
NETWORK_ERROR
RATE_LIMITED
UNKNOWN_ERROR
```

Список может расширяться без изменения UX-компонента.

---

## 7) Визуальные правила

Не использовать:

* красные аварийные страницы;
* большие warning-иллюстрации;
* эмоциональные сообщения;
* "Oops!";
* "Something went wrong!";
* маркетинговый текст.

DOGEstonia использует инженерный стиль коммуникации.

Ошибка должна восприниматься как диагностическое состояние системы, а не как катастрофа.

---

## 8) Что НЕ фиксируется

* logout flow;
* login flow;
* phone verification flow;
* wallet flow;
* backend error mapping logic;
* telemetry;
* retry implementation.

---

## 9) Рекомендуемое переиспользование

Данный шаблон рекомендуется использовать для:

```text
Profile Load Error
Issue Details Load Error
Board Load Error
Wallet Load Error
Receipts Load Error
Contribution Load Error
Verification Service Error
OAuth Error
```

Тем самым создаётся единая система обработки ошибок по всему приложению.

---

## 10) Трассировка в задачи

Primary:

```text
S04-1 — Profile Cabinet Shell
M22 — User Cabinet Load Error
```

Future reuse:

```text
Global Error Handling Layer
Shared Error Components
Backend Error Mapping
App Error State Standardization
```

---

## 11) Переходы состояний

Previous:

```text
Login Success
Session Restore
Profile Refresh
```

Current:

```text
Profile Data Load Failed
```

Next:

```text
Retry → M21 User Cabinet Overview
Back to Board
Session Expired Flow
Authentication Flow
```
