# UI mockup spec — SPA-PH-06-T02 (anchor)

**Story:** STORY-SPA-PH-06-submit-story-gpt-cta  
**Path A:** operator `@mockup` M129 + M133 — human gate skip  
**Viewport:** 1536×1024  
**Routes:** `/#/board`, `/#/how-it-works`  
**ui_scope:** `visual` · **ui_anchor:** `true`

## Extends mockup

- [mockup-129-public-header-chrome-state-sheet-spec.md](../../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md)
- [mockup-129-public-header-chrome-state-sheet-spec.png](../../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.png)
- [mockup-129-public-header-chrome-state-sheet-spec-estonia.png](../../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec-estonia.png)
- [mockup-133-public-how-it-works-page-state-sheet-spec.md](../../../../../../UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md)
- [mockup-133-public-how-it-works-localized-copy-appendix.md](../../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md)
- [mockup-133-public-how-it-works-page-state-sheet-estonia.png](../../../../../../UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-estonia.png)

## Delta (PH-06 vs PH-01/PH-05)

| Surface | Target |
|---------|--------|
| Nav Submit | `getStoryGptHref()` / helper; `target=_blank` + `rel=noopener noreferrer` when URL set; `aria-label` = `howItWorks.cta.submitAccessibleLabel`; optional `ic-external-link` |
| HowItWorks CTA | Same helper (keep PH-05 L10N keys + icon) |
| Board `.board-cta` | Helper + `publicHome.nav.submitStory` (drop hardcoded GPT id + `createIssue`) |

## Selectors

| Element | Selector |
|---------|----------|
| Nav Submit | `[data-testid="public-nav-submit"]` |
| HowItWorks Submit | `[data-testid="how-it-works-cta-submit"]` |
| Board Submit | `[data-testid="board-submit-cta"]` (added T04) |

## States captured

| Letter | State | Runtime |
|--------|-------|---------|
| A | Board + nav Submit | `/#/board` |
| B | How it works Submit CTA | `/#/how-it-works` |

## Baseline

See [ui-baseline/README.md](./ui-baseline/README.md).

## Operator gate

**Path A** — accepted via `@mockup` refs in P3 prompt; no AskQuestion human gate required.
