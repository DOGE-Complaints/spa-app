# UX-промпт — артборд для STORY-SPA-ID-11 (Per-country phone format & validation)

> ✅ **Выполнено:** артборд сгенерирован → [mockup-127-phone-input-per-country-format-validation-spec.md](../../../UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md). Промпт оставлен как история генерации.
>
> Промпт для генерации артборда + спека в дизайн-системе DOGEstonia. Скопируй блок ниже в свой UX-диалог.
> Источник содержания: [STORY-SPA-ID-11](STORY-SPA-ID-11-per-country-phone-format-validation.md); строится на селекторе из [ID-10](STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md); исходный артборд [M32 §State B](../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md) («phone formatting», «validation hints»).

---

```prompt
Сгенерируй артборд + markdown-спек (в формате docs/UX/mockups/epic-04/mockup-NNN-*-spec.md) для ВАЛИДАЦИИ ФОРМАТА ТЕЛЕФОНА ПО СТРАНЕ. Это надстройка над country-селектором ID-10: выбранная страна определяет допустимый формат номера (длина / маска / пример / hint). M32 §State B изначально требовал «phone formatting» и «validation hints».

НАЗВАНИЕ: «Phone Input — Per-Country Format & Validation» (предложи номер Mockup, следующий за артбордом ID-10).

ВИЗУАЛЬНЫЙ ЯЗЫК (строго как в epic-04):
- dark civic-tech aesthetic; black/charcoal surfaces; glassmorphism panels; thin borders
- white typography; muted gray secondary text; DOGEstonia yellow accent
- enterprise SaaS, Linear/GitHub clarity. Avoid: neon, crypto, mascots, confetti, marketing hero

СОСТОЯНИЯ НА АРТБОРДЕ (одно активно в рантайме):
- State A — Valid (Estonia): поле телефона с country-specific placeholder/маской (напр. «5555 5555»), под полем пример «Example: 5555 5555»; primary CTA активна.
- State B — Invalid format (Estonia): введён номер неверной длины → инлайн-hint «Enter a valid Estonia phone number.» + «{country} numbers have 7–8 digits after +372.» + «Example: 5555 5555»; primary CTA disabled; поле в error-стиле (muted, без красной паник-рамки — diagnostic tone).
- State C — Different country (Germany +49): после смены страны placeholder/маска и пример МЕНЯЮТСЯ под формат Германии (длина/группировка), hint специфичен для DE.
- State D — Empty: hint «Enter your phone number.»; CTA disabled.

ТРЕБОВАНИЯ:
- Placeholder, маска ввода, пример и hint **берутся из датасета `PHONE_FORMAT_BY_COUNTRY`** (dialPrefix / nationalNumberLengths / pattern / examplePlaceholder) — показать минимум 2 страны (EE, DE) для контраста.
- Смена страны в селекторе (ID-10) меняет формат в реальном времени.
- Тон ошибок — диагностический и восстановимый (как в M37): без «Oops», без красных full-screen, без обвинения.
- Для unsupported-страны (ID-10 waitlist-режим) формат номера НЕ обязателен (телефон опционален) — показать это как заметку, не как блокирующее состояние.

ЛОКАЛИЗАЦИЯ: подписи/хинты на en/et/ru (ключи `phone.format.*` из стори ID-11), плейсхолдеры `{country}`/`{example}`/`{lengths}`/`{prefix}`.

В СПЕКЕ ОБЯЗАТЕЛЬНО:
1) Purpose; 2) Screen type (поле внутри PhoneInputPanel на /verify); 3) Visual Language; 4) States A/B/C/D с примерами по EE и DE; 5) Data contract — структура `PHONE_FORMAT_BY_COUNTRY` (что собрать на страну); 6) Localization note (3 языка, `phone.format.*`); 7) Traceability (STORY-SPA-ID-11, ID-10, M32 §State B); 8) Design Goal («выбранная страна сразу диктует формат; ошибки понятны и восстановимы; для waitlist формат необязателен»).

НЕ В SCOPE: сам селектор страны (артборд/стори ID-10); реальная отправка SMS; тяжёлая зависимость libphonenumber.
```

---

**После генерации:** положи `mockup-NNN-phone-format-validation-*-spec.md` + `.png` в `docs/UX/mockups/epic-04/` и пропиши ссылку в [STORY-SPA-ID-11](STORY-SPA-ID-11-per-country-phone-format-validation.md) (раздел «Артборд»).
