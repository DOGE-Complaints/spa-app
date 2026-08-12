# UX-промпт — артборд для STORY-SPA-ID-10 (Country selector + waitlist routing)

> ✅ **Выполнено:** артборд сгенерирован → [mockup-126-phone-country-selector-spec.md](../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md). Промпт оставлен как история генерации.
>
> Промпт для генерации артборда + спека в дизайн-системе DOGEstonia. Скопируй блок ниже в свой UX-диалог.
> Источник содержания: [STORY-SPA-ID-10](STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md); исходный артборд [M32 §State B](../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md), waitlist [M123](../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md).

---

```prompt
Сгенерируй артборд + markdown-спек (в формате существующих docs/UX/mockups/epic-04/mockup-NNN-*-spec.md) для нового состояния phone-input с СЕЛЕКТОРОМ СТРАНЫ. Это доработка ID-04 PhoneInputPanel (M32 §State B изначально требовал «country selector / phone formatting / validation hints», но было реализовано как readonly «Estonia (+372)»).

НАЗВАНИЕ: «Phone Input — Country Selector & Waitlist Routing» (предложи номер Mockup, следующий за последним в epic-04).

ВИЗУАЛЬНЫЙ ЯЗЫК (строго как в остальных артбордах epic-04):
- dark civic-tech operating system aesthetic; black / charcoal surfaces; subtle textured background
- soft glassmorphism panels, thin borders; white typography; muted gray secondary text
- DOGEstonia yellow accent (primary CTA); enterprise SaaS, Linear/GitHub/Jira clarity
- Avoid: marketing hero, consumer onboarding wizard, social login, crypto/token, neon, bright gradients, mascots, confetti

СОСТОЯНИЯ НА АРТБОРДЕ (одно активно в рантайме):
- State A — Supported (Estonia selected, default): селектор страны (флаг + «Estonia» + «+372») в раскрытом-закрытом виде; ниже dial-prefix + поле телефона; primary CTA «Send Verification Code»; secondary «Back». Это текущий happy-path.
- State B — Country dropdown open: выпадающий список стран (флаг + локализованное название + dial-код), Estonia отмечена дефолтом; (опц.) строка поиска. Список — пример из 8–11 стран (Estonia, Latvia, Lithuania, Finland, Sweden, Germany, United Kingdom, United States, Poland …).
- State C — Unsupported country selected (напр. Germany +49): та же панель, но:
  - инлайн-уведомление (информативный тон, НЕ rejection): «DOGEstonia isn't available in {country} yet.» + подсказка «Join the waitlist and we'll let you know when it is.»
  - primary CTA меняется на «Join Waitlist» (yellow); поле телефона помечено «Phone number (optional)» и приглушено (необязательно, не отправляется);
  - НЕТ «Send Verification Code».
- (Переход из State C ведёт в существующий M123 Country Waitlist — не дублировать его экраны, только показать стрелкой связь.)

ТРЕБОВАНИЯ К КОМПОНЕНТУ:
- Country selector доступен (keyboard/screen-reader), флаг + название + dial-код; Estonia дефолт.
- Чёткая разница «supported (Estonia → OTP)» vs «unsupported (любая другая → waitlist)».
- Унифицированная высота панели между состояниями (без layout-jump).

ЛОКАЛИЗАЦИЯ (показать на артборде, что строки переключаемы): подписи на en/et/ru (см. ключи `phone.country.*` в стори ID-10). Флаги/endonym'ы не переводятся.

В СПЕКЕ ОБЯЗАТЕЛЬНО:
1) Purpose; 2) Screen type (route-level panel внутри /verify, host PhoneVerificationFlow); 3) Visual Language; 4) States A/B/C с Title/Message/Fields/CTAs/Requirements; 5) State Mapping (supported→OTP, unsupported→waitlist M123); 6) Localization note (3 языка, `phone.country.*`); 7) Traceability (STORY-SPA-ID-10, M32 §State B, M123); 8) Design Goal («пользователь не упирается в тупик; "недоступно" видно сразу при выборе; страна для waitlist — из явного выбора»).

НЕ В SCOPE этого артборда: per-country формат/маска/валидация номера — это отдельный артборд ID-11.
```

---

**После генерации:** положи `mockup-NNN-phone-country-selector-*-spec.md` + `.png` в `docs/UX/mockups/epic-04/` и пропиши ссылку в [STORY-SPA-ID-10](STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md) (раздел «Артборд»).
