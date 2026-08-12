# Manual smoke — Country selector + waitlist routing (STORY-SPA-ID-10)

Ручной UI-смоук для проверки селектора страны и маршрутизации в waitlist. ~5 минут.
Артборд-эталон: [M126](../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md).

## Подготовка
```bash
cd spa-app
npm run dev        # http://localhost:5173 (Vite)
```
- Войти под неверифицированным аккаунтом (`phone_verified=false`), иначе `/verify` покажет статус, а не флоу.
- URL флоу: `http://localhost:5173/#/verify` (HashRouter — маршрут только в `#/...`).
- На экране Disclosure нажать **«Send Verification Code»** → попадаем в панель ввода телефона (State A).

> Заметка: реальный OTP уходит на бэкенд identity. Для проверки routing'а отправлять код не обязательно — ключевые шаги ниже его не требуют. Для мок-режима OTP см. [manual-smoke-phone-verification.md](../../../../../runtime-docs/manual-smoke-phone-verification.md).

---

## Сценарий A — Эстония (supported, happy-path)
1. На панели телефона селектор страны показывает **🇪🇪 Estonia +372** (дефолт).
2. Primary-кнопка — **«Send Verification Code»**; поле телефона активно, плейсхолдер виден.
3. Ввести `5555 5555` → кнопка активна. Ввести `55555` → кнопка disabled + хинт под полем.
- ✅ Ожидание: Эстония выбрана по умолчанию; OTP-путь доступен; валидация номера работает (Эстония).

## Сценарий B — открыть селектор (dropdown)
1. Кликнуть по селектору (или фокус + ↓/Enter/Space).
2. Появляется поиск **«Search country»** + заголовок **«Choose Country»** + список стран.
3. У каждой строки: флаг + локализованное имя + dial-код + бейдж **«Supported»** (только EE) / **«Available Soon»** (остальные).
4. Ввести `ger` в поиск → остаётся Germany. Стрелками ↑/↓ двигать подсветку, **Enter** — выбрать, **Esc** — закрыть.
- ✅ Ожидание: список из 10 стран (EE/LV/LT/FI/SE/DE/GB/US/PL/FR), EE помечена выбранной; поиск и клавиши работают.
- ⚠️ Известный нюанс (F1): при навигации стрелками скринридер не озвучивает активную строку (нет `aria-activedescendant`).

## Сценарий C — не-Эстония (unsupported → waitlist) — главный путь
1. В селекторе выбрать **🇩🇪 Germany (+49)**.
2. Панель адаптируется **сразу**:
   - заголовок **«DOGEstonia Isn't Available In Germany Yet»**;
   - уведомление **«DOGEstonia isn't available in Germany yet.»** + хинт про waitlist;
   - метка поля → **«Phone Number (optional)»**, поле приглушено;
   - primary-кнопка → **«Join Waitlist»** (нет «Send Verification Code»).
3. Нажать **«Join Waitlist»** → открывается **Waitlist Form** (M123), поле **Country** предзаполнено **«Germany»**.
- ✅ Ожидание: запрос OTP НЕ отправляется; в форму waitlist попадает страна **из выбора**; телефон не переносится.
- ⚠️ Нюанс (F3): в submit waitlist уходит имя «Germany» (а не код `DE`).
- ⚠️ Нюанс (F4): основной путь открывает сразу **форму** (минуя экран «Country Not Supported» с «Learn More»).

## Сценарий D — переключение языка (L10N)
1. В режиме Germany переключить локаль ET → RU → EN.
2. Тексты панели меняются: заголовок/уведомление/кнопка/бейджи; **название страны и флаг — не переводятся**.
- ✅ Ожидание (ET): «DOGEstonia pole veel saadaval sinu riigis (Saksamaa)», кнопка «Liitu ootelistiga».
- ✅ Ожидание (RU): «DOGEstonia пока недоступна в вашей стране (Германия)», кнопка «В лист ожидания».

## Сценарий E — вернуться на Эстонию
1. Из Germany открыть селектор, выбрать **Estonia**.
2. Панель возвращается к State A (Send Verification Code, поле активно).
- ✅ Ожидание: переключение туда-обратно не ломает состояние; (F5) визуально проверить, что высота панели не «прыгает» между supported/unsupported.

---

## Чек-лист
- [ ] A: Эстония дефолт, OTP-путь, валидация номера.
- [ ] B: dropdown — поиск, бейджи, клавиатура (Enter/Esc/стрелки).
- [ ] C: Germany → notice + «Join Waitlist», без OTP, страна из выбора в форме, без телефона.
- [ ] D: ET/RU/EN переключаются; страна/флаг не переводятся.
- [ ] E: возврат на Эстонию; высота панели стабильна.

**data-testid для DevTools:** `phone-country-selector-trigger`, `phone-country-selector-dropdown`, `phone-country-option-DE`, `phone-country-unsupported-notice`, `phone-country-join-waitlist`, `waitlist-form-panel`, `waitlist-form-country`.
