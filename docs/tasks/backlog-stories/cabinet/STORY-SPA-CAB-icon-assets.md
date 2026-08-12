# STORY-SPA-CAB — Каталог иконок/визуалов (User Cabinet MVP)

> Референс для генерации и вёрстки: все **функциональные** иконки User Cabinet (EPIC-SPA-07), выведенные из MVP-мокапов [`user profile/`](../../../UX/mockups/user%20profile/) и reuse [M28 Civic Status](../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md).
>
> **Scope:** M21, M22, M23, M24, M25, M26, M45, M50, M53, M99. **M110 исключён** (post-MVP).
>
> **Метод:** PNG-артборды в репо отсутствуют (только `*-spec.md`); набор **derived from spec** — сверить с PNG-артбордами при появлении файлов. Источники: mockup specs, [`design-system.md`](../../../UX/design-system.md) §3, существующие ассеты [`public/icons/story-handoff/`](../../../../public/icons/story-handoff/).

**Traceability:** CAB-02 Account · CAB-03 Civic · CAB-04 Story · CAB-05 Wallet · CAB-06 Contribution · CAB-07 M22/M23 composite.

## Конвенции

- **Директория загрузки (fixed):** [`public/icons/user-cabinet/`](../../../../public/icons/user-cabinet/) — создать при первой загрузке; родитель [`public/icons/`](../../../../public/icons/) существует (`story-handoff/` уже есть).
- **Runtime path:** `/icons/user-cabinet/ic-<kebab>.png`
- **Имя файла:** `ic-<kebab>.png`, один ассет = один файл.
- **Формат:** PNG RGBA (прозрачный фон), **256×256** (+ опц. `@2x` 512×512), padding ~15%, без текста/рамки/тени.
- **Стиль:** thin stroke ~2px, скруглённые концы, flat, Lucide/Linear-like, enterprise civic-tech, тёмный UI DOGEstonia.
- **Цвета (verified):** жёлтый акцент **#f5c542** ([`CivicStatus.css:32`](../../../../src/components/CivicStatus/CivicStatus.css)); нейтраль **#f5f7fa**; error/amber для unavailable — согласовать с токеном (TBD, как ID-12).
- **a11y:** декоративные — `aria-hidden="true"`; смысловые (error/verify) — дублировать текстом рядом.
- **Не включать:** M110; Submit CTAs; warning badge для missing email (M26 §7); giant welcome illustration (M23 §5); green success badges / trophies (M28 §5); coin/DeFi символика (M50 §4).

## Таблица иконок (генерировать)

