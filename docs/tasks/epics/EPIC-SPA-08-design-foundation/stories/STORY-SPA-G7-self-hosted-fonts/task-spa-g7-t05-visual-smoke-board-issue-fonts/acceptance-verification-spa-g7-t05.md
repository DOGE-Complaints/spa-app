# Task acceptance — SPA-G7-T05

- **Story:** STORY-SPA-G7 — Self-hosted fonts
- **Package:** `pkg-000039-20260728-epic-spa-08-g7-self-hosted-fonts.yaml`
- **Result:** PASS
- **Date:** 2026-07-28T21:57:46Z
- **ui_anchor:** true
- **Scaffolded:** 2026-07-28T21:48:40Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Inter board + JBM render | PASS | `document.fonts.check('16px Inter')` true; Inter 400/500/600 loaded; JBM 400 loaded (`font-smoke-report.json`); board post PNG MD5 ≠ pre |
| No CDN font requests | PASS | Network listener: 0 hits to fonts.googleapis / fonts.gstatic / typekit; woff2 from `127.0.0.1:4173/fonts/**` |
| Layout parity | PASS | board-shell structure intact; visual delta = glyph metrics (Inter self-hosted) only |
| npm test green | PASS | Vitest 419 passed / 2 skipped |
| test:ui:board-shell | PASS | exit 0 |
| IssuePage live txid DOM | SKIP/ENV | gateway UUID issues lack `arweave_txid`/`image_txid`; `#/issue/DE-001` placeholder under default feed (same as G4 `test:ui:details`). Wiring: `IssuePage.jsx:185-197` + class CSS → token. Probe span with class confirmed computed `"JetBrains Mono", …` |

## §UI verification

- Baseline: `ui-baseline/pre-implement/01-board.png`, `02-issue-details.png`
- Target: [ui-mockup-spec.md](./ui-mockup-spec.md) (parity + font contract; no artboard)
- Post: `ui-baseline/post-implement/` + `../screenshots/`
- Report: `ui-baseline/post-implement/font-smoke-report.json`
