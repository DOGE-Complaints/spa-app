# UAT MVP Brief — DOGEstonia (product / strategy)

**Status:** persistent · стартовый brief для UAT-диалога  
**Аудитория:** человек, который **не** читает код — понимает продукт и стратегию  
**Язык проверок:** функциональные ожидания MVP (не pixel-perfect)  
**Связанные документы:**
- Карта URL: [spa-url-page-map.md](../spa-url-page-map.md)
- Шаблон findings: [UAT-FINDINGS-TEMPLATE.md](./UAT-FINDINGS-TEMPLATE.md)
- Product lock (public home): [PRODUCT-BRIEF.md](../tasks/backlog-stories/public-home/PRODUCT-BRIEF.md)
- Cabinet MVP mode: [STORY-SPA-CAB-api-requirements.md](../tasks/backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md)

**Visual expectations:** отдельный addendum готовит оператор (этот brief **не** задаёт pass/fail по пикселям, иконкам-заглушкам и «вкусу» chrome).

---

## 1. Для кого и как стартовать диалог

### Роли ревьюера (можно совмещать в одном прогоне)

| Роль | Фокус |
|------|--------|
| **Гость** | Публичная доска, How it works, Submit → GPT, без аккаунта |
| **Гражданин** | Login, кабинет, civic/verify, logout |
| **QA-lite** | Ломается ли заявленное FE-ожидание? Repro + severity |
| **UX** | Понятность, доверие, friction, «бесит, хотя работает» |
| **CPO** | Соответствует ли MVP-стратегии? Ship / fix-before-launch / post-MVP |

### Что даёт оператор перед сессией

1. `{SPA_ORIGIN}` — например `http://127.0.0.1:4173` или `https://….railway.app`
2. Тестовый email/password (не светить в findings)
3. Факт: настроен ли URL Custom GPT (Submit открывает GPT или «пустой» calm-fail)
4. Опционально Tier B: живой `draft_id` или доступ к Custom GPT для полного handoff
5. Ссылки: этот brief + [url-map](../spa-url-page-map.md) + (позже) ваш visual addendum

### Как открывать страницы

Приложение на **HashRouter**. Рабочие адреса всегда вида:

```text
{SPA_ORIGIN}/#/board
{SPA_ORIGIN}/#/how-it-works
{SPA_ORIGIN}/#/login
{SPA_ORIGIN}/#/profile
```

Без `#` путь вида `{SPA_ORIGIN}/board` **не** является маршрутом приложения.

**Не требуется:** читать `src/`, git, API docs. Достаточно браузера и этого brief.

---

## 2. Что это за платформа (1 экран)

**DOGEstonia** — civic-tech платформа: граждане видят публичные истории/issues (MVP-география: Tallinn / пилот), могут понять «как это работает», подать свою историю и вести аккаунт с civic-верификацией.

### Ключевое продуктовое решение MVP

**Историю не пишут формой внутри SPA.**  
Создание идёт через **Custom GPT** (внешний диалог). SPA:

- показывает публичную доску;
- ведёт в GPT («Submit a story»);
- принимает пользователя **обратно** с черновиком (`/story/submit?draft_id=…`) → login / phone verify при необходимости → подтверждение отправки;
- держит **кабинет** (профиль, civic-статус; часть блоков — заглушки «скоро»).

### Стратегия MVP (что доказываем)

Цепочка ценности:

**увидеть доску → понять модель → уйти в GPT подать историю → вернуться в SPA → увидеть себя в кабинете / civic**

Не цель MVP: маркетинговый landing, in-app редактор истории, wallet/web3, «социальная лента с метриками сообщества».

### Сознательно отложено (не fail «фичи нет»)

