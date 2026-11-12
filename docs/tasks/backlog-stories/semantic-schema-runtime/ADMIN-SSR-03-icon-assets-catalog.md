# ADMIN-SSR-03 — Icon assets catalog (слой 4.2)

## Meta

- **Key:** `ADMIN-SSR-03-icon-assets-catalog`
- **Status:** **Done** (2026-09-02)
- **Depends on:** mockup specs + PNG in [`docs/UX/mockups/semantic-schema/`](../../../UX/mockups/semantic-schema/) ([ADMIN-SSR-02](ADMIN-SSR-02-ux-mockup-intake.md))
- **Blocks:** ADMIN-SSR-05 (icon refs in stories)
- **Skill:** analysis + asset catalog (образец [`ADMIN-ESD-03`](../early-signal-dashboard/ADMIN-ESD-03-icon-assets-catalog.md))
- **Master index:** [`../icons/ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md) #6
- **Deliverable:** [`STORY-SPA-SSR-icon-assets.md`](STORY-SPA-SSR-icon-assets.md)

## Цель

Единый каталог иконок по артбордам SSR-C / SSR-M.

## Mockups (SSOT для extract)

Источник: `spa-app/docs/UX/mockups/semantic-schema/` (не projected `semantic-schema-runtime/`).

| Artboard | Mockup | Future story | Spec | PNG |
|----------|--------|--------------|------|-----|
| SSR-C | M141 | SSR-02 | [mockup-141-…-spec.md](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md) | [PNG](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png) |
| SSR-M | M142 | SSR-03 | [mockup-142-…-spec.md](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md) | [PNG](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.png) |

## Конвенции

| Param | Value |
|-------|-------|
| Directory | `spa-app/public/icons/semantic-schema-runtime/` |
| Runtime | `/icons/semantic-schema-runtime/ic-*.png` |
| Format | `ic-<kebab>.png`, PNG RGBA 256×256, ~15% padding |
| Style | thin stroke ~2px, Lucide-like; `#f5c542` / `#F5A623` pin · `#f5f7fa` chrome |

## Reuse — дедуп по catalog docs

Сверено с: PH, ID-12, CAB, EPIC-SPA-04, ES. M141 = **reuse only** (no NEW). M142 = 3 NEW (list / map / pin). См. §Reuse / §NEW в [STORY-SPA-SSR-icon-assets.md](STORY-SPA-SSR-icon-assets.md).

## Deliverable

1. [`STORY-SPA-SSR-icon-assets.md`](STORY-SPA-SSR-icon-assets.md) — per-artboard inventory + §NEW (3) + §Reuse + §Viz
2. `public/icons/semantic-schema-runtime/.gitkeep`
3. Row #6 in ICON-GENERATION-INDEX
4. Link from package INDEX

## Acceptance

- [x] Catalog covers SSR-C/SSR-M (M141 no NEW; M142 list/map/pin)
- [x] Reuse marked vs PH / handoff / identity / CAB
- [x] No invented `ic-*` without M141/M142 evidence; pin ≠ meta `ic-field-location`
- [x] INDEX: ADMIN-SSR-03 → Done

## Как выполнять

«Каталог Done — генерация Lucide PNG = отдельный generator pass (`icon-manifest` `catalog: ssr` + `npm run icons:generate`)».
