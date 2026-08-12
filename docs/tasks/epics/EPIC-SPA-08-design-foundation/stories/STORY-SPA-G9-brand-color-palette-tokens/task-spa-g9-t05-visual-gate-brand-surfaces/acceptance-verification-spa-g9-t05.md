# Acceptance — SPA-G9-T05

- **Result:** PASS (with env note + **operator waive** for live surface PNGs)
- **Date:** 2026-08-02T08:59:09Z
- **Waive Date:** 2026-08-02T10:13:40Z (SPA-G9-T09 / `run_mode=spa_g9_audit_2026_08_02`)

## Evidence
- Brand cutover is global via `tokens.css` (canvas `#0B1320`, accent `#F5A623`); no layout CSS churn beyond T03 contrast.
- `npm test`: **422 passed** / 2 skipped (2026-08-02).
- Brand hex swatch proof: `screenshots/post-implement/00-brand-token-swatch.png` (Night + Orange + CTA ink).
- **Env residual:** live SPA Chrome headless / `test:ui:board-shell` fail in agent (crashpad xattr Operation not permitted / launch Code null).

## Operator waive (FR-G9.6 live surfaces) — T09
- **Waived:** live board / login / cabinet / filters PNG captures in story `screenshots/`.
- **Accepted evidence instead:** Color Palette v1.0 + `tokens.css` brand SSOT (global cutover) + `00-brand-token-swatch.png` + vitest green.
- **Rationale:** agent Chrome for Testing crashpad xattr blocks headless SPA shots; no fabricated SPA PNGs.
- **Optional follow-up (out of this waive):** local re-shot when Chrome env works.

## UI
- §UI: brand parity via tokens SSOT + swatch; live surface PNGs **waived**.

## Commands
```bash
cd spa-app && npm test -- --maxWorkers=2
# local (optional): PUPPETEER_EXECUTABLE_PATH=… npm run test:ui:board-shell
```
