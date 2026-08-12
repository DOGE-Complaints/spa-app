# Story acceptance gate — STORY-SPA-G9-brand-color-palette-tokens

- **Story:** Brand color palette → G4 tokens
- **Package:** `pkg-000042-20260802-epic-spa-08-g9-brand-color-palette-tokens.yaml`
- **Result:** PASS
- **Date:** 2026-08-02T08:59:09Z
- **Post-audit waive (FR-G9.6 live PNGs):** 2026-08-02T10:13:40Z — SPA-G9-T09 / `run_mode=spa_g9_audit_2026_08_02`
- **Post-audit commit (F1):** `0809fb9` — SPA-G9-T08

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| `--doge-*` в tokens.css = palette §6 | PASS | T01; tokens.css brand block; **HEAD** via T08 `0809fb9` |
| `--color-*` (≠ danger/success) = var(--doge-*); hover/warm | PASS | T02 |
| CTA text doge-bg/ink; no small white on #F5A623 | PASS | T03 AppErrorState/StoryActivity + existing dark-on-accent |
| design-system §2.1 = palette v1.0 | PASS | T04 |
| Visual board/login/cabinet/filters; npm test | PASS | T05: tokens + swatch + 422 tests; **live surface PNGs waived (T09)** — env Chrome crashpad |
| INDEX Done; G4 note; tokens header | PASS | T06 |

## Operator waive (FR-G9.6 live surfaces)

Live board/login/cabinet/filters PNGs **waived**. Accepted evidence = brand token SSOT + `00-brand-token-swatch.png` + vitest. No fabricated SPA screenshots.

## Commands (live verification 2026-08-02T08:59:09Z; post-audit 2026-08-02T10:13:40Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && git show HEAD:src/styles/tokens.css | head -30
```

SSOT дат: docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md
