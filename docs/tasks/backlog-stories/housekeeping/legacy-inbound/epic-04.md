# EPIC-04 — Identity & Authentication Layer

## Цель

Создать полный слой идентификации пользователя DOGEstonia для:

* login/signup
* phone verification
* GPT handoff
* protected actions
* session management

Без wallet и репутации.

---

# Story S04-1 — Login & Signup

## Цель

Создать единый вход в систему через email.

## Функциональные требования

* login
* signup
* magic link
* forgot password
* session restore
* session expired

## Mockups

### M21 — Login Screen

Default login screen

### M22 — Signup Screen

Default signup screen

### M23 — Magic Link Sent

Email sent state

### M24 — Auth Error States

Invalid credentials
Network error
Session expired

---

# Story S04-2 — GPT Verification Entry

## Цель

Поддержать вход пользователя из Custom GPT.

## Функциональные требования

Route:

/verify?context=custom_gpt

Система должна:

* определить наличие сессии
* отправить на login при необходимости
* продолжить verify flow

## Mockups

### M25 — GPT Entry Landing

### M26 — GPT Entry Auth Required

### M27 — GPT Already Verified

### M28 — GPT Ready To Return

---

# Story S04-3 — Phone Verification Flow

## Цель

Подтвердить уникальность пользователя.

## Функциональные требования

* disclosure
* phone input
* OTP input
* resend timer
* verification success

## Mockups

### M29 — Verification Disclosure

### M30 — Phone Input

### M31 — OTP Input

### M32 — OTP Loading

### M33 — Verification Success

---

# Story S04-4 — Phone Verification Error States

## Цель

Покрыть все backend ошибки.

## Функциональные требования

COUNTRY_NOT_ALLOWED
RATE_LIMITED
CODE_MISMATCH
CODE_EXPIRED
TOO_MANY_ATTEMPTS
PROVIDER_UNAVAILABLE
PROFILE_CONFLICT

## Mockups

### M34 — Country Not Supported

### M35 — Rate Limited

### M36 — Wrong Code

### M37 — Code Expired

### M38 — Too Many Attempts

### M39 — Provider Unavailable

### M40 — Phone Conflict

---

# Story S04-5 — Protected Action Gate

## Цель

Блокировать действия требующие verified account.

## Функциональные требования

* story submit gate
* save draft
* resume action

## Mockups

### M41 — Verification Required Gate

### M42 — Save Draft Before Verification

### M43 — Resume Action After Verification

---

# Story S04-6 — Session States

## Цель

Обработать жизненный цикл авторизации.

## Mockups

### M44 — Logged Out

### M45 — Session Expired

### M46 — Backend Unavailable

### M47 — Loading Session Restore
