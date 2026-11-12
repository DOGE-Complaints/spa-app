# Story acceptance gate — STORY-SPA-NS-07-shell-dark-icon-chrome

- **Story:** Shell dark icon chrome (OP mark 5 shell)
- **Package:** `pkg-000199-20261021-epic-spa-19-ns-07-shell-dark-icon-chrome.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-21T20:10:51Z
- **Note:** P3 Execute · T01–T04 Done · Path A shots 01–05 Present · CAPTURE-META `fails: []` · probe maskCount 15 · ShellChromeIcon.ns07 **4/4** · AppShell **30/30** · no invent OP PASS

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Header icons readable on dark | Match (structure) | ShellChromeIcon mask · shot 02 · headerMasks 5 |
| Rail / shelter icons readable on dark | Match | ProfileRail mask · shot 03 · railMasks 7 |
| Mobile nav icons readable on dark | Match | MobileBottomNav mask · shot 04 |
| Theme-safe pattern (mask/currentColor or locked equivalent) | Match | `ShellChromeIcon` · `data-ns07=mask` · CrReactionIcon pattern |
| Light theme held | Match | shot 01/05 · ThemeToggle vitest light |
| Vitest / Path A | Match | ns07 **4/4** · AppShell **30/30** · CAPTURE-META |
| OP eye (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/AppShell
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" NS07_BASE=http://127.0.0.1:5173 node spa-app/scripts/tmp-ns07-capture.mjs
```

## Visual checklists

[`visual-checklists-shell-dark-icon-chrome.md`](./visual-checklists-shell-dark-icon-chrome.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
