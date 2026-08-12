# STORY-SPA-ID-09 — Identity UI Localization (et/ru/en retrofit)

## Meta
- **Key:** `STORY-SPA-ID-09-identity-ui-localization`
- **Epic:** [EPIC-SPA-04 Identity & Auth](README.md) · **Волна 5 (L10N retrofit)**
- **Status:** Done (pkg-000020, 2026-06-29)
- **Severity:** 🔴 High (L10N) — весь identity-UI EN-only, не следует переключателю языка
- **Источник:** [l10n-coverage-identity-auth-2026-06-29.md](../../../analysis/l10n-coverage-identity-auth-2026-06-29.md); i18n-ядро [core.js](../../../../src/i18n/core.js) / [dictionaries.js](../../../../src/i18n/dictionaries.js) / [I18nProvider.jsx](../../../../src/i18n/I18nProvider.jsx)

## Зачем простыми словами
Board/Issue локализованы через `useI18n()`+`t(key)`+`UI_DICTIONARY{et,ru,en}`, а **весь экран идентификации** (ID-01…05) написан на хардкод-английском (инлайн + локальные const-файлы). При смене языка identity остаётся EN. Эта стори **выносит все строки в словарь** и даёт переводы на 3 языка (et/ru/en) — **переводы готовы здесь** (§Translations), исполнение = механическая разводка по `t()`.

## Scope (фактические точки выноса)
| Откуда | Файлы |
|--------|-------|
| ID-01 | [LoginPage.jsx](../../../../src/pages/LoginPage.jsx), [mapAuthError.js](../../../../src/auth/mapAuthError.js) (AUTH_ERROR_MESSAGES) |
| ID-02 | [SessionShellPanels.jsx](../../../../src/components/SessionShellState/SessionShellPanels.jsx), [SessionShellOverlay.jsx](../../../../src/components/SessionShellState/SessionShellOverlay.jsx), [AppShell.jsx](../../../../src/components/AppShell/AppShell.jsx) |
| ID-03 | [CivicStatusCard.jsx](../../../../src/components/CivicStatus/CivicStatusCard.jsx), [civicStatusLabels.js](../../../../src/components/CivicStatus/civicStatusLabels.js) |
| ID-04 | [PhoneVerificationFlow.jsx](../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx), DisclosurePanel/PhoneInputPanel/OtpPanel/ProcessingPanel/SuccessPanel, [phoneVerificationLabels.js](../../../../src/components/PhoneVerification/phoneVerificationLabels.js), валидхинты в [verificationFlowState.js](../../../../src/auth/verificationFlowState.js) |
| ID-05 | [PhoneVerificationErrorState.jsx](../../../../src/components/PhoneVerification/PhoneVerificationErrorState.jsx), [phoneVerificationErrorLabels.js](../../../../src/components/PhoneVerification/phoneVerificationErrorLabels.js) |
| хосты | [VerifyPage.jsx](../../../../src/pages/VerifyPage.jsx), [DashboardPage.jsx](../../../../src/pages/DashboardPage.jsx) |

