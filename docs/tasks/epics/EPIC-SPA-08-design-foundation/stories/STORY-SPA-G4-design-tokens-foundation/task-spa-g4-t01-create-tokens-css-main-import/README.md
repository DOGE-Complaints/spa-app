# SPA-G4-T01 — Create tokens.css + first import in main.jsx

**Status:** Done  
**Story:** [`../STORY-SPA-G4-design-tokens-foundation.md`](../STORY-SPA-G4-design-tokens-foundation.md)  
**Decision Ref:** [`../../../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md`](../../../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md) §FR-G4.1, FR-G4.2, T01  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T16:01:20Z  
**Completed:** 2026-07-28T16:10:40Z

## Purpose
Создать `src/styles/tokens.css` с единственным `:root` (все группы §2.1–2.3, placeholder hex) и подключить **первым** импортом в `main.jsx` до `index.css`.

## Risk
Без глобальных токенов миграция hex невозможна; неправильный порядок import → переменные не видны каскаду.

## Code Facts (re-verify at execute)
- `src/styles/` **absent** at scaffold.
- [`main.jsx`](../../../../../../../src/main.jsx) imports only `./index.css`.
- No global `:root` tokens file; local component vars (e.g. StoryHandoff) are not L0.

## AC / DoD
- [ ] (P0) FR-G4.1: `src/styles/tokens.css` exists with `:root` containing color + typography + spacing token **names** from design-system §2.
- [ ] (P0) FR-G4.2: `main.jsx` imports `./styles/tokens.css` **before** `./index.css`.
- [ ] (P1) Placeholder values allowed; final hex in T02.

## Where to change
- NEW `spa-app/src/styles/tokens.css`
- `spa-app/src/main.jsx`

## Out of scope
- Hex reconciliation (T02). Component migrations (T03–T04). `@font-face` (G7).

## Verification
```bash
test -f spa-app/src/styles/tokens.css
rg "tokens\\.css" spa-app/src/main.jsx
```

Gate: [`acceptance-verification-spa-g4-t01.md`](./acceptance-verification-spa-g4-t01.md)
