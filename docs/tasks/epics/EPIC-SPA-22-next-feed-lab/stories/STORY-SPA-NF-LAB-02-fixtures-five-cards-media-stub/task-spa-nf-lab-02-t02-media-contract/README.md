# SPA-NF-LAB-02-T02 — Media stub contract

**Status:** Done · P3 (`2026-10-13T12:17:59Z`) · P1.3 (`2026-10-13T11:40:09Z`)
**Story:** [`../STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md`](../STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T11:40:09Z`
**Package:** `pkg-000128`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)
**@mockup-m150:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)
**@mockup-m150-png:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
**Runtime prerequisite (later):** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** [`../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md`](../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md) §4 — visual PASS waits LAB-03

## Purpose
Document and wire shared media stub for all five fixtures: path `/assets/dogefeed.png`, target **1600×900** (16:9), authored alt per card. Absent file → honest broken/placeholder — **no** second asset invent.

## Media contract

| Field | Value |
|-------|--------|
| Path | `public/assets/dogefeed.png` → URL `/assets/dogefeed.png` |
| Target size | **1600 × 900** px (16:9) |
| Display (later LAB-03) | full card column width · cover · radius ~10px · no carousel |
| Absent | honest broken-image / placeholder · **name ≠ create** second stub |

## Constraints
- All five fixtures share the same media path (FR-LAB-02.3).
- Alt = authored fixture string per card — not filename guess.
- No invent media API / second stub to force PASS.
- M149/M150 = data-side reference this tip · **not** full visual Done.
- Atom card compose / display chrome = LAB-03.

## AC / DoD
- [x] Shared path documented on all five fixtures
- [x] Authored alt per card Present in fixture/media contract
- [x] 1600×900 target documented
- [x] Absent → honest state path documented (no second asset invent)
- [x] Story gate remains **not** full visual Done
- [x] Implemented in P3 (`labMediaStub.js` + lab media probe)

## Where to change
- Fixture media fields in `features/feed-lab/fixtures/labFeedFixtures.js` (T01)
- Optional helper `features/feed-lab/fixtures/labMediaStub.js` if needed
- Do **not** invent replacement PNG if Absent at runtime

## Verification
- Assert same `src` on 5 fixtures · alts non-empty authored
- `ls`/`sips` on `public/assets/dogefeed.png` when Present (target 1600×900)
- No fetch / no second asset invent
