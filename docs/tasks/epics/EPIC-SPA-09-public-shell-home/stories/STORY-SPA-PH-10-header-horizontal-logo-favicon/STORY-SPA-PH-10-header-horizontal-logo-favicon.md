# STORY-SPA-PH-10-header-horizontal-logo-favicon — Header horizontal logo + favicon

## Meta (pipeline)

- **Key:** `STORY-SPA-PH-10-header-horizontal-logo-favicon`
- **Parent Epic:** [`../../EPIC-SPA-09-public-shell-home.md`](../../EPIC-SPA-09-public-shell-home.md)
- **Epic:** EPIC-SPA-09 Public Shell + Home · **Wave 5**
- **Пакет:** `public-home/` · **Package:** `pkg-000056`
- **Status:** Done — P3 gate PASS 2026-08-07T20:53:02Z (`pkg-000056`) · **P7 WAVE COMPLETE** ([reaudit](../../../../analysis/reaudit-STORY-SPA-PH-10-gap-closure-2026-08-08.md) · F1/F2 CLOSED · F3/F4 WAIVED)
- **Severity:** 🟡 MED (brand chrome / demo polish)
- **source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md)
- **decision_ref:** backlog story + inbound [`favicon.png`](../../../../backlog-stories/inbound/favicon.png) · [`DOGEstonia-logo-horizontal.png`](../../../../backlog-stories/inbound/DOGEstonia-logo-horizontal.png) + [PH-01 Done](../../../../backlog-stories/public-home/STORY-SPA-PH-01-header-brand-nav.md) + [BUG-02 Done](../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md) + M129 context
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md` (context only — no new artboard)
- **Scaffolded:** 2026-08-07T20:45:13Z · **P3 Done:** 2026-08-07T20:53:02Z · **P6 T06:** 2026-08-08T08:33:15Z
- **Depends on:** [PH-01 Header brand/nav](../../../../backlog-stories/public-home/STORY-SPA-PH-01-header-brand-nav.md) Done · [BUG-02 logo pad](../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md) Done
- **Related:** PH-01 FR-PH-01.2 (logo + text name) — **superseded** by this story when Done; M129 context only (no new artboard required)

## Артборд (SSOT дизайна)

| Мокап | Роль |
|-------|------|
| **M129** | Контекст public header chrome — brand slot; wordmark-in-image вместо text name |
| Новый MVP artboard | **Не требуется** |

> P1.3 (spa UX ready): M129 `.md` (+ `.png` if present) on disk — wire `@mockup:` in T02/T04; do **not** create `STORY-UX-MOCKUP-BRIEF.md`.

## Зачем простыми словами

Horizontal asset уже содержит wordmark в картинке — отдельный текстовый span рядом с logo = дубль. Нужны: только horizontal logo в public header (имя в `alt`) + явный favicon link на всех spa hash-routes.

**As-of-Done (current):** public `Header` brand = `logoSrc=/assets/DOGEstonia-logo-horizontal.png` · `img` only (нет `.header-brand-name`) · [`Header.jsx`](../../../../../../src/components/AppShell/Header.jsx) L19 · L99–105. Favicon: `public/favicon.png` + `<link rel="icon" href="./favicon.png" type="image/png" />` в [`index.html`](../../../../../../index.html) L6. P3 gate PASS 2026-08-07T20:53:02Z.

**Historical (pre-PH-10 / intake):** круглый mark (`DOGEstonia-logo-big.png`) + `<span className="header-brand-name">DOGEstonia</span>`; в `index.html` не было явного `<link rel="icon">` (только `<title>`).

**Итог:** FR-PH-10.* product **Done** (P3). Post-audit F1 → T06 As-of-Done SSOT; F2 → T07 pack hygiene; F3/F4 WAIVED → [PH-11](../../../../backlog-stories/public-home/STORY-SPA-PH-11-empty-state-favicon-glyph.md) / [BUG-04](../../../../backlog-stories/bugs/STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md) drafts.

## Verified facts (code + assets — не гипотезы)

| Fact | Evidence |
|------|----------|
| **Current** public header brand | `logoSrc=/assets/DOGEstonia-logo-horizontal.png`; brand link = `img` only (нет `.header-brand-name`) · [`Header.jsx`](../../../../../../src/components/AppShell/Header.jsx) L19 · L99–105 |
| **Historical** pre-PH-10 header | PNG circular + `<span className="header-brand-name">DOGEstonia</span>` · `logoSrc=/assets/DOGEstonia-logo-big.png` (intake / audit F1) |
| Brand testid | `data-testid="public-header-brand"` |
| **Current** favicon head link | [`index.html`](../../../../../../index.html) L6: `<link rel="icon" href="./favicon.png" type="image/png" />` |
| **Historical** pre-PH-10 head | `index.html` без `<link rel="icon">` — только `<title>DOGEstonia</title>` |
| EmptyState glyph (out of PH-10 DoD) | EmptyState → `/favicon.svg` — follow-up [PH-11](../../../../backlog-stories/public-home/STORY-SPA-PH-11-empty-state-favicon-glyph.md) |
| Inbound favicon | [`inbound/favicon.png`](../../../../backlog-stories/inbound/favicon.png) — RGBA **1024×1024** (wired → `public/favicon.png`) |
| Inbound / public horizontal | [`inbound/DOGEstonia-logo-horizontal.png`](../../../../backlog-stories/inbound/DOGEstonia-logo-horizontal.png) → `public/assets/DOGEstonia-logo-horizontal.png` — **RGB** **2172×724**, углы ~`#030d20` (lean: as-is; transparent pad → [BUG-04](../../../../backlog-stories/bugs/STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md)) |
| Circular asset (Footer / AppShell — out of scope) | `public/assets/DOGEstonia-logo-big.png` — RGBA (BUG-02 Done); **не** public Header brand |
| Fallback SVG | `public/assets/DOGEstonia-logo-fallback.svg` — `onError` |
| Alt | Header хардкодит `alt="DOGEstonia logo"` · L10N key `auth.brand.logoAlt` exists in [`identityDictionary.js`](../../../../../../src/i18n/identityDictionary.js) |

