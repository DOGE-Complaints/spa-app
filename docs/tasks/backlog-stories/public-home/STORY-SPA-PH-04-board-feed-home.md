# STORY-SPA-PH-04 — Board Feed Home

## Meta
- **Key:** `STORY-SPA-PH-04-board-feed-home`
- **Epic:** [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md)
- **Pipeline:** [pipeline story](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-04-board-feed-home/STORY-SPA-PH-04-board-feed-home.md)
- **Package:** [public-home/](README.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [UX-PROMPTS.md](UX-PROMPTS.md) (PH-B / PH-P)
- **Status:** Done — P3 gate PASS 2026-08-04T12:16:21Z (`pkg-000048`)
- **Severity:** 🔴 HIGH
- **Depends on:** [M132](../../../UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md); SEARCH filters Done; [api-req §2.1](STORY-SPA-PH-api-requirements.md); [icon catalog](STORY-SPA-PH-icon-assets.md); PH-01 chrome

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) |
|-------|-----------|-------------|
| **M132** | Loading · Empty · Results · Filtered empty · Load error | [mockup-132-public-board-home-feed-state-sheet-spec.md](../../../UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md) |
| **M01** | Superseded multi-column | do not implement columns |

> M132 **supersedes** M01 multi-column board where requirements conflict.

## Зачем простыми словами
Home = `/board` как одна вертикальная лента civic issues + существующие SEARCH-фильтры + loader/empty/error. **Колонки статуса удаляются.** Submit CTA на empty — PH-06 (не campaign block).

## Текущее состояние (verified)
- **As-of-Done (P3 `pkg-000048` + post-audit HEAD commit T09 `7e8604d`):** [`BoardPage.jsx`](../../../../src/pages/BoardPage.jsx) — **single vertical feed** (`board-feed`); **no** `board-columns` / kanban; `issueService.getIssues` → `GET /tallinn/issues` ✅.
- M132 states: skeleton / empty / results / filtered-empty / load-error+retry; L10N `publicHome.board.*` in [`publicHomeDictionary.js`](../../../../src/i18n/publicHomeDictionary.js) (+ `openIssue` post-audit T12).
- Filters SEARCH-02…05 Done; filter matrix in [api-req §2.1](STORY-SPA-PH-api-requirements.md). **No new list API.**
- Evidence: story-root [`screenshots/`](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-04-board-feed-home/screenshots/) · H2 = happy results; H1 = live load-error (T11).

