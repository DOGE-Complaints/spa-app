# Story acceptance gate — STORY-SPA-HL-02-prod-env-bake-gate

- **Story:** Production env-bake gate (no localhost release)
- **Package:** `pkg-000060-20260809-epic-spa-10-hl-02-prod-env-bake.yaml`
- **Result:** PASS
- **Date:** 2026-08-09T11:52:33Z
- **Scaffolded:** 2026-08-09T11:37:17Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Release checklist / deploy docs требуют env-bake gate | PASS | [deploy-guide §Release checklist](../../../../../../../docs/deploy-guide.md) · T01 |
| Есть воспроизводимое доказательство green bake на public URL (лог/CI) | PASS | [evidence](../../../../../../analysis/evidence-STORY-SPA-HL-02-public-env-bake-2026-08-09.md) · T03 · exit 0 |
| Зафиксировано: dist с `127.0.0.1` service bases — **не** release | PASS | deploy-guide table Local smoke ≠ release · T01 |

## FR checklist

| FR | Status | Evidence |
|----|--------|----------|
| FR-HL-02.1 public URL bake for release | PASS | T03 bake hosts railway + supabase |
| FR-HL-02.2 mandatory gate fails on localhost needles | PASS | script + bare fail exit 1 · T02 |
| FR-HL-02.3 local dist ≠ shippable release | PASS | T01 wording |
| FR-HL-02.4 green evidence once on public URLs | PASS | T03 evidence 11:52:18Z |

## Commands (live verification 2026-08-09T11:52:33Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
rg -n "Release checklist|verify:build:env-bake|Local smoke" spa-app/docs/deploy-guide.md
cd spa-app && npm run verify:build:env-bake   # bare → exit 1
# public overrides → exit 0 (see evidence)
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
