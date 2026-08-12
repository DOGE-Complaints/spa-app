# STORY-SPA-G9 — Brand color palette → G4 tokens

## Meta

- **Key:** `STORY-SPA-G9-brand-color-palette-tokens`
- **Пакет:** `design-foundation/` (cross-cutting L0 Foundations)
- **Status:** Done
- **Severity:** 🟠 MED (brand visual cutover on existing token infra)
- **Epic:** follow-on [EPIC-SPA-08](../../epics/EPIC-SPA-08-design-foundation/EPIC-SPA-08-design-foundation.md)
- **Wave:** `pkg-000042`
- **Gate Date:** 2026-08-02T08:59:09Z
- **Зависит от:** [G4 Design tokens](STORY-SPA-G4-design-tokens-foundation.md) Done (`pkg-000038`)
- **Разблокирует:** визуальный паритет с brand SSOT для [EPIC-SPA-09 public-home](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) и остальных поверхностей
- **Источник палитры:** [DOGEstonia_Color_Palette_v1.0_RU.md](DOGEstonia_Color_Palette_v1.0_RU.md) (утверждена)
- **Follow-on (leftovers F3–F8):** [STORY-SPA-G11-brand-token-adoption-glue](STORY-SPA-G11-brand-token-adoption-glue.md) — docs hygiene + token→CSS glue; **не** reopen G9

## SSOT дизайна

| Слой | Файл | Роль |
|------|------|------|
| **Brand hex + `--doge-*`** | [DOGEstonia_Color_Palette_v1.0_RU.md](DOGEstonia_Color_Palette_v1.0_RU.md) §2–§6 | Утверждённая палитра |
| **Consumer CSS API** | [tokens.css](../../../../src/styles/tokens.css) `--color-*` | G4 Done — **не ломать** имена в компонентах |
| **Doc contract** | [design-system.md](../../../UX/design-system.md) §2.1 | Обновить hex/naming после G9 |

G4 канонизировал инфраструктуру `var(--color-*)` и схлопнул drift по частоте литералов. G4 **явно исключал** «полный редизайн палитры». G9 — cutover hex на утверждённый brand поверх G4.

## Зачем простыми словами

**As of Done (`pkg-000042`, gate 2026-08-02T08:59:09Z; HEAD `0809fb9`):** runtime canvas/accent = **Night System + Orange Signal** (`#0B1320` / `#F5A623`) через `--doge-*` → `--color-*` в [`tokens.css`](../../../../src/styles/tokens.css). Цель волны G9 была стабилизировать палитру в токенах и перепривязать consumer API без массовой переписки селекторов — **сделано**.

**Historical (pre-cutover context, kept for audit trail):** до G9 в коде жили G4-reconciliation «уголь + жёлтый» (`#141417` / `#f5c518`). Leftovers (unused semantic tokens, StatusBadge hex, legacy rgba, stale docs) → follow-on [G11](STORY-SPA-G11-brand-token-adoption-glue.md); **G9 не reopen**.

## 🔬 Слой анализа — historical pre-cutover snapshot (captured 2026-08-02; superseded by Done)

> Snapshot ниже = **состояние до** G9 cutover. Не описывает текущий HEAD. As-of-Done: `--doge-*` + consumer rebind в `tokens.css`; design-system §2.1 Night/Orange; leftovers → G11.

**A. Brand SSOT (pre-cutover):** палитра утверждена; primitives ещё не были в runtime.
- [DOGEstonia_Color_Palette_v1.0_RU.md](DOGEstonia_Color_Palette_v1.0_RU.md) §6 задаёт `:root` `--doge-*`.
- Pre-cutover grep `--doge-` / `#0B1320` / `#F5A623` в стилях: **0 hits** — **исторический** факт; post-Done HEAD содержит `--doge-*` в `tokens.css`.

**B. G4 tokens live — другой hex (pre-G9).**

