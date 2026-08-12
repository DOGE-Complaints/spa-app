# Acceptance verification — SPA-HL-02-T03

- **Task:** Evidence green public URL bake
- **Result:** PASS
- **Date:** 2026-08-09T11:52:18Z
- **Package:** `pkg-000060`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Green bake run-report (AC2 · FR-02.4) | PASS | [run-summary](../../../../../../run-reports/run-summary-20260809-1152-spa-hl-02-p3.md) · script: `ok: no localhost; gateway/identity/supabase/gpt URLs present` |
| No 127.0.0.1:8000/8100 in dist (FR-02.1) | PASS | post-bake scan `localhost_hits 0` |
| No secrets committed | PASS | evidence lists hosts only; anon key not logged |

## Public hosts used (no secrets)

- gateway: `dogestonia-tallinn.up.railway.app` ([railway-git-deploy-manual](../../../../../../../docs/railway-git-deploy-manual.md))
- identity: `doge-identity-service-tallinn-demo.up.railway.app`
- supabase host: present (from local `.env`, not committed)
- story-gpt: present (from local `.env`, not committed)
