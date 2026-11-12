# Story acceptance gate — STORY-SPA-CR-07-lab-feed-cutover

- **Story:** `#/lab/feed` cutover FeedReactionPlane → ReactionsMount (M154 + OP-UX-MIRROR §3.4)
- **Package:** `pkg-000143-20261015-epic-spa-23-cr-07-lab-feed-cutover.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-15T11:08:46Z
- **Note:** Structure AC held · cutover + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false` · FixtureAdapter only · no invent OP PASS · M155 OOS · no invent HTTP · no `#/next/feed` cutover · `#/lab/reactions` stands retained

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| `#/lab/feed` shows ReactionsMount on root + comment reaction slots | PASS (structure) | T01–T02 · shots 01/03 · vitest cr07 |
| Hover/empty-React/outside-close/light-X/hint-footer/hug-width per CR-05/06 in feed context | PASS (structure) | T01 · shot 02 · tip footer Present · icon-only close |
| No invent HTTP; FixtureAdapter (or lab-local same props contract) | PASS (structure) | `FeedLabReactionsMount` · `data-rm-adapter=fixture` |
| Vitest/lab smoke updated for new mount | PASS (structure) | cr07 + nflab08/09/03/10 · 68/68 feed-lab+rm |
| `data-m155-oos` / no people UI | PASS (structure) | mount attr · no people UI |
| Verify URL `http://127.0.0.1:5173/#/lab/feed` | PASS (structure) | capture base |
| No dual live FeedReactionPlane | PASS (structure) | *Deprecated · RETIRE.md · query null |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-15T11:08:40Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000143)
cd spa-app && npx vitest run src/features/feed-lab src/features/reactions-mount
# → 15 files · 68 tests PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr07-capture.mjs
# md5 01=defd86bed1f9 · 02=7885f9c46902 · 03=b91eaa7e2d31 · 04=6c1a314cdbab · 05=97ffa443dcfe
```

## Visual checklists

[`visual-checklists-m154-lab-feed-cutover.md`](./visual-checklists-m154-lab-feed-cutover.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