### Product lean (locked for this story)

- **Wire inbound as-is** (скопировать PNG в `public/` без обязательного transparent re-export) — **Done**.
- Horizontal RGB dark pad (~BUG-02 pattern) — **известный риск** визуального прямоугольника на `--color-bg-secondary`; **не** блокер DoD. Follow-up: [BUG-04](../../../../backlog-stories/bugs/STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md).

## Функциональные требования

- **FR-PH-10.1** Public `Header` brand image = horizontal PNG: скопировать inbound → `public/assets/DOGEstonia-logo-horizontal.png`; `src` указывает на него. **Удалить** `.header-brand-name` / любой видимый текстовый «DOGEstonia» рядом с logo.
- **FR-PH-10.2** Имя продукта только через `alt` на `img` (хардкод `DOGEstonia` / `DOGEstonia logo` или reuse `auth.brand.logoAlt` / publicHome key — на выбор реализации; главное — читаемый alt). При `onError` — fallback SVG; alt остаётся.
- **FR-PH-10.3** CSS: высота бренда ~44px strip; `width: auto`; `object-fit: contain`; без горизонтального overflow на narrow (~390).
- **FR-PH-10.4** Favicon: скопировать inbound → `public/favicon.png`; в [`index.html`](../../../../../../index.html) явный `<link rel="icon" href="./favicon.png" type="image/png" />` (работает на всех hash-routes SPA). SVG alternate — не обязателен.
- **FR-PH-10.5** Vitest: `public-header-brand` содержит logo `img`; **нет** visible text node «DOGEstonia» внутри brand link (кроме alt). Smoke: head содержит icon link (если harness позволяет).

## Acceptance Criteria

- [x] На `/#/board` (и др. public header) brand = horizontal logo; **нет** текстового «DOGEstonia» рядом с картинкой.
- [x] `img` имеет непустой `alt` с именем продукта.
- [x] Tab / bookmark icon = новый `favicon.png` (явный link в `index.html` + файл в `public/`).
- [x] Narrow viewport: brand не ломает header layout.
- [x] Click brand → `/board` (как PH-01).
- [x] No secrets in evidence / commits of assets.

## Субтаски (pipeline)

| Таск | Волна | Task folder | Суть |
|------|-------|-------------|------|
| **T01** | 5 | [task-spa-ph-10-t01-copy-horizontal-logo-favicon](./task-spa-ph-10-t01-copy-horizontal-logo-favicon/README.md) | Done · P3 · **P4 verified** — Copy inbound → public/ |
| **T02** | 5 | [task-spa-ph-10-t02-wire-header-horizontal-brand](./task-spa-ph-10-t02-wire-header-horizontal-brand/README.md) | Done · P3 · **P4 verified** — Wire Header horizontal brand |
| **T03** | 5 | [task-spa-ph-10-t03-wire-favicon-index-html](./task-spa-ph-10-t03-wire-favicon-index-html/README.md) | Done · P3 · **P4 verified** — Wire favicon in `index.html` |
| **T04** | 5 | [task-spa-ph-10-t04-vitest-header-brand-favicon](./task-spa-ph-10-t04-vitest-header-brand-favicon/README.md) | Done · P3 · **P4 verified** — Vitest 6/6 |
| **T05** | 5 | [task-spa-ph-10-t05-story-gate-ph-10](./task-spa-ph-10-t05-story-gate-ph-10/README.md) | Done · P3 · **P4** (F1 backlog separate) — Story gate |
| **T06** | post-audit | [task-spa-ph-10-t06-as-of-done-backlog-ssot](./task-spa-ph-10-t06-as-of-done-backlog-ssot/README.md) | **Done** · P6 · **P7 CLOSED F1** |
| **T07** | post-audit | [task-spa-ph-10-t07-screenshots-pack-hygiene](./task-spa-ph-10-t07-screenshots-pack-hygiene/README.md) | **Done** · P6 · **P7 CLOSED F2** |

## Where to change (implementation map)

```text
inbound/*.png  →  public/assets/DOGEstonia-logo-horizontal.png
               →  public/favicon.png
Header.jsx     →  logoSrc + remove span.header-brand-name
Header.css / index.css → .header-brand-logo sizing
index.html     →  <link rel="icon" href="./favicon.png" type="image/png" />
```

## Вне scope

- Footer brand text / circular mark ([`PublicFooter.jsx`](../../../../../../src/components/PublicFooter/PublicFooter.jsx)).
- Default AppShell circular logo (auth shell).
- Login page text mark (`auth.brand.name`).
- Landing brand / favicon.
- apple-touch-icon / webmanifest.
- Transparent re-export horizontal pad (optional follow-up).
- Regenerating M129 PNG artboard.

## Notes

- Horizontal asset **уже** рисует «DOGE» + «stonia» — убрать DOM-текст обязательно, иначе double wordmark.
- BUG-02 закрыл pad у **circular** big PNG; horizontal inbound — отдельный RGB asset.