## Функциональные требования (FR)
- **FR-PH-04.1** `/board` (and `/` → board) renders **single vertical feed** — **no status/kanban columns**.
- **FR-PH-04.2** Reuse existing filter toolbar + SEARCH contract (status/type/labels/institution/dates/geo/search); toolbar visible in loading/error/empty.
- **FR-PH-04.3** States (M132): Loading (CSS skeleton, not spinner icon); Empty dataset; Results; Filtered zero; Load error + Try Again.
- **FR-PH-04.4** Feed item → navigate `/issue/:id` (existing IssuePage / `GET /tallinn/issues/{id}`).
- **FR-PH-04.5** Empty visual: `ic-empty-board` (+ calm text); no giant illustration; no false error; no «Oops».
- **FR-PH-04.6** Filtered empty: distinct copy + Reset filters; do not show generic empty-board message.
- **FR-PH-04.7** Load error: `ic-cloud-error` + retry; preserve filters where possible; no raw API text.
- **FR-PH-04.8** Open-details affordance may use `ic-chevron-right` (opt catalog #4).
- **FR-PH-04.L10N** `publicHome.board.*` for empty/error/loading chrome; **reuse** SEARCH filter labels and existing board card/status strings. EN — канон M132.

## Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | Remove columns; single feed list layout | `BoardPage.jsx` |
| **T02** | Keep SEARCH filters wired to `getIssues` | issueService, filter serializers |
| **T03** | Loading skeletons M132 | BoardPage |
| **T04** | Empty / filtered-empty / error states + icons | `ic-empty-board`, ID-12 error/retry |
| **T05** | Card → `/issue/:id`; optional chevron | IssuePage |
| **T06** | L10N `publicHome.board.*` | `publicHomeDictionary.js` |
| **T07** | Vitest: no columns; states; filter reuse; key parity | `__tests__` |
| **T08** | Story gate PH-04 | — |

## Иконки (из каталога)
> Источник: [STORY-SPA-PH-icon-assets.md](STORY-SPA-PH-icon-assets.md).
>
> **Icons (non-blocking):** Финальные картинки пока не готовы. В коде прописывать точные имена/пути из каталога (`/icons/public-home/…`, reuse `/icons/identity|story-handoff|user-cabinet/…`). Отсутствие или placeholder PNG не блокирует вёрстку, L10N, routes, тесты — замена арта позже.

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| Empty board | `ic-empty-board.png` | `/icons/public-home/ic-empty-board.png` | NEW #2 |
| Open details *(опц.)* | `ic-chevron-right.png` | `/icons/public-home/ic-chevron-right.png` | NEW #4 |
| Load error | `ic-cloud-error.png` | `/icons/story-handoff/ic-cloud-error.png` | ID-12 #18 |
| Retry *(опц.)* | `ic-auto-resubmit.png` | `/icons/story-handoff/ic-auto-resubmit.png` | ID-12 #13 |
| Search glyph *(опц.)* | `ic-search.png` | `/icons/identity/ic-search.png` | EPIC-04 #12 |

> Loading: CSS skeleton — **не** `ic-spinner.png`. Do not reuse CAB `ic-story-empty` for board empty.

## Routes / API
- [api-req §2.1](STORY-SPA-PH-api-requirements.md): live `GET /tallinn/issues` via `issueService.getIssues` — **no new list API**.
- Detail navigation: existing `GET /tallinn/issues/{id}` — link only.
- Aggregates / metrics: **out of scope** ([api-req §2.3](STORY-SPA-PH-api-requirements.md)).

## Зависимости
- PH-01 — chrome around board.
- SEARCH package — filters.
- PH-06 — optional empty-state Submit CTA (if product places it; M132 empty has no required CTA).

## Вне scope
- New gateway list/aggregate endpoints. Status columns. Collective metrics. Marketing empty campaign blocks. Hardcoded GPT URL (PH-06).

## Тексты и переводы (en / et / ru)

> EN — канон M132 state titles/messages. et/ru — factual translations (не в appendix; follow EN meaning). Filter chrome — **reuse** SEARCH keys.

### `publicHome.board.*`

| key | en | et | ru |
|-----|----|----|----|
| `publicHome.board.empty.title` | No Issues Yet | Teemasid veel pole | Тем пока нет |
| `publicHome.board.empty.message` | Public civic issues will appear here when they become available. | Avalikud ühiskondlikud teemad ilmuvad siia, kui need muutuvad kättesaadavaks. | Публичные гражданские темы появятся здесь, когда станут доступны. |
| `publicHome.board.filteredEmpty.title` | No Issues Match These Filters | Filtritele vastavaid teemasid pole | Нет тем по этим фильтрам |
| `publicHome.board.filteredEmpty.message` | Adjust your search or reset the active filters to see more issues. | Muuda otsingut või lähtesta aktiivsed filtrid, et näha rohkem teemasid. | Измените поиск или сбросьте активные фильтры, чтобы увидеть больше тем. |
| `publicHome.board.filteredEmpty.reset` | Reset filters | Lähtesta filtrid | Сбросить фильтры |
| `publicHome.board.error.title` | Unable To Load The Board | Juhtpaneeli ei õnnestunud laadida | Не удалось загрузить доску |
| `publicHome.board.error.message` | We couldn't load public issues right now. Please try again. | Avalikke teemasid ei õnnestunud praegu laadida. Proovi uuesti. | Сейчас не удалось загрузить публичные темы. Попробуйте снова. |
| `publicHome.board.error.retry` | Try Again | Proovi uuesti | Повторить |
| `publicHome.board.loading.accessible` | Loading board… | Juhtpaneeli laadimine… | Загрузка доски… |

> Forbidden: «Oops», blame language, campaign invitation copy (M132).

## Acceptance Criteria
- [x] `/board` is a **single feed**; **status/kanban columns removed** (M132 supersedes M01).
- [x] Existing SEARCH filters still drive `GET /tallinn/issues`; no new list API.
- [x] Loader (skeleton), empty, filtered-empty, error+retry states per M132.
- [x] Empty uses `ic-empty-board`; error uses calm diagnostic icon; no «Oops».
- [x] L10N + icon catalog + api-req §2.1 linked.

## Швы
- [`BoardPage.jsx`](../../../../src/pages/BoardPage.jsx), [`issueService.js`](../../../../src/services/issueService.js), filter components, `publicHomeDictionary.js`.
