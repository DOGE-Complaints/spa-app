# 14. i18n — Identity Strings

> **Статус:** НЕ реализовано. Spec для добавления новых ключей в `src/i18n/dictionaries.js`.
> **Предусловие:** Существующий `UI_DICTIONARY` (файл `src/i18n/dictionaries.js`) — структура `{ et, ru, en }`.
> **Связь:** Используется во всех файлах 06–13.

---

## Принцип добавления

Добавить ключи в каждую из трёх языковых секций существующего `UI_DICTIONARY` объекта.
Структура: вложенные объекты `identity`, `common` (дополнение к существующему `common.retry`).

**Canonical языковой приоритет:** EN-текст — единственный зафиксированный в FR. ET и RU — переводы, требуют ревью носителей языка (отмечены `[REVIEW]`).

---

## Блок для добавления в `UI_DICTIONARY.et`

```javascript
// Добавить в et: { ... } — рядом с существующими ключами
common: {
  loading: 'Laadimine...',
  retry: 'Proovi uuesti',
},

identity: {
  status: {
    verified: 'Kinnitatud kodanikuosaline',          // [REVIEW] "Verified civic participant"
    unverified: 'Kodanikukonto kinnitamata',          // [REVIEW] "Civic account not verified yet"
  },

  login: {
    title: 'Liitu DOGEstoniaga',                     // [REVIEW] "Join DOGEstonia"
    email: 'E-post',
    password: 'Parool',
    submit: 'Logi sisse',
    checkEmail: 'Kontrolli oma e-posti',             // [REVIEW]
    magicLink: 'Saada maagiline link',               // [REVIEW]
    switchSignup: 'Registreeru',
    switchLogin: 'Logi sisse',
  },

  signup: {
    submit: 'Registreeru',
  },

  prompt: {
    title: 'Kinnita oma kodanikukonto',              // [REVIEW]
    body: 'DOGEstonia kasutab Eesti eID-d üksnes selleks, et kinnitada, et üks kodanikukonto kuulub ühele reaalsele inimesele.',
    // [REVIEW]
    assurance1: 'Sinu juriidilist isikut ei kuvata avalikult.',     // [REVIEW]
    assurance2: 'Sinu isikukoodi ei salvestata loetaval kujul.',    // [REVIEW]
    assurance3: 'Plokiahelasse ei kirjutata ühtegi isikuandmeid.',  // [REVIEW]
    cta: 'Kinnita Eesti eID-ga',                     // [REVIEW]
  },

  verify: {
    successTitle: 'Sinu kodanikukonto on kinnitatud.',               // [REVIEW]
    successBody: 'Nüüd saad esitada lugusid ja osaleda kinnitatud kodanikuosalisena.', // [REVIEW]
    returnToGpt: 'Sinu konto on kinnitatud. Nüüd saad naasta ChatGPT-sse ja proovida lugu uuesti esitada.', // [REVIEW]
    goToDashboard: 'Mine töölaudale',
  },

  dashboard: {
    title: 'Sinu kodanikukonto',                     // [REVIEW]
    civicStatus: 'Kodanikustaatus',                  // [REVIEW]
    unverifiedDescription: 'Sa saad DOGEstoniat sirvida, kuid lugude esitamine nõuab ühekordset eID kinnitust.',  // [REVIEW]
    verifyCta: 'Kinnita vajaduse korral',             // [REVIEW]
    verifiedDescription: 'Sinu konto saab esitada lugusid ja osaleda kodaniksignaalides.',  // [REVIEW]
    gptHint: 'Lood esitatakse DOGEstonia Custom GPT kaudu.',         // [REVIEW]
    walletPlaceholder: 'Rahakoti allkirjad lisatakse hiljem, et krüptograafiliselt tõestada iga loo autorlusust. Praegu kaitseb eID kinnitus varast võrku botide ja dubleerivate kodanikukontode eest.', // [REVIEW]
  },

  profile: {
    anonymous: 'Anonüümne',
    joinedAt: 'Liige alates {{date}}',
  },

  oauth: {
    title: 'ChatGPT soovib ligipääsu sinu DOGEstonia kontole',       // [REVIEW]
    description: 'See lubab DOGEstonia Custom GPT-l esitada sinu nimel kodanikulugusid.',  // [REVIEW]
    scopeProfileRead: 'Loe sinu kodanikuprofiili ja kinnitusstaatust',  // [REVIEW]
    scopeStoriesDraft: 'Loo lugude mustandeid',                       // [REVIEW]
    scopeStoriesCreate: 'Esita kinnitatud kodanikulugusid',           // [REVIEW]
    allow: 'Luba',
    deny: 'Keeldu',
  },

  error: {
    generic: 'Midagi läks valesti. Palun proovi uuesti.',
    verificationFailed: 'Kinnitamise käigus läks midagi valesti. Palun proovi uuesti.',  // [REVIEW]
    rateLimitExceeded: 'Liiga palju katseid. Palun proovi hiljem uuesti.',               // [REVIEW]
    conflictTitle: 'See eID on juba seotud teise DOGEstonia kontoga.',                   // [REVIEW]
    conflictBody: 'Turvalisuse huvides ei saa me ühte eID-d automaatselt mitme kodanikukontoga siduda.', // [REVIEW]
    contactSupport: 'Võta ühendust toega',            // [REVIEW]
    signOutAndSwitch: 'Logi välja ja kasuta teist kontot',  // [REVIEW]
    tryAgain: 'Proovi uuesti',
    profileLoadFailed: 'Profiili ei saanud laadida.',  // [REVIEW]
    alreadyVerified: 'Konto on juba kinnitatud.',      // [REVIEW]
    invalidOauthRequest: 'See autoriseerimispäring on kehtetu või aegunud.',  // [REVIEW]
  },
},
```

