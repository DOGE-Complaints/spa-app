# STORY-SPA-G10 — Button system (DS-BTN)

## Meta

- **Key:** `STORY-SPA-G10-button-system-ds-btn`
- **Пакет:** `design-foundation/` (L0 Foundations / Components)
- **Status:** Done — `pkg-000044` (gate T12; vitest 436 pass / 2 skip)
- **Severity:** 🟠 MED-HIGH (cross-cutting UI; Done — remaining raw `<button` excl. tests+Button = **22** documented exceptions)
- **Functional code:** `DS-BTN`
- **Epic:** [EPIC-SPA-08](../../epics/EPIC-SPA-08-design-foundation/EPIC-SPA-08-design-foundation.md) Wave 6 · [pipeline](../../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G10-button-system-ds-btn/STORY-SPA-G10-button-system-ds-btn.md)
- **Зависит от:** [G9 Brand color palette](STORY-SPA-G9-brand-color-palette-tokens.md) Done — primary/accent tokens; [G4](STORY-SPA-G4-design-tokens-foundation.md) token infra
- **Координирует:** [EPIC-SPA-09 public-home](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) — новые CTA сразу на `Button`; Wave 3 миграция chrome
- **SSOT contract:** [design-system-buttons-spec.md](../../../UX/design-system-buttons-spec.md) + [PNG artboard](../../../UX/design-system-buttons-spec.png)
- **Developer guide:** [button-system-developer-guide.md](../../../runtime-docs/button-system-developer-guide.md)

## SSOT дизайна

| Слой | Артефакт | Роль |
|------|----------|------|
| Implementation contract | [design-system-buttons-spec.md](../../../UX/design-system-buttons-spec.md) | API, states, a11y, migration §41, AC §43 |
| Visual reference | [design-system-buttons-spec.png](../../../UX/design-system-buttons-spec.png) (M134) | Hierarchy × states; **written spec wins** over image artifacts (§40) |
| Product mockup `.md` | `mockup-134-…` | **Отсутствует в репо** (2026-08-02) — не блокирует; SSOT = spec + PNG |
| Brand colors | G9 / [`tokens.css`](../../../../src/styles/tokens.css) | Primary fill = `--color-accent-primary` (`#F5A623`), not PNG yellow |
| How-to for engineers | [button-system-developer-guide.md](../../../runtime-docs/button-system-developer-guide.md) | Slim rules; не дублировать весь contract |

Принцип:

```text
Function determines hierarchy.
Hierarchy determines appearance.
```

Запрет: `SubmitStoryButton` / `LoginButton` / `RetryButton` — только semantic `Button` + props.

## Зачем простыми словами

До G10 в SPA не было общего button-пакета: экраны рисовали свой `<button>` и CSS. Нужен был единый DS-BTN (`Button` / `IconButton` / `ButtonGroup` / `MenuAction`), миграция CTA и гид, чтобы новые фичи (в т.ч. public-home) не плодили page-local стили. **As-of-Done:** пакет и миграции в HEAD (`d767a13`); см. §анализ ниже.

## 🔬 Слой анализа — As-of-Done snapshot (2026-08-03T09:31:11Z)

> Historical pre-exec snapshot (2026-08-02): shared Button **0 files**; ~108 `<button` incl. tests. **Current (post G10):** claims below from live tree / reaudit pass3.

**A. Shared component — да (Done).**
- Package [`src/components/Button/`](../../../../src/components/Button/): `Button`, `IconButton`, `ButtonGroup`, `MenuAction` + CSS + Vitest — in HEAD commit `d767a13`.

**B. Inventory (raw `<button`, excl. tests + `Button/`).**
- Product remaining = **22** (documented exceptions: Filters chips/triggers + `CountrySelector` listbox) — guide §8; not ~108 current.
- Product CTAs Waves 2–4 migrated to `Button` / `MenuAction` (Login, cabinet/handoff, Board/Issue, shell).

**C. Page-local CSS.**
- Legacy `*-btn` product class names = **0** (T11). Chip/listbox exceptions keep local Filters/`CountrySelector` styles by design.

**D. Color / contrast.**
- Primary text on accent = `--doge-ink` via `--color-btn-on-primary` / button tokens in `tokens.css`.

**E. Spec / guide.**
- [design-system-buttons-spec.md](../../../UX/design-system-buttons-spec.md) Status Implemented; [button-system-developer-guide.md](../../../runtime-docs/button-system-developer-guide.md) live; design-system §4.0.

**F. Adoption notes (not blockers).**
- `IconButton` / `ButtonGroup`: shipped + tested; **0 product consumers** — definition-ready (SPA-G10-T15 / guide).
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
- **FR-G10.9** [Developer guide](../../../runtime-docs/button-system-developer-guide.md) is required reading for new UI (linked from design-system + story).
- **FR-G10.10** L10N: labels via `t()`; no hardcoded EN-only CTA in migrated surfaces.
- **FR-G10.L10N** N/A for component chrome strings beyond existing product keys; loading labels reuse/extend i18n as needed.

## Субтаски

| Таск | Волна | Суть | Швы |
|------|-------|------|-----|
| **T01** | 1 | Button tokens (height/radius/focus/accent-on-primary text) in `tokens.css` | `tokens.css` |
| **T02** | 1 | `<Button />` + CSS; hierarchies + sizes + loading/disabled/focus | `src/components/Button/` |
| **T03** | 1 | `<IconButton />` | same |
| **T04** | 1 | `<ButtonGroup />` responsive | same |
| **T05** | 1 | `<MenuAction />` (Profile / Log out patterns — PH-02 ready) | same |
| **T06** | 1 | Vitest: hierarchies, a11y labels, loading lock, nav element rules | `__tests__` |
| **T07** | 1 | Confirm guide published; link from design-system.md | docs |
| **T08** | 2 | Migrate Login + PhoneVerification + SessionShell + StoryGate panels | identity pages/components |
| **T09** | 2 | Migrate StoryHandoff / StorySubmit + AppErrorState + Civic/Story/Wallet/Contribution CTAs | cabinet + handoff |
| **T10** | 3 | Migrate Board/Issue retry+back+GPT CTA; Filters controls; public-home header/account/footer CTAs with EPIC-SPA-09 | board + PH |
| **T11** | 4 | Cleanup: remove duplicate `*-btn` CSS; ban new page-local button styles; inventory → 0 product raw CTAs (chips exception documented) | CSS sweep |
| **T12** | 4 | Visual gate vs M134 semantics (not pixel PNG artifacts); story gate AC §43 | screenshots / gate |
| **T15** | pass3 | Docs leftovers F3/F5/F6 (As-of-Done §анализ; IconButton/ButtonGroup definition-ready; T10 PH N/A) | backlog + guide + T10 |

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
| [design-system-buttons-spec.md](../../../UX/design-system-buttons-spec.md) | Status → Implemented; link pipeline |
| [button-system-developer-guide.md](../../../runtime-docs/button-system-developer-guide.md) | Keep in sync with API |
| [design-system.md](../../../UX/design-system.md) | Link Buttons section → guide + component path |
| [INDEX.md](INDEX.md) | G10 Todo → Done |
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
