# Ручной UI smoke — Phone Verification Flow (ID-04)

> Простой чек-лист для ручной проверки фичи верификации телефона в браузере.
> Код: [PhoneVerificationFlow.jsx](../../src/components/PhoneVerification/PhoneVerificationFlow.jsx), хост [VerifyPage.jsx](../../src/pages/VerifyPage.jsx). Маршрут `/verify` (HashRouter → `#/verify`), **protected**.

---

## 0. Важно: нужна сессия

`/verify` — защищённый роут. Без активной Supabase-сессии экран перекрывается оверлеем **«Sign In Required»** (session-shell ID-02), и до флоу верификации не дойти. Сначала логин.

После изменения любых `VITE_*` в `.env` — **перезапустите** `npm run dev` (Vite вшивает env при старте).

---

## 1. Два режима окружения

| | **A — UI-only (SPA mock)** | **B — file E2E (identity + file sink)** |
|---|---------------------------|----------------------------------------|
| `VITE_IDENTITY_MOCK_MODE` | `true` | `false` |
| `doge-identity-service` | не нужен для phone API | нужен на `:8100` |
| `SMS_PROVIDER` (identity `.env`) | — | `file` (см. [runbook](../../../doge-identity-service/docs/runbook/sms-mock-testing.md)) |
| OTP откуда | любые 6 цифр (mock confirm в браузере) | `tail -f doge-identity-service/var/sms-outbox/<номер>.log` |
| Когда | Puppeteer, быстрый UI-smoke | ручной тест «как в проде» с JWT + file outbox |

Общие переменные (`spa-app/.env`):

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_IDENTITY_SERVICE_URL=http://127.0.0.1:8100
```

### Режим A — UI-only

```env
VITE_IDENTITY_MOCK_MODE=true
```

Запросы `POST /auth/phone/*` **не уходят** на identity — mock в [`identityService.js`](../../src/auth/identityService.js).

### Режим B — file E2E (рекомендуется для OTP из файла)

```env
VITE_IDENTITY_MOCK_MODE=false
```

Identity (отдельный терминал):

```bash
cd doge-identity-service && make dev
# .env: APP_PROFILE=demo, SMS_PROVIDER=file
tail -f var/sms-outbox/+37255551234.log   # подставьте свой номер E.164
```

Запуск SPA: `cd spa-app && npm run dev` → `http://localhost:5173`.

**Проверка, что запрос дошёл до identity:**

1. DevTools → Network → после «Send Verification Code» есть `POST http://127.0.0.1:8100/auth/phone/request` (200).
2. Терминал identity: строка `POST /auth/phone/request`.
3. Файл outbox: строка `Your Dogestonia verification code is XXXXXX.`

---

## 2. Тестовые данные

| Поле | Значение | Примечание |
|------|----------|-----------|
| Email/пароль | валидные в Supabase | логин |
| Телефон (локальные цифры) | `55551234` | → `+37255551234` (7–8 цифр после +372) |
| OTP (режим A) | `123456` | happy-path mock confirm |
| OTP (режим A, errors) | см. §4.1 | фикстуры ID-05 mock error kinds |
| OTP (режим B) | из outbox-файла | см. `tail -f var/sms-outbox/...` |

---

## 3. Шаги smoke (happy path)

1. **Логин.** `#/login` → войти → «Welcome Back» → Continue.
2. **Верификация.** `#/verify` — только панель M32 «Verify Your Civic Account» (без дублирующей `CivicStatusCard`). CTA «Verify Account» — на `/dashboard`.
3. **Disclosure → Send code** → экран ввода номера.
4. **Номер** `55551234` → **Send Verification Code** → OTP-экран (режим B: проверить Network + outbox).
5. **OTP** → **Verify** → **Account Verified** → **Continue** → `#/dashboard`, статус Verified.
6. **Повторный заход** `#/verify` → «Your phone is already verified…», флоу не запускается.

---

---

## 4.1 Error states (режим A — mock fixtures, ID-05)

`VITE_IDENTITY_MOCK_MODE=true`. После disclosure → Send code → ввод номера → **Send Verification Code** (или OTP → **Verify**).

| M37 kind | Действие | Ожидание UI |
|----------|----------|-------------|
| Wrong Code | номер `55555555` → OTP **`999999`** | «Incorrect verification code» + Attempts remaining |
| Code Expired | номер `55555555` → OTP **`888888`** | «Verification code expired» |
| Too Many Attempts | номер `55555555` → OTP **`777777`** | «Too many attempts» |
| Sign In Required | номер `55555555` → OTP **`666666`** | «Sign in required» |
| Session Expired | номер `55555555` → OTP **`555555`** | «Sign in required» (session_expired) |
| Country Not Allowed | локальные **`88888888`** → Send | «Estonian numbers only»; Join Waitlist → стаб ID-07 |
| Rate Limited | локальные **`77777777`** → Send | cooldown timer + disabled Resend |
| SMS Unavailable (send failed) | локальные **`66666666`** → Send | «SMS service unavailable» |
| Phone Conflict | локальные **`55555556`** → Send | «This number is already used» |
| Provider Unavailable | локальные **`44444444`** → Send | «SMS service unavailable» |
| Connection Problem | локальные **`33333333`** → Send | «Connection problem» |

Happy-path (без ошибки): номер `55555555` / `55551234` + OTP `123456`.

---

## 4.2 Быстрые негативные/граничные проверки (happy-path UI)

| Проверка | Действие | Ожидание |
|----------|----------|----------|
| Невалидный номер | `123` | «Enter 7–8 digits after +372», запрос не уходит |
| OTP < 6 | `12345` | **Verify** disabled |
| Resend cooldown | сразу Resend | заблокировано до 0 |
| Change number | на OTP | возврат к вводу номера |
| Not now | на disclosure | редирект `/dashboard` |

---

## 5. Privacy

- Полный номер и OTP **не** отображаются в UI после ввода.
- OTP не попадает в HTTP-ответ identity (только file outbox или SMS).
- В UI-текстах нет запрещённых терминов (`KYC`, …) — см. `phoneVerificationLabels.js`.

---

## 6. Автоматический аналог

- Vitest: `npm run test:run -- src/pages/__tests__/VerifyPage.test.jsx`
- Puppeteer error (CODE_MISMATCH): `npm run test:ui:verify-error`
- Puppeteer live (`:5173`, режим A + mock auth seed): `npm run test:ui:verify-host:live`
- Полный набор: `npm run test:run`

> `test:ui:verify-host:live` ожидает **режим A** (`VITE_IDENTITY_MOCK_MODE=true`) или mock auth + работающий identity для `/me`. Для file E2E используйте ручной чек-лист §1B.

> Две карточки на `/verify`: проверьте `data-verify-host="flow-only"`; иначе stale bundle — один vite на `:5173`, hard refresh.

> Реальная SMS: `VITE_IDENTITY_MOCK_MODE=false` + identity `SMS_PROVIDER=telnyx`.
