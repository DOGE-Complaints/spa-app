# ADMIN-THR-03 — Icon assets catalog

## Meta

- **Key:** `ADMIN-THR-03-icon-assets-catalog`
- **Status:** Done (2026-09-22)
- **Depends on:** ADMIN-THR-02 (artboards exist) — [M143–M148](../../../UX/mockups/threads-feed/README.md)
- **Blocks:** ADMIN-THR-05 icon sections (partially unblocked — catalog ready)
- **Skill:** icon catalog curation
- **Master index:** [`../icons/ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md) #7
- **Deliverable:** [`STORY-SPA-THR-icon-assets.md`](STORY-SPA-THR-icon-assets.md)

## Цель

Единый каталог иконок для threads feed chrome + reactions.v1 emoji aids — **после** артбордов.

## Mockups (SSOT для inventory)

| Artboard | Mockup | Future story |
|----------|--------|--------------|
| THR-P | M143 | THR-01 |
| THR-T | M144 | THR-02 |
| THR-R | M145 | THR-03 |
| THR-E | M146 | THR-04 |
| THR-V | M147 | THR-05 |
| THR-I | M148 | THR-01 |

## Конвенции

| Param | Value |
|-------|-------|
| Directory | `spa-app/public/icons/threads-feed/` (`.gitkeep` on disk) |
| Runtime | `/icons/threads-feed/ic-*.png` |
| Format | `ic-<kebab>.png`, PNG RGBA 256×256, Lucide-like |
| Reactions | Unicode emoji aids from reactions.v1 — **not** per-id `ic-*` (M145) |

## Deliverable

1. [`STORY-SPA-THR-icon-assets.md`](STORY-SPA-THR-icon-assets.md) — inventory NEW/Reuse/Not ic-*
2. `public/icons/threads-feed/.gitkeep`
3. Row #7 in ICON-GENERATION-INDEX
4. §Иконки filled on THR-01…05
5. Lucide PNG = **follow-up** generator pass (not required to close this layer)

## Acceptance

- [x] Catalog lists only artboard-named glyphs (+ verified reuse)
- [x] No invented reaction `ic-*` from missing artboard extract
- [x] INDEX ADMIN-THR-03 → Done

## TODO (layer execution)

- [x] Read artboards; list only named glyphs
- [x] Write catalog STORY + place dir (`.gitkeep`)
- [x] Patch ui_first §Иконки

## Как выполнять

«Каталог Done — генерация Lucide PNG = отдельный generator pass (`icon-manifest` catalog `thr` + `npm run icons:generate`)».
