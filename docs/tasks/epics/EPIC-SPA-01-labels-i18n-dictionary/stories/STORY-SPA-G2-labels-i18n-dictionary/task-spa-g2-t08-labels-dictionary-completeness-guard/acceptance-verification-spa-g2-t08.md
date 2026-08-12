# Acceptance verification — SPA-G2-T08

- **Gate:** PASS (2026-06-12)
- **Wave:** `spa_g2_audit_2026_06_12`
- **Decision Ref:** [audit-STORY-SPA-G2-execution-2026-06-12.md](../../../../../../../../analysis/audit-STORY-SPA-G2-execution-2026-06-12.md) §F2

| AC | Result | Evidence |
|----|--------|----------|
| Тест импортирует `AVAILABLE_LABELS` | PASS | `labelDisplay.test.js` — `import { AVAILABLE_LABELS } from '../labelKeys.js'` |
| Каждый ключ × et/ru/en резолвит словарь | PASS | `labelDisplay.test.js` — `resolves every AVAILABLE_LABELS key in et/ru/en`; `t('labels.'+key) !== 'labels.'+key`; `formatLabelKey` === `t(dictKey)` |
| `npm run test:run` green | PASS | 17 files / 76 tests passed |
| Артефакты task | PASS | этот файл + `BULLRUN-PHASE-LOG.md` |

```bash
cd spa-app && npm run test:run
grep -r AVAILABLE_LABELS src/**/__tests__
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# 76 passed; AVAILABLE_LABELS in labelDisplay.test.js; ok 8 paths (pkg-000002 unchanged)
```
