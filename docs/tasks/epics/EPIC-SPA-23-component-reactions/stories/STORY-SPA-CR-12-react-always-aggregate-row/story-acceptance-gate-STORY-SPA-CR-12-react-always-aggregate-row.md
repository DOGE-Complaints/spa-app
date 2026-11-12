# Story acceptance gate — STORY-SPA-CR-12-react-always-aggregate-row

- **Story:** React-always + Reactions zone + aggregate row under strip (M154 A · OP-UX-MIRROR-m154 §3.2–3.3)
- **Package:** `pkg-000148-20261016-epic-spa-23-cr-12-react-always-aggregate-row.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-16T10:42:46Z
- **Note:** Structure AC held · Path A screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · supersedes CR-05 hide-React for strip · keep CR-10 portal dismiss · no dual React under strip · M155 OOS · invent HTTP OOS · no `#/next/feed` · `data-lab-visual-done=false` · no invent OP PASS

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Populated: React + Reactions visible; aggregate under strip | PASS (structure) | T01/T02 · fixture-002 · shot 02 · host contains row |
| Empty: no aggregate row; React opens picker | PASS (structure) | T01/T02 · fixture-001 · shot 01 · vitest cr12 |
| No dual React under strip | PASS (structure) | no `feed-post-discussion-reaction-slot` · shot 04 |
| Vitest: React when populated · aggregate under strip | PASS (structure) | `feedLab.cr12` · `reactionsMount.cr12` · suite **91**/91 |
| Verify URL `http://127.0.0.1:5173/#/lab/feed` | PASS (structure) | capture facts emptyReact/popAggInHost |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-16T10:42:46Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000148)
cd spa-app && npm test -- --run src/features/feed-lab src/features/reactions-mount
# → 91 PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr12-capture.mjs
# md5 01=edb1d41a0e8d · 02=15e4afe683cc · 03=54b4659b7577 · 04=43d7138cf65f · 05=2f9e53a93482
```

## Visual checklists

[`visual-checklists-m154-react-always-aggregate.md`](./visual-checklists-m154-react-always-aggregate.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
