# Story acceptance — STORY-SPA-G7 Self-hosted fonts

- **Story:** STORY-SPA-G7 — Self-hosted fonts
- **Package:** `pkg-000039-20260728-epic-spa-08-g7-self-hosted-fonts.yaml`
- **Result:** PASS
- **Date:** 2026-07-28T21:57:46Z
- **Scaffolded:** 2026-07-28T21:48:40Z

## Story AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| woff2 + OFL in public/fonts | PASS | T01 |
| @font-face + no CDN; Inter+JBM render | PASS | T02 + T05 (`font-smoke-report.json`) |
| mono on all 5 sites + IssuePage wiring | PASS | T03; live txid DOM SKIP/ENV (T05) |
| 700→600 LoginPage | PASS | T04 |
| Vitest + visual smoke | PASS | T05 — 419 pass / 2 skip; board-shell exit 0 |
| Docs + INDEX Done | PASS | design-system §2.2; reusable-ui L0; gap-report §G7; INDEX |

## §UI

- Anchor T05: pre/post PNGs + font-smoke-report; no artboard (design-system §2.2 SSOT)
- Story-root screenshots: `../screenshots/`

## Task roll-up

| Task | Result |
|------|--------|
| T01 | PASS |
| T02 | PASS |
| T03 | PASS |
| T04 | PASS |
| T05 | PASS |
| T06 | PASS |

Gate Date: 2026-07-28T21:57:46Z.
