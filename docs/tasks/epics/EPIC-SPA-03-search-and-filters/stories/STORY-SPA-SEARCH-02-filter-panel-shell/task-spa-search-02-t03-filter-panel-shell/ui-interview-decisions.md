# UI interview decisions — SEARCH-02 retroactive closure

**Date:** 2026-06-17  
**Story:** STORY-SPA-SEARCH-02-filter-panel-shell  
**Context:** UI/Puppeteer gap closure (pkg-000009 immutable; story reopened)

## Operator decisions (human gate)

| Topic | Decision | Plain language |
|-------|----------|----------------|
| Delivery format | Reopen story | Дополняем T03/T16, не создаём новый pkg |
| Visual SSOT | Update mockup-10 + mockup-13 | Без нового mockup-NN |
| UI-0 baseline | **A — retroactive** | Снимок текущей реализации на дату reopen; пометка `retroactive_closure` в `ui-baseline/README.md` |
| UI-3 pass criteria | **Structural PASS** | Селекторы, batch Apply, канон enum, desktop + narrow screenshots; визуальное сравнение с PNG — по усмотрению оператора |
| Chrome / Puppeteer | Local install + docs | `npx puppeteer browsers install chrome`; без postinstall в package.json |
| Bullrun | SEARCH-02 primary until re-close | SEARCH-03 blocked/next до повторного Done |

**Sign-off:** принято — реализация плана SEARCH-02 UI closure (оператор, 2026-06-17).
