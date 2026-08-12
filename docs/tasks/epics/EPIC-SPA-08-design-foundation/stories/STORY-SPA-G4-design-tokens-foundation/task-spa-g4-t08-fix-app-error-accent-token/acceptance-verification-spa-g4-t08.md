# Task acceptance — SPA-G4-T08

- **Story:** STORY-SPA-G4 — Design tokens foundation (post-audit R1)
- **Package / wave:** `run_mode=spa_g4_audit_2026_07_28` (active pkg unchanged `pkg-000038`)
- **Result:** PASS
- **Date:** 2026-07-28T19:03:14Z
- **Scaffolded:** 2026-07-28T18:43:31Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| `var(--color-accent-primary)` on primary button | PASS | `AppErrorState.css:71` |
| no bare `var(--color-accent)` in src | PASS | `rg` empty (`NO_BARE_ACCENT`) |
| M22 Retry spot-check | PASS | computed `backgroundColor=rgb(245, 197, 24)` / token `#f5c518` (`doge.mock-me-error=profile_load_failed`) |

## Commands

```bash
rg 'var\(--color-accent\)' spa-app/src --glob '*.css'   # empty
cd spa-app && npm test -- --run src/components/AppErrorState  # 1 pass
# puppeteer spot-check M22 Retry → rgb(245,197,24)
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
```
