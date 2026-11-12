# Icon generation catalogs — master index

> **Назначение:** единый список всех **документов-планов** для генерации/reuse иконок (не диск PNG).  
> Отдать агенту-генератору: читать каталоги ниже → генерировать только строки «NEW», не трогать §Reuse.  
> **Обновлять** этот файл при появлении нового `*-icon-assets.md` / appendix.

## Как прогнать PNG (MVP pipeline)

Functional `ic-*` собираются **без AI** из Lucide SVG → RGBA 256²:

```bash
cd spa-app
npm install   # lucide-static + @resvg/resvg-js (devDependencies)
npm run icons:generate          # все каталоги из манифеста
npm run icons:generate:stubs    # только stub/пустые
npm run icons:validate
npm run icons:contact-sheet     # → icon-contact-sheet.png рядом с этим файлом
```

- **Исполняемый SSOT:** [`scripts/icons/icon-manifest.yaml`](../../../../scripts/icons/icon-manifest.yaml) (`file` → `lucide_id` → `color` → `out_dir`)
- **Генератор:** [`scripts/generate-icons-from-lucide.py`](../../../../scripts/generate-icons-from-lucide.py)
- **Markdown-каталоги ниже** остаются документацией смысла/промптов.
- **ETM (`etm-*`):** photo-derived из `docs/UX/eesti/*-reference.png` — `npm run icons:etm` ([`scripts/generate-etm-from-refs.py`](../../../../scripts/generate-etm-from-refs.py)).

## Каталоги генерации (промпты → PNG)

| # | Документ | Scope / mockups | Target dir (planned) | Status |
|---|----------|-----------------|----------------------|--------|
| 1 | [STORY-SPA-ID-12-icon-assets.md](../identity-auth/STORY-SPA-ID-12-icon-assets.md) | M128 story handoff | `public/icons/story-handoff/` | catalog Done; PNG via Lucide pipeline |
| 1b | [STORY-SPA-ID-14](../identity-auth/STORY-SPA-ID-14-post-submit-path-choice.md) §icons | M135 CTA leading (`ic-go-to-board`, `ic-my-stories`) | `public/icons/story-handoff/` | ✅ ON DISK via same handoff Lucide manifest (`layout-grid`, `circle-user`) |
| 2 | [STORY-SPA-CAB-icon-assets.md](../cabinet/STORY-SPA-CAB-icon-assets.md) | CAB M21–M26, M45, M50, M53, M99 + M28 civic | `public/icons/user-cabinet/` | catalog Done; PNG via Lucide pipeline |
| 3 | [EPIC-SPA-04-icon-assets.md](EPIC-SPA-04-icon-assets.md) | epic-04 M28, M32, M37, M120–M128 (консолидация) | `public/icons/identity/` | catalog Done; PNG via Lucide pipeline |
| 4 | [STORY-SPA-PH-icon-assets.md](../public-home/STORY-SPA-PH-icon-assets.md) | public-home M129–M133 | `public/icons/public-home/` | ✅ catalog Done; `ic-*` via Lucide; `etm-*` via photo refs (`npm run icons:etm`) |
| 5 | [STORY-SPA-ES-icon-assets.md](../early-signal-dashboard/STORY-SPA-ES-icon-assets.md) | early-signal M136–M140 | `public/icons/early-signal-dashboard/` (+ `assets/es-help-mascot.png`) | ✅ ON DISK via Lucide catalog `es` (15 `ic-*`) + Help mascot GenerateImage (`public/assets/es-help-mascot.png`) |
| 6 | [STORY-SPA-SSR-icon-assets.md](../semantic-schema-runtime/STORY-SPA-SSR-icon-assets.md) | semantic-schema M141–M142 | `public/icons/semantic-schema-runtime/` | ✅ ON DISK via Lucide catalog `ssr` (3 `ic-*`: `ic-view-list`, `ic-view-map`, `ic-map-pin`) |
| 7 | [STORY-SPA-THR-icon-assets.md](../threads-feed/STORY-SPA-THR-icon-assets.md) | threads-feed M143–M148 | `public/icons/threads-feed/` | ✅ ON DISK via Lucide catalog `thr` (6 `ic-*`) · reactions = emoji Not ic-* |
| 8 | [STORY-SPA-NS-icon-assets.md](../next-shell/STORY-SPA-NS-icon-assets.md) | next-shell (REQ-22 D2) | `public/icons/next-shell/` | **Promote/index Done** (masters in icon-system; runtime on disk · not Lucide generate) |
| 9 | [STORY-SPA-NF-icon-assets.md](../next-feed/STORY-SPA-NF-icon-assets.md) | next-feed (REQ-22 content) | `public/icons/next-feed/` | **Promote/index Done** (32 SVG on disk · 13 reactions · reuse next-shell · not Lucide generate) |
| 10 | [STORY-SPA-CR-icon-assets.md](../component-reactions/STORY-SPA-CR-icon-assets.md) | component-reactions (REQ-24 · M154) | `public/icons/component-reactions/` (gitkeep; runtime = reuse NF/NS) | **Reuse + Gap-8 Done** · **Gap v2 closed ([CR-20](../component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md))** thumbs-up `react` + dual-circle `reactions` Present · **no** multicolor mark SVG · not Lucide |

## Парные / связанные docs (не дублировать промпты)

