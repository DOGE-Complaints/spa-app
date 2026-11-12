# Story acceptance gate — STORY-SPA-CT-32-thread-dark-chrome

- **Story:** Thread dark chrome residual (OP marks 5–6)
- **Package:** `pkg-000200-20261021-epic-spa-24-ct-32-thread-dark-chrome.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-21T20:27:01Z
- **Note:** P3 Execute · T01–T05 **Done** · structure Pass · theme tokens + ShellChromeIcon mask · Path A shots Present · CAPTURE-META `fails: []` · OP eye **Absent** → Partial visual=**BLOCK** · no invent OP PASS · Await P4/P5

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Bubbles/quote/composer readable in dark | Structure Pass | tokens `--tm-bubble-fill` · CommentNode/Composer · shot 03 · probe bubbleBg dark · white text |
| Show more readable contrast | Structure Pass | `--color-text-link` · CommentTree · probe showMore `#53B1FD` |
| Issue type glyph readable in dark | Structure Pass | IssueTypeIcon ShellChromeIcon · `data-ct32-type=mask` · shot 04 · typeMask true |
| Close glyph readable in dark | Structure Pass | FeedIssueMount ShellChromeIcon · `data-ct32-close=mask` · shot 04 · closeMask true |
| Feed action icons readable in dark (soft) | Structure Pass | FeedCivicPost comment/share ShellChromeIcon · shot 02 · feedMaskCount 26 |
| Light theme held | Structure Pass | light cream tokens · shot 01/05 |
| Vitest / Path A | Structure Pass | thread-mount+feed **395/395** · threadMount.ct32 **5/5** · Path A 01–05 |
| OP eye (Absent = BLOCK · no invent PASS) | **BLOCK** | OP eye Absent · Partial visual=BLOCK |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed
```

## Visual checklists

[`visual-checklists-thread-dark-chrome.md`](./visual-checklists-thread-dark-chrome.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
