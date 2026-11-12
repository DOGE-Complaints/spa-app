# SPA-ICON-STYLE-PROMPTS — стиль генерации иконок spa-app

> **SSOT для functional `ic-*` в spa-app** (user cabinet / identity / public board / early-signal dashboard).  
> **Не** marketing landing. Landing имеет свой стиль: `landing/.../STORY-LAND-image-style-prompts.md` — **не** копировать оттуда SHARED LOCK в SPA-диалог.  
> Каталоги ассетов: [`ICON-GENERATION-INDEX.md`](../tasks/backlog-stories/icons/ICON-GENERATION-INDEX.md) · ES: [`STORY-SPA-ES-icon-assets.md`](../tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md).  
> **Wave (каталог → PNG):** [`SPA-CATALOG-IMAGE-WAVE.md`](./SPA-CATALOG-IMAGE-WAVE.md) · Character sheet: [`references/DogeEstonia Character.png`](./references/DogeEstonia%20Character.png).  
> Foundations: [`design-system.md`](./design-system.md) · runtime tokens: [`src/styles/tokens.css`](../../src/styles/tokens.css).  
> Исполняемый пайплайн: [`scripts/icons/icon-manifest.yaml`](../../scripts/icons/icon-manifest.yaml) → `npm run icons:generate`.

**Inventory check (2026-08-16):** все пути из ES §Reuse для functional peers — **ON DISK** (см. §Reference anchors). `public/icons/early-signal-dashboard/` существует (пока `.gitkeep`; NEW ES `ic-*` ещё не сгенерированы).

---

## How to use

1. Открой этот файл + целевой `*-icon-assets.md` (Depict / Lucide hint / `file` / `color`).
2. Для полного прогона NEW: [`SPA-CATALOG-IMAGE-WAVE.md`](./SPA-CATALOG-IMAGE-WAVE.md) с `$imagesInput=` на каталог.
3. Вставь блок **SHARED LOCK** ниже в диалог генерации (или держи как критерии для Lucide/manifest).
4. Перед NEW: визуально сверь 2–3 peer PNG той же цветовой роли (таблица anchors).
5. Preferred path для `ic-*`: Lucide id → строка в `icon-manifest.yaml` → `npm run icons:generate` / `--file …` — **не** AI-перерисовка.
6. Mascot: character sheet [`references/DogeEstonia Character.png`](./references/DogeEstonia%20Character.png) — Contour B в WAVE.
7. Не выдумывай FAQ, URLs, copy, §Viz charts, folk bands как stroke-icons, новый logo mark.

---

## Anti-landing fence (обязательно)

| SPA (`ic-*`) | Landing (не смешивать) |
|--------------|-------------------------|
| Flat Lucide/Linear line icons | Soft illustrated scenes, watercolor grain |
| Monochrome stroke on **transparent** | Full-bleed civic compositions, halos `#FEF3E1` as fill language |
| Dark civic-tech OS chrome (`#0B1320` UI) | Marketing hero/CTA atmosphere |
| No mascot body inside functional icons | Character sheet / full-body / head-avatar illustrations |
| No folk embroidery as `ic-*` | Floral band / ornament PNGs as marketing or ETM textile |

**Hard bans in SPA functional gen:** purple / periwinkle / indigo / lavender fills; drop shadows; UI chrome (buttons, cards, nav); burned-in text/numbers; checkerboard baked into pixels; inventing a second doge face for `ic-*`.

Landing mascot paths (`landing/src/assets/sections/*/mascot.png`, `…/brand/mascot-dogestonia-head-avatar.png`) = **continuity for Help mascot illustration only** — never the stroke style for `ic-*`. Do **not** deep-link landing assets into spa runtime for icons.

---

## Canonical style facts

