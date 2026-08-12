# Acceptance verification — SPA-PH-06-T10

- **Task:** Recapture H3 How It Works Submit CTA evidence (F3)
- **run_mode:** `spa_ph_06_audit_2026_08_06`
- **Result:** PASS
- **Date:** 2026-08-06T09:51:14Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| scrollIntoView on `how-it-works-cta-submit` | PASS | `shotInView()` in `public-submit-ph06-full-cycle.mjs` |
| H3 PNG shows CTA row | PASS | `03-happy-mock-how-it-works-submit-cta-1536x1024.png` — «Submit a story» + hint visible |
| H1 live happy present | PASS | `01-happy-live-board-submit-ctas-1536x1024.png` (recaptured live PASS) |
| README indexer updated | PASS | `screenshots/README.md` T10 note |
| Script/PNG commit | deferred P8 | AC optional; WT script modified; leave for P8 |

## Commands

```bash
cd spa-app && npm run test:ui:submit-ph06-full   # exit 0 · 2026-08-06T09:51Z
ls spa-app/docs/tasks/epics/.../screenshots/full-cycle/
# Visual: H3 includes how-it-works-cta-submit / CTA row
```