| Тема | Ожидание в UAT |
|------|----------------|
| In-app compose истории | Нет; только GPT |
| Wallet / web3 | Карточка stub + Coming soon |
| Contribution (receipts/records/reputation API) | UI + Coming soon |
| Live список «моих историй» в кабинете по HTTP | UI empty / Coming soon seams — **не** требовать живой список |
| Коллективные агрегаты / hero-landing | Вне scope |
| Pixel / artboard parity / замена stub-иконок | Visual addendum |

### Chrome, который можно не любить, но не считать QA-багом

**Левая колонка WORKSPACE** (Board / Profile / …) — часть текущего каркаса приложения и задел под будущее workspace.  
Для **функционального** UAT: не ставить Fail «лишнее меню».  
Для **UX / CPO**: можно и нужно писать dissatisfaction («мешает фокусу на public home», «хочу убрать для гостя») как debt / post-MVP — в findings template.

---

## 3. Границы этого UAT

| В scope (functional MVP) | Stub / вне scope (не Fail «нет фичи») | Visual (ваш addendum) |
|--------------------------|----------------------------------------|------------------------|
| Public home: шапка, футер, доска-лента, How it works, Submit → GPT | CAB Story / Wallet / Contribution = empty или Coming soon | Pixel, spacing, «не нравится sidebar» |
| Auth: login, logout, защита профиля | PH-07 (отдельная evidence-story) | Иконки-заглушки |
| Кабинет: Account + Civic live; страница грузится | | Artboard parity |
| Verify phone — если аккаунт позволяет | | |
| Handoff по `draft_id` — если оператор дал draft (**Tier A/B**) | Полный GPT Actions E2E без готового GPT = **Tier B only** | |
| Locale EN / ET / RU | | |
| Открытие issue с доски | | |

**Статусы пункта checklist:** `Pass` · `Fail` · `Blocked` · `N/A (deferred)` · `N/A (no draft / no GPT)`.

---

## 4. Функциональные ожидания (checklist)

Отмечайте результат в копии или в findings. ID стабильны — ссылайтесь на них в отчёте.

### 4.1 Public home / shell — FE-PH-*

| ID | Expected | How to check | Pass |
|----|----------|--------------|------|
| **FE-PH-01** | На публичных страницах виден бренд DOGEstonia и горизонтальная навигация (Dashboard / How it works / Submit a story) | Гость → `/#/board` | Бренд и пункты навигации узнаваемы и кликабельны |
| **FE-PH-02** | Гость: контроль аккаунта ведёт к входу. Авторизован: меню с Profile и Logout | Гость и после login | Состояния гость/авторизован различимы; logout доступен |
| **FE-PH-03** | Внизу страницы есть осмысленный футер (бренд + ссылки; часть ссылок может быть заглушкой `#`) | Проскроллить board | Футер есть, не «пустой обрыв» |
| **FE-PH-04** | `/#/board` — **лента** issues (не канбан-колонки), поиск/фильтры доступны, есть ощущение загрузки/результата | Гость на board | Лента или спокойное empty/error; фильтры не роняют страницу |
| **FE-PH-05** | `/#/how-it-works` — короткие шаги (порядка 3–5) + CTA | Открыть How it works | Страница объясняется без «пустого экрана» |
| **FE-PH-06** | Submit a story (nav и/или board и/или how-it-works) уводит во **внешний** Custom GPT, если URL настроен; если нет — спокойный no-op / `#`, без краша | Клик Submit; оператор заранее сказал, настроен ли GPT URL | Поведение согласовано с фактом env; приложение не падает |

### 4.2 Auth / session — FE-AUTH-*

| ID | Expected | How to check | Pass |
|----|----------|--------------|------|
| **FE-AUTH-01** | Можно войти email/password на `/#/login` | Валидные credentials | Успех → попадание в приложение (board/shell) |
| **FE-AUTH-02** | Logout возвращает к гостевому состоянию на публичной доске | Account → Logout | Снова Sign in / гостевой chrome |
| **FE-AUTH-03** | `/#/profile` без сессии не отдаёт «голый» кабинет: overlay / Sign in / уход на login | Выйти → открыть profile | Понятный блок доступа, не тихий пустой профиль «как будто залогинен» |