| Param | Value | Evidence |
|-------|-------|----------|
| Canvas | PNG RGBA **256×256** | all verified `ic-*` peers |
| Padding | ~**15%** (`0.15`) | `icon-manifest.yaml` `defaults.padding` |
| Stroke | ~**2px**, rounded caps/joins | `defaults.stroke_width: 2` · Lucide render |
| Geometry | Flat outline, Lucide-like, centered | peers: `ic-info`, `ic-external-link`, `ic-go-to-board` |
| Ground | **FULLY TRANSPARENT** (corners alpha 0) | Pillow verify on peers |
| UI context | Dark night surface `#0B1320` | DS `color.background.primary` / `--doge-bg` |
| Neutral stroke | `#f5f7fa` | manifest `colors.neutral` · ID-12 / ES conventions |
| Accent (Lucide batch) | `#f5c542` | manifest `colors.accent` (historical functional yellow) |
| Brand Signal Orange | `#F5A623` | DS `--doge-accent` · use when **catalog row** says Signal Orange / `#F5A623` |
| Success / error / amber | `#4ade80` / `#f87171` / `#fbbf24` | manifest `colors.*` |
| Filename | `ic-<kebab>.png` | catalogs |
| Out dirs | `story-handoff/` · `user-cabinet/` · `identity/` · `public-home/` · `early-signal-dashboard/` | `public/icons/<out_dir>/` |

**Color rule:** for Lucide `icons:generate`, prefer **exact manifest hex**. If a story catalog row specifies `#F5A623`, set that color on the manifest entry — do **not** invent a third yellow.

---

## SHARED LOCK (paste-ready EN)

```text
SHARED LOCK — DOGEstonia spa-app FUNCTIONAL ICONS (not landing, not marketing scenes)

Product surface: spa-app — civic-tech user cabinet, identity/auth chrome, public board, and early-signal dashboard.
Tone: calm operating-system UI; trustworthy, precise, readable at 16–24px; soft personality only through geometry, not illustration fluff.
NOT marketing landing illustration. NOT watercolor. NOT full-bleed civic scenes. NOT crypto-bro. NOT cyberpunk. NOT generic purple/violet AI startup look.

Exact colours (use the role named by the catalog row):
- Neutral foreground stroke: #f5f7fa
- Lucide functional accent (manifest default): #f5c542
- Brand Signal Orange (only when catalog says so): #F5A623
- Success: #4ade80 · Error: #f87171 · Amber: #fbbf24
- UI night context (not painted into the PNG): #0B1320
- Ground: FULLY TRANSPARENT PNG with real alpha — no white/cream/dark rectangle, no baked checkerboard

Output: single isolated icon, PNG RGBA 256×256, ~15% padding, thin ~2px stroke, rounded caps and joins, flat Lucide/Linear-like, centered.
No text glyphs (unless the metaphor IS a single letter like info “i”), no numbers, no frame, no drop shadow, no UI chrome, no watermarks.

Continuity: match existing spa-app Lucide PNG peers already on disk (same stroke weight, corner radius language, optical weight). Attach or compare peers before inventing a new shape language.

Do not redraw the brand shield logo as an ic-* stroke icon. Do not put the Shiba mascot body into functional icons. Do not generate folk textile bands as ic-*. Do not generate Network Pulse / density / constellation fields as Lucide PNGs (those are §Viz / CSS / canvas).
```

---

## Reference anchors (verified ON DISK)

Before generating NEW, open **2–3** peers from the same color role.

### Neutral `#f5f7fa` (stroke peers)

| File | Path |
|------|------|
| Info | `public/icons/story-handoff/ic-info.png` |
| External link | `public/icons/public-home/ic-external-link.png` |
| Go to board (grid) | `public/icons/story-handoff/ic-go-to-board.png` |
| My stories (user-circle) | `public/icons/story-handoff/ic-my-stories.png` |
| Location pin | `public/icons/story-handoff/ic-field-location.png` |
| Institution | `public/icons/story-handoff/ic-field-institution.png` |
| Auto-resubmit | `public/icons/story-handoff/ic-auto-resubmit.png` |
| Chevron | `public/icons/public-home/ic-chevron-right.png` |
| Empty board | `public/icons/public-home/ic-empty-board.png` |
| Role / person | `public/icons/user-cabinet/ic-field-role.png` |
| Eye | `public/icons/identity/ic-eye.png` |
| Groups / users | `public/icons/identity/ic-profile-conflict.png` |
| Globe | `public/icons/identity/ic-globe.png` |
| Search | `public/icons/identity/ic-search.png` |

### Accent / semantic peers

