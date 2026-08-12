# Acceptance verification — SPA-PH-09-T03

- **Task:** Wire public pages to PUBLIC_SHELL_SHOW_SIDEBAR
- **Result:** PASS
- **Date:** 2026-08-08T09:04:55Z
- **Package:** `pkg-000057`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Constant SSOT false | PASS | [`src/config/publicShell.js`](../../../../../../../src/config/publicShell.js) |
| Board/HIW/Issue wired | PASS | pages `showSidebar={PUBLIC_SHELL_SHOW_SIDEBAR}` |
| Header nav kept | PASS | BoardPage.shell.test public-header-nav |

## Commands

```bash
rg -n "PUBLIC_SHELL_SHOW_SIDEBAR" spa-app/src
```