| Token | Hex тогда (G4) |
|-------|----------------|
| `--color-bg-primary` | `#141417` |
| `--color-bg-secondary` | `#1b1c1f` |
| `--color-text-primary` | `#f2f2f2` |
| `--color-text-secondary` | `#9a9da6` |
| `--color-accent-primary` | `#f5c518` |
| `--color-accent-active` | `#c7a646` |
| `--color-border-default` | `#8f939f` |
| `--color-border-muted` | `#6b6e78` |
| `--color-danger` / `--color-success` | `#ff7b7b` / `#9be28d` (палитра не задаёт) |

**C. Mismatch brand ↔ G4 (ключ drift, закрыт G9).**

| Palette | Hex | G4 token | G4 hex then | Разрыв |
|---------|-----|----------|-------------|--------|
| DOGE Night / `--doge-bg` | `#0B1320` | `--color-bg-primary` | `#141417` | charcoal ≠ night-blue → **closed** |
| Signal Orange / `--doge-accent` | `#F5A623` | `--color-accent-primary` | `#f5c518` | orange ≠ yellow → **closed** |

**D. CTA contrast (палитра §5) — addressed in G9 T03; further hover/ink glue → G11.**
- Белый на `#F5A623` запрещён; CTA label = `--doge-bg` / ink pattern.

**E. design-system §2.1** — post-G9: Night/Orange (не «Yellow-500» as brand accent).

## Решения (locked)

| ID | Решение |
|----|---------|
| **D-G9-1** | Brand primitives = полный набор `--doge-*` из палитры §6 — SSOT hex |
| **D-G9-2** | Consumer API остаётся `--color-*` (G4); значения = `var(--doge-*)` по таблице маппинга |
| **D-G9-3** | `danger`/`success` — **не трогать** (вне палитры v1.0) |
| **D-G9-4** | Добавить semantic, которых нет в G4 §2.1: `--color-accent-hover`, `--color-text-warm` (опц. usage), surface-2 через elevated |
| **D-G9-5** | Visual shift ожидаем (night-blue + orange) — gate = brand parity, не «identical to G4 yellow» |

## Маппинг (обязательный контракт execute)

| `--doge-*` (palette §6) | Hex | `--color-*` (G4 consumer) |
|-------------------------|-----|---------------------------|
| `--doge-bg` | `#0B1320` | `--color-bg-primary` |
| `--doge-surface-1` | `#111C2B` | `--color-bg-secondary`, `--color-surface` |
| `--doge-surface-2` | `#172538` | `--color-surface-elevated` |
| `--doge-border` | `#2B3A4D` | `--color-border-default`, `--color-border` |
| `--doge-text` | `#FFFFFF` | `--color-text-primary` |
| `--doge-text-warm` | `#FFF4DE` | `--color-text-warm` (**новый** semantic) |
| `--doge-text-2` | `#B8C2CF` | `--color-text-secondary` |
| `--doge-muted` | `#7D8999` | `--color-text-muted`, `--color-border-muted` |
| `--doge-accent` | `#F5A623` | `--color-accent-primary` |
| `--doge-accent-hover` | `#FFB544` | `--color-accent-hover` (**новый**) |
| `--doge-accent-active` | `#D98F17` | `--color-accent-active` |
| `--doge-accent-soft` | `rgba(245,166,35,0.14)` | optional soft fill token / reuse where glow needed |
| `--doge-cream` | `#FFF4DE` | brand only (иллюстрации); alias warm text ok |
| `--doge-white` | `#FFFFFF` | = text / white |
| `--doge-ink` | `#111111` | CTA text on accent where needed |

`--color-border-subtle`: пересчитать на базе `--doge-*` (не оставлять `rgba(245,247,250,0.08)` без ревью контраста на night bg).

## Функциональные требования (FR)

