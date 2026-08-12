# EPIC-SPA-04 — Консолидированный каталог иконок (все мокапы epic-04)

> Референс для **генерации** (отдать агенту на прозрачный растр). Охватывает все 12 спеков [`docs/UX/mockups/epic-04/`](../../../UX/mockups/epic-04/): M28, M32, M37, M120–M128.
> Парный документ размещения → [`EPIC-SPA-04-icon-integration.md`](EPIC-SPA-04-icon-integration.md) (те же имена файлов + куда класть в код).
>
> **Метод:** derived from spec + сверка с текущим кодом; помечено «⚠️ verify vs PNG» где артборд стоит перепроверить. Формат зеркалит [`STORY-SPA-CAB-icon-assets.md`](../cabinet/STORY-SPA-CAB-icon-assets.md).
>
> **Дедуп (SSOT):** уже сгенерированные наборы [`public/icons/story-handoff/`](../../../../public/icons/story-handoff/) (M128/ID-12) и [`public/icons/user-cabinet/`](../../../../public/icons/user-cabinet/) (CAB) **не генерируем повторно** — они в §Reuse.

## Конвенции
- **Директория новых (fixed):** `public/icons/identity/` — создать при первой загрузке; родитель `public/icons/` существует.
- **Runtime path:** `/icons/identity/ic-<kebab>.png`; имя `ic-<kebab>.png`, один ассет = один файл.
- **Формат:** PNG RGBA (прозрачный фон), **256×256** (+ опц. `@2x` 512), padding ~15%, без текста/рамки/тени.
- **Стиль:** thin stroke ~2px, скруглённые концы, flat, Lucide/Linear-like, тёмный civic-tech UI DOGEstonia.
- **Цвета (verified):** жёлтый акцент **#f5c542** ([CivicStatus.css:32](../../../../src/components/CivicStatus/CivicStatus.css#L32)); нейтраль **#f5f7fa**; error/amber — согласовать токен (TBD, как ID-12).
- **Размер (usage-класс)** — колонка ниже: `hero` (крупная иконка состояния, ~64–96px), `inline` (поле/чип/кнопка, ~18–24px), `badge` (~16px). **Один источник-PNG 256² на глиф** — CSS масштабирует; отдельный файл только если арт реально другой.
- **a11y:** декоративные — `aria-hidden="true"`; смысловые (error/verify/status) — дублировать текстом рядом.
- **⚠️ Правило «без спиннера»:** M32 §State D и M124 §State A требуют **skeleton/subtle progress, НЕ giant spinner** → для processing/restoring иконка НЕ нужна (CSS-скелетон). `ic-spinner` из story-handoff — только там, где уже используется (StorySubmit), не тащить в M32/M124.

---

## §1. NEW — к генерации (`public/icons/identity/`)

