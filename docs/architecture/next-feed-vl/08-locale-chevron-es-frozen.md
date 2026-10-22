# Arch note — NS-08 locale chevron + ES frozen

> P8 local close `2026-10-22T13:04:05Z` · `pkg-000201` · structure Present · visual BLOCK (OP eye)

## Pattern

Locale trigger trailing control uses `ShellChromeIcon` mask (`chevron-down.svg`) — not literal `v`/`^`. Menu lists et/ru/en active + **es** frozen (`MenuAction` disabled · `title` tip · `data-ns08-frozen`). Tip copy lock: `nextShell.locale.esFrozenTooltip` (et/ru/en). `SUPPORTED_LOCALES` unchanged; frozen options separate from supported set.

## Surfaces

- `LocaleSelector.jsx` / `.css` — chevron · open rotate · frozen row
- `i18n/core.js` — `FROZEN_LOCALE_SELECTOR_OPTIONS` · `LOCALE_SELECTOR_MENU_OPTIONS`
- `i18n/nextShellDictionary.js` — tip strings

## Markers

`data-testid=locale-selector-chevron` · `data-ns08-frozen` · Path A CAPTURE-META probe chevronMask/esFrozen/esDisabled

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no full ES product dictionary · flag omit for es.
