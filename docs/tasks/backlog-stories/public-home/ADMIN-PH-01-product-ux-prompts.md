# ADMIN-PH-01 — Product UX prompts (слой 4.1)

## Meta

- **Key:** `ADMIN-PH-01-product-ux-prompts`
- **Status:** Done (2026-07-29)
- **Depends on:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) locked
- **Blocks:** ADMIN-PH-02
- **Skill:** product + UX briefing (не FE coding)

## Цель

Подготовить **промпты для UX-диалога** (генерация артбордов со стейтами) и список обязательных экранов/состояний — по образцу папки [`user profile/`](../../../UX/mockups/user%20profile/) и initiation mockups.

## Вход

- [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- Legacy SSOT (не копировать слепо — **supersede** где brief противоречит):
  - [mockup-19-header-brand-strip-spec.md](../../../UX/mockups/initiation/mockup-19-header-brand-strip-spec.md)
  - [mockup-01-dashboard-main-spec.md](../../../UX/mockups/initiation/mockup-01-dashboard-main-spec.md)
  - [mockup-20-header-language-selector-spec.md](../../../UX/mockups/initiation/mockup-20-header-language-selector-spec.md)
- Verified code: `BoardPage`, `AppShell`, `VITE_STORY_GPT_URL`

## Обязательные артборды (минимум)

| ID (черновик) | Поверхность | Обязательные states |
|---------------|-------------|---------------------|
| PH-H | Header chrome | guest · authenticated · locale open · narrow/mobile |
| PH-F | Footer | default · mobile wrap |
| PH-B | Board home feed | loading · empty · results · filtered no-results · load error · (опц. partial) |
| PH-T | How it works `/how-it-works` | default 3–5 steps · CTA row |
| PH-A | Account control | guest → login affordance · auth icon · logout confirm/menu |

Фильтры на PH-B: **reuse** SEARCH panel visually; промпт фиксирует «filters unchanged contract, new feed layout below/beside».

## Deliverable

Создать файл **`UX-PROMPTS.md`** в этой папке со структурой:

1. Global constraints (dark civic-tech, no landing hero, no column board, G8 shell assumed)
2. Per-artboard prompt (EN, paste-ready) + state matrix
3. Copy placeholders EN for nav: Dashboard / How it works / Submit a story; footer tagline TBD box
4. Explicit **out of scope** list from brief
5. Mapping: artboard ID → future PH-0N story

## Acceptance

- [x] `UX-PROMPTS.md` существует и покрывает PH-H/F/B/T/A
- [x] Каждый промпт требует state sheet (не один happy path)
- [x] Submit = external GPT URL (не in-app compose)
- [x] How it works = отдельная страница, не landing
- [x] INDEX: ADMIN-PH-01 → Done; ADMIN-PH-02 → Todo

## Как выполнять

В чате Cursor: «Выполни ADMIN-PH-01 по `public-home/ADMIN-PH-01-…`» — агент пишет только `UX-PROMPTS.md` + обновляет INDEX status.
