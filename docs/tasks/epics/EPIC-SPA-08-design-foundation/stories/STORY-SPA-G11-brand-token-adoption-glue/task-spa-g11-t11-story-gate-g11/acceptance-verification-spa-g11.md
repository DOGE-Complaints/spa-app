# Story acceptance gate — STORY-SPA-G11-brand-token-adoption-glue

- **Story:** Brand token adoption / glue
- **Package:** `pkg-000043-20260802-epic-spa-08-g11-brand-token-adoption-glue.yaml`
- **Result:** PASS
- **Date:** 2026-08-02T12:55:51Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| F3–F5 docs synced with HEAD (G9 historical; G4 scope; palette implemented note) | PASS | T01–T03; G9 §Зачем As-of-Done; G4 Вне scope G9 Done; Color Palette Meta touchpoint |
| Primary CTA `:hover` uses `--color-accent-hover`; label contrast rule unified | PASS | T04; Login/AppError/StoryActivity/Civic/SessionShell/StoryHandoff/Phone*; label = `--color-bg-primary`; design-system §2.1 G11 note |
| `--doge-accent-soft` (and/or `--color-accent-soft`) used for soft accent fills | PASS | T05; `--color-accent-soft` alias; Wallet/Contribution/etc |
| StatusBadge: **0** hardcoded hex backgrounds; surfaces/borders via tokens | PASS | T07; `rg #hex StatusBadge.css` = 0 |
| Brand-family hex/rgba in `src/**/*.css` excl. `tokens.css` = **0** | PASS | T08–T10; inventory `rg` brand-family = 0 |
| Vitest green; StatusBadge class tests pass | PASS | `npx vitest run --pool=forks --maxWorkers=2` → **422 passed / 2 skipped**; StatusBadge 3/3 |
| INDEX G11 → Done; G9 remains Done; reaudit F3–F8 pointed to G11 closure | PASS | INDEX/dashboard/bullrun/epic sync; reaudit follow-on note |

## Commands (live verification 2026-08-02T12:55:51Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npx vitest run --pool=forks --maxWorkers=2
# inventory
rg -n '245,\s*197,\s*24|255,\s*214,\s*0|199,\s*166,\s*70|245,\s*197,\s*66|20,\s*20,\s*23|27,\s*28,\s*31|18,\s*22,\s*30|34,\s*35,\s*40' spa-app/src --glob '*.css' --glob '!styles/tokens.css'
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