### 4.3 Issue — FE-ISSUE-*

| ID | Expected | How to check | Pass |
|----|----------|--------------|------|
| **FE-ISSUE-01** | С карточки на board можно открыть детали issue | Клик Open issue / карточка | Открывается `/#/issue/…`, контент читаем |
| **FE-ISSUE-02** | Chrome (шапка) остаётся ориентиром; можно вернуться к board | Nav / brand | Возврат на доску без «тупика» |

### 4.4 Cabinet — FE-CAB-*

| ID | Expected | How to check | Pass |
|----|----------|--------------|------|
| **FE-CAB-01** | После login `/#/profile` открывает кабинет (не краш / не вечный пустой белый экран) | Login → Profile | Страница Profile загрузилась |
| **FE-CAB-02** | Блок Account показывает поля вроде email (маскирование ок), даты создания, роли/статуса — или явный Not available | Смотреть Account | Данные или честный empty; без сырого PII-шока сверх маски |
| **FE-CAB-03** | Civic-статус отражает verified / needs verify; есть путь к Verify при необходимости | Смотреть Civic; при unverified — CTA | Статус понятен; CTA ведёт на verify-flow |
| **FE-CAB-04** | Story Activity: empty и/или Coming soon — **без краша**; CTA на board допустим | Смотреть Story | Нет ложного «список историй живой», если это stub-волна |
| **FE-CAB-05** | Wallet: stub / Coming later — без краша | Смотреть Wallet | Понятно, что позже |
| **FE-CAB-06** | Contribution layer: empty / Coming soon — без краша | Смотреть Contribution | Понятно, что слой заготовки |

### 4.5 Locale — FE-I18N-*

| ID | Expected | How to check | Pass |
|----|----------|--------------|------|
| **FE-I18N-01** | Переключатель языка предлагает EN / ET / RU | Открыть locale в шапке | Три опции видны |
| **FE-I18N-02** | Смена языка меняет ключевые подписи; после reload ощущение «язык сохранился» | Сменить → обновить страницу | Язык не сбрасывается без действия пользователя |

### 4.6 Verify (опционально по аккаунту) — FE-VERIFY-*

| ID | Expected | How to check | Pass |
|----|----------|--------------|------|
| **FE-VERIFY-01** | Из Civic / Dashboard можно попасть на `/#/verify` | CTA Verify | Экран верификации открывается |
| **FE-VERIFY-02** | Flow телефона понятен или честно блокирует (страна / waitlist) без краша | Пройти сколько возможно без риска SMS-стоимости, если оператор просит | Нет silent fail; ошибки читаемы |

Если SMS/verify нельзя трогать — `N/A` + комментарий.

### 4.7 Story handoff из GPT — FE-HANDOFF-*

**Tier A** — оператор дал готовую ссылку `/#/story/submit?draft_id=…`  
**Tier B** — полный путь: Custom GPT → stash → redirect (нужен настроенный GPT)

| ID | Expected | How to check | Pass |
|----|----------|--------------|------|
| **FE-HANDOFF-01** | С `draft_id` и сессией виден preview черновика (не вечный spinner без исхода) | Tier A URL | Preview или понятный expired/error |
| **FE-HANDOFF-02** | Без сессии — путь к login и **возврат** к submit с тем же черновиком | Logout → открыть draft URL → login | После login снова handoff, не «потеряли draft» без объяснения |
| **FE-HANDOFF-03** | Успешный submit уводит в кабинет / осмысленный success-путь | Подтвердить отправку (если draft живой) | Нет «чёрной дыры» после submit |
| **FE-HANDOFF-04** | Просроченный/уже отправленный draft — спокойное expired/empty + возможность открыть GPT снова | Битый/старый id если есть | Calm fail, не краш |
| **FE-HANDOFF-05** | Tier B: из GPT после диалога пользователь попадает на SPA handoff | Полный GPT loop | Redirect URL содержит `/#/story/submit?draft_id=` |

