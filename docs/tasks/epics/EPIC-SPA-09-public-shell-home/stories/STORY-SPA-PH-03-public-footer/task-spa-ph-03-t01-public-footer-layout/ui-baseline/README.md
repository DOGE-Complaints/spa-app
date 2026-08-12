# UI-0 Baseline — SPA-PH-03 PublicFooter (pre-implement)

**UTC:** 2026-08-04T10:41:47Z  
**Route(s):** `/#/board`, `/#/how-it-works`  
**Viewport:** 1536×1024 (A), 390×844 (B)  
**Dev:** `http://127.0.0.1:4173` · MCP puppeteer unavailable → node/puppeteer script

## Pre-implement facts

| Surface | Selector | Content |
|---------|----------|---------|
| Board | `.board-footer` (inside AppShell children) | legacy `t('footer')` one-liner |
| How it works | `.app-shell__footer.board-footer` | legacy `t('appShell.footer')` one-liner |
| PublicFooter | — | **absent** |

## Captures (pre-implement)

| State | File |
|-------|------|
| A desktop board | `pre-implement/a-desktop-board-legacy-footer-1536x1024.png` |
| A board crop | `pre-implement/a-desktop-board-footer-crop.png` |
| A how-it-works | `pre-implement/a-desktop-how-it-works-appshell-footer-1536x1024.png` |
| A HIW crop | `pre-implement/a-desktop-how-it-works-footer-crop.png` |
| B narrow board | `pre-implement/b-narrow-board-legacy-footer-390x844.png` |

## Captures (post-implement · UI-3 · 2026-08-04T10:46:36Z)

| State | File |
|-------|------|
| A desktop board | `post-implement/a-desktop-board-public-footer-1536x1024.png` |
| A crop | `post-implement/a-desktop-public-footer-crop.png` |
| A how-it-works | `post-implement/a-desktop-how-it-works-public-footer-1536x1024.png` |
| B narrow | `post-implement/b-narrow-board-public-footer-390x844.png` |
| B crop | `post-implement/b-narrow-public-footer-crop.png` |

## Selectors (post target)

- `[data-testid="public-footer"]`
- `[data-testid="public-footer-brand"]`
- `[data-testid="public-footer-tagline"]`
- `[data-testid="public-footer-links"]`
