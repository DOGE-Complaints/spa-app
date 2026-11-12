# ADMIN-SSR-05 — Backlog stories + L10N glue (слой 4.4)

## Meta

- **Key:** `ADMIN-SSR-05-backlog-stories-l10n`
- **Status:** Done (2026-09-02) — SSR-01…03 P1.3-ready; L10N glue + tallinn MVP `cardField.*`
- **Depends on:** ADMIN-SSR-02 (mockup SSOT); ADMIN-SSR-03/04 (icon + api refs)
- **Blocks:** ADMIN-SSR-06
- **Skill:** backlog authoring (образец [ADMIN-PH-05](../public-home/ADMIN-PH-05-backlog-stories-l10n.md))

## Цель

Довести product stories SSR-01…03 до **P1.3-ready** формы (ui_first — после mockups; tech_first SSR-01 — отдельная optional wave):

- Meta / scope / FR / AC / documentation touchpoints
- §«Тексты и переводы» для **chrome** (toggle, map empty/ineligible, overlay section title)
- Ссылки на mockup specs + icon catalog + api-req rows
- Явный out of scope

**As-of-Done:** ui_first SSR-02/03 → **Todo** (M141/M142 wired); tech_first SSR-01 → **Todo** (detail_level + api-req §5).

## L10N glue — schema_card field labels (locked)

**Правило 1:1:** i18n key для подписи overlay-поля = **тот же dotted-path**, что ключ в `issue.schema_card` (из pack `card_fields`).

| Слой | Идентификатор | Пример |
|------|---------------|--------|
| Gateway JSON key | `issue.schema_card["signals.desired_outcome"]` | `signals.desired_outcome` |
| Pack allowlist | `card_fields[]` | tallinn MVP — [GW-SSR-30](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-30-tallinn-card-fields-spa-overlay-readiness.md) |
| SPA i18n key | `schemaRuntime.cardField.signals.desired_outcome` | label et/ru/en in [SSR-02](STORY-SPA-SSR-02-schema-card-overlay.md) |
| Значение в UI | из JSON sidecar | verbatim string/number |

**Запрещено:**

- переименовывать dotted-path в «красивые» ключи (`streetName`, `admin_district` на overlay)
- показывать raw key как единственный fallback без словаря (допустим dev-only warn + dotted-path display — [SSR-02](STORY-SPA-SSR-02-schema-card-overlay.md) FR-SSR-02.8)
- invent поля, которых нет в `schema_card`

**Chrome namespace:** `schemaRuntime.*`

| Prefix | Назначение | Story |
|--------|------------|-------|
| `schemaRuntime.cardField.<dotted-path>` | labels overlay leaves (1:1 с JSON keys) | SSR-02 — tallinn MVP 3 keys filled |
| `schemaRuntime.overlay.*` | section title + show more | SSR-02 |
| `schemaRuntime.map.*` | list\|map toggle, ineligible, empty/partial | SSR-03 |

Pack-specific paths добавляются в словарь **по мере появления** `card_fields` в active pack. Legal/mobility без allowlist → civic-only (keys empty OK).

**Cross-links:** [PRODUCT-BRIEF §11](PRODUCT-BRIEF.md) · [ADMIN-SSR-04 naming contract](ADMIN-SSR-04-api-requirements.md) · [ADMIN-SSR-01 L10N note](ADMIN-SSR-01-product-ux-prompts.md) · [api-req §5](STORY-SPA-SSR-api-requirements.md)

## Целевые файлы (as-of-Done)

| Key | File | orientation | Status |
|-----|------|-------------|--------|
| SSR-01 | [STORY-SPA-SSR-01-issue-public-shape-consume.md](STORY-SPA-SSR-01-issue-public-shape-consume.md) | tech_first | **Todo** |
| SSR-02 | [STORY-SPA-SSR-02-schema-card-overlay.md](STORY-SPA-SSR-02-schema-card-overlay.md) | ui_first | **Todo** — M141 + L10N |
| SSR-03 | [STORY-SPA-SSR-03-board-list-map-toggle.md](STORY-SPA-SSR-03-board-list-map-toggle.md) | ui_first | **Todo** — M142 + icons |

## TODO (layer execution)

- [x] После ADMIN-02: прописать реальные mockup paths в SSR-02/03 (§Артборд) — M141 / M142 under `docs/UX/mockups/semantic-schema/`
- [x] Заполнить `schemaRuntime.cardField.*` для tallinn MVP paths (GW-SSR-30 pack.json)
- [x] Wire icon rows из [STORY-SPA-SSR-icon-assets.md](STORY-SPA-SSR-icon-assets.md)
- [x] Wire api rows из [STORY-SPA-SSR-api-requirements.md](STORY-SPA-SSR-api-requirements.md)
- [x] INDEX: ADMIN-SSR-05 → Done; ui_first → Todo

## Acceptance

- [x] SSR-01…03 exist with FR/AC aligned to REQ-16 §4–5
- [x] L10N glue documented in SSR-02 (+ refs in ADMIN-01/04)
- [x] ui_first stories link mockup IDs SSR-C / SSR-M (= M141 / M142)
- [x] No invented overlay keys or `admin_*` on public Issue wire

## Как выполнять

«Выполни ADMIN-SSR-05: refine SSR-01…03 по мокапам/icons/api; заполни `schemaRuntime.cardField.*` для pack paths».
