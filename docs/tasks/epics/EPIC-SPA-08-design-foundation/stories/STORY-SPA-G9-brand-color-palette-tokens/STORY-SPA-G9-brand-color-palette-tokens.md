# STORY-SPA-G9 — Brand color palette → G4 tokens

## Meta (pipeline)

- **Key:** `STORY-SPA-G9-brand-color-palette-tokens`
- **Parent Epic:** [`../../EPIC-SPA-08-design-foundation.md`](../../EPIC-SPA-08-design-foundation.md)
- **Epic:** EPIC-SPA-08 Design Foundation · Wave 4 (Brand palette)
- **Пакет:** `design-foundation/` (cross-cutting L0 Foundations)
- **Status:** ✅ Done
- **Severity:** 🟠 MED (brand visual cutover on existing token infra)
- **Wave:** `pkg-000042`
- **Scaffolded:** 2026-08-02T08:45:25Z
- **Gate Date:** 2026-08-02T08:59:09Z
- **source:** [`spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md`](../../../../backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md)
- **decision_ref:** [`../../../../backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md`](../../../../backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md); [DOGEstonia_Color_Palette_v1.0_RU.md](../../../../backlog-stories/design-foundation/DOGEstonia_Color_Palette_v1.0_RU.md); [design-system.md §2.1](../../../../UX/design-system.md); G4 Done [`STORY-SPA-G4-design-tokens-foundation.md`](../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md)
- **ui_scope:** `mixed`
- **UX brief:** [STORY-UX-MOCKUP-BRIEF.md](./STORY-UX-MOCKUP-BRIEF.md)
- **Gate:** [acceptance-verification-spa-g9.md](./task-spa-g9-t07-story-gate-g9/acceptance-verification-spa-g9.md)
- **Зависит от:** [G4 Design tokens](../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md) Done (`pkg-000038`)
- **Разблокирует:** визуальный паритет с brand SSOT для [EPIC-SPA-09 public-home](../../../EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) и остальных поверхностей

## Post-audit follow-up (P5 scaffold-only)

- `run_mode=spa_g9_audit_2026_08_02`
- Scoped gaps: audit F1 (commit HEAD), F2 (waive live surface PNGs). F3–F5 working-doc ignored; F6–F7 Info ignored.
- Queue: [SPA-G9-T08](./task-spa-g9-t08-commit-g9-brand-cutover/README.md) → [SPA-G9-T09](./task-spa-g9-t09-waive-visual-surface-shots/README.md)
- Status: ✅ Closed in P6 (T08 gate 2026-08-02T10:13:40Z; T09 gate 2026-08-02T10:13:40Z)
- Active pkg unchanged: `pkg-000042`

## SSOT дизайна

| Слой | Файл | Роль |
|------|------|------|
| **Brand hex + `--doge-*`** | [DOGEstonia_Color_Palette_v1.0_RU.md](../../../../backlog-stories/design-foundation/DOGEstonia_Color_Palette_v1.0_RU.md) §2–§6 | Утверждённая палитра |
| **Consumer CSS API** | [tokens.css](../../../../../../src/styles/tokens.css) `--color-*` | G4 Done — **не ломать** имена в компонентах |
| **Doc contract** | [design-system.md](../../../../UX/design-system.md) §2.1 | Обновить hex/naming после G9 |

G4 канонизировал инфраструктуру `var(--color-*)` и схлопнул drift по частоте литералов. G4 **явно исключал** «полный редизайн палитры». G9 — cutover hex на утверждённый brand поверх G4.

## Зачем простыми словами

В коде фон и акцент всё ещё «уголь + жёлтый» из G4-reconciliation (`#141417` / `#f5c518`). Утверждённая палитра — **Night System + Orange Signal** (`#0B1320` / `#F5A623`). Нужно стабилизировать палитру в `tokens.css` через `--doge-*` и перепривязать `--color-*`, чтобы весь SPA подтянул бренд без массовой переписки CSS-селекторов.

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

## Scope — Функциональные требования (FR)

