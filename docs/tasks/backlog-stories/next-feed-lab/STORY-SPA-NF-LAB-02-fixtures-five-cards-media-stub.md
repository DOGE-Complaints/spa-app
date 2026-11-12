# STORY-SPA-NF-LAB-02 — Five fixtures + media stub

## Meta
- **Key:** `STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub`
- **Package:** [next-feed-lab](INDEX.md) · [VISUAL-DoD.md](VISUAL-DoD.md)
- **Status:** Done · P3 (`2026-10-13T12:17:59Z`) · pipeline [EPIC-SPA-22](../../epics/EPIC-SPA-22-next-feed-lab/stories/STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub/STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md) · `pkg-000128` · gate PASS · **not** full visual Done
- **Depends on:** LAB-01
- **Code boundary:** static fixtures module only — **no** HTTP; media path `/assets/dogefeed.png`; **no** invent second asset / API fields
- **Process:** A+C+F — data honesty for later visual gates (anti-UUID)

## Зачем
Одинаковые данные для 5 карточек + одна картинка-заглушка, чтобы отладить ритм ленты (M149) и media slot (M150) без бекенда — и без UUID-first chrome, который ломал глаз на product.

## Artboards
- [M149](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) — list rhythm (data side)
- [M150](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md) — `ISSUE-CARD-MEDIA` · 16:9

## Past failures this tip prevents
- UUID as primary identity (`publicLabel=null` on product) — fixtures use branded demo ids
- Inventing media API / second stub to force PASS
- Treating Absent asset as invent-OK (honest broken state instead)

## Fixture catalog (operator 2026-10-13)

| # | Public id (fixture) | Title (draft) | Geo hint |
|---|---------------------|---------------|----------|
| 1 | `DOGEstonia-UusVeerenni-001` | Night construction noise — Uus Veerenni corner | Tallinn |
| 2 | `DOGEstonia-UusVeerenni-002` | Potholes on Pärnu mnt near bus stop | Tallinn |
| 3 | `DOGEstonia-UusVeerenni-003` | Overflowing bins at Kadriorg playground | Tallinn |
| 4 | `DOGEstonia-UusVeerenni-004` | Broken streetlight on Telliskivi block | Tallinn |
| 5 | `DOGEstonia-UusVeerenni-005` | Standing water after rain — Kalamaja alley | Tallinn |

**Shared:** `status=PUBLISHED` · `type=INCIDENT` · media `src=/assets/dogefeed.png` · 1–2 fixture comments each (EN/ET mix OK) · `data-fixture="true"` on surfaces.

**Format note:** JIRA-like `DOGEstonia-<Node>-NNN` — **fixture-only**, not invent production API field (Q5). Closed product may still lack `publicLabel`; lab must **not** fake a Closed field — keep demo id in fixture module only.

## Media stub

| Field | Value |
|-------|--------|
| Path | `public/assets/dogefeed.png` |
| Target size | **1600 × 900** px (16:9) |
| Display | full card column width · cover · radius ~10px · no carousel |
| Absent file | honest broken-image / placeholder state — do not invent second asset (**name ≠ create**) |

## Функциональные требования (FR)
- **FR-LAB-02.1** Lab loads exactly **5** fixture issues from a local module (no fetch).
- **FR-LAB-02.2** Each fixture exposes demo public id `DOGEstonia-UusVeerenni-00N` as the **visible** identity label for later cards (not UUID-first).
- **FR-LAB-02.3** All five share the same media stub path.
- **FR-LAB-02.4** Fixture comments present for thread compose in LAB-03/04.
- **FR-LAB-02.5** Fixture fields marked fixture-only; no claim of Closed API shape beyond existing product contracts.

## Acceptance Criteria
- [ ] 5 fixtures documented + module shape named for implement
- [ ] Visible ids are `DOGEstonia-UusVeerenni-001`…`005` (not UUID strings)
- [ ] Media path + 1600×900 target documented; Absent → honest state (no second asset invent)
- [ ] No HTTP in fixture loader
- [ ] **Not full visual Done** — data foundation; M150 media/M149 rhythm visual PASS waits LAB-03 gates ([VISUAL-DoD.md](VISUAL-DoD.md) §4)

## Вне scope
Atom visual compose (LAB-03) · modal (LAB-04) · real media API · invent Closed `publicLabel`

## Technical subtasks

### t01 — Fixture module
- Target e.g. `features/feed-lab/fixtures/labFeedFixtures.js` — array of 5 issues + thread bodies.
- Mark fixture-only fields explicitly.

### t02 — Media contract
- Document alt string per card (authored fixture alt, not filename guess).
- Wire path `/assets/dogefeed.png` when OP file Present; else honest broken UI.
