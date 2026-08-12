# Acceptance — SPA-PH-05-T09 (post-audit F2 PUBLIC_PATHS)

**Status:** Done — P6 PASS 2026-08-05T09:14:50Z  
**Task:** [`README.md`](./README.md)  
**run_mode:** `spa_ph_05_audit_2026_08_04`

| Check | Result | Evidence |
|-------|--------|----------|
| `isPublicPath('/how-it-works')` true | PASS | `sessionRoutePolicy.js` PUBLIC_PATHS includes `/how-it-works` · `ea22145` |
| Policy test updated/passing | PASS | `sessionRoutePolicy.test.js` 4/4 |
| Screenshot: single chrome (no dual sidebar) | PASS | evidenced in T10 full-cycle after this commit |

**Gate Date:** 2026-08-05T09:14:50Z  
**Commit:** `ea22145`
