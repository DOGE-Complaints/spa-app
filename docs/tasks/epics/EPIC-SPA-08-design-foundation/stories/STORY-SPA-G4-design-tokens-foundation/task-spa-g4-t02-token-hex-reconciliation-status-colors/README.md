# SPA-G4-T02 — Token→hex reconciliation + status colors

**Status:** Done  
**Story:** [`../STORY-SPA-G4-design-tokens-foundation.md`](../STORY-SPA-G4-design-tokens-foundation.md)  
**Decision Ref:** backlog §D-G4-1, D-G4-5, FR-G4.1 values, FR-G4.7, T02  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T16:01:20Z  
**Completed:** 2026-07-28T16:10:40Z

## Purpose
Зафиксировать таблицу «токен → выбранный hex» из фактических литералов (D-G4-1); схлопнуть drift; добавить `--color-danger` / `--color-success` (D-G4-5); проставить финальные значения в `tokens.css`.

## Risk
Без канона hex миграция разъедет палитру; статус-цвета останутся вне SSOT.

## Code Facts (re-verify at execute)
- ~192 hex match-lines across `src/**/*.css` at scaffold time.
- Drift examples (backlog §C): yellow `#f5c518`/`#f5c542`/`#ffd600`/…; bg `#141417`/…
- Recommendation: `accent-primary=#f5c518`, `bg-primary=#141417`, `text-primary=#f2f2f2` (review in execute).

## AC / DoD
- [ ] (P0) Mapping table documented (in task notes or tokens.css comments / small md next to task).
- [ ] (P0) Drift collapsed: ≤2 hex values per color token family vs 4–5 literals.
- [ ] (P0) FR-G4.7: `--color-danger` and `--color-success` defined.
- [ ] (P0) Final values written to `tokens.css`.

## Where to change
- `spa-app/src/styles/tokens.css`
- Optional: analysis table under this task folder (not `docs/tasks` bullrun)

## Out of scope
- Replacing component hex (T03–T04). Spacing migration. Font files.

## Verification
```bash
rg --color-danger|--color-success|--color-accent-primary spa-app/src/styles/tokens.css
```

Gate: [`acceptance-verification-spa-g4-t02.md`](./acceptance-verification-spa-g4-t02.md)