- **FR-G9.1** В [`tokens.css`](../../../../src/styles/tokens.css) добавить полный блок brand primitives `--doge-*` = палитра §6 (байт-в-байт hex/rgba).
- **FR-G9.2** Все существующие `--color-*` (кроме danger/success) перепривязать к `var(--doge-*)` по таблице; добавить `--color-accent-hover`, `--color-text-warm`.
- **FR-G9.3** Компонентные CSS **не** обязаны массово менять имена `var(--color-*)` — cutover через токены.
- **FR-G9.4** Audit + fix CTA/badge: на `accent-primary` фон текст = `--doge-bg` или `--doge-ink` (не `--color-text-primary`/white).
- **FR-G9.5** Обновить [design-system.md](../../../UX/design-system.md) §2.1: hex из палитры; ссылка на Color Palette v1.0; убрать «Yellow-500» как канон акцента.
- **FR-G9.6** Visual gate: board, filters, login, cabinet — night-blue canvas + Signal Orange accent; без layout-регрессий.
- **FR-G9.7** Header comment в `tokens.css`: brand SSOT = Color Palette v1.0; G4 hex superseded by G9.

## Субтаски

| Таск | Суть | Швы |
|------|------|-----|
| **T01** | Вставить `--doge-*` primitives из палитры §6 в `tokens.css` | `tokens.css` |
| **T02** | Перепривязать `--color-*` → `var(--doge-*)`; новые `--color-accent-hover`, `--color-text-warm`; surface/elevated | `tokens.css` |
| **T03** | Audit CSS: accent buttons/badges text contrast; fix white-on-orange (Login, AppErrorState, др. grep) | компонентные `*.css` |
| **T04** | Doc: design-system §2.1 hex + palette link; naming Signal Orange / DOGE Night | `design-system.md` |
| **T05** | Visual gate board / login / cabinet / filters; `npm test` | screenshots / vitest |
| **T06** | Touchpoints: INDEX G9 Done; note на G4 «hex superseded by G9»; `tokens.css` header | docs + `tokens.css` |

## Тексты и переводы (en/et/ru)
**N/A** — инфраструктура стилей; UI-строки не меняются.

## Иконки
**N/A** — PNG/SVG маскота не перекрашивать в этой стори (палитра §4 — отдельный asset track).

## Routes / API
**N/A**.

## Зависимости
- **Requires:** [G4](STORY-SPA-G4-design-tokens-foundation.md) Done.
- **Consumers:** все `var(--color-*)` в SPA; EPIC-SPA-09 выиграет без отдельных color stories.

## Вне scope
- Light theme / `prefers-color-scheme`.
- Перерисовка лого/маскота ассетов.
- Public-home layout (EPIC-SPA-09) — только токены.
- Spacing / typography (G4/G7).
- Pipeline epic task READMEs / `pkg-*` (отдельный P1.3).
- Изменение `--color-danger` / `--color-success`.

## Documentation touchpoints (при закрытии execute)

| Файл | Действие |
|------|----------|
| [design-system.md](../../../UX/design-system.md) §2.1 | Hex + palette link; accent = Signal Orange |
| [DOGEstonia_Color_Palette_v1.0_RU.md](DOGEstonia_Color_Palette_v1.0_RU.md) | Опц. ссылка «реализовано в tokens.css (G9)» |
| [STORY-SPA-G4…](STORY-SPA-G4-design-tokens-foundation.md) | Note: runtime hex superseded by G9 (infra G4 остаётся) |
| [INDEX.md](INDEX.md) | G9 Todo → Done |
| [`tokens.css`](../../../../src/styles/tokens.css) header | Brand SSOT pointer |

## Acceptance Criteria

- [x] `--doge-*` в `tokens.css` совпадают с палитрой §6.
- [x] `--color-*` (кроме danger/success) = `var(--doge-*)` по таблице маппинга; hover/warm добавлены.
- [x] CTA на accent: текст `--doge-bg` или `--doge-ink`; нет мелкого белого на `#F5A623`.
- [x] design-system §2.1 отражает палитру v1.0.
- [x] Visual gate board/login/cabinet/filters PASS; `npm test` зелёный.
- [x] INDEX G9 → Done; G4 note + tokens header обновлены.

## Швы
- Primary: [`src/styles/tokens.css`](../../../../src/styles/tokens.css)
- Contrast fixes: Login / AppErrorState / другие accent+text-primary паттерны (grep at execute)
- Docs: design-system, INDEX, G4 note
