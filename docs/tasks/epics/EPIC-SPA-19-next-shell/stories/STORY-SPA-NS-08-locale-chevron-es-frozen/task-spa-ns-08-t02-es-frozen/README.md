# SPA-NS-08-T02 — ES frozen + tooltip

**Status:** Done  
**Done:** `2026-10-22T12:31:42Z`  
**Note:** es frozen MenuAction · tooltip nextShell.locale.esFrozenTooltip · SUPPORTED_LOCALES et/ru/en held  
**Story:** [`../STORY-SPA-NS-08-locale-chevron-es-frozen.md`](../STORY-SPA-NS-08-locale-chevron-es-frozen.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-08-locale-chevron-es-frozen.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-08-locale-chevron-es-frozen.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T12:25:23Z`  
**Package:** `pkg-000201`  
**Path A:** code lock · Interview L1

## Purpose

FR-NS-08.2 · 08.3: Menu lists et/ru/en as today + **es** row **frozen** (not selectable). Hover/focus tooltip: request language / we can add (copy tip lock in i18n). **No full ES dictionary.**

## Code Facts (verify)

- AS-IS: `SUPPORTED_LOCALES` / `LOCALE_SELECTOR_OPTIONS` et/ru/en only
- Target: es present as frozen option · tooltip i18n key · et/ru/en selectable held

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · **no invent full ES translations** · Rail/logo OOS

## AC / DoD

- [x] ES frozen + tooltip
- [x] Active locales unchanged
- [x] Visual Done not claimed without OP eye

## Where changed

`i18n/core.js` · `LocaleSelector.jsx` · soft dictionary tip keys

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "es|frozen|tooltip|LOCALE_SELECTOR|SUPPORTED_LOCALES" spa-app/src/i18n spa-app/src/components/LocaleSelector
```
