# STORY-SPA-PH-03-public-footer — Public Footer A

## Meta (pipeline)

- **Key:** `STORY-SPA-PH-03-public-footer`
- **Parent Epic:** [`../../EPIC-SPA-09-public-shell-home.md`](../../EPIC-SPA-09-public-shell-home.md)
- **Epic:** EPIC-SPA-09 Public Shell + Home · **Wave 1**
- **Пакет:** `public-home/`
- **Status:** Done — P3 gate PASS 2026-08-04T10:46:36Z (`pkg-000047`)
- **Severity:** 🟢 LOW
- **source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md)
- **decision_ref:** backlog story + [mockup-131-public-footer-chrome-state-sheet-spec.md](../../../../../UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md) + [mockup-133-…-localized-copy-appendix.md](../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) §footer + [STORY-SPA-PH-api-requirements.md](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) §3.2 + [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md) (no NEW)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md` (+ `.png`)
- **Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T10:35:41Z
- **Depends on:** [PH-01](../STORY-SPA-PH-01-header-brand-nav/STORY-SPA-PH-01-header-brand-nav.md) Done (shared public chrome); M131; [api-req §3.2](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md)

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) |
|-------|-----------|-------------|
| **M131** | Footer desktop / narrow | [mockup-131-public-footer-chrome-state-sheet-spec.md](../../../../../UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md) |
| **M133 appendix** | Footer copy en/et/ru | [localized-copy-appendix](../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) §footer |

## Зачем простыми словами
Тихий utility-футер: бренд + tagline placeholder + About · Privacy · Contact. Не sitemap, не social cluster, не promo.

## Текущее состояние (As-of-Done · 2026-08-04T10:46:36Z)
- [`PublicFooter`](../../../../../../src/components/PublicFooter/PublicFooter.jsx) mounted on Board / Issue / HowItWorks via AppShell `footer` prop (full footer element; cabinet default one-liner unchanged).
- L10N `publicHome.footer.*` + FLAT_KEYS in [`publicHomeDictionary.js`](../../../../../../src/i18n/publicHomeDictionary.js); tagline literal `[TAGLINE_TBD]` en/et/ru.
- Utility links: `#about` / `#privacy` / `#contact` placeholders (routes not present; api-req §3.2 — no CMS).
- Optional logo reuse `public/assets/`; **no NEW** icon-catalog rows; no social/newsletter.
- Gate PASS · screenshots [`screenshots/`](./screenshots/).

## Функциональные требования (FR)
- **FR-PH-03.1** `<PublicFooter />` on public routes using PH chrome (M131).
- **FR-PH-03.2** Structure: brand (quiet logo/name) + tagline + links About · Privacy · Contact.
- **FR-PH-03.3** Tagline displays literal `[TAGLINE_TBD]` until product approval — do not invent final copy.
- **FR-PH-03.4** Links v1: static `#` or agreed external/static routes (`/about`, `/privacy`, `/contact` if present; else `#` placeholders documented in implementation). No CMS.
- **FR-PH-03.5** No icon rows, social clusters, newsletter, card grid (icon catalog §M131 notes).
- **FR-PH-03.6** Narrow: stack/wrap per M131; no loss of brand or links.
- **FR-PH-03.L10N** Ключи `publicHome.footer.*` (map appendix `footer.*`). EN/ET/RU from appendix. Brand **DOGEstonia** untranslated.

## Субтаски (pipeline)

| Таск | Волна | Task folder | Суть |
|------|-------|-------------|------|
| **T01** | 1 | [task-spa-ph-03-t01-public-footer-layout](./task-spa-ph-03-t01-public-footer-layout/README.md) | `<PublicFooter />` layout M131 · **ui_anchor** |
| **T02** | 1 | [task-spa-ph-03-t02-brand-tagline-links](./task-spa-ph-03-t02-brand-tagline-links/README.md) | Brand + `[TAGLINE_TBD]` + three links |
| **T03** | 1 | [task-spa-ph-03-t03-l10n-footer-keys](./task-spa-ph-03-t03-l10n-footer-keys/README.md) | L10N `publicHome.footer.*` |
| **T04** | 1 | [task-spa-ph-03-t04-vitest-footer-parity](./task-spa-ph-03-t04-vitest-footer-parity/README.md) | Vitest: structure + key parity; no social icons |
| **T05** | 1 | [task-spa-ph-03-t05-story-gate-ph-03](./task-spa-ph-03-t05-story-gate-ph-03/README.md) | Story gate PH-03 |

## Иконки (из каталога)
> M131: **no NEW icons**. Optional quiet brand mark reuse of logo asset only — not an icon-catalog NEW row.
>
> **Icons (non-blocking):** Финальные картинки пока не готовы. В коде прописывать точные имена/пути из [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md) (`/icons/public-home/…`, reuse `/icons/identity|story-handoff|user-cabinet/…` и `public/assets/`). Отсутствие или placeholder PNG не блокирует вёрстку, L10N, routes, тесты — замена арта позже.

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| Compact brand *(опц.)* | `DOGEstonia-logo-big.png` / fallback SVG | `public/assets/` | Reuse assets |

## Routes / API
- [api-req §3.2](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md): static i18n / `#` links; **no CMS API**.

## Зависимости
- PH-01 — shared public chrome package (mount footer with header).

## Вне scope
- Final tagline copy approval. Social icons. Newsletter. Full legal CMS. Collective metrics.

## Тексты и переводы (en / et / ru)

> Канон: [M133 appendix §3.9 / 4.9 / 5.9](../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) → namespace `publicHome.footer.*`.

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

## Tasks

- [SPA-PH-03-T01](task-spa-ph-03-t01-public-footer-layout/README.md) — PublicFooter layout M131 · **ui_anchor**
- [SPA-PH-03-T02](task-spa-ph-03-t02-brand-tagline-links/README.md) — Brand + TAGLINE_TBD + links
- [SPA-PH-03-T03](task-spa-ph-03-t03-l10n-footer-keys/README.md) — L10N publicHome.footer.*
- [SPA-PH-03-T04](task-spa-ph-03-t04-vitest-footer-parity/README.md) — Vitest structure + key parity
- [SPA-PH-03-T05](task-spa-ph-03-t05-story-gate-ph-03/README.md) — Story gate PH-03
- [SPA-PH-03-T06](task-spa-ph-03-t06-commit-ph03-public-footer/README.md) — Post-audit F1 commit HEAD · `run_mode=spa_ph_03_audit_2026_08_04`
- [SPA-PH-03-T07](task-spa-ph-03-t07-narrow-footer-touch-targets/README.md) — Post-audit F2 narrow ≥44px
- [SPA-PH-03-T08](task-spa-ph-03-t08-as-of-done-api-req-footer/README.md) — Post-audit F3 api-req §3.2 As-of-Done