---

## Блок для добавления в `UI_DICTIONARY.ru`

```javascript
// Добавить в ru: { ... }
common: {
  loading: 'Загрузка...',
  retry: 'Повторить',
},

identity: {
  status: {
    verified: 'Подтверждённый гражданский участник',
    unverified: 'Гражданский аккаунт не подтверждён',
  },

  login: {
    title: 'Присоединиться к DOGEstonia',
    email: 'E-mail',
    password: 'Пароль',
    submit: 'Войти',
    checkEmail: 'Проверьте вашу почту',
    magicLink: 'Отправить магическую ссылку',
    switchSignup: 'Зарегистрироваться',
    switchLogin: 'Войти',
  },

  signup: {
    submit: 'Зарегистрироваться',
  },

  prompt: {
    title: 'Подтвердите гражданский аккаунт',
    body: 'DOGEstonia использует эстонский eID только для того, чтобы убедиться, что один гражданский аккаунт принадлежит одному реальному человеку.',
    assurance1: 'Ваша юридическая личность не отображается публично.',
    assurance2: 'Ваш личный код не хранится в читаемой форме.',
    assurance3: 'Никакие персональные данные не записываются в блокчейн.',
    cta: 'Подтвердить через эстонский eID',
  },

  verify: {
    successTitle: 'Ваш гражданский аккаунт подтверждён.',
    successBody: 'Теперь вы можете подавать истории и участвовать как подтверждённый гражданский участник.',
    returnToGpt: 'Аккаунт подтверждён. Теперь вы можете вернуться в ChatGPT и повторить отправку истории.',
    goToDashboard: 'Перейти в личный кабинет',
  },

  dashboard: {
    title: 'Ваш гражданский аккаунт',
    civicStatus: 'Гражданский статус',
    unverifiedDescription: 'Вы можете просматривать DOGEstonia, но для подачи историй необходима однократная верификация eID.',
    verifyCta: 'Подтвердить когда нужно',
    verifiedDescription: 'Ваш аккаунт может подавать истории и участвовать в гражданских сигналах.',
    gptHint: 'Истории подаются через DOGEstonia Custom GPT.',
    walletPlaceholder: 'Подписи кошелька будут добавлены позже для криптографического подтверждения авторства каждой истории. Сейчас верификация eID защищает раннюю сеть от ботов и дублирующих гражданских аккаунтов.',
  },

  profile: {
    anonymous: 'Аноним',
    joinedAt: 'Участник с {{date}}',
  },

  oauth: {
    title: 'ChatGPT запрашивает доступ к вашему аккаунту DOGEstonia',
    description: 'Это позволит DOGEstonia Custom GPT подавать гражданские истории от вашего имени.',
    scopeProfileRead: 'Читать ваш гражданский профиль и статус верификации',
    scopeStoriesDraft: 'Создавать черновики историй',
    scopeStoriesCreate: 'Подавать подтверждённые гражданские истории',
    allow: 'Разрешить',
    deny: 'Отказать',
  },

  error: {
    generic: 'Что-то пошло не так. Пожалуйста, попробуйте ещё раз.',
    verificationFailed: 'Во время верификации что-то пошло не так. Попробуйте ещё раз.',
    rateLimitExceeded: 'Слишком много попыток. Пожалуйста, попробуйте позже.',
    conflictTitle: 'Этот eID уже привязан к другому аккаунту DOGEstonia.',
    conflictBody: 'В целях безопасности мы не можем автоматически привязать один и тот же eID к нескольким гражданским аккаунтам.',
    contactSupport: 'Связаться с поддержкой',
    signOutAndSwitch: 'Выйти и использовать другой аккаунт',
    tryAgain: 'Попробовать снова',
    profileLoadFailed: 'Не удалось загрузить профиль.',
    alreadyVerified: 'Аккаунт уже подтверждён.',
    invalidOauthRequest: 'Этот запрос на авторизацию недействителен или истёк.',
  },
},
```

---

## Блок для добавления в `UI_DICTIONARY.en`

