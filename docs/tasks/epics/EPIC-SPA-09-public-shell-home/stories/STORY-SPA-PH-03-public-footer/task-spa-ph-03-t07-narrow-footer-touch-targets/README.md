# SPA-PH-03-T07 — Narrow footer touch targets ≥44px (post-audit F2)

**Status:** Done — P6 PASS 2026-08-04T11:11:12Z · commit `891238c`  
**Story:** [`../STORY-SPA-PH-03-public-footer.md`](../STORY-SPA-PH-03-public-footer.md)  
**Decision Ref:** [audit-STORY-SPA-PH-03-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-03-execution-2026-08-04.md) §F2  
**Depends on:** SPA-PH-03-T01…T05 Done · T06 may run first (order in run_mode)  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_03_audit_2026_08_04`  
**Scaffolded:** 2026-08-04T10:58:42Z

**extends ui-mockup:** [`../task-spa-ph-03-t01-public-footer-layout/ui-mockup-spec.md`](../task-spa-ph-03-t01-public-footer-layout/ui-mockup-spec.md) (Path A M131; UI-0 skip)

## Purpose
Закрыть audit **F2**: narrow State B link hit areas ≈ text (no ≥44px); M131 Requirements call out min touch 44px. Prefer vertical stack of About / Privacy / Contact on narrow (M131 alternate) while keeping quiet utility (no social).

## Risk
Mobile usability gap vs artboard; partial State B match remains after P3.

## Code Facts (re-verify at execute)
- [`PublicFooter.css`](../../../../../../../src/components/PublicFooter/PublicFooter.css) — `@media (max-width: 640px)` column stack for brand block; links remain middot row with default text padding.
- E1 PNG: `screenshots/full-cycle/04-edge-mock-board-public-footer-narrow-390x844.png` — wrap present; touch targets small.
- Estonia companion list+chevron = **F6 WAIVED** — do not implement floral/chevron chrome.

## AC / DoD
- [x] (P0) Narrow/mobile utility links have min touch target ≥44px (padding and/or block layout).
- [x] (P0) Narrow layout prefers vertical stacked links (M131 alternate) **or** documented Path A middot wrap with 44px targets — quiet, no social.
- [x] (P0) Optional: re-capture E1 / `npm run test:ui:public-footer-ph03` after CSS; vitest still PASS.
- [x] (P0) Gate filled; Date from `--print-utc-now` after verify.

Gate Date: 2026-08-04T11:11:12Z · Commit: `891238c`.

## Where to change
- `spa-app/src/components/PublicFooter/PublicFooter.css` (+ markup only if needed for stack)
- Optional screenshot refresh under story `screenshots/` / T01 ui-baseline post-implement
- Gate: `acceptance-verification-spa-ph-03-t07.md`

## Out of scope
- F1 commit (T06). F3 api-req (T08). F4 brand `/` vs `/board`. F6 estonia floral/list+chevron motifs. Desktop State A redesign.

## Verification
```bash
rg -n '44|padding|flex-direction|640' spa-app/src/components/PublicFooter/PublicFooter.css
cd spa-app && npm test -- --run PublicFooter
cd spa-app && npm run test:ui:public-footer-ph03
```

Gate: [`acceptance-verification-spa-ph-03-t07.md`](./acceptance-verification-spa-ph-03-t07.md)
