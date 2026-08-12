# SPA-G4-T08 — Fix AppErrorState undefined `--color-accent`

**Status:** Done  
**Story:** [`../STORY-SPA-G4-design-tokens-foundation.md`](../STORY-SPA-G4-design-tokens-foundation.md)  
**Decision Ref:** [`../../../../../../analysis/audit-STORY-SPA-G4-execution-2026-07-28.md`](../../../../../../analysis/audit-STORY-SPA-G4-execution-2026-07-28.md) §3 R1  
**Depends on:** T04 Done (introduced); T07 Done (story gate)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T18:43:31Z  
**Completed:** 2026-07-28T19:03:14Z  
**Post-audit wave:** `run_mode=spa_g4_audit_2026_07_28`

## Purpose
Закрыть audit **R1 (Med):** primary-кнопка M22 Retry на `AppErrorState` использует undefined `var(--color-accent)` → `background` transparent («ghost»). Заменить на `var(--color-accent-primary)`.

## Risk
Оставить undefined token → M22 error-panel Retry без акцентного фона (визуальная регрессия CAB-07 surface после G4 T04).

## Code Facts (re-verify at execute)
- [AppErrorState.css:71](../../../../../../../src/components/AppErrorState/AppErrorState.css): `.app-error-state__button--primary { background: var(--color-accent); }`
- [tokens.css](../../../../../../../src/styles/tokens.css) defines `--color-accent-primary` / `--color-accent-active` only — **no** bare `--color-accent`
- Audit: sole undefined `var(--color-*)` in `src` (scan)
- Yellow primary for error-CTA = intentional post-G4 semantics (audit note)

## AC / DoD
- [x] (P0) `AppErrorState.css` primary button uses `var(--color-accent-primary)` (not `--color-accent`).
- [x] (P0) `rg 'var\\(--color-accent\\)' spa-app/src` → empty (no bare `--color-accent`).
- [x] (P1) Spot-check M22 Retry bg visible (accent yellow) — e.g. `doge.mock-me-error=profile_load_failed` / existing CAB-07 runner; no new full-cycle required.
- [x] (P0) [`acceptance-verification-spa-g4-t08.md`](./acceptance-verification-spa-g4-t08.md) PASS with live `Date:` post verify.

## Where to change
- `spa-app/src/components/AppErrorState/AppErrorState.css` (L71)

## Out of scope
- Alias `--color-accent` in tokens.css (chosen path = rename call site only).
- StatusBadge specialty hex (G-a ignored).
- screenshots README / new M22 full-cycle runner (G-b ignored).
- New pkg / change `spa-active-package.current.yaml`.

## Verification
```bash
rg 'var\\(--color-accent\\)' spa-app/src --glob '*.css'
rg 'accent-primary' spa-app/src/components/AppErrorState/AppErrorState.css
# optional: npm run test:ui:cabinet-page-states-cab07  (M22 surface)
```

Gate: [`acceptance-verification-spa-g4-t08.md`](./acceptance-verification-spa-g4-t08.md)
