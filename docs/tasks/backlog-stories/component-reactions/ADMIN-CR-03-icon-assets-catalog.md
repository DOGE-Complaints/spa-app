# ADMIN-CR-03 — Icon assets catalog (слой icons · Variant B first)

## Meta

- **Key:** `ADMIN-CR-03-icon-assets-catalog`
- **Status:** Done (2026-10-14T09:15:15Z)
- **Depends on:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) + UX inventory table in Вход (no Depends on ADMIN-01/02)
- **Blocks:** ADMIN-CR-05 (icon refs in stories)
- **Skill:** analysis + asset catalog (образец `public-home/ADMIN-PH-03-icon-assets-catalog.md`)
- **Master index:** [`../icons/ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md) row **#10**
- **Deliverable:** [`STORY-SPA-CR-icon-assets.md`](STORY-SPA-CR-icon-assets.md)

## Цель

Единый каталог иконок для **reactions.v1** mark glyphs + strip/picker chrome affordances по M154 (и `currentColor` / stress rules из M160). M155 — только reuse note для badge-on-avatar (people UI OOS).

## Вход — authoritative UX file table (полный Phase 1 inventory)

| Artboard file (path) | States | Spec file (path) | REQ § / surface | Notes |
|---|---|---|---|---|
| `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png` | `THR-R-A`, `REACTION-STRIP-EMPTY`, `REACTION-STRIP-LOADING`, `REACTION-STRIP-ERROR`, `THR-R-B/C`, `THR-R-D`, `THR-R-E`, `THR-R-F`, `THR-R-G`, `REACTION-CAPACITY`, `REACTION-SAVING`/`REACTION-SAVE-ERROR`, `THREAD-ROOT-SCOPE` | `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` | REQ-24 primary | Catalog mark icons + React/close/check affordances |
| `spa-app/docs/UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.png` | `REACTORS-POPOVER-*`, `REACTIONS-DISTRIBUTION-*`, `OVERLAY-DISTRIBUTION-MOBILE`, `DARK-PARITY-SAMPLE` | `spa-app/docs/UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md` | REQ-24 L8 OOS | Do **not** invent people avatars; badge glyphs = **reuse** M154 catalog rows |
| `spa-app/docs/UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png` | `THEME-*`, `L10N-LONG`, `CTRL-5`, `FEEDBACK-4`, `REFLOW-320-200`, `PREF-ENV`, `ICON-COLOR` | `spa-app/docs/UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md` | FR-24.9 / stress | Icons inherit `currentColor`; meaning never icon-only |

Also: Component & Variants §§29–31; Tokens pack (via M160 authority). Written specs override PNG geometry.

**Dedup also against:** `public/icons/next-feed/` / next-feed icon catalog / threads `threadIcons` — prefer §Reuse over NEW when meaning matches.

## Конвенции (зафиксированы в каталоге)

| Param | Value |
|-------|-------|
| Runtime (default) | Reuse `/icons/next-feed/…` and `/icons/next-shell/…` URLs |
| Package dir | `spa-app/public/icons/component-reactions/` — `.gitkeep` only this wave |
| Format | SVG + `currentColor` (M160); Gap marks = catalog emoji interim |
| Style | no invent SVG / Lucide `ic-*` without icon-system masters |

## Reuse — дедуп выполнен

Сверка: ICON-GENERATION-INDEX #8/#9 + NF/NS catalogs + `reactionsV1Catalog.js`.

- **§Reuse:** 5 marks (acknowledge, support, agree, disagree, off_topic) + chrome (react, retry, warning, unavailable, error, success, info, close)  
- **§Gap:** 8 enabled marks without masters (emoji interim)  
- **§Omit:** hopeful, amused  

## Deliverable

1. [`STORY-SPA-CR-icon-assets.md`](STORY-SPA-CR-icon-assets.md) — §Reuse (NF/NS) + §Gap (8) + §Omit  
2. `public/icons/component-reactions/.gitkeep`  
3. Row **#10** in ICON-GENERATION-INDEX  
4. INDEX: ADMIN-CR-03 → Done  

## Acceptance

- [x] Every enabled M154 mark has catalog row or explicit Reuse / Gap  
- [x] M155 does not add people/avatar NEW assets  
- [x] M160 `currentColor` / non-icon-only meaning noted  
- [x] No duplicate names vs plan-docs in ICON-GENERATION-INDEX / next-feed icons  
- [x] Derived-from-spec disclaimer (PNG tone)  
- [x] INDEX updated  

## Как выполнять

«Выполни ADMIN-CR-03 по M154 (+ M160 icon rules; M155 badge=reuse only); дедуп против ICON-GENERATION-INDEX и next-feed icon catalog; формат как ADMIN-PH-03 / CAB-icon-assets».

**Executed:** Reuse-first + Gap 8 (no invent SVG) · 2026-10-14T09:15:15Z.
