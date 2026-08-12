# STORY-SPA-G11 — Brand token adoption / glue

## Meta

- **Key:** `STORY-SPA-G11-brand-token-adoption-glue`
- **Пакет:** `design-foundation/` (L0 Foundations / tokens → components)
- **Status:** ✅ Done (`pkg-000043`, gate 2026-08-02T12:55:51Z)
- **Severity:** 🟠 MED (post-G9 glue; doc hygiene + CSS literal debt)
- **Epic:** [EPIC-SPA-08](../../epics/EPIC-SPA-08-design-foundation/EPIC-SPA-08-design-foundation.md) Wave 5 · [pipeline](../../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/STORY-SPA-G11-brand-token-adoption-glue.md)
- **Зависит от:** [G9 Brand color palette](STORY-SPA-G9-brand-color-palette-tokens.md) **Done** (`pkg-000042`) — G9 **не reopen**
- **Координирует:** [G10 Button system](STORY-SPA-G10-button-system-ds-btn.md) — Wave 1 (`accent-hover` / ink) желательно до или вместе с Button foundation; G11 **не** блокирует G10
- **Источник gaps:** [reaudit-STORY-SPA-G9-gap-closure-2026-08-02.md](../../../analysis/reaudit-STORY-SPA-G9-gap-closure-2026-08-02.md) F3–F7 + deep-audit **F8** (legacy rgba)
- **Brand SSOT:** [DOGEstonia_Color_Palette_v1.0_RU.md](DOGEstonia_Color_Palette_v1.0_RU.md) · runtime [`tokens.css`](../../../../src/styles/tokens.css)

## SSOT дизайна

| Слой | Артефакт | Роль |
|------|----------|------|
| Brand hex / `--doge-*` | [Color Palette v1.0](DOGEstonia_Color_Palette_v1.0_RU.md) §2–§6 | Утверждённые цвета |
| Consumer CSS API | [`tokens.css`](../../../../src/styles/tokens.css) `--color-*` | G4 infra + G9 cutover (aliases) |
| Gap evidence | [reaudit G9](../../../analysis/reaudit-STORY-SPA-G9-gap-closure-2026-08-02.md) | F3–F7 triage; F1/F2 closed |
| Parent cutover | [STORY-SPA-G9](STORY-SPA-G9-brand-color-palette-tokens.md) | Done — canvas/accent; leftovers → **this story** |

G9 довёл палитру в `tokens.css` и перепривязал `--color-*`. G11 — **склейка**: использовать semantic-токены в компонентах, убрать hex/rgba хвосты, починить отстающую доку.

## Зачем простыми словами

Приложение уже на Night + Signal Orange через токены. Остались: устаревшие формулировки в backlog-доках; токены вроде hover/ink/soft, которые почти никто не читает; StatusBadge со своими `#252932`; десятки старых жёлтых/угольных `rgba` из pre-G9. Нужно доклеить токены к реальному CSS и подчистить доку — без отката G9.

## 🔬 Слой анализа — verified current-state (2026-08-02)

> Факты из reaudit + `rg` по `spa-app/src`. G9 HEAD cutover подтверждён (`0809fb9`).

### Gap map (F3–F8)

| ID | Sev | Суть | Класс |
|----|-----|------|-------|
| **F3** | Low | [G9 backlog](STORY-SPA-G9-brand-color-palette-tokens.md) §Зачем / §анализ всё ещё «уголь + жёлтый» / «0 hits `--doge-*`» | Doc hygiene |
| **F4** | Low | [G4](STORY-SPA-G4-design-tokens-foundation.md) «Вне scope» — `G9 … (Todo)` при Meta note Done `pkg-000042` | Doc hygiene |
| **F5** | Low | Color Palette Meta без touchpoint «реализовано в `tokens.css` / G9» | Doc hygiene |
| **F6** | Med | Semantic tokens defined, thin/zero component use | Execute glue |
| **F7** | Med | [`StatusBadge.css`](../../../../src/components/StatusBadge.css) — 5× hardcoded hex backgrounds | Execute glue |
| **F8** | Med | ~40+ legacy pre-G9 `rgba` (yellow/charcoal families) in **13** CSS files | Execute glue |

### A. Token wire inventory (`tokens.css` vs consumers)

| Token | Defined | `var(...)` вне `tokens.css` |
|-------|---------|------------------------------|
| `--color-accent-hover` | yes (`#FFB544`) | **0** |
| `--color-text-warm` | yes | **0** |
| `--doge-ink` | yes (`#111111`) | **0** |
| `--doge-cream` / `--doge-white` | yes | **0** |
| `--doge-accent-soft` | yes | **0** |
| `--color-border-default` | yes | **0** (есть `--color-border` ×2 LocaleSelector) |
| `--doge-bg` | yes | StoryActivity, AppErrorState only |
| `--color-accent-primary` / `--color-bg-*` / text | yes | used widely via G4 names |