```javascript
// Добавить в en: { ... }
common: {
  loading: 'Loading...',
  retry: 'Retry',
},

identity: {
  status: {
    verified: 'Verified civic participant',           // CANONICAL — не менять
    unverified: 'Civic account not verified yet',    // CANONICAL — не менять
  },

  login: {
    title: 'Join DOGEstonia',
    email: 'Email',
    password: 'Password',
    submit: 'Log in',
    checkEmail: 'Check your email',
    magicLink: 'Send magic link',
    switchSignup: 'Sign up',
    switchLogin: 'Log in',
  },

  signup: {
    submit: 'Sign up',
  },

  prompt: {
    title: 'Verify your civic account',              // CANONICAL
    body: 'DOGEstonia uses Estonian eID only to confirm that one civic account belongs to one real person.',
    assurance1: 'Your legal identity is not shown publicly.',
    assurance2: 'Your personal code is not stored in readable form.',
    assurance3: 'No identity information is written to blockchain.',
    cta: 'Verify with Estonian eID',                 // CANONICAL
  },

  verify: {
    successTitle: 'Your civic account is verified.',
    successBody: 'You can now submit stories and participate as a verified civic participant.',
    returnToGpt: 'Your account is verified. You can now return to ChatGPT and retry submitting your story.',
    goToDashboard: 'Go to Dashboard',
  },

  dashboard: {
    title: 'Your Civic Account',
    civicStatus: 'Civic Status',
    unverifiedDescription: 'You can browse DOGEstonia, but story submission requires a one-time eID verification.',
    verifyCta: 'Verify when needed',                 // CANONICAL
    verifiedDescription: 'Your account can submit stories and participate in civic signals.',
    gptHint: 'Stories are submitted through DOGEstonia Custom GPT.',
    walletPlaceholder: 'Wallet signatures will be added later to prove authorship of each story cryptographically. For now, eID verification protects the early network from bots and duplicate civic accounts.',
  },

  profile: {
    anonymous: 'Anonymous',
    joinedAt: 'Member since {{date}}',
  },

  oauth: {
    title: 'ChatGPT wants to access your DOGEstonia account',
    description: 'This will allow DOGEstonia Custom GPT to submit civic stories on your behalf.',
    scopeProfileRead: 'Read your civic profile and verification status',
    scopeStoriesDraft: 'Create story drafts',
    scopeStoriesCreate: 'Submit verified civic stories',
    allow: 'Allow',
    deny: 'Deny',
  },

  error: {
    generic: 'Something went wrong. Please check your connection and try again.',
    verificationFailed: 'Something went wrong during verification. Please try again.',
    rateLimitExceeded: 'Too many attempts. Please try again later.',
    conflictTitle: 'This eID is already linked to another DOGEstonia account.',  // CANONICAL
    conflictBody: 'For safety, we cannot attach the same eID to multiple civic accounts automatically.',  // CANONICAL
    contactSupport: 'Contact support',
    signOutAndSwitch: 'Log out and use another account',
    tryAgain: 'Try again',
    profileLoadFailed: 'Could not load your profile.',
    alreadyVerified: 'Account is already verified.',
    invalidOauthRequest: 'This authorization request is invalid or has expired.',
  },
},
```

---

## Interpolation pattern

Существующий `useI18n` hook. Строки с `{{date}}` требуют interpolation — проверить что `t('key', { date: value })` поддерживается в `useI18n.js`. Если нет — реализовать простую замену:

```javascript
// Простая interpolation (если не реализована):
function t(key, params = {}) {
  let str = lookup(key)
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(`{{${k}}}`, v)
  }
  return str
}
```

---

## Ключи с пометкой `[REVIEW]`

Эстонские переводы требуют ревью носителем языка перед production-деплоем. Русские переводы — проверены контекстуально, но также рекомендуется ревью.

**CANONICAL ключи (не изменять без обновления FR):**
- `identity.status.verified` = `"Verified civic participant"`
- `identity.status.unverified` = `"Civic account not verified yet"`
- `identity.prompt.title` = `"Verify your civic account"`
- `identity.prompt.cta` = `"Verify with Estonian eID"`
- `identity.error.conflictTitle` = `"This eID is already linked to another DOGEstonia account."`
- `identity.error.conflictBody` = `"For safety, we cannot attach the same eID to multiple civic accounts automatically."`

---

## Acceptance Criteria

- [ ] Все новые i18n ключи добавлены в три языковые секции: `et`, `ru`, `en`
- [ ] Canonical EN строки (`identity.status.verified`, `identity.status.unverified`, `identity.prompt.cta`) совпадают точно с FR
- [ ] `common.loading` и `common.retry` добавлены или проверено что уже существуют
- [ ] `identity.profile.joinedAt` поддерживает interpolation `{{date}}`
- [ ] Запрещённые термины ("KYC", "Government identity check", "Legal identity login", "Bank verification") отсутствуют во всех языках
- [ ] Эстонские переводы помечены для ревью носителем языка
