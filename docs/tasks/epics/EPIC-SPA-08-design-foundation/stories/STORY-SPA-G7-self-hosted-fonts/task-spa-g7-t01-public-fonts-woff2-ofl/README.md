# SPA-G7-T01 — Public fonts woff2 + OFL

**Status:** ✅ Done  
**Story:** [`../STORY-SPA-G7-self-hosted-fonts.md`](../STORY-SPA-G7-self-hosted-fonts.md)  
**Decision Ref:** backlog §FR-G7.1, FR-G7.5, D-G7-1, D-G7-5, T01  
**Depends on:** — (G4 Done)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T21:48:40Z

## Purpose
Положить self-hosted **woff2**: `public/fonts/inter/` (400/500/600) + `public/fonts/jetbrains-mono/` (400) + OFL-лицензии.

## Risk
Без файлов `@font-face` бесполезен; без OFL — лицензионный риск.

## Code Facts (re-verify at execute)
- `spa-app/public/` = `assets/`, `favicon.svg`, `icons/` — **no** `fonts/`.
- D-G7-1: woff2 only; D-G7-5: static per-weight (not variable).

## AC / DoD
- [ ] (P0) FR-G7.1: Inter 400/500/600 + JetBrains Mono 400 woff2 under `public/fonts/`.
- [ ] (P0) FR-G7.5: OFL license texts present under `public/fonts/`.

## Where to change
- NEW `spa-app/public/fonts/inter/*.woff2`
- NEW `spa-app/public/fonts/jetbrains-mono/*.woff2`
- NEW OFL license files under `public/fonts/`

## Out of scope
- `@font-face` / main.jsx (T02). Variable fonts. CDN.

## Verification
```bash
ls spa-app/public/fonts/inter spa-app/public/fonts/jetbrains-mono
find spa-app/public/fonts -name '*.woff2' -o -iname '*OFL*' -o -iname '*LICENSE*'
```

Gate: [`acceptance-verification-spa-g7-t01.md`](./acceptance-verification-spa-g7-t01.md)