### B. StatusBadge (F7)

| Selector | Hardcoded | Tokenized today |
|----------|-----------|-----------------|
| `.status-badge` | `background: #252932`; border `rgba(255,255,255,0.12)` | `color: --color-text-primary` |
| `.status-badge-new` | `#262a33` | text primary |
| `.status-badge-published` | `#2a271f`; border `rgba(179,139,71,0.45)` | `color: --color-accent-active` |
| `.status-badge-in-review` | `#242831` | text secondary |
| `.status-badge-unknown` | `#2a2a2a` | text secondary |

Файлы: [`StatusBadge.css`](../../../../src/components/StatusBadge.css), [`StatusBadge.jsx`](../../../../src/components/StatusBadge.jsx). Тесты — классы/лейблы, не цвета.

### C. Legacy rgba hotspots (F8) — pre-Signal / pre-Night

Семейства (не `245,166,35` Signal Orange):

| Family | Пример RGB | Файлы (≈hits) |
|--------|------------|---------------|
| Old yellow | `245,197,24` / `255,214,0` / `199,166,70` / `245,197,66` | Wallet, Contribution, Civic, StoryActivity, Login, CountryWaitlist, `index.css`, Filters, IssueCard, GptBridge, StoryHandoff, PhoneVerification |
| Old charcoal | `20,20,23` / `27,28,31` / `18,22,30` / `34,35,40` | GptBridge, SessionShell, Login, Civic, StoryHandoff, Phone, CountryWaitlist, UserCabinetPage |

**Top files by brand-family rgba count:** `index.css` (8), LoginPage (5), Wallet / Phone / Filters (4), Contribution / StoryHandoff / CountryWaitlist / Civic / SessionShell (3), IssueCard / GptBridge (2), StoryActivity (1).

### D. CTA contrast today (baseline для Wave 1)

Большинство primary: `background: var(--color-accent-primary)` + `color: var(--color-bg-primary)` или `--doge-bg`. **`:hover` не использует `--color-accent-hover`.** Soft fills (Wallet) — старый yellow rgba, не `--doge-accent-soft`.

## Решения (locked)

| ID | Решение |
|----|---------|
| **D-G11-1** | Consumer API = `--color-*`; прямые `--doge-*` — только contrast/spec (CTA ink/bg) или где нет consumer alias |
| **D-G11-2** | CTA label на accent → единый `var(--doge-ink)` **или** `var(--color-bg-primary)`; **обязательно** `:hover` → `var(--color-accent-hover)` (готово к G10 Button) |
| **D-G11-3** | StatusBadge: фоны → `--color-surface` / `--color-surface-elevated` / soft accent; borders → `--color-border*` / accent-soft; **не** вводить status-hex вне палитры v1.0 |
| **D-G11-4** | Legacy yellow/charcoal `rgba` → `var(--doge-accent-soft)` / `color-mix(...)` / surface tokens; gate → **0** brand-family литералов в product CSS вне `tokens.css` |
| **D-G11-5** | F3–F5 = Wave 0 этой стори; **G9 Status остаётся Done** |
| **D-G11-6** | Не блокирует G10; Wave 1 hover/ink желательно до/вместе с G10 foundation. `danger`/`success` не трогать (D-G9-3) |

## Функциональные требования (FR)

- **FR-G11.1** Wave 0 docs: переписать G9 §Зачем + §анализ как historical pre-cutover (или «As of Done» snapshot); G4 «Вне scope» → `G9 Done`; Color Palette Meta + touchpoint `tokens.css` / `pkg-000042` / G9.
- **FR-G11.2** Подключить `--color-accent-hover` на `:hover` / `:focus-visible` primary CTA surfaces (Login, StoryHandoff, Phone, SessionShell, Civic, StoryActivity, AppErrorState, …).
- **FR-G11.3** Унифицировать CTA label на accent: `--doge-ink` или `--color-bg-primary` (один выбранный паттерн в execute + зафиксировать в design-system §2.1 note).
- **FR-G11.4** Применить `--doge-accent-soft` (или consumer alias, если добавим `--color-accent-soft`) к soft accent fills (Wallet primary soft и аналоги).
- **FR-G11.5** Использовать `--color-text-warm` там, где UI копирует cream/warm secondary (не форсировать на весь secondary text).
- **FR-G11.6** StatusBadge: убрать все hex backgrounds; published border через brand accent tokens; сохранить class API и существующие тесты.
- **FR-G11.7** Migrate F8 rgba packs в 13 CSS files → tokens; inventory gate `rg` brand-family hex/rgba в `src/**/*.css` excl. `tokens.css` = **0**.
- **FR-G11.8** Vitest зелёный; StatusBadge tests pass; optional visual smoke board/login/cabinet.
- **FR-G11.9** INDEX G11 → Done при закрытии; reaudit F3–F8 marked addressed by G11 (не reopen G9).

