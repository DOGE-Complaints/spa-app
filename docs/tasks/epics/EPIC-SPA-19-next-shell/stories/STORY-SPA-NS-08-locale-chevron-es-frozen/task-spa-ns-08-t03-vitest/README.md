# SPA-NS-08-T03 — Markers / honesty vitest

**Status:** Done  
**Done:** `2026-10-22T12:31:42Z`  
**Note:** LocaleSelector.ns08 3/3 · LocaleSelector+i18n 74/74 · Path A fails:[]  
**Story:** [`../STORY-SPA-NS-08-locale-chevron-es-frozen.md`](../STORY-SPA-NS-08-locale-chevron-es-frozen.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-08-locale-chevron-es-frozen.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-08-locale-chevron-es-frozen.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T12:25:23Z`  
**Package:** `pkg-000201`  
**Path A:** code lock · Interview L1

## Purpose

FR-NS-08.4: Vitest / Path A honesty for chevron icon + ES frozen + tooltip · OP eye — no invent PASS · no full ES dictionary.

## Code Facts (verify)

- Target: tests assert no literal `v`/`^` trailing · es disabled/frozen · tooltip Present · et/ru/en still selectable

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · honesty over coverage theater

## AC / DoD

- [x] Vitest / Path A Present
- [x] Visual Done not claimed without OP eye

## Where changed

`src/components/LocaleSelector/__tests__/` · soft `src/i18n/__tests__/`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/LocaleSelector src/i18n
```
