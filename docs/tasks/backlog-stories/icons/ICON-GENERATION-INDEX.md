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

## Парные / связанные docs (не дублировать промпты)

| Документ | Роль |
|----------|------|
| [EPIC-SPA-04-icon-integration.md](EPIC-SPA-04-icon-integration.md) | Куда ставить иконки в коде после генерации (EPIC-04) |
| [STORY-SPA-CAB-07-cabinet-page-states.md](../cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) | Consumer: M22/M23 → reuse из CAB-icon-assets / story-handoff (своих NEW нет) |
| [ICON-INVENTORY.md](../../../UX/mockups/ICON-INVENTORY.md) | Inventory initiation + epic-04 (частичный; ссылается на ID-12 / CAB) |
| [ADMIN-PH-03-icon-assets-catalog.md](../public-home/ADMIN-PH-03-icon-assets-catalog.md) | Admin task Done → PH catalog (#4) |
| [public-home/UX-PROMPTS.md](../public-home/UX-PROMPTS.md) | UX prompts (не icon catalog) |
| [home/README.md](../../../UX/mockups/home/README.md) | Mockup SSOT M129–M133 (вход для PH catalog) |

## Правило дедупа для генератора

1. Перед NEW-строкой сверить **имя файла** и **смысл** с каталогами #1–#3 (и #4 когда появится).  
2. Совпадение → строка в §Reuse с путём из того каталога; **не** добавлять в NEW.  
3. Не сверять в первую очередь с `public/icons/*` на диске — SSOT для дедупа = **эти markdown-каталоги** (диск может отставать или быть пустым).  
4. Logo/flags (`public/assets/DOGEstonia-logo-*`, `ET.svg`…) — всегда reuse, не генерировать.

## Порядок для агента-генератора (рекомендуемый)

1. ID-12 → `story-handoff/`  
2. CAB → `user-cabinet/`  
3. EPIC-SPA-04 NEW → `identity/` (skip §Reuse)  
4. PH (после ADMIN-PH-03) → `public-home/` (skip §Reuse)
