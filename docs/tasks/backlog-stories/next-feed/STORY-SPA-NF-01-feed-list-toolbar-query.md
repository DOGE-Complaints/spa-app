# STORY-SPA-NF-01 — Feed list + toolbar + query states

## Meta
- **Key:** `STORY-SPA-NF-01-feed-list-toolbar-query`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · **`pkg-000103`**
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-01-feed-list-toolbar-query/STORY-SPA-NF-01-feed-list-toolbar-query.md)
- **Status:** Done · P3 (`2026-10-10T17:50:10Z`)
- **Depends on:** [ADMIN-NF-01 register](NF-feed-mockup-intake-register.md) NF-F; [icon catalog](STORY-SPA-NF-icon-assets.md); [api-requirements §1](STORY-SPA-NF-api-requirements.md); shell host [NS-01](../next-shell/STORY-SPA-NS-01-next-routes-shell-host.md) Done
- **External (text search):** gateway [REQ-56](../../../../../doge-complaints-gateway/docs/requirements/56-issues-server-text-search.md) **Ready** — param **`search`**. Production live toolbar still DUI-Q12 hide until FE enable. NF-01 structural list/toolbar **не** blocked by REQ-56.
- **Code home:** `features/feed/` (implement later) · Routes `#/next/feed`
- **ui_scope:** `feed` · UX ready M149

## Зачем
BoardFeed + BoardToolbar **content** на `#/next/feed`: load/empty/error/stale/retry + structural filters; public list с `status=PUBLISHED`. Без shell chrome ownership.

## UX SSOT
- Spec: [M149](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) · feed/toolbar **content** panels (not Header/rails)
- PNG: [M149 png](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)
- Register: [NF-feed-mockup-intake-register.md](NF-feed-mockup-intake-register.md) row NF-F → NF-01
- States: load / empty / error / stale / retry / structural filter

## Icons (from STORY-SPA-NF-icon-assets.md)
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| Filters | `filter` | `/icons/next-feed/actions/filter.svg` |
| Retry | `retry` | `/icons/next-feed/actions/retry.svg` |
| Info helper | `info` | `/icons/next-feed/status/info.svg` |
| Error | `error` | `/icons/next-feed/status/error.svg` |
| Unavailable | `unavailable` | `/icons/next-feed/status/unavailable.svg` |
| Chip dismiss (if any) | `close` | `/icons/next-shell/actions/close.svg` (reuse) |
| Filter disclosure | `chevron-down` | `/icons/next-shell/actions/chevron-down.svg` (reuse) |

## API
- [api-req §1.1](STORY-SPA-NF-api-requirements.md): gateway `GET /node/issues` ✅ · **⚠️** always send `status=PUBLISHED` (DUI-Q01)
- Text search: ✅ BE `GET /node/issues?search=` ([REQ-56](../../../../../doge-complaints-gateway/docs/requirements/56-issues-server-text-search.md) **Ready**); ⚠️ hide/disable live toolbar until FE enable (DUI-Q12)
- Structural filters (status/type/labels/institution/dates/geo) + optional `search` when FE enables

## Функциональные требования (FR)
- **FR-NF-01.1** Feed list states: load / empty / error / stale / retry on `#/next/feed`.
- **FR-NF-01.2** Toolbar: structural filters; no production live text search until FE enable wave (REQ-56 **Ready**, param **`search`**).
- **FR-NF-01.3** Public list request includes `status=PUBLISHED`.
- **FR-NF-01.4** Icons from `/icons/next-feed/…` or documented next-shell reuse.
- **FR-NF-01.L10N** reuse board/filter keys where valid; draft `nextFeed.list.*` / `nextFeed.toolbar.*` for new copy.

## Вне scope
- PublicHeader / ProfileRail / shell grid → [next-shell](../next-shell/INDEX.md)
- Invent gateway fields/endpoints; schema/media; M155 people

## Тексты и переводы (en / et / ru)

### Reuse
- Existing board/filter strings where already used on classic board (do not duplicate if key fits).

### Draft `nextFeed.list.*` / `nextFeed.toolbar.*`

| key | en | et | ru |
|-----|----|----|----|
| `nextFeed.list.loading` | Loading feed… | Voogu laadimine… | Загрузка ленты… |
| `nextFeed.list.empty` | No published issues | Avaldatud teateid pole | Нет опубликованных обращений |
| `nextFeed.list.error` | Could not load the feed | Voogu ei õnnestunud laadida | Не удалось загрузить ленту |
| `nextFeed.list.retry` | Try again | Proovi uuesti | Повторить |
| `nextFeed.list.stale` | Showing last loaded results | Näitan viimati laaditud tulemusi | Показаны последние загруженные результаты |
| `nextFeed.toolbar.filters` | Filters | Filtrid | Фильтры |
| `nextFeed.toolbar.searchUnavailable` | Live search is not available yet | Otseotsing pole veel saadaval | Живой поиск пока недоступен |

## Acceptance Criteria
- [x] `#/next/feed` shows feed/toolbar content states per M149 register (not shell chrome)
- [x] List requests use `status=PUBLISHED`; no invent alternate search HTTP (BE Ready: `search` per [REQ-56](../../../../../doge-complaints-gateway/docs/requirements/56-issues-server-text-search.md); live toolbar = FE enable / DUI-Q12)
- [x] Icons = `/icons/next-feed/…` or next-shell reuse from catalog
- [x] Links UX register + api-req; shell OOS explicit
- [x] L10N via `t()`; en/et/ru keys listed
