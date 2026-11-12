# STORY-SPA-SSR-02 — Schema card overlay (Issue card + detail)

## Meta

- **Key:** `STORY-SPA-SSR-02-schema-card-overlay`
- **Epic:** [EPIC-SPA-13](../../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md) · [pipeline](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/STORY-SPA-SSR-02-schema-card-overlay.md)
- **Package:** [semantic-schema-runtime/](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [UX-PROMPTS.md](UX-PROMPTS.md) (SSR-C)
- **Status:** Done
- **orientation:** ui_first
- **Severity:** 🔴 HIGH (REQ-16 core)
- **Depends on:** [M141](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md); [SSR-01](STORY-SPA-SSR-01-issue-public-shape-consume.md) (recommended); PH-04 board + Issue detail host; [api-req §2.1 / §3](STORY-SPA-SSR-api-requirements.md); [icon catalog](STORY-SPA-SSR-icon-assets.md)
- **REQ:** [16](../../../requirements/16-semantic-schema-spa-compatibility.md) §4.1, AC-SPA-CARD-01, AC-SPA-REQ3-03, SEC-004
- **P3 Done:** 2026-09-02T20:06:33Z · `pkg-000075` · [gate](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/task-spa-ssr-02-t05-vitest-story-gate-ssr-02/acceptance-verification-spa-ssr-02.md)

## Артборд (SSOT дизайна)

| Мокап | Artboard | Состояние | Спека (.md) | PNG |
|-------|----------|-----------|-------------|-----|
| **M141** | SSR-C | Card + detail overlay when `schema_card` non-empty; civic-only when absent | [mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md) | [PNG](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png) |

> SSOT folder: [`docs/UX/mockups/semantic-schema/`](../../../UX/mockups/semantic-schema/README.md) (not `semantic-schema-runtime/`).

## Зачем простыми словами

Когда gateway присылает named leaves в `schema_card`, пользователь видит их **рядом с civic Issue**, а не сырой node payload. Без sidecar — карточка остаётся как сегодня (civic-only).

## Текущее состояние (verified)

### As-of-Done (Current — post P3 2026-09-02)

| Fact | Evidence |
|------|----------|
| Compact overlay | [`SchemaCardOverlay`](../../../../src/components/SchemaCardOverlay/SchemaCardOverlay.jsx) in [`IssueCard.jsx`](../../../../src/components/IssueCard/IssueCard.jsx) |
| Detail overlay | [`IssuePage.jsx`](../../../../src/pages/IssuePage.jsx) density=`detail` |
| L10N | [`schemaRuntimeDictionary.js`](../../../../src/i18n/schemaRuntimeDictionary.js) |
| Absent `schema_card` | no overlay chrome (vitest + pre-implement PNG) |

### Historical (pre-P3)

- [`IssueCard.jsx`](../../../../src/components/IssueCard/IssueCard.jsx) — civic fields only; no overlay
- [`IssuePage.jsx`](../../../../src/pages/IssuePage.jsx) — civic detail; no `schema_card` UI
- spa UI `schema_card` consumer — **0** (foundation-only typedef/repo from SSR-01)

## Функциональные требования (FR)

- **FR-SSR-02.1** When `issue.schema_card` is non-empty, render overlay on **compact Issue card** in board/list feed.
- **FR-SSR-02.2** Same overlay semantics on **Issue detail** page (existing civic Issue route).
- **FR-SSR-02.3** Overlay keys = **only** keys present in `schema_card` object (gateway dotted-path verbatim). Do not invent fields.
- **FR-SSR-02.4** Values displayed from JSON sidecar; labels from i18n **`schemaRuntime.cardField.<dotted-path>`** (1:1 glue — [ADMIN-SSR-05](ADMIN-SSR-05-backlog-stories-l10n.md)).
- **FR-SSR-02.5** When `schema_card` absent or empty → **no overlay block**; civic card unchanged (AC-SPA-CARD-01).
- **FR-SSR-02.6** MUST NOT render `structured_payload`, raw geo snapshot, bind/hash fields (AC-SPA-REQ3-03, SEC-004).
- **FR-SSR-02.7** SPA is not schema validator — display-only (SPA-001).
- **FR-SSR-02.8** Missing i18n for a path: show dotted-path as label + **dev-only** warn; do not invent alternate keys.
- **FR-SSR-02.L10N** Section chrome + per-field keys below. et / ru / en. EN — канон M141 §10.

## Субтаски

| Таск | Суть | Швы |
|------|------|-----|
| **[T01](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/task-spa-ssr-02-t01-overlay-compact-card/README.md)** | Overlay on compact Issue card (M141 ui_anchor) | `IssueCard.jsx` |
| **[T02](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/task-spa-ssr-02-t02-overlay-issue-detail/README.md)** | Overlay on Issue detail | `IssuePage.jsx` |
| **[T03](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/task-spa-ssr-02-t03-l10n-cardfield-resolver/README.md)** | L10N `schemaRuntime.cardField.*` 1:1 + chrome | `i18n/*` |
| **[T04](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/task-spa-ssr-02-t04-sec-no-structured-payload/README.md)** | SEC: never render `structured_payload` | overlay modules |
| **[T05](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/task-spa-ssr-02-t05-vitest-story-gate-ssr-02/README.md)** | Vitest + story gate SSR-02 | `__tests__` |

> Pipeline mirror: [STORY-SPA-SSR-02 (epic)](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/STORY-SPA-SSR-02-schema-card-overlay.md)

## Иконки (из каталога)

> Источник: [STORY-SPA-SSR-icon-assets.md](STORY-SPA-SSR-icon-assets.md). **M141 = 0 NEW** — overlay = text + L10N only.

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| Show more details | `ic-chevron-down.png` | `/icons/identity/ic-chevron-down.png` | Reuse |
| Open issue | `ic-chevron-right.png` | `/icons/public-home/ic-chevron-right.png` | Reuse |
| Location meta (card row) | `ic-field-location.png` | `/icons/story-handoff/ic-field-location.png` | Reuse — **not** map pin |
| Relative time | `ic-clock.png` | `/icons/identity/ic-clock.png` | Reuse |
| Category thumb | `etm-category-rosette.png` | `/icons/public-home/etm-category-rosette.png` | Reuse |

> Per-field overlay icons — **запрещены** (catalog notes).

## Routes / API

- [api-req §1 / §2.1 / §3 SSR-02](STORY-SPA-SSR-api-requirements.md): `GET /node/issues` (+ detail) — **no new list API**
- Overlay data = inline `issue.schema_card`; API ready post [GW-SSR-30](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-30-tallinn-card-fields-spa-overlay-readiness.md) ([api-req §5](STORY-SPA-SSR-api-requirements.md))
- Naming SSOT: [ADMIN-SSR-04](ADMIN-SSR-04-api-requirements.md)

## Зависимости

- PH-04 feed host · IssuePage route
- SSR-01 for typed pass-through
- **Not** Early Signal / Emerging cards (spa 15)

## Вне scope

- Form builder / pack.json UI
- Map mode (SSR-03)
- Inventing overlay field names / `admin_*` on Issue JSON
- Dump `structured_payload`
- Reproject historical gateway Issues (gateway residual)

## Тексты и переводы (en / et / ru)

> EN — канон M141. et/ru — factual translations (не в PNG). Field labels = 1:1 with `schema_card` keys. Tallinn MVP paths only below; другие packs — добавить keys когда появятся в `card_fields`.

### Chrome

| key | en | et | ru |
|-----|----|----|----|
| `schemaRuntime.overlay.sectionTitle` | Additional details | Lisainfo | Дополнительные сведения |
| `schemaRuntime.overlay.showMore` | Show more details | Näita rohkem üksikasju | Показать подробнее |

### Tallinn MVP `schemaRuntime.cardField.*` (GW-SSR-30)

| key | Gateway JSON key | en | et | ru |
|-----|------------------|----|----|----|
| `schemaRuntime.cardField.signals.desired_outcome` | `signals.desired_outcome` | Desired outcome | Soovitud tulemus | Желаемый результат |
| `schemaRuntime.cardField.signals.affected_group` | `signals.affected_group` | Affected group | Mõjutatud grupp | Затронутая группа |
| `schemaRuntime.cardField.signals.service_object` | `signals.service_object` | Service object | Teenuse objekt | Объект услуги |

> **Запрещено:** rename dotted-path → `streetName` / invent keys; show raw key as sole production fallback without dictionary policy (FR-SSR-02.8).

## Acceptance Criteria

- [x] Non-empty `schema_card` → overlay visible on card **and** detail (M141)
- [x] Empty/absent `schema_card` → civic-only (no empty overlay chrome)
- [x] Keys/values match gateway JSON; labels use 1:1 i18n glue (MVP three paths above)
- [x] Missing label → dotted-path + dev warn (not invent)
- [x] No `structured_payload` surface
- [x] Links: M141 spec · icon catalog · api-req §2.1 · ADMIN-SSR-05 L10N

## Швы

- `IssueCard` · `IssuePage` · i18n dictionary · gateway `card_fields` allowlist
