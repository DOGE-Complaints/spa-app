# SPA-G7-T04 — LoginPage font-weight 700 → 600

**Status:** ✅ Done  
**Story:** [`../STORY-SPA-G7-self-hosted-fonts.md`](../STORY-SPA-G7-self-hosted-fonts.md)  
**Decision Ref:** backlog §FR-G7.7, D-G7-2, T04  
**Depends on:** — (can parallel T03 after T02)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T21:48:40Z

## Purpose
Свести 2× `font-weight:700` → `600` в LoginPage.css (канон §2.2 — Inter 700 не доставляется).

## Risk
Оставить 700 → missing face / faux-bold.

## Code Facts (re-verify at execute)
- [LoginPage.css](../../../../../../../src/pages/LoginPage.css) lines ~50 and ~195: `font-weight: 700`.

## AC / DoD
- [ ] (P0) FR-G7.7: both LoginPage `font-weight:700` → `600`.
- [ ] (P0) No remaining `font-weight:\s*700` in LoginPage.css.

## Where to change
- `spa-app/src/pages/LoginPage.css`

## Out of scope
- New Inter 700 files. Other components’ weights.

## Verification
```bash
rg 'font-weight:\s*700' spa-app/src/pages/LoginPage.css || echo 'no 700'
rg 'font-weight:\s*600' spa-app/src/pages/LoginPage.css
```

Gate: [`acceptance-verification-spa-g7-t04.md`](./acceptance-verification-spa-g7-t04.md)