- **FR-G9.1** В [`tokens.css`](../../../../../../src/styles/tokens.css) добавить полный блок brand primitives `--doge-*` = палитра §6 (байт-в-байт hex/rgba).
- **FR-G9.2** Все существующие `--color-*` (кроме danger/success) перепривязать к `var(--doge-*)` по таблице; добавить `--color-accent-hover`, `--color-text-warm`.
- **FR-G9.3** Компонентные CSS **не** обязаны массово менять имена `var(--color-*)` — cutover через токены.
- **FR-G9.4** Audit + fix CTA/badge: на `accent-primary` фон текст = `--doge-bg` или `--doge-ink` (не `--color-text-primary`/white).
- **FR-G9.5** Обновить [design-system.md](../../../../UX/design-system.md) §2.1: hex из палитры; ссылка на Color Palette v1.0; убрать «Yellow-500» как канон акцента.
- **FR-G9.6** Visual gate: board, filters, login, cabinet — night-blue canvas + Signal Orange accent; без layout-регрессий.
- **FR-G9.7** Header comment в `tokens.css`: brand SSOT = Color Palette v1.0; G4 hex superseded by G9.

## Scope — Субтаски (pipeline)

| Pipeline task | Суть |
|---------------|------|
| [SPA-G9-T01](./task-spa-g9-t01-insert-doge-brand-primitives/README.md) | Вставить `--doge-*` primitives из палитры §6 в `tokens.css` |
| [SPA-G9-T02](./task-spa-g9-t02-rebind-color-tokens-to-doge/README.md) | Перепривязать `--color-*` → `var(--doge-*)`; новые `--color-accent-hover`, `--color-text-warm`; surface/elevated |
| [SPA-G9-T03](./task-spa-g9-t03-cta-accent-contrast-fix/README.md) | Audit CSS: accent buttons/badges text contrast; fix white-on-orange |
| [SPA-G9-T04](./task-spa-g9-t04-design-system-palette-docs/README.md) | Doc: design-system §2.1 hex + palette link; naming Signal Orange / DOGE Night |
| [SPA-G9-T05](./task-spa-g9-t05-visual-gate-brand-surfaces/README.md) | Visual gate board / login / cabinet / filters; `npm test` |
| [SPA-G9-T06](./task-spa-g9-t06-docs-touchpoints-g4-index-header/README.md) | Touchpoints: INDEX G9 Done; note на G4 «hex superseded by G9»; `tokens.css` header |
| [SPA-G9-T07](./task-spa-g9-t07-story-gate-g9/README.md) | Story acceptance-verification gate |

## Тексты и переводы (en/et/ru)
**N/A** — инфраструктура стилей; UI-строки не меняются.

## Иконки
**N/A** — PNG/SVG маскота не перекрашивать в этой стори (палитра §4 — отдельный asset track).

## Routes / API
**N/A**.

## Зависимости
- **Requires:** [G4](../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md) Done.
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
| [design-system.md](../../../../UX/design-system.md) §2.1 | Hex + palette link; accent = Signal Orange |
| [DOGEstonia_Color_Palette_v1.0_RU.md](../../../../backlog-stories/design-foundation/DOGEstonia_Color_Palette_v1.0_RU.md) | Опц. ссылка «реализовано в tokens.css (G9)» |
| [STORY-SPA-G4…](../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md) | Note: runtime hex superseded by G9 (infra G4 остаётся) |
| [INDEX.md](../../../../backlog-stories/design-foundation/INDEX.md) | G9 Todo → Done |
| [`tokens.css`](../../../../../../src/styles/tokens.css) header | Brand SSOT pointer |

## Acceptance Criteria

- [x] `--doge-*` в `tokens.css` совпадают с палитрой §6.
- [x] `--color-*` (кроме danger/success) = `var(--doge-*)` по таблице маппинга; hover/warm добавлены.
- [x] CTA на accent: текст `--doge-bg` или `--doge-ink`; нет мелкого белого на `#F5A623`.
- [x] design-system §2.1 отражает палитру v1.0.
- [x] Visual gate board/login/cabinet/filters PASS; `npm test` зелёный.
- [x] INDEX G9 → Done; G4 note + tokens header обновлены.

## Швы
- Primary: [`src/styles/tokens.css`](../../../../../../src/styles/tokens.css)
- Contrast fixes: Login / AppErrorState / другие accent+text-primary паттерны (grep at execute)
- Docs: design-system, INDEX, G4 note
