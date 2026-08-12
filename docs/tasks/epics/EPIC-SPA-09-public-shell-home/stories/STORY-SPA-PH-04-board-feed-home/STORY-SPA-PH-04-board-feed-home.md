# STORY-SPA-PH-04-board-feed-home — Board Feed Home

## Meta (pipeline)

- **Key:** `STORY-SPA-PH-04-board-feed-home`
- **Parent Epic:** [`../../EPIC-SPA-09-public-shell-home.md`](../../EPIC-SPA-09-public-shell-home.md)
- **Epic:** EPIC-SPA-09 Public Shell + Home · **Wave 2**
- **Пакет:** `public-home/`
- **Status:** Done — P3 gate PASS 2026-08-04T12:16:21Z (`pkg-000048`)
- **Severity:** 🔴 HIGH
- **source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md)
- **decision_ref:** backlog story + [mockup-132-public-board-home-feed-state-sheet-spec.md](../../../../../UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md) + [STORY-SPA-PH-api-requirements.md](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) §2.1 + [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md` (+ `.png`)
- **Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T11:24:18Z
- **Depends on:** [PH-01](../STORY-SPA-PH-01-header-brand-nav/STORY-SPA-PH-01-header-brand-nav.md) Done; SEARCH filters Done; M132; [api-req §2.1](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md)

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) |
|-------|-----------|-------------|
| **M132** | Loading · Empty · Results · Filtered empty · Load error | [mockup-132-public-board-home-feed-state-sheet-spec.md](../../../../../UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md) |
| **M01** | Superseded multi-column | do not implement columns |

> M132 **supersedes** M01 multi-column board where requirements conflict.

## Зачем простыми словами
Home = `/board` как одна вертикальная лента civic issues + существующие SEARCH-фильтры + loader/empty/error. **Колонки статуса удаляются.** Submit CTA на empty — PH-06 (не campaign block).

## Текущее состояние (verified)
- **As-of-Done (P3 `pkg-000048` gate 2026-08-04T12:16:21Z + post-audit T09 HEAD `7e8604d`):** [`BoardPage.jsx`](../../../../../../src/pages/BoardPage.jsx) — **single vertical feed** (`data-testid=board-feed`); **no** `board-columns`; `getIssues` → `GET /tallinn/issues` ✅.
- [`publicHomeDictionary.js`](../../../../../../src/i18n/publicHomeDictionary.js) — `publicHome.board.*` present (empty / filteredEmpty / error / loading / `openIssue`).
- Filters SEARCH Done; api-req §2.1 — **no new list API**.
- Story-root screenshots: H2 mock results = happy SSOT; H1 live = load-error (T11 relabel).
- M132 SSOT: `docs/UX/mockups/home/mockup-132-…-spec.md` (+ `.png`, estonia) — committed with T09.

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

## Субтаски (pipeline)

| Таск | Волна | Task folder | Суть |
|------|-------|-------------|------|
| **T01** | 1 | [task-spa-ph-04-t01-remove-columns-single-feed](./task-spa-ph-04-t01-remove-columns-single-feed/README.md) | Remove columns; single feed · **ui_anchor** |
| **T02** | 1 | [task-spa-ph-04-t02-reuse-search-filters](./task-spa-ph-04-t02-reuse-search-filters/README.md) | Keep SEARCH filters → getIssues |
| **T03** | 1 | [task-spa-ph-04-t03-loading-skeletons](./task-spa-ph-04-t03-loading-skeletons/README.md) | Loading skeletons M132 |
| **T04** | 1 | [task-spa-ph-04-t04-empty-error-states-icons](./task-spa-ph-04-t04-empty-error-states-icons/README.md) | Empty / filtered-empty / error + icons |
| **T05** | 1 | [task-spa-ph-04-t05-feed-item-issue-route](./task-spa-ph-04-t05-feed-item-issue-route/README.md) | Feed item → /issue/:id |
| **T06** | 1 | [task-spa-ph-04-t06-l10n-board-keys](./task-spa-ph-04-t06-l10n-board-keys/README.md) | L10N publicHome.board.* |
| **T07** | 1 | [task-spa-ph-04-t07-vitest-feed-no-columns](./task-spa-ph-04-t07-vitest-feed-no-columns/README.md) | Vitest feed states + no columns |
| **T08** | 1 | [task-spa-ph-04-t08-story-gate-ph-04](./task-spa-ph-04-t08-story-gate-ph-04/README.md) | Story gate PH-04 |
| **T09** | post-audit | [task-spa-ph-04-t09-commit-ph04-board-feed](./task-spa-ph-04-t09-commit-ph04-board-feed/README.md) | Commit feed to HEAD (F1) · **Done** `7e8604d` |
| **T10** | post-audit | [task-spa-ph-04-t10-as-of-done-ph04-state](./task-spa-ph-04-t10-as-of-done-ph04-state/README.md) | As-of-Done §состояние (F3) · **Done** |
| **T11** | post-audit | [task-spa-ph-04-t11-relabel-h1-live-load-error](./task-spa-ph-04-t11-relabel-h1-live-load-error/README.md) | Relabel H1 live = error (F4) · **Done** |
| **T12** | post-audit | [task-spa-ph-04-t12-issue-card-open-affordance-m132](./task-spa-ph-04-t12-issue-card-open-affordance-m132/README.md) | IssueCard M132 open (F6) · **Done** `d5c282b` |
| **T13** | post-audit | [task-spa-ph-04-t13-remove-legacy-board-empty-keys](./task-spa-ph-04-t13-remove-legacy-board-empty-keys/README.md) | Remove legacy dict keys (F7) · **Done** |

## Иконки (из каталога)
> Источник: [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md).
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
- [api-req §2.1](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md): live `GET /tallinn/issues` via `issueService.getIssues` — **no new list API**.
- Detail navigation: existing `GET /tallinn/issues/{id}` — link only.
- Aggregates / metrics: **out of scope** ([api-req §2.3](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md)).

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
- [`BoardPage.jsx`](../../../../../../src/pages/BoardPage.jsx), [`issueService.js`](../../../../../../src/services/issueService.js), filter components, `publicHomeDictionary.js`.

## Tasks

- [SPA-PH-04-T01](task-spa-ph-04-t01-remove-columns-single-feed/README.md) — Remove columns → single feed · **ui_anchor**
- [SPA-PH-04-T02](task-spa-ph-04-t02-reuse-search-filters/README.md) — Keep SEARCH filters → getIssues
- [SPA-PH-04-T03](task-spa-ph-04-t03-loading-skeletons/README.md) — Loading skeletons M132
- [SPA-PH-04-T04](task-spa-ph-04-t04-empty-error-states-icons/README.md) — Empty / filtered-empty / error + icons
- [SPA-PH-04-T05](task-spa-ph-04-t05-feed-item-issue-route/README.md) — Feed item → /issue/:id
- [SPA-PH-04-T06](task-spa-ph-04-t06-l10n-board-keys/README.md) — L10N publicHome.board.*
- [SPA-PH-04-T07](task-spa-ph-04-t07-vitest-feed-no-columns/README.md) — Vitest feed states + no columns
- [SPA-PH-04-T08](task-spa-ph-04-t08-story-gate-ph-04/README.md) — Story gate PH-04
- [SPA-PH-04-T09](task-spa-ph-04-t09-commit-ph04-board-feed/README.md) — Commit feed HEAD (F1) · Done `7e8604d`
- [SPA-PH-04-T10](task-spa-ph-04-t10-as-of-done-ph04-state/README.md) — As-of-Done §состояние (F3) · Done
- [SPA-PH-04-T11](task-spa-ph-04-t11-relabel-h1-live-load-error/README.md) — Relabel H1 (F4) · Done
- [SPA-PH-04-T12](task-spa-ph-04-t12-issue-card-open-affordance-m132/README.md) — IssueCard M132 open (F6) · Done `d5c282b`
- [SPA-PH-04-T13](task-spa-ph-04-t13-remove-legacy-board-empty-keys/README.md) — Legacy dict cleanup (F7) · Done
