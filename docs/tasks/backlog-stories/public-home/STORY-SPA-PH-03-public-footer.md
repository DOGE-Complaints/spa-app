# STORY-SPA-PH-03 — Public Footer A

## Meta
- **Key:** `STORY-SPA-PH-03-public-footer`
- **Epic:** [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md)
- **Pipeline:** [pipeline story](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-03-public-footer/STORY-SPA-PH-03-public-footer.md)
- **Package:** [public-home/](README.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [UX-PROMPTS.md](UX-PROMPTS.md) (PH-F)
- **Status:** Done — P3 gate PASS 2026-08-04T10:46:36Z (`pkg-000047`)
- **Severity:** 🟢 LOW
- **Depends on:** [M131](../../../UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md); [api-req §3.2](STORY-SPA-PH-api-requirements.md); PH-01 chrome package

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) |
|-------|-----------|-------------|
| **M131** | Footer desktop / narrow | [mockup-131-public-footer-chrome-state-sheet-spec.md](../../../UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md) |
| **M133 appendix** | Footer copy en/et/ru | [localized-copy-appendix](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) §footer |

## Зачем простыми словами
Тихий utility-футер: бренд + tagline placeholder + About · Privacy · Contact. Не sitemap, не social cluster, не promo.

## Текущее состояние (As-of-Done · 2026-08-04T10:46:36Z)
- `<PublicFooter />` on Board / Issue / HowItWorks; L10N `publicHome.footer.*`; tagline `[TAGLINE_TBD]`; links `#` placeholders; no CMS; no social.
- Legacy `appShell.footer` / `footer` one-liner **not** reused as product Footer A (cabinet AppShell default unchanged).

## Функциональные требования (FR)
- **FR-PH-03.1** `<PublicFooter />` on public routes using PH chrome (M131).
- **FR-PH-03.2** Structure: brand (quiet logo/name) + tagline + links About · Privacy · Contact.
- **FR-PH-03.3** Tagline displays literal `[TAGLINE_TBD]` until product approval — do not invent final copy.
- **FR-PH-03.4** Links v1: static `#` or agreed external/static routes (`/about`, `/privacy`, `/contact` if present; else `#` placeholders documented in implementation). No CMS.
- **FR-PH-03.5** No icon rows, social clusters, newsletter, card grid (icon catalog §M131 notes).
- **FR-PH-03.6** Narrow: stack/wrap per M131; no loss of brand or links.
- **FR-PH-03.L10N** Ключи `publicHome.footer.*` (map appendix `footer.*`). EN/ET/RU from appendix. Brand **DOGEstonia** untranslated.

## Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | `<PublicFooter />` layout M131 | AppShell / page shell |
| **T02** | Brand + `[TAGLINE_TBD]` + three links | static hrefs |
| **T03** | L10N `publicHome.footer.*` | `publicHomeDictionary.js` |
| **T04** | Vitest: structure + key parity; no social icons | `__tests__` |
| **T05** | Story gate PH-03 | — |

## Иконки (из каталога)
> M131: **no NEW icons**. Optional quiet brand mark reuse of logo asset only — not an icon-catalog NEW row.
>
> **Icons (non-blocking):** Финальные картинки пока не готовы. В коде прописывать точные имена/пути из [STORY-SPA-PH-icon-assets.md](STORY-SPA-PH-icon-assets.md) (`/icons/public-home/…`, reuse `/icons/identity|story-handoff|user-cabinet/…` и `public/assets/`). Отсутствие или placeholder PNG не блокирует вёрстку, L10N, routes, тесты — замена арта позже.

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| Compact brand *(опц.)* | `DOGEstonia-logo-big.png` / fallback SVG | `public/assets/` | Reuse assets |

## Routes / API
- [api-req §3.2](STORY-SPA-PH-api-requirements.md): static i18n / `#` links; **no CMS API**.

## Зависимости
- PH-01 — shared public chrome package (mount footer with header).

## Вне scope
- Final tagline copy approval. Social icons. Newsletter. Full legal CMS. Collective metrics.

## Тексты и переводы (en / et / ru)

> Канон: [M133 appendix §3.9 / 4.9 / 5.9](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) → namespace `publicHome.footer.*`.

### `publicHome.footer.*`

| key | en | et | ru |
|-----|----|----|----|
| `publicHome.footer.brand` | DOGEstonia | DOGEstonia | DOGEstonia |
| `publicHome.footer.tagline` | [TAGLINE_TBD] | [TAGLINE_TBD] | [TAGLINE_TBD] |
| `publicHome.footer.about` | About | Meist | О проекте |
| `publicHome.footer.privacy` | Privacy | Privaatsus | Конфиденциальность |
| `publicHome.footer.contact` | Contact | Kontakt | Контакты |

> **Не reuse** legacy `footer` / `appShell.footer` marketing one-liner from `dictionaries.js`.

## Acceptance Criteria
- [x] Footer A on public chrome: brand + tagline TBD + About/Privacy/Contact (M131).
- [x] No social/icon clusters; tagline remains `[TAGLINE_TBD]` in all locales.
- [x] L10N table complete; api-req §3.2 linked; icon catalog notes (no NEW) respected.

## Швы
- AppShell / layout footer slot, `publicHomeDictionary.js`.
