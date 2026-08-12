# BULLRUN — SPA-L10N-01-T01

- **Wave:** pkg-000003
- **Process:** P3 Execute
- **Date:** 2026-06-16

| Phase | Status | Evidence |
|-------|--------|----------|
| Implement | Done | `src/i18n/core.js` — `SUPPORTED_LOCALES`, `LOCALE_CODES`, `DEFAULT_LOCALE`, `LOCALE_SELECTOR_OPTIONS` |
| Verify | Done | `node -e "import('./src/i18n/core.js')"` — 3 entries with endonym/flag/dir |