| # | Иконка (смысл) | Mockup / контекст | Размер | Файл | Цвет | Промпт (прозрачный растр) |
|---|----------------|-------------------|--------|------|------|---------------------------|
| 1 | Email / конверт | M121 §A/§B/§D поле Email; M123 §B waitlist email; заменяет unicode `✉` ([LoginPage.jsx:398](../../../../src/pages/LoginPage.jsx#L398)) | inline | `ic-email.png` | нейтраль #f5f7fa | `Email envelope icon — simple closed envelope outline, thin 2px line, rounded corners, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no text, flat, Lucide-like, dark civic-tech UI. PNG with alpha.` |
| 2 | Mail sent / письмо ушло | M121 §C Magic Link Sent; M123 §C Waitlist Joined | hero | `ic-mail-sent.png` | жёлтый #f5c542 | `Sent email icon — an envelope with a small check or upward arrow, thin 2px line, rounded, color #f5c542 on FULLY TRANSPARENT background, 256×256, 15% padding, no text, flat, Lucide-like. PNG with alpha.` |
| 3 | Password reset / ключ | M121 §D Forgot Password | hero | `ic-key.png` | нейтраль #f5f7fa | `Key icon — a simple key outline, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no text, flat, Lucide-like. PNG with alpha.` |
| 4 | Password visibility (опц.) | M121 §A/§B поле Password toggle (если вёрстка добавит) ⚠️ verify vs PNG | inline | `ic-eye.png` | нейтраль #f5f7fa | `Eye (show password) icon — an open eye outline, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, flat, Lucide-like. PNG with alpha.` |
| 5 | Password hidden (опц.) | M121 §A/§B поле Password toggle (парная к #4) ⚠️ verify vs PNG | inline | `ic-eye-off.png` | нейтраль #f5f7fa | `Eye-off (hide password) icon — an eye outline with a diagonal slash, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, flat, Lucide-like. PNG with alpha.` |
| 6 | Region / globe | M37 §COUNTRY_NOT_ALLOWED; M123 §A Country Not Supported | hero | `ic-globe.png` | нейтраль #f5f7fa | `Globe icon — a simple globe with latitude/longitude lines, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no map detail, flat, Lucide-like. PNG with alpha.` |
| 7 | Cooldown / clock | M37 §RATE_LIMITED (таймер, отличается от `ic-clock-expired`) | hero | `ic-clock.png` | нейтраль #f5f7fa | `Clock icon — a round clock face with two hands, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no text, flat, Lucide-like. PNG with alpha.` |
| 8 | Code mismatch | M37 §CODE_MISMATCH (неверный код) | hero | `ic-code-mismatch.png` | нейтраль #f5f7fa | `Mismatch icon — a circle with an "X" inside (diagnostic, not alarm), thin 2px line, rounded, muted #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, calm not panic, flat, Lucide-like. PNG with alpha.` |
| 9 | Account / profile conflict | M37 §profile_conflict; M121 §E «account exists» | hero | `ic-profile-conflict.png` | нейтраль #f5f7fa | `Account conflict icon — two overlapping person silhouettes (or a person with a swap arrow), thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, flat, Lucide-like. PNG with alpha.` |
| 10 | OTP / SMS code (опц.) | M32 §C OTP Code Entry ⚠️ verify vs PNG (может не быть дискретной иконки) | hero | `ic-otp-code.png` | нейтраль #f5f7fa | `SMS code icon — a speech bubble or phone with small digits hint, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no real numbers, flat, Lucide-like. PNG with alpha.` |
| 11 | Chevron down (селектор) | M126 §B селектор — заменяет unicode `▾` ([CountrySelector.jsx:126](../../../../src/components/PhoneVerification/CountrySelector.jsx#L126)) ⚠️ опц. (unicode ок) | inline | `ic-chevron-down.png` | нейтраль #f5f7fa | `Chevron-down icon — a single downward chevron, thin 2px line, rounded caps, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, flat, Lucide-like. PNG with alpha.` |
| 12 | Search (селектор) | M126 §B поле «Search country» ⚠️ опц. | inline | `ic-search.png` | нейтраль #f5f7fa | `Search icon — a magnifying glass, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, flat, Lucide-like. PNG with alpha.` |

**Итого NEW:** 12 (из них #4/#5/#10/#11/#12 — опциональные/verify-vs-PNG).

---

## §2. Reuse — НЕ генерировать (уже есть), с привязкой к мокапам

| Иконка | Путь (существующий) | Мокапы epic-04, где нужна |
|--------|---------------------|---------------------------|
| Verify shield | `/icons/story-handoff/ic-verify-shield.png` | M32 §A Disclosure / §E Success; M120; M122 gate; M28 verify-required-adj |
| Phone | `/icons/story-handoff/ic-phone.png` | M32 §B Phone Input; M126 (сейчас emoji/эмодзи) |
| Success check | `/icons/story-handoff/ic-success-check.png` | M32 §E; M121 §F Success; M123 §C Joined; M122 |
| Lock | `/icons/story-handoff/ic-lock.png` | M121 §A/§B password; M124 §B Logged Out / §C Expired; M37 §TOO_MANY_ATTEMPTS |
| Clock expired | `/icons/story-handoff/ic-clock-expired.png` | M37 §CODE_EXPIRED |
| Cloud error | `/icons/story-handoff/ic-cloud-error.png` | M37 §PROVIDER_UNAVAILABLE/§SEND_FAILED/§network; M124 §D Backend / §E Network |
| Warning triangle | `/icons/story-handoff/ic-warning-triangle.png` | M37/M121 §E Auth Error (диагностический тон); M124 |
| Auto-resubmit / retry | `/icons/story-handoff/ic-auto-resubmit.png` | M37/M124 §retry; M123 §D Try Again |
| Info | `/icons/story-handoff/ic-info.png` | M32/M28 context-чипы; M120/M128 draft-status |
| Doc-new | `/icons/story-handoff/ic-doc-new.png` | M120/M128 empty; M122 draft |
| Civic: unverified/verify-required/in-progress/verified/failed | `/icons/user-cabinet/ic-civic-{unverified,verify-required,in-progress,verified,failed}.png` | **M28** State A–E; M122 trust indicators; M125 overview; заменяют unicode в [CivicStatusCard.jsx](../../../../src/components/CivicStatus/CivicStatusCard.jsx) |
| App logo | `public/assets/DOGEstonia-logo-big.png` | M121 header; M124 shell; M125 |
| Locale flags | `public/assets/ET.svg`, `RU.svg`, `US.svg` | M126 селектор (сейчас emoji); header language |

> **CivicStatusCard сегодня:** unicode `✓ ! … ○` ([CivicStatusCard.jsx:108,129,160,182,212](../../../../src/components/CivicStatus/CivicStatusCard.jsx#L108)) — при вёрстке заменить на `ic-civic-*` (user-cabinet). См. интеграцию.

---

## §3. Заметки / что НЕ иконка
- **Skeleton/processing:** M32 §D, M124 §A — CSS-скелетон, не иконка (не тащить spinner).
- **Флаги стран:** M126 — emoji-флаги в [CountrySelector.jsx](../../../../src/components/PhoneVerification/CountrySelector.jsx); SVG-флаги есть в `public/assets/` (ET/RU/US) — замена emoji опциональна, не в этом наборе.
- **Бейджи M126** «Supported / Available Soon» — текст-пилюли (CSS), не иконки.
- **M125 Identity Overview** — архитектурная диаграмма (боксы/стрелки), продуктовых иконок нет.
- **M120 GPT-мост / M122 gate** — переиспользуют verify-shield / civic / doc / phone; своих новых нет.
- **Диагностический тон (M37 §13):** без red-panic, без warning-overload — иконки нейтральные/muted.
- **Методология:** каталог — обязательный артефакт (наравне с L10N-таблицами) [[feedback-ui-story-icon-catalog]]; этот — консолидированный epic-level.
- **⚠️ verify vs PNG:** derived-from-spec; перед генерацией опциональных (#4/5/10/11/12) свериться с PNG-артбордами epic-04.
