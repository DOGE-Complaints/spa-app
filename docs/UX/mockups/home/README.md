# Public Home mockups (SSOT)

> **Package intake:** [`docs/tasks/backlog-stories/public-home/`](../../tasks/backlog-stories/public-home/README.md)  
> **Product lock:** [PRODUCT-BRIEF.md](../../tasks/backlog-stories/public-home/PRODUCT-BRIEF.md)  
> **UX prompts:** [UX-PROMPTS.md](../../tasks/backlog-stories/public-home/UX-PROMPTS.md)  
> **ADMIN-PH-02:** specs landed here as M129–M133 (not under `mockups/public-home/`)

## Canon routes

| Label / control | Target |
|-----------------|--------|
| Dashboard (nav) | `/board` — public home surface (code + PRODUCT-BRIEF) |
| How it works | `/how-it-works` — standalone tutorial page |
| Submit a story | external Custom GPT via `VITE_STORY_GPT_URL` |
| Profile (account icon) | `/profile` when authenticated; login when guest |

**Note:** M129 lists example chrome routes including `/dashboard`. That does **not** change the home surface — public home remains `/board` (M132).

## Mockup index

| Mockup | Artboard | Future story | Spec |
|--------|----------|--------------|------|
| M129 | PH-H Header chrome | PH-01 | [mockup-129-public-header-chrome-state-sheet-spec.md](mockup-129-public-header-chrome-state-sheet-spec.md) |
| M130 | PH-A Account control | PH-02 | [mockup-130-public-header-account-control-state-sheet-spec.md](mockup-130-public-header-account-control-state-sheet-spec.md) |
| M131 | PH-F Footer | PH-03 | [mockup-131-public-footer-chrome-state-sheet-spec.md](mockup-131-public-footer-chrome-state-sheet-spec.md) |
| M132 | PH-B Board home feed | PH-04 | [mockup-132-public-board-home-feed-state-sheet-spec.md](mockup-132-public-board-home-feed-state-sheet-spec.md) |
| M133 | PH-T How it works | PH-05 | [mockup-133-public-how-it-works-page-state-sheet-spec.md](mockup-133-public-how-it-works-page-state-sheet-spec.md) |
| M133 appendix | PH-T L10N copy (en/et/ru) | PH-05 (+ PH-06 CTA labels) | [mockup-133-public-how-it-works-localized-copy-appendix.md](mockup-133-public-how-it-works-localized-copy-appendix.md) |
| (affordance in M129 / M133) | Submit GPT CTA | PH-06 | see M129 nav + M133 CTA row |

## PNG artboards

| Variant | Files | Notes |
|---------|-------|-------|
| Base (pre-ETM) | `mockup-129…132-*-spec.png` | Functional reference |
| Estonia (cultural layer) | `mockup-129…132-*-estonia.png`, `mockup-133-*-appendix-estonia.png` | Landed **2026-08-03**; ETM floral/stripe |
| M133 page-state PNG | `mockup-133-public-how-it-works-page-state-sheet-estonia.png` | Canonical page SSOT visual (P6 T08 2026-08-05); prior appendix EE PNG optional companion |

**Parity (functional vs estonia):** [ESTONIA-ARTBOARD-PARITY-2026-08-03.md](ESTONIA-ARTBOARD-PARITY-2026-08-03.md) — verdicts + regen prompts for M129 / M132 / M133 gaps. M130/M131 functional MATCH.

Spec markdown remains Active SSOT for copy/routes; estonia PNG adds cultural layer (must not replace controls).

Legacy placeholder names in older specs (e.g. `DOGEstonia-Mockup-Public-*-state-sheet.png`) may differ from on-disk filenames above.

## Legacy supersede

| Legacy | Conflict | Superseded by |
|--------|----------|---------------|
| [M01 Dashboard Main](../initiation/mockup-01-dashboard-main-spec.md) | multi-column board layout for public home | **M132** single feed |
| [M19 Header Brand Strip](../initiation/mockup-19-header-brand-strip-spec.md) | `SYNCED` as primary header chrome | **M129** (no SYNCED in header) |

Do not delete legacy files; they remain historical / filter-toolbar reference where not conflicting.
