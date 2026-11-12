# ADMIN-ESD-03 — Icon assets catalog (слой 4.2)

## Meta

- **Key:** `ADMIN-ESD-03-icon-assets-catalog`
- **Status:** **Done** (2026-08-16)
- **Depends on:** mockup specs + PNG in [`docs/UX/mockups/early-discovery-dashboard/`](../../../UX/mockups/early-discovery-dashboard/) ([ADMIN-ESD-02](ADMIN-ESD-02-ux-mockup-intake.md))
- **Blocks:** ADMIN-ESD-05 (icon refs in stories)
- **Skill:** analysis + asset catalog (образец [`ADMIN-PH-03`](../public-home/ADMIN-PH-03-icon-assets-catalog.md))
- **Master index:** [`../icons/ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md) #5
- **Deliverable:** [`STORY-SPA-ES-icon-assets.md`](STORY-SPA-ES-icon-assets.md)

## Цель

Единый каталог иконок для Early Signal discovery blocks.

## Mockups (SSOT для extract)

Источник артбордов: `spa-app/docs/UX/mockups/early-discovery-dashboard/` (intake: [ADMIN-ESD-02](ADMIN-ESD-02-ux-mockup-intake.md)).

| Artboard | Mockup | Future story | Spec | PNG |
|----------|--------|--------------|------|-----|
| ESD-D | M136 | ES-01 | [mockup-136-early-signal-discovery-composition-state-sheet-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md) | [mockup-136-early-signal-discovery-composition-state-sheet-spec.png](../../../UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.png) |
| ESD-P | M137 | ES-02 | [mockup-137-network-pulse-block-state-sheet-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md) | [mockup-137-network-pulse-block-state-sheet-spec.png](../../../UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.png) |
| ESD-E | M138 | ES-03 | [mockup-138-emerging-signals-provisional-state-sheet-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md) | [mockup-138-emerging-signals-provisional-state-sheet-spec.png](../../../UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png) |
| ESD-C | M139 | ES-04 | [mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md) | [mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png](../../../UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png) |
| ESD-I | M140 | ES-05 | [mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md) | [mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png](../../../UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png) |

PNG **на диске** — inventory + extract SSOT в [`STORY-SPA-ES-icon-assets.md`](STORY-SPA-ES-icon-assets.md).

## Конвенции

| Param | Value |
|-------|-------|
| Directory | `spa-app/public/icons/early-signal-dashboard/` |
| Runtime | `/icons/early-signal-dashboard/ic-*.png` |
| Format | `ic-<kebab>.png`, PNG RGBA 256×256, ~15% padding |
| Style | thin stroke ~2px, Lucide-like; align PH civic palette |
| Mascot | `public/assets/es-help-mascot.png` (illustration, not Lucide) |

## Reuse — дедуп по catalog docs

Сверено с: [STORY-SPA-PH-icon-assets.md](../public-home/STORY-SPA-PH-icon-assets.md), ID-12, CAB, EPIC-SPA-04 + spa UI wiring. См. §Reuse в ES catalog.

## Deliverable

1. [`STORY-SPA-ES-icon-assets.md`](STORY-SPA-ES-icon-assets.md) — per-artboard inventory + §NEW + §Reuse + §Viz + mascot
2. `public/icons/early-signal-dashboard/.gitkeep`
3. Row #5 in ICON-GENERATION-INDEX
4. Link from package INDEX

## Acceptance

- [x] Catalog covers Pulse / Emerging / Missing / Help / discovery empty-or-forming (+ M139 dog, M140 topics)
- [x] Reuse marked vs PH empty-board / handoff / identity / CAB where applicable
- [x] No duplicate names vs plan-docs without §Reuse
- [x] INDEX: ADMIN-ESD-03 → Done

## Как выполнять

«Каталог Done — генерация Lucide PNG / mascot extract = отдельный generator pass (`icon-manifest` + operator drop-in)».
