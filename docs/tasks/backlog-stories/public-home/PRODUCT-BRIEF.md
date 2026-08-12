# Public Home + Shell — Product Brief (interview lock)

> **Дата интервью:** 2026-07-29  
> **Статус:** locked для ADMIN-01…06  
> **Пакет:** [README.md](README.md)  
> **Verified baseline (код):** `/` → `/board` ([`App.jsx`](../../../../src/App.jsx)); колонки NEW/IN_REVIEW/PUBLISHED в [`BoardPage.jsx`](../../../../src/pages/BoardPage.jsx); GPT URL = `VITE_STORY_GPT_URL`; logout UI в `src` отсутствует; G8 AppShell — parallel (`pkg-000040`), к техтаскам считать готовым.

## Решения (locked)

| # | Тема | Решение |
|---|------|---------|
| 1 | Home surface | **A** — переработать `/board` как главный public home |
| 2 | G8 | Parallel in flight; **считать Done** к моменту ADMIN-06 / FE stories |
| 3 | Nav | Горизонтально: **Dashboard** · **How it works** · **Submit a story**. **Profile** — иконка справа (стандартный chrome), не пункт меню |
| 4 | Account / logout | Гость: иконка/контроль → Login. Авторизован: иконка → `/profile`; logout рядом или в меню. Logout = clear session + redirect `/board` |
| 5 | Footer | **A** — бренд + короткий tagline + ссылки About / Privacy / Contact (часть может быть `#` или внешние в v1) |
| 6 | Issues home | Лента (не колонки) + **существующие фильтры** + полный result set + loader; симбиоз соцсеть × Jira. Доп. «коллективные метрики» сверх ленты — **отложены** |
| 7 | How it works | **B** — отдельный маршрут `/how-it-works` |
| 7b | Tutorial UX (default) | Страница всегда доступна из меню; **3–5** коротких шагов + CTA (Dashboard / Submit); **без** first-visit nudge и **без** Don't show again в v1 |
| 8 | Submit a story | **A** — внешняя ссылка на Custom GPT (`VITE_STORY_GPT_URL`, как ID-12 / DEPLOY-01) |

## Вне scope v1

- Landing-page формат / hero-маркетинг вместо дашборда
- Коллективные агрегаты (топ labels/institutions, big counters) — post-v1
- In-app story compose (M110) — post-MVP cabinet
- Замена filter pipeline (SEARCH-*) — reuse as-is
- Редизайн Issue details (`/issue/:id`) — только shell chrome (header/footer), не body

## Предполагаемые продуктовые стори (выход ADMIN-05)

Черновик ключей (финальные имена — в ADMIN-05):

| Key | Поверхность |
|-----|-------------|
| PH-01 | Header: logo + brand name + horizontal nav |
| PH-02 | Header: account icon + logout (+ guest → login) |
| PH-03 | Footer meaningful |
| PH-04 | Board home: feed layout + filters + loader (replace columns) |
| PH-05 | `/how-it-works` embedded tutorial page |
| PH-06 | Submit CTA → `VITE_STORY_GPT_URL` (nav + tutorial) |

## Зависимости

- **G8** AppShell refactor — prerequisite для FE (не блокирует ADMIN-01…05 docs)
- **SEARCH-02…05** — filters reuse на PH-04
- **ID-01 / ID-02** — session + login для PH-02
- **ID-12 / DEPLOY** — GPT URL pattern для PH-06
- **CAB** — `/profile` target для account icon

## Mockup ID → file (ADMIN-PH-02)

SSOT: [`docs/UX/mockups/home/`](../../../UX/mockups/home/README.md)

| Artboard | Mockup | Future story | Spec |
|----------|--------|--------------|------|
| PH-H | M129 | PH-01 | [mockup-129-…](../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) |
| PH-A | M130 | PH-02 | [mockup-130-…](../../../UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md) |
| PH-F | M131 | PH-03 | [mockup-131-…](../../../UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md) |
| PH-B | M132 | PH-04 | [mockup-132-…](../../../UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md) |
| PH-T | M133 | PH-05 | [mockup-133-…](../../../UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md) |
| PH-T L10N | M133 appendix | PH-05 (+ CTA labels PH-06) | [localized-copy-appendix](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) |
| Submit GPT | M129 / M133 affordance | PH-06 | nav + tutorial CTA → `VITE_STORY_GPT_URL` |

PNG artboards: **pending** (referenced in specs, not in repo).

## Open (частично закрыто ADMIN-01/02)

- Точный copy tagline футера и URL About/Privacy/Contact — ещё `[TAGLINE_TBD]` в M131 / appendix
- EN/ET/RU tutorial copy — **Done** в [M133 appendix](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md)
- SYNCED в header — **убран** (M129 supersedes M19)
