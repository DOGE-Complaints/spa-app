# STORY-SPA-G10 — Button system (DS-BTN)

## Meta (pipeline)

- **Key:** `STORY-SPA-G10-button-system-ds-btn`
- **Parent Epic:** [`../../EPIC-SPA-08-design-foundation.md`](../../EPIC-SPA-08-design-foundation.md)
- **Epic:** EPIC-SPA-08 Design Foundation · Wave 6 (Button system DS-BTN)
- **Пакет:** `design-foundation/` (L0 Foundations / Components)
- **Status:** Done
- **Severity:** 🟠 MED-HIGH (cross-cutting UI; Done — remaining raw `<button` excl. tests+Button = **22** documented exceptions)
- **Functional code:** `DS-BTN`
- **Wave:** `pkg-000044`
- **Scaffolded:** 2026-08-02T20:13:25Z
- **source:** [`spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G10-button-system-ds-btn.md`](../../../../backlog-stories/design-foundation/STORY-SPA-G10-button-system-ds-btn.md)
- **decision_ref:** [`../../../../backlog-stories/design-foundation/STORY-SPA-G10-button-system-ds-btn.md`](../../../../backlog-stories/design-foundation/STORY-SPA-G10-button-system-ds-btn.md); [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md); [design-system-buttons-spec.png](../../../../../UX/design-system-buttons-spec.png); [button-system-developer-guide.md](../../../../../runtime-docs/button-system-developer-guide.md); G9 Done [`STORY-SPA-G9-brand-color-palette-tokens.md`](../../../../backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md); [`tokens.css`](../../../../../../src/styles/tokens.css)
- **ui_scope:** `mixed`
- **Gate:** [acceptance-verification-spa-g10.md](./task-spa-g10-t12-story-gate-g10/acceptance-verification-spa-g10.md)
- **Зависит от:** [G9 Brand color palette](../../../../backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md) Done — primary/accent tokens; [G4](../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md) token infra
- **Координирует:** [EPIC-SPA-09 public-home](../../../EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) — новые CTA сразу на `Button`; Wave 3 миграция chrome
- **SSOT contract:** [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md) + [PNG artboard](../../../../../UX/design-system-buttons-spec.png)
- **Developer guide:** [button-system-developer-guide.md](../../../../../runtime-docs/button-system-developer-guide.md)

## SSOT дизайна

| Слой | Артефакт | Роль |
|------|----------|------|
| Implementation contract | [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md) | API, states, a11y, migration §41, AC §43 |
| Visual reference | [design-system-buttons-spec.png](../../../../../UX/design-system-buttons-spec.png) (M134) | Hierarchy × states; **written spec wins** over image artifacts (§40) |
| Product mockup `.md` | `mockup-134-…` | **Отсутствует в репо** (2026-08-02) — не блокирует; SSOT = spec + PNG |
| Brand colors | G9 / [`tokens.css`](../../../../../../src/styles/tokens.css) | Primary fill = `--color-accent-primary` (`#F5A623`), not PNG yellow |
| How-to for engineers | [button-system-developer-guide.md](../../../../../runtime-docs/button-system-developer-guide.md) | Slim rules; не дублировать весь contract |

Принцип:

```text
Function determines hierarchy.
Hierarchy determines appearance.
```

Запрет: `SubmitStoryButton` / `LoginButton` / `RetryButton` — только semantic `Button` + props.

## Зачем простыми словами

До G10 в SPA не было общего button-пакета: экраны рисовали свой `<button>` и CSS. Нужен был единый DS-BTN (`Button` / `IconButton` / `ButtonGroup` / `MenuAction`), миграция CTA и гид, чтобы новые фичи (в т.ч. public-home) не плодили page-local стили. **As-of-Done:** пакет и миграции в HEAD (`d767a13`); см. §анализ ниже.

## 🔬 Слой анализа — As-of-Done snapshot (2026-08-03T09:31:11Z)

> Historical pre-exec (2026-08-02 scaffold): shared Button absent; LoginPage `<button` ≈13; ~108 tags incl. tests. **Current:** live tree / reaudit pass3.

**A. Shared component — да (Done).**
- Package [`src/components/Button/`](../../../../../../src/components/Button/): `Button`, `IconButton`, `ButtonGroup`, `MenuAction` + CSS + Vitest — HEAD `d767a13`.

