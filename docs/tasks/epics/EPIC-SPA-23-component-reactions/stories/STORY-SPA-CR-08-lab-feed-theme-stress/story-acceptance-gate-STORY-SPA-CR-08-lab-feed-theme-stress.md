# Story acceptance gate — STORY-SPA-CR-08-lab-feed-theme-stress

- **Story:** Lab feed theme + stress controls (M160 + OP-UX-MIRROR composition §3.1)
- **Package:** `pkg-000144-20261015-epic-spa-23-cr-08-lab-feed-theme-stress.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-15T19:33:42Z
- **Note:** Structure AC held · M160 stress + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false` · `setThemeAttribute` persist:false · FixtureAdapter only · no invent OP PASS · M155 OOS · no invent HTTP · no `#/next/feed` · CR-09/CR-10 OOS

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| `#/lab/feed` has theme toggle (light/dark) usable like `#/lab/reactions` | PASS (structure) | T01 · `rm-lab-stress-controls` · shot 01 |
| Switching to light → picker/strip light; dark → dark | PASS (structure) | T01/T03 · shots 02/03 · tokens `--color-*` |
| Reuse bootTheme / existing i18n stress keys where Present | PASS (structure) | T01/T02 · `setThemeAttribute` · `makeLabFeedT` / dictionary |
| Vitest: toggle sets `data-theme` / control testids | PASS (structure) | `feedLab.cr08.test.jsx` · 5/5 |
| Verify URL `http://127.0.0.1:5173/#/lab/feed` | PASS (structure) | capture base |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-15T19:33:42Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000144)
cd spa-app && npx vitest run src/features/feed-lab src/features/reactions-mount src/pages/__tests__/FeedLabPage.nflab01.test.jsx
# → feed-lab 43 + reactions-mount 34 PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr08-capture.mjs
# md5 01=ad015abf8b67 · 02=4a7c0c2e3781 · 03=0bc91cb67108 · 04=bb5130b459a5 · 05=f35877f84316
```

## Visual checklists

[`visual-checklists-m160-lab-feed-theme-stress.md`](./visual-checklists-m160-lab-feed-theme-stress.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
