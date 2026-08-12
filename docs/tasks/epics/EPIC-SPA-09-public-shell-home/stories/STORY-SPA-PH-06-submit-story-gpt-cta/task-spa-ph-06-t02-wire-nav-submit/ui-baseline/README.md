# UI baseline — SPA-PH-06-T02 (anchor)

**Captured UTC:** 2026-08-05T10:25:00Z (approx; pre-implement run)  
**Viewport:** 1536×1024  
**Route:** `/#/board`, `/#/how-it-works`  
**Env:** `VITE_IDENTITY_MOCK_MODE=true` (script-spawned Vite)

## Selectors

| Element | Selector |
|---------|----------|
| Header | `[data-testid="public-header"]` |
| Nav Submit | `[data-testid="public-nav-submit"]` |
| HowItWorks Submit CTA | `[data-testid="how-it-works-cta-submit"]` |
| Board CTA | `.board-cta` |

## Pre-implement

| State | File |
|-------|------|
| A board nav Submit | [pre-implement/a-board-nav-submit-1536x1024.png](./pre-implement/a-board-nav-submit-1536x1024.png) |
| B how-it-works Submit CTA | [pre-implement/b-how-it-works-submit-cta-1536x1024.png](./pre-implement/b-how-it-works-submit-cta-1536x1024.png) |

## Post-implement (UI-3)

| State | File |
|-------|------|
| A board nav Submit | [post-implement/a-board-nav-submit-1536x1024.png](./post-implement/a-board-nav-submit-1536x1024.png) |
| B how-it-works Submit CTA | [post-implement/b-how-it-works-submit-cta-1536x1024.png](./post-implement/b-how-it-works-submit-cta-1536x1024.png) |

## Notes

- Canonical story evidence: [`../../screenshots/full-cycle/`](../../screenshots/full-cycle/) (not only this baseline).
- Archive copies: [`../../screenshots/archive/`](../../screenshots/archive/).
- Post: helper + a11y + optional `ic-external-link` on nav; Board hardcode removed (T04).
