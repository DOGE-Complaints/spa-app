# Interview SSOT — OP residual wave 3 (spa-wide marks 1–11)

- **Дата:** 2026-10-22  
- **Тип:** Markstack intake · spa-wide residual after wave2 Apply  
- **Evidence:** [evidence/op-residual-wave3-2026-10-22/](../../../analysis/evidence/op-residual-wave3-2026-10-22/)  
- **Wave2 validation:** [analysis-markstack-wave2-code-validation-2026-10-22.md](../../../analysis/analysis-markstack-wave2-code-validation-2026-10-22.md)  
- **Пакеты:** next-feed · next-shell · component-thread · component-reactions · public-home  
- **Prior:** [INTERVIEW-NF-18-plus…](INTERVIEW-NF-18-plus-op-residual-map-dark-2026-10-21.md)  
- **Wave:** **1A** docs only · Method [markstack-intake.md](../../../../../docs/methodology/Zeya888-builder-queue/prompts/architect/markstack-intake.md)

## Решения оператора

| # | Тема | Решение |
|---|------|---------|
| W1 | Delivery | Docs Markstack only · Apply later |
| L1 | Locale | Chevron icon (not `v`) · ES frozen + hover tooltip “request language” |
| R2 | Rail | Remove summary Profile+chevron · keep lower Profile · Board→**Feed** · drop «No stories yet» |
| F3 | Calendar | `color-scheme` follows `data-theme` |
| F4 | Reset | Actionable when dirty/active · pointer when actionable |
| T5–6 | Composer dark | Theme-safe textarea/attach/post (extend CT-32) |
| Rx7 | React | Wide underlay · React→own picker · Reactions→people · **M164 accepted:** own icons **inside** React (stable geometry) · **no** page-wide row below (supersedes draft “below”) |
| H8 | Header logo | Larger · light surface (no dark plate) · **prefer SVG vector** brand — intake [M165](../../../UX/mockups/home/DOGEstonia-M165-header-brand-logo-light-spec-v1.0.md) |
| P9 | Footer + static | Larger logo · tagline · `/about` `/privacy` `/contact` — intake [M166](../../../UX/mockups/home/DOGEstonia-M166-public-footer-brand-links-spec-v1.0.md) |
| H10 | How It Works | Drop Opens `/board` · CTA→`/next/feed` · padding · landing FAQ — intake [M168](../../../UX/mockups/home/DOGEstonia-M168-how-it-works-content-cta-spec-v1.0.md) |
| B11 | Board | Deprecate `#/board` → redirect `/next/feed` · inventory · arch review |
| Rp12 | Reaction persist | Own marks survive reload (post + comment) — hydrate from tree · [analysis](../../../analysis/analysis-reaction-persist-reload-gap-2026-10-22.md) → **CR-25** |
| OOS | — | Invent OP PASS · full ES dictionary · invent CDN · empty pipelines |

## Sufficiency (gate before L1)

| Mark | Class | Artifact |
|------|-------|----------|
| 1 | CSS/code | NS-08 |
| 2 | CSS/code | NS-09 |
| 3 | CSS/code | NF-21 |
| 4 | CSS/code | NF-22 |
| 5–6 | CSS/code | CT-33 |
| **7** | **UX** | Intake [PASS](../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md) M163/M164 → CR-24 |
| **8** | **UX** | Intake PASS M165 → NS-10 (vector lock) |
| **9** | **UX** | Intake PASS M166 → PH-11 |
| **10** | **UX** | Intake PASS M168 → PH-13 |
| 11 | analysis+code | [arch review](../../../analysis/analysis-next-feed-board-deprecate-architecture-2026-10-22.md) → NF-23 |
| 12 | code | Reaction reload hydrate → CR-25 |

**Order:** Interview → UX-PROMPTS 7–10 → L1/L1.5/L2 · CSS stories parallel.

## Story allocation

| Mark | Story | Package |
|------|-------|---------|
| 1 | NS-08 | next-shell |
| 2 | NS-09 | next-shell |
| 3 | NF-21 | next-feed |
| 4 | NF-22 | next-feed |
| 5–6 | CT-33 | component-thread |
| 7 | CR-24 | component-reactions |
| 8 | NS-10 | next-shell |
| 9 | PH-11 | public-home |
| 10 | PH-13 | public-home |
| 11 | NF-23 + analysis | next-feed |
| 12 | CR-25 | component-reactions |

## UX intake status (2026-10-22)

[analysis-wave3-ux-intake-m163-m168…](../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md) — visual stories unblocked for structure Apply (M163 PNG soft Absent).

## Explicit non-goals

Invent OP PASS · invent full ES copy · invent CDN · empty epic pipelines · invent M163 PNG
