# Acceptance verification — SPA-HL-02-T02

- **Task:** npm script / release-path env-bake gate
- **Result:** PASS
- **Date:** 2026-08-09T11:52:18Z
- **Package:** `pkg-000060`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Script documented as release gate (FR-02.2) | PASS | `package.json` `verify:build:env-bake` · deploy-guide table + §Release checklist |
| Required VITE_* listed | PASS | deploy-guide mandatory list (gateway/identity/supabase/anon/story-gpt) |
| No CI vendor invent | PASS | docs only |

## Commands

```bash
rg -n "verify:build:env-bake" spa-app/package.json spa-app/docs/deploy-guide.md
cd spa-app && npm run verify:build:env-bake   # bare → exit 1 (missing public env)
```

Bare run: exit 1 — `set VITE_* … before verify`.
