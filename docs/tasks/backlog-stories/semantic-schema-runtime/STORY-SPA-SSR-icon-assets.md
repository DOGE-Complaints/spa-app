# STORY-SPA-SSR — Каталог иконок (генерировать)

> Референс для **генерации** functional `ic-*` Semantic Schema Runtime (M141–M142).  
> Mockup SSOT: [`docs/UX/mockups/semantic-schema/`](../../../UX/mockups/semantic-schema/) · [ADMIN-SSR-02](ADMIN-SSR-02-ux-mockup-intake.md) · [ADMIN-SSR-03](ADMIN-SSR-03-icon-assets-catalog.md).  
> Master: [`ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md) #6.  
> **Дедуп:** [PH](../public-home/STORY-SPA-PH-icon-assets.md) · [ID-12](../identity-auth/STORY-SPA-ID-12-icon-assets.md) · [CAB](../cabinet/STORY-SPA-CAB-icon-assets.md) · [EPIC-SPA-04](../icons/EPIC-SPA-04-icon-assets.md) · [ES](../early-signal-dashboard/STORY-SPA-ES-icon-assets.md).

**Traceability:** STORY-SPA-SSR-02 (M141 — 0 NEW) · STORY-SPA-SSR-03 (M142 — 3 NEW ниже).

## Конвенции

- **Директория загрузки (fixed):** [`public/icons/semantic-schema-runtime/`](../../../../public/icons/semantic-schema-runtime/)
- **Runtime path:** `/icons/semantic-schema-runtime/ic-<kebab>.png`
- **Имя файла:** `ic-<kebab>.png`, один ассет = один файл.
- **Формат:** PNG RGBA (прозрачный фон), **256×256** (+ опц. `@2x` 512×512), padding ~15%, без текста/рамки/тени.
- **Стиль:** thin stroke ~2px, скруглённые концы, flat, Lucide/Linear-like, enterprise civic-tech, тёмный UI DOGEstonia.
- **Цвета:** нейтраль **#f5f7fa**; pin accent **#F5A623** (Signal Orange).
- **a11y:** декоративные — `aria-hidden="true"`; toggle — text labels «List»/«Map» обязательны рядом с glyph.
- **Не включать:** map tiles/roads/provider chrome; per-field overlay icons (text/L10N); status badge internals; artboard letters A–F.

## Таблица иконок (генерировать)

| # | Иконка (смысл) | Mockup / контекст | Story | Путь (runtime / on disk) | Цвет | Промпт (прозрачный растр) |
|---|----------------|-------------------|-------|--------------------------|------|---------------------------|
| 1 | List view segment | M142 List\|Map toggle — glyph beside text «List» (not icon-only) | SSR-03 | `/icons/semantic-schema-runtime/ic-view-list.png` · [`public/icons/semantic-schema-runtime/ic-view-list.png`](../../../../public/icons/semantic-schema-runtime/ic-view-list.png) | нейтраль #f5f7fa | `List view icon — three or four equal horizontal lines stacked with even gaps (simple list), thin 2px line, rounded caps, color #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no text, no clipboard, flat, Lucide-like, dark civic-tech UI. PNG with alpha.` |
| 2 | Map view segment | M142 List\|Map toggle — glyph beside text «Map» (not icon-only) | SSR-03 | `/icons/semantic-schema-runtime/ic-view-map.png` · [`public/icons/semantic-schema-runtime/ic-view-map.png`](../../../../public/icons/semantic-schema-runtime/ic-view-map.png) | нейтраль #f5f7fa | `Map view icon — a simple folded map / map sheet outline, thin 2px line, rounded, color #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no pin inside, no provider logo, no text, flat, Lucide-like, dark civic-tech UI. PNG with alpha.` |
| 3 | Issue map pin | M142 map canvas / selected-pin marker (not card meta location row) | SSR-03 | `/icons/semantic-schema-runtime/ic-map-pin.png` · [`public/icons/semantic-schema-runtime/ic-map-pin.png`](../../../../public/icons/semantic-schema-runtime/ic-map-pin.png) | акцент #F5A623 | `Map pin icon — classic teardrop location pin outline (or solid-fill pin silhouette), thin 2px stroke where outline, color #F5A623 on FULLY TRANSPARENT background, 256×256, 15% padding, no text, no street map, not a small field meta glyph, flat, Lucide-like, dark civic-tech UI. PNG with alpha.` |

**Итого ON DISK (3):**
- [`public/icons/semantic-schema-runtime/ic-view-list.png`](../../../../public/icons/semantic-schema-runtime/ic-view-list.png) → runtime `/icons/semantic-schema-runtime/ic-view-list.png`
- [`public/icons/semantic-schema-runtime/ic-view-map.png`](../../../../public/icons/semantic-schema-runtime/ic-view-map.png) → runtime `/icons/semantic-schema-runtime/ic-view-map.png`
- [`public/icons/semantic-schema-runtime/ic-map-pin.png`](../../../../public/icons/semantic-schema-runtime/ic-map-pin.png) → runtime `/icons/semantic-schema-runtime/ic-map-pin.png`

## Reuse — НЕ генерировать (уже есть)

| Иконка | Путь | Mockup / контекст | Story |
|--------|------|-------------------|-------|
| Location **meta** (card row) | `/icons/story-handoff/ic-field-location.png` | M141/M142 Tallinn-style geo row — **не** путать с #3 map pin | SSR-02, SSR-03 |
| Chevron right | `/icons/public-home/ic-chevron-right.png` | Open issue | SSR-02 |
| Chevron down | `/icons/identity/ic-chevron-down.png` | M141 Show more details | SSR-02 |
| Clock | `/icons/identity/ic-clock.png` | Relative time on card | SSR-02 |
| Search | `/icons/identity/ic-search.png` | M142 toolbar | SSR-03 |
| Globe | `/icons/identity/ic-globe.png` | Locale | SSR-03 |
| Account | `/icons/user-cabinet/ic-field-role.png` | Sign in | SSR-03 |
| Info | `/icons/story-handoff/ic-info.png` | Map ineligible helper | SSR-03 |
| Load error | `/icons/story-handoff/ic-cloud-error.png` | Board load fail | SSR-03 |
| Retry | `/icons/story-handoff/ic-auto-resubmit.png` | Retry | SSR-03 |
| Category floral thumb | `/icons/public-home/etm-category-rosette.png` | M141 card thumb | SSR-02 |
| App logo / ETM bands | `/assets/DOGEstonia-logo-*` · PH `etm-*` | Shell chrome | SSR-02, SSR-03 |

## Заметки

- **M141 schema overlay:** **0 NEW** — Additional details = text + `schemaRuntime.cardField.*`; civic chrome = §Reuse only.
- **Toggle:** labels «List» / «Map» required; #1/#2 are companion glyphs, not icon-only controls.
- **#3 vs meta location:** map canvas pin (`ic-map-pin`, #F5A623) ≠ card meta (`ic-field-location`, neutral).
- **Map tiles / roads / provider UI:** §Viz — не генерировать как `ic-*`.
- **PNG status:** ✅ ON DISK — Lucide pass (`icon-manifest.yaml` `catalog: ssr`; `python3 scripts/generate-icons-from-lucide.py --catalog ssr` + validate).