| Role | File | Path |
|------|------|------|
| Accent lock | `ic-lock.png` | `public/icons/story-handoff/ic-lock.png` |
| Accent spinner | `ic-spinner.png` | `public/icons/story-handoff/ic-spinner.png` |
| Success | `ic-success-check.png` | `public/icons/story-handoff/ic-success-check.png` |
| Error | `ic-cloud-error.png` | `public/icons/story-handoff/ic-cloud-error.png` |

### Brand / ETM (reuse — not Lucide stroke style)

| Asset | Path | Note |
|-------|------|------|
| Shield logo | `public/assets/DOGEstonia-logo-big.png` | brand mark; never regenerate as `ic-*` |
| ETM floral band | `public/icons/public-home/etm-floral-band.png` | photo/textile pipeline (`icons:etm`); not stroke `ic-*` |
| Character sheet (continuity) | `docs/UX/references/DogeEstonia Character.png` | Help mascot / doge illustration only — not `ic-*` |
| Floral photo ref (admin later) | `docs/UX/references/floral-band-reference.png` | décor SSOT; not stroke `ic-*` |

Optical target (from peers): uniform stroke, soft rounding, high contrast on night UI, no fill blobs, silhouette readable when scaled down.

---

## Generation methods

### A — Preferred: Lucide → PNG (functional `ic-*`)

1. Pick Lucide id from catalog seed hints / peers (must exist under `lucide-static/icons/`).
2. Add/adjust row in [`icon-manifest.yaml`](../../scripts/icons/icon-manifest.yaml): `catalog`, `file`, `out_dir`, `lucide_id`, `color`.
3. Run from `spa-app`:

```bash
npm run icons:generate
# or
python3 scripts/generate-icons-from-lucide.py --catalog <handoff|cab|identity|ph|es> --file ic-….png
npm run icons:validate
```

4. Accept only if RGBA 256², transparent corners, optical match to peers.

### B — AI GenerateImage (exception)

Use only if operator explicitly requires raster without a Lucide path:

1. Paste **SHARED LOCK**.
2. Paste catalog **Depict** verbatim (filename + color + metaphor).
3. Attach 2–3 peer PNGs from §Reference anchors (same color role).
4. Save to the catalog drop-in path under `public/icons/<out_dir>/`.
5. Post-process if needed: real alpha (no opaque white plate). Still must look Lucide-peer, not landing art.

### C — Out of this SHARED LOCK

| Kind | Method |
|------|--------|
| ETM `etm-*` | `npm run icons:etm` + photo refs — not stroke SHARED |
| Logo / flags | reuse `public/assets/*` |
| Help mascot illustration | separate brief + [`SPA-CATALOG-IMAGE-WAVE.md`](./SPA-CATALOG-IMAGE-WAVE.md) Contour B; continuity SSOT [`references/DogeEstonia Character.png`](./references/DogeEstonia%20Character.png) → e.g. `public/assets/es-help-mascot.png`; ≠ `ic-*` stroke |
| §Viz pulse / network / density | components / CSS / canvas — **forbid** Lucide PNG stand-ins |

---

## Do / Don’t

**Do**

- Match stroke weight and padding to existing spa `ic-*`.
- Prefer reuse paths from catalogs over NEW duplicates.
- Keep one metaphor per file; transparent ground.
- Use catalog color roles; align Lucide batch with manifest hex.
- Keep early-signal NEW under `public/icons/early-signal-dashboard/`.

**Don’t**

- Mix in landing SHARED LOCK / soft psychedelic / folk embroidery into `ic-*`.
- Generate §Viz constellations, density keys, skeletons, or device chrome as icons.
- Reuse CAB `ic-story-activity` for Pulse Activity (wrong metaphor — clipboard ledger).
- Bake ring/badge crops into helper icons when CSS owns the crop (SPA chrome rule).
- Invent brand crest / alternate doge for issue markers when logo reuse is specified.

---

## Out of scope for this style doc

- Per-asset Depict tables — live in story catalogs (ES, ID-12, CAB, PH, EPIC-04).
- Executing generation / manifest edits / contact sheets — [`SPA-CATALOG-IMAGE-WAVE.md`](./SPA-CATALOG-IMAGE-WAVE.md) (`$imagesInput` catalog).
- Landing asset generation — use landing style prompts only.
