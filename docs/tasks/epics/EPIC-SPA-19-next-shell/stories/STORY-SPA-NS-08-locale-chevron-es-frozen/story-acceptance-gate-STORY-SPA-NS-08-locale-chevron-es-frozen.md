# Story acceptance gate — STORY-SPA-NS-08-locale-chevron-es-frozen

- **Story:** Locale chevron + ES frozen
- **Package:** `pkg-000201-20261022-epic-spa-19-ns-08-locale-chevron-es-frozen.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-22T12:31:42Z
- **Note:** P3 Execute · T01–T03 **Done** · structure Pass · Path A shots Present · CAPTURE-META `fails: []` · OP eye **Absent** → Partial visual=**BLOCK** · no invent OP PASS / ES dictionary · Await P4/P5

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Chevron icon Present | Structure Pass | ShellChromeIcon · chevron-down · shot 02 · probe chevronMask |
| ES frozen + tooltip | Structure Pass | MenuAction disabled · title tip · shot 03/05 · probe esFrozen |
| Active locales unchanged | Structure Pass | SUPPORTED_LOCALES et/ru/en · normalizeLocale('es') null |
| Vitest / Path A | Structure Pass | LocaleSelector+i18n **74/74** · ns08 **3/3** · CAPTURE-META |
| OP eye (Absent = BLOCK · no invent PASS) | **BLOCK** | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/LocaleSelector src/i18n
```

## Visual checklists

[`visual-checklists-locale-chevron-es-frozen.md`](./visual-checklists-locale-chevron-es-frozen.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