| # | Иконка (смысл) | Mockup / контекст | Story | Файл | Цвет | Промпт (прозрачный растр) |
|---|----------------|-------------------|-------|------|------|---------------------------|
| 1 | Email | M24 §5 field Email; M99 §Account | CAB-02 | `ic-field-email.png` | нейтраль #f5f7fa | `Email envelope icon — simple closed envelope outline, thin 2px line, rounded corners, color #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no text, flat, Lucide-like, dark civic-tech UI. PNG with alpha.` |
| 2 | Account Created | M24 field Account Created | CAB-02 | `ic-field-created.png` | нейтраль #f5f7fa | `Calendar icon — a simple calendar sheet with a small date grid hint, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no numbers, flat, Lucide-like. PNG with alpha.` |
| 3 | Role | M24 field Role | CAB-02 | `ic-field-role.png` | нейтраль #f5f7fa | `User role icon — a single person silhouette (head and shoulders), thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no badge, flat, Lucide-like. PNG with alpha.` |
| 4 | Account Status | M24 field Account Status | CAB-02 | `ic-field-status.png` | нейтраль #f5f7fa | `Status indicator icon — a small circle with a horizontal dash (neutral active state), thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no green/red, flat, Lucide-like. PNG with alpha.` |
| 5 | Civic unverified | M28 State A «Neutral verification icon»; M23/M99 civic block | CAB-03 | `ic-civic-unverified.png` | нейтраль #f5f7fa | `Neutral verification icon — an empty circle outline (not a warning), thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, calm not alarming, flat, Lucide-like. PNG with alpha.` |
| 6 | Civic verify required | M28 State B protected action gate | CAB-03 | `ic-civic-verify-required.png` | жёлтый #f5c542 | `Shield with exclamation icon — shield outline with small neutral mark inside, thin 2px line, color #f5c542 on FULLY TRANSPARENT background, 256×256, 15% padding, no red alarm, flat, Lucide-like. PNG with alpha.` |
| 7 | Civic in progress | M28 State C «subtle, not spinner-centric» | CAB-03 | `ic-civic-in-progress.png` | нейтраль #f5f7fa | `Waiting/processing icon — three horizontal dots in a row (ellipsis), thin 2px rounded dots, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, subtle not a spinner, flat, Lucide-like. PNG with alpha.` |
| 8 | Civic verified | M28 State D primary trust; M99 «Verified» | CAB-03 | `ic-civic-verified.png` | жёлтый #f5c542 | `Verified shield icon — shield outline with checkmark inside, thin 2px line, color #f5c542 on FULLY TRANSPARENT background, 256×256, 15% padding, trustworthy not celebratory, no green badge, flat, Lucide-like. PNG with alpha.` |
| 9 | Civic failed | M28 State E verification failed | CAB-03 | `ic-civic-failed.png` | нейтраль #f5f7fa | `Failed verification icon — shield outline with small X inside, thin 2px line, muted #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, diagnostic not panic, flat, Lucide-like. PNG with alpha.` |
| 10 | Story Activity | M45 title; M99 §Story Activity | CAB-04 | `ic-story-activity.png` | нейтраль #f5f7fa | `Activity ledger icon — a clipboard or list with 2–3 rows, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, not a social feed, flat, Lucide-like. PNG with alpha.` |
| 11 | Story empty | M45-B empty; M23 §Story Activity empty | CAB-04 | `ic-story-empty.png` | нейтраль #f5f7fa | `Empty inbox icon — an open tray or inbox outline with no items, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, calm empty state, flat, Lucide-like. PNG with alpha.` |
| 12 | Draft available | M45-C Resume Draft | CAB-04 | `ic-story-draft.png` | нейтраль #f5f7fa | `Draft document icon — paper sheet with pencil/edit corner, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no text, flat, Lucide-like. PNG with alpha.` |
| 13 | Story ID | M45 table column Story ID | CAB-04 | `ic-story-id.png` | нейтраль #f5f7fa | `ID/hash icon — a hashtag or ID tag symbol, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, flat, Lucide-like. PNG with alpha.` |
| 14 | Status Published | M45 table status Published | CAB-04 | `ic-status-published.png` | нейтраль #f5f7fa | `Published status icon — a small circle with checkmark, thin 2px line, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no green badge, flat, Lucide-like. PNG with alpha.` |
| 15 | Status Under Review | M45 table status Under Review | CAB-04 | `ic-status-under-review.png` | нейтраль #f5f7fa | `Under review icon — an eye or magnifying glass over a document hint, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, muted, flat, Lucide-like. PNG with alpha.` |
| 16 | Wallet not linked | M50 State A; M23/M99 wallet empty | CAB-05 | `ic-wallet-unlinked.png` | нейтраль #f5f7fa | `Wallet unlinked icon — a simple wallet outline with a dashed link break, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no coin logo, flat, Lucide-like. PNG with alpha.` |
| 17 | Wallet linked | M50 State B | CAB-05 | `ic-wallet-linked.png` | нейтраль #f5f7fa | `Wallet linked icon — a wallet outline with a small link/chain connector, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no balances, flat, Lucide-like. PNG with alpha.` |
| 18 | Connect wallet | M50 State C primary CTA | CAB-05 | `ic-wallet-connect.png` | жёлтый #f5c542 | `Connect wallet icon — wallet outline with plug/link symbol, thin 2px line, color #f5c542 on FULLY TRANSPARENT background, 256×256, 15% padding, authorship not DeFi, no dogecoin coin art, flat, Lucide-like. PNG with alpha.` |
| 19 | Story Receipts | M53 Module A title; M99 receipts | CAB-06 | `ic-contrib-receipts.png` | нейтраль #f5f7fa | `Receipt icon — a paper receipt with torn bottom edge and 2–3 lines, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, ledger not shopping, flat, Lucide-like. PNG with alpha.` |
| 20 | Contribution Records | M53 Module B; M99 contribution events | CAB-06 | `ic-contrib-records.png` | нейтраль #f5f7fa | `Contribution events icon — stacked horizontal layers or timeline bars, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, not gamification, flat, Lucide-like. PNG with alpha.` |
| 21 | Reputation (future) | M53 Module C1 «Coming Later» | CAB-06 | `ic-contrib-reputation.png` | нейтраль #f5f7fa | `Reputation trust icon — a shield or trust badge outline without trophy/star, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, civic ledger not social rank, flat, Lucide-like. PNG with alpha.` |

**Итого к генерации:** 21 файл в `public/icons/user-cabinet/`.

## Reuse — НЕ генерировать (уже есть)

| Иконка | Путь | Mockup / контекст | Story |
|--------|------|-------------------|-------|
| Verify shield (CTA adj.) | `/icons/story-handoff/ic-verify-shield.png` | M45 State D Verify Account | CAB-04 |
| Activity / service unavailable | `/icons/story-handoff/ic-cloud-error.png` | M45-E; M53 A3/B3/C3 unavailable | CAB-04, CAB-06 |
| Profile load failed | `/icons/story-handoff/ic-warning-triangle.png` | M22 error panel (инженерный тон) | CAB-07 |
| Retry action | `/icons/story-handoff/ic-auto-resubmit.png` | M22 Retry; M45/M53 retry buttons (опц.) | CAB-07, CAB-04, CAB-06 |
| Empty doc (опц.) | `/icons/story-handoff/ic-doc-new.png` | альтернатива #11 `ic-story-empty` | CAB-04 |
| App logo | `public/assets/DOGEstonia-logo-big.png` | M21/M99 shell header | CAB-01 |
| Locale flags | `public/assets/ET.svg`, `RU.svg`, `US.svg` | M99 header language selector | CAB-01 |

**CivicStatusCard сегодня:** unicode `○` `!` `…` `✓` в [`CivicStatusCard.jsx`](../../../../src/components/CivicStatus/CivicStatusCard.jsx) — при вёрстке cabinet заменить на #5–#9 PNG или оставить до CAB-03 implementation gate.

## Заметки

- **M26 missing email:** поле Email = `Not Available` текстом; **без** warning-иконки (M26 §7).
- **M23 new user:** локальные empty states секций; **без** giant welcome illustration.
- **M50 Coming Later:** disabled text button — отдельная иконка не нужна.
- **M53 metrics:** «Receipts: 12», «Contribution Events: 18» — текст, не иконки.
- **Shell loading (M21):** CSS skeleton — отдельная иконка не требуется.
- **Sidebar Profile nav (M99):** glyph в спеках не зафиксирован; `ic-nav-profile.png` — только если nav получит иконку при вёрстке CAB-01.
- **Консолидация (опц.):** #13–#15 можно упростить до 1–2 neutral table icons при вёрстке.
- **Методология:** каталог — обязательный артефакт рядом с [L10N tables](README.md) в каждой UI-стори пакета cabinet.