**B. Inventory (raw `<button`, excl. tests + `Button/`).**
- Product remaining = **22** (Filters chips/triggers + `CountrySelector` listbox) — guide §8 exceptions.
- Waves 2–4 product CTAs on `Button` / `MenuAction`.

**C. Page-local CSS.**
- Legacy `*-btn` product names = **0** (T11). Chip/listbox exceptions keep local styles by design.

**D. Color / contrast.**
- Primary on accent = `--doge-ink` via button tokens / `--color-btn-on-primary`.

**E. Spec / guide.**
- buttons-spec Implemented; developer guide live; design-system §4.0.

**F. Adoption notes (not blockers).**
- `IconButton` / `ButtonGroup`: shipped + tested; **0 product consumers** — definition-ready (T15).
- Public-home chrome: **N/A** in `src` until EPIC-SPA-09; new PH CTAs → `Button`.

## Решения (locked)

| ID | Решение |
|----|---------|
| **D-G10-1** | Implement `Button`, `IconButton`, `ButtonGroup`, `MenuAction` per spec §2–§3. **`SplitButton` out of scope.** |
| **D-G10-2** | Colors via G9 tokens only; no new raw hex except marked `TODO DS-BTN` during migration |
| **D-G10-3** | Migration = 4 waves aligned to spec §41; Wave 3 ↔ EPIC-SPA-09 (новые PH CTA сразу на `Button`) |
| **D-G10-4** | Slim guide in `runtime-docs/`; full contract stays UX spec |
| **D-G10-5** | At execute: refresh grep inventory; exit criterion = no new page-specific button CSS; product CTAs use shared system |
| **D-G10-6** | No Storybook required if absent — Vitest + optional dev examples |

## Функциональные требования (FR)

- **FR-G10.1** Package `src/components/Button/` per spec §3: `Button`, `IconButton`, `ButtonGroup`, `MenuAction` + CSS module/tokens.
- **FR-G10.2** Axes independent: `hierarchy` · `intent` · `size` · form factor · runtime state (не один overloaded `variant`).
- **FR-G10.3** Hierarchies: primary / secondary / tertiary / link-style; destructive independent of hierarchy (spec §10).
- **FR-G10.4** Sizes S/M/L (32 / 40 / 44–48); touch target ≥44px mobile where required.
- **FR-G10.5** Loading: stable width, `aria-busy`, no double-submit; Disabled: `aria-disabled` / native `disabled`.
- **FR-G10.6** `href`/`external`: correct element (`a` vs `button`); external handoff affordance for GPT/submit.
- **FR-G10.7** Button tokens in `tokens.css` (radius / focus / control-height / button semantic colors) — extend G9, don’t fork palette.
- **FR-G10.8** Migrate all product `<button>` CTAs in Waves 2–4; Filters chips may stay toggle semantics but must use shared styles or documented exception.
- **FR-G10.9** [Developer guide](../../../../../runtime-docs/button-system-developer-guide.md) is required reading for new UI (linked from design-system + story).
- **FR-G10.10** L10N: labels via `t()`; no hardcoded EN-only CTA in migrated surfaces.
- **FR-G10.L10N** N/A for component chrome strings beyond existing product keys; loading labels reuse/extend i18n as needed.

## Субтаски (pipeline)

