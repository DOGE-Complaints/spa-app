# Acceptance verification — SPA-PH-10-T06

- **Task:** As-of-Done backlog SSOT (F1)
- **Result:** PASS
- **Date:** 2026-08-08T08:33:15Z
- **Package:** `pkg-000056` · `run_mode=spa_ph_10_audit_2026_08_07`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Backlog As-of-Done vs Historical (pre-PH-10) | PASS | [`STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md) §Зачем / Verified facts |
| Pipeline story mirror | PASS | [`../STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../STORY-SPA-PH-10-header-horizontal-logo-favicon.md) same split |
| No product code change | PASS | docs only this task |

## Commands

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --print-utc-now
# utc_now: 2026-08-08T08:33:15Z
rg -n "As-of-Done|Historical|DOGEstonia-logo-horizontal" spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md
rg -n "logoSrc|/assets/DOGEstonia-logo-horizontal|header-brand-name" spa-app/src/components/AppShell/Header.jsx
rg -n "rel=.icon" spa-app/index.html
```

## Live re-verify (disk)

- `Header.jsx` L19: `useState('/assets/DOGEstonia-logo-horizontal.png')`; L99–105: `img` only (no `.header-brand-name`)
- `index.html` L6: `<link rel="icon" href="./favicon.png" type="image/png" />`
