# STORY-SPA-NF-03 — List | Map toggle

## Meta
- **Key:** `STORY-SPA-NF-03-list-map-toggle`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-03-list-map-toggle/STORY-SPA-NF-03-list-map-toggle.md)
- **Status:** Done · P3 (`2026-10-10T18:53:45Z`) · **`pkg-000105`**
- **Depends on:** NF-01 list data; [register](NF-feed-mockup-intake-register.md) NF-M; [icon catalog](STORY-SPA-NF-icon-assets.md); [api-requirements §1.3](STORY-SPA-NF-api-requirements.md)
- **Code home:** `features/feed/` · Routes `#/next/feed`
- **ui_scope:** `feed`

## Зачем
List | Map toggle on feed: list/map/partial/error; pins only when numeric `geo.lat`/`geo.lon`; ship gate DUI-Q14.

## UX SSOT
- Spec: [M151](../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md)
- PNG: [M151 png](../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png)
- Register: [NF-feed-mockup-intake-register.md](NF-feed-mockup-intake-register.md) row NF-M → NF-03
- States: list / map / partial / error

## Icons (from STORY-SPA-NF-icon-assets.md)
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| List view | `list-view` | `/icons/next-feed/actions/list-view.svg` |
| Map view | `map-view` | `/icons/next-feed/actions/map-view.svg` |
| Map pin | `map-pin` | `/icons/next-feed/map/map-pin.svg` |
| Pin selected | `map-pin-selected` | `/icons/next-feed/map/map-pin.svg` (reuse same file) |

## API
- [api-req §1.3](STORY-SPA-NF-api-requirements.md): same gateway list ✅ · pin eligibility `issueGeo` ✅ · Q14 ⚠️ ship gate (not new endpoint)
- No invent map/search HTTP

## Функциональные требования (FR)
- **FR-NF-03.1** Toggle list ↔ map; selected state on control.
- **FR-NF-03.2** Pins only for issues with finite `geo.lat` + `geo.lon`; partial map when some ineligible.
- **FR-NF-03.3** Map error/unavailable honest; no fake street invent.
- **FR-NF-03.4** Runtime pin asset = `/icons/next-feed/map/map-pin.svg` (not legacy SSR pin path).
- **FR-NF-03.L10N** draft `nextFeed.map.*`.

## Вне scope
- Illustrative streets/labels as goldens; invent pin fields; shell chrome; Q14 privacy product gate is process, not invent API

## Тексты и переводы (en / et / ru)

| key | en | et | ru |
|-----|----|----|----|
| `nextFeed.map.listView` | List | Nimekiri | Список |
| `nextFeed.map.mapView` | Map | Kaart | Карта |
| `nextFeed.map.partial` | Some issues have no public location | Mõnel teatel puudub avalik asukoht | У части обращений нет публичной геопозиции |
| `nextFeed.map.error` | Map could not load | Kaarti ei õnnestunud laadida | Карта не загрузилась |
| `nextFeed.map.unavailable` | Map unavailable | Kaart pole saadaval | Карта недоступна |
| `nextFeed.map.pinLabel` | Issue location | Teate asukoht | Место обращения |

## Acceptance Criteria
- [x] List|Map toggle + states per M151 register
- [x] Pins use next-feed `map-pin` URL; eligibility = lat/lon only
- [x] No invent map API; cite api-req + Q14 honesty
- [x] L10N keys listed; shell OOS
