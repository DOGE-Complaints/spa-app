# Acceptance verification — SPA-G2-T07 (story gate)

- **Gate:** PASS (2026-06-12)
- **Wave:** pkg-000002
- **Story:** STORY-SPA-G2-labels-i18n-dictionary

| Story AC | Result | Evidence |
|----------|--------|----------|
| All AVAILABLE_LABELS have et/ru/en in dictionaries.js | PASS | T02; labelKeys.js + dictionaries.js |
| Filter, card, details show localized label | PASS | T03–T04; LabelsFilter, IssueCard, IssuePage |
| Language switch updates labels instantly | PASS | React t() via useTranslation — no cache of raw keys |
| Doc touchpoints updated | PASS | T06 artifacts |

| Dependency | Status |
|------------|--------|
| SPA-G2-T00..T06 | Done |

```bash
cd spa-app && npm run test:run
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# 75 passed; ok 8 paths
```

