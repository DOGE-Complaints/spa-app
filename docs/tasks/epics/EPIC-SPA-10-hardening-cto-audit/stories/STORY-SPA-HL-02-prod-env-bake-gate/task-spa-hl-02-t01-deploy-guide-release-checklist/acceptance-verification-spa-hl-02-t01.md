# Acceptance verification — SPA-HL-02-T01

- **Task:** Deploy-guide release vs local dist checklist
- **Result:** PASS
- **Date:** 2026-08-09T11:52:18Z
- **Package:** `pkg-000060`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Release checklist requires env-bake (AC1) | PASS | [`docs/deploy-guide.md`](../../../../../../../docs/deploy-guide.md) §Release checklist — env-bake (HL-02) |
| Localhost dist ≠ release (AC3 · FR-02.3) | PASS | Same section: «Local smoke dist ≠ shippable release» · table forbids ship of local bake |
| Doc-only | PASS | Only `docs/deploy-guide.md` |

## Commands

```bash
rg -n "Release checklist|Local smoke dist|verify:build:env-bake|HL-02" spa-app/docs/deploy-guide.md
```
