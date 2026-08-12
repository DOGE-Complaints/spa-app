# STORY-SPA-PH — Каталог иконок/визуалов (Public Home MVP)

> Референс для генерации и вёрстки: функциональные иконки Public Home / Shell (M129–M133) + cultural ETM layer из [`docs/UX/mockups/home/`](../../../UX/mockups/home/README.md).
>
> **Icons (non-blocking):** Финальные картинки пока не готовы. На диске могут лежать **placeholder PNG** (1×1 stub). В коде прописывать точные имена/пути из этого каталога (`/icons/public-home/…`, reuse `/icons/identity|story-handoff|user-cabinet/…`). Отсутствие или stub не блокирует вёрстку, L10N, routes, тесты — замена арта позже.
>
> **Scope:** M129 header · M130 account · M131 footer · M132 board feed · M133 how-it-works.  
> **Метод:** Base PNG + **estonia** PNG landed 2026-08-03; parity → [ESTONIA-ARTBOARD-PARITY-2026-08-03.md](../../../UX/mockups/home/ESTONIA-ARTBOARD-PARITY-2026-08-03.md). Functional icons still derived from spec + artboards; ETM from estonia cultural layer.  
> **Дедуп:** сверка с plan catalogs [ID-12](../identity-auth/STORY-SPA-ID-12-icon-assets.md), [CAB](../cabinet/STORY-SPA-CAB-icon-assets.md), [EPIC-SPA-04](../icons/EPIC-SPA-04-icon-assets.md) — не с диском. Master index: [`ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md).

**Traceability:** [PH-01](STORY-SPA-PH-01-header-brand-nav.md)…[PH-06](STORY-SPA-PH-06-submit-story-gpt-cta.md) · ADMIN-PH-03.

## Конвенции

### Functional icons (`ic-*`)
- **Директория загрузки (fixed):** [`public/icons/public-home/`](../../../../public/icons/public-home/)
- **Runtime path:** `/icons/public-home/ic-<kebab>.png`
- **Имя файла:** `ic-<kebab>.png`, один ассет = один файл.
- **Формат:** PNG RGBA (прозрачный фон), **256×256** (+ опц. `@2x` 512×512), padding ~15%, без текста/рамки/тени.
- **Стиль:** thin stroke ~2px, скруглённые концы, flat, Lucide/Linear-like, enterprise civic-tech, тёмный UI DOGEstonia.
- **Цвета (verified):** акцент **#F5A623** (G9 Signal Orange); нейтраль **#f5f7fa**; error — как ID-12 (TBD-токен).
- **a11y:** декоративные — `aria-hidden="true"`; смысловые (error/empty) — дублировать текстом рядом.
- **Не включать:** footer social clusters (M131); giant landing illustrations; loading spinner (CSS skeleton); text-only nav labels; filter button glyph без требования в спеке; textile patterns **внутри** functional icons.

### Cultural / ETM assets (`etm-*`)
- **Директория:** тот же [`public/icons/public-home/`](../../../../public/icons/public-home/) (или `public/assets/etm/` при tileable large bands — зафиксировать при execute).
- **Имя файла:** `etm-<kebab>.png` (не `ic-`).
- **Роль:** non-semantic framing — *Motif frames the interface. It never replaces functional hierarchy.*
- **Референсы при генерации (обязательно):** оператор предоставит **референсы реальных эстонских юбок (полоски)** и **орнаментов (цветочки)**. Не выдумывать произвольный «folk» — следовать референсам + Night (`#0B1320`) / Signal Orange (`#F5A623`) UI.
- **Запрет:** textile внутри labels, avatars, Lucide-like control icons.

## Таблица иконок (генерировать) — functional

| # | Иконка (смысл) | Mockup / контекст | Story | Файл | Цвет | Промпт (прозрачный растр) |
|---|----------------|-------------------|-------|------|------|---------------------------|
| 1 | Mobile nav menu | M129 narrow/mobile — three-line menu / compact nav control | PH-01 | `ic-nav-menu.png` | нейтраль #f5f7fa | `Hamburger menu icon — three equal horizontal lines stacked with even gaps, thin 2px line, rounded caps, color #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no text, flat, Lucide-like, dark civic-tech UI. PNG with alpha.` |
| 2 | Empty board | M132 empty state — calm empty / small brand marker (not inbox tray, not giant illustration); EE skin may prefer E5 rosette | PH-04 | `ic-empty-board.png` | нейтраль #f5f7fa | `Empty board marker icon — a minimal calm empty-state glyph (simple open frame or subtle brand-neutral silhouette), thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no cartoon, no giant illustration, not an inbox tray, flat, Lucide-like. PNG with alpha.` |
| 3 | External handoff *(опц.)* | M133 **Submit a story** CTA only — external GPT handoff (never on internal Go to Dashboard) | PH-06 | `ic-external-link.png` | нейтраль #f5f7fa | `External link icon — a square with an arrow pointing out of the top-right corner, thin 2px line, rounded, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, no text, flat, Lucide-like. PNG with alpha.` |
| 4 | Open details chevron *(опц.)* | M132 feed item open-details affordance | PH-04 | `ic-chevron-right.png` | нейтраль #f5f7fa | `Chevron-right icon — a single rightward chevron, thin 2px line, rounded caps, #f5f7fa on FULLY TRANSPARENT background, 256×256, 15% padding, flat, Lucide-like. PNG with alpha.` |

**Итого NEW functional:** 4 файла в `public/icons/public-home/` (#3/#4 опциональные при вёрстке).

## Cultural / ETM design assets (генерировать)

> Источник: estonia artboards M129–M133. При генерации — **референсы реальных эстонских юбок (полоски) и орнаментов (цветочки)** от оператора.

| # | Asset | Mockup / контекст | Story | Файл | Notes / prompt seed |
|---|-------|-------------------|-------|------|---------------------|
| E1 | ETM-FLORAL band | Header/footer/shell horizontal separator (M129–133 EE) | PH-01…05 | `etm-floral-band.png` (+ tileable) | Repeating stylized Estonian floral embroidery strip for Night UI; follow provided flower-ornament refs; transparent or dark ground; not a button icon |
| E2 | ETM-STRIPE vertical | Shell left rail / footer brand marker (M129/M131/M132) | PH-01, PH-03, PH-04 | `etm-stripe-vertical.png` | Vertical multi-width stripes from traditional Estonian skirt refs (полоски); red/yellow/green/black family as in refs — do not invent random rainbow |
| E3 | ETM-STRIPE horizontal micro | Card top accent / account menu stripe-cap (M130/M132) | PH-02, PH-04 | `etm-stripe-cap.png` | Thin horizontal strip of vertical skirt stripes; same skirt refs as E2 |
| E4 | ETM watermark | Footer/board optional faint (M131/M132) | PH-03, PH-04 | `etm-watermark-folk.png` | Large low-opacity folk floral/circular ornament; non-interactive; never overlap text |
| E5 | Empty floral rosette | M132 empty cultural marker (EE) | PH-04 | `etm-empty-rosette.png` | Cultural empty hero; coexists with/replaces thin `ic-empty-board` for EE skin; follow flower refs |
| E6 | Empty floral divider | M132 empty ornament under title | PH-04 | `etm-floral-divider.png` | Small horizontal 2–3 flower divider; decorative only |
| E7 | Feed category rosette thumb | M132 card cultural thumb beside labels | PH-04 | `etm-category-rosette.png` | Small round floral thumb; **labels remain text chips** — motif does not replace status/labels |
| E8 | Step floral shell | M133 step number frame (01–04) | PH-05 | `etm-step-shell.png` | Circular floral/sunburst shell around step numbers; numbers stay text |

**Итого NEW ETM:** 8 файлов (`etm-*`). Генератор читает §functional NEW + §ETM.

## Reuse — НЕ генерировать (из plan catalogs)

| Иконка | Путь | Source catalog | Mockup / контекст | Story |
|--------|------|----------------|-------------------|-------|
| Account / profile silhouette | `/icons/user-cabinet/ic-field-role.png` | [CAB](../cabinet/STORY-SPA-CAB-icon-assets.md) #3 | M129/M130 guest & auth account control | PH-01, PH-02 |
| Dropdown chevron | `/icons/identity/ic-chevron-down.png` | [EPIC-SPA-04](../icons/EPIC-SPA-04-icon-assets.md) #11 | M129/M130 locale or account menu | PH-01, PH-02 |
| Locale globe *(опц.)* | `/icons/identity/ic-globe.png` | EPIC-SPA-04 #6 | M129 locale control | PH-01 |
| Locale selected check | `/icons/story-handoff/ic-success-check.png` | [ID-12](../identity-auth/STORY-SPA-ID-12-icon-assets.md) #14 | M129 locale selected marker | PH-01 |
| Board load error | `/icons/story-handoff/ic-cloud-error.png` | ID-12 #18 | M132 load error | PH-04 |
| Retry action *(опц.)* | `/icons/story-handoff/ic-auto-resubmit.png` | ID-12 #13 | M132 retry | PH-04 |
| Search glyph *(опц.)* | `/icons/identity/ic-search.png` | EPIC-SPA-04 #12 | M132 search input if UI adds glyph | PH-04 |
| Step 1 document | `/icons/story-handoff/ic-doc-new.png` | ID-12 #16 | M133 step 1 issue-record / document | PH-05 |
| Step 3 structured text | `/icons/story-handoff/ic-field-summary.png` | ID-12 #5 | M133 step 3 prepare useful story | PH-05 |
| App logo | `public/assets/DOGEstonia-logo-big.png` (+ fallback SVG) | assets | M129 brand | PH-01 |
| Locale flags | `public/assets/ET.svg`, `RU.svg`, `US.svg` | assets | M129 language selector | PH-01 |

## Заметки

- **M131 footer:** brand + tagline + text links only — **без** icon rows / social clusters; ETM floral/stripe/watermark OK as frame.
- **Loading (M132):** CSS skeleton — **не** тащить ID-12 `ic-spinner.png`.
- **Nav labels** Dashboard / How it works / Submit a story — текст; Submit может опционально получить #3 external glyph (PH-06).
- **Go to Dashboard (M133):** internal `/board` — **без** external-link glyph (parity gap на EE PNG).
- **Filter control:** text «Filters» в спеке — NEW glyph не добавлять.
- **M133 step 2:** Visual Support не задан — отдельной NEW functional нет; E8 shell shared across steps.
- **CAB `ic-story-empty`:** не reuse для M132 empty (другой смысл: inbox tray vs board empty marker).
- **ETM refs:** skirts (полоски) → E2/E3; flowers (цветочки) → E1/E4/E5/E6/E7/E8.
- **Методология:** каталог обязателен рядом с будущими PH L10N tables; генератор читает §functional NEW + §ETM.