Без draft / без GPT: все FE-HANDOFF-* → `N/A`.

---

## 5. Сценарий сессии (~60–90 мин)

Порядок рекомендован; отмечайте FE-ID по ходу.

| # | Блок | Маршруты | FE focus |
|---|------|----------|----------|
| 1 | Guest board | `/#/board` | FE-PH-01…04, FE-ISSUE-01…02 |
| 2 | How it works + Submit | `/#/how-it-works` | FE-PH-05, FE-PH-06 |
| 3 | Login → chrome | `/#/login` → board | FE-AUTH-01, FE-PH-02 |
| 4 | Cabinet | `/#/profile` | FE-CAB-01…06 |
| 5 | Logout + protected | logout → `/#/profile` | FE-AUTH-02, FE-AUTH-03 |
| 6 | Locale | board/profile | FE-I18N-01…02 |
| 7 | Optional verify | `/#/verify` | FE-VERIFY-* |
| 8 | Optional handoff | draft URL / GPT | FE-HANDOFF-* |

Паузы на findings: после блоков 2, 4, 5, 8 — не копить всё в конце.

---

## 6. Как фиксировать неудовлетворённости

Обязательный выход UAT — список findings по [UAT-FINDINGS-TEMPLATE.md](./UAT-FINDINGS-TEMPLATE.md).

На **каждую** запись смотрите тремя линзами (можно три строки с одним Observation):

| Lens | Вопрос |
|------|--------|
| **QA** | Ломается ли FE-xx? Severity P0–P3 · шаги repro · Blocked? |
| **UX** | Понятность, доверие, friction, cognitive load (sidebar — сюда, не в QA Fail) |
| **CPO** | Это дыра MVP-стратегии? **Ship** / **fix-before-launch** / **post-MVP**? |

Правило: **dissatisfaction ≠ только bug.**  
«Работает, но бесит / стыдно показывать инвестору / ломает доверие» — валидный UX/CPO finding.

---

## 7. Definition of Done для UAT-диалога

- [ ] Заполнен checklist FE-* (хотя бы Tier без handoff, если draft не дали)
- [ ] Findings по шаблону: либо ≥1 запись на каждую линзу QA/UX/CPO, либо явная подпись роли «none for this lens»
- [ ] Три итоговых списка:
  - **Ship blockers** (нельзя выпускать)
  - **Post-MVP backlog** (осознанный долг)
  - **Visual-only** (ждёт ваш visual addendum; не смешивать с FE Fail без ссылки на addendum)

---

## 8. Полка под visual addendum (оператор)

Сюда вставить ссылку, когда будет готово:

```text
Visual expectations addendum: (TBD — путь к вашему документу)
```

В addendum имеет смысл явно пометить:

- sidebar WORKSPACE — taste / future chrome (не functional FE Fail);
- stub-иконки public-home — placeholder-ok до арта;
- что сравнивать с mockups M129–M133 (если нужно).

---

## 9. Как завести отдельный диалог (оператору)

Прикрепить:

1. Этот файл `UAT-MVP-BRIEF.md`
2. `spa-url-page-map.md`
3. `UAT-FINDINGS-TEMPLATE.md`
4. `{SPA_ORIGIN}` + факт про GPT URL / draft
5. (опционально) visual addendum

Промпт-старт (можно вставить в новый чат):

> Ты ведёшь UAT DOGEstonia по приложенному UAT-MVP-BRIEF. Не анализируй код. Проведи меня по сценарию §5, отмечай FE-ID, собирай findings по шаблону в линзах QA / UX / CPO. Visual без addendum не оценивай как Fail. Sidebar — UX/CPO debt, не QA bug.