## Субтаски

| Таск | Волна | Суть | Швы |
|------|-------|------|-----|
| **T01** | 0 | F3: G9 backlog §Зачем + §анализ → historical / post-Done wording | `STORY-SPA-G9-…md` |
| **T02** | 0 | F4: G4 «Вне scope» G9 `(Todo)` → Done | `STORY-SPA-G4-…md` |
| **T03** | 0 | F5: Color Palette Meta + «реализовано в tokens.css / G9 / pkg-000042» | `DOGEstonia_Color_Palette_v1.0_RU.md` |
| **T04** | 1 | Wire map: list every primary CTA selector + add `accent-hover`; unify ink/bg label | component `*.css` |
| **T05** | 1 | Soft fills → `--doge-accent-soft`; optional `--color-accent-soft` alias in tokens | `tokens.css` + Wallet/etc. |
| **T06** | 1 | Spot-apply `--color-text-warm` where cream copy fits; document Do/Don't | CSS + design-system note |
| **T07** | 2 | StatusBadge hex → surface / border / accent-soft; keep classes | `StatusBadge.css` |
| **T08** | 3 | RGBA pack A — cabinet: Wallet, Contribution, Civic, StoryActivity, UserCabinet | cabinet CSS |
| **T09** | 3 | RGBA pack B — auth/identity: Login, Phone, SessionShell, StoryHandoff, CountryWaitlist | identity CSS |
| **T10** | 3 | RGBA pack C — board/chrome: `index.css`, Filters, IssueCard, GptBridge | board CSS |
| **T11** | 4 | Inventory gate `rg`; vitest; INDEX/dashboard G11 Done; reaudit pointer closed | docs + tests |

## Тексты и переводы
**N/A** — стили/токены; UI-строки не меняются.

## Иконки
**N/A**.

## Routes / API
**N/A**.

## Зависимости
- **Requires:** G9 Done (`pkg-000042`).
- **Parallel OK:** G10 (prefer Wave 1 before Button color polish).
- **Consumers:** все component CSS с accent/soft/surface; StatusBadge; EPIC-SPA-09 chrome inherits tokens.

## Вне scope
- Полный DS-BTN / `Button.jsx` ([G10](STORY-SPA-G10-button-system-ds-btn.md))
- Новые цвета палитры / смена Night+Orange hex
- Re-run waived FR-G9.6 live PNG campaign
- Storybook; spacing px→var (G4 deferred)
- Изменение `--color-danger` / `--color-success`
- Execute кода в **этом** docs-intake шаге (только story + indexes)

## Documentation touchpoints (при закрытии execute)

| Файл | Действие |
|------|----------|
| [STORY-SPA-G9…](STORY-SPA-G9-brand-color-palette-tokens.md) | Historical wording (Wave 0); Meta pointer G11 |
| [STORY-SPA-G4…](STORY-SPA-G4-design-tokens-foundation.md) | Вне scope G9 Done |
| [Color Palette](DOGEstonia_Color_Palette_v1.0_RU.md) | Implemented touchpoint |
| [design-system.md](../../../UX/design-system.md) §2.1 | Note: hover/ink/soft usage; CTA label rule |
| [reaudit G9](../../../analysis/reaudit-STORY-SPA-G9-gap-closure-2026-08-02.md) | F3–F8 → addressed by G11 |
| [INDEX.md](INDEX.md) / spa-mvp-dashboard | G11 Todo → Done |

## Acceptance Criteria

- [x] F3–F5 docs synced with HEAD (G9 historical; G4 scope; palette implemented note).
- [x] Primary CTA `:hover` uses `--color-accent-hover`; label contrast rule unified.
- [x] `--doge-accent-soft` (and/or `--color-accent-soft`) used for soft accent fills where legacy yellow rgba lived.
- [x] StatusBadge: **0** hardcoded hex backgrounds; surfaces/borders via tokens.
- [x] Brand-family hex/rgba in `src/**/*.css` excl. `tokens.css` = **0** (inventory gate).
- [x] Vitest green; StatusBadge class tests pass.
- [x] INDEX G11 → Done; G9 remains Done; reaudit F3–F8 pointed to G11 closure.

## Швы
- Docs Wave 0: G9 / G4 / Color Palette / reaudit
- Tokens: optional `--color-accent-soft` alias
- Components: StatusBadge + 13 CSS rgba files + primary CTA hover/ink
- Gate: `rg` inventory + vitest
