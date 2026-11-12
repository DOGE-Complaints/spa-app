# Story acceptance gate — STORY-SPA-NF-13-issue-type-identity-icon

- **Story:** Issue-type identity icon (M161)
- **Package:** `pkg-000189-20261021-epic-spa-20-nf-13-issue-type-identity-icon.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-21T11:33:57Z
- **Note:** P3 Execute · T01–T04 Done · Path A shots 01–05 Present · no invent type aliases/HTTP/OP PASS · vitest feed+feed-lab+i18n+reactions-mount+thread-mount **451/451** · feed.nf13 **4/4** · issueTypeIcons.nf13 **3/3** · feedLab.nf13 **2/2**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Known type shows catalog icon in 48×48 slot (glyph 24) | Match | `IssueTypeIcon` 24×24 · shot 02 · feed.nf13 |
| Exact key map only (no silent lowercase alias) | Match | `issueTypeIcons.js` · `incident` → null |
| Unknown omit held | Match | IMPROVEMENT omit · shot 04 |
| Map module explicit · no glob | Match | `ISSUE_TYPE_ICON_BY_TYPE` Object.freeze |
| Vitest 5+1 | Match | suite **451/451** · nf13 **4/4** · map **3/3** |
| Icon catalog docs updated | Match | NF-icon-assets M161 table · disk 5 · T01 |
| OP eye after Apply (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/i18n/__tests__/issueTypeIcons.nf13.test.js src/features/reactions-mount src/features/thread-mount
NF13_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-nf13-capture.mjs
```

## Visual checklists

[`visual-checklists-issue-type-identity-icon.md`](./visual-checklists-issue-type-identity-icon.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
