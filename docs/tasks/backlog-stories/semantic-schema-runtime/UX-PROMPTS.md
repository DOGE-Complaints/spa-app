# UX Prompts — Semantic Schema Runtime (ADMIN-SSR-01)

> Package: [semantic-schema-runtime](INDEX.md)  
> Product lock: [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> Inputs: [ADMIN-SSR-01-product-ux-prompts.md](ADMIN-SSR-01-product-ux-prompts.md), [REQ-16](../../../requirements/16-semantic-schema-spa-compatibility.md), sibling [REQ-51](../../../../../doge-complaints-gateway/docs/requirements/51-semantic-schema-runtime.md) §3  
> Method note: prompts derived from locked brief + verified code only (analysis.mdc).  
> **Verified baseline today:** Issues list `GET {base}/node/issues` ([`GatewayIssueRepository.js:77`](../../../../src/repositories/GatewayIssueRepository.js)); host `/` → `/board` ([`App.jsx:24–25`](../../../../src/App.jsx)); `IssueCard` / `IssuePage` civic-only — **no** `schema_card`, **no** `geo` ([`IssueCard.jsx:39–80`](../../../../src/components/IssueCard/IssueCard.jsx), [`IssuePage.jsx:85–116`](../../../../src/pages/IssuePage.jsx)); spa `src/` grep `schema_card` / `structured_payload` **0**; map UI / map deps **0** ([`package.json`](../../../../package.json) L73–78). Gateway emits optional `schema_card` ([`dto.py:57–58`](../../../../../doge-complaints-gateway/src/core/projection/dto.py)); public `geo.*` when lat+lon ([`mapper.py:28–42`](../../../../../doge-complaints-gateway/src/core/projection/mapper.py)). Active `tallinn_civic` pack has **no** `card_fields` → civic-only card is valid today.

## Locked prompt defaults

| Topic | Default for mockups |
|-------|---------------------|
| Overlay surfaces | Both **compact list card** and **Issue detail page** receive overlay when `schema_card` present (PRODUCT-BRIEF #12) |
| civic-only | Valid when `schema_card` absent or empty — regression baseline (tallinn_civic today) |
| Overlay keys | Only dotted-path keys that would appear in `issue.schema_card` from pack `card_fields`. Use **illustrative** examples below — **not invented names** |
| Field labels on artboard | Annotate dotted-path id (e.g. `signals.desired_outcome`); human-readable label copy → L10N `schemaRuntime.cardField.<path>` ([ADMIN-SSR-05](ADMIN-SSR-05-backlog-stories-l10n.md)) |
| Issue geo on wire | Public keys only: `lat`, `lon`, `label`, `district`, `settlement`, `region`, `country` — **not** `admin_*` on Issue JSON |
| Map library | Unspecified — generic map surface, no vendor branding (REQ-16 §6 Q2) |
| Host | `/board` only; reuse PH header / footer / filter panel |

### Illustrative `schema_card` paths (mockup density only)

Use these **only** as example allowlist leaves when showing overlay states. At implementation, keys MUST match active pack `card_fields` verbatim:

- `signals.desired_outcome`
- `signals.affected_group`
- `signals.service_object`

Do **not** add paths not declared in pack allowlist. Do **not** show `structured_payload`, raw `geo` snapshot, or bind/hash fields.

## Global constraints (for every prompt)

- Dark civic-tech DOGEstonia — **not** a marketing landing / hero page.
- Host surface is **`/board`** for map/list; Issue detail is existing civic route (reuse PH chrome on board).
- Reuse public-home header, footer, Submit CTA, and SEARCH filter panel contract ([PH-04](../public-home/STORY-SPA-PH-04-board-feed-home.md) feed host). Do **not** redesign REQ-12 `/dashboard` or cabinet.
- **Issue overlay only** — do **not** mix with Early Signal / Emerging cards (spa 15). Zero-Issues discovery composition is **out of scope** for SSR-M.
- **No** dynamic form builder, pack.json UI, clustering knobs, or `GET /schema-active` affordances.
- **No** automatic dump of `structured_payload` or raw node payload — overlay = named `schema_card` leaves only (AC-SPA-REQ3-03, SEC-004).
- SPA is display-only assistive UI — not a schema validator (SPA-001).
- Filters (SEARCH panel + GeoFilter admin dimensions) **remain visible** in both list and map modes; map does not replace filters.
- Map toggle **eligible** iff current resultset has **≥1** Issue with numeric `geo.lat` **and** `geo.lon`. Pins = Issues with both coords; list = **full** resultset (AC-SPA-MAP-01…02).
- Visual language: dark surfaces (`#141417` / `#1b1c1f`), text `#f2f2f2`, muted `#9a9da6`, accent yellow sparingly (`#f5c542`).
- Feed layout: single-column Issue list per [M132](../UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md) — **not** multi-column kanban.

## EN copy placeholders (chrome — draft for mockups)

Overlay **values** come from gateway JSON. Overlay **field labels** use L10N 1:1 dotted-path glue (see L10N note below).

| i18n key (draft) | EN placeholder |
|------------------|----------------|
| `schemaRuntime.overlay.sectionTitle` | Additional details |
| `schemaRuntime.map.toggle.list` | List |
| `schemaRuntime.map.toggle.map` | Map |
| `schemaRuntime.map.ineligible` | Map is available when at least one story has a location |
| `schemaRuntime.map.emptyPins` | No locations to show on the map for this view |

Per-field overlay labels: `schemaRuntime.cardField.<dotted-path>` — populate in ADMIN-SSR-05 when pack `card_fields` are known.

## L10N glue note (locked)

- i18n key for an overlay field label = **same dotted-path** as the key in `issue.schema_card` (from pack `card_fields`).
- Example: JSON key `signals.desired_outcome` → label key `schemaRuntime.cardField.signals.desired_outcome`.
- Values displayed = verbatim from JSON sidecar; labels = dictionary lookup by that id.
- Full table: [ADMIN-SSR-05](ADMIN-SSR-05-backlog-stories-l10n.md).

## Prohibited-pattern checklist

Do **not** put any of these in mockups:

- Invented overlay field names not in `schema_card` / pack `card_fields`
- Raw `structured_payload` panel, JSON dump, or «View full story data»
- `admin_district`, `admin_settlement`, or other internal domain names on public Issue UI
- Pack configuration, clustering threshold knobs, or schema-metadata HTTP UI
- Early Signal / Emerging Signal cards styled as Issue overlay
- Map toggle enabled when zero Issues have both lat+lon
- Vendor-specific map library chrome (Google/Mapbox logos as design requirement)

## Out of scope (must stay out of mockups)

- Schema Runtime / `story_dimensions` in spa
- Full dynamic form / preview builder (REQ3 §30)
- Four node-specific product dashboards
- Story submit forms (GPT REQ-45)
- Invented schema-metadata HTTP
- Reading pack.json / `geo_intake` / `node_clustering` in browser UI
- Early Signal discovery on zero-Issues board (spa 15)
- PNG delivery in this layer (ADMIN-SSR-02 owns specs intake)

## Artboard to future story mapping

| Artboard ID | Surface | Future story |
|-------------|---------|--------------|
| SSR-C | Issue **card** (list) + **detail** overlay when `schema_card` present | [STORY-SPA-SSR-02](STORY-SPA-SSR-02-schema-card-overlay.md) |
| SSR-M | `/board` **list \| map** of current Issues resultset | [STORY-SPA-SSR-03](STORY-SPA-SSR-03-board-list-map-toggle.md) |

## Open UX note (REQ-16 §6 Q1 — resolved for mockups)

Compact card and detail page **both** show overlay when sidecar present, but **density may differ**: list card = compact key/value rows; detail = roomier layout. Mockups must show **both** surfaces as separate labeled states (SSR-C-overlay-compact + SSR-C-overlay-detail).

---

## SSR-C — Schema card overlay (Issue card + detail)

### State matrix

| State | Required |
|-------|----------|
| SSR-C-civic | Issue with **no** `schema_card` — civic card in list **and** civic detail only (regression baseline) |
| SSR-C-overlay-compact | List card with non-empty `schema_card` — compact overlay density |
| SSR-C-overlay-detail | Issue detail page — fuller overlay density for same Issue |
| SSR-C-many | Many overlay leaves — wrap / truncation / progressive disclosure pattern |
| SSR-C-narrow | Mobile / narrow — compact card + detail overlay stack |

### Paste-ready UX prompt (EN)

Design a state-sheet artboard for DOGEstonia **Issue schema overlay** (SSR-C): optional named fields from gateway `schema_card` on top of existing civic Issue chrome.

Show these labeled states on one sheet (or linked sub-panels): civic-only (no sidecar); compact list card with overlay; Issue detail with overlay; many overlay leaves; narrow/mobile.

Hard requirements:
- **Civic base unchanged:** title/summary, type, labels, status, dates remain the primary Issue identity — overlay is a **distinct sub-block** below civic fields, titled «Additional details» (or equivalent section chrome).
- Overlay appears on **both** the board/list **compact card** and the **Issue detail** page when `schema_card` is non-empty.
- Overlay keys and values = only leaves that would appear in `issue.schema_card` (flat dotted-path keys). Use illustrative example paths: `signals.desired_outcome`, `signals.affected_group`, `signals.service_object` — annotate each row with the dotted-path id; do **not** invent new field names.
- When `schema_card` is absent or empty, show **civic-only** card/detail with **no** empty overlay chrome (valid for packs without `card_fields`).
- Do **not** show `structured_payload`, raw JSON dump, bind/hash fields, or street-level geo not in allowlist.
- Field labels: show human-readable copy in mockup but annotate that production label id = same dotted-path → `schemaRuntime.cardField.<path>`.
- Compact vs detail: list card uses tighter rows; detail allows more vertical spacing — show both.
- Many leaves: show honest wrap/truncation (e.g. max visible rows + «show more» affordance is optional UX detail).
- Reuse dark civic-tech tokens; compatible with existing Issue card visual language from public board feed (M132).
- Do **not** include Early Signal / Emerging blocks. Do **not** include form builder or pack admin UI.

Output format:
- One consolidated state sheet with labeled states (desktop + narrow/mobile expectations).
- Visual/product specification only — no implementation code.

---

## SSR-M — Board list | map toggle

### State matrix

| State | Required |
|-------|----------|
| SSR-M-list | Default **list** view — full current resultset; filters / search toolbar visible |
| SSR-M-map | **Map** view — pins only for Issues with both `geo.lat` and `geo.lon` |
| SSR-M-ineligible | Current resultset has **zero** pin-capable Issues — toggle hidden or disabled + ineligible helper copy |
| SSR-M-partial | Mixed resultset: N Issues total, M with coords (M < N) — list shows all N; map shows M pins |
| SSR-M-filtered | Active filters — same query drives both list and map views |
| SSR-M-narrow | Mobile — list\|map toggle + stacked map or list |

### Paste-ready UX prompt (EN)

Design a state-sheet artboard for DOGEstonia public **`/board`** **list | map** toggle (SSR-M): same Issues resultset, two views.

Show these labeled states: list default; map with pins; map ineligible (no coords); partial pins (subset); filtered resultset; narrow/mobile.

Hard requirements:
- Host = `/board` with existing public header, footer, and SEARCH filter panel — **filters remain visible** in both list and map modes.
- Toggle labels: «List» / «Map» (or icon+text equivalent). Map mode is **eligible** only when ≥1 Issue in the **current** resultset has numeric latitude and longitude.
- **List view** always shows the **full** filtered resultset (including Issues without coordinates).
- **Map view** shows **pins only** for Issues with both `geo.lat` and `geo.lon`. Issues without coords are **not** pinned but remain in list view.
- Pin popup / callout may show public geo fields: `label`, `district`, `settlement`, `region`, `country` — use public names, **not** `admin_*` prefixes.
- When no Issues qualify for pins, show disabled/hidden toggle with honest ineligible copy — do **not** show an empty map with enabled toggle.
- Partial pins: make it visually obvious that map is a **subset** of the list (e.g. «3 of 7 stories on map» is optional helper copy — not a hard count requirement).
- Generic map surface — no commitment to Mapbox/Google/Leaflet branding; dark civic-tech frame around map canvas.
- Do **not** add pack.json UI, clustering knobs, bbox draw tools, or new HTTP endpoints.
- Do **not** redesign Early Signal zero-Issues discovery — this artboard assumes a **non-empty Issues feed context** or filtered resultset with list semantics.
- Issue cards in list mode may show civic fields only or civic + schema overlay (SSR-C) — do not block on overlay for map states.

Output format:
- One consolidated state sheet with labeled states (desktop + narrow/mobile).
- Annotate toggle placement relative to feed toolbar (e.g. near view controls, not inside filter drawer).
- Visual/product specification only — no implementation code.

---

## Notes for ADMIN-SSR-02

- **SSOT folder (факт):** `spa-app/docs/UX/mockups/semantic-schema/` — не projected `semantic-schema-runtime/`
- Artboards on disk:
  - SSR-C → [M141](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md) (+ [PNG](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png))
  - SSR-M → [M142](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md) (+ [PNG](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.png))
- Indexer: [semantic-schema/README.md](../../../UX/mockups/semantic-schema/README.md) · mockup table: [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- Story §Артборд paths → [STORY-SPA-SSR-02](STORY-SPA-SSR-02-schema-card-overlay.md) / [STORY-SPA-SSR-03](STORY-SPA-SSR-03-board-list-map-toggle.md) refine in ADMIN-SSR-05.
