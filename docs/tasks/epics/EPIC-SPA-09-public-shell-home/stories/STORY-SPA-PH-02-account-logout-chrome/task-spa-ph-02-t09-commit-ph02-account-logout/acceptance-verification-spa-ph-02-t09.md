# Acceptance verification — SPA-PH-02-T09

- **Task:** Commit PH-02 account logout to HEAD (audit F1)
- **run_mode:** `spa_ph_02_audit_2026_08_04`
- **Result:** PASS
- **Date:** 2026-08-04T10:21:47Z
- **Commit:** `81eec52`

## Checklist

| AC | Status | Evidence |
|----|--------|----------|
| AccountControl + Header slot + dict in HEAD | PASS | `git ls-tree HEAD` AccountControl package; commit `81eec52` |
| HEAD shows AccountControlSlot + signOut | PASS | `Header.jsx` AccountControlSlot; `AccountControl.jsx` `supabase.auth.signOut` |
| Vitest AccountControl + publicHome PASS | PASS | 7/7 after commit |
| Commit hash recorded | PASS | `81eec52` |

```bash
cd spa-app && git ls-tree -r HEAD --name-only | rg AccountControl | head
cd spa-app && git show HEAD:src/components/AppShell/Header.jsx | rg AccountControlSlot
cd spa-app && npm test -- --run AccountControl publicHome
```
