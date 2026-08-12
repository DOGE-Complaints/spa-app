# STORY-SPA-G8 — AppShell: вынести Header/Sidebar/LocaleSelector

## Meta (pipeline)

- **Key:** `STORY-SPA-G8-app-shell-refactor`
- **Parent Epic:** [`../../EPIC-SPA-08-design-foundation.md`](../../EPIC-SPA-08-design-foundation.md)
- **Epic:** EPIC-SPA-08 Design Foundation · Wave 3 (AppShell)
- **Пакет:** `design-foundation/` (cross-cutting L0 Foundations)
- **Status:** ✅ Done
- **Severity:** 🟡 Gap G8 (Low) — closed
- **Wave:** `pkg-000040`
- **Scaffolded:** 2026-07-29T08:03:20Z
- **Gate Date:** 2026-07-29T08:27:15Z
- **source:** [`spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md`](../../../../../../backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md)
- **decision_ref:** [`../../../../../../backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md`](../../../../../../backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md); [design-system.md §4.1/4.2](../../../../../../UX/design-system.md); [spa-app-doc-code-gap-report.md §G8](../../../../../analysis/spa-app-doc-code-gap-report.md)
- **ui_scope:** `mixed`
- **Gate:** [acceptance-verification-spa-g8.md](./task-spa-g8-t06-story-gate-g8/acceptance-verification-spa-g8.md)
- **Зависит от:** желательно после G2/G3 (стабильный тулбар) — G2/G3 Done

## Зачем простыми словами

Header, sidebar и переключатель языка продублированы в BoardPage и IssuePage. Документация описывает отдельные компоненты. Нужен общий AppShell, чтобы убрать копипасту и совпасть с архитектурной картой.

## Scope — Функциональные требования (FR)

- `src/components/AppShell/` (или эквивалент): `AppShell.jsx`, `Header.jsx`, `Sidebar.jsx`, `LanguageSelector.jsx`.
- [BoardPage.jsx](../../../../../../../src/pages/BoardPage.jsx) и [IssuePage.jsx](../../../../../../../src/pages/IssuePage.jsx) используют shell; убрать дублированную разметку.
- Сохранить поведение: навигация, locale switch с флагами (канон G6), active route highlight.
- Обновить/добавить тесты shell при необходимости.

## Scope — Субтаски (pipeline)

| Pipeline task | Суть |
|---------------|------|
| [SPA-G8-T01](./task-spa-g8-t01-appshell-header-sidebar-language/README.md) | Header + Sidebar + LanguageSelector; board chrome in AppShell |
| [SPA-G8-T02](./task-spa-g8-t02-migrate-boardpage-to-appshell/README.md) | BoardPage → AppShell |
| [SPA-G8-T03](./task-spa-g8-t03-migrate-issuepage-to-appshell/README.md) | IssuePage → AppShell |
| [SPA-G8-T04](./task-spa-g8-t04-shell-tests-npm/README.md) | Shell tests + npm test |
| [SPA-G8-T05](./task-spa-g8-t05-visual-smoke-board-issue-shell/README.md) | Visual smoke board + issue |
| [SPA-G8-T06](./task-spa-g8-t06-story-gate-g8/README.md) | Story gate + docs |
| [SPA-G8-T07](./task-spa-g8-t07-deduplicate-language-selector/README.md) | Post-audit: deduplicate LanguageSelector/LocaleSelector (`run_mode=spa_g8_audit_2026_07_29`) |

## Вне scope

- Новые маршруты identity.
- Полная реализация всех компонентов из reusable-ui-architecture (BoardColumns как отдельные файлы — опционально).

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [design-system.md](../../../../../../UX/design-system.md) §1.5 / §4.1–4.2 | interim «inline в pages» | Реальные пути `src/components/AppShell/…` |
| [reusable-ui-components-architecture.md](../../../../../../UX/reusable-ui-components-architecture.md) | Пометка G8 interim | Карта компонентов = фактические файлы |
| [gap-report](../../../../../analysis/spa-app-doc-code-gap-report.md) §G8 | G8 open | G8 ✅ |
| [INDEX.md](../../../../../../backlog-stories/INDEX.md) / design-foundation INDEX | Todo | Done |

## Acceptance Criteria

- [x] Header/Sidebar/LocaleSelector не дублируются между BoardPage и IssuePage.
- [x] Визуальный и навигационный паритет с текущим UI.
- [x] `npm test` — green.
- [x] Документация touchpoints обновлена.

## Post-audit follow-up (P5 scaffold-only)

- `run_mode=spa_g8_audit_2026_07_29`
- Scoped gap: audit G-1 (Med) only.
- Queue item: [SPA-G8-T07](./task-spa-g8-t07-deduplicate-language-selector/README.md)
- Status: ✅ Closed in P6 (gate 2026-07-29T09:39:05Z)

## Approach note (P1 scaffold)

REUSE existing `AppShell` + `LocaleSelector`. Add `Header.jsx` / `Sidebar.jsx` / `LanguageSelector.jsx` (re-export). Preserve Board/Issue chrome (sync status, flag locale, Board/Issues/Settings) — do not swap in cabinet default `/profile` NavLinks for board pages.
