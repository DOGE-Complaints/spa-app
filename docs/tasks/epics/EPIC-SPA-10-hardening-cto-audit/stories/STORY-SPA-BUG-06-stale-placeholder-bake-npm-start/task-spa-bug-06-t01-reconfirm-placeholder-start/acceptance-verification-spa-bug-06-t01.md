# Story acceptance — SPA-BUG-06-T01 reconfirm placeholder start

- **Task:** T01
- **Result:** PASS
- **Date:** 2026-08-18T10:18:16Z
- **Package:** `pkg-000071-20260818-epic-spa-10-bug-06-stale-placeholder-bake.yaml`

## AC

| AC | Status | Evidence |
|----|--------|----------|
| Evidence / reconfirm note (или явная ссылка на investigation 2026-08-18) | PASS | [reconfirm-spa-bug-06-placeholder-start-2026-08-18.md](../../../../../../../run-reports/reconfirm-spa-bug-06-placeholder-start-2026-08-18.md) · live `index-3Fbc_xg4.js` placeholder needles · investigation H6 |
| No secrets in notes | PASS | no password / anon JWT |

## Commands

```bash
python3 -c "from pathlib import Path; t=Path('spa-app/dist/assets/index-3Fbc_xg4.js').read_text(); print('placeholder', 'gateway.example.invalid' in t)"
```