## Функциональные требования (FR)
- **FR-09.1** Каждая user-facing строка identity-UI выводится через `t('key')`; **нет** английских литералов в JSX/const-файлах (кроме технических: `data-testid`, error-`code`, `trace_id`, endonym'ы, `SYNCED`).
- **FR-09.2** Ключи добавлены в `UI_DICTIONARY` для **всех трёх** локалей (et/ru/en) — см. §Translations (SSOT переводов этой стори).
- **FR-09.3** Компоненты получают `t` через `useI18n()` (или проп `t`, как в существующих фильтрах) — без отдельной i18n-системы (no fragmentation).
- **FR-09.4** Канон-инварианты сохранены: EN-значения civic-лейблов (FR-03.3) не подменяются синонимами; disclosure EN = DOC-IDS-ONB-02; **запрещённые термины** (`KYC`/`government identity check`/`bank verification`/`legal identity`) отсутствуют **во всех** языках (расширить `findForbiddenVerificationTerm`-guard на ru/et).
- **FR-09.5** Интерполяция (счётчики/таймеры): ключи с плейсхолдерами (`{n}`, `{seconds}`, `{prefix}`, `{status}`) + хелпер подстановки, либо «label-key + значение» — без конкатенации языконезависимых кусков.
- **FR-09.6** Переключение локали (et/ru/en) меняет весь identity-UI; дефолт `et`; смена языка на `/login`/`/verify`/`/dashboard` отражается немедленно.
- **FR-09.7** Vitest: ключи существуют во всех 3 словарях (нет промахов `t()`), нет запрещённых терминов, snapshot ключевых экранов на ru/et.

## Routes / API
- Не добавляет роутов/эндпоинтов. Только presentation-слой (`UI_DICTIONARY` + `t()`); контракты `/me`,`/auth/phone/*` не затронуты.

## Зависимости
- Ретрофит уже построенных [ID-01](STORY-SPA-ID-01-web-authentication.md)…[ID-05](STORY-SPA-ID-05-verification-error-states.md). Не блокирует ID-06/07/08 (те делают L10N сразу — см. их FR-блок «Локализация»).

## Вне scope
- Бьютификация (иконки, мелкие тексты) — post-MVP, отдельно.
- Локализация нативного date-picker'а (отдельный механизм).
- Серверные тексты SMS (формирует identity-backend).

## Acceptance Criteria (FR-уровень)
- [x] Все строки identity-UI идут через `t()`; grep по dirs identity на инлайн-литералы → чисто (кроме технических).
- [x] Ключи §Translations добавлены в `UI_DICTIONARY` для et/ru/en.
- [x] Смена локали меняет весь identity-UI (логин/session/civic/phone/errors/verify/dashboard).
- [x] Канон-инварианты сохранены; запрещённых терминов нет ни в одном языке.
- [x] `npx vitest run` — green; добавлены l10n-тесты (полнота ключей + forbidden-terms).

---

## Translations (SSOT — en / et / ru)

> Namespace-ключи (точечные). Технические значения (Estonia (+372) и т.п.) переводятся как UI-текст. Плейсхолдеры `{…}` — FR-09.5.

### `auth.*` (ID-01)
| key | en | et | ru |
|-----|----|----|----|
| auth.signIn.title | Sign In | Logi sisse | Вход |
| auth.signIn.desc | Access your DOGEstonia account. | Pääse oma DOGEstonia kontole. | Доступ к вашему аккаунту DOGEstonia. |
| auth.field.email | Email | E-post | Эл. почта |
| auth.field.password | Password | Parool | Пароль |
| auth.field.confirmPassword | Confirm Password | Kinnita parool | Подтвердите пароль |
| auth.rememberMe | Remember Me | Jäta mind meelde | Запомнить меня |
| auth.forgotPassword | Forgot Password | Unustasid parooli? | Забыли пароль? |
| auth.cta.createAccount | Create Account | Loo konto | Создать аккаунт |
| auth.magicLink | Magic Link → | Maagiline link → | Волшебная ссылка → |
| auth.signup.desc | Create a DOGEstonia account to participate. | Loo DOGEstonia konto, et osaleda. | Создайте аккаунт DOGEstonia, чтобы участвовать. |
| auth.signup.phoneLater | Phone verification happens later when required. | Telefoni kinnitamine toimub hiljem, kui vaja. | Подтверждение телефона произойдёт позже, когда потребуется. |
| auth.signup.signInInstead | Sign In Instead | Logi hoopis sisse | Войти вместо этого |
| auth.magicSent.title | Check Your Email | Kontrolli oma e-posti | Проверьте почту |
| auth.magicSent.desc | A sign-in link has been sent to your email address. | Sisselogimislink saadeti su e-posti aadressile. | Ссылка для входа отправлена на вашу почту. |
| auth.magicSent.emailSent | Email Sent | E-kiri saadetud | Письмо отправлено |
| auth.magicSent.expiresIn | Expires In | Aegub | Истекает через |
| auth.magicSent.resend | Resend Link | Saada link uuesti | Отправить ссылку снова |
| auth.magicSent.usePassword | Use Password Instead | Kasuta hoopis parooli | Войти по паролю |
| auth.forgot.title | Reset Password | Lähtesta parool | Сброс пароля |
| auth.forgot.desc | Enter your email and we'll send a reset link. | Sisesta e-post ja saadame lähtestamislingi. | Введите почту — пришлём ссылку для сброса. |
| auth.forgot.send | Send Reset Link | Saada lähtestamislink | Отправить ссылку для сброса |
| auth.forgot.backToLogin | Back To Login | Tagasi sisselogimisse | Назад ко входу |
| auth.forgot.neverAsk | We will never ask for your password. | Me ei küsi kunagi sinu parooli. | Мы никогда не спросим ваш пароль. |
| auth.error.title | Authentication Error | Autentimise viga | Ошибка аутентификации |
| auth.error.desc | We couldn't sign you in. Please try again. | Sisselogimine ebaõnnestus. Palun proovi uuesti. | Не удалось войти. Попробуйте снова. |
| auth.cta.tryAgain | Try Again | Proovi uuesti | Попробовать снова |
| auth.success.title | Welcome Back | Tere tulemast tagasi | С возвращением |
| auth.success.desc | Authentication successful. | Autentimine õnnestus. | Аутентификация успешна. |
| auth.success.sessionCreated | Session Created | Sessioon loodud | Сессия создана |
| auth.success.accountActive | Account Active | Konto aktiivne | Аккаунт активен |
| auth.cta.continue | Continue | Jätka | Продолжить |
| auth.success.whereTo | Where would you like to go? | Kuhu soovid minna? | Куда хотите перейти? |
| auth.footnote | Standalone web authentication — no GPT or story-draft context. | Iseseisev veebiautentimine — ilma GPT või loo-mustandi kontekstita. | Автономный веб-вход — без контекста GPT или черновика истории. |
| auth.errcode.invalid_credentials | Incorrect email or password. | Vale e-post või parool. | Неверная почта или пароль. |
| auth.errcode.network_error | Unable to contact DOGEstonia services. | DOGEstonia teenustega ei õnnestu ühendust luua. | Не удаётся связаться с сервисами DOGEstonia. |
| auth.errcode.rate_limited | Too many attempts. Please try again later. | Liiga palju katseid. Palun proovi hiljem. | Слишком много попыток. Попробуйте позже. |
| auth.errcode.magic_link_expired | This sign-in link has expired. | See sisselogimislink on aegunud. | Срок действия ссылки для входа истёк. |
| auth.errcode.account_not_found | No account exists for this email address. | Selle e-posti aadressiga kontot ei ole. | Аккаунт с такой почтой не найден. |

### `session.*` (ID-02)
| key | en | et | ru |
|-----|----|----|----|
| session.restoring.title | Restoring Session | Sessiooni taastamine | Восстановление сессии |
| session.restoring.desc | DOGEstonia is checking your secure session. | DOGEstonia kontrollib sinu turvalist sessiooni. | DOGEstonia проверяет вашу защищённую сессию. |
| session.restoring.status | Checking session | Sessiooni kontroll | Проверка сессии |
| session.loggedOut.title | Sign In Required | Sisselogimine on vajalik | Требуется вход |
| session.loggedOut.desc | Please sign in to access DOGEstonia. | Palun logi sisse, et DOGEstoniat kasutada. | Войдите, чтобы пользоваться DOGEstonia. |
| session.cta.signIn | Sign In | Logi sisse | Войти |
| session.cta.createAccount | Create Account | Loo konto | Создать аккаунт |
| session.continuePublic | Continue to public board | Jätka avaliku töölauaga | Перейти к публичной доске |
| session.expired.title | Session Expired | Sessioon aegus | Сессия истекла |
| session.expired.desc | Your session has expired. Please sign in again to continue. | Sinu sessioon on aegunud. Jätkamiseks logi uuesti sisse. | Сессия истекла. Войдите снова, чтобы продолжить. |
| session.expired.signInAgain | Sign In Again | Logi uuesti sisse | Войти снова |
| session.expired.returnPublic | Return To Public Board | Tagasi avalikule töölauale | Вернуться к публичной доске |
| session.expired.prevAction | Previous Action | Eelmine tegevus | Предыдущее действие |
| session.expired.waiting | Status: Waiting | Olek: ootel | Статус: ожидание |
| session.backend.title | DOGEstonia Services Temporarily Unavailable | DOGEstonia teenused on ajutiselt kättesaamatud | Сервисы DOGEstonia временно недоступны |
| session.backend.desc | We could not load DOGEstonia services right now. Please try again shortly. | Hetkel ei õnnestunud DOGEstonia teenuseid laadida. Proovi varsti uuesti. | Сейчас не удалось загрузить сервисы DOGEstonia. Повторите чуть позже. |
| session.cta.retry | Retry | Proovi uuesti | Повторить |
| session.viewStatus | View System Status | Vaata süsteemi olekut | Статус системы |
| session.network.title | Connection Problem | Ühenduse probleem | Проблема соединения |
| session.network.desc | We could not reach DOGEstonia. Check your connection and try again. | Me ei saanud DOGEstoniaga ühendust. Kontrolli ühendust ja proovi uuesti. | Не удалось связаться с DOGEstonia. Проверьте соединение и повторите. |
| session.statusReady | System status: {status} | Süsteemi olek: {status} | Статус системы: {status} |
| session.statusUnavailable | System status unavailable right now. | Süsteemi olek pole praegu saadaval. | Статус системы сейчас недоступен. |
| appShell.footer | DOGEstonia civic platform | DOGEstonia kodanikuplatvorm | Гражданская платформа DOGEstonia |

> `workspace`/`board` уже есть в словаре — переиспользовать.

### `civic.*` (ID-03) — EN-каноны лейблов фиксированы (FR-03.3)
| key | en | et | ru |
|-----|----|----|----|
| civic.label.notVerified | Civic account not verified yet | Kodanikukonto pole veel kinnitatud | Гражданский аккаунт ещё не подтверждён |
| civic.label.verified | Verified civic participant | Kinnitatud kodanik | Подтверждённый гражданский участник |
| civic.label.walletNotLinked | Wallet not linked | Rahakott pole ühendatud | Кошелёк не привязан |
| civic.unverified.title | Account Verification Required | Konto kinnitamine on vajalik | Требуется подтверждение аккаунта |
| civic.unverified.desc | Verify your phone number to participate in civic actions and submit stories. | Kinnita oma telefoninumber, et osaleda kodanikutegevustes ja esitada lugusid. | Подтвердите номер телефона, чтобы участвовать в гражданских действиях и подавать истории. |
| civic.unverified.cta | Verify Account | Kinnita konto | Подтвердить аккаунт |
| civic.unverified.takesMinute | Verification takes less than one minute. | Kinnitamine võtab vähem kui minuti. | Подтверждение займёт меньше минуты. |
| civic.available.title | Verification Required | Kinnitamine on vajalik | Требуется подтверждение |
| civic.available.desc | This action requires a verified civic account. | See tegevus nõuab kinnitatud kodanikukontot. | Это действие требует подтверждённого гражданского аккаунта. |
| civic.available.verifyContinue | Verify & Continue | Kinnita ja jätka | Подтвердить и продолжить |
| civic.cta.cancel | Cancel | Tühista | Отмена |
| civic.available.protectedAction | Protected Action | Kaitstud tegevus | Защищённое действие |
| civic.inProgress.title | Verification In Progress | Kinnitamine käib | Подтверждение выполняется |
| civic.inProgress.desc | Complete the verification process to activate your civic account. | Lõpeta kinnitamine, et aktiveerida oma kodanikukonto. | Завершите подтверждение, чтобы активировать гражданский аккаунт. |
| civic.inProgress.waiting | Waiting for confirmation | Ootan kinnitust | Ожидание подтверждения |
| civic.cta.continue | Continue | Jätka | Продолжить |
| civic.failed.title | Verification Failed | Kinnitamine ebaõnnestus | Подтверждение не удалось |
| civic.failed.desc | We could not complete account verification. Please try again. | Konto kinnitamist ei õnnestunud lõpetada. Palun proovi uuesti. | Не удалось завершить подтверждение аккаунта. Попробуйте снова. |
| civic.failed.retry | Retry Verification | Proovi kinnitamist uuesti | Повторить подтверждение |
| civic.failed.contactSupport | Contact Support | Võta ühendust toega | Связаться с поддержкой |
| civic.verified.title | Verified Civic Account | Kinnitatud kodanikukonto | Подтверждённый гражданский аккаунт |
| civic.verified.desc | Your account is verified and eligible for civic participation. | Sinu konto on kinnitatud ja sobib kodanikuosaluseks. | Ваш аккаунт подтверждён и допущен к гражданскому участию. |
| civic.verified.phoneConfirmed | Phone Confirmed | Telefon kinnitatud | Телефон подтверждён |
| civic.verified.dialPrefix | Dial Prefix: {prefix} | Suunakood: {prefix} | Код страны: {prefix} |
| civic.wallet.future | Wallet (future) | Rahakott (tulevikus) | Кошелёк (в будущем) |

### `phone.*` (ID-04)
| key | en | et | ru |
|-----|----|----|----|
| phone.flow.heading | Verify Your Civic Account | Kinnita oma kodanikukonto | Подтвердите гражданский аккаунт |
| phone.disclosure.title | One quick step — verify your phone | Üks kiire samm — kinnita oma telefon | Один быстрый шаг — подтвердите телефон |
| phone.disclosure.body | We ask for your phone number to keep DOGEstonia free of bots and bad actors, so the people you interact with are real. We currently support Estonian numbers (+372) only — this is part of how we protect the integrity of our ecosystem. Your number is stored only as a secure hash, never shown to others, and used once to confirm it's really you. | Küsime su telefoninumbrit, et hoida DOGEstonia botidest ja pahatahtlikest kasutajatest vaba ning et inimesed, kellega suhtled, oleksid päris. Praegu toetame ainult Eesti numbreid (+372) — nii kaitseme oma ökosüsteemi terviklikkust. Su number salvestatakse vaid turvalise räsina, seda ei näidata kunagi teistele ja kasutatakse üks kord, et kinnitada, et see oled tõesti sina. | Мы просим ваш номер, чтобы защитить DOGEstonia от ботов и недобросовестных пользователей — чтобы люди, с которыми вы взаимодействуете, были реальными. Сейчас мы поддерживаем только эстонские номера (+372) — так мы защищаем целостность экосистемы. Ваш номер хранится только в виде защищённого хэша, никогда не показывается другим и используется один раз, чтобы подтвердить, что это действительно вы. |
| phone.disclosure.sendCode | Send code | Saada kood | Отправить код |
| phone.disclosure.notNow | Not now | Mitte praegu | Не сейчас |
| phone.input.title | Enter Your Phone Number | Sisesta oma telefoninumber | Введите номер телефона |
| phone.input.desc | We will send a one-time code by SMS to confirm it is really you. | Saadame SMS-iga ühekordse koodi, et kinnitada, et see oled tõesti sina. | Мы отправим одноразовый код по SMS, чтобы подтвердить, что это вы. |
| phone.input.country | Country | Riik | Страна |
| phone.input.countryValue | Estonia (+372) | Eesti (+372) | Эстония (+372) |
| phone.input.phoneNumber | Phone Number | Telefoninumber | Номер телефона |
| phone.input.send | Send Verification Code | Saada kinnituskood | Отправить код подтверждения |
| phone.cta.back | Back | Tagasi | Назад |
| phone.otp.title | Enter Verification Code | Sisesta kinnituskood | Введите код подтверждения |
| phone.otp.desc | Enter the 6-digit code we sent to your phone. | Sisesta 6-kohaline kood, mille saatsime su telefonile. | Введите 6-значный код, отправленный на ваш телефон. |
| phone.otp.label | Verification code | Kinnituskood | Код подтверждения |
| phone.otp.resend | Resend code | Saada kood uuesti | Отправить код снова |
| phone.otp.resendIn | Resend code ({seconds}s) | Saada kood uuesti ({seconds}s) | Отправить код снова ({seconds}с) |
| phone.otp.changeNumber | Change number | Muuda numbrit | Изменить номер |
| phone.otp.verify | Verify | Kinnita | Подтвердить |
| phone.processing.title | Confirming Verification | Kinnitamine | Подтверждаем |
| phone.processing.desc | Please wait while we verify your account. | Palun oota, kuni kontot kinnitatakse. | Пожалуйста, подождите — подтверждаем аккаунт. |
| phone.success.title | Account Verified | Konto kinnitatud | Аккаунт подтверждён |
| phone.success.continue | Continue | Jätka | Продолжить |
| phone.failed.title | Verification Failed | Kinnitamine ebaõnnestus | Подтверждение не удалось |
| phone.failed.desc | We could not complete verification. Please try again. | Kinnitamist ei õnnestunud lõpetada. Palun proovi uuesti. | Не удалось завершить подтверждение. Попробуйте снова. |
| phone.failed.tryAgain | Try again | Proovi uuesti | Попробовать снова |
| phone.hint.empty | Enter your Estonian mobile number. | Sisesta oma Eesti mobiilinumber. | Введите ваш эстонский мобильный номер. |
| phone.hint.prefix | Only Estonian numbers (+372) are supported. | Toetatud on ainult Eesti numbrid (+372). | Поддерживаются только эстонские номера (+372). |
| phone.hint.digits | Enter 7–8 digits after +372. | Sisesta +372 järele 7–8 numbrit. | Введите 7–8 цифр после +372. |

### `phoneError.*` (ID-05)
| key | en | et | ru |
|-----|----|----|----|
| phoneError.country.title | Estonian numbers only | Ainult Eesti numbrid | Только эстонские номера |
| phoneError.country.msg | DOGEstonia currently supports phone verification for Estonian numbers (+372). | DOGEstonia toetab praegu telefoni kinnitamist ainult Eesti numbritele (+372). | DOGEstonia сейчас поддерживает проверку телефона только для эстонских номеров (+372). |
| phoneError.rateLimited.title | Please wait before requesting another code | Palun oota enne uue koodi küsimist | Подождите перед запросом нового кода |
| phoneError.rateLimited.msg | A verification code was sent recently. You can request a new one after the cooldown ends. | Kinnituskood saadeti hiljuti. Uue saad küsida pärast ooteaja lõppu. | Код был отправлен недавно. Запросить новый можно после окончания паузы. |
| phoneError.mismatch.title | Incorrect verification code | Vale kinnituskood | Неверный код подтверждения |
| phoneError.mismatch.msg | The code you entered does not match. Please check the SMS and try again. | Sisestatud kood ei sobi. Palun kontrolli SMS-i ja proovi uuesti. | Введённый код не совпадает. Проверьте SMS и попробуйте снова. |
| phoneError.expired.title | Verification code expired | Kinnituskood aegus | Код подтверждения истёк |
| phoneError.expired.msg | The code is no longer valid. Request a new code to continue. | Kood ei kehti enam. Jätkamiseks küsi uus kood. | Код больше недействителен. Запросите новый, чтобы продолжить. |
| phoneError.tooMany.title | Too many attempts | Liiga palju katseid | Слишком много попыток |
| phoneError.tooMany.msg | This verification attempt is locked. Start again to receive a new code. | See kinnituskatse on lukus. Alusta uuesti, et saada uus kood. | Эта попытка заблокирована. Начните заново, чтобы получить новый код. |
| phoneError.smsUnavailable.title | SMS service unavailable | SMS-teenus pole saadaval | SMS-сервис недоступен |
| phoneError.smsUnavailable.msg | We could not send a verification code right now. Please try again later. | Hetkel ei õnnestunud kinnituskoodi saata. Palun proovi hiljem uuesti. | Сейчас не удалось отправить код. Попробуйте позже. |
| phoneError.conflict.title | This number is already used | See number on juba kasutusel | Этот номер уже используется |
| phoneError.conflict.msg | This phone number is already connected to another DOGEstonia account. | See telefoninumber on juba seotud teise DOGEstonia kontoga. | Этот номер уже привязан к другому аккаунту DOGEstonia. |
| phoneError.signIn.title | Sign in required | Sisselogimine on vajalik | Требуется вход |
| phoneError.signIn.msg | Your session has expired. Please sign in again to continue verification. | Sinu sessioon on aegunud. Jätkamiseks logi uuesti sisse. | Сессия истекла. Войдите снова, чтобы продолжить подтверждение. |
| phoneError.connection.title | Connection problem | Ühenduse probleem | Проблема соединения |
| phoneError.connection.msg | We could not reach the verification service. Check your connection and try again. | Me ei saanud kinnitusteenusega ühendust. Kontrolli ühendust ja proovi uuesti. | Не удалось связаться с сервисом подтверждения. Проверьте соединение и повторите. |
| phoneError.action.joinWaitlist | Join Waitlist | Liitu ootelistiga | В лист ожидания |
| phoneError.action.useAnotherNumber | Use Another Number | Kasuta teist numbrit | Использовать другой номер |
| phoneError.action.resend | Resend Code | Saada kood uuesti | Отправить код снова |
| phoneError.action.tryAgain | Try Again | Proovi uuesti | Попробовать снова |
| phoneError.action.changeNumber | Change Number | Muuda numbrit | Изменить номер |
| phoneError.action.startAgain | Start Again | Alusta uuesti | Начать заново |
| phoneError.action.retry | Retry | Proovi uuesti | Повторить |
| phoneError.action.signIn | Sign In | Logi sisse | Войти |
| phoneError.action.signInToExisting | Sign in to Existing Account | Logi olemasolevasse kontosse | Войти в существующий аккаунт |
| phoneError.action.cancel | Cancel | Tühista | Отмена |
| phoneError.meta.cooldown | Cooldown timer: {timer} | Ooteaeg: {timer} | Таймер ожидания: {timer} |
| phoneError.meta.attempts | Attempts remaining: {n} | Katseid jäänud: {n} | Осталось попыток: {n} |

### `verifyPage.*` / `dashboard.*` (хосты)
| key | en | et | ru |
|-----|----|----|----|
| verifyPage.title | Phone Verification | Telefoni kinnitamine | Подтверждение телефона |
| verifyPage.subtitle | Verify your civic account to participate in protected actions. | Kinnita oma kodanikukonto, et osaleda kaitstud tegevustes. | Подтвердите гражданский аккаунт, чтобы участвовать в защищённых действиях. |
| verifyPage.alreadyVerified | Your phone is already verified. You can return to your dashboard. | Sinu telefon on juba kinnitatud. Võid naasta töölauale. | Ваш телефон уже подтверждён. Можете вернуться на панель. |
| dashboard.title | Civic Dashboard | Kodaniku töölaud | Гражданская панель |
| dashboard.subtitle | Your civic participation status and eligibility. | Sinu kodanikuosaluse olek ja sobivus. | Ваш статус и право на гражданское участие. |

> `verifyPage.waitlistHandoff` («Waitlist handoff (ID-07)») — dev-стаб, заменяется реальным экраном в [ID-07](STORY-SPA-ID-07-country-waitlist.md); не переводим.

---

*Слой 1 (FR). Переводы готовы (§Translations). Исполнение: разводка строк по `t()` + добавление ключей в `UI_DICTIONARY` (et/ru/en) + l10n-тесты.*
