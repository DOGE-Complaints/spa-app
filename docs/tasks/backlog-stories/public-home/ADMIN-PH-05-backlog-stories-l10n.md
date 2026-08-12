# ADMIN-PH-05 — Backlog stories + L10N + icon refs (слой 4.4)

## Meta

- **Key:** `ADMIN-PH-05-backlog-stories-l10n`
- **Status:** Done (2026-08-01) — PH-01…06 + L10N created
- **Depends on:** mockups SSOT, icon catalog, api-requirements
- **Blocks:** ADMIN-PH-06
- **Skill:** backlog authoring (образец cabinet stories)
- **Референс L10N:** [cabinet/README.md](../cabinet/README.md) § L10N · [STORY-SPA-ID-11](../identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md)

## Цель

Создать продуктовые backlog-стори PH-01…PH-06 с:

- Meta / scope / AC / documentation touchpoints
- §«Тексты и переводы» (en/et/ru)
- Ссылки на mockup specs + icon catalog rows
- Ссылки на api-requirements rows
- Явный out of scope

## Целевые файлы

| Key | Suggested filename | Surface |
|-----|-------------------|---------|
| PH-01 | `STORY-SPA-PH-01-header-brand-nav.md` | logo + name + horizontal nav |
| PH-02 | `STORY-SPA-PH-02-account-logout-chrome.md` | account icon + logout / guest login |
| PH-03 | `STORY-SPA-PH-03-public-footer.md` | footer A |
| PH-04 | `STORY-SPA-PH-04-board-feed-home.md` | feed + filters + loader |
| PH-05 | `STORY-SPA-PH-05-how-it-works-page.md` | `/how-it-works` |
| PH-06 | `STORY-SPA-PH-06-submit-story-gpt-cta.md` | nav/tutorial → `VITE_STORY_GPT_URL` |

Также обновить:

- [README.md](README.md) — таблица Stories (MVP)
- [INDEX.md](INDEX.md) — PH rows Todo
- Общий [`../INDEX.md`](../INDEX.md) — секция Public Home
- [`spa-mvp-dashboard.md`](../../spa-mvp-dashboard.md) — добавить package в counts **только после** появления стори

## L10N conventions

- Namespace черновик: `publicHome.*` / `appShell.nav.*` (финальное имя выбрать одно; не плодить)
- Reuse: locale selector strings, filter strings (SEARCH), `civic.*` если CTA на board
- DoD стори: keys listed; forbidden marketing fluff terms согласовать с brief (no «Oops», no landing hero copy)

## Acceptance

- [x] 6 story files exist with L10N tables
- [x] Each story links mockup + icons + api-req sections
- [x] PH-04 AC: columns removed; feed + existing filters + loader states
- [x] PH-05 AC: route `/how-it-works` public
- [x] PH-06 AC: uses env GPT URL, not hardcoded
- [x] INDEX admin-05 Done; PH stories Todo

## Как выполнять

«Выполни ADMIN-PH-05: создай PH-01…06 по мокапам/icons/api по образцу CAB».
