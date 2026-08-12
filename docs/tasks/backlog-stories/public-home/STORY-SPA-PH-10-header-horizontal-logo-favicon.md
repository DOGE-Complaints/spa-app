# STORY-SPA-PH-10 — Header horizontal logo + favicon

## Meta
- **Key:** `STORY-SPA-PH-10-header-horizontal-logo-favicon`
- **Epic:** [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) · public chrome polish (post PH-01)
- **Pipeline:** [STORY-SPA-PH-10-header-horizontal-logo-favicon.md](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-10-header-horizontal-logo-favicon/STORY-SPA-PH-10-header-horizontal-logo-favicon.md)
- **Package:** [public-home/](README.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · **`pkg-000056`**
- **Status:** Done — P3 gate PASS 2026-08-07T20:53:02Z (`pkg-000056`) · **P7 WAVE COMPLETE** ([reaudit](../../../analysis/reaudit-STORY-SPA-PH-10-gap-closure-2026-08-08.md) · F1/F2 CLOSED · F3/F4 WAIVED)
- **Severity:** 🟡 MED (brand chrome / demo polish)
- **Depends on:** [PH-01 Header brand/nav](STORY-SPA-PH-01-header-brand-nav.md) Done · [BUG-02 logo pad](../bugs/STORY-SPA-BUG-02-logo-background-mismatch.md) Done
- **Inbound assets:** [favicon.png](../inbound/favicon.png) · [DOGEstonia-logo-horizontal.png](../inbound/DOGEstonia-logo-horizontal.png)
- **Related:** PH-01 FR-PH-01.2 (logo + text name) — **superseded** by this story when Done; M129 context only (no new artboard required)

## Зачем простыми словами

Horizontal asset уже содержит wordmark в картинке — отдельный текстовый span рядом с logo = дубль. Нужны: только horizontal logo в public header (имя в `alt`) + явный favicon link на всех spa hash-routes.

**As-of-Done (current):** public `Header` brand = `logoSrc=/assets/DOGEstonia-logo-horizontal.png` · `img` only (нет `.header-brand-name`) · [`Header.jsx`](../../../../src/components/AppShell/Header.jsx) L19 · L99–105. Favicon: `public/favicon.png` + `<link rel="icon" href="./favicon.png" type="image/png" />` в [`index.html`](../../../../index.html) L6. P3 gate PASS 2026-08-07T20:53:02Z.

**Historical (pre-PH-10 / intake):** круглый mark (`DOGEstonia-logo-big.png`) + `<span className="header-brand-name">DOGEstonia</span>`; в `index.html` не было явного `<link rel="icon">` (только `<title>`).

**Итог:** FR-PH-10.* product **Done** (P3). Post-audit F1 → T06 As-of-Done SSOT; F2 → T07 pack hygiene; F3/F4 WAIVED → [PH-11](STORY-SPA-PH-11-empty-state-favicon-glyph.md) / [BUG-04](../bugs/STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md) drafts.

## Verified facts (code + assets — не гипотезы)

| Fact | Evidence |
|------|----------|
| **Current** public header brand | `logoSrc=/assets/DOGEstonia-logo-horizontal.png`; brand link = `img` only (нет `.header-brand-name`) · [`Header.jsx`](../../../../src/components/AppShell/Header.jsx) L19 · L99–105 |
| **Historical** pre-PH-10 header | PNG circular + `<span className="header-brand-name">DOGEstonia</span>` · `logoSrc=/assets/DOGEstonia-logo-big.png` (intake / audit F1) |
| Brand testid | `data-testid="public-header-brand"` |
| **Current** favicon head link | [`index.html`](../../../../index.html) L6: `<link rel="icon" href="./favicon.png" type="image/png" />` |
| **Historical** pre-PH-10 head | `index.html` без `<link rel="icon">` — только `<title>DOGEstonia</title>` |
| EmptyState glyph (out of PH-10 DoD) | EmptyState → `/favicon.svg` — follow-up [PH-11](STORY-SPA-PH-11-empty-state-favicon-glyph.md) |
| Inbound favicon | [`inbound/favicon.png`](../inbound/favicon.png) — RGBA **1024×1024** (wired → `public/favicon.png`) |
| Inbound / public horizontal | [`inbound/DOGEstonia-logo-horizontal.png`](../inbound/DOGEstonia-logo-horizontal.png) → `public/assets/DOGEstonia-logo-horizontal.png` — **RGB** **2172×724**, углы ~`#030d20` (lean: as-is; transparent pad → [BUG-04](../bugs/STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md)) |
| Circular asset (Footer / AppShell — out of scope) | `public/assets/DOGEstonia-logo-big.png` — RGBA (BUG-02 Done); **не** public Header brand |
| Fallback SVG | `public/assets/DOGEstonia-logo-fallback.svg` — `onError` |
| Alt | Header хардкодит `alt="DOGEstonia logo"` · L10N key `auth.brand.logoAlt` exists in [`identityDictionary.js`](../../../../src/i18n/identityDictionary.js) |

### Product lean (locked for this story)

- **Wire inbound as-is** (скопировать PNG в `public/` без обязательного transparent re-export) — **Done**.
- Horizontal RGB dark pad (~BUG-02 pattern) — **известный риск** визуального прямоугольника на `--color-bg-secondary`; **не** блокер DoD. Follow-up: [BUG-04](../bugs/STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md).

## Артборд

| Мокап | Роль |
|-------|------|
| **M129** | Контекст public header chrome — brand slot; wordmark-in-image вместо text name |
| Новый MVP artboard | **Не требуется** |

## Функциональные требования

- **FR-PH-10.1** Public `Header` brand image = horizontal PNG: скопировать inbound → `public/assets/DOGEstonia-logo-horizontal.png`; `src` указывает на него. **Удалить** `.header-brand-name` / любой видимый текстовый «DOGEstonia» рядом с logo.
- **FR-PH-10.2** Имя продукта только через `alt` на `img` (хардкод `DOGEstonia` / `DOGEstonia logo` или reuse `auth.brand.logoAlt` / publicHome key — на выбор реализации; главное — читаемый alt). При `onError` — fallback SVG; alt остаётся.
- **FR-PH-10.3** CSS: высота бренда ~44px strip; `width: auto`; `object-fit: contain`; без горизонтального overflow на narrow (~390).
- **FR-PH-10.4** Favicon: скопировать inbound → `public/favicon.png`; в [`index.html`](../../../../index.html) явный `<link rel="icon" href="./favicon.png" type="image/png" />` (работает на всех hash-routes SPA). SVG alternate — не обязателен.
- **FR-PH-10.5** Vitest: `public-header-brand` содержит logo `img`; **нет** visible text node «DOGEstonia» внутри brand link (кроме alt). Smoke: head содержит icon link (если harness позволяет).

## Acceptance Criteria

- [x] На `/#/board` (и др. public header) brand = horizontal logo; **нет** текстового «DOGEstonia» рядом с картинкой.
- [x] `img` имеет непустой `alt` с именем продукта.
- [x] Tab / bookmark icon = новый `favicon.png` (явный link в `index.html` + файл в `public/`).
- [x] Narrow viewport: brand не ломает header layout.
- [x] Click brand → `/board` (как PH-01).
- [x] No secrets in evidence / commits of assets.

## Субтаски (черновик → P1.3)

| # | Суть | Where |
|---|------|-------|
| **T01** | Copy inbound → `public/assets/DOGEstonia-logo-horizontal.png` + `public/favicon.png` | `public/` |
| **T02** | Wire Header: new `logoSrc`, remove `.header-brand-name`, CSS wide mark | `Header.jsx` · `Header.css` / `index.css` |
| **T03** | Wire favicon in `index.html` | `index.html` |
| **T04** | Vitest Header brand + optional screenshot happy header | `__tests__` · story screenshots after pipeline |
| **T05** | Story gate PH-10 | — |

## Where to change (implementation map — не сейчас)

```text
inbound/*.png  →  public/assets/DOGEstonia-logo-horizontal.png
               →  public/favicon.png
Header.jsx     →  logoSrc + remove span.header-brand-name
Header.css / index.css → .header-brand-logo sizing
index.html     →  <link rel="icon" href="./favicon.png" type="image/png" />
```

## Вне scope

- Footer brand text / circular mark ([`PublicFooter.jsx`](../../../../src/components/PublicFooter/PublicFooter.jsx)).
- Default AppShell circular logo (auth shell).
- Login page text mark (`auth.brand.name`).
- Landing brand / favicon.
- apple-touch-icon / webmanifest.
- Transparent re-export horizontal pad (optional follow-up).
- Regenerating M129 PNG artboard.

## Next (process)

1. ~~P1.3 — pipeline story + pkg~~ — Done 2026-08-07T20:45:13Z (`pkg-000056`).  
2. ~~P2 build window → P3 Path A~~ — Done 2026-08-07T20:53:02Z (gate PASS).  
3. ~~P4 audit → P5 scaffold → P6 T06/T07~~ — F1+F2 **CLOSED**.  
4. ~~P7~~ → **WAVE COMPLETE** 2026-08-08T08:40:26Z · `run_mode` retired.  
5. Commits — только по явной команде.  
6. Next backlog / new pkg (YAML default) · drafts PH-11 / BUG-04 optional.

## Notes

- Horizontal asset **уже** рисует «DOGE» + «stonia» — убрать DOM-текст обязательно, иначе double wordmark.  
- BUG-02 закрыл pad у **circular** big PNG; horizontal inbound — отдельный RGB asset.
