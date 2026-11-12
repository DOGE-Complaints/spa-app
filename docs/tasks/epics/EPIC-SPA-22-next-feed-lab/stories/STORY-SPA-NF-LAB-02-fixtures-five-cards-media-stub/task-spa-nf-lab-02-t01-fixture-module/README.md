# SPA-NF-LAB-02-T01 — Fixture module (5 issues + comments)

**Status:** Done · P3 (`2026-10-13T12:17:59Z`) · P1.3 (`2026-10-13T11:40:09Z`)
**Story:** [`../STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md`](../STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** false
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T11:40:09Z`
**Package:** `pkg-000128`
**Depends on:** LAB-01 Done (`FeedLabPage` Present)
**Runtime prerequisite (later):** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** [`../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md`](../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md) · data honesty / anti-UUID

## Purpose
Create static fixture module `features/feed-lab/fixtures/labFeedFixtures.js` — exactly 5 issues + thread bodies. Mark fixture-only fields. No HTTP.

## Catalog (operator lock)

| # | Public id | Title (draft) |
|---|-----------|---------------|
| 1 | `DOGEstonia-UusVeerenni-001` | Night construction noise — Uus Veerenni corner |
| 2 | `DOGEstonia-UusVeerenni-002` | Potholes on Pärnu mnt near bus stop |
| 3 | `DOGEstonia-UusVeerenni-003` | Overflowing bins at Kadriorg playground |
| 4 | `DOGEstonia-UusVeerenni-004` | Broken streetlight on Telliskivi block |
| 5 | `DOGEstonia-UusVeerenni-005` | Standing water after rain — Kalamaja alley |

Shared: `status=PUBLISHED` · `type=INCIDENT` · media stub path (T02) · 1–2 fixture comments each (EN/ET OK) · `data-fixture="true"` on surfaces later.

## Constraints
- No fetch / gateway / threads clients in fixture loader.
- Demo ids fixture-only — **do not** invent Closed `publicLabel` API field.
- No UUID-first as visible identity.
- Atom visual compose / card mount = LAB-03 OOS.
- **Not** full visual Done this story.

## AC / DoD
- [x] Module exports exactly 5 fixtures
- [x] Visible ids `DOGEstonia-UusVeerenni-001`…`005`
- [x] Fixture-only fields marked explicitly
- [x] 1–2 comments each for LAB-03/04
- [x] No HTTP in loader
- [x] Implemented in P3 (`labFeedFixtures.js`)

## Where to change
- Target: `spa-app/src/features/feed-lab/fixtures/labFeedFixtures.js` (+ optional `index.js`)
- Consumers: LAB-03+ / optional wire from `FeedLabPage` only if needed for data smoke (prefer fixtures-only until LAB-03)

## Verification
- Unit/assert: length === 5 · id pattern · no `fetch(`
- Grep ban invent Closed publicLabel claims
