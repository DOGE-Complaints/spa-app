# SPA-G7-T02 — fonts.css + main.jsx import before tokens

**Status:** ✅ Done  
**Story:** [`../STORY-SPA-G7-self-hosted-fonts.md`](../STORY-SPA-G7-self-hosted-fonts.md)  
**Decision Ref:** backlog §FR-G7.2, D-G7-4, D-G7-6, T02  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T21:48:40Z

## Purpose
Создать `src/styles/fonts.css` с `@font-face` Inter (400/500/600) + JetBrains Mono (400), `font-display: swap`; импорт в `main.jsx` **перед** `tokens.css`.

## Risk
Неверный порядок import → токены/faces не согласованы; `block` вместо `swap` → FOIT.

## Code Facts (re-verify at execute)
- [main.jsx](../../../../../../../src/main.jsx) currently: `tokens.css` then `index.css`.
- No `fonts.css` yet; tokens comment: G7 owns `@font-face`.

## AC / DoD
- [ ] (P0) FR-G7.2: `fonts.css` exists with `@font-face` + `font-display: swap` for required weights.
- [ ] (P0) `main.jsx` imports `./styles/fonts.css` **before** `./styles/tokens.css`.

## Where to change
- NEW `spa-app/src/styles/fonts.css`
- `spa-app/src/main.jsx`

## Out of scope
- Font binary files (T01). Mono CSS migration (T03). Visual CDN check (T05).

## Verification
```bash
test -f spa-app/src/styles/fonts.css
rg '@font-face|font-display' spa-app/src/styles/fonts.css
rg "fonts\\.css|tokens\\.css" spa-app/src/main.jsx
```

Gate: [`acceptance-verification-spa-g7-t02.md`](./acceptance-verification-spa-g7-t02.md)
