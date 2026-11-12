# Story acceptance gate — STORY-SPA-CR-14-mark-accent-tokens

- **Story:** Mark accent tokens via CSS currentColor (OP-UX-MIRROR-m154 §4.5 · icon-token-map)
- **Package:** `pkg-000150-20261016-epic-spa-23-cr-14-mark-accent-tokens.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-16T11:04:23Z
- **Note:** Structure AC held · Path A screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · no multicolor SVG · no invent HTTP · no M155 · Gap v2 chrome OOS · no `#/next/feed` · no invent OP PASS

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Picker tiles show per-mark color | PASS (structure) | T01/T02 · tokens + ReactionMarkAccents · shot 01 |
| Dark theme still readable | PASS (structure) | dark vars · shot 02/05 · facts markColor |
| Summary marks tinted consistently | PASS (structure) | T03 · summary/aggregate CSS · shot 04 |
| Vitest: data-reaction-id + class/style map | PASS (structure) | `reactionsMount.cr14` · suite **99**/99 |
| Verify labs under light/dark stress | PASS (structure) | `#/lab/reactions` + `#/lab/feed` capture |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-16T11:04:23Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000150)
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
# → 99 PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr14-capture.mjs
# md5 01=b7702f0023ac · 02=160471ac3f50 · 03=06d90d978bcd · 04=b9127eaf67fa · 05=279e9b9a9c63
```

## Visual checklists

[`visual-checklists-m154-mark-accents.md`](./visual-checklists-m154-mark-accents.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