| Таск | Волна | Task folder | Суть |
|------|-------|-------------|------|
| **T01** | 1 | [task-spa-g10-t01-button-tokens-tokens-css](./task-spa-g10-t01-button-tokens-tokens-css/README.md) | Button tokens in `tokens.css` |
| **T02** | 1 | [task-spa-g10-t02-button-component](./task-spa-g10-t02-button-component/README.md) | `<Button />` + CSS |
| **T03** | 1 | [task-spa-g10-t03-icon-button](./task-spa-g10-t03-icon-button/README.md) | `<IconButton />` |
| **T04** | 1 | [task-spa-g10-t04-button-group](./task-spa-g10-t04-button-group/README.md) | `<ButtonGroup />` |
| **T05** | 1 | [task-spa-g10-t05-menu-action](./task-spa-g10-t05-menu-action/README.md) | `<MenuAction />` |
| **T06** | 1 | [task-spa-g10-t06-vitest-button-states-a11y](./task-spa-g10-t06-vitest-button-states-a11y/README.md) | Vitest hierarchies/a11y/loading |
| **T07** | 1 | [task-spa-g10-t07-confirm-guide-design-system-link](./task-spa-g10-t07-confirm-guide-design-system-link/README.md) | Guide + design-system link |
| **T08** | 2 | [task-spa-g10-t08-migrate-identity-auth-ctas](./task-spa-g10-t08-migrate-identity-auth-ctas/README.md) | Migrate Login/Phone/SessionShell/StoryGate |
| **T09** | 2 | [task-spa-g10-t09-migrate-cabinet-handoff-ctas](./task-spa-g10-t09-migrate-cabinet-handoff-ctas/README.md) | Migrate cabinet + handoff CTAs |
| **T10** | 3 | [task-spa-g10-t10-migrate-board-filters-public-home-ctas](./task-spa-g10-t10-migrate-board-filters-public-home-ctas/README.md) | Board/Issue/Filters + PH chrome |
| **T11** | 4 | [task-spa-g10-t11-cleanup-page-local-btn-css](./task-spa-g10-t11-cleanup-page-local-btn-css/README.md) | Cleanup `*-btn` CSS / inventory |
| **T12** | 4 | [task-spa-g10-t12-story-gate-g10](./task-spa-g10-t12-story-gate-g10/README.md) | Visual gate M134 + story AC §43 |
| **T13** | post | [task-spa-g10-t13-commit-g10-button-system](./task-spa-g10-t13-commit-g10-button-system/README.md) | Commit G10 to HEAD |
| **T14** | post | [task-spa-g10-t14-waive-visual-m134-evidence](./task-spa-g10-t14-waive-visual-m134-evidence/README.md) | Waive M134 PNG evidence |
| **T15** | pass3 | [task-spa-g10-t15-close-pass3-leftover-docs](./task-spa-g10-t15-close-pass3-leftover-docs/README.md) | Docs F3/F5/F6 leftovers |

## Тексты и переводы
Компонент не вводит marketing copy. Product labels остаются в существующих dictionaries; loading strings — `t()` keys where introduced.

## Иконки
Reuse catalog icons (EPIC-04 / ID-12 / PH); monochrome 16–20px. Intent→icon mapping per spec §9 / artboard — не декоративные иконки.

## Routes / API
N/A (UI). External GPT URL — PH-06 / existing env helper.

## Зависимости
- G9 Done (accent tokens + CTA contrast).
- EPIC-SPA-09: Wave 3 coordination; PH stories must not invent new button CSS.

## Вне scope
- `SplitButton`
- Storybook (unless already in repo)
- Light theme
- Re-drawing M134 PNG; inventing mockup-134.md (optional later)
- Changing brand palette hex

## Documentation touchpoints (при закрытии execute)

| Файл | Действие |
|------|----------|
| [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md) | Status → Implemented; link pipeline |
| [button-system-developer-guide.md](../../../../../runtime-docs/button-system-developer-guide.md) | Keep in sync with API |
| [design-system.md](../../../../../UX/design-system.md) | Link Buttons section → guide + component path |
| [INDEX.md](../../../../backlog-stories/design-foundation/INDEX.md) | G10 Todo → Done |
| EPIC-SPA-08 / spa-mvp-dashboard | Progress |

## Acceptance Criteria

- [x] `Button` supports primary/secondary/tertiary/link-style; destructive independent; S/M/L; icons; loading; disabled; focus.
- [x] `IconButton`, `ButtonGroup`, `MenuAction` ship per spec.
- [x] Colors from G9 tokens; primary label contrast compliant.
- [x] Product CTAs migrated (Waves 2–4); no **new** page-specific button styling.
- [x] Vitest covers states + a11y; visual gate PASS vs M134 semantics.
- [x] Developer guide live; engineers use it for new UI.
- [x] Spec §43 AC satisfied; INDEX G10 → Done.

## Швы
- New: `src/components/Button/*`
- Tokens: `src/styles/tokens.css`
- Migration: Login, StoryHandoff, Cabinet cards, Board/Issue, Filters, AppShell account menu, PH chrome
- Docs: guide + design-system links
