# Acceptance verification — SPA-ID-12-T11

- **Task:** distinct story-handoff icons 256×256 (audit F1+F4)
- **Wave:** `run_mode=spa_id_12_audit_2026_07_05`
- **Result:** PASS
- **Date:** 2026-07-05T10:04:25Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| 19 distinct PNG per icon-assets catalog | PASS | `public/icons/story-handoff/ic-*.png` — 19 files; `md5` — 19 unique hashes |
| Format 256×256 RGBA | PASS | `file ic-spinner.png` → 256×256 |
| Total weight << 25 MB | PASS | `du -sh public/icons/story-handoff/` → **76K** (was ~28M) |
| Stray `*.png.png` removed | PASS | `ic-info.png.png`, `ic-lock.png.png` deleted |
| UI-3 post-implement 9 PNG | PASS | `task-spa-id-12-t08-.../ui-baseline/post-implement/*.png` refreshed |
| Vitest green | PASS | `npm run test:run` — 362 passed, 2 skipped |
| Puppeteer M128 | PASS | `npm run test:ui:story-handoff-m128` green |
| pkg-000026 / current.yaml unchanged | PASS | `spa-active-package.current.yaml` → pkg-000026 |

## Generator

- Script: [`spa-app/scripts/generate-story-handoff-icons.py`](../../../../../../../scripts/generate-story-handoff-icons.py) — reproducible distinct line-art icons per catalog colors.

## Commands (live 2026-07-05)

```bash
cd spa-app && python3 scripts/generate-story-handoff-icons.py
cd spa-app && md5 public/icons/story-handoff/ic-*.png | sort -u | wc -l  # 19
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:story-handoff-m128
```
