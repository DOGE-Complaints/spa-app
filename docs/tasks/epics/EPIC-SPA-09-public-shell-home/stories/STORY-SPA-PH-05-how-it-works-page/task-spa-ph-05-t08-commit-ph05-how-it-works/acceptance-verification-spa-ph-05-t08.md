# Acceptance — SPA-PH-05-T08 (post-audit F1 commit)

**Status:** Done — P6 PASS 2026-08-05T09:13:59Z  
**Task:** [`README.md`](./README.md)  
**run_mode:** `spa_ph_05_audit_2026_08_04`

| Check | Result | Evidence |
|-------|--------|----------|
| HEAD has tutorial HowItWorks (no stub) | PASS | `f245451` · `data-testid=how-it-works-page` · no `how-it-works-stub` |
| HEAD has howItWorks L10N / FLAT_KEYS | PASS | `howItWorksDictionary.js` + merge in `publicHomeDictionary.js` |
| Vitest HowItWorks + publicHome on committed tree | PASS | 8/8 before commit |
| puppeteer / package.json scripts present in HEAD | PASS | `test:ui:how-it-works*` + ph05 scripts |
| M133 page PNG renamed | PASS | `mockup-133-public-how-it-works-page-state-sheet-estonia.png` |

**Gate Date:** 2026-08-05T09:13:59Z  
**Commit:** `f245451`