| Документ | Роль |
|----------|------|
| [EPIC-SPA-04-icon-integration.md](EPIC-SPA-04-icon-integration.md) | Куда ставить иконки в коде после генерации (EPIC-04) |
| [STORY-SPA-CAB-07-cabinet-page-states.md](../cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) | Consumer: M22/M23 → reuse из CAB-icon-assets / story-handoff (своих NEW нет) |
| [ICON-INVENTORY.md](../../../UX/mockups/ICON-INVENTORY.md) | Inventory initiation + epic-04 (частичный; ссылается на ID-12 / CAB) |
| [ADMIN-PH-03-icon-assets-catalog.md](../public-home/ADMIN-PH-03-icon-assets-catalog.md) | Admin task Done → PH catalog (#4) |
| [ADMIN-ESD-03-icon-assets-catalog.md](../early-signal-dashboard/ADMIN-ESD-03-icon-assets-catalog.md) | Admin task Done → ES catalog (#5) |
| [ADMIN-SSR-03-icon-assets-catalog.md](../semantic-schema-runtime/ADMIN-SSR-03-icon-assets-catalog.md) | Admin task Done → SSR catalog (#6) |
| [ADMIN-NS-03-icon-assets-catalog.md](../next-shell/ADMIN-NS-03-icon-assets-catalog.md) | Admin task Done → next-shell catalog (#8 · Promote/index, not Lucide) |
| [ADMIN-NF-02-icon-assets-catalog.md](../next-feed/ADMIN-NF-02-icon-assets-catalog.md) | Admin task Done → next-feed catalog (#9 · Promote/index + runtime on disk) |
| [ADMIN-CR-03-icon-assets-catalog.md](../component-reactions/ADMIN-CR-03-icon-assets-catalog.md) | Admin task Done → component-reactions catalog (#10 · Reuse NF/NS · Gap-8 promoted) |
| [DOGEstonia-Gap8-reactions-v1.0/](../component-reactions/DOGEstonia-Gap8-reactions-v1.0/) | Gap-8 delivery evidence → masters + NF runtime promote |
| [public-home/UX-PROMPTS.md](../public-home/UX-PROMPTS.md) | UX prompts (не icon catalog) |
| [home/README.md](../../../UX/mockups/home/README.md) | Mockup SSOT M129–M133 (вход для PH catalog) |
| [early-discovery-dashboard/](../../../UX/mockups/early-discovery-dashboard/) | Mockup SSOT M136–M140 (вход для ES catalog) |
| [semantic-schema/](../../../UX/mockups/semantic-schema/) | Mockup SSOT M141–M142 (вход для SSR catalog) |

## Правило дедупа для генератора

1. Перед NEW-строкой сверить **имя файла** и **смысл** с каталогами #1–#10.  
2. Совпадение → строка в §Reuse с путём из того каталога; **не** добавлять в NEW.  
3. Не сверять в первую очередь с `public/icons/*` на диске — SSOT для дедупа = **эти markdown-каталоги** (диск может отставать или быть пустым).  
4. Logo/flags (`public/assets/DOGEstonia-logo-*`, `ET.svg`…) — всегда reuse, не генерировать.  
5. ES §Viz (pulse/network density) — не генерировать как `ic-*`. Mascot — не Lucide.  
6. SSR map canvas tiles — §Viz; overlay field labels — text/L10N, не per-field `ic-*`.
7. THR reactions.v1 — Unicode emoji (§Not ic-*); не invent per-reaction `ic-*`.
8. next-shell (#8) — **promote** masters из icon-system → `public/icons/next-shell/`; **не** Lucide/`ic-*` generate.
9. next-feed (#9) — **promote** feed subset → `public/icons/next-feed/`; reuse `#8` for shell nav; **не** Lucide/`ic-*` generate.
10. component-reactions (#10) — **reuse** `#9`/`#8` URLs; Gap-8 masters promoted into NF reactions (13 SVG); Gap v2 **closed CR-20**: `actions/react.svg` thumbs-up + `actions/reactions.svg` dual-circle Present; mark color = CSS `currentColor` accents (**не** bake multicolor marks); **не** Lucide / duplicate under `component-reactions/`.

## Порядок для агента-генератора (рекомендуемый)

1. ID-12 → `story-handoff/`  
2. CAB → `user-cabinet/`  
3. EPIC-SPA-04 NEW → `identity/` (skip §Reuse)  
4. PH (после ADMIN-PH-03) → `public-home/` (skip §Reuse)  
5. ES (после ADMIN-ESD-03) → `early-signal-dashboard/` (skip §Reuse; mascot separate)  
6. SSR (после ADMIN-SSR-03) → `semantic-schema-runtime/` (skip §Reuse; map tiles §Viz)  
7. THR (после ADMIN-THR-03) → `threads-feed/` (skip §Reuse; reactions emoji Not ic-*)  
8. NS (после ADMIN-NS-03) → `public/icons/next-shell/` (**cp** masters · не Lucide)  
9. NF (после ADMIN-NF-02) → `public/icons/next-feed/` (**cp** masters · reuse NS · не Lucide)  
10. CR (после ADMIN-CR-03 + Gap-8 promote) → reuse NF/NS URLs · 13 reaction SVGs on `#9` · `component-reactions/` gitkeep only (не Lucide)
