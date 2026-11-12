# Story acceptance gate — STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates

- **Story:** Greenfield overlay + lab cutover + visual gates (M158 + re-gate pack)
- **Package:** `pkg-000136-20261013-epic-spa-22-nf-lab-10-greenfield-overlay-cutover-gates.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-13T19:24:46Z
- **Note:** Structure AC held · M150/M154/M152–M153/M158/M149 checklist + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false` · cutover greenfield only · `*Deprecated` import ban held

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Greenfield overlay Present · hit targets · strip excluded | PASS | T01 · FeedIssueDetail* · nflab10 |
| `#/lab/feed` greenfield only · Deprecated import ban | PASS | T02 · FeedLabPage · vitest ban |
| Gate rows M150/M154/M152–M153/M158/M149: checklist + shots | PASS (evidence) | T03 · shots 01–05 |
| OP eye PASS recorded (date/who) — Absent = BLOCK | **BLOCK** | OP Absent · no invent |
| LAB-05 prerequisite language → LAB-10 visual PASS | PASS | T04 · backlog + INDEX + VISUAL-DoD |

## Commands (live `2026-10-13T19:24:46Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000136)
cd spa-app && npm test -- --run src/features/feed-lab
# → 8 files · 32 tests PASS (nflab10 4/4)
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome" npm run test:ui:board-shell
# → EXIT 0
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome" node scripts/tmp-lab10-capture.mjs
# md5 01=da88697b5523 · 02=14bbd48d4419 · 03=a2c67a961659 · 04=2e6facc1b3c7 · 05=0df2a2245d53
```

## Visual checklists

[`visual-checklists-m158.md`](./visual-checklists-m158.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
