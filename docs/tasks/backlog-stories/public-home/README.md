# public-home/ — Public Shell + Home Dashboard (intake)

> **Тип пакета:** административный intake → затем backlog stories (как [cabinet/](../cabinet/README.md))  
> **Product brief (locked):** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Операторский порядок:** выполнять **ADMIN-01 → ADMIN-06** строго по одному  
> **UX mockups (SSOT после ADMIN-02):** [`docs/UX/mockups/home/`](../../../UX/mockups/home/README.md) — M129–M133 + L10N appendix  
> **G8:** Done (`pkg-000040`); к FE готов ([STORY-SPA-G8](../design-foundation/STORY-SPA-G8-app-shell-refactor.md))

## Зачем

Пересобрать public chrome и home:

1. Красивая шапка: логотип + название + горизонтальное меню; Profile icon + logout справа  
2. Осмысленный футер  
3. `/board` как информационный дашборд: лента issues + работающие фильтры + loader; лёгкий tutorial на `/how-it-works` (не landing)

## Admin tasks (выполнять по одному)

| # | Task | Слой | Выход |
|---|------|------|-------|
| 01 | [ADMIN-PH-01-product-ux-prompts](ADMIN-PH-01-product-ux-prompts.md) | 4.1 Product / UX | Промпты для UX-диалога + state list на артборды |
| 02 | [ADMIN-PH-02-ux-mockup-intake](ADMIN-PH-02-ux-mockup-intake.md) | 4.1 → specs | M129–M133 (+ L10N appendix) в `docs/UX/mockups/home/` — **Done** |
| 03 | [ADMIN-PH-03-icon-assets-catalog](ADMIN-PH-03-icon-assets-catalog.md) | 4.2 Icons | [STORY-SPA-PH-icon-assets.md](STORY-SPA-PH-icon-assets.md) — **Done** |
| 04 | [ADMIN-PH-04-api-requirements](ADMIN-PH-04-api-requirements.md) | 4.3 API | [STORY-SPA-PH-api-requirements.md](STORY-SPA-PH-api-requirements.md) — **Done** |
| 05 | [ADMIN-PH-05-backlog-stories-l10n](ADMIN-PH-05-backlog-stories-l10n.md) | 4.4 Stories + L10N | `STORY-SPA-PH-01…06` + README stories table — **Done** |
| 06 | [ADMIN-PH-06-tech-decomposition](ADMIN-PH-06-tech-decomposition.md) | 4.5 Tech | [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) + task READMEs — **Done** |

## Stories (MVP)

| Key | Story | Surface | Status |
|-----|-------|---------|--------|
| PH-01 | [STORY-SPA-PH-01-header-brand-nav](STORY-SPA-PH-01-header-brand-nav.md) | logo + name + horizontal nav | Todo |
| PH-02 | [STORY-SPA-PH-02-account-logout-chrome](STORY-SPA-PH-02-account-logout-chrome.md) | account icon + logout / guest login | Todo |
| PH-03 | [STORY-SPA-PH-03-public-footer](STORY-SPA-PH-03-public-footer.md) | footer A | Todo |
| PH-04 | [STORY-SPA-PH-04-board-feed-home](STORY-SPA-PH-04-board-feed-home.md) | feed + filters + loader | Todo |
| PH-05 | [STORY-SPA-PH-05-how-it-works-page](STORY-SPA-PH-05-how-it-works-page.md) | `/how-it-works` | Todo |
| PH-06 | [STORY-SPA-PH-06-submit-story-gpt-cta](STORY-SPA-PH-06-submit-story-gpt-cta.md) | nav/tutorial → `VITE_STORY_GPT_URL` | Done |
| PH-07 | [STORY-SPA-PH-07-board-feed-backdrop-evidence](STORY-SPA-PH-07-board-feed-backdrop-evidence.md) | intentional board feed backdrop on chrome evidence | Done |
| PH-10 | [STORY-SPA-PH-10-header-horizontal-logo-favicon](STORY-SPA-PH-10-header-horizontal-logo-favicon.md) | horizontal header logo + favicon (inbound) | Todo |

**L10N namespace:** `publicHome.nav.*` / `publicHome.account.*` / `publicHome.footer.*` / `publicHome.board.*` + page body `howItWorks.*` (M133 appendix). Dictionary (tech): `publicHomeDictionary.js` + `PUBLIC_HOME_FLAT_KEYS`.

## Целевые артефакты (появятся по мере ADMIN)

| Артефакт | После |
|----------|--------|
| [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) | Interview (Done) |
| [UX-PROMPTS.md](UX-PROMPTS.md) | ADMIN-01 (Done) |
| UX specs [`mockups/home/`](../../../UX/mockups/home/README.md) M129–M133 + [L10N appendix](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) | ADMIN-02 (Done) |
| [STORY-SPA-PH-icon-assets.md](STORY-SPA-PH-icon-assets.md) · [`public/icons/public-home/`](../../../../public/icons/public-home/) | ADMIN-03 (Done) |
| [STORY-SPA-PH-api-requirements.md](STORY-SPA-PH-api-requirements.md) | ADMIN-04 (Done) |
| `STORY-SPA-PH-01…06` | ADMIN-05 (Done) |
| [EPIC-SPA-09-public-shell-home](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) + pipeline tasks | ADMIN-06 (Done) — ready for P1.3/P3 |

## Icon assets

- **Каталог (SSOT):** [STORY-SPA-PH-icon-assets.md](STORY-SPA-PH-icon-assets.md) — NEW ×4 + reuse из ID-12 / CAB / EPIC-SPA-04
- **Загрузка PNG:** `public/icons/public-home/` → runtime `/icons/public-home/ic-*.png`
- **Master index:** [ICON-GENERATION-INDEX.md](../icons/ICON-GENERATION-INDEX.md)

## Политики (как cabinet)

- **analysis.mdc:** только verified code/docs; gaps → вопросы или ❌ в api-requirements  
- **L10N:** EN canon = mockup; et/ru в §«Тексты и переводы» каждой PH-стори  
- **Icons:** единый каталог после мокапов ([ADMIN-PH-03](ADMIN-PH-03-icon-assets-catalog.md)); дедуп по plan-docs — [`ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md)  
- **Не смешивать** admin intake с Builder `pkg-*` execute до закрытия ADMIN-06 — **ADMIN-06 Done**; execute via EPIC-SPA-09 / operator P3

## Связанный код (baseline)

| Surface | Факт |
|---------|------|
| Home | `/` → `/board` · [`BoardPage.jsx`](../../../../src/pages/BoardPage.jsx) колонки |
| Shell | [`AppShell`](../../../../src/components/AppShell/) + board-local header (G8 устраняет дубль) |
| Filters | SEARCH-02…05 Done |
| GPT CTA | `VITE_STORY_GPT_URL` · [`StorySubmitPage.jsx`](../../../../src/pages/StorySubmitPage.jsx) |
| Profile | `/profile` · User Cabinet EPIC-07 Done |
| Logout UI | отсутствует в `src` |
